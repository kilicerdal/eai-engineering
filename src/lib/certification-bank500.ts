import {practiceQuestions500} from './certification-practice-questions';
import type {CertQuestion,CertTrack} from './certification-content';
export const practiceCaseByQuestion:Record<string,string>=Object.fromEntries(practiceQuestions500.map(q=>[q.id,q.id.replace(/-[123]$/,'')]));
// These 285 records are frozen; expanding a future bank must append new IDs.
export function makePracticeBank(tracks:CertTrack[],existing:readonly CertQuestion[]):CertQuestion[]{if(practiceQuestions500.some(q=>!tracks.some(t=>t.id===q.track)||existing.some(old=>old.id===q.id)))throw Error('Conflicting practice bank');return practiceQuestions500;}
