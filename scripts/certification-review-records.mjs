import {readdir, readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join} from 'node:path';

export function questionFingerprint(q) {
  return createHash('sha256').update(JSON.stringify({prompt:q.prompt, choices:q.choices, answer:q.answer, explanations:q.explanations, source:q.source})).digest('hex');
}

export async function loadReviewRecords(directory) {
  let names;
  try { names = await readdir(directory); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const records = [];
  for (const name of names.filter(name => /^\d{4}-\d{2}-\d{2}-certification-reviewed\.json$/.test(name)).sort()) {
    const document = JSON.parse(await readFile(join(directory, name), 'utf8'));
    if (!Array.isArray(document.records)) throw new Error(`Missing review records: ${name}`);
    const seen = new Set();
    for (const record of document.records) {
      if (!record.id || seen.has(record.id)) throw new Error(`Missing or duplicate question ID in ${name}: ${record.id}`);
      seen.add(record.id);
      // Earlier scoped records used reviewed and an agent-prefixed status.
      records.push({...record, checkedOn:record.checkedOn ?? record.reviewed});
    }
  }
  return records;
}

export function matchingReview(question, reviews) {
  const fingerprint = questionFingerprint(question);
  return reviews.filter(record => record.id === question.id && record.fingerprint === fingerprint
    && ['reviewed-with-stated-scope', 'agent-reviewed-with-stated-scope'].includes(record.status)
    && /^\d{4}-\d{2}-\d{2}$/.test(record.checkedOn ?? '')
    && [record.reviewer, record.scope, record.source].every(value => typeof value === 'string' && value.trim())
    && Array.isArray(record.choiceChecks) && record.choiceChecks.length === question.choices.length
    && record.choiceChecks.every(value => typeof value === 'string' && value.trim().length > 20))
    .sort((a, b) => b.checkedOn.localeCompare(a.checkedOn))[0];
}
