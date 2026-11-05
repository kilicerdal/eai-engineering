"use client";

import { projects } from "@/lib/portfolio-projects";
import Image from "next/image";

import JobMatcher from "@/components/JobMatcher";

import ResumeChat from "@/components/ResumeChat";
import QADashboard from "@/components/QADashboard";
import AITestGenerator from "@/components/AITestGenerator";

import "./threshold.css";

import { useEffect, useState } from "react";

const skills = [
  {
    title: "Test Automation",
    icon: "◈",
    items: ["Playwright", "Selenium", "Cypress", "Pytest", "TestNG", "Cucumber"],
  },
  {
    title: "Programming",
    icon: "⌘",
    items: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "API & Backend",
    icon: "⬡",
    items: ["REST Assured", "Postman", "Karate", "REST APIs", "SQL Validation"],
  },
  {
    title: "AWS & Cloud",
    icon: "☁",
    items: ["Lambda", "S3", "SQS", "SNS", "API Gateway", "EC2"],
  },
  {
    title: "DevOps",
    icon: "⚙",
    items: ["GitHub Actions", "Jenkins", "GitLab CI/CD", "Docker", "Git"],
  },
  {
    title: "AI Engineering",
    icon: "✧",
    items: ["Generative AI", "GitHub Copilot", "Ollama", "LLM Integration", "AI Agents"],
  },
];

const tools = [
  { key: "qa-dashboard", title: "Quality intelligence", detail: "Investigate results and understand failures." },
  { key: "ai-test-generator", title: "AI-assisted testing", detail: "Turn requirements into a practical test plan." },
  { key: "job-matcher", title: "Role alignment", detail: "Compare your experience with a role." },
];

function Orbit({kind = 0}: {kind?: number}) {
 return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1">{kind === 1 ? <><path d="m4 17 20-11 20 11-20 11zM4 25l20 11 20-11M4 33l20 11 20-11"/></> : kind === 2 ? <><path d="M24 10c-7-6-15-6-20-3v31c6-3 13-2 20 3 7-5 14-6 20-3V7c-5-3-13-3-20 3v31"/></> : <><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="4"/><path d="M21 27 5 44m22-17 14 14"/></>}</g></svg>;
}

function AtlasBackdrop({ scene }: { scene: "maya" | "ephesus" | "great-wall" | "taj-mahal" | "taj-reflection" | "civilizations" | "barcelona" }) {
 return <div className="atlas-scene-art" aria-hidden="true"><Image src={`/images/threshold/${scene}-future.webp`} alt="" fill sizes="100vw" /></div>;
}

export default function Home() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [navSection, setNavSection] = useState("ai-assistant");
 const [activeTool, setActiveTool] = useState("qa-dashboard");
 const [workspaceOpen, setWorkspaceOpen] = useState(false);
 useEffect(() => {
   const sync = () => { const key = location.hash.slice(1); setNavSection(key || "ai-assistant"); if (tools.some(t => t.key === key)) { setActiveTool(key); setWorkspaceOpen(true); requestAnimationFrame(() => document.getElementById(key)?.scrollIntoView({block: "start"})); } };
   sync(); window.addEventListener("hashchange", sync); return () => window.removeEventListener("hashchange", sync);
 }, []);
 const openTool = (key: string) => { setActiveTool(key); setWorkspaceOpen(true); };
 return <main className="threshold" id="top">
  <header className="atlas-header">
   <a className="atlas-brand" href="#top" aria-label="eAI home"><span>eAI</span><small>Intelligence Engineered</small></a>
   <span className="atlas-chapter">THE THRESHOLD</span>
   <button className="atlas-menu" aria-expanded={menuOpen} aria-controls="atlas-nav" onClick={() => setMenuOpen(!menuOpen)}>Menu {menuOpen ? "−" : "+"}</button>
   <nav id="atlas-nav" className={menuOpen ? "is-open" : ""} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
    <a className="atlas-chat-nav" href="#ai-assistant" aria-current={navSection === "ai-assistant" ? "location" : undefined}>Chat with eAI</a><a href="#platform" aria-current={navSection === "platform" ? "location" : undefined}>Platform</a><a href="#engineering" aria-current={navSection === "engineering" ? "location" : undefined}>Engineering</a><a href="#projects" aria-current={navSection === "projects" ? "location" : undefined}>Projects</a><a href="#contact" aria-current={navSection === "contact" ? "location" : undefined}>Contact</a>
   </nav>
   <a className="atlas-dai-entry" href="/study" aria-label="Explore dAI Learning Studio">Explore dAI <span aria-hidden="true">→</span></a>
  </header>
  <section className="atlas-hero" aria-labelledby="hero-title">
   <Image src="/images/threshold/gobekli-future.webp" alt="" fill preload sizes="100vw" className="atlas-landscape" />
   <div className="atlas-hero-shade"/>
   <div className="atlas-hero-copy"><p className="atlas-eyebrow">ANCIENT CURIOSITY. FUTURE POSSIBILITY.</p><h1 id="hero-title">From the first questions <br/>to the next intelligence.</h1><p>Meet your AI engineering assistant. Bring a question, explore an idea,<br className="desktop-break"/> or work through a challenge in coding, testing and cloud engineering.</p><div className="atlas-actions"><a className="atlas-button primary" href="#ai-assistant">Chat with eAI <span>→</span></a></div></div>
   <p className="atlas-caption">Göbekli Tepe, Türkiye · An imagined bridge to tomorrow</p>
  </section>
  <section className="atlas-dai-invitation" aria-labelledby="dai-invitation-title">
   <div className="atlas-dai-art"><Image src="/images/study/library-horizon.webp" alt="" fill sizes="(max-width: 760px) 100vw, 44vw" /></div>
   <div className="atlas-dai-copy"><p className="atlas-eyebrow">dAI LEARNING STUDIO</p><h2 id="dai-invitation-title">Turn curiosity into understanding.</h2><p>Learn with an AI tutor, work from your materials, and prepare with purpose.</p><ul aria-label="Learning Studio features"><li>Personal learning plans</li><li>AI tutoring</li><li>Exam preparation</li></ul><a className="atlas-button primary" href="/study">Explore the Learning Studio <span aria-hidden="true">→</span></a><p className="atlas-dai-note">Start without an account.</p></div>
  </section>
  <div className="atlas-chat-feature"><AtlasBackdrop scene="maya"/><ResumeChat /><p className="atlas-scene-caption">Maya landmarks · An imagined bridge to the future</p></div>
  <section className="atlas-rail" aria-label="Explore eAI">
   <a href="#engineering"><Orbit/><div><h2>AI Engineering</h2><p>From idea to real systems.</p></div><span>↗</span></a>
   <a href="#qa-dashboard" onClick={() => openTool("qa-dashboard")}><Orbit kind={1}/><div><h2>Quality Intelligence</h2><p>Reliability through insight.</p></div><span>↗</span></a>
   <a href="/study"><Orbit kind={2}/><div><h2>dAI Learning Studio</h2><p>A deeper way to learn.</p></div><span>↗</span></a>
  </section>
  <section className="atlas-engineering" id="engineering">
   <div className="atlas-petra"><Image src="/images/threshold/petra-future.webp" alt="Artistic vision of Petra’s carved sandstone architecture opening toward an imagined future city" fill sizes="(max-width: 760px) 100vw, 58vw" className="atlas-landscape"/><p className="atlas-caption">Petra, Jordan · From timeless questions to new possibilities</p></div>
   <div className="atlas-engineering-copy"><p className="atlas-eyebrow">ENGINEERING A BRIGHTER TOMORROW</p><h2>Built to endure.<br/>Designed to evolve.</h2><p>We engineer reliable, intelligent systems that adapt, improve and create lasting value. By combining rigorous engineering with continuous learning, we turn complex challenges into practical progress.</p><a className="atlas-button" href="#about">Our approach <span>→</span></a><div className="atlas-orbit" aria-hidden="true"><i/><i/><i/></div></div>
  </section>
  <section id="platform" className="atlas-scenic atlas-ephesus"><AtlasBackdrop scene="ephesus"/><div className="atlas-practice atlas-container">
   <div><p className="atlas-eyebrow">REAL WORK. REAL PROGRESS.</p><h2>Intelligence in practice.</h2><p>From development to assurance to continuous learning,<br/>eAI applies intelligence where it makes a difference.</p>
    <div className="atlas-practice-links"><a href="#ai-test-generator" onClick={() => openTool("ai-test-generator")}><Orbit/><div><h3>AI-assisted testing</h3><p>Start smarter. Create a considered test plan.</p></div><span>→</span></a><a href="#qa-dashboard" onClick={() => openTool("qa-dashboard")}><Orbit kind={1}/><div><h3>CI failure investigation</h3><p>Explore evidence. Find your next step.</p></div><span>→</span></a><a href="/study"><Orbit kind={2}/><div><h3>Personal learning</h3><p>Your goals. Your materials. Your pace.</p></div><span>→</span></a></div>
   </div>
   <div className="atlas-project-preview"><div className="atlas-preview-top"><span>SELECTED PROJECT</span><span>01 / 04</span></div><div className="atlas-project-window"><p className="atlas-eyebrow">{projects[0].category}</p><h3>{projects[0].name}</h3><p>{projects[0].description}</p><div className="atlas-flow"><span>Requirements</span><b>→</b><span>Validation</span><b>→</b><span>Evidence</span></div><p className="atlas-stack">{projects[0].stack.join(" · ")}</p><a href={projects[0].repository} target="_blank" rel="noreferrer">Explore the repository ↗</a></div></div>
  </div><p className="atlas-scene-caption">Ephesus, Türkiye · An imagined horizon</p></section>
  <section className="atlas-workspace atlas-scenic" aria-label="Engineering tools" data-open={workspaceOpen}><AtlasBackdrop scene="great-wall"/><div className="atlas-workspace-heading"><div><p className="atlas-eyebrow">YOUR ENGINEERING WORKSPACE</p><h2>Put an idea to work.</h2><p className="atlas-workspace-intro">Explore your engineering tools.</p></div><button className="atlas-button" aria-expanded={workspaceOpen} aria-controls="tool-workspace" onClick={() => setWorkspaceOpen(!workspaceOpen)}>{workspaceOpen ? "Close workspace −" : "Open workspace +"}</button></div>
   <div id="tool-workspace" hidden={!workspaceOpen}><div className="atlas-tool-tabs" role="tablist" aria-label="Engineering tool">{tools.map(t => <button key={t.key} role="tab" id={`tab-${t.key}`} aria-selected={activeTool === t.key} aria-controls={`panel-${t.key}`} onKeyDown={e => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) { e.preventDefault(); const index = tools.findIndex(item => item.key === t.key); const next = e.key === "Home" ? 0 : e.key === "End" ? tools.length - 1 : (index + (e.key === "ArrowRight" ? 1 : -1) + tools.length) % tools.length; setActiveTool(tools[next].key); document.getElementById(`tab-${tools[next].key}`)?.focus(); } }} tabIndex={activeTool === t.key ? 0 : -1} onClick={() => setActiveTool(t.key)}>{t.title}</button>)}</div>
   {tools.map((t,i) => <div key={t.key} id={`panel-${t.key}`} role="tabpanel" aria-labelledby={`tab-${t.key}`} hidden={activeTool !== t.key} className="atlas-tool-panel"><p className="atlas-tool-description">{t.detail}</p>{i === 0 ? <QADashboard/> : i === 1 ? <AITestGenerator/> : <JobMatcher/>}</div>)}</div>
  </section>
  <section className="atlas-projects atlas-container atlas-scenic" id="projects"><AtlasBackdrop scene="taj-reflection"/><div className="atlas-section-heading"><div><p className="atlas-eyebrow">BUILT WITH INTENT</p><h2>Engineering,<br/>in the open.</h2></div><a href="https://github.com/kilicerdal" target="_blank" rel="noreferrer">View GitHub ↗</a></div><div className="atlas-project-grid">{projects.map((p,i) => <article key={p.name}><span className="atlas-index">0{i+1}</span><div><p className="atlas-eyebrow">{p.category}</p><h3>{p.name}</h3><p>{p.description}</p><p className="atlas-stack">{p.stack.join(" · ")}</p></div><div className="atlas-project-status"><span>{p.status}</span>{p.repository && <a href={p.repository} target="_blank" rel="noreferrer">Repository ↗</a>}</div></article>)}</div></section>
  <section className="atlas-about atlas-container atlas-scenic" id="about"><AtlasBackdrop scene="barcelona"/><div className="atlas-about-heading"><p className="atlas-eyebrow">THE THINKING BEHIND eAI</p><h2>Curiosity, grounded<br/>in engineering.</h2></div><div className="atlas-about-content"><div className="atlas-biography"><p>Founded by Erdal Kilic, eAI brings together software quality, automation and applied AI. With over nine years across financial, healthcare and enterprise systems, the approach is simple: understand the problem, build carefully, and learn from the evidence.</p><div className="atlas-credentials"><span>AWS Certified Developer – Associate</span><span>AWS Certified Cloud Practitioner</span></div></div><div className="atlas-skills" id="skills">{skills.map(s => <div key={s.title}><h3>{s.title}</h3><p>{s.items.join(" · ")}</p></div>)}</div></div><p className="atlas-scene-caption">Barcelona, Spain · Casa Batlló and the Sagrada Família reimagined</p></section>
  <section className="atlas-contact atlas-scenic" id="contact"><AtlasBackdrop scene="civilizations"/><div className="atlas-container"><p className="atlas-eyebrow">A MORE INTELLIGENT TOMORROW</p><h2>What will we build next?</h2><p>Let’s turn your next idea into real progress.</p><a className="atlas-button" href="mailto:hello@eai.engineering">Get in touch <span>→</span></a><div className="atlas-contact-links"><a href="mailto:erdal@eai.engineering">Professional inquiries ↗</a><a href="mailto:support@eai.engineering">Technical support ↗</a><a href="mailto:careers@eai.engineering">Opportunities ↗</a></div></div></section>
  <footer className="atlas-footer"><a className="atlas-brand" href="#top"><span>eAI</span><small>Intelligence Engineered</small></a><a href="/study">dAI Learning Studio ↗</a><small>© 2026 eAI · Erdal Kilic</small></footer>
 </main>;
}
