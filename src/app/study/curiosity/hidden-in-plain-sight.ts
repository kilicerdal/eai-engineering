import type {Fact} from './facts';

// V2.1 append-only discoveries. See docs/curiosity-v21-source-review.md.
export const plainSightSources = {
  "elevators": {
    "label": "Otis · High-rise elevator safety systems",
    "url": "https://www.otis.com/en/us/tools-resources/high-rise-safety-systems/",
    "reviewedOn": "2026-11-14"
  },
  "beck": {
    "label": "London Museum · Harry Beck’s Tube map",
    "url": "https://www.londonmuseum.org.uk/collections/london-stories/harry-beck-revolutionised-tube-map/",
    "reviewedOn": "2026-11-14"
  },
  "belt": {
    "label": "Volvo Cars · Three-point safety belt history",
    "url": "https://www.volvocars.com/intl/media/press-releases/B9D7CD66A06448F7/",
    "reviewedOn": "2026-11-14"
  },
  "recorders": {
    "label": "NTSB · Cockpit voice and flight data recorders",
    "url": "https://www.ntsb.gov/news/Pages/CVR_FDR.aspx",
    "reviewedOn": "2026-11-14"
  },
  "suspension": {
    "label": "Golden Gate Bridge District · Suspension cable tension and tower height",
    "url": "https://www.goldengate.org/exhibits/suspension-cable-tension-vs-tower-height/",
    "reviewedOn": "2026-11-14"
  },
  "forth": {
    "label": "UNESCO World Heritage Centre · The Forth Bridge",
    "url": "https://whc.unesco.org/en/list/1485/",
    "reviewedOn": "2026-11-14"
  },
  "bearings": {
    "label": "NSK · Bearing basics",
    "url": "https://www.nsk.com/tools-resources/abc-bearings/bearing-basics/",
    "reviewedOn": "2026-11-14"
  },
  "retro": {
    "label": "3M · What is retroreflectivity?",
    "url": "https://www.3m.com/3M/en_US/road-safety-us/resources/road-transportation-safety-center-blog/full-story/~road-signs-retroreflectivity/?storyid=328c8880-941b-4adc-a9f9-46a1cd79e637",
    "reviewedOn": "2026-11-14"
  },
  "plywood": {
    "label": "APA · Plywood",
    "url": "https://www.apawood.org/engineered-wood-products/plywood-osb/plywood/",
    "reviewedOn": "2026-11-14"
  },
  "corrugated": {
    "label": "Fibre Box Association · What is corrugated?",
    "url": "https://www.fibrebox.org/what-is-corrugated",
    "reviewedOn": "2026-11-14"
  },
  "paper": {
    "label": "Library of Congress · Deterioration and preservation of paper",
    "url": "https://wwws.loc.gov/preservation/care/deterioratebrochure.html",
    "reviewedOn": "2026-11-14"
  },
  "rubber": {
    "label": "Science Museum Group · A Peruvian rubber ball",
    "url": "https://blog.sciencemuseum.org.uk/wonderful-things-peruvian-rubber-ball/",
    "reviewedOn": "2026-11-14"
  },
  "water": {
    "label": "US EPA · Finished water storage facilities",
    "url": "https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1014PEY.txt",
    "reviewedOn": "2026-11-14"
  },
  "pump": {
    "label": "KSB · Volute casing pumps",
    "url": "https://www.ksb.com/en-global/centrifugal-pump-lexicon/article/volute-casing-pump-1117514",
    "reviewedOn": "2026-11-14"
  },
  "memory": {
    "label": "IEEE Technology Navigator · Memory",
    "url": "https://technav.ieee.org/topic/memory/",
    "reviewedOn": "2026-11-14"
  },
  "crow": {
    "label": "Cornell, Marzluff & Pecoraro · Social learning in American crows",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3234554/",
    "reviewedOn": "2026-11-14"
  },
  "peregrine": {
    "label": "Cornell Lab of Ornithology · Peregrine falcon life history",
    "url": "https://www.allaboutbirds.org/guide/peregrine_falcon/lifehistory",
    "reviewedOn": "2026-11-14"
  },
  "opossum": {
    "label": "San Diego Zoo Wildlife Alliance · Opossum",
    "url": "https://animals.sandiegozoo.org/animals/opossum",
    "reviewedOn": "2026-11-14"
  },
  "raccoon": {
    "label": "San Diego Zoo Wildlife Alliance · Raccoon",
    "url": "https://animals.sandiegozoo.org/animals/raccoon",
    "reviewedOn": "2026-11-14"
  },
  "rhizobia": {
    "label": "University of Minnesota Extension · Legume characteristics",
    "url": "https://extension.umn.edu/agriculture/crop-production/forages/legume-life-cycles-and-characteristics",
    "reviewedOn": "2026-11-14"
  },
  "sand": {
    "label": "US National Park Service · Sand colors",
    "url": "https://www.nps.gov/articles/coastal-sediments-sand-colors.htm",
    "reviewedOn": "2026-11-14"
  },
  "samaras": {
    "label": "Lentink and colleagues · Aerodynamics of autorotating seeds",
    "url": "https://authors.library.caltech.edu/records/aa4ac-0vp85",
    "reviewedOn": "2026-11-14"
  },
  "vision": {
    "label": "Exploratorium · Color afterimages",
    "url": "https://annex.exploratorium.edu/colorfest/trythis.html",
    "reviewedOn": "2026-11-14"
  },
  "wrinkles": {
    "label": "Kareklas, Nettle & Smulders · Water-induced finger wrinkles",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3639753/",
    "reviewedOn": "2026-11-14"
  },
  "maillard": {
    "label": "American Chemical Society · Control of Maillard reactions",
    "url": "https://pubs.acs.org/doi/10.1021/acs.jafc.7b00882",
    "reviewedOn": "2026-11-14"
  },
  "priming": {
    "label": "KSB · Priming",
    "url": "https://www.ksb.com/en-global/centrifugal-pump-lexicon/article/priming-1118660",
    "reviewedOn": "2026-11-14"
  },
  "cavitation": {
    "label": "KSB · Cavitation",
    "url": "https://www.ksb.com/en-global/centrifugal-pump-lexicon/article/cavitation-1117364",
    "reviewedOn": "2026-11-14"
  }
} as const;
type Draft = Omit<Fact,'source'|'url'|'collection'> & {sourceKey:keyof typeof plainSightSources;why:string;related:[string,string]};
const drafts:Draft[] = [
  {
    "id": "otis-slack-rope",
    "question": "Could a loose rope trigger an early elevator’s brake?",
    "title": "Otis’s safety brake used the loss of rope tension as its trigger.",
    "text": "A spring engaged notches in supporting rails when the hoisting rope went slack.",
    "explore": "Draw a mechanism whose emergency action starts when a pulling force disappears.",
    "why": "A failure signal need not be an extra electrical message. The physical loss of tension can itself release a protective mechanism.",
    "category": "Inventions",
    "sourceKey": "elevators",
    "related": [
      "elevator-power-brake",
      "web-scientists"
    ]
  },
  {
    "id": "beck-not-geography",
    "question": "Why isn’t a Tube diagram a faithful picture of London’s tunnels?",
    "title": "Beck deliberately distorted the network’s geography.",
    "text": "Straightened routes made connections easier to follow in a compact diagram.",
    "explore": "Compare a diagram optimized for changing trains with a street map for walking.",
    "why": "Useful accuracy depends on the task. A drawing can preserve connections while simplifying distances and shapes.",
    "category": "Art & ideas",
    "sourceKey": "beck",
    "related": [
      "beck-spare-time",
      "art-infrared"
    ]
  },
  {
    "id": "belt-v-geometry",
    "question": "What simple shape underlies Bohlin’s three-point belt?",
    "title": "Its lap and diagonal sections form a V with a low anchor.",
    "text": "The arrangement places the belt across the pelvis and rib cage.",
    "explore": "Draw the two straps and label the parts they are intended to restrain.",
    "why": "The location of a connection matters as much as the material. Geometry determines how a restraint interacts with the body.",
    "category": "Inventions",
    "sourceKey": "belt",
    "related": [
      "belt-ejection-engineer",
      "web-scientists"
    ]
  },
  {
    "id": "recorder-two-records",
    "question": "Do aircraft’s two familiar recorders keep the same information?",
    "title": "Voice and flight-data recorders preserve different evidence.",
    "text": "One captures cockpit sounds and communications; the other records parameters such as altitude and airspeed.",
    "explore": "Compare a numerical timeline with an audio record of the same event.",
    "why": "Different measurements illuminate different parts of an event. Combining them can reveal relationships neither record shows alone.",
    "category": "Inventions",
    "sourceKey": "recorders",
    "related": [
      "recorder-tail",
      "web-scientists"
    ]
  },
  {
    "id": "bridge-tower-tradeoff",
    "question": "Could taller bridge towers reduce the pull on the main cables?",
    "title": "Greater tower height can reduce cable tension in a suspension design.",
    "text": "The Golden Gate exhibit presents this as a tradeoff with the difficulty and cost of taller towers.",
    "explore": "Compare two sketches with the same span but different cable sag.",
    "why": "A structural choice changes the forces elsewhere. Design often balances several consequences rather than maximizing one dimension.",
    "category": "Patterns & invention",
    "sourceKey": "suspension",
    "related": [
      "bridge-stronger-cable",
      "mobius-strip"
    ]
  },
  {
    "id": "forth-cantilever",
    "question": "What supports the Forth Bridge’s suspended middle sections?",
    "title": "Giant cantilever arms project from its towers.",
    "text": "Shorter suspended spans connect the ends of neighboring arms.",
    "explore": "Sketch a balanced projecting arm before adding the connecting span.",
    "why": "A long crossing can be assembled from parts with different structural roles. The visible rhythm is also a map of how loads are supported.",
    "category": "Inventions",
    "sourceKey": "forth",
    "related": [
      "forth-hollow-tubes",
      "web-scientists"
    ]
  },
  {
    "id": "bearing-cage",
    "question": "What keeps the balls inside many bearings from bunching together?",
    "title": "A cage maintains spacing between the rolling elements.",
    "text": "It reduces unwanted contact and helps the elements move smoothly.",
    "explore": "Draw a ring of balls with and without a spacing guide.",
    "why": "A small supporting component can make the whole mechanism behave differently. The guide matters even though it is not the part doing the rolling.",
    "category": "Patterns & invention",
    "sourceKey": "bearings",
    "related": [
      "bearing-rolling",
      "mobius-strip"
    ]
  },
  {
    "id": "retro-source",
    "question": "Why can a road sign seem bright from inside a car at night?",
    "title": "Retroreflective material returns light toward its source.",
    "text": "A driver sits near the headlights sending light to the sign.",
    "explore": "Draw the outgoing and returning light paths from a car.",
    "why": "Visibility depends on a relationship between source, surface, and observer. Brightness is not simply a property of the sign alone.",
    "category": "Everyday science",
    "sourceKey": "retro",
    "related": [
      "retro-glass-beads",
      "ice-floats"
    ]
  },
  {
    "id": "plywood-cross-grain",
    "question": "Why do plywood layers point their grain in different directions?",
    "title": "Cross-laminated veneers distribute stiffness in both panel directions.",
    "text": "The thin wood layers are bonded under heat and pressure.",
    "explore": "Rotate alternating layers in a cross-section sketch.",
    "why": "A material’s internal arrangement can overcome a limitation of its ingredients. The layers matter even when the finished surface looks uniform.",
    "category": "Everyday science",
    "sourceKey": "plywood",
    "related": [
      "plywood-swelling",
      "ice-floats"
    ]
  },
  {
    "id": "cardboard-flutes",
    "question": "What are the waves inside a shipping box called?",
    "title": "Corrugated board contains a fluted medium between flat liners.",
    "text": "The repeating arches give the lightweight board its internal structure.",
    "explore": "Sketch a cut edge with flat faces and a wavy center.",
    "why": "An ordinary package hides a designed cross section. Looking at the edge reveals information its flat face conceals.",
    "category": "Everyday science",
    "sourceKey": "corrugated",
    "related": [
      "cardboard-spacing",
      "ice-floats"
    ]
  },
  {
    "id": "paper-cellulose",
    "question": "What molecular chain helps make a book page possible?",
    "title": "Paper’s cellulose consists of repeating glucose units.",
    "text": "Its plant-derived fibers provide strength and flexibility.",
    "explore": "Follow a structure from molecular chain to fiber to sheet.",
    "why": "The history in a book depends on a material structure. The page is a scientific object as well as a carrier of words.",
    "category": "Art & ideas",
    "sourceKey": "paper",
    "related": [
      "paper-acid-chain",
      "art-infrared"
    ]
  },
  {
    "id": "rubber-name",
    "question": "What everyday action gave rubber its English name?",
    "title": "Its ability to rub away pencil marks inspired the name.",
    "text": "The Science Museum attributes the naming to Joseph Priestley.",
    "explore": "Connect a material’s name with one of its early observed uses.",
    "why": "Names can preserve a practical encounter with a substance. A familiar word can become a small doorway into the history of materials.",
    "category": "Inventions",
    "sourceKey": "rubber",
    "related": [
      "rubber-raincoat",
      "web-scientists"
    ]
  },
  {
    "id": "water-stored-clean",
    "question": "What kind of water is kept in a finished-water storage facility?",
    "title": "It stores water that has already been treated.",
    "text": "Storage belongs to the distribution system as well as the water supply.",
    "explore": "Draw treatment, storage, and delivery as separate stages.",
    "why": "A hidden step can sit between making a resource ready and delivering it. Following the sequence helps make infrastructure visible.",
    "category": "Everyday science",
    "sourceKey": "water",
    "related": [
      "water-demand-buffer",
      "ice-floats"
    ]
  },
  {
    "id": "pump-spiral-case",
    "question": "Why do many pump casings resemble a spiral?",
    "title": "A volute-shaped casing surrounds the centrifugal pump’s impeller.",
    "text": "The outer form is characteristic enough to name the pump type.",
    "explore": "Compare a machine’s external housing with the moving component inside it.",
    "why": "A casing is more than packaging. Its form belongs to the machine’s working arrangement.",
    "category": "Patterns & invention",
    "sourceKey": "pump",
    "related": [
      "pump-two-stages",
      "mobius-strip"
    ]
  },
  {
    "id": "dram-refresh",
    "question": "Why does a computer refresh memory even when nothing seems to change?",
    "title": "DRAM needs periodic refresh to preserve stored information.",
    "text": "Its stored electrical state does not simply persist indefinitely.",
    "explore": "Compare keeping a record with repeatedly maintaining that record.",
    "why": "An unchanged result may require ongoing work. Stability at the interface can conceal repeated activity underneath.",
    "category": "Computing & AI",
    "sourceKey": "memory",
    "related": [
      "sram-no-refresh",
      "lovelace-bernoulli"
    ]
  },
  {
    "id": "crow-mask-face",
    "question": "Can wild crows distinguish a face associated with a bad experience?",
    "title": "American crows learned to scold a mask worn during capture.",
    "text": "Researchers compared responses to dangerous and neutral masks.",
    "explore": "Compare a response to one face with a response to every person.",
    "why": "A controlled comparison separates recognition from a general alarm. The surprising claim becomes stronger when we ask what the birds did not react to.",
    "category": "Nature",
    "sourceKey": "crow",
    "related": [
      "crow-neighbor-learning",
      "octopus-hearts"
    ]
  },
  {
    "id": "peregrine-city-cliff",
    "question": "Why might a falcon nest on a city building?",
    "title": "Peregrines use tall buildings and bridges as cliff-like nest sites.",
    "text": "Human structures can supply ledges resembling natural nesting places.",
    "explore": "Compare a rocky cliff face with the ledges of a tall structure.",
    "why": "An animal can respond to structural features rather than our category of natural or built. The useful habitat feature is the ledge.",
    "category": "Nature",
    "sourceKey": "peregrine",
    "related": [
      "peregrine-scrape",
      "octopus-hearts"
    ]
  },
  {
    "id": "opossum-dead-reflex",
    "question": "Does playing dead mean an opossum has consciously chosen to act?",
    "title": "The familiar response is involuntary.",
    "text": "The animal can become motionless under extreme threat.",
    "explore": "Separate the appearance of a behavior from the mechanism producing it.",
    "why": "A human-sounding phrase can imply an intention that is not established. Looking at the mechanism gives a more careful account.",
    "category": "Nature",
    "sourceKey": "opossum",
    "related": [
      "opossum-tail-grip",
      "octopus-hearts"
    ]
  },
  {
    "id": "raccoon-paw-tools",
    "question": "What makes a raccoon’s front paws so useful around obstacles?",
    "title": "Its dexterous paws can manipulate objects and open simple locks.",
    "text": "The zoo describes fingers capable of delicate handling.",
    "explore": "Compare grasping an object with changing the position of its moving parts.",
    "why": "Manipulation expands the problems an animal can solve. Access depends on movement and contact, not simply strength.",
    "category": "Nature",
    "sourceKey": "raccoon",
    "related": [
      "raccoon-wet-fur",
      "octopus-hearts"
    ]
  },
  {
    "id": "legume-nitrogen-partner",
    "question": "Do legumes obtain atmospheric nitrogen entirely by themselves?",
    "title": "Rhizobia bacteria supply the nitrogen-fixing partnership.",
    "text": "The association takes place in nodules on the roots.",
    "explore": "Draw the plant and its microbial partners as one interacting system.",
    "why": "A plant’s abilities may depend on other organisms. Looking below ground changes the unit we are trying to understand.",
    "category": "Nature",
    "sourceKey": "rhizobia",
    "related": [
      "legume-root-hairs",
      "octopus-hearts"
    ]
  },
  {
    "id": "sand-green-mineral",
    "question": "What mineral can give a beach green sand?",
    "title": "Olivine grains can produce a green beach.",
    "text": "The color reflects the material making up the sediment.",
    "explore": "Compare a beach’s color with the minerals in its grains.",
    "why": "A landscape’s appearance can reveal its ingredients. Looking closely turns a familiar surface into a clue about local geology.",
    "category": "Earth & Weather",
    "sourceKey": "sand",
    "related": [
      "sand-black-magnetite",
      "cloud-visible"
    ]
  },
  {
    "id": "maple-autorotation",
    "question": "Can a falling seed sustain a spinning flight without a motor?",
    "title": "Maple seeds autorotate as they descend.",
    "text": "Their rotating motion helps generate lift.",
    "explore": "Compare powered rotation with rotation sustained during a fall.",
    "why": "A falling object can interact with air in a structured way. Descent need not be a simple drop along the shortest path.",
    "category": "Nature",
    "sourceKey": "samaras",
    "related": [
      "maple-hidden-vortex",
      "octopus-hearts"
    ]
  },
  {
    "id": "afterimage-without-object",
    "question": "Can a colored image remain after the colored object is gone?",
    "title": "An afterimage can persist after its stimulus disappears.",
    "text": "The lingering perception is not a new colored object on the surface.",
    "explore": "Distinguish the stimulus, the viewing system, and the resulting perception.",
    "why": "Seeing is an active response with a history. What is present now does not entirely determine what we perceive.",
    "category": "Human body",
    "sourceKey": "vision",
    "related": [
      "afterimage-red-cyan",
      "hearing-signals"
    ]
  },
  {
    "id": "wrinkles-active",
    "question": "Are water-induced fingertip wrinkles just passive swelling?",
    "title": "They involve an active response under autonomic nervous control.",
    "text": "The 2013 research distinguishes the process from simple water absorption.",
    "explore": "Compare a passive material change with a response controlled by the body.",
    "why": "An ordinary sensation can hide a less obvious mechanism. Similar appearances do not prove that two processes have the same cause.",
    "category": "Human body",
    "sourceKey": "wrinkles",
    "related": [
      "wrinkles-wet-handling",
      "hearing-signals"
    ]
  },
  {
    "id": "maillard-partners",
    "question": "What two ingredient families meet in Maillard browning?",
    "title": "Reducing sugars react with amino groups in food.",
    "text": "Those groups can come from amino acids, peptides, or proteins.",
    "explore": "Draw a reaction with two different kinds of starting partner.",
    "why": "A kitchen transformation can depend on a relationship among ingredients. Looking at the partners explains more than looking only at the heat.",
    "category": "Food & Drink",
    "sourceKey": "maillard",
    "related": [
      "maillard-not-caramel",
      "banana-herb"
    ]
  },
  {
    "id": "elevator-power-brake",
    "question": "What can happen to an elevator brake when the power goes out?",
    "title": "Springs apply the machine brake when electrical release is lost.",
    "text": "Otis describes electrically lifted brake shoes that press into place without power.",
    "explore": "Compare power needed to release a mechanism with power needed to engage it.",
    "why": "A design can choose its resting state carefully. Asking what a device does without energy reveals an important part of its engineering.",
    "category": "Inventions",
    "sourceKey": "elevators",
    "related": [
      "elevator-governor",
      "web-editor"
    ]
  },
  {
    "id": "beck-spare-time",
    "question": "Was the celebrated Tube diagram originally a spare-time project?",
    "title": "Harry Beck developed his redesign outside his regular work.",
    "text": "London Underground adopted the radical design after initial hesitation.",
    "explore": "Trace a design from private experiment through public use.",
    "why": "An influential interface can begin as a small proposal. Adoption and invention are separate stages, each requiring people to see a practical benefit.",
    "category": "Art & ideas",
    "sourceKey": "beck",
    "related": [
      "beck-pocket-problem",
      "art-xrays"
    ]
  },
  {
    "id": "belt-ejection-engineer",
    "question": "What did Volvo’s belt designer work on before cars?",
    "title": "Nils Bohlin had worked on aircraft ejection seats at Saab.",
    "text": "He joined Volvo in 1958, bringing experience from another kind of restraint problem.",
    "explore": "Compare the constraints of a cockpit with those of a family car.",
    "why": "Expertise can travel between industries while the solution changes. A useful transfer starts by recognizing both a shared problem and different users.",
    "category": "Inventions",
    "sourceKey": "belt",
    "related": [
      "belt-shared-patent",
      "web-editor"
    ]
  },
  {
    "id": "recorder-tail",
    "question": "Why are flight recorders often placed near an aircraft’s tail?",
    "title": "Their location is chosen for crash survivability.",
    "text": "The NTSB describes the tail section as the usual installation area.",
    "explore": "Separate where data is produced from where its protected copy is stored.",
    "why": "Storage location is part of preserving information. The best place to record an event need not be beside the people or instruments creating it.",
    "category": "Inventions",
    "sourceKey": "recorders",
    "related": [
      "recorder-pinger",
      "web-editor"
    ]
  },
  {
    "id": "bridge-stronger-cable",
    "question": "Why might a suspension bridge need a thicker main cable?",
    "title": "Higher tension requires greater cable strength.",
    "text": "The bridge district’s exhibit connects the required cable size with the pulling force.",
    "explore": "Distinguish a cable’s visible curve from the force carried inside it.",
    "why": "An elegant outline hides a load path. Thinking about force helps explain dimensions that otherwise appear to be purely visual choices.",
    "category": "Patterns & invention",
    "sourceKey": "suspension",
    "related": [
      "bridge-two-curves",
      "infinite-primes"
    ]
  },
  {
    "id": "forth-hollow-tubes",
    "question": "Are the Forth Bridge’s biggest structural tubes solid metal?",
    "title": "Its major compression members are hollow steel tubes.",
    "text": "Their large cross sections help carry compressive loads without being solid bars.",
    "explore": "Compare a tube with a solid rod in a cross-section drawing.",
    "why": "Shape can put material where it is useful. A large external dimension need not mean every part of the inside is filled.",
    "category": "Inventions",
    "sourceKey": "forth",
    "related": [
      "forth-tension-members",
      "web-editor"
    ]
  },
  {
    "id": "bearing-rolling",
    "question": "How can a hidden ring make a shaft easier to turn?",
    "title": "Rolling elements replace much of the sliding contact.",
    "text": "NSK describes generally lower friction for rolling bearings than plain bearings.",
    "explore": "Compare a sliding contact with a row of rolling contacts.",
    "why": "Changing the type of contact can change the resistance to motion. A mechanism’s surface relationships matter as much as its overall shape.",
    "category": "Patterns & invention",
    "sourceKey": "bearings",
    "related": [
      "bearing-load-direction",
      "infinite-primes"
    ]
  },
  {
    "id": "retro-glass-beads",
    "question": "Can tiny glass beads help make a road sign readable?",
    "title": "Beads bend incoming light toward a reflecting layer behind them.",
    "text": "The returning light bends again on its way back out.",
    "explore": "Follow one light ray into a bead and back toward its starting point.",
    "why": "A familiar material can perform a precise optical task at a small scale. The arrangement makes the effect useful.",
    "category": "Everyday science",
    "sourceKey": "retro",
    "related": [
      "retro-cube-corners",
      "water-four-degrees"
    ]
  },
  {
    "id": "plywood-swelling",
    "question": "Can changing wood’s arrangement make its dimensions more stable?",
    "title": "Cross-lamination reduces shrinkage and swelling compared with solid wood.",
    "text": "Neighboring grain directions help stabilize the panel.",
    "explore": "Compare one oriented piece with a layered arrangement of orientations.",
    "why": "A composite can behave differently from a single piece of its raw material. Organization is itself an engineering choice.",
    "category": "Everyday science",
    "sourceKey": "plywood",
    "related": [
      "plywood-face-grade",
      "water-four-degrees"
    ]
  },
  {
    "id": "cardboard-spacing",
    "question": "How does a thin box wall gain bending rigidity?",
    "title": "The flutes hold the flat liners apart.",
    "text": "That separation contributes stiffness without filling the space with solid material.",
    "explore": "Compare two touching sheets with two sheets held apart by a light core.",
    "why": "Spacing can do structural work. It is one way to gain stiffness while keeping a component light.",
    "category": "Everyday science",
    "sourceKey": "corrugated",
    "related": [
      "cardboard-cushion",
      "water-four-degrees"
    ]
  },
  {
    "id": "paper-acid-chain",
    "question": "How can paper deterioration help feed its own continuation?",
    "title": "Acid hydrolysis cuts cellulose chains and produces more acids.",
    "text": "Moisture participates in the process that weakens the fibers.",
    "explore": "Draw a process whose products can encourage another round of the same process.",
    "why": "Feedback is not confined to electronics. A material can change in ways that promote further change.",
    "category": "Art & ideas",
    "sourceKey": "paper",
    "related": [
      "paper-older-stronger",
      "art-xrays"
    ]
  },
  {
    "id": "rubber-raincoat",
    "question": "Why were early rubberized raincoats less pleasant than they sound?",
    "title": "Warm conditions could make the rubber sticky and smelly.",
    "text": "Early Mackintosh coats illustrate a material working poorly under changing conditions.",
    "explore": "Compare performance in cool rain with performance on a warm day.",
    "why": "A material must work across its expected environment. Solving one problem can reveal another property that needs improvement.",
    "category": "Inventions",
    "sourceKey": "rubber",
    "related": [
      "rubber-sulfur",
      "web-editor"
    ]
  },
  {
    "id": "water-demand-buffer",
    "question": "Why store drinking water if pumps are already supplying it?",
    "title": "Storage helps balance pressure during high demand.",
    "text": "A reserve can support the distribution system when many users draw water.",
    "explore": "Compare a steady supply with a demand that rises and falls.",
    "why": "Supply and demand need not peak together. A buffer connects processes that run on different schedules.",
    "category": "Everyday science",
    "sourceKey": "water",
    "related": [
      "water-emergency-reserve",
      "water-four-degrees"
    ]
  },
  {
    "id": "pump-two-stages",
    "question": "Must a volute casing pump contain just one pumping stage?",
    "title": "Some designs incorporate two stages.",
    "text": "KSB describes a usually single-stage type with multi-stage variations.",
    "explore": "Draw one working stage, then consider what repeating it changes.",
    "why": "A familiar machine family can contain important internal variations. The shared outline does not guarantee identical construction.",
    "category": "Patterns & invention",
    "sourceKey": "pump",
    "related": [
      "pump-orientation",
      "infinite-primes"
    ]
  },
  {
    "id": "sram-no-refresh",
    "question": "What does static mean in static random-access memory?",
    "title": "SRAM does not need DRAM-style periodic refresh.",
    "text": "It still requires power to retain its ordinary stored state.",
    "explore": "Distinguish no refresh from no power on a two-column comparison.",
    "why": "Technical labels describe particular properties. A name such as static should not be stretched into a claim about permanent storage.",
    "category": "Computing & AI",
    "sourceKey": "memory",
    "related": [
      "cache-memory-choice",
      "computer-moth"
    ]
  },
  {
    "id": "crow-neighbor-learning",
    "question": "Must a crow be captured to learn which face signals danger?",
    "title": "Previously uncaptured birds also learned the dangerous mask.",
    "text": "Their later responses were consistent with learning from other crows.",
    "explore": "Separate a direct experience from information gained by watching others.",
    "why": "Knowledge can spread without every individual paying the original cost. Social information is part of how animals navigate shared surroundings.",
    "category": "Nature",
    "sourceKey": "crow",
    "related": [
      "crow-young-learning",
      "octopus-taste"
    ]
  },
  {
    "id": "peregrine-scrape",
    "question": "Does a peregrine build a nest from sticks?",
    "title": "Its nest is usually a scrape in loose material on a ledge.",
    "text": "A shallow depression can serve in place of a constructed bowl.",
    "explore": "Compare adding material with reshaping material already present.",
    "why": "Building is not the only way to prepare a place. A small change to an existing surface can fulfill the task.",
    "category": "Nature",
    "sourceKey": "peregrine",
    "related": [
      "peregrine-site-choice",
      "octopus-taste"
    ]
  },
  {
    "id": "opossum-tail-grip",
    "question": "Does an opossum normally sleep hanging by its tail?",
    "title": "Its prehensile tail is a gripping aid, not a usual sleeping hook.",
    "text": "The tail can help hold branches for short periods.",
    "explore": "Compare a temporary support with a permanent resting arrangement.",
    "why": "An ability does not imply unlimited use. The way a body part is used matters as much as what it can briefly do.",
    "category": "Nature",
    "sourceKey": "opossum",
    "related": [
      "opossum-pouch-young",
      "octopus-taste"
    ]
  },
  {
    "id": "raccoon-wet-fur",
    "question": "Does being a capable swimmer mean a raccoon has waterproof fur?",
    "title": "Raccoons swim well, but their fur is not waterproof.",
    "text": "An activity and a particular protective adaptation need not come together.",
    "explore": "Separate a movement ability from a coat property.",
    "why": "A capability can exist without the feature we expect to explain it. The distinction helps prevent plausible but unsupported assumptions.",
    "category": "Nature",
    "sourceKey": "raccoon",
    "related": [
      "raccoon-name-hands",
      "octopus-taste"
    ]
  },
  {
    "id": "legume-root-hairs",
    "question": "Where can the plant–bacterium partnership begin?",
    "title": "Rhizobia enter through root hairs as nodules develop.",
    "text": "The specialized root structures house the association.",
    "explore": "Follow a surface encounter into a new structure inside the root.",
    "why": "A large biological effect can begin at a tiny contact point. The path into a system is part of how the relationship works.",
    "category": "Nature",
    "sourceKey": "rhizobia",
    "related": [
      "legume-pink-nodules",
      "octopus-taste"
    ]
  },
  {
    "id": "sand-black-magnetite",
    "question": "Can dark beach sand contain a naturally magnetic mineral?",
    "title": "Black magnetite is one contributor to dark sands.",
    "text": "Different source materials produce different sand colors.",
    "explore": "Separate the word sand from any assumption about one particular substance.",
    "why": "Sand describes a kind of sediment, not one universal ingredient. Its composition can vary dramatically from place to place.",
    "category": "Earth & Weather",
    "sourceKey": "sand",
    "related": [
      "sand-shell-origin",
      "cloud-mass"
    ]
  },
  {
    "id": "maple-hidden-vortex",
    "question": "What invisible structure helps a spinning maple seed stay aloft?",
    "title": "A stable leading-edge vortex contributes to its lift.",
    "text": "Researchers verified the swirling flow on real seeds as well as models.",
    "explore": "Draw the flow around a wing, not only the wing’s outline.",
    "why": "The working system includes the surrounding air. A solid shape alone does not tell the whole flight story.",
    "category": "Nature",
    "sourceKey": "samaras",
    "related": [
      "maple-scaled-models",
      "octopus-taste"
    ]
  },
  {
    "id": "afterimage-red-cyan",
    "question": "Why can looking away from red leave a cyan afterimage?",
    "title": "Adaptation changes the balance of color responses.",
    "text": "A white surface can then appear in a complementary color.",
    "explore": "Compare a constant surface with a changing response to it.",
    "why": "A change in perception need not mean the outside world changed. The viewing system itself is part of the explanation.",
    "category": "Human body",
    "sourceKey": "vision",
    "related": [
      "pump-priming",
      "middle-ear-bones"
    ]
  },
  {
    "id": "wrinkles-wet-handling",
    "question": "Could wrinkled fingers help with a wet handling task?",
    "title": "Participants moved submerged objects faster with wrinkled fingers.",
    "text": "This was a result of a controlled 2013 experiment, not a universal performance promise.",
    "explore": "Compare one defined task under two fingertip conditions.",
    "why": "A familiar feature becomes a testable question when the task and comparison are specified. The limits of the test belong with the result.",
    "category": "Human body",
    "sourceKey": "wrinkles",
    "related": [
      "wrinkles-dry-control",
      "middle-ear-bones"
    ]
  },
  {
    "id": "maillard-not-caramel",
    "question": "Is all nonenzymatic browning the same chemical process?",
    "title": "Maillard reactions and caramelization overlap in some products but differ in reactants.",
    "text": "Maillard chemistry involves amino groups as well as sugars.",
    "explore": "Separate two processes that can produce a similar visible color.",
    "why": "The same appearance can have more than one route. A shared outcome should not erase the differences in how it was produced.",
    "category": "Food & Drink",
    "sourceKey": "maillard",
    "related": [
      "maillard-ph",
      "banana-berry"
    ]
  },
  {
    "id": "elevator-governor",
    "question": "What hidden device watches an elevator’s speed?",
    "title": "An overspeed governor can trigger the car’s rail-gripping safeties.",
    "text": "In Otis’s description, spinning flyweights move outward as speed increases.",
    "explore": "Sketch a rotating part that converts speed into a change of position.",
    "why": "Motion can be measured mechanically. This is a small example of feedback existing inside hardware, before a number appears on a screen.",
    "category": "Inventions",
    "sourceKey": "elevators",
    "related": [
      "elevator-buffer",
      "first-website"
    ]
  },
  {
    "id": "beck-pocket-problem",
    "question": "What everyday object helped create a problem for early Tube maps?",
    "title": "A growing network had to fit into a pocket-sized map.",
    "text": "True-scale routes became increasingly awkward to present clearly, especially in the center.",
    "explore": "Try fitting a growing set of connections onto one small rectangle.",
    "why": "A display’s size is a real design constraint. Simplification becomes meaningful when we understand the space and purpose it must serve.",
    "category": "Art & ideas",
    "sourceKey": "beck",
    "related": [
      "beck-shared-brand",
      "art-pigments"
    ]
  },
  {
    "id": "belt-shared-patent",
    "question": "Did Volvo keep its three-point belt design exclusive?",
    "title": "Volvo made Bohlin’s patented design available to other carmakers.",
    "text": "Its history describes sharing the invention rather than reserving its use to Volvo cars.",
    "explore": "Consider how access to an invention can influence adoption.",
    "why": "An invention’s reach depends partly on who can use it. The decisions around a design can matter alongside its mechanical details.",
    "category": "Inventions",
    "sourceKey": "belt",
    "related": [
      "belt-1959-models",
      "first-website"
    ]
  },
  {
    "id": "recorder-pinger",
    "question": "Can a submerged flight recorder announce its location with sound?",
    "title": "An underwater locator beacon activates when immersed.",
    "text": "Its acoustic signal helps searchers using a suitable receiver.",
    "explore": "Sketch a search method for a place where ordinary radio and visibility are limited.",
    "why": "A recovery system has to match its environment. Sound provides a way to look for an object that cannot simply be seen.",
    "category": "Inventions",
    "sourceKey": "recorders",
    "related": [
      "recorder-engine-noise",
      "first-website"
    ]
  },
  {
    "id": "bridge-two-curves",
    "question": "Must every part of a bridge cable use the same mathematical curve?",
    "title": "Different spans can be modeled with different curves.",
    "text": "The Golden Gate resources use a hyperbola for the center span and a parabola for side spans.",
    "explore": "Draw one system with different mathematical models for different sections.",
    "why": "A useful model may be local rather than universal. Choosing an approximation means considering the particular part and conditions being studied.",
    "category": "Patterns & invention",
    "sourceKey": "suspension",
    "related": [
      "bridge-spreadsheet",
      "jacquard-patterns"
    ]
  },
  {
    "id": "forth-tension-members",
    "question": "Do all members of the Forth Bridge have the same kind of job?",
    "title": "Its compression tubes contrast with lighter tension members.",
    "text": "Some parts resist pushing while others carry pulling forces.",
    "explore": "Mark push and pull on different members of a bridge sketch.",
    "why": "A structure works through cooperation among unlike parts. Identifying the kind of force is an early step toward understanding a member’s shape.",
    "category": "Inventions",
    "sourceKey": "forth",
    "related": [
      "forth-mild-steel",
      "first-website"
    ]
  },
  {
    "id": "bearing-load-direction",
    "question": "Can a rotating shaft be pushed along its length as well as sideways?",
    "title": "Bearings can be designed for axial, radial, or combined loads.",
    "text": "The direction of the force helps determine the suitable bearing type.",
    "explore": "Draw one arrow along a shaft and another across it.",
    "why": "Rotation alone does not describe the engineering problem. A part must also accommodate the directions in which its surroundings push and pull.",
    "category": "Patterns & invention",
    "sourceKey": "bearings",
    "related": [
      "bearing-raceways",
      "jacquard-patterns"
    ]
  },
  {
    "id": "retro-cube-corners",
    "question": "What tiny geometry can send a light beam back where it came from?",
    "title": "Cube-corner elements use three angled reflecting surfaces.",
    "text": "Light bounces between those surfaces before returning toward the source.",
    "explore": "Draw three mutually perpendicular faces inside a corner.",
    "why": "A path can be controlled through geometry rather than a powered device. Multiple simple reflections produce a useful combined effect.",
    "category": "Everyday science",
    "sourceKey": "retro",
    "related": [
      "retro-observer-angle",
      "salt-density"
    ]
  },
  {
    "id": "plywood-face-grade",
    "question": "Does a smooth plywood face alone tell you its structural capacity?",
    "title": "Appearance grades and structural performance describe different properties.",
    "text": "APA distinguishes veneer appearance from ratings used for structural applications.",
    "explore": "List what a visible surface can reveal and what requires a separate rating.",
    "why": "A pleasing finish is not a complete specification. Different labels answer different questions about the same object.",
    "category": "Everyday science",
    "sourceKey": "plywood",
    "related": [
      "plywood-glue-decay",
      "salt-density"
    ]
  },
  {
    "id": "cardboard-cushion",
    "question": "Can a box wall help cushion the things inside it?",
    "title": "Its flutes can yield under pressure and absorb impacts.",
    "text": "The same internal structure contributes protection as well as stiffness.",
    "explore": "Distinguish resisting a load from absorbing a brief impact.",
    "why": "A package has more than one job. An internal form can balance everyday support with the ability to soften a sudden disturbance.",
    "category": "Everyday science",
    "sourceKey": "corrugated",
    "related": [
      "cardboard-double-wall",
      "salt-density"
    ]
  },
  {
    "id": "paper-older-stronger",
    "question": "Can an older document outlast a much newer one?",
    "title": "Some rag papers remain stronger than later wood-pulp papers.",
    "text": "Long fibers and manufacturing differences help explain the apparent age reversal.",
    "explore": "Separate calendar age from material composition on a comparison chart.",
    "why": "Age alone is a poor predictor of survival. Understanding how an object was made can explain why an older example remains in better condition.",
    "category": "Art & ideas",
    "sourceKey": "paper",
    "related": [
      "paper-alkaline-reserve",
      "art-pigments"
    ]
  },
  {
    "id": "rubber-sulfur",
    "question": "What ingredient helped transform rubber into a more useful material?",
    "title": "Heating rubber with sulfur became the basis of vulcanization.",
    "text": "The process improved its usefulness across changing temperatures.",
    "explore": "Separate the raw material from a chemically modified version.",
    "why": "An important invention can be a treatment rather than a new shape. Processing changes what an existing material can do.",
    "category": "Inventions",
    "sourceKey": "rubber",
    "related": [
      "rubber-old-ball",
      "first-website"
    ]
  },
  {
    "id": "water-emergency-reserve",
    "question": "Can a water-storage tank have a job beyond everyday demand?",
    "title": "It can serve as an emergency backup supply.",
    "text": "The EPA identifies this as a separate purpose of finished-water storage.",
    "explore": "Give a reservoir an ordinary-use role and a reserve role.",
    "why": "Capacity can be valuable even when it is not used every day. Infrastructure is designed for interruptions as well as routine conditions.",
    "category": "Everyday science",
    "sourceKey": "water",
    "related": [
      "water-tank-inspection",
      "salt-density"
    ]
  },
  {
    "id": "pump-orientation",
    "question": "Can the same general pump type stand upright or lie horizontally?",
    "title": "Volute casing pumps can use vertical or horizontal shafts.",
    "text": "Their bearing arrangements also vary.",
    "explore": "Rotate a mechanism in a drawing and reconsider how it must be supported.",
    "why": "Orientation changes the supporting design even when the central principle stays the same. Installation is part of engineering.",
    "category": "Patterns & invention",
    "sourceKey": "pump",
    "related": [
      "pump-axial-thrust",
      "jacquard-patterns"
    ]
  },
  {
    "id": "cache-memory-choice",
    "question": "Why use one memory type for cache and another for main memory?",
    "title": "SRAM’s speed suits cache, while DRAM offers higher density.",
    "text": "A computer can combine different technologies for different jobs.",
    "explore": "Arrange fast nearby storage beside a larger working space.",
    "why": "An effective system can mix components with different strengths. One material or technology need not be best at every scale.",
    "category": "Computing & AI",
    "sourceKey": "memory",
    "related": [
      "memory-hierarchy",
      "qr-two-dimensions"
    ]
  },
  {
    "id": "crow-young-learning",
    "question": "Can young crows learn a human danger from their parents?",
    "title": "Young birds later scolded a mask their parents had reacted to.",
    "text": "The study tested responses even without the parents present.",
    "explore": "Compare following an immediate alarm with responding independently later.",
    "why": "Learning can outlast the demonstration. Testing an animal separately helps distinguish a retained association from simply joining a group reaction.",
    "category": "Nature",
    "sourceKey": "crow",
    "related": [
      "crow-warning-map",
      "octopus-colors"
    ]
  },
  {
    "id": "peregrine-site-choice",
    "question": "How does a peregrine pair choose a nesting spot?",
    "title": "The male presents sites and the female makes the final choice.",
    "text": "Cornell describes several candidate ledges within a territory.",
    "explore": "Distinguish proposing options from selecting among them.",
    "why": "A familiar outcome can emerge from a sequence of different roles. Observing the process reveals behavior the final nest cannot show.",
    "category": "Nature",
    "sourceKey": "peregrine",
    "related": [
      "peregrine-bats",
      "octopus-colors"
    ]
  },
  {
    "id": "opossum-pouch-young",
    "question": "Where do tiny newborn opossums continue their early development?",
    "title": "They climb to the mother’s pouch and attach to a teat.",
    "text": "The Virginia opossum is a marsupial.",
    "explore": "Draw the stages between birth and independent movement.",
    "why": "Birth does not mark the same developmental stage in every mammal. Comparing life cycles makes a familiar category less uniform.",
    "category": "Nature",
    "sourceKey": "opossum",
    "related": [
      "opossum-swimmer",
      "octopus-colors"
    ]
  },
  {
    "id": "raccoon-name-hands",
    "question": "What do a raccoon’s hands have to do with its name?",
    "title": "The name traces to a Powhatan word associated with scratching hands.",
    "text": "Its English name preserves an observation of its behavior.",
    "explore": "Connect a word’s origin with a visible action.",
    "why": "Language can carry a record of close observation. Etymology offers another way into an animal’s cultural history.",
    "category": "Nature",
    "sourceKey": "raccoon",
    "related": [
      "raccoon-city-menu",
      "octopus-colors"
    ]
  },
  {
    "id": "legume-pink-nodules",
    "question": "Why can an active root nodule look pink inside?",
    "title": "Leghemoglobin gives nitrogen-fixing nodules their pink color.",
    "text": "The pigment indicates regions where nitrogen fixation is active.",
    "explore": "Connect a visible color with an otherwise hidden internal condition.",
    "why": "Color can carry evidence about a process. The significance comes from the mechanism behind it, not simply the appearance.",
    "category": "Nature",
    "sourceKey": "rhizobia",
    "related": [
      "legume-partner-choice",
      "octopus-colors"
    ]
  },
  {
    "id": "sand-shell-origin",
    "question": "Must all beach sand come from broken rock?",
    "title": "Shell and other biological fragments can supply calcium-carbonate sand.",
    "text": "A beach can contain material made by living organisms.",
    "explore": "Follow a grain backward to an organism rather than a mountainside.",
    "why": "Biology contributes to landscapes as well as inhabiting them. The origin of a grain can cross the usual boundary between life and geology.",
    "category": "Earth & Weather",
    "sourceKey": "sand",
    "related": [
      "sand-red-coating",
      "cloud-nuclei"
    ]
  },
  {
    "id": "maple-scaled-models",
    "question": "Did researchers need only tiny cameras to investigate seed flight?",
    "title": "They measured flow around dynamically scaled seed models.",
    "text": "The 2009 study used three-dimensional measurements to investigate maple and hornbeam seeds.",
    "explore": "Compare copying an object’s size with matching the relevant flow behavior.",
    "why": "A larger model can reveal a small process when the physics is matched carefully. Scale is a tool for investigation.",
    "category": "Nature",
    "sourceKey": "samaras",
    "related": [
      "maple-animal-flight",
      "octopus-colors"
    ]
  },
  {
    "id": "pump-priming",
    "question": "Why can some water pumps need water before they start?",
    "title": "A non-self-priming pump needs its suction path primed.",
    "text": "Air must be displaced so the pump and suction line can work with liquid.",
    "explore": "Separate the starting condition of a machine from its normal running condition.",
    "why": "A machine may need a particular initial state before its usual process works. Starting and operating are different engineering questions.",
    "category": "Patterns & invention",
    "sourceKey": "priming",
    "related": [
      "pump-cavitation",
      "jacquard-patterns"
    ]
  },
  {
    "id": "wrinkles-dry-control",
    "question": "Did wrinkled fingers improve every object-handling task in that study?",
    "title": "The same experiment found no improvement for dry objects.",
    "text": "The wet and dry conditions produced different outcomes.",
    "explore": "Ask why a study includes a condition where no benefit is expected.",
    "why": "A comparison without an effect can be informative. It helps identify the conditions under which an explanation may apply.",
    "category": "Human body",
    "sourceKey": "wrinkles",
    "related": [
      "wrinkles-evolution-caution",
      "cochlea-fluid"
    ]
  },
  {
    "id": "maillard-ph",
    "question": "Can acidity affect a browning reaction even without changing the ingredients?",
    "title": "pH changes the rates and pathways of Maillard chemistry.",
    "text": "The ACS review describes different effects on early and later reactions.",
    "explore": "Keep the starting materials fixed while varying one surrounding condition on paper.",
    "why": "A reaction depends on its environment as well as its ingredients. One changed condition can redirect a sequence of transformations.",
    "category": "Food & Drink",
    "sourceKey": "maillard",
    "related": [
      "maillard-many-steps",
      "banana-seeds"
    ]
  },
  {
    "id": "elevator-buffer",
    "question": "What is at the bottom of an elevator shaft besides empty space?",
    "title": "Buffers can absorb energy from a descending car.",
    "text": "They provide another protective layer beyond the normal braking systems.",
    "explore": "Separate stopping a machine in normal use from absorbing energy at its travel limit.",
    "why": "Protection often comes from several different mechanisms. The last layer has a different job from the controller used on an ordinary trip.",
    "category": "Inventions",
    "sourceKey": "elevators",
    "related": [
      "otis-slack-rope",
      "web-open"
    ]
  },
  {
    "id": "beck-shared-brand",
    "question": "Did London’s underground railways always share one map?",
    "title": "Different companies originally published separate maps.",
    "text": "In 1908, multiple lines appeared together under a shared Underground identity.",
    "explore": "Compare knowing one route with seeing how several services connect.",
    "why": "A unified view can make separate systems easier to use. Information design sometimes creates access without changing the underlying transport.",
    "category": "Art & ideas",
    "sourceKey": "beck",
    "related": [
      "beck-not-geography",
      "art-environment"
    ]
  },
  {
    "id": "belt-1959-models",
    "question": "Which 1959 cars helped introduce Bohlin’s belt?",
    "title": "The Volvo Amazon and PV544 received the three-point design.",
    "text": "It was introduced as standard equipment in Nordic markets.",
    "explore": "Separate a prototype, a patent, and a feature fitted to a production car.",
    "why": "Engineering history has several kinds of milestones. A production installation shows an idea moving into everyday use.",
    "category": "Inventions",
    "sourceKey": "belt",
    "related": [
      "belt-v-geometry",
      "web-open"
    ]
  },
  {
    "id": "recorder-engine-noise",
    "question": "Can cockpit background noises become useful measurements?",
    "title": "Investigators can extract clues from clicks, warnings, and engine sounds.",
    "text": "The NTSB describes using these sounds to help establish event timing and operating conditions.",
    "explore": "Imagine a recording in which a background sound marks an important transition.",
    "why": "An incidental trace can become evidence. The value of a record may extend beyond the information someone originally intended to capture.",
    "category": "Inventions",
    "sourceKey": "recorders",
    "related": [
      "recorder-two-records",
      "web-open"
    ]
  },
  {
    "id": "bridge-spreadsheet",
    "question": "Can an ordinary spreadsheet explore suspension-bridge forces?",
    "title": "Changing tower height can recalculate cable shape and tension.",
    "text": "The bridge district provides an educational spreadsheet for this comparison.",
    "explore": "Describe the input, calculation, and plotted output of a simple design model.",
    "why": "A model makes tradeoffs easier to inspect. Even a familiar tool can turn a static diagram into a question about changing conditions.",
    "category": "Patterns & invention",
    "sourceKey": "suspension",
    "related": [
      "bridge-tower-tradeoff",
      "babbage-loom"
    ]
  },
  {
    "id": "forth-mild-steel",
    "question": "What material choice helped distinguish the Forth Bridge?",
    "title": "It was an early major bridge built in mild steel.",
    "text": "UNESCO links the crossing with advances in large-scale structural design and construction.",
    "explore": "Place a material change beside a change in the scale of a structure.",
    "why": "New materials can open possibilities for familiar problems. Their importance emerges through what engineers are able to build with them.",
    "category": "Inventions",
    "sourceKey": "forth",
    "related": [
      "forth-cantilever",
      "web-open"
    ]
  },
  {
    "id": "bearing-raceways",
    "question": "What tracks do the balls in a typical bearing follow?",
    "title": "Inner and outer raceway rings guide the rolling elements.",
    "text": "The rings, rolling elements, and cage have distinct roles.",
    "explore": "Label guide, rolling contact, and spacer in a bearing cross section.",
    "why": "A compact object may contain several cooperating functions. Naming those functions reveals more than describing it as one smooth ring.",
    "category": "Patterns & invention",
    "sourceKey": "bearings",
    "related": [
      "bearing-cage",
      "babbage-loom"
    ]
  },
  {
    "id": "retro-observer-angle",
    "question": "Why might the same reflective sign look different from two seats?",
    "title": "Its apparent brightness depends on the observation angle.",
    "text": "An observer farther from the returned light’s center can see a dimmer sign.",
    "explore": "Separate the position of the lamp from the position of the eye.",
    "why": "A shared object does not guarantee a shared view. Observer position is part of an optical explanation.",
    "category": "Everyday science",
    "sourceKey": "retro",
    "related": [
      "retro-source",
      "hydrometer"
    ]
  },
  {
    "id": "plywood-glue-decay",
    "question": "Does a moisture-resistant plywood bond make the wood decay-proof?",
    "title": "Adhesive bond classification does not confer fungal decay resistance.",
    "text": "The bond and the wood’s durability are separate concerns.",
    "explore": "Separate two kinds of deterioration on a materials diagram.",
    "why": "A claim about one component should not be extended to the whole system. Precise distinctions make product descriptions easier to interpret.",
    "category": "Everyday science",
    "sourceKey": "plywood",
    "related": [
      "plywood-cross-grain",
      "hydrometer"
    ]
  },
  {
    "id": "cardboard-double-wall",
    "question": "Does double-wall board simply mean two flat sheets?",
    "title": "It combines three liners with two fluted layers.",
    "text": "Single-wall board instead has two liners around one fluted layer.",
    "explore": "Count the layers in two different cross-section drawings.",
    "why": "A common product name can hide an exact construction. Counting the components explains more than the name alone.",
    "category": "Everyday science",
    "sourceKey": "corrugated",
    "related": [
      "cardboard-flutes",
      "hydrometer"
    ]
  },
  {
    "id": "paper-alkaline-reserve",
    "question": "Can paper contain a reserve against acids that form later?",
    "title": "An alkaline reserve can neutralize acids as they develop.",
    "text": "The Library of Congress distinguishes this from paper that is merely pH-neutral initially.",
    "explore": "Compare an initial condition with a capacity to resist later change.",
    "why": "A snapshot measurement and long-term behavior are different questions. Materials can include a reserve intended for changes that have not yet happened.",
    "category": "Art & ideas",
    "sourceKey": "paper",
    "related": [
      "paper-cellulose",
      "art-environment"
    ]
  },
  {
    "id": "rubber-old-ball",
    "question": "Does a surviving rubber ball have to be a modern object?",
    "title": "The Science Museum holds a Peruvian ball dated about 1590–1610.",
    "text": "The object predates industrial rubber manufacture by centuries.",
    "explore": "Place a surviving object and later industrial processing on different timeline marks.",
    "why": "Industrialization is not the beginning of every material’s story. Objects can preserve evidence of much older knowledge and use.",
    "category": "Inventions",
    "sourceKey": "rubber",
    "related": [
      "rubber-name",
      "web-open"
    ]
  },
  {
    "id": "water-tank-inspection",
    "question": "Does treated water stay protected simply because it is inside a tank?",
    "title": "Storage facilities still need inspection and cleaning.",
    "text": "The EPA links this work to maintaining distribution-system water quality.",
    "explore": "Add a maintenance stage to a diagram that ends at storage.",
    "why": "Completing treatment does not end the engineering task. The conditions of storage and delivery remain part of the system’s performance.",
    "category": "Everyday science",
    "sourceKey": "water",
    "related": [
      "water-stored-clean",
      "hydrometer"
    ]
  },
  {
    "id": "pump-axial-thrust",
    "question": "Does an impeller create forces only in the direction of flow?",
    "title": "Its axial thrust may need a separate balancing arrangement.",
    "text": "KSB lists thrust bearings, balancing holes, and other design options.",
    "explore": "Mark an unwanted force separately from the intended movement of liquid.",
    "why": "A working mechanism can produce side effects that require their own solution. Seeing those forces reveals why extra parts exist.",
    "category": "Patterns & invention",
    "sourceKey": "pump",
    "related": [
      "pump-spiral-case",
      "babbage-loom"
    ]
  },
  {
    "id": "memory-hierarchy",
    "question": "Is a computer’s memory really one uniform storage space?",
    "title": "Registers, cache, main memory, and persistent storage form different layers.",
    "text": "Their roles differ in speed, location, and persistence.",
    "explore": "Draw a layered route from a processor to long-term storage.",
    "why": "A single everyday word can conceal an architecture. Separating the layers makes performance and persistence easier to reason about.",
    "category": "Computing & AI",
    "sourceKey": "memory",
    "related": [
      "dram-refresh",
      "qr-damage"
    ]
  },
  {
    "id": "crow-warning-map",
    "question": "Can a learned warning spread beyond where an event happened?",
    "title": "At one site, mask-directed scolding spread at least 1.2 kilometers.",
    "text": "The researchers followed the pattern over five years.",
    "explore": "Draw a changing map of a learned response instead of one fixed observation.",
    "why": "Information has a geography as well as a timeline. Tracking its spread reveals something a single encounter could not show.",
    "category": "Nature",
    "sourceKey": "crow",
    "related": [
      "crow-mask-face",
      "bee-dance"
    ]
  },
  {
    "id": "peregrine-bats",
    "question": "Are birds the only flying animals peregrines catch?",
    "title": "Peregrine falcons also take bats.",
    "text": "Their prey is not confined to the category most associated with them.",
    "explore": "Separate a predator’s usual prey from the full range of recorded prey.",
    "why": "A common description is not always an exclusive rule. Species accounts become more interesting when we notice the exceptions they actually document.",
    "category": "Nature",
    "sourceKey": "peregrine",
    "related": [
      "peregrine-city-cliff",
      "bee-dance"
    ]
  },
  {
    "id": "opossum-swimmer",
    "question": "Can an animal known for climbing also move well in water?",
    "title": "Opossums can swim as well as climb.",
    "text": "Their abilities extend beyond the nighttime tree-climber image.",
    "explore": "List several environments one animal can move through.",
    "why": "A familiar setting can hide a broader range of capabilities. Learning another mode of movement changes how we picture an animal’s surroundings.",
    "category": "Nature",
    "sourceKey": "opossum",
    "related": [
      "opossum-dead-reflex",
      "bee-dance"
    ]
  },
  {
    "id": "raccoon-city-menu",
    "question": "Why can raccoons make a living in so many different settings?",
    "title": "Their omnivorous diet supports adaptable feeding.",
    "text": "They use a broad range of foods in natural and urban habitats.",
    "explore": "Compare a narrow feeding requirement with a flexible menu.",
    "why": "Adaptability can come from what a species is able to use. Diet helps connect behavior with the places an animal can inhabit.",
    "category": "Nature",
    "sourceKey": "raccoon",
    "related": [
      "raccoon-paw-tools",
      "bee-dance"
    ]
  },
  {
    "id": "legume-partner-choice",
    "question": "Will any rhizobia strain work equally well with every legume?",
    "title": "Different legumes need compatible bacterial partners.",
    "text": "The partnership is more specific than the broad name suggests.",
    "explore": "Compare a category label with the compatibility of particular members.",
    "why": "A general relationship can still depend on specific matches. Naming both partners gives a more useful explanation.",
    "category": "Nature",
    "sourceKey": "rhizobia",
    "related": [
      "legume-nitrogen-partner",
      "bee-dance"
    ]
  },
  {
    "id": "sand-red-coating",
    "question": "Why can some sand grains look rusty red?",
    "title": "Iron oxides such as hematite can color sand red.",
    "text": "Mineral coatings can affect appearance as well as the grain’s main ingredient.",
    "explore": "Distinguish a grain’s interior from a coating on its surface.",
    "why": "A visible color can describe a surface process rather than the entire object. That distinction is useful whenever appearance becomes evidence.",
    "category": "Earth & Weather",
    "sourceKey": "sand",
    "related": [
      "sand-green-mineral",
      "fog-ground"
    ]
  },
  {
    "id": "maple-animal-flight",
    "question": "What can connect a maple seed’s flight with a hovering insect’s?",
    "title": "Leading-edge vortices contribute to lift in both.",
    "text": "The researchers describe a convergent aerodynamic solution in plants and animals.",
    "explore": "Connect similar flow patterns without claiming one organism copied another.",
    "why": "Shared physical constraints can lead to similar solutions. A resemblance can be explained without inventing a historical chain of influence.",
    "category": "Nature",
    "sourceKey": "samaras",
    "related": [
      "maple-autorotation",
      "bee-dance"
    ]
  },
  {
    "id": "pump-cavitation",
    "question": "Can vapor bubbles form in flowing water without adding heat?",
    "title": "Low pressure can create vapor cavitation in a pump.",
    "text": "The bubbles can collapse and contribute to noise, erosion, and reduced performance.",
    "explore": "Compare changing temperature with changing pressure as routes to vapor formation.",
    "why": "Temperature is only part of the story of a fluid. Local pressure can change its behavior inside an otherwise ordinary machine.",
    "category": "Everyday science",
    "sourceKey": "cavitation",
    "related": [
      "afterimage-without-object",
      "hydrometer"
    ]
  },
  {
    "id": "wrinkles-evolution-caution",
    "question": "Did one grip experiment prove why finger wrinkles evolved?",
    "title": "The findings supported an adaptation hypothesis without proving its history.",
    "text": "Improved wet handling is evidence relevant to the idea, not a complete evolutionary explanation.",
    "explore": "Separate a present-day effect from a historical reason for its origin.",
    "why": "A useful result can support a hypothesis while leaving questions open. Scientific significance does not require pretending the evidence settles everything.",
    "category": "Human body",
    "sourceKey": "wrinkles",
    "related": [
      "wrinkles-active",
      "hearing-pitch"
    ]
  },
  {
    "id": "maillard-many-steps",
    "question": "Is Maillard browning one simple jump from sugar to brown pigment?",
    "title": "It is a network of intermediate reactions and products.",
    "text": "Early condensation can lead to rearrangements and many later pathways.",
    "explore": "Draw a branching network rather than a single reaction arrow.",
    "why": "A familiar result can emerge from many linked steps. The network view explains why changing conditions can change more than one aspect of a food.",
    "category": "Food & Drink",
    "sourceKey": "maillard",
    "related": [
      "maillard-partners",
      "pineapple-flowers"
    ]
  }
];
export const plainSightFacts=drafts.map(draft=>({...draft,collection:'hidden-in-plain-sight' as const,source:plainSightSources[draft.sourceKey].label,url:plainSightSources[draft.sourceKey].url}));
