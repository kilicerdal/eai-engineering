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
const checkoutCapture = JSON.parse(
  readFileSync(
    new URL("../public/evidence/checkout-scenarios.json", import.meta.url),
    "utf8",
  ),
);
const claimCapture = JSON.parse(
  readFileSync(
    new URL("../public/evidence/claim-redelivery.json", import.meta.url),
    "utf8",
  ),
);
const { checkedCheckout, checkedClaims } = loadStudyModule("linked-evidence");
test("checkout business outcomes preserve one order, one deduction and an empty cart", () => {
  const cases = checkedCheckout(checkoutCapture);
  assert.deepEqual(
    cases.map((c) => c.id),
    ["replay", "concurrent", "changed-payload"],
  );
  assert.deepEqual(
    cases.find((c) => c.id === "concurrent").requestStatuses,
    [200, 200, 201],
  );
  assert.deepEqual(
    cases.find((c) => c.id === "changed-payload").requestStatuses,
    [201, 409],
  );
  for (const item of cases) {
    assert.equal(item.orderCount, 1);
    assert.equal(item.stockReduction, 2);
    assert.equal(item.cartCount, 0);
  }
});
test("claim capture preserves identity and one record across simulated redelivery and conflict", () => {
  const stages = checkedClaims(claimCapture);
  assert.deepEqual(
    stages.map((s) => s.apiStatus),
    [201, 201, 409],
  );
  assert.equal(stages[1].sameClaimAsFirst, true);
  assert.equal(stages[2].acknowledgement, "withheld-after-api-conflict");
  assert.ok(
    stages.every((s) => s.persistedClaims === 1 && s.storedAmount === 125.5),
  );
  assert.equal(claimCapture.realAWSCalls, 0);
});
test("linked evidence rejects fabricated cloud provenance or inconsistent stock state", () => {
  const bad = structuredClone(claimCapture);
  bad.realAWSCalls = 1;
  assert.throws(() => checkedClaims(bad));
  const inconsistent = structuredClone(checkoutCapture);
  inconsistent.cases[0].stockAfter = 999;
  assert.throws(() => checkedCheckout(inconsistent));
});
