import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eAI | Intelligence Engineered",
  description:
    "Explore eAI, an intelligent quality engineering platform featuring AI-powered test automation, GitHub CI failure investigation, and enterprise QA engineering.",
  applicationName: "eAI",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
