"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeritageRow from "@/components/HeritageRow";
import { atlasRows, atlasEdges, type AtlasFlow } from "@/lib/ai-atlas";

const projectExamples: Record<string, { label: string; href: string; scope: string }> = {
  runtime: { label: "Inspect checkout retry evidence", href: "/engineering/order-once#business-outcomes", scope: "Related application example: repeated requests, concurrent requests, and payload conflicts." },
  evals: { label: "Review the regression source", href: "/engineering/order-once#source", scope: "Related application regression checks; this is not a model evaluation benchmark." },
  traces: { label: "Inspect the claim delivery record", href: "/engineering/claim-twice#evidence", scope: "Recorded synthetic observations from local PostgreSQL and a queue simulation." },
};
const principles = [
  { title: "Explore with purpose", detail: "Begin with a question worth pursuing.", destination: "Ask the engineering assistant", href: "/chat" },
  { title: "Build with care", detail: "Make the implementation and its decisions visible.", destination: "Inspect the Engineering Studio", href: "/engineering" },
  { title: "Learn from evidence", detail: "Follow the outcome, including where the design breaks.", destination: "Explore the recorded case studies", href: "/engineering#case-studies" },
];

const allNodes = atlasRows.flatMap(row => row.nodes);
const filters: { flow: AtlasFlow; title: string }[] = [
  { flow: "all", title: "Full architecture" },
  { flow: "rag", title: "Retrieval path" },
  { flow: "tools", title: "Agent & tools" },
  { flow: "eval", title: "Evaluation loop" },
];

export default function AIPhilosophy() {
  const [flow, setFlow] = useState<AtlasFlow>("all");
  const [selected, setSelected] = useState("context");
  const [paths, setPaths] = useState<string[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const selectedNode = allNodes.find(node => node.id === selected)!;
  const example = projectExamples[selected];

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const load = () => {
      void import("./atlas-drawing").then(({mountAtlasDrawing}) => {
        if (!disposed) cleanup = mountAtlasDrawing(map, atlasEdges, setPaths);
      }).catch(() => { /* The accessible HTML diagram remains usable without decorative wires. */ });
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); load(); }
    }, {rootMargin:"600px"});
    if (observer) observer.observe(map); else load();
    return () => { disposed = true; observer?.disconnect(); cleanup?.(); };
  }, []);

  const inFlow = (id: string) => flow === "all" || allNodes.find(node => node.id === id)!.groups.includes(flow);
  return <section id="about" className="ai-philosophy" aria-labelledby="ai-philosophy-title">
    <div className="backdrop" aria-hidden="true"><Image src="/images/threshold/barcelona-future.webp" alt="" fill sizes="100vw" loading="lazy" /></div>
    <div className="sheet">
      <div className="about-artwork-entry"><HeritageRow scene="orbital-score" caption="The Orbital Score · Painted geometry becomes a future world" imageWidth={1774} imageHeight={887}><div className="intro philosophy-editorial">
        <div className="philosophy-statement"><p className="eyebrow">THE THINKING BEHIND eAI</p><h2 id="ai-philosophy-title">Wonder asks the question.<br /><em>Engineering carries it forward.</em></h2><p className="philosophy-summary">eAI explores how software, automation, and artificial intelligence can turn ambitious questions into useful systems.</p></div>
        <nav className="philosophy-principles" aria-label="Explore the engineering principles">{principles.map((principle, index) => <Link key={principle.title} href={principle.href}><span className="principle-number">0{index + 1}</span><div><h3>{principle.title}</h3><p>{principle.detail}</p><span className="principle-destination">{principle.destination}</span></div><span className="principle-arrow" aria-hidden="true">↗</span></Link>)}</nav>
      </div>
      </HeritageRow></div>
      <div className="main-bio artwork-bio" id="meet-the-engineer"><HeritageRow scene="face-outlived-paper" caption="The Face That Outlived Paper · From Renaissance drawing to future sculpture"><div className="bio-copy"><p className="eyebrow">MEET THE ENGINEER</p><h3>Built by Erdal Kilic.</h3><p>I build and test software systems, explore local AI, and make the evidence behind the work visible. Here you can follow checkout and claim retries, inspect a settlement simulator, or bring your own question to an engineering tool.</p><p>My aim is practical: make the rule clear, show where it breaks, and explain the trade-off. The public cases use synthetic data and distinguish captured results from live execution.</p><Link href="/engineering/projects">Explore my work ↗</Link></div></HeritageRow></div><div className="atlas-artwork-entry" id="explore-ai-atlas"><HeritageRow scene="city-in-the-drips" caption="The City in the Drips · Painted gestures become connected systems" imageWidth={1024} imageHeight={1536} reverse><details open className="main-architecture-toggle"><summary>Explore the AI Systems Atlas and design principles</summary><div className="philosophy-bridge"><p className="eyebrow">FROM PRINCIPLE TO SYSTEM DESIGN</p><p>How those principles shape an AI system.</p><span>A conceptual map, with links to related work where demonstrated.</span></div>
      <section className="atlas" aria-labelledby="ai-atlas-title">
        <div className="atlas-head"><div><p className="eyebrow">THE AI SYSTEMS ATLAS</p><h3 id="ai-atlas-title">Intelligence, connected.</h3></div><small>CONCEPTUAL ARCHITECTURE<br />RETRIEVE / REASON / ACT / VERIFY</small></div>
        <div className="filters" role="group" aria-label="Highlight an architecture path">{filters.map(filter => <button key={filter.flow} type="button" aria-pressed={flow === filter.flow} onClick={() => setFlow(filter.flow)}>{filter.title}</button>)}</div>
        <p className="caption">Select a component to inspect its role. Highlighted paths show conceptual relationships, not live activity.</p>
        <div className="map" ref={mapRef}>
          <svg className="wires" aria-hidden="true">{atlasEdges.map(([from, to], index) => <path key={`${from}-${to}`} d={paths[index] || ""} fill="none" stroke={inFlow(from) && inFlow(to) ? "#dfb584" : "#60788f"} strokeOpacity={inFlow(from) && inFlow(to) ? .45 : .12} strokeWidth={1} />)}</svg>
          <div className="lanes">{atlasRows.map(row => <div className="lane" key={row.number}><div className="lane-label"><span>{row.number}</span>{row.label}</div>{row.nodes.map(node => <button key={node.id} data-node={node.id} type="button" className={`node${inFlow(node.id) ? "" : " dim"}`} aria-pressed={selected === node.id} aria-controls="ai-atlas-detail" onClick={() => setSelected(node.id)}><b>{node.title}</b><small>{node.subtitle}</small></button>)}</div>)}</div>
        </div>
        <div className="trace-detail" id="ai-atlas-detail" aria-live="polite" aria-atomic="true"><strong>{selectedNode.title.toUpperCase()}</strong><p>{selectedNode.detail}</p></div>
        {example && <aside className="atlas-project-example" aria-label="Related project evidence"><p className="eyebrow">RELATED PROJECT EVIDENCE</p><Link href={example.href}>{example.label} <span aria-hidden="true">↗</span></Link><p>{example.scope}</p></aside>}
      </section></details></HeritageRow></div>
      <div className="foot"><span>Founded by Erdal Kilic</span><Link href="/engineering">Explore the Engineering Studio <span aria-hidden="true">↗</span></Link></div>
      <p className="caption">Illustrative AI system design · No live execution or performance metrics<br />Barcelona, Spain · Casa Batlló and the Sagrada Família reimagined</p>
    </div>
  </section>;
}
