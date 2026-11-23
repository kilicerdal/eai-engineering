
import type {ReactNode} from "react";
import QuietChapter from "@/components/QuietChapter";
import StudyGuide from "@/components/StudyGuide";
import { accountConfigured } from "@/lib/study-account";
import SharedAIChat from "@/components/SharedAIChat";
import LearningHome from "@/components/LearningHome";
import GoalLearning from "@/components/GoalLearning";
import ExamPreparation from "@/components/ExamPreparation";
import Link from "next/link";
import Image from "next/image";
import StudySubjectLink from "@/components/StudySubjectLink";
import StudyGlyph from "@/components/StudyGlyph";
import StudyResumeShortcut from "@/components/StudyResumeShortcut";
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

const firstVisitOutcomes: Record<string, string> = {
  "Reading Room": "Find one book or passage to stay with.",
  "Art Room": "Look closely at one work and understand a choice the artist made.",
  "Curiosity Room": "Follow one surprising claim back to its evidence.",
  "Nobel Stories": "See what the award recognized and what its citation leaves out.",
  "AI Tutor": "Leave with a clearer next step on your question.",
  "Certification Studio": "Work through one question and understand the answer.",
  "Your materials": "Connect a source to a question of your own.",
  "Writing Studio": "Shape one idea into a clearer draft.",
};

export default function StudyPage({entrance}:{entrance:ReactNode}) {
  return (
    <main className="studio-home">
      <section className="studio-hero" aria-labelledby="studio-title">
        <Image src="/images/study/library-horizon.webp" alt="" fill preload sizes="100vw" className="studio-hero-image" />
        <div className="studio-hero-shade" />
        <StudyNavigation overlay />
        <div className="studio-hero-copy">
          <StudyResumeShortcut />
          <p className="studio-eyebrow">THE ART OF UNDERSTANDING</p>
          <h1 id="studio-title">Explore what you<br className="studio-desktop-break" /> don’t yet know.</h1>
          <p className="studio-hero-subtitle">Ask questions. Study your sources. Put ideas into practice.</p>
          <details className="studio-intro-details"><summary>What can I do here?</summary><p className="studio-hero-description">Work through a question with your AI tutor, learn from your own materials, or build a focused study plan.</p></details>
          <p className="studio-hero-note">No account needed · {accountConfigured ? <Link href="/study/account">Optional account saving ↗</Link> : "Your work stays in this browser"}</p>
        </div>
        <a href="#learning-rooms" className="studio-hero-scroll">Choose a room <span aria-hidden="true">↓</span></a>
      </section>
      {entrance}
      <nav id="learning-rooms" tabIndex={-1} className="quiet-rooms" aria-label="Choose a learning room">{[
        {title:'Read, look and discover',rooms:[['Reading Room','Find a book and settle in.','/study/reading'],['Art Room','Look closely, meet the artist, follow the story.','/study/art'],['Curiosity Room','Quick discoveries and deeper investigations.','/study/curiosity'],['Nobel Stories','Meet the people and understand the achievement.','/study/nobel']]},
        {title:'Understand and practice',rooms:[['AI Tutor','Work through one question.','/study/tutor'],['Certification Studio','Practice an engineering decision.','/study/certifications']]},
        {title:'Work with your own ideas',rooms:[['Your materials','Study from your own sources.','/study/materials'],['Writing Studio','Give an idea your own words.','/study/writing']]}
      ].map(group=><section key={group.title}><h2>{group.title}</h2><div>{group.rooms.map(([name,detail,href])=><Link key={href} href={href}><strong>{name} <span aria-hidden="true">↗</span></strong><span>{detail}</span><span className="quiet-room-outcome">A good first visit: {firstVisitOutcomes[name]}</span><span className="quiet-room-action">Start with {name} →</span></Link>)}</div></section>)}</nav>
      <QuietChapter title="Your learning and plans" description="Sessions, plans and exam preparation"><LearningHome/><GoalLearning/><ExamPreparation/></QuietChapter>
      <QuietChapter title="Ask your Tutor here" description="The full embedded workspace, including your existing sessions"><SharedAIChat/></QuietChapter>
      <QuietChapter title="More ways to learn" description="Your library, reading resources and subject shortcuts"><LearningResources/>
      <section id="explore" className="studio-explore">
        <div className="studio-section-title"><div><p className="studio-eyebrow">CHOOSE A SUBJECT</p><h2>Explore by subject.</h2></div><p>Across subjects.<br />At your pace.</p></div>
        <StudyGuide section="Explore subjects">Pick a subject to set the tutor’s focus, then type your question. Writing opens a separate workspace where you can draft and revise an essay.</StudyGuide><div className="studio-subjects" aria-label="Explore learning subjects">
          <svg className="studio-orbit-lines" viewBox="0 0 1100 420" fill="none" aria-hidden="true"><ellipse cx="550" cy="210" rx="405" ry="145"/><ellipse cx="550" cy="210" rx="310" ry="108"/><ellipse cx="550" cy="210" rx="185" ry="70"/><ellipse cx="550" cy="210" rx="440" ry="90" transform="rotate(-10 550 210)"/><path d="M100 210H1000M550 45V375"/><circle cx="550" cy="210" r="39"/><circle cx="550" cy="210" r="53"/><circle cx="372" cy="151" r="3"/><circle cx="735" cy="245" r="4"/><circle cx="816" cy="134" r="2"/><circle cx="250" cy="259" r="3"/></svg>
          <div className="studio-orbit-core" aria-hidden="true"><StudyGlyph kind="general"/><span>dAI</span></div>
          {subjects.map((subject) => (
            <StudySubjectLink key={subject.name} mode={subject.mode} description={subject.description} label={subject.mode === "engineering" ? "Engineering" : subject.mode === "history" ? "History" : subject.mode === "writing" ? "Writing" : subject.name}>
              <span className="studio-subject-glyph"><StudyGlyph kind={subject.mode}/></span>
              <span className="studio-subject-label">{subject.mode === "engineering" ? "Engineering" : subject.mode === "history" ? "History" : subject.mode === "writing" ? "Writing" : subject.name}</span>
              <span className="studio-subject-arrow" aria-hidden="true">↗</span>
            </StudySubjectLink>
          ))}
        </div>

      </section>


    
      </QuietChapter>
      <div className="studio-footer">
        <div className="studio-footer-statement"><p>Ask a better question.<br/>Build a clearer understanding.</p><span>dAI Learning Studio · From eAI Engineering</span></div><nav aria-label="Learning Studio footer"><Link href="/">eAI Engineering</Link><Link href="/study/privacy">Privacy & saved learning</Link><span>Need a hand?{" "}
        <a
          href="mailto:support@eai.engineering"
          className="font-medium text-cyan-400 hover:underline"
        >
          Contact support
        </a></span></nav>
      </div>

</main>
  );
}
