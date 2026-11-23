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
const { evaluation, approval, source, viewer, blindEvaluation, modelComparison, evidenceHandoff } = evidence;
const baseline = evaluation.baseline;
const recovery = evaluation.recovery;
const { sol, luna } = modelComparison.models;
const { restart, handoff } = evidenceHandoff.arms;
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
          <nav className="lab-evidence main-replay-panel" id="five-minute-demo" aria-labelledby="lab-demo-heading">
            <h2 id="lab-demo-heading">Five-minute demo</h2>
            <div className="lab-links">
              <a href={`${viewer}#failed-trial-invoice-window/recovery/3`}>Inspect a failed diagnosis <span aria-hidden="true">↗</span></a>
              <a href={`${viewer}#evidence-handoff`}>Compare the evidence handoff <span aria-hidden="true">↗</span></a>
              <a href={`${viewer}#approval`}>Replay an approved restart <span aria-hidden="true">↗</span></a>
            </div>
          </nav>
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
                <section className="lab-trial-links" aria-label="Direct links to failed trials">
                  {evaluation.failedTrialGroups.map((group) => (
                    <div key={group.id}>
                      <h4>{group.label}</h4>
                      <ul>
                        {group.trials.map(({ arm, number }) => (
                          <li key={`${arm}/${number}`}>
                            <a href={`${viewer}#failed-trial-${group.id}/${arm}/${number}`}>
                              {arm === "baseline" ? "Baseline" : "Recovery"} trial {number}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
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
              <a href={`${source.repository}/releases/tag/${source.tag}`}>V4.2.0 release <span aria-hidden="true">↗</span></a>
              <a href="/evidence/agent-reliability-lab.json">Evidence index <span aria-hidden="true">↗</span></a>
            </div>
          </section>
          <section className="lab-evidence main-replay-panel" id="blind-evaluation" aria-labelledby="lab-blind-heading">
            <p className="atlas-eyebrow">Default cause-label contract</p>
            <h2 id="lab-blind-heading">Blind evaluation</h2>
            <h3>{blindEvaluation.previous.passed}/{blindEvaluation.previous.runs} → {blindEvaluation.revised.passed}/{blindEvaluation.revised.runs} correct, grounded diagnoses</h3>
            <p>Each prompt ran twice on {blindEvaluation.incidents} fresh synthetic incidents. The model received no answer key. The revised contract corrected one SQL diagnosis and two worker diagnoses. Both prompts scored 10/10 on each of the other three cause categories.</p>
            <p><a href={`${viewer}#blind-evaluation`}>Open the live blind scorecard <span aria-hidden="true">↗</span></a></p>
            <div className="lab-trial-links">
              <h4>Inspect the three corrected failures</h4>
              <ul>
                {blindEvaluation.corrected.map(({ id, trial, label }) => (
                  <li key={id}><a href={`${viewer}#blind-correction-${id}-${trial}`}>{label} · Trial {trial} <span aria-hidden="true">↗</span></a></li>
                ))}
              </ul>
            </div>
          </section>
          <section className="lab-evidence main-replay-panel" id="model-comparison" aria-labelledby="lab-model-heading">
            <p className="atlas-eyebrow">Citation support · Live synthetic recovery</p>
            <h2 id="lab-model-heading">Sol vs. Luna model comparison</h2>
            <h3>Supporting citations in {sol.supported}/{sol.runs} Sol runs and {luna.supported}/{luna.runs} Luna runs</h3>
            <p>Both models chose the right cause in all {sol.correct + luna.correct} runs across {modelComparison.incidents} synthetic incidents. The stricter grader also checked whether each quotation supported the claim it was cited for. Sol passed all eight runs with either prompt. Luna passed {luna.basic}/8 with basic citations and {luna.explicit}/8 with an explicit support check.</p>
            <div className="lab-links"><a href={`${viewer}#model-comparison`}>Open the live model comparison <span aria-hidden="true">↗</span></a></div>
          </section>
          <section className="lab-evidence main-replay-panel" id="evidence-handoff" aria-labelledby="lab-handoff-heading">
            <p className="atlas-eyebrow">Escalation · Live experiment</p>
            <h2 id="lab-handoff-heading">Evidence handoff experiment</h2>
            <h3>Fresh tool reads fell from {restart.fresh_tool_reads} to {handoff.fresh_tool_reads}</h3>
            <p>For {evidenceHandoff.escalatedIncidents} escalated synthetic incidents, both arms reused Luna’s recorded first investigation. Sol either restarted from the alert or received Luna’s original evidence. Across the {restart.runs}-incident policies, citation support fell from {restart.supported}/{restart.runs} to {handoff.supported}/{handoff.runs}. Both chose the correct cause in {handoff.cause_correct}/{handoff.runs} incidents.</p>
            <p>Estimated policy cost increased from ${restart.estimated_usd.toFixed(4)} to ${handoff.estimated_usd.toFixed(4)}. Handoff missed the citation-support and latency gates, so I kept the default unchanged.</p>
            <div className="lab-links"><a href={`${viewer}#evidence-handoff`}>Open the live handoff comparison <span aria-hidden="true">↗</span></a></div>
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
