# Art Room release — November 22, 2026

Owner authorized publication of the tested local Art Room changes to main. Tested base: `aef1719f3e62857a7d2b76f4594cf328cbd001ff`.

## Resulting behavior

The Art Room and Drawings entrances use their approved illustrations with complete compositions, captions and viewing preferences. Ten Picasso studies provide authored discussions and institutional links; Picasso reproductions remain unhosted pending clearance.

The existing collection gains clearer finders and visit navigation, image overview and shared detail views, citation tools, notebook search, per-entry backup review and improved private exhibitions. Writing improvements include recoverable arguments, comparison notes and detail revisions; multiple paragraph bookmarks; linked-passage removal review and Undo; reviewed copying/moving of collection memberships; and clearer capacity and backup diagnostics.

The finishing pass protects a different tab’s recovery copy, retains active argument writing after a saved argument is deleted elsewhere, restores useful keyboard focus, opens backup tools directly and supports long comparison printing. Legacy version-1 records remain readable and round-trip through the current backup UI. Recovery copies remain separate from explicitly saved writing and downloaded backups. No account, paid service, model invocation or database migration is introduced.

Exact local inventories and validation boundaries are recorded under `docs/local-reviews/`: entrances, Picasso studies/rights, room upgrade, experience45, writing35 and finishing. Counts in those reports refer to their own packages and must not be added as a claim of distinct site-wide features. The ESLint configuration excludes the already Git-ignored generated evidence directory; application lint rules are unchanged.

## Verification before publication

- 1,190 unit tests passed, zero failed.
- Clean Art Room browser regression: 318 passed, zero failed (261 Chromium, 57 WebKit). This includes existing Art Room behavior and 32 new finishing checks per working engine.
- Production build, TypeScript, scoped lint, packed-book audit and raw JavaScript/CSS/image/book budgets passed. The finishing pass did not increase the existing asset allowances.
- Desktop and emulated-phone layouts visually inspected, including conflict, collection, annotation and enlarged-writing states. A 35-page print fixture retains all 40 comparison notes; rendered beginning/end pages were inspected.
- Repository-wide release lint and certification structural audits were repeated before committing. These do not constitute independent historical-content or certification quality review.

## Explicit limitations

Firefox’s installed local binary exits before page navigation with a profile-folder error. Its checks remain pending and are not counted as passing. Phone coverage uses emulation. Older backup fixtures represent supported schemas rather than real visitor files. Local storage checks improve sequential multi-tab safety but are not transactional concurrency guarantees. Live Tutor evaluation remains pending credentials under the earlier owner decision. No new factual-accuracy or legal-clearance claim is made.

## Publication verification

Record the actual main SHA and deployment outcome in the release handoff. A successful Git push alone is not a deployment-success claim. Verify the Vercel commit status and perform read-only production route/browser checks after deployment.
