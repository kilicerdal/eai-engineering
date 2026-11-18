# SettlementLab V4.1 case-study review

Scope: `/engineering/settlementlab` and its new V4.1 static evidence/media only. The homepage, global layout/styles, shared components/project data, dependencies and deployment settings were left unchanged. Unrelated work in other checkouts was not copied or modified.

The page now leads with the released V4.1 story: durable recovery, independent economic verification, a 240-trade campaign, architecture, reuse against a separate service, honest AI review, and pinned reproduction/release links. Earlier V1–V3 evidence remains in a collapsed archive with existing deep links preserved. Project ownership and AI-assistance attribution remain visible.

Published framework source captured: `774522de8f8e50078269f62fc4e502e7fd477da2` (clean). Release: https://github.com/kilicerdal/settlementlab/releases/tag/v4.1.0. Static scorecard files are byte-for-byte copies from that release; their original checksums are retained and tested. The separate four-trade browser recovery drill is explicitly distinguished from the 240-trade scorecard. No fresh live-model sampling or real financial activity is claimed.

Local verification:

- 942 unit tests passed, including public-claim consistency and all hosted scorecard checksum checks.
- Production build, typecheck and lint passed. One existing unrelated StudyAccount lint warning remains; no lint errors.
- Six targeted desktop/mobile browser tests passed: ownership/recruiter navigation, metrics/provenance, actual recovery video playback, report/download availability, historical deep links and no horizontal body overflow.
- WCAG 2 A/AA, 2.1 AA and 2.2 AA automated checks passed on the case-study main. Horizontally scrolling data tables have labelled keyboard-focusable regions.
- Desktop/mobile visual inspection passed; the full-page console capture uses a bounded preview with an original-size link.

Browser and repository CI provide the broader pre-publication regression checks. This record documents the local review; deployment status is tracked by the merged PR and Vercel commit status.
