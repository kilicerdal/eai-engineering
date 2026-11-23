# Picasso reproduction review — November 22, 2026

Owner instruction: avoid future image-rights problems. Decision: do not add the proposed Bull cover or any of the ten studies’ reproductions while clearance remains unresolved.

Checked the museum and rights-holder policies listed in `data/art/research/picasso-image-clearance.json`. Musée Picasso Paris states that reproduction/representation requires prior written consent from Picasso Administration and distinguishes the agency supplying images. NGA states that making an image available does not itself convey rights in the image or underlying artwork. ARS explains its digital-media licensing procedure. These statements support an explicit permission-first editorial decision; this file does not claim to resolve all jurisdictions or provide a legal opinion.

Local audit: all ten new studies use institutional/publication page links. None embeds or hosts the Picasso reproductions. The two existing Picasso painting entries also have empty image and thumbnail fields. No matching Picasso/Bull/Quixote/Stravinsky/Guernica/Lump/Camel-named image assets were found under public/images/art. The two raw NGA Bull image URLs shown in chat are absent from the site source and the new collection data.

The chat examples were not clearance evidence and must not be treated as site-ready assets. The proposed first/final Bull cover remains unimplemented. Use the existing typographic Picasso entrance for now. Any future licence must be checked against the specific website and cover use, territories, duration, reproduction-provider terms and required credits before changing the clearance decision.

A regression guard in tests/art-picasso-paper.test.mjs protects the current no-reproduction state. No site deployment, licence purchase or external message was performed in this review.
