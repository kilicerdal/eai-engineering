import type { Metadata } from "next";
import Link from "next/link";
import ClaimRedeliveryExplorer from "@/components/engineering/ClaimRedeliveryExplorer";
import recorded from "../../../../public/evidence/claim-redelivery.json";
import { checkedClaims, type ClaimCapture } from "@/lib/linked-evidence";
import "../order-once/story.css";
const capture: ClaimCapture = recorded;
checkedClaims(capture);
const source = `${capture.source.repository}/blob/${capture.source.commit}`;
export const metadata: Metadata = {
  title: "The claim that arrived twice | eAI Engineering",
  description:
    "Follow a synthetic healthcare claim through an injected acknowledgement failure, local queue redelivery and PostgreSQL deduplication. Inspect recorded evidence and pinned source.",
  alternates: {
    canonical: "https://www.eai.engineering/engineering/claim-twice",
  },
  openGraph: {
    title: "The claim that arrived twice",
    description:
      "One claim record. Two deliveries. Local evidence you can inspect.",
    url: "https://www.eai.engineering/engineering/claim-twice",
    type: "article",
    images: [
      {
        url: "https://www.eai.engineering/images/engineering/claim-twice-share.png",
        width: 1200,
        height: 630,
        alt: "eAI engineering case study: the claim that arrived twice",
      },
    ],
  },
};
export default function ClaimTwicePage() {
  return (
    <main className="failure-story" id="story-top">
      <a className="failure-skip" href="#delivery">
        Skip to the recorded delivery stages
      </a>
      <header className="failure-header">
        <Link href="/" className="failure-brand" aria-label="eAI home">
          eAI<span>Intelligence Engineered</span>
        </Link>
        <nav aria-label="Case study navigation">
          <a href="#delivery">The delivery</a>
          <a href="#evidence">The evidence</a>
          <a href="#decisions">The decision</a>
          <a href="#source">The code</a>
        </nav>
        <Link className="failure-header-back" href="/#projects">
          All projects ↗
        </Link>
      </header>
      <section className="failure-hero">
        <div>
          <p className="failure-kicker">FOLLOW A FAILURE / CASE 02</p>
          <h1>
            The claim that arrived <em>twice.</em>
          </h1>
          <p className="failure-lead">
            The claim was stored. The acknowledgement failed. Follow what
            happens when the queue delivers the work again.
          </p>
          <div className="failure-actions">
            <a href="#delivery" className="failure-button is-primary">
              Follow the delivery ↓
            </a>
            <Link href="/engineering/order-once" className="failure-button">
              Compare the checkout story
            </Link>
          </div>
          <p className="failure-byline">
            An engineering case study by <strong>Erdal Kilic</strong>
            <br />
            Node.js · PostgreSQL · Local S3/SQS simulation
          </p>
        </div>
        <div className="failure-diagram">
          <div className="failure-diagram-top">
            <span>LOCAL INGESTION FLOW</span>
            <span>Moto simulation</span>
          </div>
          <div className="claim-flow">
            <span>Synthetic S3 object</span>
            <b aria-hidden="true">↓</b>
            <span>SQS message / worker</span>
            <b aria-hidden="true">↓</b>
            <span>Claims API → PostgreSQL</span>
          </div>
          <div className="failure-diagram-order">
            <span aria-hidden="true">◇</span>
            <div>
              <strong>One persisted claim</strong>
              <small>Redelivery returns the original identity.</small>
            </div>
          </div>
          <p>Architecture illustration. Recorded observations below.</p>
        </div>
      </section>
      <div className="failure-provenance">
        <span>
          <i aria-hidden="true" />
          Actual local capture
        </span>
        <span>PostgreSQL + Moto</span>
        <span>Synthetic data only</span>
        <span>No real AWS, patients or payments</span>
      </div>
      <aside className="failure-brief" aria-labelledby="claim-brief-heading">
        <p className="failure-kicker">THE 60-SECOND BRIEF</p>
        <h2 id="claim-brief-heading">An unacknowledged message can return.</h2>
        <p>
          Queue acknowledgement and database persistence do not share one
          transaction here. The worker derives an idempotency key from the
          bucket and object key. Re-delivery of unchanged content returns the
          existing claim; changed content at the same key conflicts. The
          database remains authoritative.
        </p>
        <dl>
          <div>
            <dt>Matching redelivery</dt>
            <dd>201 · same claim</dd>
          </div>
          <div>
            <dt>Changed content</dt>
            <dd>409 · original preserved</dd>
          </div>
          <div>
            <dt>Persisted records</dt>
            <dd>One throughout this capture</dd>
          </div>
        </dl>
      </aside>
      <ClaimRedeliveryExplorer capture={capture} />
      <section
        className="failure-evidence"
        id="evidence"
        aria-labelledby="claim-evidence-heading"
      >
        <div className="failure-section-intro">
          <p className="failure-kicker">02 / INSPECT THE RECORD</p>
          <h2 id="claim-evidence-heading">
            The database tells you what survived.
          </h2>
          <p>
            The API returned 201 on both matching deliveries. Claim identity and
            persisted row count establish deduplication; a repeated status code
            alone cannot.
          </p>
        </div>
        <div
          className="failure-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Claim redelivery evidence"
        >
          <table>
            <caption>
              Observed results from the local API, Moto and PostgreSQL capture
            </caption>
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">API response</th>
                <th scope="col">Claim records</th>
                <th scope="col">Stored amount</th>
              </tr>
            </thead>
            <tbody>
              {capture.stages.map((stage) => (
                <tr key={stage.id}>
                  <td>{stage.title}</td>
                  <td>{stage.apiStatus}</td>
                  <td>{stage.persistedClaims}</td>
                  <td>{stage.storedAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <details className="failure-record">
          <summary>Capture provenance and local reproduction</summary>
          <dl>
            <div>
              <dt>Captured</dt>
              <dd>
                <time dateTime={capture.capturedAt}>{capture.capturedAt}</time>
              </dd>
            </div>
            <div>
              <dt>Source commit</dt>
              <dd>
                <code>{capture.source.commit}</code>
              </dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>
                Authored synthetic local capture · 0 model calls · 0 real AWS
                calls
              </dd>
            </div>
          </dl>
          <p>{capture.setup}</p>
          <h3>Reproduce locally</h3>
          <pre>{`git clone ${capture.source.repository}.git
cd ai-healthcare-quality-platform
git checkout ${capture.source.commit}
npm ci
python3 -m venv .venv
.venv/bin/pip install -r requirements-simulator.txt
.venv/bin/moto_server -H 127.0.0.1 -p 4311
# In another terminal, with the disposable PostgreSQL lab on 55432:
npm run showcase:capture`}</pre>
          <p>
            The local eai_quality PostgreSQL lab is supplied by the Playwright
            showcase’s db:local:start command. The capture uses a fresh
            generated schema and cleans up its queue, object and schema. No real
            patient records or credentials are exported.
          </p>
          <a
            className="failure-inline-link"
            href="/evidence/claim-redelivery.json"
            download="eai-claim-redelivery.json"
          >
            Download the safe redelivery record ↗
          </a>
        </details>
      </section>
      <section
        className="failure-decisions"
        id="decisions"
        aria-labelledby="claim-decisions-heading"
      >
        <div className="failure-section-intro">
          <p className="failure-kicker">03 / UNDERSTAND THE DECISION</p>
          <h2 id="claim-decisions-heading">
            Let delivery repeat. Protect persistence.
          </h2>
        </div>
        <div className="failure-decision-list">
          <article>
            <span>01</span>
            <div>
              <h3>Derive a stable ingestion key</h3>
              <p>
                The worker hashes the source bucket and object key. Matching
                deliveries converge on the same stored key instead of creating a
                new claim identifier each time.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Resolve duplicates atomically</h3>
              <p>
                A PostgreSQL unique index and atomic upsert return the existing
                row for matching content. A request hash detects changed claim
                fields and returns 409 rather than silently replacing the
                original claim.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Acknowledge after successful processing</h3>
              <p>
                Failed processing remains unacknowledged. Later valid messages
                can still be processed. An acknowledgement failure is reported
                rather than being presented as successful completion.
              </p>
            </div>
          </article>
        </div>
        <div className="failure-limits">
          <h3>The boundary matters</h3>
          <p>
            This is a local simulation of at-least-once delivery. Deduplication
            lasts while the claim row is retained. A deployed dead-letter queue,
            production AWS permissions, real identity, operational alerting and
            patient-data controls are not demonstrated here.
          </p>
          <p>
            All data is synthetic. RECEIVED is an ingestion status, not
            approval, adjudication or payment. The captured amount is an input
            field. This case makes no medical, financial or compliance claim.
          </p>
        </div>
      </section>
      <section
        className="failure-sources"
        id="source"
        aria-labelledby="claim-source-heading"
      >
        <div className="failure-section-intro">
          <p className="failure-kicker">04 / REVIEW THE WORK</p>
          <h2 id="claim-source-heading">Inspect each part of the promise.</h2>
          <p>These links are pinned to the exact capture source commit.</p>
        </div>
        <div className="failure-source-grid">
          {[
            [
              "Claim API and atomic upsert",
              "app/server.js",
              "Inspect request hashes, replay responses and conflicts.",
            ],
            [
              "Queue acknowledgement ordering",
              "app/sqsClaimsProcessor.js",
              "Processing precedes acknowledgement; failures are retained and reported.",
            ],
            [
              "Bucket/object idempotency key",
              "app/claimsProcessor.js",
              "Follow the stable ingestion key into the API request.",
            ],
            [
              "Database uniqueness",
              "docker/init.sql",
              "Inspect the unique index on the idempotency key.",
            ],
            [
              "Capture and independent observations",
              "scripts/capture-redelivery.js",
              "Inspect the actual queue replay, HTTP outcomes and database queries.",
            ],
            [
              "Failure and retry regressions",
              "tests/integration/queueFailures.spec.js",
              "Inspect acknowledgement loss, changed content and later valid messages.",
            ],
          ].map(([title, path, description]) => (
            <a
              key={path}
              href={`${source}/${path}`}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">↗</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </a>
          ))}
        </div>
      </section>
      <section
        className="failure-decisions"
        aria-labelledby="claim-contribution-heading"
      >
        <p className="failure-kicker">THE ENGINEERING WORK</p>
        <h2 id="claim-contribution-heading">
          What this project brings together.
        </h2>
        <p>
          Input validation, parameterized persistence, response contracts,
          object ingestion, queue failure handling and reproducible local
          evidence are implemented in the repository. AI development assistance
          supported the work; the runtime evidence on this page comes from
          authored synthetic checks, not a live model.
        </p>
      </section>
      <section className="failure-related">
        <p className="failure-kicker">CONNECT THE STORIES</p>
        <h2>Same principle. Different contracts.</h2>
        <p>
          Checkout replay returns 200 for the original order. Claims ingestion
          returns 201 for the original claim. In both cases, verify identity and
          persisted state instead of assuming the status code alone proves
          correctness.
        </p>
        <div className="failure-actions">
          <Link
            className="failure-button is-primary"
            href="/engineering/order-once"
          >
            Follow the checkout failure ↗
          </Link>
          <a
            className="failure-button"
            href={capture.source.repository}
            target="_blank"
            rel="noreferrer"
          >
            Explore the healthcare repository ↗
          </a>
        </div>
        <p className="failure-small">
          Static recorded evidence. No live queue, model or cloud service is
          started by this page.
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
