"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { accountConfigured } from "@/lib/study-account";

export default function StudyNavigation({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, [pathname]);
  const current = (href: string): "page" | "location" | undefined => {
    const [path, anchor] = href.split("#");
    if(pathname==="/study/exams"&&href==="/study#exam-preparation")return "page";
    if (pathname !== path) return undefined;
    if (!anchor) return "page";
    return hash === `#${anchor}` || (!hash && anchor === "ai-assistant") ? "location" : undefined;
  };
  return <header className={`studio-nav ${overlay ? "studio-nav-overlay" : ""}`} onKeyDown={event => { if(event.key === "Escape") {setMenuOpen(false); document.getElementById("study-menu-toggle")?.focus();} }}>
    <Link href="/study" className="studio-brand"><span className="studio-emblem" aria-hidden="true">✧</span><span>dAI <span className="studio-brand-light">Learning Studio</span></span></Link>
    <button id="study-menu-toggle" className="studio-menu-toggle" aria-expanded={menuOpen} aria-controls="study-navigation-links" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}<span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
    <div className="studio-mobile-shortcuts"><Link href="/study#ai-assistant" onClick={()=>setHash("#ai-assistant")}>AI tutor</Link><Link href="/study#my-learning" onClick={()=>setHash("#my-learning")}>My learning</Link></div>
    <nav id="study-navigation-links" data-open={menuOpen} aria-label="Study navigation" onClick={()=>setMenuOpen(false)}><Link href="/" aria-label="Return to eAI Engineering main site" className="studio-main-site">← Return to eai.engineering</Link><Link href="/study#ai-assistant" aria-current={current("/study#ai-assistant")} onClick={() => setHash("#ai-assistant")}>AI tutor</Link><Link href="/study#my-learning" aria-current={current("/study#my-learning")} onClick={() => setHash("#my-learning")}>My learning</Link><Link href="/study/reading" aria-current={current("/study/reading")}>Reading room</Link><Link href="/study/materials" aria-current={current("/study/materials")}>Materials</Link><Link href="/study#exam-preparation" aria-current={current("/study#exam-preparation")} onClick={() => setHash("#exam-preparation")} className="studio-nav-action">Exam prep</Link>{accountConfigured && <Link href="/study/account" aria-current={current("/study/account")}>Account</Link>}</nav>
  </header>;
}
