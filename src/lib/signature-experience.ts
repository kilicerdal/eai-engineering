import {ideaTopic} from './try-one-idea';
export const browserSavingScope='Saved in this browser means this browser and device. Keep a backup before clearing site data or moving devices.';
export function nextPracticeDestination(id:string){
 const topic=ideaTopic(id);
 if(topic==='AWS')return {href:'/study/certifications/scenarios',label:'Follow an AWS decision walkthrough'};
 if(topic==='Testing')return {href:'/engineering/order-once#evidence',label:'Inspect a recorded regression case'};
 if(['book-connection','recall','example-bank'].includes(id))return {href:'/study/reading',label:'Follow the idea into a book'};
 if(topic==='Everyday Learning')return {href:'/study/curiosity?fact=retrieval-practice',label:'Explore the source behind retrieval practice'};
 return {href:'/engineering/order-once',label:'Follow a complete engineering case'};
}
export const projectStories={
 'playwright':{problem:'A response can be lost after checkout commits, so a retry risks creating a second order.',decision:'Keep a logical operation identity consistent with its durable effect.',evidence:'Captured API, database and browser checks, including a controlled retry fault.',limit:'A recorded synthetic case; opening the story does not execute a service.'},
 'healthcare':{problem:'Queue acknowledgement can fail after a claim is stored, causing the same message to return.',decision:'Preserve the stored claim across redelivery and reject conflicting content.',evidence:'Pinned synthetic claim records and queue-simulation results.',limit:'Local simulation evidence, not a healthcare production deployment.'},
 'settlement':{problem:'Matching records can still share a mistake or move value without an independent check.',decision:'Use independent matching and review controls before value moves.',evidence:'A captured synthetic settlement showcase and its traceable records.',limit:'A local simulator, not a live trading or settlement service.'},
} as const;
export const visitorWalkthroughs=[
 {id:'first-visit',title:'First-time visitor',tasks:['From the homepage, explain what eAI offers in your own words.','Open the two-minute case, make a prediction and inspect the result.','Find the full evidence without help.'],success:'Can describe the purpose and reach the evidence without guessing which Studio to open.'},
 {id:'returning-learner',title:'Returning learner',tasks:['Save a short practice draft or a book position in this browser.','Leave the room, open Your space and find the saved work.','Explain where it is saved and find its backup option.'],success:'Returns to the intended item without losing writing and understands browser saving.'},
 {id:'recruiter',title:'Recruiter or collaborator',tasks:['Find Erdal’s role and one relevant project.','Identify the engineering decision, evidence and limitation.','Find the project source and contact route.'],success:'Can distinguish an implementation from a recorded result and an illustration.'},
] as const;
