import {growthData} from './certification-growth-data';
import type {CertQuestion,CertTrack,CertId} from './certification-content';
export const GROWTH_REVIEWED='2026-11-17';
// Append-only records. Existing question IDs, option order, revision and answer identities are untouched.
export function expandedPracticeBank(tracks:readonly CertTrack[]):CertQuestion[]{
 return tracks.flatMap(track=>{
  const data=growthData[track.id];
  if(!data)throw Error('Missing authored expansion for '+track.id);
  const rows=data.rows.trim().split('\n');
  if(rows.length!==50)throw Error('Expected 50 new authored questions for '+track.id);
  return rows.map((row,index)=>{
   const parts=row.split('|');
   if(parts.length!==5)throw Error('Invalid authored row '+track.id+':'+index);
   const [domain,prompt,correct,alternatives,why]=parts,keys=[correct,...alternatives.split(',')];
   const section=track.domains.find(d=>d.id===domain);
   if(!section||new Set(keys).size!==4||keys.some(key=>!data.catalog[key]))throw Error('Invalid question mapping '+track.id+':'+index);
   const answer=index%4,ordered=keys.slice(4-answer).concat(keys.slice(0,4-answer));
   return {id:`${track.id}-growth-${String(index+1).padStart(3,'0')}`,track:track.id as CertId,domain,
    objective:`${section.title} · ${data.catalog[correct][0]}`,prompt,
    choices:ordered.map(key=>data.catalog[key][0]),answer,
    explanations:ordered.map(key=>key===correct?why:`${data.catalog[key][1]} In this scenario, ${why[0].toLowerCase()+why.slice(1)}`),
    distinction:data.catalog[correct][1],source:data.catalog[correct][2]??section.source,reviewed:GROWTH_REVIEWED};
  });
 });
}
