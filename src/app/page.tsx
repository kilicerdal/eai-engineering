"use client";

import AIPhilosophy from "@/components/engineering/AIPhilosophy";
import "./engineering/ai-atlas.css";
import {StartHere, FlagshipProjects, RecordedReplay, FieldNotes} from "@/components/engineering/MainShowcase";
import "./engineering/main-showcase.css";
import "./engineering/lab/lab.css";
import "./engineering/studio.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ContactDesk from "@/components/ContactDesk";
import "./contact-desk.css";


import "./threshold.css";

import { useEffect, useState } from "react";

export default function Home() {
 const [menuOpen, setMenuOpen] = useState(false);
 const router = useRouter();
 const [navSection, setNavSection] = useState("");
 useEffect(() => {
   const sync = () => {
     const section = location.hash.slice(1);
     if (section === "ai-assistant") router.replace("/chat");
     else if (["projects","platform","case-studies","tools","qa-dashboard","ai-test-generator","job-matcher"].includes(section) || /^project-\d+$/.test(section)) router.replace(`/engineering#${section}`);
     else setNavSection(section);
   };
   sync(); window.addEventListener("hashchange", sync); return () => window.removeEventListener("hashchange", sync);
 }, [router]);
 return <main className="threshold" id="top">
  <a href="/chat" className="atlas-skip-link">Skip to eAI chat</a>
  <header className="atlas-header">
   <a className="atlas-brand" href="#top"><span>eAI</span><small>Intelligence Engineered</small></a>
   <span className="atlas-chapter">THE THRESHOLD</span>
   <button className="atlas-menu" aria-expanded={menuOpen} aria-controls="atlas-nav" onKeyDown={e => {if(e.key === "Escape") setMenuOpen(false);}} onClick={() => setMenuOpen(!menuOpen)}>Menu {menuOpen ? "−" : "+"}</button>
   <nav id="atlas-nav" className={menuOpen ? "is-open" : ""} aria-label="Main navigation" onKeyDown={e=>{if(e.key === "Escape"){setMenuOpen(false);document.querySelector<HTMLButtonElement>(".atlas-menu")?.focus();}}} onClick={event => { const link=(event.target as HTMLElement).closest("a"); if(!link)return; setMenuOpen(false); const href=link.getAttribute("href"); if(href?.startsWith("#"))requestAnimationFrame(()=>{const target=document.getElementById(href.slice(1));if(target){target.setAttribute("tabindex","-1");target.focus({preventScroll:true});}}); }}>
    <a className="atlas-chat-nav" href="/chat">Chat with eAI</a><a href="#engineering" aria-current={["engineering","projects","platform"].includes(navSection) ? "location" : undefined}>Engineering Studio</a><a href="/study">Learning Studio</a><a href="#about" aria-current={navSection === "about" ? "location" : undefined}>About</a><a href="#contact" aria-current={navSection === "contact" ? "location" : undefined}>Contact</a>
   </nav>
   <a className="atlas-dai-entry" href="/study" aria-label="Explore dAI Learning Studio">Explore dAI <span aria-hidden="true">→</span></a>
  </header>
  <section className="atlas-hero" aria-labelledby="hero-title">
   <Image src="/images/threshold/gobekli-intelligence-vitruvian-v2.webp" alt="" fill preload sizes="100vw" className="atlas-landscape" />
   <div className="atlas-hero-shade"/>
   <div className="atlas-hero-copy"><p className="atlas-eyebrow">ANCIENT CURIOSITY. FUTURE POSSIBILITY.</p><h1 id="hero-title">From the first questions <br/>to the next intelligence.</h1><p className="atlas-heritage">Nearly 12,000 years ago, the builders of Göbekli Tepe created one of humanity’s earliest monumental architectural achievements—a legacy of imagination and ingenuity echoed in Leonardo’s studies and carried into the future through engineering and AI.</p><p>Meet your AI engineering assistant. Bring a question, explore an idea,<br className="desktop-break"/> or work through a challenge in coding, testing and cloud engineering.</p><div className="atlas-actions"><a className="atlas-button primary" href="/chat">Chat with eAI <span>→</span></a><Link className="atlas-button atlas-story-entry" href="/engineering">Explore Engineering Studio <span aria-hidden="true">↗</span></Link></div></div>
   <p className="atlas-caption">Göbekli Tepe, Türkiye · An imagined bridge to tomorrow</p>
  </section>

  <StartHere />
  <section className="lab-signature-entry" aria-labelledby="lab-entry-title"><div className="lab-entry-wrap"><div><p className="atlas-eyebrow">NEW / THE eAI INVESTIGATION LAB</p><h2 id="lab-entry-title">Something went wrong.<br/>Can you find out why?</h2><p>Step inside an engineering case. Make a prediction, inspect the evidence, and challenge the explanation—with an optional AI companion and a notebook for your discoveries.</p><div className="lab-entry-links"><Link className="atlas-button primary" href="/engineering/lab">Enter the Investigation Lab →</Link><Link href="/engineering/lab?view=project">Ask about a project ↗</Link></div></div><div className="lab-entry-method"><div><span>OBSERVED</span>What do the records establish?</div><div><span>INTERPRETATION</span>What might explain it?</div><div><span>MISSING EVIDENCE</span>What don’t we know yet?</div><div><span>NEXT CHECK</span>How could we test that?</div><p>Three recorded cases · One authored exercise · No services executed</p></div></div></section>
  <FlagshipProjects />
  <RecordedReplay />
  <section className="atlas-dai-invitation" aria-labelledby="dai-invitation-title">
   <div className="atlas-dai-art"><Image src="/images/study/library-horizon.webp" alt="" fill sizes="(max-width: 760px) 100vw, 44vw" /></div>
   <div className="atlas-dai-copy"><p className="atlas-eyebrow">dAI LEARNING STUDIO</p><h2 id="dai-invitation-title">Turn curiosity into understanding.</h2><p>Learn with an AI tutor, work from your materials, and prepare with purpose.</p><ul aria-label="Learning Studio features"><li>Personal learning plans</li><li>AI tutoring</li><li>PSAT &amp; SAT practice</li><li>Reading Room</li></ul><a className="atlas-button primary" href="/study">Explore the Learning Studio <span aria-hidden="true">→</span></a><p className="atlas-dai-note">Start without an account.</p><nav className="main-learning-links" aria-label="Learning rooms"><a href="/study#ai-assistant">AI Tutor ↗</a><Link href="/study/reading">Reading Room ↗</Link><Link href="/study/curiosity">Curiosity Room ↗</Link><Link href="/study/materials">Your materials ↗</Link></nav><aside className="main-discovery"><p className="atlas-eyebrow">ONE SMALL DISCOVERY</p><h3>A sketch can be a memory tool.</h3><p>Experiments have found a memory advantage for drawing studied items compared with writing them. Artistic skill is not the goal: representing the idea is.</p><p><a href="https://pubmed.ncbi.nlm.nih.gov/29873039/" target="_blank" rel="noreferrer">Source: Psychonomic Bulletin &amp; Review · 2018 ↗</a></p><Link href="/study/curiosity?fact=drawing-memory">Explore this discovery →</Link></aside></div>
  </section>
  <FieldNotes />
  <AIPhilosophy />
  <ContactDesk />
  <footer className="atlas-footer"><a className="atlas-brand" href="#top"><span>eAI</span><small>Intelligence Engineered</small></a><nav className="footer-destinations" aria-label="Footer navigation"><a href="https://github.com/kilicerdal" target="_blank" rel="noreferrer">GitHub ↗</a><Link href="/study">Learning Studio ↗</Link><Link href="/study/privacy">Learning privacy</Link></nav><small>© 2026 eAI · Erdal Kilic</small></footer>
 </main>;
}
