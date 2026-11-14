import type {Fact} from './facts';

// V2.2 append-only discoveries. See docs/curiosity-v22-source-review.md.
export const natureSolutionSources = {
  "penguin": {
    "label": "San Diego Zoo Wildlife Alliance · African penguin",
    "url": "https://animals.sandiegozoo.org/animals/african-penguin",
    "reviewedOn": "2026-11-14"
  },
  "hummingbird": {
    "label": "Smithsonian National Zoo · Hummingbirds",
    "url": "https://nationalzoo.si.edu/migratory-birds/hummingbirds",
    "reviewedOn": "2026-11-14"
  },
  "hornbill": {
    "label": "San Diego Zoo Wildlife Alliance · Hornbill",
    "url": "https://animals.sandiegozoo.org/animals/hornbill",
    "reviewedOn": "2026-11-14"
  },
  "toucan": {
    "label": "San Diego Zoo Wildlife Alliance · Toucan",
    "url": "https://animals.sandiegozoo.org/animals/toucan",
    "reviewedOn": "2026-11-14"
  },
  "pelican": {
    "label": "San Diego Zoo Wildlife Alliance · Pelican",
    "url": "https://animals.sandiegozoo.org/animals/pelican",
    "reviewedOn": "2026-11-14"
  },
  "porcupine": {
    "label": "San Diego Zoo Wildlife Alliance · Porcupine",
    "url": "https://animals.sandiegozoo.org/animals/porcupine",
    "reviewedOn": "2026-11-14"
  },
  "hedgehog": {
    "label": "San Diego Zoo Wildlife Alliance · Hedgehog",
    "url": "https://animals.sandiegozoo.org/animals/hedgehog",
    "reviewedOn": "2026-11-14"
  },
  "chameleon": {
    "label": "San Diego Zoo Wildlife Alliance · Chameleon",
    "url": "https://animals.sandiegozoo.org/animals/chameleon",
    "reviewedOn": "2026-11-14"
  },
  "kangaroo": {
    "label": "San Diego Zoo Wildlife Alliance · Kangaroo and wallaby",
    "url": "https://animals.sandiegozoo.org/animals/kangaroo-and-wallaby",
    "reviewedOn": "2026-11-14"
  },
  "lemur": {
    "label": "San Diego Zoo Wildlife Alliance · Lemur",
    "url": "https://animals.sandiegozoo.org/animals/lemur",
    "reviewedOn": "2026-11-14"
  },
  "meerkat": {
    "label": "San Diego Zoo Wildlife Alliance · Meerkat",
    "url": "https://animals.sandiegozoo.org/animals/meerkat",
    "reviewedOn": "2026-11-14"
  },
  "fennec": {
    "label": "San Diego Zoo Wildlife Alliance · Fennec fox",
    "url": "https://animals.sandiegozoo.org/animals/fennec-fox",
    "reviewedOn": "2026-11-14"
  },
  "cheetah": {
    "label": "San Diego Zoo Wildlife Alliance · Cheetah",
    "url": "https://animals.sandiegozoo.org/animals/cheetah",
    "reviewedOn": "2026-11-14"
  },
  "hyena": {
    "label": "San Diego Zoo Wildlife Alliance · Spotted hyena",
    "url": "https://animals.sandiegozoo.org/animals/spotted-hyena",
    "reviewedOn": "2026-11-14"
  },
  "hyrax": {
    "label": "San Diego Zoo Wildlife Alliance · Rock hyrax",
    "url": "https://animals.sandiegozoo.org/animals/rock-hyrax",
    "reviewedOn": "2026-11-14"
  },
  "armadillo": {
    "label": "San Diego Zoo Wildlife Alliance · Armadillo",
    "url": "https://animals.sandiegozoo.org/animals/armadillo",
    "reviewedOn": "2026-11-14"
  },
  "manatee": {
    "label": "San Diego Zoo Wildlife Alliance · Manatee",
    "url": "https://animals.sandiegozoo.org/animals/manatee",
    "reviewedOn": "2026-11-14"
  },
  "cactus": {
    "label": "US Fish & Wildlife Service · Get to know your cacti",
    "url": "https://www.fws.gov/story/get-know-your-cacti",
    "reviewedOn": "2026-11-14"
  },
  "bamboo": {
    "label": "San Diego Botanic Garden · Bamboo garden",
    "url": "https://sdbg.org/bamboo-garden/",
    "reviewedOn": "2026-11-14"
  },
  "bromeliad": {
    "label": "University of Florida IFAS · Florida’s native bromeliads",
    "url": "https://edis.ifas.ufl.edu/publication/UW205/pdf",
    "reviewedOn": "2026-11-14"
  },
  "baobab": {
    "label": "San Diego Zoo Wildlife Alliance · Baobab",
    "url": "https://animals.sandiegozoo.org/animals/baobab",
    "reviewedOn": "2026-11-14"
  },
  "mangrove": {
    "label": "NOAA Ocean Service · Mangrove forests",
    "url": "https://oceanservice.noaa.gov/facts/mangroves.html",
    "reviewedOn": "2026-11-14"
  },
  "kelp": {
    "label": "US National Park Service · Kelp forests",
    "url": "https://home.nps.gov/glba/learn/nature/kelp-forest.htm",
    "reviewedOn": "2026-11-14"
  },
  "seagrass": {
    "label": "Florida Museum · Seagrasses",
    "url": "https://www.floridamuseum.ufl.edu/southflorida/habitats/seagrasses/",
    "reviewedOn": "2026-11-14"
  },
  "cycad": {
    "label": "Botanic Gardens of Sydney · Cycads",
    "url": "https://www.botanicgardens.org.au/our-science/our-collections/plant-families/cycads",
    "reviewedOn": "2026-11-14"
  }
} as const;
type Draft = Omit<Fact,'source'|'url'|'collection'> & {sourceKey:keyof typeof natureSolutionSources;why:string;related:[string,string]};
const drafts:Draft[] = [
  {
    "id": "penguin-eye-radiator",
    "question": "How can an African penguin shed heat through its face?",
    "title": "Bare patches above its eyes help cool circulating blood.",
    "text": "More blood flows through these exposed areas when the bird gets hot.",
    "explore": "Compare an insulated surface with an exposed heat exchanger.",
    "why": "Insulation is useful in cold water but creates another challenge on warm land. Different surfaces can serve opposite thermal jobs.",
    "category": "Nature",
    "sourceKey": "penguin",
    "related": [
      "penguin-waterproof-coat",
      "flamingo-filter"
    ]
  },
  {
    "id": "hummingbird-upstroke",
    "question": "Is a hummingbird’s upstroke just preparation for the next downstroke?",
    "title": "Both halves of its wingbeat can provide power.",
    "text": "The two-way stroke contributes to its remarkable control in flight.",
    "explore": "Trace a full wingbeat rather than only the downward movement.",
    "why": "A repeated cycle can perform useful work in more than one phase. Studying the return stroke reveals part of the mechanism.",
    "category": "Nature",
    "sourceKey": "hummingbird",
    "related": [
      "hummingbird-torpor",
      "flamingo-filter"
    ]
  },
  {
    "id": "hornbill-sealed-home",
    "question": "Why can a nesting hornbill appear walled into a tree?",
    "title": "In many species, the female seals a cavity entrance around herself.",
    "text": "A narrow opening remains while she incubates and tends the young.",
    "explore": "Draw a shelter that limits entry while keeping a service opening.",
    "why": "Protection and access can pull a design in opposite directions. A small controlled opening is one way to accommodate both.",
    "category": "Nature",
    "sourceKey": "hornbill",
    "related": [
      "hornbill-mongoose-team",
      "flamingo-filter"
    ]
  },
  {
    "id": "toucan-light-beak",
    "question": "How can a toucan carry such an oversized bill?",
    "title": "A lightweight internal network supports the large bill.",
    "text": "Its keratin covering and bony framework avoid making it a solid heavy block.",
    "explore": "Sketch an outer shell with an internal supporting framework.",
    "why": "Size alone does not reveal mass. Internal structure can make a large component surprisingly light.",
    "category": "Nature",
    "sourceKey": "toucan",
    "related": [
      "toucan-opposed-toes",
      "flamingo-filter"
    ]
  },
  {
    "id": "pelican-draining-net",
    "question": "Is a pelican’s pouch mainly a bag for storing fish all day?",
    "title": "It scoops prey and drains water before swallowing.",
    "text": "The bird tips its head to empty water from the catch.",
    "explore": "Separate collection, drainage, and swallowing into three steps.",
    "why": "A container can be part of a process rather than long-term storage. Following the sequence explains its role more clearly.",
    "category": "Nature",
    "sourceKey": "pelican",
    "related": [
      "pelican-pouch-cooling",
      "flamingo-filter"
    ]
  },
  {
    "id": "porcupine-not-projectiles",
    "question": "Can a porcupine fire its quills like arrows?",
    "title": "Quills are modified hairs, not launched weapons.",
    "text": "They can detach on contact, but the animal cannot shoot them.",
    "explore": "Separate a detachable defense from a projectile mechanism.",
    "why": "A dramatic myth can obscure an effective real mechanism. Contact and detachment explain the defense without imaginary propulsion.",
    "category": "Nature",
    "sourceKey": "porcupine",
    "related": [
      "porcupine-tail-rattle",
      "flamingo-filter"
    ]
  },
  {
    "id": "hedgehog-belly-shield",
    "question": "How does a hedgehog protect the soft parts beneath its spines?",
    "title": "It tucks its head and limbs into a tightly curled ball.",
    "text": "Muscles and loose skin help cover the vulnerable belly.",
    "explore": "Compare a fixed outer shield with a body that changes its exposure.",
    "why": "Protection depends on posture as well as material. Changing which surfaces face outward can be as important as their toughness.",
    "category": "Nature",
    "sourceKey": "hedgehog",
    "related": [
      "hedgehog-not-rodent",
      "flamingo-filter"
    ]
  },
  {
    "id": "chameleon-two-views",
    "question": "Can a chameleon look at two different objects at once?",
    "title": "Its eyes can move and focus independently.",
    "text": "They can then align on the same prey item.",
    "explore": "Compare scanning a wide area with concentrating on one target.",
    "why": "Different viewing arrangements suit different tasks. A sensing system can shift from broad monitoring to directed attention.",
    "category": "Nature",
    "sourceKey": "chameleon",
    "related": [
      "chameleon-grasp-groups",
      "flamingo-filter"
    ]
  },
  {
    "id": "kangaroo-two-milks",
    "question": "Can a kangaroo mother feed two young at different stages?",
    "title": "She can produce different milk for an older young and a newborn.",
    "text": "The two feeding demands can be met at the same time.",
    "explore": "Compare one uniform supply with different outputs for different users.",
    "why": "The needs of growing young change with development. A supply system can respond to more than one stage at once.",
    "category": "Nature",
    "sourceKey": "kangaroo",
    "related": [
      "kangaroo-tree-backwards",
      "flamingo-filter"
    ]
  },
  {
    "id": "lemur-toothcomb",
    "question": "Can teeth serve as a grooming tool?",
    "title": "Many lemurs have closely spaced teeth forming a toothcomb.",
    "text": "They also use a specialized grooming claw.",
    "explore": "Draw a comb made from parts usually associated with another job.",
    "why": "A familiar body part can have a less familiar use. Grooming reveals another function beyond feeding.",
    "category": "Nature",
    "sourceKey": "lemur",
    "related": [
      "ayeaye-probe",
      "flamingo-filter"
    ]
  },
  {
    "id": "meerkat-watchman",
    "question": "How can meerkats feed while keeping watch for predators?",
    "title": "A group member can stand guard while others forage.",
    "text": "The sentry uses calls to signal safety or danger.",
    "explore": "Compare every individual watching with a division of attention.",
    "why": "Sharing a task can change what each group member is free to do. Coordination links individual effort with group benefit.",
    "category": "Nature",
    "sourceKey": "meerkat",
    "related": [
      "meerkat-sand-seals",
      "flamingo-filter"
    ]
  },
  {
    "id": "fennec-ear-exchanger",
    "question": "Do a fennec fox’s giant ears only help it hear?",
    "title": "They also release excess body heat.",
    "text": "The same large surface helps locate prey and manage desert warmth.",
    "explore": "Give one structure a sensory role and a thermal role.",
    "why": "A body part can solve more than one problem. Understanding both jobs gives a fuller explanation of its unusual size.",
    "category": "Nature",
    "sourceKey": "fennec",
    "related": [
      "fennec-furry-soles",
      "flamingo-filter"
    ]
  },
  {
    "id": "cheetah-flexible-spine",
    "question": "What lets a cheetah stretch its stride so far?",
    "title": "Its flexible spine contributes to the reach of its limbs.",
    "text": "Running depends on motion through the trunk as well as the legs.",
    "explore": "Draw the back flexing across successive stages of a stride.",
    "why": "A moving system includes its connections. Treating the trunk as rigid would miss part of how the stride is produced.",
    "category": "Nature",
    "sourceKey": "cheetah",
    "related": [
      "cheetah-traction-claws",
      "flamingo-filter"
    ]
  },
  {
    "id": "hyena-giggle-message",
    "question": "Does a spotted hyena’s laugh mean it finds something funny?",
    "title": "The giggle can accompany nervous excitement or submission.",
    "text": "Its human-like sound has a different behavioral context.",
    "explore": "Separate the sound of a signal from its human interpretation.",
    "why": "Resemblance to human behavior can be misleading. Understanding the circumstances is part of interpreting an animal’s communication.",
    "category": "Nature",
    "sourceKey": "hyena",
    "related": [
      "hyena-bone-meal",
      "flamingo-filter"
    ]
  },
  {
    "id": "hyrax-rock-grip",
    "question": "How does a rock hyrax keep its footing on smooth rock?",
    "title": "Moist, rubbery footpads help it cling to surfaces.",
    "text": "The pads change shape to aid contact while climbing.",
    "explore": "Compare hard claws with a compliant contact pad.",
    "why": "Grip can depend on deformable surfaces as well as sharp points. The contact patch is part of the mechanism.",
    "category": "Nature",
    "sourceKey": "hyrax",
    "related": [
      "hyrax-body-feelers",
      "flamingo-filter"
    ]
  },
  {
    "id": "armadillo-flexible-armor",
    "question": "How can an armadillo bend inside its armor?",
    "title": "Softer skin joins the hardened bands.",
    "text": "The segmented covering permits movement rather than forming one rigid shell.",
    "explore": "Compare a solid plate with several linked plates.",
    "why": "Protection and flexibility can be combined through arrangement. The joints are as important as the hard sections.",
    "category": "Nature",
    "sourceKey": "armadillo",
    "related": [
      "armadillo-ball-exception",
      "flamingo-filter"
    ]
  },
  {
    "id": "manatee-marching-teeth",
    "question": "How does a manatee keep replacing worn chewing teeth?",
    "title": "New molars develop at the back and move forward.",
    "text": "Older teeth eventually leave the front of the row.",
    "explore": "Draw a conveyor-like replacement sequence through a jaw.",
    "why": "Wear can be managed through renewal rather than prevention alone. The lifetime process explains more than one static tooth.",
    "category": "Nature",
    "sourceKey": "manatee",
    "related": [
      "manatee-flipper-hand",
      "flamingo-filter"
    ]
  },
  {
    "id": "cactus-spine-leaves",
    "question": "Where did a cactus’s spines come from?",
    "title": "They are modified leaves rather than thorns.",
    "text": "Spines can provide protection and shade around the stem.",
    "explore": "Compare a broad leaf with a much narrower modified form.",
    "why": "A familiar structure can take on a new shape and role. Naming its origin helps explain the change.",
    "category": "Nature",
    "sourceKey": "cactus",
    "related": [
      "cactus-green-stem",
      "flamingo-filter"
    ]
  },
  {
    "id": "bamboo-giant-grass",
    "question": "Can a grass form a forest that looks like a stand of trees?",
    "title": "Bamboo belongs to the grass family.",
    "text": "Some species grow to tree-like heights without being trees.",
    "explore": "Separate a growth form from a plant’s botanical family.",
    "why": "Size and appearance do not determine classification. A familiar landscape shape can be produced by a different lineage.",
    "category": "Nature",
    "sourceKey": "bamboo",
    "related": [
      "bamboo-culm-year",
      "flamingo-filter"
    ]
  },
  {
    "id": "bromeliad-leaf-drink",
    "question": "Can an air plant absorb water through its leaves?",
    "title": "Specialized leaf structures called trichomes absorb water and minerals.",
    "text": "This is important for many epiphytic bromeliads.",
    "explore": "Move the collection surface from underground roots to exposed leaves.",
    "why": "Resources can enter through different interfaces. A change in where a plant lives can change where uptake happens.",
    "category": "Nature",
    "sourceKey": "bromeliad",
    "related": [
      "bromeliad-leaf-tank",
      "flamingo-filter"
    ]
  },
  {
    "id": "baobab-trunk-store",
    "question": "Why can a baobab have such a swollen trunk?",
    "title": "Its thick, fleshy trunk stores water.",
    "text": "The tree’s form suits regions with long dry seasons.",
    "explore": "Compare support and water storage within one structure.",
    "why": "An unusually shaped trunk is part of a survival system. Its role is broader than holding branches upright.",
    "category": "Nature",
    "sourceKey": "baobab",
    "related": [
      "baobab-dry-season",
      "flamingo-filter"
    ]
  },
  {
    "id": "mangrove-tidal-stilts",
    "question": "How can a tree stand where tides repeatedly flood the ground?",
    "title": "Many mangroves have tangled prop-root systems.",
    "text": "The roots support life in a changing intertidal environment.",
    "explore": "Draw a support system spanning different water levels.",
    "why": "A living structure can accommodate a changing boundary. The tide is part of the setting the roots must work within.",
    "category": "Nature",
    "sourceKey": "mangrove",
    "related": [
      "mangrove-sediment-trap",
      "flamingo-filter"
    ]
  },
  {
    "id": "kelp-anchor-not-root",
    "question": "Are a kelp’s root-like holdfasts feeding roots?",
    "title": "They anchor the kelp without absorbing nutrients like plant roots.",
    "text": "Kelp is a large brown alga, not an underwater tree.",
    "explore": "Separate attachment from nutrient uptake on a diagram.",
    "why": "A similar outline can hide a different function. Naming the job prevents a land-plant analogy from becoming misleading.",
    "category": "Nature",
    "sourceKey": "kelp",
    "related": [
      "kelp-gas-buoys",
      "flamingo-filter"
    ]
  },
  {
    "id": "seagrass-flowers",
    "question": "Can a submerged meadow contain flowering plants?",
    "title": "Seagrasses produce flowers and seeds.",
    "text": "They differ from the seaweeds that may share their environment.",
    "explore": "Compare two underwater organisms by how they reproduce.",
    "why": "A shared habitat does not make organisms the same kind of life. Reproduction reveals distinctions that a quick glance misses.",
    "category": "Nature",
    "sourceKey": "seagrass",
    "related": [
      "seagrass-root-anchors",
      "flamingo-filter"
    ]
  },
  {
    "id": "cycad-not-palm",
    "question": "Is a palm-like cycad actually a palm?",
    "title": "Cycads are non-flowering seed plants with cones.",
    "text": "Palms instead belong to the flowering plants.",
    "explore": "Separate a crown’s silhouette from the plant’s reproductive structures.",
    "why": "A shared shape can conceal different histories and mechanisms. The most conspicuous feature is not always the defining one.",
    "category": "Nature",
    "sourceKey": "cycad",
    "related": [
      "cycad-root-partners",
      "flamingo-filter"
    ]
  },
  {
    "id": "penguin-waterproof-coat",
    "question": "What keeps an African penguin warm in cold currents?",
    "title": "Dense, water-resistant feathers insulate its body.",
    "text": "This penguin lives on rocky African coasts rather than permanent snow and ice.",
    "explore": "Match a coat’s working conditions to both land and water.",
    "why": "An animal’s familiar image can hide its actual environment. Looking at the conditions explains the function of its covering.",
    "category": "Nature",
    "sourceKey": "penguin",
    "related": [
      "penguin-voice-identity",
      "anteater-fists"
    ]
  },
  {
    "id": "hummingbird-torpor",
    "question": "How can a tiny hummingbird reduce its overnight energy needs?",
    "title": "It can enter torpor, lowering body temperature and metabolism.",
    "text": "The deep, sleep-like state reduces demand when normal activity cannot be maintained.",
    "explore": "Compare staying constantly active with temporarily lowering demand.",
    "why": "A limited energy supply can be managed by changing consumption. Survival can depend on a controlled pause as well as efficient movement.",
    "category": "Nature",
    "sourceKey": "hummingbird",
    "related": [
      "hummingbird-throat-light",
      "anteater-fists"
    ]
  },
  {
    "id": "hornbill-mongoose-team",
    "question": "What might a hornbill gain by following a mongoose?",
    "title": "Eastern yellow-billed hornbills catch insects disturbed by dwarf mongooses.",
    "text": "The mammals also benefit from the birds’ watchfulness for danger.",
    "explore": "Draw two partners benefiting from different parts of the same activity.",
    "why": "Cooperation need not mean identical jobs. Complementary abilities can make a shared activity useful to both participants.",
    "category": "Nature",
    "sourceKey": "hornbill",
    "related": [
      "hornbill-feather-eyelash",
      "anteater-fists"
    ]
  },
  {
    "id": "toucan-opposed-toes",
    "question": "What arrangement helps a toucan grip branches?",
    "title": "Two toes face forward and two face backward.",
    "text": "The opposed arrangement helps provide stability among branches.",
    "explore": "Compare feet that rest on a surface with feet that grasp it.",
    "why": "The direction of contact matters. Opposing supports can suit a task that a simple forward-facing arrangement would handle differently.",
    "category": "Nature",
    "sourceKey": "toucan",
    "related": [
      "toucan-feather-tongue",
      "anteater-fists"
    ]
  },
  {
    "id": "pelican-pouch-cooling",
    "question": "Can a pelican’s fishing pouch help on a hot day?",
    "title": "Moving the open pouch helps the bird cool down.",
    "text": "The feeding structure also contributes to heat management.",
    "explore": "Give one body part two different jobs on a diagram.",
    "why": "A structure may have several uses under different conditions. Its best-known purpose need not be its only important function.",
    "category": "Nature",
    "sourceKey": "pelican",
    "related": [
      "pelican-four-webbed",
      "anteater-fists"
    ]
  },
  {
    "id": "porcupine-tail-rattle",
    "question": "Can a porcupine make a warning with hollow quills?",
    "title": "Crested porcupines rattle specialized quills near the tail.",
    "text": "Sound warns a potential threat before physical contact.",
    "explore": "Compare a warning signal with the defense it advertises.",
    "why": "A defense can include communication before confrontation. Different parts of the system operate at different distances.",
    "category": "Nature",
    "sourceKey": "porcupine",
    "related": [
      "porcupine-barbed-tip",
      "anteater-fists"
    ]
  },
  {
    "id": "hedgehog-not-rodent",
    "question": "Is a hedgehog simply a small porcupine?",
    "title": "Its closer relatives include shrews and moles.",
    "text": "Similar spiny coverings do not make the animals close relatives.",
    "explore": "Separate similarity in appearance from similarity in ancestry.",
    "why": "Comparable challenges can be met by different lineages. A shared feature alone does not establish a close family relationship.",
    "category": "Nature",
    "sourceKey": "hedgehog",
    "related": [
      "hedgehog-covered-birth",
      "anteater-fists"
    ]
  },
  {
    "id": "chameleon-grasp-groups",
    "question": "How do five chameleon toes become two gripping groups?",
    "title": "The toes are bundled into opposed sets of two and three.",
    "text": "This arrangement gives the foot a branch-grasping action.",
    "explore": "Draw the same five contact points arranged in two opposing sets.",
    "why": "The grouping of parts can matter as much as their number. Rearrangement creates a different kind of contact.",
    "category": "Nature",
    "sourceKey": "chameleon",
    "related": [
      "chameleon-tail-retained",
      "anteater-fists"
    ]
  },
  {
    "id": "kangaroo-tree-backwards",
    "question": "Can a tree kangaroo move backward down a tree?",
    "title": "It can move its hind legs independently for climbing.",
    "text": "Its movement differs from the paired hopping of ground kangaroos.",
    "explore": "Compare a gait suited to open ground with one suited to branches.",
    "why": "The same broad body plan can be adapted to a different setting. Movement needs to match the available supports.",
    "category": "Nature",
    "sourceKey": "kangaroo",
    "related": [
      "kangaroo-tail-balance",
      "anteater-fists"
    ]
  },
  {
    "id": "ayeaye-probe",
    "question": "What tool helps an aye-aye retrieve food from narrow holes?",
    "title": "Its unusually slender middle finger probes for grubs.",
    "text": "The animal combines probing with gnawing and sensitive hearing.",
    "explore": "Separate locating, opening, and retrieving into different actions.",
    "why": "Solving a feeding problem can require a sequence of tools. One striking finger works as part of a larger arrangement.",
    "category": "Nature",
    "sourceKey": "lemur",
    "related": [
      "sifaka-sideways",
      "anteater-fists"
    ]
  },
  {
    "id": "meerkat-sand-seals",
    "question": "How does a digging meerkat keep sand out of its ears?",
    "title": "Its ears can close during burrowing.",
    "text": "A protective eye membrane also helps shield its eyes.",
    "explore": "Add temporary closures to the openings of a digging animal.",
    "why": "Access points need protection in a dusty environment. A useful opening is not necessarily useful when left open all the time.",
    "category": "Nature",
    "sourceKey": "meerkat",
    "related": [
      "meerkat-scorpion-lessons",
      "anteater-fists"
    ]
  },
  {
    "id": "fennec-furry-soles",
    "question": "Why would a desert fox need fur on its feet?",
    "title": "Fur helps protect the footpads from hot ground.",
    "text": "The covering separates a sensitive surface from scorching sand.",
    "explore": "Sketch an insulating boundary at the point of contact.",
    "why": "Heat can arrive through contact as well as the air. The surface touching the ground deserves its own protection.",
    "category": "Nature",
    "sourceKey": "fennec",
    "related": [
      "fennec-day-night-coat",
      "anteater-fists"
    ]
  },
  {
    "id": "cheetah-traction-claws",
    "question": "Do cheetah claws hide away like those of most cats?",
    "title": "They retract only partly and remain largely exposed.",
    "text": "The claws help provide traction during running.",
    "explore": "Compare a gripping contact with a smooth contact on a running surface.",
    "why": "Speed depends on contact with the ground. Power is useful only if the runner can transfer it through its feet.",
    "category": "Nature",
    "sourceKey": "cheetah",
    "related": [
      "cheetah-tail-steering",
      "anteater-fists"
    ]
  },
  {
    "id": "hyena-bone-meal",
    "question": "What lets a spotted hyena use parts of a carcass many predators leave?",
    "title": "Powerful jaws and digestion allow it to consume bones.",
    "text": "Its feeding capabilities extend beyond soft flesh.",
    "explore": "Follow a food item through both mechanical and digestive stages.",
    "why": "A resource becomes usable through a combination of processes. Strength alone would not explain the whole feeding system.",
    "category": "Nature",
    "sourceKey": "hyena",
    "related": [
      "hyena-individual-whoop",
      "anteater-fists"
    ]
  },
  {
    "id": "hyrax-body-feelers",
    "question": "Can a rock hyrax feel obstacles with hairs beyond its face?",
    "title": "Long guard hairs around its body act as touch sensors.",
    "text": "They help it sense its surroundings in tight rocky spaces.",
    "explore": "Distribute contact sensors around an outline rather than at one end.",
    "why": "A sensing system can cover the body instead of being concentrated in one location. Placement changes what can be detected.",
    "category": "Nature",
    "sourceKey": "hyrax",
    "related": [
      "hyrax-eye-visor",
      "anteater-fists"
    ]
  },
  {
    "id": "armadillo-ball-exception",
    "question": "Can every armadillo close itself into an armored ball?",
    "title": "Three-banded armadillos can roll into a tightly protected ball.",
    "text": "Most other armadillos rely on different escape or defensive actions.",
    "explore": "Compare one specialized response with the wider family’s behavior.",
    "why": "A famous ability may belong to only part of a group. Careful scope makes a surprising claim more useful.",
    "category": "Nature",
    "sourceKey": "armadillo",
    "related": [
      "armadillo-seasonal-hours",
      "anteater-fists"
    ]
  },
  {
    "id": "manatee-flipper-hand",
    "question": "Is a manatee’s flipper completely unlike a hand inside?",
    "title": "It contains jointed finger bones.",
    "text": "The external paddle shape conceals a familiar skeletal arrangement.",
    "explore": "Compare an outer silhouette with an internal support diagram.",
    "why": "A different appearance can hide related underlying structures. Looking inside connects shape with both function and ancestry.",
    "category": "Nature",
    "sourceKey": "manatee",
    "related": [
      "manatee-dense-bone",
      "anteater-fists"
    ]
  },
  {
    "id": "cactus-green-stem",
    "question": "How does a cactus photosynthesize without a canopy of broad leaves?",
    "title": "Its green stems perform photosynthesis.",
    "text": "The stems combine this job with support and water storage.",
    "explore": "Assign several plant functions to one thickened stem.",
    "why": "Functions can shift between body parts. The usual separation of leaf, trunk, and reservoir is not the only workable arrangement.",
    "category": "Nature",
    "sourceKey": "cactus",
    "related": [
      "cactus-wide-roots",
      "anteater-fists"
    ]
  },
  {
    "id": "bamboo-culm-year",
    "question": "How quickly can a bamboo stem reach its full dimensions?",
    "title": "A culm completes its main growth within one year.",
    "text": "The stem’s growth pattern differs from a tree trunk’s gradual enlargement.",
    "explore": "Compare a quickly established stem with a trunk that expands over years.",
    "why": "Two tall plants can reach their form through different developmental schedules. The process matters alongside the final height.",
    "category": "Nature",
    "sourceKey": "bamboo",
    "related": [
      "bamboo-underground-spread",
      "anteater-fists"
    ]
  },
  {
    "id": "bromeliad-leaf-tank",
    "question": "Can a rosette of leaves act as a water tank?",
    "title": "Some bromeliads hold water in spaces formed by their leaves.",
    "text": "The overlapping arrangement creates a living reservoir.",
    "explore": "Draw a container formed from several overlapping surfaces.",
    "why": "The relationship between parts can create a new function. None of the leaves needs to be a complete container by itself.",
    "category": "Nature",
    "sourceKey": "bromeliad",
    "related": [
      "bromeliad-host-support",
      "anteater-fists"
    ]
  },
  {
    "id": "baobab-dry-season",
    "question": "Why might a baobab look leafless while the landscape is hot?",
    "title": "It drops its leaves during the dry season to conserve water.",
    "text": "The bare period is a response to drought rather than simply winter cold.",
    "explore": "Compare two different environmental signals for losing leaves.",
    "why": "The same visible behavior can respond to different seasonal pressures. Context keeps an explanation from relying on the wrong climate.",
    "category": "Nature",
    "sourceKey": "baobab",
    "related": [
      "baobab-bark-renewal",
      "anteater-fists"
    ]
  },
  {
    "id": "mangrove-sediment-trap",
    "question": "Can a forest help build up muddy ground around itself?",
    "title": "Mangrove roots slow tidal water so sediment settles.",
    "text": "The root network changes the movement of water through it.",
    "explore": "Trace particles through a fast passage and a slower tangled passage.",
    "why": "A structure can alter its own surroundings. Slowing a flow changes what that flow leaves behind.",
    "category": "Nature",
    "sourceKey": "mangrove",
    "related": [
      "mangrove-coast-buffer",
      "anteater-fists"
    ]
  },
  {
    "id": "kelp-gas-buoys",
    "question": "How can kelp lift its blades toward the light?",
    "title": "Gas-filled floats provide buoyancy.",
    "text": "The floats help hold photosynthetic surfaces up in the water.",
    "explore": "Compare a supported canopy with a buoyant canopy.",
    "why": "The surrounding fluid can supply support through displacement. A plant-like form does not have to hold itself up like a tree.",
    "category": "Nature",
    "sourceKey": "kelp",
    "related": [
      "kelp-different-floats",
      "anteater-fists"
    ]
  },
  {
    "id": "seagrass-root-anchors",
    "question": "What helps seagrass withstand waves and currents?",
    "title": "Roots and rhizomes attach it to the seafloor.",
    "text": "The hidden network supports the visible leaf blades.",
    "explore": "Add underground supports beneath an underwater meadow.",
    "why": "The visible part of a habitat depends on less visible structure. An anchoring system helps explain where the meadow can persist.",
    "category": "Nature",
    "sourceKey": "seagrass",
    "related": [
      "seagrass-meadow-extension",
      "anteater-fists"
    ]
  },
  {
    "id": "cycad-root-partners",
    "question": "Why can cycad roots resemble tiny branches of coral?",
    "title": "Coralloid roots house nitrogen-fixing bacterial partners.",
    "text": "The partners contribute nutrients in exchange for carbon from the plant.",
    "explore": "Draw a root structure with living partners inside it.",
    "why": "An adaptation may create a place for another organism to work. The benefit comes from the partnership as well as the root’s shape.",
    "category": "Nature",
    "sourceKey": "cycad",
    "related": [
      "cycad-warm-cone",
      "anteater-fists"
    ]
  },
  {
    "id": "penguin-voice-identity",
    "question": "How can African penguins distinguish one another by sound?",
    "title": "Each bird has an individually distinctive voice.",
    "text": "Calls help mates locate each other and serve other social functions.",
    "explore": "Imagine finding one familiar caller inside a noisy colony.",
    "why": "Communication involves identity as well as a message. A distinctive signal helps solve the problem of finding the intended partner.",
    "category": "Nature",
    "sourceKey": "penguin",
    "related": [
      "penguin-nursery",
      "butterfly-scales"
    ]
  },
  {
    "id": "hummingbird-throat-light",
    "question": "Why can a hummingbird’s throat flash from dark to brilliant?",
    "title": "Its reflective throat feathers change appearance with viewing conditions.",
    "text": "Turning toward sunlight can reveal an intense metallic-looking color.",
    "explore": "Separate a colored surface from the direction of illumination.",
    "why": "Appearance depends on geometry as well as material. A small movement can transform the signal an observer receives.",
    "category": "Nature",
    "sourceKey": "hummingbird",
    "related": [
      "hummingbird-silk-nest",
      "butterfly-scales"
    ]
  },
  {
    "id": "hornbill-feather-eyelash",
    "question": "Are a hornbill’s long eyelashes made of hair?",
    "title": "They are modified feathers.",
    "text": "The familiar eyelash-like outline hides a different biological material.",
    "explore": "Compare similar-looking structures made from different materials.",
    "why": "A visual resemblance is not a complete explanation. Asking what a structure is made of can change the story.",
    "category": "Nature",
    "sourceKey": "hornbill",
    "related": [
      "hornbill-ground-exception",
      "butterfly-scales"
    ]
  },
  {
    "id": "toucan-feather-tongue",
    "question": "Does a toucan’s narrow tongue resemble a smooth straw?",
    "title": "Its long tongue has feather-like fringes.",
    "text": "Bristles along the edges help it handle food.",
    "explore": "Compare a smooth probe with one bearing fine side branches.",
    "why": "Small surface features can change how a tool interacts with material. The outline of a tongue is only part of its working design.",
    "category": "Nature",
    "sourceKey": "toucan",
    "related": [
      "toucan-sleeping-fold",
      "butterfly-scales"
    ]
  },
  {
    "id": "pelican-four-webbed",
    "question": "How many toes are linked by webbing on a pelican’s foot?",
    "title": "The webbing connects all four toes.",
    "text": "Even the backward-facing toe joins the swimming surface.",
    "explore": "Compare a few separate contact points with one broad paddle.",
    "why": "Connecting small supports can create a larger working surface. The arrangement helps explain movement through water.",
    "category": "Nature",
    "sourceKey": "pelican",
    "related": [
      "pelican-team-fishing",
      "butterfly-scales"
    ]
  },
  {
    "id": "porcupine-barbed-tip",
    "question": "Why can a New World porcupine quill be difficult to pull free?",
    "title": "Tiny barbs at the tip resist removal.",
    "text": "The quill’s small surface structures matter after contact.",
    "explore": "Sketch the difference between a smooth tip and a barbed tip.",
    "why": "Fine geometry can influence how a material enters or leaves another surface. Large-scale appearance misses that detail.",
    "category": "Nature",
    "sourceKey": "porcupine",
    "related": [
      "porcupine-soft-young",
      "butterfly-scales"
    ]
  },
  {
    "id": "hedgehog-covered-birth",
    "question": "How are a newborn hedgehog’s spines accommodated during birth?",
    "title": "Puffy skin initially covers its soft quills.",
    "text": "The spines become exposed as that temporary covering subsides.",
    "explore": "Imagine a protective feature with a temporary protective covering of its own.",
    "why": "Development introduces requirements that adult anatomy cannot explain by itself. Looking at the transition reveals an extra part of the solution.",
    "category": "Nature",
    "sourceKey": "hedgehog",
    "related": [
      "hedgehog-anointing",
      "butterfly-scales"
    ]
  },
  {
    "id": "chameleon-tail-retained",
    "question": "Can a chameleon replace its gripping tail after dropping it?",
    "title": "Its tail is not shed and regrown like those of many other lizards.",
    "text": "In many species, that tail is an important climbing grip.",
    "explore": "Compare a detachable escape part with a retained support.",
    "why": "An adaptation can come with a tradeoff. A component specialized for one task may not share another relative’s escape mechanism.",
    "category": "Nature",
    "sourceKey": "chameleon",
    "related": [
      "chameleon-color-message",
      "butterfly-scales"
    ]
  },
  {
    "id": "kangaroo-tail-balance",
    "question": "What does a kangaroo’s long tail do during a hop?",
    "title": "It helps with balance and turning.",
    "text": "The muscular tail also provides support while resting.",
    "explore": "Draw the moving body and its balancing extension.",
    "why": "A part’s importance can come from controlling orientation. Following balance reveals work that speed alone does not show.",
    "category": "Nature",
    "sourceKey": "kangaroo",
    "related": [
      "kangaroo-foot-alarm",
      "butterfly-scales"
    ]
  },
  {
    "id": "sifaka-sideways",
    "question": "Why do sifakas appear to bounce upright across the ground?",
    "title": "Their long hind limbs suit tree-to-tree leaping.",
    "text": "On open ground, they move in upright bounds.",
    "explore": "Compare performance on branches with movement on a flat surface.",
    "why": "A body suited to one environment may look unusual in another. Context turns an awkward-looking motion into an understandable tradeoff.",
    "category": "Nature",
    "sourceKey": "lemur",
    "related": [
      "lemur-scent-tail",
      "butterfly-scales"
    ]
  },
  {
    "id": "meerkat-scorpion-lessons",
    "question": "Do young meerkats have to discover dangerous prey handling alone?",
    "title": "Adults help pups learn to handle food.",
    "text": "A scorpion may be supplied with its stinging tail removed.",
    "explore": "Separate practicing a skill from facing its full difficulty immediately.",
    "why": "Learning can involve changing the task presented to a beginner. The assistance lies in the conditions as well as the demonstration.",
    "category": "Nature",
    "sourceKey": "meerkat",
    "related": [
      "meerkat-burrow-climate",
      "butterfly-scales"
    ]
  },
  {
    "id": "fennec-day-night-coat",
    "question": "Can one fur coat help in both sunny days and cold nights?",
    "title": "The fennec’s pale, thick coat reflects sunlight and retains warmth.",
    "text": "Its desert environment presents both kinds of thermal challenge.",
    "explore": "Compare heat arriving during daylight with heat leaving after dark.",
    "why": "An environment is a changing cycle, not one constant condition. A useful covering has to work through different phases.",
    "category": "Nature",
    "sourceKey": "fennec",
    "related": [
      "fennec-night-shift",
      "butterfly-scales"
    ]
  },
  {
    "id": "cheetah-tail-steering",
    "question": "Why does a sprinting cheetah need such a long tail?",
    "title": "Its tail helps maintain direction while running.",
    "text": "The extension contributes to control during rapid pursuit.",
    "explore": "Separate producing forward motion from controlling its direction.",
    "why": "Fast movement creates a control problem as well as a power problem. A runner needs ways to manage both.",
    "category": "Nature",
    "sourceKey": "cheetah",
    "related": [
      "cheetah-chirp",
      "butterfly-scales"
    ]
  },
  {
    "id": "hyena-individual-whoop",
    "question": "Can a spotted hyena recognize which clan member is calling?",
    "title": "Individuals can be distinguished by their whooping calls.",
    "text": "The far-carrying calls help the clan stay in contact.",
    "explore": "Imagine identifying a caller without seeing its face.",
    "why": "Identity can be carried in sound. A communication network can work even when its members are out of sight.",
    "category": "Nature",
    "sourceKey": "hyena",
    "related": [
      "hyena-active-hunter",
      "butterfly-scales"
    ]
  },
  {
    "id": "hyrax-eye-visor",
    "question": "What eye feature helps a rock hyrax in bright conditions?",
    "title": "A projection of the iris acts like a small sunshade.",
    "text": "Its eyes also have a protective membrane.",
    "explore": "Compare reducing incoming light with shielding a surface from dust.",
    "why": "A viewing system needs protection as well as sensitivity. Different features can address different environmental challenges.",
    "category": "Nature",
    "sourceKey": "hyrax",
    "related": [
      "hyrax-microbial-digestion",
      "butterfly-scales"
    ]
  },
  {
    "id": "armadillo-seasonal-hours",
    "question": "Can an armadillo change its working hours with the weather?",
    "title": "It may shift from nighttime activity toward daytime in cooler conditions.",
    "text": "Limited temperature regulation makes timing particularly important.",
    "explore": "Adjust a daily schedule while keeping the same body covering.",
    "why": "Behavior can compensate for physical limits. Choosing when to act changes the environment an animal encounters.",
    "category": "Nature",
    "sourceKey": "armadillo",
    "related": [
      "armadillo-touch-hairs",
      "butterfly-scales"
    ]
  },
  {
    "id": "manatee-dense-bone",
    "question": "Can a heavy skeleton help an aquatic mammal manage buoyancy?",
    "title": "Manatees have unusually dense bones.",
    "text": "That density may contribute to their buoyancy balance.",
    "explore": "Compare adding internal mass with adding external volume.",
    "why": "Floating depends on the relationship between mass and displaced water. A less visible material property can influence the whole animal.",
    "category": "Nature",
    "sourceKey": "manatee",
    "related": [
      "manatee-underwater-contact",
      "butterfly-scales"
    ]
  },
  {
    "id": "cactus-wide-roots",
    "question": "Why do many cacti spread roots over a wide area?",
    "title": "The shallow spreading network can absorb water rapidly.",
    "text": "It helps capture brief supplies near the soil surface.",
    "explore": "Compare reaching deeply with covering more surface area.",
    "why": "A resource’s location and timing shape the collection strategy. A wider reach can matter more than a deeper one.",
    "category": "Nature",
    "sourceKey": "cactus",
    "related": [
      "cactus-changing-volume",
      "butterfly-scales"
    ]
  },
  {
    "id": "bamboo-underground-spread",
    "question": "Can an expanding bamboo grove be connected beneath the ground?",
    "title": "Rhizomes link shoots and produce new growth.",
    "text": "Running and clumping bamboos have different rhizome arrangements.",
    "explore": "Map the hidden connections between several visible stems.",
    "why": "What looks like a collection of separate plants can be connected. The underground structure helps explain the pattern above it.",
    "category": "Nature",
    "sourceKey": "bamboo",
    "related": [
      "bamboo-shared-flowering",
      "butterfly-scales"
    ]
  },
  {
    "id": "bromeliad-host-support",
    "question": "Does a bromeliad growing on a tree necessarily steal its sap?",
    "title": "Florida’s epiphytic bromeliads use their host for support, not as parasites.",
    "text": "Attachment and nutrient supply are separate relationships.",
    "explore": "Draw an anchor connection without drawing a feeding connection.",
    "why": "Physical dependence does not always mean parasitism. Asking what actually crosses the connection clarifies the relationship.",
    "category": "Nature",
    "sourceKey": "bromeliad",
    "related": [
      "bromeliad-mini-pond",
      "butterfly-scales"
    ]
  },
  {
    "id": "baobab-bark-renewal",
    "question": "Can a baobab recover bark stripped from its trunk?",
    "title": "Baobabs can regenerate damaged bark.",
    "text": "The ability helps them recover after browsing or other stripping.",
    "explore": "Compare avoiding damage with repairing a damaged outer layer.",
    "why": "Resilience can include recovery as well as resistance. The response after a disturbance belongs in the explanation.",
    "category": "Nature",
    "sourceKey": "baobab",
    "related": [
      "baobab-night-flowers",
      "butterfly-scales"
    ]
  },
  {
    "id": "mangrove-coast-buffer",
    "question": "Can coastal vegetation help reduce erosion?",
    "title": "Mangrove forests stabilize shorelines against waves, currents, and tides.",
    "text": "Their protection is an ecosystem function, not a guarantee against every storm.",
    "explore": "Compare an exposed shoreline with one containing a rooted buffer.",
    "why": "Living systems can contribute to coastal protection. Understanding the function does not require treating it as unlimited.",
    "category": "Nature",
    "sourceKey": "mangrove",
    "related": [
      "mangrove-root-refuge",
      "butterfly-scales"
    ]
  },
  {
    "id": "kelp-different-floats",
    "question": "Do giant kelp and bull kelp arrange their floats the same way?",
    "title": "Giant kelp has floats along its blades; bull kelp uses one main float.",
    "text": "Similar canopy functions use different buoyancy arrangements.",
    "explore": "Draw many small floats beside one large float.",
    "why": "A shared task can have several workable architectures. Comparing relatives reveals variation within a useful principle.",
    "category": "Nature",
    "sourceKey": "kelp",
    "related": [
      "kelp-otter-link",
      "butterfly-scales"
    ]
  },
  {
    "id": "seagrass-meadow-extension",
    "question": "How can a seagrass meadow spread without a new seed at every shoot?",
    "title": "Rhizomes extend sideways and produce additional shoots.",
    "text": "Connected growth expands the meadow’s edges.",
    "explore": "Draw outward growth through a buried horizontal stem.",
    "why": "A population’s spread can involve both seeds and connected growth. Different routes leave different spatial patterns.",
    "category": "Nature",
    "sourceKey": "seagrass",
    "related": [
      "seagrass-leaf-community",
      "butterfly-scales"
    ]
  },
  {
    "id": "cycad-warm-cone",
    "question": "Can a cycad cone warm up as part of pollination?",
    "title": "Some cones produce heat and odors that influence visiting insects.",
    "text": "In cycads such as Macrozamia lucida, pollinators move pollen between cones.",
    "explore": "Connect a changing chemical signal with a visiting insect’s movement.",
    "why": "Reproduction can involve a timed interaction rather than a passive display. Heat and scent belong to the signaling system.",
    "category": "Nature",
    "sourceKey": "cycad",
    "related": [
      "cycad-leaf-flush",
      "butterfly-scales"
    ]
  },
  {
    "id": "penguin-nursery",
    "question": "Can young African penguins gather in a nursery group?",
    "title": "Chicks can huddle together while parents forage.",
    "text": "The grouping helps them stay warm and gain protection.",
    "explore": "Compare individual insulation with the effect of grouping together.",
    "why": "A useful solution can come from arrangement rather than anatomy. The group changes the conditions experienced by each youngster.",
    "category": "Nature",
    "sourceKey": "penguin",
    "related": [
      "penguin-eye-radiator",
      "lotus-roughness"
    ]
  },
  {
    "id": "hummingbird-silk-nest",
    "question": "What delicate building material helps form a hummingbird’s nest?",
    "title": "Ruby-throated hummingbirds weave spider silk with plant material.",
    "text": "The resulting nest is a tiny cup holding their eggs.",
    "explore": "Compare an assembly made from one material with a mixed-material structure.",
    "why": "A building material can connect different living systems. Following its source adds another layer to the story of construction.",
    "category": "Nature",
    "sourceKey": "hummingbird",
    "related": [
      "hummingbird-upstroke",
      "lotus-roughness"
    ]
  },
  {
    "id": "hornbill-ground-exception",
    "question": "Do all hornbills seal their nests behind a wall?",
    "title": "Ground hornbills leave their nest entrances open.",
    "text": "Their chick-rearing arrangement differs from that of many forest hornbills.",
    "explore": "Add an exception to a broad description of nesting behavior.",
    "why": "A memorable generalization still needs boundaries. Recognizing variation lets us appreciate a strategy without applying it to every relative.",
    "category": "Nature",
    "sourceKey": "hornbill",
    "related": [
      "hornbill-sealed-home",
      "lotus-roughness"
    ]
  },
  {
    "id": "toucan-sleeping-fold",
    "question": "How does a long-billed toucan fit inside a tree cavity?",
    "title": "It folds its head back and brings its tail over its body.",
    "text": "The tucked posture makes a compact resting shape.",
    "explore": "Fold a long projecting part into the envelope of a smaller space.",
    "why": "An object’s working dimensions need not be its storage dimensions. Changing configuration can solve a space problem.",
    "category": "Nature",
    "sourceKey": "toucan",
    "related": [
      "toucan-light-beak",
      "lotus-roughness"
    ]
  },
  {
    "id": "pelican-team-fishing",
    "question": "Can pelicans cooperate to concentrate a meal?",
    "title": "American white pelicans can herd fish while swimming together.",
    "text": "A coordinated group guides fish toward shallower water.",
    "explore": "Draw several moving barriers enclosing a smaller space.",
    "why": "Coordination can change the task itself. Bringing prey into a smaller area makes each individual’s next action easier.",
    "category": "Nature",
    "sourceKey": "pelican",
    "related": [
      "pelican-draining-net",
      "lotus-roughness"
    ]
  },
  {
    "id": "porcupine-soft-young",
    "question": "Are newborn porcupines already covered in rigid needles?",
    "title": "Their quills begin soft and flexible, then harden.",
    "text": "The protective covering changes after birth.",
    "explore": "Compare the same structure at two stages of development.",
    "why": "A design must accommodate arrival and later protection. Its properties can change as the demands on it change.",
    "category": "Nature",
    "sourceKey": "porcupine",
    "related": [
      "porcupine-not-projectiles",
      "lotus-roughness"
    ]
  },
  {
    "id": "hedgehog-anointing",
    "question": "Why might a hedgehog smear foamy saliva on its spines?",
    "title": "The behavior is called self-anointing; its exact purpose remains uncertain.",
    "text": "Proposed explanations should not be treated as a settled fact.",
    "explore": "Distinguish observing an action from proving its function.",
    "why": "A surprising observation can be valuable even without a complete explanation. Preserving the uncertainty is part of learning what remains to investigate.",
    "category": "Nature",
    "sourceKey": "hedgehog",
    "related": [
      "hedgehog-belly-shield",
      "lotus-roughness"
    ]
  },
  {
    "id": "chameleon-color-message",
    "question": "Does a chameleon’s changing color only hide it against a background?",
    "title": "Color changes also communicate social state.",
    "text": "Displays can relate to dominance, courtship, or a female’s reproductive condition.",
    "explore": "Compare camouflage for another species with a signal for the same species.",
    "why": "A visible change can have several audiences. Asking who responds to a signal helps clarify its role.",
    "category": "Nature",
    "sourceKey": "chameleon",
    "related": [
      "chameleon-two-views",
      "lotus-roughness"
    ]
  },
  {
    "id": "kangaroo-foot-alarm",
    "question": "Can a kangaroo warn others through the ground?",
    "title": "It can stamp its feet loudly when danger appears.",
    "text": "The sound becomes a signal to nearby animals.",
    "explore": "Compare using a limb for movement with using it to send a signal.",
    "why": "A movement can serve communication as well as travel. Its effect on the surroundings becomes useful to other animals.",
    "category": "Nature",
    "sourceKey": "kangaroo",
    "related": [
      "kangaroo-two-milks",
      "lotus-roughness"
    ]
  },
  {
    "id": "lemur-scent-tail",
    "question": "Can a ring-tailed lemur use its tail to deliver a smell?",
    "title": "Males rub scent onto their tails and wave them during contests.",
    "text": "The tail carries a chemical signal as well as a visual one.",
    "explore": "Draw a signal combining movement with a carried substance.",
    "why": "Communication can cross several senses at once. The moving body part is also a delivery surface.",
    "category": "Nature",
    "sourceKey": "lemur",
    "related": [
      "lemur-toothcomb",
      "lotus-roughness"
    ]
  },
  {
    "id": "meerkat-burrow-climate",
    "question": "Why retreat underground when desert temperatures swing?",
    "title": "Deeper burrow chambers have more stable temperatures.",
    "text": "Meerkats use multi-level tunnel systems as shelter.",
    "explore": "Compare conditions at the surface with a deeper sheltered space.",
    "why": "The environment itself can provide part of the solution. Choosing a location changes the thermal problem before anatomy comes into play.",
    "category": "Nature",
    "sourceKey": "meerkat",
    "related": [
      "meerkat-watchman",
      "lotus-roughness"
    ]
  },
  {
    "id": "fennec-night-shift",
    "question": "How can a small desert fox avoid the hottest working hours?",
    "title": "Fennecs usually forage at night and shelter in burrows by day.",
    "text": "Timing reduces exposure to intense daytime heat.",
    "explore": "Move an activity to a different part of the daily cycle.",
    "why": "An adaptation can be behavioral rather than structural. Changing the schedule changes the conditions the animal must face.",
    "category": "Nature",
    "sourceKey": "fennec",
    "related": [
      "fennec-ear-exchanger",
      "lotus-roughness"
    ]
  },
  {
    "id": "cheetah-chirp",
    "question": "Does a cheetah communicate only with a big-cat roar?",
    "title": "It chirps, purrs, and makes other calls, but cannot roar.",
    "text": "Mothers use chirping calls with their cubs.",
    "explore": "Compare an animal’s popular image with its actual sound repertoire.",
    "why": "A familiar category can conceal important differences. Listening reveals behavior that a still image cannot communicate.",
    "category": "Nature",
    "sourceKey": "cheetah",
    "related": [
      "cheetah-flexible-spine",
      "lotus-roughness"
    ]
  },
  {
    "id": "hyena-active-hunter",
    "question": "Is a spotted hyena simply waiting for another predator’s leftovers?",
    "title": "It is also a capable hunter, sometimes hunting cooperatively.",
    "text": "Groups can pursue larger prey than lone animals usually tackle.",
    "explore": "Compare a solitary task with one performed by a coordinated group.",
    "why": "A stereotype can hide a species’ actual range of behavior. Cooperation changes which opportunities are available.",
    "category": "Nature",
    "sourceKey": "hyena",
    "related": [
      "hyena-giggle-message",
      "lotus-roughness"
    ]
  },
  {
    "id": "hyrax-microbial-digestion",
    "question": "Does a rock hyrax digest tough plants entirely on its own?",
    "title": "Bacteria in its chambered stomach assist digestion.",
    "text": "The animal’s feeding system includes microbial partners.",
    "explore": "Draw the consumer together with its internal partners.",
    "why": "An animal’s capabilities may depend on other organisms. The useful unit of explanation can be larger than one species.",
    "category": "Nature",
    "sourceKey": "hyrax",
    "related": [
      "hyrax-rock-grip",
      "lotus-roughness"
    ]
  },
  {
    "id": "armadillo-touch-hairs",
    "question": "How can an almost hairless-looking armadillo feel its way at night?",
    "title": "Wiry hairs on its sides and belly detect nearby objects.",
    "text": "The hairs provide contact information as it moves.",
    "explore": "Add a few strategically placed feelers to an armored outline.",
    "why": "A sparse feature can still do useful work. The number of hairs matters less than their location and function.",
    "category": "Nature",
    "sourceKey": "armadillo",
    "related": [
      "armadillo-flexible-armor",
      "lotus-roughness"
    ]
  },
  {
    "id": "manatee-underwater-contact",
    "question": "How can manatees stay in contact in murky water?",
    "title": "They produce chirps, squeaks, and whistles underwater.",
    "text": "Sound supplies information when visibility is limited.",
    "explore": "Compare a visual signal with one that travels through water.",
    "why": "The environment affects which communication channel is useful. A good explanation includes the medium between sender and receiver.",
    "category": "Nature",
    "sourceKey": "manatee",
    "related": [
      "manatee-marching-teeth",
      "lotus-roughness"
    ]
  },
  {
    "id": "cactus-changing-volume",
    "question": "Can a cactus visibly shrink when water is scarce?",
    "title": "Its water-storing stem contracts as supplies decline.",
    "text": "Rehydration can expand the stem again.",
    "explore": "Compare a fixed-size vessel with an expandable living reservoir.",
    "why": "Storage need not keep a constant shape. A changing envelope can accommodate changing contents.",
    "category": "Nature",
    "sourceKey": "cactus",
    "related": [
      "cactus-spine-leaves",
      "lotus-roughness"
    ]
  },
  {
    "id": "bamboo-shared-flowering",
    "question": "Can related bamboo plants flower together while far apart?",
    "title": "Clonally related woody bamboos can synchronize flowering across locations.",
    "text": "A mass flowering event may be followed by seed production and plant death.",
    "explore": "Compare geographic separation with a shared developmental history.",
    "why": "A common origin can link patterns that distance alone would not explain. A plant’s timeline can be as striking as its growth rate.",
    "category": "Nature",
    "sourceKey": "bamboo",
    "related": [
      "bamboo-giant-grass",
      "lotus-roughness"
    ]
  },
  {
    "id": "bromeliad-mini-pond",
    "question": "Can a plant’s water tank become a tiny animal habitat?",
    "title": "Bromeliad tanks shelter larvae and other small organisms.",
    "text": "Decomposing material also supplies nutrients within the tank.",
    "explore": "Add inhabitants and recycling processes to a small reservoir diagram.",
    "why": "A storage structure can become an ecosystem. The effects of a plant’s architecture extend beyond the plant itself.",
    "category": "Nature",
    "sourceKey": "bromeliad",
    "related": [
      "bromeliad-leaf-drink",
      "lotus-roughness"
    ]
  },
  {
    "id": "baobab-night-flowers",
    "question": "Why do baobab flowers offer nectar after dark?",
    "title": "Their nighttime flowers attract nocturnal pollinators.",
    "text": "Fruit bats, moths, and other visitors can move pollen between trees.",
    "explore": "Match a flower’s opening time with its visitors’ activity.",
    "why": "Timing helps bring partners together. A useful interaction depends on when access is offered as well as what is offered.",
    "category": "Nature",
    "sourceKey": "baobab",
    "related": [
      "baobab-trunk-store",
      "lotus-roughness"
    ]
  },
  {
    "id": "mangrove-root-refuge",
    "question": "What can a tangle of mangrove roots offer a small fish?",
    "title": "It provides food and shelter from predators.",
    "text": "The spaces within the roots create usable habitat.",
    "explore": "View the same structure as a tree support and an animal refuge.",
    "why": "One organism’s architecture can become another organism’s environment. The value of a structure depends on who is using it.",
    "category": "Nature",
    "sourceKey": "mangrove",
    "related": [
      "mangrove-tidal-stilts",
      "lotus-roughness"
    ]
  },
  {
    "id": "kelp-otter-link",
    "question": "How can a sea otter influence an underwater forest?",
    "title": "Otters eat sea urchins that can heavily graze kelp.",
    "text": "Predator activity can help keep grazing pressure in check.",
    "explore": "Connect a predator to vegetation through the animal it eats.",
    "why": "An effect can pass through several links rather than direct contact. Following the chain makes an indirect relationship visible.",
    "category": "Nature",
    "sourceKey": "kelp",
    "related": [
      "kelp-anchor-not-root",
      "lotus-roughness"
    ]
  },
  {
    "id": "seagrass-leaf-community",
    "question": "What might an animal be eating when it scrapes a seagrass blade?",
    "title": "It may feed on organisms growing on the leaf rather than the leaf itself.",
    "text": "Seagrass surfaces host an additional layer of life.",
    "explore": "Distinguish a supporting surface from what is growing on it.",
    "why": "A food web can have hidden layers on familiar surfaces. Observing where an animal feeds does not always reveal exactly what it consumes.",
    "category": "Nature",
    "sourceKey": "seagrass",
    "related": [
      "seagrass-flowers",
      "lotus-roughness"
    ]
  },
  {
    "id": "cycad-leaf-flush",
    "question": "Do cycad leaves appear one at a time throughout the year?",
    "title": "They commonly emerge together in a seasonal flush.",
    "text": "A whole set unfolds around the plant’s crown.",
    "explore": "Compare a synchronized burst with continuous replacement.",
    "why": "Growth has a rhythm as well as a shape. Timing reveals organization that a single photograph can conceal.",
    "category": "Nature",
    "sourceKey": "cycad",
    "related": [
      "cycad-not-palm",
      "lotus-roughness"
    ]
  }
];
export const natureSolutionFacts=drafts.map(draft=>({...draft,collection:'natures-ingenious-solutions' as const,source:natureSolutionSources[draft.sourceKey].label,url:natureSolutionSources[draft.sourceKey].url}));
