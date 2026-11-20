import fs from 'node:fs';
const editorial=JSON.parse(fs.readFileSync('data/art/editorial-v2.json','utf8'));
const paintings=JSON.parse(fs.readFileSync('data/art/paintings.json','utf8'));
const issues=[],warnings=[],counts={};
for(const [group,items]of Object.entries(editorial)){
 counts[group]=Object.keys(items).length;
 for(const [id,essay]of Object.entries(items)){
  const ids=new Set();
  for(const section of essay.sections){
   if(ids.has(section.id))issues.push(`${id}: duplicate section ${section.id}`);ids.add(section.id);
   for(const ref of section.sources)if(!Number.isInteger(ref)||!essay.sources[ref])issues.push(`${id}: missing citation ${ref}`);
   for(const paragraph of section.paragraphs)if(paragraph.split(/\s+/).length>180)warnings.push(`${id}/${section.id}: long paragraph for editorial review`);
  }
  for(const source of essay.sources){try{const u=new URL(source.url);if(u.protocol!=='https:')issues.push(`${id}: non-HTTPS source`);if(u.pathname==='/')warnings.push(`${id}: broad institutional source ${source.url}`);}catch{issues.push(`${id}: malformed source`);}}
  const words=[essay.lead,...essay.sections.flatMap(s=>s.paragraphs)].join(' ').split(/\s+/).length;
  if(words!==essay.words||Math.ceil(words/180)!==essay.minutes)issues.push(`${id}: inconsistent reading estimate`);
 }
}
for(const p of paintings){if(p.image&&!fs.existsSync('public'+p.image))issues.push(`${p.id}: missing original image`);if(!editorial.paintings[p.id])issues.push(`${p.id}: missing study`);}
const report={scope:'Local structural and editorial review; source URL shape is checked, not live link availability or verification of every claim.',counts,images:paintings.filter(p=>p.image).length,referenceOnly:paintings.filter(p=>!p.image).length,issues,warnings};
fs.mkdirSync('artifacts/art-refinement',{recursive:true});fs.writeFileSync('artifacts/art-refinement/editorial-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
