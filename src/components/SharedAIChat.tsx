"use client";
import {passageHandoff,DISCUSSION_KEY} from '@/lib/reading/library';
import Link from "next/link";
import TutorReplyWorkbench from "./TutorReplyWorkbench";
import TutorTakeawayNotebook from "./TutorTakeawayNotebook";
import {TUTOR_PREFS_KEY,defaultTutorPreferences,normalizeTutorPreferences,appendTakeaway,replyContext,editSavedTakeaway,takeawayReviewPrompt,warmupPrompt,type TutorPreferences,type TakeawayDraft,type TutorTakeaway} from "@/lib/tutor-v12";
import TutorLearningTools from "./TutorLearningTools";
import ReadingAudio from "./ReadingAudio";
import {tutorActions,selectedExplanation,visibleSessions,type TutorWorkspace} from "@/lib/tutor-workspace";
import CopyCodeButton from "./CopyCodeButton";
import { curiosityHandoff } from "@/app/study/curiosity/journey";
import { algebraDiscussion, key as algebraSampleKey } from "@/lib/algebra-sample";
import {packPracticeEvidence,matchingPractice} from "@/lib/study-recovery";

import { accountConfigured } from "@/lib/study-account";
import {
  useMemo,
  useEffect,
  useLayoutEffect,
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
  source?: import("@/lib/tutor-workspace").TutorSource;
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

function createConversation(mode: Mode = "general",preferences?:TutorPreferences): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "New conversation",
    mode,
    messages: [welcomeMessage],
    updatedAt: Date.now(),
    learning: { ...defaultLearningProfile, depth:preferences?.depth==='default'?undefined:preferences?.depth||"steps",...(preferences?{examples:preferences.examples}:{}) },
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
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs text-slate-400">
          {language || "code"}
        </span>
        <CopyCodeButton code={code} />
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
function useTutorPractice(id:string|undefined,messages:Message[]|undefined,planned:boolean){return useMemo(()=>id&&messages&&!planned?chatPractice(id,messages):null,[id,messages,planned]);}
export default function SharedAIChat({dedicated=false,initialSession,localPreviewOnly=false}:{dedicated?:boolean;initialSession?:string;localPreviewOnly?:boolean}={}) {
  const [focus,setFocus]=useState(false),[textSize,setTextSize]=useState(16),[wide,setWide]=useState(false),[toolsOpen,setToolsOpen]=useState(false),[historyQuery,setHistoryQuery]=useState(""),[mobilePanel,setMobilePanel]=useState("conversation"),[selectedText,setSelectedText]=useState(""),[audio,setAudio]=useState<{id:string;text:string}|null>(null);
  const workspaceRoot=useRef<HTMLElement>(null);
  const [preferences,setPreferences]=useState<TutorPreferences>(defaultTutorPreferences),[preferenceNotice,setPreferenceNotice]=useState(''),[replyIndex,setReplyIndex]=useState<number|null>(null),[showOlder,setShowOlder]=useState(false),[openCheck,setOpenCheck]=useState(0),[openCheckTarget,setOpenCheckTarget]=useState(''),[replyToolVersion,setReplyToolVersion]=useState(0);
  const pendingReplyTool=useRef<{sessionId:string;index:number}|null>(null);
  const preferenceCopy=useRef<{raw:string|null}|null>(null),preferenceValue=useRef<TutorPreferences>(defaultTutorPreferences);
  useLayoutEffect(()=>{try{const raw=localStorage.getItem(TUTOR_PREFS_KEY),value=raw===null?defaultTutorPreferences:normalizeTutorPreferences(JSON.parse(raw));if(!value)throw Error();preferenceCopy.current={raw};preferenceValue.current=value;queueMicrotask(()=>{setPreferences(value);setTextSize(value.textSize);setWide(value.wide);});}catch{preferenceCopy.current=null;queueMicrotask(()=>setPreferenceNotice('Saved preferences could not be read. The original copy is preserved; controls still work for this visit.'));}},[]);
  function rememberPreferences(patch:Partial<TutorPreferences>){const next={...preferences,...patch};setPreferences(next);preferenceValue.current=next;if(!preferenceCopy.current){setPreferenceNotice('These controls apply for this visit. Preference saving is paused; your earlier copy is preserved.');return;}try{preferenceCopy.current.raw=writeStudyCopy(localStorage,TUTOR_PREFS_KEY,preferenceCopy.current.raw,next);setPreferenceNotice('Your defaults are remembered for future sessions.');window.dispatchEvent(new Event('eai-study-progress-change'));}catch{preferenceCopy.current=null;setPreferenceNotice('Preferences could not be saved, or another tab changed them. Your current controls still work; reload after backing up your work.');}}

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [openPanel, setOpenPanel] = useState<"history" | "settings" | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingReply, setPendingReply] = useState<{id:string; messages:Message[]} | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [requestError, setRequestError] = useState<{ id: string; message: string;retry?:boolean } | null>(null);

  const [showTutorHelp,setShowTutorHelp]=useState(false);
  const [resumeNotice,setResumeNotice]=useState("");
  const [storageWarning,setStorageWarning]=useState(""),[savedCheck,setSavedCheck]=useState<LessonCheck|null>(null);
  const [savedPractice,setSavedPractice]=useState<LessonCheck[]>([]);
  const savedCopy=useRef<string|null>(null),saveEnabled=useRef(true),restoring=useRef(true),initialized=useRef(false);
  const followLatest = useRef(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useLayoutEffect(() => {
    // Next Activity can resume a cached room with preserved state. Read the latest
    // copy before the writer runs; never replace locally unsaved work after failure.
    if(initialized.current&&!saveEnabled.current){restoring.current=false;return;}
    restoring.current=true;
    let cancelled=false;
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

        if (old !== null) {
          const messages: unknown = JSON.parse(old);
          if (!Array.isArray(messages)) throw new Error("Unreadable previous tutor conversation");
          const migrated = createConversation();

          if (messages.length) {
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
      initial = [createConversation("general",preferenceValue.current)];
    }

    queueMicrotask(() => {
      if(cancelled)return;
      restoring.current=false;initialized.current=true;
      const requested=initialSession||new URLSearchParams(window.location.search).get("session"),selected=requested?initial.find(s=>s.id===requested):undefined;
      setConversations(selected?[selected,...initial.filter(s=>s.id!==selected.id)]:initial);
      setActiveId(selected?.id||initial[0].id);
      if(requested&&!selected)setResumeNotice("That saved session is unavailable in this browser. Your other work is unchanged.");
      else if(selected)setResumeNotice(selected.draft?.trim()?"Your unsent message is restored. Review it before choosing Send.":"Your saved conversation is open. Continue when ready.");
      setHydrated(true);
      if(requested)requestAnimationFrame(()=>workspaceRoot.current?.scrollIntoView({block:"start"}));
    });
    return()=>{cancelled=true;restoring.current=true;};
  }, [initialSession]);

  useLayoutEffect(() => {
    if (!hydrated||restoring.current) return;

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


  const workspace=active?.workspace||{};
  function patchWorkspace(patch:Partial<TutorWorkspace>){if(active)updateConversation(active.id,c=>({...c,workspace:{...c.workspace,...patch}}));}
  function prepareTool(text:string){prepareStarter(text,practiceTime());setSelectedText("");setMobilePanel("conversation");}
  useEffect(()=>{if(!focus)return;const old=document.body.style.overflow;document.body.style.overflow="hidden";const hidden:{el:HTMLElement;inert:boolean}[]=[];let node=workspaceRoot.current;while(node&&node!==document.body){for(const sibling of Array.from(node.parentElement?.children||[])){if(sibling!==node&&sibling instanceof HTMLElement){hidden.push({el:sibling,inert:sibling.inert});sibling.inert=true;}}node=node.parentElement;}const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"){setFocus(false);requestAnimationFrame(()=>workspaceRoot.current?.querySelector<HTMLButtonElement>('#tutor-focus-toggle')?.focus());}};document.addEventListener('keydown',escape);return()=>{document.body.style.overflow=old;hidden.forEach(({el,inert})=>{el.inert=inert;});document.removeEventListener('keydown',escape);};},[focus]);
  useEffect(()=>{queueMicrotask(()=>{setSelectedText("");setAudio(null);const pending=pendingReplyTool.current;setReplyIndex(pending?.sessionId===activeId?pending.index:null);pendingReplyTool.current=null;setShowOlder(false);setOpenCheck(0);setOpenCheckTarget('');});},[activeId]);
  useEffect(()=>()=>abortControllerRef.current?.abort(),[]);
  const chatId = active?.id, turns = active?.messages, planned = !!active?.checkpoint;
  const practice = useTutorPractice(chatId,turns,planned);

  useEffect(()=>{
    let cancelled=false;
    function refresh(){if(cancelled)return;try{const checks=readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks).items;setSavedPractice(active?.checkpoint&&(!active.learning.goal.trim()||active.learning.goal.trim()===active.checkpoint.goal.trim().slice(0,300))?matchingPractice(active.checkpoint,packPracticeEvidence(active.checkpoint,checks,Date.now()),Date.now()):[]);setSavedCheck(active?.checkpoint&&(!active.learning.goal.trim()||active.learning.goal.trim()===active.checkpoint.goal.trim().slice(0,300))?latestLessonCheck(active.checkpoint,checks,Date.now()):null);}catch{setSavedCheck(null);setSavedPractice([]);}}
    queueMicrotask(refresh);window.addEventListener("eai-study-progress-change",refresh);window.addEventListener("storage",refresh);
    return()=>{cancelled=true;window.removeEventListener("eai-study-progress-change",refresh);window.removeEventListener("storage",refresh);};
  },[active?.id,active?.checkpoint,active?.learning.goal]);
  const earlier=earlierStudyContext(active?.messages||[]);
  function downloadSessions(){const url=URL.createObjectURL(new Blob([JSON.stringify(conversations,null,2)],{type:"application/json"}));const link=document.createElement("a");link.href=url;link.download="dai-tutor-session-backup.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

  useEffect(() => { followLatest.current = true; }, [activeId]);

  useEffect(() => {
    const container = chatContainerRef.current;

    if (container && followLatest.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "instant",
      });
    }
  }, [activeId, active?.messages, loading, pendingReply]);

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
    requestAnimationFrame(()=>workspaceRoot.current?.querySelector<HTMLTextAreaElement>("#tutor-message-input")?.focus());
  }
  function closeTutorHelp(){setShowTutorHelp(false);requestAnimationFrame(()=>workspaceRoot.current?.querySelector<HTMLButtonElement>("#tutor-help-trigger")?.focus());}

  async function sendMessage(text: string, regenerate = false, clearDraft = false) {
    if(localPreviewOnly){setResumeNotice("This local preview has no AI service credentials. Your draft is preserved; learning tools and saved-session controls remain available.");return;}
    const question = text.trim();

    if (!question || loading || !active) return;

    const id = active.id;
    followLatest.current = true;
    const lastUserIndex = active.messages.findLastIndex(message => message.role === "user");
    const preceding=regenerate?active.messages.slice(0,lastUserIndex):active.messages;
    const history=preceding.slice(-12);
    let check:LessonCheck|null=null;let practiceEvidence=null;
    if(active.useContinuity!==false&&active.checkpoint){try{check=readCurrentContinuityCheck(active.checkpoint,active.learning.goal);if(!active.learning.goal.trim()||active.learning.goal.trim()===active.checkpoint.goal.trim().slice(0,300))practiceEvidence=packPracticeEvidence(active.checkpoint,readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks).items,practiceTime());}catch{/* Continue without unreadable feedback; never replace it. */}}
    const requestSource=regenerate?active.messages[lastUserIndex]?.source:workspace.useSource?workspace.source:undefined;
    const baseMessages = regenerate ? active.messages.slice(0, lastUserIndex + 1) : [...active.messages, { role: "user" as const, content: question, ...(requestSource?{source:requestSource}:{}) }];
    const mode = active.mode;

    updateConversation(id, (conversation) => ({
      ...conversation,
      title:
        conversation.title === "New conversation"
          ? question.slice(0, 45)
          : conversation.title,
      updatedAt: Date.now(),
      messages: regenerate ? conversation.messages : baseMessages,
      draft:clearDraft?"":conversation.draft,
    }));

    setRequestError(null);
    setPendingReply({id, messages:baseMessages});
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/study/chat", {
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(60000)]),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          history,
          subject: mode,
          learning: active.learning,
          source: requestSource,
          checkpoint:active.useContinuity!==false?active.checkpoint:undefined,
          continuity:{enabled:active.useContinuity!==false,note:active.useContinuity!==false?active.continuityNote||"":"",earlier:active.useContinuity!==false?earlierStudyContext(preceding):[],check,practiceEvidence},
        }),
      });

      const answer = await readStudyStream(response, text => {
        setPendingReply({id, messages:[...baseMessages, {role:"assistant", content:text}]});
      }, true);
      updateConversation(id, conversation => ({
        ...conversation, updatedAt:Date.now(),
        messages:[...baseMessages, {role:"assistant", content:answer}],
      }));
    } catch (error) {
      const message = controller.signal.aborted ? "Response stopped. You can retry your question."
        : error instanceof Error && error.name === "TimeoutError" ? "The tutor timed out. You can retry your question."
        : error instanceof Error ? error.message : "The tutor could not complete your request. Please try again.";
      setRequestError({id, message});
    } finally {
      setPendingReply(null);
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setLoading(false);
    }
  }

  function newConversation() {
    if (loading) return;
    if(conversations.length>=30){setRequestError({id:activeId,retry:false,message:"You have 30 saved sessions. Download a session backup and remove an older session before starting another."});return;}

    const conversation = createConversation(active?.mode || "general",preferences);

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
      const fresh = createConversation("general",preferences);
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
      if (url.searchParams.get("reading") === "passage") {
        let prompt=null;
        try {prompt=passageHandoff(sessionStorage.getItem(DISCUSSION_KEY));} catch { /* Leave existing drafts untouched. */ }
        if(prompt && conversations.length>=30){setResumeNotice("You have 30 saved sessions. Back up and remove an older session, then reopen the passage. Your drafts are unchanged.");return;}
        url.searchParams.delete("reading");window.history.replaceState(null,"",url);
        if(!prompt){setResumeNotice("The reading passage could not be restored. Your existing drafts are unchanged.");return;}
        try {sessionStorage.removeItem(DISCUSSION_KEY);} catch { /* No personal note is included. */ }
        receivePracticePrompt(new CustomEvent("eai-study-prompt",{detail:prompt}));
        setResumeNotice("Opened a new reading discussion with an unsent passage draft. Your other drafts are preserved. Review it, then choose Send when ready.");return;
      }
      if (url.searchParams.has("curiosity")) {
        const prompt = curiosityHandoff(url.searchParams.get("curiosity"));
        if (prompt && conversations.length >= 30) {
          setResumeNotice("You have 30 saved sessions. Back up and remove an older session, then reopen this discovery. Your drafts are unchanged.");
          return;
        }
        url.searchParams.delete("curiosity");
        window.history.replaceState(null, "", url);
        if (!prompt) {
          setResumeNotice("That discovery is unavailable. Your existing conversations are unchanged.");
          return;
        }
        receivePracticePrompt(new CustomEvent("eai-study-prompt", { detail: prompt }));
        setResumeNotice("Opened a new Curiosity conversation. Your other drafts are preserved. Review the prepared question, then choose Send when ready.");
        return;
      }
      if (url.searchParams.get("from") !== "algebra-sample") return;
      url.searchParams.delete("from");
      window.history.replaceState(null, "", url);
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
    if(Object.hasOwn(patch,'depth')||Object.hasOwn(patch,'examples'))rememberPreferences({...(Object.hasOwn(patch,'depth')?{depth:patch.depth||'default'}:{}),...(patch.examples?{examples:patch.examples}:{})});
  }

  function changeMode(mode: Mode) {
    if (!active || loading) return;

    updateConversation(active.id, (conversation) => ({
      ...conversation,
      mode,
    }));
  }

  const presentedMessages=(pendingReply?.id===activeId?pendingReply.messages:active?.messages||[]).map((message,index)=>({message,index})).filter(({message,index})=>!(index===0&&message.role==='assistant'&&message.content===welcomeMessage.content));
  const hiddenCount=!showOlder&&presentedMessages.length>8?presentedMessages.length-8:0;
  const reply=replyIndex===null?undefined:active?.messages[replyIndex];
  const selectedReply=replyIndex===null||!active?null:replyContext(active.messages,replyIndex);
  function openReply(index:number){if(workspace.takeawayDraft?.text.trim()&&workspace.takeawayDraft.replyIndex!==index){setResumeNotice('You have a takeaway draft for another reply. Continue it in Learning tools → My tutor notebook before starting another.');return;}setReplyIndex(index);setReplyToolVersion(n=>n+1);requestAnimationFrame(()=>workspaceRoot.current?.querySelector<HTMLElement>('.tutor-reply-workbench')?.scrollIntoView({block:'center'}));}
  function saveTakeaway(draft:TakeawayDraft){if(!active)return;if(draft.editingId){editSavedTakeaway(workspace.takeaways||[],draft.editingId,draft.title,draft.text);updateConversation(active.id,c=>({...c,workspace:{...c.workspace,takeaways:editSavedTakeaway(c.workspace?.takeaways||[],draft.editingId!,draft.title,draft.text),takeawayDraft:undefined}}));return;}const item:TutorTakeaway={replyIndex:draft.replyIndex,id:crypto.randomUUID(),title:draft.title.trim(),text:draft.text.trim(),question:draft.question,replyExcerpt:draft.replyExcerpt,createdAt:practiceTime(),...(draft.source?{source:draft.source}:{})};appendTakeaway(workspace.takeaways||[],item);updateConversation(active.id,c=>({...c,workspace:{...c.workspace,takeaways:appendTakeaway(c.workspace?.takeaways||[],item),takeawayDraft:undefined}}));}
  function reviewTakeaway(item:TutorTakeaway){if(loading)return;if(conversations.length>=30){setResumeNotice('You have 30 sessions. Back up your work and free a session before opening a separate takeaway review. Your notes are unchanged.');return;}const session:Conversation={...createConversation(active?.mode||'general',preferences),title:`Recall: ${item.title}`.slice(0,60),draft:takeawayReviewPrompt(item),workspace:{...(item.source?{source:item.source,useSource:true}:{})}};setConversations(previous=>[session,...previous]);setActiveId(session.id);setResumeNotice('A separate recall session is ready. Your earlier drafts and notes are preserved. Review the question request, then Send.');}
  function continueTakeawayDraft(){const session=conversations.find(c=>c.id===activeId&&c.workspace?.takeawayDraft)||conversations.find(c=>c.workspace?.takeawayDraft);if(!session?.workspace?.takeawayDraft)return;if(session.id!==activeId)pendingReplyTool.current={sessionId:session.id,index:session.workspace.takeawayDraft.replyIndex};else setReplyIndex(session.workspace.takeawayDraft.replyIndex);setActiveId(session.id);setReplyToolVersion(n=>n+1);setResumeNotice('Your takeaway draft is open below the conversation.');requestAnimationFrame(()=>workspaceRoot.current?.querySelector<HTMLElement>('.tutor-reply-workbench')?.scrollIntoView({block:'center'}));}
  function editTakeaway(sessionId:string,item:TutorTakeaway){if(workspace.takeawayDraft?.text.trim()){setResumeNotice('Finish or save your current takeaway draft before editing another note.');return;}const session=conversations.find(c=>c.id===sessionId);if(!session)return;const index=item.replyIndex??session.messages.findIndex(m=>m.role==='assistant'&&m.content.startsWith(item.replyExcerpt));if(index<0){setResumeNotice('The original reply is unavailable. Your saved takeaway is unchanged.');return;}if(session.workspace?.takeawayDraft?.text.trim()){setResumeNotice('That session already has a takeaway draft. Continue it from My tutor notebook first.');return;}const draft:TakeawayDraft={replyIndex:index,editingId:item.id,title:item.title,text:item.text,question:item.question,replyExcerpt:item.replyExcerpt,...(item.source?{source:item.source}:{})};updateConversation(sessionId,c=>({...c,workspace:{...c.workspace,takeawayDraft:draft}}));if(sessionId!==activeId)pendingReplyTool.current={sessionId,index};else setReplyIndex(index);setActiveId(sessionId);setReplyToolVersion(n=>n+1);requestAnimationFrame(()=>workspaceRoot.current?.querySelector<HTMLElement>('.tutor-reply-workbench')?.scrollIntoView({block:'center'}));}
  function jumpQuestion(index:number){setShowOlder(true);followLatest.current=false;requestAnimationFrame(()=>{const row=workspaceRoot.current?.querySelector<HTMLElement>(`[data-tutor-message-index="${index}"]`);row?.scrollIntoView({block:'center'});row?.focus();});}
  function openUnderstanding(){setOpenCheckTarget(practice?.key||activeId);setOpenCheck(n=>n+1);requestAnimationFrame(()=>workspaceRoot.current?.querySelector<HTMLElement>('#chat-understanding-check, #lesson-understanding-check')?.scrollIntoView({block:'start'}));}

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(active?.draft||"",false,true);
  }

  return (
    <section ref={workspaceRoot} id="ai-assistant" aria-labelledby="tutor-heading" className={`tutor-v11 border-t border-white/10 py-24 ${dedicated?'tutor-dedicated':''} ${focus?'tutor-focus-active':''} ${wide?'tutor-wide':''}`} style={{'--tutor-font-size':`${textSize}px`} as React.CSSProperties}>

      <div className="mx-auto max-w-7xl px-6">
        <div className="tutor-section-intro" onKeyDown={event=>{if(showTutorHelp&&event.key==="Escape"){event.preventDefault();closeTutorHelp();}}}>
          <p className="studio-eyebrow">ASK · EXPLORE · PRACTICE</p>
          <div className="tutor-heading-row"><h2 id="tutor-heading">Your AI Tutor</h2><button id="tutor-help-trigger" type="button" className="tutor-how-button" aria-expanded={showTutorHelp} aria-controls="tutor-help-guide" onClick={()=>setShowTutorHelp(!showTutorHelp)}>Tutor guide <span aria-hidden="true">?</span></button></div>
          <p>Ask a question, work through a problem, or review your reasoning.</p>
          {!dedicated&&<Link className="tutor-workspace-link" href={activeId?`/study/tutor?session=${encodeURIComponent(activeId)}`:'/study/tutor'}>Open full workspace ↗</Link>}
          {dedicated&&<Link className="tutor-workspace-link" href={activeId?`/study?session=${encodeURIComponent(activeId)}#ai-assistant`:'/study#ai-assistant'}>← Back to the Learning Studio</Link>}
          {showTutorHelp&&<div id="tutor-help-guide" className="tutor-help-guide" role="region" aria-label="How to use your AI Tutor"><div className="tutor-help-heading"><h3>Start with a question. Build understanding.</h3><button type="button" aria-label="Close tutor guide" onClick={closeTutorHelp}>Close</button></div><ol><li><strong>Tell the tutor what you need.</strong><p>Share a subject, paste a problem or show your attempt. Add your level or goal if useful; you can begin with one question.</p></li><li><strong>Choose how to work.</strong><p><b>Guide me</b> asks guiding questions. <b>Explain</b> clarifies an idea. <b>Quiz me</b> offers practice. <b>Check my work</b> reviews your attempt. <b>Study plan</b> helps structure a goal.</p></li><li><strong>Review your message, then Send.</strong><p>Example prompts only fill your draft. Edit them freely. Follow-up and regeneration buttons request another tutor response.</p></li><li><strong>Keep learning at your pace.</strong><p>Ask for a different explanation, try a fresh question or use Recent sessions to return later. Use New session for a separate topic. To study from a document, <a href="/study/materials">open your personal library</a>.</p></li></ol><p className="tutor-help-saving">Sessions and unsent drafts are saved in this browser. {accountConfigured?<>Choose <a href="/study/account">optional account saving</a> to keep an account copy.</>:"No account is required."} Check important facts and calculations against your materials.</p></div>}
        </div>
        <div className="tutor-focus-shell" onKeyDown={event => { if(event.key === "Escape" && openPanel) { event.preventDefault(); workspaceRoot.current?.querySelector<HTMLButtonElement>(`#tutor-${openPanel}-trigger`)?.focus(); setOpenPanel(null); } }}>
          <header className="tutor-focus-header">
            <div className="tutor-focus-brand"><StudyGlyph kind="general"/><div><strong>dAI Learning Studio</strong><span>Your learning conversation</span></div></div>
            <div className="tutor-focus-tools">
              <button id="tutor-history-trigger" type="button" aria-expanded={openPanel === "history"} aria-controls="tutor-session-history" onClick={()=>setOpenPanel(openPanel === "history" ? null : "history")}>Recent sessions <span aria-hidden="true">⌄</span></button>
              <button id="tutor-settings-trigger" type="button" aria-expanded={openPanel === "settings"} aria-controls="tutor-session-settings" onClick={()=>setOpenPanel(openPanel === "settings" ? null : "settings")}>Session settings <span aria-hidden="true">⌄</span></button>
              <button type="button" disabled={!hydrated || loading} className="tutor-new-session" onClick={()=>{setOpenPanel(null);newConversation();}}>+ New session</button>
            </div>
          </header>
          {localPreviewOnly&&<p className="tutor-preview-notice" role="status">Local preview · Learning tools and saving are ready. Live tutor replies require the AI service configuration used by the live site. Your draft stays here.</p>}
          <div className="tutor-comfort-bar" aria-label="Tutor reading controls"><button id="tutor-focus-toggle" aria-pressed={focus} onClick={()=>setFocus(!focus)}>{focus?'Exit Focus mode':'Focus mode'}</button><button aria-label="Smaller tutor text" disabled={textSize<=16} onClick={()=>{const size=Math.max(16,textSize-2);setTextSize(size);rememberPreferences({textSize:size});}}>A−</button><span aria-live="polite">{textSize}px</span><button aria-label="Larger tutor text" disabled={textSize>=24} onClick={()=>{const size=Math.min(24,textSize+2);setTextSize(size);rememberPreferences({textSize:size});}}>A+</button><button className="tutor-width-toggle" aria-pressed={wide} onClick={()=>{setWide(!wide);rememberPreferences({wide:!wide});}}>{wide?'Comfortable width':'Wider conversation'}</button><label>Explanation<select aria-label="Explanation depth" disabled={!hydrated||loading} value={active?.learning.depth||'default'} onChange={e=>changeLearning({depth:e.target.value==='default'?undefined:e.target.value as LearningProfile['depth']})}><option value="default">Automatic · concise</option><option value="quick">Quick explanation</option><option value="steps">Step by step</option><option value="deep">Go deeper</option></select></label></div>
          {openPanel === "history" && <section id="tutor-session-history" aria-label="Recent sessions" className="tutor-focus-panel">
            <div className="tutor-panel-heading"><h3>Recent sessions</h3><button type="button" onClick={()=>setOpenPanel(null)}>Close</button></div>
            <label>Search my sessions<input type="search" value={historyQuery} onChange={e=>setHistoryQuery(e.target.value)} placeholder="Title, conversation or recap"/></label>
            {!visibleSessions(conversations,historyQuery).length&&<p>No matching sessions. Your saved work is unchanged.</p>}
            <div className="max-h-64 space-y-2 overflow-y-auto md:max-h-[540px]">
              {visibleSessions(conversations,historyQuery).map((conversation) => (
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
                    {conversation.workspace?.pinned?"★ ":""}{conversation.title}
                  </button>

                  {conversation.workspace?.nextStep&&<p className="tutor-history-next">Next: {conversation.workspace.nextStep}</p>}
                  <div className="mt-2 flex gap-3">
                    <button type="button" disabled={loading||(!conversation.workspace?.pinned&&conversations.filter(c=>c.workspace?.pinned).length>=5)} onClick={()=>updateConversation(conversation.id,c=>({...c,workspace:{...c.workspace,pinned:!c.workspace?.pinned}}))}>{conversation.workspace?.pinned?'Unpin':'Pin session'}</button>
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

              <details className="tutor-defaults"><summary>My remembered defaults</summary><p>Text size and width apply across visits. Explanation and example defaults apply to new sessions; existing sessions keep their own choices.</p><button type="button" disabled={loading} onClick={()=>{changeLearning({depth:preferences.depth==='default'?undefined:preferences.depth,examples:preferences.examples});}}>Apply my defaults to this session</button><button type="button" onClick={()=>{rememberPreferences(defaultTutorPreferences);setTextSize(16);setWide(false);}}>Reset my defaults</button><p>Resetting defaults keeps saved conversations, drafts and this session’s teaching choices.</p>{preferenceNotice&&<p role="status">{preferenceNotice}</p>}</details>
              <label className="tutor-example-preference">Example preference<select aria-label="Example preference" value={active?.learning.examples||'none'} disabled={loading||!hydrated} onChange={e=>changeLearning({examples:e.target.value as LearningProfile['examples']})}><option value="none">No preference</option><option value="everyday">Everyday life</option><option value="engineering">Engineering</option><option value="cooking">Cooking</option><option value="sport">Sport</option></select></label><p>A preference for examples, not a learning-style label.</p>
              <label className="tutor-continuity-note">Carry-forward note for this session<textarea aria-label="Session carry-forward note" rows={3} maxLength={1000} disabled={!active||loading} value={active?.continuityNote||""} onChange={event=>active&&updateConversation(active.id,c=>({...c,continuityNote:event.target.value}))} placeholder="Keep a useful detail or the step you want to revisit…"/></label>
              <label className="tutor-continuity-choice"><input type="checkbox" aria-label="Use extra session context" checked={active?.useContinuity!==false} disabled={!active||loading} onChange={event=>active&&updateConversation(active.id,c=>({...c,useContinuity:event.target.checked}))}/>Use my carry-forward note, earlier session excerpts and up to four matching saved lesson checks.</label><p className="tutor-continuity-fine">Only this session is used. Recent messages and your current goal are still included when this is off. This does not create a mastery score or unrestricted memory.</p>
          </section>}
          {active&&<TutorLearningTools key={active.id} workspace={workspace} patch={patchWorkspace} prepare={prepareTool} messages={active.messages} disabled={loading||!hydrated} open={toolsOpen} toggle={()=>setToolsOpen(!toolsOpen)} notebook={<TutorTakeawayNotebook sessions={conversations} disabled={loading||!hydrated} review={reviewTakeaway} mark={(sessionId,id)=>{const at=practiceTime();updateConversation(sessionId,c=>({...c,workspace:{...c.workspace,takeaways:c.workspace?.takeaways?.map(item=>item.id===id?{...item,reviewedAt:Math.max(at,item.createdAt)}:item)}}));}} continueDraft={continueTakeawayDraft} edit={editTakeaway}/>}/>}
          {workspace.source&&<div className="tutor-mobile-panel-tabs" role="group" aria-label="Tutor workspace view"><button aria-pressed={mobilePanel==='conversation'} onClick={()=>setMobilePanel('conversation')}>Conversation</button><button aria-pressed={mobilePanel==='source'} onClick={()=>setMobilePanel('source')}>{workspace.source.kind==='problem'?'Question':'Source passage'}</button></div>}
          <div className={`tutor-work-area ${workspace.source?'tutor-has-source':''}`} data-mobile-panel={mobilePanel}>
          <div id="tutor-chat-workspace" className="tutor-focus-main">
            {active?.messages.some(m=>m.role==='user')&&<details className="tutor-return-card"><summary>Pick up where you paused</summary><p><strong>Your last question</strong></p><p>{active.messages.filter(m=>m.role==='user').at(-1)?.content.slice(0,600)}</p>{workspace.nextStep&&<p><strong>Your next step:</strong> {workspace.nextStep}</p>}{workspace.recap&&<p className="tutor-preserve-text">{workspace.recap}</p>}<button disabled={loading} onClick={()=>workspaceRoot.current?.querySelector<HTMLTextAreaElement>('#tutor-message-input')?.focus()}>Continue this session</button><button disabled={loading} onClick={()=>prepareTool(warmupPrompt(workspace.recap||'',active.messages.filter(m=>m.role==='user').at(-1)?.content||''))}>Warm up with one recall question</button><button disabled={loading} onClick={newConversation}>Start fresh · keep this session</button></details>}
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

            {presentedMessages.some(({message})=>message.role==='user')&&<nav className="tutor-conversation-navigation" aria-label="Conversation navigation"><label>Jump to question<select aria-label="Jump to question" value="" onChange={e=>{if(e.target.value)jumpQuestion(Number(e.target.value));}}><option value="">Choose a question</option>{presentedMessages.filter(({message})=>message.role==='user').map(({message,index},i)=><option key={index} value={index}>{i+1}. {message.content.slice(0,80)}</option>)}</select></label><button onClick={()=>{followLatest.current=true;const log=chatContainerRef.current;log?.scrollTo({top:log.scrollHeight,behavior:'instant'});}}>Latest reply ↓</button>{showOlder&&presentedMessages.length>8&&<button onClick={()=>{setShowOlder(false);requestAnimationFrame(()=>{const log=chatContainerRef.current;log?.scrollTo({top:log.scrollHeight});});}}>Collapse older exchanges</button>}</nav>}
            <div
              ref={chatContainerRef}
              onScroll={event => {
                const log = event.currentTarget;
                followLatest.current = log.scrollHeight - log.scrollTop - log.clientHeight < 80;
              }}
              tabIndex={0}
              aria-label="Tutor conversation"
              className="tutor-dialogue"
              data-empty={!active?.messages.some(message => message.role === "user")}
              role="log"
              aria-live="polite"
            >
              {!active?.messages.some(message => message.role === "user") ? <div className="tutor-empty-state"><StudyGlyph kind="general"/><h3>What would you like to understand?</h3><p>Start with a subject, a question or a problem. Add your level or what you’ve tried if useful.</p><div className="tutor-start-paths">{[['Understand something','explain','I want to understand…'],['Solve a problem','guided','Help me work through this problem…'],['Practice what I know','practice','Give me one practice question about…']].map(([label,approach,draft])=><button key={approach} disabled={!hydrated||loading} onClick={()=>{changeLearning({approach:approach as LearningProfile['approach']});prepareTool(draft);}}>{label}<span aria-hidden="true">↗</span></button>)}</div></div> : <>{hiddenCount>0&&<button className="tutor-older-exchanges" onClick={()=>setShowOlder(true)}>Show earlier exchanges · {hiddenCount} messages</button>}{presentedMessages.slice(hiddenCount).map(({message,index}) => (
                <div
                  key={index}
                  data-tutor-message-index={index} tabIndex={-1}
                  className={`tutor-message-row flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    onMouseUp={event=>{if(message.role!=="assistant")return;const selection=window.getSelection();if(selection&&!selection.isCollapsed&&selection.rangeCount&&event.currentTarget.contains(selection.anchorNode)&&event.currentTarget.contains(selection.focusNode)){setSelectedText(selection.toString().slice(0,1000));}}}
                    className={`tutor-message min-w-0 max-w-[95%] rounded-2xl px-5 py-4 md:max-w-[90%] ${
                      message.role === "user"
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-white/10 bg-slate-800 text-slate-100"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <>
                        <MarkdownMessage content={message.content} />
                        <div className="tutor-response-actions"><button type="button" disabled={loading} onClick={()=>openReply(index)}>Work with this reply</button>{message===active?.messages.at(-1)&&(practice||active?.checkpoint)&&<button disabled={loading} onClick={openUnderstanding}>Check my understanding</button>}<details><summary>More reply actions</summary>
                        <button type="button" className="tutor-listen-button" disabled={loading} onClick={()=>setAudio({id:activeId,text:message.content.replace(/```[\s\S]*?```/g,' [Code block omitted from read-aloud.] ').replace(/[#*_`]/g,'')})}>Listen to this explanation</button><button type="button" className="tutor-listen-button" disabled={loading} onClick={()=>setSelectedText(message.content.slice(0,1000))}>Ask about a part</button>
                        {message === active?.messages.at(-1) && message.content.trim() && !loading && <div className="tutor-starter-prompts">
                          <button type="button" onClick={event => prepareStarter("Explain the step in your last reply a different way. Use one small worked example, then ask me to try a similar step.",event.timeStamp)}>Explain this step differently</button>
                          <button type="button" onClick={event => prepareStarter("Check your last answer from scratch. Recalculate any disputed step, compare quotations with the supplied passage, and distinguish evidence from assumptions. Explain what holds up or needs correction. If evidence is missing, ask for it.",event.timeStamp)}>Check this answer</button>
                        </div>}</details></div>
                      </>
                    ) : (
                      <div><p className="whitespace-pre-wrap break-words text-sm leading-7">{message.content}</p>{message.source&&<details className="tutor-sent-source"><summary>Text supplied with this question · {message.source.title}</summary><p className="tutor-preserve-text">{message.source.text}</p></details>}</div>
                    )}
                  </div>
                </div>
              ))}</>}

              {loading && (
                <div className="rounded-xl bg-slate-800 px-5 py-3 text-sm text-cyan-300">
                  Your AI tutor is thinking...
                </div>
              )}
            </div>

            {replyIndex!==null&&reply?.role==='assistant'&&<TutorReplyWorkbench key={`${activeId}-${replyIndex}-${replyToolVersion}`} index={replyIndex} question={selectedReply?.question||''} reply={reply.content} source={selectedReply?.source} workspace={workspace} patch={patchWorkspace} save={saveTakeaway} prepare={prepareTool} close={()=>setReplyIndex(null)} disabled={loading||!hydrated}/>}
            {selectedText&&<aside className="tutor-selection" aria-label="Selected tutor passage"><label>Exact part to explain<textarea aria-label="Selected tutor text to explain" rows={3} maxLength={1000} value={selectedText} onChange={e=>setSelectedText(e.target.value)}/></label><button disabled={loading||!selectedText.trim()} onClick={()=>prepareTool(selectedExplanation(selectedText))}>Explain this selection</button><button onClick={()=>setSelectedText('')}>Dismiss selection</button></aside>}
            {audio?.id===activeId&&<ReadingAudio context="tutor" key={audio.text} paragraphs={[{id:'explanation',text:audio.text}]} paragraph="explanation" onClose={()=>setAudio(null)}/>}
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

              {!loading && active?.messages.at(-1)?.role === "user" && requestError?.id !== activeId && (
                <div role="status" className="mb-3">
                  <p>Your last question has no completed reply.</p>
                  <button type="button" onClick={regenerateResponse} className="tutor-regenerate">Retry last question</button>
                </div>
              )}

              {!loading && active?.messages.some(message => message.role === "user") && (
                <details className="tutor-follow-ups"><summary>More ways to continue</summary><div className="mb-4 flex flex-wrap gap-2" aria-label="Continue learning">
                  {[
                    ["Give me a hint", "Give me just one hint for the current problem without revealing the answer."],
                    ["Explain differently", "Explain the current concept using a different example or analogy."],
                    ["Try a similar problem", "Give me one similar practice problem. Wait for my attempt before showing the answer."],
                    ["Summarize this session", "Summarize what we covered, the gaps shown in my attempts, and what I should practice next. Do not invent progress or scores."],
                  ].map(([label, prompt]) => <button key={label} type="button" onClick={() => void sendMessage(prompt)} className="rounded-lg border border-white/15 px-3 py-2 text-xs text-cyan-200 hover:bg-white/5">{label}</button>)}
                </div></details>
              )}
              <button type="button" className="tutor-stuck" disabled={loading||!hydrated} onClick={()=>prepareTool(tutorActions.stuck)}>I’m stuck · help with this step</button>
              {requestError?.id === activeId && (
                <div role="alert" className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
                  <p>{requestError.message}</p>
                  {requestError.retry!==false?<button type="button" disabled={loading} onClick={regenerateResponse} className="mt-2 font-semibold underline disabled:opacity-50">Retry last question</button>:<button type="button" onClick={downloadSessions} className="mt-2 font-semibold underline">Download session backup</button>}
                </div>
              )}
              <form onSubmit={handleSubmit} className="tutor-input-row">
                <textarea
                  id="tutor-message-input"
                  disabled={!hydrated || !active}
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
                  disabled={localPreviewOnly || loading || !hydrated || !active?.draft?.trim()}
                  className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
                >
                  Send
                </button>
              </form>

              {workspace.source&&<p className="tutor-source-receipt">{workspace.useSource?'Attached to next question: ':'No new source attached: '}{workspace.source.title} · <button type="button" onClick={()=>setMobilePanel('source')}>View exact text</button></p>}
              <p className="mt-3 text-center text-xs text-slate-500">
                Drafts and sessions are saved in this browser. <a href="#study-saving-status">Saving &amp; recovery</a>. AI can make mistakes; check important answers against your sources.
              </p>
              <details className="tutor-request-note"><summary>About AI requests and account saving</summary><p>Send, the older follow-up buttons and regeneration request an AI response. Learning tools, hint steps and example prompts only prepare a draft. Scratchpad and recap text are not automatically sent. A selected source is sent only while its checkbox is on. {accountConfigured && <>Manage optional account saving on the <a href="/study/account">Account page</a>.</>}</p></details>
            </div>
          </div>
          {workspace.source&&<aside className="tutor-source-panel" aria-label="Pinned question or source"><div className="tutor-panel-heading"><h3>{workspace.source.kind==='problem'?'Your question':'Source [S1]'}</h3><button onClick={()=>{patchWorkspace({source:undefined,useSource:false});setMobilePanel('conversation');}}>Unpin</button></div><strong>{workspace.source.title}</strong><p className="tutor-preserve-text">{workspace.source.text}</p>{workspace.source.href&&<Link href={workspace.source.href}>Open original location ↗</Link>}<label><input type="checkbox" checked={!!workspace.useSource} disabled={loading} onChange={e=>patchWorkspace({useSource:e.target.checked})}/>Attach this exact text to my next question</label><p>Only this excerpt is supplied. Other parts of the document are not available to this conversation. Source labels identify supplied text; they are not independent fact-checks. Earlier submitted excerpts can still appear in recent session history, even when this checkbox is off.</p></aside>}
          </div>
        </div>
        {practice && <LessonCheckpoint key={practice.key} context={practice.context} openRequest={openCheckTarget===practice.key?openCheck:0} sessionId={practice.key} kind="chat" disabled={loading||localPreviewOnly} recentWork={practice.recentWork}/>}
        {active?.checkpoint && <LessonCheckpoint key={active.id} context={active.checkpoint} openRequest={openCheckTarget===active.id?openCheck:0} sessionId={active.id} disabled={loading||localPreviewOnly} recentWork={`Learner level: ${active.learning.level}\n`+active.messages.slice(-4).map(message=>`${message.role}: ${message.content.slice(0,1800)}`).join("\n").slice(0,4000)} />}
      </div>
    </section>
  );
}
