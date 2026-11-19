// Editorial comparison prompts: a bridge is not evidence that one claim proves another.
export const discoveryBridges=[
 {ids:['retrieval-practice','spaced-learning'],reason:'Compare the act of recalling with the timing of returning. Which part could you change in a study session?'},
 {ids:['drawing-memory','jacquard-patterns'],reason:'Compare two ways of representing information: a learner’s sketch and an encoded pattern. What is preserved or left out?'},
 {ids:['gobekli-builders','stonehenge-transport'],reason:'Compare making a monument with getting its materials to the site. What evidence would answer each question?'},
 {ids:['gobekli-symbols','rosetta-scripts'],reason:'Compare surviving symbols with clues that help interpretation. When is the meaning still uncertain?'},
 {ids:['antikythera-gears','moon-rotation'],reason:'Compare a mechanical representation of cycles with the motions it models. Where does the model simplify?'},
 {ids:['venus-rotation','moon-rotation'],reason:'Separate rotation from orbit. How does changing the reference point change the description?'},
 {ids:['sunlight-travel','bat-echoes'],reason:'Compare how travel time affects two signals. The analogy concerns timing; light and sound have different physical behavior.'},
 {ids:['octopus-hearts','middle-ear-bones'],reason:'Compare specialized parts in two biological systems. Ask what each part does without assuming their functions are alike.'},
 {ids:['bee-dance','braille-cell'],reason:'Compare information encoded in movement with information encoded in touch. What can the recipient distinguish in each system? This is an analogy, not a shared biological mechanism.'},
 {ids:['roman-concrete','coral-builders'],reason:'Compare structures built by people and by organisms. Ask what maintains each structure without assuming that the processes are the same.'},
 {ids:['hydrometer','saturn-density'],reason:'Compare density measured by a floating instrument with the average density assigned to a planet. Keep the scale and the meaning of the measurement explicit.'},
 {ids:['ice-floats','saturn-density'],reason:'Use density as the connecting idea, then identify where an everyday floating analogy stops being a realistic planetary experiment.'},
 {ids:['hearing-signals','bat-echoes'],reason:'Compare receiving sound with using an echo to locate something. Which information comes from the signal and which from its timing?'},
 {ids:['rosetta-scripts','braille-cell'],reason:'Compare recognizing a writing system with knowing how to read its meaning. A visible or tactile pattern needs an interpretation.'},
 {ids:['jacquard-patterns','braille-music'],reason:'Compare patterns that control a process with patterns that represent music for a reader. What does each encoding preserve?'},
 {ids:['art-infrared','gobekli-symbols'],reason:'Compare examining surviving material with interpreting an intention. New observations can narrow an explanation without proving what the maker meant.'},
 {ids:['clay-classroom','retrieval-practice'],reason:'Connect evidence of historical study with a modern question about learning. A surviving classroom tablet is not an experiment proving a study method.'},
 {ids:['web-scientists','rosetta-scripts'],reason:'Compare two different barriers to sharing knowledge: access to documents and interpretation of a writing system. Which barrier remains after the record is available?'},
 {ids:['coral-bleaching','venus-heat'],reason:'Compare environmental conditions with a system’s response. Their mechanisms differ; ask which measurements support each explanation.'},
 {ids:['art-xrays','clay-accounts'],reason:'Compare records that reveal earlier decisions with records made for everyday use. What can be inferred, and what context would still be missing?'}
] as const;
export function discoveryBridge(a:string,b:string){return discoveryBridges.find(x=>x.ids.some(id=>id===a)&&x.ids.some(id=>id===b)&&a!==b)?.reason??null;}
export function preferredRelated<T extends {id:string}>(id:string,pool:T[],fallback:T[]){const connected:string[]=discoveryBridges.flatMap(x=>x.ids.some(other=>other===id)?x.ids.filter(x=>x!==id):[]);return [...new Set(connected)].flatMap(id=>{const item=pool.find(f=>f.id===id);return item?[item]:[];}).concat(fallback.filter(f=>!connected.includes(f.id)&&f.id!==id)).slice(0,2);}
export const discoveryScope:Record<string,string>={
 'venus-rotation':'“Day” needs a definition. Compare a full rotation relative to the stars with a solar day; do not substitute one measurement for the other.',
 'drawing-memory':'This is evidence about specified experimental tasks. It is not a claim that drawing is the best method for every learner or subject.',
 'gobekli-symbols':'A carving can be observed even when its intended meaning is uncertain. Distinguish the surviving object from an interpretation.',
 'stonehenge-transport':'A stone’s geological origin and its precise transport route are different claims. Evidence about one does not settle the other.',
 'retrieval-practice':'The comparison includes the tested conditions and feedback. A learning study is not a guarantee for every task or schedule.',
 'spaced-learning':'Spacing depends on the material and the desired retention interval. There is no single optimal gap established for every learning goal.'
};
