"use client";

import AIPhilosophy from "@/components/engineering/AIPhilosophy";
import "./engineering/ai-atlas.css";
import EngineeringStudio from "@/components/engineering/EngineeringStudio";
import "./engineering/studio.css";
import Image from "next/image";
import Link from "next/link";

import ContactDesk from "@/components/ContactDesk";
import "./contact-desk.css";


import "./threshold.css";

import { useEffect, useState } from "react";

export default function Home() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [navSection, setNavSection] = useState("ai-assistant");
 useEffect(() => {
   const sync = () => setNavSection(location.hash.slice(1) || "ai-assistant");
   sync(); window.addEventListener("hashchange", sync); return () => window.removeEventListener("hashchange", sync);
 }, []);
 return <main className="threshold" id="top">
  <a href="/chat" className="atlas-skip-link">Skip to eAI chat</a>
  <header className="atlas-header">
   <a className="atlas-brand" href="#top"><span>eAI</span><small>Intelligence Engineered</small></a>
   <span className="atlas-chapter">THE THRESHOLD</span>
   <button className="atlas-menu" aria-expanded={menuOpen} aria-controls="atlas-nav" onKeyDown={e => {if(e.key === "Escape") setMenuOpen(false);}} onClick={() => setMenuOpen(!menuOpen)}>Menu {menuOpen ? "−" : "+"}</button>
   <nav id="atlas-nav" className={menuOpen ? "is-open" : ""} aria-label="Main navigation" onKeyDown={e=>{if(e.key === "Escape"){setMenuOpen(false);document.querySelector<HTMLButtonElement>(".atlas-menu")?.focus();}}} onClick={event => { const link=(event.target as HTMLElement).closest("a"); if(!link)return; setMenuOpen(false); const href=link.getAttribute("href"); if(href?.startsWith("#"))requestAnimationFrame(()=>{const target=document.getElementById(href.slice(1));if(target){target.setAttribute("tabindex","-1");target.focus({preventScroll:true});}}); }}>
    <a className="atlas-chat-nav" href="/chat" aria-current={navSection === "ai-assistant" ? "location" : undefined}>Chat with eAI</a><a href="#engineering" aria-current={["engineering","projects","platform"].includes(navSection) ? "location" : undefined}>Engineering Studio</a><a href="/study">Learning Studio</a><a href="#about">About</a><a href="#contact" aria-current={navSection === "contact" ? "location" : undefined}>Contact</a>
   </nav>
   <a className="atlas-dai-entry" href="/study" aria-label="Explore dAI Learning Studio">Explore dAI <span aria-hidden="true">→</span></a>
  </header>
  <section className="atlas-hero" aria-labelledby="hero-title">
   <Image src="/images/threshold/gobekli-future.webp" alt="" fill preload sizes="100vw" className="atlas-landscape" />
   <div className="atlas-hero-shade"/>
   <div className="atlas-hero-copy"><p className="atlas-eyebrow">ANCIENT CURIOSITY. FUTURE POSSIBILITY.</p><h1 id="hero-title">From the first questions <br/>to the next intelligence.</h1><p>Meet your AI engineering assistant. Bring a question, explore an idea,<br className="desktop-break"/> or work through a challenge in coding, testing and cloud engineering.</p><div className="atlas-actions"><a className="atlas-button primary" href="/chat">Chat with eAI <span>→</span></a><Link className="atlas-button atlas-story-entry" href="/engineering">Explore Engineering Studio <span aria-hidden="true">↗</span></Link></div></div>
   <p className="atlas-caption">Göbekli Tepe, Türkiye · An imagined bridge to tomorrow</p>
  </section>

  <EngineeringStudio />
  <section className="atlas-dai-invitation" aria-labelledby="dai-invitation-title">
   <div className="atlas-dai-art"><Image src="/images/study/library-horizon.webp" alt="" fill sizes="(max-width: 760px) 100vw, 44vw" /></div>
   <div className="atlas-dai-copy"><p className="atlas-eyebrow">dAI LEARNING STUDIO</p><h2 id="dai-invitation-title">Turn curiosity into understanding.</h2><p>Learn with an AI tutor, work from your materials, and prepare with purpose.</p><ul aria-label="Learning Studio features"><li>Personal learning plans</li><li>AI tutoring</li><li>PSAT &amp; SAT practice</li><li>Reading Room</li></ul><a className="atlas-button primary" href="/study">Explore the Learning Studio <span aria-hidden="true">→</span></a><p className="atlas-dai-note">Start without an account.</p></div>
  </section>
  <AIPhilosophy />
  <ContactDesk />
  <footer className="atlas-footer"><a className="atlas-brand" href="#top"><span>eAI</span><small>Intelligence Engineered</small></a><nav className="footer-destinations" aria-label="Footer navigation"><a href="https://github.com/kilicerdal" target="_blank" rel="noreferrer">GitHub ↗</a><Link href="/study">Learning Studio ↗</Link><Link href="/study/privacy">Learning privacy</Link></nav><small>© 2026 eAI · Erdal Kilic</small></footer>
 </main>;
}
