"use client";

import Image from "next/image";

import JobMatcher from "@/components/JobMatcher";

import ResumeChat from "@/components/ResumeChat";
import QADashboard from "@/components/QADashboard";
import AITestGenerator from "@/components/AITestGenerator";

import { useState } from "react";

const experience = [
  {
    company: "DTCC",
    role: "Software Development Engineer in Test (SDET)",
    period: "May 2021 – Present",
    location: "Jersey City, NJ",
    description:
      "Engineering scalable automation frameworks for enterprise financial applications. Working with Java, Playwright, Selenium, API testing, AWS, CI/CD, and AI-assisted development.",
  },
  {
    company: "CareFirst BCBS",
    role: "Software Development Engineer in Test (SDET)",
    period: "April 2019 – May 2021",
    location: "Jersey City, NJ",
    description:
      "Developed automation frameworks using Java, Selenium, JUnit, Cucumber, and Maven. Supported functional, regression, and cross-browser testing.",
  },
  {
    company: "WarnerMedia",
    role: "Software Development Engineer in Test (SDET)",
    period: "May 2017 – April 2019",
    location: "New York, NY",
    description:
      "Built Java and Selenium automation, validated Oracle databases, and integrated automated testing with Jenkins and Maven.",
  },
];

const projects = [
  {
    name: "AI Healthcare Quality Platform",
    category: "API AUTOMATION",
    description:
      "Healthcare quality engineering platform featuring API validation, PostgreSQL, automated regression tests, and CI/CD workflows.",
    stack: ["Node.js", "PostgreSQL", "GitHub Actions"],
    status: "Active Development",
  },
  {
    name: "Playwright AI Automation",
    category: "TEST FRAMEWORK",
    description:
      "Modern browser automation framework using Playwright and TypeScript with automated quality checks.",
    stack: ["Playwright", "TypeScript", "CI/CD"],
    status: "Active Development",
  },
  {
    name: "AI Python Automation",
    category: "INTELLIGENT TESTING",
    description:
      "Python-based automation framework combining Pytest, Playwright, and emerging AI-assisted testing capabilities.",
    stack: ["Python", "Pytest", "Playwright"],
    status: "In Progress",
  },
  {
    name: "AI Engineering Lab",
    category: "GENERATIVE AI",
    description:
      "Hands-on AI engineering experiments with local language models, intelligent agents, structured outputs, and tool integration.",
    stack: ["JavaScript", "Ollama", "LLMs"],
    status: "Active Development",
  },
];

const skills = [
  {
    title: "Test Automation",
    icon: "◈",
    items: ["Playwright", "Selenium", "Cypress", "Pytest", "TestNG", "Cucumber"],
  },
  {
    title: "Programming",
    icon: "⌘",
    items: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "API & Backend",
    icon: "⬡",
    items: ["REST Assured", "Postman", "Karate", "REST APIs", "SQL Validation"],
  },
  {
    title: "AWS & Cloud",
    icon: "☁",
    items: ["Lambda", "S3", "SQS", "SNS", "API Gateway", "EC2"],
  },
  {
    title: "DevOps",
    icon: "⚙",
    items: ["GitHub Actions", "Jenkins", "GitLab CI/CD", "Docker", "Git"],
  },
  {
    title: "AI Engineering",
    icon: "✧",
    items: ["Generative AI", "GitHub Copilot", "Ollama", "LLM Integration", "AI Agents"],
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#080d19] text-white selection:bg-cyan-500/30">
      {/* Premium Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d19]/85 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4">
          <a
            href="#"
            aria-label="eAI — Intelligence Engineered"
            className="group flex shrink-0 flex-col justify-center"
          >
            <Image
                src="/eAI_header_vivid.png"
                alt="eAI — Intelligence Engineered"
                width={220}
                height={90}
                priority
                className="h-12 w-auto max-w-[210px] object-contain"
              />
            <span className="mt-1 text-[10px] font-medium tracking-[0.16em] text-slate-300">
              INTELLIGENCE ENGINEERED.
            </span>
          
              <span className="mt-1 block text-[10px] font-medium tracking-wide text-slate-400">
                Founded by <span className="font-semibold text-cyan-300">Erdal Kilic</span>
              </span>
</a>

          <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            {[
              ["About", "#about"],
              ["Experience", "#experience"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["AI Assistant", "#ai-assistant"],
              ["Study Assistant", "/study"],
              ["QA Dashboard", "#qa-dashboard"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="transition hover:text-cyan-300"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="https://github.com/kilicerdal"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300"
            >
              GitHub ↗
            </a>
            <a
              href="/Erdal_Kilic.pdf"
              download
              className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Resume ↓
            </a>
          </div>

          <button
            type="button"
            className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0c1424] px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {[
                ["About", "#about"],
                ["Experience", "#experience"],
                ["Skills", "#skills"],
                ["Projects", "#projects"],
                ["AI Assistant", "#ai-assistant"],
              ["Study Assistant", "/study"],
                ["QA Dashboard", "#qa-dashboard"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  {label}
                </a>
              ))}

              <div className="mt-3 flex gap-3 border-t border-white/10 pt-5">
                <a
                  href="https://github.com/kilicerdal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/20 px-4 py-3 text-sm"
                >
                  GitHub ↗
                </a>
                <a
                  href="/Erdal_Kilic.pdf"
                  download
                  className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950"
                >
                  Resume ↓
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Premium Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(34,211,238,0.12),transparent_50%)]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[110px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-5 py-2.5 text-xs font-semibold tracking-wide text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              SENIOR SDET · AI QUALITY ENGINEERING · AWS CERTIFIED
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">
              Engineering
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Intelligent Quality.
              </span>
            </h1>

            <p className="mt-7 text-xl font-semibold text-white">
              Erdal Kilic
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              Senior Software Development Engineer in Test building
              intelligent automation, AI-powered failure investigation,
              scalable test frameworks, and cloud-ready quality
              engineering solutions.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#qa-dashboard"
                className="rounded-xl bg-cyan-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Explore eAI →
              </a>

              <a
                href="#projects"
                className="rounded-xl border border-white/20 bg-white/[0.03] px-7 py-4 text-sm font-bold text-white transition hover:border-cyan-400/50"
              >
                View Engineering Projects
              </a>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                ["9+", "Years Experience"],
                ["2", "AWS Certifications"],
                ["4", "Featured Projects"],
                ["AI", "Engineering Focus"],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-cyan-400/40 pl-4">
                  <div className="text-3xl font-black text-cyan-300">
                    {value}
                  </div>
                  <div className="mt-2 text-xs leading-5 text-slate-400">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-cyan-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#0d1728]/95 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <span className="font-mono text-xs text-slate-400">
                  eAI / ENGINEERING
                </span>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold tracking-[0.2em] text-cyan-300">
                    PLATFORM CAPABILITIES
                  </p>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    AVAILABLE
                  </span>
                </div>

                {[
                  ["01", "GitHub CI Intelligence", "Workflow monitoring"],
                  ["02", "AI Failure Investigation", "Root-cause assistance"],
                  ["03", "AI Career Assistant", "Interactive conversations"],
                  ["04", "Intelligent Job Matching", "Resume analysis"],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
                  >
                    <span className="font-mono text-sm text-cyan-400">
                      {number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {description}
                      </p>
                    </div>
                    <span className="ml-auto text-emerald-400">✓</span>
                  </div>
                ))}

                <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
                  <p className="font-mono text-xs leading-6 text-slate-400">
                    <span className="text-cyan-300">$</span> quality-engineering --ai-enabled
                    <br />
                    <span className="text-emerald-300">
                      ✓ Intelligent automation platform ready
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-white/5 bg-white/[0.02] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
                ABOUT ME
              </p>
              <h2 className="text-4xl font-bold">
                Quality Engineering Meets Artificial Intelligence
              </h2>
            </div>

            <div className="space-y-5 leading-8 text-slate-400">
              <p>
                I specialize in designing scalable test automation
                frameworks for complex enterprise applications across
                financial services, healthcare, and cloud platforms.
              </p>
              <p>
                My expertise spans UI automation, API and microservices
                testing, database validation, AWS cloud technologies,
                and continuous integration.
              </p>
              <p>
                I am actively developing AI-powered engineering projects
                that explore how language models and intelligent agents
                can improve software testing and developer productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            CAREER
          </p>
          <h2 className="mb-12 text-4xl font-bold">Professional Experience</h2>

          <div className="space-y-6">
            {experience.map((job, index) => (
              <article
                key={job.company}
                className="rounded-2xl border border-white/10 bg-[#101827] p-8 transition hover:border-cyan-400/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold">{job.company}</h3>
                      {index === 0 && (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-medium text-cyan-400">{job.role}</p>
                    <p className="mt-1 text-sm text-slate-500">{job.location}</p>
                  </div>
                  <span className="text-sm text-slate-400">{job.period}</span>
                </div>

                <p className="mt-6 max-w-4xl leading-8 text-slate-400">
                  {job.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-white/[0.02] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            TECHNOLOGIES
          </p>
          <h2 className="mb-12 text-4xl font-bold">Technical Expertise</h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-2xl border border-white/10 bg-[#101827] p-7"
              >
                <div className="mb-5 text-3xl text-cyan-400">{skill.icon}</div>
                <h3 className="mb-5 text-xl font-bold">{skill.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            CREDENTIALS
          </p>
          <h2 className="mb-12 text-4xl font-bold">AWS Certifications</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              "AWS Certified Developer – Associate",
              "AWS Certified Cloud Practitioner",
            ].map((cert) => (
              <div
                key={cert}
                className="rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-400/10 to-transparent p-8"
              >
                <div className="mb-6 text-4xl">🏆</div>
                <h3 className="text-xl font-bold">{cert}</h3>
                <p className="mt-4 text-sm font-medium text-emerald-400">
                  ✓ Certified
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-white/[0.02] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            ENGINEERING PORTFOLIO
          </p>
          <h2 className="mb-5 text-4xl font-bold">Featured Projects</h2>
          <p className="mb-12 max-w-3xl text-slate-400">
            Practical engineering projects demonstrating modern automation,
            AI development, cloud integration, and software quality.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group rounded-2xl border border-white/10 bg-[#101827] p-8 transition hover:-translate-y-1 hover:border-cyan-400/50"
              >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold tracking-widest text-cyan-400">
                    {project.category}
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {project.status}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-bold">{project.name}</h3>
                <p className="mb-7 min-h-20 leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-cyan-400/10 px-3 py-2 text-xs text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Live AI Engineering Platform */}
      <section id="ai-assistant" className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#10263b] via-[#101827] to-[#080d19] p-8 md:p-14">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-xs font-bold tracking-widest text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              LIVE AI ENGINEERING PLATFORM
            </div>

            <h2 className="mt-8 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
              Intelligent Quality Engineering.
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Real Tools. Real Automation.
              </span>
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Explore working AI-powered engineering tools, including an
              interactive career assistant, GitHub Actions CI intelligence,
              automated failure investigation, and intelligent job matching.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["AI Assistant", "Interactive engineering conversations"],
                ["CI Intelligence", "Real GitHub Actions workflow status"],
                ["Failure Analysis", "AI-assisted root-cause investigation"],
                ["Job Matching", "AI-powered resume and role analysis"],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-400/40 hover:bg-white/[0.07]"
                >
                  <div className="mb-3 h-1 w-10 rounded-full bg-cyan-400" />
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ResumeChat />
      <QADashboard />
      <AITestGenerator />


      {/* Featured GitHub Projects */}
      <section id="github-projects" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            REAL-WORLD ENGINEERING
          </p>

          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Featured GitHub Projects
          </h2>

          <p className="mb-10 max-w-3xl text-slate-400">
            Explore my hands-on work in AI-assisted quality engineering,
            automated testing, and CI/CD.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="https://github.com/kilicerdal/ai-healthcare-quality-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-900 p-8 transition hover:border-cyan-400"
            >
              <p className="mb-3 text-sm font-semibold text-cyan-400">
                AI + API TESTING
              </p>

              <h3 className="mb-4 text-2xl font-bold text-white">
                AI Healthcare Quality Platform
              </h3>

              <p className="leading-7 text-slate-400">
                Healthcare claims API testing, automated regression,
                PostgreSQL, AWS service mocks, and GitHub Actions CI/CD.
              </p>

              <p className="mt-6 font-semibold text-cyan-300">
                View Repository →
              </p>
            </a>

            <a
              href="https://github.com/kilicerdal/playwright-ai-automation"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-900 p-8 transition hover:border-cyan-400"
            >
              <p className="mb-3 text-sm font-semibold text-cyan-400">
                TEST AUTOMATION
              </p>

              <h3 className="mb-4 text-2xl font-bold text-white">
                Playwright AI Automation
              </h3>

              <p className="leading-7 text-slate-400">
                TypeScript, Playwright, cross-browser testing,
                automated regression, and code quality checks.
              </p>

              <p className="mt-6 font-semibold text-cyan-300">
                View Repository →
              </p>
            </a>
          </div>

          <div className="mt-10">
            <a
              href="/Erdal_Kilic.pdf"
              download
              className="inline-flex rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Download My Resume ↓
            </a>
          </div>
        </div>
      </section>

      <JobMatcher />

      {/* Contact */}
      <section id="contact" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            LET&apos;S CONNECT
          </p>

          <h2 className="text-4xl font-bold md:text-5xl">
            Let&apos;s Build Something Great.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
            Open to discussing opportunities in software quality engineering,
            test automation, cloud technologies, and AI-powered engineering.
          </p>

          <a
            href="mailto:erdal.kilic.us@gmail.com"
            className="mt-10 inline-block rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Contact Me →
          </a>

          <p className="mt-8 text-sm text-slate-500">
            Jersey City, New Jersey · United States
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-slate-500">
          <span>© 2026 Erdal Kilic</span>
          <span>Senior SDET · AI Automation Engineer</span>
          <span>Built with Next.js · TypeScript · Tailwind CSS</span>
        </div>
      </footer>
    
      {/* EAI Professional Contact */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-bold text-white">
            Contact EAI Engineering
          </h2>

          <p className="mt-3 text-slate-300">
            Connect with EAI Engineering for AI automation,
            engineering opportunities, and technical support.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Professional Contact", "erdal@eai.engineering"],
              ["General Inquiries", "hello@eai.engineering"],
              ["Career Opportunities", "careers@eai.engineering"],
              ["Technical Support", "support@eai.engineering"],
            ].map(([label, email]) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="rounded-xl border border-slate-700 bg-slate-950/60 p-5 transition hover:border-cyan-400"
              >
                <div className="text-sm text-slate-400">{label}</div>
                <div className="mt-2 font-medium text-cyan-400">
                  {email}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

</main>
  );
}
