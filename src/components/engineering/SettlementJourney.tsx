"use client";
import { useState } from "react";
import capture from "../../../public/evidence/settlement-journey.json";

export default function SettlementJourney() {
  const [index, setIndex] = useState(1);
  const stage = capture.stages[index];
  return <section id="journey" className="failure-evidence settlement-journey" aria-labelledby="journey-title">
    <p className="failure-kicker">01 / FOLLOW THE RECORDED JOURNEY</p>
    <h2 id="journey-title">Agreement is a stage.<br />Settlement is the outcome.</h2>
    <p>Explore seven snapshots from an actual local run. Selecting a stage reveals recorded evidence; it does not execute a financial transaction.</p>
    <div className="settlement-stage-buttons" aria-label="Recorded lifecycle stages">
      {capture.stages.map((s, i) => <button key={s.version} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}><span>0{i+1}</span>{s.label}</button>)}
    </div>
    <div className="settlement-observation" role="status" aria-live="polite" aria-atomic="true">
      <div><p className="failure-kicker">STEP {index+1} / VERSION {stage.version}</p><h3>{stage.label}</h3><span className={`settlement-state ${stage.state}`}>{stage.state}</span><p>{stage.reason || (stage.state === "SETTLED" ? "Cash and securities were consumed atomically. The settlement record exists exactly once." : "The lifecycle guard accepted this transition. The next operation has its own preconditions.")}</p></div>
      <dl><div><dt>Broker quantity</dt><dd>{stage.quantity.toLocaleString("en-US")}</dd></div><div><dt>Allocated quantity</dt><dd>{stage.allocation_total.toLocaleString("en-US")}</dd></div><div><dt>Available cash</dt><dd>{new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(stage.cash_cents/100)}</dd></div><div><dt>Available securities</dt><dd>{stage.securities.toLocaleString("en-US")}</dd></div></dl>
    </div>
    <p className="failure-small">After settlement, a supplied synthetic statement reconciled as <strong>{capture.reconciliation.status}</strong>. This capture uses fictional records, a weekday-only calendar, and trade-scoped balances.</p>
    <a className="failure-inline-link" href="/evidence/settlement-journey.json" download>Download the recorded lifecycle evidence ↗</a>
  </section>;
}
