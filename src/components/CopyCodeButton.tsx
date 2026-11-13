"use client";
import {useCallback, useRef, useState} from "react";

export default function CopyCodeButton({code, className = "text-xs text-cyan-300 hover:text-white"}:{code:string; className?:string}) {
  const [result, setResult] = useState<{code:string; copied:boolean} | null>(null);
  const manual = useRef<HTMLTextAreaElement | null>(null);
  const selectManualCopy = useCallback((field: HTMLTextAreaElement | null) => {
    manual.current = field;
    if (field) {
      field.focus();
      field.select();
    }
  }, []);
  const current = result?.code === code ? result : null;
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setResult({code, copied:true});
    } catch {
      setResult({code, copied:false});
      if (manual.current) selectManualCopy(manual.current);
    }
  }
  return <div className="min-w-0 text-right">
    <button type="button" onClick={copy} className={className}>Copy code</button>
    <p role="status" className="text-xs text-slate-300">{current && (current.copied ? "Code copied." : "Clipboard unavailable. The code is selected for manual copying.")}</p>
    {current?.copied === false && <textarea ref={selectManualCopy} aria-label="Code for manual copying" readOnly rows={2} value={code} className="mt-2 w-full rounded border border-white/20 bg-slate-950 p-2 font-mono text-xs text-white" />}
  </div>;
}
