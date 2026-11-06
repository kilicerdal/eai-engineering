# Contact desk

The homepage /#contact now uses a compact two-column contact desk in place of the oversized scenic call to action. The existing architectural image is cropped and darkened on the invitation side; the contact options use a calm navy surface. Mobile stacks the invitation and contact options.

Engineering challenges, collaborations, and project questions each link to hello@eai.engineering with a distinct encoded subject and a short draft template. These are mailto links: the visitor's email application creates the draft, and this site does not send a message or store a submission. The visible email can be opened directly or copied with the Clipboard API. A polite live message confirms success; denied/unavailable clipboard access leaves the selectable address available with a clear fallback instruction.

The footer now links to the public GitHub profile, Learning Studio, and the existing Learning Studio privacy page, explicitly labeled Learning privacy. No site-wide privacy policy is implied by that scoped link. No contact form, mailing service, response-time promise, paid service or tracking integration is introduced.

Verified November 6, 2026: all 38 browser executions passed, including desktop/mobile email-link contracts, successful clipboard writes, denied clipboard fallback, Studio navigation, selected accessibility rules and overflow checks. Desktop/mobile contact screenshots were reviewed. Production build passed. Lint passed with zero errors and five existing warnings. Tests inspect mailto URLs without opening the email app or sending messages.
