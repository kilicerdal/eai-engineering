import Link from 'next/link';
import {portfolioOwnership,projectContributions,showcaseProjects,type ContributionProject} from '@/lib/main-showcase';

export default function ProjectOwnership({projectId,compact=false,anchor=false}:{projectId:ContributionProject;compact?:boolean;anchor?:boolean}){
 const project=showcaseProjects.find(p=>p.id===projectId)!;
 const work=projectContributions[projectId];
 return <section id={anchor?'ownership':undefined} className="project-ownership" aria-label={`Project ownership for ${project.title}`}>
  {!compact&&<p className="main-small">A personal portfolio project by Erdal Kilic, developed with AI assistance.</p>}
  <details><summary>Project ownership &amp; AI assistance</summary>
   <p>{portfolioOwnership.direction} {portfolioOwnership.assistance}</p>
   <dl><div><dt>Work in this project</dt><dd>{work.work}</dd></div><div><dt>Decision to inspect</dt><dd>{work.decision}</dd></div><div><dt>Evidence and limits</dt><dd>{work.evidence}</dd></div></dl>
   {'repository' in project&&<a href={project.repository} target="_blank" rel="noreferrer">Inspect the public repository ↗</a>}
   <p className="main-small">{portfolioOwnership.scope}</p>
   <Link href="/engineering/tour">Take the five-minute project tour →</Link>
  </details>
 </section>;
}
