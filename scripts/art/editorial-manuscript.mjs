/** Explicit section IDs keep published passage links stable through manuscript builds. */
export function parseEditorialManuscript(raw){
 const sources=[],sections=[];let title='',lead='',reviewed='2026-11-20',current,continued=false;
 for(const line of raw.split('\n')){
  if(line.startsWith('@reviewed ')){reviewed=line.slice(10).trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(reviewed))throw Error('Invalid editorial review date');}
  else if(line.startsWith('@source ')){const body=line.slice(8);if(body.trim().startsWith('{'))sources.push(JSON.parse(body));else{const [title,url,scope]=body.split('|');sources.push({title:title.trim(),url:url.trim(),scope:scope?.trim()??'Historical context and work record'});}}
  else if(line.startsWith('# '))title=line.slice(2).trim();
  else if(line.startsWith('> '))lead+=(lead?' ':'')+line.slice(2).trim();
  else if(line.startsWith('## ')){const [heading,kind='analysis',citations='',explicitId]=line.slice(3).split('|');const id=explicitId?.trim()||'section-'+(sections.length+1);if(!/^[a-z0-9-]+$/.test(id)||sections.some(s=>s.id===id))throw Error('Invalid or duplicate section ID: '+id);current={id,title:heading.trim(),kind:kind.trim(),sources:citations.split(',').map(s=>s.trim()).filter(Boolean).map(s=>Number(s)-1),paragraphs:[]};sections.push(current);continued=false;}
  else if(line.trim()&&current){const last=current.paragraphs.length-1;if(continued&&last>=0)current.paragraphs[last]+=' '+line.trim();else current.paragraphs.push(line.trim());continued=true;}
  else continued=false;
 }
 const unique=[],mapping=sources.map(source=>{let index=unique.findIndex(s=>s.url===source.url);if(index<0){index=unique.length;unique.push({...source});}else if(!unique[index].scope.includes(source.scope))unique[index].scope+=' '+source.scope;return index;});
 for(const section of sections){section.sources=[...new Set(section.sources.map(index=>{if(!Number.isInteger(index)||!sources[index])throw Error('Unknown source reference in '+section.id);return mapping[index];}))];}
 const words=[lead,...sections.flatMap(s=>s.paragraphs)].join(' ').split(/\s+/).filter(Boolean).length;
 return {title,lead,sections,sources:unique,words,minutes:Math.ceil(words/180),edition:'Art Room · editorial V2',reviewed};
}
