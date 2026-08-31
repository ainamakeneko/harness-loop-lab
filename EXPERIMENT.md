# Harness experiment protocol

## Hypothesis
A thin harness that learns only from observed failures will reduce repeated agent failures faster than its own complexity grows.

## Outer loop
For each task:
1. Run `skills/harness-run/SKILL.md`.
2. Record objective evidence.
3. Identify meaningful failures, human interventions, or avoidable wandering.
4. Classify cause as Context / Rule / Skill / Guardrail / Model limitation / One-off noise.
5. Propose only the smallest durable change likely to prevent recurrence.
6. Human accepts or rejects it.
7. Apply approved proposals via `skills/harness-improve/SKILL.md`.
8. Run a comparable future task and check recurrence.

## Metrics
Per task: completion yes/no; human interventions; implementation-caused verification failures; repeated known failures; unrelated edits; acceptance criteria missed before final review; harness lines added/removed.

## Deletion rule
Every 5 completed tasks, remove obsolete rules, merge duplicates, and replace prose with executable guardrails where practical.
