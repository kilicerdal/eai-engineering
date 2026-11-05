import type { ReactNode } from "react";

export default function StudyGuide({ section, children }: { section: string; children: ReactNode }) {
  return (
    <details className="studio-how-to">
      <summary>How this works<span className="sr-only"> for {section}</span></summary>
      <p>{children}</p>
    </details>
  );
}
