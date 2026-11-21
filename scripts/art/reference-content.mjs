/** Connection evidence only: a readable response is never scholarly verification. */
export function referenceContent(html) {
  const withoutCode = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  const main = withoutCode.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    ?? withoutCode.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1]
    ?? withoutCode.replace(/<head\b[\s\S]*?<\/head>/gi, '');
  const text = main.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ').replace(/\s+/g, ' ').trim();
  const gate = /enable javascript|javascript (?:seems to be |is )?disabled|verify (?:that )?you are human|checking your browser|access denied/i.test(text);
  const readable = text.length >= 300 && !(gate && text.length < 1200);
  return {text, readable, reason: readable ? '' : gate ? 'Access screen · inspect the source manually' : 'Insufficient readable text · inspect the source manually'};
}
