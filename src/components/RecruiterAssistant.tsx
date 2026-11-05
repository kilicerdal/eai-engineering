'use client';
import {useState,useRef,useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type {RecruiterTurn} from '@/lib/recruiter-conversation';
const starters=[
 {label:'Explore SDET expertise',prompt:'Tell me about Erdal’s SDET strengths and automation experience.'},
 {label:'Compare a job description',prompt:'Compare this job description with Erdal’s documented experience and identify strengths and gaps. Job description: '},
 {label:'Build a skills matrix',prompt:'Create a concise skills matrix for Erdal. Distinguish professional, project and resume-listed experience. Do not invent individual skill years.'},
 {label:'Suggest resume additions',prompt:'Suggest up to 3 additional resume bullet points in total for the focus or job description below. Match each to the original resume, avoid duplicates, and preserve all existing wording. Focus or job description: '},
];
export default function RecruiterAssistant(){
 const [message,setMessage]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[turns,setTurns]=useState<RecruiterTurn[]>([]);
 const log=useRef<HTMLDivElement>(null),input=useRef<HTMLTextAreaElement>(null);
 useEffect(()=>{log.current?.scrollTo({top:log.current.scrollHeight,behavior:'smooth'});},[turns,busy]);
 async function send(event:React.FormEvent){
  event.preventDefault();if(busy||!message.trim())return;
  const question=message.trim(),history=turns.slice(-8);setBusy(true);setError('');setMessage('');setTurns(old=>[...old,{role:'user',content:question}]);
  try{
   const response=await fetch('/api/recruiter/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:question,history})});
   const result=await response.json();if(!response.ok)throw Error(result.error||'Please try again.');
   setTurns(old=>[...old,{role:'assistant',content:result.answer}]);
  }catch(e){setTurns(old=>old.slice(0,-1));setMessage(question);setError(e instanceof Error?e.message:'Please try again.');}
  finally{setBusy(false);input.current?.focus();}
 }
 return <section className="atlas-chat recruiter-chat" aria-label="Erdal’s career assistant"><div className="atlas-chat-shell">
  <header className="atlas-chat-toolbar recruiter-chat-toolbar"><div><p>eAI</p><p>Erdal’s career assistant</p></div><div className="atlas-chat-controls"><span className="recruiter-grounding">CAREER &amp; OPPORTUNITIES</span><button className="atlas-history-toggle" type="button" disabled={busy||!turns.length} onClick={()=>{setTurns([]);setError('');setMessage('');input.current?.focus();}}>New chat +</button></div></header>
  <div ref={log} className="recruiter-chat-log" role="log" aria-label="Career conversation" aria-live="polite">
   {!turns.length&&<div className="recruiter-welcome"><span aria-hidden="true">✧</span><h2>What would you like to explore?</h2><p>Get to know Erdal’s SDET experience, explore his projects,<br className="recruiter-desktop-break"/> or bring a job description to find the right fit.</p></div>}
   {turns.map((turn,index)=><div key={index} className={'recruiter-message-row '+(turn.role==='user'?'recruiter-message-right':'')}><article className={'atlas-chat-message '+(turn.role==='user'?'atlas-user-message':'atlas-assistant-message')} aria-label={turn.role==='user'?'You':'eAI'}>{turn.role==='assistant'?<div className="recruiter-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{a:({href,children})=><a href={href} target="_blank" rel="noopener noreferrer">{children}</a>}}>{turn.content}</ReactMarkdown></div>:<p>{turn.content}</p>}</article></div>)}
   {busy&&<p className="recruiter-thinking" role="status">eAI is thinking<span aria-hidden="true">…</span></p>}
  </div>
  <div className="atlas-chat-composer"><div className="recruiter-starters">{starters.map(item=><button className="atlas-chat-suggestion" type="button" disabled={busy} key={item.label} onClick={()=>{setMessage(item.prompt);input.current?.focus();}}>{item.label}</button>)}</div>
   <form onSubmit={send}><textarea ref={input} aria-label="Your message" value={message} maxLength={10000} rows={1} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();e.currentTarget.form?.requestSubmit();}}} placeholder="Ask eAI about Erdal, or paste a job description…"/><button disabled={busy||!message.trim()} type="submit">{busy?'Thinking…':'Send'}</button></form>
   {error&&<p className="recruiter-error" role="alert">{error}</p>}<p>AI answers from approved career records. Up to 3 additional resume bullets only. Existing content and the original PDF stay unchanged.</p>
  </div>
 </div></section>;
}
