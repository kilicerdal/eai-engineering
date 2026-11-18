import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../public/evidence/settlementlab-v41/',import.meta.url);
const read=name=>JSON.parse(readFileSync(new URL(name,root),'utf8'));

test('V4.1 public claims match the unchanged release scorecard and all economic comparisons',()=>{
 const summary=read('summary.json'),scorecard=read('scorecard/scorecard.json');
 assert.equal(summary.version,'4.1.0');
 assert.equal(scorecard.status,'passed');
 assert.deepEqual(summary.source,scorecard.source);
 assert.equal(summary.source.dirty,false);
 assert.equal(summary.controls.cases,scorecard.controls.cases);
 assert.equal(summary.coverage_percent,scorecard.coverage.percent_covered);
 assert.deepEqual(summary.day.exact_totals,scorecard.business_day.exact_totals);
 const comparisons=read('scorecard/economic-oracle.json').comparisons;
 assert.equal(comparisons.length,summary.day.planned_trades);
 assert.ok(comparisons.every(c=>c.movements_match&&c.settlement_batches===1));
 for(const comparison of comparisons){
  assert.deepEqual(comparison.expected_movements,comparison.observed_movements);
  for(const asset of ['CASH:USD','SEC:'+comparison.accepted_terms.symbol]){
   assert.equal(comparison.observed_movements.filter(line=>line.asset===asset).reduce((total,line)=>total+line.delta*line.count,0),0);
  }
 }
 assert.equal(summary.ai.live_local.status,'not-run');
 assert.equal(summary.ai.adversarial.responses_not_meeting_rubric,6);
 const negative=read('scorecard/reuse/injected-defect/results.json');
 assert.equal(negative.status,'failed');
 assert.ok(negative.cases.some(c=>c.steps.some(s=>s.failure?.kind==='http_status'&&s.failure.expected===200&&s.failure.actual===201)));
});

test('hosted scorecard bytes retain their release manifest checksums',()=>{
 const hashes=read('scorecard/checksums.json');
 for(const [path,expected] of Object.entries(hashes)){
  assert.ok(!path.includes('..')&&!path.startsWith('/'));
  const observed=createHash('sha256').update(readFileSync(new URL('scorecard/'+path,root))).digest('hex');
  assert.equal(observed,expected,path);
 }
});
