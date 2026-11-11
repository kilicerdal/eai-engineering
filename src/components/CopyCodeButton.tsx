"use client";
import {useState} from "react";

export default function CopyCodeButton({code}:{code:string}) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Code copied.");
    } catch {
      setStatus("Clipboard unavailable. Select the code below and copy it manually.");
    }
  }
  return <div className="text-right">
    <button type="button" onClick={copy} className="text-xs text-cyan-300 hover:text-white">
      Copy code
    </button>
    <p role="status" className="text-xs text-slate-300">{status}</p>
  </div>;
}
