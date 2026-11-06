"use client";

import StudyGuide from "@/components/StudyGuide";
import { accountConfigured } from "@/lib/study-account";
import SharedAIChat from "@/components/SharedAIChat";
import LearningHome from "@/components/LearningHome";
import GoalLearning from "@/components/GoalLearning";
import ExamPreparation from "@/components/ExamPreparation";
import Link from "next/link";
import Image from "next/image";
import StudyGlyph from "@/components/StudyGlyph";
import LearningResources from "@/components/LearningResources";
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
          <StudyGuide section="Learning Studio">Ask the tutor a question, or bring a source you want to study. When you have a longer-term goal, open the learning plan and describe what you want to achieve.</StudyGuide><div className="studio-hero-actions"><a className="studio-button-gold" href="#ai-assistant">Start with your AI Tutor <span aria-hidden="true">↗</span></a><Link className="studio-button-glass" href="/study/materials">Bring your materials</Link></div>
          <p className="studio-hero-note">No account needed · {accountConfigured ? <Link href="/study/account">Optional account saving ↗</Link> : "Your work stays in this browser"}</p>
        </div>
        <a href="#ai-assistant" className="studio-hero-scroll">MEET YOUR AI TUTOR <span aria-hidden="true">↓</span></a>
      </section>
      <SharedAIChat />
      <LearningHome />
      <GoalLearning />
      <LearningResources />
      <ExamPreparation />
      <section id="explore" className="studio-explore">
        <div className="studio-section-title"><div><p className="studio-eyebrow">CURIOSITY HAS NO BOUNDARIES</p><h2>Where will you begin?</h2></div><p>Across subjects.<br />At your pace.</p></div>
        <StudyGuide section="Explore subjects">Pick a subject to set the tutor’s focus, then type your question. Writing opens a separate workspace where you can draft and revise an essay.</StudyGuide><div className="studio-subjects" aria-label="Explore learning subjects">
          <svg className="studio-orbit-lines" viewBox="0 0 1100 420" fill="none" aria-hidden="true"><ellipse cx="550" cy="210" rx="405" ry="145"/><ellipse cx="550" cy="210" rx="310" ry="108"/><ellipse cx="550" cy="210" rx="185" ry="70"/><ellipse cx="550" cy="210" rx="440" ry="90" transform="rotate(-10 550 210)"/><path d="M100 210H1000M550 45V375"/><circle cx="550" cy="210" r="39"/><circle cx="550" cy="210" r="53"/><circle cx="372" cy="151" r="3"/><circle cx="735" cy="245" r="4"/><circle cx="816" cy="134" r="2"/><circle cx="250" cy="259" r="3"/></svg>
          <div className="studio-orbit-core" aria-hidden="true"><StudyGlyph kind="general"/><span>dAI</span></div>
          {subjects.map((subject) => (
            <a
              key={subject.name}
              href={subject.name === "Writing Studio" ? "/study/writing" : subject.mode === "exam" ? "#exam-preparation" : "#ai-assistant"}
              onClick={() => {
                try { sessionStorage.setItem("eai-study-selected-mode", subject.mode); } catch { /* Navigation still works when storage is unavailable. */ }
                window.dispatchEvent(new Event("eai-study-mode-change"));
              }}
              title={subject.description}
              aria-label={`${subject.mode === "engineering" ? "Engineering" : subject.mode === "history" ? "History" : subject.mode === "writing" ? "Writing" : subject.name}: ${subject.description}`}
              className="studio-subject"
            >
              <span className="studio-subject-glyph"><StudyGlyph kind={subject.mode}/></span>
              <span className="studio-subject-label">{subject.mode === "engineering" ? "Engineering" : subject.mode === "history" ? "History" : subject.mode === "writing" ? "Writing" : subject.name}</span>
              <span className="studio-subject-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

      </section>


    
      <div className="studio-footer">
        <Link href="/">EAI Engineering</Link><Link href="/study/privacy">Privacy & saved learning</Link><span>Knowledge opens possibilities.</span><span>Need a hand?{" "}
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
