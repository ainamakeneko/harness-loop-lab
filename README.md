# Monthly activity report experiment

This repository contains a small, dependency-free experiment for replacing one
piece of manual monthly reporting: adding together activity counts. It does not
try to replace how staff collect, review, or publish their report.

## Assumptions and input

No organization-specific source format was provided. The experiment assumes
staff can export or paste their observations into a CSV file with exactly these
columns:

```csv
date,activity,count
2026-07-01,Phone calls,4
2026-07-15,Phone calls,3
2026-07-15,Site visits,2
```

Dates use `YYYY-MM-DD`; activity names must be consistent; and counts are
non-negative whole numbers. A spreadsheet can save this format as CSV. Keep the
original file so a person can spot-check the result. The organization still
needs to confirm that these fields, whole-number counts, and sum-by-activity are
appropriate for its real report.

## Produce a report

With Node.js installed, run:

```sh
node monthly-report.js observations.csv 2026-07 > report-2026-07.csv
```

The output is a spreadsheet-compatible CSV with one total per activity:

```csv
month,activity,total
2026-07,Phone calls,7
2026-07,Site visits,2
```

Invalid rows stop the command with a line-specific error rather than producing
a possibly misleading total. Rows outside the requested month are ignored.

## Smallest real-world test

For one reporting period, one staff member should keep using the current method
and also run this command on a copy of the same observations. Record:

1. minutes spent preparing and checking each result;
2. disagreements in totals, resolved against the source observations; and
3. any rows that could not be represented without editing their meaning.

Adopt or extend the workflow only if the CSV result has correct totals, needs
less staff time, and does not omit required report information. Treat any wrong
total, unrepresentable required data, or no meaningful time saving as failure.
This reversible trial is smaller and safer than building an application,
database, accounts, or a new collection process before the actual inputs and
report requirements are known.

## Development

Run all configured checks with `bash scripts/verify.sh`.
