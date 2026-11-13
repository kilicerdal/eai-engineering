import { facts, type Fact } from './facts';

export type Guess = { options: [string, string]; correct: number };
export const guesses: Record<string, Guess> = {
  'venus-heat': { options: ['Mercury is hottest', 'Venus is hottest'], correct: 1 },
  'moon-rotation': { options: ['It rotates', 'It never rotates'], correct: 0 },
  'octopus-hearts': { options: ['One heart', 'Three hearts'], correct: 1 },
  'braille-cell': { options: ['63 nonblank patterns', '12 nonblank patterns'], correct: 0 },
  'web-scientists': { options: ['Shopping', 'Scientific sharing'], correct: 1 },
  'web-editor': { options: ['Yes, it could edit', 'No, display only'], correct: 0 },
  'ice-floats': { options: ['Ice is less dense', 'Ice is more dense'], correct: 0 },
  'coral-animal': { options: ['An animal', 'A plant'], correct: 0 },
  'coral-bleaching': { options: ['Always already dead', 'Stressed, but may survive'], correct: 1 },
  'saturn-rings': { options: ['Solid hoops', 'Separate orbiting particles'], correct: 1 },
  'saturn-density': { options: ['Saturn', 'Earth'], correct: 0 },
  'pigeonhole-months': { options: ['A match is guaranteed', 'A match is only possible'], correct: 0 },
};

export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function hash(text: string) {
  let value = 2166136261;
  for (const character of text) value = Math.imul(value ^ character.charCodeAt(0), 16777619);
  return value >>> 0;
}
export function dailyFacts(day: string, collection: Fact[] = facts) {
  const ranked = [...collection].sort((a, b) => hash(`${day}:${a.id}`) - hash(`${day}:${b.id}`) || a.id.localeCompare(b.id));
  const topics = new Set<string>();
  return ranked.filter(fact => {
    if (topics.has(fact.category)) return false;
    topics.add(fact.category); return true;
  }).slice(0, 5);
}
export function linkedFact(search: string) {
  const id = new URLSearchParams(search).get('fact');
  return facts.find(fact => fact.id === id) || null;
}
export function discoveryLink(origin: string, id: string) {
  if (!facts.some(fact => fact.id === id)) throw new Error('Unknown discovery');
  const url = new URL('/study/curiosity', origin);
  url.searchParams.set('fact', id);
  return url.toString();
}
export function curiosityHandoff(id: string | null) {
  const fact = facts.find(fact => fact.id === id);
  if (!fact) return null;
  const subject = fact.category === 'Ancient ingenuity' ? 'history' : ['Space', 'Nature', 'Human body', 'Everyday science', 'Food & Drink', 'Earth & Weather'].includes(fact.category) ? 'science' : 'general';
  return {
    subject, title: `Curiosity: ${fact.title}`.slice(0, 60), goal: `Understand: ${fact.title}`,
    message: `I found this discovery in the dAI Curiosity Room:\n\n${fact.title}\n${fact.text}\n\nListed source: ${fact.source}\n${fact.url}\n\nHelp me understand it with a clear explanation and an everyday analogy, then ask me one question to explore further. Treat this as a supplied summary, not a source you have opened; say when a detail needs checking.`,
  };
}
