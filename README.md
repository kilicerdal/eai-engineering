# EAI Engineering

### AI-Powered Software Quality & Learning Platform

**EAI Engineering** is an independent AI engineering project created by **Erdal Kilic**, Senior SDET | QA Automation Engineer.

The platform demonstrates practical applications of artificial intelligence, software quality engineering, and modern full-stack development.

**Live Website:** https://www.eai.engineering

---

## Featured Applications

### AI Academic Study Assistant
An interactive AI learning assistant designed to help students understand academic concepts and strengthen their learning experience.

### AI Academic Writing Studio
An AI-powered writing environment featuring:

- Essay drafting and editing
- Structured academic feedback
- Thesis and argument evaluation
- Grammar and clarity assessments
- Organization and evidence analysis
- Essay scoring dashboards
- Long-essay analysis
- AI rate-limit handling and retry countdowns

**Live Demo:** https://www.eai.engineering/study/writing

### Engineering AI Assistant

An AI assistant for coding, debugging, testing, code review, and AWS questions, with conversation controls and formatted code responses.

### Learning Studio

AI tutoring, learning plans, linked study materials, lesson checks, and a mistake notebook.

### Quality Engineering Roadmap

AI-assisted test generation, failure analysis, coverage intelligence, and repository health workflows are areas of ongoing development. Their inclusion in the roadmap does not imply a finished enterprise testing product.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| AI Integration | Cloudflare Workers AI |
| Backend | Next.js API Routes, Supabase |
| Quality | Node.js test runner, ESLint, TypeScript, production build validation |
| Version Control | Git, GitHub |
| Deployment | Vercel |

## Architecture

    EAI Engineering
           |
    Next.js Frontend
           |
    Application Routes
           |
    Server-Side AI APIs
           |
    Request Protection
           |
    Cloudflare Workers AI
           |
    Streaming Responses
           |
    User Interface

AI requests are processed through server-side API routes. Service credentials are configured using environment variables.

---

## Reliability and Security

- Server-side AI request handling
- Request validation and protection
- HTTP error handling
- Rate-limit response handling
- Retry countdowns in the Writing Studio
- Streaming response processing
- Environment-based configuration
- Automated lint and production build checks

## Local Development

Requirements:
- Node.js
- npm
- Cloudflare Workers AI credentials for AI-powered features

Install dependencies:

    npm install

Start the development server:

    npm run dev

Run quality checks:

    npm run test:study
    npm run lint
    npm run build

AI features require environment configuration. Credentials must never be committed to version control.

---

## Project Status

**Active Development**

Current priorities:

- Improving AI response reliability
- Enhancing academic writing feedback
- Expanding AI-powered quality engineering tools
- Improving application usability and performance

## Personal Contribution

I design, develop, and maintain the interface, server-side AI integrations, conversation controls, and learning workflows. I also maintain automated regression checks and deployment through GitHub and Vercel.

## Connect

**Website:** https://www.eai.engineering

**GitHub:** https://github.com/kilicerdal

---

© 2026 EAI Engineering. Built by Erdal Kilic.
