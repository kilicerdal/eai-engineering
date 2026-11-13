import type { Fact } from './facts';
import { expandedFacts } from './expanded-facts';
import { soundsMadeUpFacts, soundsMadeUpSources } from './sounds-made-up';
import { everydayWonderFacts, everydayWonderSources } from './everyday-wonders';
import { hiddenConnectionFacts, hiddenConnectionSources } from './hidden-connections';
import { yourWorldFacts, yourWorldSources } from './your-world';

// Preserve the original records. Dates come from their documented source reviews,
// not a claim that every earlier card was re-audited during V1.8.
const reviews = new Map<string, string>([
  ...expandedFacts.map(fact => [fact.id, '2026-11-13'] as const),
  ...soundsMadeUpFacts.map(fact => [fact.id, soundsMadeUpSources[fact.sourceKey].reviewedOn] as const),
  ...everydayWonderFacts.map(fact => [fact.id, everydayWonderSources[fact.sourceKey].reviewedOn] as const),
  ...hiddenConnectionFacts.map(fact => [fact.id, hiddenConnectionSources[fact.sourceKey].reviewedOn] as const),
  ...yourWorldFacts.map(fact => [fact.id, yourWorldSources[fact.sourceKey].reviewedOn] as const),
]);
export function sourceDetails(fact: Fact) {
  return {
    publisher: fact.source.split(' · ')[0],
    label: fact.source,
    url: fact.url,
    host: new URL(fact.url).hostname.replace(/^www\./, ''),
    reviewedOn: reviews.get(fact.id),
  };
}
