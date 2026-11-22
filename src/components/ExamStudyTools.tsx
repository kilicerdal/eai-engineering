"use client";
import {useState} from "react";
import {mathStudy,passageSentences,readingEvidence,irrelevantFact} from "@/lib/study-exam-learning";
import type {ExamBankQuestion} from "@/lib/study-exam-bank";
import type {ExamAttempt} from "@/lib/study-exam-practice";
import ExamNotation from "./ExamNotation";
import ExamDiagrams from "./ExamDiagrams";
export function ExamMathStudy({question:q,plain,unlocked,onOpen}:{question:ExamBankQuestion;plain:boolean;unlocked:boolean;onOpen:(at:number)=>void}){
 const study=mathStudy(q),[errorChoice,setErrorChoice]=useState<number|null>(null),[errorChecked,setErrorChecked]=useState(false),[missing,setMissing]=useState(""),[missingRevealed,setMissingRevealed]=useState(false);
 if(!study)return null;
 return <details className="exam-depth-panel" onToggle={e=>{if(e.currentTarget.open&&!unlocked)onOpen(Date.now());}}><summary>Worked study, diagrams and reasoning exercises{unlocked?"":" · counts as help"}</summary>{unlocked?<>
  <p className="exam-scope-note">Authored learning support, not an additional graded attempt. Opening this before checking is recorded as help.</p>
  <h3>Exactness, units and restrictions</h3><p>{study.exact}</p><p>{study.units}</p><p>{study.restriction}</p>
  <ol className="exam-worked-steps">{study.steps.map((step,i)=><li key={i}><div><ExamNotation text={step.expression} plain={plain}/></div><p>{step.why}</p></li>)}</ol>
  <h3>Check the result</h3><p><ExamNotation text={study.check} plain={plain}/></p><h3>A second way to approach it</h3><p><ExamNotation text={study.alternative} plain={plain}/></p><h3>Why the shortcut fails</h3><p>{study.shortcut}</p>
  <details><summary>Precision and related cases</summary><p><ExamNotation text={study.related} plain={plain}/></p><p>Related rounding example: (1/3) × 3 = 1 exactly. Rounding 1/3 to 0.33 first gives 0.99. Preserve precision until the requested final rounding step.</p></details>
  <ExamDiagrams question={q}/>
  <section className="exam-mini-exercise" aria-label="Find the first incorrect step"><h3>Find the first incorrect step</h3><p>This deliberately flawed worked solution is separate from your checked answer.</p><fieldset><legend>Which line first uses an invalid step?</legend>{study.error.lines.map((line,i)=><label key={i}><input type="radio" name={`error-${q.id}`} checked={errorChoice===i} onChange={()=>{setErrorChoice(i);setErrorChecked(false);}}/>Line {i+1}: <ExamNotation text={line} plain={plain}/></label>)}</fieldset><button type="button" disabled={errorChoice===null} onClick={()=>setErrorChecked(true)}>Check the worked step</button>{errorChecked&&<p role="status">{errorChoice===study.error.wrongIndex?"Yes. ":`Revisit line ${study.error.wrongIndex+1}. `}{study.error.why} This exercise does not change your exam result.</p>}</section>
  <section className="exam-mini-exercise" aria-label="Supply the missing step"><h3>Supply the missing step</h3><p><ExamNotation text={study.missing.before} plain={plain}/></p><label>Your intermediate step<textarea maxLength={500} rows={2} value={missing} onChange={e=>setMissing(e.target.value)}/></label><p><ExamNotation text={study.missing.after} plain={plain}/></p><button type="button" onClick={()=>setMissingRevealed(true)}>Compare with the authored step</button>{missingRevealed&&<div role="status"><p><ExamNotation text={study.missing.answer} plain={plain}/></p><p>{study.missing.why}</p><p>Equivalent forms may also be valid. This is a self-comparison, not exact-string grading.</p>{missing&&<p>Your supplied step: {missing}</p>}</div>}</section>
 </>:<p>Opening the worked study…</p>}</details>;
}
export function ExamReadingStudy({question:q,attempt}:{question:ExamBankQuestion;attempt?:ExamAttempt}){
 const [numbered,setNumbered]=useState(false),[highlight,setHighlight]=useState<number|null>(null),[chosenComparison,setComparison]=useState<number|null>(null);
 if(!q.passage)return null;
 const comparison=chosenComparison??(attempt?.selectedIndex!==null&&attempt?.selectedIndex!==undefined&&attempt.selectedIndex!==q.answerIndex?attempt.selectedIndex:(q.answerIndex+1)%q.choices.length);
 const sentences=passageSentences(q.passage),evidence=readingEvidence(q),irrelevant=irrelevantFact(q);
 function showSentence(number:number){setNumbered(true);setHighlight(number);requestAnimationFrame(()=>{const e=document.getElementById(`sentence-${q.id}-${number}`);e?.scrollIntoView({block:"center",behavior:"smooth"});e?.focus({preventScroll:true});});}
 return <section className="exam-reading-source" aria-label="Question passage and evidence"><label><input type="checkbox" checked={numbered} onChange={e=>setNumbered(e.target.checked)}/>Optional sentence numbers</label>{numbered?<ol className="exam-passage exam-numbered-passage">{sentences.map(s=><li id={`sentence-${q.id}-${s.number}`} key={s.number} tabIndex={-1} data-highlighted={highlight===s.number}><span className="exam-sentence-number" aria-hidden="true">{s.number}. </span>{s.text}</li>)}</ol>:<div className="exam-passage">{q.passage}</div>}
 {attempt&&<details className="exam-depth-panel"><summary>Reading evidence and answer comparison</summary><h3>Explanation linked to the passage</h3><p>{q.explanation}</p>{evidence.map(s=><blockquote key={s.number}><p>“{s.text}”</p><button type="button" onClick={()=>showSentence(s.number)}>Go to sentence {s.number}</button></blockquote>)}
 <label>Compare another answer<select aria-label="Compare another answer" value={comparison} onChange={e=>setComparison(Number(e.target.value))}>{q.choices.map((choice,i)=>i!==q.answerIndex&&<option key={i} value={i}>{String.fromCharCode(65+i)}. {choice}</option>)}</select></label>
 <div className="exam-choice-comparison"><article><h4>Authored correct answer</h4><p>{q.choices[q.answerIndex]}</p><p>{q.choiceNotes[q.answerIndex]}</p></article><article><h4>Competing answer</h4><p>{q.choices[comparison]}</p><p>{q.choiceNotes[comparison]}</p></article></div>
 <h3>What the passage establishes</h3><p>The quoted words above are the supplied evidence. A claim about other populations, an unstated cause, or a universal result needs additional evidence; familiarity with the topic does not establish that claim from this passage.</p>{irrelevant&&<><h3>True can still be irrelevant</h3><p>{irrelevant}</p></>}
 {q.skill==="boundaries"&&<><h3>How the punctuation changes the structure</h3><p><strong>Authored completion:</strong> {q.passage.replace(/_+/,q.choices[q.answerIndex])}</p><p><strong>Competing completion:</strong> {q.passage.replace(/_+/,q.choices[comparison]==="no punctuation"?"":q.choices[comparison])}</p><p>{q.choiceNotes[comparison]}</p></>}
 </details>}
 </section>;
}
