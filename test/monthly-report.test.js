import test from "node:test";
import assert from "node:assert/strict";

import { parseCsv, renderReport, summarizeMonthlyCsv } from "../monthly-report.js";

test("totals repeated activities for only the requested month", () => {
  const input = `date,activity,count\n2026-07-01,Calls,2\n2026-07-12,Calls,3\n2026-08-01,Calls,9\n2026-07-03,Visits,1\n`;
  assert.deepEqual(summarizeMonthlyCsv(input, "2026-07"), [["Calls", 5], ["Visits", 1]]);
});

test("handles spreadsheet CSV quoting and produces spreadsheet-compatible output", () => {
  const input = `date,activity,count\r\n2026-07-01,"Calls, outgoing",2\r\n2026-07-02,"Quote ""checks""",1\r\n`;
  assert.equal(parseCsv(input)[1][1], "Calls, outgoing");
  assert.equal(renderReport("2026-07", summarizeMonthlyCsv(input, "2026-07")),
    `month,activity,total\n2026-07,"Calls, outgoing",2\n2026-07,"Quote ""checks""",1\n`);
});

test("rejects malformed data rather than silently miscounting", () => {
  assert.throws(() => summarizeMonthlyCsv("date,activity,count\n2026-07-01,Calls,nope\n", "2026-07"),
    /Line 2 count must be a non-negative whole number/);
  assert.throws(() => summarizeMonthlyCsv("date,activity,count\n2026-02-30,Calls,2\n", "2026-02"),
    /Line 2 has an invalid date/);
  assert.throws(() => summarizeMonthlyCsv("activity,count\nCalls,2\n", "2026-07"),
    /header must be/);
  assert.throws(() => summarizeMonthlyCsv("date,activity,count\n", "July"), /YYYY-MM/);
});
