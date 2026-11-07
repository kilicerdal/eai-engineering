/** Best-effort sanitization before failure logs leave the server for inference. */
export function redactFailureLog(text: string): string {
  return text
    .replace(/\b(?:gh[pousr]_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)\b/g, "[REDACTED_TOKEN]")
    .replace(/(\bauthorization["']?\s*[:=]\s*)(?:"[^"\r\n]*"|'[^'\r\n]*'|[^\r\n,;}]+)/gi, "$1[REDACTED]")
    .replace(/(\bbearer\s+)[A-Za-z0-9._~+\/=-]+/gi, "$1[REDACTED]")
    .replace(/(\b(?:password|secret|api[_-]?key|token)["']?\s*[:=]\s*)(?:"[^"\r\n]*"|'[^'\r\n]*'|[^\s,;}]+)/gi, "$1[REDACTED]");
}
