import {worldWonderFacts} from './world-wonders';
import { smallThingsFacts } from './small-things';
import { yourWorldFacts } from './your-world';
import { hiddenConnectionFacts } from './hidden-connections';
import { everydayWonderFacts } from './everyday-wonders';
import { facts, type Fact } from './facts';
import { soundsMadeUpFacts } from './sounds-made-up';
import { expandedFacts } from './expanded-facts';

type Insight = { why: string; related: [string, string] };
const insight = (why: string, first: string, second: string): Insight => ({ why, related: [first, second] });

// Editorial connections and practical reflections on the existing sourced facts.
// These are invitations to think, not additional historical or scientific claims.
export const insights: Record<string, Insight> = {
  'retrieval-practice': insight('Trying to recall an idea gives you something to check and correct. You can build that small step into a study session instead of only rereading.', 'spaced-learning', 'clay-classroom'),
  'spaced-learning': insight('A study plan can make room for returning to an idea over time. The useful question is not just how long you study, but when you come back.', 'retrieval-gaps', 'retrieval-practice'),
  'drawing-memory': insight('Turning an idea into a sketch asks you to decide what matters and how its parts connect. A simple diagram can become a tool for reviewing your understanding.', 'art-infrared', 'jacquard-patterns'),
  'retrieval-gaps': insight('You do not need a perfect sequence of increasing gaps to try spaced recall. Leaving time between attempts is a practical place to begin.', 'spaced-learning', 'retrieval-practice'),
  'gobekli-builders': insight('These monuments invite us to recognize engineering as a human activity rooted in planning, materials, and cooperation, long before powered tools.', 'stonehenge-transport', 'roman-concrete'),
  'gobekli-symbols': insight('A mark can survive while its meaning becomes uncertain. That is a useful challenge for anyone designing symbols, instructions, or records for future readers.', 'rosetta-scripts', 'cuneiform-wedges'),
  'rosetta-scripts': insight('The same message in different forms can provide clues that one version alone cannot. Compare representations when a difficult idea or unfamiliar code will not make sense.', 'braille-cell', 'gobekli-symbols'),
  'stonehenge-transport': insight('Choosing a material also means considering how to move it. An engineering plan has to connect the finished object with the journey needed to build it.', 'gobekli-builders', 'middle-ear-bones'),
  'antikythera-gears': insight('A physical mechanism can stand in for a repeating pattern. It is a bridge between observing the world, building a model, and making a prediction.', 'moon-rotation', 'babbage-loom'),
  'venus-rotation': insight('A familiar word such as “day” can describe different measurements. Clear definitions are part of solving a problem, not just vocabulary added afterward.', 'moon-rotation', 'sun-photosphere'),
  'venus-heat': insight('One variable rarely tells the whole story. Comparing Venus and Mercury is an invitation to ask which other conditions belong in your explanation.', 'art-environment', 'water-four-degrees'),
  'sunlight-travel': insight('A signal arriving now can describe an earlier event. Thinking about travel time helps you distinguish when something happened from when you learned about it.', 'bat-echoes', 'hearing-signals'),
  'moon-rotation': insight('Two motions can combine into a result that looks like no motion at all. Changing your viewpoint or making a physical model can uncover the difference.', 'venus-rotation', 'antikythera-gears'),
  'sun-photosphere': insight('What looks like a boundary need not be solid ground. Questioning everyday labels can help you build a more accurate model of an unfamiliar system.', 'saturn-surface', 'art-infrared'),
  'octopus-hearts': insight('One system can divide work among several specialized parts. Sketching those roles is a useful way to think about pumps, routes, and the needs they serve.', 'middle-ear-bones', 'coral-partnership'),
  'octopus-taste': insight('Sensing can happen where an object is being handled. This invites an engineering question: what could a tool do better if it sensed more at its point of contact?', 'bat-echoes', 'hearing-signals'),
  'octopus-colors': insight('A changing surface invites us to imagine materials that respond to their surroundings. Start a design by asking what the material would sense and how it would respond.', 'art-pigments', 'roman-concrete'),
  'bee-dance': insight('Communication does not have to use spoken words. A successful signal depends on a shared way to encode and interpret the information.', 'braille-music', 'rosetta-scripts'),
  'mobius-strip': insight('A small construction change can transform a whole object. Making and tracing a paper model lets you test a geometric idea directly.', 'euler-shapes', 'regular-tilings'),
  'infinite-primes': insight('Checking many examples is different from proving a rule. Euclid’s argument invites you to reason about every possible finite list, rather than only the ones you can write down.', 'pigeonhole-months', 'euler-shapes'),
  'jacquard-patterns': insight('Instructions can be separated from the machine that follows them. That distinction is a useful starting point for understanding programmable systems.', 'babbage-loom', 'braille-cell'),
  'babbage-loom': insight('An idea can travel between fields. Looking at how another craft handles instructions may suggest a new approach to your own design problem.', 'jacquard-patterns', 'web-scientists'),
  'roman-concrete': insight('Durability can involve responding to damage as well as resisting it. This offers a different question to ask when designing something meant to last.', 'coral-builders', 'art-environment'),
  'first-transistor': insight('A small component can become a building block for much larger systems. Following the steps from a device to a computer helps make complex technology less mysterious.', 'babbage-loom', 'web-scientists'),
  'hearing-signals': insight('Information can change form along its journey. Tracing those changes, from movement to electrical signals, is a useful way to understand a sensing system.', 'middle-ear-bones', 'bat-echoes'),
  'middle-ear-bones': insight('Tiny mechanical parts can perform a carefully defined job. Following the relay helps connect ideas about motion, amplification, and how a system’s parts work together.', 'cochlea-fluid', 'antikythera-gears'),
  'cochlea-fluid': insight('Motion can travel through a fluid as well as through a solid part. Comparing the two invites you to think about different ways to transfer a signal.', 'hearing-pitch', 'hydrometer'),
  'hearing-pitch': insight('Position can help represent information. Thinking about this arrangement offers a way to connect a physical structure with the signals it distinguishes.', 'cochlea-fluid', 'braille-music'),
  'braille-cell': insight('A small set of positions can support many combinations. It connects accessible design with the mathematical idea of encoding information using a few simple states.', 'jacquard-patterns', 'braille-contractions'),
  'braille-music': insight('Accessibility includes creative expression as well as ordinary text. Designing a notation means asking what a reader needs to know, and how they can perceive it.', 'hearing-pitch', 'bee-dance'),
  'braille-contractions': insight('Compact codes trade space for shared rules. When shortening a message, ask whether the reader has enough context to recover what you mean.', 'braille-cell', 'clay-accounts'),
  'braille-night-writing': insight('A new audience can lead to a different design. Adapting an existing idea starts with understanding the needs of the people who will actually use it.', 'braille-music', 'babbage-loom'),
  'web-scientists': insight('A focused communication problem can be the starting point for a broadly useful invention. Begin a design by understanding the people and task in front of you.', 'web-open', 'braille-night-writing'),
  'web-editor': insight('The choice between letting someone only read and also create is a design decision. It changes the role you invite a person to take in a tool.', 'first-website', 'drawing-memory'),
  'first-website': insight('A new tool needs an explanation of how to use it. Good introductions connect an unfamiliar idea with a concrete first action.', 'web-editor', 'rosetta-scripts'),
  'web-open': insight('How people are allowed to use and build on a tool is part of its design story. Technical invention and access can be considered together.', 'web-scientists', 'babbage-loom'),
  'ice-floats': insight('Something as familiar as an ice cube invites a deeper explanation. Connecting structure, mass, and volume can turn an everyday observation into a scientific model.', 'water-four-degrees', 'saturn-density'),
  'water-four-degrees': insight('A trend need not continue in the same direction. This is a useful reminder to check measurements rather than assume a simple rule holds everywhere.', 'ice-floats', 'venus-heat'),
  'salt-density': insight('Changing a liquid’s composition changes the conditions for floating. It invites you to distinguish the object’s properties from the properties of its surroundings.', 'hydrometer', 'saturn-density'),
  'hydrometer': insight('An instrument turns a physical response into something you can read. Designing a scale means connecting an observation with a measurement.', 'salt-density', 'antikythera-gears'),
  'coral-animal': insight('Appearance alone can be a misleading guide to classification. Asking how an organism lives can be more useful than asking whether it looks like a familiar animal.', 'coral-builders', 'coral-partnership'),
  'coral-builders': insight('Small contributions can accumulate into a large structure over time. A reef invites you to distinguish the living builders from what they leave behind.', 'roman-concrete', 'gobekli-builders'),
  'coral-partnership': insight('A system can depend on relationships between its parts. Thinking about what each partner provides offers another way to understand cooperation and vulnerability.', 'coral-bleaching', 'octopus-hearts'),
  'coral-bleaching': insight('A warning sign is different from a final outcome. Making that distinction helps you ask better questions when observing a changing living system.', 'coral-partnership', 'art-environment'),
  'saturn-density': insight('An average describes the whole without describing every part. Ask what is being averaged before drawing conclusions about an object’s interior.', 'ice-floats', 'salt-density'),
  'saturn-rings': insight('Many moving pieces can look like one continuous structure. Changing the scale of your view can change the explanation that makes sense.', 'saturn-hexagon', 'regular-tilings'),
  'saturn-hexagon': insight('A geometric pattern need not have a solid frame. This invites you to look for motion and interaction when explaining a shape in nature.', 'regular-tilings', 'saturn-rings'),
  'saturn-surface': insight('An operation such as “landing” depends on the environment. Defining the destination is part of defining the engineering problem.', 'sun-photosphere', 'saturn-density'),
  'cuneiform-wedges': insight('Tools and materials can shape how information is recorded. When designing a notation or interface, consider the physical actions needed to make it.', 'braille-cell', 'gobekli-symbols'),
  'clay-classroom': insight('Practice work can reveal the process of learning, not just its polished result. Your own drafts and corrections can be useful things to revisit.', 'retrieval-practice', 'art-infrared'),
  'clay-accounts': insight('An ordinary record can outlive the task it served. Clear context matters when you want someone else to understand information later.', 'cuneiform-wedges', 'first-website'),
  'bat-echoes': insight('A returning signal can tell you about something you cannot see directly. It invites an engineering question about timing, interpretation, and sensing at a distance.', 'sunlight-travel', 'octopus-taste'),
  'art-infrared': insight('Looking in a different way can reveal part of the planning process. A finished object may contain evidence that ordinary viewing leaves hidden.', 'art-xrays', 'drawing-memory'),
  'art-xrays': insight('Different methods can reveal different evidence about the same object. Choose an investigation tool by the question you want to answer.', 'art-infrared', 'art-pigments'),
  'art-pigments': insight('Understanding an artwork can involve materials and their order, as well as the visible image. It is a meeting point between art, chemistry, and careful observation.', 'art-xrays', 'octopus-colors'),
  'art-environment': insight('Preserving an object includes thinking about its surroundings. A design brief can balance enjoying something today with keeping it available tomorrow.', 'roman-concrete', 'coral-bleaching'),
  'pi-circles': insight('A ratio can reveal what stays the same while size changes. That is a useful way to compare objects and build a mathematical model.', 'euler-shapes', 'venus-rotation'),
  'euler-shapes': insight('Counting features can uncover a relationship that appearance alone does not show. Try the rule on several solids and pay attention to its stated conditions.', 'mobius-strip', 'infinite-primes'),
  'pigeonhole-months': insight('You can sometimes guarantee a result without knowing the individual details. Counting possibilities can be enough to establish a limit.', 'infinite-primes', 'braille-cell'),
  'regular-tilings': insight('Local rules at a corner determine whether a pattern can continue without gaps. A simple floor design becomes a way to investigate geometry.', 'saturn-hexagon', 'jacquard-patterns'),
  ...Object.fromEntries([...expandedFacts, ...soundsMadeUpFacts, ...everydayWonderFacts, ...hiddenConnectionFacts, ...yourWorldFacts, ...smallThingsFacts, ...worldWonderFacts].map(fact => [fact.id, { why: fact.why, related: fact.related }])),
};

const originalQuestions = [
  'Can a memory test teach you something?', 'Could a break help an idea stick?', 'Can a simple sketch help you remember?', 'Do revision gaps have to keep growing?',
  'Who built monuments before powered machines?', 'What stories can a stone tell?', 'How did one stone help unlock a language?', 'How far would you move a giant stone?', 'Could you predict an eclipse with gears?',
  'Can a planet’s spin last longer than its year?', 'Is the closest planet always the hottest?', 'How old is the sunlight reaching you?', 'Does the Moon actually rotate?', 'Could you stand on the Sun’s surface?',
  'What animal has three working hearts?', 'Could you taste with your arms?', 'What if your skin could change its pattern?', 'Can a dance give directions?',
  'Can a shape have only one side?', 'Is there a largest prime number?', 'What does weaving have to do with code?', 'Could a loom inspire a computer?', 'Can concrete help repair itself?', 'What tiny invention helped change everything?',
];
export function discoveryQuestion(fact: Fact) {
  return fact.question || originalQuestions[facts.indexOf(fact)] || fact.title;
}
export function relatedDiscoveries(id: string): Fact[] {
  return (insights[id]?.related || []).flatMap(relatedId => {
    const fact = facts.find(item => item.id === relatedId && item.id !== id);
    return fact ? [fact] : [];
  });
}
