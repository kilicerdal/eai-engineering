/** Reviewed reference for a narrowly identified async-order question. */
export const sequentialSaveExample = `async function saveItems(items, save) {
  for (const item of items) {
    await save(item);
  }
}`;
export const fetchJSONExample = `async function fetchJSON(url, fetchImpl = fetch) {
  let response;
  try { response = await fetchImpl(url); }
  catch (error) { return { ok: false, kind: "request", error }; }
  if (!response.ok) return { ok: false, kind: "http", status: response.status };
  try { return { ok: true, data: await response.json() }; }
  catch (error) { return { ok: false, kind: "json", error }; }
}`;
export function engineeringReference(question: string): string | null {
  if (/\bfetch\b/i.test(question) && /HTTP|500|response\.ok/i.test(question) && /network|JSON|reject/i.test(question)) {
    return "Native fetch normally resolves even for HTTP 4xx/5xx. Check response.ok/status yourself. Request failures (including network failures or aborts), HTTP error statuses, and invalid JSON are distinct outcomes. response.json() parses the body; it does not validate HTTP status.\n\nThis illustrative helper returns a tagged result:\n\n```javascript\n" + fetchJSONExample + "\n```\n\nCheck result.ok first; for failures inspect result.kind. A request failure alone does not prove a network outage. [Fetch reference](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)";
  }
  if (!/forEach/.test(question) || !/async|await/.test(question) || !/sequential|one at a time|in order/i.test(question)) return null;
  return "Array.forEach ignores the promises returned by an async callback. Awaiting forEach does not wait for those operations. For sequential execution, use a for…of loop inside an async function.\n\nThis general JavaScript pattern takes your save function as an argument; adapt the names to your code:\n\n```javascript\n"+sequentialSaveExample+"\n```\n\nCall it with `await saveItems(items, save)`. Each item finishes before the next starts. If save rejects, the function rejects and later items are not started. Promise.all starts concurrent work; it is not a sequential replacement.\n\n[JavaScript forEach reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)";
}
