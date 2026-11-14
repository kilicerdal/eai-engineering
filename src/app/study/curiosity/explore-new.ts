import {facts,type Fact} from './facts';
// Count unique revealed discoveries, never clicks or time on the page. Select a
// least-explored eligible topic first, so large topics do not dominate ties.
export function exploreSomethingNew(list:Fact[],seen:string[],current:string,topicRandom:number,cardRandom:number):Fact|null {
  const read=new Set(seen),counts=new Map<string,number>();
  for(const fact of facts)if(read.has(fact.id))counts.set(fact.category,(counts.get(fact.category)||0)+1);
  const groups=new Map<string,Fact[]>();
  for(const fact of list)if(!read.has(fact.id)&&fact.id!==current){const group=groups.get(fact.category)||[];group.push(fact);groups.set(fact.category,group);}
  if(!groups.size)return null;
  const minimum=Math.min(...[...groups.keys()].map(topic=>counts.get(topic)||0));
  const eligible=[...groups.entries()].filter(([topic])=>(counts.get(topic)||0)===minimum);
  const index=(n:number,length:number)=>Math.floor(Math.max(0,Math.min(Number.isFinite(n)?n:0,1-Number.EPSILON))*length);
  const choices=eligible[index(topicRandom,eligible.length)][1];return choices[index(cardRandom,choices.length)];
}
