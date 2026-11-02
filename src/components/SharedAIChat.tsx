"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import LessonCheckpoint from "@/components/LessonCheckpoint";
import { normalizeLessonContext, type LessonContext } from "@/lib/study-checkpoints";
import StudyGlyph from "@/components/StudyGlyph";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { defaultLearningProfile, learningLevels, learningApproaches, normalizeLearningProfile, normalizeSavedStudyMessages, type LearningProfile } from "@/lib/study-tutor";
import { readStudyStream } from "@/lib/study-stream";
import { normalizeStudyMath } from "@/lib/study-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Mode = "general" | "math" | "science" | "writing" | "history" | "coding" | "exam" | "engineering";

type Conversation = {
  id: string;
  title: string;
  mode: Mode;
  messages: Message[];
  updatedAt: number;
  learning: LearningProfile;
  checkpoint?: LessonContext;
};

const STORAGE_KEY = "eai-study-conversations-v1";
const OLD_STORAGE_KEY = "eai-study-chat-legacy";

const modes: { id: Mode; label: string }[] = [
  { id: "general", label: "General Tutor" },
  { id: "math", label: "Mathematics" },
  { id: "science", label: "Science" },
  { id: "writing", label: "Writing Studio" },
  { id: "history", label: "History & Humanities" },
  { id: "coding", label: "Computer Science" },
  { id: "exam", label: "Exam Preparation" },
  { id: "engineering", label: "Professional & Technical" },
];

const suggestions: Record<Mode, string[]> = {
  general: [
    "Explain a difficult concept",
    "Help me create a study plan",
    "Teach me something new",
  ],
  math: [
    "Explain derivatives step by step",
    "Help me solve an algebra problem",
    "Teach me probability",
  ],
  science: [
    "Explain cellular respiration",
    "Teach me organic chemistry",
    "Explain Newton's laws",
  ],
  writing: [
    "Help me outline an essay",
    "Improve my thesis statement",
    "Help me structure a research paper",
  ],
  history: [
    "Explain the causes of World War I",
    "Help me analyze a historical source",
    "Explain the Industrial Revolution",
  ],
  coding: [
    "Teach me Python basics",
    "Explain algorithms",
    "Help me debug my code",
  ],
  engineering: [
    "Help me understand AWS architecture trade-offs",
    "Teach me how to design a reliable test automation framework",
    "Practice a system design interview with me",
  ],
  exam: [
    "Quiz me on biology",
    "Create a calculus practice test",
    "Help me prepare for an exam",
  ],
};

const welcomeMessage: Message = {
  role: "assistant",
  content:
    "Welcome to **dAI Tutor**. Set your level and learning goal, choose how you want to learn, then share a topic or problem. If you have already tried it, include your work so we can build from what you know.",
};

function createConversation(mode: Mode = "general"): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "New conversation",
    mode,
    messages: [welcomeMessage],
    updatedAt: Date.now(),
    learning: { ...defaultLearningProfile },
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
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          pre({ children }) {
            const child = children as React.ReactElement<{
              className?: string;
              children?: React.ReactNode;
            }>;

            const className = child.props?.className || "";
            const match = /language-([\w-]+)/.exec(className);
            const code = String(child.props?.children || "").replace(/\n$/, "");

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
        {normalizeStudyMath(content)}
      </ReactMarkdown>
    </div>
  );
}

export default function SharedAIChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [openPanel, setOpenPanel] = useState<"history" | "settings" | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [requestError, setRequestError] = useState<{ id: string; message: string } | null>(null);

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
              ["general", "math", "science", "writing", "history", "coding", "exam", "engineering"].includes(item.mode)
          ).map((item) => ({ ...item, learning: normalizeLearningProfile(item.learning), checkpoint: normalizeLessonContext(item.checkpoint) || undefined, messages: normalizeSavedStudyMessages(item.messages) }));
        }
      }

      if (!initial.length) {
        const old = localStorage.getItem(OLD_STORAGE_KEY);

        if (old) {
          const messages = JSON.parse(old) as Message[];
          const migrated = createConversation();

          if (Array.isArray(messages) && messages.length) {
            migrated.messages = normalizeSavedStudyMessages(messages);
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
    const lastUserIndex = active.messages.findLastIndex(message => message.role === "user");
    const history = regenerate
      ? active.messages.slice(0, lastUserIndex).slice(-12)
      : active.messages.slice(-12);
    const baseMessages = regenerate ? active.messages.slice(0, lastUserIndex + 1) : [...active.messages, { role: "user" as const, content: question }];
    const mode = active.mode;

    updateConversation(id, (conversation) => ({
      ...conversation,
      title:
        conversation.title === "New conversation"
          ? question.slice(0, 45)
          : conversation.title,
      updatedAt: Date.now(),
      messages: baseMessages,
    }));

    setRequestError(null);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/study/chat", {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          history,
          subject: mode,
          learning: active.learning,
        }),
      });

      await readStudyStream(response, (answer) => {
        updateConversation(id, (conversation) => ({
          ...conversation,
          updatedAt: Date.now(),
          messages: [...baseMessages, { role: "assistant", content: answer }],
        }));
      });
    } catch (error) {
      if (!controller.signal.aborted) {
        if (error instanceof Error && error.message.includes("invalid response")) {
          updateConversation(id, conversation => ({ ...conversation, messages: baseMessages }));
        }
        setRequestError({ id, message: error instanceof Error ? error.message : "The tutor could not complete your request. Please try again." });
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
    setRequestError(null);
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


  useEffect(() => {
    function handleStudyModeChange() {
      if (loading) return;
      let selected: string | null;
      try { selected = sessionStorage.getItem("eai-study-selected-mode"); } catch { return; }

      const allowed: Mode[] = [
        "general", "math", "science",
        "writing", "history", "coding", "exam", "engineering"
      ];

      if (!selected || !allowed.includes(selected as Mode)) return;
      try { sessionStorage.removeItem("eai-study-selected-mode"); } catch { /* Storage is optional. */ }

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === activeId
            ? { ...conversation, mode: selected as Mode }
            : conversation
        )
      );
    }

    window.addEventListener("eai-study-mode-change", handleStudyModeChange);

    return () => {
      window.removeEventListener("eai-study-mode-change", handleStudyModeChange);
    };
    if (hydrated) handleStudyModeChange();
  }, [activeId, hydrated, loading]);

  useEffect(() => {
    function receivePracticePrompt(event: Event) {
      if (loading) return;
      const detail = (event as CustomEvent<unknown>).detail;
      if (!detail || typeof detail !== "object") return;
      const { subject, message, title, goal, level, approach, checkpoint } = detail as Record<string, unknown>;
      if (typeof message !== "string" || !message.trim() || message.length > 3000 || !modes.some(mode => mode.id === subject)) return;
      const conversation = createConversation(subject as Mode);
      conversation.checkpoint = normalizeLessonContext(checkpoint) || undefined;
      conversation.title = typeof title === "string" ? title.slice(0, 60) : "Practice discussion";
      if (typeof level === "string" && Object.hasOwn(learningLevels, level)) conversation.learning.level = level as LearningProfile["level"];
      if (typeof approach === "string" && Object.hasOwn(learningApproaches, approach)) conversation.learning.approach = approach as LearningProfile["approach"];
      conversation.learning.goal = typeof goal === "string" ? goal.slice(0, 300) : "Understand this practice problem";
      setConversations(previous => [conversation, ...previous]);
      setActiveId(conversation.id);
      setOpenPanel(null);
      setRequestError(null);
      setInput(message);
    }
    window.addEventListener("eai-study-prompt", receivePracticePrompt);
    return () => window.removeEventListener("eai-study-prompt", receivePracticePrompt);
  }, [activeId, loading]);

  function changeLearning(patch: Partial<LearningProfile>) {
    if (!active || loading) return;
    updateConversation(active.id, conversation => ({ ...conversation, learning: { ...conversation.learning, ...patch } }));
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
        <div className="tutor-section-intro">
          <p className="studio-eyebrow">A LITTLE CURIOSITY GOES A LONG WAY</p>
          <h2>Your AI Tutor</h2>
          <p>A space to ask, work through an idea, and understand the next step.</p>
        </div>
        <div className="tutor-focus-shell" onKeyDown={event => { if(event.key === "Escape" && openPanel) { event.preventDefault(); document.getElementById(`tutor-${openPanel}-trigger`)?.focus(); setOpenPanel(null); } }}>
          <header className="tutor-focus-header">
            <div className="tutor-focus-brand"><StudyGlyph kind="general"/><div><strong>dAI Learning Studio</strong><span>Your learning conversation</span></div></div>
            <div className="tutor-focus-tools">
              <button id="tutor-history-trigger" type="button" aria-expanded={openPanel === "history"} aria-controls="tutor-session-history" onClick={()=>setOpenPanel(openPanel === "history" ? null : "history")}>Recent sessions <span aria-hidden="true">⌄</span></button>
              <button id="tutor-settings-trigger" type="button" aria-expanded={openPanel === "settings"} aria-controls="tutor-session-settings" onClick={()=>setOpenPanel(openPanel === "settings" ? null : "settings")}>Session settings <span aria-hidden="true">⌄</span></button>
              <button type="button" disabled={!hydrated || loading} className="tutor-new-session" onClick={()=>{setOpenPanel(null);newConversation();}}>+ New session</button>
            </div>
          </header>
          {openPanel === "history" && <section id="tutor-session-history" aria-label="Recent sessions" className="tutor-focus-panel">
            <div className="tutor-panel-heading"><h3>Recent sessions</h3><button type="button" onClick={()=>setOpenPanel(null)}>Close</button></div>
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
                    disabled={loading}
                    onClick={() => { setActiveId(conversation.id); setOpenPanel(null); }}
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
          </section>}
          {openPanel === "settings" && <section id="tutor-session-settings" aria-label="Session settings" className="tutor-focus-panel">
            <div className="tutor-panel-heading"><h3>Session settings</h3><button type="button" onClick={()=>setOpenPanel(null)}>Done</button></div>
            <label className="tutor-subject-label">Subject
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
            </label>
              <div className="grid gap-4 sm:grid-cols-[190px_1fr]">
                <label className="text-xs font-medium text-slate-300">
                  Learning level
                  <select aria-label="Learning level" value={active?.learning.level || "college"} disabled={!hydrated || loading}
                    onChange={event => changeLearning({ level: event.target.value as LearningProfile["level"] })}
                    className="mt-2 block w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2.5 text-sm text-white">
                    {Object.entries(learningLevels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label className="text-xs font-medium text-slate-300">
                  What do you want to learn?
                  <input aria-label="Learning goal" value={active?.learning.goal || ""} maxLength={300} disabled={!hydrated || loading}
                    onChange={event => changeLearning({ goal: event.target.value })}
                    placeholder="For example: understand derivatives before Friday’s exam"
                    className="mt-2 block w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2.5 text-sm text-white" />
                </label>
              </div>

          </section>}
          <div className="tutor-focus-main">
            {active && active.title !== "New conversation" && <div className="tutor-context-strip"><span>CURRENT SESSION</span><strong>{active.title}</strong>{active.learning.goal && <p>{active.learning.goal}</p>}{active.checkpoint && <a href="#lesson-understanding-check">Check understanding ↓</a>}</div>}
            <div className="tutor-mode-bar">
              <div role="group" aria-label="Learning approach" className="flex flex-wrap gap-2">
                {Object.entries(learningApproaches).map(([value, item]) => (
                  <button key={value} type="button" aria-pressed={active?.learning.approach === value} disabled={!hydrated || loading}
                    onClick={() => changeLearning({ approach: value as LearningProfile["approach"] })}
                    className={`rounded-lg border px-3 py-2 text-sm transition disabled:opacity-50 ${active?.learning.approach === value ? "border-cyan-300 bg-cyan-300/15 text-cyan-200" : "border-white/15 text-slate-300 hover:border-cyan-400/50"}`}>
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400">{learningApproaches[active?.learning.approach || "guided"].description}</p>
            </div>

            <div
              ref={chatContainerRef}
              className="tutor-dialogue"
              role="log"
              aria-live="polite"
            >
              {!active?.messages.some(message => message.role === "user") ? <div className="tutor-empty-state"><StudyGlyph kind="general"/><h3>What would you like to understand?</h3><p>Ask a question, share a problem, or show what you’ve tried.</p></div> : (active?.messages || []).filter((message,index)=>!(index===0 && message.role==="assistant" && message.content===welcomeMessage.content)).map((message, index) => (
                <div
                  key={index}
                  className={`tutor-message-row flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`tutor-message min-w-0 max-w-[95%] rounded-2xl px-5 py-4 md:max-w-[90%] ${
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
                  Your AI tutor is thinking...
                </div>
              )}
            </div>

            <div className="tutor-composer">
              {!active?.messages.some(message => message.role === "user") && <div className="tutor-starter-prompts">
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
              </div>}

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
                active?.messages.some((message) => message.role === "user") &&
                active.messages.at(-1)?.role === "assistant" && (
                  <button
                    type="button"
                    onClick={regenerateResponse}
                    className="tutor-regenerate"
                  >
                    ↻ Regenerate Response
                  </button>
                )}

              {!loading && active?.messages.some(message => message.role === "user") && (
                <div className="mb-4 flex flex-wrap gap-2" aria-label="Continue learning">
                  {[
                    ["Give me a hint", "Give me just one hint for the current problem without revealing the answer."],
                    ["Explain differently", "Explain the current concept using a different example or analogy."],
                    ["Try a similar problem", "Give me one similar practice problem. Wait for my attempt before showing the answer."],
                    ["Summarize this session", "Summarize what we covered, the gaps shown in my attempts, and what I should practice next. Do not invent progress or scores."],
                  ].map(([label, prompt]) => <button key={label} type="button" onClick={() => void sendMessage(prompt)} className="rounded-lg border border-white/15 px-3 py-2 text-xs text-cyan-200 hover:bg-white/5">{label}</button>)}
                </div>
              )}
              {requestError?.id === activeId && (
                <div role="alert" className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
                  <p>{requestError.message}</p>
                  <button type="button" disabled={loading} onClick={regenerateResponse} className="mt-2 font-semibold underline disabled:opacity-50">Retry last question</button>
                </div>
              )}
              <form onSubmit={handleSubmit} className="tutor-input-row">
                <textarea
                  rows={2}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask a question or share your work…"
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
                Sessions are saved in this browser, without account sync. AI responses can contain mistakes; verify important facts and calculations.
              </p>
            </div>
          </div>
        </div>
        {active?.checkpoint && <LessonCheckpoint key={active.id} context={active.checkpoint} sessionId={active.id} disabled={loading} recentWork={`Learner level: ${active.learning.level}\n`+active.messages.slice(-4).map(message=>`${message.role}: ${message.content.slice(0,1800)}`).join("\n").slice(0,4000)} />}
      </div>
    </section>
  );
}
