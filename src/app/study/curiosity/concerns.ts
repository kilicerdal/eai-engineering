import type { Fact } from './facts';
export const concernReasons = ['Claim may be incorrect', 'Source link problem', 'Wording is unclear', 'Other concern'] as const;
export type ConcernReason = typeof concernReasons[number];
export function concernReport(fact: Fact, reason: string, note: string) {
  const selectedReason = concernReasons.find(item => item === reason) ?? concernReasons[0];
  const body = ['Curiosity Room concern',`Reason: ${selectedReason}`,`Discovery ID: ${fact.id}`,`Title: ${fact.title}`,`Fact: ${fact.text}`,`Discovery: https://www.eai.engineering/study/curiosity?fact=${encodeURIComponent(fact.id)}`,`Source: ${fact.source}`,`Source URL: ${fact.url}`,'',`Reader note: ${note.trim().slice(0,1000) || '(none)'}`].join('\n');
  return {body,mailto:`mailto:support@eai.engineering?subject=${encodeURIComponent(`Curiosity Room concern: ${fact.id}`)}&body=${encodeURIComponent(body)}`};
}
