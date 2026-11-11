"use client";

import StudyGuide from "@/components/StudyGuide";
import { useEffect, useRef, useState } from "react";
import { readStudyStream } from "@/lib/study-stream";
import { writeStudyCopy } from "@/lib/study-safe-storage";
import StudyNavigation from "@/components/StudyNavigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";


const STORAGE_KEY = "eai-writing-studio-v1";

const prompts = [
  {
    label: "Argumentative Essay",
    description: "Develop a clear claim supported by evidence.",
    template:
      "Introduction\n\nThesis Statement:\n\nBody Paragraph 1 — Main Argument\n\nBody Paragraph 2 — Supporting Evidence\n\nBody Paragraph 3 — Counterargument\n\nConclusion\n",
  },
  {
    label: "Research Paper",
    description: "Organize a research question, evidence, and analysis.",
    template:
      "Research Question:\n\nIntroduction\n\nLiterature Review\n\nMethodology / Approach\n\nAnalysis\n\nConclusion\n\nReferences\n",
  },
  {
    label: "Literary Analysis",
    description: "Analyze themes, characters, and textual evidence.",
    template:
      "Title / Author:\n\nCentral Argument:\n\nIntroduction\n\nClose Reading — Passage 1\n\nClose Reading — Passage 2\n\nInterpretation\n\nConclusion\n",
  },
  {
    label: "Personal Statement",
    description: "Tell a compelling story about your experiences.",
    template:
      "Opening / Personal Story\n\nChallenge or Turning Point\n\nWhat I Learned\n\nHow I Grew\n\nFuture Goals\n",
  },
];

const CHAT_STORAGE_KEY = "eai-writing-chat-v1";



const ESSAY_SCORE_CATEGORIES = [
  "Thesis Strength",
  "Grammar and Clarity",
  "Organization and Structure",
  "Evidence and Reasoning",
] as const;


function standardizeEssayScoreHeadings(feedback: string): string {
  const categories = [
    "Thesis Strength",
    "Grammar and Clarity",
    "Organization and Structure",
    "Evidence and Reasoning",
  ];

  let result = feedback;

  for (const category of categories) {
    result = result.replace(
      /^#{1,6}\s*\*{0,2}([^\n]+?)\*{0,2}\s*$/gm,
      (line, heading: string) => {
        const cleaned = heading.replace(/\*+$/g, "").trim();

        const match = cleaned.match(
          /^(.+?):\s*(?:Score:\s*)?(\d+(?:\.\d+)?)\s*\/\s*10$/i
        );

        if (!match) return line;

        if (match[1].trim().toLowerCase() !== category.toLowerCase()) {
          return line;
        }

        return `## ${category}\nScore: ${match[2]}/10`;
      }
    );
  }

  return result;
}

function parseEssayScores(feedback: string) {
  feedback = standardizeEssayScoreHeadings(feedback);
  const primary = feedback.split(
    /^# Detailed Section Analysis\s*$/m
  )[0];

  const scores = ESSAY_SCORE_CATEGORIES.map((category) => {
    const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Accept Markdown headings, bold headings, and inline scores.
    const pattern = new RegExp(
      "(?:^|\\n)\\s*(?:#{1,4}\\s*)?(?:\\*\\*)?" +
      escaped +
      "(?:\\*\\*)?\\s*[:\\-]?\\s*" +
      "(?:\\*\\*)?Score\\s*:\\s*" +
      "(\\d+(?:\\.\\d+)?)\\s*/\\s*10",
      "i"
    );

    const match = primary.match(pattern);

    if (!match) {
      // Also support scores on the line after the heading.
      const heading = new RegExp(
        "(?:^|\\n)\\s*(?:#{1,4}\\s*)?(?:\\*\\*)?" +
        escaped +
        "(?:\\*\\*)?\\s*$",
        "im"
      );

      const headingMatch = heading.exec(primary);

      if (!headingMatch) return null;

      const section = primary.slice(
        headingMatch.index + headingMatch[0].length
      ).split(/\n\s*(?:#{1,4}\s+|\*\*)/)[0];

      const scoreMatch = section.match(
        /\bScore\s*:\s*(\d+(?:\.\d+)?)\s*\/\s*10\b/i
      );

      if (!scoreMatch) return null;

      const value = Number(scoreMatch[1]);

      return Number.isFinite(value) && value >= 0 && value <= 10
        ? value
        : null;
    }

    const value = Number(match[1]);

    return Number.isFinite(value) && value >= 0 && value <= 10
      ? value
      : null;
  });

  if (scores.some((score) => score === null)) {
    return null;
  }

  const values = scores as number[];

  return {
    scores: values,
    overall: Math.round(
      values.reduce((sum, value) => sum + value, 0) * 2.5
    ),
  };
}

function normalizeEssayEvaluation(feedback: string): string {
  feedback = standardizeEssayScoreHeadings(feedback);
  const parsed = parseEssayScores(feedback);

  if (!parsed) return feedback;

  const correctScore = `${parsed.overall}/100`;

  const separator = "\n# Detailed Section Analysis";
  const separatorIndex = feedback.indexOf(separator);

  const primary =
    separatorIndex >= 0
      ? feedback.slice(0, separatorIndex)
      : feedback;

  const details =
    separatorIndex >= 0
      ? feedback.slice(separatorIndex)
      : "";

  // Replace the entire overall-score section, including
  // any conflicting score originally generated by the AI.
  const headingPattern = /^#{1,3}\s*Overall Score\s*$/im;
  const headingMatch = headingPattern.exec(primary);

  let normalized: string;

  if (headingMatch) {
    const headingStart = headingMatch.index;
    const afterHeading =
      headingStart + headingMatch[0].length;

    const remaining = primary.slice(afterHeading);
    const nextHeading = /\n#{1,3}\s+/.exec(remaining);

    const sectionEnd = nextHeading
      ? afterHeading + nextHeading.index
      : primary.length;

    normalized =
      primary.slice(0, headingStart) +
      `## Overall Score\n\nOverall Score: ${correctScore}\n\n` +
      primary.slice(sectionEnd).trimStart();
  } else {
    normalized =
      `## Overall Score\n\nOverall Score: ${correctScore}\n\n` +
      primary;
  }

  return normalized + details;
}

function EssayScoreDashboard({ feedback }: { feedback: string }) {
  const parsed = parseEssayScores(feedback);
  if (!parsed) return null;

  const validScores = parsed.scores;
  const overall = parsed.overall;
  const categories = ESSAY_SCORE_CATEGORIES.map((label) => ({ label }));

  return (
    <section className="mb-5 rounded-xl border border-cyan-400/30 bg-[#0c1424] p-5">
      <h3 className="text-sm font-bold text-cyan-300">
        AI Essay Evaluation Dashboard
      </h3>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-5xl font-bold text-white">{overall}</span>
        <span className="pb-1 text-lg text-slate-400">/100</span>
      </div>

      <p className="mt-2 text-xs text-amber-200">
        AI estimate, not an official grade. Calculated from four equally weighted categories; the AI-generated written score may differ.
      </p>

      <div className="mt-6 space-y-4">
        {categories.map((category, index) => (
          <div key={category.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-300">{category.label}</span>
              <span className="font-semibold text-cyan-300">
                {validScores[index]}/10
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{ width: `${validScores[index] * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function WritingStudioPage() {
  const [title, setTitle] = useState("Untitled Essay");
  const [content, setContent] = useState("");
  const [ready, setReady] = useState(false);
  const [savedAt, setSavedAt] = useState("");
  const essayCopy = useRef<string | null>(null);
  const feedbackCopy = useRef<string | null>(null);
  const essayPaused = useRef(false);
  const feedbackPaused = useRef(false);
  const [essayWarning, setEssayWarning] = useState("");
  const [feedbackWarning, setFeedbackWarning] = useState("");
  const [streamingAnswer, setStreamingAnswer] = useState("");
  const [chatReady, setChatReady] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [retryUntil, setRetryUntil] = useState(0);
  const [retrySeconds, setRetrySeconds] = useState(0);
  const [followUp, setFollowUp] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);



  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(CHAT_STORAGE_KEY);

        feedbackCopy.current = saved;
        if (saved !== null) {
          const parsed: unknown = JSON.parse(saved);

          if (!Array.isArray(parsed)) throw new Error("Unreadable feedback");
          {
            const valid = parsed.filter(
              (item): item is {
                role: "user" | "assistant";
                content: string;
              } =>
                typeof item === "object" &&
                item !== null &&
                (item.role === "user" || item.role === "assistant") &&
                typeof item.content === "string"
            );

            if (valid.length !== parsed.length) throw new Error("Incomplete feedback history");
            setChatHistory(valid.slice(-20));
          }
        }
      } catch {
        feedbackPaused.current = true;
        setFeedbackWarning("Saved feedback could not be opened. Copy any new feedback before leaving.");
      }

      setChatReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        essayCopy.current = saved;
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (!parsed || Array.isArray(parsed) || typeof parsed !== "object" ||
              !(typeof parsed.title === "string" || typeof parsed.content === "string") ||
              (parsed.title !== undefined && typeof parsed.title !== "string") ||
              (parsed.content !== undefined && typeof parsed.content !== "string")) throw new Error("Unreadable essay");
          setTitle(parsed.title ?? "Untitled Essay");
          setContent(parsed.content ?? "");
        }
      } catch {
        essayPaused.current = true;
        setEssayWarning("Your saved essay could not be opened. Download any new writing before leaving.");
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready || essayPaused.current) return;
    try {
      essayCopy.current = writeStudyCopy(localStorage, STORAGE_KEY, essayCopy.current, { title, content });
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      queueMicrotask(() => setSavedAt(time));
    } catch {
      essayPaused.current = true;
      queueMicrotask(() => setEssayWarning("Browser saving paused. Storage is unavailable or another tab changed the saved essay. Download this draft before reloading."));
    }
  }, [title, content, ready]);

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  const characterCount = content.length;


  useEffect(() => {
    if (!chatReady || feedbackPaused.current) return;
    try {
      feedbackCopy.current = writeStudyCopy(localStorage, CHAT_STORAGE_KEY, feedbackCopy.current, chatHistory.slice(-20));
    } catch {
      feedbackPaused.current = true;
      queueMicrotask(() => setFeedbackWarning("Feedback saving paused. Copy this tab’s feedback before reloading."));
    }
  }, [chatHistory, chatReady]);


  useEffect(() => {
    if (!retryUntil) return;

    const updateCountdown = () => {
      const remaining = Math.max(
        0,
        Math.ceil((retryUntil - Date.now()) / 1000)
      );

      setRetrySeconds(remaining);

      if (remaining === 0) {
        setRetryUntil(0);
      }
    };

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [retryUntil]);

  function handleAIRateLimit(response: Response): never {
    const retryAfter = response.headers.get("Retry-After");
    const seconds = retryAfter ? Number(retryAfter) : NaN;

    if (response.status === 429) {
      const waitSeconds =
        Number.isFinite(seconds) && seconds > 0
          ? Math.ceil(seconds)
          : 60;

      setRetrySeconds(waitSeconds);
      setRetryUntil(Date.now() + waitSeconds * 1000);

      throw new Error(
        `AI usage limit reached. Please wait ${Math.ceil(waitSeconds / 60)} minute(s).`
      );
    }

    throw new Error(`AI request failed (HTTP ${response.status}).`);
  }

  async function analyzeFullEssay() {
    const essay = content.trim();

    if (!essay || aiLoading || retryUntil > Date.now()) return;

    // V3.0: Use the same evaluation workflow for short essays.
    // Long essays continue through the existing chunked analysis.
    if (essay.length <= 2600) {
      await requestFeedback("Evaluate My Essay");
      return;
    }

    const chunkSize = 1700;
    const chunks: string[] = [];

    for (let start = 0; start < essay.length; start += chunkSize) {
      chunks.push(essay.slice(start, start + chunkSize));
    }

    if (chunks.length > 8) {
      setAiError("Full essay analysis currently supports up to 13,600 characters.");
      return;
    }

    setAiLoading(true);
    setAiError("");

    setStreamingAnswer("");
    const collected: string[] = [];

    try {
      for (let i = 0; i < chunks.length; i++) {
        const message =
          `Analyze section ${i + 1} of ${chunks.length} of an academic essay. ` +
          "Evaluate thesis, clarity, structure, evidence, and reasoning. " +
          "Identify strengths and specific improvements. " +
          "Do not assign an overall essay score from this section alone.\n\n" +
          chunks[i];

        const response = await fetch("/api/study/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "writing",
            message,
            history: [],
          }),
        });

        if (!response.ok) {
          handleAIRateLimit(response);
        }

        const answer = await readStudyStream(response, () => {}, true);

        collected.push(`## Essay Section ${i + 1}\n\n${answer}`);
      }


      // Combine section feedback into one unified evaluation.
      // Limit the synthesis input to the backend's 3,000-character cap.
      const sectionSummary = collected
        .map((section, index) =>
          `Section ${index + 1}: ${section.slice(0, 240)}`
        )
        .join("\n\n");

      const synthesisPrompt = [
        "Create a unified academic essay evaluation from the section feedback.",
        "The feedback covers the essay in sequential sections.",
        "Evaluate the essay as a whole, but do not claim to have read",
        "the original essay beyond the supplied section feedback.",
        "Use these exact Markdown headings:",
        "## Overall Score",
        "## Thesis Strength",
        "Score: X/10",
        "## Grammar and Clarity",
        "Score: X/10",
        "## Organization and Structure",
        "Score: X/10",
        "## Evidence and Reasoning",
        "Score: X/10",
        "## Top 3 Improvements",
        "Use equal weighting for all four category scores.",
        "Overall score = sum of four category scores multiplied by 2.5.",
        "Explain strengths, weaknesses, and actionable improvements.",
        "Do not invent citations or evidence.",
        "",
        sectionSummary,
      ].join("\n").slice(0, 2900);

      const synthesisResponse = await fetch("/api/study/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "writing",
          message: synthesisPrompt,
          history: [],
        }),
      });

      if (!synthesisResponse.ok) {
        handleAIRateLimit(synthesisResponse);
      }

      const unifiedFeedback = await readStudyStream(synthesisResponse, setStreamingAnswer, true);

      setChatHistory((previous) => [
        ...previous,
        {
          role: "user" as const,
          content: `Analyze my full essay (${chunks.length} sections).`,
        },
        {
          role: "assistant" as const,
          content:
            "# Unified Full-Essay Evaluation\n\n" +
            normalizeEssayEvaluation(unifiedFeedback) +
            "\n\n---\n\n# Detailed Section Analysis\n\n" +
            collected.join("\n\n---\n\n"),
        },
      ].slice(-20));
    } catch (error) {
      setAiError(
        error instanceof Error ? error.message : "Essay analysis failed."
      );
    } finally {
      setAiLoading(false);
    }
  }



  const latestValidEvaluation = [...chatHistory]
    .reverse()
    .find(
      (message) =>
        message.role === "assistant" &&
        parseEssayScores(message.content) !== null
    );

  function downloadPDFReport() {
    const evaluation = latestValidEvaluation;

    if (!evaluation) return;

    const escapeHTML = (value: string) =>
      value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[character];
      });

    const reportTitle = title.trim() || "Untitled Essay";
    const reportText = evaluation.content;

    const parsed = parseEssayScores(reportText);
    if (!parsed) return;

    const overall = parsed.overall;

    const scores = ESSAY_SCORE_CATEGORIES.map((category, index) => ({
      category,
      value: parsed.scores[index],
    }));

    const scoreRows = scores
      .map(
        (item) => `
          <div class="score-row">
            <span>${escapeHTML(item.category)}</span>
            <strong>${item.value === null ? "Not available" : `${item.value}/10`}</strong>
          </div>
        `
      )
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHTML(reportTitle)} - dAI Evaluation</title>
<style>
  @page { size: A4; margin: 18mm; }
  * { box-sizing: border-box; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #172033;
    margin: 0;
    line-height: 1.6;
  }
  .header {
    background: #10213b;
    color: white;
    padding: 26px;
    border-radius: 10px;
    margin-bottom: 24px;
  }
  .brand {
    color: #75e1ed;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  h1 { font-size: 25px; margin: 12px 0 5px; }
  .subtitle { font-size: 13px; color: #cbd5e1; }
  .overall {
    background: #edf9fc;
    border: 1px solid #c3e8ef;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 22px;
  }
  .overall strong { font-size: 34px; color: #086f83; }
  .score-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e7eb;
    padding: 11px 0;
    gap: 20px;
  }
  .score-row strong { white-space: nowrap; }
  h2 { font-size: 18px; margin-top: 28px; }
  .feedback {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: 12px;
    line-height: 1.75;
  }
  .note {
    margin-top: 28px;
    border-top: 1px solid #e5e7eb;
    padding-top: 12px;
    font-size: 10px;
    color: #64748b;
  }
  @media print {
    .header, .overall {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .score-row { break-inside: avoid; }
  }

  /* V2.6 PROFESSIONAL PDF */
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }

  body {
    font-size: 12px;
    line-height: 1.75;
    letter-spacing: 0.1px;
  }

  h1, h2, h3 {
    line-height: 1.35;
    break-after: avoid;
  }

  h2 {
    font-size: 17px;
    color: #10213b;
    margin-top: 24px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 14px;
    color: #086f83;
    margin-top: 18px;
    margin-bottom: 8px;
  }

  p {
    margin: 8px 0 12px;
    orphans: 3;
    widows: 3;
  }

  .header, .overall, .score-row {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .score-row {
    padding: 10px 0;
    font-size: 12px;
  }

  .overall {
    box-shadow: none;
    margin-top: 12px;
  }

  .header {
    padding: 28px;
  }

  strong {
    font-weight: 700;
  }

  @page {
    size: A4;
    margin: 18mm;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="brand">dAI LEARNING STUDIO</div>
    <h1>Academic Writing Evaluation</h1>
    <div class="subtitle">${escapeHTML(reportTitle)}</div>
    <div class="subtitle">Generated ${escapeHTML(new Date().toLocaleString())}</div>
  </div>

  <div class="overall">
    <div>OVERALL ESSAY SCORE</div>
    <strong>${overall === null ? "N/A" : `${overall}/100`}</strong>
    <div>Calculated from four equally weighted categories when available.</div>
  </div>

  <h2>Evaluation Categories</h2>
  ${scoreRows}

  <h2>Detailed AI Feedback</h2>
  <div class="feedback">${escapeHTML(reportText)}</div>

  <div class="note">
    dAI Learning Studio | AI-generated educational feedback.
    This report is not an official academic grade.
  </div>
</body>
</html>`;

    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
      window.alert("Please allow pop-ups to generate the PDF report.");
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(html);
    reportWindow.document.close();

    reportWindow.onload = () => {
      reportWindow.focus();
      reportWindow.print();
    };
  }

  function downloadEvaluationReport() {
    const latestEvaluation = latestValidEvaluation;

    if (!latestEvaluation) return;
    const parsed = parseEssayScores(latestEvaluation.content);
    if (!parsed) return;


    const report = [
      "dAI LEARNING STUDIO",
      "ACADEMIC WRITING STUDIO",
      "ESSAY EVALUATION REPORT",
      "========================================",
      "",
      `Essay Title: ${title.trim() || "Untitled Essay"}`,
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "IMPORTANT: AI-generated educational feedback, not an official grade.",
      "",
      "========================================",
      "EVALUATION",
      "========================================",
      "",
      `Validated Overall Score: ${parsed.overall}/100`,
      ...ESSAY_SCORE_CATEGORIES.map(
        (category, index) =>
          `${category}: ${parsed.scores[index]}/10`
      ),
      "",
      "Original AI feedback follows. Its written score may differ.",
      "",
      latestEvaluation.content,
      "",
      "========================================",
      "END OF REPORT",
    ].join("\n");

    const blob = new Blob([report], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const safeTitle = (title.trim() || "essay")
      .replace(/[^a-z0-9-_]+/gi, "-")
      .slice(0, 60);

    link.href = url;
    link.download = `${safeTitle}-evaluation.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function requestFeedback(action: string, isFollowUp = false) {
    if (!content.trim()) {
      setAiError("Write something in the editor before requesting feedback.");
      return;
    }

    if (aiLoading || retryUntil > Date.now()) return;

    setAiLoading(true);
    setAiError("");
    setStreamingAnswer("");

    // Leave room for the complete 2,600-character excerpt within the API limit.
    const instructions = action === "Evaluate My Essay"
      ? "Use a ## heading and Score: X/10 for each: Thesis Strength, Grammar and Clarity, Organization and Structure, Evidence and Reasoning. Explain each score with exact quotes. Give Top 3 Improvements. The app calculates the overall. State this is an AI estimate."
      : action;

    const message = [
      isFollowUp ? "Follow-up: " + action : instructions,
      "Essay title: " + title.trim().slice(0, 96),
      "Essay excerpt:",
      content.trim().slice(0, isFollowUp ? 1400 : 2600),
    ].join("\n\n");

    const previousHistory = isFollowUp ? chatHistory.slice(-8) : [];

    try {
      const response = await fetch("/api/study/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          subject: "writing",
          history: previousHistory,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          handleAIRateLimit(response);
        }

        throw new Error(
          response.status === 413
            ? "Request too large (413). Please shorten the essay."
            : `AI request failed (HTTP ${response.status}).`
        );
      }

      const answer = await readStudyStream(response, setStreamingAnswer, true);
      const finalAnswer =
        action === "Evaluate My Essay"
          ? normalizeEssayEvaluation(answer)
          : answer;

      setChatHistory((current) => [
        ...(isFollowUp ? current : []),
        { role: "user" as const, content: action },
        { role: "assistant" as const, content: finalAnswer },
      ].slice(-20));
      if (isFollowUp) setFollowUp(current => current.trim() === action ? "" : current);
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the AI Writing Coach."
      );
    } finally {
      setAiLoading(false);
    }
  }

  function downloadEssay() {
    const blob = new Blob([`${title}\n\n${content}`], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${title
      .replace(/[^a-z0-9-_ ]/gi, "")
      .trim()
      .replace(/\s+/g, "-") || "essay"}.txt`;

    link.click();
    URL.revokeObjectURL(url);
  }

  function applyTemplate(template: string) {
    if (
      content.trim() &&
      !window.confirm(
        "This will replace your current essay. Continue?"
      )
    ) {
      return;
    }

    setContent(template);
  }

  return (
    <main className="min-h-screen bg-[#080d19] text-white">
      <StudyNavigation />
      <section className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-5 px-6 pt-10">
        <div><p className="text-xs font-semibold tracking-widest text-cyan-300">THE WRITING ROOM</p><h1 className="mt-3 text-4xl">dAI Writing Studio</h1><p className="mt-3 text-sm text-slate-400">Write with confidence. Think critically. Improve your work.</p><StudyGuide section="Writing Studio">Start with a template or write in the editor. Ask for feedback on a specific issue, such as whether your evidence supports your argument. Revise your draft and download it when ready.</StudyGuide></div>
        {feedbackWarning && <p role="status">{feedbackWarning}</p>}
        <button type="button" disabled={!ready} onClick={downloadEssay} className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950">Download Essay ↓</button>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-6 rounded-2xl border border-white/10 bg-[#111a2b] p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Start with a Writing Template
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {prompts.map((prompt) => (
              <button
                key={prompt.label}
                type="button"
                disabled={!ready}
                onClick={() => applyTemplate(prompt.template)}
                className="rounded-xl border border-white/10 bg-[#0c1424] p-4 text-left transition hover:border-cyan-400/50"
              >
                <span className="block font-semibold text-cyan-300">
                  {prompt.label}
                </span>

                <span className="mt-2 block text-xs leading-5 text-slate-400">
                  {prompt.description}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,1fr)]">
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2b]">
            <div className="border-b border-white/10 p-5">
              <input
                disabled={!ready}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                aria-label="Essay title"
                placeholder="Essay title"
                className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-slate-500"
              />

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span>{wordCount} words</span>
                <span>{characterCount} characters</span>
                <span>
                  {essayWarning ? <strong role="status">{essayWarning}</strong> : savedAt ? `Saved: ${savedAt}` : "Preparing editor…"}
                </span>
              </div>
            </div>

            <textarea
              disabled={!ready}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              aria-label="Essay content"
              placeholder="Start writing your essay here..."
              spellCheck
              className="min-h-[650px] w-full resize-y bg-transparent p-6 text-base leading-8 text-slate-100 outline-none placeholder:text-slate-500"
            />
          </section>

          <aside className="rounded-2xl border border-white/10 bg-[#111a2b] p-6">
            <div className="mb-6">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                AI Writing Coach
              </span>

              <h2 className="mt-4 text-xl font-bold">
                Improve Your Writing
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your AI writing coach will help you strengthen arguments,
                improve clarity, and organize your ideas.
              </p>
            </div>

            {content.length > 2600 && (
              <p className="mb-4 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-5 text-amber-200">
                Essay evaluation currently uses the first 2,600 characters
                of your essay. Feedback may not reflect later sections.
              </p>
            )}

            <div className="space-y-3">
              {[
                "Evaluate My Essay",
                "Review my thesis statement",
                "Improve clarity and grammar",
                "Evaluate my argument",
                "Suggest stronger transitions",
                "Identify areas needing evidence",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={aiLoading || retrySeconds > 0}
                  onClick={() => void requestFeedback(suggestion)}
                  className="w-full rounded-xl border border-white/10 bg-[#0c1424] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-400/50 disabled:opacity-50"
                >
                  ✦ {suggestion}
                </button>
              ))}
            </div>

            
                <button
                  type="button"
                  onClick={() => void analyzeFullEssay()}
                  disabled={aiLoading || retrySeconds > 0 || !content.trim()}
                  className="mb-4 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/20 disabled:opacity-50"
                >
                  Analyze Full Essay
                </button>
<div className="mt-8 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <h3 className="text-sm font-semibold text-cyan-300">
                AI Writing Conversation
              </h3>

              {aiError && (
                <p role="alert" className="mt-3 text-sm text-red-300">
                  {aiError}
                </p>
              )}

              {retrySeconds > 0 && (
                <p className="mt-2 text-sm text-amber-300">
                  AI available again in {Math.floor(retrySeconds / 60)}m{" "}
                  {retrySeconds % 60}s
                </p>
              )}


              {latestValidEvaluation && (
                <div className="mt-4">
                  <EssayScoreDashboard
                    feedback={latestValidEvaluation.content}
                  />
                </div>
              )}

              <div className="mt-4 max-h-[650px] space-y-4 overflow-y-auto pr-1">
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={downloadPDFReport}
                    disabled={
                      !latestValidEvaluation
                    }
                    className="mr-3 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/20 disabled:opacity-40"
                  >
                    Download PDF Report
                  </button>
<button
                  type="button"
                  onClick={downloadEvaluationReport}
                  disabled={
                    !latestValidEvaluation
                  }
                  className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/20 disabled:opacity-40"
                >
                  Download Evaluation Report
                </button></div>
{chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.role === "user"
                        ? "ml-6 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3"
                        : "mr-3 rounded-xl border border-white/10 bg-[#0c1424] p-4"
                    }
                  >
                    <p className="mb-2 text-xs font-semibold text-cyan-300">
                      {message.role === "user" ? "You" : "AI Writing Coach"}
                    </p>

                    <div className="min-w-0 break-words text-sm leading-7 text-slate-200 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-cyan-200">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}

                {aiLoading && (
                  <div className="rounded-xl border border-white/10 bg-[#0c1424] p-4">
                    <p className="mb-2 text-xs font-semibold text-cyan-300">
                      AI Writing Coach · Responding...
                    </p>

                    {streamingAnswer ? (
                      <div className="min-w-0 break-words text-sm leading-7 text-slate-200 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {streamingAnswer}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">
                        Reviewing your writing...
                      </p>
                    )}
                  </div>
                )}

                {!chatHistory.length && !aiLoading && !aiError && (
                  <p className="text-sm text-slate-400">
                    Choose a writing improvement action to start your conversation.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-200">
                  Ask a Follow-up Question
                </h3>

                <button
                  type="button"
                  disabled={aiLoading || retrySeconds > 0}
                  onClick={() => {
                    setChatHistory([]);
                    setStreamingAnswer("");
                    setAiError("");
                    setFollowUp("");
                  }}
                  className="text-xs text-cyan-300 hover:text-cyan-200 disabled:opacity-50"
                >
                  New Conversation
                </button>
              </div>

              <form
                className="mt-3 space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  const question = followUp.trim();

                  if (!question || aiLoading) return;

                  void requestFeedback(question, true);
                }}
              >
                <textarea
                  value={followUp}
                  onChange={(event) => setFollowUp(event.target.value)}
                  placeholder="Ask about your thesis, evidence, structure..."
                  aria-label="Follow-up question"
                  rows={3}
                  maxLength={500}
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0c1424] p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
                />

                <button
                  type="submit"
                  disabled={aiLoading || retrySeconds > 0 || !followUp.trim()}
                  className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {aiLoading ? "Thinking..." : "Send Question"}
                </button>
              </form>

              {chatHistory.length > 0 && (
                <p className="mt-3 text-xs text-slate-500">
                  {Math.ceil(chatHistory.length / 2)} conversation turn(s)
                </p>
              )}
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              Your draft is saved in this browser, not in a cloud account.
              Download a copy to keep a backup.
            </p>
          </aside>
        </div>
      </div>
    
      <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-slate-400">
        Need help with dAI Learning Studio?{" "}
        <a
          href="mailto:support@eai.engineering"
          className="font-medium text-cyan-400 hover:underline"
        >
          Contact Technical Support
        </a>
      </div>

</main>
  );
}
