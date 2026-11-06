export type AtlasFlow = "all" | "rag" | "tools" | "eval";
export const atlasRows = [
  {
    "number": "01",
    "label": "INTENT & POLICY",
    "nodes": [
      {
        "id": "intent",
        "title": "User intent",
        "subtitle": "task / constraints",
        "groups": [
          "all"
        ],
        "detail": "The task starts with an explicit objective and boundaries."
      },
      {
        "id": "policy",
        "title": "Policy gates",
        "subtitle": "scope / permissions",
        "groups": [
          "tools",
          "eval"
        ],
        "detail": "Sensitive actions require explicit permission and bounded access."
      },
      {
        "id": "spec",
        "title": "Success criteria",
        "subtitle": "expected behavior",
        "groups": [
          "eval"
        ],
        "detail": "Define observable success before selecting a model or executing a tool."
      }
    ]
  },
  {
    "number": "02",
    "label": "KNOWLEDGE",
    "nodes": [
      {
        "id": "sources",
        "title": "Source material",
        "subtitle": "documents / records",
        "groups": [
          "rag"
        ],
        "detail": "Source material is selected for relevance and provenance."
      },
      {
        "id": "retrieve",
        "title": "Hybrid retrieval",
        "subtitle": "lexical + vector",
        "groups": [
          "rag"
        ],
        "detail": "Lexical and vector retrieval can find complementary context; retrieved content still needs validation."
      },
      {
        "id": "rank",
        "title": "Rerank & cite",
        "subtitle": "relevance / provenance",
        "groups": [
          "rag",
          "eval"
        ],
        "detail": "Rank retrieved passages and preserve source references for later inspection."
      }
    ]
  },
  {
    "number": "03",
    "label": "ORCHESTRATION",
    "nodes": [
      {
        "id": "context",
        "title": "Context engine",
        "subtitle": "budget / grounding",
        "groups": [
          "rag",
          "tools"
        ],
        "detail": "Retrieval combines relevant source material with the current task. Sources and boundaries remain visible to the model and reviewer."
      },
      {
        "id": "router",
        "title": "Model routing",
        "subtitle": "capability / budget",
        "groups": [
          "rag",
          "tools"
        ],
        "detail": "Route a task to an appropriate model within explicit capability and resource constraints."
      },
      {
        "id": "planner",
        "title": "Task orchestration",
        "subtitle": "steps / stop rules",
        "groups": [
          "tools"
        ],
        "detail": "Break work into bounded steps and define when execution must stop or escalate."
      }
    ]
  },
  {
    "number": "04",
    "label": "ACTION",
    "nodes": [
      {
        "id": "model",
        "title": "Model inference",
        "subtitle": "structured output",
        "groups": [
          "rag",
          "tools"
        ],
        "detail": "Generate a structured candidate response grounded in the task context."
      },
      {
        "id": "tool",
        "title": "Tool gateway",
        "subtitle": "typed calls / access",
        "groups": [
          "tools"
        ],
        "detail": "Validate tool arguments and enforce access boundaries before execution."
      },
      {
        "id": "runtime",
        "title": "Bounded execution",
        "subtitle": "timeouts / retries",
        "groups": [
          "tools",
          "eval"
        ],
        "detail": "Execute with timeouts, bounded retries, and duplicate-safe operations where appropriate."
      }
    ]
  },
  {
    "number": "05",
    "label": "ASSURANCE",
    "nodes": [
      {
        "id": "checks",
        "title": "Output validation",
        "subtitle": "schema / citations",
        "groups": [
          "rag",
          "eval"
        ],
        "detail": "Check schema validity, cited sources, and application-specific rules before accepting the result."
      },
      {
        "id": "evals",
        "title": "Evaluation suite",
        "subtitle": "regression / adversarial",
        "groups": [
          "eval"
        ],
        "detail": "Use reproducible cases to inspect regressions, failure modes, and task-specific behavior."
      },
      {
        "id": "review",
        "title": "Human review",
        "subtitle": "approval / exceptions",
        "groups": [
          "tools",
          "eval"
        ],
        "detail": "Send uncertain or consequential decisions to a person with the relevant context."
      }
    ]
  },
  {
    "number": "06",
    "label": "LEARNING",
    "nodes": [
      {
        "id": "traces",
        "title": "Trace & evidence",
        "subtitle": "inputs / tool events",
        "groups": [
          "eval"
        ],
        "detail": "Keep appropriately redacted records of inputs, tool events, and outcomes."
      },
      {
        "id": "feedback",
        "title": "Failure analysis",
        "subtitle": "categorize / reproduce",
        "groups": [
          "eval"
        ],
        "detail": "Categorize observed failures and reproduce them before choosing a correction."
      },
      {
        "id": "refine",
        "title": "Refine & retest",
        "subtitle": "version / compare",
        "groups": [
          "rag",
          "tools",
          "eval"
        ],
        "detail": "Version changes and compare against the same evaluation cases before release."
      }
    ]
  }
];
export const atlasEdges: [string, string][] = [["intent", "context"], ["intent", "policy"], ["policy", "planner"], ["spec", "evals"], ["sources", "retrieve"], ["retrieve", "rank"], ["rank", "context"], ["context", "router"], ["router", "model"], ["planner", "tool"], ["tool", "runtime"], ["model", "checks"], ["runtime", "checks"], ["checks", "evals"], ["evals", "review"], ["checks", "traces"], ["review", "traces"], ["traces", "feedback"], ["feedback", "refine"], ["refine", "context"]];
