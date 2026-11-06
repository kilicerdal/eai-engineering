/** Read Cloudflare-native and OpenAI-compatible SSE without assuming network chunk boundaries. */
export async function readStudyStream(response: Response, onText: (text: string) => void, requireDone = false): Promise<string> {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const wait = Number(response.headers.get("Retry-After"));
    const message = response.status === 429
      ? `You've reached the request limit. ${wait > 0 ? `Try again in about ${Math.ceil(wait / 60)} minute(s).` : "Please try again later."}`
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
    if (payload.error || payload.errors?.length) throw new Error("The response was interrupted. Please try again.");
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
