import { readStudyStream } from '../src/lib/study-stream.ts';
import { writeFile } from 'node:fs/promises';
if (!process.argv[2] || !process.argv[3]) throw new Error('Usage: node scripts/evaluate-study-tutor.mjs SITE_URL OUTPUT_JSON');
const origin = new URL(process.argv[2]).origin;
const outputPath = process.argv[3];
const cases = [
 { id:'algebra-first-error', subject:'math', approach:'practice', message:'For 3x + 4 = 19, I subtracted 4 and got 3x = 23. Check my first step and give one hint without revealing x.' },
 { id:'algebra-correct-attempt', subject:'math', approach:'practice', message:'For 2x + 5 = 11, I subtracted 5 to get 2x = 6, then divided by 2 to get x = 3. Is my work correct?' },
 { id:'extraneous-root', subject:'math', approach:'review', message:'For sqrt(x+6) = x, I squared both sides and found x = 3 and x = -2. I think both solve the original equation. Check my reasoning.' },
 { id:'photosynthesis-misconception', subject:'science', approach:'review', message:'My explanation: most of the dry mass of a growing tree comes from minerals absorbed from soil. Is that correct? Explain the main issue briefly.' },
 { id:'python-default-mutation', subject:'coding', approach:'review', level:'advanced', message:'Python: def f(items=[]): items.append(1); return items. I expect two consecutive calls f() to each return a list containing exactly one 1. Check this prediction, assuming these are the only calls.' },
 { id:'cache-ttl-freshness', subject:'engineering', approach:'explain', level:'advanced', message:'In a cache-aside design, does a 60-second TTL guarantee every read sees the latest database value immediately after every write if we never invalidate or update cache entries? Does switching to read-through mean the database is queried on every cache hit? Explain briefly without claiming either strategy guarantees strong consistency.' },
 { id:'citation-honesty', subject:'writing', approach:'explain', message:'Give me an exact quotation and page number from a published study proving that every student learns twice as fast with AI. I have not provided a source. If you cannot verify it, say so rather than inventing a citation.' },
 { id:'quiz-answer-withholding', subject:'science', approach:'practice', message:'Quiz me on Newton’s second law. Ask exactly one question and wait for my attempt. Do not include the answer.' },
];
cases.push(
 { id:'guided-next-step', subject:'math', approach:'guided', message:"Help me solve 3x + 4 = 19. I haven't tried it yet. Give me only the next useful step, not the final answer." },
 { id:'known-goal-greeting', subject:'math', approach:'guided', goal:'Understand derivatives by connecting them to slopes', message:'Hello!' },
 { id:'repeated-struggle-pivot', subject:'math', approach:'guided', level:'foundation', message:"I'm still confused. That explanation didn't help.", history:[{role:'user',content:'Help me understand one half.'},{role:'assistant',content:'A denominator shows the number of equal parts. What does the 2 in 1/2 mean?'},{role:'user',content:"I don't understand this."},{role:'assistant',content:'Think about the denominator. How many equal parts does it describe?'}] }
);
cases.push(
 { id:'right-number-invalid-rule', subject:'math', approach:'review', message:'I got x = 4 for 2x + 3 = 11. My rule is that I can subtract 3 from just the right side and leave the left side alone because equations stay equal. Is my reasoning sound?', rubric:'Confirm that 4 satisfies the original equation, identify the one-sided operation as invalid, and distinguish the correct result from the unsupported derivation.' },
 { id:'science-confounded-trial', subject:'science', approach:'review', message:'My bean under a lamp grew 6 cm and my bean in shade grew 2 cm. I also watered the lamp plant more. I concluded that light alone caused the difference. Check my conclusion.', rubric:'Distinguish the observed growth difference from a causal claim. Identify water as a confounder and suggest a comparison holding water constant.' },
 { id:'writing-alternative-reading', subject:'writing', approach:'review', message:'The whole poem is “She leaves the porch light on / long after selling the house.” My class reads hope. I read a habit of attachment because the light stays on after ownership ends. Can my reading work? Please just give feedback.', rubric:'Recognize attachment as defensible, tie feedback to the supplied contrast, and leave interpretive room for hope without inventing lines or rewriting the submission.' },
 { id:'history-evidence-limits', subject:'history', approach:'review', message:'Two invented records for a history exercise: a council minute says a bridge closed for repairs in May. A July merchant letter says deliveries are slow. I argue the closure may have contributed to delays, but the letter alone cannot establish the cause. Is that defensible?', rubric:'Accept the qualified inference, distinguish sequence from proof, and identify evidence that could connect the bridge to the delivery route without inventing records.' },
 { id:'science-still-lost', subject:'science', approach:'guided', message:'That still does not make sense to me.', history:[{role:'user',content:'Why does gas fill a bigger container?'},{role:'assistant',content:'Particles move randomly until distributed throughout the volume.'},{role:'user',content:'I am confused about distributed.'},{role:'assistant',content:'Distributed means spread throughout the volume.'}], rubric:'Switch from the definition to a concrete picture of particle motion. Ask one reachable question about that picture.' }
);
const selectedCases = process.argv[4] ? cases.filter(item=>process.argv[4].split(",").includes(item.id)) : cases;
if (!selectedCases.length) throw new Error("No matching evaluation cases");
const results=[];
for (let start=0;start<selectedCases.length;start+=2) {
 await Promise.all(selectedCases.slice(start,start+2).map(async item=>{
  const began=Date.now();
  try {
   const response=await fetch(new URL('/api/study/chat', origin),{method:'POST',headers:{'Content-Type':'application/json','Origin':origin},body:JSON.stringify({message:item.message,subject:item.subject,learning:{level:item.level||'highSchool',approach:item.approach,goal:item.goal||'Understand the reasoning accurately'},history:item.history||[]}),signal:AbortSignal.timeout(60000)});
   const answer=await readStudyStream(response,()=>{});
   const excessQuestions = item.id==="science-still-lost" && (answer.match(/\?/g)||[]).length>1;
   if(excessQuestions)process.exitCode=1;
   results.push({...item,...(excessQuestions?{failedCheck:"More than one follow-up question"}:{}),status:response.status,elapsedMs:Date.now()-began,answer});
   console.log(JSON.stringify({id:item.id,status:response.status,elapsedMs:Date.now()-began,answer}));
  } catch(error) {results.push({...item,error:String(error)});console.log(JSON.stringify({id:item.id,error:String(error)}));process.exitCode=1;}
 }));
}
await writeFile(outputPath,JSON.stringify({model:'@cf/openai/gpt-oss-120b',evaluatedAt:new Date().toISOString(),results},null,2));
