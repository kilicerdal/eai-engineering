"use client";

import { useEffect, useState } from "react";
import FailureClassifier from "./FailureClassifier";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const example = `TimeoutError: page.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('button[type="submit"]')
  - locator resolved to <button disabled>Sign in</button>
  - attempting click action
  - element is not enabled`;

export default function FailureAnalyzer() {
  const [framework, setFramework] = useState("Playwright");
  const [log, setLog] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleFailure(event: Event) {
      const customEvent = event as CustomEvent<{
        framework: string;
        log: string;
      }>;

      const detail = customEvent.detail;

      if (!detail || typeof detail.log !== "string") return;

      setFramework(detail.framework || "CI/CD");
      setLog(detail.log.slice(0, 3000));
      setAnalysis("");
      setError("");
      setCopied(false);
    }

    window.addEventListener("erdal-ai-load-failure", handleFailure);

    return () => {
      window.removeEventListener("erdal-ai-load-failure", handleFailure);
    };
  }, []);

  async function analyze() {
    if (loading || log.trim().length < 15) return;

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch("/api/analyze-failure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ framework, log }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setAnalysis(data.answer || "No analysis generated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="ai-failure-analyzer"
      className="mt-8 scroll-mt-24 rounded-2xl border border-cyan-400/20 bg-slate-900 p-6"
    >
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
          eAI 4.6
        </p>
        <h3 className="mt-2 text-2xl font-bold">
          AI-Powered Test Failure Analyzer
        </h3>
        <p className="mt-3 text-sm text-slate-400">
          Paste an automation failure log to receive AI-assisted root-cause
          analysis, debugging recommendations, and suggested fixes.
        </p>
      </div>

      <label htmlFor="failure-framework" className="block text-sm font-medium">
        Testing Framework
      </label>

      <select
        id="failure-framework"
        value={framework}
        onChange={(event) => setFramework(event.target.value)}
        className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 p-3 text-sm"
      >
        {["Playwright", "Selenium", "pytest", "API", "CI/CD", "Other"].map(
          (item) => <option key={item}>{item}</option>
        )}
      </select>

      <label htmlFor="failure-log" className="mt-5 block text-sm font-medium">
        Failure Log
      </label>

      <textarea
        id="failure-log"
        value={log}
        onChange={(event) => setLog(event.target.value)}
        maxLength={3000}
        rows={9}
        placeholder="Paste your automation failure log here..."
        className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 p-4 font-mono text-sm text-slate-200"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-amber-300">
          Do not paste passwords, tokens, personal data, or confidential logs.
        </p>
        <span className="text-xs text-slate-400">{log.length}/3000</span>
      </div>

      <FailureClassifier log={log} />

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void analyze()}
          disabled={loading || log.trim().length < 15}
          className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Failure"}
        </button>

        <button
          type="button"
          onClick={() => {
            setLog(example);
            setAnalysis("");
            setError("");
          }}
          className="rounded-lg border border-white/20 px-5 py-3 text-sm"
        >
          Load Example
        </button>

        <button
          type="button"
          onClick={() => {
            setLog("");
            setAnalysis("");
            setError("");
          }}
          className="rounded-lg border border-white/20 px-5 py-3 text-sm"
        >
          Clear
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-5 text-sm text-red-400">{error}</p>
      )}

      {analysis && (
        <div className="mt-7 rounded-xl border border-white/10 bg-slate-950 p-5">
          <h4 className="mb-4 text-lg font-bold text-cyan-300">
            AI Failure Analysis
          </h4>
          <div className="min-w-0 break-words text-sm leading-7 text-slate-200">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mb-3 mt-6 text-lg font-bold text-cyan-300">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 mt-4 font-bold text-white">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="my-3">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="my-3 list-disc space-y-1 pl-6">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-3 list-decimal space-y-1 pl-6">
                    {children}
                  </ol>
                ),
                code: ({ className, children }) => {
                  const language = /language-([\\w+-]+)/.exec(className || "")?.[1];
                  const content = String(children).replace(/\\n$/, "");

                  if (language) {
                    return (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={language}
                        PreTag="div"
                        customStyle={{
                          borderRadius: "0.75rem",
                          margin: "1rem 0",
                          fontSize: "0.8rem",
                        }}
                      >
                        {content}
                      </SyntaxHighlighter>
                    );
                  }

                  return (
                    <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-cyan-200">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {analysis}
            </ReactMarkdown>
          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(analysis);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              } catch {
                setError("Unable to copy analysis.");
              }
            }}
            className="mt-5 rounded-lg border border-cyan-400/30 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-400/10"
          >
            {copied ? "Copied!" : "Copy Analysis"}
          </button>
          <p className="mt-5 text-xs text-slate-500">
            AI-generated recommendations require engineering verification.
          </p>
        </div>
      )}
    </div>
  );
}
