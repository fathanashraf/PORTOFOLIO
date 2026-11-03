#!/usr/bin/env node
// find-pkg-deep.js — find an installed package by NAME (exact match) under node_modules
// Handles: symlinks, scoped @scope/name dirs, hoisting, node_modules-in-node_modules.
const fs = require('fs');
const path = require('path');

function packageJsonOf(dir) {
  try {
    const real = fs.realpathSync(dir);
    const pkgPath = path.join(real, 'package.json');
    const st = fs.statSync(pkgPath);
    if (!st || st.size <= 0) return null;
    const raw = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(raw);
    return { name: pkg.name || null, version: pkg.version || null, realDir: real, dir: dir };
  } catch {
    return null;
  }
}

function findPackage(wanted, rootDir, maxDepth = 6) {
  const todo = [{ dir: rootDir, depth: 0 }];
  const visited = new Set();
  while (todo.length) {
    const { dir, depth } = todo.shift();
    if (visited.has(dir)) continue;
    visited.add(dir);
    if (depth > maxDepth) continue;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch { continue; }
    for (const e of entries) {
      if (!e.name) continue;
      const full = path.join(dir, e.name);

      if (e.isSymbolicLink()) {
        try {
          const real = fs.realpathSync(full);
          if (!visited.has(real) && depth + 1 <= maxDepth) todo.push({ dir: real, depth: depth + 1 });
        } catch { /* broken link */ }
        continue;
      }

      if (!e.isDirectory()) continue;

      // 1. Direct package by name (e.g., node_modules/abbrev or node_modules/@scope/name)
      const cand = packageJsonOf(full);
      if (cand && cand.name && cand.name === wanted) return cand;

      // 2. Recurse only into subdirectories that indicate package nesting:
      //    - node_modules/  (hoisted deps' own node_modules)
      //    - scoped namespace dirs like @auth, @prisma, @auth/core, etc. — but ONLY their direct children
      //      (npm scoped packages live as @scope/name; the @scope dir itself is a namespace, not a package)
      if (e.name === 'node_modules' && depth + 1 <= maxDepth) {
        todo.push({ dir: full, depth: depth + 1 });
      } else if (e.name.startsWith('@') && depth < maxDepth) {
        // @scope container: look at direct children only (one level) as packages
        try {
          const kids = fs.readdirSync(full, { withFileTypes: true });
          for (const k of kids) {
            if (!k.isDirectory()) continue;
            const c2 = packageJsonOf(path.join(full, k.name));
            if (c2 && c2.name === wanted) return c2;
          }
        } catch {}
      }
    }
  }
  return null;
}

const nm = process.argv[2] || 'node_modules';
const targets = process.argv.slice(3);
const results = {};
for (const t of targets) {
  const r = findPackage(t, nm);
  results[t] = r ? { found: true, name: r.name, version: r.version, dir: r.dir, realDir: r.realDir } : { found: false };
}
console.log(JSON.stringify(results, null, 2));
