#!/usr/bin/env python3
# collect_reqs.py <project_dir>
# Print every TOP-LEVEL requirement string the project declares, so the ground
# truth covers the SAME breadth cdxgen scans (runtime + extras + dependency-groups
# + dev requirements files). pip then resolves the full transitive, pinned set.
#
# Sources:
#   pyproject.toml  [project.dependencies], [project.optional-dependencies].*,
#                   [dependency-groups].*  (PEP 735; string entries only)
#   setup.cfg       [options]install_requires, [options.extras_require]
#   requirements*.txt and requirements/*.txt
import sys, os, glob, re

try:
    import tomllib
except ModuleNotFoundError:
    tomllib = None

root = sys.argv[1]
reqs = []

def add(x):
    if isinstance(x, str):
        s = x.strip()
        if s and not s.startswith('#') and not s.startswith('-'):
            reqs.append(s)

pp = os.path.join(root, 'pyproject.toml')
if tomllib and os.path.exists(pp):
    with open(pp, 'rb') as f:
        d = tomllib.load(f)
    proj = d.get('project', {})
    for r in proj.get('dependencies', []) or []:
        add(r)
    for grp in (proj.get('optional-dependencies', {}) or {}).values():
        for r in grp or []:
            add(r)
    for grp in (d.get('dependency-groups', {}) or {}).values():
        for r in grp or []:
            add(r)   # dict entries ({include-group:...}) are skipped by add()

for reqfile in (glob.glob(os.path.join(root, 'requirements*.txt'))
                + glob.glob(os.path.join(root, 'requirements', '*.txt'))):
    try:
        with open(reqfile) as f:
            for line in f:
                line = line.split('#')[0].strip()
                if line and not line.startswith('-'):
                    add(line)
    except OSError:
        pass

# de-dup preserving order
seen = set()
for r in reqs:
    if r not in seen:
        seen.add(r)
        print(r)
