"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { projects } from "@/lib/portfolio-projects";

const QADashboard = dynamic(() => import("@/components/QADashboard"));
const AITestGenerator = dynamic(() => import("@/components/AITestGenerator"));
const JobMatcher = dynamic(() => import("@/components/JobMatcher"));
const tools = [
  {
    key: "qa-dashboard",
    title: "CI failure investigation",
    detail: "Investigate results and understand failures.",
    Component: QADashboard,
  },
  {
    key: "ai-test-generator",
    title: "AI-assisted test planning",
    detail: "Turn requirements into a practical test plan.",
    Component: AITestGenerator,
  },
  {
    key: "job-matcher",
    title: "Role alignment",
    detail: "Compare your experience with a role.",
    Component: JobMatcher,
  },
];
const cases = [
  {
    path: "/engineering/order-once",
    category: "CHECKOUT INTEGRITY",
    title: "The order that should happen only once.",
    description:
      "Follow a repeated checkout, compare an injected defect, and inspect concurrent requests and payload conflicts.",
    outcome: "One order. Stock reduced once.",
    project: "Playwright AI Automation",
    projectIndex: 1,
    record: "/evidence/checkout-scenarios.json",
    label: "Checkout",
  },
  {
    path: "/engineering/claim-twice",
    category: "CLAIM REDELIVERY",
    title: "The claim that arrived twice.",
    description:
      "A claim is stored, but acknowledgement fails. Follow redelivery and see what happens when the content changes.",
    outcome: "One persisted claim. Original preserved.",
    project: "AI Healthcare Quality Platform",
    projectIndex: 0,
    record: "/evidence/claim-redelivery.json",
    label: "Healthcare",
  },
];

export default function EngineeringStudio({
  fullPage = false,
}: {
  fullPage?: boolean;
}) {
  const [activeTool, setActiveTool] = useState("qa-dashboard");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [visitedTools, setVisitedTools] = useState<string[]>([]);
  const selectTool = (key: string) => {
    setActiveTool(key);
    setVisitedTools((previous) =>
      previous.includes(key) ? previous : [...previous, key],
    );
  };
  useEffect(() => {
    const sync = () => {
      const key = location.hash.slice(1);
      if (tools.some((tool) => tool.key === key)) {
        selectTool(key);
        setWorkspaceOpen(true);
        requestAnimationFrame(() =>
          document
            .getElementById(`panel-${key}`)
            ?.scrollIntoView({ block: "start" }),
        );
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section
      className={`engineering-studio${fullPage ? " studio-full" : ""}`}
      id="engineering"
      aria-labelledby="studio-title"
    >
      <span id="platform" className="studio-anchor" aria-hidden="true" />
      <div className="studio-wrap">
        <div className="studio-intro">
          <div>
            <p className="atlas-eyebrow">eAI ENGINEERING STUDIO</p>
            {fullPage ? (
              <h1 id="studio-title">Engineering you can inspect.</h1>
            ) : (
              <h2 id="studio-title">Engineering you can inspect.</h2>
            )}
            <p>Explore the work. Follow the evidence. Try the tools.</p>
          </div>
          <div className="studio-intro-aside">
            <p>
              From a repository to a recorded result. <br />
              One place to understand how the work fits together.
            </p>
            {!fullPage && (
              <Link className="studio-text-link" href="/engineering">
                Open the full Studio <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </div>
        <nav className="studio-nav" aria-label="Engineering Studio navigation">
          <a href="#case-studies">
            <span>01</span> Case Studies
          </a>
          <a href="#projects">
            <span>02</span> Projects
          </a>
          <a href="#tools">
            <span>03</span> Tools
          </a>
        </nav>
        <section
          id="case-studies"
          className="studio-section"
          aria-labelledby="studio-cases-title"
        >
          <div className="studio-section-heading">
            <div>
              <p className="atlas-eyebrow">01 / FOLLOW THE EVIDENCE</p>
              <h2 id="studio-cases-title">Two systems. The same question.</h2>
              <p>When work arrives twice, what should happen once?</p>
            </div>
            <span className="studio-note">
              Recorded local runs · Synthetic data
            </span>
          </div>
          <div className="studio-case-grid">
            {cases.map((item, index) => (
              <article className="studio-case" key={item.path}>
                <div className="studio-case-top">
                  <span>CASE 0{index + 1}</span>
                  <span>{item.category}</span>
                </div>
                <h3>
                  <Link href={item.path}>{item.title}</Link>
                </h3>
                <p>{item.description}</p>
                <p className="studio-outcome">
                  <span aria-hidden="true">◇</span> {item.outcome}
                </p>
                <div className="studio-case-actions">
                  <Link className="studio-primary-link" href={item.path}>
                    Follow the {index === 0 ? "checkout" : "claim’s journey"}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <a href={item.record} download>
                    Evidence JSON <span aria-hidden="true">↓</span>
                  </a>
                </div>
                <div className="studio-case-project">
                  Built in{" "}
                  <a href={`#project-${item.projectIndex}`}>{item.project}</a>
                </div>
              </article>
            ))}
          </div>
          <p className="studio-scope">
            Explore captured results without running a queue, placing an order,
            or calling a model. Each story includes source links, reproduction
            instructions, and its limitations.
          </p>
        </section>
        <section
          id="projects"
          className="studio-section"
          aria-labelledby="studio-projects-title"
        >
          <div className="studio-section-heading">
            <div>
              <p className="atlas-eyebrow">02 / INSPECT THE IMPLEMENTATION</p>
              <h2 id="studio-projects-title">The projects behind the work.</h2>
            </div>
            <a
              className="studio-text-link"
              href="https://github.com/kilicerdal"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="studio-project-grid">
            {projects.map((project, index) => (
              <article
                id={`project-${index}`}
                className="studio-project"
                key={project.name}
              >
                <p className="atlas-eyebrow">{project.category}</p>
                <h3>{project.name}</h3>
                {fullPage && <p>{project.description}</p>}
                <p className="studio-stack">{project.stack.join(" · ")}</p>
                <p className="studio-status">{project.status}</p>
                <div className="studio-project-links">
                  {project.caseStudy && (
                    <Link href={project.caseStudy}>
                      Case study <span aria-hidden="true">↗</span>
                    </Link>
                  )}
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repository <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.caseStudy && (
                    <a href="#ai-test-generator">
                      Plan tests <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {!project.caseStudy && <span>Case study forthcoming</span>}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="tools"
          className="studio-section studio-tools"
          aria-labelledby="studio-tools-title"
        >
          <div className="studio-section-heading">
            <div>
              <p className="atlas-eyebrow">03 / PUT AN IDEA TO WORK</p>
              <h2 id="studio-tools-title">Your engineering workspace.</h2>
              <p>
                Plan tests, investigate failures, or explore role alignment.
              </p>
            </div>
            <button
              className="atlas-button"
              aria-expanded={workspaceOpen}
              aria-controls="tool-workspace"
              onClick={() => {
                selectTool(activeTool);
                setWorkspaceOpen(!workspaceOpen);
              }}
            >
              {workspaceOpen ? "Close workspace −" : "Open workspace +"}
            </button>
          </div>
          <div id="tool-workspace" hidden={!workspaceOpen}>
            <div
              className="atlas-tool-tabs"
              role="tablist"
              aria-label="Engineering tool"
            >
              {tools.map((tool) => (
                <button
                  key={tool.key}
                  role="tab"
                  id={`tab-${tool.key}`}
                  aria-selected={activeTool === tool.key}
                  aria-controls={`panel-${tool.key}`}
                  tabIndex={activeTool === tool.key ? 0 : -1}
                  onClick={() => selectTool(tool.key)}
                  onKeyDown={(event) => {
                    if (
                      !["ArrowRight", "ArrowLeft", "Home", "End"].includes(
                        event.key,
                      )
                    )
                      return;
                    event.preventDefault();
                    const index = tools.findIndex(
                      (item) => item.key === tool.key,
                    );
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? tools.length - 1
                          : (index +
                              (event.key === "ArrowRight" ? 1 : -1) +
                              tools.length) %
                            tools.length;
                    selectTool(tools[next].key);
                    document.getElementById(`tab-${tools[next].key}`)?.focus();
                  }}
                >
                  {tool.title}
                </button>
              ))}
            </div>
            {tools.map((tool) => (
              <div
                key={tool.key}
                id={`panel-${tool.key}`}
                role="tabpanel"
                tabIndex={-1}
                aria-labelledby={`tab-${tool.key}`}
                hidden={activeTool !== tool.key}
                className="atlas-tool-panel"
              >
                <p className="atlas-tool-description">{tool.detail}</p>
                {visitedTools.includes(tool.key) && <tool.Component />}
              </div>
            ))}
          </div>
        </section>
        <div className="studio-closing">
          <p>Curious about the decisions behind the work?</p>
          <Link href="/#about">
            Meet the engineer <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/study">
            Explore dAI Learning Studio <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
