import type { Metadata } from "next";
import Link from "next/link";
import RetryExplorer from "@/components/engineering/RetryExplorer";
import CheckoutOutcomes from "@/components/engineering/CheckoutOutcomes";
import checkoutCapture from "../../../../public/evidence/checkout-scenarios.json";
import recorded from "../../../../public/evidence/order-once.json";
import {
  storySources,
  summarizeOrderOnce,
  type OrderOnceCapture,
} from "@/lib/engineering-story";
import "./story.css";

const capture: OrderOnceCapture = recorded;
const summary = summarizeOrderOnce(capture);
const sources = storySources(capture.source.commit);
export const metadata: Metadata = {
  title: "The order that should happen only once | eAI Engineering",
  description:
    "Predict a checkout retry, compare a protected implementation with an injected duplicate-order defect, and inspect recorded PostgreSQL evidence and pinned source code.",
  alternates: {
    canonical: "https://www.eai.engineering/engineering/order-once",
  },
  openGraph: {
    title: "One order. Two requests. Inspect the engineering.",
    description:
      "An interactive engineering case study by Erdal Kilic. Recorded local evidence, independent assertions, and source you can inspect.",
    url: "https://www.eai.engineering/engineering/order-once",
    type: "article",
    images: [
      {
        url: "https://www.eai.engineering/images/engineering/order-once-share.png",
        width: 1200,
        height: 630,
        alt: "eAI engineering case study: one order, two requests",
      },
    ],
  },
};

function RetryDiagram() {
  return (
    <div
      className="failure-diagram"
      aria-label="Illustrative request flow: the same key is sent twice, and both requests resolve to one order"
    >
      <div className="failure-diagram-top">
        <span>REQUEST FLOW</span>
        <span>Illustrative</span>
      </div>
      <div className="failure-diagram-row">
        <span className="failure-diagram-number">01</span>
        <div>
          <strong>Checkout</strong>
          <code>key: journey-key-one</code>
        </div>
        <span aria-hidden="true">→</span>
        <b>201</b>
      </div>
      <div className="failure-diagram-line" aria-hidden="true" />
      <div className="failure-diagram-row">
        <span className="failure-diagram-number">02</span>
        <div>
          <strong>Retry</strong>
          <code>same customer · same key</code>
        </div>
        <span aria-hidden="true">→</span>
        <b>200</b>
      </div>
      <div className="failure-diagram-order">
        <span aria-hidden="true">◇</span>
        <div>
          <strong>One durable order</strong>
          <small>The second request confirms the first.</small>
        </div>
      </div>
      <p>No second purchase. No second stock decrement.</p>
    </div>
  );
}

export default function OrderOncePage() {
  return (
    <main className="failure-story" id="story-top">
      <a className="failure-skip" href="#predict">
        Skip to the interactive case study
      </a>
      <header className="failure-header">
        <Link href="/" className="failure-brand" aria-label="eAI home">
          eAI<span>Intelligence Engineered</span>
        </Link>
        <nav aria-label="Case study navigation">
          <a href="#predict">The retry</a>
          <a href="#evidence">The evidence</a>
          <a href="#decisions">The decision</a>
          <a href="#source">The code</a>
        </nav>
        <Link className="failure-header-back" href="/engineering#projects">
          Engineering Studio <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <section className="failure-hero">
        <div>
          <p className="failure-kicker">FOLLOW A FAILURE / CASE 01</p>
          <h1>
            The order that should happen <em>only once.</em>
          </h1>
          <p className="failure-lead">
            A checkout retry tests more than a button. Follow the request,
            predict the outcome, and inspect what the test observed.
          </p>
          <div className="failure-actions">
            <a href="#predict" className="failure-button is-primary">
              Explore the failure <span aria-hidden="true">↓</span>
            </a>
            <a href="#brief" className="failure-button">
              The 60-second brief
            </a>
          </div>
          <p className="failure-byline">
            An engineering case study by <strong>Erdal Kilic</strong>
            <br />
            Playwright · TypeScript · PostgreSQL
          </p>
        </div>
        <RetryDiagram />
      </section>
      <div className="failure-provenance" aria-label="Evidence scope">
        <span>
          <i aria-hidden="true" />
          Recorded local execution
        </span>
        <span>Authored regression journey</span>
        <span>Injected defect, separate schema</span>
        <span>No live AI or real payments</span>
      </div>
      <aside
        className="failure-brief"
        id="brief"
        aria-labelledby="brief-heading"
      >
        <p className="failure-kicker">THE 60-SECOND BRIEF</p>
        <h2 id="brief-heading">Retries are a business rule.</h2>
        <p>
          The protected implementation returns the existing order for a matching
          checkout key and payload. An injected defect creates a different order
          on replay. The captured test catches the change in response status and
          order identity. The repair belongs in the server transaction and
          stored key—not in a disabled checkout button.
        </p>
        <dl>
          <div>
            <dt>Healthy retry</dt>
            <dd>200 · same order</dd>
          </div>
          <div>
            <dt>Injected defect</dt>
            <dd>201 · different order</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>Local PostgreSQL run</dd>
          </div>
        </dl>
      </aside>
      <RetryExplorer capture={capture} />
      <CheckoutOutcomes capture={checkoutCapture} />
      <section
        className="failure-evidence"
        id="evidence"
        aria-labelledby="evidence-heading"
      >
        <div className="failure-section-intro">
          <p className="failure-kicker">02 / INSPECT THE EVIDENCE</p>
          <h2 id="evidence-heading">The assertion tells the story.</h2>
          <p>
            These values come from a captured run of <code>J-REPLAY</code>.
            Switching the comparison above reveals this record; it does not
            execute tests on this website.
          </p>
        </div>
        <div className="failure-evidence-grid">
          <article className="failure-evidence-card">
            <div className="failure-card-heading">
              <span className="failure-kicker">EXPECTED ON RETRY</span>
              <span className="failure-badge">Independent model</span>
            </div>
            <h3>Reuse the original result</h3>
            <pre>{JSON.stringify(capture.divergence.expected, null, 2)}</pre>
            <p>
              The reference model derives expectations without importing
              application or store code.
            </p>
          </article>
          <article className="failure-evidence-card is-fault">
            <div className="failure-card-heading">
              <span className="failure-kicker">
                OBSERVED WITH INJECTED DEFECT
              </span>
              <span className="failure-badge">First divergence</span>
            </div>
            <h3>A different order was created</h3>
            <pre>{JSON.stringify(capture.divergence.actual, null, 2)}</pre>
            <p>
              Step {capture.divergence.index} · second checkout · the runner
              stops at the first mismatch.
            </p>
          </article>
        </div>
        <details className="failure-record">
          <summary>Capture identity, full step record and reproduction</summary>
          <dl>
            <div>
              <dt>Captured</dt>
              <dd>
                <time dateTime={capture.generatedAt}>
                  {new Date(capture.generatedAt)
                    .toISOString()
                    .replace("T", " ")
                    .replace(/\.\d+Z$/, " UTC")}
                </time>
              </dd>
            </div>
            <div>
              <dt>Run ID</dt>
              <dd>
                <code>{capture.runId}</code>
              </dd>
            </div>
            <div>
              <dt>Journey hash</dt>
              <dd>
                <code>{capture.hash}</code>
              </dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                {capture.source.tag} · <code>{capture.source.commit}</code>
              </dd>
            </div>
            <div>
              <dt>Provenance</dt>
              <dd>Authored offline example · 0 model calls · PostgreSQL</dd>
            </div>
          </dl>
          <div
            className="failure-table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Recorded checkout steps"
          >
            <table>
              <caption>
                Checkout observations from the healthy and injected-fault runs
              </caption>
              <thead>
                <tr>
                  <th scope="col">Run</th>
                  <th scope="col">Step</th>
                  <th scope="col">Expected status</th>
                  <th scope="col">Observed status</th>
                  <th scope="col">Original identity</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...summary.control.map((step) => ({
                    ...step,
                    run: "Healthy control",
                  })),
                  ...summary.faulty.map((step) => ({
                    ...step,
                    run: "Injected defect",
                  })),
                ].map((step) => (
                  <tr key={`${step.run}-${step.index}`}>
                    <td>{step.run}</td>
                    <td>{step.index}</td>
                    <td>{step.expected.status}</td>
                    <td>{step.actual.status}</td>
                    <td>
                      {step.actual.sameOrder === undefined
                        ? "Initial creation"
                        : step.actual.sameOrder
                          ? "Same order"
                          : "Different order"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3>Reproduce locally</h3>
          <pre>{`git clone ${capture.source.repository}.git
cd playwright-ai-automation
git checkout ${capture.source.tag}
npm ci
npm run db:local:start
${capture.reproduction}`}</pre>
          <p>
            Requires Node.js 22+, installed PostgreSQL binaries and local
            project dependencies. Synthetic data only. No paid API or cloud
            deployment is required.
          </p>
          <a
            className="failure-inline-link"
            href="/evidence/order-once.json"
            download="eai-order-once-evidence.json"
          >
            Download the complete safe JSON record{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </details>
      </section>
      <section
        id="decisions"
        className="failure-decisions"
        aria-labelledby="decisions-heading"
      >
        <div className="failure-section-intro">
          <p className="failure-kicker">03 / UNDERSTAND THE DECISION</p>
          <h2 id="decisions-heading">Keep the promise on the server.</h2>
          <p>
            Disabling a button improves the interface. It cannot protect against
            a retry, a second tab, or two requests arriving together.
          </p>
        </div>
        <div className="failure-decision-list">
          <article>
            <span>01</span>
            <div>
              <h3>Scope the key to the customer</h3>
              <p>
                The stored key is unique within its customer. A matching key and
                payload return the existing order; a changed shipping payload
                conflicts. A second customer can independently use the same key.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Serialize the critical work</h3>
              <p>
                A customer row lock coordinates concurrent same-customer
                checkout. Inventory rows follow a stable lock order. The
                transaction creates the order, changes stock and clears the cart
                together.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Test the failure, not just the happy path</h3>
              <p>
                The separate reference model expects replay behavior. A curated
                fault deliberately creates a new order on replay. The mismatch
                exposes what a status-only or button-only check could miss.
              </p>
            </div>
          </article>
        </div>
        <div className="failure-limits">
          <h3>The tradeoff—and the boundary</h3>
          <p>
            Serializing checkout per customer simplifies correctness at the cost
            of same-customer concurrency. This guarantee is scoped to the stored
            order/key and this local database transaction. It is not a claim of
            exactly-once delivery across distributed systems.
          </p>
          <p>
            Payments are simulated. A real payment provider needs its own
            idempotency, reconciliation and failure handling. Multi-region
            behavior, production identity and load limits are outside this
            demonstration. The unclear response in the opening scenario is
            illustrative; this captured run tests request replay, not a dropped
            network response.
          </p>
        </div>
      </section>
      <section
        id="source"
        className="failure-sources"
        aria-labelledby="source-heading"
      >
        <div className="failure-section-intro">
          <p className="failure-kicker">04 / REVIEW THE WORK</p>
          <h2 id="source-heading">Follow the claim into the code.</h2>
          <p>
            Links are pinned to {capture.source.tag}, not a moving default
            branch.
          </p>
        </div>
        <div className="failure-source-grid">
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">↗</span>
              <h3>{source.label}</h3>
              <p>{source.description}</p>
            </a>
          ))}
        </div>
      </section>
      <section
        className="failure-decisions"
        aria-labelledby="order-contribution-heading"
      >
        <p className="failure-kicker">THE ENGINEERING WORK</p>
        <h2 id="order-contribution-heading">
          What this project brings together.
        </h2>
        <p>
          The repository implements the commerce API, PostgreSQL store,
          independent journey model, test fixtures, controlled defects and local
          evidence runner. AI development assistance supported implementation;
          the runtime examples are authored and do not call a live model.
        </p>
        <p>
          The choices prioritize transactional consistency, isolated test data
          and inspectable assertions. Production adoption would add real
          identity, payment-provider coordination, operational controls and
          workload-specific validation.
        </p>
      </section>
      <section className="failure-related" aria-labelledby="related-heading">
        <p className="failure-kicker">THE PRINCIPLE TRAVELS</p>
        <h2 id="related-heading">
          A different domain. The same retry question.
        </h2>
        <p>
          The healthcare platform applies idempotency to claims ingestion with
          PostgreSQL and simulated queue services. Its replay contract differs:
          repeated matching claims return 201. The shared principle is durable
          deduplication—not identical status codes.
        </p>
        <div className="failure-actions">
          <Link
            className="failure-button is-primary"
            href="/engineering/claim-twice"
          >
            Follow the healthcare case ↗
          </Link>
          <a
            className="failure-button"
            href="https://github.com/kilicerdal/ai-healthcare-quality-platform"
            target="_blank"
            rel="noreferrer"
          >
            Inspect the healthcare project <span aria-hidden="true">↗</span>
          </a>
          <a
            className="failure-inline-link"
            href={`${capture.source.repository}/releases/tag/v5.0.0`}
            target="_blank"
            rel="noreferrer"
          >
            Explore the full local V5 showcase ↗
          </a>
        </div>
        <p className="failure-small">
          This page is a static evidence experience. It does not submit checkout
          requests, call an AI model or start cloud services.
        </p>
      </section>
      <footer className="failure-footer">
        <Link href="/">eAI / Intelligence Engineered</Link>
        <p>Built by Erdal Kilic · Quality engineering &amp; applied AI</p>
        <a href="#story-top">Back to top ↑</a>
      </footer>
    </main>
  );
}
