import { facts, type Fact } from './facts';
import { discoveryQuestion, insights } from './insights';

// Treat punctuation, case, repeated spaces and accents consistently on both sides.
function normalized(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
const searchable = (fact: Fact) => normalized([discoveryQuestion(fact), fact.title, fact.text, fact.category, fact.source, insights[fact.id]?.why || ''].join(' '));
const index = new Map(facts.map(fact => [fact.id, searchable(fact)]));

export function matchesDiscovery(fact: Fact, query: string): boolean {
  const terms = normalized(query).split(' ').filter(Boolean);
  const text = index.get(fact.id) ?? searchable(fact);
  // Every word must match, but remembered words need not be in the original order.
  return terms.every(term => text.includes(term));
}
