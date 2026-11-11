"use client";
import { useEffect, useRef, useState } from "react";
import type { Recognition, SpeechWindow } from "./DictationButton";

export default function VoiceConversation({ onQuestion, disabled, onActiveChange }: {
  onQuestion: (text: string) => Promise<string | undefined>;
  disabled: boolean;
  onActiveChange: (active: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState("ready");
  const [notice, setNotice] = useState("");
  const [transcript, setTranscript] = useState("");
  const recognition = useRef<Recognition | null>(null);
  const session = useRef(0);
  const callback = useRef(onQuestion);
  const activeCallback = useRef(onActiveChange);
  useEffect(() => { callback.current = onQuestion; activeCallback.current = onActiveChange; }, [onQuestion, onActiveChange]);
  useEffect(() => () => {
    session.current++;
    activeCallback.current(false);
    if (recognition.current) { recognition.current.onend = null; recognition.current.abort(); }
    window.speechSynthesis?.cancel();
  }, []);

  function close() {
    session.current++;
    activeCallback.current(false);
    if (recognition.current) { recognition.current.onend = null; recognition.current.abort(); recognition.current = null; }
    window.speechSynthesis?.cancel();
    setOpen(false); setPhase("ready");
  }
  function listen() {
    const w = window as SpeechWindow;
    const Constructor = w.SpeechRecognition || w.webkitSpeechRecognition;
    setOpen(true);
    activeCallback.current(true);
    if (!Constructor || !window.speechSynthesis) {
      setNotice("Voice conversation is unavailable in this browser. Try Chrome."); return;
    }
    window.speechSynthesis.cancel();
    const token = ++session.current;
    const mic = new Constructor();
    recognition.current = mic;
    mic.lang = document.documentElement.lang || "en-US";
    mic.continuous = false;
    mic.interimResults = true;
    let words = "", failed = false;
    setTranscript(""); setNotice("");
    mic.onresult = event => {
      words = Array.from(event.results).map(result => result[0]?.transcript || "").join(" ").trim();
      if (token === session.current) setTranscript(words.slice(0,3000));
    };
    mic.onerror = event => {
      failed = true;
      if (token !== session.current) return;
      setNotice(event.error === "not-allowed" || event.error === "service-not-allowed"
        ? "Allow microphone access in your browser’s site settings, then try again."
        : "Could not hear you. Check your microphone and try again.");
      setPhase("ready");
    };
    mic.onend = async () => {
      recognition.current = null;
      if (token !== session.current) return;
      if (failed || !words) { setPhase("ready"); if (!failed) setNotice("No speech detected. Try again."); return; }
      if (words.length > 3000) {
        setPhase("ready");
        setNotice("Your spoken question exceeded 3,000 characters. Please ask a shorter question to send it.");
        return;
      }
      setPhase("thinking");
      try {
        const answer = await callback.current(words);
        if (token !== session.current) return;
        if (!answer) { setPhase("ready"); setNotice("The answer could not finish. Please try again."); return; }
        const spoken = answer.replace(/```[\s\S]*?```/g," Code is shown in the chat. ").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/[*#_`]/g,"");
        const utterance = new SpeechSynthesisUtterance(spoken);
        utterance.lang = mic.lang;
        utterance.onend = () => { if (token === session.current) setPhase("ready"); };
        utterance.onerror = () => { if (token === session.current) { setPhase("ready"); setNotice("Audio could not play. The answer is in your chat."); } };
        setPhase("speaking");
        window.speechSynthesis.speak(utterance);
      } catch { if (token === session.current) { setPhase("ready"); setNotice("Voice conversation stopped. Please try again."); } }
    };
    try { mic.start(); setPhase("listening"); }
    catch { recognition.current = null; setPhase("ready"); setNotice("Could not start the microphone. Please try again."); }
  }
  return <>
    <button type="button" className="atlas-voice-button" aria-label="Start voice conversation" title="Voice conversation" disabled={disabled || open} onClick={listen}>
      <svg width="21" height="21" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 10v4M8 6v12M12 3v18M16 6v12M20 10v4"/></svg>
    </button>
    {open && <div className="atlas-voice-panel" role="region" aria-label="Voice conversation">
      <div className="atlas-voice-heading"><strong>Voice conversation</strong><button type="button" onClick={close} aria-label="Close voice conversation">×</button></div>
      <p role="status">{phase === "listening" ? "Listening… Pause when you finish to send your question." : phase === "thinking" ? "eAI is thinking…" : phase === "speaking" ? "eAI is speaking…" : "Ready for your next question."}</p>
      {transcript && <p className="atlas-voice-transcript">{transcript}</p>}
      {notice && <p role="alert">{notice}</p>}
      {phase === "listening" && <button type="button" onClick={() => recognition.current?.stop()}>Finish speaking</button>}
      {phase === "speaking" && <button type="button" onClick={() => { window.speechSynthesis.cancel(); setPhase("ready"); }}>Stop audio</button>}
      {phase === "ready" && <button type="button" disabled={disabled} onClick={listen}>Speak again</button>}
      <small>Your spoken question is sent automatically after you pause. Browser speech services may process your audio.</small>
    </div>}
  </>;
}
