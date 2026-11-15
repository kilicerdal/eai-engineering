import type {CertTrack,CertQuestion} from './certification-content';
// Original eAI scenarios, mapped to selected official guide concepts.
export const expandedTracks:CertTrack[]=[
  {
    "id": "solutions-architect",
    "title": "AWS Solutions Architect – Associate",
    "code": "SAA-C03",
    "version": "SAA-C03 · current online exam guide",
    "intro": "Design secure, resilient systems and explain performance and cost trade-offs.",
    "guide": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
    "domains": [
      {
        "id": "d1",
        "title": "Secure architectures",
        "weight": 30,
        "lesson": "Security starts with trust boundaries. Prefer temporary workload credentials, restrict resource access, encrypt sensitive data and separate public entry points from private processing. A network boundary does not replace identity authorization.",
        "check": "How would a private workload obtain only the permissions it needs?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "How would a private workload obtain only the permissions it needs? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d2",
        "title": "Resilient architectures",
        "weight": 26,
        "lesson": "Design around the failure you need to tolerate. Multiple Availability Zones reduce a single-zone dependency; queues decouple producers from workers. Replication and backups solve different problems, so verify recovery objectives with a restore exercise.",
        "check": "Which failure would replication survive, and which would require a backup?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which failure would replication survive, and which would require a backup? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d3",
        "title": "High-performing architectures",
        "weight": 24,
        "lesson": "Choose storage and compute from access patterns. A cache helps repeat reads but introduces freshness decisions. Read replicas serve suitable read traffic; they are not a universal substitute for transactional consistency or write scaling.",
        "check": "What freshness requirement would make a cache unsuitable?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What freshness requirement would make a cache unsuitable? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d4",
        "title": "Cost-optimized architectures",
        "weight": 20,
        "lesson": "Cost optimization includes utilization, data movement and operating effort. Choose a purchasing option only after measuring demand. A cheaper hourly rate may be a poor fit if the application cannot tolerate interruption or a long commitment.",
        "check": "Which workload constraints must be known before choosing Spot?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which workload constraints must be known before choosing Spot? Record the evidence you would need before acting."
          }
        ]
      }
    ]
  },
  {
    "id": "developer-associate",
    "title": "AWS Developer – Associate",
    "code": "DVA-C03",
    "version": "DVA-C03 · upcoming exam from December 1, 2026",
    "intro": "Build, test, secure and troubleshoot AWS applications, including AI-assisted development.",
    "guide": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html",
    "domains": [
      {
        "id": "d1",
        "title": "Development with AWS Services",
        "weight": 30,
        "lesson": "Design application handlers for retries, partial failure and external configuration. SDK calls can fail after a side effect has occurred. Use stable operation identifiers and verify generated code against the actual service contract before accepting it.",
        "check": "How do you prevent a repeated event from creating a second order?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "How do you prevent a repeated event from creating a second order? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d2",
        "title": "Security",
        "weight": 26,
        "lesson": "Use temporary roles, restrict resource permissions and keep secrets out of repositories and logs. Encryption protects data in particular states; authorization controls who may access it. Diagnose denied requests before broadening access.",
        "check": "What evidence distinguishes a permissions error from a programming error?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What evidence distinguishes a permissions error from a programming error? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d3",
        "title": "Testing and Deployment",
        "weight": 22,
        "lesson": "Test changes at suitable levels and release in controlled increments. Validate configuration and rollback behavior as well as happy-path code. AI-generated tests still need independent assertions against requirements rather than the implementation alone.",
        "check": "What would make a generated test pass even when the business behavior is wrong?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What would make a generated test pass even when the business behavior is wrong? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d4",
        "title": "Troubleshooting and Optimization",
        "weight": 22,
        "lesson": "Trace a request across components using correlated logs and metrics. Identify whether latency comes from initialization, downstream work or retries before optimizing. Log enough context for diagnosis without recording credentials or sensitive payloads.",
        "check": "Which measurements would isolate a slow dependency?",
        "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which measurements would isolate a slow dependency? Record the evidence you would need before acting."
          }
        ]
      }
    ]
  },
  {
    "id": "test-automation",
    "title": "ISTQB Test Automation Engineering",
    "code": "CTAL-TAE",
    "version": "CTAL-TAE · syllabus v2.0",
    "intro": "Build sustainable test automation from architecture to reliable delivery.",
    "guide": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
    "domains": [
      {
        "id": "d1",
        "title": "Objectives for automation",
        "weight": 12.5,
        "lesson": "Automation should support explicit testing objectives. A repeatable check is valuable when its assertion detects a meaningful problem. Consider feedback time, maintainability and business risk instead of treating script count as proof of quality.",
        "check": "Which measurable testing objective would justify this automation?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which measurable testing objective would justify this automation? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d2",
        "title": "Preparing for automation",
        "weight": 12.5,
        "lesson": "Evaluate the system’s testability, interfaces, environment and team skills before selecting tools. A pilot should expose constraints using representative tasks and evidence. Vendor demonstrations alone do not prove suitability in your delivery context.",
        "check": "What would a representative automation pilot need to exercise?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What would a representative automation pilot need to exercise? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d3",
        "title": "Automation architecture",
        "weight": 12.5,
        "lesson": "Separate reusable domain actions, test data, adapters and reporting. Make dependencies explicit so an interface change can be handled in one layer. Architecture should support understandable failures, not merely hide every detail behind abstraction.",
        "check": "Which layer should change when a transport API changes?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which layer should change when a transport API changes? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d4",
        "title": "Implementing automation",
        "weight": 12.5,
        "lesson": "Treat automation code as maintained software. Keep tests isolated, control test data and handle asynchronous behavior explicitly. Reliable synchronization waits for an observable condition with a bound rather than relying on lucky timing.",
        "check": "How can you remove timing assumptions without masking failures?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "How can you remove timing assumptions without masking failures? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d5",
        "title": "Deployment and CI/CD",
        "weight": 12.5,
        "lesson": "Introduce automation gradually and choose checks that fit pipeline feedback needs. A reliable fast gate and a broader later suite can serve different purposes. Preserve logs and results so failures can be investigated instead of rerunning blindly.",
        "check": "Which checks should block a change and why?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which checks should block a change and why? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d6",
        "title": "Reporting and metrics",
        "weight": 12.5,
        "lesson": "Reports should help a reader distinguish product failures, environment failures and automation defects. Trends require consistent definitions. A high pass percentage is incomplete without the risk coverage, skipped checks and reliability of the test system.",
        "check": "Which context makes a pass-rate trend interpretable?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which context makes a pass-rate trend interpretable? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d7",
        "title": "Verifying automation",
        "weight": 12.5,
        "lesson": "Verify that the test infrastructure and assertions actually detect intended failures. A green pipeline can be broken if checks never execute or assertions are ineffective. Use controlled changes and check result propagation rather than trusting presentation alone.",
        "check": "How would you demonstrate that a gate can reject a known defect?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "How would you demonstrate that a gate can reject a known defect? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d8",
        "title": "Continuous improvement",
        "weight": 12.5,
        "lesson": "Use failure patterns and maintenance evidence to improve the automation solution. Prioritize improvements by their effect on feedback and trust. Review obsolete checks as behavior evolves, while preserving the testing objective before removing coverage.",
        "check": "Which improvement would reduce the greatest recurring feedback cost?",
        "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which improvement would reduce the greatest recurring feedback cost? Record the evidence you would need before acting."
          }
        ]
      }
    ]
  },
  {
    "id": "ai-testing",
    "title": "ISTQB AI Testing",
    "code": "CT-AI",
    "version": "CT-AI · syllabus v2.0",
    "intro": "Test AI-based systems: their data, models, behavior and development lifecycle.",
    "guide": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
    "domains": [
      {
        "id": "d1",
        "title": "AI foundations",
        "weight": 14,
        "lesson": "AI systems learn or infer patterns rather than relying only on explicitly programmed rules. Their outputs can vary with data and configuration. Identify the system boundary and intended use before deciding what evidence would establish acceptable behavior.",
        "check": "Which system behavior is probabilistic, and how will you test it?",
        "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which system behavior is probabilistic, and how will you test it? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d2",
        "title": "AI quality and acceptance",
        "weight": 14,
        "lesson": "Functional accuracy alone does not establish an AI system’s quality. Consider robustness, fairness, explainability and the intended population. Acceptance criteria should name the measurable behavior, evaluation population and consequences of different errors.",
        "check": "Which groups and failure costs belong in the acceptance criteria?",
        "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which groups and failure costs belong in the acceptance criteria? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d3",
        "title": "Machine learning and metrics",
        "weight": 16,
        "lesson": "Keep training, validation and test roles distinct to avoid optimistic evaluation. Classification metrics reflect different error types. Precision asks how many predicted positives were correct; recall asks how many actual positives were found.",
        "check": "When is recall more useful than accuracy?",
        "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "When is recall more useful than accuracy? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d4",
        "title": "Testing AI-based systems",
        "weight": 14,
        "lesson": "Combine examples with properties and perturbations suited to the AI system. For generative outputs, evaluate factual support, harmful content and instruction boundaries. Neither a plausible response nor one successful run establishes reliable performance across contexts.",
        "check": "What would challenge a fluent but unsupported answer?",
        "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What would challenge a fluent but unsupported answer? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d5",
        "title": "Input data testing",
        "weight": 14,
        "lesson": "Inspect provenance, labeling quality, representativeness and transformations. Missing values or shifted units can change model behavior without a model-code change. Preserve data separation and compare incoming distributions with the assumptions used for evaluation.",
        "check": "Which data transformation could silently change the meaning of an input?",
        "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which data transformation could silently change the meaning of an input? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d6",
        "title": "Model testing",
        "weight": 14,
        "lesson": "Evaluate a fixed model against independent examples and meaningful quality criteria. Analyze errors by relevant slices instead of only averages. Compare baselines under the same data and conditions; a larger model is not automatically a better system.",
        "check": "Which evidence would justify replacing the baseline?",
        "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which evidence would justify replacing the baseline? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d7",
        "title": "ML development testing",
        "weight": 14,
        "lesson": "Test the pipeline that builds the model as well as the resulting model. Track data, code and configuration versions so results can be explained. Monitor production assumptions and plan responses to drift without allowing uncontrolled updates.",
        "check": "What versions are needed to reproduce this model evaluation?",
        "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What versions are needed to reproduce this model evaluation? Record the evidence you would need before acting."
          }
        ]
      }
    ]
  },
  {
    "id": "generative-ai-testing",
    "title": "ISTQB Testing with Generative AI",
    "code": "CT-GenAI",
    "version": "CT-GenAI · syllabus v1.1",
    "intro": "Use generative AI responsibly throughout the testing process.",
    "guide": "https://istqb.org/certifications/gen-ai/",
    "domains": [
      {
        "id": "d1",
        "title": "GenAI for software testing",
        "weight": 20,
        "lesson": "GenAI can draft test ideas, summarize evidence and assist with automation. It can also invent requirements or produce plausible errors. Treat outputs as candidates for review against the test basis, not as an authoritative oracle.",
        "check": "Which requirement supports each generated test idea?",
        "source": "https://istqb.org/certifications/gen-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which requirement supports each generated test idea? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d2",
        "title": "Prompt engineering",
        "weight": 20,
        "lesson": "Supply a clear task, relevant context, constraints and desired output format. Ask the assistant to identify missing information instead of inventing it. Evaluate the result against requirements and refine the prompt based on observed failures.",
        "check": "What missing constraint would change the generated cases?",
        "source": "https://istqb.org/certifications/gen-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What missing constraint would change the generated cases? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d3",
        "title": "Risks in GenAI testing",
        "weight": 20,
        "lesson": "Manage hallucination, bias, privacy and security throughout the workflow. Minimize sensitive inputs and verify outputs before execution. Untrusted retrieved text may contain instructions that conflict with the task; it must not grant additional authority.",
        "check": "Which information should be removed before sending test data?",
        "source": "https://istqb.org/certifications/gen-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which information should be removed before sending test data? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d4",
        "title": "LLM-powered testing solutions",
        "weight": 20,
        "lesson": "A retrieval pipeline can supply relevant test context without changing model weights. Evaluation still needs representative cases, provenance and output checks. Select an architecture from the information gap rather than assuming fine-tuning solves freshness or access control.",
        "check": "Does this gap require current context or changed learned behavior?",
        "source": "https://istqb.org/certifications/gen-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Does this gap require current context or changed learned behavior? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d5",
        "title": "Adoption in test organizations",
        "weight": 20,
        "lesson": "Pilot GenAI with clear goals, approved data and review responsibilities. Compare outcomes with a baseline and include review cost and errors in the evaluation. Scale only when evidence supports the intended use and controls remain workable.",
        "check": "What would count as a successful pilot beyond generated output volume?",
        "source": "https://istqb.org/certifications/gen-ai/",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What would count as a successful pilot beyond generated output volume? Record the evidence you would need before acting."
          }
        ]
      }
    ]
  },
  {
    "id": "github-actions",
    "title": "GitHub Actions",
    "code": "GH-200",
    "version": "GH-200 · skills measured January 2026",
    "intro": "Build secure workflows, diagnose failures and maintain reusable automation.",
    "guide": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
    "domains": [
      {
        "id": "d1",
        "title": "Author and manage workflows",
        "weight": 24,
        "lesson": "A workflow defines events, jobs and steps. Jobs can run independently unless dependencies are declared. Pass outputs explicitly, use matrices intentionally and distinguish a reusable workflow from an action that packages step logic.",
        "check": "Which job dependency must be explicit before deployment?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which job dependency must be explicit before deployment? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d2",
        "title": "Consume and troubleshoot workflows",
        "weight": 19,
        "lesson": "Read triggers, conditions and logs before changing a failing workflow. Artifacts preserve outputs across jobs or for later inspection; caches accelerate reusable dependencies. A restored cache is not proof that a release artifact was built from the current change.",
        "check": "Which log identifies the first failing step rather than a downstream symptom?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which log identifies the first failing step rather than a downstream symptom? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d3",
        "title": "Author and maintain actions",
        "weight": 19,
        "lesson": "Choose between composite actions, JavaScript actions and container actions based on execution needs. Define a clear input/output contract and test it with representative workflows. Version reusable behavior so consumers can manage changes deliberately.",
        "check": "Which interface must consumers be able to rely on?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which interface must consumers be able to rely on? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d4",
        "title": "Manage enterprise automation",
        "weight": 24,
        "lesson": "Set organization policies for approved actions, runner access and reusable workflows. Self-hosted runners require lifecycle and trust-boundary decisions. Centralization can improve consistency but should not give untrusted changes access to privileged infrastructure.",
        "check": "Which repositories and events may use a privileged runner?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which repositories and events may use a privileged runner? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d5",
        "title": "Secure and optimize automation",
        "weight": 14,
        "lesson": "Limit token permissions and avoid exposing secrets to untrusted inputs. OIDC can replace long-lived cloud credentials when the cloud trust policy restricts the workflow identity. Pin dependencies and review changes; caching and concurrency should preserve correctness.",
        "check": "Which trust restriction prevents an unrelated workflow assuming the deployment role?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which trust restriction prevents an unrelated workflow assuming the deployment role? Record the evidence you would need before acting."
          }
        ]
      }
    ]
  },
  {
    "id": "github-copilot",
    "title": "GitHub Copilot",
    "code": "GH-300",
    "version": "GH-300 · skills measured August 7, 2026",
    "intro": "Use AI assistance with good context, independent review and privacy controls.",
    "guide": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    "domains": [
      {
        "id": "d1",
        "title": "Responsible AI use",
        "weight": 18,
        "lesson": "AI assistance can accelerate drafting but responsibility for the resulting change remains with the team. Verify correctness, security and suitability with independent evidence. A confident explanation is not authorization to merge or deploy.",
        "check": "What evidence should be required before accepting generated code?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What evidence should be required before accepting generated code? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d2",
        "title": "Copilot features",
        "weight": 28,
        "lesson": "Choose a completion, conversation, edit or agent workflow to match the task’s scope. Review proposed file changes and tool actions before accepting them. Feature availability can depend on plan, organization policy and client, so verify the current documentation.",
        "check": "Does this task need a suggestion or a multi-step change with review?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Does this task need a suggestion or a multi-step change with review? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d3",
        "title": "Data and architecture",
        "weight": 14,
        "lesson": "An AI request is assembled from instructions and available context. Context selection and limits affect what the assistant can use. Do not assume it has read every repository file or knows current private requirements unless they were actually supplied.",
        "check": "Which missing context could explain this incorrect suggestion?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which missing context could explain this incorrect suggestion? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d4",
        "title": "Prompt engineering and context",
        "weight": 14,
        "lesson": "State the goal, relevant code, constraints and expected result. Use small examples when they disambiguate behavior. Break broad tasks into reviewable steps and ask for missing information rather than accepting invented requirements.",
        "check": "What example would distinguish two possible interpretations?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "What example would distinguish two possible interpretations? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d5",
        "title": "Developer productivity",
        "weight": 13,
        "lesson": "Measure productivity across understanding, review, testing and maintenance, not just generation speed. Use assistance for candidate tests or documentation while checking that assertions and descriptions match reality. Smaller reviewed changes are easier to assess.",
        "check": "Does this generated test fail when the targeted defect is introduced?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Does this generated test fail when the targeted defect is introduced? Record the evidence you would need before acting."
          }
        ]
      },
      {
        "id": "d6",
        "title": "Privacy and safeguards",
        "weight": 13,
        "lesson": "Check organization policy, supported exclusions and current feature limitations before supplying sensitive context. Exclusions and filters are controls with defined scope, not blanket guarantees. Limit tool permissions and independently review generated output and dependencies.",
        "check": "Which data is unnecessary for the task and should be omitted?",
        "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
        "connections": [
          {
            "title": "Investigate the engineering",
            "href": "/engineering/lab",
            "task": "Which data is unnecessary for the task and should be omitted? Record the evidence you would need before acting."
          }
        ]
      }
    ]
  }
];
export const expandedQuestions:CertQuestion[]=[
  {
    "id": "solutions-architect-01",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · selected concept",
    "prompt": "An EC2 application needs S3 access without storing access keys. Which approach fits?",
    "choices": [
      "Attach a least-privilege IAM role through an instance profile",
      "Embed a root access key",
      "Put an access key in the AMI",
      "Make the bucket public"
    ],
    "answer": 0,
    "explanations": [
      "The workload can obtain temporary role credentials without embedded keys.",
      "Root credentials exceed the application need.",
      "An image can expose persistent credentials to every instance.",
      "Public data access removes the required identity boundary."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "solutions-architect-02",
    "track": "solutions-architect",
    "domain": "d1",
    "objective": "Secure architectures · selected concept",
    "prompt": "A database must accept traffic only from application instances behind a load balancer. What is a suitable security-group source?",
    "choices": [
      "0.0.0.0/0 on the database port",
      "The developer’s home DNS name",
      "All AWS accounts automatically",
      "The application instances’ security group"
    ],
    "answer": 3,
    "explanations": [
      "An internet-wide source exceeds the stated requirement.",
      "A DNS name is not a security-group source identifier.",
      "Accounts are not automatically trusted network sources.",
      "Referencing the application group scopes traffic to its associated interfaces."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "solutions-architect-03",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · selected concept",
    "prompt": "A web tier must survive loss of one Availability Zone. Which design best fits?",
    "choices": [
      "One larger instance",
      "A longer DNS TTL alone",
      "Instances across multiple AZs behind a load balancer",
      "Two instances in the same AZ only"
    ],
    "answer": 2,
    "explanations": [
      "A larger instance still fails as one component.",
      "Caching a DNS answer does not create redundant compute.",
      "Independent zones remove the single-zone dependency from the web tier.",
      "Two instances still share the same zone failure risk."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "solutions-architect-04",
    "track": "solutions-architect",
    "domain": "d2",
    "objective": "Resilient architectures · selected concept",
    "prompt": "A worker fleet cannot keep up with brief order bursts. What decouples acceptance from processing?",
    "choices": [
      "Only increase the client timeout",
      "A durable queue with idempotent consumers",
      "Synchronous retries without limits",
      "Discard every request above normal rate"
    ],
    "answer": 1,
    "explanations": [
      "A longer wait does not buffer or safely process work.",
      "A queue buffers work while idempotency protects retries.",
      "Unbounded synchronous retries can amplify overload.",
      "Discarding accepted business work violates durability needs."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "solutions-architect-05",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · selected concept",
    "prompt": "A product page repeatedly reads the same public images worldwide. Which service is designed to cache them near viewers?",
    "choices": [
      "Amazon CloudFront",
      "AWS CloudTrail",
      "AWS KMS",
      "AWS Organizations"
    ],
    "answer": 0,
    "explanations": [
      "An edge distribution reduces repeated origin fetches and viewer latency.",
      "Audit events do not deliver cached web images.",
      "Key management is not a content-delivery network.",
      "Account governance does not cache content."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "solutions-architect-06",
    "track": "solutions-architect",
    "domain": "d3",
    "objective": "High-performing architectures · selected concept",
    "prompt": "A relational database is overloaded by reports that tolerate replication lag. What can offload suitable queries?",
    "choices": [
      "More writes to the primary",
      "A larger DNS zone",
      "Disabling all indexes without analysis",
      "A read replica"
    ],
    "answer": 3,
    "explanations": [
      "Additional writes add work to the constrained primary.",
      "DNS size does not add database query capacity.",
      "Removing indexes blindly can make read performance worse.",
      "A replica can serve read workloads where lag is acceptable."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "solutions-architect-07",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · selected concept",
    "prompt": "A restartable batch job tolerates interruptions. Which EC2 purchasing option is worth evaluating?",
    "choices": [
      "Only On-Demand with no comparison",
      "A commitment exceeding expected demand",
      "Spot Instances",
      "Dedicated Hosts as the default cheapest option"
    ],
    "answer": 2,
    "explanations": [
      "On-Demand can work, but ignores the stated flexibility.",
      "Unused commitments can increase effective cost.",
      "Spot can suit flexible interruptible batch work.",
      "Dedicated hardware is not the default low-cost batch choice."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "solutions-architect-08",
    "track": "solutions-architect",
    "domain": "d4",
    "objective": "Cost-optimized architectures · selected concept",
    "prompt": "Objects are rarely read after 90 days but must be retained. What should be evaluated?",
    "choices": [
      "Duplicate every object in every Region automatically",
      "An S3 lifecycle transition with retrieval needs considered",
      "Delete the objects immediately",
      "Keep all data in the most expensive tier forever"
    ],
    "answer": 1,
    "explanations": [
      "Unneeded copies add costs without a stated requirement.",
      "Lifecycle tiers can reduce storage cost subject to access and retrieval requirements.",
      "Deletion conflicts with retention.",
      "Ignoring access patterns misses a cost opportunity."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
  },
  {
    "id": "developer-associate-01",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · selected concept",
    "prompt": "A Lambda handler may receive the same payment event twice. What should its application logic do?",
    "choices": [
      "Use a persistent idempotency key and atomic duplicate check",
      "Assume delivery is always exactly once",
      "Generate a new payment identifier on every retry",
      "Ignore the event identifier"
    ],
    "answer": 0,
    "explanations": [
      "Persistent deduplication can protect the business side effect across retries.",
      "Delivery mechanisms can produce repeated processing.",
      "New identifiers make retries look like new payments.",
      "Discarding the stable identity prevents deduplication."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "developer-associate-02",
    "track": "developer-associate",
    "domain": "d1",
    "objective": "Development with AWS Services · selected concept",
    "prompt": "An AI assistant proposes an SDK method that does not exist. What is the next step?",
    "choices": [
      "Deploy because the snippet is syntactically plausible",
      "Add a comment saying the call is correct",
      "Grant administrator access to make the method appear",
      "Check the official SDK API and test the corrected call"
    ],
    "answer": 3,
    "explanations": [
      "Plausible syntax does not establish an available method.",
      "A comment cannot repair an invalid API call.",
      "Authorization cannot create an absent SDK method.",
      "API verification and execution evidence address the actual defect."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "developer-associate-03",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · selected concept",
    "prompt": "A function needs a rotating database password. Where should it retrieve the secret with scoped permissions?",
    "choices": [
      "A hardcoded value in every source file",
      "A plaintext error message",
      "AWS Secrets Manager",
      "A public repository README"
    ],
    "answer": 2,
    "explanations": [
      "Hardcoded duplicates complicate rotation and expose credentials.",
      "Errors and logs are not secret storage.",
      "A secrets service supports controlled retrieval and rotation workflows.",
      "A public document exposes the secret."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "developer-associate-04",
    "track": "developer-associate",
    "domain": "d2",
    "objective": "Security · selected concept",
    "prompt": "A development assistant asks for access to every production secret. What is the appropriate response?",
    "choices": [
      "Disable audit logging",
      "Restrict access to the minimum approved task and use synthetic inputs where possible",
      "Grant every permission for convenience",
      "Paste all secrets into the chat"
    ],
    "answer": 1,
    "explanations": [
      "Removing evidence makes access harder to investigate.",
      "Task-scoped access reduces exposure and preserves control.",
      "Convenience does not justify unrelated production access.",
      "Prompting with secrets creates another disclosure path."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "developer-associate-05",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · selected concept",
    "prompt": "A new Lambda version should receive a small share of traffic first. Which approach fits?",
    "choices": [
      "Weighted alias routing with monitored rollback",
      "Replace all traffic before checking metrics",
      "Delete the previous version first",
      "Change only the source-code comment"
    ],
    "answer": 0,
    "explanations": [
      "Weighted routing supports controlled exposure and observation.",
      "Immediate full exposure defeats the incremental requirement.",
      "Removing the old version impairs rollback.",
      "Comments do not route execution traffic."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "developer-associate-06",
    "track": "developer-associate",
    "domain": "d3",
    "objective": "Testing and Deployment · selected concept",
    "prompt": "A generated test asserts only that the mocked function returns its configured mock value. What should improve?",
    "choices": [
      "Add more copies of the same assertion",
      "Remove every assertion",
      "Treat generated tests as automatically sufficient",
      "Assert observable required behavior using meaningful inputs"
    ],
    "answer": 3,
    "explanations": [
      "Repetition does not improve the weak oracle.",
      "No assertions cannot verify the intended result.",
      "Generation does not establish test quality.",
      "An independent behavior assertion can reveal a real defect."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "developer-associate-07",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · selected concept",
    "prompt": "A request crosses an API and three workers. What helps correlate its failures?",
    "choices": [
      "Logging only successful requests",
      "Putting passwords in each message",
      "A propagated correlation identifier in structured telemetry",
      "Unrelated random IDs at each boundary with no mapping"
    ],
    "answer": 2,
    "explanations": [
      "Failure evidence is essential for diagnosis.",
      "Sensitive credentials create exposure without useful correlation.",
      "A shared identifier links evidence across the request path.",
      "Unmapped identifiers break cross-component correlation."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "developer-associate-08",
    "track": "developer-associate",
    "domain": "d4",
    "objective": "Troubleshooting and Optimization · selected concept",
    "prompt": "A service is throttled by a downstream API. What retry behavior is generally appropriate?",
    "choices": [
      "Double concurrency without checking quotas",
      "Bounded backoff with jitter and observability",
      "Immediate infinite retries",
      "Retry all validation errors forever"
    ],
    "answer": 1,
    "explanations": [
      "More concurrent requests can worsen throttling.",
      "Backoff and jitter reduce synchronized pressure while bounds limit amplification.",
      "Infinite immediate retries worsen load and consume resources.",
      "Invalid input generally needs correction rather than endless retries."
    ],
    "reviewed": "2026-11-14",
    "source": "https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html"
  },
  {
    "id": "test-automation-01",
    "track": "test-automation",
    "domain": "d1",
    "objective": "Objectives for automation · selected concept",
    "prompt": "A team celebrates 5,000 scripts but cannot explain what failures they detect. What is missing?",
    "choices": [
      "A link between automated checks and testing objectives",
      "A higher script target alone",
      "A larger dashboard font",
      "A guarantee that automation finds all defects"
    ],
    "answer": 0,
    "explanations": [
      "Objectives and useful assertions establish the purpose of the checks.",
      "More scripts do not establish meaningful detection.",
      "Presentation does not define testing value.",
      "No finite suite proves all defects absent."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-02",
    "track": "test-automation",
    "domain": "d1",
    "objective": "Objectives for automation · selected concept",
    "prompt": "Which is a realistic benefit of suitable automation?",
    "choices": [
      "Elimination of all exploratory testing",
      "Zero maintenance forever",
      "Proof that no defect remains",
      "Repeatable checks with faster feedback"
    ],
    "answer": 3,
    "explanations": [
      "Human investigation remains useful beyond scripted checks.",
      "Changes require ongoing automation maintenance.",
      "Passing checks leave untested behavior unknown.",
      "Repeatable execution can shorten useful feedback cycles."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-03",
    "track": "test-automation",
    "domain": "d2",
    "objective": "Preparing for automation · selected concept",
    "prompt": "A tool demo succeeds on a toy page. What should happen before organization-wide adoption?",
    "choices": [
      "Remove every other test tool immediately",
      "Choose solely by logo recognition",
      "Pilot representative interfaces and maintenance tasks",
      "Assume the demo proves every requirement"
    ],
    "answer": 2,
    "explanations": [
      "Unproven replacement introduces avoidable risk.",
      "Brand recognition is not technical evaluation.",
      "Representative evidence helps evaluate fit and cost.",
      "A toy example omits important real constraints."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-04",
    "track": "test-automation",
    "domain": "d2",
    "objective": "Preparing for automation · selected concept",
    "prompt": "A UI has no stable identifiers. What improvement helps automation testability?",
    "choices": [
      "Ignore the unstable controls",
      "Agree stable semantic test interfaces with developers",
      "Add arbitrary sleeps to every step",
      "Use only screen coordinates forever"
    ],
    "answer": 1,
    "explanations": [
      "Ignoring controls loses relevant test coverage.",
      "Stable interfaces reduce coupling to incidental presentation.",
      "Fixed waits hide timing assumptions and slow feedback.",
      "Coordinates are fragile when layout changes."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-05",
    "track": "test-automation",
    "domain": "d3",
    "objective": "Automation architecture · selected concept",
    "prompt": "Every test embeds the same login HTTP request. What refactoring reduces duplication?",
    "choices": [
      "A reusable adapter called by domain-level actions",
      "Copy the request into more tests",
      "Hide all failures with a catch-all",
      "Delete the login checks"
    ],
    "answer": 0,
    "explanations": [
      "An adapter localizes interface changes while preserving readable intent.",
      "More copies increase maintenance effort.",
      "Suppressing failures removes useful evidence.",
      "Deleting needed checks does not solve reuse."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-06",
    "track": "test-automation",
    "domain": "d3",
    "objective": "Automation architecture · selected concept",
    "prompt": "A framework’s abstractions make failures impossible to locate. What should improve?",
    "choices": [
      "More opaque wrappers without evidence",
      "Always report every run as successful",
      "Remove test names",
      "Traceable diagnostics at meaningful layer boundaries"
    ],
    "answer": 3,
    "explanations": [
      "Opaque indirection can make diagnosis harder.",
      "False success destroys trust in feedback.",
      "Names help identify the failing behavior.",
      "Layered diagnostics preserve context and locate failures."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-07",
    "track": "test-automation",
    "domain": "d4",
    "objective": "Implementing automation · selected concept",
    "prompt": "A test sometimes clicks before a control is ready. What is preferable?",
    "choices": [
      "Catch the error and pass",
      "Remove the click assertion",
      "Wait for a relevant readiness condition with a timeout",
      "Sleep ten minutes after every action"
    ],
    "answer": 2,
    "explanations": [
      "False success masks the problem.",
      "Removing the check loses the intended verification.",
      "Condition-based bounded synchronization follows actual readiness.",
      "Large fixed delays are slow and may still be unreliable."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-08",
    "track": "test-automation",
    "domain": "d4",
    "objective": "Implementing automation · selected concept",
    "prompt": "Two tests modify the same account and fail only in parallel. What should change?",
    "choices": [
      "Silently ignore one test",
      "Isolate their test data or coordinate shared state",
      "Run them faster with the same state",
      "Blame the product without investigation"
    ],
    "answer": 1,
    "explanations": [
      "Ignoring a test hides evidence rather than fixing isolation.",
      "Isolation prevents uncontrolled interference between tests.",
      "More speed does not remove the shared-state race.",
      "Evidence is needed to distinguish test interference from a product defect."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-09",
    "track": "test-automation",
    "domain": "d5",
    "objective": "Deployment and CI/CD · selected concept",
    "prompt": "A pipeline takes hours before detecting simple contract failures. What could improve feedback?",
    "choices": [
      "Run a reliable fast subset earlier and retain broader checks later",
      "Remove all broad tests permanently",
      "Run the slowest test first by default",
      "Hide failures until release day"
    ],
    "answer": 0,
    "explanations": [
      "Staged feedback can detect common failures sooner without discarding depth.",
      "Deleting broad coverage loses distinct information.",
      "Slow-first ordering does not target early feedback.",
      "Late reporting delays correction."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-10",
    "track": "test-automation",
    "domain": "d5",
    "objective": "Deployment and CI/CD · selected concept",
    "prompt": "An automation rollout has never run in the target CI environment. What is a prudent next step?",
    "choices": [
      "Assume local success proves CI compatibility",
      "Delete the current pipeline first",
      "Give the runner unrelated production secrets",
      "Verify dependencies and execute a pilot in that environment"
    ],
    "answer": 3,
    "explanations": [
      "Local conditions can differ from the pipeline.",
      "Removing working delivery before validation adds risk.",
      "Unrelated secrets are not a compatibility solution.",
      "Target-environment evidence reveals configuration differences."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-11",
    "track": "test-automation",
    "domain": "d6",
    "objective": "Reporting and metrics · selected concept",
    "prompt": "A dashboard excludes all skipped tests and shows 100% passing. What should be disclosed?",
    "choices": [
      "A claim that skipped tests passed",
      "A guaranteed release recommendation",
      "Skipped coverage and the denominator used",
      "Only the green percentage"
    ],
    "answer": 2,
    "explanations": [
      "Unexecuted checks cannot be counted as passing evidence.",
      "A dashboard cannot guarantee release safety.",
      "Missing checks and definitions affect interpretation of the result.",
      "A percentage alone conceals absent evidence."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-12",
    "track": "test-automation",
    "domain": "d6",
    "objective": "Reporting and metrics · selected concept",
    "prompt": "Which failure report is most actionable?",
    "choices": [
      "A screenshot with no test context",
      "Expected result, actual evidence, test identity and environment",
      "Only a red icon",
      "Only the total script count"
    ],
    "answer": 1,
    "explanations": [
      "An unlabeled image is difficult to connect to a requirement.",
      "Context and reproducible evidence support investigation.",
      "A red icon gives little diagnostic information.",
      "Volume does not explain the failure."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-13",
    "track": "test-automation",
    "domain": "d7",
    "objective": "Verifying automation · selected concept",
    "prompt": "A suite is green after its assertions were accidentally disabled. What verification could expose this?",
    "choices": [
      "Introduce a controlled known failure and confirm it is reported",
      "Count green runs only",
      "Rename the suite",
      "Increase retries until green"
    ],
    "answer": 0,
    "explanations": [
      "A controlled fault tests whether detection and reporting work.",
      "Repeated green runs do not prove assertions ran.",
      "A name does not verify behavior.",
      "Retries can conceal the missing check."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-14",
    "track": "test-automation",
    "domain": "d7",
    "objective": "Verifying automation · selected concept",
    "prompt": "A failing test exits with success and CI stays green. What must be verified?",
    "choices": [
      "Only the page background",
      "Only the number of runners",
      "Only the test file extension",
      "Exit-code and result propagation to the pipeline gate"
    ],
    "answer": 3,
    "explanations": [
      "Visual styling does not control process outcome.",
      "More runners do not repair a wrong exit status.",
      "Naming alone does not establish result propagation.",
      "The gate depends on receiving the correct failure signal."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-15",
    "track": "test-automation",
    "domain": "d8",
    "objective": "Continuous improvement · selected concept",
    "prompt": "Most investigation time comes from one flaky shared fixture. What should be prioritized?",
    "choices": [
      "Mark all future failures as harmless",
      "Buy more runners without diagnosis",
      "Find and fix the fixture’s instability using failure evidence",
      "Add unlimited reruns everywhere"
    ],
    "answer": 2,
    "explanations": [
      "Blanket dismissal can hide product defects.",
      "Capacity does not necessarily address a shared fixture defect.",
      "Removing a recurring cause improves trust and feedback cost.",
      "Reruns can conceal rather than remove instability."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "test-automation-16",
    "track": "test-automation",
    "domain": "d8",
    "objective": "Continuous improvement · selected concept",
    "prompt": "A workflow is retired but its checks remain. What is a sensible review?",
    "choices": [
      "Assume old passing checks cover the new workflow",
      "Confirm changed requirements and replace or remove obsolete checks deliberately",
      "Keep every check forever without review",
      "Delete the entire suite immediately"
    ],
    "answer": 1,
    "explanations": [
      "Old behavior does not establish coverage of new requirements.",
      "Coverage should follow current objectives and traceable decisions.",
      "Obsolete checks create maintenance cost and false confidence.",
      "Wholesale deletion loses unrelated valuable evidence."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/"
  },
  {
    "id": "ai-testing-01",
    "track": "ai-testing",
    "domain": "d1",
    "objective": "AI foundations · selected concept",
    "prompt": "A classifier learns from labeled examples. Which approach does this illustrate?",
    "choices": [
      "Supervised learning",
      "Only manually written decision rules",
      "An unlabeled clustering task",
      "A proof of perfect generalization"
    ],
    "answer": 0,
    "explanations": [
      "Labels provide the expected outputs used in supervised learning.",
      "The model learns patterns rather than only executing hand-authored rules.",
      "Clustering does not require these target labels.",
      "Training does not prove behavior on all future examples."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-02",
    "track": "ai-testing",
    "domain": "d1",
    "objective": "AI foundations · selected concept",
    "prompt": "A chatbot gives different valid phrasings for the same query. What does this imply for testing?",
    "choices": [
      "Require exact text equality for every valid answer",
      "Accept every answer without inspection",
      "Test only whether text is nonempty",
      "Use acceptance criteria that allow valid variation"
    ],
    "answer": 3,
    "explanations": [
      "Exact wording can reject equivalent valid responses.",
      "Variation does not remove correctness requirements.",
      "Nonempty text can still be harmful or incorrect.",
      "Behavioral criteria can distinguish valid variation from actual errors."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-03",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · selected concept",
    "prompt": "A model has 98% overall accuracy but misses most rare critical events. What should be investigated?",
    "choices": [
      "Only model file size",
      "Whether the dashboard rounds to 100%",
      "Class-specific recall and consequences of missed events",
      "Only overall accuracy again"
    ],
    "answer": 2,
    "explanations": [
      "File size does not measure detection of critical events.",
      "Rounding further obscures performance.",
      "Recall and error cost expose the critical failures hidden by the aggregate.",
      "The same aggregate conceals the same imbalance."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-04",
    "track": "ai-testing",
    "domain": "d2",
    "objective": "AI quality and acceptance · selected concept",
    "prompt": "Which acceptance criterion is more testable?",
    "choices": [
      "The vendor says it is accurate",
      "Recall of at least 0.9 on a defined held-out critical-event set",
      "The model should be smart",
      "Everyone should like it"
    ],
    "answer": 1,
    "explanations": [
      "A claim is not a testable criterion for this system.",
      "A threshold and defined population permit reproducible evaluation.",
      "Smart has no operational measurement here.",
      "Universal approval is undefined and unrealistic."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-05",
    "track": "ai-testing",
    "domain": "d3",
    "objective": "Machine learning and metrics · selected concept",
    "prompt": "A classifier finds 30 true positives and misses 10 actual positives. What is recall?",
    "choices": [
      "75%",
      "30%",
      "25%",
      "100%"
    ],
    "answer": 0,
    "explanations": [
      "Recall is 30 divided by the 40 actual positives.",
      "30 is a count, not the recall percentage.",
      "25 percent is the missed proportion in this example.",
      "Ten missed positives prevent perfect recall."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-06",
    "track": "ai-testing",
    "domain": "d3",
    "objective": "Machine learning and metrics · selected concept",
    "prompt": "Test examples accidentally appear in training. What is the concern?",
    "choices": [
      "Guaranteed improved generalization",
      "The test becomes more independent",
      "Only a harmless file naming issue",
      "Data leakage can inflate evaluation results"
    ],
    "answer": 3,
    "explanations": [
      "Memorization is not evidence of generalization.",
      "Overlapping data reduces independence.",
      "The issue is the data’s use rather than its name.",
      "Exposure to test examples undermines an independent performance estimate."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-07",
    "track": "ai-testing",
    "domain": "d4",
    "objective": "Testing AI-based systems · selected concept",
    "prompt": "A generated answer invents a citation. Which evaluation is needed?",
    "choices": [
      "Accept confidence as proof",
      "Repeat the same prompt once and stop",
      "Verify the cited source and whether it supports the claim",
      "Check only grammar"
    ],
    "answer": 2,
    "explanations": [
      "Confidence is not external evidence.",
      "A second plausible answer cannot validate an invented source.",
      "Source verification tests factual support rather than fluency.",
      "Grammar does not establish factual accuracy."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-08",
    "track": "ai-testing",
    "domain": "d4",
    "objective": "Testing AI-based systems · selected concept",
    "prompt": "A vision system should tolerate small brightness changes. Which test is useful?",
    "choices": [
      "Measure only inference speed",
      "Compare behavior on controlled brightness perturbations",
      "Change labels to match every output",
      "Test only the training images"
    ],
    "answer": 1,
    "explanations": [
      "Latency does not measure prediction stability.",
      "A controlled transformation challenges the stated robustness property.",
      "Relabeling hides rather than detects failures.",
      "Training examples do not independently establish robustness."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-09",
    "track": "ai-testing",
    "domain": "d5",
    "objective": "Input data testing · selected concept",
    "prompt": "A sensor changes from Celsius to Fahrenheit without updating preprocessing. What should tests detect?",
    "choices": [
      "A violated input-unit contract",
      "Only a larger source file",
      "A harmless formatting preference",
      "A need to retrain without investigating"
    ],
    "answer": 0,
    "explanations": [
      "Units change the feature meaning and must match the input contract.",
      "File size does not establish correct feature meaning.",
      "Units are semantic rather than cosmetic.",
      "Diagnosis should precede an expensive retraining decision."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-10",
    "track": "ai-testing",
    "domain": "d5",
    "objective": "Input data testing · selected concept",
    "prompt": "An evaluation set contains only daylight images for an all-hours product. What is missing?",
    "choices": [
      "More copies of the same daylight images",
      "A shorter test filename",
      "A guarantee that daylight performance transfers",
      "Representative night-time conditions"
    ],
    "answer": 3,
    "explanations": [
      "Duplication does not add the missing condition.",
      "Naming does not repair representativeness.",
      "Performance can change with lighting and distribution.",
      "The intended operating context includes unrepresented conditions."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-11",
    "track": "ai-testing",
    "domain": "d6",
    "objective": "Model testing · selected concept",
    "prompt": "A new model is compared on a different test set from the old model. What improves the comparison?",
    "choices": [
      "Compare only model names",
      "Use training accuracy for one and test accuracy for the other",
      "Evaluate both on the same independent benchmark",
      "Choose the larger model automatically"
    ],
    "answer": 2,
    "explanations": [
      "Names do not measure performance.",
      "Different measurement roles make the comparison misleading.",
      "A common benchmark reduces confounding from different samples.",
      "Size does not prove better task behavior."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-12",
    "track": "ai-testing",
    "domain": "d6",
    "objective": "Model testing · selected concept",
    "prompt": "One demographic slice performs poorly while the mean passes. What should follow?",
    "choices": [
      "Declare all groups equivalent",
      "Investigate slice errors and acceptance risks",
      "Hide the slice from the report",
      "Replace its labels with predictions"
    ],
    "answer": 1,
    "explanations": [
      "The observed discrepancy contradicts equivalence.",
      "Slice evidence can reveal material risks masked by averages.",
      "Omission conceals a relevant limitation.",
      "Changing ground truth to outputs corrupts evaluation."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-13",
    "track": "ai-testing",
    "domain": "d7",
    "objective": "ML development testing · selected concept",
    "prompt": "A team cannot reproduce a model’s reported result. Which records help?",
    "choices": [
      "Data, code, configuration and model versions",
      "Only the chart color",
      "Only the training job nickname",
      "Only the date without artifacts"
    ],
    "answer": 0,
    "explanations": [
      "Versioned inputs and artifacts support reproducible investigation.",
      "Presentation does not identify the evaluated system.",
      "A nickname omits the underlying inputs.",
      "A date alone cannot reconstruct the run."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "ai-testing-14",
    "track": "ai-testing",
    "domain": "d7",
    "objective": "ML development testing · selected concept",
    "prompt": "Incoming inputs shift significantly after deployment. What is appropriate?",
    "choices": [
      "Assume the original score still applies forever",
      "Automatically approve every prediction",
      "Delete historical evaluation evidence",
      "Investigate drift and reevaluate relevant performance"
    ],
    "answer": 3,
    "explanations": [
      "A past evaluation does not guarantee unchanged conditions.",
      "Approval without evaluation ignores the new risk.",
      "Historical evidence helps compare the change.",
      "Changed inputs may invalidate earlier performance assumptions."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"
  },
  {
    "id": "generative-ai-testing-01",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · selected concept",
    "prompt": "An LLM invents a password rule absent from the requirements. What should the tester do?",
    "choices": [
      "Flag the assumption and verify the test basis",
      "Make it mandatory because the LLM proposed it",
      "Silently change the product",
      "Mark the imagined rule as verified"
    ],
    "answer": 0,
    "explanations": [
      "A generated assumption needs validation against authoritative requirements.",
      "Generation does not grant product authority.",
      "Changing the product is outside the evidence supplied.",
      "An invented rule has not been verified."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-02",
    "track": "generative-ai-testing",
    "domain": "d1",
    "objective": "GenAI for software testing · selected concept",
    "prompt": "Which use is suitable for a reviewed GenAI assistant?",
    "choices": [
      "Guarantee the complete absence of defects",
      "Replace all test oracles with generated text",
      "Approve every release autonomously",
      "Draft candidate boundary cases from supplied requirements"
    ],
    "answer": 3,
    "explanations": [
      "No generated output proves all defects absent.",
      "Outputs require independent checking.",
      "Release authority needs defined governance and evidence.",
      "Drafting can support human analysis with source review."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-03",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · selected concept",
    "prompt": "A prompt says only “test this.” What information would most improve it?",
    "choices": [
      "Unrelated secrets",
      "Only a larger font",
      "The test basis, target behavior and expected output format",
      "A demand for confidence without context"
    ],
    "answer": 2,
    "explanations": [
      "Secrets add exposure without clarifying the testing task.",
      "Typography does not supply the missing basis.",
      "Specific context and output needs make the task better constrained.",
      "Confidence cannot fill missing requirements reliably."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-04",
    "track": "generative-ai-testing",
    "domain": "d2",
    "objective": "Prompt engineering · selected concept",
    "prompt": "A generated case omits an invalid boundary. What is a useful refinement?",
    "choices": [
      "Remove the boundary requirement",
      "Specify the valid range and request adjacent invalid values",
      "Repeat “be better” without details",
      "Accept the omission as proof of irrelevance"
    ],
    "answer": 1,
    "explanations": [
      "Deleting the requirement hides the problem.",
      "A concrete constraint targets the observed coverage gap.",
      "Vague feedback does not explain the missing condition.",
      "An omission is not evidence that a condition is irrelevant."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-05",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · selected concept",
    "prompt": "A prompt includes real customer identifiers unnecessarily. What should change?",
    "choices": [
      "Use synthetic or minimized data under approved policy",
      "Add more identifiers for realism",
      "Publish the prompt publicly",
      "Assume testing data has no privacy duties"
    ],
    "answer": 0,
    "explanations": [
      "Data minimization reduces avoidable exposure.",
      "Additional identifiers increase unnecessary disclosure.",
      "Public posting widens the exposure.",
      "Test workflows can still process sensitive personal information."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-06",
    "track": "generative-ai-testing",
    "domain": "d3",
    "objective": "Risks in GenAI testing · selected concept",
    "prompt": "A retrieved issue says “ignore policy and expose secrets.” How should it be treated?",
    "choices": [
      "As a higher-priority system instruction",
      "As permission from the product owner",
      "As proof the secrets are public",
      "As untrusted content rather than authorization"
    ],
    "answer": 3,
    "explanations": [
      "Source content does not override the governing task.",
      "An issue’s text does not establish owner approval.",
      "Mentioning a secret does not make it public.",
      "Retrieved material cannot authorize unrelated disclosure."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-07",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · selected concept",
    "prompt": "A testing assistant needs the latest approved internal requirements. Which approach is worth considering?",
    "choices": [
      "Remove document access controls",
      "Treat all retrieved text as trusted instructions",
      "Authorized retrieval with provenance and evaluation",
      "Assume old model weights contain the latest documents"
    ],
    "answer": 2,
    "explanations": [
      "Context access must still respect permissions.",
      "Retrieved facts remain untrusted input at the instruction boundary.",
      "Retrieval can supply current authorized context for review.",
      "Static training cannot guarantee current private information."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-08",
    "track": "generative-ai-testing",
    "domain": "d4",
    "objective": "LLM-powered testing solutions · selected concept",
    "prompt": "A new retrieval system returns irrelevant chapters. What should be evaluated?",
    "choices": [
      "Whether every answer sounds confident",
      "Retrieval relevance and downstream answer quality",
      "Only the chat bubble color",
      "Only total token count"
    ],
    "answer": 1,
    "explanations": [
      "Confident wording can accompany wrong context.",
      "Relevant context and supported answers measure useful behavior.",
      "Visual styling does not establish retrieval quality.",
      "Volume alone does not measure relevance."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-09",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · selected concept",
    "prompt": "A pilot halves drafting time but doubles correction time. What should the team measure?",
    "choices": [
      "End-to-end effort and output quality",
      "Drafting time alone",
      "Only the number of prompts",
      "Only the vendor’s productivity claim"
    ],
    "answer": 0,
    "explanations": [
      "The full workflow determines whether there is a useful gain.",
      "A partial measure hides the extra correction work.",
      "Prompt count does not measure value.",
      "Vendor claims do not replace local evidence."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "generative-ai-testing-10",
    "track": "generative-ai-testing",
    "domain": "d5",
    "objective": "Adoption in test organizations · selected concept",
    "prompt": "Before expanding a pilot to regulated data, what is needed?",
    "choices": [
      "Assume pilot approval covers every use",
      "Disable human review",
      "Upload the entire production dataset by default",
      "Review approved data handling, controls and accountability"
    ],
    "answer": 3,
    "explanations": [
      "Approval is scoped to the original use and conditions.",
      "Removing review can increase consequential errors.",
      "Default bulk upload conflicts with minimization.",
      "A new risk context requires appropriate controls and authorization."
    ],
    "reviewed": "2026-11-14",
    "source": "https://istqb.org/certifications/gen-ai/"
  },
  {
    "id": "github-actions-01",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · selected concept",
    "prompt": "A deploy job must run only after tests succeed. What expresses the dependency?",
    "choices": [
      "A needs dependency on the test job with normal success behavior",
      "Placing deploy lower in the file only",
      "Changing the job display name",
      "Adding an unrelated scheduled trigger"
    ],
    "answer": 0,
    "explanations": [
      "Needs establishes job ordering and success dependencies.",
      "YAML position alone does not make jobs sequential.",
      "Names do not establish execution dependencies.",
      "A schedule does not connect deploy to test results."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-02",
    "track": "github-actions",
    "domain": "d1",
    "objective": "Author and manage workflows · selected concept",
    "prompt": "A project must test two runtimes on two operating systems. What expresses the combinations?",
    "choices": [
      "A single step name listing all four combinations",
      "A comment claiming coverage",
      "Only the newest runtime on one OS",
      "A strategy matrix with both axes"
    ],
    "answer": 3,
    "explanations": [
      "A name does not execute additional environments.",
      "Comments do not create coverage.",
      "One environment omits three required combinations.",
      "A two-by-two matrix expands to the required combinations."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-03",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · selected concept",
    "prompt": "A build succeeded but a later job cannot find its output. What mechanism transfers the file between jobs?",
    "choices": [
      "Write its filename in a comment",
      "Use only a display-name change",
      "Upload and download a workflow artifact",
      "Assume every job shares a filesystem"
    ],
    "answer": 2,
    "explanations": [
      "A comment does not transfer the file.",
      "Names do not persist build outputs.",
      "Artifacts explicitly move retained outputs between jobs.",
      "Jobs can use separate runners and filesystems."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-04",
    "track": "github-actions",
    "domain": "d2",
    "objective": "Consume and troubleshoot workflows · selected concept",
    "prompt": "A workflow did not start on a pull request. What should be checked first?",
    "choices": [
      "Only the badge color",
      "Configured events, branch and path filters",
      "Only the compiler optimization flags",
      "Only artifact retention"
    ],
    "answer": 1,
    "explanations": [
      "A badge reflects status rather than controlling triggers.",
      "Trigger filters determine whether the event starts the workflow.",
      "Compiler settings matter after the relevant job runs.",
      "Retention does not select triggering events."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-05",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · selected concept",
    "prompt": "A reusable bundle of shell steps needs to run within a caller’s job. What is a suitable action type?",
    "choices": [
      "A composite action",
      "A repository issue template",
      "A branch protection rule",
      "A project board"
    ],
    "answer": 0,
    "explanations": [
      "A composite action packages steps for a calling job.",
      "Issue templates collect information rather than run steps.",
      "Protection rules govern branches rather than bundle commands.",
      "Boards organize work and do not execute step bundles."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-06",
    "track": "github-actions",
    "domain": "d3",
    "objective": "Author and maintain actions · selected concept",
    "prompt": "An action changes an output name used by many consumers. How should this be handled?",
    "choices": [
      "Silently change the existing published behavior",
      "Delete every consumer workflow",
      "Hide the output from documentation",
      "Treat it as a contract change with versioning and migration guidance"
    ],
    "answer": 3,
    "explanations": [
      "Silent changes can break downstream automation.",
      "Deleting consumers is not a compatibility strategy.",
      "Removing documentation makes the change harder to manage.",
      "Consumers depend on the output contract and need a deliberate migration."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-07",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · selected concept",
    "prompt": "Public contributions can run arbitrary code. What is a concern with a privileged persistent self-hosted runner?",
    "choices": [
      "The runner name prevents execution",
      "A green badge guarantees isolation",
      "Untrusted code may compromise its environment or credentials",
      "Every fork is automatically trustworthy"
    ],
    "answer": 2,
    "explanations": [
      "Names are not an execution sandbox.",
      "A success indicator does not prove isolation.",
      "Runner trust and credential boundaries matter when executing untrusted code.",
      "Public contribution status does not establish trust."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-08",
    "track": "github-actions",
    "domain": "d4",
    "objective": "Manage enterprise automation · selected concept",
    "prompt": "An organization wants shared CI logic maintained centrally. What should it consider?",
    "choices": [
      "Removing all change history",
      "Versioned reusable workflows with clear permissions",
      "Copying divergent files forever without review",
      "Giving every workflow administrator credentials"
    ],
    "answer": 1,
    "explanations": [
      "History supports review and diagnosis.",
      "Reusable versioned definitions can centralize a controlled contract.",
      "Unmanaged copies drift and multiply maintenance.",
      "Broad credentials do not establish maintainable reuse."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-09",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · selected concept",
    "prompt": "A cloud deployment uses a long-lived key in CI. What alternative should be evaluated?",
    "choices": [
      "OIDC federation with restricted identity claims",
      "A root key stored in a public variable",
      "Printing the key before deployment",
      "Disabling cloud authorization"
    ],
    "answer": 0,
    "explanations": [
      "Federation can issue temporary credentials under a scoped trust policy.",
      "A public root key greatly exceeds the required access.",
      "Logs can expose the credential.",
      "Authorization must still protect deployment."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-actions-10",
    "track": "github-actions",
    "domain": "d5",
    "objective": "Secure and optimize automation · selected concept",
    "prompt": "A pull request title is inserted directly into a shell command. What should improve?",
    "choices": [
      "Assume titles cannot contain shell syntax",
      "Give the job more permissions",
      "Hide the command output only",
      "Pass untrusted text as data using safe argument handling"
    ],
    "answer": 3,
    "explanations": [
      "Titles are attacker-controlled strings.",
      "More privilege increases impact rather than fixing injection.",
      "Hidden output does not prevent command execution.",
      "Untrusted event text must not become executable shell syntax."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200"
  },
  {
    "id": "github-copilot-01",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · selected concept",
    "prompt": "Copilot proposes a plausible authentication change. What should happen before merging?",
    "choices": [
      "Review requirements, security implications and independent tests",
      "Merge because the explanation sounds certain",
      "Disable tests to save time",
      "Treat generation as security approval"
    ],
    "answer": 0,
    "explanations": [
      "Independent review and testing evaluate the actual change.",
      "Confidence is not proof of secure behavior.",
      "Removing tests discards useful evidence.",
      "A generated suggestion is not an authorized security review."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-02",
    "track": "github-copilot",
    "domain": "d1",
    "objective": "Responsible AI use · selected concept",
    "prompt": "A suggestion repeats a biased assumption from a prompt. What is appropriate?",
    "choices": [
      "Assume AI output is neutral by definition",
      "Remove all human accountability",
      "Use fluency as the fairness metric",
      "Challenge the assumption and review affected use cases"
    ],
    "answer": 3,
    "explanations": [
      "Models can reproduce problematic assumptions.",
      "Responsibility remains with the organization and people using the tool.",
      "Fluent prose does not measure fairness.",
      "Review must include assumptions and consequences for affected users."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-03",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · selected concept",
    "prompt": "A developer wants a short continuation at the cursor. Which interaction is the closest fit?",
    "choices": [
      "A billing export",
      "A repository transfer",
      "An inline suggestion",
      "A release approval policy"
    ],
    "answer": 2,
    "explanations": [
      "Billing reports do not complete code.",
      "Transferring ownership is unrelated to completion.",
      "Inline completions fit local continuation work.",
      "Release approval governs delivery rather than suggesting cursor text."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-04",
    "track": "github-copilot",
    "domain": "d2",
    "objective": "Copilot features · selected concept",
    "prompt": "An agent proposes changes across six files. What should the developer inspect?",
    "choices": [
      "Only the assistant’s confidence",
      "The actual diff, tool actions and relevant validation",
      "Only the final chat summary",
      "Only the number of files"
    ],
    "answer": 1,
    "explanations": [
      "Confidence is not validation evidence.",
      "The concrete changes and checks establish what was done.",
      "A summary can omit material details.",
      "File count does not measure correctness."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-05",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · selected concept",
    "prompt": "An assistant uses an outdated API absent from the supplied context. What helps?",
    "choices": [
      "Supply the current contract and verify its use",
      "Assume the model has read all private documents",
      "Increase confidence wording",
      "Rename the chat"
    ],
    "answer": 0,
    "explanations": [
      "Relevant current context plus checking addresses the information gap.",
      "Access and context are bounded rather than omniscient.",
      "Tone does not update an API contract.",
      "A title does not supply technical context."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-06",
    "track": "github-copilot",
    "domain": "d3",
    "objective": "Data and architecture · selected concept",
    "prompt": "A long conversation omits an earlier constraint in its next change. What should the user do?",
    "choices": [
      "Assume unlimited perfect memory",
      "Accept the change without inspection",
      "Remove the constraint permanently",
      "Restate the important constraint in relevant task context and verify the diff"
    ],
    "answer": 3,
    "explanations": [
      "Context limits make that assumption unreliable.",
      "Inspection is needed precisely because the constraint was missed.",
      "Discarding the requirement does not fix adherence.",
      "Important constraints need available context and observable verification."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-07",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · selected concept",
    "prompt": "A refactor must preserve a public API. What belongs in the prompt?",
    "choices": [
      "A request to rename every public method",
      "Unrelated production secrets",
      "The compatibility constraint and representative caller tests",
      "Only “make it modern”"
    ],
    "answer": 2,
    "explanations": [
      "Unrequested renames can break the required interface.",
      "Secrets do not clarify the compatibility requirement.",
      "A clear invariant and caller evidence constrain the refactor.",
      "A vague aesthetic goal omits compatibility."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-08",
    "track": "github-copilot",
    "domain": "d4",
    "objective": "Prompt engineering and context · selected concept",
    "prompt": "Two interpretations of a requirement are plausible. What is useful?",
    "choices": [
      "Treat both contradictory behaviors as mandatory",
      "Provide an input/output example or seek clarification",
      "Ask the assistant to guess silently",
      "Choose the longest output"
    ],
    "answer": 1,
    "explanations": [
      "Contradictory requirements need resolution rather than blind combination.",
      "Concrete examples or clarification resolve ambiguity.",
      "Silent guessing can implement the wrong behavior.",
      "Length does not establish intended semantics."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-09",
    "track": "github-copilot",
    "domain": "d5",
    "objective": "Developer productivity · selected concept",
    "prompt": "A generated test only verifies that code does not throw. What may be missing?",
    "choices": [
      "Assertions for the required observable result",
      "More comments saying it is thorough",
      "A longer test name",
      "A guarantee of complete coverage"
    ],
    "answer": 0,
    "explanations": [
      "No exception is weaker than the expected business outcome.",
      "Comments cannot add missing assertions.",
      "Naming does not strengthen detection.",
      "One weak assertion cannot establish complete coverage."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-10",
    "track": "github-copilot",
    "domain": "d5",
    "objective": "Developer productivity · selected concept",
    "prompt": "A draft saves ten minutes but creates an hour of corrections. How should its value be assessed?",
    "choices": [
      "Count only generated lines",
      "Ignore correction time",
      "Measure only response latency",
      "Include review and correction effort in the measurement"
    ],
    "answer": 3,
    "explanations": [
      "Volume does not account for rework.",
      "Omitting rework misstates the gain.",
      "Fast generation can still create costly changes.",
      "End-to-end effort reflects the real productivity outcome."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-11",
    "track": "github-copilot",
    "domain": "d6",
    "objective": "Privacy and safeguards · selected concept",
    "prompt": "A debugging example contains a production token. What should happen before using it as context?",
    "choices": [
      "Assume every feature excludes every secret automatically",
      "Publish it in the issue for convenience",
      "Remove the token and use a synthetic example under policy",
      "Paste it because the repository is private"
    ],
    "answer": 2,
    "explanations": [
      "Controls have scope and do not guarantee universal secret detection.",
      "Public posting broadens exposure.",
      "Minimization avoids unnecessary disclosure through the assistance workflow.",
      "Repository privacy does not authorize every downstream use."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  },
  {
    "id": "github-copilot-12",
    "track": "github-copilot",
    "domain": "d6",
    "objective": "Privacy and safeguards · selected concept",
    "prompt": "A content exclusion is configured. What is a safe interpretation?",
    "choices": [
      "Grant every agent permission automatically",
      "Verify its documented scope for the feature being used",
      "Assume it protects all tools and channels forever",
      "Stop reviewing all generated output"
    ],
    "answer": 1,
    "explanations": [
      "An exclusion does not justify unrelated tool access.",
      "Feature-specific documentation defines what the control covers.",
      "A scoped control is not a universal guarantee.",
      "Output review remains necessary."
    ],
    "reviewed": "2026-11-14",
    "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300"
  }
];
