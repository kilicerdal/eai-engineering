"use client";

import { useState, type FormEvent } from "react";

export default function JobMatcher() {
  const [description, setDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (description.trim().length < 30 || loading) return;

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to analyze this job description.");
      }

      const result = await response.json();
      setAnalysis(result.analysis);
    } catch {
      setError(
        "The AI matcher is unavailable. Make sure FastAPI and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="job-matcher" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-4 text-sm font-bold tracking-widest text-cyan-400">
            AI-POWERED RECRUITING
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            AI Job Description Matcher
          </h2>

          <p className="mt-5 text-slate-400">
            Compare a job description against my resume using local AI.
          </p>
        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-[#101827] p-6 shadow-2xl md:p-8">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="job-description"
              className="mb-3 block font-semibold text-white"
            >
              Paste a Job Description
            </label>

            <textarea
              id="job-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Paste the job requirements, responsibilities, and qualifications here..."
              rows={10}
              maxLength={15000}
              className="w-full resize-y rounded-xl border border-white/10 bg-slate-900 p-5 text-sm leading-7 text-white outline-none focus:border-cyan-400"
            />

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Resume-grounded analysis · Powered by Ollama
              </p>

              <button
                type="submit"
                disabled={loading || description.trim().length < 30}
                className="rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Job Match"}
              </button>
            </div>
          </form>

          {error && (
            <p role="alert" className="mt-6 text-sm text-red-400">
              {error}
            </p>
          )}

          {analysis && (
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="mb-5 text-xl font-bold text-cyan-300">
                AI Match Analysis
              </h3>

              <div className="whitespace-pre-wrap rounded-2xl bg-slate-900 p-6 text-sm leading-8 text-slate-200">
                {analysis}
              </div>

              <p className="mt-4 text-xs text-slate-500">
                AI-generated assessment. Verify important details against the resume.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
