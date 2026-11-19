import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./experience.css";
import RoomWayfinding from "@/components/RoomWayfinding";
import "./site-refinement.css";
import HomeVitals from "@/components/HomeVitals";
import SiteCompanion from "@/components/SiteCompanion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  preload: false,
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  preload: false,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eAI | Intelligence Engineered",
  description:
    "Explore engineering evidence, interactive models and the dAI Learning Studio. Bring a question, inspect an idea and keep your understanding.",
  applicationName: "eAI",
  metadataBase: new URL("https://www.eai.engineering"),
  openGraph: {title:"eAI | Intelligence Engineered",description:"Explore engineering, learning and the ideas that connect them.",type:"website",siteName:"eAI",images:[{url:"/images/heritage/orbital-score.webp",width:1774,height:887,alt:"The Orbital Score: painted geometry becomes a future world"}]},
  twitter: {card:"summary_large_image",title:"eAI | Intelligence Engineered",description:"Bring a question. Explore an idea. Build understanding.",images:["/images/heritage/orbital-score.webp"]},
  keywords: [
    "eAI",
    "Erdal Kilic",
    "AI Quality Engineering",
    "SDET",
    "QA Automation",
    "Playwright",
    "Python",
    "AWS",
    "GitHub Actions",
    "AI Test Automation",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><HomeVitals/><RoomWayfinding/>{children}<SiteCompanion/></body>
    </html>
  );
}
