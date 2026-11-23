# Art Room: collection-wide local upgrade — 2026-11-22

Status: implemented locally; not committed, pushed or deployed. This inventory counts 34 behavior/content refinements in this pass. It does not count the earlier entrance illustrations or ten Picasso studies again, and it is not a historical total for the website.

Preview: http://127.0.0.1:3050/study/art

## Implemented changes

1. **Painting query reset.** Clear the painting query independently of other choices.
2. **Search-preserving recovery.** Clear incompatible filters while keeping the visitor’s search.
3. **Filter visibility.** Summarize active non-query filters beside the existing filter controls.
4. **Stable result counts.** Keep collection result counts visible when a save notice appears.
5. **Individual comparison removal.** Remove either comparison choice directly from the tray.
6. **Comparison announcements.** Announce the current selection count to assistive technology.
7. **Pagination focus.** Move keyboard focus to the collection heading after paging or choosing an era.
8. **Painter search.** Search names, places and movements across all 25 painter profiles.
9. **Painter era filtering.** Combine a painter query with an era choice.
10. **Painter empty-state recovery.** Show matching counts and reset choices from an empty painter result.
11. **Source-image clarity.** Give source-only collection cards accurate accessible link names.
12. **Drawings discovery.** Identify the existing 24 paper objects and 10 Picasso studies at the gallery entrance.
13. **Painter contents shortcuts.** Jump to biography, career, selected works or sources.
14. **Painter-to-gallery return.** Open the gallery filtered to the current painter.
15. **Paper metadata search.** Find existing sheets by title, maker or material without duplicating their studies.
16. **Paper artist-group filtering.** Combine sheet search and maker groups while preserving attribution qualifiers.
17. **Close a paper study.** Close an expanded study and return focus to its summary.
18. **Named paper resume.** Identify the actual previously read sheet in the resume link.
19. **Visit format filtering.** Choose short introductions, question-led visits or exhibitions.
20. **Visit subject search.** Search the existing visit titles, questions and descriptions.
21. **Visit empty-state recovery.** Reset a search and format choice from no results.
22. **A clear first visit.** Offer the existing five-minute visit prominently and explain that times estimate reading.
23. **My Art shortcuts.** Keep notes, passages, exhibition and backup navigation available even before saving a painting.
24. **Saved-painting search.** Search saved paintings without changing the saved collection.
25. **Saved-work identification.** Show artist and date on saved painting cards.
26. **Reversible saved removal.** Remove and restore a painting without deleting notes; restoration is idempotent across tabs and restores useful keyboard focus, including when filtered out.
27. **Damaged-copy recovery.** Distinguish unreadable saved data from an empty gallery and preserve the damaged copy.
28. **Writing-aware empty state.** Acknowledge remaining writing and visit records when there are no saved paintings.
29. **Skip room navigation.** Provide a keyboard skip link to the current room’s content.
30. **Scoped hash navigation.** Open hash targets inside the current Art Room frame, avoiding retained-page ID collisions.
31. **Scoped study navigation.** Keep research jumps and whole-artwork return within the current study.
32. **Scoped reading continuity.** Observe reading position only within the current essay.
33. **Current collection introduction.** Recognize existing prints and drawings; update the collection metadata beyond the former gentle-introduction description.
34. **Directory completeness.** Include drawings and working process in the existing collection directory.

## Verification

- Production build, TypeScript and postbuild packed-book / asset-budget audits passed.
- Full unit suite: 1,173 passed, zero failed.
- Eight Art Room browser suites: 75 passed, zero failed, against the final production build (including the filtered-Undo focus regression).
- Targeted ESLint and `git diff --check` passed.
- Actual screenshots inspected at desktop 1440 × 1000 and phone viewport 390 × 844 for paintings, painters, a painter profile, drawings search, visits, My Art and an artwork study. Additional populated saved-work and Undo screenshots inspected. This is Chromium phone emulation, not a physical-device test.
- Browser coverage includes automated WCAG A/AA checks, no horizontal overflow, text enlargement, keyboard navigation, saved-data preservation, comparison controls, sheet opening/closing, visits and all ten Picasso studies. This is not a claim of exhaustive accessibility certification.
- Local image integrity audit checked 281 image/thumbnail references and aspect ratios with zero issues. This does not certify reproduction rights, image identity or current external museum URLs.

## Scope and preservation

No new service or artwork image was added by this package. Existing entrance artwork and Picasso studies remain in the local checkout. Picasso reproductions remain unhosted, with institutional source-page links and the documented clearance guard retained. Storage keys and existing personal records were preserved; browser tests use isolated contexts.

The raw local asset budget has an explicit bounded addition of 32 KiB JavaScript and 8 KiB CSS for these controls. Image and packed-book limits were not raised by this package. These are local build budgets, not hosting charges.

Two stale regression expectations were corrected against current catalog/source behavior: 124 works / 25 painters and the existing “Find a work or artist” / fullscreen labels. An accidental empty My Art heading was fixed, and drawings-search padding and list markers were corrected after visual inspection.

## Evidence and rerun

Screenshots and image audit: `artifacts/art-room-upgrade/` (local ignored artifacts).

Browser command, with the production server running on port 3050:

```sh
npx playwright test --config=artifacts/art-room-upgrade/playwright.config.ts
```

The new behavioral suite is also included in the tracked CI configuration. No deployment was requested for this pass.
