import test from "node:test";
import assert from "node:assert/strict";

import { chooseOption } from "../app.js";

test("selects exactly one of the supplied options", () => {
  assert.deepEqual(chooseOption("Tea", "Coffee", () => 0.1), { choice: "Tea" });
  assert.deepEqual(chooseOption("Tea", "Coffee", () => 0.9), { choice: "Coffee" });
});

test("reports every empty option instead of choosing", () => {
  assert.deepEqual(chooseOption("", "Coffee", () => 0.1), {
    error: "Enter Option A before choosing.",
  });
  assert.deepEqual(chooseOption("Tea", "   ", () => 0.9), {
    error: "Enter Option B before choosing.",
  });
  assert.deepEqual(chooseOption("", ""), {
    error: "Enter Option A and Option B before choosing.",
  });
});
