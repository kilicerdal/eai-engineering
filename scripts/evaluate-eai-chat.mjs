import assert from 'node:assert/strict';
import { readStudyStream } from '../src/lib/study-stream.ts';

const origin = new URL(process.argv[2] || 'http://localhost:3000').origin;
async function ask(mode, message, history = []) {
  const response = await fetch(new URL('/api/chat', origin), {method:'POST', headers:{'Content-Type':'application/json', Origin:origin}, body:JSON.stringify({mode,message,history}), signal:AbortSignal.timeout(60000)});
  const answer = await readStudyStream(response,()=>{},true);
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
