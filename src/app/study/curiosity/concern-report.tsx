'use client';

import { useState } from 'react';
import type { Fact } from './facts';
import { concernReasons, concernReport, type ConcernReason } from './concerns';

export function ConcernReport({ fact }: { fact: Fact }) {
  const [reason,setReason] = useState<ConcernReason>(concernReasons[0]);
  const [note,setNote] = useState('');
  const [message,setMessage] = useState('');
  const [fallback,setFallback] = useState('');
  const report = concernReport(fact,reason,note);
  async function copyReport() {
    try {await navigator.clipboard.writeText(report.body);setFallback('');setMessage('Report copied. Paste it into an email to support@eai.engineering. Nothing has been sent.');}
    catch {setFallback(report.body);setMessage('Copy is unavailable. Select the report below and copy it into your email. Nothing has been sent.');}
  }
  return <div className="curiosity-depth curiosity-concern"><details><summary>Report a concern</summary><div className="curiosity-concern-form"><p>Help us review this discovery. Include what looks wrong and, if possible, a supporting source.</p><label>What needs review?<select value={reason} onChange={event=>{setReason(event.target.value as ConcernReason);setFallback('');setMessage('');}}>{concernReasons.map(item=><option key={item}>{item}</option>)}</select></label><label>Your note <span>(optional, 1,000 characters)</span><textarea maxLength={1000} rows={3} value={note} placeholder="Tell us what to check…" onChange={event=>{setNote(event.target.value);setFallback('');setMessage('');}}/></label><p className="curiosity-concern-help">The report includes this fact and its source. Prepare email opens your email app; you choose whether to send. You can also copy it to support@eai.engineering. Leave out personal information.</p><div className="curiosity-concern-actions"><a href={report.mailto}>Prepare email report ↗</a><button onClick={copyReport}>Copy report</button></div>{message && <p role="status">{message}</p>}{fallback && <label>Report text<textarea readOnly rows={7} value={fallback} onFocus={event=>event.target.select()}/></label>}</div></details></div>;
}
