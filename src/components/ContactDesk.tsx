"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const email = "hello@eai.engineering";
const conversations = [
  { title: "Engineering challenges", detail: "Software quality, automation, or an AI engineering question.", subject: "Engineering challenge | eAI", body: "What I’m exploring:\n\nWhat I need:\n\nConstraints or context:\n" },
  { title: "Collaborations", detail: "An idea, shared experiment, or a potential collaboration.", subject: "Collaboration | eAI", body: "The idea:\n\nHow we might collaborate:\n\nUseful context:\n" },
  { title: "Project questions", detail: "A question about the code, evidence, or engineering decisions.", subject: "Project question | eAI", body: "Project or case study:\n\nMy question:\n\nRelevant context or link:\n" },
];

export default function ContactDesk() {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setMessage("Email address copied.");
    } catch {
      setCopied(false);
      setMessage("Copy is unavailable here. Select the email address to copy it, or open it in your email app.");
    }
  }
  return <section className="contact-desk" id="contact" aria-labelledby="contact-desk-title">
    <div className="contact-desk-art" aria-hidden="true"><Image src="/images/threshold/civilizations-future.webp" alt="" fill sizes="(max-width: 760px) 100vw, 55vw" /></div>
    <div className="contact-desk-inner">
      <div className="contact-desk-invitation"><p className="atlas-eyebrow">LET’S CONNECT</p><h2 id="contact-desk-title">A worthwhile question<br />starts a conversation.</h2><p>Exploring an engineering challenge, an AI idea, or a potential collaboration? Share what you’re thinking.</p><p className="contact-desk-prompt">Tell us what you’re exploring, what you need, and any constraints.</p><Link className="contact-desk-proof" href="/engineering">Explore the engineering work <span aria-hidden="true">↗</span></Link></div>
      <div className="contact-desk-options"><p className="atlas-eyebrow">START A CONVERSATION</p><div className="contact-desk-topics">{conversations.map(item => <a key={item.title} href={`mailto:${email}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.body)}`}><div><h3>{item.title}</h3><p>{item.detail}</p></div><span aria-hidden="true">↗</span></a>)}</div><div className="contact-desk-email"><a href={`mailto:${email}`}>{email}</a><button type="button" onClick={copyEmail} aria-label="Copy email address">{copied ? "Copied" : "Copy email"}<span aria-hidden="true">{copied ? " ✓" : " +"}</span></button></div><p className="contact-desk-status" role="status" aria-live="polite">{message}</p><p className="contact-desk-note">Choose a topic to open a draft in your email app.</p></div>
    </div>
  </section>;
}
