import Link from "next/link";

export default function StudyNavigation({ overlay = false }: { overlay?: boolean }) {
  return <header className={`studio-nav ${overlay ? "studio-nav-overlay" : ""}`}>
    <Link href="/study" className="studio-brand"><span className="studio-emblem" aria-hidden="true">✧</span><span>dAI <span className="studio-brand-light">Learning Studio</span></span></Link>
    <nav aria-label="Study navigation"><Link href="/" aria-label="Return to EAI Engineering main site" className="studio-main-site">← Return to eai.engineering</Link><Link href="/study#my-learning">My learning</Link><Link href="/study#ai-assistant">AI tutor</Link><Link href="/study/materials">Materials</Link><Link href="/study#exam-preparation" className="studio-nav-action">Exam prep <span aria-hidden="true">↗</span></Link></nav>
  </header>;
}
