"use client";

import SharedAIChat from "@/components/SharedAIChat";
import StudyPractice from "@/components/StudyPractice";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#080d19] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-xl font-bold text-cyan-400">
            eAI Engineering
          </Link>

          <Link
            href="/"
            className="text-sm text-slate-300 transition hover:text-cyan-400"
          >
            ← Back to Engineering
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-cyan-400">
            EAI EDUCATION
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Your next breakthrough starts here.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            For students and professionals who want to understand the why. Set a learning goal,
            work through challenging ideas, and turn feedback into your next step.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#ai-assistant" className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300">Start a learning session →</a>
            <a href="#practice-lab" className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-slate-200 hover:border-cyan-300">Open Practice Lab</a>
            <Link href="/study/materials" className="rounded-xl border border-cyan-300/30 bg-cyan-300/5 px-6 py-3 font-semibold text-cyan-200 hover:bg-cyan-300/10">Study with your materials ↗</Link>
          </div>

          <div className="mt-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
            Guided learning · Focused practice · Thoughtful feedback
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <a
              key={subject.name}
              href={subject.name === "Writing Studio" ? "/study/writing" : "#ai-assistant"}
              onClick={() => {
                try { sessionStorage.setItem("eai-study-selected-mode", subject.mode); } catch { /* Navigation still works when storage is unavailable. */ }
                window.dispatchEvent(new Event("eai-study-mode-change"));
              }}
              className="block rounded-2xl border border-white/10 bg-[#111a2b] p-7 transition hover:border-cyan-400/40"
            >
              <div className="mb-5 text-4xl">{subject.icon}</div>

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
      <StudyPractice />
      <SharedAIChat />
    
      <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-slate-400">
        Need help with EAI Study Assistant?{" "}
        <a
          href="mailto:support@eai.engineering"
          className="font-medium text-cyan-400 hover:underline"
        >
          Contact Technical Support
        </a>
      </div>

</main>
  );
}
