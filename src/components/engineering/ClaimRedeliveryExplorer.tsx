"use client";
import { useState } from "react";
import { checkedClaims, type ClaimCapture } from "@/lib/linked-evidence";
const descriptions: Record<string, string> = {
  "ack-loss":
    "The API stored the claim. A deliberately failed acknowledgement made the message visible again. An acknowledgement failure did not undo the database commit.",
  redelivery:
    "The worker received the message again. The same bucket/object key produced the same idempotency key. The API returned the original claim, and acknowledgement succeeded.",
  "changed-object":
    "The object was replaced with changed content at the same key. The API returned 409. The worker withheld acknowledgement and preserved the original database record.",
};
const acknowledgementLabels: Record<string, string> = {
  "injected-failure": "Deliberately failed",
  succeeded: "Succeeded",
  "withheld-after-api-conflict": "Withheld after conflict",
};
export default function ClaimRedeliveryExplorer({
  capture,
}: {
  capture: ClaimCapture;
}) {
  const stages = checkedClaims(capture);
  const [selected, setSelected] = useState("ack-loss");
  const stage = stages.find((entry) => entry.id === selected)!;
  return (
    <section
      className="failure-evidence"
      id="delivery"
      aria-labelledby="delivery-heading"
    >
      <div className="failure-section-intro">
        <p className="failure-kicker">01 / FOLLOW THE DELIVERY</p>
        <h2 id="delivery-heading">
          Processing and acknowledgement are separate.
        </h2>
        <p>
          Explore three observed stages from the local Moto, API and PostgreSQL
          capture. These buttons reveal recorded results; they do not run a
          queue or contact AWS.
        </p>
      </div>
      <div
        className="failure-mode-switch"
        role="group"
        aria-label="Recorded claim delivery stages"
      >
        {stages.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={selected === entry.id}
            onClick={() => setSelected(entry.id)}
          >
            {index + 1}. {entry.title}
          </button>
        ))}
      </div>
      <article
        className={`linked-outcome ${selected === "changed-object" ? "linked-conflict" : ""}`}
        aria-live="polite"
      >
        <p className="failure-kicker">RECORDED LOCAL SIMULATION</p>
        <h3>{stage.title}</h3>
        <p>{descriptions[stage.id]}</p>
        <dl className="linked-metrics">
          <div>
            <dt>API response</dt>
            <dd>{stage.apiStatus}</dd>
          </div>
          <div>
            <dt>Claim records persisted</dt>
            <dd>{stage.persistedClaims}</dd>
          </div>
          <div>
            <dt>Stored claim amount</dt>
            <dd>{stage.storedAmount.toFixed(2)}<small>Synthetic input, not a payment</small></dd>
          </div>
          <div>
            <dt>Queue acknowledgement</dt>
            <dd className="linked-statuses">
              {acknowledgementLabels[stage.acknowledgement]}
            </dd>
          </div>
        </dl>
        <p className="linked-observation">
          {stage.sameClaimAsFirst === null
            ? "The conflicting request did not replace the original claim."
            : stage.sameClaimAsFirst
              ? "Claim identity matches the first persisted claim."
              : "Claim identity differs from the first claim."}
        </p>
      </article>
      <p className="failure-small">
        The capture deliberately releases message visibility immediately after
        the injected acknowledgement loss. It demonstrates deterministic
        redelivery in Moto, not timing or reliability measurements from real
        AWS.
      </p>
    </section>
  );
}
