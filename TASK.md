# TASK

## Objective
Build the first small application in this repository: a single-page "Decision Coin" web app that helps a user choose between two options.

## User-visible outcome
A user can enter Option A and Option B, press a button, and see one of the two options selected. The page should work well on a smartphone.

## Acceptance criteria
- [ ] Two text inputs accept Option A and Option B.
- [ ] The choose button does not produce a result while either input is empty; the UI explains what is missing.
- [ ] With both options present, pressing the button displays exactly one of the entered options.
- [ ] A user can run another choice without reloading the page.
- [ ] The result is visually distinguishable from the inputs.
- [ ] The app is usable on a narrow mobile viewport.
- [ ] Automated tests cover the selection logic and the empty-input failure case.
- [ ] Repository verification passes.

## Technical freedom
Choose the smallest reasonable implementation and toolchain. Do not add a framework merely because one is familiar. The task is intentionally small so the experiment can observe how the agent chooses structure and verification.

## Out of scope
- Accounts, persistence, analytics, backend services, databases, deployment infrastructure, animations, or broad design systems.
