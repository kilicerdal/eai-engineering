export type PracticeGroup='Engineering'|'AWS'|'ISTQB'|'AI'|'Reading';
export type PracticeCase={id:string;group:PracticeGroup;title:string;scenario:string;ask:string;choices:string[];answer:number;why:string;evidence:{id:string;title:string;text:string;relevant:boolean}[];tool:string;sources:string[];limit:string;revision:string};
export const practiceCases:PracticeCase[]=[
 {
  "id": "retry",
  "group": "Engineering",
  "title": "The reply disappeared",
  "scenario": "A fictional checkout times out after a purchase request. The customer retries using the original request identity.",
  "ask": "Which observation best distinguishes a lost reply from a failed purchase?",
  "choices": [
   "The button color",
   "The stored operation identity and effects",
   "The length of the timeout message"
  ],
  "answer": 1,
  "why": "The stored identity and effects address what happened; a client symptom cannot establish server state.",
  "evidence": [
   {
    "id": "e1",
    "title": "Client trace",
    "text": "The response deadline passed after 2 seconds.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Operation record",
    "text": "Request key k-17 maps to order-42; stock changed 20 → 18 once.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Theme change",
    "text": "The checkout button changed from blue to green yesterday.",
    "relevant": false
   }
  ],
  "tool": "concurrency",
  "sources": [
   "retry"
  ],
  "limit": "One synthetic sequential record cannot establish concurrency safety.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "triage",
  "group": "Engineering",
  "title": "Two explanations, one useful check",
  "scenario": "A fictional release shows more errors. Both a new application version and a changed environment are possible explanations.",
  "ask": "What would separate these explanations?",
  "choices": [
   "Compare versions under a fixed environment",
   "Assume the most recent code change is guilty",
   "Restart until the symptom disappears"
  ],
  "answer": 0,
  "why": "A controlled comparison can distinguish explanations while a restart changes several conditions.",
  "evidence": [
   {
    "id": "e1",
    "title": "Versions",
    "text": "v1 and v2 were deployed to different environments.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Configuration",
    "text": "Only environment B has a lower connection limit.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Office move",
    "text": "The team changed desks this week.",
    "relevant": false
   }
  ],
  "tool": "reproduction",
  "sources": [
   "sre"
  ],
  "limit": "A controlled comparison is proposed, not executed.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "architecture",
  "group": "Engineering",
  "title": "A design with a constraint",
  "scenario": "A fictional team needs an offline reference tool. Option A reads a remote API every time; B keeps a versioned local copy.",
  "ask": "What should guide the choice?",
  "choices": [
   "Newest technology",
   "The offline requirement and update trade-off",
   "The longer architecture diagram"
  ],
  "answer": 1,
  "why": "An offline requirement favors local availability, with freshness and storage responsibilities made explicit.",
  "evidence": [
   {
    "id": "e1",
    "title": "Requirement",
    "text": "The reference must open during a disconnected shift.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Updates",
    "text": "Content changes weekly; delayed updates are acceptable for one shift.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Popularity",
    "text": "A blog calls remote APIs modern.",
    "relevant": false
   }
  ],
  "tool": "architecture",
  "sources": [
   "reliability"
  ],
  "limit": "This exercise supplies constraints; it does not choose an architecture for every system.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "requirements",
  "group": "Engineering",
  "title": "Turn “fast” into a test",
  "scenario": "A fictional requirement says: search should be fast. The team has not defined a workload or acceptable latency.",
  "ask": "Which clarification makes a test interpretable?",
  "choices": [
   "Use a faster computer",
   "Specify workload, response percentile and threshold",
   "Measure only the fastest request"
  ],
  "answer": 1,
  "why": "Workload, metric and threshold define a measurable acceptance criterion.",
  "evidence": [
   {
    "id": "e1",
    "title": "Stakeholder",
    "text": "The target workflow searches 10,000 entries.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Current sample",
    "text": "Only one warm request was measured.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Logo",
    "text": "The product has a new logo.",
    "relevant": false
   }
  ],
  "tool": "requirements",
  "sources": [
   "sre"
  ],
  "limit": "A percentile threshold must be agreed with stakeholders, not invented by the tool.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "review",
  "group": "Engineering",
  "title": "Review the retry patch",
  "scenario": "A fictional patch generates a fresh operation key inside every retry attempt. The intended contract is one purchase for repeated attempts at the same intent.",
  "ask": "What is the important review question?",
  "choices": [
   "Does each retry preserve the same operation identity?",
   "Are variable names alphabetical?",
   "Can we remove every test?"
  ],
  "answer": 0,
  "why": "The identity boundary is central to this supplied contract; style changes do not establish safe effects.",
  "evidence": [
   {
    "id": "e1",
    "title": "Contract",
    "text": "An equivalent retry must retain one intended order.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Patch",
    "text": "retry(() => send({key: randomId(), item: \"book\"}))",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Formatting",
    "text": "The patch uses four spaces.",
    "relevant": false
   }
  ],
  "tool": "code-review",
  "sources": [
   "retry"
  ],
  "limit": "No supplied patch has been executed or certified safe.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "aws-boundary",
  "group": "AWS",
  "title": "Find the missing trust boundary",
  "scenario": "A fictional AWS worker reads one approved bucket. Its diagram shows an embedded administrator key, and no workload role.",
  "ask": "Which boundary needs improvement?",
  "choices": [
   "Give the worker broader access",
   "Use scoped workload permissions and temporary credentials",
   "Hide the diagram"
  ],
  "answer": 1,
  "why": "Workload roles and least-privilege scope address credential handling and permissions separately.",
  "evidence": [
   {
    "id": "e1",
    "title": "Need",
    "text": "Read objects in one approved bucket only.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Design",
    "text": "A long-lived administrator key is embedded in deployment configuration.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Icon",
    "text": "The bucket icon is a different color.",
    "relevant": false
   }
  ],
  "tool": "architecture",
  "sources": [
   "iam"
  ],
  "limit": "A diagram review does not inspect actual permissions or prove an IAM policy is safe.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "aws-recovery",
  "group": "AWS",
  "title": "A dependency is unavailable",
  "scenario": "A fictional worker retries every failed request immediately. During a dependency outage, request volume grows sharply.",
  "ask": "Which experiment is useful?",
  "choices": [
   "Increase retries indefinitely",
   "Compare bounded retries with backoff under the same simulated failure",
   "Disable all logging"
  ],
  "answer": 1,
  "why": "Bounded retry behavior can be compared under a fixed failure pattern. Recovery still needs representative load testing.",
  "evidence": [
   {
    "id": "e1",
    "title": "Outage",
    "text": "The dependency is unavailable for the first three attempts.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Client",
    "text": "Every client retries without delay.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Homepage",
    "text": "The homepage loads successfully.",
    "relevant": false
   }
  ],
  "tool": "retry-model",
  "sources": [
   "backoff"
  ],
  "limit": "This toy schedule illustrates request timing, not real AWS performance.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "aws-responsibility",
  "group": "AWS",
  "title": "Who owns this control?",
  "scenario": "A fictional EC2 application needs physical infrastructure security, guest OS maintenance and appropriate application permissions.",
  "ask": "Which statement fits the shared-responsibility distinction?",
  "choices": [
   "AWS owns every control",
   "Responsibilities depend on the service and control",
   "The customer maintains AWS data-center hardware"
  ],
  "answer": 1,
  "why": "Separate the provider infrastructure from customer configuration and workload responsibilities.",
  "evidence": [
   {
    "id": "e1",
    "title": "Service",
    "text": "The workload uses customer-managed EC2 instances.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Tasks",
    "text": "The list includes patching the guest OS and defining application access.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Invoice",
    "text": "The invoice uses a new template.",
    "relevant": false
   }
  ],
  "tool": "responsibility",
  "sources": [
   "shared"
  ],
  "limit": "Responsibilities differ for managed services; this exercise explicitly uses EC2.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "aws-cost",
  "group": "AWS",
  "title": "Compare cost drivers",
  "scenario": "A fictional service processes requests and retains data. The two options have different fixed, request and storage costs.",
  "ask": "What makes a comparison meaningful?",
  "choices": [
   "Compare only the headline rate",
   "Use the same workload and include the stated cost drivers",
   "Use an undated price from memory"
  ],
  "answer": 1,
  "why": "Compare consistent demand, region, date and pricing basis. The calculator uses editable teaching rates, not an AWS quotation.",
  "evidence": [
   {
    "id": "e1",
    "title": "Demand",
    "text": "The exercise assumes one million requests and 50 GB-months.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Rates",
    "text": "Teaching rates are editable and deliberately not presented as current AWS prices.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Brand",
    "text": "One option has a more attractive name.",
    "relevant": false
   }
  ],
  "tool": "cost",
  "sources": [
   "pricing"
  ],
  "limit": "Consult the linked official price pages for actual regions, services and current charges.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "aws-troubleshoot",
  "group": "AWS",
  "title": "Choose the next observation",
  "scenario": "A fictional service returns access denied after a deployment. The principal, resource and action have not been recorded.",
  "ask": "What should come before changing permissions?",
  "choices": [
   "Grant administrator access",
   "Identify the actual principal, action, resource and denial context",
   "Retry with random credentials"
  ],
  "answer": 1,
  "why": "A bounded denial record supports targeted inspection; broad permissions hide the question and expand access.",
  "evidence": [
   {
    "id": "e1",
    "title": "Symptom",
    "text": "The request was denied after deployment.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Missing context",
    "text": "The current principal and requested resource are not supplied.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Weather",
    "text": "It rained during deployment.",
    "relevant": false
   }
  ],
  "tool": "reproduction",
  "sources": [
   "iam"
  ],
  "limit": "The exercise never changes AWS credentials or access policies.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "boundary",
  "group": "ISTQB",
  "title": "Test the edges",
  "scenario": "A fictional form accepts integer quantities from 10 through 20 inclusive. Values outside that range are rejected.",
  "ask": "Which set checks both sides of both stated boundaries?",
  "choices": [
   "10 only",
   "9, 10, 11, 19, 20, 21",
   "15, 16, 17"
  ],
  "answer": 1,
  "why": "The displayed three-value boundary exercise includes each boundary and its neighboring values.",
  "evidence": [
   {
    "id": "e1",
    "title": "Rule",
    "text": "Integers 10–20 inclusive are accepted.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Input type",
    "text": "Non-integers are outside the stated integer input domain.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Layout",
    "text": "The quantity box is centered.",
    "relevant": false
   }
  ],
  "tool": "boundary",
  "sources": [
   "istqb"
  ],
  "limit": "Coverage is for this defined boundary exercise, not the complete form specification.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "risk",
  "group": "ISTQB",
  "title": "Choose tests under a budget",
  "scenario": "A fictional team has six effort points before release. Risks have supplied likelihood and impact ratings.",
  "ask": "What should the team explain?",
  "choices": [
   "Why the selected coverage addresses important risks within the budget",
   "Why every test has equal priority",
   "Why an untested area must be safe"
  ],
  "answer": 0,
  "why": "Prioritization should expose the supplied risk assumptions and remaining untested areas.",
  "evidence": [
   {
    "id": "e1",
    "title": "Budget",
    "text": "Six effort points are available.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Risk notes",
    "text": "Duplicate payment has high impact; cosmetic spacing has low impact.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Popularity",
    "text": "A test has the most likes.",
    "relevant": false
   }
  ],
  "tool": "risk",
  "sources": [
   "istqb"
  ],
  "limit": "Likelihood × impact is a teaching prioritization model, not an objective probability.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "defect",
  "group": "ISTQB",
  "title": "Write a useful defect report",
  "scenario": "A fictional quantity field accepts 21 although the approved range is 10–20. The environment and build are known.",
  "ask": "What should the report preserve?",
  "choices": [
   "A blame statement",
   "Steps, expected and actual result, build and evidence",
   "Only “broken”"
  ],
  "answer": 1,
  "why": "A reproducible report separates the observed result from an unproven cause.",
  "evidence": [
   {
    "id": "e1",
    "title": "Build",
    "text": "Test build 7, browser profile A.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Observation",
    "text": "Entering integer 21 and submitting displays Accepted.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Opinion",
    "text": "Someone says forms are always unreliable.",
    "relevant": false
   }
  ],
  "tool": "defect",
  "sources": [
   "istqb"
  ],
  "limit": "This is a supplied fictional defect; no real product was tested.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "oracle",
  "group": "ISTQB",
  "title": "What establishes the expected result?",
  "scenario": "A fictional generated test expects discounts for orders over 100. The approved policy says discounts start at 100 inclusive.",
  "ask": "What should establish the expectation?",
  "choices": [
   "The generated assertion",
   "The approved policy",
   "The test file name"
  ],
  "answer": 1,
  "why": "An independent approved basis should justify the expected behavior; generated syntax is not an oracle.",
  "evidence": [
   {
    "id": "e1",
    "title": "Policy",
    "text": "A discount applies when the order total is at least 100.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Generated test",
    "text": "The generated expected result excludes an order total of exactly 100.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Length",
    "text": "The test file contains many lines.",
    "relevant": false
   }
  ],
  "tool": "requirements",
  "sources": [
   "istqb"
  ],
  "limit": "The supplied policy is the exercise oracle; real policies can require clarification.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "data",
  "group": "Engineering",
  "title": "The extra record",
  "scenario": "A fictional import contains repeated identifiers and one row with a missing identifier. A summary counts every row as a unique customer.",
  "ask": "Which check addresses the claim?",
  "choices": [
   "Count unique non-empty identifiers and inspect repeated rows",
   "Trust the summary because it is formatted",
   "Sort names alphabetically only"
  ],
  "answer": 0,
  "why": "Distinguish row count, unique identity and missing values before interpreting the summary.",
  "evidence": [
   {
    "id": "e1",
    "title": "CSV",
    "text": "id,name\n1,Ada\n1,Ada\n,Bo\n2,Cy",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Summary",
    "text": "Four rows were labeled four unique customers.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Export name",
    "text": "The file name ends in final-final.csv.",
    "relevant": false
   }
  ],
  "tool": "data",
  "sources": [
   "data"
  ],
  "limit": "The synthetic parser supports a simple comma-separated teaching format, not arbitrary production CSV.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "concurrency",
  "group": "Engineering",
  "title": "Two requests read the same state",
  "scenario": "Two fictional requests check for an existing operation before either writes. Both see “not present.”",
  "ask": "What does a sequential replay test leave open?",
  "choices": [
   "Whether overlapping requests can both create effects",
   "Whether letters are uppercase",
   "Whether one request succeeds alone"
  ],
  "answer": 0,
  "why": "An interleaving can expose a gap between checking and recording an operation identity.",
  "evidence": [
   {
    "id": "e1",
    "title": "A",
    "text": "A checks key k and sees no record.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "B",
    "text": "B checks key k before A commits and also sees no record.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Client label",
    "text": "The two browser tabs have different titles.",
    "relevant": false
   }
  ],
  "tool": "concurrency",
  "sources": [
   "retry"
  ],
  "limit": "The toy interleaving is not a database or a proof of a real locking strategy.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "handoff",
  "group": "Engineering",
  "title": "Take over an unfinished investigation",
  "scenario": "A colleague leaves: “Requests fail after lunch.” No timezone, build or exact symptom is included.",
  "ask": "What is a useful first response?",
  "choices": [
   "Assume the cause is known",
   "Ask for timestamp with timezone, build, input and exact observation",
   "Delete the earlier note"
  ],
  "answer": 1,
  "why": "A handoff should expose missing context before another person changes the system.",
  "evidence": [
   {
    "id": "e1",
    "title": "Note",
    "text": "Requests fail after lunch.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Missing",
    "text": "No timestamp, build, request identity or observed status is supplied.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Mood",
    "text": "The colleague seemed tired.",
    "relevant": false
   }
  ],
  "tool": "reproduction",
  "sources": [
   "sre"
  ],
  "limit": "The note remains a reported symptom, not evidence of a specific failure.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "security",
  "group": "Engineering",
  "title": "A permission wider than the task",
  "scenario": "A fictional report exporter only needs read access to one resource, but its role allows every action on every resource.",
  "ask": "Which review direction fits the stated need?",
  "choices": [
   "Keep wildcard permissions forever",
   "Scope permissions to the required actions and resources",
   "Publish the credentials for debugging"
  ],
  "answer": 1,
  "why": "Review the actual task and permissions boundary; never treat broad access as a default fix.",
  "evidence": [
   {
    "id": "e1",
    "title": "Task",
    "text": "Read one approved report resource.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Policy sketch",
    "text": "Action: *; Resource: *",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Schedule",
    "text": "The team reviews on Tuesdays.",
    "relevant": false
   }
  ],
  "tool": "architecture",
  "sources": [
   "iam"
  ],
  "limit": "The diagram is not a deployable policy; no account access is requested.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "accessibility",
  "group": "Engineering",
  "title": "The invisible form error",
  "scenario": "A fictional form shows an error only by turning its border red. Keyboard focus moves nowhere and no error text is associated.",
  "ask": "What would support recovery?",
  "choices": [
   "Only a brighter red",
   "Associated error text, a label and useful focus behavior",
   "A smaller font"
  ],
  "answer": 1,
  "why": "Explain the error in text and associate it with the field so recovery does not depend on color.",
  "evidence": [
   {
    "id": "e1",
    "title": "Form",
    "text": "An invalid entry produces only a red border.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Keyboard",
    "text": "Tab reaches Submit but no error explanation.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Theme",
    "text": "The form has rounded corners.",
    "relevant": false
   }
  ],
  "tool": "accessibility",
  "sources": [
   "wai"
  ],
  "limit": "The small accessible demonstration is not a comprehensive WCAG audit.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "api",
  "group": "Engineering",
  "title": "A response that violates the contract",
  "scenario": "A fictional API contract requires an integer quantity and a non-empty orderId string. A response contains quantity as text.",
  "ask": "What should a contract check identify?",
  "choices": [
   "The type mismatch against the approved contract",
   "The response length alone",
   "The server language"
  ],
  "answer": 0,
  "why": "Compare the actual fields and types with an independent contract.",
  "evidence": [
   {
    "id": "e1",
    "title": "Contract",
    "text": "orderId: non-empty string; quantity: integer.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Response",
    "text": "{\"orderId\":\"o-7\",\"quantity\":\"2\"}",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Server name",
    "text": "The server is called Atlas.",
    "relevant": false
   }
  ],
  "tool": "contract",
  "sources": [
   "http"
  ],
  "limit": "The checker is deliberately limited to the displayed teaching contract.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "release",
  "group": "Engineering",
  "title": "Release, investigate or roll back?",
  "scenario": "A fictional canary has increased failed checkouts while the old version remains available. A migration may affect rollback compatibility.",
  "ask": "Which decision is best supported?",
  "choices": [
   "Promote because the build passed",
   "Inspect impact and rollback compatibility before expanding",
   "Ignore the canary"
  ],
  "answer": 1,
  "why": "A passing build is not sufficient operational evidence; a rollback also needs compatibility checks.",
  "evidence": [
   {
    "id": "e1",
    "title": "Canary",
    "text": "Errors rise for the new version under comparable traffic.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Compatibility",
    "text": "The data migration rollback path has not been tested.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Announcement",
    "text": "The launch email is ready.",
    "relevant": false
   }
  ],
  "tool": "release",
  "sources": [
   "reliability"
  ],
  "limit": "Choices depend on the supplied evidence; no deployment or rollback occurs.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "test-maintenance",
  "group": "ISTQB",
  "title": "A brittle test",
  "scenario": "A fictional test asserts that an entire error message matches punctuation exactly. The requirement specifies an error code and a recovery instruction.",
  "ask": "What should remain protected during repair?",
  "choices": [
   "The requirement and its observable behavior",
   "Every accidental punctuation detail",
   "Only a green test run"
  ],
  "answer": 0,
  "why": "A useful repair retains the contract and meaningful detection rather than merely silencing a failure.",
  "evidence": [
   {
    "id": "e1",
    "title": "Requirement",
    "text": "Return code RANGE and explain the allowed range.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Assertion",
    "text": "The full string must match including whitespace.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Editor",
    "text": "A different editor saved the file.",
    "relevant": false
   }
  ],
  "tool": "code-review",
  "sources": [
   "istqb"
  ],
  "limit": "Some exact text can be contractual; inspect the actual approved requirement first.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "flaky",
  "group": "ISTQB",
  "title": "A test that fails only sometimes",
  "scenario": "A fictional UI test waits a fixed 100 ms. Response times vary and a shared test account is reused.",
  "ask": "What should be isolated first?",
  "choices": [
   "Timing and shared state, one condition at a time",
   "The tester’s skill",
   "The test name"
  ],
  "answer": 0,
  "why": "A condition-based wait and isolated state are hypotheses to evaluate, not permission to suppress failures.",
  "evidence": [
   {
    "id": "e1",
    "title": "Timing",
    "text": "Successful responses vary from 60 to 500 ms.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "State",
    "text": "Two tests update the same account concurrently.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "File order",
    "text": "The test is alphabetically last.",
    "relevant": false
   }
  ],
  "tool": "reproduction",
  "sources": [
   "playwright"
  ],
  "limit": "This exercise supplies observations; it does not diagnose every intermittent failure as timing.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "scope",
  "group": "ISTQB",
  "title": "What will remain untested?",
  "scenario": "A fictional maintenance patch changes a date formatter. The team has a bounded test budget and documented high-risk date consumers.",
  "ask": "What is a responsible scope statement?",
  "choices": [
   "Untested means safe",
   "Explain covered risks, excluded areas and the evidence needed to expand",
   "Claim exhaustive coverage"
  ],
  "answer": 1,
  "why": "A useful scope decision makes omissions explicit rather than silently turning them into guarantees.",
  "evidence": [
   {
    "id": "e1",
    "title": "Change",
    "text": "One shared date formatter changed.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Consumers",
    "text": "Billing and display-only pages both use it.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Preference",
    "text": "Someone dislikes calendar widgets.",
    "relevant": false
   }
  ],
  "tool": "scope",
  "sources": [
   "istqb"
  ],
  "limit": "The exercise does not prescribe a universal minimum test suite.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "ai-edge",
  "group": "AI",
  "title": "A fluent answer without a source",
  "scenario": "A fictional AI answer says the supplied log proves a database failure. The log only says the client timed out.",
  "ask": "What should the evaluation flag?",
  "choices": [
   "Fluency as sufficient evidence",
   "An unsupported causal claim",
   "The presence of short sentences"
  ],
  "answer": 1,
  "why": "The answer exceeds the supplied observation. A citation label alone would not repair missing support.",
  "evidence": [
   {
    "id": "e1",
    "title": "Source",
    "text": "Client response deadline exceeded.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Answer",
    "text": "The database definitely failed before storing anything.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Typography",
    "text": "The answer uses a neat heading.",
    "relevant": false
   }
  ],
  "tool": "evaluation",
  "sources": [
   "nist"
  ],
  "limit": "Human rubric judgements are recorded as judgements, not independent proof.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "abstention",
  "group": "AI",
  "title": "The evidence is not enough",
  "scenario": "A fictional incident report supplies only a screenshot of a timeout. The user asks which component caused it.",
  "ask": "Which answer respects the evidence?",
  "choices": [
   "Name a component confidently",
   "State the uncertainty and ask for one discriminating observation",
   "Invent a log trace"
  ],
  "answer": 1,
  "why": "A useful response can acknowledge a limit and propose a bounded next check.",
  "evidence": [
   {
    "id": "e1",
    "title": "Image description",
    "text": "A timeout banner is visible.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Absent records",
    "text": "No server trace or stored state is supplied.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Avatar",
    "text": "The assistant has a confident-looking avatar.",
    "relevant": false
   }
  ],
  "tool": "evaluation",
  "sources": [
   "nist"
  ],
  "limit": "Abstaining is not refusing to help; the next observation should still be useful.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "source-quality",
  "group": "AI",
  "title": "Three references, three scopes",
  "scenario": "A fictional design review includes an HTTP specification, implementation guidance and an unattributed screenshot.",
  "ask": "What should be compared?",
  "choices": [
   "Authority, exact supported claim and scope",
   "Only publication length",
   "Which reference agrees with us"
  ],
  "answer": 0,
  "why": "Distinguish a protocol definition, design guidance and an unverified assertion rather than treating every link as equal evidence.",
  "evidence": [
   {
    "id": "e1",
    "title": "Standard",
    "text": "An HTTP definition describes intended effects.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Guidance",
    "text": "An implementation article discusses request identity and changed intent.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Screenshot",
    "text": "An unattributed quote claims all retries are safe.",
    "relevant": false
   }
  ],
  "tool": "sources",
  "sources": [
   "http"
  ],
  "limit": "Source quality is contextual; an official document does not answer every implementation question.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "monitoring",
  "group": "Engineering",
  "title": "What would reveal the failure?",
  "scenario": "A fictional checkout returns HTTP 200 but sometimes records two orders for one intent. Status-only monitoring remains green.",
  "ask": "Which signal addresses the promise?",
  "choices": [
   "One intended effect per operation identity",
   "Only the number of 200 responses",
   "The homepage load time"
  ],
  "answer": 0,
  "why": "A signal should relate to the intended user outcome rather than only transport success.",
  "evidence": [
   {
    "id": "e1",
    "title": "Response",
    "text": "Both attempts receive successful HTTP statuses.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Effect",
    "text": "Two stored order identities share one logical purchase intent.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Asset",
    "text": "The logo request is cached.",
    "relevant": false
   }
  ],
  "tool": "monitor",
  "sources": [
   "sre"
  ],
  "limit": "The monitor design needs real instrumentation and representative validation before production.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "alert",
  "group": "Engineering",
  "title": "Make an alert actionable",
  "scenario": "A fictional alert says “Something bad happened.” It supplies no service, impact, window or first check.",
  "ask": "What belongs in a useful alert?",
  "choices": [
   "A clear symptom, affected scope and next inspection",
   "Only an emoji",
   "A claim of root cause without evidence"
  ],
  "answer": 0,
  "why": "The alert should help someone determine impact and begin an investigation.",
  "evidence": [
   {
    "id": "e1",
    "title": "Message",
    "text": "Something bad happened.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Metrics",
    "text": "Checkout failure fraction exceeded the agreed threshold over the supplied window.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Wallpaper",
    "text": "The operations dashboard wallpaper changed.",
    "relevant": false
   }
  ],
  "tool": "alert",
  "sources": [
   "sre"
  ],
  "limit": "Thresholds and escalation need operational agreement; the tool does not page anyone.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "slow",
  "group": "Engineering",
  "title": "Why is the system slow?",
  "scenario": "A fictional service has one slow dependency. Average latency appears acceptable, while a slow tail affects some users.",
  "ask": "What should be inspected?",
  "choices": [
   "A representative latency distribution and per-stage timing",
   "Only the fastest request",
   "Only the average process uptime"
  ],
  "answer": 0,
  "why": "Inspect workload and distribution before attributing user delay to one component.",
  "evidence": [
   {
    "id": "e1",
    "title": "Requests",
    "text": "Most complete quickly; a small fraction take several seconds.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Stages",
    "text": "The slow fraction overlaps long dependency waits.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Font",
    "text": "The status page uses a new font.",
    "relevant": false
   }
  ],
  "tool": "latency",
  "sources": [
   "sre"
  ],
  "limit": "Synthetic percentiles describe this sample; correlation alone does not prove cause.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "benchmark",
  "group": "Engineering",
  "title": "The impressive benchmark",
  "scenario": "A fictional comparison tests version A with a cold cache and B with a warm cache under different workloads.",
  "ask": "Which conclusion is justified?",
  "choices": [
   "B is universally faster",
   "The comparison needs matching conditions before a version claim",
   "A chart title proves fairness"
  ],
  "answer": 1,
  "why": "Different workloads and cache states limit attribution. Preserve the measurements while challenging the comparison.",
  "evidence": [
   {
    "id": "e1",
    "title": "A",
    "text": "A: cold cache, 1,000 requests.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "B",
    "text": "B: warm cache, 100 requests.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Chart",
    "text": "The bars have bright colors.",
    "relevant": false
   }
  ],
  "tool": "benchmark",
  "sources": [
   "sre"
  ],
  "limit": "This is a comparability exercise, not a measurement of the live site.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "migration",
  "group": "Engineering",
  "title": "Change the data safely",
  "scenario": "A fictional deployment renames a required field. Old readers are still running and the rollback path expects the old field.",
  "ask": "What must the plan consider?",
  "choices": [
   "Reader and writer compatibility, validation and recovery",
   "Only whether the migration command exits zero",
   "Deleting old data immediately"
  ],
  "answer": 0,
  "why": "A successful migration command does not establish that all deployed readers or rollback paths still work.",
  "evidence": [
   {
    "id": "e1",
    "title": "Readers",
    "text": "Old and new readers overlap during deployment.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Schema",
    "text": "The new field replaces rather than supplements the old field.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Ticket",
    "text": "The migration ticket is marked urgent.",
    "relevant": false
   }
  ],
  "tool": "migration",
  "sources": [
   "reliability"
  ],
  "limit": "The plan is a teaching artifact; no real data or schema is modified.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "api-change",
  "group": "Engineering",
  "title": "An API changes underneath a client",
  "scenario": "A fictional API changes a field from number to string. An older client performs numeric comparisons.",
  "ask": "What should be checked?",
  "choices": [
   "Compatibility for supported clients against the changed contract",
   "Only the new client’s happy path",
   "The API hostname length"
  ],
  "answer": 0,
  "why": "A contract transition should consider existing consumers, not just the newest implementation.",
  "evidence": [
   {
    "id": "e1",
    "title": "Old client",
    "text": "Compares quantity numerically.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "New response",
    "text": "quantity is now the string \"2\".",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Release name",
    "text": "The release is named Dawn.",
    "relevant": false
   }
  ],
  "tool": "contract",
  "sources": [
   "http"
  ],
  "limit": "Versioning is one possible strategy; the exercise does not mandate one API policy.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "cache",
  "group": "Engineering",
  "title": "The stale price",
  "scenario": "A fictional response has a 60-second freshness lifetime. Its age is 90 seconds when another request arrives.",
  "ask": "What should the cache inspection distinguish?",
  "choices": [
   "Freshness, validation and allowed reuse",
   "Only whether the response exists",
   "The cache server name"
  ],
  "answer": 0,
  "why": "Age and freshness lifetime are distinct from mere presence; reuse depends on the applicable caching rules.",
  "evidence": [
   {
    "id": "e1",
    "title": "Lifetime",
    "text": "The response supplies max-age=60.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Age",
    "text": "The response age is 90 seconds.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Theme",
    "text": "The product page is dark mode.",
    "relevant": false
   }
  ],
  "tool": "cache",
  "sources": [
   "cache"
  ],
  "limit": "The model illustrates age versus lifetime and omits the full HTTP caching decision algorithm.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "consistency",
  "group": "Engineering",
  "title": "The missing update",
  "scenario": "A fictional reader fetches a replica immediately after a write and sees the old value. The required consistency contract is not supplied.",
  "ask": "What should be clarified?",
  "choices": [
   "The required observation guarantee and read path",
   "That the write definitely vanished",
   "That every replica is immediately current"
  ],
  "answer": 0,
  "why": "A stale observation must be interpreted against the actual consistency contract and routing.",
  "evidence": [
   {
    "id": "e1",
    "title": "Write",
    "text": "The primary acknowledged value v2.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Read",
    "text": "A different replica returned v1 immediately afterward.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "UI",
    "text": "The refresh icon rotated.",
    "relevant": false
   }
  ],
  "tool": "consistency",
  "sources": [
   "dynamo"
  ],
  "limit": "This toy read path is not an implementation of every database consistency model.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "time",
  "group": "Engineering",
  "title": "The day that changed",
  "scenario": "A fictional UTC timestamp falls on the prior calendar date in America/New_York. Two reports group it differently.",
  "ask": "What must a date comparison specify?",
  "choices": [
   "Timezone and the intended business-day rule",
   "Only the displayed date string",
   "The user’s favorite clock"
  ],
  "answer": 0,
  "why": "A timestamp and a calendar date are different concepts; the reporting rule needs an explicit timezone.",
  "evidence": [
   {
    "id": "e1",
    "title": "Instant",
    "text": "2026-11-17T02:30:00Z.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Reports",
    "text": "UTC groups November 17; New York groups November 16.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Clock color",
    "text": "The clock face is white.",
    "relevant": false
   }
  ],
  "tool": "time",
  "sources": [
   "time"
  ],
  "limit": "The example uses a named timezone; clock skew and daylight-saving boundaries need separate cases.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "leak",
  "group": "Engineering",
  "title": "Connections keep growing",
  "scenario": "A fictional worker opens a connection per task and does not release it on one error path. The pool eventually exhausts.",
  "ask": "What experiment helps distinguish a leak from healthy reuse?",
  "choices": [
   "Repeat the error path and inspect acquisition versus release",
   "Increase the limit without checking behavior",
   "Rename the connection variable"
  ],
  "answer": 0,
  "why": "A repeated bounded path can reveal unbalanced resource ownership in this supplied example.",
  "evidence": [
   {
    "id": "e1",
    "title": "Pool",
    "text": "In-use connections rise after failed tasks.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Code path",
    "text": "The error branch omits release in the fictional sketch.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Color",
    "text": "The pool graph is purple.",
    "relevant": false
   }
  ],
  "tool": "leak",
  "sources": [
   "sre"
  ],
  "limit": "A growing metric alone does not prove the precise leaking line in a real service.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "degrade",
  "group": "Engineering",
  "title": "Keep the essentials usable",
  "scenario": "A fictional reference app depends on an optional recommendation service. Its failure currently blocks the reference text.",
  "ask": "What should graceful degradation protect?",
  "choices": [
   "The essential reading task while explaining unavailable optional content",
   "A blank screen for every dependency failure",
   "An invented recommendation"
  ],
  "answer": 0,
  "why": "An optional dependency should not silently redefine the core task’s availability.",
  "evidence": [
   {
    "id": "e1",
    "title": "Core task",
    "text": "The already-loaded reference text is available locally.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Dependency",
    "text": "Recommendations fail, and the whole view is replaced by an error.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Theme",
    "text": "Recommendations use gold headings.",
    "relevant": false
   }
  ],
  "tool": "degrade",
  "sources": [
   "reliability"
  ],
  "limit": "Offline behavior must be tested against actual cached resources; this model does not promise a full offline site.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "queue",
  "group": "Engineering",
  "title": "The backlog grows",
  "scenario": "A fictional queue receives 12 messages per second while a worker completes 8. Retries may add more arrivals.",
  "ask": "What should the investigation compare?",
  "choices": [
   "Arrival, completion, backlog age and retry behavior",
   "Only whether the queue exists",
   "Only the worker’s uptime"
  ],
  "answer": 0,
  "why": "A sustained rate imbalance increases backlog in the stated fluid model.",
  "evidence": [
   {
    "id": "e1",
    "title": "Arrival",
    "text": "12 messages/second before retries.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Worker",
    "text": "8 completions/second while healthy.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Queue name",
    "text": "The queue is named Phoenix.",
    "relevant": false
   }
  ],
  "tool": "queue",
  "sources": [
   "sqs"
  ],
  "limit": "The toy model omits burstiness, visibility timeouts, ordering and actual cloud quotas.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "runbook",
  "group": "Engineering",
  "title": "A runbook that says “restart it”",
  "scenario": "A fictional runbook recommends a restart without a precondition, expected signal or escalation limit.",
  "ask": "What should be added?",
  "choices": [
   "A bounded diagnostic step, expected observations and escalation",
   "A universal restart command",
   "A claim that a restart fixes the cause"
  ],
  "answer": 0,
  "why": "Instructions should support a decision, preserve evidence and explain when to stop.",
  "evidence": [
   {
    "id": "e1",
    "title": "Instruction",
    "text": "Restart it.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Gap",
    "text": "No affected service, expected signal or escalation threshold is named.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Cover",
    "text": "The runbook has a new cover image.",
    "relevant": false
   }
  ],
  "tool": "runbook",
  "sources": [
   "sre"
  ],
  "limit": "Draft runbooks require system-owner review before operational use.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "postmortem",
  "group": "Engineering",
  "title": "Learn without blame",
  "scenario": "A fictional outage followed a configuration change. The report blames one person and omits review, tooling and detection conditions.",
  "ask": "What would make the review more useful?",
  "choices": [
   "Describe contributing conditions and testable follow-ups",
   "Infer someone’s intent",
   "Replace the timeline with blame"
  ],
  "answer": 0,
  "why": "An evidence-based review can examine system conditions without inventing personal motives.",
  "evidence": [
   {
    "id": "e1",
    "title": "Change",
    "text": "A configuration change preceded the outage.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Controls",
    "text": "The change bypassed no automated validation because none existed.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Opinion",
    "text": "Someone says the operator was careless.",
    "relevant": false
   }
  ],
  "tool": "postmortem",
  "sources": [
   "postmortem"
  ],
  "limit": "The supplied events do not establish an individual’s intent or all contributing causes.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "automation",
  "group": "Engineering",
  "title": "Should this task be automated?",
  "scenario": "A fictional monthly reconciliation takes 30 minutes and changes frequently. A proposed automation takes time to build and maintain.",
  "ask": "What should the decision include?",
  "choices": [
   "Frequency, effort, maintenance and consequences of errors",
   "Only whether automation is fashionable",
   "Only the number of lines generated"
  ],
  "answer": 0,
  "why": "Compare the actual repeated work and risk against implementation and maintenance effort.",
  "evidence": [
   {
    "id": "e1",
    "title": "Frequency",
    "text": "One run per month; 30 minutes of manual work.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Maintenance",
    "text": "Rules change often and require review.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Marketing",
    "text": "A vendor promises effortless automation.",
    "relevant": false
   }
  ],
  "tool": "automation",
  "sources": [
   "reliability"
  ],
  "limit": "A time estimate is not a financial return calculation or a replacement for error-risk review.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "ai-generated-test",
  "group": "AI",
  "title": "A test that repeats the bug",
  "scenario": "A fictional AI-generated test copies the implementation’s incorrect threshold into its expected result. It passes.",
  "ask": "What would establish useful detection?",
  "choices": [
   "Compare with an independent policy and try a known defect",
   "Treat passing as proof",
   "Generate more copies of the same assertion"
  ],
  "answer": 0,
  "why": "A test must be justified by an independent basis; a passing mirror of the implementation can miss the intended defect.",
  "evidence": [
   {
    "id": "e1",
    "title": "Policy",
    "text": "A discount starts at 100 inclusive.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Test",
    "text": "The generated expectation excludes exactly 100, matching the buggy implementation.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Comment",
    "text": "The generated test has a confident comment.",
    "relevant": false
   }
  ],
  "tool": "mutation",
  "sources": [
   "istqb"
  ],
  "limit": "The small mutation model checks one teaching defect, not overall test-suite quality.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "upgrade",
  "group": "Engineering",
  "title": "Upgrade a dependency",
  "scenario": "A fictional dependency changes a default timeout. Compilation passes, but the application relies on the old value.",
  "ask": "What should the review inspect?",
  "choices": [
   "Release notes, explicit configuration, representative behavior and recovery",
   "Only whether installation succeeds",
   "Only package popularity"
  ],
  "answer": 0,
  "why": "Compatibility includes behavior and defaults, not just compilation.",
  "evidence": [
   {
    "id": "e1",
    "title": "Before",
    "text": "The old default was relied on implicitly.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "After",
    "text": "The new release changes the supplied timeout default.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Downloads",
    "text": "The package has many downloads.",
    "relevant": false
   }
  ],
  "tool": "upgrade",
  "sources": [
   "reliability"
  ],
  "limit": "The dependency and changed default are fictional; consult actual release notes for a real upgrade.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "unknown",
  "group": "Engineering",
  "title": "A useful uncertain update",
  "scenario": "A fictional incident has a confirmed symptom but no established cause. Stakeholders ask for an update.",
  "ask": "Which structure helps?",
  "choices": [
   "Known observations, open uncertainty and the next bounded check",
   "A confident invented cause",
   "No update until everything is solved"
  ],
  "answer": 0,
  "why": "An honest update can still explain impact and the next useful action.",
  "evidence": [
   {
    "id": "e1",
    "title": "Known",
    "text": "Some checkout responses time out.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Unknown",
    "text": "Stored effects and affected versions are not established.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Pressure",
    "text": "Someone wants a definitive answer immediately.",
    "relevant": false
   }
  ],
  "tool": "update",
  "sources": [
   "sre"
  ],
  "limit": "A useful update does not turn planned checks into completed work.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "human-ai",
  "group": "AI",
  "title": "Two explanations, the same evidence",
  "scenario": "A fictional teammate and an AI disagree about a timeout. One cites stored state; the other relies on response wording.",
  "ask": "How should the approaches be compared?",
  "choices": [
   "Against the same supplied evidence and explicit rubric",
   "By assuming AI is always right",
   "By assuming humans are always right"
  ],
  "answer": 0,
  "why": "Evaluate the reasoning and evidence rather than the author label.",
  "evidence": [
   {
    "id": "e1",
    "title": "Record",
    "text": "The operation record shows one committed order.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Explanations",
    "text": "A: a reply may be lost; B: the word timeout proves no write happened.",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Author",
    "text": "One explanation was produced by an assistant.",
    "relevant": false
   }
  ],
  "tool": "evaluation",
  "sources": [
   "nist"
  ],
  "limit": "The comparison is authored; it is not a live head-to-head model benchmark.",
  "revision": "practice-2026-11-17"
 },
 {
  "id": "reading-ideas",
  "group": "Reading",
  "title": "From a passage to a testable question",
  "scenario": "A selected public-domain passage describes a character acting on curiosity. You want to connect it to investigating uncertainty.",
  "ask": "Which connection stays careful?",
  "choices": [
   "Use the passage to frame a question, while separating interpretation from engineering evidence",
   "Treat fiction as a system benchmark",
   "Claim the author proved a software principle"
  ],
  "answer": 0,
  "why": "A passage can inspire a question without becoming empirical evidence for a technical claim.",
  "evidence": [
   {
    "id": "e1",
    "title": "Passage",
    "text": "Alice follows the rabbit because she is curious. This is a paraphrase; consult the linked edition.",
    "relevant": true
   },
   {
    "id": "e2",
    "title": "Connection",
    "text": "What observation would make me change my interpretation?",
    "relevant": true
   },
   {
    "id": "e3",
    "title": "Overclaim",
    "text": "The novel proves that retries should use keys.",
    "relevant": false
   }
  ],
  "tool": "reading",
  "sources": [
   "gutenberg"
  ],
  "limit": "Literary interpretations remain open; the engineering connection is an analogy, not authorial intent.",
  "revision": "practice-2026-11-17"
 }
];
practiceCases.forEach((c,index)=>{const shift=index%c.choices.length;const old=[...c.choices];c.choices=old.map((_,i)=>old[(i+shift)%old.length]);c.answer=(c.answer-shift+old.length)%old.length;});
export const findPractice=(id:string)=>practiceCases.find(c=>c.id===id);
