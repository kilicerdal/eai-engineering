// Editorially assigned question identities. Never inferred from learner performance.
export const expandedLessons:Record<string,{id:string;title:string;rule:string;example:string}>={
 supervised:{id:'supervised',title:'Learning from labeled examples',rule:'Supervised examples pair inputs with reviewed target labels.',example:'A message is supplied with its spam/not-spam label.'},
 regression:{id:'regression',title:'Predicting a number',rule:'Regression predicts a numerical target; assigning a class is a different task.',example:'Predict delivery minutes rather than a shipping category.'},
 robustness:{id:'robustness',title:'Behavior under relevant changes',rule:'Robustness checks controlled changes within the intended operating conditions.',example:'Change image brightness while checking the accepted behavior.'},
 generalization:{id:'generalization',title:'Check unseen examples',rule:'Training-set performance does not establish behavior on independent examples.',example:'Keep evaluation examples separate and representative of intended use.'},
 recall:{id:'recall',title:'Finding the actual positives',rule:'Recall divides true positives by all actual positives: true positives plus false negatives.',example:'Finding 30 of 40 actual positives gives recall of 75%.'},
 grounding:{id:'grounding',title:'Verify the claim independently',rule:'A plausible generated claim or citation still needs independent checking.',example:'Open the cited source and check the claimed method or requirement.'},
 oracle:{id:'oracle',title:'An independent expected result',rule:'An assertion needs an expected result that can expose the relevant defect.',example:'Repeating a function’s own output as its expected value does not independently check it.'},
 pilot:{id:'pilot',title:'Try representative conditions first',rule:'A successful trivial demo does not establish suitability in the target environment.',example:'Pilot the real identity flow and inspect maintenance and diagnostics.'},
 lifecycle:{id:'lifecycle',title:'Count review and maintenance effort',rule:'Value includes review, correction and ongoing maintenance, not only initial generation speed.',example:'Ten minutes saved drafting can be outweighed by an hour of corrections.'},
 testbasis:{id:'testbasis',title:'Agree the behavior before checking it',rule:'Expected behavior comes from an agreed test basis, not an invented requirement.',example:'Clarify an eligibility rule with a concrete input and outcome.'},
 backoff:{id:'backoff',title:'Retries need bounds and variation',rule:'Bound retry effort and introduce jitter to reduce synchronized retry bursts.',example:'Clients retrying together at fixed intervals can repeat the overload.'},
 dependency:{id:'dependency',title:'Express a job dependency',rule:'A dependent job needs the required success condition, not just a visual ordering.',example:'Deploy after the test job succeeds using the declared dependency.'},
 matrix:{id:'matrix',title:'Test the declared combinations',rule:'A job matrix defines variants across chosen axes.',example:'Two runtimes and two operating systems create four combinations.'},
 accountability:{id:'accountability',title:'Acceptance remains a human decision',rule:'Generated output does not transfer responsibility for accepting a consequential change.',example:'Inspect the actual change and independent validation before accepting it.'},
 isolation:{id:'isolation',title:'Arrange independent test data',rule:'A test should make its required preconditions explicit rather than depend on an earlier test’s hidden state.',example:'Allocate independent accounts for parallel tests.'},
 guardrail:{id:'guardrail',title:'A permission ceiling is not a grant',rule:'An organization permission boundary and an identity grant have different roles.',example:'An identity allow cannot override an applicable explicit deny.'},
 recovery:{id:'recovery',title:'Recovery needs measured evidence',rule:'Restored service time and tolerated data loss are separate requirements.',example:'A backup location alone does not show that restoration meets the targets.'},
 collaboration:{id:'collaboration',title:'Clarify acceptance together',rule:'Bring relevant business and technical participants into concrete acceptance examples.',example:'Resolve contradictory examples before implementation is complete.'},
 exploratory:{id:'exploratory',title:'Investigate with a purpose',rule:'A charter provides direction while new evidence may justify adapting the investigation.',example:'Record an unexpected high-impact cancellation path and explain the deviation.'}
};
export const expandedConceptMaps:Record<string,Record<string,string>>={
 'ai-practitioner':{'01':'supervised','growth-001':'supervised','02':'regression','growth-003':'regression','03':'generalization','growth-006':'generalization','04':'recall','growth-008':'recall','07':'grounding'},
 'solutions-architect':{'01':'identity','growth-001':'identity','03':'availability','04':'queue','05':'delivery','07':'purchase','growth-002':'guardrail'},
 'developer-associate':{'01':'queue','growth-001':'queue','02':'grounding','06':'oracle','08':'backoff','growth-009':'backoff'},
 'test-automation':{'01':'automation','03':'pilot','growth-009':'pilot','08':'isolation','11':'risk','12':'risk','13':'oracle','growth-008':'oracle','growth-001':'lifecycle','growth-006':'lifecycle','growth-002':'risk','growth-005':'risk'},
 'ai-testing':{'01':'supervised','growth-001':'supervised','03':'recall','04':'recall','05':'recall','06':'generalization','growth-004':'generalization','07':'grounding','08':'robustness','growth-007':'robustness','10':'generalization','11':'generalization','12':'risk'},
 'generative-ai-testing':{'01':'testbasis','03':'testbasis','04':'boundary','09':'lifecycle','growth-002':'testbasis','growth-007':'testbasis','growth-003':'oracle','growth-004':'risk','growth-009':'oracle','growth-005':'accountability'},
 'github-actions':{'01':'dependency','growth-004':'dependency','02':'matrix','growth-005':'matrix','09':'identity'},
 'github-copilot':{'01':'accountability','04':'accountability','growth-001':'accountability','growth-007':'accountability','05':'grounding','growth-002':'grounding','growth-008':'grounding','06':'testbasis','07':'testbasis','08':'testbasis','09':'oracle','10':'lifecycle'},
 'solutions-architect-professional':{'v1-01':'guardrail','v1-07':'guardrail','v1-08':'recovery','v1-14':'recovery','v1-11':'queue','v1-12':'delivery'},
 'agile-tester':{'v1-07':'collaboration','v1-14':'collaboration','v1-17':'collaboration','v1-18':'exploratory','v1-19':'exploratory','v1-23':'isolation','v1-24':'lifecycle'}
};
