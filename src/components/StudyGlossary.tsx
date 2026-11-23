'use client';

import { useMemo, useState } from 'react';

const entries = [
  { term: 'Attribution', group: 'Art', text: 'The identification of who made a work. An attribution may be secure, qualified, disputed, or unknown; the wording should reflect the strength of the evidence.' },
  { term: 'Conservation', group: 'Art', text: 'The examination and care of an artwork to understand and preserve its material condition. A conservation finding can inform interpretation, but does not settle every question of meaning.' },
  { term: 'Medium', group: 'Art', text: 'The materials and process used to make an artwork, such as oil on canvas, ink on paper, or a printmaking technique.' },
  { term: 'Provenance', group: 'Art', text: 'The documented history of an artwork’s ownership and movement. Gaps in provenance should remain visible rather than being filled with guesses.' },
  { term: 'Primary source', group: 'Evidence', text: 'A record created by a participant, institution, or observer close to the event being studied. It can offer direct evidence, while still reflecting its author’s purpose and limits.' },
  { term: 'Secondary source', group: 'Evidence', text: 'A later account that interprets, synthesizes, or analyzes evidence. Its argument should be distinguished from the original records it discusses.' },
  { term: 'Claim', group: 'Evidence', text: 'A statement that can be examined against evidence. A source may support one part of a claim without establishing its broader interpretation.' },
  { term: 'Interpretation', group: 'Evidence', text: 'An explanation of what evidence may mean. Strong interpretations make their supporting evidence and remaining uncertainty clear.' },
  { term: 'Award motivation', group: 'Recognition', text: 'The awarding body’s concise official statement of the contribution recognized. It records the formal basis for an award; it is not a complete history of the work.' },
  { term: 'Award year', group: 'Recognition', text: 'The year assigned to a prize. Announcement, presentation, publication, discovery, and award dates can differ.' },
  { term: 'Announcement date', group: 'Recognition', text: 'The day a decision or event became public. It may not be the same as the date of the work, its publication, or its formal recognition.' },
  { term: 'Presentation date', group: 'Recognition', text: 'The date an award or object was formally presented. Keep it distinct from the year assigned to the award.' },
  { term: 'Publication date', group: 'Recognition', text: 'The date a paper, book, or account appeared. It can follow the underlying work or discovery by months or years.' },
  { term: 'Confidence', group: 'Learning', text: 'A learner’s estimate of how sure they are about an answer. It can guide reflection, but a confidence rating by itself does not demonstrate mastery.' },
  { term: 'Estimate', group: 'Learning', text: 'An approximate guide, such as reading time. It depends on assumptions and should not be treated as a promise or a measure of ability.' },
];

export default function StudyGlossary() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return entries.filter(item => !normalized || `${item.term} ${item.group} ${item.text}`.toLocaleLowerCase().includes(normalized));
  }, [query]);
  const groups = [...new Set(results.map(item => item.group))];

  return <section className="study-glossary-page" id="study-glossary">
    <p className="study-glossary-kicker">LEARNING STUDIO / REFERENCE</p>
    <h1>Key terms, in context.</h1>
    <p className="study-glossary-intro">A compact guide to recurring language across the Reading Room, Art Room, discoveries, awards, and study tools. Definitions describe how a term is used here; they do not replace the evidence in an individual study.</p>
    <label className="study-glossary-search">Find a term<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try provenance, award year, or confidence" /></label>
    <p className="study-glossary-count" aria-live="polite">Showing {results.length} of {entries.length} terms.</p>
    {groups.length ? groups.map(group => <section className="study-glossary-group" key={group} aria-labelledby={`glossary-${group}`}>
      <h2 id={`glossary-${group}`}>{group}</h2>
      <dl>{results.filter(item => item.group === group).map(item => <div key={item.term}><dt>{item.term}</dt><dd>{item.text}</dd></div>)}</dl>
    </section>) : <section className="study-glossary-empty"><h2>No matching term</h2><p>Try a shorter word, or clear the search to browse the full glossary.</p><button type="button" onClick={() => setQuery('')}>Show all terms</button></section>}
  </section>;
}
