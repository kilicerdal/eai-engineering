"use client";

import { useRef, useState } from "react";
import {
  predictionOptions,
  predictionFeedback,
  summarizeOrderOnce,
  type OrderOnceCapture,
  type Prediction,
} from "@/lib/engineering-story";

export default function RetryExplorer({
  capture,
}: {
  capture: OrderOnceCapture;
}) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [mode, setMode] = useState<"control" | "fault">("control");
  const formRef = useRef<HTMLFormElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const summary = summarizeOrderOnce(capture);
  const steps = mode === "control" ? summary.control : summary.faulty;
  return (
    <section
      className="failure-lab"
      id="predict"
      aria-labelledby="prediction-heading"
    >
      <div className="failure-section-intro">
        <p className="failure-kicker">01 / MAKE A PREDICTION</p>
        <h2 id="prediction-heading">
          The customer retries.
          <br />
          What should happen?
        </h2>
        <p>
          Same customer. Same shipping payload. Same idempotency key. Two
          checkout requests.
        </p>
        <p className="failure-small">
          An unclear response is the illustrative setup. The captured regression
          repeats the request; it does not inject a network outage.
        </p>
      </div>
      <form
        ref={formRef}
        className="failure-prediction"
        onSubmit={(event) => {
          event.preventDefault();
          if (!prediction) return;
          setRevealed(true);
          requestAnimationFrame(() => resultHeading.current?.focus());
        }}
      >
        <fieldset disabled={revealed}>
          <legend>Choose the expected retry behavior</legend>
          {predictionOptions.map((option) => (
            <label
              key={option.id}
              className={`failure-answer ${prediction === option.id ? "is-selected" : ""}`}
            >
              <input
                type="radio"
                name="prediction"
                value={option.id}
                checked={prediction === option.id}
                onChange={() => setPrediction(option.id)}
              />
              <span>
                <strong>{option.title}</strong>
                <small>{option.detail}</small>
              </span>
            </label>
          ))}
        </fieldset>
        {!revealed ? (
          <>
            <button
              className="failure-button is-primary"
              disabled={!prediction}
            >
              Reveal recorded result <span aria-hidden="true">→</span>
            </button>
            <p className="failure-small">
              Choose an outcome, or{" "}
              <a href="#evidence">inspect the evidence directly</a>. Nothing is
              sent to a model.
            </p>
          </>
        ) : (
          <button
            className="failure-text-button"
            type="button"
            onClick={() => {
              setRevealed(false);
              setPrediction(null);
              setMode("control");
              requestAnimationFrame(() =>
                formRef.current
                  ?.querySelector<HTMLInputElement>("input")
                  ?.focus(),
              );
            }}
          >
            Try the prediction again
          </button>
        )}
      </form>
      {revealed && (
        <div className="failure-reveal">
          <p className="failure-kicker">
            RECORDED LOCAL EXECUTION · NOT A LIVE TEST
          </p>
          <h3 ref={resultHeading} tabIndex={-1}>
            {mode === "fault"
              ? "When a retry becomes another order."
              : prediction === "reuse"
                ? "One order. A confirmed retry."
                : "A retry can confirm the original order."}
          </h3>
          <p className="failure-feedback" role="status">
            {predictionFeedback(prediction!)}
          </p>
          <div
            className="failure-mode-switch"
            role="group"
            aria-label="Compare recorded implementations"
          >
            <button
              type="button"
              aria-pressed={mode === "control"}
              onClick={() => setMode("control")}
            >
              Protected implementation
            </button>
            <button
              type="button"
              aria-pressed={mode === "fault"}
              onClick={() => setMode("fault")}
            >
              Injected duplicate defect
            </button>
          </div>
          <div
            className={`failure-response-grid ${mode === "fault" ? "has-fault" : ""}`}
          >
            {steps.map((step, index) => (
              <article
                key={`${mode}-${step.index}`}
                className="failure-response"
              >
                <p className="failure-kicker">
                  {index === 0 ? "FIRST CHECKOUT" : "SAME-KEY RETRY"}
                </p>
                <span className="failure-http">HTTP {step.actual.status}</span>
                <h4>
                  {index === 0
                    ? "Order created"
                    : step.actual.sameOrder
                      ? "Original order returned"
                      : "Different order created"}
                </h4>
                <p>
                  {index === 0
                    ? "The first request creates the order."
                    : step.actual.sameOrder
                      ? "Identity matches the original order."
                      : "Identity differs from the original order."}
                </p>
                <code>POST /api/orders</code>
              </article>
            ))}
          </div>
          <p className="failure-result-note">
            {mode === "control"
              ? "The healthy run also observed one order in history and an empty cart. The database state was checked after replay."
              : "The injected implementation diverged on the second checkout. The runner stopped at that mismatch; later database counts were not recorded for this faulty run."}
          </p>
          <a className="failure-inline-link" href="#evidence">
            Inspect the captured assertions <span aria-hidden="true">↓</span>
          </a>
        </div>
      )}
    </section>
  );
}
