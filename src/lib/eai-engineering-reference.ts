/** Reviewed reference for a narrowly identified async-order question. */
export const sequentialSaveExample = `async function saveItems(items, save) {
  for (const item of items) {
    await save(item);
  }
}`;
export function engineeringReference(question: string): string | null {
  if (!/forEach/.test(question) || !/async|await/.test(question) || !/sequential|one at a time|in order/i.test(question)) return null;
  return "Array.forEach ignores the promises returned by an async callback. Awaiting forEach does not wait for those operations. For sequential execution, use a for…of loop inside an async function.\n\nThis general JavaScript pattern takes your save function as an argument; adapt the names to your code:\n\n```javascript\n"+sequentialSaveExample+"\n```\n\nCall it with `await saveItems(items, save)`. Each item finishes before the next starts. If save rejects, the function rejects and later items are not started. Promise.all starts concurrent work; it is not a sequential replacement.\n\n[JavaScript forEach reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)";
}
