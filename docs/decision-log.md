# Decision log

Record non-obvious implementation decisions future agents need to understand.

## 2026-08-31 — Trial a CSV summarizer rather than a reporting application

The task provides no source-data or final-report format. A dependency-free CLI
that sums a deliberately narrow CSV contract is reversible and can test whether
aggregation is a meaningful source of effort. Building collection UI, storage,
or organization-specific report logic would assume facts not in evidence.
