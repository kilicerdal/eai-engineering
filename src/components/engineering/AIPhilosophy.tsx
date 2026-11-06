"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { atlasRows, atlasEdges, type AtlasFlow } from "@/lib/ai-atlas";

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

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let frame = 0;
    const draw = () => {
      const bounds = map.getBoundingClientRect();
      setPaths(atlasEdges.map(([from, to]) => {
        const a = map.querySelector<HTMLElement>(`[data-node="${from}"]`)!.getBoundingClientRect();
        const b = map.querySelector<HTMLElement>(`[data-node="${to}"]`)!.getBoundingClientRect();
        const ax = a.left + a.width / 2 - bounds.left, ay = a.bottom - bounds.top;
        const bx = b.left + b.width / 2 - bounds.left, by = b.top - bounds.top;
        if (by < ay - 80) return `M${a.right - bounds.left} ${a.top + a.height / 2 - bounds.top} H${bounds.width - 3} V${b.top + b.height / 2 - bounds.top} H${b.right - bounds.left}`;
        if (Math.abs(ay - by) < 90 && Math.abs(ax - bx) > 60) return `M${a.right - bounds.left} ${a.top + a.height / 2 - bounds.top} H${b.left - bounds.left}`;
        return `M${ax} ${ay} V${(ay + by) / 2} H${bx} V${by}`;
      }));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
    const observer = new ResizeObserver(schedule);
    observer.observe(map);
    // Recalculate when wrapping changes with late-loaded fonts or viewport width.
    map.querySelectorAll(".node").forEach(node => observer.observe(node));
    schedule();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  const inFlow = (id: string) => flow === "all" || allNodes.find(node => node.id === id)!.groups.includes(flow);
  return <section id="about" className="ai-philosophy" aria-labelledby="ai-philosophy-title">
    <div className="backdrop" aria-hidden="true" />
    <div className="sheet">
      <div className="masthead"><span className="brand" aria-hidden="true">eAI</span><small>THE THINKING BEHIND eAI</small></div>
      <div className="intro"><div><p className="eyebrow">CURIOSITY, WITH DIRECTION</p><h2 id="ai-philosophy-title">Wonder asks the question.<br /><em>Engineering</em><br />carries it forward.</h2></div><div><p>eAI explores how software, automation, and artificial intelligence can turn ambitious questions into useful systems.</p><p>Explore with purpose. Build with care.<br />Learn from evidence.</p></div></div>
      <section className="atlas" aria-labelledby="ai-atlas-title">
        <div className="atlas-head"><div><p className="eyebrow">THE AI SYSTEMS ATLAS</p><h3 id="ai-atlas-title">Intelligence, connected.</h3></div><small>CONCEPTUAL ARCHITECTURE<br />RETRIEVE / REASON / ACT / VERIFY</small></div>
        <div className="filters" role="group" aria-label="Highlight an architecture path">{filters.map(filter => <button key={filter.flow} type="button" aria-pressed={flow === filter.flow} onClick={() => setFlow(filter.flow)}>{filter.title}</button>)}</div>
        <p className="caption">Select a component to inspect its role. Highlighted paths show conceptual relationships, not live activity.</p>
        <div className="map" ref={mapRef}>
          <svg className="wires" aria-hidden="true">{atlasEdges.map(([from, to], index) => <path key={`${from}-${to}`} d={paths[index] || ""} fill="none" stroke={inFlow(from) && inFlow(to) ? "#dfb584" : "#60788f"} strokeOpacity={inFlow(from) && inFlow(to) ? .45 : .12} strokeWidth={1} />)}</svg>
          <div className="lanes">{atlasRows.map(row => <div className="lane" key={row.number}><div className="lane-label"><span>{row.number}</span>{row.label}</div>{row.nodes.map(node => <button key={node.id} data-node={node.id} type="button" className={`node${inFlow(node.id) ? "" : " dim"}`} aria-pressed={selected === node.id} aria-controls="ai-atlas-detail" onClick={() => setSelected(node.id)}><b>{node.title}</b><small>{node.subtitle}</small></button>)}</div>)}</div>
        </div>
        <div className="trace-detail" id="ai-atlas-detail" aria-live="polite" aria-atomic="true"><strong>{selectedNode.title.toUpperCase()}</strong><p>{selectedNode.detail}</p></div>
      </section>
      <div className="foot"><span>Founded by Erdal Kilic</span><Link href="/engineering">Explore the Engineering Studio <span aria-hidden="true">↗</span></Link></div>
      <p className="caption">Illustrative AI system design · No live execution or performance metrics<br />Barcelona, Spain · Casa Batlló and the Sagrada Família reimagined</p>
    </div>
  </section>;
}
