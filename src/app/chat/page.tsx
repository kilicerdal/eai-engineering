import type { Metadata } from "next";
import ResumeChat from "@/components/ResumeChat";
import "../threshold.css";

export const metadata: Metadata = { title: "Chat with eAI", description: "Your dedicated eAI conversation workspace." };
export default function ChatPage() {
  return <main className="threshold eai-dedicated-chat"><ResumeChat /></main>;
}
