import StudyNavigation from "@/components/StudyNavigation";
import CourseMaterials from "@/components/CourseMaterials";

export default function MaterialsPage() {
  return <main className="studio-materials">
    <StudyNavigation />
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      <p className="text-xs font-bold tracking-[0.2em] text-cyan-300">THE PERSONAL LIBRARY</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Your materials. New understanding.</h1>
      <p className="mb-9 mt-5 max-w-3xl text-base leading-8 text-slate-400">Study any text-based subject with your own notes and PDFs. Ask focused questions, inspect the source text, and turn a chapter into a study guide or practice conversation.</p>
      <CourseMaterials />
      <p className="mt-8 text-xs leading-6 text-slate-500">AI explanations can contain mistakes. Source links help you check the evidence. Materials are stored in this browser and are not synced across devices.</p>
    </section>
  </main>;
}
