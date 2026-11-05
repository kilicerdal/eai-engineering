export type CareerFact={id:string;label:string;text:string;tags:string[]};
export type CareerSkill={name:string;aliases:string[];basis:'professional'|'project'|'resume_listed'};
export type CareerProfile={facts:CareerFact[];skills:CareerSkill[]};
export type CareerMode='question'|'match'|'matrix';
export type CareerAnswer={answer:string;facts:CareerFact[];rows:{skill:string;basis:string;years:string}[];kind:'answer'|'review'|'private'|'unknown';method?:'ai-selected'|'record-search'};
export function validProfile(value:unknown):CareerProfile{
 if(!value||typeof value!=='object')throw Error('Career profile unavailable');
 const profile=value as CareerProfile;
 if(!Array.isArray(profile.facts)||!Array.isArray(profile.skills)||profile.facts.length>60||profile.skills.length>80)throw Error('Invalid career profile');
 const ids=new Set<string>();
 for(const fact of profile.facts){if(!fact||typeof fact.id!=='string'||ids.has(fact.id)||typeof fact.label!=='string'||typeof fact.text!=='string'||fact.text.length>2000||!Array.isArray(fact.tags)||fact.tags.some(t=>typeof t!=='string'))throw Error('Invalid career fact');ids.add(fact.id);}
 for(const skill of profile.skills)if(!skill||typeof skill.name!=='string'||!Array.isArray(skill.aliases)||skill.aliases.some(a=>typeof a!=='string')||!['professional','project','resume_listed'].includes(skill.basis))throw Error('Invalid career skill');
 return profile;
}
function term(text:string,word:string){const escaped=word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(?<![a-z0-9])'+escaped+'(?![a-z0-9])','i').test(text);}
export function careerGate(text:string):CareerAnswer|null{
 if(/\b(?:ssn|social security|passport|driver.?s? licen[cs]e|date of birth|birthday|bank account|password|private emails?|other recruiters?)\b/i.test(text))return {answer:'Private identity records and other people’s conversations are not available through this assistant. Please contact Erdal directly.',facts:[],rows:[],kind:'private'};
 if(/\b(?:rtr|right[ -]+to[ -]+represent|exclusive representation|interview availability|schedule.{0,35}interview|availability.{0,35}(?:interview|call)|(?:interview|call).{0,35}availability)\b/i.test(text))return {answer:'Erdal needs to review interview availability and representation requests personally. For a call, use “Request a call with Erdal” below the conversation and share a preferred day, time windows and timezone. This assistant cannot approve RTR or commit to a time.',facts:[],rows:[],kind:'review'};
 if(/\b(?:ignore.{0,25}(?:instructions|rules)|system prompt|developer message|reveal.{0,15}secrets?)\b/i.test(text))return {answer:'I can answer job-related questions using Erdal’s approved career records.',facts:[],rows:[],kind:'unknown'};
 return null;
}
export function candidates(profile:CareerProfile,question:string):CareerFact[]{
 const words=question.toLowerCase().match(/[a-z0-9+#.]{2,}/g)||[];
 const ranked=profile.facts.map(fact=>({fact,score:fact.tags.reduce((sum,tag)=>sum+(term(question,tag)?4:0),0)+words.reduce((sum,word)=>sum+(word.length>3&&term(fact.label+' '+fact.text,word)?1:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5).map(x=>x.fact);
 if(ranked.length)return ranked;
 return /\b(?:about|overview|background|summary|yourself|who|experience)\b/i.test(question)?profile.facts.filter(f=>['summary','employment','certifications'].includes(f.id)).slice(0,3):[];
}
const basis={professional:'Confirmed professional experience',project:'Confirmed project experience; professional use needs confirmation',resume_listed:'Listed in resume; depth and professional use need confirmation'};
export function careerReply(profile:CareerProfile,question:string,mode:CareerMode,selectedIds?:string[]):CareerAnswer{
 const gated=careerGate(question);if(gated)return gated;
 if(mode==='matrix'||mode==='match'){
  const named=profile.skills.filter(skill=>[skill.name,...skill.aliases].some(alias=>term(question,alias)));
  const skills=mode==='matrix'&&!named.length?profile.skills:named;
  const rows=skills.map(skill=>({skill:skill.name,basis:basis[skill.basis],years:'Individual skill years not confirmed'}));
  const catalog=['C#','.NET','Robot Framework','Ruby','Go','Kafka','Spark','Rust','Scala','Swift','PHP','React','Angular','Azure','GCP','Terraform'];
  for(const name of catalog)if(term(question,name)&&!skills.some(s=>term(s.name,name)))rows.push({skill:name,basis:'Not confirmed in approved records',years:'Not confirmed'});
  return {answer:mode==='match'?'Documented alignment with this job description. These rows do not confirm every job requirement or acceptance of the role.':'Skills matrix from approved records. Overall career experience is not assigned to individual tools.',facts:[],rows,kind:rows.length?'answer':'unknown'};
 }
 const allowed=candidates(profile,question);
 const selected=selectedIds?.length?allowed.filter(f=>selectedIds.includes(f.id)):allowed;
 const facts=selected.length?selected:allowed;
 return {answer:facts.length?'Here is Erdal’s documented background relevant to your question:':'That detail is not confirmed in the approved career records. Please ask Erdal directly rather than relying on an estimate.',facts,rows:[],kind:facts.length?'answer':'unknown'};
}
