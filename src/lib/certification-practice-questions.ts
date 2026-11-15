import type {CertQuestion} from './certification-content';
// Frozen original exercises. Preserve IDs, option order and answer identity for existing saves.
export const practiceQuestions500:CertQuestion[]=[
  {
    "id": "cloud-practitioner-case-8-1",
    "track": "cloud-practitioner",
    "domain": "cost",
    "objective": "Billing, Pricing, and Support · caselet 8 · decision",
    "prompt": "A project has a cost estimate but no notification when actual spend departs from its budget. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate managed services against the team’s operational needs",
      "Configure budget monitoring and appropriate alerts",
      "Compare consumption-based capacity with buying for an uncertain forecast",
      "Distinguish elasticity from resilience to a location failure"
    ],
    "answer": 1,
    "explanations": [
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This directly addresses an estimate mistaken for ongoing spend monitoring.",
      "This concerns paying for idle capacity under an uncertain forecast, rather than the problem demonstrated here.",
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-8-2",
    "track": "cloud-practitioner",
    "domain": "cost",
    "objective": "Billing, Pricing, and Support · caselet 8 · verification",
    "prompt": "A project has a cost estimate but no notification when actual spend departs from its budget. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify recipients receive the intended budget notification",
      "Compare paid capacity with measured demand over time",
      "Check whether the service remains available when that location is unavailable",
      "Compare the remaining customer tasks and operating effort"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses an estimate mistaken for ongoing spend monitoring.",
      "This concerns paying for idle capacity under an uncertain forecast, rather than the problem demonstrated here.",
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here.",
      "This concerns operational effort competing with product work, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-4-1",
    "track": "cloud-practitioner",
    "domain": "security",
    "objective": "Security and Compliance · caselet 4 · decision",
    "prompt": "A team believes moving an application to AWS removes its responsibility for customer data access. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate content delivery near users for cacheable assets",
      "Identify the customer’s remaining access-control responsibilities",
      "Use individual identities and appropriate audit records",
      "Identify object storage as the relevant service category"
    ],
    "answer": 1,
    "explanations": [
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here.",
      "This directly addresses misunderstanding shared responsibility.",
      "This concerns loss of individual accountability, rather than the problem demonstrated here.",
      "This concerns a mismatch between the storage model and the data task, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-6-1",
    "track": "cloud-practitioner",
    "domain": "services",
    "objective": "Cloud Technology and Services · caselet 6 · decision",
    "prompt": "A team needs to store and retrieve documents as objects rather than operate a relational schema. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate content delivery near users for cacheable assets",
      "Configure budget monitoring and appropriate alerts",
      "Analyze actual cost and usage by relevant dimensions",
      "Identify object storage as the relevant service category"
    ],
    "answer": 3,
    "explanations": [
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here.",
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here.",
      "This concerns lack of evidence about actual cost drivers, rather than the problem demonstrated here.",
      "This directly addresses a mismatch between the storage model and the data task."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-8-3",
    "track": "cloud-practitioner",
    "domain": "cost",
    "objective": "Billing, Pricing, and Support · caselet 8 · interpretation",
    "prompt": "A project has a cost estimate but no notification when actual spend departs from its budget. Which gap is demonstrated by the evidence?",
    "choices": [
      "Paying for idle capacity under an uncertain forecast",
      "Confusing capacity adjustment with failure resilience",
      "Operational effort competing with product work",
      "An estimate mistaken for ongoing spend monitoring"
    ],
    "answer": 3,
    "explanations": [
      "This concerns paying for idle capacity under an uncertain forecast, rather than the problem demonstrated here.",
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here.",
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an estimate mistaken for ongoing spend monitoring."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-1-1",
    "track": "cloud-practitioner",
    "domain": "cloud",
    "objective": "Cloud Concepts · caselet 1 · decision",
    "prompt": "A startup buys servers for a forecast that has not been validated and leaves most of them idle. Which response most directly addresses the stated problem?",
    "choices": [
      "Compare consumption-based capacity with buying for an uncertain forecast",
      "Distinguish elasticity from resilience to a location failure",
      "Evaluate managed services against the team’s operational needs",
      "Identify the customer’s remaining access-control responsibilities"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses paying for idle capacity under an uncertain forecast.",
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here.",
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-4-2",
    "track": "cloud-practitioner",
    "domain": "security",
    "objective": "Security and Compliance · caselet 4 · verification",
    "prompt": "A team believes moving an application to AWS removes its responsibility for customer data access. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Review who grants and reviews application data permissions",
      "Check whether privileged activity can be attributed to a person",
      "Verify object upload, retrieval and access requirements",
      "Compare asset delivery latency from the relevant locations"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses misunderstanding shared responsibility.",
      "This concerns loss of individual accountability, rather than the problem demonstrated here.",
      "This concerns a mismatch between the storage model and the data task, rather than the problem demonstrated here.",
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-6-2",
    "track": "cloud-practitioner",
    "domain": "services",
    "objective": "Cloud Technology and Services · caselet 6 · verification",
    "prompt": "A team needs to store and retrieve documents as objects rather than operate a relational schema. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify recipients receive the intended budget notification",
      "Compare service and time-period contributions to the increase",
      "Verify object upload, retrieval and access requirements",
      "Compare asset delivery latency from the relevant locations"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here.",
      "This concerns lack of evidence about actual cost drivers, rather than the problem demonstrated here.",
      "This directly addresses a mismatch between the storage model and the data task.",
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-9-1",
    "track": "cloud-practitioner",
    "domain": "cost",
    "objective": "Billing, Pricing, and Support · caselet 9 · decision",
    "prompt": "A team sees a larger bill but has not examined which services and periods drove the increase. Which response most directly addresses the stated problem?",
    "choices": [
      "Analyze actual cost and usage by relevant dimensions",
      "Distinguish elasticity from resilience to a location failure",
      "Evaluate managed services against the team’s operational needs",
      "Identify the customer’s remaining access-control responsibilities"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses lack of evidence about actual cost drivers.",
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here.",
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-1-2",
    "track": "cloud-practitioner",
    "domain": "cloud",
    "objective": "Cloud Concepts · caselet 1 · verification",
    "prompt": "A startup buys servers for a forecast that has not been validated and leaves most of them idle. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check whether the service remains available when that location is unavailable",
      "Compare the remaining customer tasks and operating effort",
      "Review who grants and reviews application data permissions",
      "Compare paid capacity with measured demand over time"
    ],
    "answer": 3,
    "explanations": [
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here.",
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here.",
      "This directly addresses paying for idle capacity under an uncertain forecast."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-4-3",
    "track": "cloud-practitioner",
    "domain": "security",
    "objective": "Security and Compliance · caselet 4 · interpretation",
    "prompt": "A team believes moving an application to AWS removes its responsibility for customer data access. Which gap is demonstrated by the evidence?",
    "choices": [
      "Loss of individual accountability",
      "A mismatch between the storage model and the data task",
      "Repeated distant delivery of cacheable content",
      "Misunderstanding shared responsibility"
    ],
    "answer": 3,
    "explanations": [
      "This concerns loss of individual accountability, rather than the problem demonstrated here.",
      "This concerns a mismatch between the storage model and the data task, rather than the problem demonstrated here.",
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates misunderstanding shared responsibility."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-6-3",
    "track": "cloud-practitioner",
    "domain": "services",
    "objective": "Cloud Technology and Services · caselet 6 · interpretation",
    "prompt": "A team needs to store and retrieve documents as objects rather than operate a relational schema. Which gap is demonstrated by the evidence?",
    "choices": [
      "Lack of evidence about actual cost drivers",
      "A mismatch between the storage model and the data task",
      "Repeated distant delivery of cacheable content",
      "An estimate mistaken for ongoing spend monitoring"
    ],
    "answer": 1,
    "explanations": [
      "This concerns lack of evidence about actual cost drivers, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates a mismatch between the storage model and the data task.",
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here.",
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-9-2",
    "track": "cloud-practitioner",
    "domain": "cost",
    "objective": "Billing, Pricing, and Support · caselet 9 · verification",
    "prompt": "A team sees a larger bill but has not examined which services and periods drove the increase. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check whether the service remains available when that location is unavailable",
      "Compare the remaining customer tasks and operating effort",
      "Review who grants and reviews application data permissions",
      "Compare service and time-period contributions to the increase"
    ],
    "answer": 3,
    "explanations": [
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here.",
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here.",
      "This directly addresses lack of evidence about actual cost drivers."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-1-3",
    "track": "cloud-practitioner",
    "domain": "cloud",
    "objective": "Cloud Concepts · caselet 1 · interpretation",
    "prompt": "A startup buys servers for a forecast that has not been validated and leaves most of them idle. Which gap is demonstrated by the evidence?",
    "choices": [
      "Operational effort competing with product work",
      "Misunderstanding shared responsibility",
      "Paying for idle capacity under an uncertain forecast",
      "Confusing capacity adjustment with failure resilience"
    ],
    "answer": 2,
    "explanations": [
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates paying for idle capacity under an uncertain forecast.",
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-5-1",
    "track": "cloud-practitioner",
    "domain": "security",
    "objective": "Security and Compliance · caselet 5 · decision",
    "prompt": "A company cannot tell which person performed a privileged account action because everyone shares one identity. Which response most directly addresses the stated problem?",
    "choices": [
      "Use individual identities and appropriate audit records",
      "Identify object storage as the relevant service category",
      "Evaluate content delivery near users for cacheable assets",
      "Configure budget monitoring and appropriate alerts"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses loss of individual accountability.",
      "This concerns a mismatch between the storage model and the data task, rather than the problem demonstrated here.",
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here.",
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-7-1",
    "track": "cloud-practitioner",
    "domain": "services",
    "objective": "Cloud Technology and Services · caselet 7 · decision",
    "prompt": "Customers far from the origin repeatedly request the same public static assets. Which response most directly addresses the stated problem?",
    "choices": [
      "Analyze actual cost and usage by relevant dimensions",
      "Evaluate the commitment against duration and utilization uncertainty",
      "Evaluate content delivery near users for cacheable assets",
      "Configure budget monitoring and appropriate alerts"
    ],
    "answer": 2,
    "explanations": [
      "This concerns lack of evidence about actual cost drivers, rather than the problem demonstrated here.",
      "This concerns a purchasing obligation mismatched to uncertain demand, rather than the problem demonstrated here.",
      "This directly addresses repeated distant delivery of cacheable content.",
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-9-3",
    "track": "cloud-practitioner",
    "domain": "cost",
    "objective": "Billing, Pricing, and Support · caselet 9 · interpretation",
    "prompt": "A team sees a larger bill but has not examined which services and periods drove the increase. Which gap is demonstrated by the evidence?",
    "choices": [
      "Operational effort competing with product work",
      "Misunderstanding shared responsibility",
      "Lack of evidence about actual cost drivers",
      "Confusing capacity adjustment with failure resilience"
    ],
    "answer": 2,
    "explanations": [
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates lack of evidence about actual cost drivers.",
      "This concerns confusing capacity adjustment with failure resilience, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-2-1",
    "track": "cloud-practitioner",
    "domain": "cloud",
    "objective": "Cloud Concepts · caselet 2 · decision",
    "prompt": "A shop can increase capacity, but its service still depends on one location staying available. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate managed services against the team’s operational needs",
      "Identify the customer’s remaining access-control responsibilities",
      "Use individual identities and appropriate audit records",
      "Distinguish elasticity from resilience to a location failure"
    ],
    "answer": 3,
    "explanations": [
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here.",
      "This concerns loss of individual accountability, rather than the problem demonstrated here.",
      "This directly addresses confusing capacity adjustment with failure resilience."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-5-2",
    "track": "cloud-practitioner",
    "domain": "security",
    "objective": "Security and Compliance · caselet 5 · verification",
    "prompt": "A company cannot tell which person performed a privileged account action because everyone shares one identity. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify object upload, retrieval and access requirements",
      "Compare asset delivery latency from the relevant locations",
      "Verify recipients receive the intended budget notification",
      "Check whether privileged activity can be attributed to a person"
    ],
    "answer": 3,
    "explanations": [
      "This concerns a mismatch between the storage model and the data task, rather than the problem demonstrated here.",
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here.",
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here.",
      "This directly addresses loss of individual accountability."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-7-2",
    "track": "cloud-practitioner",
    "domain": "services",
    "objective": "Cloud Technology and Services · caselet 7 · verification",
    "prompt": "Customers far from the origin repeatedly request the same public static assets. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare the obligation with expected sustained usage",
      "Compare asset delivery latency from the relevant locations",
      "Verify recipients receive the intended budget notification",
      "Compare service and time-period contributions to the increase"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a purchasing obligation mismatched to uncertain demand, rather than the problem demonstrated here.",
      "This directly addresses repeated distant delivery of cacheable content.",
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here.",
      "This concerns lack of evidence about actual cost drivers, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-10-1",
    "track": "cloud-practitioner",
    "domain": "cost",
    "objective": "Billing, Pricing, and Support · caselet 10 · decision",
    "prompt": "A buyer chooses a long usage commitment for work that may be cancelled next month. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate managed services against the team’s operational needs",
      "Identify the customer’s remaining access-control responsibilities",
      "Use individual identities and appropriate audit records",
      "Evaluate the commitment against duration and utilization uncertainty"
    ],
    "answer": 3,
    "explanations": [
      "This concerns operational effort competing with product work, rather than the problem demonstrated here.",
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here.",
      "This concerns loss of individual accountability, rather than the problem demonstrated here.",
      "This directly addresses a purchasing obligation mismatched to uncertain demand."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-2-2",
    "track": "cloud-practitioner",
    "domain": "cloud",
    "objective": "Cloud Concepts · caselet 2 · verification",
    "prompt": "A shop can increase capacity, but its service still depends on one location staying available. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Review who grants and reviews application data permissions",
      "Check whether privileged activity can be attributed to a person",
      "Check whether the service remains available when that location is unavailable",
      "Compare the remaining customer tasks and operating effort"
    ],
    "answer": 2,
    "explanations": [
      "This concerns misunderstanding shared responsibility, rather than the problem demonstrated here.",
      "This concerns loss of individual accountability, rather than the problem demonstrated here.",
      "This directly addresses confusing capacity adjustment with failure resilience.",
      "This concerns operational effort competing with product work, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "cloud-practitioner-case-5-3",
    "track": "cloud-practitioner",
    "domain": "security",
    "objective": "Security and Compliance · caselet 5 · interpretation",
    "prompt": "A company cannot tell which person performed a privileged account action because everyone shares one identity. Which gap is demonstrated by the evidence?",
    "choices": [
      "Repeated distant delivery of cacheable content",
      "An estimate mistaken for ongoing spend monitoring",
      "Loss of individual accountability",
      "A mismatch between the storage model and the data task"
    ],
    "answer": 2,
    "explanations": [
      "This concerns repeated distant delivery of cacheable content, rather than the problem demonstrated here.",
      "This concerns an estimate mistaken for ongoing spend monitoring, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates loss of individual accountability.",
      "This concerns a mismatch between the storage model and the data task, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-1-1",
    "track": "ai-practitioner",
    "domain": "fundamentals",
    "objective": "Fundamentals of AI and ML · caselet 1 · decision",
    "prompt": "A classifier looks accurate because nearly every example belongs to the common class; rare critical cases are missed. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate metrics that expose the important missed cases",
      "Evaluate on appropriately separated representative examples",
      "Consider an unsupervised grouping approach",
      "Evaluate retrieval of authorized current context"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses aggregate accuracy hiding important errors.",
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-8-1",
    "track": "ai-practitioner",
    "domain": "governance",
    "objective": "Security, Compliance, and Governance for AI · caselet 8 · decision",
    "prompt": "A retrieved passage tells an agent to send confidential data to an unrelated destination. Which response most directly addresses the stated problem?",
    "choices": [
      "Consider an unsupervised grouping approach",
      "Treat retrieved instructions as untrusted content and constrain authorization",
      "Evaluate metrics that expose the important missed cases",
      "Evaluate on appropriately separated representative examples"
    ],
    "answer": 1,
    "explanations": [
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This directly addresses retrieved data crossing into an authorization role.",
      "This concerns aggregate accuracy hiding important errors, rather than the problem demonstrated here.",
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-10-1",
    "track": "ai-practitioner",
    "domain": "generative",
    "objective": "Fundamentals of GenAI · caselet 10 · decision",
    "prompt": "A chatbot’s responses are acceptable but unusually costly because every request includes a huge irrelevant history. Which response most directly addresses the stated problem?",
    "choices": [
      "Consider an unsupervised grouping approach",
      "Evaluate retrieval of authorized current context",
      "Specify the required format and evaluate adherence",
      "Evaluate relevant context size against quality and cost"
    ],
    "answer": 3,
    "explanations": [
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here.",
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "This directly addresses unnecessary context increasing generation cost."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-1-2",
    "track": "ai-practitioner",
    "domain": "fundamentals",
    "objective": "Fundamentals of AI and ML · caselet 1 · verification",
    "prompt": "A classifier looks accurate because nearly every example belongs to the common class; rare critical cases are missed. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare performance on data withheld from fitting",
      "Inspect whether the resulting groups serve the business purpose",
      "Check whether answers are supported by the current retrieved passages",
      "Inspect errors for the rare class rather than aggregate accuracy alone"
    ],
    "answer": 3,
    "explanations": [
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here.",
      "This directly addresses aggregate accuracy hiding important errors."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-4-1",
    "track": "ai-practitioner",
    "domain": "foundation",
    "objective": "Applications of Foundation Models · caselet 4 · decision",
    "prompt": "An assistant must answer from frequently revised approved manuals, but receives none of those manuals. Which response most directly addresses the stated problem?",
    "choices": [
      "Make the verification and human-review boundary explicit",
      "Evaluate retrieval of authorized current context",
      "Specify the required format and evaluate adherence",
      "Evaluate representative conditions and disclose observed limitations"
    ],
    "answer": 1,
    "explanations": [
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here.",
      "This directly addresses missing current grounding information.",
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "This concerns unmeasured variation across intended use conditions, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-6-1",
    "track": "ai-practitioner",
    "domain": "responsible",
    "objective": "Guidelines for Responsible AI · caselet 6 · decision",
    "prompt": "A system performs well in one operating environment but has not been checked in another important environment. Which response most directly addresses the stated problem?",
    "choices": [
      "Make the verification and human-review boundary explicit",
      "Treat retrieved instructions as untrusted content and constrain authorization",
      "Establish data provenance and permitted use",
      "Evaluate representative conditions and disclose observed limitations"
    ],
    "answer": 3,
    "explanations": [
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here.",
      "This concerns retrieved data crossing into an authorization role, rather than the problem demonstrated here.",
      "This concerns missing data lineage and usage authorization, rather than the problem demonstrated here.",
      "This directly addresses unmeasured variation across intended use conditions."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-8-2",
    "track": "ai-practitioner",
    "domain": "governance",
    "objective": "Security, Compliance, and Governance for AI · caselet 8 · verification",
    "prompt": "A retrieved passage tells an agent to send confidential data to an unrelated destination. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check that retrieved text cannot expand permitted actions",
      "Inspect errors for the rare class rather than aggregate accuracy alone",
      "Compare performance on data withheld from fitting",
      "Inspect whether the resulting groups serve the business purpose"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses retrieved data crossing into an authorization role.",
      "This concerns aggregate accuracy hiding important errors, rather than the problem demonstrated here.",
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-10-2",
    "track": "ai-practitioner",
    "domain": "generative",
    "objective": "Fundamentals of GenAI · caselet 10 · verification",
    "prompt": "A chatbot’s responses are acceptable but unusually costly because every request includes a huge irrelevant history. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check whether answers are supported by the current retrieved passages",
      "Validate generated output against the required structure",
      "Compare quality and input volume after removing irrelevant context",
      "Inspect whether the resulting groups serve the business purpose"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing current grounding information, rather than the problem demonstrated here.",
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "This directly addresses unnecessary context increasing generation cost.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-1-3",
    "track": "ai-practitioner",
    "domain": "fundamentals",
    "objective": "Fundamentals of AI and ML · caselet 1 · interpretation",
    "prompt": "A classifier looks accurate because nearly every example belongs to the common class; rare critical cases are missed. Which gap is demonstrated by the evidence?",
    "choices": [
      "Choosing a learning approach without considering labels",
      "Missing current grounding information",
      "Aggregate accuracy hiding important errors",
      "Training evidence mistaken for generalization"
    ],
    "answer": 2,
    "explanations": [
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates aggregate accuracy hiding important errors.",
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-4-2",
    "track": "ai-practitioner",
    "domain": "foundation",
    "objective": "Applications of Foundation Models · caselet 4 · verification",
    "prompt": "An assistant must answer from frequently revised approved manuals, but receives none of those manuals. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check whether answers are supported by the current retrieved passages",
      "Validate generated output against the required structure",
      "Compare relevant quality measures across the operating conditions",
      "Check whether users can distinguish generated suggestions from verified results"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses missing current grounding information.",
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "This concerns unmeasured variation across intended use conditions, rather than the problem demonstrated here.",
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-6-2",
    "track": "ai-practitioner",
    "domain": "responsible",
    "objective": "Guidelines for Responsible AI · caselet 6 · verification",
    "prompt": "A system performs well in one operating environment but has not been checked in another important environment. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check that retrieved text cannot expand permitted actions",
      "Trace a sample from origin through approval and transformation",
      "Compare relevant quality measures across the operating conditions",
      "Check whether users can distinguish generated suggestions from verified results"
    ],
    "answer": 2,
    "explanations": [
      "This concerns retrieved data crossing into an authorization role, rather than the problem demonstrated here.",
      "This concerns missing data lineage and usage authorization, rather than the problem demonstrated here.",
      "This directly addresses unmeasured variation across intended use conditions.",
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-8-3",
    "track": "ai-practitioner",
    "domain": "governance",
    "objective": "Security, Compliance, and Governance for AI · caselet 8 · interpretation",
    "prompt": "A retrieved passage tells an agent to send confidential data to an unrelated destination. Which gap is demonstrated by the evidence?",
    "choices": [
      "Aggregate accuracy hiding important errors",
      "Training evidence mistaken for generalization",
      "Choosing a learning approach without considering labels",
      "Retrieved data crossing into an authorization role"
    ],
    "answer": 3,
    "explanations": [
      "This concerns aggregate accuracy hiding important errors, rather than the problem demonstrated here.",
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates retrieved data crossing into an authorization role."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-10-3",
    "track": "ai-practitioner",
    "domain": "generative",
    "objective": "Fundamentals of GenAI · caselet 10 · interpretation",
    "prompt": "A chatbot’s responses are acceptable but unusually costly because every request includes a huge irrelevant history. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing output-format constraints",
      "Unnecessary context increasing generation cost",
      "Choosing a learning approach without considering labels",
      "Missing current grounding information"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates unnecessary context increasing generation cost.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-2-1",
    "track": "ai-practitioner",
    "domain": "fundamentals",
    "objective": "Fundamentals of AI and ML · caselet 2 · decision",
    "prompt": "A team evaluates a model on the same examples used to fit it and calls the result generalization. Which response most directly addresses the stated problem?",
    "choices": [
      "Consider an unsupervised grouping approach",
      "Evaluate retrieval of authorized current context",
      "Specify the required format and evaluate adherence",
      "Evaluate on appropriately separated representative examples"
    ],
    "answer": 3,
    "explanations": [
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here.",
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "This directly addresses training evidence mistaken for generalization."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-4-3",
    "track": "ai-practitioner",
    "domain": "foundation",
    "objective": "Applications of Foundation Models · caselet 4 · interpretation",
    "prompt": "An assistant must answer from frequently revised approved manuals, but receives none of those manuals. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing output-format constraints",
      "Unmeasured variation across intended use conditions",
      "Unsupported trust in generated recommendations",
      "Missing current grounding information"
    ],
    "answer": 3,
    "explanations": [
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "This concerns unmeasured variation across intended use conditions, rather than the problem demonstrated here.",
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates missing current grounding information."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-6-3",
    "track": "ai-practitioner",
    "domain": "responsible",
    "objective": "Guidelines for Responsible AI · caselet 6 · interpretation",
    "prompt": "A system performs well in one operating environment but has not been checked in another important environment. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing data lineage and usage authorization",
      "Unmeasured variation across intended use conditions",
      "Unsupported trust in generated recommendations",
      "Retrieved data crossing into an authorization role"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing data lineage and usage authorization, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates unmeasured variation across intended use conditions.",
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here.",
      "This concerns retrieved data crossing into an authorization role, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-9-1",
    "track": "ai-practitioner",
    "domain": "governance",
    "objective": "Security, Compliance, and Governance for AI · caselet 9 · decision",
    "prompt": "An AI project cannot identify where its training examples originated or whether their use was approved. Which response most directly addresses the stated problem?",
    "choices": [
      "Establish data provenance and permitted use",
      "Evaluate on appropriately separated representative examples",
      "Consider an unsupervised grouping approach",
      "Evaluate retrieval of authorized current context"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses missing data lineage and usage authorization.",
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-2-2",
    "track": "ai-practitioner",
    "domain": "fundamentals",
    "objective": "Fundamentals of AI and ML · caselet 2 · verification",
    "prompt": "A team evaluates a model on the same examples used to fit it and calls the result generalization. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check whether answers are supported by the current retrieved passages",
      "Validate generated output against the required structure",
      "Compare performance on data withheld from fitting",
      "Inspect whether the resulting groups serve the business purpose"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing current grounding information, rather than the problem demonstrated here.",
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "This directly addresses training evidence mistaken for generalization.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-5-1",
    "track": "ai-practitioner",
    "domain": "foundation",
    "objective": "Applications of Foundation Models · caselet 5 · decision",
    "prompt": "A prompt provides task facts but never specifies the output structure required by the receiving system. Which response most directly addresses the stated problem?",
    "choices": [
      "Specify the required format and evaluate adherence",
      "Evaluate representative conditions and disclose observed limitations",
      "Make the verification and human-review boundary explicit",
      "Treat retrieved instructions as untrusted content and constrain authorization"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses missing output-format constraints.",
      "This concerns unmeasured variation across intended use conditions, rather than the problem demonstrated here.",
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here.",
      "This concerns retrieved data crossing into an authorization role, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-7-1",
    "track": "ai-practitioner",
    "domain": "responsible",
    "objective": "Guidelines for Responsible AI · caselet 7 · decision",
    "prompt": "Users treat every generated recommendation as independently verified advice. Which response most directly addresses the stated problem?",
    "choices": [
      "Establish data provenance and permitted use",
      "Evaluate relevant context size against quality and cost",
      "Make the verification and human-review boundary explicit",
      "Treat retrieved instructions as untrusted content and constrain authorization"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing data lineage and usage authorization, rather than the problem demonstrated here.",
      "This concerns unnecessary context increasing generation cost, rather than the problem demonstrated here.",
      "This directly addresses unsupported trust in generated recommendations.",
      "This concerns retrieved data crossing into an authorization role, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-9-2",
    "track": "ai-practitioner",
    "domain": "governance",
    "objective": "Security, Compliance, and Governance for AI · caselet 9 · verification",
    "prompt": "An AI project cannot identify where its training examples originated or whether their use was approved. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare performance on data withheld from fitting",
      "Inspect whether the resulting groups serve the business purpose",
      "Check whether answers are supported by the current retrieved passages",
      "Trace a sample from origin through approval and transformation"
    ],
    "answer": 3,
    "explanations": [
      "This concerns training evidence mistaken for generalization, rather than the problem demonstrated here.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here.",
      "This directly addresses missing data lineage and usage authorization."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-2-3",
    "track": "ai-practitioner",
    "domain": "fundamentals",
    "objective": "Fundamentals of AI and ML · caselet 2 · interpretation",
    "prompt": "A team evaluates a model on the same examples used to fit it and calls the result generalization. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing output-format constraints",
      "Training evidence mistaken for generalization",
      "Choosing a learning approach without considering labels",
      "Missing current grounding information"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing output-format constraints, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates training evidence mistaken for generalization.",
      "This concerns choosing a learning approach without considering labels, rather than the problem demonstrated here.",
      "This concerns missing current grounding information, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-practitioner-case-5-2",
    "track": "ai-practitioner",
    "domain": "foundation",
    "objective": "Applications of Foundation Models · caselet 5 · verification",
    "prompt": "A prompt provides task facts but never specifies the output structure required by the receiving system. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare relevant quality measures across the operating conditions",
      "Check whether users can distinguish generated suggestions from verified results",
      "Check that retrieved text cannot expand permitted actions",
      "Validate generated output against the required structure"
    ],
    "answer": 3,
    "explanations": [
      "This concerns unmeasured variation across intended use conditions, rather than the problem demonstrated here.",
      "This concerns unsupported trust in generated recommendations, rather than the problem demonstrated here.",
      "This concerns retrieved data crossing into an authorization role, rather than the problem demonstrated here.",
      "This directly addresses missing output-format constraints."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-5-1",
    "track": "istqb-foundation",
    "domain": "static",
    "objective": "Static Testing · caselet 5 · decision",
    "prompt": "A requirement says “fast enough” without an agreed measurable meaning. Which response most directly addresses the stated problem?",
    "choices": [
      "Clarify the acceptance condition during a review",
      "Track review findings through resolution",
      "Represent relevant condition combinations and outcomes in a decision table",
      "Model the states, transitions and relevant invalid transitions"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses an ambiguous requirement that cannot guide a clear test.",
      "This concerns unresolved findings despite completing a review meeting, rather than the problem demonstrated here.",
      "This concerns combination rules left implicit, rather than the problem demonstrated here.",
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-9-1",
    "track": "istqb-foundation",
    "domain": "management",
    "objective": "Managing Test Activities · caselet 9 · decision",
    "prompt": "A release report lists test counts but omits the high-impact features that were not tested. Which response most directly addresses the stated problem?",
    "choices": [
      "Report scope, gaps and residual risk alongside execution results",
      "Examine whether the specification addresses stakeholder needs",
      "Review acceptance criteria earlier with relevant stakeholders",
      "Plan confirmation and appropriate regression testing"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses execution counts hiding untested risk.",
      "This concerns conformance without meeting user needs, rather than the problem demonstrated here.",
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-10-1",
    "track": "istqb-foundation",
    "domain": "tools",
    "objective": "Test Tools · caselet 10 · decision",
    "prompt": "A team counts automated scripts as success even though their assertions check only that pages load. Which response most directly addresses the stated problem?",
    "choices": [
      "Review acceptance criteria earlier with relevant stakeholders",
      "Plan confirmation and appropriate regression testing",
      "Clarify the acceptance condition during a review",
      "Evaluate what the automated checks actually detect"
    ],
    "answer": 3,
    "explanations": [
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here.",
      "This directly addresses automation volume mistaken for useful detection."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-1-1",
    "track": "istqb-foundation",
    "domain": "fundamentals",
    "objective": "Fundamentals of Testing · caselet 1 · decision",
    "prompt": "A release passes every automated check, so a manager says the product contains no defects. Which response most directly addresses the stated problem?",
    "choices": [
      "Communicate what was checked and the limits of that evidence",
      "Examine whether the specification addresses stakeholder needs",
      "Review acceptance criteria earlier with relevant stakeholders",
      "Plan confirmation and appropriate regression testing"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses passing tests mistaken for proof of defect absence.",
      "This concerns conformance without meeting user needs, rather than the problem demonstrated here.",
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-3-1",
    "track": "istqb-foundation",
    "domain": "lifecycle",
    "objective": "Testing Through the Lifecycle · caselet 3 · decision",
    "prompt": "A team discovers contradictory acceptance criteria only after implementation is complete. Which response most directly addresses the stated problem?",
    "choices": [
      "Clarify the acceptance condition during a review",
      "Track review findings through resolution",
      "Review acceptance criteria earlier with relevant stakeholders",
      "Plan confirmation and appropriate regression testing"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here.",
      "This concerns unresolved findings despite completing a review meeting, rather than the problem demonstrated here.",
      "This directly addresses late feedback on a requirement inconsistency.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-5-2",
    "track": "istqb-foundation",
    "domain": "static",
    "objective": "Static Testing · caselet 5 · verification",
    "prompt": "A requirement says “fast enough” without an agreed measurable meaning. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect whether findings have agreed outcomes and responsible owners",
      "Check that each relevant rule combination is accounted for",
      "Compare allowed and prohibited sequences with the state model",
      "Check whether stakeholders agree on an assessable criterion"
    ],
    "answer": 3,
    "explanations": [
      "This concerns unresolved findings despite completing a review meeting, rather than the problem demonstrated here.",
      "This concerns combination rules left implicit, rather than the problem demonstrated here.",
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here.",
      "This directly addresses an ambiguous requirement that cannot guide a clear test."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-7-1",
    "track": "istqb-foundation",
    "domain": "design",
    "objective": "Test Analysis and Design · caselet 7 · decision",
    "prompt": "A rule’s result depends on combinations of customer type and payment status. Which response most directly addresses the stated problem?",
    "choices": [
      "Report scope, gaps and residual risk alongside execution results",
      "Evaluate what the automated checks actually detect",
      "Represent relevant condition combinations and outcomes in a decision table",
      "Model the states, transitions and relevant invalid transitions"
    ],
    "answer": 2,
    "explanations": [
      "This concerns execution counts hiding untested risk, rather than the problem demonstrated here.",
      "This concerns automation volume mistaken for useful detection, rather than the problem demonstrated here.",
      "This directly addresses combination rules left implicit.",
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-9-2",
    "track": "istqb-foundation",
    "domain": "management",
    "objective": "Managing Test Activities · caselet 9 · verification",
    "prompt": "A release report lists test counts but omits the high-impact features that were not tested. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Validate representative user tasks against intended outcomes",
      "Check whether contradictions are found before implementation",
      "Verify both the original failure and relevant previously working behavior",
      "Check whether stakeholders can identify untested high-impact behavior"
    ],
    "answer": 3,
    "explanations": [
      "This concerns conformance without meeting user needs, rather than the problem demonstrated here.",
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "This directly addresses execution counts hiding untested risk."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-10-2",
    "track": "istqb-foundation",
    "domain": "tools",
    "objective": "Test Tools · caselet 10 · verification",
    "prompt": "A team counts automated scripts as success even though their assertions check only that pages load. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify both the original failure and relevant previously working behavior",
      "Check whether stakeholders agree on an assessable criterion",
      "Challenge selected checks with relevant known failures",
      "Check whether contradictions are found before implementation"
    ],
    "answer": 2,
    "explanations": [
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here.",
      "This directly addresses automation volume mistaken for useful detection.",
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-1-2",
    "track": "istqb-foundation",
    "domain": "fundamentals",
    "objective": "Fundamentals of Testing · caselet 1 · verification",
    "prompt": "A release passes every automated check, so a manager says the product contains no defects. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Validate representative user tasks against intended outcomes",
      "Check whether contradictions are found before implementation",
      "Verify both the original failure and relevant previously working behavior",
      "Compare checked conditions with important untested conditions"
    ],
    "answer": 3,
    "explanations": [
      "This concerns conformance without meeting user needs, rather than the problem demonstrated here.",
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "This directly addresses passing tests mistaken for proof of defect absence."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-3-2",
    "track": "istqb-foundation",
    "domain": "lifecycle",
    "objective": "Testing Through the Lifecycle · caselet 3 · verification",
    "prompt": "A team discovers contradictory acceptance criteria only after implementation is complete. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect whether findings have agreed outcomes and responsible owners",
      "Check whether contradictions are found before implementation",
      "Verify both the original failure and relevant previously working behavior",
      "Check whether stakeholders agree on an assessable criterion"
    ],
    "answer": 1,
    "explanations": [
      "This concerns unresolved findings despite completing a review meeting, rather than the problem demonstrated here.",
      "This directly addresses late feedback on a requirement inconsistency.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-5-3",
    "track": "istqb-foundation",
    "domain": "static",
    "objective": "Static Testing · caselet 5 · interpretation",
    "prompt": "A requirement says “fast enough” without an agreed measurable meaning. Which gap is demonstrated by the evidence?",
    "choices": [
      "Combination rules left implicit",
      "Sequence-dependent behavior missing from isolated input tests",
      "An ambiguous requirement that cannot guide a clear test",
      "Unresolved findings despite completing a review meeting"
    ],
    "answer": 2,
    "explanations": [
      "This concerns combination rules left implicit, rather than the problem demonstrated here.",
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an ambiguous requirement that cannot guide a clear test.",
      "This concerns unresolved findings despite completing a review meeting, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-7-2",
    "track": "istqb-foundation",
    "domain": "design",
    "objective": "Test Analysis and Design · caselet 7 · verification",
    "prompt": "A rule’s result depends on combinations of customer type and payment status. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Challenge selected checks with relevant known failures",
      "Check that each relevant rule combination is accounted for",
      "Compare allowed and prohibited sequences with the state model",
      "Check whether stakeholders can identify untested high-impact behavior"
    ],
    "answer": 1,
    "explanations": [
      "This concerns automation volume mistaken for useful detection, rather than the problem demonstrated here.",
      "This directly addresses combination rules left implicit.",
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here.",
      "This concerns execution counts hiding untested risk, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-9-3",
    "track": "istqb-foundation",
    "domain": "management",
    "objective": "Managing Test Activities · caselet 9 · interpretation",
    "prompt": "A release report lists test counts but omits the high-impact features that were not tested. Which gap is demonstrated by the evidence?",
    "choices": [
      "Late feedback on a requirement inconsistency",
      "A fix checked without assessing side effects",
      "Execution counts hiding untested risk",
      "Conformance without meeting user needs"
    ],
    "answer": 2,
    "explanations": [
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates execution counts hiding untested risk.",
      "This concerns conformance without meeting user needs, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-10-3",
    "track": "istqb-foundation",
    "domain": "tools",
    "objective": "Test Tools · caselet 10 · interpretation",
    "prompt": "A team counts automated scripts as success even though their assertions check only that pages load. Which gap is demonstrated by the evidence?",
    "choices": [
      "An ambiguous requirement that cannot guide a clear test",
      "Automation volume mistaken for useful detection",
      "Late feedback on a requirement inconsistency",
      "A fix checked without assessing side effects"
    ],
    "answer": 1,
    "explanations": [
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates automation volume mistaken for useful detection.",
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-1-3",
    "track": "istqb-foundation",
    "domain": "fundamentals",
    "objective": "Fundamentals of Testing · caselet 1 · interpretation",
    "prompt": "A release passes every automated check, so a manager says the product contains no defects. Which gap is demonstrated by the evidence?",
    "choices": [
      "Late feedback on a requirement inconsistency",
      "A fix checked without assessing side effects",
      "Passing tests mistaken for proof of defect absence",
      "Conformance without meeting user needs"
    ],
    "answer": 2,
    "explanations": [
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates passing tests mistaken for proof of defect absence.",
      "This concerns conformance without meeting user needs, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-3-3",
    "track": "istqb-foundation",
    "domain": "lifecycle",
    "objective": "Testing Through the Lifecycle · caselet 3 · interpretation",
    "prompt": "A team discovers contradictory acceptance criteria only after implementation is complete. Which gap is demonstrated by the evidence?",
    "choices": [
      "Late feedback on a requirement inconsistency",
      "A fix checked without assessing side effects",
      "An ambiguous requirement that cannot guide a clear test",
      "Unresolved findings despite completing a review meeting"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates late feedback on a requirement inconsistency.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here.",
      "This concerns unresolved findings despite completing a review meeting, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-6-1",
    "track": "istqb-foundation",
    "domain": "static",
    "objective": "Static Testing · caselet 6 · decision",
    "prompt": "A document review produces comments, but none has an owner or disposition. Which response most directly addresses the stated problem?",
    "choices": [
      "Represent relevant condition combinations and outcomes in a decision table",
      "Model the states, transitions and relevant invalid transitions",
      "Report scope, gaps and residual risk alongside execution results",
      "Track review findings through resolution"
    ],
    "answer": 3,
    "explanations": [
      "This concerns combination rules left implicit, rather than the problem demonstrated here.",
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here.",
      "This concerns execution counts hiding untested risk, rather than the problem demonstrated here.",
      "This directly addresses unresolved findings despite completing a review meeting."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-7-3",
    "track": "istqb-foundation",
    "domain": "design",
    "objective": "Test Analysis and Design · caselet 7 · interpretation",
    "prompt": "A rule’s result depends on combinations of customer type and payment status. Which gap is demonstrated by the evidence?",
    "choices": [
      "Combination rules left implicit",
      "Sequence-dependent behavior missing from isolated input tests",
      "Execution counts hiding untested risk",
      "Automation volume mistaken for useful detection"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates combination rules left implicit.",
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here.",
      "This concerns execution counts hiding untested risk, rather than the problem demonstrated here.",
      "This concerns automation volume mistaken for useful detection, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-2-1",
    "track": "istqb-foundation",
    "domain": "fundamentals",
    "objective": "Fundamentals of Testing · caselet 2 · decision",
    "prompt": "A product implements its specification but fails the actual user’s task. Which response most directly addresses the stated problem?",
    "choices": [
      "Review acceptance criteria earlier with relevant stakeholders",
      "Plan confirmation and appropriate regression testing",
      "Clarify the acceptance condition during a review",
      "Examine whether the specification addresses stakeholder needs"
    ],
    "answer": 3,
    "explanations": [
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This concerns a fix checked without assessing side effects, rather than the problem demonstrated here.",
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here.",
      "This directly addresses conformance without meeting user needs."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-4-1",
    "track": "istqb-foundation",
    "domain": "lifecycle",
    "objective": "Testing Through the Lifecycle · caselet 4 · decision",
    "prompt": "A fix removes the reported failure but no one checks affected existing behavior. Which response most directly addresses the stated problem?",
    "choices": [
      "Represent relevant condition combinations and outcomes in a decision table",
      "Plan confirmation and appropriate regression testing",
      "Clarify the acceptance condition during a review",
      "Track review findings through resolution"
    ],
    "answer": 1,
    "explanations": [
      "This concerns combination rules left implicit, rather than the problem demonstrated here.",
      "This directly addresses a fix checked without assessing side effects.",
      "This concerns an ambiguous requirement that cannot guide a clear test, rather than the problem demonstrated here.",
      "This concerns unresolved findings despite completing a review meeting, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-6-2",
    "track": "istqb-foundation",
    "domain": "static",
    "objective": "Static Testing · caselet 6 · verification",
    "prompt": "A document review produces comments, but none has an owner or disposition. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare allowed and prohibited sequences with the state model",
      "Check whether stakeholders can identify untested high-impact behavior",
      "Inspect whether findings have agreed outcomes and responsible owners",
      "Check that each relevant rule combination is accounted for"
    ],
    "answer": 2,
    "explanations": [
      "This concerns sequence-dependent behavior missing from isolated input tests, rather than the problem demonstrated here.",
      "This concerns execution counts hiding untested risk, rather than the problem demonstrated here.",
      "This directly addresses unresolved findings despite completing a review meeting.",
      "This concerns combination rules left implicit, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "istqb-foundation-case-8-1",
    "track": "istqb-foundation",
    "domain": "design",
    "objective": "Test Analysis and Design · caselet 8 · decision",
    "prompt": "A feature permits an action only after a specific sequence of account states. Which response most directly addresses the stated problem?",
    "choices": [
      "Review acceptance criteria earlier with relevant stakeholders",
      "Model the states, transitions and relevant invalid transitions",
      "Communicate what was checked and the limits of that evidence",
      "Examine whether the specification addresses stakeholder needs"
    ],
    "answer": 1,
    "explanations": [
      "This concerns late feedback on a requirement inconsistency, rather than the problem demonstrated here.",
      "This directly addresses sequence-dependent behavior missing from isolated input tests.",
      "This concerns passing tests mistaken for proof of defect absence, rather than the problem demonstrated here.",
      "This concerns conformance without meeting user needs, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3345&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-1-1",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 1 · decision",
    "prompt": "A public web tier and a database share broad inbound network rules even though only the application needs database access. Which response most directly addresses the stated problem?",
    "choices": [
      "Restrict database network access to the required application sources",
      "Review deletion permissions and protection requirements as well as encryption",
      "Scope the delegated actions and resources to the approved integration",
      "Identify and remove the remaining dependency failure point"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses unnecessary database network exposure.",
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-4-1",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 4 · decision",
    "prompt": "Two application instances share one failed dependency, so doubling instances does not restore the service. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate a caching strategy within the allowed freshness window",
      "Identify and remove the remaining dependency failure point",
      "Evaluate versioned or point-in-time recovery against the deletion scenario",
      "Rehearse recovery against the agreed recovery objectives"
    ],
    "answer": 1,
    "explanations": [
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here.",
      "This directly addresses redundancy that leaves a shared failure point.",
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-7-1",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 7 · decision",
    "prompt": "A heavily read catalog has a freshness allowance, but every read still burdens the transactional database. Which response most directly addresses the stated problem?",
    "choices": [
      "Match the storage interface and access pattern to the application",
      "Compare interruption-tolerant purchasing options with recovery overhead",
      "Evaluate a caching strategy within the allowed freshness window",
      "Evaluate the actual write bottleneck before choosing a scaling design"
    ],
    "answer": 2,
    "explanations": [
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here.",
      "This directly addresses read load not separated from permitted freshness trade-offs.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-10-1",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 10 · decision",
    "prompt": "A batch workload can tolerate interruption, but the design pays for uninterrupted capacity without evaluating alternatives. Which response most directly addresses the stated problem?",
    "choices": [
      "Restrict database network access to the required application sources",
      "Review deletion permissions and protection requirements as well as encryption",
      "Scope the delegated actions and resources to the approved integration",
      "Compare interruption-tolerant purchasing options with recovery overhead"
    ],
    "answer": 3,
    "explanations": [
      "This concerns unnecessary database network exposure, rather than the problem demonstrated here.",
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This directly addresses ignoring flexibility in a workload’s interruption tolerance."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-1-2",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 1 · verification",
    "prompt": "A public web tier and a database share broad inbound network rules even though only the application needs database access. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify who can delete recovery copies and under what controls",
      "Compare effective permissions with the actual task",
      "Interrupt the shared dependency and observe the service outcome",
      "Attempt required application access and unrelated access separately"
    ],
    "answer": 3,
    "explanations": [
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This directly addresses unnecessary database network exposure."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-4-2",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 4 · verification",
    "prompt": "Two application instances share one failed dependency, so doubling instances does not restore the service. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Interrupt the shared dependency and observe the service outcome",
      "Restore an earlier valid state after a controlled deletion",
      "Measure restore time and recoverable data in a rehearsal",
      "Measure read latency, origin load and observed staleness"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses redundancy that leaves a shared failure point.",
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here.",
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-7-2",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 7 · verification",
    "prompt": "A heavily read catalog has a freshness allowance, but every read still burdens the transactional database. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Test interruption recovery and compare total modeled cost",
      "Measure read latency, origin load and observed staleness",
      "Compare read and write demand with the constrained resource",
      "Verify the required shared file operations and consistency behavior"
    ],
    "answer": 1,
    "explanations": [
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here.",
      "This directly addresses read load not separated from permitted freshness trade-offs.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here.",
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-10-2",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 10 · verification",
    "prompt": "A batch workload can tolerate interruption, but the design pays for uninterrupted capacity without evaluating alternatives. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify who can delete recovery copies and under what controls",
      "Compare effective permissions with the actual task",
      "Test interruption recovery and compare total modeled cost",
      "Attempt required application access and unrelated access separately"
    ],
    "answer": 2,
    "explanations": [
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This directly addresses ignoring flexibility in a workload’s interruption tolerance.",
      "This concerns unnecessary database network exposure, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-1-3",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 1 · interpretation",
    "prompt": "A public web tier and a database share broad inbound network rules even though only the application needs database access. Which gap is demonstrated by the evidence?",
    "choices": [
      "Overbroad cross-account authorization",
      "Redundancy that leaves a shared failure point",
      "Unnecessary database network exposure",
      "Encryption mistaken for protection against authorized deletion"
    ],
    "answer": 2,
    "explanations": [
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates unnecessary database network exposure.",
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-4-3",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 4 · interpretation",
    "prompt": "Two application instances share one failed dependency, so doubling instances does not restore the service. Which gap is demonstrated by the evidence?",
    "choices": [
      "Replication mistaken for historical recovery",
      "An untested recovery-time assumption",
      "Read load not separated from permitted freshness trade-offs",
      "Redundancy that leaves a shared failure point"
    ],
    "answer": 3,
    "explanations": [
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here.",
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates redundancy that leaves a shared failure point."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-7-3",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 7 · interpretation",
    "prompt": "A heavily read catalog has a freshness allowance, but every read still burdens the transactional database. Which gap is demonstrated by the evidence?",
    "choices": [
      "Read load not separated from permitted freshness trade-offs",
      "A read-scaling measure aimed at a write bottleneck",
      "Ignoring the application’s storage interface requirement",
      "Ignoring flexibility in a workload’s interruption tolerance"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates read load not separated from permitted freshness trade-offs.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here.",
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-10-3",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 10 · interpretation",
    "prompt": "A batch workload can tolerate interruption, but the design pays for uninterrupted capacity without evaluating alternatives. Which gap is demonstrated by the evidence?",
    "choices": [
      "Overbroad cross-account authorization",
      "Ignoring flexibility in a workload’s interruption tolerance",
      "Unnecessary database network exposure",
      "Encryption mistaken for protection against authorized deletion"
    ],
    "answer": 1,
    "explanations": [
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates ignoring flexibility in a workload’s interruption tolerance.",
      "This concerns unnecessary database network exposure, rather than the problem demonstrated here.",
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-2-1",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 2 · decision",
    "prompt": "A backup is encrypted, but every routine operator can delete all copies immediately. Which response most directly addresses the stated problem?",
    "choices": [
      "Scope the delegated actions and resources to the approved integration",
      "Identify and remove the remaining dependency failure point",
      "Evaluate versioned or point-in-time recovery against the deletion scenario",
      "Review deletion permissions and protection requirements as well as encryption"
    ],
    "answer": 3,
    "explanations": [
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This directly addresses encryption mistaken for protection against authorized deletion."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-5-1",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 5 · decision",
    "prompt": "Replicated data immediately reproduces an accidental deletion, leaving no older recovery state. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate versioned or point-in-time recovery against the deletion scenario",
      "Rehearse recovery against the agreed recovery objectives",
      "Evaluate a caching strategy within the allowed freshness window",
      "Evaluate the actual write bottleneck before choosing a scaling design"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses replication mistaken for historical recovery.",
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here.",
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-8-1",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 8 · decision",
    "prompt": "A proposed read replica is intended to solve a workload dominated by writes. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate storage cost together with retrieval requirements",
      "Evaluate the actual write bottleneck before choosing a scaling design",
      "Match the storage interface and access pattern to the application",
      "Compare interruption-tolerant purchasing options with recovery overhead"
    ],
    "answer": 1,
    "explanations": [
      "This concerns storage savings that violate access latency, rather than the problem demonstrated here.",
      "This directly addresses a read-scaling measure aimed at a write bottleneck.",
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-11-1",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 11 · decision",
    "prompt": "Old data is moved to cheaper storage without considering the required retrieval time. Which response most directly addresses the stated problem?",
    "choices": [
      "Scope the delegated actions and resources to the approved integration",
      "Identify and remove the remaining dependency failure point",
      "Evaluate storage cost together with retrieval requirements",
      "Review deletion permissions and protection requirements as well as encryption"
    ],
    "answer": 2,
    "explanations": [
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This directly addresses storage savings that violate access latency.",
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-2-2",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 2 · verification",
    "prompt": "A backup is encrypted, but every routine operator can delete all copies immediately. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Interrupt the shared dependency and observe the service outcome",
      "Restore an earlier valid state after a controlled deletion",
      "Verify who can delete recovery copies and under what controls",
      "Compare effective permissions with the actual task"
    ],
    "answer": 2,
    "explanations": [
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This directly addresses encryption mistaken for protection against authorized deletion.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-5-2",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 5 · verification",
    "prompt": "Replicated data immediately reproduces an accidental deletion, leaving no older recovery state. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Measure restore time and recoverable data in a rehearsal",
      "Measure read latency, origin load and observed staleness",
      "Compare read and write demand with the constrained resource",
      "Restore an earlier valid state after a controlled deletion"
    ],
    "answer": 3,
    "explanations": [
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here.",
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here.",
      "This directly addresses replication mistaken for historical recovery."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-8-2",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 8 · verification",
    "prompt": "A proposed read replica is intended to solve a workload dominated by writes. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare read and write demand with the constrained resource",
      "Verify the required shared file operations and consistency behavior",
      "Test interruption recovery and compare total modeled cost",
      "Measure or confirm retrieval behavior against the agreed access time"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses a read-scaling measure aimed at a write bottleneck.",
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here.",
      "This concerns storage savings that violate access latency, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-11-2",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 11 · verification",
    "prompt": "Old data is moved to cheaper storage without considering the required retrieval time. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Interrupt the shared dependency and observe the service outcome",
      "Measure or confirm retrieval behavior against the agreed access time",
      "Verify who can delete recovery copies and under what controls",
      "Compare effective permissions with the actual task"
    ],
    "answer": 1,
    "explanations": [
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This directly addresses storage savings that violate access latency.",
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-2-3",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 2 · interpretation",
    "prompt": "A backup is encrypted, but every routine operator can delete all copies immediately. Which gap is demonstrated by the evidence?",
    "choices": [
      "Replication mistaken for historical recovery",
      "Encryption mistaken for protection against authorized deletion",
      "Overbroad cross-account authorization",
      "Redundancy that leaves a shared failure point"
    ],
    "answer": 1,
    "explanations": [
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates encryption mistaken for protection against authorized deletion.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-5-3",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 5 · interpretation",
    "prompt": "Replicated data immediately reproduces an accidental deletion, leaving no older recovery state. Which gap is demonstrated by the evidence?",
    "choices": [
      "Read load not separated from permitted freshness trade-offs",
      "A read-scaling measure aimed at a write bottleneck",
      "Replication mistaken for historical recovery",
      "An untested recovery-time assumption"
    ],
    "answer": 2,
    "explanations": [
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates replication mistaken for historical recovery.",
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-8-3",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 8 · interpretation",
    "prompt": "A proposed read replica is intended to solve a workload dominated by writes. Which gap is demonstrated by the evidence?",
    "choices": [
      "Ignoring the application’s storage interface requirement",
      "Ignoring flexibility in a workload’s interruption tolerance",
      "Storage savings that violate access latency",
      "A read-scaling measure aimed at a write bottleneck"
    ],
    "answer": 3,
    "explanations": [
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here.",
      "This concerns storage savings that violate access latency, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates a read-scaling measure aimed at a write bottleneck."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-11-3",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 11 · interpretation",
    "prompt": "Old data is moved to cheaper storage without considering the required retrieval time. Which gap is demonstrated by the evidence?",
    "choices": [
      "Storage savings that violate access latency",
      "Encryption mistaken for protection against authorized deletion",
      "Overbroad cross-account authorization",
      "Redundancy that leaves a shared failure point"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates storage savings that violate access latency.",
      "This concerns encryption mistaken for protection against authorized deletion, rather than the problem demonstrated here.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-3-1",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 3 · decision",
    "prompt": "A cross-account integration grants a role more resource actions than its approved task requires. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate versioned or point-in-time recovery against the deletion scenario",
      "Rehearse recovery against the agreed recovery objectives",
      "Scope the delegated actions and resources to the approved integration",
      "Identify and remove the remaining dependency failure point"
    ],
    "answer": 2,
    "explanations": [
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here.",
      "This directly addresses overbroad cross-account authorization.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-6-1",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 6 · decision",
    "prompt": "A disaster recovery plan exists on paper but its restore duration has never been measured. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate a caching strategy within the allowed freshness window",
      "Evaluate the actual write bottleneck before choosing a scaling design",
      "Match the storage interface and access pattern to the application",
      "Rehearse recovery against the agreed recovery objectives"
    ],
    "answer": 3,
    "explanations": [
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here.",
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "This directly addresses an untested recovery-time assumption."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-9-1",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 9 · decision",
    "prompt": "A workload’s shared files require a file-system interface, but the proposal assumes every storage API is interchangeable. Which response most directly addresses the stated problem?",
    "choices": [
      "Match the storage interface and access pattern to the application",
      "Compare interruption-tolerant purchasing options with recovery overhead",
      "Evaluate storage cost together with retrieval requirements",
      "Include relevant data-transfer patterns in the cost model"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses ignoring the application’s storage interface requirement.",
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here.",
      "This concerns storage savings that violate access latency, rather than the problem demonstrated here.",
      "This concerns a cost model missing data-transfer effects, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-12-1",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 12 · decision",
    "prompt": "A multi-tier design transfers large amounts of data without including transfer charges in its estimate. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate versioned or point-in-time recovery against the deletion scenario",
      "Include relevant data-transfer patterns in the cost model",
      "Scope the delegated actions and resources to the approved integration",
      "Identify and remove the remaining dependency failure point"
    ],
    "answer": 1,
    "explanations": [
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This directly addresses a cost model missing data-transfer effects.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-3-2",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 3 · verification",
    "prompt": "A cross-account integration grants a role more resource actions than its approved task requires. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Measure restore time and recoverable data in a rehearsal",
      "Compare effective permissions with the actual task",
      "Interrupt the shared dependency and observe the service outcome",
      "Restore an earlier valid state after a controlled deletion"
    ],
    "answer": 1,
    "explanations": [
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here.",
      "This directly addresses overbroad cross-account authorization.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-6-2",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 6 · verification",
    "prompt": "A disaster recovery plan exists on paper but its restore duration has never been measured. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare read and write demand with the constrained resource",
      "Verify the required shared file operations and consistency behavior",
      "Measure restore time and recoverable data in a rehearsal",
      "Measure read latency, origin load and observed staleness"
    ],
    "answer": 2,
    "explanations": [
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here.",
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "This directly addresses an untested recovery-time assumption.",
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-9-2",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · caselet 9 · verification",
    "prompt": "A workload’s shared files require a file-system interface, but the proposal assumes every storage API is interchangeable. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Test interruption recovery and compare total modeled cost",
      "Measure or confirm retrieval behavior against the agreed access time",
      "Compare expected transfer paths and volumes with the estimate",
      "Verify the required shared file operations and consistency behavior"
    ],
    "answer": 3,
    "explanations": [
      "This concerns ignoring flexibility in a workload’s interruption tolerance, rather than the problem demonstrated here.",
      "This concerns storage savings that violate access latency, rather than the problem demonstrated here.",
      "This concerns a cost model missing data-transfer effects, rather than the problem demonstrated here.",
      "This directly addresses ignoring the application’s storage interface requirement."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-12-2",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · caselet 12 · verification",
    "prompt": "A multi-tier design transfers large amounts of data without including transfer charges in its estimate. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare expected transfer paths and volumes with the estimate",
      "Compare effective permissions with the actual task",
      "Interrupt the shared dependency and observe the service outcome",
      "Restore an earlier valid state after a controlled deletion"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses a cost model missing data-transfer effects.",
      "This concerns overbroad cross-account authorization, rather than the problem demonstrated here.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-3-3",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · caselet 3 · interpretation",
    "prompt": "A cross-account integration grants a role more resource actions than its approved task requires. Which gap is demonstrated by the evidence?",
    "choices": [
      "Overbroad cross-account authorization",
      "Redundancy that leaves a shared failure point",
      "Replication mistaken for historical recovery",
      "An untested recovery-time assumption"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates overbroad cross-account authorization.",
      "This concerns redundancy that leaves a shared failure point, rather than the problem demonstrated here.",
      "This concerns replication mistaken for historical recovery, rather than the problem demonstrated here.",
      "This concerns an untested recovery-time assumption, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "solutions-architect-case-6-3",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · caselet 6 · interpretation",
    "prompt": "A disaster recovery plan exists on paper but its restore duration has never been measured. Which gap is demonstrated by the evidence?",
    "choices": [
      "Ignoring the application’s storage interface requirement",
      "An untested recovery-time assumption",
      "Read load not separated from permitted freshness trade-offs",
      "A read-scaling measure aimed at a write bottleneck"
    ],
    "answer": 1,
    "explanations": [
      "This concerns ignoring the application’s storage interface requirement, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an untested recovery-time assumption.",
      "This concerns read load not separated from permitted freshness trade-offs, rather than the problem demonstrated here.",
      "This concerns a read-scaling measure aimed at a write bottleneck, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-7-1",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 7 · decision",
    "prompt": "A deploy job reports success, but the running application exposes a broken endpoint. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate application and data migration compatibility together",
      "Use bounded retries with an appropriate backoff strategy",
      "Validate post-deployment behavior before expanding the release",
      "Treat configuration as part of the versioned tested release"
    ],
    "answer": 2,
    "explanations": [
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "This concerns retry amplification during throttling, rather than the problem demonstrated here.",
      "This directly addresses deployment execution mistaken for application health.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-1-1",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 1 · decision",
    "prompt": "A queue worker acknowledges a message before persisting the order, then crashes. Which response most directly addresses the stated problem?",
    "choices": [
      "Persist the required business outcome before acknowledging completion",
      "Keep operation identity stable across retries of the same intent",
      "Validate the event contract and handle supported versions explicitly",
      "Move secrets to an approved secure mechanism and address exposure"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses acknowledgement before durable business completion.",
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-4-1",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 4 · decision",
    "prompt": "A service configuration includes a database password in a committed source file. Which response most directly addresses the stated problem?",
    "choices": [
      "Validate post-deployment behavior before expanding the release",
      "Move secrets to an approved secure mechanism and address exposure",
      "Identify and grant only the permissions needed by its operations",
      "Return a safe error while retaining sanitized diagnostic context"
    ],
    "answer": 1,
    "explanations": [
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here.",
      "This directly addresses a credential embedded in source control.",
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-7-2",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 7 · verification",
    "prompt": "A deploy job reports success, but the running application exposes a broken endpoint. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Observe request rate and recovery under controlled throttling",
      "Exercise the deployed endpoint against explicit health criteria",
      "Reproduce behavior using the exact code-and-configuration combination",
      "Rehearse the claimed recovery path with the changed schema"
    ],
    "answer": 1,
    "explanations": [
      "This concerns retry amplification during throttling, rather than the problem demonstrated here.",
      "This directly addresses deployment execution mistaken for application health.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here.",
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-10-1",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 10 · decision",
    "prompt": "A service retries throttled requests immediately without a delay or retry bound. Which response most directly addresses the stated problem?",
    "choices": [
      "Persist the required business outcome before acknowledging completion",
      "Keep operation identity stable across retries of the same intent",
      "Validate the event contract and handle supported versions explicitly",
      "Use bounded retries with an appropriate backoff strategy"
    ],
    "answer": 3,
    "explanations": [
      "This concerns acknowledgement before durable business completion, rather than the problem demonstrated here.",
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This directly addresses retry amplification during throttling."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-1-2",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 1 · verification",
    "prompt": "A queue worker acknowledges a message before persisting the order, then crashes. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Replay one intent and verify only one modeled side effect",
      "Exercise supported event versions including missing optional fields",
      "Inspect source history and verify the application uses approved secret retrieval",
      "Crash the worker at each boundary and check recovery of accepted work"
    ],
    "answer": 3,
    "explanations": [
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This directly addresses acknowledgement before durable business completion."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-4-2",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 4 · verification",
    "prompt": "A service configuration includes a database password in a committed source file. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect source history and verify the application uses approved secret retrieval",
      "Exercise required and prohibited operations under the scoped role",
      "Inspect client-visible errors and their corresponding sanitized logs",
      "Exercise the deployed endpoint against explicit health criteria"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses a credential embedded in source control.",
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here.",
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-7-3",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 7 · interpretation",
    "prompt": "A deploy job reports success, but the running application exposes a broken endpoint. Which gap is demonstrated by the evidence?",
    "choices": [
      "Deployment execution mistaken for application health",
      "Untested configuration changes bypassing release evidence",
      "Code-only rollback assumed to reverse data changes",
      "Retry amplification during throttling"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates deployment execution mistaken for application health.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here.",
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "This concerns retry amplification during throttling, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-10-2",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 10 · verification",
    "prompt": "A service retries throttled requests immediately without a delay or retry bound. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Replay one intent and verify only one modeled side effect",
      "Exercise supported event versions including missing optional fields",
      "Observe request rate and recovery under controlled throttling",
      "Crash the worker at each boundary and check recovery of accepted work"
    ],
    "answer": 2,
    "explanations": [
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This directly addresses retry amplification during throttling.",
      "This concerns acknowledgement before durable business completion, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-1-3",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 1 · interpretation",
    "prompt": "A queue worker acknowledges a message before persisting the order, then crashes. Which gap is demonstrated by the evidence?",
    "choices": [
      "An unchecked event-schema assumption",
      "A credential embedded in source control",
      "Acknowledgement before durable business completion",
      "Retries represented as distinct business operations"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates acknowledgement before durable business completion.",
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-4-3",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 4 · interpretation",
    "prompt": "A service configuration includes a database password in a committed source file. Which gap is demonstrated by the evidence?",
    "choices": [
      "Overprivileged workload execution",
      "Sensitive diagnostic data disclosed to clients",
      "Deployment execution mistaken for application health",
      "A credential embedded in source control"
    ],
    "answer": 3,
    "explanations": [
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here.",
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates a credential embedded in source control."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-8-1",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 8 · decision",
    "prompt": "A configuration is changed in production without running the tests used for code changes. Which response most directly addresses the stated problem?",
    "choices": [
      "Propagate a safe correlation context across service boundaries",
      "Treat configuration as part of the versioned tested release",
      "Evaluate application and data migration compatibility together",
      "Use bounded retries with an appropriate backoff strategy"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing end-to-end request correlation, rather than the problem demonstrated here.",
      "This directly addresses untested configuration changes bypassing release evidence.",
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "This concerns retry amplification during throttling, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-10-3",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 10 · interpretation",
    "prompt": "A service retries throttled requests immediately without a delay or retry bound. Which gap is demonstrated by the evidence?",
    "choices": [
      "An unchecked event-schema assumption",
      "Retry amplification during throttling",
      "Acknowledgement before durable business completion",
      "Retries represented as distinct business operations"
    ],
    "answer": 1,
    "explanations": [
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates retry amplification during throttling.",
      "This concerns acknowledgement before durable business completion, rather than the problem demonstrated here.",
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-2-1",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 2 · decision",
    "prompt": "Two retries of the same request use different identifiers and create duplicate side effects. Which response most directly addresses the stated problem?",
    "choices": [
      "Validate the event contract and handle supported versions explicitly",
      "Move secrets to an approved secure mechanism and address exposure",
      "Identify and grant only the permissions needed by its operations",
      "Keep operation identity stable across retries of the same intent"
    ],
    "answer": 3,
    "explanations": [
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This directly addresses retries represented as distinct business operations."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-5-1",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 5 · decision",
    "prompt": "A workload runs correctly only when granted account-wide administrative permissions. Which response most directly addresses the stated problem?",
    "choices": [
      "Identify and grant only the permissions needed by its operations",
      "Return a safe error while retaining sanitized diagnostic context",
      "Validate post-deployment behavior before expanding the release",
      "Treat configuration as part of the versioned tested release"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses overprivileged workload execution.",
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here.",
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-8-2",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 8 · verification",
    "prompt": "A configuration is changed in production without running the tests used for code changes. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Reproduce behavior using the exact code-and-configuration combination",
      "Rehearse the claimed recovery path with the changed schema",
      "Observe request rate and recovery under controlled throttling",
      "Trace one request through the relevant components"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses untested configuration changes bypassing release evidence.",
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "This concerns retry amplification during throttling, rather than the problem demonstrated here.",
      "This concerns missing end-to-end request correlation, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-11-1",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 11 · decision",
    "prompt": "An application logs an error but cannot relate it to the corresponding downstream request. Which response most directly addresses the stated problem?",
    "choices": [
      "Validate the event contract and handle supported versions explicitly",
      "Move secrets to an approved secure mechanism and address exposure",
      "Propagate a safe correlation context across service boundaries",
      "Keep operation identity stable across retries of the same intent"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This directly addresses missing end-to-end request correlation.",
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-2-2",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 2 · verification",
    "prompt": "Two retries of the same request use different identifiers and create duplicate side effects. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect source history and verify the application uses approved secret retrieval",
      "Exercise required and prohibited operations under the scoped role",
      "Replay one intent and verify only one modeled side effect",
      "Exercise supported event versions including missing optional fields"
    ],
    "answer": 2,
    "explanations": [
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This directly addresses retries represented as distinct business operations.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-5-2",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 5 · verification",
    "prompt": "A workload runs correctly only when granted account-wide administrative permissions. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect client-visible errors and their corresponding sanitized logs",
      "Exercise the deployed endpoint against explicit health criteria",
      "Reproduce behavior using the exact code-and-configuration combination",
      "Exercise required and prohibited operations under the scoped role"
    ],
    "answer": 3,
    "explanations": [
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here.",
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here.",
      "This directly addresses overprivileged workload execution."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-8-3",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 8 · interpretation",
    "prompt": "A configuration is changed in production without running the tests used for code changes. Which gap is demonstrated by the evidence?",
    "choices": [
      "Code-only rollback assumed to reverse data changes",
      "Retry amplification during throttling",
      "Missing end-to-end request correlation",
      "Untested configuration changes bypassing release evidence"
    ],
    "answer": 3,
    "explanations": [
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "This concerns retry amplification during throttling, rather than the problem demonstrated here.",
      "This concerns missing end-to-end request correlation, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates untested configuration changes bypassing release evidence."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-11-2",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 11 · verification",
    "prompt": "An application logs an error but cannot relate it to the corresponding downstream request. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect source history and verify the application uses approved secret retrieval",
      "Trace one request through the relevant components",
      "Replay one intent and verify only one modeled side effect",
      "Exercise supported event versions including missing optional fields"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This directly addresses missing end-to-end request correlation.",
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-2-3",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 2 · interpretation",
    "prompt": "Two retries of the same request use different identifiers and create duplicate side effects. Which gap is demonstrated by the evidence?",
    "choices": [
      "Overprivileged workload execution",
      "Retries represented as distinct business operations",
      "An unchecked event-schema assumption",
      "A credential embedded in source control"
    ],
    "answer": 1,
    "explanations": [
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates retries represented as distinct business operations.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-5-3",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 5 · interpretation",
    "prompt": "A workload runs correctly only when granted account-wide administrative permissions. Which gap is demonstrated by the evidence?",
    "choices": [
      "Deployment execution mistaken for application health",
      "Untested configuration changes bypassing release evidence",
      "Overprivileged workload execution",
      "Sensitive diagnostic data disclosed to clients"
    ],
    "answer": 2,
    "explanations": [
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates overprivileged workload execution.",
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-9-1",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 9 · decision",
    "prompt": "An automated rollback restores code but leaves an incompatible schema change in place. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate application and data migration compatibility together",
      "Use bounded retries with an appropriate backoff strategy",
      "Propagate a safe correlation context across service boundaries",
      "Measure where request time is spent before changing capacity"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses code-only rollback assumed to reverse data changes.",
      "This concerns retry amplification during throttling, rather than the problem demonstrated here.",
      "This concerns missing end-to-end request correlation, rather than the problem demonstrated here.",
      "This concerns optimization chosen without locating the bottleneck, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-11-3",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 11 · interpretation",
    "prompt": "An application logs an error but cannot relate it to the corresponding downstream request. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing end-to-end request correlation",
      "Retries represented as distinct business operations",
      "An unchecked event-schema assumption",
      "A credential embedded in source control"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates missing end-to-end request correlation.",
      "This concerns retries represented as distinct business operations, rather than the problem demonstrated here.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-3-1",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 3 · decision",
    "prompt": "A function assumes every event contains a field that older event versions do not provide. Which response most directly addresses the stated problem?",
    "choices": [
      "Identify and grant only the permissions needed by its operations",
      "Return a safe error while retaining sanitized diagnostic context",
      "Validate the event contract and handle supported versions explicitly",
      "Move secrets to an approved secure mechanism and address exposure"
    ],
    "answer": 2,
    "explanations": [
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here.",
      "This directly addresses an unchecked event-schema assumption.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-6-1",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 6 · decision",
    "prompt": "A client receives confidential stack details and tokens in an error response. Which response most directly addresses the stated problem?",
    "choices": [
      "Validate post-deployment behavior before expanding the release",
      "Treat configuration as part of the versioned tested release",
      "Evaluate application and data migration compatibility together",
      "Return a safe error while retaining sanitized diagnostic context"
    ],
    "answer": 3,
    "explanations": [
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here.",
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "This directly addresses sensitive diagnostic data disclosed to clients."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-9-2",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 9 · verification",
    "prompt": "An automated rollback restores code but leaves an incompatible schema change in place. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Observe request rate and recovery under controlled throttling",
      "Trace one request through the relevant components",
      "Compare component timing evidence for slow and normal requests",
      "Rehearse the claimed recovery path with the changed schema"
    ],
    "answer": 3,
    "explanations": [
      "This concerns retry amplification during throttling, rather than the problem demonstrated here.",
      "This concerns missing end-to-end request correlation, rather than the problem demonstrated here.",
      "This concerns optimization chosen without locating the bottleneck, rather than the problem demonstrated here.",
      "This directly addresses code-only rollback assumed to reverse data changes."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-12-1",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 12 · decision",
    "prompt": "A slowdown is blamed on compute size before any latency breakdown is collected. Which response most directly addresses the stated problem?",
    "choices": [
      "Identify and grant only the permissions needed by its operations",
      "Measure where request time is spent before changing capacity",
      "Validate the event contract and handle supported versions explicitly",
      "Move secrets to an approved secure mechanism and address exposure"
    ],
    "answer": 1,
    "explanations": [
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This directly addresses optimization chosen without locating the bottleneck.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-3-2",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 3 · verification",
    "prompt": "A function assumes every event contains a field that older event versions do not provide. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect client-visible errors and their corresponding sanitized logs",
      "Exercise supported event versions including missing optional fields",
      "Inspect source history and verify the application uses approved secret retrieval",
      "Exercise required and prohibited operations under the scoped role"
    ],
    "answer": 1,
    "explanations": [
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here.",
      "This directly addresses an unchecked event-schema assumption.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This concerns overprivileged workload execution, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-6-2",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 6 · verification",
    "prompt": "A client receives confidential stack details and tokens in an error response. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Reproduce behavior using the exact code-and-configuration combination",
      "Rehearse the claimed recovery path with the changed schema",
      "Inspect client-visible errors and their corresponding sanitized logs",
      "Exercise the deployed endpoint against explicit health criteria"
    ],
    "answer": 2,
    "explanations": [
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here.",
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "This directly addresses sensitive diagnostic data disclosed to clients.",
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-9-3",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · caselet 9 · interpretation",
    "prompt": "An automated rollback restores code but leaves an incompatible schema change in place. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing end-to-end request correlation",
      "Optimization chosen without locating the bottleneck",
      "Code-only rollback assumed to reverse data changes",
      "Retry amplification during throttling"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing end-to-end request correlation, rather than the problem demonstrated here.",
      "This concerns optimization chosen without locating the bottleneck, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates code-only rollback assumed to reverse data changes.",
      "This concerns retry amplification during throttling, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-12-2",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · caselet 12 · verification",
    "prompt": "A slowdown is blamed on compute size before any latency breakdown is collected. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare component timing evidence for slow and normal requests",
      "Exercise supported event versions including missing optional fields",
      "Inspect source history and verify the application uses approved secret retrieval",
      "Exercise required and prohibited operations under the scoped role"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses optimization chosen without locating the bottleneck.",
      "This concerns an unchecked event-schema assumption, rather than the problem demonstrated here.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This concerns overprivileged workload execution, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-3-3",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · caselet 3 · interpretation",
    "prompt": "A function assumes every event contains a field that older event versions do not provide. Which gap is demonstrated by the evidence?",
    "choices": [
      "An unchecked event-schema assumption",
      "A credential embedded in source control",
      "Overprivileged workload execution",
      "Sensitive diagnostic data disclosed to clients"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates an unchecked event-schema assumption.",
      "This concerns a credential embedded in source control, rather than the problem demonstrated here.",
      "This concerns overprivileged workload execution, rather than the problem demonstrated here.",
      "This concerns sensitive diagnostic data disclosed to clients, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "developer-associate-case-6-3",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · caselet 6 · interpretation",
    "prompt": "A client receives confidential stack details and tokens in an error response. Which gap is demonstrated by the evidence?",
    "choices": [
      "Code-only rollback assumed to reverse data changes",
      "Sensitive diagnostic data disclosed to clients",
      "Deployment execution mistaken for application health",
      "Untested configuration changes bypassing release evidence"
    ],
    "answer": 1,
    "explanations": [
      "This concerns code-only rollback assumed to reverse data changes, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates sensitive diagnostic data disclosed to clients.",
      "This concerns deployment execution mistaken for application health, rather than the problem demonstrated here.",
      "This concerns untested configuration changes bypassing release evidence, rather than the problem demonstrated here."
    ],
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-1-1",
    "track": "test-automation",
    "domain": "d1",
    "objective": "Objectives for automation · caselet 1 · decision",
    "prompt": "A team automates a rapidly discarded prototype without comparing setup and maintenance effort to expected repeat use. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate automation value against repetition and lifecycle cost",
      "Evaluate technical fit on representative system components",
      "Separate configuration and interaction concerns from test intent",
      "Verify shared automation components as software with their own failure cases"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses automation investment disconnected from expected reuse.",
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-2-1",
    "track": "test-automation",
    "domain": "d2",
    "objective": "Preparing for automation · caselet 2 · decision",
    "prompt": "A candidate tool cannot interact with a required platform component despite a successful unrelated demo. Which response most directly addresses the stated problem?",
    "choices": [
      "Separate configuration and interaction concerns from test intent",
      "Verify shared automation components as software with their own failure cases",
      "Isolate or coordinate shared test data deliberately",
      "Evaluate technical fit on representative system components"
    ],
    "answer": 3,
    "explanations": [
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "This directly addresses tool selection based on an unrepresentative demonstration."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-3-1",
    "track": "test-automation",
    "domain": "d3",
    "objective": "Automation architecture · caselet 3 · decision",
    "prompt": "Every test embeds environment addresses and low-level interaction details throughout its business logic. Which response most directly addresses the stated problem?",
    "choices": [
      "Isolate or coordinate shared test data deliberately",
      "Wait for an observable readiness condition with a bound",
      "Separate configuration and interaction concerns from test intent",
      "Verify shared automation components as software with their own failure cases"
    ],
    "answer": 2,
    "explanations": [
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "This concerns a timing assumption replacing a readiness condition, rather than the problem demonstrated here.",
      "This directly addresses tight coupling between test intent and environment details.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-7-1",
    "track": "test-automation",
    "domain": "d5",
    "objective": "Deployment and CI/CD · caselet 7 · decision",
    "prompt": "A pipeline consumes a test artifact without knowing which application build produced it. Which response most directly addresses the stated problem?",
    "choices": [
      "Investigate the suite’s failure-detection logic",
      "Review redundancy and feedback value as part of continuous improvement",
      "Bind test evidence and artifacts to the exact candidate configuration",
      "Disclose excluded checks and their risks alongside results"
    ],
    "answer": 2,
    "explanations": [
      "This concerns automation that executes without detecting the targeted defect, rather than the problem demonstrated here.",
      "This concerns growing maintenance and runtime without measured value, rather than the problem demonstrated here.",
      "This directly addresses missing build-to-evidence traceability.",
      "This concerns a misleading denominator in automation reporting, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-8-1",
    "track": "test-automation",
    "domain": "d6",
    "objective": "Reporting and metrics · caselet 8 · decision",
    "prompt": "A dashboard excludes unstable tests from its pass percentage without showing the exclusion. Which response most directly addresses the stated problem?",
    "choices": [
      "Separate configuration and interaction concerns from test intent",
      "Disclose excluded checks and their risks alongside results",
      "Evaluate automation value against repetition and lifecycle cost",
      "Evaluate technical fit on representative system components"
    ],
    "answer": 1,
    "explanations": [
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This directly addresses a misleading denominator in automation reporting.",
      "This concerns automation investment disconnected from expected reuse, rather than the problem demonstrated here.",
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-10-1",
    "track": "test-automation",
    "domain": "d8",
    "objective": "Continuous improvement · caselet 10 · decision",
    "prompt": "The team adds tests continuously but never removes redundant slow checks or measures feedback quality. Which response most directly addresses the stated problem?",
    "choices": [
      "Separate configuration and interaction concerns from test intent",
      "Verify shared automation components as software with their own failure cases",
      "Isolate or coordinate shared test data deliberately",
      "Review redundancy and feedback value as part of continuous improvement"
    ],
    "answer": 3,
    "explanations": [
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "This directly addresses growing maintenance and runtime without measured value."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-1-2",
    "track": "test-automation",
    "domain": "d1",
    "objective": "Objectives for automation · caselet 1 · verification",
    "prompt": "A team automates a rapidly discarded prototype without comparing setup and maintenance effort to expected repeat use. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Run a proof of fit against the actual required interfaces",
      "Change an environment or shared interaction through the intended abstraction",
      "Inject a known failing condition into tests using the helper",
      "Compare expected reuse with implementation and maintenance effort"
    ],
    "answer": 3,
    "explanations": [
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This directly addresses automation investment disconnected from expected reuse."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-2-2",
    "track": "test-automation",
    "domain": "d2",
    "objective": "Preparing for automation · caselet 2 · verification",
    "prompt": "A candidate tool cannot interact with a required platform component despite a successful unrelated demo. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inject a known failing condition into tests using the helper",
      "Compare repeated parallel and isolated runs using controlled data",
      "Run a proof of fit against the actual required interfaces",
      "Change an environment or shared interaction through the intended abstraction"
    ],
    "answer": 2,
    "explanations": [
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "This directly addresses tool selection based on an unrepresentative demonstration.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-3-2",
    "track": "test-automation",
    "domain": "d3",
    "objective": "Automation architecture · caselet 3 · verification",
    "prompt": "Every test embeds environment addresses and low-level interaction details throughout its business logic. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Vary readiness timing and check bounded wait behavior",
      "Change an environment or shared interaction through the intended abstraction",
      "Inject a known failing condition into tests using the helper",
      "Compare repeated parallel and isolated runs using controlled data"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a timing assumption replacing a readiness condition, rather than the problem demonstrated here.",
      "This directly addresses tight coupling between test intent and environment details.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-5-1",
    "track": "test-automation",
    "domain": "d4",
    "objective": "Implementing automation · caselet 5 · decision",
    "prompt": "Parallel tests mutate one synthetic account and fail depending on execution order. Which response most directly addresses the stated problem?",
    "choices": [
      "Isolate or coordinate shared test data deliberately",
      "Wait for an observable readiness condition with a bound",
      "Bind test evidence and artifacts to the exact candidate configuration",
      "Disclose excluded checks and their risks alongside results"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses test interference through shared mutable state.",
      "This concerns a timing assumption replacing a readiness condition, rather than the problem demonstrated here.",
      "This concerns missing build-to-evidence traceability, rather than the problem demonstrated here.",
      "This concerns a misleading denominator in automation reporting, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-7-2",
    "track": "test-automation",
    "domain": "d5",
    "objective": "Deployment and CI/CD · caselet 7 · verification",
    "prompt": "A pipeline consumes a test artifact without knowing which application build produced it. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare runtime and retained risk detection before and after a focused change",
      "Trace the release candidate to the matching test run and artifact",
      "Recalculate reported scope including excluded and unexecuted checks",
      "Verify that a controlled negative case actually fails the relevant check"
    ],
    "answer": 1,
    "explanations": [
      "This concerns growing maintenance and runtime without measured value, rather than the problem demonstrated here.",
      "This directly addresses missing build-to-evidence traceability.",
      "This concerns a misleading denominator in automation reporting, rather than the problem demonstrated here.",
      "This concerns automation that executes without detecting the targeted defect, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-8-2",
    "track": "test-automation",
    "domain": "d6",
    "objective": "Reporting and metrics · caselet 8 · verification",
    "prompt": "A dashboard excludes unstable tests from its pass percentage without showing the exclusion. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Recalculate reported scope including excluded and unexecuted checks",
      "Compare expected reuse with implementation and maintenance effort",
      "Run a proof of fit against the actual required interfaces",
      "Change an environment or shared interaction through the intended abstraction"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses a misleading denominator in automation reporting.",
      "This concerns automation investment disconnected from expected reuse, rather than the problem demonstrated here.",
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-9-1",
    "track": "test-automation",
    "domain": "d7",
    "objective": "Verifying automation · caselet 9 · decision",
    "prompt": "A test suite stays green when a deliberate defect is introduced into the asserted behavior. Which response most directly addresses the stated problem?",
    "choices": [
      "Investigate the suite’s failure-detection logic",
      "Evaluate technical fit on representative system components",
      "Separate configuration and interaction concerns from test intent",
      "Verify shared automation components as software with their own failure cases"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses automation that executes without detecting the targeted defect.",
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-10-2",
    "track": "test-automation",
    "domain": "d8",
    "objective": "Continuous improvement · caselet 10 · verification",
    "prompt": "The team adds tests continuously but never removes redundant slow checks or measures feedback quality. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inject a known failing condition into tests using the helper",
      "Compare repeated parallel and isolated runs using controlled data",
      "Compare runtime and retained risk detection before and after a focused change",
      "Change an environment or shared interaction through the intended abstraction"
    ],
    "answer": 2,
    "explanations": [
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "This directly addresses growing maintenance and runtime without measured value.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-1-3",
    "track": "test-automation",
    "domain": "d1",
    "objective": "Objectives for automation · caselet 1 · interpretation",
    "prompt": "A team automates a rapidly discarded prototype without comparing setup and maintenance effort to expected repeat use. Which gap is demonstrated by the evidence?",
    "choices": [
      "Tight coupling between test intent and environment details",
      "A common automation defect corrupting many results",
      "Automation investment disconnected from expected reuse",
      "Tool selection based on an unrepresentative demonstration"
    ],
    "answer": 2,
    "explanations": [
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates automation investment disconnected from expected reuse.",
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-2-3",
    "track": "test-automation",
    "domain": "d2",
    "objective": "Preparing for automation · caselet 2 · interpretation",
    "prompt": "A candidate tool cannot interact with a required platform component despite a successful unrelated demo. Which gap is demonstrated by the evidence?",
    "choices": [
      "Test interference through shared mutable state",
      "Tool selection based on an unrepresentative demonstration",
      "Tight coupling between test intent and environment details",
      "A common automation defect corrupting many results"
    ],
    "answer": 1,
    "explanations": [
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates tool selection based on an unrepresentative demonstration.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-3-3",
    "track": "test-automation",
    "domain": "d3",
    "objective": "Automation architecture · caselet 3 · interpretation",
    "prompt": "Every test embeds environment addresses and low-level interaction details throughout its business logic. Which gap is demonstrated by the evidence?",
    "choices": [
      "Tight coupling between test intent and environment details",
      "A common automation defect corrupting many results",
      "Test interference through shared mutable state",
      "A timing assumption replacing a readiness condition"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates tight coupling between test intent and environment details.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "This concerns a timing assumption replacing a readiness condition, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-5-2",
    "track": "test-automation",
    "domain": "d4",
    "objective": "Implementing automation · caselet 5 · verification",
    "prompt": "Parallel tests mutate one synthetic account and fail depending on execution order. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Vary readiness timing and check bounded wait behavior",
      "Trace the release candidate to the matching test run and artifact",
      "Recalculate reported scope including excluded and unexecuted checks",
      "Compare repeated parallel and isolated runs using controlled data"
    ],
    "answer": 3,
    "explanations": [
      "This concerns a timing assumption replacing a readiness condition, rather than the problem demonstrated here.",
      "This concerns missing build-to-evidence traceability, rather than the problem demonstrated here.",
      "This concerns a misleading denominator in automation reporting, rather than the problem demonstrated here.",
      "This directly addresses test interference through shared mutable state."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-7-3",
    "track": "test-automation",
    "domain": "d5",
    "objective": "Deployment and CI/CD · caselet 7 · interpretation",
    "prompt": "A pipeline consumes a test artifact without knowing which application build produced it. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing build-to-evidence traceability",
      "A misleading denominator in automation reporting",
      "Automation that executes without detecting the targeted defect",
      "Growing maintenance and runtime without measured value"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates missing build-to-evidence traceability.",
      "This concerns a misleading denominator in automation reporting, rather than the problem demonstrated here.",
      "This concerns automation that executes without detecting the targeted defect, rather than the problem demonstrated here.",
      "This concerns growing maintenance and runtime without measured value, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-8-3",
    "track": "test-automation",
    "domain": "d6",
    "objective": "Reporting and metrics · caselet 8 · interpretation",
    "prompt": "A dashboard excludes unstable tests from its pass percentage without showing the exclusion. Which gap is demonstrated by the evidence?",
    "choices": [
      "Automation investment disconnected from expected reuse",
      "Tool selection based on an unrepresentative demonstration",
      "Tight coupling between test intent and environment details",
      "A misleading denominator in automation reporting"
    ],
    "answer": 3,
    "explanations": [
      "This concerns automation investment disconnected from expected reuse, rather than the problem demonstrated here.",
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates a misleading denominator in automation reporting."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-9-2",
    "track": "test-automation",
    "domain": "d7",
    "objective": "Verifying automation · caselet 9 · verification",
    "prompt": "A test suite stays green when a deliberate defect is introduced into the asserted behavior. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Run a proof of fit against the actual required interfaces",
      "Change an environment or shared interaction through the intended abstraction",
      "Inject a known failing condition into tests using the helper",
      "Verify that a controlled negative case actually fails the relevant check"
    ],
    "answer": 3,
    "explanations": [
      "This concerns tool selection based on an unrepresentative demonstration, rather than the problem demonstrated here.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here.",
      "This directly addresses automation that executes without detecting the targeted defect."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-10-3",
    "track": "test-automation",
    "domain": "d8",
    "objective": "Continuous improvement · caselet 10 · interpretation",
    "prompt": "The team adds tests continuously but never removes redundant slow checks or measures feedback quality. Which gap is demonstrated by the evidence?",
    "choices": [
      "Test interference through shared mutable state",
      "Growing maintenance and runtime without measured value",
      "Tight coupling between test intent and environment details",
      "A common automation defect corrupting many results"
    ],
    "answer": 1,
    "explanations": [
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates growing maintenance and runtime without measured value.",
      "This concerns tight coupling between test intent and environment details, rather than the problem demonstrated here.",
      "This concerns a common automation defect corrupting many results, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-4-1",
    "track": "test-automation",
    "domain": "d3",
    "objective": "Automation architecture · caselet 4 · decision",
    "prompt": "A shared assertion helper incorrectly accepts failures, affecting many otherwise different tests. Which response most directly addresses the stated problem?",
    "choices": [
      "Bind test evidence and artifacts to the exact candidate configuration",
      "Verify shared automation components as software with their own failure cases",
      "Isolate or coordinate shared test data deliberately",
      "Wait for an observable readiness condition with a bound"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing build-to-evidence traceability, rather than the problem demonstrated here.",
      "This directly addresses a common automation defect corrupting many results.",
      "This concerns test interference through shared mutable state, rather than the problem demonstrated here.",
      "This concerns a timing assumption replacing a readiness condition, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "test-automation-case-5-3",
    "track": "test-automation",
    "domain": "d4",
    "objective": "Implementing automation · caselet 5 · interpretation",
    "prompt": "Parallel tests mutate one synthetic account and fail depending on execution order. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing build-to-evidence traceability",
      "A misleading denominator in automation reporting",
      "Test interference through shared mutable state",
      "A timing assumption replacing a readiness condition"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing build-to-evidence traceability, rather than the problem demonstrated here.",
      "This concerns a misleading denominator in automation reporting, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates test interference through shared mutable state.",
      "This concerns a timing assumption replacing a readiness condition, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=3435&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-1-1",
    "track": "ai-testing",
    "domain": "d1",
    "objective": "AI foundations · caselet 1 · decision",
    "prompt": "A probabilistic component is judged by one exact expected sentence although several responses meet the requirement. Which response most directly addresses the stated problem?",
    "choices": [
      "Use assessable properties and repeated representative observations",
      "Agree risk-relevant acceptance criteria before selecting a result",
      "Include relevant operating conditions in quality acceptance",
      "Evaluate positive prediction quality as well as detection coverage"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses an exact-output oracle mismatched to variable valid output.",
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-2-1",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · caselet 2 · decision",
    "prompt": "A model is accepted after stakeholders see a favorable score, with no previously agreed threshold. Which response most directly addresses the stated problem?",
    "choices": [
      "Include relevant operating conditions in quality acceptance",
      "Evaluate positive prediction quality as well as detection coverage",
      "Separate fitting and evaluation data without relevant leakage",
      "Agree risk-relevant acceptance criteria before selecting a result"
    ],
    "answer": 3,
    "explanations": [
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This directly addresses post-hoc acceptance criteria chosen to fit a result."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-6-1",
    "track": "ai-testing",
    "domain": "d4",
    "objective": "Testing AI-based systems · caselet 6 · decision",
    "prompt": "The system has no complete exact-output oracle, but controlled input transformations have known required relationships. Which response most directly addresses the stated problem?",
    "choices": [
      "Validate input semantics and normalization against the contract",
      "Evaluate relevant subgroup trade-offs against acceptance criteria",
      "Version the data, model and evaluation pipeline together",
      "Use justified relationship-based checks alongside other evidence"
    ],
    "answer": 3,
    "explanations": [
      "This concerns a semantic mismatch in input data, rather than the problem demonstrated here.",
      "This concerns an aggregate gain hiding a consequential subgroup regression, rather than the problem demonstrated here.",
      "This concerns missing reproducibility of development evidence, rather than the problem demonstrated here.",
      "This directly addresses treating a difficult oracle as the absence of all testable properties."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-7-1",
    "track": "ai-testing",
    "domain": "d5",
    "objective": "Input data testing · caselet 7 · decision",
    "prompt": "Production inputs use a different measurement unit from the model’s documented input contract. Which response most directly addresses the stated problem?",
    "choices": [
      "Version the data, model and evaluation pipeline together",
      "Bind reported metrics to the actual evaluated model artifact",
      "Validate input semantics and normalization against the contract",
      "Evaluate relevant subgroup trade-offs against acceptance criteria"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing reproducibility of development evidence, rather than the problem demonstrated here.",
      "This concerns misattribution of evaluation results to the wrong artifact, rather than the problem demonstrated here.",
      "This directly addresses a semantic mismatch in input data.",
      "This concerns an aggregate gain hiding a consequential subgroup regression, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-9-1",
    "track": "ai-testing",
    "domain": "d7",
    "objective": "ML development testing · caselet 9 · decision",
    "prompt": "An evaluation cannot be reproduced because the preprocessing code and dataset snapshot were not recorded. Which response most directly addresses the stated problem?",
    "choices": [
      "Version the data, model and evaluation pipeline together",
      "Agree risk-relevant acceptance criteria before selecting a result",
      "Include relevant operating conditions in quality acceptance",
      "Evaluate positive prediction quality as well as detection coverage"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses missing reproducibility of development evidence.",
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-1-2",
    "track": "ai-testing",
    "domain": "d1",
    "objective": "AI foundations · caselet 1 · verification",
    "prompt": "A probabilistic component is judged by one exact expected sentence although several responses meet the requirement. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare observed quality with criteria defined for the intended use",
      "Measure response behavior under the intended stressful conditions",
      "Calculate precision from true and false positive predictions",
      "Evaluate whether acceptable variants satisfy the required properties"
    ],
    "answer": 3,
    "explanations": [
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This directly addresses an exact-output oracle mismatched to variable valid output."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-2-2",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · caselet 2 · verification",
    "prompt": "A model is accepted after stakeholders see a favorable score, with no previously agreed threshold. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Calculate precision from true and false positive predictions",
      "Check provenance and overlap between training and evaluation records",
      "Compare observed quality with criteria defined for the intended use",
      "Measure response behavior under the intended stressful conditions"
    ],
    "answer": 2,
    "explanations": [
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This directly addresses post-hoc acceptance criteria chosen to fit a result.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-4-1",
    "track": "ai-testing",
    "domain": "d3",
    "objective": "Machine learning and metrics · caselet 4 · decision",
    "prompt": "A classifier’s positive predictions contain many false positives, but the report discusses only recall. Which response most directly addresses the stated problem?",
    "choices": [
      "Validate input semantics and normalization against the contract",
      "Evaluate positive prediction quality as well as detection coverage",
      "Separate fitting and evaluation data without relevant leakage",
      "Use justified relationship-based checks alongside other evidence"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a semantic mismatch in input data, rather than the problem demonstrated here.",
      "This directly addresses ignoring false-positive burden when assessing a classifier.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This concerns treating a difficult oracle as the absence of all testable properties, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-6-2",
    "track": "ai-testing",
    "domain": "d4",
    "objective": "Testing AI-based systems · caselet 6 · verification",
    "prompt": "The system has no complete exact-output oracle, but controlled input transformations have known required relationships. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare subgroup results and uncertainty before and after the update",
      "Recreate the measurement from its recorded configuration",
      "Compare outputs under transformations with the required relationships",
      "Exercise representative values with their units and transformations"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an aggregate gain hiding a consequential subgroup regression, rather than the problem demonstrated here.",
      "This concerns missing reproducibility of development evidence, rather than the problem demonstrated here.",
      "This directly addresses treating a difficult oracle as the absence of all testable properties.",
      "This concerns a semantic mismatch in input data, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-7-2",
    "track": "ai-testing",
    "domain": "d5",
    "objective": "Input data testing · caselet 7 · verification",
    "prompt": "Production inputs use a different measurement unit from the model’s documented input contract. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify artifact identity through the evaluation and reporting steps",
      "Exercise representative values with their units and transformations",
      "Compare subgroup results and uncertainty before and after the update",
      "Recreate the measurement from its recorded configuration"
    ],
    "answer": 1,
    "explanations": [
      "This concerns misattribution of evaluation results to the wrong artifact, rather than the problem demonstrated here.",
      "This directly addresses a semantic mismatch in input data.",
      "This concerns an aggregate gain hiding a consequential subgroup regression, rather than the problem demonstrated here.",
      "This concerns missing reproducibility of development evidence, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-8-1",
    "track": "ai-testing",
    "domain": "d6",
    "objective": "Model testing · caselet 8 · decision",
    "prompt": "An updated model improves one population while reducing performance on another important population. Which response most directly addresses the stated problem?",
    "choices": [
      "Include relevant operating conditions in quality acceptance",
      "Evaluate relevant subgroup trade-offs against acceptance criteria",
      "Use assessable properties and repeated representative observations",
      "Agree risk-relevant acceptance criteria before selecting a result"
    ],
    "answer": 1,
    "explanations": [
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This directly addresses an aggregate gain hiding a consequential subgroup regression.",
      "This concerns an exact-output oracle mismatched to variable valid output, rather than the problem demonstrated here.",
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-9-2",
    "track": "ai-testing",
    "domain": "d7",
    "objective": "ML development testing · caselet 9 · verification",
    "prompt": "An evaluation cannot be reproduced because the preprocessing code and dataset snapshot were not recorded. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare observed quality with criteria defined for the intended use",
      "Measure response behavior under the intended stressful conditions",
      "Calculate precision from true and false positive predictions",
      "Recreate the measurement from its recorded configuration"
    ],
    "answer": 3,
    "explanations": [
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This directly addresses missing reproducibility of development evidence."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-1-3",
    "track": "ai-testing",
    "domain": "d1",
    "objective": "AI foundations · caselet 1 · interpretation",
    "prompt": "A probabilistic component is judged by one exact expected sentence although several responses meet the requirement. Which gap is demonstrated by the evidence?",
    "choices": [
      "Aggregate performance concealing operating-condition gaps",
      "Ignoring false-positive burden when assessing a classifier",
      "An exact-output oracle mismatched to variable valid output",
      "Post-hoc acceptance criteria chosen to fit a result"
    ],
    "answer": 2,
    "explanations": [
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an exact-output oracle mismatched to variable valid output.",
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-2-3",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · caselet 2 · interpretation",
    "prompt": "A model is accepted after stakeholders see a favorable score, with no previously agreed threshold. Which gap is demonstrated by the evidence?",
    "choices": [
      "Data leakage inflating apparent generalization",
      "Post-hoc acceptance criteria chosen to fit a result",
      "Aggregate performance concealing operating-condition gaps",
      "Ignoring false-positive burden when assessing a classifier"
    ],
    "answer": 1,
    "explanations": [
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates post-hoc acceptance criteria chosen to fit a result.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-4-2",
    "track": "ai-testing",
    "domain": "d3",
    "objective": "Machine learning and metrics · caselet 4 · verification",
    "prompt": "A classifier’s positive predictions contain many false positives, but the report discusses only recall. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Calculate precision from true and false positive predictions",
      "Check provenance and overlap between training and evaluation records",
      "Compare outputs under transformations with the required relationships",
      "Exercise representative values with their units and transformations"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses ignoring false-positive burden when assessing a classifier.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This concerns treating a difficult oracle as the absence of all testable properties, rather than the problem demonstrated here.",
      "This concerns a semantic mismatch in input data, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-6-3",
    "track": "ai-testing",
    "domain": "d4",
    "objective": "Testing AI-based systems · caselet 6 · interpretation",
    "prompt": "The system has no complete exact-output oracle, but controlled input transformations have known required relationships. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing reproducibility of development evidence",
      "Treating a difficult oracle as the absence of all testable properties",
      "A semantic mismatch in input data",
      "An aggregate gain hiding a consequential subgroup regression"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing reproducibility of development evidence, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates treating a difficult oracle as the absence of all testable properties.",
      "This concerns a semantic mismatch in input data, rather than the problem demonstrated here.",
      "This concerns an aggregate gain hiding a consequential subgroup regression, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-7-3",
    "track": "ai-testing",
    "domain": "d5",
    "objective": "Input data testing · caselet 7 · interpretation",
    "prompt": "Production inputs use a different measurement unit from the model’s documented input contract. Which gap is demonstrated by the evidence?",
    "choices": [
      "A semantic mismatch in input data",
      "An aggregate gain hiding a consequential subgroup regression",
      "Missing reproducibility of development evidence",
      "Misattribution of evaluation results to the wrong artifact"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates a semantic mismatch in input data.",
      "This concerns an aggregate gain hiding a consequential subgroup regression, rather than the problem demonstrated here.",
      "This concerns missing reproducibility of development evidence, rather than the problem demonstrated here.",
      "This concerns misattribution of evaluation results to the wrong artifact, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-8-2",
    "track": "ai-testing",
    "domain": "d6",
    "objective": "Model testing · caselet 8 · verification",
    "prompt": "An updated model improves one population while reducing performance on another important population. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare subgroup results and uncertainty before and after the update",
      "Evaluate whether acceptable variants satisfy the required properties",
      "Compare observed quality with criteria defined for the intended use",
      "Measure response behavior under the intended stressful conditions"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses an aggregate gain hiding a consequential subgroup regression.",
      "This concerns an exact-output oracle mismatched to variable valid output, rather than the problem demonstrated here.",
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-9-3",
    "track": "ai-testing",
    "domain": "d7",
    "objective": "ML development testing · caselet 9 · interpretation",
    "prompt": "An evaluation cannot be reproduced because the preprocessing code and dataset snapshot were not recorded. Which gap is demonstrated by the evidence?",
    "choices": [
      "Aggregate performance concealing operating-condition gaps",
      "Ignoring false-positive burden when assessing a classifier",
      "Missing reproducibility of development evidence",
      "Post-hoc acceptance criteria chosen to fit a result"
    ],
    "answer": 2,
    "explanations": [
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates missing reproducibility of development evidence.",
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-3-1",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · caselet 3 · decision",
    "prompt": "A model meets average latency but its worst relevant operating conditions have not been checked. Which response most directly addresses the stated problem?",
    "choices": [
      "Separate fitting and evaluation data without relevant leakage",
      "Use justified relationship-based checks alongside other evidence",
      "Include relevant operating conditions in quality acceptance",
      "Evaluate positive prediction quality as well as detection coverage"
    ],
    "answer": 2,
    "explanations": [
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This concerns treating a difficult oracle as the absence of all testable properties, rather than the problem demonstrated here.",
      "This directly addresses aggregate performance concealing operating-condition gaps.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-4-3",
    "track": "ai-testing",
    "domain": "d3",
    "objective": "Machine learning and metrics · caselet 4 · interpretation",
    "prompt": "A classifier’s positive predictions contain many false positives, but the report discusses only recall. Which gap is demonstrated by the evidence?",
    "choices": [
      "Data leakage inflating apparent generalization",
      "Treating a difficult oracle as the absence of all testable properties",
      "A semantic mismatch in input data",
      "Ignoring false-positive burden when assessing a classifier"
    ],
    "answer": 3,
    "explanations": [
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This concerns treating a difficult oracle as the absence of all testable properties, rather than the problem demonstrated here.",
      "This concerns a semantic mismatch in input data, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates ignoring false-positive burden when assessing a classifier."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-8-3",
    "track": "ai-testing",
    "domain": "d6",
    "objective": "Model testing · caselet 8 · interpretation",
    "prompt": "An updated model improves one population while reducing performance on another important population. Which gap is demonstrated by the evidence?",
    "choices": [
      "An exact-output oracle mismatched to variable valid output",
      "Post-hoc acceptance criteria chosen to fit a result",
      "Aggregate performance concealing operating-condition gaps",
      "An aggregate gain hiding a consequential subgroup regression"
    ],
    "answer": 3,
    "explanations": [
      "This concerns an exact-output oracle mismatched to variable valid output, rather than the problem demonstrated here.",
      "This concerns post-hoc acceptance criteria chosen to fit a result, rather than the problem demonstrated here.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an aggregate gain hiding a consequential subgroup regression."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-10-1",
    "track": "ai-testing",
    "domain": "d7",
    "objective": "ML development testing · caselet 10 · decision",
    "prompt": "A development pipeline accidentally evaluates an older model while labeling the report with the new model’s name. Which response most directly addresses the stated problem?",
    "choices": [
      "Include relevant operating conditions in quality acceptance",
      "Evaluate positive prediction quality as well as detection coverage",
      "Separate fitting and evaluation data without relevant leakage",
      "Bind reported metrics to the actual evaluated model artifact"
    ],
    "answer": 3,
    "explanations": [
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This directly addresses misattribution of evaluation results to the wrong artifact."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-3-2",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · caselet 3 · verification",
    "prompt": "A model meets average latency but its worst relevant operating conditions have not been checked. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare outputs under transformations with the required relationships",
      "Measure response behavior under the intended stressful conditions",
      "Calculate precision from true and false positive predictions",
      "Check provenance and overlap between training and evaluation records"
    ],
    "answer": 1,
    "explanations": [
      "This concerns treating a difficult oracle as the absence of all testable properties, rather than the problem demonstrated here.",
      "This directly addresses aggregate performance concealing operating-condition gaps.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-5-1",
    "track": "ai-testing",
    "domain": "d3",
    "objective": "Machine learning and metrics · caselet 5 · decision",
    "prompt": "A training dataset includes copies of the records later presented as independent test data. Which response most directly addresses the stated problem?",
    "choices": [
      "Separate fitting and evaluation data without relevant leakage",
      "Use justified relationship-based checks alongside other evidence",
      "Validate input semantics and normalization against the contract",
      "Evaluate relevant subgroup trade-offs against acceptance criteria"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses data leakage inflating apparent generalization.",
      "This concerns treating a difficult oracle as the absence of all testable properties, rather than the problem demonstrated here.",
      "This concerns a semantic mismatch in input data, rather than the problem demonstrated here.",
      "This concerns an aggregate gain hiding a consequential subgroup regression, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-10-2",
    "track": "ai-testing",
    "domain": "d7",
    "objective": "ML development testing · caselet 10 · verification",
    "prompt": "A development pipeline accidentally evaluates an older model while labeling the report with the new model’s name. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Calculate precision from true and false positive predictions",
      "Check provenance and overlap between training and evaluation records",
      "Verify artifact identity through the evaluation and reporting steps",
      "Measure response behavior under the intended stressful conditions"
    ],
    "answer": 2,
    "explanations": [
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This directly addresses misattribution of evaluation results to the wrong artifact.",
      "This concerns aggregate performance concealing operating-condition gaps, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "ai-testing-case-3-3",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · caselet 3 · interpretation",
    "prompt": "A model meets average latency but its worst relevant operating conditions have not been checked. Which gap is demonstrated by the evidence?",
    "choices": [
      "Aggregate performance concealing operating-condition gaps",
      "Ignoring false-positive burden when assessing a classifier",
      "Data leakage inflating apparent generalization",
      "Treating a difficult oracle as the absence of all testable properties"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates aggregate performance concealing operating-condition gaps.",
      "This concerns ignoring false-positive burden when assessing a classifier, rather than the problem demonstrated here.",
      "This concerns data leakage inflating apparent generalization, rather than the problem demonstrated here.",
      "This concerns treating a difficult oracle as the absence of all testable properties, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=9558&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-1-1",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · caselet 1 · decision",
    "prompt": "An assistant generates many test cases that all exercise the same happy path. Which response most directly addresses the stated problem?",
    "choices": [
      "Review generated cases for distinct risk and requirement coverage",
      "Resolve expected behavior from the authoritative requirement",
      "Supply or clarify the missing boundary rule",
      "Control and record the factors being evaluated"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses output volume concealing repeated narrow coverage.",
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-5-1",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · caselet 5 · decision",
    "prompt": "A prompt contains a production credential copied from a defect report. Which response most directly addresses the stated problem?",
    "choices": [
      "Use approved sanitized or synthetic context instead of the credential",
      "Verify claimed references before using the output as evidence",
      "Manage document version selection in the retrieval context",
      "Separate proposals from permission to execute changes"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses sensitive data disclosure through testing prompts.",
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here.",
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-7-1",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · caselet 7 · decision",
    "prompt": "A retrieval-based assistant receives a passage from an obsolete version of the requirements. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate total workflow effort and quality outcomes",
      "Establish reproducible guidance and evaluation before wider adoption",
      "Manage document version selection in the retrieval context",
      "Separate proposals from permission to execute changes"
    ],
    "answer": 2,
    "explanations": [
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "This concerns adoption dependent on undocumented individual knowledge, rather than the problem demonstrated here.",
      "This directly addresses grounding in obsolete rather than approved requirements.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-1-2",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · caselet 1 · verification",
    "prompt": "An assistant generates many test cases that all exercise the same happy path. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare the proposed assertion with the approved criterion",
      "Check generated expected results against the clarified endpoint semantics",
      "Compare a versioned prompt change while holding other relevant factors fixed",
      "Map cases to meaningful conditions and identify missing failure paths"
    ],
    "answer": 3,
    "explanations": [
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This directly addresses output volume concealing repeated narrow coverage."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-3-1",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · caselet 3 · decision",
    "prompt": "A prompt asks for boundary tests but omits whether the endpoints are inclusive. Which response most directly addresses the stated problem?",
    "choices": [
      "Use approved sanitized or synthetic context instead of the credential",
      "Verify claimed references before using the output as evidence",
      "Supply or clarify the missing boundary rule",
      "Control and record the factors being evaluated"
    ],
    "answer": 2,
    "explanations": [
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here.",
      "This directly addresses an underspecified prompt inviting invented assumptions.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-5-2",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · caselet 5 · verification",
    "prompt": "A prompt contains a production credential copied from a defect report. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Locate the cited passage and inspect whether it supports the claim",
      "Check which source version supports each proposed expected result",
      "Verify that consequential edits require the intended authorization",
      "Inspect the exact submitted context for unauthorized sensitive data"
    ],
    "answer": 3,
    "explanations": [
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here.",
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here.",
      "This directly addresses sensitive data disclosure through testing prompts."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-7-2",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · caselet 7 · verification",
    "prompt": "A retrieval-based assistant receives a passage from an obsolete version of the requirements. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Have another practitioner reproduce the workflow and review its outputs",
      "Check which source version supports each proposed expected result",
      "Verify that consequential edits require the intended authorization",
      "Compare generation, review, integration and repair effort"
    ],
    "answer": 1,
    "explanations": [
      "This concerns adoption dependent on undocumented individual knowledge, rather than the problem demonstrated here.",
      "This directly addresses grounding in obsolete rather than approved requirements.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here.",
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-9-1",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 9 · decision",
    "prompt": "A pilot measures drafting time but excludes review and repair effort from its claimed savings. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate total workflow effort and quality outcomes",
      "Review generated cases for distinct risk and requirement coverage",
      "Resolve expected behavior from the authoritative requirement",
      "Supply or clarify the missing boundary rule"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses local speed gains mistaken for end-to-end value.",
      "This concerns output volume concealing repeated narrow coverage, rather than the problem demonstrated here.",
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-1-3",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · caselet 1 · interpretation",
    "prompt": "An assistant generates many test cases that all exercise the same happy path. Which gap is demonstrated by the evidence?",
    "choices": [
      "An underspecified prompt inviting invented assumptions",
      "Confounded evaluation of prompt changes",
      "Output volume concealing repeated narrow coverage",
      "Generated assertions treated as an independent oracle"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates output volume concealing repeated narrow coverage.",
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-3-2",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · caselet 3 · verification",
    "prompt": "A prompt asks for boundary tests but omits whether the endpoints are inclusive. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Locate the cited passage and inspect whether it supports the claim",
      "Check generated expected results against the clarified endpoint semantics",
      "Compare a versioned prompt change while holding other relevant factors fixed",
      "Inspect the exact submitted context for unauthorized sensitive data"
    ],
    "answer": 1,
    "explanations": [
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here.",
      "This directly addresses an underspecified prompt inviting invented assumptions.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-5-3",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · caselet 5 · interpretation",
    "prompt": "A prompt contains a production credential copied from a defect report. Which gap is demonstrated by the evidence?",
    "choices": [
      "Grounding in obsolete rather than approved requirements",
      "Generated suggestions crossing an action-authorization boundary",
      "Sensitive data disclosure through testing prompts",
      "Fabricated provenance in a generated explanation"
    ],
    "answer": 2,
    "explanations": [
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates sensitive data disclosure through testing prompts.",
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-7-3",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · caselet 7 · interpretation",
    "prompt": "A retrieval-based assistant receives a passage from an obsolete version of the requirements. Which gap is demonstrated by the evidence?",
    "choices": [
      "Grounding in obsolete rather than approved requirements",
      "Generated suggestions crossing an action-authorization boundary",
      "Local speed gains mistaken for end-to-end value",
      "Adoption dependent on undocumented individual knowledge"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates grounding in obsolete rather than approved requirements.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here.",
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "This concerns adoption dependent on undocumented individual knowledge, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-9-2",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 9 · verification",
    "prompt": "A pilot measures drafting time but excludes review and repair effort from its claimed savings. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Map cases to meaningful conditions and identify missing failure paths",
      "Compare the proposed assertion with the approved criterion",
      "Check generated expected results against the clarified endpoint semantics",
      "Compare generation, review, integration and repair effort"
    ],
    "answer": 3,
    "explanations": [
      "This concerns output volume concealing repeated narrow coverage, rather than the problem demonstrated here.",
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This directly addresses local speed gains mistaken for end-to-end value."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-2-1",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · caselet 2 · decision",
    "prompt": "An assistant’s expected result contradicts an approved acceptance criterion. Which response most directly addresses the stated problem?",
    "choices": [
      "Supply or clarify the missing boundary rule",
      "Control and record the factors being evaluated",
      "Use approved sanitized or synthetic context instead of the credential",
      "Resolve expected behavior from the authoritative requirement"
    ],
    "answer": 3,
    "explanations": [
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This directly addresses generated assertions treated as an independent oracle."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-3-3",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · caselet 3 · interpretation",
    "prompt": "A prompt asks for boundary tests but omits whether the endpoints are inclusive. Which gap is demonstrated by the evidence?",
    "choices": [
      "An underspecified prompt inviting invented assumptions",
      "Confounded evaluation of prompt changes",
      "Sensitive data disclosure through testing prompts",
      "Fabricated provenance in a generated explanation"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates an underspecified prompt inviting invented assumptions.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-6-1",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · caselet 6 · decision",
    "prompt": "A generated explanation confidently cites a requirement section that does not exist. Which response most directly addresses the stated problem?",
    "choices": [
      "Manage document version selection in the retrieval context",
      "Separate proposals from permission to execute changes",
      "Evaluate total workflow effort and quality outcomes",
      "Verify claimed references before using the output as evidence"
    ],
    "answer": 3,
    "explanations": [
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here.",
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "This directly addresses fabricated provenance in a generated explanation."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-8-1",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · caselet 8 · decision",
    "prompt": "An LLM-powered testing tool can modify repositories without a clear boundary between suggested and authorized changes. Which response most directly addresses the stated problem?",
    "choices": [
      "Define a bounded adoption plan with responsibilities and safeguards",
      "Separate proposals from permission to execute changes",
      "Evaluate total workflow effort and quality outcomes",
      "Establish reproducible guidance and evaluation before wider adoption"
    ],
    "answer": 1,
    "explanations": [
      "This concerns tool access expanding before an operational adoption plan, rather than the problem demonstrated here.",
      "This directly addresses generated suggestions crossing an action-authorization boundary.",
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "This concerns adoption dependent on undocumented individual knowledge, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-9-3",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 9 · interpretation",
    "prompt": "A pilot measures drafting time but excludes review and repair effort from its claimed savings. Which gap is demonstrated by the evidence?",
    "choices": [
      "Generated assertions treated as an independent oracle",
      "An underspecified prompt inviting invented assumptions",
      "Local speed gains mistaken for end-to-end value",
      "Output volume concealing repeated narrow coverage"
    ],
    "answer": 2,
    "explanations": [
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates local speed gains mistaken for end-to-end value.",
      "This concerns output volume concealing repeated narrow coverage, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-2-2",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · caselet 2 · verification",
    "prompt": "An assistant’s expected result contradicts an approved acceptance criterion. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare a versioned prompt change while holding other relevant factors fixed",
      "Inspect the exact submitted context for unauthorized sensitive data",
      "Compare the proposed assertion with the approved criterion",
      "Check generated expected results against the clarified endpoint semantics"
    ],
    "answer": 2,
    "explanations": [
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This directly addresses generated assertions treated as an independent oracle.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-4-1",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · caselet 4 · decision",
    "prompt": "A team changes prompts and model versions at the same time and cannot explain the resulting quality change. Which response most directly addresses the stated problem?",
    "choices": [
      "Manage document version selection in the retrieval context",
      "Control and record the factors being evaluated",
      "Use approved sanitized or synthetic context instead of the credential",
      "Verify claimed references before using the output as evidence"
    ],
    "answer": 1,
    "explanations": [
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here.",
      "This directly addresses confounded evaluation of prompt changes.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-6-2",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · caselet 6 · verification",
    "prompt": "A generated explanation confidently cites a requirement section that does not exist. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify that consequential edits require the intended authorization",
      "Compare generation, review, integration and repair effort",
      "Locate the cited passage and inspect whether it supports the claim",
      "Check which source version supports each proposed expected result"
    ],
    "answer": 2,
    "explanations": [
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here.",
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "This directly addresses fabricated provenance in a generated explanation.",
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-8-2",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · caselet 8 · verification",
    "prompt": "An LLM-powered testing tool can modify repositories without a clear boundary between suggested and authorized changes. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify that consequential edits require the intended authorization",
      "Compare generation, review, integration and repair effort",
      "Have another practitioner reproduce the workflow and review its outputs",
      "Check that each proposed use has an owner, allowed inputs and evaluation criteria"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses generated suggestions crossing an action-authorization boundary.",
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "This concerns adoption dependent on undocumented individual knowledge, rather than the problem demonstrated here.",
      "This concerns tool access expanding before an operational adoption plan, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-10-1",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 10 · decision",
    "prompt": "A rollout depends on one expert’s undocumented prompt and manual corrections. Which response most directly addresses the stated problem?",
    "choices": [
      "Resolve expected behavior from the authoritative requirement",
      "Supply or clarify the missing boundary rule",
      "Control and record the factors being evaluated",
      "Establish reproducible guidance and evaluation before wider adoption"
    ],
    "answer": 3,
    "explanations": [
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This directly addresses adoption dependent on undocumented individual knowledge."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-2-3",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · caselet 2 · interpretation",
    "prompt": "An assistant’s expected result contradicts an approved acceptance criterion. Which gap is demonstrated by the evidence?",
    "choices": [
      "Sensitive data disclosure through testing prompts",
      "Generated assertions treated as an independent oracle",
      "An underspecified prompt inviting invented assumptions",
      "Confounded evaluation of prompt changes"
    ],
    "answer": 1,
    "explanations": [
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates generated assertions treated as an independent oracle.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-4-2",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · caselet 4 · verification",
    "prompt": "A team changes prompts and model versions at the same time and cannot explain the resulting quality change. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare a versioned prompt change while holding other relevant factors fixed",
      "Inspect the exact submitted context for unauthorized sensitive data",
      "Locate the cited passage and inspect whether it supports the claim",
      "Check which source version supports each proposed expected result"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses confounded evaluation of prompt changes.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here.",
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-6-3",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · caselet 6 · interpretation",
    "prompt": "A generated explanation confidently cites a requirement section that does not exist. Which gap is demonstrated by the evidence?",
    "choices": [
      "Local speed gains mistaken for end-to-end value",
      "Fabricated provenance in a generated explanation",
      "Grounding in obsolete rather than approved requirements",
      "Generated suggestions crossing an action-authorization boundary"
    ],
    "answer": 1,
    "explanations": [
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates fabricated provenance in a generated explanation.",
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here.",
      "This concerns generated suggestions crossing an action-authorization boundary, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-8-3",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · caselet 8 · interpretation",
    "prompt": "An LLM-powered testing tool can modify repositories without a clear boundary between suggested and authorized changes. Which gap is demonstrated by the evidence?",
    "choices": [
      "Local speed gains mistaken for end-to-end value",
      "Adoption dependent on undocumented individual knowledge",
      "Tool access expanding before an operational adoption plan",
      "Generated suggestions crossing an action-authorization boundary"
    ],
    "answer": 3,
    "explanations": [
      "This concerns local speed gains mistaken for end-to-end value, rather than the problem demonstrated here.",
      "This concerns adoption dependent on undocumented individual knowledge, rather than the problem demonstrated here.",
      "This concerns tool access expanding before an operational adoption plan, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates generated suggestions crossing an action-authorization boundary."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-10-2",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 10 · verification",
    "prompt": "A rollout depends on one expert’s undocumented prompt and manual corrections. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check generated expected results against the clarified endpoint semantics",
      "Compare a versioned prompt change while holding other relevant factors fixed",
      "Have another practitioner reproduce the workflow and review its outputs",
      "Compare the proposed assertion with the approved criterion"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This directly addresses adoption dependent on undocumented individual knowledge.",
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-4-3",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · caselet 4 · interpretation",
    "prompt": "A team changes prompts and model versions at the same time and cannot explain the resulting quality change. Which gap is demonstrated by the evidence?",
    "choices": [
      "Sensitive data disclosure through testing prompts",
      "Fabricated provenance in a generated explanation",
      "Grounding in obsolete rather than approved requirements",
      "Confounded evaluation of prompt changes"
    ],
    "answer": 3,
    "explanations": [
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This concerns fabricated provenance in a generated explanation, rather than the problem demonstrated here.",
      "This concerns grounding in obsolete rather than approved requirements, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates confounded evaluation of prompt changes."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-10-3",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 10 · interpretation",
    "prompt": "A rollout depends on one expert’s undocumented prompt and manual corrections. Which gap is demonstrated by the evidence?",
    "choices": [
      "Confounded evaluation of prompt changes",
      "Adoption dependent on undocumented individual knowledge",
      "Generated assertions treated as an independent oracle",
      "An underspecified prompt inviting invented assumptions"
    ],
    "answer": 1,
    "explanations": [
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates adoption dependent on undocumented individual knowledge.",
      "This concerns generated assertions treated as an independent oracle, rather than the problem demonstrated here.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-11-1",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 11 · decision",
    "prompt": "A test organization buys broad access before defining approved use cases and data-handling rules. Which response most directly addresses the stated problem?",
    "choices": [
      "Control and record the factors being evaluated",
      "Use approved sanitized or synthetic context instead of the credential",
      "Define a bounded adoption plan with responsibilities and safeguards",
      "Supply or clarify the missing boundary rule"
    ],
    "answer": 2,
    "explanations": [
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This directly addresses tool access expanding before an operational adoption plan.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-11-2",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 11 · verification",
    "prompt": "A test organization buys broad access before defining approved use cases and data-handling rules. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect the exact submitted context for unauthorized sensitive data",
      "Check that each proposed use has an owner, allowed inputs and evaluation criteria",
      "Check generated expected results against the clarified endpoint semantics",
      "Compare a versioned prompt change while holding other relevant factors fixed"
    ],
    "answer": 1,
    "explanations": [
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here.",
      "This directly addresses tool access expanding before an operational adoption plan.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "generative-ai-testing-case-11-3",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · caselet 11 · interpretation",
    "prompt": "A test organization buys broad access before defining approved use cases and data-handling rules. Which gap is demonstrated by the evidence?",
    "choices": [
      "Tool access expanding before an operational adoption plan",
      "An underspecified prompt inviting invented assumptions",
      "Confounded evaluation of prompt changes",
      "Sensitive data disclosure through testing prompts"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates tool access expanding before an operational adoption plan.",
      "This concerns an underspecified prompt inviting invented assumptions, rather than the problem demonstrated here.",
      "This concerns confounded evaluation of prompt changes, rather than the problem demonstrated here.",
      "This concerns sensitive data disclosure through testing prompts, rather than the problem demonstrated here."
    ],
    "source": "https://istqb.org/?download_id=6295&sdm_process_download=1",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-4-1",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · caselet 4 · decision",
    "prompt": "Only one workflow job fails, but investigation reads unrelated successful job logs. Which response most directly addresses the stated problem?",
    "choices": [
      "Manage the input contract as a versioned consumer interface",
      "Inspect the failed job and step evidence first",
      "Preserve and compare failure evidence before accepting a later green run",
      "Implement and test the promised output contract"
    ],
    "answer": 1,
    "explanations": [
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here.",
      "This directly addresses troubleshooting detached from the failing execution.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-6-1",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · caselet 6 · decision",
    "prompt": "A composite action documents an output but never writes that output in its execution. Which response most directly addresses the stated problem?",
    "choices": [
      "Manage the input contract as a versioned consumer interface",
      "Evaluate a versioned reusable workflow for shared behavior",
      "Record the workflow revision with the run and released artifact",
      "Implement and test the promised output contract"
    ],
    "answer": 3,
    "explanations": [
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here.",
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "This directly addresses an action interface promised but not implemented."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-8-1",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · caselet 8 · decision",
    "prompt": "An organization copies the same workflow into many repositories and fixes drift independently. Which response most directly addresses the stated problem?",
    "choices": [
      "Use an audited fixed revision with a deliberate update process",
      "Evaluate a versioned reusable workflow for shared behavior",
      "Record the workflow revision with the run and released artifact",
      "Separate untrusted execution from privileged credentials and contexts"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a moving dependency reference undermining reproducibility, rather than the problem demonstrated here.",
      "This directly addresses copy-based drift in shared automation.",
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "This concerns an unsafe trust boundary in workflow execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-1-1",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 1 · decision",
    "prompt": "A deploy job appears below a test job in YAML but has no declared prerequisite. Which response most directly addresses the stated problem?",
    "choices": [
      "Express the job dependency and intended success condition explicitly",
      "Align the trigger filters with the intended event and branch",
      "Pass and consume the intended matrix value in the test invocation",
      "Inspect the failed job and step evidence first"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses file order mistaken for a job dependency.",
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-4-2",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · caselet 4 · verification",
    "prompt": "Only one workflow job fails, but investigation reads unrelated successful job logs. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Trace the failing run to its exact job, step and inputs",
      "Compare failed and successful dependency steps and conditions",
      "Call the action from a consumer that asserts the output",
      "Exercise existing and updated consumers against the intended action revision"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses troubleshooting detached from the failing execution.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here.",
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-6-2",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · caselet 6 · verification",
    "prompt": "A composite action documents an output but never writes that output in its execution. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare consumer behavior under a controlled shared workflow update",
      "Trace a deployment back to its workflow version and inputs",
      "Call the action from a consumer that asserts the output",
      "Exercise existing and updated consumers against the intended action revision"
    ],
    "answer": 2,
    "explanations": [
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here.",
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "This directly addresses an action interface promised but not implemented.",
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-8-2",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · caselet 8 · verification",
    "prompt": "An organization copies the same workflow into many repositories and fixes drift independently. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare consumer behavior under a controlled shared workflow update",
      "Trace a deployment back to its workflow version and inputs",
      "Verify that the contribution cannot execute with release authority",
      "Resolve the dependency reference to the intended immutable contents"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses copy-based drift in shared automation.",
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "This concerns an unsafe trust boundary in workflow execution, rather than the problem demonstrated here.",
      "This concerns a moving dependency reference undermining reproducibility, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-10-1",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · caselet 10 · decision",
    "prompt": "A workflow sends untrusted contribution code into a privileged job containing release credentials. Which response most directly addresses the stated problem?",
    "choices": [
      "Align the trigger filters with the intended event and branch",
      "Pass and consume the intended matrix value in the test invocation",
      "Inspect the failed job and step evidence first",
      "Separate untrusted execution from privileged credentials and contexts"
    ],
    "answer": 3,
    "explanations": [
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This directly addresses an unsafe trust boundary in workflow execution."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-1-2",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 1 · verification",
    "prompt": "A deploy job appears below a test job in YAML but has no declared prerequisite. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Generate the relevant event and inspect whether a run is created",
      "Compare actual test configuration across matrix combinations",
      "Trace the failing run to its exact job, step and inputs",
      "Run an intentionally failing prerequisite and observe deployment eligibility"
    ],
    "answer": 3,
    "explanations": [
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This directly addresses file order mistaken for a job dependency."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-4-3",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · caselet 4 · interpretation",
    "prompt": "Only one workflow job fails, but investigation reads unrelated successful job logs. Which gap is demonstrated by the evidence?",
    "choices": [
      "A rerun hiding rather than explaining an intermittent failure",
      "An action interface promised but not implemented",
      "An unannounced breaking change in a shared action",
      "Troubleshooting detached from the failing execution"
    ],
    "answer": 3,
    "explanations": [
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here.",
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates troubleshooting detached from the failing execution."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-6-3",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · caselet 6 · interpretation",
    "prompt": "A composite action documents an output but never writes that output in its execution. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing provenance for organization-wide automation",
      "An action interface promised but not implemented",
      "An unannounced breaking change in a shared action",
      "Copy-based drift in shared automation"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an action interface promised but not implemented.",
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-8-3",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · caselet 8 · interpretation",
    "prompt": "An organization copies the same workflow into many repositories and fixes drift independently. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing provenance for organization-wide automation",
      "An unsafe trust boundary in workflow execution",
      "A moving dependency reference undermining reproducibility",
      "Copy-based drift in shared automation"
    ],
    "answer": 3,
    "explanations": [
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "This concerns an unsafe trust boundary in workflow execution, rather than the problem demonstrated here.",
      "This concerns a moving dependency reference undermining reproducibility, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates copy-based drift in shared automation."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-10-2",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · caselet 10 · verification",
    "prompt": "A workflow sends untrusted contribution code into a privileged job containing release credentials. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare actual test configuration across matrix combinations",
      "Trace the failing run to its exact job, step and inputs",
      "Verify that the contribution cannot execute with release authority",
      "Generate the relevant event and inspect whether a run is created"
    ],
    "answer": 2,
    "explanations": [
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This directly addresses an unsafe trust boundary in workflow execution.",
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-1-3",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 1 · interpretation",
    "prompt": "A deploy job appears below a test job in YAML but has no declared prerequisite. Which gap is demonstrated by the evidence?",
    "choices": [
      "Declared variation that never reaches the executed test",
      "Troubleshooting detached from the failing execution",
      "File order mistaken for a job dependency",
      "A trigger-filter mismatch preventing intended execution"
    ],
    "answer": 2,
    "explanations": [
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates file order mistaken for a job dependency.",
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-5-1",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · caselet 5 · decision",
    "prompt": "A dependency install fails intermittently, but reruns discard the original error evidence. Which response most directly addresses the stated problem?",
    "choices": [
      "Preserve and compare failure evidence before accepting a later green run",
      "Implement and test the promised output contract",
      "Manage the input contract as a versioned consumer interface",
      "Evaluate a versioned reusable workflow for shared behavior"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses a rerun hiding rather than explaining an intermittent failure.",
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here.",
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-7-1",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · caselet 7 · decision",
    "prompt": "An action changes its required input without communicating a versioned compatibility boundary. Which response most directly addresses the stated problem?",
    "choices": [
      "Record the workflow revision with the run and released artifact",
      "Separate untrusted execution from privileged credentials and contexts",
      "Manage the input contract as a versioned consumer interface",
      "Evaluate a versioned reusable workflow for shared behavior"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "This concerns an unsafe trust boundary in workflow execution, rather than the problem demonstrated here.",
      "This directly addresses an unannounced breaking change in a shared action.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-9-1",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · caselet 9 · decision",
    "prompt": "Teams cannot identify which reusable workflow revision produced a deployment. Which response most directly addresses the stated problem?",
    "choices": [
      "Record the workflow revision with the run and released artifact",
      "Express the job dependency and intended success condition explicitly",
      "Align the trigger filters with the intended event and branch",
      "Pass and consume the intended matrix value in the test invocation"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses missing provenance for organization-wide automation.",
      "This concerns file order mistaken for a job dependency, rather than the problem demonstrated here.",
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-10-3",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · caselet 10 · interpretation",
    "prompt": "A workflow sends untrusted contribution code into a privileged job containing release credentials. Which gap is demonstrated by the evidence?",
    "choices": [
      "Troubleshooting detached from the failing execution",
      "An unsafe trust boundary in workflow execution",
      "A trigger-filter mismatch preventing intended execution",
      "Declared variation that never reaches the executed test"
    ],
    "answer": 1,
    "explanations": [
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an unsafe trust boundary in workflow execution.",
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-2-1",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 2 · decision",
    "prompt": "A workflow’s branch filter excludes the branch used for the intended release event. Which response most directly addresses the stated problem?",
    "choices": [
      "Pass and consume the intended matrix value in the test invocation",
      "Inspect the failed job and step evidence first",
      "Preserve and compare failure evidence before accepting a later green run",
      "Align the trigger filters with the intended event and branch"
    ],
    "answer": 3,
    "explanations": [
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This directly addresses a trigger-filter mismatch preventing intended execution."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-5-2",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · caselet 5 · verification",
    "prompt": "A dependency install fails intermittently, but reruns discard the original error evidence. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Call the action from a consumer that asserts the output",
      "Exercise existing and updated consumers against the intended action revision",
      "Compare consumer behavior under a controlled shared workflow update",
      "Compare failed and successful dependency steps and conditions"
    ],
    "answer": 3,
    "explanations": [
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here.",
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here.",
      "This directly addresses a rerun hiding rather than explaining an intermittent failure."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-7-2",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · caselet 7 · verification",
    "prompt": "An action changes its required input without communicating a versioned compatibility boundary. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Verify that the contribution cannot execute with release authority",
      "Exercise existing and updated consumers against the intended action revision",
      "Compare consumer behavior under a controlled shared workflow update",
      "Trace a deployment back to its workflow version and inputs"
    ],
    "answer": 1,
    "explanations": [
      "This concerns an unsafe trust boundary in workflow execution, rather than the problem demonstrated here.",
      "This directly addresses an unannounced breaking change in a shared action.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here.",
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-9-2",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · caselet 9 · verification",
    "prompt": "Teams cannot identify which reusable workflow revision produced a deployment. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Run an intentionally failing prerequisite and observe deployment eligibility",
      "Generate the relevant event and inspect whether a run is created",
      "Compare actual test configuration across matrix combinations",
      "Trace a deployment back to its workflow version and inputs"
    ],
    "answer": 3,
    "explanations": [
      "This concerns file order mistaken for a job dependency, rather than the problem demonstrated here.",
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This directly addresses missing provenance for organization-wide automation."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-11-1",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · caselet 11 · decision",
    "prompt": "A dependency action follows a moving branch despite a requirement for reproducible release automation. Which response most directly addresses the stated problem?",
    "choices": [
      "Inspect the failed job and step evidence first",
      "Preserve and compare failure evidence before accepting a later green run",
      "Use an audited fixed revision with a deliberate update process",
      "Pass and consume the intended matrix value in the test invocation"
    ],
    "answer": 2,
    "explanations": [
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This directly addresses a moving dependency reference undermining reproducibility.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-2-2",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 2 · verification",
    "prompt": "A workflow’s branch filter excludes the branch used for the intended release event. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Trace the failing run to its exact job, step and inputs",
      "Compare failed and successful dependency steps and conditions",
      "Generate the relevant event and inspect whether a run is created",
      "Compare actual test configuration across matrix combinations"
    ],
    "answer": 2,
    "explanations": [
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This directly addresses a trigger-filter mismatch preventing intended execution.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-5-3",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · caselet 5 · interpretation",
    "prompt": "A dependency install fails intermittently, but reruns discard the original error evidence. Which gap is demonstrated by the evidence?",
    "choices": [
      "An unannounced breaking change in a shared action",
      "Copy-based drift in shared automation",
      "A rerun hiding rather than explaining an intermittent failure",
      "An action interface promised but not implemented"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an unannounced breaking change in a shared action, rather than the problem demonstrated here.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates a rerun hiding rather than explaining an intermittent failure.",
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-7-3",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · caselet 7 · interpretation",
    "prompt": "An action changes its required input without communicating a versioned compatibility boundary. Which gap is demonstrated by the evidence?",
    "choices": [
      "An unannounced breaking change in a shared action",
      "Copy-based drift in shared automation",
      "Missing provenance for organization-wide automation",
      "An unsafe trust boundary in workflow execution"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates an unannounced breaking change in a shared action.",
      "This concerns copy-based drift in shared automation, rather than the problem demonstrated here.",
      "This concerns missing provenance for organization-wide automation, rather than the problem demonstrated here.",
      "This concerns an unsafe trust boundary in workflow execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-9-3",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · caselet 9 · interpretation",
    "prompt": "Teams cannot identify which reusable workflow revision produced a deployment. Which gap is demonstrated by the evidence?",
    "choices": [
      "A trigger-filter mismatch preventing intended execution",
      "Declared variation that never reaches the executed test",
      "Missing provenance for organization-wide automation",
      "File order mistaken for a job dependency"
    ],
    "answer": 2,
    "explanations": [
      "This concerns a trigger-filter mismatch preventing intended execution, rather than the problem demonstrated here.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates missing provenance for organization-wide automation.",
      "This concerns file order mistaken for a job dependency, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-11-2",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · caselet 11 · verification",
    "prompt": "A dependency action follows a moving branch despite a requirement for reproducible release automation. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare failed and successful dependency steps and conditions",
      "Resolve the dependency reference to the intended immutable contents",
      "Compare actual test configuration across matrix combinations",
      "Trace the failing run to its exact job, step and inputs"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This directly addresses a moving dependency reference undermining reproducibility.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-2-3",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 2 · interpretation",
    "prompt": "A workflow’s branch filter excludes the branch used for the intended release event. Which gap is demonstrated by the evidence?",
    "choices": [
      "A rerun hiding rather than explaining an intermittent failure",
      "A trigger-filter mismatch preventing intended execution",
      "Declared variation that never reaches the executed test",
      "Troubleshooting detached from the failing execution"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates a trigger-filter mismatch preventing intended execution.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-11-3",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · caselet 11 · interpretation",
    "prompt": "A dependency action follows a moving branch despite a requirement for reproducible release automation. Which gap is demonstrated by the evidence?",
    "choices": [
      "A moving dependency reference undermining reproducibility",
      "Declared variation that never reaches the executed test",
      "Troubleshooting detached from the failing execution",
      "A rerun hiding rather than explaining an intermittent failure"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates a moving dependency reference undermining reproducibility.",
      "This concerns declared variation that never reaches the executed test, rather than the problem demonstrated here.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-3-1",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 3 · decision",
    "prompt": "A matrix expands one test across environments, but the script ignores the matrix input. Which response most directly addresses the stated problem?",
    "choices": [
      "Preserve and compare failure evidence before accepting a later green run",
      "Implement and test the promised output contract",
      "Pass and consume the intended matrix value in the test invocation",
      "Inspect the failed job and step evidence first"
    ],
    "answer": 2,
    "explanations": [
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here.",
      "This directly addresses declared variation that never reaches the executed test.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-3-2",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 3 · verification",
    "prompt": "A matrix expands one test across environments, but the script ignores the matrix input. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Call the action from a consumer that asserts the output",
      "Compare actual test configuration across matrix combinations",
      "Trace the failing run to its exact job, step and inputs",
      "Compare failed and successful dependency steps and conditions"
    ],
    "answer": 1,
    "explanations": [
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here.",
      "This directly addresses declared variation that never reaches the executed test.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-actions-case-3-3",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · caselet 3 · interpretation",
    "prompt": "A matrix expands one test across environments, but the script ignores the matrix input. Which gap is demonstrated by the evidence?",
    "choices": [
      "Declared variation that never reaches the executed test",
      "Troubleshooting detached from the failing execution",
      "A rerun hiding rather than explaining an intermittent failure",
      "An action interface promised but not implemented"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates declared variation that never reaches the executed test.",
      "This concerns troubleshooting detached from the failing execution, rather than the problem demonstrated here.",
      "This concerns a rerun hiding rather than explaining an intermittent failure, rather than the problem demonstrated here.",
      "This concerns an action interface promised but not implemented, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-3-1",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · caselet 3 · decision",
    "prompt": "A developer wants an explanation of an unfamiliar function, but the proposed task authorizes broad repository edits. Which response most directly addresses the stated problem?",
    "choices": [
      "Check the actual dependency version and local contract",
      "Supply and inspect the helper’s actual type and behavior",
      "Limit the task to the requested explanation and relevant context",
      "Inspect the proposed scope before approving changes"
    ],
    "answer": 2,
    "explanations": [
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here.",
      "This directly addresses tool authority exceeding a read-only explanation task.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-5-1",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · caselet 5 · decision",
    "prompt": "A suggestion assumes behavior from a familiar library version while the repository uses a different version. Which response most directly addresses the stated problem?",
    "choices": [
      "Check the actual dependency version and local contract",
      "Supply and inspect the helper’s actual type and behavior",
      "Include the compatibility constraint in the task context",
      "Clarify the general behavior and require representative cases"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses general knowledge substituted for repository-specific context.",
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here.",
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-7-1",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · caselet 7 · decision",
    "prompt": "A request describes a failure but omits the requirement that a public API must remain unchanged. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate the full delivery workflow rather than acceptance alone",
      "Replace working secrets with synthetic placeholders and approved context",
      "Include the compatibility constraint in the task context",
      "Clarify the general behavior and require representative cases"
    ],
    "answer": 2,
    "explanations": [
      "This concerns an interaction metric mistaken for overall productivity, rather than the problem demonstrated here.",
      "This concerns unnecessary credential disclosure in coding context, rather than the problem demonstrated here.",
      "This directly addresses missing constraints in a coding request.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-9-1",
    "track": "github-copilot",
    "domain": "d5",
    "objective": "Developer productivity · caselet 9 · decision",
    "prompt": "Suggestion acceptance increases while review and rework time rise. Which response most directly addresses the stated problem?",
    "choices": [
      "Evaluate the full delivery workflow rather than acceptance alone",
      "Keep generated explanation separate from behavioral evidence",
      "Limit the task to the requested explanation and relevant context",
      "Inspect the proposed scope before approving changes"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses an interaction metric mistaken for overall productivity.",
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-1-1",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · caselet 1 · decision",
    "prompt": "A generated refactor changes a documented public error response even though backward compatibility is required. Which response most directly addresses the stated problem?",
    "choices": [
      "Review the public contract and correct the incompatible behavior",
      "Keep generated explanation separate from behavioral evidence",
      "Limit the task to the requested explanation and relevant context",
      "Inspect the proposed scope before approving changes"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses generated implementation violating a compatibility constraint.",
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-3-2",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · caselet 3 · verification",
    "prompt": "A developer wants an explanation of an unfamiliar function, but the proposed task authorizes broad repository edits. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check the caller’s asynchronous handling against the real interface",
      "Inspect the proposed actions against the stated learning task",
      "Compare the diff and affected behavior with the requested task",
      "Exercise the proposed call against the repository’s installed interface"
    ],
    "answer": 1,
    "explanations": [
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here.",
      "This directly addresses tool authority exceeding a read-only explanation task.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-5-2",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · caselet 5 · verification",
    "prompt": "A suggestion assumes behavior from a familiar library version while the repository uses a different version. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Check the caller’s asynchronous handling against the real interface",
      "Compare the suggested patch against the unchanged public contract",
      "Test unseen relevant inputs rather than only the supplied example",
      "Exercise the proposed call against the repository’s installed interface"
    ],
    "answer": 3,
    "explanations": [
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here.",
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here.",
      "This directly addresses general knowledge substituted for repository-specific context."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-7-2",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · caselet 7 · verification",
    "prompt": "A request describes a failure but omits the requirement that a public API must remain unchanged. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Inspect the exact prompt for sensitive values before sending",
      "Compare the suggested patch against the unchanged public contract",
      "Test unseen relevant inputs rather than only the supplied example",
      "Compare accepted output with downstream review and repair effort"
    ],
    "answer": 1,
    "explanations": [
      "This concerns unnecessary credential disclosure in coding context, rather than the problem demonstrated here.",
      "This directly addresses missing constraints in a coding request.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here.",
      "This concerns an interaction metric mistaken for overall productivity, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-9-2",
    "track": "github-copilot",
    "domain": "d5",
    "objective": "Developer productivity · caselet 9 · verification",
    "prompt": "Suggestion acceptance increases while review and rework time rise. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare the claim with independent checks of the relevant behavior",
      "Inspect the proposed actions against the stated learning task",
      "Compare the diff and affected behavior with the requested task",
      "Compare accepted output with downstream review and repair effort"
    ],
    "answer": 3,
    "explanations": [
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This directly addresses an interaction metric mistaken for overall productivity."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-10-1",
    "track": "github-copilot",
    "domain": "d6",
    "objective": "Privacy and safeguards · caselet 10 · decision",
    "prompt": "A user includes an actual private key in a prompt because it makes the example runnable. Which response most directly addresses the stated problem?",
    "choices": [
      "Limit the task to the requested explanation and relevant context",
      "Inspect the proposed scope before approving changes",
      "Check the actual dependency version and local contract",
      "Replace working secrets with synthetic placeholders and approved context"
    ],
    "answer": 3,
    "explanations": [
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This directly addresses unnecessary credential disclosure in coding context."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-1-2",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · caselet 1 · verification",
    "prompt": "A generated refactor changes a documented public error response even though backward compatibility is required. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare the claim with independent checks of the relevant behavior",
      "Inspect the proposed actions against the stated learning task",
      "Compare the diff and affected behavior with the requested task",
      "Run independent caller checks for the promised error behavior"
    ],
    "answer": 3,
    "explanations": [
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This directly addresses generated implementation violating a compatibility constraint."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-3-3",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · caselet 3 · interpretation",
    "prompt": "A developer wants an explanation of an unfamiliar function, but the proposed task authorizes broad repository edits. Which gap is demonstrated by the evidence?",
    "choices": [
      "Tool authority exceeding a read-only explanation task",
      "Approval without reviewing the proposed change scope",
      "General knowledge substituted for repository-specific context",
      "A name-based assumption about asynchronous behavior"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates tool authority exceeding a read-only explanation task.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-5-3",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · caselet 5 · interpretation",
    "prompt": "A suggestion assumes behavior from a familiar library version while the repository uses a different version. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing constraints in a coding request",
      "Overfitting a patch to one demonstration",
      "General knowledge substituted for repository-specific context",
      "A name-based assumption about asynchronous behavior"
    ],
    "answer": 2,
    "explanations": [
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates general knowledge substituted for repository-specific context.",
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-7-3",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · caselet 7 · interpretation",
    "prompt": "A request describes a failure but omits the requirement that a public API must remain unchanged. Which gap is demonstrated by the evidence?",
    "choices": [
      "Missing constraints in a coding request",
      "Overfitting a patch to one demonstration",
      "An interaction metric mistaken for overall productivity",
      "Unnecessary credential disclosure in coding context"
    ],
    "answer": 0,
    "explanations": [
      "The supplied evidence demonstrates missing constraints in a coding request.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here.",
      "This concerns an interaction metric mistaken for overall productivity, rather than the problem demonstrated here.",
      "This concerns unnecessary credential disclosure in coding context, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-9-3",
    "track": "github-copilot",
    "domain": "d5",
    "objective": "Developer productivity · caselet 9 · interpretation",
    "prompt": "Suggestion acceptance increases while review and rework time rise. Which gap is demonstrated by the evidence?",
    "choices": [
      "Tool authority exceeding a read-only explanation task",
      "Approval without reviewing the proposed change scope",
      "An interaction metric mistaken for overall productivity",
      "Plausible reasoning mistaken for verification"
    ],
    "answer": 2,
    "explanations": [
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates an interaction metric mistaken for overall productivity.",
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-10-2",
    "track": "github-copilot",
    "domain": "d6",
    "objective": "Privacy and safeguards · caselet 10 · verification",
    "prompt": "A user includes an actual private key in a prompt because it makes the example runnable. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare the diff and affected behavior with the requested task",
      "Exercise the proposed call against the repository’s installed interface",
      "Inspect the exact prompt for sensitive values before sending",
      "Inspect the proposed actions against the stated learning task"
    ],
    "answer": 2,
    "explanations": [
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This directly addresses unnecessary credential disclosure in coding context.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-1-3",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · caselet 1 · interpretation",
    "prompt": "A generated refactor changes a documented public error response even though backward compatibility is required. Which gap is demonstrated by the evidence?",
    "choices": [
      "Tool authority exceeding a read-only explanation task",
      "Approval without reviewing the proposed change scope",
      "Generated implementation violating a compatibility constraint",
      "Plausible reasoning mistaken for verification"
    ],
    "answer": 2,
    "explanations": [
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates generated implementation violating a compatibility constraint.",
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-4-1",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · caselet 4 · decision",
    "prompt": "A coding assistant proposes a multi-file change, but the developer has not examined the affected files. Which response most directly addresses the stated problem?",
    "choices": [
      "Include the compatibility constraint in the task context",
      "Inspect the proposed scope before approving changes",
      "Check the actual dependency version and local contract",
      "Supply and inspect the helper’s actual type and behavior"
    ],
    "answer": 1,
    "explanations": [
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here.",
      "This directly addresses approval without reviewing the proposed change scope.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-6-1",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · caselet 6 · decision",
    "prompt": "A helper’s name suggests it returns a value, but its actual contract returns a promise. Which response most directly addresses the stated problem?",
    "choices": [
      "Include the compatibility constraint in the task context",
      "Clarify the general behavior and require representative cases",
      "Evaluate the full delivery workflow rather than acceptance alone",
      "Supply and inspect the helper’s actual type and behavior"
    ],
    "answer": 3,
    "explanations": [
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here.",
      "This concerns an interaction metric mistaken for overall productivity, rather than the problem demonstrated here.",
      "This directly addresses a name-based assumption about asynchronous behavior."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-8-1",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · caselet 8 · decision",
    "prompt": "An assistant repairs one example by hard-coding its exact input. Which response most directly addresses the stated problem?",
    "choices": [
      "Limit the task to the requested explanation and relevant context",
      "Clarify the general behavior and require representative cases",
      "Review the public contract and correct the incompatible behavior",
      "Keep generated explanation separate from behavioral evidence"
    ],
    "answer": 1,
    "explanations": [
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This directly addresses overfitting a patch to one demonstration.",
      "This concerns generated implementation violating a compatibility constraint, rather than the problem demonstrated here.",
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-10-3",
    "track": "github-copilot",
    "domain": "d6",
    "objective": "Privacy and safeguards · caselet 10 · interpretation",
    "prompt": "A user includes an actual private key in a prompt because it makes the example runnable. Which gap is demonstrated by the evidence?",
    "choices": [
      "General knowledge substituted for repository-specific context",
      "Unnecessary credential disclosure in coding context",
      "Tool authority exceeding a read-only explanation task",
      "Approval without reviewing the proposed change scope"
    ],
    "answer": 1,
    "explanations": [
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates unnecessary credential disclosure in coding context.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-2-1",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · caselet 2 · decision",
    "prompt": "A reviewer treats a convincing explanation as equivalent to executing independent tests. Which response most directly addresses the stated problem?",
    "choices": [
      "Limit the task to the requested explanation and relevant context",
      "Inspect the proposed scope before approving changes",
      "Check the actual dependency version and local contract",
      "Keep generated explanation separate from behavioral evidence"
    ],
    "answer": 3,
    "explanations": [
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This directly addresses plausible reasoning mistaken for verification."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-4-2",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · caselet 4 · verification",
    "prompt": "A coding assistant proposes a multi-file change, but the developer has not examined the affected files. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare the diff and affected behavior with the requested task",
      "Exercise the proposed call against the repository’s installed interface",
      "Check the caller’s asynchronous handling against the real interface",
      "Compare the suggested patch against the unchanged public contract"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses approval without reviewing the proposed change scope.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here.",
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-6-2",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · caselet 6 · verification",
    "prompt": "A helper’s name suggests it returns a value, but its actual contract returns a promise. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Test unseen relevant inputs rather than only the supplied example",
      "Compare accepted output with downstream review and repair effort",
      "Check the caller’s asynchronous handling against the real interface",
      "Compare the suggested patch against the unchanged public contract"
    ],
    "answer": 2,
    "explanations": [
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here.",
      "This concerns an interaction metric mistaken for overall productivity, rather than the problem demonstrated here.",
      "This directly addresses a name-based assumption about asynchronous behavior.",
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-8-2",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · caselet 8 · verification",
    "prompt": "An assistant repairs one example by hard-coding its exact input. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Test unseen relevant inputs rather than only the supplied example",
      "Run independent caller checks for the promised error behavior",
      "Compare the claim with independent checks of the relevant behavior",
      "Inspect the proposed actions against the stated learning task"
    ],
    "answer": 0,
    "explanations": [
      "This directly addresses overfitting a patch to one demonstration.",
      "This concerns generated implementation violating a compatibility constraint, rather than the problem demonstrated here.",
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-2-2",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · caselet 2 · verification",
    "prompt": "A reviewer treats a convincing explanation as equivalent to executing independent tests. Which check most directly tests whether that problem was addressed?",
    "choices": [
      "Compare the diff and affected behavior with the requested task",
      "Exercise the proposed call against the repository’s installed interface",
      "Compare the claim with independent checks of the relevant behavior",
      "Inspect the proposed actions against the stated learning task"
    ],
    "answer": 2,
    "explanations": [
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here.",
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This directly addresses plausible reasoning mistaken for verification.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-4-3",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · caselet 4 · interpretation",
    "prompt": "A coding assistant proposes a multi-file change, but the developer has not examined the affected files. Which gap is demonstrated by the evidence?",
    "choices": [
      "General knowledge substituted for repository-specific context",
      "A name-based assumption about asynchronous behavior",
      "Missing constraints in a coding request",
      "Approval without reviewing the proposed change scope"
    ],
    "answer": 3,
    "explanations": [
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "This concerns a name-based assumption about asynchronous behavior, rather than the problem demonstrated here.",
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates approval without reviewing the proposed change scope."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-6-3",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · caselet 6 · interpretation",
    "prompt": "A helper’s name suggests it returns a value, but its actual contract returns a promise. Which gap is demonstrated by the evidence?",
    "choices": [
      "An interaction metric mistaken for overall productivity",
      "A name-based assumption about asynchronous behavior",
      "Missing constraints in a coding request",
      "Overfitting a patch to one demonstration"
    ],
    "answer": 1,
    "explanations": [
      "This concerns an interaction metric mistaken for overall productivity, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates a name-based assumption about asynchronous behavior.",
      "This concerns missing constraints in a coding request, rather than the problem demonstrated here.",
      "This concerns overfitting a patch to one demonstration, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-8-3",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · caselet 8 · interpretation",
    "prompt": "An assistant repairs one example by hard-coding its exact input. Which gap is demonstrated by the evidence?",
    "choices": [
      "Generated implementation violating a compatibility constraint",
      "Plausible reasoning mistaken for verification",
      "Tool authority exceeding a read-only explanation task",
      "Overfitting a patch to one demonstration"
    ],
    "answer": 3,
    "explanations": [
      "This concerns generated implementation violating a compatibility constraint, rather than the problem demonstrated here.",
      "This concerns plausible reasoning mistaken for verification, rather than the problem demonstrated here.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates overfitting a patch to one demonstration."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  },
  {
    "id": "github-copilot-case-2-3",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · caselet 2 · interpretation",
    "prompt": "A reviewer treats a convincing explanation as equivalent to executing independent tests. Which gap is demonstrated by the evidence?",
    "choices": [
      "General knowledge substituted for repository-specific context",
      "Plausible reasoning mistaken for verification",
      "Tool authority exceeding a read-only explanation task",
      "Approval without reviewing the proposed change scope"
    ],
    "answer": 1,
    "explanations": [
      "This concerns general knowledge substituted for repository-specific context, rather than the problem demonstrated here.",
      "The supplied evidence demonstrates plausible reasoning mistaken for verification.",
      "This concerns tool authority exceeding a read-only explanation task, rather than the problem demonstrated here.",
      "This concerns approval without reviewing the proposed change scope, rather than the problem demonstrated here."
    ],
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "reviewed": "2026-11-15"
  }
];
