import test from "node:test";
import assert from "node:assert/strict";

import { createTimer, formatDuration } from "../app.js";

function clock(...times) {
  return () => times.shift();
}

test("rejects an empty or whitespace-only task name", () => {
  const timer = createTimer(clock(100));
  assert.deepEqual(timer.start("   "), { error: "Enter a task name before starting." });
  assert.equal(timer.getState().activeSession, null);
});

test("starts a named session and prevents a simultaneous second session", () => {
  const timer = createTimer(clock(100));
  assert.deepEqual(timer.start("  Write notes  "), {
    activeSession: { task: "Write notes", startedAt: 100 },
  });
  assert.deepEqual(timer.start("Another task"), {
    error: "Stop the current session before starting another.",
  });
  assert.equal(timer.getState().activeSession.task, "Write notes");
});

test("stops an active session exactly once with a non-negative duration", () => {
  const timer = createTimer(clock(100, 90));
  timer.start("Review");
  assert.deepEqual(timer.stop(), {
    session: { task: "Review", startedAt: 100, durationMs: 0 },
  });
  assert.deepEqual(timer.stop(), { error: "There is no active session to stop." });
  assert.equal(timer.getState().completedSessions.length, 1);
});

test("records multiple sessions most-recent-first and totals their durations", () => {
  const timer = createTimer(clock(100, 2100, 3000, 6500));
  timer.start("First");
  timer.stop();
  timer.start("Second");
  timer.stop();

  const state = timer.getState();
  assert.deepEqual(state.completedSessions.map(({ task }) => task), ["Second", "First"]);
  assert.deepEqual(state.completedSessions.map(({ durationMs }) => durationMs), [3500, 2000]);
  assert.equal(state.totalDurationMs, 5500);
});

test("formats zero, sub-minute, and minute durations meaningfully", () => {
  assert.equal(formatDuration(0), "0 sec");
  assert.equal(formatDuration(12_900), "12 sec");
  assert.equal(formatDuration(60_000), "1 min");
  assert.equal(formatDuration(125_000), "2 min 5 sec");
});
