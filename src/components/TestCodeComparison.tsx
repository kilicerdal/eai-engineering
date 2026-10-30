"use client";

import { useState } from "react";
import TestCodeValidator from "./TestCodeValidator";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function downloadTestFile(
  code: string,
  framework: string,
  improved: boolean
) {
  const filename =
    framework === "playwright"
      ? improved
        ? "improved_generated.spec.ts"
        : "generated.spec.ts"
      : framework === "api"
        ? improved
          ? "test_api_improved.py"
          : "test_api_generated.py"
        : improved
          ? "test_improved.py"
          : "test_generated.py";

  const blob = new Blob([code], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function CodePanel({
  title,
  code,
  language,
  framework,
  improved,
}: {
  title: string;
  code: string;
  language: string;
  framework: string;
  improved: boolean;
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
    <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="text-sm font-semibold text-white">{title}</p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => downloadTestFile(code, framework, improved)}
            className="rounded-lg border border-emerald-400/30 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/10"
          >
            Download File
          </button>

        <button
          type="button"
          onClick={copyCode}
          className="rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/10"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        </div>
      </div>

      <div className="max-h-[500px] overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "transparent",
            fontSize: "12px",
            lineHeight: "1.7",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default function TestCodeComparison({
  originalCode,
  improvedCode,
  framework,
}: {
  originalCode: string;
  improvedCode: string;
  framework: string;
}) {
  if (!originalCode.trim() || !improvedCode.trim()) {
    return null;
  }

  const language =
    framework === "playwright" ? "typescript" : "python";

  return (
    <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#101e32] p-5">
      <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
        eAI 6.4 / TEST COMPARISON
      </p>

      <h4 className="mt-3 text-lg font-bold text-white">
        Original vs. AI-Improved Tests
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        Compare both versions before deciding which code to use.
        Neither version has been executed or verified.
      </p>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <CodePanel
          title="Original Generated Code"
          code={originalCode}
          language={language}
          framework={framework}
          improved={false}
        />

        <CodePanel
          title="AI-Improved Code"
          code={improvedCode}
          language={language}
          framework={framework}
          improved={true}
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <TestCodeValidator
          title="Original Code"
          code={originalCode}
          framework={framework}
        />

        <TestCodeValidator
          title="Improved Code"
          code={improvedCode}
          framework={framework}
        />
      </div>

    </div>
  );
}
