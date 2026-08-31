# TASK

## Objective
Build the second small application in this repository: a single-page "Work Timer" web app for recording short work sessions and seeing a simple summary.

This is Experiment 2 for the harness. Preserve evidence of mistakes, interventions, verification failures, and unnecessary wandering so the mandatory post-task review can assess whether any durable harness improvement is justified.

## User-visible outcome
A user can name a task, start a work session, stop it, and immediately see the completed session in a list with its duration. The page also shows the total recorded work time. It should remain usable on a smartphone.

## Acceptance criteria
- [ ] A text input accepts a task name.
- [ ] Starting a session with an empty or whitespace-only task name is rejected and the UI explains what is missing.
- [ ] Starting a valid session records its start time and makes the active session clearly visible.
- [ ] While a session is active, starting another session is prevented.
- [ ] Stopping the active session creates exactly one completed record containing the entered task name and a non-negative duration.
- [ ] A user can record multiple sessions without reloading the page.
- [ ] The completed-session list is shown in most-recent-first order.
- [ ] The page shows the total duration of all completed sessions and updates it after each completed session.
- [ ] Duration formatting is understandable to a normal user; sub-minute sessions must still display meaningfully rather than appearing blank.
- [ ] The app remains usable on a narrow mobile viewport.
- [ ] Automated tests cover the core state transitions: invalid start, valid start, prevention of a second simultaneous start, stop, multiple completed sessions, and total-duration calculation.
- [ ] Repository verification passes.

## Technical freedom
Use the smallest reasonable implementation and toolchain. Reuse existing project structure where it helps, but do not preserve previous application behavior merely for compatibility with Experiment 1. Avoid adding dependencies unless they materially simplify reliable implementation or verification.

Time-dependent logic should be designed so automated tests can exercise it deterministically without real waiting.

## Experiment constraints
- Do not modify permanent harness rules merely to anticipate possible failures.
- If an implementation or verification failure occurs, record it through the existing harness cycle as required by `skills/harness-run/SKILL.md`.
- Complete the mandatory post-task review.
- Create a proposal under `docs/proposals/` only if evidence from this run justifies a durable harness change.

## Out of scope
- Accounts or authentication.
- Backend services or databases.
- Cloud synchronization.
- Cross-device persistence.
- Billing, analytics, notifications, or deployment infrastructure.
- Complex project/task management features.
- Editing historical records.
