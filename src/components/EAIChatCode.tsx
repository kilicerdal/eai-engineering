"use client";
import CopyCodeButton from "./CopyCodeButton";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/esm/styles/prism";
export default function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  return (
    <div className="atlas-chat-code my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
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

