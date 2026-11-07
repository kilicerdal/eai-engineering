"use client";

import { useEffect, useRef, useState } from "react";

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};

export default function DictationButton({ value, onChange, onListeningChange, disabled }: {
  value: string;
  onChange: (value: string) => void;
  onListeningChange: (listening: boolean) => void;
  disabled: boolean;
}) {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("");
  const recognitionRef = useRef<Recognition | null>(null);
  const callbacks = useRef({ onChange, onListeningChange });
  useEffect(() => { callbacks.current = { onChange, onListeningChange }; }, [onChange, onListeningChange]);
  useEffect(() => () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
    }
    callbacks.current.onListeningChange(false);
  }, []);

  function toggleDictation() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }
    const speechWindow = window as SpeechWindow;
    const Constructor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Constructor) {
      setStatus("Dictation is unavailable in this browser. Try Chrome, or use your device’s keyboard dictation.");
      return;
    }
    const recognition = new Constructor();
    recognition.lang = document.documentElement.lang || navigator.language || "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    const prefix = value.trimEnd();
    let hadError = false;
    recognition.onresult = event => {
      const transcript = Array.from(event.results).map(result => result[0]?.transcript || "").join(" ").trim();
      callbacks.current.onChange(`${prefix}${prefix && transcript ? " " : ""}${transcript}`.slice(0, 3000));
    };
    recognition.onerror = event => {
      hadError = true;
      setStatus(event.error === "not-allowed" || event.error === "service-not-allowed"
        ? "Microphone access was denied. Allow microphone access in your browser’s site settings to dictate."
        : event.error === "no-speech" ? "No speech detected. Tap the microphone to try again."
        : event.error === "audio-capture" ? "No microphone found. Check your microphone connection."
        : "Dictation stopped. Check your connection and try again.");
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      callbacks.current.onListeningChange(false);
      if (!hadError) setStatus("Dictation stopped. Review your message before sending.");
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
      setListening(true);
      callbacks.current.onListeningChange(true);
      setStatus("Listening… Tap the microphone to stop. Your browser may process audio through its speech service.");
    } catch {
      recognitionRef.current = null;
      setStatus("Could not start dictation. Please try again.");
    }
  }

  return <>
    <button type="button" className="atlas-dictation" onClick={toggleDictation}
      disabled={disabled} aria-label={listening ? "Stop dictation" : "Dictate message"}
      aria-pressed={listening} title={listening ? "Stop dictation" : "Dictate"}>
      {listening ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
        : <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/></svg>}
    </button>
    {status && <span className="atlas-dictation-status" role="status">{status}</span>}
  </>;
}
