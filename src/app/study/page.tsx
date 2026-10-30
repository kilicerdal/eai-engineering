"use client";

import SharedAIChat from "@/components/SharedAIChat";
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

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-cyan-400">
            EAI EDUCATION
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Meet Your AI Study Assistant
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Your personal AI-powered learning companion for high school
            and college. Understand difficult concepts, practice problems,
            improve your writing, and prepare for exams.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
            Learn smarter. Think deeper. Achieve more.
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <a
              key={subject.name}
              href={subject.name === "Writing Studio" ? "/study/writing" : "#ai-assistant"}
              onClick={() => {
                sessionStorage.setItem("eai-study-selected-mode", subject.mode);
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

        <div className="mt-16 rounded-3xl border border-cyan-400/20 bg-[#101827] p-10 text-center">
          <h2 className="text-2xl font-bold">
            Your Learning Journey Starts Here
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            We are building an intelligent study environment with
            personalized tutoring, step-by-step explanations,
            academic writing support, and interactive practice.
          </p>

          <p className="mt-6 text-sm font-semibold text-cyan-300">
            AI tutoring interface coming next.
          </p>
        </div>
      </section>
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
