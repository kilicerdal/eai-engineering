# Learning home layout

The learning recommendation is rendered inside DailyStudySession as its suggested-focus column. There is one session starter; the notebook and weekly evidence remain supporting sections. Active sessions retain their original target and stage even when recommendations change. Existing storage keys, normalization and export are unchanged.

Giza artwork spans the learning-home viewport. A decorative drafting background extends to both edges behind the contained workspace. Controls collapse into one column on mobile. No artwork generation, service, model call or paid dependency was added.

Saving and account links live in Saving & backups. The session explanation appears once beside the starter; weekly evidence retains its own contextual help.

Validation: npm run test:study, npm run test:study-layout, npm run build. Browser checks cover reload persistence, chosen duration, backup download, no automatic API POST, and viewport coverage at 390/1280/2560px.
