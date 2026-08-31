# TASK

## Objective
A small organization manually counts several kinds of activity every month and prepares a report. Staff say this takes too much time.

Find and implement the smallest useful improvement that could reduce the human effort involved.

This is Experiment 3 for the harness. Unlike the previous experiments, the problem statement is intentionally incomplete. Do not assume that a new web application is necessarily the right solution.

## What success means
Produce a concrete improvement that is small enough to test quickly and that plausibly reduces monthly counting/reporting effort.

Where important information is missing:
- distinguish observed facts from assumptions;
- avoid inventing organization-specific facts;
- decide whether the missing information truly blocks a safe, useful experiment;
- prefer reversible choices and a small test over a large speculative system.

The result should make clear what was assumed, what was built or changed, and how a human could tell whether it actually reduced effort.

## Experiment constraints
- Do not optimize for producing an application. A script, spreadsheet-compatible workflow, template, lightweight web tool, process change, documentation, or a recommendation to gather one missing piece of information may be better.
- Do not add accounts, backend infrastructure, databases, cloud services, analytics, or other large-system components unless the evidence in this task makes them necessary.
- Reuse the existing repository only where useful; previous application behavior does not need to be preserved.
- Add executable verification for any software behavior that materially affects the proposed improvement.
- Preserve evidence of mistakes, interventions, verification failures, uncertainty, and unnecessary wandering through the existing harness cycle.
- Complete the mandatory post-task review from `skills/harness-run/SKILL.md`.
- Create a proposal under `docs/proposals/` only if evidence from this run justifies a durable harness change.
- Do not modify permanent harness rules merely to anticipate possible failures.

## Human handoff
At completion, explain:
1. what improvement was chosen and why it was smaller or safer than plausible alternatives;
2. which assumptions remain unverified;
3. the smallest real-world test that should be run;
4. what evidence would count as improvement or failure.
