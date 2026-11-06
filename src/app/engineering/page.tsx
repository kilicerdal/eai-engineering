import type { Metadata } from "next";
import Link from "next/link";
import EngineeringStudio from "@/components/engineering/EngineeringStudio";
import "../threshold.css";
import "./studio.css";

export const metadata: Metadata = {
  title: "Engineering Studio | eAI",
  description:
    "Explore eAI engineering case studies, inspect the projects and recorded evidence, and try the engineering tools in one place.",
  alternates: { canonical: "https://www.eai.engineering/engineering" },
};
export default function StudioPage() {
  return (
    <main className="threshold studio-page" id="top">
      <a className="atlas-skip-link" href="#case-studies">
        Skip to case studies
      </a>
      <header className="studio-page-header">
        <Link className="atlas-brand" href="/">
          <span>eAI</span>
          <small>Intelligence Engineered</small>
        </Link>
        <nav aria-label="Site navigation">
          <Link href="/">Home</Link>
          <Link href="/study">Learning Studio ↗</Link>
        </nav>
      </header>
      <EngineeringStudio fullPage />
      <footer className="atlas-footer">
        <Link href="/">eAI / Intelligence Engineered</Link>
        <a href="#top">Back to top ↑</a>
        <small>© 2026 eAI · Erdal Kilic</small>
      </footer>
    </main>
  );
}
