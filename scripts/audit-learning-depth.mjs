import {writeFileSync} from 'node:fs';
import {loadStudyModule} from '../tests/load-study-module.mjs';
const {certQuestions}=loadStudyModule('certification-content');
const {practiceQuestion,QUALITY_REVISION,activityLevel}=loadStudyModule('certification-quality');
const {practiceCaseByQuestion}=loadStudyModule('certification-bank500');
const {newPathQuestions}=loadStudyModule('certification-new-paths');
const {extraQuestions}=loadStudyModule('certification-extra-questions');
const {testForms}=loadStudyModule('certification-simple');
const {smallLesson}=loadStudyModule('certification-small-lessons');
const {learningDepth}=loadStudyModule('certification-learning-depth');
const questions=certQuestions.map(q=>practiceQuestion(q.id,QUALITY_REVISION));
const families=new Map();
for(const q of questions){const family=practiceCaseByQuestion[q.id]??`${q.track}:${smallLesson(q)?.id??q.domain}`;families.set(family,[...(families.get(family)??[]),q]);}
const terms=q=>new Set((q.objective+' '+q.prompt).toLowerCase().match(/[a-z]{4,}/g)?.filter(w=>!['which','what','that','this','with','from','most','should','would','when','have','does','they','their','then'].includes(w))??[]);
const pairs=[];
for(const [family,qs] of families){for(let i=0;i<qs.length;i++)for(let j=i+1;j<qs.length;j++){const a=terms(qs[i]),b=terms(qs[j]),common=[...a].filter(x=>b.has(x)).length,similarity=common/(a.size+b.size-common||1);if(similarity>=.55)pairs.push({family,questions:[qs[i].id,qs[j].id],similarity:Number(similarity.toFixed(2)),action:'Compare the deciding requirement and answer rationale manually; lexical overlap alone is not a duplicate verdict.'});}}
const forms=[...new Set(questions.map(q=>q.track))].map(track=>({track,forms:testForms(track).map(f=>({id:f.id,count:f.questions.length,topics:Object.fromEntries([...new Set(f.questions.map(id=>questions.find(q=>q.id===id).domain))].map(d=>[d,f.questions.filter(id=>questions.find(q=>q.id===id).domain===d).length])),activities:Object.fromEntries(['Understand','Apply','Investigate'].map(level=>[level,f.questions.filter(id=>activityLevel(questions.find(q=>q.id===id))===level).length]))}))}));
const sourceRows=[...questions,...extraQuestions,...newPathQuestions].map(q=>({id:q.id,objective:q.objective??q.section,url:q.source,reviewed:q.reviewed,hasFragment:new URL(q.source).hash.length>0,check:'Inspect the cited section against the actual rationale; a valid URL and mapped objective alone do not prove support.'}));
const wording=questions.filter(q=>/\b(always|never|only|guarantee|best|most appropriate)\b/i.test(q.prompt)).map(q=>({id:q.id,prompt:q.prompt,objective:q.objective,action:'Check that the stated conditions make one answer preferable; absolute or best wording is a review cue, not automatically an error.'}));
const report={generated:new Date().toISOString(),edition:QUALITY_REVISION,counts:{core:questions.length,extra:extraQuestions.length,newPathQuestions:newPathQuestions.length,total:sourceRows.length,conceptFamilies:families.size,refresherQuestions:questions.filter(q=>learningDepth(q)).length},limits:'Automated editorial triage, not factual certification or an official exam blueprint. Activity types are teaching labels inferred from authored wording. Historic sessions are untouched.',conceptOverlap:pairs,assumptionReview:wording,balancedForms:forms,sourceSectionQueue:sourceRows};
writeFileSync(process.argv[2]??'tmp/learning-depth-audit.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({counts:report.counts,overlapPairs:pairs.length,wordingChecks:wording.length,formSizes:forms.map(x=>[x.track,x.forms.map(f=>f.count)])},null,2));
