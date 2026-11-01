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
const results=[];
for (let start=0;start<cases.length;start+=2) {
 await Promise.all(cases.slice(start,start+2).map(async item=>{
  const began=Date.now();
  try {
   const response=await fetch(new URL('/api/study/chat', origin),{method:'POST',headers:{'Content-Type':'application/json','Origin':origin},body:JSON.stringify({message:item.message,subject:item.subject,learning:{level:item.level||'highSchool',approach:item.approach,goal:item.goal||'Understand the reasoning accurately'},history:item.history||[]}),signal:AbortSignal.timeout(60000)});
   const answer=await readStudyStream(response,()=>{});
   results.push({...item,status:response.status,elapsedMs:Date.now()-began,answer});
   console.log(JSON.stringify({id:item.id,status:response.status,elapsedMs:Date.now()-began,answer}));
  } catch(error) {results.push({...item,error:String(error)});console.log(JSON.stringify({id:item.id,error:String(error)}));}
 }));
}
await writeFile(outputPath,JSON.stringify({model:'@cf/openai/gpt-oss-120b',evaluatedAt:new Date().toISOString(),results},null,2));
