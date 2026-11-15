import type {CertTrack,CertQuestion} from './certification-content';
const scenarios=[
  {
    "track": "cloud-practitioner",
    "domain": "cloud",
    "prompt": "A seasonal service has unpredictable peaks and must reduce idle capacity afterward. Which proposal directly addresses both requirements?",
    "options": [
      "Scale capacity with observed demand and remove unneeded capacity after the peak",
      "Run a fixed larger instance all year",
      "Buy a commitment before measuring demand",
      "Deploy a second Region but keep fixed idle capacity"
    ],
    "why": [
      "Elastic adjustment addresses both the peak and the later reduction.",
      "A fixed larger instance handles some peaks but preserves idle capacity afterward.",
      "A purchasing commitment does not itself change capacity with demand.",
      "Regional redundancy can address location failure but does not itself remove idle capacity."
    ],
    "clue": "Capacity must shrink as well as grow.",
    "alternative": "A second Region could fit a geographic recovery requirement; it is not the same as elasticity."
  },
  {
    "track": "cloud-practitioner",
    "domain": "security",
    "prompt": "A worker reads one private bucket. A proposal grants full S3 access to avoid future permission tickets. Which review best matches the current requirement?",
    "options": [
      "Scope the role to the required bucket and read actions",
      "Keep full S3 access but enable audit logs",
      "Use a private subnet instead of an identity policy",
      "Encrypt the bucket instead of restricting the worker"
    ],
    "why": [
      "The current task needs limited actions on a specific resource.",
      "Logs help investigation but do not reduce the granted access.",
      "Network placement does not replace identity authorization.",
      "Encryption and authorization address different controls."
    ],
    "clue": "Read one private bucket, not administer every bucket.",
    "alternative": "Audit logs complement a scoped role; they do not substitute for least privilege."
  },
  {
    "track": "ai-practitioner",
    "domain": "foundation",
    "prompt": "A support assistant needs current approved manuals that change weekly. Its language style is already acceptable. Which approach should be evaluated first?",
    "options": [
      "Retrieve authorized current passages and evaluate supported answers",
      "Fine-tune style using last year’s manuals",
      "Increase response randomness to encourage new facts",
      "Use a larger context limit without supplying current material"
    ],
    "why": [
      "Retrieval addresses the identified gap: current source information.",
      "Style tuning does not ensure freshness of weekly changing facts.",
      "Randomness is not a source of current approved information.",
      "A larger limit helps only if relevant current context is actually supplied."
    ],
    "clue": "The missing capability is current approved information, not writing style.",
    "alternative": "Fine-tuning could be relevant to a learned behavior gap, but it does not replace access-controlled current documents."
  },
  {
    "track": "ai-practitioner",
    "domain": "responsible",
    "prompt": "A screening model has high average accuracy but low recall for a rare costly event. Which evaluation would best inform its use?",
    "options": [
      "Inspect event recall, subgroup behavior and the cost of missed cases",
      "Choose by average accuracy alone",
      "Choose the model with the shortest output explanation",
      "Evaluate only on the training examples"
    ],
    "why": [
      "The evaluation must reflect the important failure and affected populations.",
      "An average can hide the specific failure that matters.",
      "Explanation length does not establish detection quality.",
      "Training examples do not provide an independent generalization estimate."
    ],
    "clue": "Rare missed events have disproportionate consequences.",
    "alternative": "Average accuracy can be one summary when errors have similar importance, but must not conceal critical errors."
  },
  {
    "track": "istqb-foundation",
    "domain": "design",
    "prompt": "A field accepts integer quantities 10 through 50 inclusive. A tester already checks 10 and 50. Which additional pair directly challenges rejection at the adjacent invalid boundaries?",
    "options": [
      "9 and 51",
      "11 and 49",
      "20 and 40",
      "10 and 50 again"
    ],
    "why": [
      "These values sit immediately outside the two accepted limits.",
      "These are valid near-boundary values and do not test invalid rejection.",
      "These are valid interior values, not adjacent invalid boundaries.",
      "Repeating the endpoints adds no outside-range case."
    ],
    "clue": "The requirement asks for invalid values immediately outside an inclusive range.",
    "alternative": "11 and 49 can help a broader three-value boundary set, but cannot replace the invalid neighbors."
  },
  {
    "track": "istqb-foundation",
    "domain": "lifecycle",
    "prompt": "A patch fixes a duplicate-charge defect. The team confirms the original reproduction now passes. What distinct objective remains?",
    "options": [
      "Check for unintended effects on previously working payment behavior",
      "Repeat only the original reproduction indefinitely",
      "Declare every integration unaffected because the fix passed",
      "Replace execution with a review of the ticket title"
    ],
    "why": [
      "Regression testing addresses possible side effects beyond the confirmed fix.",
      "Repeating the confirmation does not cover distinct previously working behavior.",
      "One passing reproduction cannot establish all integrations remain correct.",
      "A title review cannot establish runtime side effects."
    ],
    "clue": "Confirming the specific fix and looking for side effects are different objectives.",
    "alternative": "Confirmation testing is appropriate for the original defect reproduction; regression testing addresses the surrounding behavior."
  },
  {
    "track": "solutions-architect",
    "domain": "d2",
    "prompt": "A service already spans two Availability Zones. Users still create duplicate orders when a worker retries after a timeout. Which change addresses the observed defect?",
    "options": [
      "Use a persistent operation key and atomic duplicate protection around order creation",
      "Add a third Availability Zone without changing the handler",
      "Increase the load balancer timeout only",
      "Add a read replica to the reporting database"
    ],
    "why": [
      "The repeated side effect needs application-level duplicate protection.",
      "More failure domains do not make repeated business operations idempotent.",
      "A timeout change may alter frequency but does not establish duplicate safety.",
      "A reporting replica does not protect the order-creation operation."
    ],
    "clue": "The availability design exists; the failure is a repeated side effect.",
    "alternative": "Additional AZs address certain infrastructure failures; they cannot substitute for application idempotency."
  },
  {
    "track": "solutions-architect",
    "domain": "d3",
    "prompt": "Reports tolerate a short delay and overwhelm the relational primary with reads. Writes are healthy. Which design most directly offloads these reads?",
    "options": [
      "Route eligible reports to a read replica and monitor lag",
      "Add Multi-AZ standby solely as a reporting endpoint",
      "Cache every report permanently without invalidation",
      "Move all writes to the same primary more frequently"
    ],
    "why": [
      "A read replica can offload suitable reads where lag is acceptable.",
      "A standby for failover is not automatically a readable reporting endpoint.",
      "Permanent unvalidated caching ignores freshness and correctness needs.",
      "More writes do not remove the read bottleneck."
    ],
    "clue": "The load is read-heavy and the reports tolerate replication lag.",
    "alternative": "Multi-AZ failover supports availability; read scaling depends on the actual database deployment and readable endpoints."
  },
  {
    "track": "developer-associate",
    "domain": "d1",
    "prompt": "An event handler calls an API, then times out before recording success. The API supports an idempotency token. What should a retry do?",
    "options": [
      "Reuse the original operation token and reconcile the recorded result",
      "Generate a new token for every retry",
      "Assume timeout means the API performed no action",
      "Disable every retry even for recoverable failures"
    ],
    "why": [
      "A stable token allows repeated calls to refer to the same operation.",
      "A new token can authorize a second side effect.",
      "A response timeout leaves the actual side effect uncertain.",
      "Removing retries can lose recoverable work rather than resolve uncertainty."
    ],
    "clue": "A timeout does not reveal whether the remote side effect completed.",
    "alternative": "A new token is appropriate for a genuinely new operation, not a retry of the same business intent."
  },
  {
    "track": "developer-associate",
    "domain": "d4",
    "prompt": "Latency increased after a release. Logs show downstream throttling and immediate retries from every worker. Which action best targets the evidence?",
    "options": [
      "Use bounded backoff with jitter and inspect concurrency and quotas",
      "Increase every worker’s concurrency immediately",
      "Extend the caller timeout without changing retry behavior",
      "Retry validation errors with the same infinite loop"
    ],
    "why": [
      "The retry policy and offered load directly relate to the observed throttling.",
      "More simultaneous calls can intensify downstream pressure.",
      "Waiting longer does not correct synchronized retry amplification.",
      "Invalid input generally needs correction rather than repeated submission."
    ],
    "clue": "Throttling plus synchronized immediate retries points to amplified load.",
    "alternative": "Increasing capacity can help a measured capacity bottleneck, but not by blindly increasing pressure on the throttled dependency."
  },
  {
    "track": "test-automation",
    "domain": "d7",
    "prompt": "A team adds needs: test to its deploy job, but tests use npm test || true. Failed tests still allow deployment. What is the missing repair?",
    "options": [
      "Preserve the failing test exit code and verify that deployment is skipped",
      "Add another needs entry for the same test job",
      "Only increase test retries",
      "Only rename the deploy stage to gated-deploy"
    ],
    "why": [
      "The dependency sees success because the command masks the failure signal.",
      "Repeating the dependency does not fix a falsely successful job.",
      "Retries do not repair the exit status contract.",
      "A name does not change execution behavior."
    ],
    "clue": "The gate cannot act on a failure it never receives.",
    "alternative": "A needs dependency is useful after the prerequisite accurately reports success or failure."
  },
  {
    "track": "test-automation",
    "domain": "d4",
    "prompt": "Tests fail in parallel because they update one shared account. They pass individually. Which improvement targets this cause?",
    "options": [
      "Give each test controlled isolated data or coordinate shared state deliberately",
      "Increase every wait by a fixed minute",
      "Retry until one execution passes",
      "Move assertions to the end without isolating data"
    ],
    "why": [
      "Isolation addresses interference between concurrent tests.",
      "Waiting does not establish ownership or prevent shared-state races.",
      "A later pass does not remove the underlying interference.",
      "Assertion placement alone does not prevent concurrent mutation."
    ],
    "clue": "The same account is mutated by parallel tests.",
    "alternative": "Condition-based waits help asynchronous readiness; they do not replace test-data isolation."
  },
  {
    "track": "ai-testing",
    "domain": "d3",
    "prompt": "A detector finds 45 true positives and misses 15 actual positives. False positives are not supplied. Which metric can be calculated from this evidence?",
    "options": [
      "Recall: 75%",
      "Precision: 75%",
      "Overall accuracy: 75%",
      "False-positive rate: 25%"
    ],
    "why": [
      "Recall is 45 divided by 45 plus 15.",
      "Precision also requires the false-positive count.",
      "Accuracy requires correct negatives and the full population.",
      "False-positive rate requires negative-class evidence."
    ],
    "clue": "The available counts describe found and missed actual positives.",
    "alternative": "Precision answers how many predicted positives were correct; its denominator needs false positives."
  },
  {
    "track": "ai-testing",
    "domain": "d6",
    "prompt": "Two models are compared: one on familiar daylight photos, the other on unseen night photos. The first scores higher. Which conclusion is supported?",
    "options": [
      "The comparison is confounded; evaluate both under the same intended conditions",
      "The first model is necessarily superior in every setting",
      "Night-time examples should be removed from all future testing",
      "Training accuracy alone will resolve the comparison"
    ],
    "why": [
      "Different samples and conditions prevent isolating the model difference.",
      "A score across different conditions does not establish universal superiority.",
      "Removing an intended-use condition would hide relevant risk.",
      "Training fit cannot replace an independent comparison."
    ],
    "clue": "Both the model and evaluation distribution changed.",
    "alternative": "Different benchmarks can answer different use-case questions, but cannot support a direct like-for-like ranking."
  },
  {
    "track": "generative-ai-testing",
    "domain": "d2",
    "prompt": "A tester asks an LLM for boundary cases but supplies neither the accepted range nor whether limits are inclusive. The output looks thorough. What should happen next?",
    "options": [
      "Clarify the range and inclusivity, then evaluate generated cases against that basis",
      "Accept the output because it includes many cases",
      "Choose whichever limits the model mentions first",
      "Increase output length without adding the missing rule"
    ],
    "why": [
      "Concrete constraints resolve the ambiguity behind the generated cases.",
      "Volume does not establish agreement with missing requirements.",
      "Generated guesses do not authorize acceptance rules.",
      "More text does not supply the absent constraint."
    ],
    "clue": "The test basis omits the very rule needed to choose boundaries.",
    "alternative": "A longer response can help explain a known rule, but cannot replace clarification of that rule."
  },
  {
    "track": "generative-ai-testing",
    "domain": "d5",
    "prompt": "A GenAI pilot cuts drafting by 30 minutes but adds 50 minutes of review and correction. Which assessment best reflects the supplied evidence?",
    "options": [
      "The measured workflow is 20 minutes slower; also examine quality and learning benefits",
      "The pilot saves 30 minutes because only drafting counts",
      "Generated line count proves a productivity gain",
      "The assistant must be adopted across every team immediately"
    ],
    "why": [
      "Net effort includes all measured stages and should be interpreted with quality evidence.",
      "Ignoring review and correction overstates the gain.",
      "Output volume does not account for rework.",
      "One unfavorable pilot does not support indiscriminate rollout."
    ],
    "clue": "The workflow includes both saved drafting time and additional correction time.",
    "alternative": "Drafting speed is useful as a component measure, but not the full productivity outcome."
  },
  {
    "track": "github-actions",
    "domain": "d1",
    "prompt": "A workflow has test and deploy jobs listed in that order, with no dependency. What should a reviewer conclude?",
    "options": [
      "They may run independently; declare deploy’s success dependency explicitly",
      "File order alone guarantees successful tests before deployment",
      "A shared workflow name makes them sequential",
      "Artifact retention automatically blocks deploy on failure"
    ],
    "why": [
      "A job dependency must be expressed rather than inferred from order.",
      "YAML order does not create this execution dependency.",
      "Names do not establish scheduling or success conditions.",
      "Retention concerns stored outputs, not job ordering."
    ],
    "clue": "There is no declared dependency between the jobs.",
    "alternative": "Sequential steps within one job have ordering, but separate jobs require explicit dependencies when ordering matters."
  },
  {
    "track": "github-actions",
    "domain": "d5",
    "prompt": "A cloud role trusts any OIDC token from the CI issuer. What should be tightened before using it for production?",
    "options": [
      "Restrict relevant audience and subject claims to the approved repository and deployment context",
      "Only rename the GitHub environment to production",
      "Only hide the workflow logs",
      "Replace OIDC with a permanent administrator key"
    ],
    "why": [
      "Trust restrictions bind temporary credentials to the intended workflow identity.",
      "A display name alone does not restrict the cloud trust policy.",
      "Hiding logs does not narrow which identity can assume the role.",
      "A permanent privileged key increases credential exposure rather than solving scope."
    ],
    "clue": "Trust in an issuer alone can include identities beyond the intended deployment.",
    "alternative": "OIDC is useful for short-lived access only when the receiving trust and permission policies are appropriately scoped."
  },
  {
    "track": "github-copilot",
    "domain": "d1",
    "prompt": "An AI-assisted refactor passes tests generated from its own implementation, but changes an established public API. What is the strongest next check?",
    "options": [
      "Compare the required interface and run independent caller contract tests",
      "Count the number of generated tests",
      "Accept the change because all generated tests pass",
      "Ask the same assistant to restate its confidence"
    ],
    "why": [
      "The external contract is independent of implementation-derived expectations.",
      "Test count does not establish compatibility coverage.",
      "Self-confirming tests can miss a changed requirement.",
      "Confidence does not supply independent evidence."
    ],
    "clue": "The requirement is compatibility with existing callers, not agreement with the new implementation.",
    "alternative": "Implementation-focused tests can help internal behavior, but need independent contract checks for compatibility."
  },
  {
    "track": "github-copilot",
    "domain": "d6",
    "prompt": "A repository exclusion is enabled. A developer wants to paste a production token into a different assistant channel. What is the sound interpretation?",
    "options": [
      "Verify the feature’s scope and omit the secret; the exclusion is not universal permission",
      "The repository exclusion authorizes every downstream disclosure",
      "A private repository makes the token safe in any prompt",
      "Filtering generated suggestions replaces data minimization"
    ],
    "why": [
      "Controls are scoped, and unnecessary secret disclosure remains avoidable.",
      "An exclusion is a protection setting, not blanket authorization.",
      "Repository visibility does not authorize unrelated processing channels.",
      "Output filtering is not the same as protecting sensitive input."
    ],
    "clue": "A control for one surface does not automatically govern every other channel.",
    "alternative": "Exclusions can help within documented scope; sensitive input still needs policy and task-based minimization."
  }
];
export const transferInsight:Record<string,{clue:string;alternative:string}>={};
export function makeTransferQuestions(tracks:CertTrack[]):CertQuestion[]{const counts:Record<string,number>={};return scenarios.map(row=>{const n=(counts[row.track]??0)+1;counts[row.track]=n;const t=tracks.find(t=>t.id===row.track)!,d=t.domains.find(d=>d.id===row.domain)!,shift=(n-1)%4,id=`${row.track}-transfer-${n}`;transferInsight[id]={clue:row.clue,alternative:row.alternative};return {id,track:t.id,domain:d.id,objective:`${d.title} · transfer scenario`,prompt:row.prompt,choices:row.options.map((_,i)=>row.options[(i+shift)%4]),explanations:row.why.map((_,i)=>row.why[(i+shift)%4]),answer:(4-shift)%4,source:d.source,reviewed:'2026-11-14'};});}
