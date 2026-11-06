"use client";
import { useState } from "react";
import { checkedCheckout, type CheckoutCapture } from "@/lib/linked-evidence";
const names: Record<string, string> = {
  replay: "Same request again",
  concurrent: "Three requests together",
  "changed-payload": "Same key, changed payload",
};
const explanations: Record<string, string> = {
  replay:
    "The second request returned the existing order. Stock changed once and the cart stayed empty.",
  concurrent:
    "Three requests arrived concurrently. One created the order and two returned it. Statuses are a sorted result set, not a timeline.",
  "changed-payload":
    "The key already identified the original checkout. A changed shipping payload was rejected with 409; the original order and stock remained intact.",
};
export default function CheckoutOutcomes({
  capture,
}: {
  capture: CheckoutCapture;
}) {
  const cases = checkedCheckout(capture);
  const [selected, setSelected] = useState("replay");
  const item = cases.find((entry) => entry.id === selected)!;
  return (
    <section
      className="failure-evidence"
      id="business-outcomes"
      aria-labelledby="checkout-outcome-heading"
    >
      <div className="failure-section-intro">
        <p className="failure-kicker">
          BUSINESS OUTCOMES / THREE RECORDED CHECKS
        </p>
        <h2 id="checkout-outcome-heading">One order is the business result.</h2>
        <p>
          Inspect more than a status code. These separate recorded checks
          queried order history, stock and the cart after checkout.
        </p>
      </div>
      <div
        className="failure-mode-switch"
        role="group"
        aria-label="Recorded checkout scenarios"
      >
        {cases.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={selected === entry.id}
            onClick={() => setSelected(entry.id)}
          >
            {names[entry.id]}
          </button>
        ))}
      </div>
      <article className="linked-outcome" aria-live="polite">
        <h3>{names[item.id]}</h3>
        <p>{explanations[item.id]}</p>
        <dl className="linked-metrics">
          <div>
            <dt>Orders persisted</dt>
            <dd>{item.orderCount}</dd>
          </div>
          <div>
            <dt>Notebook stock</dt>
            <dd>
              {item.stockBefore} → {item.stockAfter}
              <small>Reduced by {item.stockReduction}, once</small>
            </dd>
          </div>
          <div>
            <dt>Cart items after</dt>
            <dd>{item.cartCount}</dd>
          </div>
          <div>
            <dt>
              {item.id === "concurrent"
                ? "Concurrent response set"
                : "Response sequence"}
            </dt>
            <dd className="linked-statuses">
              {item.requestStatuses.join(" / ")}
            </dd>
          </div>
        </dl>
      </article>
      <p className="failure-small">
        Recorded {capture.capturedAt.slice(0, 10)} · actual local PostgreSQL ·
        authored synthetic checks. These captures are separate from the
        injected-defect record above.
      </p>
      <div className="failure-actions">
        <a
          className="failure-inline-link"
          href="/evidence/checkout-scenarios.json"
          download="eai-checkout-scenarios.json"
        >
          Download the three captured checks
        </a>
        <a
          className="failure-inline-link"
          href={`${capture.source.repository}/blob/${capture.source.commit}/scripts/capture-checkout-scenarios.ts`}
          target="_blank"
          rel="noreferrer"
        >
          Inspect their exact capture source ↗
        </a>
      </div>
    </section>
  );
}
