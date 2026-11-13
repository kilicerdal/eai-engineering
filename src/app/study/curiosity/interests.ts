import { facts, type Fact } from './facts';
import { readingOrder } from './reading';

export const INTERESTS_KEY = 'dai.curiosity.interests.v1';
export const topics = [...new Set(facts.map(fact => fact.category))];
export type Interest = 'more' | 'less';
export type TopicPreferences = Partial<Record<string, Interest>>;
export function parseInterests(raw: string | null): TopicPreferences {
  if (!raw) return {};
  const data = JSON.parse(raw);
  if (!data || data.version !== 1 || !data.topics || typeof data.topics !== 'object' || Array.isArray(data.topics)) return {};
  return Object.fromEntries(Object.entries(data.topics).filter(([topic, value]) => topics.includes(topic) && (value === 'more' || value === 'less'))) as TopicPreferences;
}
export function readInterests() {
  try { return { topics: parseInterests(localStorage.getItem(INTERESTS_KEY)), warning: '' }; }
  catch { return { topics: {} as TopicPreferences, warning: 'Topic preferences could not be restored. You can still explore.' }; }
}

// Weighted topic rotation: favorites appear earlier, reduced topics still remain available.
// Every item is retained exactly once, and the result is deterministic for stable navigation.
export function mixTopics(list: Fact[], preferences: TopicPreferences): Fact[] {
  if (!Object.keys(preferences).length) return list;
  const queues = [...new Set(list.map(fact => fact.category))].map(topic => ({
    items: list.filter(fact => fact.category === topic), score: 0,
    weight: preferences[topic] === 'more' ? 3 : preferences[topic] === 'less' ? 0.2 : 1,
  }));
  const result: Fact[] = [];
  while (result.length < list.length) {
    const active = queues.filter(queue => queue.items.length);
    const total = active.reduce((sum, queue) => sum + queue.weight, 0);
    for (const queue of active) queue.score += queue.weight;
    const chosen = active.reduce((best, queue) => queue.score > best.score ? queue : best);
    chosen.score -= total;
    result.push(chosen.items.shift()!);
  }
  return result;
}
export function personalOrder(list: Fact[], preferences: TopicPreferences, seen: string[], unreadFirst: boolean, anchor = '') {
  if (!Object.keys(preferences).length) return readingOrder(list,seen,unreadFirst,anchor);
  const ordered = readingOrder(list, seen, unreadFirst);
  const mixed = unreadFirst
    ? [...mixTopics(ordered.filter(fact => !seen.includes(fact.id)), preferences), ...mixTopics(ordered.filter(fact => seen.includes(fact.id)), preferences)]
    : mixTopics(ordered, preferences);
  const current = mixed.find(fact => fact.id === anchor);
  return current ? [current, ...mixed.filter(fact => fact.id !== anchor)] : mixed;
}
