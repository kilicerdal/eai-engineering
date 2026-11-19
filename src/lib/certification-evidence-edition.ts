import type {CertQuestion} from './certification-content';
// New sessions only. Earlier editions and answer identities remain available.
const docs='https://docs.github.com/en/actions/';
export const evidenceEditionChanges:Record<string,{source:string;explanation?:string}>={
 'github-actions-01':{source:docs+'how-tos/write-workflows/choose-what-workflows-do/use-jobs#defining-prerequisite-jobs',explanation:'The needs dependency waits for the prerequisite. Under the stated normal success behavior, failure or skipping prevents deployment; a condition such as always() can change that behavior.'},
 'github-actions-02':{source:docs+'how-tos/write-workflows/choose-what-workflows-do/run-job-variations#adding-a-matrix-strategy-to-your-workflow-job'},
 'github-actions-03':{source:docs+'tutorials/store-and-share-data#passing-data-between-jobs-in-a-workflow',explanation:'Upload the producing job’s file and download that artifact in the consumer. The consumer also needs the producing job to finish; naming or ordering jobs in YAML does not transfer files.'},
 'github-actions-04':{source:docs+'how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#using-filters'},
 'github-actions-05':{source:docs+'tutorials/create-actions/create-a-composite-action#composite-actions-and-reusable-workflows'},
 'github-actions-06':{source:docs+'how-tos/create-and-publish-actions/release-and-maintain-actions#developing-and-releasing-actions'},
 'github-actions-07':{source:docs+'reference/security/secure-use#hardening-for-self-hosted-runners'},
 'github-actions-08':{source:docs+'how-tos/reuse-automations/reuse-workflows#creating-a-reusable-workflow'},
 'github-actions-09':{source:docs+'concepts/security/openid-connect#understanding-the-oidc-token'},
 'github-actions-10':{source:docs+'reference/security/secure-use#good-practices-for-mitigating-script-injection-attacks'},
};
export function evidenceEdition(q:CertQuestion):CertQuestion{const change=evidenceEditionChanges[q.id];if(!change)return {...q,contentRevision:'quality-v13'};const explanations=[...q.explanations];if(change.explanation)explanations[q.answer]=change.explanation;return {...q,source:change.source,explanations,reviewed:'2026-11-19',contentRevision:'quality-v13'};}
