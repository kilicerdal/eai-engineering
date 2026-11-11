"use client";
import { algebraDiscussion, key as algebraSampleKey } from "@/lib/algebra-sample";
import {packPracticeEvidence,matchingPractice} from "@/lib/study-recovery";

import { accountConfigured } from "@/lib/study-account";
import {
  useMemo,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {chatPractice} from "@/lib/study-chat-check";
import LessonCheckpoint from "@/components/LessonCheckpoint";
import {CHECK_KEY,latestLessonCheck,normalizeLessonChecks,checkLabel,checkReviewMethod,type LessonCheck, normalizeLessonContext, type LessonContext } from "@/lib/study-checkpoints";
import {normalizeStudyConversations,earlierStudyContext,findResumableConversation,type StudyConversation} from "@/lib/study-continuity";
import {readSavedArray,writeStudyCopy} from "@/lib/study-safe-storage";
import StudyGlyph from "@/components/StudyGlyph";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { defaultLearningProfile, learningLevels, learningApproaches, normalizeSavedStudyMessages, type LearningProfile } from "@/lib/study-tutor";
import { readStudyStream } from "@/lib/study-stream";
import { normalizeStudyMath } from "@/lib/study-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Mode = "general" | "math" | "science" | "writing" | "history" | "coding" | "exam" | "engineering";

type Conversation = StudyConversation;

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
    "Explain photosynthesis using an everyday analogy",
    "Guide me through 3x + 4 = 19 without giving the answer first",
    "Help me improve a paragraph while keeping my own ideas",
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

function readCurrentContinuityCheck(context:LessonContext,goal=""){if(goal.trim()&&goal.trim()!==context.goal.trim().slice(0,300))return null;return latestLessonCheck(context,readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks).items,practiceTime());}

function resumableLesson(conversations:Conversation[],context:unknown){return findResumableConversation(conversations,context,Date.now());}
function inputTime(stamp:number){return Math.round(stamp>1e12?stamp:performance.timeOrigin+stamp);}

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

function practiceTime(){return Date.now();}
export default function SharedAIChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [openPanel, setOpenPanel] = useState<"history" | "settings" | null>(null);
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [requestError, setRequestError] = useState<{ id: string; message: string;retry?:boolean } | null>(null);

  const [showTutorHelp,setShowTutorHelp]=useState(false);
  const [resumeNotice,setResumeNotice]=useState("");
  const [storageWarning,setStorageWarning]=useState(""),[savedCheck,setSavedCheck]=useState<LessonCheck|null>(null);
  const [savedPractice,setSavedPractice]=useState<LessonCheck[]>([]);
  const savedCopy=useRef<string|null>(null),saveEnabled=useRef(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let initial: Conversation[] = [];

    try {
      const saved = localStorage.getItem(STORAGE_KEY);savedCopy.current=saved;

      if (saved!==null) {
        const parsed: unknown = JSON.parse(saved);

        initial=normalizeStudyConversations(parsed);
        if(!Array.isArray(parsed)||initial.length!==parsed.length)throw new Error("The saved sessions could not be fully read.");
      }

      if (!initial.length) {
        const old = localStorage.getItem(OLD_STORAGE_KEY);

        if (old) {
          const messages = JSON.parse(old) as Message[];
          const migrated = createConversation();

          if (Array.isArray(messages) && messages.length) {
            migrated.messages = normalizeSavedStudyMessages(messages);
            if(migrated.messages.length!==messages.length)throw new Error("The legacy session could not be fully restored.");
            migrated.title = "Previous conversation";
          }

          initial = [migrated];
        }
      }
    } catch {
      initial = [];saveEnabled.current=false;
      queueMicrotask(()=>setStorageWarning("Saved sessions could not be fully read. The original copy is preserved; new work stays in this tab. Download a copy before leaving."));
    }

    if (!initial.length) {
      initial = [createConversation()];
    }

    queueMicrotask(() => {
      const requested=new URLSearchParams(window.location.search).get("session"),selected=requested?initial.find(s=>s.id===requested):undefined;
      setConversations(selected?[selected,...initial.filter(s=>s.id!==selected.id)]:initial);
      setActiveId(selected?.id||initial[0].id);
      if(requested&&!selected)setResumeNotice("That saved session is unavailable in this browser. Your other work is unchanged.");
      else if(selected)setResumeNotice(selected.draft?.trim()?"Your unsent message is restored. Review it before choosing Send.":"Your saved conversation is open. Continue when ready.");
      setHydrated(true);
      if(requested)requestAnimationFrame(()=>document.getElementById("ai-assistant")?.scrollIntoView({block:"start"}));
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if(!saveEnabled.current)return;
    try {
      savedCopy.current=writeStudyCopy(localStorage,STORAGE_KEY,savedCopy.current,conversations);
      const currentUrl=new URL(window.location.href);
      if(activeId&&currentUrl.searchParams.has("session")&&currentUrl.searchParams.get("session")!==activeId){currentUrl.searchParams.set("session",activeId);window.history.replaceState(null,"",currentUrl.pathname+currentUrl.search+currentUrl.hash);}
      if(!loading)window.dispatchEvent(new Event("eai-study-progress-change"));
    }catch{saveEnabled.current=false;queueMicrotask(()=>setStorageWarning("Session saving is paused because storage failed or another tab changed the saved copy. Your work is still open here. Download it before reloading."));}
  }, [conversations, hydrated, loading, activeId]);

  const active = conversations.find(
    (conversation) => conversation.id === activeId
  );


  const chatId = active?.id, turns = active?.messages, planned = !!active?.checkpoint;
  const practice = useMemo(() => chatId && turns && !planned ? chatPractice(chatId, turns) : null, [chatId, turns, planned]);

  useEffect(()=>{
    let cancelled=false;
    function refresh(){if(cancelled)return;try{const checks=readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks).items;setSavedPractice(active?.checkpoint&&(!active.learning.goal.trim()||active.learning.goal.trim()===active.checkpoint.goal.trim().slice(0,300))?matchingPractice(active.checkpoint,packPracticeEvidence(active.checkpoint,checks,Date.now()),Date.now()):[]);setSavedCheck(active?.checkpoint&&(!active.learning.goal.trim()||active.learning.goal.trim()===active.checkpoint.goal.trim().slice(0,300))?latestLessonCheck(active.checkpoint,checks,Date.now()):null);}catch{setSavedCheck(null);setSavedPractice([]);}}
    queueMicrotask(refresh);window.addEventListener("eai-study-progress-change",refresh);window.addEventListener("storage",refresh);
    return()=>{cancelled=true;window.removeEventListener("eai-study-progress-change",refresh);window.removeEventListener("storage",refresh);};
  },[active?.id,active?.checkpoint,active?.learning.goal]);
  const earlier=earlierStudyContext(active?.messages||[]);
  function downloadSessions(){const url=URL.createObjectURL(new Blob([JSON.stringify(conversations,null,2)],{type:"application/json"}));const link=document.createElement("a");link.href=url;link.download="dai-tutor-session-backup.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

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

  function prepareStarter(suggestion:string,stamp:number){
    if(!active||loading||!hydrated)return;
    const draft=active.draft?.trim()?`${active.draft}\n\n${suggestion}`:suggestion;
    if(draft.length>3000){setRequestError({id:active.id,retry:false,message:"Your draft is full. Edit it before adding an example prompt."});return;}
    updateConversation(active.id,c=>({...c,draft,updatedAt:inputTime(stamp)}));setRequestError(null);
    requestAnimationFrame(()=>document.getElementById("tutor-message-input")?.focus());
  }
  function closeTutorHelp(){setShowTutorHelp(false);requestAnimationFrame(()=>document.getElementById("tutor-help-trigger")?.focus());}

  async function sendMessage(text: string, regenerate = false, clearDraft = false) {
    const question = text.trim();

    if (!question || loading || !active) return;

    const id = active.id;
    const lastUserIndex = active.messages.findLastIndex(message => message.role === "user");
    const preceding=regenerate?active.messages.slice(0,lastUserIndex):active.messages;
    const history=preceding.slice(-12);
    let check:LessonCheck|null=null;let practiceEvidence=null;
    if(active.useContinuity!==false&&active.checkpoint){try{check=readCurrentContinuityCheck(active.checkpoint,active.learning.goal);if(!active.learning.goal.trim()||active.learning.goal.trim()===active.checkpoint.goal.trim().slice(0,300))practiceEvidence=packPracticeEvidence(active.checkpoint,readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks).items,practiceTime());}catch{/* Continue without unreadable feedback; never replace it. */}}
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
      draft:clearDraft?"":conversation.draft,
    }));

    setRequestError(null);
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
          checkpoint:active.useContinuity!==false?active.checkpoint:undefined,
          continuity:{enabled:active.useContinuity!==false,note:active.useContinuity!==false?active.continuityNote||"":"",earlier:active.useContinuity!==false?earlierStudyContext(preceding):[],check,practiceEvidence},
        }),
      });

      await readStudyStream(response, (answer) => {
        updateConversation(id, (conversation) => ({
          ...conversation,
          updatedAt: Date.now(),
          messages: [...baseMessages, { role: "assistant", content: answer }],
        }));
      }, true);
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
    if(conversations.length>=30){setRequestError({id:activeId,retry:false,message:"You have 30 saved sessions. Download a session backup and remove an older session before starting another."});return;}

    const conversation = createConversation(active?.mode || "general");

    setConversations((previous) => [
      conversation,
      ...previous,
    ]);
    setActiveId(conversation.id);
    setRequestError(null);
    setResumeNotice("");
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
      if (loading) {setResumeNotice("Finish or stop the current reply, then open your saved attempt again. Your current work is unchanged.");return;}
      const detail = (event as CustomEvent<unknown>).detail;
      if (!detail || typeof detail !== "object") return;
      const { subject, message, title, goal, level, approach, checkpoint } = detail as Record<string, unknown>;
      if (typeof message !== "string" || !message.trim() || message.length > 3000 || !modes.some(mode => mode.id === subject)) return;
      const existing=checkpoint?resumableLesson(conversations,checkpoint):null;
      if(existing){
        const prepared=existing.draft?.trim()?existing.draft:`Continue our work on ${existing.checkpoint!.lesson.title}. Focus on the latest relevant saved check and the next useful step, without restarting intake.`;
        setConversations(previous=>{const current=previous.find(c=>c.id===existing.id)!;return [{...current,draft:prepared,updatedAt:Date.now()},...previous.filter(c=>c.id!==existing.id)];});setActiveId(existing.id);setOpenPanel(null);setRequestError(null);setResumeNotice(existing.draft?.trim()?"Reopened your lesson with its unsent message preserved. Review it before choosing Send.":"Reopened your existing lesson conversation. Review the prepared continuation before choosing Send.");return;
      }
      if(conversations.length>=30){setRequestError({id:activeId,retry:false,message:"You have 30 saved sessions. Download a backup and remove an older session before opening another lesson."});return;}
      const conversation = createConversation(subject as Mode);
      conversation.checkpoint = normalizeLessonContext(checkpoint) || undefined;
      conversation.draft=message;
      conversation.title = typeof title === "string" ? title.slice(0, 60) : "Practice discussion";
      if (typeof level === "string" && Object.hasOwn(learningLevels, level)) conversation.learning.level = level as LearningProfile["level"];
      if (typeof approach === "string" && Object.hasOwn(learningApproaches, approach)) conversation.learning.approach = approach as LearningProfile["approach"];
      conversation.learning.goal = typeof goal === "string" ? goal.slice(0, 300) : "Understand this practice problem";
      setConversations(previous => [conversation, ...previous]);
      setActiveId(conversation.id);
      setOpenPanel(null);
      setRequestError(null);
    }
    window.addEventListener("eai-study-prompt", receivePracticePrompt);
    let mounted = true;
    if (hydrated && !loading) queueMicrotask(() => {
      if (!mounted) return;
      const url = new URL(window.location.href);
      if (url.searchParams.get("from") !== "algebra-sample") return;
      url.searchParams.delete("from");
      window.history.replaceState(window.history.state, "", url);
      let message = algebraDiscussion(null);
      try {
        message = algebraDiscussion(sessionStorage.getItem(algebraSampleKey));
      } catch {
        setResumeNotice("Your sample answers could not be restored. You can enter the step you want to discuss.");
      }
      receivePracticePrompt(new CustomEvent("eai-study-prompt", {
        detail: {subject: "math", title: "Algebra sample", message, goal: "Understand how to balance equations"},
      }));
    });
    return () => {
      mounted = false;
      window.removeEventListener("eai-study-prompt", receivePracticePrompt);
    };
  }, [activeId, hydrated, loading, conversations]);

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
    void sendMessage(active?.draft||"",false,true);
  }

  return (
    <section id="ai-assistant" aria-labelledby="tutor-heading" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="tutor-section-intro" onKeyDown={event=>{if(showTutorHelp&&event.key==="Escape"){event.preventDefault();closeTutorHelp();}}}>
          <p className="studio-eyebrow">ASK · EXPLORE · PRACTICE</p>
          <div className="tutor-heading-row"><h2 id="tutor-heading">Your AI Tutor</h2><button id="tutor-help-trigger" type="button" className="tutor-how-button" aria-expanded={showTutorHelp} aria-controls="tutor-help-guide" onClick={()=>setShowTutorHelp(!showTutorHelp)}>Tutor guide <span aria-hidden="true">?</span></button></div>
          <p>Ask a question, work through a problem, or review your reasoning.</p>
          {showTutorHelp&&<div id="tutor-help-guide" className="tutor-help-guide" role="region" aria-label="How to use your AI Tutor"><div className="tutor-help-heading"><h3>Start with a question. Build understanding.</h3><button type="button" aria-label="Close tutor guide" onClick={closeTutorHelp}>Close</button></div><ol><li><strong>Tell the tutor what you need.</strong><p>Share a subject, paste a problem or show your attempt. Add your level or goal if useful; you can begin with one question.</p></li><li><strong>Choose how to work.</strong><p><b>Guide me</b> asks guiding questions. <b>Explain</b> clarifies an idea. <b>Quiz me</b> offers practice. <b>Check my work</b> reviews your attempt. <b>Study plan</b> helps structure a goal.</p></li><li><strong>Review your message, then Send.</strong><p>Example prompts only fill your draft. Edit them freely. Follow-up and regeneration buttons request another tutor response.</p></li><li><strong>Keep learning at your pace.</strong><p>Ask for a different explanation, try a fresh question or use Recent sessions to return later. Use New session for a separate topic. To study from a document, <a href="/study/materials">open your personal library</a>.</p></li></ol><p className="tutor-help-saving">Sessions and unsent drafts are saved in this browser. {accountConfigured?<>Choose <a href="/study/account">optional account saving</a> to keep an account copy.</>:"No account is required."} Check important facts and calculations against your materials.</p></div>}
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
                    onClick={() => {setConversations(previous=>{const current=previous.find(c=>c.id===conversation.id)!;return [{...current,updatedAt:Date.now()},...previous.filter(c=>c.id!==conversation.id)];});setActiveId(conversation.id);setResumeNotice(conversation.draft?.trim()?"Your unsent message is restored. Review it before choosing Send.":"");setOpenPanel(null);}}
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

              <label className="tutor-continuity-note">Carry-forward note for this session<textarea aria-label="Session carry-forward note" rows={3} maxLength={1000} disabled={!active||loading} value={active?.continuityNote||""} onChange={event=>active&&updateConversation(active.id,c=>({...c,continuityNote:event.target.value}))} placeholder="Keep a useful detail or the step you want to revisit…"/></label>
              <label className="tutor-continuity-choice"><input type="checkbox" aria-label="Use extra session context" checked={active?.useContinuity!==false} disabled={!active||loading} onChange={event=>active&&updateConversation(active.id,c=>({...c,useContinuity:event.target.checked}))}/>Use my carry-forward note, earlier session excerpts and up to four matching saved lesson checks.</label><p className="tutor-continuity-fine">Only this session is used. Recent messages and your current goal are still included when this is off. This does not create a mastery score or unrestricted memory.</p>
          </section>}
          <div id="tutor-chat-workspace" className="tutor-focus-main">
            {resumeNotice&&<p className="goal-notice" role="status">{resumeNotice}</p>}
            {storageWarning&&<p className="goal-notice" role="status">{storageWarning} <button type="button" onClick={downloadSessions}>Download session backup</button></p>}
            {active&&<details className="tutor-continuity-preview"><summary>What the tutor can use {active.useContinuity===false?"· extra context off":`· ${earlier.length} earlier excerpts${savedCheck?" + saved feedback":""}`}</summary><p>Recent messages, your selected level and current goal are sent with your question. Earlier excerpts stay within this session. Saved checks must match its exact objective and source version; excerpts may be shortened.</p>{active.useContinuity!==false?<>{active.continuityNote&&<div><strong>Your carry-forward note</strong><p>{active.continuityNote}</p></div>}{earlier.map((item,index)=><div key={index}><strong>{item.role==="user"?"Your earlier words":"Earlier tutor response · may contain mistakes"}</strong><p>{item.content}</p></div>)}{savedCheck&&<div><strong>Latest matching check · {checkLabel(savedCheck)} · {checkReviewMethod(savedCheck)}</strong><p>{savedCheck.result.reasoningGap}</p><p>{savedCheck.result.nextStep}</p></div>}{savedPractice.length>1&&<div><strong>{savedPractice.length} matching practice checks</strong><p>The tutor can compare these attempts for this same objective and source version. Matching outcomes alone do not establish the same misconception.</p>{savedPractice.map(c=><p key={c.id}>{checkLabel(c)} · {c.question.question.slice(0,180)}</p>)}</div>}{!active.continuityNote&&!earlier.length&&!savedCheck&&<p>No extra context yet. Add a carry-forward note in Session settings when useful.</p>}</>:<p>Your extra context is off for this session. Change this in Session settings.</p>}</details>}
            {active && active.title !== "New conversation" && <div className="tutor-context-strip"><span>CURRENT SESSION</span><strong>{active.title}</strong>{active.learning.goal && <p>{active.learning.goal}</p>}{practice && <a href="#chat-understanding-check">Check my understanding ↓</a>}{active.checkpoint && <a href="#lesson-understanding-check">Check understanding ↓</a>}</div>}
            <div className="tutor-mode-bar">
              <label className="tutor-mobile-approach">Learning approach<select aria-label="Learning approach" value={active?.learning.approach || "guided"} disabled={!hydrated || loading} onChange={event=>changeLearning({approach:event.target.value as LearningProfile["approach"]})}>{Object.entries(learningApproaches).map(([value,item])=><option key={value} value={value}>{item.label}</option>)}</select></label>
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
              data-empty={!active?.messages.some(message => message.role === "user")}
              role="log"
              aria-live="polite"
            >
              {!active?.messages.some(message => message.role === "user") ? <div className="tutor-empty-state"><StudyGlyph kind="general"/><h3>What would you like to understand?</h3><p>Start with a subject, a question or a problem. Add your level or what you’ve tried if useful.</p></div> : (active?.messages || []).filter((message,index)=>!(index===0 && message.role==="assistant" && message.content===welcomeMessage.content)).map((message, index) => (
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
                      <>
                        <MarkdownMessage content={message.content} />
                        {message === active?.messages.at(-1) && message.content.trim() && !loading && <div className="tutor-starter-prompts">
                          <button type="button" onClick={event => prepareStarter("Explain the step in your last reply a different way. Use one small worked example, then ask me to try a similar step.",event.timeStamp)}>Explain this step differently</button>
                          <button type="button" onClick={event => prepareStarter("Check your last answer from scratch. Recalculate any disputed step, compare quotations with the supplied passage, and distinguish evidence from assumptions. Explain what holds up or needs correction. If evidence is missing, ask for it.",event.timeStamp)}>Check this answer</button>
                        </div>}
                      </>
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
              {!active?.messages.some(message => message.role === "user") && <details className="tutor-example-drawer"><summary>Try an example question</summary><div className="tutor-starter-prompts"><p className="tutor-starter-caption">Use an example to start a draft, then edit and Send.</p>
                {suggestions[active?.mode || "general"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={loading || !hydrated}
                      onClick={event => prepareStarter(suggestion,event.timeStamp)}
                      className="rounded-full border border-white/15 px-3 py-2 text-xs text-slate-300 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div></details>}

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
                  {requestError.retry!==false?<button type="button" disabled={loading} onClick={regenerateResponse} className="mt-2 font-semibold underline disabled:opacity-50">Retry last question</button>:<button type="button" onClick={downloadSessions} className="mt-2 font-semibold underline">Download session backup</button>}
                </div>
              )}
              <form onSubmit={handleSubmit} className="tutor-input-row">
                <textarea
                  id="tutor-message-input"
                  rows={2}
                  value={active?.draft||""}
                  onChange={(event) => {if(active){const value=event.target.value,at=inputTime(event.timeStamp);updateConversation(active.id,c=>({...c,draft:value,updatedAt:at}));}}}
                  placeholder="Tell me what you want to understand, or paste a problem…"
                  maxLength={3000}
                  aria-label="Your message"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                />

                <button
                  type="submit"
                  disabled={loading || !hydrated || !active?.draft?.trim()}
                  className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
                >
                  Send
                </button>
              </form>

              <p className="mt-3 text-center text-xs text-slate-500">
                Drafts and sessions are saved in this browser. <a href="#study-saving-status">Saving &amp; recovery</a>. AI can make mistakes; check important answers against your sources.
              </p>
              <details className="tutor-request-note"><summary>About AI requests and account saving</summary><p>Send, follow-up and regeneration buttons request an AI response. Example prompts only prepare a draft. {accountConfigured && <>Manage optional account saving on the <a href="/study/account">Account page</a>.</>}</p></details>
            </div>
          </div>
        </div>
        {practice && <LessonCheckpoint key={practice.key} context={practice.context} sessionId={practice.key} kind="chat" disabled={loading} recentWork={practice.recentWork}/>}
        {active?.checkpoint && <LessonCheckpoint key={active.id} context={active.checkpoint} sessionId={active.id} disabled={loading} recentWork={`Learner level: ${active.learning.level}\n`+active.messages.slice(-4).map(message=>`${message.role}: ${message.content.slice(0,1800)}`).join("\n").slice(0,4000)} />}
      </div>
    </section>
  );
}
