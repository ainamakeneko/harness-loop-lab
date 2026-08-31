# Harness Loop Lab

Failure-driven harness experiment for AI coding agents.

The outer loop is:

`TASK -> agent work -> verification -> postmortem -> harness proposal -> human approval -> harness update -> next TASK`

## Start a run

1. Put one real task in `TASK.md`.
2. Ask the coding agent:

   `Read skills/harness-run/SKILL.md and execute TASK.md exactly as described.`

3. The agent must implement, verify, record evidence, and complete the post-task harness review.
4. Durable harness changes are proposed under `docs/proposals/`; they are not silently applied.
5. Change a proposal to `Status: APPROVED` only when you accept it.
6. Then ask:

   `Read skills/harness-improve/SKILL.md and apply all APPROVED proposals.`

## Smartphone use

The phone is only the control surface. The coding agent/runtime should run in the cloud with repository access and a shell for tests. See `SMARTPHONE.md`.
