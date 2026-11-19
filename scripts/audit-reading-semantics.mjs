import {readFile,writeFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {loadStudyModule as load} from '../tests/load-study-module.mjs';
const {readingChapters}=load('reading/navigation');
const normalize=s=>s.normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const issues=[],records=[];
for(const [book,chapters]of Object.entries(readingChapters)){
 const edition=JSON.parse(gunzipSync(await readFile(`data/reading/${book}.json.gz`)));
 const flat=edition.sections.flatMap((section,i)=>section.map(p=>({...p,section:i})));
 for(const chapter of chapters){
  const at=flat.findIndex(p=>p.id===chapter.paragraph&&p.section===chapter.section),p=flat[at];
  const label=normalize(chapter.label),anchor=p?normalize(p.text):'',joined=normalize(flat.slice(at,at+3).map(p=>p.text).join(' '));
  // Short undivided works intentionally use a title label at the first source paragraph.
  const titleLabel=/ · (complete|source text)/.test(chapter.label);
  const match=!!anchor&&(anchor.startsWith(label)||joined.startsWith(label)||label==='chapter'+anchor);
  const status=titleLabel?'editorial-title-entry':match?'source-label-reconciled':'needs-label-review';
  if(status==='needs-label-review')issues.push({book,...chapter,anchorPreview:p?.text.slice(0,180)??'Missing anchor'});
  records.push({book,...chapter,status});
 }
}
const report={scope:'All contents labels reconciled to the unchanged loaded source heading, up to two following paragraphs for split titles. Editorial title entries in undivided works are distinct. This is not a reading of every narrative paragraph or an assessment of the original author’s claims. No saved positions or book text is changed.',counts:{books:Object.keys(readingChapters).length,headings:records.length,sourceLabels:records.filter(r=>r.status==='source-label-reconciled').length,titleEntries:records.filter(r=>r.status==='editorial-title-entry').length,issues:issues.length},issues,records};
await writeFile(process.argv[2]??'tmp/reading-semantics-review.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.counts));if(issues.length)process.exitCode=1;
