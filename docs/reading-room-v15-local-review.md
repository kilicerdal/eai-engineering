# Reading Room V1.1–V1.5 local review

Local preview: http://127.0.0.1:3024/study/reading. No production publication or Git push performed.

- V1.1: 25 curated books; original six records and legacy bookshelf key retained. Mood, genre, shelf and text filters; editorial reading invitations and edition-based length estimates.
- V1.2: established ancient-to-future library art, original typographic book covers, prominent Currently reading shelf.
- V1.3: source-verified opening excerpts, surprise discovery respecting current filters and preferring unshelved books, Short reads / Big ideas / Journeys into imagination collections.
- V1.4: all 25 bundled text-only editions, navigation sections, paragraph-level Resume, bookmarks, three type sizes, three themes, two reading widths, Focus mode. Full source text with license and credits remains accessible. See reading-editions.md for provenance.
- V1.5: private local notes and saved passages, edit/return/remove controls, versioned backup export and merge restore with preview, conflict-preserving notes, stale-preview detection, recovery on write failures. Passage discussion opens a separate unsent tutor draft, preserving existing tutor drafts and excluding private notes.

Checks: all 383 repository tests passed; TypeScript passed; ESLint passed with only the existing StudyAccount navigation warning; production build passed. Final UI refinements were typechecked, linted and rebuilt. No Curiosity Room data keys, backgrounds or features were changed.

Browser checks: catalog filtering, actual source opening, bookmarking, note persistence after reload, backup download and restore merge without duplicates, Paper/Largest controls, Focus, paragraph-level Resume after scrolling and reload, preserved shelf status in Currently reading, surprise selection, and unsent dAI passage handoff. Layout reviewed at the browser's actual desktop and narrow widths; no horizontal overflow in the narrow reader. No browser console errors observed.

Local demonstration data: Alice marked Reading, one bookmark and one explicitly labeled local preview note; a reading discussion draft was created but not sent. No existing user records were deleted.
