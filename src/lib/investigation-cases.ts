/** Public recorded captures and an explicitly authored private-source design exercise. */
export type LabEvidence = {id:string;title:string;summary:string;detail:string;source:string;date:string;revision:string;kind:"recorded"|"authored"};
export type LabCase = {id:string;title:string;project:string;category:string;minutes:number;question:string;promise:string;image:string;story:string;predictions:string[];predictionAnswer:number;predictionWhy:string;evidence:LabEvidence[];interpretation:string;missing:string[];nextChecks:string[];challenge:string;corrections:string[];correctionAnswer:number;correctionWhy:string;lesson:string};
export const labCases: LabCase[] = [
  {
    "id": "order-once",
    "title": "The checkout that succeeded twice.",
    "project": "Playwright AI Automation",
    "category": "Checkout integrity",
    "minutes": 5,
    "question": "A repeated checkout returned success. Did it preserve the original order?",
    "promise": "A repeated request with the same identity should return the original order without repeating the business effect.",
    "image": "/images/engineering/order-once-share.png",
    "story": "/engineering/order-once",
    "predictions": [
      "Every successful response means a different order.",
      "The response code alone cannot establish whether the order was duplicated.",
      "Retries always fail."
    ],
    "predictionAnswer": 1,
    "predictionWhy": "A success status does not prove uniqueness. Compare order identity and persistent business effects.",
    "evidence": [
      {
        "id": "checkout-control",
        "title": "01 / Start with the healthy control",
        "summary": "The protected checkout returned 201 then 200. The retry had the same order identity.",
        "detail": "The recorded control passed. It provides the intended result for this authored replay scenario.",
        "source": "/evidence/order-once.json",
        "date": "2026-11-06T16:26:01.895Z",
        "revision": "dbcbb6e2a773a37b1325af4f8a58bdd89369cc02",
        "kind": "recorded"
      },
      {
        "id": "checkout-fault",
        "title": "02 / Compare the injected fault",
        "summary": "With duplicate-replay injected, checkout returned 201 then 201. The retry did not preserve the same order identity.",
        "detail": "The repeated-checkout assertion failed in the recorded fault case; this is a controlled negative result, not a live customer incident.",
        "source": "/evidence/order-once.json",
        "date": "2026-11-06T16:26:01.895Z",
        "revision": "dbcbb6e2a773a37b1325af4f8a58bdd89369cc02",
        "kind": "recorded"
      },
      {
        "id": "checkout-boundary",
        "title": "03 / Read the boundary of the evidence",
        "summary": "The plan is an authored offline example executed against PostgreSQL in disposable schemas. The capture records zero model calls.",
        "detail": "The captured divergence establishes a duplicated identity in this seeded scenario. It does not reveal every possible production retry failure.",
        "source": "/evidence/order-once.json",
        "date": "2026-11-06T16:26:01.895Z",
        "revision": "dbcbb6e2a773a37b1325af4f8a58bdd89369cc02",
        "kind": "recorded"
      }
    ],
    "interpretation": "The fault-case retry created a different order identity, while the healthy control returned the original. This supports the recorded duplicate-replay defect; it does not identify every possible implementation cause.",
    "missing": [
      "The capture alone is not a complete production request trace.",
      "Other concurrency, retention and payload-conflict cases need their own checks."
    ],
    "nextChecks": [
      "Assert both response identity and persisted order count after a retry.",
      "Verify inventory changes once and changed content cannot silently replace the original."
    ],
    "challenge": "A capture showing one persisted identity and one inventory change for the same fault execution would challenge a duplicate-business-effect diagnosis. Check whether the compared records belong to the same run.",
    "corrections": [
      "Retry until another 201 response appears.",
      "Enforce request identity at persistence, compare payloads and assert one business effect.",
      "Hide the repeated request in the interface."
    ],
    "correctionAnswer": 1,
    "correctionWhy": "The review guide places the promise at the persistence boundary. A UI change or another retry cannot establish exactly-once business effects.",
    "lesson": "Transport success and business correctness are different assertions."
  },
  {
    "id": "claim-twice",
    "title": "The claim that returned.",
    "project": "AI Healthcare Quality Platform",
    "category": "Message redelivery",
    "minutes": 5,
    "question": "Storage succeeded, but the queue acknowledgement failed. What should happen when delivery repeats?",
    "promise": "Redelivery should preserve the original synthetic claim; changed content with the same identity must not overwrite it.",
    "image": "/images/engineering/claim-twice-share.png",
    "story": "/engineering/claim-twice",
    "predictions": [
      "A repeated delivery always creates another claim.",
      "Receiving a claim means it was approved or paid.",
      "Acknowledgement and storage are separate; inspect the persisted identity."
    ],
    "predictionAnswer": 2,
    "predictionWhy": "An acknowledgement can fail after persistence succeeds. Received is neither approval nor payment.",
    "evidence": [
      {
        "id": "claim-ack",
        "title": "01 / Separate storage from acknowledgement",
        "summary": "The capture deliberately injects acknowledgement loss after a synthetic claim is stored. The database holds one claim.",
        "detail": "The immediate visibility release makes this authored redelivery deterministic.",
        "source": "/evidence/claim-redelivery.json",
        "date": "2026-11-06T16:58:01.348Z",
        "revision": "b175a55d882658583e617a95b4a8631b87fd069a",
        "kind": "recorded"
      },
      {
        "id": "claim-replay",
        "title": "02 / Follow the repeated delivery",
        "summary": "Redelivery returned 201; the database still held 1 claim with the original amount 125.5.",
        "detail": "The replay reused the first claim. A received amount is an input value, not a payment.",
        "source": "/evidence/claim-redelivery.json",
        "date": "2026-11-06T16:58:01.348Z",
        "revision": "b175a55d882658583e617a95b4a8631b87fd069a",
        "kind": "recorded"
      },
      {
        "id": "claim-conflict",
        "title": "03 / Change the content",
        "summary": "The same object key with changed content returned 409. The original claim remained preserved.",
        "detail": "The capture uses disposable PostgreSQL and Moto S3/SQS simulation, with zero real AWS calls and zero model calls.",
        "source": "/evidence/claim-redelivery.json",
        "date": "2026-11-06T16:58:01.348Z",
        "revision": "b175a55d882658583e617a95b4a8631b87fd069a",
        "kind": "recorded"
      }
    ],
    "interpretation": "The recorded ingestion preserved one original claim across redelivery and rejected changed content. Acknowledgement failure was deliberately injected; this does not establish that all message-delivery failures are handled.",
    "missing": [
      "Production delivery timing, retry policy and operational recovery are not evaluated here.",
      "Approval and payment are outside this ingestion example."
    ],
    "nextChecks": [
      "Inject acknowledgement loss after commit and inspect the same stored identity on redelivery.",
      "Change content under the same object identity and assert a conflict with the original unchanged."
    ],
    "challenge": "A second persisted claim for the same recorded object identity, or an overwritten original on conflict, would contradict the preservation claim.",
    "corrections": [
      "Acknowledge before attempting storage.",
      "Overwrite the claim whenever the message returns.",
      "Keep ingestion idempotent and reject conflicting content before acknowledging success."
    ],
    "correctionAnswer": 2,
    "correctionWhy": "Separate persistence, duplicate handling and acknowledgement. The guide preserves original content; it does not interpret ingestion as approval.",
    "lesson": "A message returning does not mean its business effect should repeat."
  },
  {
    "id": "settlementlab",
    "title": "The replay that reserved again.",
    "project": "SettlementLab",
    "category": "Independent assurance",
    "minutes": 6,
    "question": "A collateral replay returned 201 where the independent contract expected 200. What does that prove?",
    "promise": "The same reservation request should replay its original identity, not be treated as another creation.",
    "image": "/images/engineering/settlementlab-desktop.png",
    "story": "/engineering/settlementlab#reuse-v26",
    "predictions": [
      "Any failed test proves the intended defect was detected.",
      "Compare a passing healthy control with the exact failed contract assertion.",
      "The result proves a real market settlement failed."
    ],
    "predictionAnswer": 1,
    "predictionWhy": "An arbitrary failure is insufficient. The healthy control and the expected divergence give the seeded fault its meaning.",
    "evidence": [
      {
        "id": "collateral-control",
        "title": "01 / Establish the independent control",
        "summary": "The collateral target control passed C01 and C02. C02 checks reservation replay identity and inventory.",
        "detail": "This is a separate owned synthetic HTTP target, not an external financial institution.",
        "source": "/evidence/reuse-v26.json",
        "date": "2026-11-07T16:09:38.382590+00:00",
        "revision": "Working-tree source hashes in the evidence manifest",
        "kind": "recorded"
      },
      {
        "id": "collateral-fault",
        "title": "02 / Inspect the expected divergence",
        "summary": "In the injected fault report C01 still passed. C02 failed at step 3: expected HTTP 200, observed 201.",
        "detail": "The report records this exact HTTP-status contract failure. Do not infer unrecorded balances or market outcomes.",
        "source": "/evidence/reuse-v26.json",
        "date": "2026-11-07T16:09:38.461197+00:00",
        "revision": "Working-tree source hashes in the evidence manifest",
        "kind": "recorded"
      },
      {
        "id": "collateral-scope",
        "title": "03 / Read the provenance",
        "summary": "The V2.6 evidence describes two owned synthetic local services. It records working-tree source hashes rather than a clean source commit.",
        "detail": "The historical working-tree capture is distinct from the later V3 showcase manifest. Source hashes are not signed independent attestation.",
        "source": "/evidence/reuse-v26.json",
        "date": "2026-11-07T16:09:38.382590+00:00",
        "revision": "V2.6 · Working-tree source hashes",
        "kind": "recorded"
      }
    ],
    "interpretation": "The independent C02 contract detected the expected replay-status divergence in the seeded collateral target, with its healthy control passing. This demonstrates that case, not broad production assurance.",
    "missing": [
      "The status assertion alone does not establish every balance or identity property.",
      "This is neither live market connectivity nor an independently attested benchmark."
    ],
    "nextChecks": [
      "Require the healthy target to pass before interpreting the negative replay.",
      "Check exact failing action and expected/observed values, then inspect identity and inventory assertions separately."
    ],
    "challenge": "A failure in setup or a different assertion would challenge the claim that the intended seeded defect was detected. A healthy control failure would also invalidate that comparison.",
    "corrections": [
      "Treat any exception as a detected fault.",
      "Preserve identity on replay and verify the exact contract alongside a passing healthy control.",
      "Assume every 201 response proves inventory was reduced twice."
    ],
    "correctionAnswer": 1,
    "correctionWhy": "Independent expectations and exact divergence matter. These recorded checks do not execute a new fix or establish production readiness.",
    "lesson": "A failing negative test is useful only when it fails for the intended reason."
  },
  {
    "id": "generated-test",
    "title": "The test that agreed with itself.",
    "project": "Healthcare Quality Lab · design exercise",
    "category": "AI test review",
    "minutes": 4,
    "question": "A generated test compiles and expects 101 to be accepted. Should it be approved?",
    "promise": "A proposed expectation should match an independently authored contract before approval.",
    "image": "/images/engineering/quiet-synthetic-mind-v1.webp",
    "story": "/engineering/private-lab",
    "predictions": [
      "Compiling proves that its expectation is correct.",
      "Review the expectation against a separate contract.",
      "An AI confidence score is enough for approval."
    ],
    "predictionAnswer": 1,
    "predictionWhy": "Compilation checks syntax, not the meaning of the requirement.",
    "evidence": [
      {
        "id": "test-contract",
        "title": "01 / Read the toy contract",
        "summary": "An authored toy contract accepts integer amounts from 1 to 100 inclusive.",
        "detail": "This is a synthetic teaching rule, not a clinical or production rule.",
        "source": "/engineering/private-lab",
        "date": "Authored exercise · no execution date",
        "revision": "Public design illustration",
        "kind": "authored"
      },
      {
        "id": "test-proposal",
        "title": "02 / Read the proposed expectation",
        "summary": "The authored generated-test example expects amount 101 to be accepted.",
        "detail": "This proposal is intentionally wrong. It is illustrative text, not output from a live model in this session.",
        "source": "/engineering/private-lab",
        "date": "Authored exercise · no execution date",
        "revision": "Public design illustration",
        "kind": "authored"
      },
      {
        "id": "test-review",
        "title": "03 / Compare independently",
        "summary": "101 is outside the independently stated inclusive range. The proposed acceptance expectation disagrees with the contract.",
        "detail": "The proposal remains unapproved in this exercise. No private repository or run records are exposed.",
        "source": "/engineering/private-lab",
        "date": "Authored exercise · no execution date",
        "revision": "Public design illustration",
        "kind": "authored"
      }
    ],
    "interpretation": "The proposed expectation contradicts the toy contract: 101 exceeds the upper bound of 100. The review should reject that expectation; compilation does not resolve the disagreement.",
    "missing": [
      "This exercise does not include executed tests or real private implementation evidence.",
      "The reference contract itself would need review in a real project."
    ],
    "nextChecks": [
      "Check 0, 1, 100 and 101 against the reviewed boundary rule.",
      "Keep proposed expectations separate from the reference and require explicit approval."
    ],
    "challenge": "An approved revision of the toy contract that includes 101 would change the judgment. A model confidence score would not.",
    "corrections": [
      "Approve because the test compiles.",
      "Change the contract silently to match the generated test.",
      "Correct the expectation, independently review the contract, and then test the boundaries."
    ],
    "correctionAnswer": 2,
    "correctionWhy": "Change the proposal through a reviewed process. This is an authored reasoning exercise, not a measured private test result.",
    "lesson": "A test can be syntactically valid and still carry the wrong expectation."
  }
];
