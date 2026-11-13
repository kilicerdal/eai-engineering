import type { Fact } from './facts';

// V1.8: append-only records. Source-reviewed 2026-11-13.
// Questions, thought experiments, and significance are original editorial writing.
export const yourWorldSources = {
  "soap": {
    "label": "American Cleaning Institute · Chemistry of cleaning",
    "url": "https://www.cleaninginstitute.org/understanding-products/science-soap/chemistry-cleaning",
    "reviewedOn": "2026-11-13"
  },
  "hardwater": {
    "label": "Purdue University · Solutions and water hardness",
    "url": "https://chemed.chem.purdue.edu/genchem/topicreview/bp/ch15/solut.php",
    "reviewedOn": "2026-11-13"
  },
  "fridge": {
    "label": "Danfoss · How a refrigerator works",
    "url": "https://www.danfoss.com/en/about-danfoss/our-businesses/cooling/the-fridge-how-it-works/",
    "reviewedOn": "2026-11-13"
  },
  "wool": {
    "label": "Woolmark · Structure of the wool fibre",
    "url": "https://www.woolmark.com/fibre/what-is-the-wool-fibre",
    "reviewedOn": "2026-11-13"
  },
  "cotton": {
    "label": "Cotton Incorporated · Classification of cotton",
    "url": "https://www.cottoninc.com/wp-content/uploads/2023/09/Classification-of-Cotton.pdf",
    "reviewedOn": "2026-11-13"
  },
  "glass": {
    "label": "Corning · How glass is made",
    "url": "https://www.corning.com/worldwide/en/innovation/materials-science/glass/how-glass-made.html",
    "reviewedOn": "2026-11-13"
  },
  "ionglass": {
    "label": "Corning · The secret of tough glass: ion exchange",
    "url": "https://www.corning.com/worldwide/en/innovation/the-glass-age/science-of-glass/the-secret-of-tough-glass-ion-exchange.html",
    "reviewedOn": "2026-11-13"
  },
  "boroglass": {
    "label": "Corning Museum of Glass · Borosilicate glass",
    "url": "https://info.cmog.org/node/626",
    "reviewedOn": "2026-11-13"
  },
  "stainless": {
    "label": "British Stainless Steel Association · The passive layer",
    "url": "https://bssa.org.uk/bssa_articles/when-is-stainless-steel-passive-or-active-formation-of-the-passive-layer/",
    "reviewedOn": "2026-11-13"
  },
  "steelmagnet": {
    "label": "British Stainless Steel Association · Is stainless steel non-magnetic?",
    "url": "https://bssa.org.uk/bssa_articles/is-stainless-steel-non-magnetic-2/",
    "reviewedOn": "2026-11-13"
  },
  "yogurt": {
    "label": "University of Wisconsin–Madison CDR · Yogurt production",
    "url": "https://cdr.wisc.edu/yogurt-monograph-production",
    "reviewedOn": "2026-11-13"
  },
  "tea": {
    "label": "Royal Botanic Gardens, Kew · Tea plant",
    "url": "https://www.kew.org/plants/tea-plant",
    "reviewedOn": "2026-11-13"
  },
  "teaprocess": {
    "label": "American Camellia Society · Camellia sinensis: backyard tea",
    "url": "https://www.camellias-acs.org/education-and-camellia-care/the-camellia-family/camellia-sinensis-backyard-tea",
    "reviewedOn": "2026-11-13"
  },
  "chocolate": {
    "label": "Exploratorium · A question of temperature: chocolate",
    "url": "https://annex.exploratorium.edu/exploring/exploring_chocolate/activity.html",
    "reviewedOn": "2026-11-13"
  },
  "honey": {
    "label": "Purdue University · The complex life of the honey bee",
    "url": "https://ag.purdue.edu/department/extension/ppp/resources/ppp-publications/mobile/ppp-116-pol-91.html",
    "reviewedOn": "2026-11-13"
  },
  "honeycrystal": {
    "label": "European Commission CORDIS · Why honey crystallises",
    "url": "https://cordis.europa.eu/article/id/444911-why-did-my-honey-crystallise",
    "reviewedOn": "2026-11-13"
  },
  "fungi": {
    "label": "Royal Botanic Gardens, Kew · The hidden world of fungi",
    "url": "https://www.kew.org/read-and-watch/the-hidden-world-of-fungi",
    "reviewedOn": "2026-11-13"
  },
  "cheese": {
    "label": "Colorado State University · Cheese production",
    "url": "https://www.chhs.colostate.edu/fsi/food-articles/animal-products/cheese/",
    "reviewedOn": "2026-11-13"
  },
  "pigeon": {
    "label": "Cornell Lab of Ornithology · Rock pigeon life history",
    "url": "https://www.allaboutbirds.org/guide/rock_pigeon/lifehistory",
    "reviewedOn": "2026-11-13"
  },
  "pigeonforms": {
    "label": "Cornell Lab of Ornithology · Rock pigeon overview",
    "url": "https://www.allaboutbirds.org/guide/Rock_Pigeon/overview",
    "reviewedOn": "2026-11-13"
  },
  "lichen": {
    "label": "NIH NIEHS · What is a lichen?",
    "url": "https://www.niehs.nih.gov/health/kids/topics/natural-world/wildlife/plants/lichen",
    "reviewedOn": "2026-11-13"
  },
  "heat": {
    "label": "US EPA · What are heat islands?",
    "url": "https://www.epa.gov/heatislands/what-are-heat-islands",
    "reviewedOn": "2026-11-13"
  },
  "wastewater": {
    "label": "US EPA · Primer for municipal wastewater treatment systems",
    "url": "https://www.epa.gov/sites/default/files/2015-09/documents/primer.pdf",
    "reviewedOn": "2026-11-13"
  },
  "runoff": {
    "label": "US EPA · Protecting water quality from urban runoff",
    "url": "https://www.epa.gov/sites/default/files/2015-10/documents/nps_urban-facts_final.pdf",
    "reviewedOn": "2026-11-13"
  },
  "raingarden": {
    "label": "US EPA · Soak up the rain: rain gardens",
    "url": "https://www.epa.gov/soakuptherain/soak-rain-rain-gardens",
    "reviewedOn": "2026-11-13"
  },
  "dandelion": {
    "label": "University of Edinburgh research team · Dandelion pappus mechanics",
    "url": "https://biology.ed.ac.uk/news-events/news-2022/how-the-dandelion-decides-when-to-fly",
    "reviewedOn": "2026-11-13"
  },
  "dandelionvortex": {
    "label": "Cummins and colleagues · A separated vortex ring underlies the flight of the dandelion",
    "url": "https://pure.hw.ac.uk/ws/portalfiles/portal/25369594/A_separated_vortex_AAM_Cummins_et_al_2018_AAM.pdf",
    "reviewedOn": "2026-11-13"
  },
  "lungs": {
    "label": "NIH NHLBI · The respiratory system",
    "url": "https://www.nhlbi.nih.gov/health/lungs/respiratory-system",
    "reviewedOn": "2026-11-13"
  },
  "breathing": {
    "label": "NIH NHLBI · How your body controls breathing",
    "url": "https://www.nhlbi.nih.gov/health/lungs/body-controls-breathing",
    "reviewedOn": "2026-11-13"
  },
  "blood": {
    "label": "American Society of Hematology · Blood basics",
    "url": "https://www.hematology.org/resources/patients/blood-basics",
    "reviewedOn": "2026-11-13"
  },
  "bone": {
    "label": "NIH NIAMS · What is bone?",
    "url": "https://www.niams.nih.gov/health-topics/what-bone",
    "reviewedOn": "2026-11-13"
  },
  "muscle": {
    "label": "NIH NIAMS · Learning about muscles",
    "url": "https://www.niams.nih.gov/health-topics/educational-resources/health-lesson-learning-about-muscles",
    "reviewedOn": "2026-11-13"
  },
  "smell": {
    "label": "NIH NIDCD · How the sense of smell works",
    "url": "https://www.nidcd.nih.gov/health/smell-disorders",
    "reviewedOn": "2026-11-13"
  },
  "hearing": {
    "label": "Simon Fraser University · Binaural hearing",
    "url": "https://www.sfu.ca/sonic-studio-webdav/cmns/Handbook5/handbook/Binaural_Hearing.html",
    "reviewedOn": "2026-11-13"
  },
  "earcare": {
    "label": "World Health Organization · Ear care",
    "url": "https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-ear-care",
    "reviewedOn": "2026-11-13"
  },
  "clock": {
    "label": "NIH NIGMS · Circadian rhythms",
    "url": "https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms",
    "reviewedOn": "2026-11-13"
  }
} as const;

type SourceKey = keyof typeof yourWorldSources;
type Draft = Omit<Fact, 'source' | 'url' | 'collection'> & { sourceKey: SourceKey; question: string; why: string; related: [string, string] };
const drafts: Draft[] = [
  {
    "id": "soap-two-ends",
    "question": "How can soap get oil and water to cooperate?",
    "title": "A surfactant has two different loyalties.",
    "text": "Its water-attracting head and oil-attracting tail help bring greasy soil into contact with wash water.",
    "explore": "Draw a molecule as a head and tail. Give each end a different job.",
    "why": "An interface can be easier to manage with a connector that works on both sides. This is a useful way to think about cleaning and material design.",
    "category": "Everyday science",
    "sourceKey": "soap",
    "related": [
      "soap-micelles",
      "water-four-degrees"
    ]
  },
  {
    "id": "fridge-heat-pump",
    "question": "Why does a refrigerator release warmth while keeping food cold?",
    "title": "A refrigerator moves heat rather than manufacturing cold.",
    "text": "Its cooling circuit transfers heat from the cabinet to the surrounding room.",
    "explore": "Draw arrows showing where heat enters and leaves a fridge.",
    "why": "Following the heat tells a clearer story than saying a machine makes cold. It connects an everyday appliance with a broader engineering idea.",
    "category": "Inventions",
    "sourceKey": "fridge",
    "related": [
      "fridge-evaporator",
      "first-transistor"
    ]
  },
  {
    "id": "wool-keratin",
    "question": "What connects a wool sweater with your hair?",
    "title": "Wool is made mainly of the protein keratin.",
    "text": "The sheep’s fibre belongs to the same broad structural-protein family as human hair.",
    "explore": "Compare a fibre with a thread woven from many fibres. Which scale are you describing?",
    "why": "A material’s biological origin can reveal useful connections. Clothing becomes easier to understand when we look beneath the fabric to its building blocks.",
    "category": "Everyday science",
    "sourceKey": "wool",
    "related": [
      "wool-crimp",
      "water-four-degrees"
    ]
  },
  {
    "id": "cotton-single-cell",
    "question": "How many cells begin one cotton fibre?",
    "title": "A cotton fibre grows from a single seed-surface cell.",
    "text": "The cell becomes an exceptionally elongated outgrowth rather than a chain of many cells joined end to end.",
    "explore": "Imagine enlarging one cell into a thread. What would that change about your idea of a cell?",
    "why": "Scale can challenge a familiar mental picture. A cotton fibre shows why a cell need not look like a tiny round bead in a textbook.",
    "category": "Nature",
    "sourceKey": "cotton",
    "related": [
      "cotton-cellulose-wall",
      "octopus-taste"
    ]
  },
  {
    "id": "glass-quartz",
    "question": "What common crystalline mineral can become an ingredient in glass?",
    "title": "Quartz sand supplies silica for many glasses.",
    "text": "Glassmakers melt a mixture of ingredients; the silica in suitable sand is a major starting material for common glass.",
    "explore": "Compare a raw ingredient with the finished material. What steps separate them?",
    "why": "A familiar object may begin with an unremarkable mineral. Processing and composition together turn a raw resource into a designed material.",
    "category": "Everyday science",
    "sourceKey": "glass",
    "related": [
      "glass-thermal-temper",
      "water-four-degrees"
    ]
  },
  {
    "id": "stainless-film",
    "question": "What protects stainless steel without looking like paint?",
    "title": "A thin chromium-rich oxide film protects the surface.",
    "text": "This naturally formed passive layer is central to stainless steel’s corrosion resistance.",
    "explore": "Draw a protective layer so thin that you cannot show it at the same scale as the object.",
    "why": "The most important part of a surface may be invisible. This is a useful reminder that appearance alone does not reveal how a material resists its environment.",
    "category": "Everyday science",
    "sourceKey": "stainless",
    "related": [
      "stainless-repair",
      "water-four-degrees"
    ]
  },
  {
    "id": "yogurt-acid",
    "question": "What turns milk’s sugar into yogurt’s tang?",
    "title": "Starter bacteria convert lactose into lactic acid.",
    "text": "The resulting acidity helps give yogurt its characteristic flavor and changes the behavior of milk proteins.",
    "explore": "Trace a short chain from sugar to microbial activity to flavor.",
    "why": "A familiar flavor can be evidence of a transformation. Fermented foods make the work of microscopic organisms tangible.",
    "category": "Food & Drink",
    "sourceKey": "yogurt",
    "related": [
      "yogurt-gel",
      "cacao-seeds"
    ]
  },
  {
    "id": "tea-one-plant",
    "question": "Can green and black tea come from the same plant species?",
    "title": "Both are made from Camellia sinensis.",
    "text": "Different varieties and processing choices contribute to the range of teas, rather than each tea color requiring an unrelated plant.",
    "explore": "Draw one plant branching into several possible products.",
    "why": "A product’s final appearance does not necessarily reveal its biological origin. Processing can create remarkable variety from a shared starting point.",
    "category": "Food & Drink",
    "sourceKey": "tea",
    "related": [
      "tea-white-flowers",
      "cacao-seeds"
    ]
  },
  {
    "id": "chocolate-snap",
    "question": "Why can carefully cooled chocolate break with a satisfying snap?",
    "title": "Tempering helps produce chocolate’s gloss and snap.",
    "text": "Controlled melting and cooling organize the cocoa-butter crystals in the finished chocolate.",
    "explore": "Compare a recipe’s ingredients with its cooling history. Which might explain a different texture?",
    "why": "A food can behave like an engineered material. The arrangement of its fat crystals helps turn a list of ingredients into a particular sensory experience.",
    "category": "Food & Drink",
    "sourceKey": "chocolate",
    "related": [
      "chocolate-fat-mixture",
      "cacao-seeds"
    ]
  },
  {
    "id": "honey-crop",
    "question": "Where does a foraging bee carry nectar back to the hive?",
    "title": "Nectar travels in a specialized honey stomach, or crop.",
    "text": "This storage compartment lets a forager transport nectar and pass it to receiver bees.",
    "explore": "Sketch a transport container separately from a digestive pathway.",
    "why": "A specialized compartment can make collection and processing more efficient. The idea is worth noticing in both living systems and engineered ones.",
    "category": "Food & Drink",
    "sourceKey": "honey",
    "related": [
      "honey-invertase",
      "cacao-seeds"
    ]
  },
  {
    "id": "fungi-fruiting",
    "question": "Is a mushroom the whole fungus?",
    "title": "A mushroom is a spore-producing structure of some fungi.",
    "text": "Much of the organism can be a less visible network of threads called mycelium.",
    "explore": "Draw the visible mushroom and then add the hidden network around it.",
    "why": "The visible part of a living system may be only one specialized structure. This encourages us to look beyond what first catches our eye.",
    "category": "Nature",
    "sourceKey": "fungi",
    "related": [
      "fungi-chitin",
      "octopus-taste"
    ]
  },
  {
    "id": "cheese-rennet",
    "question": "What helps liquid milk become a cheese curd?",
    "title": "Rennet enzymes can coagulate the milk protein casein.",
    "text": "Many cheeses use this step to form a gel that can be cut and drained; not every cheese uses rennet.",
    "explore": "Draw the difference between a flowing liquid and a connected gel.",
    "why": "A small amount of an active ingredient can reorganize a much larger mixture. Cheesemaking offers a familiar example of controlled transformation.",
    "category": "Food & Drink",
    "sourceKey": "cheese",
    "related": [
      "cheese-cut-curd",
      "cacao-seeds"
    ]
  },
  {
    "id": "pigeon-crop-milk",
    "question": "Can a father pigeon produce food called milk?",
    "title": "Both pigeon parents feed chicks crop milk.",
    "text": "The milky material is secreted by the lining of the crop. It is not milk from mammary glands.",
    "explore": "Compare two different biological ways of nourishing young.",
    "why": "A familiar word can describe a similar job performed by a different structure. The name becomes more useful when its limits are clear.",
    "category": "Nature",
    "sourceKey": "pigeon",
    "related": [
      "pigeon-cliff-city",
      "octopus-taste"
    ]
  },
  {
    "id": "lichen-partners",
    "question": "Is that lichen on a rock a tiny plant?",
    "title": "A lichen is an association of different organisms.",
    "text": "Its main partners include a fungus and photosynthetic algae or cyanobacteria, rather than one ordinary vascular plant.",
    "explore": "Draw a partnership with different contributions from each member.",
    "why": "An organism-like appearance can hide a community. Lichens make cooperation a concrete subject we can notice on a wall or tree.",
    "category": "Nature",
    "sourceKey": "lichen",
    "related": [
      "lichen-no-roots",
      "octopus-taste"
    ]
  },
  {
    "id": "city-night-heat",
    "question": "Why can a city stay warm after sunset?",
    "title": "Urban materials can release stored heat slowly into the night.",
    "text": "Roads, roofs, and buildings absorb solar energy during the day and can keep warming their surroundings after dark.",
    "explore": "Draw separate timelines for receiving sunlight and releasing stored heat.",
    "why": "A temperature at one moment can reflect earlier conditions. Thinking about storage and delay helps explain an everyday weather experience.",
    "category": "Earth & Weather",
    "sourceKey": "heat",
    "related": [
      "city-tree-cooling",
      "fog-ground"
    ]
  },
  {
    "id": "water-screening",
    "question": "What does wastewater treatment often remove before microbes get to work?",
    "title": "Screens catch large debris that can damage or clog equipment.",
    "text": "Preliminary treatment separates objects such as rags and sticks before later treatment stages.",
    "explore": "Put coarse sorting before a delicate process in a workflow. What failures might it prevent?",
    "why": "Complex systems often begin with a simple protective step. Removing the wrong inputs can be as important as improving the main process.",
    "category": "Inventions",
    "sourceKey": "wastewater",
    "related": [
      "water-gravity-settle",
      "first-transistor"
    ]
  },
  {
    "id": "runoff-hard-surfaces",
    "question": "Why does rain behave differently on pavement than on open ground?",
    "title": "Impervious surfaces prevent much of the water from soaking in.",
    "text": "Roads, roofs, and parking lots can increase the water flowing across the surface during rain or snowmelt.",
    "explore": "Draw the same rainfall over two different ground surfaces.",
    "why": "The surface beneath a storm changes what the storm does. This is an accessible way to connect land use with water movement.",
    "category": "Earth & Weather",
    "sourceKey": "runoff",
    "related": [
      "runoff-pollution-ride",
      "fog-ground"
    ]
  },
  {
    "id": "dandelion-bristles",
    "question": "Is a dandelion’s little parachute a solid sheet?",
    "title": "Its pappus is an open arrangement of roughly 100 bristles.",
    "text": "The delicate structure increases drag while carrying the seed-like fruit through the air.",
    "explore": "Draw a parachute made of gaps as well as solid material.",
    "why": "A useful structure need not be solid. Looking at porous designs can challenge our first guess about how something stays aloft.",
    "category": "Nature",
    "sourceKey": "dandelion",
    "related": [
      "dandelion-humidity",
      "octopus-taste"
    ]
  },
  {
    "id": "lung-asymmetry",
    "question": "Are your two lungs mirror-image copies?",
    "title": "The left lung is smaller and has two lobes; the right has three.",
    "text": "The heart takes up some of the space on the left side of the chest.",
    "explore": "Draw two neighboring organs sharing a limited space. Would symmetry always be practical?",
    "why": "Bodies do not have to follow perfect symmetry. Internal layout reflects how different structures fit and work together.",
    "category": "Human body",
    "sourceKey": "lungs",
    "related": [
      "lung-air-sacs",
      "balance-team"
    ]
  },
  {
    "id": "blood-no-nucleus",
    "question": "What is missing from a mature human red blood cell?",
    "title": "Mature red blood cells have no nucleus.",
    "text": "Their flexible form helps them pass through small blood vessels; this is a specialization, not the usual plan for every human cell.",
    "explore": "Compare a specialized cell with a general-purpose diagram of one.",
    "why": "Biological examples often have exceptions to the standard drawing. Looking for the reason behind an exception makes it more memorable.",
    "category": "Human body",
    "sourceKey": "blood",
    "related": [
      "blood-platelet-fragments",
      "balance-team"
    ]
  },
  {
    "id": "bone-renovation",
    "question": "Is an adult skeleton a finished, unchanging structure?",
    "title": "Bone is living tissue that is continually remodeled.",
    "text": "Specialized cells remove old tissue and build new tissue, rather than leaving the framework permanently untouched.",
    "explore": "Compare maintaining a living structure with assembling a one-time model.",
    "why": "Durability can depend on renewal rather than complete permanence. Bone makes that idea surprisingly concrete.",
    "category": "Human body",
    "sourceKey": "bone",
    "related": [
      "bone-composite",
      "balance-team"
    ]
  },
  {
    "id": "muscle-tendon-link",
    "question": "What connects a skeletal muscle’s pull to a bone?",
    "title": "Tendons connect muscles to bones.",
    "text": "When muscle fibres contract, force can pass through this connective tissue to move a joint.",
    "explore": "Draw the force path from muscle through tendon to bone.",
    "why": "Movement depends on connections as well as motors. Tracing the force path helps explain why a joint is a system rather than a single moving piece.",
    "category": "Human body",
    "sourceKey": "muscle",
    "related": [
      "muscle-peristalsis",
      "balance-team"
    ]
  },
  {
    "id": "smell-high-patch",
    "question": "Where inside the nose are smell-detecting cells found?",
    "title": "Olfactory sensory neurons occupy a small patch high inside the nose.",
    "text": "Odor molecules must reach this sensory tissue to stimulate the receptors involved in smelling.",
    "explore": "Sketch an air passage with a specialized sensing region rather than sensors everywhere.",
    "why": "A sensor’s placement matters. Understanding where detection happens makes the route to that sensor part of the explanation.",
    "category": "Human body",
    "sourceKey": "smell",
    "related": [
      "smell-direct-neurons",
      "balance-team"
    ]
  },
  {
    "id": "hearing-arrival-time",
    "question": "How can two ears help locate a sound you cannot see?",
    "title": "The brain can use small differences in a sound’s arrival time.",
    "text": "Because the ears are separated, a sound from one side need not reach both at the same instant.",
    "explore": "Draw two sensors and a source to one side. Compare the path lengths.",
    "why": "A difference between measurements can carry information. This is a simple connection between hearing and the design of sensing systems.",
    "category": "Human body",
    "sourceKey": "hearing",
    "related": [
      "hearing-sound-shadow",
      "balance-team"
    ]
  },
  {
    "id": "clock-many-organs",
    "question": "Does your body have only one biological clock?",
    "title": "Nearly every human tissue and organ has a circadian rhythm.",
    "text": "A master clock helps coordinate these many local rhythms with the daily cycle.",
    "explore": "Draw several clocks coordinated by a central signal rather than only one clock.",
    "why": "Coordination is different from doing every job centrally. This is a useful way to think about timing in a distributed living system.",
    "category": "Human body",
    "sourceKey": "clock",
    "related": [
      "clock-light-eyes",
      "balance-team"
    ]
  },
  {
    "id": "soap-micelles",
    "question": "What tiny arrangement helps carry grease away?",
    "title": "Surfactants can gather into micelles.",
    "text": "In water, these clusters put water-loving heads outside and oil-loving tails inside, helping suspend oily soil for rinsing.",
    "explore": "Sketch a ring of heads with the tails pointing inward. Where would grease fit?",
    "why": "Arrangement matters as well as ingredients. A group of molecules can do something that is difficult to understand by looking at one molecule alone.",
    "category": "Everyday science",
    "sourceKey": "soap",
    "related": [
      "soap-wetting",
      "water-four-degrees"
    ]
  },
  {
    "id": "fridge-evaporator",
    "question": "Which part of a fridge uses a liquid becoming a gas?",
    "title": "The evaporator absorbs heat as refrigerant evaporates.",
    "text": "Inside the cooling circuit, this change of state helps remove heat from the refrigerated space.",
    "explore": "Mark the place where the fluid changes state on a simple circuit.",
    "why": "A change of state can be a tool for moving energy. A fridge makes this otherwise hidden process useful in everyday life.",
    "category": "Inventions",
    "sourceKey": "fridge",
    "related": [
      "fridge-condenser",
      "first-transistor"
    ]
  },
  {
    "id": "wool-crimp",
    "question": "Why does wool have tiny natural bends?",
    "title": "Different cells contribute to wool’s crimp.",
    "text": "Two cortical cell types behave differently, helping create the fibre’s characteristic waviness.",
    "explore": "Sketch two joined strips that change length differently. How could they bend?",
    "why": "Small differences inside a material can produce a visible shape. Natural fibres offer an everyday route into thinking about material structure.",
    "category": "Everyday science",
    "sourceKey": "wool",
    "related": [
      "wool-air",
      "water-four-degrees"
    ]
  },
  {
    "id": "cotton-cellulose-wall",
    "question": "How does a cotton fibre build its strength as it matures?",
    "title": "Cellulose is deposited inside its growing wall.",
    "text": "The initially thin-walled tube develops a thicker wall as layers of cellulose accumulate.",
    "explore": "Sketch a tube and add layers to its inner wall. What happens to its hollow center?",
    "why": "Growth can involve reinforcement as well as enlargement. This is a simple way to connect plant development with the design of hollow structures.",
    "category": "Nature",
    "sourceKey": "cotton",
    "related": [
      "cotton-hollow",
      "octopus-taste"
    ]
  },
  {
    "id": "glass-thermal-temper",
    "question": "Can heating and cooling make glass harder to break?",
    "title": "Thermal tempering strengthens glass using controlled cooling.",
    "text": "Heating followed by rapid cooling creates a strengthened material through stresses in the glass.",
    "explore": "Draw a piece of glass with an outside layer and an interior. Why might their cooling rates differ?",
    "why": "Material processing can matter as much as the recipe. Two objects with similar ingredients can behave differently because of how they were made.",
    "category": "Everyday science",
    "sourceKey": "glass",
    "related": [
      "glass-ion-exchange",
      "water-four-degrees"
    ]
  },
  {
    "id": "stainless-repair",
    "question": "Can stainless steel renew its own protective surface?",
    "title": "A damaged passive film can normally form again if enough oxygen is available.",
    "text": "This refers to the protective film, not the repair of a deep scratch or structural crack in the metal.",
    "explore": "Separate damage to a protective film from damage to the object underneath.",
    "why": "The phrase self-repair needs a precise boundary. Knowing what actually reforms helps distinguish a real material property from an exaggerated promise.",
    "category": "Everyday science",
    "sourceKey": "stainless",
    "related": [
      "stainless-magnet",
      "water-four-degrees"
    ]
  },
  {
    "id": "yogurt-gel",
    "question": "What holds water inside yogurt’s soft structure?",
    "title": "Milk proteins form a gel as acidity rises.",
    "text": "Casein-rich aggregates build a network that loosely traps the watery phase rather like a sponge.",
    "explore": "Draw a network with water held between the strands.",
    "why": "Texture can come from an arrangement rather than an added solid ingredient. A spoonful of yogurt is an everyday example of a material network.",
    "category": "Food & Drink",
    "sourceKey": "yogurt",
    "related": [
      "yogurt-whey",
      "cacao-seeds"
    ]
  },
  {
    "id": "tea-white-flowers",
    "question": "What color are the tea plant’s flowers?",
    "title": "Tea plants produce scented white flowers.",
    "text": "The familiar drink comes from leaves, while the plant also has a flowering life that a packet of tea rarely shows.",
    "explore": "Imagine drawing the whole plant rather than only the part sold in a shop.",
    "why": "Food packaging can narrow our picture of a species. Reconnecting an ingredient with the whole organism invites a different kind of attention.",
    "category": "Food & Drink",
    "sourceKey": "tea",
    "related": [
      "tea-evergreen",
      "cacao-seeds"
    ]
  },
  {
    "id": "chocolate-fat-mixture",
    "question": "Does all the fat in chocolate melt at one temperature?",
    "title": "Chocolate contains fat groups with different melting points.",
    "text": "That makes temperature control important when melting and cooling it.",
    "explore": "Draw several melting ranges rather than one sharp boundary.",
    "why": "Everyday mixtures can behave differently from an ideal pure substance. Thinking about a range of components helps explain why processing needs care.",
    "category": "Food & Drink",
    "sourceKey": "chocolate",
    "related": [
      "chocolate-water-seize",
      "cacao-seeds"
    ]
  },
  {
    "id": "honey-invertase",
    "question": "What starts changing nectar’s sugars inside a bee?",
    "title": "The enzyme invertase helps split sucrose into simpler sugars.",
    "text": "Glucose and fructose are among the products of this nectar-processing step.",
    "explore": "Draw one larger sugar being converted into two smaller ones.",
    "why": "Honey is transformed rather than merely collected. Following one chemical step makes a familiar food’s origin more interesting.",
    "category": "Food & Drink",
    "sourceKey": "honey",
    "related": [
      "honey-receivers",
      "cacao-seeds"
    ]
  },
  {
    "id": "fungi-chitin",
    "question": "What material links fungal cell walls with insect armor?",
    "title": "Chitin occurs in fungi and in arthropod exoskeletons.",
    "text": "Fungi are a separate kingdom, rather than plants with an unusual shape.",
    "explore": "Compare a material’s role in a microscopic wall with its role in an outer skeleton.",
    "why": "The same kind of building material can appear in very different organisms. Such connections make classification and material function easier to separate.",
    "category": "Nature",
    "sourceKey": "fungi",
    "related": [
      "fungi-outside-digestion",
      "octopus-taste"
    ]
  },
  {
    "id": "cheese-cut-curd",
    "question": "Why do cheesemakers cut a curd before draining it?",
    "title": "Cutting helps release whey from the curd.",
    "text": "Removing this watery phase helps set the moisture content of the cheese.",
    "explore": "Compare draining one large gel with draining many smaller pieces.",
    "why": "Changing geometry can change a process. The shape and size of pieces can be as important as the original ingredients.",
    "category": "Food & Drink",
    "sourceKey": "cheese",
    "related": [
      "cheese-salt-role",
      "cacao-seeds"
    ]
  },
  {
    "id": "pigeon-cliff-city",
    "question": "Why do building ledges suit rock pigeons?",
    "title": "A city ledge can resemble a sheltered cliff nesting site.",
    "text": "Rock pigeons use nooks and ledges on natural cliffs as well as human-made structures.",
    "explore": "Look at a building from a cliff-nesting bird’s point of view.",
    "why": "A built environment can accidentally resemble an older habitat. This helps make urban wildlife feel like part of ecology rather than an exception to it.",
    "category": "Nature",
    "sourceKey": "pigeon",
    "related": [
      "pigeon-reused-nest",
      "octopus-taste"
    ]
  },
  {
    "id": "lichen-no-roots",
    "question": "How can lichen live on a bare surface without roots?",
    "title": "Lichens lack the roots, stems, and leaves of vascular plants.",
    "text": "Their structure and access to moisture differ from those of a rooted flowering plant.",
    "explore": "Imagine designing a living system without a root network. What functions still need to be supplied?",
    "why": "A familiar set of plant parts is not a universal blueprint for life. Comparing different body plans helps reveal alternative solutions.",
    "category": "Nature",
    "sourceKey": "lichen",
    "related": [
      "lichen-tree-tenant",
      "octopus-taste"
    ]
  },
  {
    "id": "city-tree-cooling",
    "question": "Do trees cool a street only by casting shade?",
    "title": "Vegetation also cools through water moving into the air.",
    "text": "Transpiration from leaves and evaporation from surfaces contribute alongside shade.",
    "explore": "Draw two cooling pathways from the same tree.",
    "why": "One visible benefit can hide another mechanism. Separating shade from water exchange makes a natural cooling system easier to understand.",
    "category": "Earth & Weather",
    "sourceKey": "heat",
    "related": [
      "city-wind-geometry",
      "fog-ground"
    ]
  },
  {
    "id": "water-gravity-settle",
    "question": "Can gravity do part of a treatment plant’s work?",
    "title": "Settling tanks separate solids that sink from wastewater.",
    "text": "Physical separation removes material before or after other treatment processes, depending on the stage.",
    "explore": "Draw a tank with slow-moving water and particles of different settling behavior.",
    "why": "Not every useful process needs a sophisticated reaction. Giving gravity enough time and space can make it an effective engineering tool.",
    "category": "Inventions",
    "sourceKey": "wastewater",
    "related": [
      "water-working-microbes",
      "first-transistor"
    ]
  },
  {
    "id": "runoff-pollution-ride",
    "question": "How can rain carry pollution even if it starts out clean?",
    "title": "Runoff picks up material as it travels over the ground.",
    "text": "Oil, dirt, chemicals, and fertilizers can move from urban surfaces toward streams and rivers.",
    "explore": "Follow a raindrop across a parking lot and into a drain.",
    "why": "A transport route can connect distant causes and effects. Following the route makes pollution easier to understand than looking only at the receiving water.",
    "category": "Earth & Weather",
    "sourceKey": "runoff",
    "related": [
      "rain-garden-bowl",
      "fog-ground"
    ]
  },
  {
    "id": "dandelion-humidity",
    "question": "Can a dandelion’s flying structure respond to damp weather?",
    "title": "The pappus closes in wet conditions and opens again when dry.",
    "text": "The change affects its interaction with the wind rather than being a deliberate decision by the plant.",
    "explore": "Draw the same flying structure in open and closed states.",
    "why": "A change in the environment can alter a structure’s behavior. Natural responses are easier to understand when we describe the mechanism rather than give the plant intentions.",
    "category": "Nature",
    "sourceKey": "dandelion",
    "related": [
      "dandelion-hinge",
      "octopus-taste"
    ]
  },
  {
    "id": "lung-air-sacs",
    "question": "Where does the air you breathe finally meet the bloodstream?",
    "title": "Gas exchange happens at tiny lung air sacs called alveoli.",
    "text": "Oxygen moves into nearby blood, while carbon dioxide moves out to be exhaled.",
    "explore": "Draw the air pathway and the blood pathway meeting across a thin boundary.",
    "why": "A useful exchange needs an interface. The lungs offer an intuitive way to think about separating two flows while allowing selected substances to cross.",
    "category": "Human body",
    "sourceKey": "lungs",
    "related": [
      "lung-surfactant",
      "balance-team"
    ]
  },
  {
    "id": "blood-platelet-fragments",
    "question": "Are platelets complete cells like white blood cells?",
    "title": "Platelets are small cell fragments.",
    "text": "They gather at an injured blood vessel and help create a platform for clot formation.",
    "explore": "Draw a repair process assembled from many small pieces.",
    "why": "A useful biological component need not be a whole cell. Function can depend on how pieces gather and interact.",
    "category": "Human body",
    "sourceKey": "blood",
    "related": [
      "blood-plasma",
      "balance-team"
    ]
  },
  {
    "id": "bone-composite",
    "question": "What keeps bone from behaving like a lump of mineral?",
    "title": "Bone combines a collagen framework with mineral.",
    "text": "The mineral contributes hardness while collagen contributes flexibility, giving the material a combination of properties.",
    "explore": "Compare a composite with either of its ingredients alone.",
    "why": "Combining materials can solve a problem that neither ingredient solves by itself. A skeleton provides an everyday link to composite design.",
    "category": "Human body",
    "sourceKey": "bone",
    "related": [
      "bone-lattice",
      "balance-team"
    ]
  },
  {
    "id": "muscle-peristalsis",
    "question": "How does food move through your gut without you pushing it?",
    "title": "Waves of smooth-muscle contractions move digestive contents.",
    "text": "This coordinated movement is called peristalsis and works without a conscious command for each wave.",
    "explore": "Sketch a traveling squeeze along a flexible tube.",
    "why": "A sequence of local movements can create transport. This is a useful pattern to recognize in both anatomy and mechanical design.",
    "category": "Human body",
    "sourceKey": "muscle",
    "related": [
      "muscle-heart-type",
      "balance-team"
    ]
  },
  {
    "id": "smell-direct-neurons",
    "question": "Do smell-detecting cells send their message only to neighboring nose cells?",
    "title": "Olfactory sensory neurons connect directly to the brain.",
    "text": "Their receptors respond to molecules and the resulting neural messages contribute to identifying an odor.",
    "explore": "Draw the path from an outside molecule to a sensory cell and onward.",
    "why": "Sensing is a chain from physical contact to information. Separating those stages helps make a familiar perception less mysterious.",
    "category": "Human body",
    "sourceKey": "smell",
    "related": [
      "smell-menthol",
      "balance-team"
    ]
  },
  {
    "id": "hearing-sound-shadow",
    "question": "Can your head make a sound weaker at one ear?",
    "title": "Differences in sound level between the ears help with localization.",
    "text": "The effect is especially useful at higher frequencies, where the head creates more of an acoustic shadow.",
    "explore": "Imagine comparing two microphones separated by an obstacle.",
    "why": "The obstacle between sensors can become part of the measurement. A body’s shape helps determine the information available to perception.",
    "category": "Human body",
    "sourceKey": "hearing",
    "related": [
      "earwax-trap",
      "balance-team"
    ]
  },
  {
    "id": "clock-light-eyes",
    "question": "How can light at your eyes influence an internal clock?",
    "title": "The brain’s suprachiasmatic nucleus uses light information to help regulate timing.",
    "text": "Among its roles is controlling melatonin production in relation to the light the eyes receive.",
    "explore": "Trace an information route from the environment to an internal timing signal.",
    "why": "A clock needs a way to relate its internal cycle to the outside world. The route shows how sensing and timing can work together.",
    "category": "Human body",
    "sourceKey": "clock",
    "related": [
      "clock-beyond-animals",
      "balance-team"
    ]
  },
  {
    "id": "soap-wetting",
    "question": "Why can a cleaning solution spread more easily than plain water?",
    "title": "Surfactants lower water’s surface tension.",
    "text": "That helps a cleaning liquid spread across and wet a surface instead of remaining in tightly gathered droplets.",
    "explore": "Imagine cleaning a rough surface. Why might reaching its small spaces matter?",
    "why": "Cleaning starts with contact. Thinking about how a liquid reaches a surface helps explain why a product’s spreading behavior matters.",
    "category": "Everyday science",
    "sourceKey": "soap",
    "related": [
      "soap-hard-water",
      "water-four-degrees"
    ]
  },
  {
    "id": "fridge-condenser",
    "question": "Why must fridge refrigerant be compressed again?",
    "title": "Compression prepares the fluid to release heat and condense.",
    "text": "The compressor raises the gas’s pressure and temperature; the condenser then releases heat as the refrigerant returns to liquid.",
    "explore": "Follow one imaginary parcel of refrigerant around a complete loop.",
    "why": "A useful machine often needs several coordinated stages. Looking at the whole cycle explains why one apparently hot step belongs in a cooling system.",
    "category": "Inventions",
    "sourceKey": "fridge",
    "related": [
      "fridge-feedback",
      "first-transistor"
    ]
  },
  {
    "id": "wool-air",
    "question": "What invisible ingredient helps a wool garment insulate?",
    "title": "Crimp helps wool trap still air.",
    "text": "The spaces between bent fibres hold air, contributing to the material’s insulating behavior.",
    "explore": "Draw a straight stack of fibres and a wavy one. Compare the gaps.",
    "why": "The empty spaces can be part of a material’s function. Insulation is a useful reminder to consider the structure between the solid pieces.",
    "category": "Everyday science",
    "sourceKey": "wool",
    "related": [
      "wool-water",
      "water-four-degrees"
    ]
  },
  {
    "id": "cotton-hollow",
    "question": "What runs through the center of a cotton fibre?",
    "title": "A mature fibre retains a hollow region called the lumen.",
    "text": "The fibre’s wall surrounds this canal, which extends along its length.",
    "explore": "Draw a cross-section of a cotton fibre rather than its outside.",
    "why": "A cross-section can reveal information a surface view misses. Looking inside familiar materials is often the first step toward understanding their behavior.",
    "category": "Nature",
    "sourceKey": "cotton",
    "related": [
      "cotton-twist",
      "octopus-taste"
    ]
  },
  {
    "id": "glass-ion-exchange",
    "question": "How can swapping tiny ions help toughen glass?",
    "title": "Larger potassium ions can replace smaller sodium ions near the surface.",
    "text": "In suitable glass, ion exchange in a molten salt bath creates a compressed surface layer that resists crack growth.",
    "explore": "Imagine fitting larger pieces into a confined surface layer. Where might stress develop?",
    "why": "An invisible change near a surface can affect a whole object’s durability. It is a useful example of engineering at a much smaller scale than the finished product.",
    "category": "Everyday science",
    "sourceKey": "ionglass",
    "related": [
      "glass-borosilicate",
      "water-four-degrees"
    ]
  },
  {
    "id": "stainless-magnet",
    "question": "Does a magnet prove that metal is not stainless steel?",
    "title": "Some stainless-steel families are magnetic.",
    "text": "Magnetic response depends on the metal’s microstructure; stainless steel is not a single universally nonmagnetic material.",
    "explore": "Imagine sorting metals by one test. What other information would you want?",
    "why": "One quick observation rarely identifies an entire material. Understanding families and internal structure prevents an appealing test from becoming a misleading rule.",
    "category": "Everyday science",
    "sourceKey": "steelmagnet",
    "related": [
      "stainless-cold-work",
      "water-four-degrees"
    ]
  },
  {
    "id": "yogurt-whey",
    "question": "What is the watery liquid that can separate from yogurt?",
    "title": "Whey contains water and dissolved milk components.",
    "text": "The gel does not permanently lock in all its liquid, so part of the watery phase can separate.",
    "explore": "Sketch a gel before and after some of its liquid drains away.",
    "why": "A mixture can separate without becoming a completely different substance. Identifying its phases helps explain an ordinary observation at breakfast.",
    "category": "Food & Drink",
    "sourceKey": "yogurt",
    "related": [
      "yogurt-concentrated",
      "cacao-seeds"
    ]
  },
  {
    "id": "tea-evergreen",
    "question": "Does a tea plant have to shed all its leaves each year?",
    "title": "Camellia sinensis is evergreen.",
    "text": "The tea plant is a woody shrub or small tree, rather than a short-lived leafy herb.",
    "explore": "Compare the life of a perennial crop plant with the life of one harvested leaf.",
    "why": "The ingredient and the organism operate on different timescales. This helps make agricultural products feel connected to living landscapes.",
    "category": "Food & Drink",
    "sourceKey": "tea",
    "related": [
      "tea-oxidation",
      "cacao-seeds"
    ]
  },
  {
    "id": "chocolate-water-seize",
    "question": "Can a little water turn melted chocolate lumpy?",
    "title": "A small amount of water can make smooth melted chocolate seize.",
    "text": "Chocolate work therefore calls for dry tools and ingredients; the result is very different from simply thinning it with another liquid.",
    "explore": "Before mixing two materials, ask whether a small addition and a large addition might behave differently.",
    "why": "More liquid does not always mean a smoother mixture. An unexpected kitchen result can be a useful prompt to investigate how ingredients interact.",
    "category": "Food & Drink",
    "sourceKey": "chocolate",
    "related": [
      "chocolate-couverture",
      "cacao-seeds"
    ]
  },
  {
    "id": "honey-receivers",
    "question": "Does one bee complete the whole nectar-to-honey journey alone?",
    "title": "Foragers pass nectar to receiver bees in the hive.",
    "text": "The nectar can move through several receivers as processing continues before storage.",
    "explore": "Draw a workflow with collecting, transferring, processing, and storing as separate jobs.",
    "why": "A finished product can reflect coordinated work across many individuals. Tracing the handoffs reveals organization that a single snapshot would miss.",
    "category": "Food & Drink",
    "sourceKey": "honey",
    "related": [
      "honey-crystals",
      "cacao-seeds"
    ]
  },
  {
    "id": "fungi-outside-digestion",
    "question": "How can fungi make food from a fallen branch?",
    "title": "Many fungi break down dead material around them before absorbing nutrients.",
    "text": "Their thread-like growth and chemical breakdown help recycle organic matter.",
    "explore": "Draw arrows for breakdown outside an organism and absorption into it.",
    "why": "Feeding does not always require a mouth. Different ways of obtaining nutrients broaden our picture of how an ecosystem works.",
    "category": "Nature",
    "sourceKey": "fungi",
    "related": [
      "fungi-spore-rides",
      "octopus-taste"
    ]
  },
  {
    "id": "cheese-salt-role",
    "question": "Does salt in cheese do more than add flavor?",
    "title": "Salt also affects moisture and microbial activity.",
    "text": "Its roles in cheesemaking include helping control ripening as well as contributing to taste.",
    "explore": "List the jobs of one ingredient before deciding why it is included.",
    "why": "An ingredient can serve several purposes at once. Looking for those overlapping roles helps explain why changing a recipe may change more than flavor.",
    "category": "Food & Drink",
    "sourceKey": "cheese",
    "related": [
      "cheese-ripening",
      "cacao-seeds"
    ]
  },
  {
    "id": "pigeon-reused-nest",
    "question": "Do pigeons always build a new nest from scratch?",
    "title": "Rock pigeons reuse nest sites and nests repeatedly.",
    "text": "Material can accumulate over successive nesting attempts rather than being removed after every brood.",
    "explore": "Compare replacing a structure each time with maintaining and adding to it.",
    "why": "Repeated use can change the shape and history of a place. A small nest offers a different way to think about construction over time.",
    "category": "Nature",
    "sourceKey": "pigeon",
    "related": [
      "pigeon-color-forms",
      "octopus-taste"
    ]
  },
  {
    "id": "lichen-tree-tenant",
    "question": "Does lichen on tree bark feed by stealing from the tree?",
    "title": "Tree-dwelling lichens use the bark as a support rather than a food source.",
    "text": "They are not parasitic on the tree simply because they grow on its surface.",
    "explore": "Separate the ideas of using a surface and taking nutrients from its owner.",
    "why": "Where something lives does not always tell us what it eats. This distinction is useful when interpreting relationships in nature.",
    "category": "Nature",
    "sourceKey": "lichen",
    "related": [
      "lichen-monitor",
      "octopus-taste"
    ]
  },
  {
    "id": "city-wind-geometry",
    "question": "Can the shape of a street affect how hot it feels?",
    "title": "Buildings and street spacing influence air movement.",
    "text": "Narrow urban canyons can obstruct wind and affect how heat is released.",
    "explore": "Sketch two street layouts with different building heights. Where could air move?",
    "why": "City design changes the conditions people experience. Geometry matters beyond appearance because it shapes the movement of air and energy.",
    "category": "Earth & Weather",
    "sourceKey": "heat",
    "related": [
      "city-waste-heat",
      "fog-ground"
    ]
  },
  {
    "id": "water-working-microbes",
    "question": "Can microbes be part of a city’s cleaning workforce?",
    "title": "Biological wastewater treatment uses organisms that break down organic matter.",
    "text": "Aerated processes provide oxygen and mixing so suitable microbes can do this work efficiently.",
    "explore": "Compare adding a chemical with providing conditions for a living process.",
    "why": "Engineering can support biology rather than replace it. A treatment plant is a powerful everyday example of the two working together.",
    "category": "Inventions",
    "sourceKey": "wastewater",
    "related": [
      "water-return-sludge",
      "first-transistor"
    ]
  },
  {
    "id": "rain-garden-bowl",
    "question": "Why is a rain garden planted in a shallow depression?",
    "title": "The lowered area collects runoff and lets it soak into the ground.",
    "text": "Plants and soil make the feature more than a decorative flower bed; suitable site design remains important.",
    "explore": "Sketch the cross-section of a rain garden after a shower.",
    "why": "A small change in shape can change where water goes. Landscape design can combine appearance with a practical role in managing runoff.",
    "category": "Earth & Weather",
    "sourceKey": "raingarden",
    "related": [
      "rain-garden-habitat",
      "fog-ground"
    ]
  },
  {
    "id": "dandelion-hinge",
    "question": "What moves a dandelion’s bristles without a motor?",
    "title": "A water-responsive hinge changes their angle.",
    "text": "Different parts swell by different amounts when wet, moving the attached bristles.",
    "explore": "Design a paper model in which unequal expansion could move several arms.",
    "why": "Motion can come from a material’s response instead of a separate motor. That idea offers a direct bridge between plant structure and engineering.",
    "category": "Nature",
    "sourceKey": "dandelion",
    "related": [
      "dandelion-air-vortex",
      "octopus-taste"
    ]
  },
  {
    "id": "lung-surfactant",
    "question": "What helps keep the tiny air sacs in your lungs from collapsing?",
    "title": "Pulmonary surfactant helps the alveoli inflate more easily and stay open.",
    "text": "The air sacs have a surfactant coating that reduces the work of breathing and helps prevent collapse during exhalation.",
    "explore": "Compare a tiny air sac with and without a helpful surface coating.",
    "why": "A surface can change how much effort a whole system needs. The idea connects breathing with a broader question about interfaces and efficient movement.",
    "category": "Human body",
    "sourceKey": "lungs",
    "related": [
      "lung-diaphragm",
      "balance-team"
    ]
  },
  {
    "id": "blood-plasma",
    "question": "Is the liquid part of blood just water?",
    "title": "Plasma carries dissolved proteins, salts, nutrients, and chemical messengers.",
    "text": "It transports blood cells as well as substances such as antibodies and clotting proteins.",
    "explore": "Draw the cargo carried in a fluid separately from the fluid itself.",
    "why": "Calling something a liquid can conceal its many contents. The distinction between carrier and cargo helps explain a transport system.",
    "category": "Human body",
    "sourceKey": "blood",
    "related": [
      "blood-kidney-signal",
      "balance-team"
    ]
  },
  {
    "id": "bone-lattice",
    "question": "Why does the inside of a bone not look uniformly solid?",
    "title": "Bone includes dense outer tissue and a less dense inner lattice.",
    "text": "Compact and spongy tissue have different structures within the same skeletal element.",
    "explore": "Draw both a solid outer shell and an internal framework.",
    "why": "Strength does not require filling every space. Looking at internal architecture helps connect anatomy with structural design.",
    "category": "Human body",
    "sourceKey": "bone",
    "related": [
      "bone-blood-factory",
      "balance-team"
    ]
  },
  {
    "id": "muscle-heart-type",
    "question": "Is heart muscle the same tissue as the muscle in your arm?",
    "title": "Cardiac muscle is a distinct muscle type.",
    "text": "Skeletal, smooth, and cardiac muscle serve different roles; the heart’s contractions are not normally under voluntary control.",
    "explore": "Compare a system you start deliberately with one that runs continuously.",
    "why": "One broad category can contain specialized forms. Distinguishing them makes the body’s organization easier to understand.",
    "category": "Human body",
    "sourceKey": "muscle",
    "related": [
      "muscle-still-working",
      "balance-team"
    ]
  },
  {
    "id": "smell-menthol",
    "question": "Is menthol’s refreshing coolness simply an odor?",
    "title": "Menthol also stimulates the common chemical sense.",
    "text": "Nerve endings on moist surfaces help detect chemical irritation and cooling sensations, alongside ordinary smell and taste.",
    "explore": "Compare identifying a scent with sensing its cooling or irritating quality.",
    "why": "One experience can combine several sensory channels. Naming the channels helps explain why smell alone is not the whole story.",
    "category": "Human body",
    "sourceKey": "smell",
    "related": [
      "smell-scratch-test",
      "balance-team"
    ]
  },
  {
    "id": "earwax-trap",
    "question": "Is earwax simply useless dirt?",
    "title": "Earwax is a normal secretion that helps trap foreign material.",
    "text": "It catches particles such as dirt and hair, contributing to the ear’s protective system.",
    "explore": "Compare unwanted debris with a material designed to catch debris.",
    "why": "A substance’s appearance does not tell us its role. Asking what it does can turn an everyday assumption into a more useful explanation.",
    "category": "Human body",
    "sourceKey": "earcare",
    "related": [
      "ear-self-cleaning",
      "balance-team"
    ]
  },
  {
    "id": "clock-beyond-animals",
    "question": "Can a plant have a daily biological rhythm?",
    "title": "Circadian rhythms occur in plants and microorganisms as well as animals.",
    "text": "Daily timing is not restricted to organisms that sleep the way humans do.",
    "explore": "Imagine a timed activity for an organism without a human-style bedtime.",
    "why": "A familiar human behavior is not the definition of the underlying process. Broadening the examples helps reveal a more general biological pattern.",
    "category": "Human body",
    "sourceKey": "clock",
    "related": [
      "clock-feedback-protein",
      "balance-team"
    ]
  },
  {
    "id": "soap-hard-water",
    "question": "Why can hard water leave soap scum?",
    "title": "Calcium and magnesium can form insoluble compounds with soap.",
    "text": "These dissolved ions can react with soap to produce material that does not stay dissolved in wash water.",
    "explore": "Compare a dissolved substance with a suspended particle in a diagram.",
    "why": "Water chemistry changes the behavior of the same cleaning ingredient. A familiar residue becomes a clue about the invisible contents of water.",
    "category": "Everyday science",
    "sourceKey": "hardwater",
    "related": [
      "soap-two-ends",
      "water-four-degrees"
    ]
  },
  {
    "id": "fridge-feedback",
    "question": "Why does a fridge compressor switch off before the food warms up?",
    "title": "A temperature sensor controls the cooling cycle.",
    "text": "When the interior is cold enough the controller stops the compressor, and it restarts cooling when more heat is detected.",
    "explore": "Draw a loop connecting temperature, sensor, controller, and compressor.",
    "why": "Feedback makes a machine respond to changing conditions. This small household example is a practical introduction to automatic control.",
    "category": "Inventions",
    "sourceKey": "fridge",
    "related": [
      "fridge-heat-pump",
      "first-transistor"
    ]
  },
  {
    "id": "wool-water",
    "question": "How can wool repel droplets yet take up moisture?",
    "title": "Wool’s outside and inside interact differently with water.",
    "text": "Its outer surface is relatively water-repellent, while the interior can absorb water vapor. This does not make a garment waterproof.",
    "explore": "Draw separate arrows for liquid water and water vapor.",
    "why": "A single label such as water-repellent can hide different processes. Distinguishing a surface from an interior makes material claims easier to interpret.",
    "category": "Everyday science",
    "sourceKey": "wool",
    "related": [
      "wool-keratin",
      "water-four-degrees"
    ]
  },
  {
    "id": "cotton-twist",
    "question": "Why does a dried cotton fibre look like a twisted ribbon?",
    "title": "The fibre collapses and twists when it dries.",
    "text": "After growth ends, the once tube-like structure loses its living contents and takes on its familiar convoluted form.",
    "explore": "Turn a paper tube into a flattened ribbon. How does its shape change?",
    "why": "The final material records its history. A fibre’s shape can tell a story about how it grew, dried, and became something we can spin.",
    "category": "Nature",
    "sourceKey": "cotton",
    "related": [
      "cotton-single-cell",
      "octopus-taste"
    ]
  },
  {
    "id": "glass-borosilicate",
    "question": "Why is borosilicate glass useful when temperatures change?",
    "title": "Its relatively low thermal expansion helps it tolerate temperature changes.",
    "text": "Adding boron to a silica-based glass changes its properties. Thermal-shock resistance is not a guarantee against every breakage.",
    "explore": "Compare two materials that expand by different amounts when heated.",
    "why": "A material name can encode a design choice. Understanding expansion helps explain why different glass compositions suit different jobs.",
    "category": "Everyday science",
    "sourceKey": "boroglass",
    "related": [
      "glass-quartz",
      "water-four-degrees"
    ]
  },
  {
    "id": "stainless-cold-work",
    "question": "Can shaping a stainless-steel sink change its magnetic response?",
    "title": "Cold working can make some austenitic stainless steel more magnetic.",
    "text": "Forming the bowl can change its microstructure, so its magnetic response may differ from a flatter part of the same sink.",
    "explore": "Compare a material’s composition with the history of how it was shaped.",
    "why": "A finished object carries the effects of manufacturing. The same starting alloy can have different local properties after different amounts of deformation.",
    "category": "Everyday science",
    "sourceKey": "steelmagnet",
    "related": [
      "stainless-film",
      "water-four-degrees"
    ]
  },
  {
    "id": "yogurt-concentrated",
    "question": "Why can straining make yogurt thicker?",
    "title": "Straining removes part of yogurt’s watery phase.",
    "text": "Concentrated styles can be made by removing water and soluble components after fermentation, although manufacturers also use other approaches.",
    "explore": "Compare adding solids with removing liquid. Could both change a mixture’s concentration?",
    "why": "There can be more than one route to a similar texture. Thinking in terms of concentration helps explain a process without assuming every product is made identically.",
    "category": "Food & Drink",
    "sourceKey": "yogurt",
    "related": [
      "yogurt-acid",
      "cacao-seeds"
    ]
  },
  {
    "id": "tea-oxidation",
    "question": "What important processing difference separates green tea from black tea?",
    "title": "Green-tea processing limits leaf oxidation; black-tea processing allows it.",
    "text": "Heating green-tea leaves early helps stop the enzyme-driven changes that contribute to black tea’s darker character.",
    "explore": "Draw two processing paths beginning with similar fresh leaves.",
    "why": "A process can be defined by the reaction it allows or prevents. Tea offers a simple way to think about controlling chemical change.",
    "category": "Food & Drink",
    "sourceKey": "teaprocess",
    "related": [
      "tea-one-plant",
      "cacao-seeds"
    ]
  },
  {
    "id": "chocolate-couverture",
    "question": "Why do confectioners choose couverture for coating?",
    "title": "Couverture has a relatively high cocoa-butter content.",
    "text": "It flows readily when prepared properly, making it useful for coating and molding chocolate creations.",
    "explore": "Compare how two liquids of different flow behavior might coat the same object.",
    "why": "Choosing a material includes choosing how it behaves during making. The easiest ingredient to shape may differ from the one we would choose only by taste.",
    "category": "Food & Drink",
    "sourceKey": "chocolate",
    "related": [
      "chocolate-snap",
      "cacao-seeds"
    ]
  },
  {
    "id": "honey-crystals",
    "question": "Does honey turning grainy automatically mean it has spoiled?",
    "title": "Crystallization is a natural physical change in honey.",
    "text": "Its sugars can form crystals; composition and storage conditions influence how quickly this happens. Crystals alone do not diagnose spoilage.",
    "explore": "Compare a change in physical structure with a change caused by microbial growth.",
    "why": "Appearance is evidence, but it needs interpretation. Distinguishing crystallization from spoilage helps avoid treating every visible change as the same process.",
    "category": "Food & Drink",
    "sourceKey": "honeycrystal",
    "related": [
      "honey-crop",
      "cacao-seeds"
    ]
  },
  {
    "id": "fungi-spore-rides",
    "question": "What gives fungal spores a ride to a new place?",
    "title": "Wind, water, and animals can transport spores.",
    "text": "Different spore-bearing forms provide different ways for fungi to spread beyond their current location.",
    "explore": "Invent three transport routes for a tiny object that cannot walk.",
    "why": "Dispersal is a transport problem as well as a biological one. Comparing routes is a useful way to connect natural history with design thinking.",
    "category": "Nature",
    "sourceKey": "fungi",
    "related": [
      "fungi-fruiting",
      "octopus-taste"
    ]
  },
  {
    "id": "cheese-ripening",
    "question": "Why can a cheese keep changing after it has taken shape?",
    "title": "Microbial activity helps develop flavor and texture during ripening.",
    "text": "Some cheeses ripen mainly through activity within the body of the cheese, rather than only at the surface.",
    "explore": "Draw a timeline that continues after shaping and packaging.",
    "why": "Making a material does not always end when it gains its final shape. Time and controlled conditions can remain part of the production process.",
    "category": "Food & Drink",
    "sourceKey": "cheese",
    "related": [
      "cheese-rennet",
      "cacao-seeds"
    ]
  },
  {
    "id": "pigeon-color-forms",
    "question": "Are the differently patterned city pigeons always different species?",
    "title": "Rock pigeons come in many color and pattern forms.",
    "text": "Blue-bar, checker, pied, and other appearances can occur within the same species.",
    "explore": "Sort imaginary birds first by color and then by species. Would the groups be identical?",
    "why": "Visible variation does not automatically define a species boundary. Everyday observations can introduce a more careful approach to biological classification.",
    "category": "Nature",
    "sourceKey": "pigeonforms",
    "related": [
      "pigeon-crop-milk",
      "octopus-taste"
    ]
  },
  {
    "id": "lichen-monitor",
    "question": "Why do scientists pay attention to lichens when studying air quality?",
    "title": "Many lichens are sensitive to air pollution.",
    "text": "Their responses make lichen communities useful environmental indicators, interpreted alongside other measurements.",
    "explore": "What could a living indicator reveal that a single reading might miss?",
    "why": "Living things can provide clues about their surroundings. An indicator is most useful when we understand both its sensitivity and its limitations.",
    "category": "Nature",
    "sourceKey": "lichen",
    "related": [
      "lichen-partners",
      "octopus-taste"
    ]
  },
  {
    "id": "city-waste-heat",
    "question": "Why can cooling a room add heat to the street?",
    "title": "Air conditioners release heat into the outdoor environment.",
    "text": "Vehicles, buildings, and industrial activity also contribute waste heat that can add to an urban heat island.",
    "explore": "Draw a boundary around a room and another around the whole street.",
    "why": "A solution within one boundary can have effects outside it. Following those effects is an important habit in systems thinking.",
    "category": "Earth & Weather",
    "sourceKey": "heat",
    "related": [
      "city-night-heat",
      "fog-ground"
    ]
  },
  {
    "id": "water-return-sludge",
    "question": "Why would a treatment plant send some settled material backward?",
    "title": "Activated-sludge systems return some microbial biomass to the aeration tank.",
    "text": "The returned organisms help process newly arriving wastewater, while excess biomass is removed.",
    "explore": "Draw a return loop alongside the main one-way flow.",
    "why": "A loop can preserve a useful working population rather than start over each time. Tracing it explains a process that might otherwise look wasteful.",
    "category": "Inventions",
    "sourceKey": "wastewater",
    "related": [
      "water-screening",
      "first-transistor"
    ]
  },
  {
    "id": "rain-garden-habitat",
    "question": "Can a runoff-management feature also support wildlife?",
    "title": "Rain gardens can provide food and shelter for birds and insects.",
    "text": "Alongside reducing runoff and helping filter pollutants, planted areas can add habitat.",
    "explore": "Design a feature with two goals and identify where those goals support each other.",
    "why": "Infrastructure can do more than one job. Asking about additional benefits can lead to designs that serve both people and other living things.",
    "category": "Earth & Weather",
    "sourceKey": "raingarden",
    "related": [
      "runoff-hard-surfaces",
      "fog-ground"
    ]
  },
  {
    "id": "dandelion-air-vortex",
    "question": "What unusual airflow forms above a flying dandelion pappus?",
    "title": "A separated vortex ring forms above the bristled structure.",
    "text": "Experiments found this stable ring of circulating air detached from the pappus, helping explain the aerodynamic effect of its porous design.",
    "explore": "Sketch an airflow pattern rather than only the object moving through it.",
    "why": "The surrounding air is part of the system. Studying the flow can explain behavior that the object’s shape alone does not make obvious.",
    "category": "Nature",
    "sourceKey": "dandelionvortex",
    "related": [
      "dandelion-bristles",
      "octopus-taste"
    ]
  },
  {
    "id": "lung-diaphragm",
    "question": "Which muscle does most of the work of ordinary breathing?",
    "title": "The diaphragm is the main breathing muscle.",
    "text": "Its movement changes the chest cavity’s volume, helping air move into and out of the lungs.",
    "explore": "Compare changing a chamber’s volume with pushing air directly into it.",
    "why": "Movement can be produced indirectly by changing a surrounding space. This is a useful mechanical idea hiding inside an automatic everyday action.",
    "category": "Human body",
    "sourceKey": "breathing",
    "related": [
      "lung-asymmetry",
      "balance-team"
    ]
  },
  {
    "id": "blood-kidney-signal",
    "question": "Which organ sends a major signal to make more red blood cells?",
    "title": "The kidneys produce most of the hormone erythropoietin.",
    "text": "This signal helps regulate red-blood-cell production in bone marrow.",
    "explore": "Connect a sensor-like organ, a chemical message, and a production site in a diagram.",
    "why": "A body system can coordinate work across different locations. The messenger matters as much as the place where the final product is made.",
    "category": "Human body",
    "sourceKey": "blood",
    "related": [
      "blood-no-nucleus",
      "balance-team"
    ]
  },
  {
    "id": "bone-blood-factory",
    "question": "What manufacturing job takes place inside bones?",
    "title": "Bone marrow makes blood cells.",
    "text": "The skeleton is therefore more than a support frame: it also houses tissue involved in producing circulating cells.",
    "explore": "Add an internal production space to a drawing of a support structure.",
    "why": "A structure can host a second function within its protected space. This broadens the way we think about the jobs a body part performs.",
    "category": "Human body",
    "sourceKey": "bone",
    "related": [
      "bone-renovation",
      "balance-team"
    ]
  },
  {
    "id": "muscle-still-working",
    "question": "Do your muscles stop working when you sit still?",
    "title": "Muscles continue doing jobs even when you are not visibly moving.",
    "text": "Posture, breathing, blood circulation, and digestion involve activity beyond deliberate limb movement.",
    "explore": "List the actions needed to stay alive while reading a quiet page.",
    "why": "Visible motion is only part of a system’s work. Noticing the background tasks helps explain why stillness is not the same as inactivity everywhere.",
    "category": "Human body",
    "sourceKey": "muscle",
    "related": [
      "muscle-tendon-link",
      "balance-team"
    ]
  },
  {
    "id": "smell-scratch-test",
    "question": "How can a paper booklet help measure someone’s sense of smell?",
    "title": "Some smell tests use tiny odor-filled beads on a page.",
    "text": "Scratching releases an odor that the person tries to identify, turning an elusive sensation into a repeatable task.",
    "explore": "Design a fair identification task without showing the answer in advance.",
    "why": "Measurement needs a defined procedure. Even a personal sensory experience can be studied with carefully controlled questions.",
    "category": "Human body",
    "sourceKey": "smell",
    "related": [
      "smell-high-patch",
      "balance-team"
    ]
  },
  {
    "id": "ear-self-cleaning",
    "question": "Does the inside of a healthy ear need routine scraping clean?",
    "title": "The ear canal normally cleans itself.",
    "text": "The WHO advises against inserting cotton buds or other objects, which can push wax farther in and damage the ear.",
    "explore": "Describe a self-maintaining system without turning the thought experiment into a cleaning attempt.",
    "why": "Intervening is not always an improvement. Understanding a system’s normal maintenance process is part of knowing how it works.",
    "category": "Human body",
    "sourceKey": "earcare",
    "related": [
      "hearing-arrival-time",
      "balance-team"
    ]
  },
  {
    "id": "clock-feedback-protein",
    "question": "How can a molecule help keep biological time?",
    "title": "Clock proteins can participate in feedback loops that regulate their own production.",
    "text": "Research in fruit flies helped reveal how producing and breaking down such proteins can generate repeating cycles.",
    "explore": "Sketch a process whose output eventually slows its own input.",
    "why": "A repeating cycle can emerge from interactions rather than a tiny mechanical clock. Feedback is a bridge between biological timing and engineering control.",
    "category": "Human body",
    "sourceKey": "clock",
    "related": [
      "clock-many-organs",
      "balance-team"
    ]
  }
];

export const yourWorldFacts = drafts.map(draft => ({ ...draft, collection: 'your-world' as const, source: yourWorldSources[draft.sourceKey].label, url: yourWorldSources[draft.sourceKey].url }));
