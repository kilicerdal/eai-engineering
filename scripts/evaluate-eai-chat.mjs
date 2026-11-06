import assert from 'node:assert/strict';
import { readStudyStream } from '../src/lib/study-stream.ts';

const origin = new URL(process.argv[2] || 'http://localhost:3000').origin;
async function ask(mode, message, history = []) {
  const started = performance.now();
  const response = await fetch(new URL('/api/chat', origin), {method:'POST', headers:{'Content-Type':'application/json', Origin:origin}, body:JSON.stringify({mode,message,history}), signal:AbortSignal.timeout(60000)});
  const answer = await readStudyStream(response,()=>{},true);
  console.log(JSON.stringify({mode, elapsedMs:Math.round(performance.now()-started), answerCharacters:answer.length}));
  console.log(message, answer);
  return answer;
}
const question = 'Which project on this website demonstrates API testing with PostgreSQL? Give its name and repository link.';
const project = await ask('general',question);
assert.match(project,/AI Healthcare Quality Platform/i);
assert.ok(project.includes('https://github.com/kilicerdal/ai-healthcare-quality-platform'));
const followUp = await ask('general','Which CI service does that project list?', [{role:'user',content:question},{role:'assistant',content:project}]);
assert.match(followUp,/GitHub Actions/i);
const lab = await ask('general','What public repository link is listed for AI Engineering Lab?');
assert.doesNotMatch(lab,/github\.com\/kilicerdal\/ai-engineering-lab/i);
assert.match(lab,/no |not |isn.t|unlisted|unavailable/i);
const debug = await ask('debug','CI says locator.click timed out on getByRole("button",{name:"Save"}). No trace is attached. What would you inspect first and why? Answer in two sentences.');
assert.match(debug,/trace|action log|call log|actionability/i);
const review = await ask('review','Review async function ok(page){return page.getByText("Saved").isVisible();}. It must wait and return a boolean. Give a concise Playwright JavaScript fix.');
assert.match(review,/waitFor\s*\(/);
assert.doesNotMatch(review,/visible:\s*true|waitForFunction/);
const log = await ask('debug','Analyze this CI log: "POST /orders returned 401; expected 201". No server logs are attached. Quote the relevant evidence, distinguish a hypothesis, and give one verification step.');
assert.match(log,/401/); assert.match(log,/auth|token|credential/i);
assert.doesNotMatch(log,/page\.post\s*\(/);

assert.doesNotMatch(log,/```/);
console.log("PASS six model scenarios; semantic checks are not a guarantee of correctness.");

const sequential = await ask('review','What is wrong with await items.forEach(async item => { await save(item); }); ? Give a sequential fix that propagates errors.');
assert.match(sequential,/for\s*\(\s*(?:const|let)\s+\w+\s+of\s+items\s*\)/);
assert.doesNotMatch(sequential,/await Promise\.all/);
const fetchErrors = await ask('coding','In JavaScript fetch, does HTTP 500 reject the promise? Show a small example that handles HTTP errors, network errors, and invalid JSON separately.');
assert.match(fetchErrors,/response\.ok|res\.ok/); assert.match(fetchErrors,/pars|JSON/i);
const auth = await ask('qa','A test returns 200 for an unauthorized request but expected 401. Does this prove authentication works? Give the next verification step, no code.');
assert.match(auth,/without|omit|missing|absen|remov/i);
const sql = await ask('review','Correct this Node pg query against SQL injection: pool.query("SELECT * FROM users WHERE email = " + email). Use the email value as a parameter.');
assert.match(sql,/\$1/); assert.match(sql,/\[email\]/); assert.doesNotMatch(sql,/```sql\s*pool/);
console.log('PASS ten model scenarios. Review outputs as well as assertions.');
