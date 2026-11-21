# Welcoming Studio priorities — local review

Scope: improve the existing entrance, Continue action, checked-answer explanation and connected reading notes; address the owner's report of paintings replaced by subject-notice placeholders. Local only; no publishing requested.

- Three small entrance choices precede the complete existing room list. Static navigation is rendered by the server.
- Continue names the selected saved activity and describes its retained context. Existing selection, safety checks and storage keys stay intact.
- The deciding-answer explanation sits outside deeper practice tools. Incorrect selections open that explanation; it includes the recorded official source. The two newer paths use accurate wording rather than implying every wrong choice nearly fits.
- Shared saved-work notes/bookmarks point to validated section/paragraph coordinates. Reading Notebook entries identify their source book and chapter. Invalid coordinates fall back safely; original records are never rewritten.
- Available Art Room images show by default with discreet subject labels. An optional `hideSensitiveImages` comfort choice hides them on collection, painting, comparison, guided visit and observation surfaces. Older saved notes, galleries and notice records remain readable. The option survives backup parsing; no bulk migration is performed.
- Reference-only artwork records still link to institutional images. No replacement images or reproduction claims were added.

Verification: 1,106 unit tests passed; 25 focused browser tests passed, including an actual checked certification question, default image visibility, optional hiding, retained notes, desktop/phone accessibility and layout. TypeScript and targeted lint passed. Desktop entrance, phone entrance, Art Room collection and checked-answer screenshots were visually inspected. Production build and existing size limits passed: JavaScript 8,834,717 bytes against 8,834,767 bytes. No size limit increased. Inventory audit retains 200 books, 1,000 discoveries, 12 certification paths and 1,090 questions.

Preview: http://127.0.0.1:3038/study and http://127.0.0.1:3038/study/art?artist=goya
