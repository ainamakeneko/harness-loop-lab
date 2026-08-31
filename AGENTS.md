# AGENTS.md — Thin Harness

## Objective
Complete the requested task with the smallest safe change, while leaving the repository easier for the next unfamiliar agent to work in.

## Mandatory workflow
1. Read `TASK.md` completely.
2. Inspect relevant code, tests, configuration, and conventions before editing.
3. Search for existing implementations before creating new abstractions.
4. Implement only the requested scope.
5. Run `scripts/verify.sh`.
6. If verification fails because of your change, diagnose, fix, and rerun until it passes or a genuine external blocker is demonstrated.
7. Compare the final implementation against every acceptance criterion in `TASK.md`.
8. Complete the post-task review defined in `skills/harness-run/SKILL.md`. Do not finish immediately after the code passes.

## Working rules
- Prefer existing project patterns over new ones.
- Do not change unrelated files.
- Do not add dependencies without a concrete task requirement.
- Do not hide or suppress failing checks merely to get green output.
- If ambiguity materially changes the design and cannot be resolved from repository evidence, record it in `docs/open-questions.md` rather than silently inventing an answer.
- Record non-obvious architectural decisions in `docs/decision-log.md`.

## Harness mutation policy
You may diagnose weaknesses and draft improvements, but MUST NOT directly change `AGENTS.md`, files under `skills/`, or permanent guardrails solely because of a post-task lesson.

Instead create a proposal in `docs/proposals/` with `Status: PROPOSED`. Only an explicitly `APPROVED` proposal may be applied by the harness-improve workflow.

## Definition of done
A task is not done until acceptance criteria are satisfied; configured verification passes or a documented external blocker exists; relevant tests are added when practical; the post-task harness review is complete; and justified harness changes are captured as proposals rather than silently applied.
