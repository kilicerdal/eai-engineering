import type {Fact} from './facts';

// V2.3 append-only catalog; see docs/curiosity-v23-source-review.md.
export const thousandSources={
  "mesa": {
    "label": "National Park Service · Cliff Palace",
    "url": "https://www.nps.gov/meve/learn/historyculture/cliff_palace.htm",
    "reviewedOn": "2026-11-14"
  },
  "europa": {
    "label": "NASA Space Place · Europa",
    "url": "https://spaceplace.nasa.gov/europa/en/",
    "reviewedOn": "2026-11-14"
  },
  "chess": {
    "label": "The Metropolitan Museum of Art · The Game of Kings",
    "url": "https://www.metmuseum.org/exhibitions/listings/2011/the-game-of-kings-medieval-ivory-chessmen-from-the-isle-of-lewis",
    "reviewedOn": "2026-11-14"
  },
  "balance": {
    "label": "NIH NIDCD · How the body keeps its balance",
    "url": "https://www.nidcd.nih.gov/health/balance-disorders",
    "reviewedOn": "2026-11-14"
  },
  "clock": {
    "label": "NIST · Fountains of Atoms",
    "url": "https://www.nist.gov/atomic-clocks/how-atomic-clocks-work/fountains-atoms-exquisite-timekeepers",
    "reviewedOn": "2026-11-14"
  },
  "ramac": {
    "label": "Computer History Museum · RAMAC 350",
    "url": "https://www.computerhistory.org/revolution/memory-storage/8/233",
    "reviewedOn": "2026-11-14"
  },
  "saffron": {
    "label": "Royal Horticultural Society · Saffron",
    "url": "https://www.rhs.org.uk/herbs/saffron",
    "reviewedOn": "2026-11-14"
  },
  "estuary": {
    "label": "NOAA Ocean Service · Estuary circulation",
    "url": "https://oceanservice.noaa.gov/education/tutorial_estuaries/est05_circulation.html",
    "reviewedOn": "2026-11-14"
  },
  "okapi": {
    "label": "San Diego Zoo Wildlife Alliance · Okapi",
    "url": "https://animals.sandiegozoo.org/animals/okapi",
    "reviewedOn": "2026-11-14"
  },
  "pendulum": {
    "label": "UW–Madison Physics Museum · Foucault pendulum",
    "url": "https://www.physics.wisc.edu/ingersollmuseum/exhibits/mechanics/foucaultpendulummodel/",
    "reviewedOn": "2026-11-14"
  },
  "code": {
    "label": "U.S. National Archives · Navajo Code Talkers",
    "url": "https://www.archives.gov/education/lessons/code-talkers",
    "reviewedOn": "2026-11-14"
  }
} as const;
type Draft=Fact & {question:string;why:string;sourceKey:keyof typeof thousandSources;related:[string,string]};
const drafts:Omit<Draft,'source'|'url'>[]=[
  {
    "id": "mesa-river-tools",
    "question": "What shaped Cliff Palace’s sandstone before power tools?",
    "title": "River stones became masonry tools.",
    "text": "Ancestral Pueblo builders shaped sandstone blocks using harder stones collected from nearby riverbeds.",
    "explore": "Sketch how hardness could matter when choosing a tool.",
    "why": "A tool need not be a manufactured machine. Matching its material to the task is already an engineering decision.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-ash-mortar",
      "gobekli-builders"
    ]
  },
  {
    "id": "europa-water-budget",
    "question": "Could a moon smaller than ours hold more water than Earth?",
    "title": "A small world may hide a vast water supply.",
    "text": "Europa is slightly smaller than Earth’s Moon, yet scientists estimate it may hold more than twice Earth’s water.",
    "explore": "Draw two worlds with different proportions of water.",
    "why": "Size alone does not tell you what a world contains. Comparing proportions can overturn a first impression.",
    "category": "Space",
    "sourceKey": "europa",
    "related": [
      "europa-salty-below",
      "moon-rotation"
    ]
  },
  {
    "id": "lewis-mixed-sets",
    "question": "Was the Lewis chess hoard just one chess set?",
    "title": "The hoard combines several incomplete sets.",
    "text": "The medieval Lewis Chessmen come from at least four distinct but incomplete chess sets.",
    "explore": "What clues would let you sort mixed pieces into original groups?",
    "why": "Objects found together need not have started together. Sorting a collection can uncover a more complicated history.",
    "category": "Art & ideas",
    "sourceKey": "chess",
    "related": [
      "lewis-shield-biter",
      "rosetta-scripts"
    ]
  },
  {
    "id": "balance-cupula-sail",
    "question": "What tiny structure inside an ear acts rather like a sail?",
    "title": "A gel-like cupula bends with moving fluid.",
    "text": "In each semicircular canal, fluid movement flexes a cupula, bending sensory-cell extensions and triggering signals about head rotation.",
    "explore": "Sketch the chain from fluid movement to a nerve signal.",
    "why": "A sensor can translate motion through several materials before producing information. Following each step makes the mechanism less mysterious.",
    "category": "Human body",
    "sourceKey": "balance",
    "related": [
      "balance-two-pouches",
      "balance-team"
    ]
  },
  {
    "id": "clock-laser-cooling",
    "question": "Can laser light cool atoms instead of heating them?",
    "title": "Carefully arranged light can slow an atomic cloud.",
    "text": "In a cesium fountain clock, laser beams from six directions slow atoms and cool them close to absolute zero.",
    "explore": "Why might slower motion help someone measure a tiny effect?",
    "why": "An interaction’s effect depends on its arrangement. A familiar tool can do something surprising when its direction and timing are controlled.",
    "category": "Patterns & invention",
    "sourceKey": "clock",
    "related": [
      "clock-atomic-toss",
      "atomic-resonance"
    ]
  },
  {
    "id": "ramac-stack-size",
    "question": "How wide were the disks in the first disk drive?",
    "title": "Its stack used fifty two-foot-wide disks.",
    "text": "The RAMAC 350 held 50 disks, each 24 inches in diameter, rotating at 1,200 revolutions per minute.",
    "explore": "Compare that physical scale with storage you carry today.",
    "why": "Miniaturization becomes more meaningful when its starting scale is visible. Capacity and physical size tell different parts of the story.",
    "category": "Computing & AI",
    "sourceKey": "ramac",
    "related": [
      "ramac-card-equivalent",
      "apollo-rope"
    ]
  },
  {
    "id": "saffron-stigmas",
    "question": "Which part of a flower becomes saffron?",
    "title": "The spice is made from flower stigmas.",
    "text": "Saffron threads are dried stigmas of Crocus sativus, not its petals or pollen-bearing stamens.",
    "explore": "Compare the food names with the plant parts they describe.",
    "why": "Knowing which part becomes an ingredient connects a kitchen product with the living structure that produces it.",
    "category": "Food & Drink",
    "sourceKey": "saffron",
    "related": [
      "saffron-flower-gram",
      "vanilla-orchid"
    ]
  },
  {
    "id": "estuary-floating-river",
    "question": "Can river water float above seawater in an estuary?",
    "title": "Different densities can keep the waters layered.",
    "text": "Less-dense freshwater often rides above seawater rather than mixing immediately; a salt wedge can occupy the bottom.",
    "explore": "Draw two layers and mark where mixing would occur.",
    "why": "Meeting does not guarantee mixing. Density and flow can organize a body of water into layers that are hard to see from above.",
    "category": "Earth & Weather",
    "sourceKey": "estuary",
    "related": [
      "estuary-fjord-sill",
      "salt-density"
    ]
  },
  {
    "id": "okapi-giraffe-family",
    "question": "Is a striped okapi a closer relative of a zebra or a giraffe?",
    "title": "Its nearest living relatives are giraffes.",
    "text": "Despite zebra-like leg stripes, the okapi belongs to the giraffe family.",
    "explore": "What features besides coat pattern could reveal a relationship?",
    "why": "A striking resemblance can distract from deeper relationships. Classification asks for more evidence than a familiar surface pattern.",
    "category": "Nature",
    "sourceKey": "okapi",
    "related": [
      "okapi-reaching-tongue",
      "okapi-footprints"
    ]
  },
  {
    "id": "foucault-moving-floor",
    "question": "Can a swinging weight reveal that the floor is turning?",
    "title": "A Foucault pendulum makes Earth’s rotation visible.",
    "text": "Its swing plane appears to turn relative to the ground as Earth rotates; the rate depends on latitude.",
    "explore": "Compare a moving object from two different reference frames.",
    "why": "Motion depends on the reference you choose. A familiar-looking swing can expose a movement that is normally difficult to notice.",
    "category": "Everyday science",
    "sourceKey": "pendulum",
    "related": [
      "foucault-north-pole",
      "moon-rotation"
    ]
  },
  {
    "id": "navajo-code-layer",
    "question": "Was the Navajo military code simply ordinary conversation?",
    "title": "Its vocabulary added a specialized code layer.",
    "text": "Navajo recruits and communications personnel developed military meanings for words; the initial code contained 211 terms.",
    "explore": "Distinguish knowing a language from knowing a code built with it.",
    "why": "A communication system can have several layers. Recognizing those layers gives proper credit to the people who designed and learned it.",
    "category": "Language",
    "sourceKey": "code",
    "related": [
      "navajo-spelling-fallback",
      "braille-cell"
    ]
  },
  {
    "id": "mesa-ash-mortar",
    "question": "What unexpected ingredient joined soil and water in ancient mortar?",
    "title": "Ash helped make the mortar.",
    "text": "Cliff Palace’s masonry mortar mixed local soil, water, and ash.",
    "explore": "Compare the roles of a building block and the material between blocks.",
    "why": "A wall is a system of materials. Paying attention to the joints can reveal as much as studying the largest pieces.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-chinking",
      "gobekli-builders"
    ]
  },
  {
    "id": "europa-salty-below",
    "question": "Could rock-hard surface ice conceal a liquid ocean?",
    "title": "The frozen exterior may hide salty water.",
    "text": "NASA’s Galileo mission found strong evidence for a large, salty ocean beneath Europa’s icy crust.",
    "explore": "Separate the observed evidence from the proposed interior in a sketch.",
    "why": "An inaccessible interior can still leave measurable clues. Scientific models connect those clues while retaining uncertainty.",
    "category": "Space",
    "sourceKey": "europa",
    "related": [
      "europa-flex-heat",
      "moon-rotation"
    ]
  },
  {
    "id": "lewis-shield-biter",
    "question": "Which medieval chess piece bites its own shield?",
    "title": "A rook can look like a fierce foot soldier.",
    "text": "Among the Lewis Chessmen, a warder representing a rook bites the top of his shield.",
    "explore": "Design a game piece whose pose tells you its role.",
    "why": "A miniature object can carry a character as well as a function. Visual design helps give abstract rules a memorable form.",
    "category": "Art & ideas",
    "sourceKey": "chess",
    "related": [
      "lewis-norway-clues",
      "rosetta-scripts"
    ]
  },
  {
    "id": "balance-two-pouches",
    "question": "Which two inner-ear pouches help sense tilting and straight-line motion?",
    "title": "The utricle and saccule detect another kind of movement.",
    "text": "These otolith organs help report head position relative to gravity and movements such as up-and-down or side-to-side travel.",
    "explore": "Compare turning your head with moving it without turning.",
    "why": "Different motions need different measurements. Dividing sensing tasks helps explain why one organ system has several distinct parts.",
    "category": "Human body",
    "sourceKey": "balance",
    "related": [
      "balance-steady-gaze",
      "balance-team"
    ]
  },
  {
    "id": "clock-atomic-toss",
    "question": "What rises and falls inside an atomic fountain clock?",
    "title": "A cloud of atoms is gently tossed upward.",
    "text": "Laser pulses launch cooled cesium atoms roughly a meter upward before gravity brings them back down.",
    "explore": "Draw the journey through the clock’s measurement region.",
    "why": "An instrument can use a controlled journey to create a measurement opportunity. Geometry and timing are part of precision.",
    "category": "Patterns & invention",
    "sourceKey": "clock",
    "related": [
      "clock-two-pulses",
      "atomic-resonance"
    ]
  },
  {
    "id": "ramac-card-equivalent",
    "question": "How many punched cards could RAMAC’s disk storage replace?",
    "title": "One drive held the equivalent of 62,500 cards.",
    "text": "RAMAC 350 stored five million characters, about 3.75 MB, according to the Computer History Museum.",
    "explore": "Imagine searching a roomful of cards for one record.",
    "why": "Storage changes the practical work of handling information. A compact record is useful partly because of what it replaces.",
    "category": "Computing & AI",
    "sourceKey": "ramac",
    "related": [
      "ramac-random-access",
      "apollo-rope"
    ]
  },
  {
    "id": "saffron-flower-gram",
    "question": "How many flowers can supply one gram of saffron?",
    "title": "A little spice represents many flowers.",
    "text": "The Royal Horticultural Society estimates about 150 saffron flowers are needed for one gram of dried spice.",
    "explore": "Picture how much handwork can sit inside a small jar.",
    "why": "Weight can conceal the work behind a product. Tracing an ingredient back to its source changes the scale of comparison.",
    "category": "Food & Drink",
    "sourceKey": "saffron",
    "related": [
      "saffron-no-seeds",
      "vanilla-orchid"
    ]
  },
  {
    "id": "estuary-fjord-sill",
    "question": "How can an underwater threshold limit a fjord’s circulation?",
    "title": "A shallow sill can restrict deep-water exchange.",
    "text": "Glaciers can leave a deep fjord channel with a shallow sill near its ocean entrance, limiting circulation and mixing.",
    "explore": "Compare a deep basin with and without a low doorway.",
    "why": "A small part of a landscape can govern a much larger system. The entrance is sometimes as important as the basin.",
    "category": "Earth & Weather",
    "sourceKey": "estuary",
    "related": [
      "estuary-no-salt",
      "salt-density"
    ]
  },
  {
    "id": "okapi-reaching-tongue",
    "question": "Could an okapi reach its own ear with its tongue?",
    "title": "Its tongue can reach its eyes and ears.",
    "text": "The okapi’s long, prehensile tongue also helps strip buds and leaves from rainforest plants.",
    "explore": "Imagine how reach and grip could share one flexible tool.",
    "why": "One structure can serve several tasks. Looking at reach, flexibility, and control helps explain more than shape alone.",
    "category": "Nature",
    "sourceKey": "okapi",
    "related": [
      "okapi-separate-ears",
      "okapi-footprints"
    ]
  },
  {
    "id": "foucault-north-pole",
    "question": "Where would a Foucault pendulum’s apparent turn be fastest?",
    "title": "At a pole, the ground turns beneath its swing plane.",
    "text": "At the North Pole, an ideal Foucault pendulum’s swing plane makes an apparent full turn relative to the ground in about a day.",
    "explore": "Picture a swing above a rotating polar platform.",
    "why": "Special cases can make a difficult mechanism easier to picture. A simple limiting example is a useful first model.",
    "category": "Everyday science",
    "sourceKey": "pendulum",
    "related": [
      "foucault-equator",
      "moon-rotation"
    ]
  },
  {
    "id": "navajo-spelling-fallback",
    "question": "What happened when a message needed a word outside the codebook?",
    "title": "Code talkers could spell it with an encoded alphabet.",
    "text": "The Navajo code included terms representing English letters, allowing words outside its vocabulary to be spelled out.",
    "explore": "Design a fallback for a code with a limited vocabulary.",
    "why": "A useful system needs a way to handle cases its first design did not anticipate. A fallback extends coverage without replacing everything.",
    "category": "Language",
    "sourceKey": "code",
    "related": [
      "navajo-alternatives",
      "braille-cell"
    ]
  },
  {
    "id": "mesa-chinking",
    "question": "Could tiny stones strengthen a monumental wall?",
    "title": "Small stones filled the gaps.",
    "text": "Builders inserted small chinking stones into mortar to fill gaps and add stability to Cliff Palace’s walls.",
    "explore": "Draw a wall with differently sized pieces filling its joints.",
    "why": "Large structures can depend on small details. It is worth looking at the spaces between the obvious components.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-plaster-colors",
      "gobekli-builders"
    ]
  },
  {
    "id": "europa-flex-heat",
    "question": "What can warm an ocean far from the Sun?",
    "title": "Gravitational flexing supplies internal heat.",
    "text": "Jupiter’s pull stretches Europa as it orbits. This tidal flexing generates heat that helps keep water beneath the ice liquid.",
    "explore": "Compare warming from outside with warming generated inside.",
    "why": "Energy can reach a system through motion as well as light. Asking where the energy comes from opens new explanations.",
    "category": "Space",
    "sourceKey": "europa",
    "related": [
      "europa-orbit-neighbors",
      "moon-rotation"
    ]
  },
  {
    "id": "lewis-norway-clues",
    "question": "Why do scholars connect Scottish chess finds with Norway?",
    "title": "Style and workshops offer clues to an origin.",
    "text": "The Lewis Chessmen are generally thought to have been made in Norway; sculpture and ivory-workshop evidence point toward Trondheim.",
    "explore": "List the kinds of evidence that could identify a maker’s region.",
    "why": "Where an object is found and where it was made are different questions. Combining independent clues strengthens an interpretation.",
    "category": "Art & ideas",
    "sourceKey": "chess",
    "related": [
      "lewis-elephant-bishop",
      "rosetta-scripts"
    ]
  },
  {
    "id": "balance-steady-gaze",
    "question": "Why doesn’t the world become a blur whenever you move your head?",
    "title": "Balance sensing also helps stabilize what you see.",
    "text": "The vestibular system works with other sensory systems to maintain visual focus while the body changes position.",
    "explore": "Imagine a camera that compensates while its support moves.",
    "why": "Keeping a view steady is an active coordination problem. Movement sensing and vision become more useful when they work together.",
    "category": "Human body",
    "sourceKey": "balance",
    "related": [
      "balance-cupula-sail",
      "balance-team"
    ]
  },
  {
    "id": "clock-two-pulses",
    "question": "Why does a fountain clock question its atoms twice?",
    "title": "Two microwave interactions reveal a frequency mismatch.",
    "text": "Atoms meet microwaves while rising and again while falling. Their final energy states help tune the microwave frequency.",
    "explore": "Compare checking a process once with comparing two separated checks.",
    "why": "A comparison can reveal a difference that one observation cannot. Measurement often depends on a carefully designed sequence.",
    "category": "Patterns & invention",
    "sourceKey": "clock",
    "related": [
      "clock-long-pause",
      "atomic-resonance"
    ]
  },
  {
    "id": "ramac-random-access",
    "question": "Did random access mean choosing data at random?",
    "title": "It meant reaching records without reading everything before them.",
    "text": "RAMAC pioneered magnetic-disk access to records in any order, rather than requiring a sequential pass through earlier records.",
    "explore": "Compare opening a book at a page with unrolling a long scroll.",
    "why": "A technology’s name can hide its useful distinction. Access order matters as well as storage capacity.",
    "category": "Computing & AI",
    "sourceKey": "ramac",
    "related": [
      "ramac-teacher-inventor",
      "apollo-rope"
    ]
  },
  {
    "id": "saffron-no-seeds",
    "question": "How does a crop continue when its flowers produce no seed?",
    "title": "Cultivated saffron grows new cormlets.",
    "text": "Crocus sativus flowers are sterile; its original underground corm is replaced by several cormlets.",
    "explore": "Contrast seed reproduction with multiplying a plant’s underground structures.",
    "why": "There is more than one route to another generation of plants. Reproduction is not always a seed-to-seed cycle.",
    "category": "Food & Drink",
    "sourceKey": "saffron",
    "related": [
      "saffron-corm-stem",
      "vanilla-orchid"
    ]
  },
  {
    "id": "estuary-no-salt",
    "question": "Can an estuary contain no seawater at all?",
    "title": "Great Lakes estuaries mix river water with lake water.",
    "text": "Freshwater estuaries combine chemically distinct river and lake waters without needing a salty sea.",
    "explore": "Which features of an estuary remain when salt is absent?",
    "why": "Definitions can be broader than the most familiar example. Checking a category’s boundaries helps expose useful exceptions.",
    "category": "Earth & Weather",
    "sourceKey": "estuary",
    "related": [
      "estuary-isohalines",
      "salt-density"
    ]
  },
  {
    "id": "okapi-separate-ears",
    "question": "Can an okapi listen in two directions at once?",
    "title": "Its ears rotate independently.",
    "text": "An okapi can turn its large ears separately to listen ahead and behind.",
    "explore": "Sketch two independently aimed sensors on one machine.",
    "why": "Sensing coverage depends on how sensors move as well as where they sit. Independent control can widen the field of attention.",
    "category": "Nature",
    "sourceKey": "okapi",
    "related": [
      "okapi-hidden-calls",
      "okapi-footprints"
    ]
  },
  {
    "id": "foucault-equator",
    "question": "Where does a Foucault pendulum have no latitude-driven precession?",
    "title": "At the equator, that apparent rotation disappears.",
    "text": "An ideal Foucault pendulum has no Earth-rotation-induced turning of its swing plane relative to the ground at the equator.",
    "explore": "What changes between a pole and the equator?",
    "why": "A mechanism’s effect can vanish under particular conditions. Understanding the exception helps define the rule more accurately.",
    "category": "Everyday science",
    "sourceKey": "pendulum",
    "related": [
      "foucault-madison",
      "moon-rotation"
    ]
  },
  {
    "id": "navajo-alternatives",
    "question": "Why give one letter more than one code word?",
    "title": "Alternatives reduced repeated patterns.",
    "text": "The Navajo code’s alphabet expanded from 26 to 44 terms by adding alternatives for frequently used letters.",
    "explore": "Why might repeated symbols help someone analyze a message?",
    "why": "Repetition carries information even when words are hidden. A design can respond to patterns as well as to individual messages.",
    "category": "Language",
    "sourceKey": "code",
    "related": [
      "navajo-code-layer",
      "braille-cell"
    ]
  },
  {
    "id": "mesa-plaster-colors",
    "question": "Were Cliff Palace’s walls always bare stone?",
    "title": "The walls once carried earthen colors.",
    "text": "Many walls had pink, brown, red, yellow, or white earthen plaster; those surfaces were among the first features to erode.",
    "explore": "Imagine how lost surface finishes change a building’s appearance.",
    "why": "What survives is not always what people originally saw. Reconstructing a design requires accounting for the vulnerable layers.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-room-count",
      "gobekli-builders"
    ]
  },
  {
    "id": "europa-orbit-neighbors",
    "question": "Can neighboring moons help shape another moon’s orbit?",
    "title": "Europa’s orbit has more than one gravitational influence.",
    "text": "Io and Ganymede also tug on Europa, helping maintain an orbit that is not perfectly circular.",
    "explore": "Sketch several bodies influencing one moving object.",
    "why": "An orbit belongs to a larger system. Interactions can matter even when one central object supplies the strongest pull.",
    "category": "Space",
    "sourceKey": "europa",
    "related": [
      "europa-erased-craters",
      "moon-rotation"
    ]
  },
  {
    "id": "lewis-elephant-bishop",
    "question": "Could a chess elephant become a bishop?",
    "title": "A game piece changed with its cultural setting.",
    "text": "As chess spread from India toward Europe, the elephant piece became a bishop in medieval European chess.",
    "explore": "Reimagine a familiar game for a different culture or era.",
    "why": "Ideas can travel while their symbols change. Adaptation can preserve a role while giving it a locally meaningful form.",
    "category": "Art & ideas",
    "sourceKey": "chess",
    "related": [
      "lewis-red-pieces",
      "rosetta-scripts"
    ]
  },
  {
    "id": "clock-long-pause",
    "question": "Why can a slow atomic flight improve a very fast measurement?",
    "title": "A longer interval improves sensitivity to frequency differences.",
    "text": "The roughly one-second gap between microwave interactions in a fountain clock exceeds the millisecond gaps of beam clocks.",
    "explore": "Think about comparing two rhythms over a short or long interval.",
    "why": "Precision sometimes comes from waiting longer. A longer observation can make a small mismatch easier to distinguish.",
    "category": "Patterns & invention",
    "sourceKey": "clock",
    "related": [
      "clock-sodium-first",
      "atomic-resonance"
    ]
  },
  {
    "id": "ramac-teacher-inventor",
    "question": "What classroom invention helped lead a teacher toward disk drives?",
    "title": "Rey Johnson built a machine that sensed pencil marks.",
    "text": "IBM hired the former science teacher after acquiring rights to his test-scoring machine; he later led the RAMAC team.",
    "explore": "Trace how a skill from one job might transfer to another.",
    "why": "Engineering careers can connect seemingly distant problems. Recognizing transferable ideas can matter more than following one narrow route.",
    "category": "Computing & AI",
    "sourceKey": "ramac",
    "related": [
      "ramac-unbuilt-inspiration",
      "apollo-rope"
    ]
  },
  {
    "id": "saffron-corm-stem",
    "question": "Is a saffron corm an underground root?",
    "title": "A corm is a swollen stem structure.",
    "text": "The bulb-like corm that supports saffron is a swollen underground stem or stem base, usually covered by papery skin.",
    "explore": "What evidence could distinguish a storage stem from a root?",
    "why": "Location alone does not identify a plant organ. Similar-looking storage structures can have different biological origins.",
    "category": "Food & Drink",
    "sourceKey": "saffron",
    "related": [
      "saffron-autumn-cycle",
      "vanilla-orchid"
    ]
  },
  {
    "id": "estuary-isohalines",
    "question": "What would a contour map of salt show?",
    "title": "Isohalines connect equal salinity measurements.",
    "text": "Scientists measure estuary salinity at different depths and positions, then map equal-salinity contours to reveal circulation patterns.",
    "explore": "Design a map of a quantity other than elevation.",
    "why": "A map can represent an invisible property. Turning measurements into a pattern helps reveal structure that a photograph misses.",
    "category": "Earth & Weather",
    "sourceKey": "estuary",
    "related": [
      "estuary-geology-flow",
      "salt-density"
    ]
  },
  {
    "id": "okapi-hidden-calls",
    "question": "Can an okapi make calls people cannot hear?",
    "title": "Researchers recorded infrasonic okapi calls.",
    "text": "San Diego Zoo researchers identified vocalizations below human hearing while analyzing recordings with specialized software.",
    "explore": "What signals might an instrument reveal that a person misses?",
    "why": "An observer’s senses set limits on what seems to exist. Instruments can uncover communication that would otherwise go unnoticed.",
    "category": "Nature",
    "sourceKey": "okapi",
    "related": [
      "okapi-giraffe-family",
      "okapi-footprints"
    ]
  },
  {
    "id": "foucault-madison",
    "question": "Could a pendulum take longer than a day to complete its apparent turn?",
    "title": "Mid-latitude precession takes more than a day.",
    "text": "The UW–Madison museum gives about 35 hours and eight minutes for a full apparent turn at Madison’s latitude.",
    "explore": "Compare a day’s duration with a local precession period.",
    "why": "Different repeating processes need not share a period. A local observation can encode information about location.",
    "category": "Everyday science",
    "sourceKey": "pendulum",
    "related": [
      "foucault-clockwise",
      "moon-rotation"
    ]
  },
  {
    "id": "mesa-room-count",
    "question": "How many rooms fitted into Cliff Palace?",
    "title": "An alcove held a surprisingly large settlement.",
    "text": "The National Park Service identifies 150 rooms and 23 kivas at Cliff Palace, with an estimated population of about 100.",
    "explore": "What activities besides sleeping might need their own spaces?",
    "why": "A room count is not a population count. Interpreting a structure means asking how different spaces were actually used.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-river-tools",
      "gobekli-builders"
    ]
  },
  {
    "id": "europa-erased-craters",
    "question": "Why might Europa have fewer craters than expected?",
    "title": "A changing crust may erase old marks.",
    "text": "Europa has relatively few impact craters. Breaking and refreezing ice may remove older scars, though the details remain under investigation.",
    "explore": "What could a smooth surface tell you besides its age?",
    "why": "An absence can be evidence, but it needs interpretation. Several processes can produce a surface with few surviving marks.",
    "category": "Space",
    "sourceKey": "europa",
    "related": [
      "europa-water-budget",
      "moon-rotation"
    ]
  },
  {
    "id": "lewis-red-pieces",
    "question": "Were medieval chess opponents always black and white?",
    "title": "An early account describes red-stained Lewis pieces.",
    "text": "Although the surviving Lewis Chessmen now look white, an early report recorded red staining on some pieces.",
    "explore": "How many ways could two sides be distinguished without black and white?",
    "why": "Present-day conventions are not timeless requirements. Historical alternatives can loosen assumptions about how something must look.",
    "category": "Art & ideas",
    "sourceKey": "chess",
    "related": [
      "lewis-mixed-sets",
      "rosetta-scripts"
    ]
  },
  {
    "id": "clock-sodium-first",
    "question": "Did the earliest laser-cooled atomic fountains use cesium?",
    "title": "Early laser-cooled fountains used sodium atoms.",
    "text": "By the end of the 1980s, researchers had built the first laser-cooled atomic fountain using sodium, before today’s common cesium and rubidium designs.",
    "explore": "Why might a prototype use a different material from a later instrument?",
    "why": "A successful design can migrate between materials. The history of a device includes experiments that differ from its familiar modern form.",
    "category": "Patterns & invention",
    "sourceKey": "clock",
    "related": [
      "clock-laser-cooling",
      "atomic-resonance"
    ]
  },
  {
    "id": "ramac-unbuilt-inspiration",
    "question": "Can an unbuilt invention help inspire a successful one?",
    "title": "A patented disk concept helped lay the groundwork.",
    "text": "The RAMAC team drew inspiration from Jacob Rabinow’s 1952 disk-drive concept, which he patented but did not produce.",
    "explore": "What makes an unfinished design useful to a later team?",
    "why": "An idea’s influence is not limited to finished products. Documented experiments can become starting points for someone else’s work.",
    "category": "Computing & AI",
    "sourceKey": "ramac",
    "related": [
      "ramac-stack-size",
      "apollo-rope"
    ]
  },
  {
    "id": "saffron-autumn-cycle",
    "question": "Does saffron flower in the same season as every crocus?",
    "title": "Saffron’s flowers arrive in autumn.",
    "text": "Crocus sativus is autumn-flowering. In the RHS growing cycle, foliage persists through winter before dying back in late spring.",
    "explore": "Draw a plant calendar that begins with autumn flowers.",
    "why": "Seasonal patterns are more varied than a single spring-to-summer story. A calendar can reveal a plant’s distinctive rhythm.",
    "category": "Food & Drink",
    "sourceKey": "saffron",
    "related": [
      "saffron-stigmas",
      "vanilla-orchid"
    ]
  },
  {
    "id": "estuary-geology-flow",
    "question": "Could the same inlet be a fjord in one classification but not another?",
    "title": "Shape and circulation classify different features.",
    "text": "Puget Sound is a geological fjord, yet NOAA describes its circulation as slightly stratified rather than fjord-type.",
    "explore": "Name two ways to classify one familiar object.",
    "why": "A label answers a particular question. Two classifications can differ without either being wrong when they describe different properties.",
    "category": "Earth & Weather",
    "sourceKey": "estuary",
    "related": [
      "estuary-floating-river",
      "salt-density"
    ]
  },
  {
    "id": "foucault-clockwise",
    "question": "Which way would the swing plane appear to turn at the North Pole?",
    "title": "It appears to turn clockwise there.",
    "text": "Viewed from above the North Pole, Earth turns counterclockwise, so the pendulum’s relative turning appears clockwise.",
    "explore": "Use a drawing to keep observer and rotation direction distinct.",
    "why": "Directions can reverse when the frame of reference changes. Stating the viewpoint is part of making a clear explanation.",
    "category": "Everyday science",
    "sourceKey": "pendulum",
    "related": [
      "foucault-moving-floor",
      "moon-rotation"
    ]
  }
];
export const thousandFacts=drafts.map(draft=>({...draft,collection:'a-thousand-reasons' as const,source:thousandSources[draft.sourceKey].label,url:thousandSources[draft.sourceKey].url}));
