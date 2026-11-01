"use client";

import SharedAIChat from "@/components/SharedAIChat";
import StudyPractice from "@/components/StudyPractice";
import Link from "next/link";
import Image from "next/image";
import StudyNavigation from "@/components/StudyNavigation";

const subjects = [
  {
    icon: "🧮",
    name: "Mathematics",
    mode: "math",
    description: "Algebra, calculus, statistics, and problem solving.",
  },
  {
    icon: "🧬",
    name: "Science",
    mode: "science",
    description: "Biology, chemistry, physics, and scientific concepts.",
  },
  {
    icon: "✍️",
    name: "Writing Studio",
    mode: "writing",
    description: "Essays, research papers, editing, and writing guidance.",
  },
  {
    icon: "📚",
    name: "History & Humanities",
    mode: "history",
    description: "History, literature, philosophy, and critical analysis.",
  },
  {
    icon: "💻",
    name: "Computer Science",
    mode: "coding",
    description: "Programming, algorithms, and computer science.",
  },
  {
    icon: "⚙️",
    name: "Professional & Technical",
    mode: "engineering",
    description: "Cloud architecture, test automation, AI systems, and interview practice.",
  },
  {
    icon: "🎯",
    name: "Exam Preparation",
    mode: "exam",
    description: "Study guides, practice questions, and exam preparation.",
  },
];

export default function StudyPage() {
  return (
    <main className="studio-home">
      <section className="studio-hero" aria-labelledby="studio-title">
        <Image src="/images/study/library-horizon.webp" alt="" fill preload sizes="100vw" className="studio-hero-image" />
        <div className="studio-hero-shade" />
        <StudyNavigation overlay />
        <div className="studio-hero-copy">
          <p className="studio-eyebrow">THE ART OF UNDERSTANDING</p>
          <h1 id="studio-title">Explore what you<br className="studio-desktop-break" /> don’t yet know.</h1>
          <p className="studio-hero-subtitle">Ancient wisdom. New possibilities.</p>
          <p className="studio-hero-description">A space for curious minds. Connect ideas, explore your materials, and find a clearer path to understanding.</p>
          <div className="studio-hero-actions"><a className="studio-button-gold" href="#ai-assistant">Start exploring <span aria-hidden="true">↗</span></a><Link className="studio-button-glass" href="/study/materials">Bring your materials</Link></div>
          <p className="studio-hero-note">No account needed · Your work stays in this browser</p>
        </div>
        <a href="#discover" className="studio-hero-scroll">YOUR NEXT DISCOVERY <span aria-hidden="true">↓</span></a>
      </section>
      <section id="discover" className="studio-discover">
        <div className="studio-section-title"><div><p className="studio-eyebrow">A WORLD OF POSSIBILITIES</p><h2>Your next discovery</h2></div><p>Follow a question.<br />See where it takes you.</p></div>
        <div className="studio-pathways">
          <a href="#ai-assistant"><span className="studio-path-icon" aria-hidden="true">✧</span><h3>Ask your tutor</h3><p>Work through a challenging idea, one thoughtful step at a time.</p><span className="studio-path-link">Begin a conversation ↗</span></a>
          <Link href="/study/materials"><span className="studio-path-icon" aria-hidden="true">▤</span><h3>Study your materials</h3><p>Turn your notes and PDFs into explanations, guides, and source-based quizzes.</p><span className="studio-path-link">Open your library ↗</span></Link>
          <a href="#practice-lab"><span className="studio-path-icon" aria-hidden="true">⌘</span><h3>Practice and understand</h3><p>Test your thinking with focused questions, hints, and worked explanations.</p><span className="studio-path-link">Explore Practice Lab ↗</span></a>
        </div>
      </section>
      <section id="explore" className="studio-explore">
        <div className="studio-section-title"><div><p className="studio-eyebrow">CURIOSITY HAS NO BOUNDARIES</p><h2>Where will you begin?</h2></div><p>Across subjects.<br />At your pace.</p></div>
        <div className="studio-subjects">
          {subjects.map((subject) => (
            <a
              key={subject.name}
              href={subject.name === "Writing Studio" ? "/study/writing" : "#ai-assistant"}
              onClick={() => {
                try { sessionStorage.setItem("eai-study-selected-mode", subject.mode); } catch { /* Navigation still works when storage is unavailable. */ }
                window.dispatchEvent(new Event("eai-study-mode-change"));
              }}
              className="studio-subject"
            >
              <span className="studio-subject-number" aria-hidden="true">{String(subjects.indexOf(subject) + 1).padStart(2, "0")}</span>

              <h2 className="mb-3 text-xl font-bold">
                {subject.name}
              </h2>

              <p className="text-sm leading-7 text-slate-400">
                {subject.description}
              </p>
            </a>
          ))}
        </div>

      </section>
      <SharedAIChat />
      <StudyPractice />
    
      <div className="studio-footer">
        <Link href="/">EAI Engineering</Link><span>Knowledge opens possibilities.</span><span>Need a hand?{" "}
        <a
          href="mailto:support@eai.engineering"
          className="font-medium text-cyan-400 hover:underline"
        >
          Contact support
        </a></span>
      </div>

</main>
  );
}
