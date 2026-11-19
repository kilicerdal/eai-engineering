# Simple practice and tutor accuracy — local review

Eight approved improvements implemented locally; not published.

1. Tutor final accuracy pass distinguishes exact source words from learner interpretation and corrects disputed quotations.
2. Caching guidance distinguishes read-through from write-through and avoids TTL freshness guarantees. Reference: https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside
3. Historical guidance treats fictional reports as reports and requires a supplied connection before assuming a product, market or causal mechanism.
4. Activity explanations show What worked, What to reconsider and One next step. Free writing is explicitly not automatically graded.
5. All 38 activities remain available under Engineering, AWS, Testing and Everyday Learning.
6. Three starting choices introduce the collection; the full picker remains in a disclosure.
7. Saved practice can be resumed by activity, with explicit browser/device saving scope. Existing store keys and draft format are unchanged; unsaved in-tab work remains intact across activity switches.
8. Three new evaluator cases challenge paraphrased quotations, a wrong prior cache answer and an unsupported mill-product assumption, with manual review rubrics.

Verification: 61 relevant unit tests and 11 activity browser checks passed; desktop/mobile screenshots inspected. Inventory: 12 certification paths, 1090 questions, 200 books and 1000 discoveries; no issues. Typecheck and targeted lint passed. Fresh local server also removed a stale hydration mismatch; URL-dependent activity rendering now has a Suspense loading boundary.

AI limitation: these are prompt and evaluation improvements, not proof that a stochastic model never repeats the errors. New provider responses have not been tested locally because the preview has no configured provider credentials. No production credentials were extracted and no live deployment was made.

Final production build and packed-book/asset size audits passed with no budget issues. Two focused browser checks were rerun after the loading-boundary fix and passed. Preview: http://127.0.0.1:3037/study/journeys/try
