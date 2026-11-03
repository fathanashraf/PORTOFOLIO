#!/usr/bin/env node
// scan-nm.js — for each top-level dir in node_modules, classify it
const fs = require('fs');
const path = require('path');

const nm = process.argv[2] || 'node_modules';
const namesArg = process.argv.slice(3);

let entries;
try {
  entries = fs.readdirSync(nm, {withFileTypes: true});
} catch (e) {
  console.error('cannot read', nm, e.code, e.message);
  process.exit(1);
}

const startsWith = (s, prefix) => s === prefix || s.startsWith(prefix + '/');
const names = namesArg.length ? new Set(namesArg.map(n => n.split('/')[0])) : null;

function classifySymlink(linkPath) {
  try {
    const real = fs.realpathSync(linkPath);
    const st = fs.statSync(real);
    return { kind: 'symlink', target: real, targetIsDir: st.isDirectory() };
  } catch {
    return { kind: 'broken-symlink' };
  }
}

function classifyReal(dir) {
  try {
    const entries = fs.readdirSync(dir, {withFileTypes: true});
    const first = entries[0];
    if (!first) return { kind: 'empty' };
    return { kind: 'real-dir' };
  } catch (e) {
    if (e.code === 'ENOENT') return { kind: 'gone' };
    return { kind: 'error', code: e.code };
  }
}

const out = {};
for (const e of entries) {
  if (!e.isDirectory() && !e.isSymbolicLink()) continue;
  if (names && !names.has(e.name)) continue;
  const dir = path.join(nm, e.name);
  if (e.isSymbolicLink()) {
    out[dir] = classifySymlink(dir);
  } else {
    out[dir] = classifyReal(dir);
  }
}
console.log(JSON.stringify(out, null, 2));
