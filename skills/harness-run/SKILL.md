# Skill: harness-run

Use this skill whenever executing `TASK.md` under this harness.

The goal is not merely to finish the current task. Extract evidence about whether the working environment should improve for future agents.

## A — Start
Run `python3 scripts/harness_cycle.py start` and keep the run ID.

## B — Execute
1. Read `TASK.md`, `AGENTS.md`, relevant source, tests, and configuration.
2. Translate acceptance criteria into a checklist.
3. Inspect before editing and search for reusable patterns.
4. Make the smallest safe implementation.
5. Run `bash scripts/verify.sh`.
6. Fix implementation-caused failures and rerun.
7. Recheck every acceptance criterion.

## C — Record evidence
Record only observed evidence, never invented failures:

`python3 scripts/harness_cycle.py event --run RUN_ID --kind verification_failure --detail "..."`

Kinds: `verification_failure`, `human_intervention`, `requirement_miss`, `unnecessary_change`, `agent_wandering`, `other`.

## D — Mandatory post-task harness review
Ask:
1. Was there a meaningful mistake, human intervention, or avoidable wandering?
2. Was the cause Context / Rule / Skill / Guardrail / Model limitation / One-off noise?
3. Is recurrence plausible?
4. What is the smallest intervention that prevents or detects it?
5. Can it be executable instead of prose?
6. Could it overfit or create false positives?

Do not propose a change for every imperfection.

## E — Proposal
If a durable change is justified, create one proposal per independent change under `docs/proposals/` using `docs/proposal-template.md`. Set `Status: PROPOSED`. Do not modify permanent harness files in this phase.

## F — Finish
Run `python3 scripts/harness_cycle.py finish --run RUN_ID`.

Report verification status, blockers, observed harness-relevant failures, proposal filenames, or explicitly `No harness change proposed`.
