import Link from "next/link";
import CourseMaterials from "@/components/CourseMaterials";

export default function MaterialsPage() {
  return <main className="min-h-screen bg-[#080d19] text-white">
    <header className="border-b border-white/10"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6"><Link href="/" className="text-xl font-bold text-cyan-300">eAI Engineering</Link><Link href="/study" className="text-sm text-slate-300 hover:text-cyan-300">← Study workspace</Link></div></header>
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      <p className="text-xs font-bold tracking-[0.2em] text-cyan-300">YOUR COURSES · YOUR CONTEXT</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Bring your materials. Build understanding.</h1>
      <p className="mb-9 mt-5 max-w-3xl text-base leading-8 text-slate-400">Study any text-based subject with your own notes and PDFs. Ask focused questions, inspect the source text, and turn a chapter into a study guide or practice conversation.</p>
      <CourseMaterials />
      <p className="mt-8 text-xs leading-6 text-slate-500">AI explanations can contain mistakes. Source links help you check the evidence. Materials are stored in this browser and are not synced across devices.</p>
    </section>
  </main>;
}
