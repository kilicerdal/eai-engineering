import Image from "next/image";
import Link from "next/link";
import ProjectOwnership from "@/components/engineering/ProjectOwnership";
import { publicPageMetadata } from "@/lib/public-metadata";
import evidence from "../../../../public/evidence/agent-reliability-lab.json";
import "../../threshold.css";
import "../main-showcase.css";
import "../studio.css";
import "./lab.css";

const preview = "/images/engineering/agent-reliability-lab.png";
const title = "AI Agent Reliability Lab";
const { evaluation, approval, source, viewer } = evidence;
const baseline = evaluation.baseline;
const recovery = evaluation.recovery;
const invoice = evaluation.incidentResults["invoice-window"];
const orphan = evaluation.incidentResults["orphan-alert"];

export const metadata = publicPageMetadata(
  "/engineering/agent-reliability-lab",
  `${title} | eAI Engineering`,
  "Inspect a synthetic incident investigation, compare held-out reliability results, and replay an operator-approved worker restart.",
  preview,
);

export default function AgentReliabilityLab() {
  return (
    <main className="threshold">
      <header className="studio-page-header">
        <Link href="/" className="atlas-brand"><span>eAI</span><small>Intelligence Engineered</small></Link>
        <nav aria-label="Site navigation">
          <Link href="/engineering">Engineering Studio</Link>
          <Link href="/engineering/projects">Project directory</Link>
        </nav>
      </header>
      <section className="main-section" aria-labelledby="lab-heading">
        <div className="main-wrap">
          <div className="main-split lab-intro">
            <div>
              <p className="atlas-eyebrow">AI SYSTEMS ASSURANCE · {source.tag}</p>
              <h1 id="lab-heading">{title}</h1>
              <p>I built a synthetic order-processing system, an AI investigator, and a separate evaluator that checks the diagnosis against the recorded evidence. I added scoped MCP tools and an operator approval step for restarting the worker.</p>
              <div className="lab-links">
                <a href={viewer} className="lab-primary">Open the live evidence viewer <span aria-hidden="true">↗</span></a>
                <a href={source.repository}>View GitHub repository <span aria-hidden="true">↗</span></a>
              </div>
              <p className="main-small">Python · PostgreSQL · MCP · Next.js. The public viewer uses recorded evidence and makes no model calls.</p>
            </div>
            <figure className="lab-preview">
              <a href={viewer} aria-label="Open the recorded viewer shown in the screenshot">
                <Image src={preview} width={1440} height={1050} sizes="(max-width: 760px) 90vw, 550px" alt="Agent Reliability Lab viewer showing 23 of 24 grounded diagnoses and a selector for recorded investigations" />
              </a>
              <figcaption>V4.0 viewer capture.</figcaption>
            </figure>
          </div>
          <section className="lab-evidence" id="evidence" aria-labelledby="lab-results">
            <h2 id="lab-results">What the recorded checks showed</h2>
            <div className="lab-results">
              <article className="main-replay-panel">
                <p className="atlas-eyebrow">V2 · Held-out evaluation</p>
                <h3>{baseline.strict_pass}/{baseline.runs} → {recovery.strict_pass}/{recovery.runs}</h3>
                <p>Correct, grounded diagnoses rose from {baseline.strict_pass}/{baseline.runs} with the V1 prompt to {recovery.strict_pass}/{recovery.runs} with recovery guidance. Recovery after a tool failure or stale conflict rose from {baseline.recovered}/{baseline.failure_exposed} to {recovery.recovered}/{recovery.failure_exposed}.</p>
                <p>Both prompts used the same model on {evaluation.incidents} held-out synthetic incidents with {evaluation.repeats} runs per incident and prompt. Invoice Window improved from {invoice.baseline.passed}/{invoice.baseline.runs} to {invoice.recovery.passed}/{invoice.recovery.runs}, and Orphan Alert improved from {orphan.baseline.passed}/{orphan.baseline.runs} to {orphan.recovery.passed}/{orphan.recovery.runs}. The other six incidents tied.</p>
                <p>Open any of the {evaluation.failedTrials} failed trials to see the expected cause, the model’s answer, cited evidence, and tool trace.</p>
                <div className="lab-links">
                  <a href={`${viewer}#comparison`}>Compare results by incident <span aria-hidden="true">↗</span></a>
                  <a href={`${viewer}#failure-select`}>Explore all {evaluation.failedTrials} failed trials <span aria-hidden="true">↗</span></a>
                </div>
              </article>
              <article className="main-replay-panel">
                <p className="atlas-eyebrow">V3 · Scoped MCP and approval</p>
                <h3>One restart. One completed order.</h3>
                <p>Pending and incorrect confirmations left the order queued. Two concurrent valid confirmations applied {approval.completed.restart_events} restart. Two worker ticks produced {approval.completed.completion_events} completion.</p>
                <p>The MCP server rejected {approval.deniedMcpCalls} out-of-contract calls and PostgreSQL denied {approval.deniedDatabaseUpdates} prohibited updates. The model returned the correct grounded diagnosis and filed no restart request in all {approval.trials.injected.runs} injected trials and {approval.trials.control.runs} matched controls.</p>
                <a href={`${viewer}#approval`}>Replay the approval and inspect the checks <span aria-hidden="true">↗</span></a>
              </article>
            </div>
            <p className="main-small">The V2 counts describe repeated runs on eight synthetic fixtures. V3 covers one incident type and three simple injected notes. The test harness entered operator confirmations by script.</p>
            <div className="lab-links">
              <a href={evaluation.report}>V2 report <span aria-hidden="true">↗</span></a>
              <a href={approval.report}>V3 report <span aria-hidden="true">↗</span></a>
              <a href={approval.capture}>Approval evidence <span aria-hidden="true">↗</span></a>
              <a href={`${source.repository}/releases/tag/${source.tag}`}>V4.1 release <span aria-hidden="true">↗</span></a>
              <a href="/evidence/agent-reliability-lab.json">Evidence index <span aria-hidden="true">↗</span></a>
            </div>
          </section>
          <ProjectOwnership projectId="agent-reliability" anchor />
        </div>
      </section>
      <footer className="atlas-footer">
        <Link href="/engineering/projects">Browse projects</Link>
        <small>eAI Engineering · Erdal Kilic</small>
      </footer>
    </main>
  );
}
