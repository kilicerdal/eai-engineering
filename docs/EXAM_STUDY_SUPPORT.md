# Exam preparation: initial study-support release

The main study page now offers exam-specific entry points and a personal mistake notebook. The former Guided Practice bank remains at /study/practice and is labeled foundational practice, not an exam simulation.

Profiles: PSAT, SAT, ACT, AP subjects, MCAT, GRE, GMAT, LSAT, TOEFL, IELTS, and a custom exam. Profiles provide distinct focus suggestions, starting levels and links to official providers, checked November 1, 2026. These are initial study contexts, not fully reviewed courses, official blueprints, licensed banks or scored simulations. Language-exam coaching is text-based; no audio or speech assessment is claimed.

Learners enter their own focus and optional date. Building a plan passes the exam goal to the existing goal-first workflow, where optional material upload and pace settings remain available. Practice prepares a single-question tutor request in exam/practice mode. Both actions retain editable learner control.

The notebook stores at most 50 manually captured attempts in browser localStorage. It includes original question, learner answer/reasoning, optional answer-key guidance and editable learning notes. AI review uses the existing protected study-chat route and SSE reader; it is instructed to check whether the answer is actually wrong, identify reasoning gaps and avoid assuming supplied answer keys are correct. Saved entries survive failed/cancelled review calls. AI feedback requires verification and is not a grade.

Trying another question passes bounded context to the tutor and asks for one changed original example, waiting for the learner's attempt. Marking a review schedules a browser-local revisit after 1, 3, 7, then 14 days. These intervals reflect self-reported activity, not measured retention. No notifications, automatic mistake capture, automatic scoring, mastery claims or account sync are implemented.

Official references: College Board SAT Suite and PSAT Bluebook; College Board AP Courses; ACT exam sections; AAMC MCAT content outline; ETS GRE/TOEFL; GMAC mba.com GMAT; LSAC LSAT; IELTS test types. Exact links live with the profiles in src/lib/study-exams.ts. No provider questions, logos or paid content were copied.

After this foundation, prioritize quality, reliability, navigation and learning coherence over new feature scope. Exam-specific reviewed assessments remain separate work, not a promise of this release.
