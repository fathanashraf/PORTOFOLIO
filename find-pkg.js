#!/usr/bin/env node
// find-pkg.js — locate a package by name inside node_modules, handling symlinks
const fs = require('fs');
const path = require('path');

function walk(base, name, maxDepth = 5, depth = 0) {
  const todo = [{ dir: base, depth }];
  let checked = new Set();
  while (todo.length) {
    const { dir, depth } = todo.shift();
    if (checked.has(dir)) continue;
    checked.add(dir);
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true,ignoreErrors: true });
      for (const e of entries) {
        if (!e.name) continue;
        const full = path.join(dir, e.name);
        if (e.isSymbolicLink()) {
          try {
            const real = fs.realpathSync(full);
            todo.push({ dir: real, depth: depth + 1 });
          } catch { /* broken link */ }
          continue;
        }
        if (e.isDirectory()) {
          if (e.name === name) {
            try {
              const real = fs.realpathSync(full);
              const pkg = path.join(real, 'package.json');
              const st = fs.statSync(pkg, {ignoreErrors: true});
              if (st && st.size > 0) {
                const pkgJson = JSON.parse(fs.readFileSync(pkg, 'utf8'));
                return { found: true, dir: real, pkg, real, version: pkgJson.version, pkgName: pkgJson.name };
              }
              return { found: false, dir: real, reason: 'empty-or-no-pkg' };
            } catch {}
          }
          if (depth < maxDepth) todo.push({ dir: full, depth: depth + 1 });
        }
      }
    } catch {}
  }
  return { found: false, dir: base };
}

const nm = path.resolve(process.argv[2] || 'node_modules');
const target = process.argv[3] || 'next-auth';
const res = walk(nm, target);
if (res.found) {
  console.log(JSON.stringify({ found: true, dir: res.dir, version: res.version, pkgName: res.pkgName }));
} else {
  console.log(JSON.stringify({ found: false, dir: nm, reason: res.reason || 'absent' }));
}
