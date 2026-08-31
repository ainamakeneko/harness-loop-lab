# Skill: harness-improve

Use only to apply explicitly approved harness proposals.

## Approval rule
Eligible proposals contain exactly `Status: APPROVED`. Do not treat implication, a PROPOSED file, or your own judgment as approval.

## Procedure
1. Read files in `docs/proposals/`.
2. Select only `Status: APPROVED`.
3. Re-read evidence and proposed change.
4. Confirm assumptions still match the repository.
5. Apply the smallest necessary change.
6. Prefer a reliable executable guardrail over prose when it has lower ambiguity.
7. Run `bash scripts/verify.sh`.
8. Change the proposal to `Status: APPLIED` and record files changed and verification result.
9. Append a compact entry to `docs/harness-changelog.md`.

If an approved proposal is stale or unsafe after repository changes, mark it `STALE` and explain why instead of forcing it through.

Before applying, check that the proposal encodes a reusable invariant/procedure, would have helped beyond one incident, and is unlikely to obstruct legitimate work.
