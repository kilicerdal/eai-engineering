import type { Metadata } from "next";
import "./studio.css";
import "./refinement.css";
import "./scenery.css";
import DailySessionReturn from "@/components/DailySessionReturn";
import StudyCloudBridge from "@/components/StudyCloudBridge";

export const metadata: Metadata = {
  title: "dAI Learning Studio | Explore what you don’t yet know",
  description: "Explore ideas with an AI tutor, study your own materials, and build understanding through focused practice.",
};

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return <div className="eai-study-studio">{children}<DailySessionReturn/><StudyCloudBridge/></div>;
}
