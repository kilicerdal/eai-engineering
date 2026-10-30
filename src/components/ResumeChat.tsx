"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Mode = "general" | "coding" | "qa" | "aws" | "review" | "testing" | "debug";

type Conversation = {
  id: string;
  title: string;
  mode: Mode;
  messages: Message[];
  updatedAt: number;
};

const STORAGE_KEY = "erdal-ai-conversations-v31";
const OLD_STORAGE_KEY = "erdal-ai-chat-v3";

const modes: { id: Mode; label: string }[] = [
  { id: "general", label: "General AI" },
  { id: "coding", label: "Coding" },
  { id: "qa", label: "QA Automation" },
  { id: "aws", label: "AWS & Cloud" },
  { id: "review", label: "AI Code Review" },
  { id: "testing", label: "AI Test Generator" },
  { id: "debug", label: "AI Debugger" },
];

const suggestions: Record<Mode, string[]> = {
  general: [
    "What can you help me with?",
    "Explain AI agents",
    "Tell me about Erdal's experience",
  ],
  coding: [
    "Write a Playwright TypeScript login test",
    "Explain Python decorators",
    "Design a REST API",
  ],
  qa: [
    "Create an API test strategy",
    "Generate pytest test cases",
    "Design an automation framework",
  ],
  aws: [
    "Explain AWS Lambda",
    "Design a serverless architecture",
    "Explain IAM best practices",
  ],
  review: [
    "Review this Python code for bugs and security issues",
    "Review a Playwright test for reliability",
    "Explain common TypeScript code smells",
  ],
  testing: [
    "Generate Playwright TypeScript login tests",
    "Generate pytest API tests with fixtures",
    "Create a REST API test strategy",
  ],
  debug: [
    "Debug a failing Playwright test",
    "Explain a Python traceback",
    "Diagnose an HTTP 500 API error",
  ],
};

const welcomeMessage: Message = {
  role: "assistant",
  content:
    "Hello! I'm **eAI**. Choose an AI mode or ask me anything about coding, automation testing, AWS, generative AI, or Erdal's professional background.",
};

function createConversation(mode: Mode = "general"): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "New conversation",
    mode,
    messages: [welcomeMessage],
    updatedAt: Date.now(),
  };
}

function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs text-slate-400">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={copyCode}
          className="text-xs text-cyan-300 hover:text-white"
        >
          {copied ? "Copied!" : "Copy code"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language || "text"}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "18px",
            background: "transparent",
            fontSize: "13px",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="min-w-0 break-words text-sm leading-7">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            const child = children as React.ReactElement<{
              className?: string;
              children?: React.ReactNode;
            }>;

            const className = child.props?.className || "";
            const match = /language-(\\w+)/.exec(className);
            const code = String(child.props?.children || "").replace(/\\n$/, "");

            return (
              <CodeBlock
                language={match?.[1] || "text"}
                code={code}
              />
            );
          },
          code({ children, ...props }) {
            return (
              <code
                {...props}
                className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-cyan-200"
              >
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="my-2">{children}</p>;
          },
          ul({ children }) {
            return <ul className="my-3 list-disc space-y-1 pl-5">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="my-3 list-decimal space-y-1 pl-5">{children}</ol>;
          },
          h1({ children }) {
            return <h3 className="my-3 text-xl font-bold">{children}</h3>;
          },
          h2({ children }) {
            return <h3 className="my-3 text-lg font-bold">{children}</h3>;
          },
          h3({ children }) {
            return <h4 className="my-3 font-bold">{children}</h4>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function ResumeChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let initial: Conversation[] = [];

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          initial = parsed.filter(
            (item): item is Conversation =>
              item &&
              typeof item.id === "string" &&
              typeof item.title === "string" &&
              Array.isArray(item.messages) &&
              ["general", "coding", "qa", "aws"].includes(item.mode)
          );
        }
      }

      if (!initial.length) {
        const old = localStorage.getItem(OLD_STORAGE_KEY);

        if (old) {
          const messages = JSON.parse(old) as Message[];
          const migrated = createConversation();

          if (Array.isArray(messages) && messages.length) {
            migrated.messages = messages;
            migrated.title = "Previous conversation";
          }

          initial = [migrated];
        }
      }
    } catch {
      initial = [];
    }

    if (!initial.length) {
      initial = [createConversation()];
    }

    queueMicrotask(() => {
      setConversations(initial);
      setActiveId(initial[0].id);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(conversations.slice(0, 30))
      );
    } catch {
      // Ignore unavailable browser storage.
    }
  }, [conversations, hydrated]);

  const active = conversations.find(
    (conversation) => conversation.id === activeId
  );

  useEffect(() => {
    const container = chatContainerRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [active?.messages, loading]);

  function updateConversation(
    id: string,
    updater: (conversation: Conversation) => Conversation
  ) {
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id
          ? updater(conversation)
          : conversation
      )
    );
  }

  function regenerateResponse() {
    if (!active || loading) return;

    const messages = active.messages;

    const lastUserIndex = messages.findLastIndex(
      (message) => message.role === "user"
    );

    if (lastUserIndex < 0) return;

    const question = messages[lastUserIndex].content;

    void sendMessage(question, true);
  }

  function stopGenerating() {
    abortControllerRef.current?.abort();
  }

  async function sendMessage(text: string, regenerate = false) {
    const question = text.trim();

    if (!question || loading || !active) return;

    const id = active.id;
    const history = regenerate
      ? active.messages.slice(0, -2).slice(-10)
      : active.messages.slice(-10);
    const mode = active.mode;

    updateConversation(id, (conversation) => ({
      ...conversation,
      title:
        conversation.title === "New conversation"
          ? question.slice(0, 45)
          : conversation.title,
      updatedAt: Date.now(),
      messages: regenerate
        ? [
            ...conversation.messages.slice(0, -1),
            { role: "assistant", content: "" },
          ]
        : [
            ...conversation.messages,
            { role: "user", content: question },
          ],
    }));

    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          history,
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      if (!response.body) {
        throw new Error("Streaming response unavailable");
      }

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("text/event-stream")) {
        throw new Error("Expected AI streaming response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let answer = "";
      let finished = false;
      let assistantAdded = regenerate;

      function updateAnswer() {
        updateConversation(id, (conversation) => {
          const messages = [...conversation.messages];

          if (!assistantAdded) {
            messages.push({
              role: "assistant",
              content: answer,
            });
            assistantAdded = true;
          } else {
            const last = messages.length - 1;

            messages[last] = {
              role: "assistant",
              content: answer,
            };
          }

          return {
            ...conversation,
            updatedAt: Date.now(),
            messages,
          };
        });
      }

      function processEvent(event: string) {
        const dataLines = event
          .split("\n")
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart());

        if (!dataLines.length) return;

        const data = dataLines.join("\n").trim();

        if (data === "[DONE]") {
          finished = true;
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const token = parsed.choices?.[0]?.delta?.content;

          if (typeof token === "string" && token.length > 0) {
            answer += token;
            updateAnswer();
          }
        } catch {
          // Ignore malformed SSE events.
        }
      }

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const normalized = buffer.replace(/\r\n/g, "\n");

        const events = normalized.split("\n\n");

        buffer = events.pop() || "";

        for (const event of events) {
          processEvent(event);
        }

        if (finished) {
          await reader.cancel();
          break;
        }
      }

      if (buffer.trim() && !finished) {
        processEvent(buffer);
      }

      if (!answer.trim()) {
        throw new Error("AI returned an empty streaming response");
      }

      updateAnswer();
    } catch {
      if (!controller.signal.aborted) {
        updateConversation(id, (conversation) => ({
          ...conversation,
          messages: [
            ...conversation.messages,
            {
              role: "assistant",
              content:
                "Sorry, I couldn't complete that request. Please try again.",
            },
          ],
        }));
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setLoading(false);
    }
  }

  function newConversation() {
    if (loading) return;

    const conversation = createConversation(active?.mode || "general");

    setConversations((previous) => [
      conversation,
      ...previous,
    ]);
    setActiveId(conversation.id);
    setInput("");
  }

  function renameConversation(id: string) {
    const title = window.prompt("Conversation name:");

    if (!title?.trim()) return;

    updateConversation(id, (conversation) => ({
      ...conversation,
      title: title.trim().slice(0, 60),
    }));
  }

  function deleteConversation(id: string) {
    if (loading) return;

    const remaining = conversations.filter(
      (conversation) => conversation.id !== id
    );

    if (remaining.length) {
      setConversations(remaining);

      if (activeId === id) {
        setActiveId(remaining[0].id);
      }
    } else {
      const fresh = createConversation();
      setConversations([fresh]);
      setActiveId(fresh.id);
    }
  }

  function changeMode(mode: Mode) {
    if (!active || loading) return;

    updateConversation(active.id, (conversation) => ({
      ...conversation,
      mode,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section id="ai-assistant" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            eAI · ENGINEERING INTELLIGENCE
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Meet eAI
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-slate-400">
            Advanced AI assistance for coding, automation testing,
            AWS, generative AI, and software engineering.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#101827] shadow-2xl md:grid-cols-[260px_1fr]">
          <aside className="border-b border-white/10 bg-slate-950/60 p-4 md:border-b-0 md:border-r">
            <button
              type="button"
              onClick={newConversation}
              disabled={!hydrated || loading}
              className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:opacity-50"
            >
              + New conversation
            </button>

            <p className="mb-3 mt-7 text-xs font-semibold tracking-widest text-slate-500">
              YOUR CONVERSATIONS
            </p>

            <div className="max-h-64 space-y-2 overflow-y-auto md:max-h-[540px]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`rounded-xl border p-2 ${
                    conversation.id === activeId
                      ? "border-cyan-400/40 bg-cyan-400/10"
                      : "border-transparent bg-slate-900"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(conversation.id)}
                    className="w-full truncate text-left text-sm text-slate-200"
                  >
                    {conversation.title}
                  </button>

                  <div className="mt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => renameConversation(conversation.id)}
                      className="text-xs text-slate-400 hover:text-cyan-300"
                    >
                      Rename
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteConversation(conversation.id)}
                      disabled={loading}
                      className="text-xs text-slate-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-slate-900/70 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-white">
                  eAI
                </p>
                <p className="text-xs text-slate-400">
                  Professional AI Engineering Assistant
                </p>
              </div>

              <select
                value={active?.mode || "general"}
                onChange={(event) =>
                  changeMode(event.target.value as Mode)
                }
                disabled={!hydrated || loading}
                aria-label="AI assistant mode"
                className="rounded-xl border border-white/15 bg-slate-950 px-4 py-2 text-sm text-cyan-300"
              >
                {modes.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            <div
              ref={chatContainerRef}
              className="h-[520px] space-y-5 overflow-y-auto overscroll-contain p-5 md:p-7"
              role="log"
              aria-live="polite"
            >
              {(active?.messages || []).map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`min-w-0 max-w-[95%] rounded-2xl px-5 py-4 md:max-w-[90%] ${
                      message.role === "user"
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-white/10 bg-slate-800 text-slate-100"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <MarkdownMessage content={message.content} />
                    ) : (
                      <p className="whitespace-pre-wrap break-words text-sm leading-7">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="rounded-xl bg-slate-800 px-5 py-3 text-sm text-cyan-300">
                  eAI is thinking...
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-slate-900/50 p-5">
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestions[active?.mode || "general"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={loading || !hydrated}
                      onClick={() => void sendMessage(suggestion)}
                      className="rounded-full border border-white/15 px-3 py-2 text-xs text-slate-300 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>

              {loading && (
                <button
                  type="button"
                  onClick={stopGenerating}
                  className="mb-3 rounded-xl border border-red-400/50 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-400/10"
                >
                  ■ Stop Generating
                </button>
              )}

              {!loading &&
                active?.messages.length &&
                active.messages.at(-1)?.role === "assistant" && (
                  <button
                    type="button"
                    onClick={regenerateResponse}
                    className="mb-3 rounded-xl border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10"
                  >
                    ↻ Regenerate Response
                  </button>
                )}

              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask eAI anything..."
                  maxLength={3000}
                  aria-label="Your message"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                />

                <button
                  type="submit"
                  disabled={loading || !hydrated || !input.trim()}
                  className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
                >
                  Send
                </button>
              </form>

              <p className="mt-3 text-center text-xs text-slate-500">
                Powered by Cloudflare Workers AI · AI-generated responses may contain inaccuracies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
