"use client";
import ShortCaseResume from '@/components/ShortCaseResume';

import HeritageRow from "@/components/HeritageRow";
import ProblemEntry from "@/components/problem/ProblemEntry";
import YourNextStep from "@/components/YourNextStep";
import AIPhilosophy from "@/components/engineering/AIPhilosophy";
import "./engineering/ai-atlas.css";
import {StartHere, FlagshipProjects, RecordedReplay, FieldNotes} from "@/components/engineering/MainShowcase";
import "./engineering/main-showcase.css";
import "./engineering/lab/lab.css";
import "./explore/explore.css";
import "./engineering/studio.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ContactDesk from "@/components/ContactDesk";
import "./contact-desk.css";


import "./threshold.css";
import "./heritage-backgrounds.css";
import "./homepage-clarity.css";
import "./signature-package.css";

import { useEffect, useState, type MouseEvent } from "react";

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
 function focusHomeSection(event: MouseEvent<HTMLElement>) {
   const link = (event.target as HTMLElement).closest("a");
   if (!link) return;
   setMenuOpen(false);
   const href = link.getAttribute("href");
   if (href?.startsWith("#")) requestAnimationFrame(() => {
     const target = document.getElementById(href.slice(1));
     if (target) { target.setAttribute("tabindex", "-1"); target.focus({preventScroll:true}); }
   });
 }
 return <main className="threshold" id="top">
  <a href="/chat" className="atlas-skip-link">Skip to eAI chat</a>
  <header className="atlas-header">
   <a className="atlas-brand" href="#top"><span>eAI</span><small>Intelligence Engineered</small></a>
   <span className="atlas-chapter">THE THRESHOLD</span>
   <button className="atlas-menu" aria-expanded={menuOpen} aria-controls="atlas-nav" onKeyDown={e => {if(e.key === "Escape") setMenuOpen(false);}} onClick={() => setMenuOpen(!menuOpen)}>Menu {menuOpen ? "−" : "+"}</button>
   <nav id="atlas-nav" className={menuOpen ? "is-open" : ""} aria-label="Main navigation" onKeyDown={e=>{if(e.key === "Escape"){setMenuOpen(false);document.querySelector<HTMLButtonElement>(".atlas-menu")?.focus();}}} onClick={focusHomeSection}>
    <a href="#engineering" aria-current={["engineering","projects","platform"].includes(navSection) ? "location" : undefined}>Solve</a><a href="/study" aria-label="Learning Studio">Learn</a><a href="/explore">Explore</a><a href="#about" aria-current={navSection === "about" ? "location" : undefined}>About</a><a href="#contact" aria-current={navSection === "contact" ? "location" : undefined}>Contact</a>
   </nav>
   <a className="atlas-dai-entry" href="/study" aria-label="Explore dAI Learning Studio">Explore dAI <span aria-hidden="true">→</span></a>
  </header>
  <section className="atlas-hero" aria-labelledby="hero-title">
   <Image src="/images/threshold/gobekli-intelligence-vitruvian-v2.webp" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="atlas-landscape" />
   <div className="atlas-hero-shade"/>
   <div className="atlas-hero-copy">
    <p className="atlas-eyebrow">ANCIENT CURIOSITY. FUTURE POSSIBILITY.</p>
    <h1 id="hero-title">From the first questions <br/>to the next intelligence.</h1>
    <p className="home-purpose">Inspect engineering projects, learn with dAI, or work through a question with your AI assistant.</p>
    <div className="atlas-actions home-primary-actions">
     <Link className="atlas-button primary" href="/engineering">Explore Engineering Studio <span aria-hidden="true">→</span></Link>
     <Link className="atlas-button atlas-learning-entry" href="/study">Explore Learning Studio <span aria-hidden="true">→</span></Link>
    </div>
    <div className="signature-hero-secondary"><Link className="home-chat-link" href="/start/two-minutes">Try eAI in two minutes →</Link><Link className="home-chat-link" href="/chat">Chat with eAI →</Link></div><ShortCaseResume/>
    <details className="home-artwork-story"><summary>About the opening artwork</summary><p className="atlas-heritage">Nearly 12,000 years ago, the builders of Göbekli Tepe created one of humanity’s earliest monumental architectural achievements—a legacy of imagination and ingenuity echoed in Leonardo’s studies and carried into the future through engineering and AI.</p></details>
   </div>
   <p className="atlas-caption">Göbekli Tepe · An imagined bridge to tomorrow</p>
  </section>

  <nav className="home-jump-nav" aria-label="Homepage sections" onClick={focusHomeSection}>
   <span>Jump to</span>
   {[['project-work','Projects'],['learning','Learning'],['artwork','Artwork'],['contact','Contact']].map(([id,label])=><a key={id} href={`#${id}`} aria-current={navSection===id?'location':undefined}>{label}</a>)}
  </nav>
  <HeritageRow id="project-work" scene="colosseum-engineering" caption="Colosseum · Engineering across time" projects><FlagshipProjects /></HeritageRow>
  <HeritageRow scene="measure-of-time" caption="The Measure of Time · Ancient geometry, future precision" imageWidth={1122} imageHeight={1402} reverse><RecordedReplay /></HeritageRow>
  <HeritageRow id="artwork" scene="ephesus-ai" caption="Ephesus · Ancient knowledge, future possibility"><ProblemEntry /></HeritageRow>
  <HeritageRow scene="mont-saint-michel-ai" caption="Mont-Saint-Michel · An imagined bridge to future intelligence" reverse><div className="heritage-return">
   <YourNextStep />
   <details className="main-wrap problem-other-starts"><summary>Other ways to explore eAI and dAI</summary><StartHere /></details>
   <p className="heritage-scene-caption">Mont-Saint-Michel · An imagined bridge to future intelligence</p>
  </div></HeritageRow>
  <HeritageRow scene="taj-mahal-ai" caption="Taj Mahal · Imagination carried into the future"><section className="explore-home-entry" aria-labelledby="explore-entry-title"><div><p className="atlas-eyebrow">NEW / eAI EXPLORE</p><h2 id="explore-entry-title">See an idea move.</h2><p>Move a pivot. Make waves. Train a tiny AI. Discover nine interactive experiences in engineering and beyond.</p></div><Link href="/explore">Show me how it works →</Link><p className="heritage-scene-caption">Taj Mahal · Imagination carried into the future</p></section></HeritageRow>
  <HeritageRow scene="acropolis-ai" caption="Acropolis · From first principles to future intelligence" reverse><section className="lab-signature-entry" aria-labelledby="lab-entry-title"><div className="lab-entry-wrap"><div><p className="atlas-eyebrow">NEW / THE eAI INVESTIGATION LAB</p><h2 id="lab-entry-title">Something went wrong.<br/>Can you find out why?</h2><p>Step inside an engineering case. Make a prediction, inspect the evidence, and challenge the explanation—with an optional AI companion and a notebook for your discoveries.</p><div className="lab-entry-links"><Link className="atlas-button primary" href="/engineering/lab">Enter the Investigation Lab →</Link><Link href="/engineering/lab?view=project">Ask about a project ↗</Link></div></div><div className="lab-entry-method"><div><span>OBSERVED</span>What do the records establish?</div><div><span>INTERPRETATION</span>What might explain it?</div><div><span>MISSING EVIDENCE</span>What don’t we know yet?</div><div><span>NEXT CHECK</span>How could we test that?</div><p>Three recorded cases · One authored exercise · No services executed</p></div></div><p className="heritage-scene-caption">Acropolis · From first principles to future intelligence</p></section></HeritageRow>
  <section id="learning" className="atlas-dai-invitation" aria-labelledby="dai-invitation-title">
   <div className="atlas-dai-art"><Image src="/images/study/library-horizon.webp" alt="" fill sizes="(max-width: 760px) 100vw, 44vw" /></div>
   <div className="atlas-dai-copy"><p className="atlas-eyebrow">dAI LEARNING STUDIO</p><h2 id="dai-invitation-title">Turn curiosity into understanding.</h2><p>Learn with an AI tutor, work from your materials, and prepare with purpose.</p><ul aria-label="Learning Studio features"><li>Personal learning plans</li><li>AI tutoring</li><li>PSAT &amp; SAT practice</li><li>Reading Room</li></ul><a className="atlas-button primary" href="/study">Explore the Learning Studio <span aria-hidden="true">→</span></a><p className="atlas-dai-note">Start without an account.</p><nav className="main-learning-links" aria-label="Learning rooms"><a href="/study#ai-assistant">AI Tutor ↗</a><Link href="/study/reading">Reading Room ↗</Link><Link href="/study/curiosity">Curiosity Room ↗</Link><Link href="/study/materials">Your materials ↗</Link><Link href="/study/certifications">Certification Studio ↗</Link></nav><aside className="main-discovery"><p className="atlas-eyebrow">ONE SMALL DISCOVERY</p><h3>A sketch can be a memory tool.</h3><p>Experiments have found a memory advantage for drawing studied items compared with writing them. Artistic skill is not the goal: representing the idea is.</p><p><a href="https://pubmed.ncbi.nlm.nih.gov/29873039/" target="_blank" rel="noreferrer">Source: Psychonomic Bulletin &amp; Review · 2018 ↗</a></p><Link href="/study/curiosity?fact=drawing-memory">Explore this discovery →</Link></aside></div>
  </section>
  <HeritageRow scene="baalbek-suspended" caption="Baalbek · From stone columns to suspended structures"><FieldNotes /></HeritageRow>
  <AIPhilosophy />
  <HeritageRow scene="hegra-knowledge" caption="Hegra · A future of knowledge within the earth" reverse><ContactDesk /></HeritageRow>
  <div id="artwork-footer" className="artwork-footer"><HeritageRow scene="room-that-remembers" caption="The Room That Remembers · Art becomes a place for reflection" imageWidth={1774} imageHeight={887}><footer className="atlas-footer"><a className="atlas-brand" href="#top"><span>eAI</span><small>Intelligence Engineered</small></a><nav className="footer-destinations" aria-label="Footer navigation"><a href="https://github.com/kilicerdal" target="_blank" rel="noreferrer">GitHub ↗</a><Link href="/study">Learning Studio ↗</Link><Link href="/study/privacy">Learning privacy</Link></nav><small>© 2026 eAI · Erdal Kilic</small></footer></HeritageRow></div>
 </main>;
}
