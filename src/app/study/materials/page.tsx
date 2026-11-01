import StudyNavigation from "@/components/StudyNavigation";
import CourseMaterials from "@/components/CourseMaterials";

export default function MaterialsPage() {
  return <main className="studio-materials">
    <StudyNavigation />
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      <div className="library-page-intro"><p className="studio-eyebrow">THE PERSONAL LIBRARY</p><h1>Your library</h1><p>Bring your sources. Explore the ideas.</p></div>
      <CourseMaterials />
      <p className="mt-8 text-xs leading-6 text-slate-500">AI explanations can contain mistakes. Source links help you check the evidence. Materials are stored in this browser and are not synced across devices.</p>
    </section>
  </main>;
}
