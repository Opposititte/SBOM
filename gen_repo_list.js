#!/usr/bin/env node
// gen_repo_list.js — build the list of repos to scan from the awesome-go README.
//
// Fetches https://github.com/avelino/awesome-go 's README and extracts every
// unique github.com/<owner>/<repo> link, filtering out non-repo links
// (sponsors, topics, the awesome-go repo itself, etc.).
//
// Usage:   node gen_repo_list.js [output_file]   (default: repos.txt)
// Output:  one canonical clone URL per line, e.g. https://github.com/spf13/cobra
//
// This does network I/O (fetches the README). It does NOT clone anything.

const fs = require('fs');
const OUT = process.argv[2] || 'repos.txt';

// awesome-go's default branch has changed before, so try both.
const SOURCES = [
  'https://raw.githubusercontent.com/avelino/awesome-go/main/README.md',
  'https://raw.githubusercontent.com/avelino/awesome-go/master/README.md',
];

// First path segment values on github.com that are NOT users/orgs.
const SKIP_OWNERS = new Set([
  'sponsors', 'topics', 'about', 'marketplace', 'collections', 'login', 'join',
  'search', 'settings', 'notifications', 'explore', 'trending', 'apps', 'site',
  'features', 'pricing', 'readme', 'contact', 'security', 'enterprise', 'team',
  'customer-stories', 'users', 'orgs', 'organizations', 'github',
]);

async function main() {
  let md = null;
  for (const u of SOURCES) {
    try {
      const r = await fetch(u);
      if (r.ok) { md = await r.text(); console.error(`fetched ${u} (${md.length} bytes)`); break; }
    } catch (e) { /* try next */ }
  }
  if (!md) { console.error('ERROR: could not fetch the awesome-go README'); process.exit(1); }

  const re = /github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(md))) {
    let owner = m[1];
    let repo = m[2].replace(/\.git$/, '').replace(/[.]+$/, ''); // strip .git / trailing dots
    if (!owner || !repo) continue;
    if (SKIP_OWNERS.has(owner.toLowerCase())) continue;
    if (owner.toLowerCase() === 'avelino' && repo.toLowerCase() === 'awesome-go') continue;
    const key = (owner + '/' + repo).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push('https://github.com/' + owner + '/' + repo);
  }

  fs.writeFileSync(OUT, out.join('\n') + '\n');
  console.error(`wrote ${out.length} unique repos to ${OUT}`);
}

main();
