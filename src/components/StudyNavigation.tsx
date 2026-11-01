import Link from "next/link";

export default function StudyNavigation({ overlay = false }: { overlay?: boolean }) {
  return <header className={`studio-nav ${overlay ? "studio-nav-overlay" : ""}`}>
    <Link href="/study" className="studio-brand"><span className="studio-emblem" aria-hidden="true">✧</span><span>EAI <span className="studio-brand-light">Study Studio</span></span></Link>
    <nav aria-label="Study navigation"><Link href="/study#learning-goal">My learning</Link><Link href="/study#ai-assistant">AI tutor</Link><Link href="/study/materials">Materials</Link><Link href="/study#practice-lab" className="studio-nav-action">Practice <span aria-hidden="true">↗</span></Link></nav>
  </header>;
}
