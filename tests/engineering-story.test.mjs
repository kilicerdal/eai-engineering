import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadStudyModule } from "./load-study-module.mjs";
const { summarizeOrderOnce, storySources } =
  loadStudyModule("engineering-story");
const capture = JSON.parse(
  readFileSync(
    new URL("../public/evidence/order-once.json", import.meta.url),
    "utf8",
  ),
);
test("published replay evidence distinguishes one protected order from a faulty new creation", () => {
  const summary = summarizeOrderOnce(capture);
  assert.deepEqual(
    summary.control.map((step) => step.actual.status),
    [201, 200],
  );
  assert.equal(summary.control[1].actual.sameOrder, true);
  assert.deepEqual(
    summary.faulty.map((step) => step.actual.status),
    [201, 201],
  );
  assert.equal(summary.faulty[1].actual.sameOrder, false);
  assert.equal(summary.orderCount, 1);
  assert.equal(summary.totalCents, 3600);
  assert.equal(summary.divergence.index, 4);
});
test("incomplete or untrusted evidence is never summarized as a verified replay", () => {
  for (const change of [
    (record) => {
      record.control.passed = false;
    },
    (record) => {
      record.modelCalls = 1;
    },
    (record) => {
      record.origin = "live-model-generated";
    },
    (record) => {
      record.fault.steps = record.fault.steps.filter(
        (step) => step.action !== "checkout",
      );
    },
    (record) => {
      record.control.hash = "changed";
    },
  ]) {
    const modified = structuredClone(capture);
    change(modified);
    assert.throws(() => summarizeOrderOnce(modified), /invalid|Incomplete/);
  }
});
test("public download excludes credentials and records exact reproduction and provenance", () => {
  const json = JSON.stringify(capture);
  assert.doesNotMatch(
    json,
    /demo-pass|postgresql:\/\/|atlas_session=|OPENAI_API_KEY|Synthetic Reviewer|123 Example Street/,
  );
  assert.equal(capture.backend, "postgres");
  assert.equal(capture.origin, "authored-offline-example");
  assert.equal(
    capture.reproduction,
    "npm run showcase:replay -- --journey=J-REPLAY --fault=duplicate-replay",
  );
  assert.match(capture.hash, /^[a-f0-9]{64}$/);
});
test("every code reference is pinned to the captured source commit", () => {
  const links = storySources(capture.source.commit);
  assert.equal(links.length, 6);
  for (const link of links) {
    assert.ok(
      link.href.startsWith(
        capture.source.repository + "/blob/" + capture.source.commit + "/",
      ),
    );
    assert.ok(!link.href.includes("/main/"));
  }
  assert.throws(() => storySources("main"), /full commit/);
});
