import {currentNewQuestions} from './certification-new-edition';
import type {NewQuestion} from './certification-new-paths';
import {certQuestions,type CertQuestion} from './certification-content';
import {practiceQuestion,QUALITY_REVISION} from './certification-quality';
import {practiceCaseByQuestion} from './certification-bank500';
import {smallLesson} from './certification-small-lessons';
import type {CertStudy} from './certification-study';

// Only authored concept mappings qualify. Same-domain or wording similarity is not enough.
export function transferQuestion(data:CertStudy,reviewed:CertQuestion){
 if(data.session?.finishedAt===null||reviewed.track!==data.track)return null;
 const concept=smallLesson(reviewed);if(!concept)return null;
 const excluded=new Set([...data.attempts.map(a=>a.question),...(data.session?.questions??[]),reviewed.id]);
 const family=practiceCaseByQuestion[reviewed.id];
 const candidate=certQuestions.find(q=>q.track===reviewed.track&&!excluded.has(q.id)&&smallLesson(q)?.id===concept.id&&q.prompt!==reviewed.prompt&&(!family||practiceCaseByQuestion[q.id]!==family));
 return candidate?{question:practiceQuestion(candidate.id,QUALITY_REVISION),concept:concept.title}:null;
}
export function completedSnapshot(data:CertStudy){
 const s=data.session;if(!s||s.finishedAt===null)return null;
 const checked=s.questions.filter(id=>s.answers[id]?.checked&&s.answers[id]?.selected!==null&&s.answers[id]?.selected!==undefined);
 const topics=[...new Set(s.questions.map(id=>certQuestions.find(q=>q.id===id)?.domain).filter(Boolean))];
 return {answered:checked.length,total:s.questions.length,topics:topics.length};
}

export function newTransferQuestion(reviewed:Pick<NewQuestion,'id'|'track'|'prompt'>,seen:string[]){const lesson=smallLesson(reviewed);if(!lesson)return null;const excluded=new Set([...seen,reviewed.id]);const question=currentNewQuestions().find(q=>q.track===reviewed.track&&!excluded.has(q.id)&&q.prompt!==reviewed.prompt&&smallLesson(q)?.id===lesson.id);return question?{question,concept:lesson.title}:null;}
