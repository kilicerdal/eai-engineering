# Explore V1.2 — local review

All six navigation/recovery improvements are implemented across the nine existing rooms:

1. A returning visitor sees one Continue exploring card for the last visited room. It opens the room’s existing current setup. Cached gallery returns refresh metadata.
2. Surprise me, inside Help me choose, prefers unvisited rooms and stages a curated experiment. Tiny AI uses biased coverage and orbit uses a slower starting speed so the proposal changes an input. Lever uses its lifting experiment. Old named snapshots remain intact.
3. Three optional trails show one current stop, an explicit next link, and a leave/finish action. Steps persist through refresh; no scoring or required completion. Leaving clears only trail navigation.
4. What should I notice reveals an authored hint and highlights the relevant visual/result area. It is off by default.
5. My Explorations is a collapsed shared shelf with a room filter and a scroll-bounded list. It reads the legacy lever key and each existing room key without migration. Resume loads the selected existing snapshot and notes in its original room. Missing or unreadable saves produce messages and preserve original bytes. Personal notes are not copied into shelf metadata.
6. Undo my last change restores the immediately previous committed setup (including editable labels/obstacles and notes restored during snapshot resume). Return to starting setup preserves notes and named snapshots and can itself be undone. Undo is one step, available within the current mounted room; playback position and note typing are not control changes. Staged predictions can be canceled before commit.

## Data boundaries

Only `eai-explore-journeys-v1` is added for last room, visited room IDs, trail step and a one-time selected snapshot/experiment request. Snapshot data stays in `eai-explore-v1` and `eai-explore-rooms-v1:<room>`. Corrupt, oversized, invalid or stale navigation metadata is protected; in-tab navigation remains available. Same-tab notifications and cross-tab storage events refresh metadata. No notebook keys, backgrounds, model formulas, external AI configuration or repository visibility are changed.

## Validation

551 tests pass, including nine new navigation/shelf tests: valid trails and hints, unseen-first Surprise selection and exhaustion, navigation validation, legacy/shared shelf preservation and note exclusion, per-room corruption isolation, metadata-key isolation, quota/concurrent-write protection, and cached gallery refresh. Type checking and production build pass. Lint has no errors and the existing StudyAccount navigation warning.

Browser QA verifies a legacy wave snapshot resumed via the shared shelf, numerical Undo, default/reset Undo in the lever, hint highlighting, last-room Continue on gallery return, a complete three-stop trail and refresh persistence, Surprise launching an unread room with a staged prediction, and a 390 px gallery without horizontal overflow. Existing local saved snapshots remain present.

Local preview only; not published.
