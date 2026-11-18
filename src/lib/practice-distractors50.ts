import type {PracticeCase} from './practice-lab-content';
const reasons:Record<string,[string,string]>={
  "retry": [
    "Color is presentation metadata, not evidence that the server stored a purchase.",
    "Message length describes the reported symptom, not the stored operation or its effects."
  ],
  "triage": [
    "This assumes recency proves causation while the environment changed too.",
    "A restart can hide a symptom without distinguishing version and environment effects."
  ],
  "architecture": [
    "Diagram length measures documentation, not whether reading works offline.",
    "Newness does not establish that a design meets the disconnected-work requirement."
  ],
  "requirements": [
    "Changing hardware does not define what performance the team has agreed to test.",
    "The fastest request deliberately omits the slower part of the workload."
  ],
  "review": [
    "Naming order does not address repeated business effects.",
    "Removing tests eliminates checks instead of correcting request identity."
  ],
  "aws-boundary": [
    "Hiding a diagram does not remove the embedded administrator credential.",
    "Broader permissions increase exposure without establishing a required action boundary."
  ],
  "aws-recovery": [
    "Unbounded retry traffic can amplify a dependency failure and exceed caller budgets.",
    "Removing logs reduces available observations without changing retry behavior."
  ],
  "aws-responsibility": [
    "The supplied EC2 task does not transfer AWS physical data-center maintenance to the customer.",
    "This assumes managed infrastructure removes application and workload responsibilities too."
  ],
  "aws-cost": [
    "An undated remembered rate cannot establish current service and regional cost.",
    "A headline rate excludes demand and other explicitly relevant drivers."
  ],
  "aws-troubleshoot": [
    "Administrator access changes the permission boundary before identifying the denied request.",
    "Random credentials change identity and risk exposure rather than explaining the existing denial."
  ],
  "boundary": [
    "These interior values do not exercise either stated acceptance edge.",
    "One accepted lower edge omits its neighbors and the upper edge."
  ],
  "risk": [
    "An omitted test leaves uncertainty; omission does not establish safety.",
    "Equal priority ignores the supplied difference in impact and likelihood."
  ],
  "defect": [
    "Blame does not provide a repeatable input or independent expected outcome.",
    "A symptom label alone cannot reproduce or evaluate this supplied failure."
  ],
  "oracle": [
    "A file name does not define the approved inclusive threshold.",
    "The generated assertion may repeat the same implementation error it should expose."
  ],
  "data": [
    "Alphabetical order does not establish uniqueness or validity of identifiers.",
    "Formatting is not a check that the reported distinct count matches the rows."
  ],
  "concurrency": [
    "Letter case does not inspect the overlap between the two pre-checks.",
    "A single successful request omits the simultaneous path that matters here."
  ],
  "handoff": [
    "Deleting the earlier report discards context without supplying the missing details.",
    "The supplied note lacks the observations needed to establish a cause."
  ],
  "security": [
    "Publishing a secret expands unauthorized access and does not clarify the required permission.",
    "A permanent wildcard grant assumes unrestricted access is required by a narrower task."
  ],
  "accessibility": [
    "Color alone does not make an error discoverable to keyboard or screen-reader users.",
    "Reducing font size does not associate an explanation with the invalid field."
  ],
  "api": [
    "Length does not check the approved JSON field types.",
    "Implementation language does not make a string satisfy an integer contract."
  ],
  "release": [
    "Ignoring the canary discards the supplied rollout observation.",
    "A successful build does not establish migration rollback compatibility."
  ],
  "test-maintenance": [
    "Accidental punctuation may not be part of the approved behavior; first inspect the requirement.",
    "A green result does not show whether the test protects the intended behavior."
  ],
  "flaky": [
    "A judgement about a person does not isolate shared state or timing.",
    "Renaming a test does not change the concurrent account updates."
  ],
  "scope": [
    "A small observed test set cannot establish exhaustive coverage of shared consumers.",
    "Untested behavior remains uncertain rather than becoming safe by omission."
  ],
  "ai-edge": [
    "Fluent wording does not provide a server trace or stored-state observation.",
    "Short sentences do not determine whether the causal claim is supported."
  ],
  "abstention": [
    "Invented records would misrepresent the missing evidence.",
    "Confidence cannot substitute for the absent server state."
  ],
  "source-quality": [
    "Agreement with our preferred answer is a confirmation filter, not a scope assessment.",
    "Document length does not establish authority, method or applicability."
  ],
  "monitoring": [
    "Successful replies alone can miss two effects for one logical purchase.",
    "Homepage speed does not measure the stated business-operation invariant."
  ],
  "alert": [
    "An emoji does not explain user impact, time window or what to inspect.",
    "The supplied alert signal identifies a symptom, not its independently established cause."
  ],
  "slow": [
    "Process uptime does not describe the distribution of request latency.",
    "The fastest request omits the slow group that motivated the investigation."
  ],
  "benchmark": [
    "A warm-cache sample with fewer requests does not establish universal version superiority.",
    "A chart label does not hold the sample conditions constant."
  ],
  "migration": [
    "An exit code does not exercise old and new reader/writer compatibility.",
    "Immediate deletion can remove recovery options before compatibility is demonstrated."
  ],
  "api-change": [
    "Hostname length does not address clients expecting an integer quantity.",
    "A new client's success omits the supported older clients in the question."
  ],
  "cache": [
    "Presence does not determine age, freshness or other allowed reuse conditions.",
    "A machine name does not establish a response's cache lifetime."
  ],
  "consistency": [
    "A stale replica observation does not establish that the committed write disappeared.",
    "This assumes the immediate-current guarantee that must first be defined and supported."
  ],
  "time": [
    "A preferred clock is not an agreed reporting-day timezone.",
    "A date string without its timezone and business rule leaves the grouping ambiguous."
  ],
  "leak": [
    "A larger limit can delay the symptom while leaving resource ownership unresolved.",
    "Renaming the variable does not release resources on the error path."
  ],
  "degrade": [
    "A blank screen discards the already-loaded essential task because an optional feature failed.",
    "Inventing recommendations hides unavailability and presents unsupported content."
  ],
  "queue": [
    "Uptime does not compare arrival and completion rates or backlog age.",
    "Existence alone says nothing about whether the queue is accumulating work."
  ],
  "runbook": [
    "A universal restart ignores the preconditions and alternative observations of this incident.",
    "A restart can change a symptom without establishing that the cause was fixed."
  ],
  "postmortem": [
    "The supplied system events do not establish a person's unobserved intent.",
    "Blame replaces the sequence and contributing conditions needed for learning."
  ],
  "automation": [
    "Generated line count does not measure net time saved or maintenance effort.",
    "Popularity does not establish value for this particular frequency and risk."
  ],
  "ai-generated-test": [
    "The supplied assertion passes even when the threshold policy is violated.",
    "Duplicating the same assertion repeats its blind spot rather than adding an independent oracle."
  ],
  "upgrade": [
    "Installation success does not exercise the changed timeout behavior.",
    "Popularity does not establish compatibility with this workload and configuration."
  ],
  "unknown": [
    "Waiting for total certainty leaves others without useful current observations.",
    "An invented cause would misrepresent what the team has established."
  ],
  "human-ai": [
    "An author label does not supply evidence missing from an answer.",
    "Human authorship also does not exempt a claim from the same evidence rubric."
  ],
  "reading-ideas": [
    "Fiction is not a measured workload or an engineering benchmark.",
    "An analogy does not establish that an author proved a software principle."
  ]
};
export function choiceReason50(c:PracticeCase,index:number){if(index===c.answer)return c.why;const wrong=c.choices.map((_,i)=>i).filter(i=>i!==c.answer);return reasons[c.id]?.[wrong.indexOf(index)]??'This option needs a source-aware review against the supplied constraint.';}
