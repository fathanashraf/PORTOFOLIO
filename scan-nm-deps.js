#!/usr/bin/env node
// scan-nm-deps.js — find package by name, report version + location
const fs = require('fs');
const path = require('path');

function packageJsonOf(dir) {
  try {
    const real = fs.realpathSync(dir);
    const pkgPath = path.join(real, 'package.json');
    const st = fs.statSync(pkgPath);
    if (!st || st.size <= 0) return null;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return { name: pkg.name || null, version: pkg.version || null, realDir: real, dir: dir };
  } catch {
    return null;
  }
}

function findPackage(wanted, rootDir, maxDepth = 5) {
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
      const cand = packageJsonOf(full);
      if (cand && cand.name && cand.name === wanted) return cand;
      if (e.name === 'node_modules' && depth + 1 <= maxDepth) {
        todo.push({ dir: full, depth: depth + 1 });
      } else if (e.name.startsWith('@') && depth < maxDepth) {
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

const nm = path.resolve(process.argv[2] || 'node_modules');
const targets = process.argv.slice(3);
const lines = [];
for (const t of targets) {
  const r = findPackage(t, nm);
  if (r) {
    lines.push(`${t}@${r.version}  (${r.realDir})`);
  } else {
    lines.push(`${t}: NOT INSTALLED`);
  }
}
console.log(lines.join('\n'));
