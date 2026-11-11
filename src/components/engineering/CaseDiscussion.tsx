import Link from "next/link";
import { caseDiscussions, type CaseName } from "@/lib/case-discussion";

export default function CaseDiscussion({ name }: { name: CaseName }) {
  const item = caseDiscussions[name];
  const url = `https://www.eai.engineering/engineering/${name}`;
  const email = new URLSearchParams({
    subject: `Question about ${item.title}`,
    body: `I was looking at ${item.title}:\n${url}\n\nMy question: `,
  }).toString().replaceAll("+", "%20");
  return <section className="failure-section" aria-label="Discuss the evidence">
    <h2>Discuss this result</h2>
    <p>{item.result}</p>
    <div className="studio-case-actions">
      <Link href={`/chat?case=${name}`}>Ask eAI about this case →</Link>
      <a href={`mailto:hello@eai.engineering?${email}`}>Discuss this project by email ↗</a>
    </div>
  </section>;
}
