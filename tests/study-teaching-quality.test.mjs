import test from 'node:test';
import assert from 'node:assert/strict';
import {buildTutorSystem,normalizeLearningProfile,tutoringSignals} from '../src/lib/study-tutor.ts';
const profile=normalizeLearningProfile({approach:'guided',level:'foundation'});

test('a second expression of confusion triggers one concrete demonstration before a question',()=>{
 const history=[{role:'user',content:'I am confused about distributed.'},{role:'assistant',content:'It means spread throughout the volume.'}];
 const context={history,message:'That still does not make sense to me.'};
 assert.equal(tutoringSignals(context).repeatedStruggle,true);
 assert.match(buildTutorSystem('science','Explain gases',profile,context),/Give the demonstration before the question/);
 assert.equal(tutoringSignals({...context,message:'That still does not make sense to the narrator.'}).repeatedStruggle,false);
});

test('a complete poem gets close-reading guidance while an ordinary drafting request does not',()=>{
 const system=message=>buildTutorSystem('writing','Provide feedback',profile,{message});
 assert.match(system('The whole poem is “The gate stays open.” Does that suggest trust?'),/CLOSE READING/);
 assert.doesNotMatch(system('Help me draft an introduction.'),/CLOSE READING/);
});
