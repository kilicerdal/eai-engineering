export const practiceGuidance50:Record<string,{hints:[string,string,string];alternative:string;variation:string;variationBasis:string}>={
  "retry": {
    "hints": [
      "Separate a missing reply from a missing stored effect.",
      "Follow k-17 through both requests, not just the client timer.",
      "The key alone is insufficient if its associated intent changes."
    ],
    "alternative": "Reusing a stored result can also fit when the original business intent matches.",
    "variation": "Now the second request changes the quantity while reusing k-17. Should it return the old result?",
    "variationBasis": "The key alone is insufficient if its associated intent changes."
  },
  "triage": {
    "hints": [
      "Two things changed; time order alone does not isolate either.",
      "Hold the environment fixed before comparing application versions.",
      "A single-variable check may miss an interaction; design a bounded follow-up."
    ],
    "alternative": "A representative staging replay can help when production comparison is unsafe.",
    "variation": "Now the error occurs only under combined load and environment B.",
    "variationBasis": "A single-variable check may miss an interaction; design a bounded follow-up."
  },
  "architecture": {
    "hints": [
      "Begin with the task that must work without a connection.",
      "Separate a weekly content update from a within-shift reading request.",
      "The acceptable age and disconnected behavior need a new decision."
    ],
    "alternative": "A local cache or packaged copy can fit if its age and distribution are acceptable.",
    "variation": "Now the content is an urgent safety update that cannot be a week old.",
    "variationBasis": "The acceptable age and disconnected behavior need a new decision."
  },
  "requirements": {
    "hints": [
      "One fast response does not describe a distribution.",
      "Ask which workload and percentile the word fast refers to.",
      "State how those groups enter the sample rather than hiding them in one average."
    ],
    "alternative": "A task-completion target can be valid if stakeholders choose it instead of request latency.",
    "variation": "Now cold requests and accessibility assistive workflows must be included.",
    "variationBasis": "State how those groups enter the sample rather than hiding them in one average."
  },
  "review": {
    "hints": [
      "Where is the request identity created relative to the retry loop?",
      "A fresh random value inside each retry represents a new operation.",
      "An in-memory key alone no longer preserves logical request identity."
    ],
    "alternative": "Creating the identity outside the retry loop is one approach; persisting it across client restarts may also matter.",
    "variation": "Now the process can restart between attempts.",
    "variationBasis": "An in-memory key alone no longer preserves logical request identity."
  },
  "aws-boundary": {
    "hints": [
      "A network arrow does not explain permission to access the store.",
      "Inspect the identity, action, resource and credential lifetime.",
      "Separate their permissions; one shared broad credential loses that boundary."
    ],
    "alternative": "A constrained service-mediated access path may also fit if it preserves the authorization boundary.",
    "variation": "Now two workloads need different subsets of the same store.",
    "variationBasis": "Separate their permissions; one shared broad credential loses that boundary."
  },
  "aws-recovery": {
    "hints": [
      "A dependency outage can trigger extra traffic from callers.",
      "Compare synchronized retries with a bounded delayed schedule.",
      "A long retry schedule may exceed the useful request budget."
    ],
    "alternative": "Failing fast can also fit a non-retryable failure or an exhausted time budget.",
    "variation": "Now callers have a strict one-second deadline.",
    "variationBasis": "A long retry schedule may exceed the useful request budget."
  },
  "aws-responsibility": {
    "hints": [
      "Name the service before assigning a responsibility.",
      "Guest OS patching on EC2 differs from physical infrastructure security.",
      "Recheck that service's exact responsibility boundary rather than copying the EC2 list."
    ],
    "alternative": "A managed-service choice can move some responsibilities, but application permissions still need an owner.",
    "variation": "Now the workload moves from EC2 to a managed service.",
    "variationBasis": "Recheck that service's exact responsibility boundary rather than copying the EC2 list."
  },
  "aws-cost": {
    "hints": [
      "A cheaper unit price need not produce a cheaper workload.",
      "Use identical demand and the same included cost drivers.",
      "Change only requests first to see which option is sensitive to that driver."
    ],
    "alternative": "A more expensive service can be reasonable if a separately assessed operational requirement justifies it.",
    "variation": "Now requests double but stored GB-months stay the same.",
    "variationBasis": "Change only requests first to see which option is sensitive to that driver."
  },
  "aws-troubleshoot": {
    "hints": [
      "An access-denied message does not identify which policy caused it.",
      "Identify the calling principal and exact requested action and resource.",
      "A broader allow does not remove that deny; inspect the intended guardrail."
    ],
    "alternative": "A sanitized denied request and relevant policy context can be a useful alternative starting record.",
    "variation": "Now an explicit deny is found in an applicable policy.",
    "variationBasis": "A broader allow does not remove that deny; inspect the intended guardrail."
  },
  "boundary": {
    "hints": [
      "There are two inclusive boundaries and an integer-only domain.",
      "Inspect just below, at, and just above both 10 and 20.",
      "Recalculate targets; do not reuse the old six values."
    ],
    "alternative": "A two-value boundary exercise can be valid when explicitly requested, but it is not this three-value task.",
    "variation": "Now the valid range is 0 through 100 inclusive.",
    "variationBasis": "Recalculate targets; do not reuse the old six values."
  },
  "risk": {
    "hints": [
      "Coverage count and useful risk coverage are different.",
      "Compare duplicate payment with cosmetic spacing under the same budget.",
      "Explain which risks remain untested instead of claiming full coverage."
    ],
    "alternative": "A low-impact check may be justified when it is inexpensive and does not displace a necessary high-risk check.",
    "variation": "Now the effort budget drops to three points.",
    "variationBasis": "Explain which risks remain untested instead of claiming full coverage."
  },
  "defect": {
    "hints": [
      "A report should let another person repeat the supplied failure.",
      "Include the integer 21, the approved upper bound, and the observed acceptance.",
      "Record both versions and conditions before generalizing the defect."
    ],
    "alternative": "A short recording can supplement steps when the build, input and expected result are still stated.",
    "variation": "Now the same input passes only in one build.",
    "variationBasis": "Record both versions and conditions before generalizing the defect."
  },
  "oracle": {
    "hints": [
      "Compare the generated expectation with an independent approved rule.",
      "Exactly 100 distinguishes inclusive from exclusive behavior.",
      "Clarify the policy; do not let the generated test settle an undecided rule."
    ],
    "alternative": "An approved executable specification can also act as a basis if it is independent of the implementation under test.",
    "variation": "Now the business policy itself is ambiguous about exactly 100.",
    "variationBasis": "Clarify the policy; do not let the generated test settle an undecided rule."
  },
  "data": {
    "hints": [
      "Rows are not necessarily distinct customers.",
      "Count repeated and missing identifiers separately.",
      "Separate customer identity from visit count; the meaning of the metric changes."
    ],
    "alternative": "Quarantining invalid rows can be appropriate if the contract defines that treatment.",
    "variation": "Now an empty identifier is allowed for an anonymous visitor.",
    "variationBasis": "Separate customer identity from visit count; the meaning of the metric changes."
  },
  "concurrency": {
    "hints": [
      "A sequential replay may miss overlapping pre-checks.",
      "Place B's absence check before A's commit.",
      "Key uniqueness alone may not represent the required business identity."
    ],
    "alternative": "An atomic uniqueness rule or another validated serialization strategy can prevent the repeated effect.",
    "variation": "Now two different keys refer to the same business purchase.",
    "variationBasis": "Key uniqueness alone may not represent the required business identity."
  },
  "handoff": {
    "hints": [
      "The symptom lacks a repeatable context.",
      "Ask for an explicit timezone, build and sanitized input.",
      "Keep the uncertainty; do not silently interpret it as UTC."
    ],
    "alternative": "A precise trace identifier can replace a full pasted log when authorized access is available.",
    "variation": "Now the timestamp is local but its timezone is unknown.",
    "variationBasis": "Keep the uncertainty; do not silently interpret it as UTC."
  },
  "security": {
    "hints": [
      "The required task is smaller than administrator access.",
      "Compare required actions and resources with the wildcard grant.",
      "Review the tenant boundary before generalizing a resource pattern."
    ],
    "alternative": "A short-lived, scoped delegated identity can also fit when the delegation is authorized.",
    "variation": "Now a second tenant's resources share the same prefix.",
    "variationBasis": "Review the tenant boundary before generalizing a resource pattern."
  },
  "accessibility": {
    "hints": [
      "An error needs a discoverable explanation, not only a red border.",
      "Follow the keyboard path and inspect the label and error association.",
      "Explain all errors and provide useful navigation; one generic message is insufficient."
    ],
    "alternative": "An error summary can supplement inline messages if focus and associations remain useful.",
    "variation": "Now there are three invalid fields.",
    "variationBasis": "Explain all errors and provide useful navigation; one generic message is insufficient."
  },
  "api": {
    "hints": [
      "The value's JSON type is part of the contract.",
      "The supplied quantity is a string, even though it looks numeric.",
      "Evaluate compatibility for those clients before changing the response."
    ],
    "alternative": "An explicit versioned contract accepting numeric strings can be valid, but it changes this approved contract.",
    "variation": "Now old clients still depend on the integer type.",
    "variationBasis": "Evaluate compatibility for those clients before changing the response."
  },
  "release": {
    "hints": [
      "A passing health probe does not demonstrate migration recovery.",
      "Inspect data compatibility as well as application rollback.",
      "Rolling back code alone may not restore old-reader compatibility."
    ],
    "alternative": "A small rollout can be reasonable once its stop conditions and recovery limits are understood.",
    "variation": "Now the migration permanently deletes an old field.",
    "variationBasis": "Rolling back code alone may not restore old-reader compatibility."
  },
  "test-maintenance": {
    "hints": [
      "Formatting can be incidental or contractual.",
      "Identify which whitespace change affects the approved behavior.",
      "Retain the exact check when the requirement supports it."
    ],
    "alternative": "Exact-text assertions are valid for genuinely exact contractual text.",
    "variation": "Now this text is a legal notice whose precise wording is required.",
    "variationBasis": "Retain the exact check when the requirement supports it."
  },
  "flaky": {
    "hints": [
      "The shared account is a variable worth isolating.",
      "Change timing or shared state one at a time.",
      "Revisit timing or another condition rather than keeping the first hypothesis as fact."
    ],
    "alternative": "Recorded failing seeds or isolated test data can be another repeatable starting point.",
    "variation": "Now isolated accounts still fail under delayed responses.",
    "variationBasis": "Revisit timing or another condition rather than keeping the first hypothesis as fact."
  },
  "scope": {
    "hints": [
      "A shared component can affect more than the changed screen.",
      "Identify its billing consumers and their important risks.",
      "Reconsider the excluded scope and the evidence needed to expand it."
    ],
    "alternative": "A smaller representative regression set can fit when its rationale and blind spots are explicit.",
    "variation": "Now an additional high-risk consumer is discovered.",
    "variationBasis": "Reconsider the excluded scope and the evidence needed to expand it."
  },
  "ai-edge": {
    "hints": [
      "The answer states a cause stronger than the records support.",
      "A client timeout does not establish whether the server wrote.",
      "Update the interpretation using that record; preserve the earlier answer separately."
    ],
    "alternative": "A cautious hypothesis can be useful when labeled and paired with a discriminating check.",
    "variation": "Now a trusted server record shows the write committed.",
    "variationBasis": "Update the interpretation using that record; preserve the earlier answer separately."
  },
  "abstention": {
    "hints": [
      "Missing evidence is itself a limit on the conclusion.",
      "Ask for stored state or a relevant server trace.",
      "Choose a feasible observation and state what it still cannot establish."
    ],
    "alternative": "A conditional next check is useful even when a cause cannot be established.",
    "variation": "Now neither log nor store access is available.",
    "variationBasis": "Choose a feasible observation and state what it still cannot establish."
  },
  "source-quality": {
    "hints": [
      "Authority and applicability are separate questions.",
      "Compare the precise claim and the implementation context.",
      "Identify the mismatch before transferring its recommendation."
    ],
    "alternative": "A primary implementation paper can support a narrow claim better than a broad official overview.",
    "variation": "Now the source discusses a different protocol or service version.",
    "variationBasis": "Identify the mismatch before transferring its recommendation."
  },
  "monitoring": {
    "hints": [
      "Measure the promised effect, not only successful replies.",
      "Two order identities for one purchase intent violate a different invariant than HTTP availability.",
      "State whether that delay meets the operational need and what remains exposed."
    ],
    "alternative": "A reconciliation check can complement online detection when its lag is acceptable.",
    "variation": "Now detection is delayed by one hour.",
    "variationBasis": "State whether that delay meets the operational need and what remains exposed."
  },
  "alert": {
    "hints": [
      "An alert should help someone decide what to inspect.",
      "Include affected scope, measurement window and a bounded first step.",
      "Inspect its denominator and impact rather than interpreting the global fraction alone."
    ],
    "alternative": "A notification may be informational rather than paging if the agreed impact does not require immediate response.",
    "variation": "Now failures affect only one low-volume tenant.",
    "variationBasis": "Inspect its denominator and impact rather than interpreting the global fraction alone."
  },
  "slow": {
    "hints": [
      "An average can hide a small slow group.",
      "Compare the sample distribution with per-stage observations.",
      "Separate that population before making a general version claim."
    ],
    "alternative": "A representative trace sample can complement percentiles without proving every request has the same cause.",
    "variation": "Now the slow requests appear only with cold caches.",
    "variationBasis": "Separate that population before making a general version claim."
  },
  "benchmark": {
    "hints": [
      "The two samples used different cache conditions.",
      "Compare workload, sample count and warm-up before crediting a version.",
      "Machine differences remain a confounder to inspect."
    ],
    "alternative": "A within-environment controlled comparison can be valid even when it differs from another team's benchmark.",
    "variation": "Now both runs use the same cache state but different machines.",
    "variationBasis": "Machine differences remain a confounder to inspect."
  },
  "migration": {
    "hints": [
      "An old reader may still need the field being replaced.",
      "List old and new reader/writer combinations and their supported behavior.",
      "The compatibility window must account for those clients."
    ],
    "alternative": "An expand-and-contract strategy can fit when its compatibility and cleanup steps are validated.",
    "variation": "Now old clients cannot be upgraded for three months.",
    "variationBasis": "The compatibility window must account for those clients."
  },
  "api-change": {
    "hints": [
      "A compatible-looking value can still have an incompatible type.",
      "Name which supported clients expect an integer quantity.",
      "A number-to-string change needs a deliberate compatibility strategy."
    ],
    "alternative": "A new API version can be one option if its transition and ownership are explicit.",
    "variation": "Now clients parse quantity without type coercion.",
    "variationBasis": "A number-to-string change needs a deliberate compatibility strategy."
  },
  "cache": {
    "hints": [
      "A stored response is not necessarily fresh or reusable.",
      "Compare age 90 with the stated freshness lifetime.",
      "Recalculate freshness without assuming storage presence permits reuse."
    ],
    "alternative": "Validation can permit reuse in suitable HTTP circumstances, but this toy only compares age and lifetime.",
    "variation": "Now freshness lifetime is reduced to 30 seconds.",
    "variationBasis": "Recalculate freshness without assuming storage presence permits reuse."
  },
  "consistency": {
    "hints": [
      "A successful write does not define every read path's guarantee.",
      "Track which replica serves the immediate read.",
      "State the required observation guarantee rather than assuming all replicas are current."
    ],
    "alternative": "A supported stronger read or reading from the appropriate leader can be an option when its semantics fit.",
    "variation": "Now the user switches replicas between consecutive reads.",
    "variationBasis": "State the required observation guarantee rather than assuming all replicas are current."
  },
  "time": {
    "hints": [
      "The same instant can belong to different local calendar days.",
      "Use the explicit instant and the intended business timezone.",
      "Recompute the date in the agreed zone; do not change the underlying instant."
    ],
    "alternative": "A UTC reporting day is valid when the business explicitly chooses it.",
    "variation": "Now the business day belongs to Tokyo rather than New York.",
    "variationBasis": "Recompute the date in the agreed zone; do not change the underlying instant."
  },
  "leak": {
    "hints": [
      "Inspect acquisition and release on both normal and error paths.",
      "The supplied sketch omits release on the error branch.",
      "Check cleanup of partially acquired resources, not only the final connection."
    ],
    "alternative": "A structured lifetime or validated finally block can also fit the intended cleanup boundary.",
    "variation": "Now errors occur halfway through a multi-resource acquisition.",
    "variationBasis": "Check cleanup of partially acquired resources, not only the final connection."
  },
  "degrade": {
    "hints": [
      "An optional dependency should not erase the essential task without a reason.",
      "Separate already-loaded reading content from unavailable recommendations.",
      "Do not promise that missing content can be read offline."
    ],
    "alternative": "An explicit limited mode can be appropriate when its essential content and limitations are truthful.",
    "variation": "Now the book text was never loaded before disconnection.",
    "variationBasis": "Do not promise that missing content can be read offline."
  },
  "queue": {
    "hints": [
      "Backlog changes with arrival and completion rates together.",
      "Twelve arrivals and eight completions per second imply positive growth.",
      "Inspect the drain rate and remaining initial backlog."
    ],
    "alternative": "Admission control or greater service capacity can help, depending on limits and cost.",
    "variation": "Now arrivals fall to four per second while capacity stays eight.",
    "variationBasis": "Inspect the drain rate and remaining initial backlog."
  },
  "runbook": {
    "hints": [
      "A procedure needs a condition under which it applies.",
      "Specify an expected observation and an escalation boundary.",
      "Stop or follow a defined alternate branch; do not continue blindly."
    ],
    "alternative": "A short decision tree can work when each branch is grounded in observable evidence.",
    "variation": "Now the first check returns an unexpected result.",
    "variationBasis": "Stop or follow a defined alternate branch; do not continue blindly."
  },
  "postmortem": {
    "hints": [
      "The supplied system conditions do not establish personal intent.",
      "No automated validation existed to bypass.",
      "Append the evidence and revise the account without rewriting the original observation history."
    ],
    "alternative": "A contributing-condition account can acknowledge decisions without assigning unsupported motives.",
    "variation": "Now later evidence reveals another contributing dependency.",
    "variationBasis": "Append the evidence and revise the account without rewriting the original observation history."
  },
  "automation": {
    "hints": [
      "Include maintenance and frequency, not just one manual run.",
      "Frequent rule changes can consume the expected saved time.",
      "Recalculate effort while keeping the maintenance assumption explicit."
    ],
    "alternative": "A partial automation with human review can be appropriate for changing rules.",
    "variation": "Now the task runs daily instead of monthly.",
    "variationBasis": "Recalculate effort while keeping the maintenance assumption explicit."
  },
  "ai-generated-test": {
    "hints": [
      "An expected result copied from a bug cannot independently expose it.",
      "Exactly 100 separates the policy from the buggy comparison.",
      "Derive a new boundary test from the approved rule, not from the old implementation."
    ],
    "alternative": "An independently reviewed property or example can provide a useful test basis.",
    "variation": "Now the policy threshold changes to 200.",
    "variationBasis": "Derive a new boundary test from the approved rule, not from the old implementation."
  },
  "upgrade": {
    "hints": [
      "A changed default can affect behavior even without a source-code edit.",
      "Compare the release-note timeout change with explicit configuration.",
      "Reconsider the risk of delay alongside the upgrade and recovery plan."
    ],
    "alternative": "Pinning a supported version temporarily can be reasonable while compatibility is investigated.",
    "variation": "Now the old version stops receiving security fixes.",
    "variationBasis": "Reconsider the risk of delay alongside the upgrade and recovery plan."
  },
  "unknown": {
    "hints": [
      "Report the observation without turning it into a diagnosis.",
      "Separate known affected behavior from missing stored-effect evidence.",
      "Update the scope of the incident and revisit the version-specific hypothesis."
    ],
    "alternative": "A conditional impact statement can be useful when the uncertainty is explicit.",
    "variation": "Now a previously unaffected version shows the same symptom.",
    "variationBasis": "Update the scope of the incident and revisit the version-specific hypothesis."
  },
  "human-ai": {
    "hints": [
      "Apply the same evidence rule regardless of the author.",
      "One answer treats timeout as proof; the other leaves room for a lost reply.",
      "Use the same rubric before seeing who supposedly wrote the approach."
    ],
    "alternative": "A human or AI answer can be useful if its claims stay within the evidence.",
    "variation": "Now author labels are hidden until after your review.",
    "variationBasis": "Use the same rubric before seeing who supposedly wrote the approach."
  },
  "reading-ideas": {
    "hints": [
      "A passage can inspire a question without proving an engineering claim.",
      "Keep the author's actual words separate from your interpretation.",
      "State the tension and propose an engineering observation independently of the literary analogy."
    ],
    "alternative": "A contrasting passage can deepen the question without requiring agreement.",
    "variation": "Now another passage supports the opposite interpretation.",
    "variationBasis": "State the tension and propose an engineering observation independently of the literary analogy."
  }
};
