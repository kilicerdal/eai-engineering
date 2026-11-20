import type {CertQuestion} from './certification-content';

const docs='https://docs.aws.amazon.com/';
const overview=docs+'whitepapers/latest/aws-overview/';
const sources:Record<string,string>={
 benefits:overview+'six-advantages-of-cloud-computing.html',
 compute:overview+'compute-services.html',
 availability:docs+'wellarchitected/latest/framework/rel_fault_isolation_multiaz_region_system.html',
 sustainability:docs+'wellarchitected/latest/sustainability-pillar/sustainability-pillar.html',
 caf:docs+'whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html',
 rightsizing:docs+'compute-optimizer/latest/ug/what-is-compute-optimizer.html',
 shared:'https://aws.amazon.com/compliance/shared-responsibility-model/',
 iam:docs+'IAM/latest/UserGuide/best-practices.html',
 roles:docs+'IAM/latest/UserGuide/id_roles.html',
 management:overview+'management-governance.html',
 security:overview+'security-services.html',
 s3:docs+'AmazonS3/latest/userguide/Welcome.html',
 database:overview+'database.html',
 cdn:docs+'AmazonCloudFront/latest/DeveloperGuide/Introduction.html',
 integration:overview+'application-integration.html',
 storage:overview+'storage-services.html',
 network:overview+'networking-services.html',
 estimate:docs+'pricing-calculator/latest/userguide/what-is-pricing-calculator.html',
 budgets:docs+'cost-management/latest/userguide/budgets-managing-costs.html',
 costs:docs+'cost-management/latest/userguide/ce-what-is.html',
 spot:docs+'AWSEC2/latest/UserGuide/using-spot-instances.html',
 tags:docs+'whitepapers/latest/tagging-best-practices/cost-allocation-tags.html',
 savings:docs+'savingsplans/latest/userguide/what-is-savings-plans.html',
 billing:docs+'awsaccountbilling/latest/aboutv2/consolidated-billing.html',
 marketplace:docs+'marketplace/latest/buyerguide/what-is-marketplace.html',
 snowball:docs+'snowball/latest/developer-guide/whatisedge.html',
};
// Explicit editorial mappings for the 25 core and 50 growth questions, in ID order.
// These are supporting explanations, rather than the exam guide's topic checklist.
const cloudCore=['compute','availability','benefits','sustainability','caf','rightsizing','benefits','shared','iam','management','security','iam','shared','s3','compute','database','cdn','integration','availability','management','estimate','budgets','costs','spot','tags'];
const cloudGrowth=['compute','benefits','benefits','benefits','availability','benefits','benefits','benefits','management','security','iam','roles','iam','shared','shared','management','security','security','security','security','compute','compute','s3','storage','storage','database','database','integration','integration','cdn','network','network','network','management','network','snowball','management','marketplace','estimate','budgets','costs','spot','compute','savings','tags','billing','management','costs','budgets','compute'];
const testingCore=[15,18,17,16,18,30,30,27,29,33,34,36,37,39,40,41,43,52,55,57,56,59,60,59,60];
const testingGrowth=[18,18,18,18,18,16,17,17,23,20,30,30,29,29,29,29,27,18,33,34,36,36,36,36,37,39,40,41,41,42,43,44,44,44,46,40,18,52,52,52,49,49,53,53,57,56,60,60,33,59];
const syllabus='https://istqb.org/?download_id=3345&sdm_process_download=1#page=';
export function foundationSourceV14(q:CertQuestion):string|undefined{
 const core=/^(cloud-practitioner|istqb-foundation)-(\d{2})$/.exec(q.id);
 const growth=/^(cloud-practitioner|istqb-foundation)-growth-(\d{3})$/.exec(q.id);
 const match=core??growth;
 if(match){const index=Number(match[2])-1;if(q.track==='cloud-practitioner'){const key=(core?cloudCore:cloudGrowth)[index];return key?sources[key]:undefined;}const page=(core?testingCore:testingGrowth)[index];return page?syllabus+page:undefined;}
 if(q.id==='cloud-practitioner-transfer-1')return sources.compute;
 if(q.id==='cloud-practitioner-transfer-2')return sources.iam;
 if(q.id==='istqb-foundation-transfer-1')return syllabus+'40';
 if(q.id==='istqb-foundation-transfer-2')return syllabus+'30';
 return undefined;
}
