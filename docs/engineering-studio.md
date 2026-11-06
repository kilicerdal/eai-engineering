# Engineering Studio

The homepage engineering material is consolidated into one continuous section at /#engineering, with a dedicated directory at /engineering. This replaces the separate failure-story pitch, engineering introduction, selected-project preview, scenic workspace introduction, and project gallery. The hero and flagship chat remain first. dAI Learning Studio remains a separate sibling destination.

## Information architecture

- Case Studies: checkout and healthcare stories, observed business outcomes, direct safe evidence downloads, and links to the implementing project.
- Projects: four existing projects, accurate release/development status, repository links where available, case-study links, and test-planning entry points for the two evidenced projects.
- Tools: the existing CI dashboard, AI-assisted test planner, and role alignment tool. Components load on selection; navigating the Studio never submits a model request. Switching tools or collapsing the workspace preserves entered form state during the page visit.

The shared EngineeringStudio component keeps the homepage directory and full page consistent. The full page includes project descriptions; the homepage uses concise project summaries. Existing /#projects, /#platform and tool hashes continue to resolve. Case-study headers return to /engineering#projects. Each repository remains independent; recorded results are unchanged.

## Verification scope

Browser coverage includes desktop and mobile structure, homepage-to-case-to-Studio navigation, preserved primary chat and Learning Studio links, project-to-planner navigation, old tool hashes, keyboard tab navigation, retained input, no POST requests during tool navigation, viewport overflow and selected axe rules. Existing checkout/healthcare browser tests remain in the suite. External CI responses are mocked in the workspace interaction test; no test submits a model generation request or sends verification email.

No dependencies, paid services, cloud resources, or hosting plan changes are introduced. Publish through the existing GitHub main / Vercel integration after browser checks and the production build pass.

Release verification on November 6, 2026: all 28 desktop/mobile browser executions passed; production Next.js build passed with /engineering prerendered static; repository lint completed with zero errors and the same five existing warnings. Desktop/mobile screenshots and the local production preview were reviewed. These checks do not certify accessibility or verify a live model response.
