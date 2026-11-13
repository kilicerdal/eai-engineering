export function retryDelaySeconds(headers: Headers): number | null {
  const value = headers.get("Retry-After")?.trim();
  if (!value) return null;
  let seconds: number;
  if (/^\d+$/.test(value)) {
    seconds = Number(value);
  } else if (value.endsWith(" GMT")) {
    const serverTime = Date.parse(headers.get("Date") || "");
    seconds = Math.ceil((Date.parse(value) - (Number.isFinite(serverTime) ? serverTime : Date.now())) / 1000);
  } else {
    return null;
  }
  if (!Number.isSafeInteger(seconds)) return null;
  return Math.max(0, seconds);
}

function retryGuidance(headers: Headers): string {
  const seconds = retryDelaySeconds(headers);
  if (seconds === null) return "Please try again later.";
  if (seconds <= 0) return "You can retry now.";
  const unit = seconds < 60 ? "second" : "minute";
  const amount = seconds < 60 ? seconds : Math.ceil(seconds / 60);
  return `Try again in about ${amount} ${unit}${amount === 1 ? "" : "s"}.`;
}

/** Read Cloudflare-native and OpenAI-compatible SSE without assuming network chunk boundaries. */
export async function readStudyStream(response: Response, onText: (text: string) => void, requireDone = false): Promise<string> {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = response.status === 429
      ? `You've reached the request limit. ${retryGuidance(response.headers)}`
      : typeof payload?.error === "string" ? payload.error : "The tutor is temporarily unavailable. Please try again.";
    throw new Error(message);
  }
  if (!response.body || !response.headers.get("content-type")?.includes("text/event-stream")) {
    throw new Error("The tutor could not start a response. Please try again.");
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let answer = "";
  let finished = false;
  let displayed = "";
  const markers=["<|start|>","<|end|>","<|return|>","<|channel|>","<|im_start|>","<|im_end|>"];
  function visiblePrefix(text:string) {
    if ("analysis:".startsWith(text)) return "";
    // Hold incomplete control markers until enough text arrives to classify them.
    let held=0;
    for(const marker of markers)for(let length=1;length<marker.length;length++)
      if(text.endsWith(marker.slice(0,length)))held=Math.max(held,length);
    return held?text.slice(0,-held):text;
  }
  function processEvent(event: string) {
    const data = event.split(/\r?\n/).filter(line => line.startsWith("data:"))
      .map(line => line.slice(5).trimStart()).join("\n").trim();
    if (!data) return;
    if (data === "[DONE]") { finished = true; return; }
    let payload;
    try { payload = JSON.parse(data); } catch { throw new Error("The response was interrupted. Please retry or ask the tutor to continue."); }
    if (!payload || typeof payload !== "object" || Array.isArray(payload) || payload.error || payload.errors?.length) throw new Error("The response was interrupted. Please try again.");
    const finishReason=payload.choices?.[0]?.finish_reason;
    if(finishReason==="length")throw new Error("The reply reached its output limit before finishing. The visible text is incomplete. Retry or ask a narrower question.");
    if(finishReason==="content_filter")throw new Error("The provider could not complete this reply. Try rephrasing the question.");
    const token = payload.choices?.[0]?.delta?.content ?? payload.response;
    if (typeof token === "string") {
      answer += token;
      if (/<\|(?:start|end|return|channel|im_start|im_end)\|>/.test(answer) || /^analysis:/.test(answer)) {
        throw new Error("The tutor returned an invalid response. Please retry your question.");
      }
      const visible=visiblePrefix(answer);
      if(visible && visible!==displayed){onText(visible);displayed=visible;}
    }
  }
  try {
    while (!finished) {
      const { value, done } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      let boundary;
      while ((boundary = /\r?\n\r?\n/.exec(buffer)) && !finished) {
        processEvent(buffer.slice(0, boundary.index));
        buffer = buffer.slice(boundary.index + boundary[0].length);
      }
      if (done) { if (buffer.trim() && !finished) processEvent(buffer); break; }
    }
    if (requireDone && !finished) throw new Error("The response was interrupted. Retry the question.");
    if (!answer.trim()) throw new Error("The tutor returned an empty response. Please try again.");
    if(visiblePrefix(answer)!==answer && /<\|[^>]*$/.test(answer))throw new Error("The tutor returned an invalid response. Please retry your question.");
    if(answer!==displayed)onText(answer);
    return answer;
  } finally {
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
