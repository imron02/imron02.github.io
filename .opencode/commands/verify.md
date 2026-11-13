---
description: Run the verification gate (lint, format:check, check, build)
agent: site-verifier
subagent: true
---

Run the full verification gate for this project — `pnpm lint`, `pnpm format:check`, `pnpm check`, `pnpm build` — in that order, stopping at the first failure. Report per-gate status, the first real error with file and line, the likely cause from the failure table in `docs/workflow.md`, and the suggested fix.