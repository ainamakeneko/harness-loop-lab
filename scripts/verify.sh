#!/usr/bin/env bash
set -euo pipefail
printf '\n== Harness verification ==\n'
ran=0
if [ -f package.json ] && command -v npm >/dev/null 2>&1; then
  ran=1
  npm test --if-present
  npm run lint --if-present
  npm run typecheck --if-present
  npm run build --if-present
fi
if { [ -f pyproject.toml ] || [ -f requirements.txt ]; }; then
  if command -v pytest >/dev/null 2>&1; then ran=1; pytest -q; fi
  if command -v ruff >/dev/null 2>&1; then ran=1; ruff check .; fi
fi
if [ "$ran" -eq 0 ]; then
  printf 'NOTICE: No project-specific checks were discovered.\n'
  printf 'Add real test/lint/typecheck/build commands to scripts/verify.sh.\n'
fi
printf '\nConfigured checks passed.\n'
