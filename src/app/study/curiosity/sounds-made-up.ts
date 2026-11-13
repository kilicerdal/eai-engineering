import type { Fact } from './facts';

// V1.5: append-only identities. Registry and per-card provenance make future batches reviewable.
// Reflections and thought experiments are editorial prompts, not additional source claims.
export const soundsMadeUpSources = {
  "flamingo": {
    "label": "San Diego Zoo Wildlife Alliance · Flamingo",
    "url": "https://animals.sandiegozoo.org/animals/flamingo",
    "reviewedOn": "2026-11-13"
  },
  "giraffe": {
    "label": "San Diego Zoo Wildlife Alliance · Giraffe",
    "url": "https://animals.sandiegozoo.org/animals/giraffe",
    "reviewedOn": "2026-11-13"
  },
  "koala": {
    "label": "San Diego Zoo Wildlife Alliance · Koala",
    "url": "https://animals.sandiegozoo.org/animals/koala",
    "reviewedOn": "2026-11-13"
  },
  "wombat": {
    "label": "San Diego Zoo Wildlife Alliance · Wombat",
    "url": "https://animals.sandiegozoo.org/animals/wombat",
    "reviewedOn": "2026-11-13"
  },
  "elephant": {
    "label": "San Diego Zoo Wildlife Alliance · Elephant",
    "url": "https://animals.sandiegozoo.org/animals/elephant",
    "reviewedOn": "2026-11-13"
  },
  "okapi": {
    "label": "San Diego Zoo Wildlife Alliance · Okapi",
    "url": "https://animals.sandiegozoo.org/animals/okapi",
    "reviewedOn": "2026-11-13"
  },
  "camel": {
    "label": "San Diego Zoo Wildlife Alliance · Camel",
    "url": "https://animals.sandiegozoo.org/animals/camel",
    "reviewedOn": "2026-11-13"
  },
  "ostrich": {
    "label": "San Diego Zoo Wildlife Alliance · Ostrich",
    "url": "https://animals.sandiegozoo.org/animals/ostrich",
    "reviewedOn": "2026-11-13"
  },
  "anteater": {
    "label": "San Diego Zoo Wildlife Alliance · Giant anteater",
    "url": "https://animals.sandiegozoo.org/animals/giant-anteater",
    "reviewedOn": "2026-11-13"
  },
  "binturong": {
    "label": "San Diego Zoo Wildlife Alliance · Binturong",
    "url": "https://animals.sandiegozoo.org/animals/binturong",
    "reviewedOn": "2026-11-13"
  },
  "redpanda": {
    "label": "San Diego Zoo Wildlife Alliance · Red panda",
    "url": "https://animals.sandiegozoo.org/animals/red-panda",
    "reviewedOn": "2026-11-13"
  },
  "polar": {
    "label": "San Diego Zoo Wildlife Alliance · Polar bear",
    "url": "https://animals.sandiegozoo.org/animals/polar-bear",
    "reviewedOn": "2026-11-13"
  },
  "hippo": {
    "label": "San Diego Zoo Wildlife Alliance · Hippo",
    "url": "https://animals.sandiegozoo.org/animals/hippo",
    "reviewedOn": "2026-11-13"
  },
  "horseshoe": {
    "label": "NOAA · Horseshoe crabs",
    "url": "https://oceanservice.noaa.gov/facts/horseshoe-crab.html",
    "reviewedOn": "2026-11-13"
  },
  "sound": {
    "label": "NOAA · Sound in the ocean",
    "url": "https://oceanservice.noaa.gov/facts/sound.html",
    "reviewedOn": "2026-11-13"
  },
  "oxygen": {
    "label": "NOAA · Ocean oxygen",
    "url": "https://oceanservice.noaa.gov/facts/ocean-oxygen.html",
    "reviewedOn": "2026-11-13"
  },
  "oceanlight": {
    "label": "NOAA · Light in the ocean",
    "url": "https://oceanservice.noaa.gov/facts/light_travel.html",
    "reviewedOn": "2026-11-13"
  },
  "tides": {
    "label": "NOAA · What are tides?",
    "url": "https://oceanservice.noaa.gov/facts/tides.html",
    "reviewedOn": "2026-11-13"
  },
  "waterfall": {
    "label": "NOAA · Largest underwater waterfall",
    "url": "https://oceanservice.noaa.gov/facts/largest-waterfall.html",
    "reviewedOn": "2026-11-13"
  },
  "pluto": {
    "label": "NASA · Pluto",
    "url": "https://science.nasa.gov/dwarf-planets/pluto/facts/",
    "reviewedOn": "2026-11-13"
  },
  "comets": {
    "label": "NASA · Comets",
    "url": "https://science.nasa.gov/solar-system/comets/facts/",
    "reviewedOn": "2026-11-13"
  },
  "meteors": {
    "label": "NASA · Meteors and meteorites",
    "url": "https://science.nasa.gov/solar-system/meteors-meteorites/facts/",
    "reviewedOn": "2026-11-13"
  },
  "asteroids": {
    "label": "NASA · Asteroids",
    "url": "https://science.nasa.gov/solar-system/asteroids/facts/",
    "reviewedOn": "2026-11-13"
  },
  "earth": {
    "label": "NASA · Earth",
    "url": "https://science.nasa.gov/earth/facts/",
    "reviewedOn": "2026-11-13"
  },
  "sun": {
    "label": "NASA Space Place · Comparing stars",
    "url": "https://spaceplace.nasa.gov/sun-compare/en/",
    "reviewedOn": "2026-11-13"
  },
  "marssunset": {
    "label": "NASA · Sunset in Gale Crater",
    "url": "https://www.nasa.gov/image-article/sunset-sequence-mars-gale-crater/",
    "reviewedOn": "2026-11-13"
  },
  "vanilla": {
    "label": "Smithsonian Gardens · The vanilla orchid",
    "url": "https://gardens.si.edu/exhibitions/connective-power-of-orchids/section-4-orchid-innovation-the-vanilla-orchid/",
    "reviewedOn": "2026-11-13"
  },
  "cacao": {
    "label": "Royal Botanic Gardens, Kew · Cacao tree",
    "url": "https://www.kew.org/plants/cacao-tree",
    "reviewedOn": "2026-11-13"
  },
  "coffee": {
    "label": "Royal Botanic Gardens, Kew · Arabica coffee",
    "url": "https://www.kew.org/plants/arabica-coffee",
    "reviewedOn": "2026-11-13"
  },
  "coffeepick": {
    "label": "Royal Botanic Gardens, Kew · Five things about coffee",
    "url": "https://www.kew.org/read-and-watch/things-didnt-know-coffee-threatened",
    "reviewedOn": "2026-11-13"
  },
  "peanut": {
    "label": "Royal Botanic Gardens, Kew · Peanut",
    "url": "https://www.kew.org/plants/peanut",
    "reviewedOn": "2026-11-13"
  },
  "onion": {
    "label": "Library of Congress · Why onions make you cry",
    "url": "https://www.loc.gov/everyday-mysteries/browse-all-questions/item/why-does-chopping-an-onion-make-you-cry/",
    "reviewedOn": "2026-11-13"
  },
  "playdoh": {
    "label": "The Strong · Play-Doh",
    "url": "https://www.museumofplay.org/toys/play-doh/",
    "reviewedOn": "2026-11-13"
  },
  "slinky": {
    "label": "The Strong · Slinky",
    "url": "https://www.museumofplay.org/toys/slinky/",
    "reviewedOn": "2026-11-13"
  },
  "soaker": {
    "label": "The Strong · Super Soaker",
    "url": "https://www.museumofplay.org/toys/super-soaker/",
    "reviewedOn": "2026-11-13"
  },
  "velcro": {
    "label": "National Inventors Hall of Fame · George de Mestral",
    "url": "https://www.invent.org/inductees/george-de-mestral",
    "reviewedOn": "2026-11-13"
  },
  "teflon": {
    "label": "National Inventors Hall of Fame · Roy Plunkett",
    "url": "https://www.invent.org/inductees/roy-j-plunkett",
    "reviewedOn": "2026-11-13"
  },
  "microwave": {
    "label": "American Physical Society · Microwave history",
    "url": "https://www.aps.org/apsnews/2015/10/first-patent-for-microwave",
    "reviewedOn": "2026-11-13"
  },
  "eiffelheat": {
    "label": "Eiffel Tower · Why the tower changes size",
    "url": "https://www.toureiffel.paris/en/news/history-and-culture/why-does-eiffel-tower-change-size",
    "reviewedOn": "2026-11-13"
  },
  "eiffelpaint": {
    "label": "Eiffel Tower · Painting the tower",
    "url": "https://www.toureiffel.paris/en/the-monument/painting-eiffel-tower",
    "reviewedOn": "2026-11-13"
  },
  "liberty": {
    "label": "National Park Service · Statue of Liberty facts",
    "url": "https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm",
    "reviewedOn": "2026-11-13"
  },
  "libertythin": {
    "label": "National Park Service · Statue of Liberty FAQ",
    "url": "https://home.nps.gov/stli/planyourvisit/frequently-asked-questions-statue-of-liberty.htm",
    "reviewedOn": "2026-11-13"
  },
  "complaint": {
    "label": "British Museum · Letter to Ea-nasir",
    "url": "https://www.britishmuseum.org/collection/object/W_1953-0411-71",
    "reviewedOn": "2026-11-13"
  },
  "aluminum": {
    "label": "National Archives · Washington Monument’s aluminum tip",
    "url": "https://www.archives.gov/publications/prologue/2014/summer/aluminum-tip-monument",
    "reviewedOn": "2026-11-13"
  },
  "olympics": {
    "label": "International Olympic Committee · Arts competitions",
    "url": "https://www.olympics.com/ioc/news/a-meeting-of-muscles-and-minds",
    "reviewedOn": "2026-11-13"
  },
  "snow": {
    "label": "NOAA / NASA · How snowflakes form",
    "url": "https://www.nesdis.noaa.gov/about/k-12-education/ice-snow/how-do-snowflakes-form",
    "reviewedOn": "2026-11-13"
  },
  "snowclumps": {
    "label": "UCAR · Snowflakes",
    "url": "https://scied.ucar.edu/learning-zone/storms/snowflakes",
    "reviewedOn": "2026-11-13"
  },
  "lightning": {
    "label": "National Weather Service · Lightning myths",
    "url": "https://www.weather.gov/safety/lightning-myths",
    "reviewedOn": "2026-11-13"
  },
  "thunderheat": {
    "label": "NOAA · The sound of thunder",
    "url": "https://www.noaa.gov/jetstream/lightning/sound-of-thunder",
    "reviewedOn": "2026-11-13"
  },
  "electricity": {
    "label": "U.S. Energy Information Administration · Electricity",
    "url": "https://www.eia.gov/energyexplained/electricity/the-science-of-electricity.php",
    "reviewedOn": "2026-11-13"
  },
  "fireworks": {
    "label": "USGS · Minerals and firework colors",
    "url": "https://www.usgs.gov/faqs/what-minerals-produce-colors-fireworks",
    "reviewedOn": "2026-11-13"
  },
  "taste": {
    "label": "NIH / NIDCD · How taste works",
    "url": "https://www.nidcd.nih.gov/health/taste-disorders",
    "reviewedOn": "2026-11-13"
  },
  "smell": {
    "label": "NIH / NIDCD · How smell works",
    "url": "https://www.nidcd.nih.gov/health/smell-disorders",
    "reviewedOn": "2026-11-13"
  }
} as const;
export type SoundsMadeUpFact = Fact & { collection: 'sounds-made-up'; why: string; related: [string, string]; sourceKey: keyof typeof soundsMadeUpSources };
type Draft = Omit<SoundsMadeUpFact, 'source' | 'url' | 'collection'>;
const drafts: Draft[] = [
  {
    "id": "flamingo-pink",
    "category": "Nature",
    "sourceKey": "flamingo",
    "question": "Could a bird’s lunch help color its feathers?",
    "title": "Flamingos get their pink color from pigments in their food.",
    "text": "Carotenoid pigments in algae and small crustaceans contribute to flamingos’ pink and reddish plumage. Their color is connected to what they eat.",
    "explore": "Design an imaginary animal whose appearance reveals its diet.",
    "why": "An animal’s appearance can reflect its environment as well as its body. Looking for that connection turns a familiar color into a new question.",
    "related": [
      "flamingo-filter",
      "octopus-colors"
    ]
  },
  {
    "id": "pluto-named-child",
    "category": "Space",
    "sourceKey": "pluto",
    "question": "Did a child help name a distant world?",
    "title": "Eleven-year-old Venetia Burney suggested the name Pluto.",
    "text": "In 1930, her grandfather passed her suggestion along, and it reached Lowell Observatory, where the name was selected.",
    "explore": "Choose a name for a new world and explain its meaning.",
    "why": "A good contribution need not come from the oldest person in the room. Connecting knowledge from different subjects can create an idea worth sharing.",
    "related": [
      "uranus-literary-moons",
      "pluto-ice-mountains"
    ]
  },
  {
    "id": "ocean-fast-sound",
    "category": "Everyday science",
    "sourceKey": "sound",
    "question": "Does sound move faster through water than through air?",
    "title": "Sound travels roughly four times faster in seawater than in air.",
    "text": "Typical values are about 1,500 meters per second in seawater and 340 in air, with conditions affecting the exact speeds.",
    "explore": "Compare how long a signal takes to cross one kilometer in each medium.",
    "why": "The material carrying a signal changes its behavior. Always ask about the medium before assuming a familiar speed applies.",
    "related": [
      "bat-echoes",
      "thunder-delay"
    ]
  },
  {
    "id": "playdoh-cleaner",
    "category": "Inventions",
    "sourceKey": "playdoh",
    "question": "Was Play-Doh always meant to be a toy?",
    "title": "Play-Doh began as a wallpaper-cleaning compound.",
    "text": "It was repurposed as a children’s modeling material. An existing product found a very different use rather than starting again from nothing.",
    "explore": "Choose an everyday material and invent a second use for it.",
    "why": "A new audience can reveal a new purpose for an old material. Innovation can involve reassignment as well as a new substance.",
    "related": [
      "babbage-loom",
      "teflon-refrigerant"
    ]
  },
  {
    "id": "velcro-name",
    "category": "Language",
    "sourceKey": "velcro",
    "question": "What do velvet and hooks have to do with one familiar brand name?",
    "title": "VELCRO combines parts of the French words velour and crochet.",
    "text": "The words mean velvet and hooks, reflecting the fastener’s hook-and-loop design. The brand name is a compact description of the idea.",
    "explore": "Create a name by combining words for a tool’s two key parts.",
    "why": "A name can preserve a design’s structure in miniature. Unpacking the words can help you remember the mechanism rather than only the brand.",
    "related": [
      "velcro-burrs",
      "braille-contractions"
    ]
  },
  {
    "id": "liberty-gold-torch",
    "category": "Art & ideas",
    "sourceKey": "liberty",
    "question": "Does Liberty’s torch contain a golden flame?",
    "title": "The statue’s replacement torch has a flame covered in gold leaf.",
    "text": "The torch installed in 1986 uses copper beneath its gold-covered flame. A small surface layer can have a large visual effect.",
    "explore": "Compare covering a surface with a material and making the whole object from it.",
    "why": "An object’s appearance may come from a very thin outer layer. Ask where a material is used before assuming it fills the entire structure.",
    "related": [
      "art-ultramarine",
      "liberty-thin"
    ]
  },
  {
    "id": "ancient-copper-complaint",
    "category": "Ancient ingenuity",
    "sourceKey": "complaint",
    "question": "Did an unhappy customer leave a complaint on clay almost 4,000 years ago?",
    "title": "A Babylonian tablet records Nanni’s complaint to the copper merchant Ea-nasir.",
    "text": "The letter, dated around 1750 BCE, objects to the quality and delivery of copper. Everyday frustrations can survive as archaeological evidence.",
    "explore": "Write a one-sentence complaint that a future historian could understand.",
    "why": "History includes ordinary transactions as well as monuments. Practical records can preserve recognizable human concerns across an enormous span of time.",
    "related": [
      "clay-accounts",
      "rosetta-scripts"
    ]
  },
  {
    "id": "taste-map-myth",
    "category": "Human body",
    "sourceKey": "taste",
    "question": "Is your tongue divided into separate sweet and salty neighborhoods?",
    "title": "Different taste-cell types are scattered across the tongue.",
    "text": "The familiar rigid tongue map is misleading. Sweet, sour, bitter, salty, and umami are not each confined to one exclusive region.",
    "explore": "Draw a distributed sensor network instead of separate single-purpose zones.",
    "why": "A simple diagram can become misleading when treated too literally. Check whether an educational picture shows a useful approximation or a false boundary.",
    "related": [
      "taste-umami",
      "hearing-pitch"
    ]
  },
  {
    "id": "flamingo-filter",
    "category": "Nature",
    "sourceKey": "flamingo",
    "question": "Who eats dinner with their beak upside down?",
    "title": "Flamingos filter food with their bills held upside down.",
    "text": "Water and mud pass through the bill, while comb-like plates called lamellae trap food. The bill is a feeding filter, not just a pair of pincers.",
    "explore": "Sketch a tool that separates tiny food particles from water.",
    "why": "The shape of a tool makes more sense when you watch it working. Orientation and movement matter alongside the material it is made from.",
    "related": [
      "flamingo-pink",
      "water-capillary"
    ]
  },
  {
    "id": "pluto-ice-mountains",
    "category": "Space",
    "sourceKey": "pluto",
    "question": "Could mountains be made of water ice instead of rock?",
    "title": "Some of Pluto’s mountains are large blocks of water ice.",
    "text": "NASA describes mountains about two to three kilometers high. In Pluto’s extreme cold, water ice can serve as a rigid landscape material.",
    "explore": "Imagine using ice as a structural material in a world where it stays extremely cold.",
    "why": "A material’s behavior depends on its environment. Calling something weak or strong without specifying conditions can be misleading.",
    "related": [
      "ice-floats",
      "pluto-long-year"
    ]
  },
  {
    "id": "ocean-sound-channel",
    "category": "Everyday science",
    "sourceKey": "sound",
    "question": "Can the ocean guide sound across enormous distances?",
    "title": "Layers of ocean water can channel sound for thousands of kilometers.",
    "text": "Changes in sound speed with temperature and pressure bend sound back toward a channel. Underwater microphones can exploit this effect.",
    "explore": "Draw a path that repeatedly bends back toward a middle layer.",
    "why": "A path can be shaped by changing conditions rather than by solid walls. This offers a useful way to think about guiding a signal.",
    "related": [
      "ocean-fast-sound",
      "water-four-degrees"
    ]
  },
  {
    "id": "slinky-ship",
    "category": "Inventions",
    "sourceKey": "slinky",
    "question": "Did a stair-walking toy begin with ship equipment?",
    "title": "Slinky grew out of Richard James’s work on stabilizing ship instruments.",
    "text": "In 1943, he noticed how a fallen spring moved and developed the idea into a toy with his wife Betty.",
    "explore": "Describe one unexpected movement that might inspire a useful object.",
    "why": "An accident becomes useful when someone investigates it. Paying attention to an unexpected result can be the beginning of a design question.",
    "related": [
      "slinky-wire",
      "playdoh-cleaner"
    ]
  },
  {
    "id": "olympic-art",
    "category": "Art & ideas",
    "sourceKey": "olympics",
    "question": "Could someone win an Olympic medal for painting or architecture?",
    "title": "Olympic arts competitions ran from Stockholm 1912 through London 1948.",
    "text": "The program included architecture, literature, music, painting, and sculpture. The Games once awarded medals beyond athletic performance.",
    "explore": "Design an event that connects a physical skill with an artistic one.",
    "why": "Institutions and categories change over time. Looking at an older program can reveal possibilities that today’s familiar version no longer suggests.",
    "related": [
      "piano-hammers",
      "art-tapestry-image"
    ]
  },
  {
    "id": "taste-umami",
    "category": "Human body",
    "sourceKey": "taste",
    "question": "Is savory a basic taste rather than just a description of dinner?",
    "title": "Umami is one of at least five basic taste qualities.",
    "text": "It is associated with glutamate, found in foods such as broth and some cheeses. Sweet, sour, bitter, and salty are not the whole familiar set.",
    "explore": "Describe a savory food without using the words salty or sweet.",
    "why": "A missing category can make an experience hard to describe. Better vocabulary helps you notice a distinction that was already present.",
    "related": [
      "taste-map-myth",
      "cacao-seeds"
    ]
  },
  {
    "id": "giraffe-seven",
    "category": "Nature",
    "sourceKey": "giraffe",
    "question": "Does a giraffe have dozens more neck bones than you?",
    "title": "A giraffe has seven neck vertebrae, just like a human.",
    "text": "The difference is largely in the size of those vertebrae: each giraffe neck bone can be over 25 centimeters long.",
    "explore": "Draw two chains with seven links each, using different link lengths.",
    "why": "A dramatic difference in scale does not necessarily require more parts. Try changing the dimensions before assuming you need a different structure.",
    "related": [
      "giraffe-patterns",
      "middle-ear-bones"
    ]
  },
  {
    "id": "pluto-long-year",
    "category": "Space",
    "sourceKey": "pluto",
    "question": "Could a year last almost two and a half centuries?",
    "title": "Pluto takes about 248 Earth years to orbit the Sun.",
    "text": "Its long, stretched orbit can even bring it closer to the Sun than Neptune for part of the journey, as happened from 1979 to 1999.",
    "explore": "Mark one Pluto year on a timeline of several human generations.",
    "why": "A unit of time can conceal a huge difference in scale. Translating between local and Earth years makes the comparison meaningful.",
    "related": [
      "neptune-long-year",
      "pluto-named-child"
    ]
  },
  {
    "id": "ocean-twilight",
    "category": "Everyday science",
    "sourceKey": "oceanlight",
    "question": "Does the ocean have a twilight zone?",
    "title": "The layer around 200 to 1,000 meters deep is often called the ocean’s twilight zone.",
    "text": "Only a little sunlight reaches these depths, generally too little for photosynthesis. The name describes light conditions, not a time of day.",
    "explore": "Design a vertical map using light instead of national borders.",
    "why": "A useful map can divide a place by conditions rather than geography. Different boundaries help answer different questions.",
    "related": [
      "ocean-midnight",
      "sky-blue-scattering"
    ]
  },
  {
    "id": "slinky-wire",
    "category": "Inventions",
    "sourceKey": "slinky",
    "question": "Could a small spring toy contain more than twenty meters of wire?",
    "title": "Richard James designed a machine to coil 80 feet of wire into a small Slinky.",
    "text": "That is about 24 meters of wire packed into a spiral. The amount of material is not obvious from the object’s height.",
    "explore": "Compare a wire stretched out with the same wire tightly coiled.",
    "why": "Folding and coiling change how much space a material occupies without removing its length. Ask which dimension a compactness claim is describing.",
    "related": [
      "slinky-ship",
      "pi-circles"
    ]
  },
  {
    "id": "taste-chemical-sense",
    "category": "Human body",
    "sourceKey": "taste",
    "question": "Are chili heat and mint coolness simply tastes?",
    "title": "Chili irritation and mint coolness involve chemical-sensing nerve endings.",
    "text": "These sensations are distinct from the basic taste qualities. Flavor also combines aroma, temperature, and texture.",
    "explore": "Separate the flavor of an imaginary meal into aroma, texture, taste, and warmth.",
    "why": "One familiar experience can combine several sensing systems. Breaking the experience into inputs is a useful way to understand how a larger system works.",
    "related": [
      "smell-backdoor",
      "onion-tears"
    ]
  },
  {
    "id": "giraffe-patterns",
    "category": "Nature",
    "sourceKey": "giraffe",
    "question": "Could you recognize a giraffe by its coat?",
    "title": "Individual giraffes have distinctive patterns of markings.",
    "text": "Coat patterns vary between giraffe species, and each individual’s arrangement is distinctive. A spotted coat is more than a generic giraffe costume.",
    "explore": "Create two patterns with the same colors but different arrangements.",
    "why": "Recognizing a pattern means noticing relationships between parts. Similar ingredients can still produce an individual arrangement.",
    "related": [
      "giraffe-seven",
      "qr-two-dimensions"
    ]
  },
  {
    "id": "charon-hover",
    "category": "Space",
    "sourceKey": "pluto",
    "question": "Could a moon appear to hang over one place in the sky?",
    "title": "From the right location on Pluto, Charon neither rises nor sets.",
    "text": "Charon’s orbit and Pluto’s rotation share a period of about 153 hours. Their synchronized motion keeps the moon above the same region.",
    "explore": "Model two objects turning so that each continually faces the other.",
    "why": "Two motions can combine into apparent stillness. A physical model helps separate the view from one location from the movement of the whole system.",
    "related": [
      "moon-rotation",
      "pluto-long-year"
    ]
  },
  {
    "id": "ocean-midnight",
    "category": "Everyday science",
    "sourceKey": "oceanlight",
    "question": "Can it be permanently dark even when it is noon overhead?",
    "title": "Below about 1,000 meters, the ocean has no penetrating sunlight.",
    "text": "This is the aphotic zone. Darkness from lack of sunlight does not rule out light made by organisms or scientific equipment.",
    "explore": "Imagine explaining daytime to an animal beyond sunlight’s reach.",
    "why": "Conditions at the surface do not describe an entire environment. Changing depth can change which assumptions remain useful.",
    "related": [
      "ocean-twilight",
      "sun-photosphere"
    ]
  },
  {
    "id": "soaker-heatpump",
    "category": "Inventions",
    "sourceKey": "soaker",
    "question": "Could a water toy grow out of a heat-pump experiment?",
    "title": "Lonnie Johnson’s heat-pump tinkering helped inspire the Super Soaker.",
    "text": "A stream from his experimental nozzle suggested a powerful water blaster. The engineer was also working on NASA’s Galileo mission during this period.",
    "explore": "Find a playful use for an effect first noticed during a serious task.",
    "why": "Ideas can cross between work and play. Recognizing a useful effect is different from assuming its first intended application is the only one.",
    "related": [
      "soaker-bottle",
      "playdoh-cleaner"
    ]
  },
  {
    "id": "taste-beyond-tongue",
    "category": "Human body",
    "sourceKey": "taste",
    "question": "Are all your taste cells on your tongue?",
    "title": "Taste cells also occur in the roof of the mouth and the throat.",
    "text": "They are grouped in taste buds and send signals through specialized nerves. The tongue is important, but it is not the whole taste system.",
    "explore": "Draw a sensing system with inputs in several places.",
    "why": "The most visible component is not always the whole system. Looking for less obvious inputs can change your explanation of an everyday process.",
    "related": [
      "hearing-signals",
      "taste-map-myth"
    ]
  },
  {
    "id": "giraffe-pacing",
    "category": "Nature",
    "sourceKey": "giraffe",
    "question": "Can a giraffe walk by moving both legs on one side together?",
    "title": "Giraffes use a walking gait called pacing.",
    "text": "The front and back leg on one side move forward together, followed by the pair on the other side. A familiar four-legged outline can hide an unfamiliar rhythm.",
    "explore": "Draw four footprints and label a possible stepping sequence.",
    "why": "Motion is part of an animal’s design story. Following the sequence can reveal something a still photograph cannot show.",
    "related": [
      "giraffe-seven",
      "ostrich-wings"
    ]
  },
  {
    "id": "comet-two-tails",
    "category": "Space",
    "sourceKey": "comets",
    "question": "Can one comet grow two different tails?",
    "title": "An active comet can have a dust tail and an ion tail.",
    "text": "Sunlight and the solar wind push material away from the comet’s surrounding cloud. The two tails involve different material and behavior.",
    "explore": "Draw two trails from one moving object and imagine different forces shaping them.",
    "why": "Two features that look similar can arise through different processes. Naming the material helps you ask which force is acting.",
    "related": [
      "comet-coma",
      "sunlight-travel"
    ]
  },
  {
    "id": "tide-long-wave",
    "category": "Everyday science",
    "sourceKey": "tides",
    "question": "Could a rising tide be part of an enormous wave?",
    "title": "Tides are very long-period waves driven by the Moon’s and Sun’s gravity.",
    "text": "As a tidal crest reaches a coast, water level rises; a trough corresponds to low tide. The coastline reveals part of a much larger motion.",
    "explore": "Compare a short breaking wave with a wave that changes over hours.",
    "why": "The same word can describe phenomena on very different scales. Thinking about period and extent makes a familiar shoreline event easier to model.",
    "related": [
      "moon-rotation",
      "ocean-sound-channel"
    ]
  },
  {
    "id": "soaker-bottle",
    "category": "Inventions",
    "sourceKey": "soaker",
    "question": "Can a soda bottle belong in an invention’s early prototype?",
    "title": "Johnson’s early water-blaster model used PVC pipe and an empty soda bottle.",
    "text": "The prototype combined an air-pressure chamber with a water reservoir. Its simple materials helped demonstrate the concept before a commercial toy existed.",
    "explore": "Sketch a harmless prototype using common containers, without pressurizing them.",
    "why": "A prototype is a way to make an idea testable. Its first job is to demonstrate a principle, not to look like the finished product.",
    "related": [
      "soaker-heatpump",
      "lovelace-bernoulli"
    ]
  },
  {
    "id": "smell-backdoor",
    "category": "Human body",
    "sourceKey": "smell",
    "question": "Can the smell of food reach your nose from inside your mouth?",
    "title": "Chewing releases aromas that can reach the nose through a channel from the throat.",
    "text": "This retronasal route helps create flavor. A blocked nose can therefore make food seem less flavorful even when basic taste sensations remain.",
    "explore": "Trace two routes by which an aroma could reach the same sensory cells.",
    "why": "The route of a signal matters as well as its destination. A connection between systems can explain why changing one affects the experience of another.",
    "related": [
      "taste-chemical-sense",
      "coffee-seeds"
    ]
  },
  {
    "id": "koala-thumbs",
    "category": "Nature",
    "sourceKey": "koala",
    "question": "Could two thumbs on each hand make climbing easier?",
    "title": "Koalas have two opposing digits on each hand for gripping branches.",
    "text": "These work with claws and textured pads to help hold onto bark. A koala hand is arranged differently from your own.",
    "explore": "Sketch a gripper with two fingers opposing the other three.",
    "why": "There is more than one way to make a useful grip. Starting with the surface and task can suggest a different arrangement of fingers.",
    "related": [
      "gecko-foot-hairs",
      "redpanda-thumb"
    ]
  },
  {
    "id": "comet-coma",
    "category": "Space",
    "sourceKey": "comets",
    "question": "Can a small icy object grow an enormous temporary atmosphere?",
    "title": "A warming comet develops a surrounding cloud called a coma.",
    "text": "Solar heat turns some of its ice into gas, releasing dust. The coma can extend hundreds of thousands of kilometers beyond a nucleus only a few kilometers across.",
    "explore": "Compare the size of a source with the cloud of material it releases.",
    "why": "The visible extent of an object need not match the size of its solid center. Distinguishing the source from its surrounding material clarifies the picture.",
    "related": [
      "comet-two-tails",
      "water-evaporation"
    ]
  },
  {
    "id": "denmark-waterfall",
    "category": "Everyday science",
    "sourceKey": "waterfall",
    "question": "Can a waterfall exist entirely underwater?",
    "title": "Cold, dense water cascades beneath warmer water in the Denmark Strait.",
    "text": "This giant overflow between Greenland and Iceland is called an underwater waterfall. It is a broad flow down seafloor slopes, not a narrow curtain falling through air.",
    "explore": "Draw two water layers with different densities meeting at a slope.",
    "why": "A memorable analogy is useful when its limits are clear. Density can drive movement even when everything around the flow is also water.",
    "related": [
      "water-four-degrees",
      "salt-density"
    ]
  },
  {
    "id": "velcro-burrs",
    "category": "Inventions",
    "sourceKey": "velcro",
    "question": "Could burrs stuck to clothing inspire a fastener?",
    "title": "George de Mestral developed hook-and-loop fasteners after examining clinging burrs.",
    "text": "Tiny hooks catching on fabric suggested a reusable fastening method. Nature supplied an observation that could be translated into manufactured parts.",
    "explore": "Draw an enlarged hook catching a loop of thread.",
    "why": "An everyday nuisance can contain a useful mechanism. Looking closely at how something attaches may reveal a design worth adapting.",
    "related": [
      "gecko-foot-hairs",
      "velcro-name"
    ]
  },
  {
    "id": "smell-combinations",
    "category": "Human body",
    "sourceKey": "smell",
    "question": "Does every smell need its own single dedicated receptor?",
    "title": "An odor molecule can stimulate a combination of smell receptors.",
    "text": "The brain interprets patterns of receptor activity. This combinatorial representation helps distinguish many odors from a more limited set of receptor types.",
    "explore": "Invent several messages using combinations of just four switches.",
    "why": "A small set of components can represent many outcomes through combinations. This connects sensory biology with the broader idea of encoding information.",
    "related": [
      "braille-cell",
      "qr-two-dimensions"
    ]
  },
  {
    "id": "koala-not-bear",
    "category": "Nature",
    "sourceKey": "koala",
    "question": "Is a koala bear actually a bear?",
    "title": "Koalas are marsupials, not bears.",
    "text": "Their young develop in a pouch. The familiar nickname describes a resemblance, not their place in the mammal family tree.",
    "explore": "Think of an object whose everyday name gives the wrong impression.",
    "why": "Names can be memorable without being reliable classifications. Asking what evidence defines a group is more useful than relying on a nickname.",
    "related": [
      "wombat-pouch",
      "okapi-relative"
    ]
  },
  {
    "id": "stardust-return",
    "category": "Space",
    "sourceKey": "comets",
    "question": "Have we brought pieces of a comet back to Earth?",
    "title": "NASA’s Stardust mission returned collected comet particles in 2006.",
    "text": "The spacecraft gathered material while passing Comet Wild 2 in 2004. Studying a returned sample offers evidence beyond a distant photograph.",
    "explore": "List questions you could answer with a sample but not with a photograph alone.",
    "why": "Different measurements reveal different kinds of evidence. Choosing how to observe something is part of choosing what you can learn about it.",
    "related": [
      "art-pigments",
      "meteor-moon-rocks"
    ]
  },
  {
    "id": "air-mostly-nitrogen",
    "category": "Everyday science",
    "sourceKey": "earth",
    "question": "Is most of the air around you oxygen?",
    "title": "Earth’s near-surface atmosphere is about 78 percent nitrogen.",
    "text": "Oxygen makes up roughly 21 percent, with other gases accounting for most of the remainder. Essential to us does not mean most abundant.",
    "explore": "Draw a hundred-square grid representing the main atmospheric gases.",
    "why": "Importance and abundance are different measures. A component can be vital without making up most of the mixture.",
    "related": [
      "ocean-oxygen",
      "salt-density"
    ]
  },
  {
    "id": "teflon-refrigerant",
    "category": "Inventions",
    "sourceKey": "teflon",
    "question": "Did a nonstick material emerge from refrigeration research?",
    "title": "Roy Plunkett discovered the material known as Teflon while researching refrigerants.",
    "text": "The heat-tolerant, stick-resistant resin later found applications from cookware to satellite components. Its first research setting was not a frying pan.",
    "explore": "Imagine three jobs for one material property.",
    "why": "A material can solve problems in fields far from its discovery. Following the property, rather than only the original product, opens more design possibilities.",
    "related": [
      "playdoh-cleaner",
      "art-pigments"
    ]
  },
  {
    "id": "wombat-pouch",
    "category": "Nature",
    "sourceKey": "wombat",
    "question": "How does a digging mother keep soil out of her baby’s pouch?",
    "title": "A wombat’s pouch opens toward the rear.",
    "text": "This arrangement helps keep dirt out while the mother digs. Even the direction of an opening can be useful in an underground lifestyle.",
    "explore": "Design a pocket for someone who works on their hands and knees.",
    "why": "An opening is a design choice. Thinking about the user’s movements can reveal why an ordinary-looking detail faces a particular way.",
    "related": [
      "koala-not-bear",
      "qanat-shafts"
    ]
  },
  {
    "id": "meteor-not-star",
    "category": "Space",
    "sourceKey": "meteors",
    "question": "Is a shooting star actually a falling star?",
    "title": "A meteor is a streak produced when space material enters an atmosphere.",
    "text": "The light commonly called a shooting star comes from a meteoroid’s high-speed atmospheric entry. It is not a star leaving its place in the sky.",
    "explore": "Rewrite a familiar sky nickname as a description of the event.",
    "why": "Everyday language can preserve an old interpretation. Separating what you see from what you think caused it is a useful scientific habit.",
    "related": [
      "meteor-small-particles",
      "sun-photosphere"
    ]
  },
  {
    "id": "vanilla-orchid",
    "category": "Everyday science",
    "sourceKey": "vanilla",
    "question": "Does vanilla come from an orchid?",
    "title": "Natural vanilla extract comes from the fruit of a vanilla orchid.",
    "text": "The familiar pod is an orchid fruit, rather than the product of a separate kind of bean plant.",
    "explore": "Trace a familiar flavor back to the plant part it comes from.",
    "why": "A kitchen ingredient can be a doorway into plant biology. Following it back to its source changes how you see an everyday food.",
    "related": [
      "cacao-seeds",
      "coffee-seeds"
    ]
  },
  {
    "id": "microwave-radar",
    "category": "Inventions",
    "sourceKey": "microwave",
    "question": "What connects radar equipment and heating your lunch?",
    "title": "Microwave-oven development grew from Percy Spencer’s work with magnetrons.",
    "text": "Noticing heating near radar equipment led him to investigate cooking with microwaves. The useful effect crossed from detection technology into the kitchen.",
    "explore": "Describe how an effect in one device could become the main purpose of another.",
    "why": "An unwanted side effect in one system may become the useful output of another. Context changes whether a phenomenon is a problem or an opportunity.",
    "related": [
      "teflon-refrigerant",
      "microwave-giant"
    ]
  },
  {
    "id": "wombat-backside",
    "category": "Nature",
    "sourceKey": "wombat",
    "question": "Could an animal defend its home with its backside?",
    "title": "A wombat can block its burrow entrance with its tough rear end.",
    "text": "Thick skin and a very small tail help protect this exposed part of the body when a wombat retreats headfirst into a tunnel.",
    "explore": "Design a shelter entrance that one solid surface could block.",
    "why": "Protection can come from how a body fits its surroundings. Consider the whole situation before judging a feature by appearance alone.",
    "related": [
      "wombat-pouch",
      "petra-carved"
    ]
  },
  {
    "id": "meteor-small-particles",
    "category": "Space",
    "sourceKey": "meteors",
    "question": "Can a grain-sized fragment make a visible streak across the sky?",
    "title": "Much meteor-shower debris is only sand-grain to pea sized.",
    "text": "As Earth crosses a debris trail, tiny fragments enter the atmosphere at high speeds. The bright event is far larger than the original particle.",
    "explore": "Compare the size of an event’s trigger with the size of its visible effect.",
    "why": "A small object can produce a large signal when it interacts with its surroundings. Scale the cause and effect separately before comparing them.",
    "related": [
      "meteor-not-star",
      "shrimp-cavitation"
    ]
  },
  {
    "id": "vanilla-handwork",
    "category": "Everyday science",
    "sourceKey": "vanilla",
    "question": "Can a tiny hand movement help produce a global flavor?",
    "title": "Much cultivated vanilla depends on hand-pollinating flowers.",
    "text": "Outside the orchid’s native pollinator range, growers often transfer pollen by hand. The finished flavor has a labor-intensive growing story.",
    "explore": "Describe the work hidden behind one small ingredient.",
    "why": "A product can depend on precise human work long before manufacturing. Looking along the whole chain gives that work appropriate credit.",
    "related": [
      "vanilla-orchid",
      "coffeepick-ripeness"
    ]
  },
  {
    "id": "microwave-giant",
    "category": "Inventions",
    "sourceKey": "microwave",
    "question": "Was an early microwave oven small enough for a kitchen counter?",
    "title": "The first Radarange weighed more than 300 kilograms and needed water cooling.",
    "text": "Early commercial microwave ovens were far larger and less convenient than modern countertop models. Demonstrating an effect and making a household product are separate milestones.",
    "explore": "List what must change between a laboratory machine and a home appliance.",
    "why": "A working principle is only the beginning of product design. Size, cooling, cost, and everyday use all deserve their own engineering work.",
    "related": [
      "microwave-radar",
      "first-transistor"
    ]
  },
  {
    "id": "elephant-radiators",
    "category": "Nature",
    "sourceKey": "elephant",
    "question": "Can ears work a little like radiators?",
    "title": "Elephants can lose heat through their large, blood-rich ears.",
    "text": "Flapping helps cool blood flowing through the ears’ many vessels. Those broad surfaces have a job beyond hearing.",
    "explore": "Sketch a cooling system with a large exposed surface.",
    "why": "A single body part can serve several functions. Surface area connects this animal adaptation with a practical engineering question.",
    "related": [
      "water-evaporation",
      "koala-thumbs"
    ]
  },
  {
    "id": "meteor-moon-rocks",
    "category": "Space",
    "sourceKey": "meteors",
    "question": "Can a rock reach Earth from another world without a spacecraft?",
    "title": "Some meteorites originated on the Moon or other planets.",
    "text": "Impacts can blast material off a larger body. Some fragments later encounter Earth, where surviving pieces can be studied as meteorites.",
    "explore": "Sketch a rock’s journey through several separate events.",
    "why": "An object’s present location need not be its birthplace. Reconstructing a journey asks us to connect physical evidence with a sequence of events.",
    "related": [
      "stardust-return",
      "stonehenge-transport"
    ]
  },
  {
    "id": "cacao-seeds",
    "category": "Everyday science",
    "sourceKey": "cacao",
    "question": "Are cocoa beans really beans?",
    "title": "Cocoa beans are the seeds inside cacao fruits.",
    "text": "Those seeds are processed to make chocolate. The kitchen name does not place the cacao tree in the bean family.",
    "explore": "Choose a food name and ask whether it describes a seed, fruit, or root.",
    "why": "Everyday ingredient names and botanical categories serve different purposes. Keeping both in mind helps prevent a memorable name becoming a mistaken explanation.",
    "related": [
      "peanut-legume",
      "coffee-seeds"
    ]
  },
  {
    "id": "eiffel-sun-lean",
    "category": "Inventions",
    "sourceKey": "eiffelheat",
    "question": "Can sunshine make the Eiffel Tower lean slightly?",
    "title": "Uneven solar heating can make the Eiffel Tower tilt away from the Sun.",
    "text": "The sunlit side expands more than the shaded sides. These small thermal movements are part of the structure’s normal response to weather.",
    "explore": "Draw two connected strips that lengthen by slightly different amounts.",
    "why": "Large structures respond to their environment. Designing for movement can be more realistic than assuming a structure must remain perfectly still.",
    "related": [
      "water-four-degrees",
      "eiffel-paint"
    ]
  },
  {
    "id": "elephant-tusks",
    "category": "Nature",
    "sourceKey": "elephant",
    "question": "Are elephant tusks horns or teeth?",
    "title": "An elephant’s tusks are elongated incisor teeth.",
    "text": "They are used for tasks including digging, lifting, and defense. Tusks grow throughout an elephant’s life.",
    "explore": "Imagine a familiar body part taking on a completely different task.",
    "why": "The same kind of structure can be adapted to different work. Asking what something is made from can change how you interpret its shape.",
    "related": [
      "hippo-teeth",
      "giraffe-seven"
    ]
  },
  {
    "id": "asteroid-moons",
    "category": "Space",
    "sourceKey": "asteroids",
    "question": "Can an asteroid have its own moon?",
    "title": "Some asteroids have small companion moons.",
    "text": "There are also binary asteroid systems, where two bodies orbit one another. Moons are not reserved for large planets.",
    "explore": "Model a small pair orbiting each other while both travel around the Sun.",
    "why": "Familiar categories can hide a wider range of systems. Ask what physical relationship defines a moon rather than assuming a particular size.",
    "related": [
      "charon-hover",
      "mars-small-moons"
    ]
  },
  {
    "id": "coffee-seeds",
    "category": "Everyday science",
    "sourceKey": "coffee",
    "question": "What exactly is a coffee bean?",
    "title": "A coffee bean is a seed from a coffee fruit.",
    "text": "An arabica fruit typically contains two seeds. Roasting transforms these seeds into the familiar aromatic ingredient.",
    "explore": "Sketch a fruit with its seeds, then label which part becomes the drink.",
    "why": "Processing can make a plant part hard to recognize. Following an ingredient backward connects the finished product with its biological origin.",
    "related": [
      "cacao-seeds",
      "vanilla-orchid"
    ]
  },
  {
    "id": "eiffel-paint",
    "category": "Inventions",
    "sourceKey": "eiffelpaint",
    "question": "Does paint help keep an enormous iron monument standing?",
    "title": "Paint protects the Eiffel Tower’s iron from corrosion.",
    "text": "Renewing the coating is an ongoing part of caring for the monument. Its preservation depends on maintenance as well as its original construction.",
    "explore": "Add a maintenance plan to a drawing of a long-lived structure.",
    "why": "Finishing a structure does not finish its engineering story. A useful design includes the work needed to protect it over time.",
    "related": [
      "roman-concrete",
      "liberty-patina"
    ]
  },
  {
    "id": "elephant-wrinkles",
    "category": "Nature",
    "sourceKey": "elephant",
    "question": "Could wrinkles help an elephant stay cool?",
    "title": "Elephant skin wrinkles can hold moisture that evaporates slowly.",
    "text": "That retained moisture helps cooling. A rough-looking surface can perform differently from a smooth one.",
    "explore": "Compare two drawn surfaces with equal widths but different numbers of folds.",
    "why": "Texture is a functional part of a surface. A wrinkle may be worth studying as a feature rather than treating it as an imperfection.",
    "related": [
      "elephant-radiators",
      "water-evaporation"
    ]
  },
  {
    "id": "asteroid-total-mass",
    "category": "Space",
    "sourceKey": "asteroids",
    "question": "Would all the asteroids together outweigh our Moon?",
    "title": "NASA puts the combined asteroid mass below the Moon’s mass.",
    "text": "A large number of separate objects does not necessarily add up to a large total compared with a single major body.",
    "explore": "Compare a jar of grains with one large stone using both count and mass.",
    "why": "Counting objects and measuring their total material answer different questions. Choose the measurement that matches the comparison you want to make.",
    "related": [
      "asteroid-moons",
      "saturn-density"
    ]
  },
  {
    "id": "coffeepick-ripeness",
    "category": "Everyday science",
    "sourceKey": "coffeepick",
    "question": "Why can harvesting coffee involve repeated careful picking?",
    "title": "Coffee fruits on a plant do not all ripen at the same time.",
    "text": "On small-holder farms, selecting ripe fruits by hand can be time-consuming. One branch does not necessarily provide one uniform harvest.",
    "explore": "Plan a harvest in which only some fruit is ready each day.",
    "why": "A process must account for variation in its inputs. The timing of natural growth can shape how people organize their work.",
    "related": [
      "vanilla-handwork",
      "water-four-degrees"
    ]
  },
  {
    "id": "liberty-patina",
    "category": "Inventions",
    "sourceKey": "liberty",
    "question": "Was the Statue of Liberty always green?",
    "title": "The statue’s green surface formed as its copper oxidized.",
    "text": "The familiar color is a patina, not the copper’s original appearance and not simply green paint.",
    "explore": "Sketch one object at several stages of exposure to its environment.",
    "why": "A surface can record a material’s history. What you see today may reflect years of chemical change rather than the maker’s original color.",
    "related": [
      "eiffel-paint",
      "liberty-thin"
    ]
  },
  {
    "id": "okapi-relative",
    "category": "Nature",
    "sourceKey": "okapi",
    "question": "Is this striped animal a zebra’s close relative?",
    "title": "An okapi is a close living relative of the giraffe.",
    "text": "Its striped legs can suggest a zebra, but its family ties are with giraffes. Its shorter neck and legs suit movement through rainforest vegetation.",
    "explore": "Compare two animals using more than their coat colors.",
    "why": "One eye-catching similarity can distract from other evidence. Classification asks us to compare multiple features and relationships.",
    "related": [
      "giraffe-patterns",
      "koala-not-bear"
    ]
  },
  {
    "id": "sun-109",
    "category": "Space",
    "sourceKey": "sun",
    "question": "How many Earth widths fit across the Sun?",
    "title": "The Sun’s diameter is about 109 times Earth’s diameter.",
    "text": "This compares widths, not volumes. A line of roughly 109 Earth diameters would span one solar diameter.",
    "explore": "Draw two circles to scale using diameters of one unit and 109 units.",
    "why": "A size comparison needs a named dimension. Diameter, area, and volume grow differently, so an impressive number still needs a clear definition.",
    "related": [
      "pi-circles",
      "asteroid-total-mass"
    ]
  },
  {
    "id": "peanut-legume",
    "category": "Everyday science",
    "sourceKey": "peanut",
    "question": "Is a peanut a botanical nut?",
    "title": "Peanuts are legumes, related to beans, lentils, and chickpeas.",
    "text": "The shell is a pod around the seeds. The familiar word nut does not describe their botanical family.",
    "explore": "Sort a few imaginary foods once by kitchen use and once by plant structure.",
    "why": "Different classification systems can both be useful without matching. Ask what rule is being used before deciding that two labels contradict each other.",
    "related": [
      "cacao-seeds",
      "redpanda-family"
    ]
  },
  {
    "id": "liberty-thin",
    "category": "Inventions",
    "sourceKey": "libertythin",
    "question": "Can a giant statue have a skin only a few millimeters thick?",
    "title": "The Statue of Liberty’s copper skin is about 2.4 millimeters thick.",
    "text": "An internal framework supports the thin outer sheets. The whole monument is not a solid mass of copper.",
    "explore": "Draw a large hollow shape with a thin skin and internal supports.",
    "why": "Size does not tell you how much material fills an object. Separating skin from supporting structure helps explain a large, lightweight form.",
    "related": [
      "liberty-patina",
      "elephant-wrinkles"
    ]
  },
  {
    "id": "okapi-footprints",
    "category": "Nature",
    "sourceKey": "okapi",
    "question": "Can a footprint leave a message you cannot see?",
    "title": "Okapis leave scent marks from glands on their feet.",
    "text": "A sticky secretion marks places they have walked. Other okapis can detect these chemical traces even after the animal has moved on.",
    "explore": "Invent a message system that does not depend on sight or sound.",
    "why": "A path can carry information as well as movement. Think about which senses a message is designed for before deciding whether it is visible.",
    "related": [
      "bee-dance",
      "smell-combinations"
    ]
  },
  {
    "id": "multiple-suns",
    "category": "Space",
    "sourceKey": "sun",
    "question": "Are two suns in one star system only science fiction?",
    "title": "Many star systems contain two or more stars.",
    "text": "Our solar system has one Sun, but multiple-star systems are common. A star need not be alone in its stellar neighborhood.",
    "explore": "Sketch a system with two stars and ask which motions you would need to model.",
    "why": "Our local arrangement is not the only possible one. Comparing alternatives helps separate a general principle from an example close to home.",
    "related": [
      "asteroid-moons",
      "neptune-mathematics"
    ]
  },
  {
    "id": "onion-tears",
    "category": "Everyday science",
    "sourceKey": "onion",
    "question": "How can cutting an onion trigger tears without any sadness?",
    "title": "Damaged onion cells produce an airborne eye irritant.",
    "text": "The compound syn-propanethial-S-oxide stimulates tear production. The tears are a response to chemistry, not necessarily emotion.",
    "explore": "List two situations where the same visible response has different causes.",
    "why": "A familiar body response can have several triggers. Distinguishing the observation from its cause makes an explanation more precise.",
    "related": [
      "smell-backdoor",
      "taste-chemical-sense"
    ]
  },
  {
    "id": "aluminum-precious",
    "category": "Inventions",
    "sourceKey": "aluminum",
    "question": "Was aluminum once expensive enough to crown a national monument?",
    "title": "In 1884, aluminum cost more per ounce than silver.",
    "text": "The Washington Monument received an aluminum tip when the metal was still difficult and expensive to produce. Familiarity today can hide a very different material history.",
    "explore": "Choose a cheap modern material and imagine it being difficult to make.",
    "why": "The value of a material depends partly on how it can be produced. Technical change can transform what people regard as rare or ordinary.",
    "related": [
      "first-transistor",
      "liberty-gold-torch"
    ]
  },
  {
    "id": "camel-fat",
    "category": "Nature",
    "sourceKey": "camel",
    "question": "Is a camel’s hump a water tank?",
    "title": "A camel’s hump stores fat, not water.",
    "text": "The stored fat provides energy. When food is scarce and the reserve is used, the hump can shrink and droop.",
    "explore": "Draw a resource tank and decide whether it stores fuel or drinking water.",
    "why": "A familiar shape can invite the wrong explanation. Distinguishing energy storage from water storage helps you ask the right question.",
    "related": [
      "camel-humps",
      "elephant-radiators"
    ]
  },
  {
    "id": "mars-blue-sunset",
    "category": "Space",
    "sourceKey": "marssunset",
    "question": "Could a red planet have a blue sunset?",
    "title": "Mars can show blue light around the setting Sun.",
    "text": "Curiosity photographed this effect in Gale Crater. Fine Martian dust favors blue light close to the Sun’s direction, especially along the long atmospheric path near sunset.",
    "explore": "Compare how different particles might change the color of transmitted light.",
    "why": "The same star can produce a different-looking sky in a different atmosphere. Context matters when you carry an Earth-based expectation elsewhere.",
    "related": [
      "sunset-red-path",
      "mars-rust"
    ]
  },
  {
    "id": "snow-sixfold",
    "category": "Everyday science",
    "sourceKey": "snow",
    "question": "Where do a snow crystal’s sixfold patterns begin?",
    "title": "Snow-crystal symmetry reflects how water molecules arrange in ice.",
    "text": "The microscopic crystal structure supports six-sided growth. Individual flakes may be damaged or combined, so not every falling piece looks like a perfect six-pointed star.",
    "explore": "Draw a branching pattern that starts from a hexagon.",
    "why": "A large visible pattern can reflect a tiny repeating arrangement. Distinguish an underlying structure from the imperfect object you actually observe.",
    "related": [
      "regular-tilings",
      "snow-growing-vapor"
    ]
  },
  {
    "id": "camel-humps",
    "category": "Nature",
    "sourceKey": "camel",
    "question": "How can two letters help you remember camel humps?",
    "title": "A sideways D suggests one hump; a sideways B suggests two.",
    "text": "Dromedary camels have one hump, while Bactrian camels have two. The letter trick is a memory aid, not the origin of their names.",
    "explore": "Create a visual memory aid for two terms you often mix up.",
    "why": "A useful reminder connects a word with a feature you can picture. Inventing your own can also reveal what you need to distinguish.",
    "related": [
      "camel-fat",
      "drawing-memory"
    ]
  },
  {
    "id": "snow-growing-vapor",
    "category": "Everyday science",
    "sourceKey": "snow",
    "question": "Is a snow crystal simply a frozen raindrop?",
    "title": "Snow crystals can grow as water vapor deposits onto ice.",
    "text": "Their branches develop as molecules join the growing crystal. Temperature and moisture along the journey influence the final shape.",
    "explore": "Draw a crystal gaining material one layer at a time.",
    "why": "Different routes can lead to a solid form. Following how material arrives is often more informative than only naming its final state.",
    "related": [
      "water-evaporation",
      "snow-sixfold"
    ]
  },
  {
    "id": "ostrich-toes",
    "category": "Nature",
    "sourceKey": "ostrich",
    "question": "How many toes does the world’s largest living bird run on?",
    "title": "An ostrich has just two toes on each foot.",
    "text": "Its long, powerful legs are adapted for running rather than flight. A bird’s foot need not look like the familiar three-forward, one-back arrangement.",
    "explore": "Sketch a running foot and decide which parts need to touch the ground.",
    "why": "A structure makes more sense when you consider the movement it supports. Counting the parts is a starting point for that investigation.",
    "related": [
      "ostrich-wings",
      "giraffe-pacing"
    ]
  },
  {
    "id": "snow-clumps",
    "category": "Everyday science",
    "sourceKey": "snowclumps",
    "question": "Can one snowflake contain many separate crystals?",
    "title": "Some snowflakes are clumps of many ice crystals stuck together.",
    "text": "Others consist of a single crystal. A falling flake is not always the neat individual star shown in a drawing.",
    "explore": "Compare a single building block with a cluster made from several blocks.",
    "why": "A word may describe an aggregate as well as one component. Identifying the level you are counting helps make an observation more precise.",
    "related": [
      "snow-sixfold",
      "saturn-rings"
    ]
  },
  {
    "id": "ostrich-wings",
    "category": "Nature",
    "sourceKey": "ostrich",
    "question": "Why keep wings if you cannot fly?",
    "title": "Ostriches use their wings for balance and display.",
    "text": "Wings help when the birds run and change direction, and they also feature in courtship. A feature can stay useful after losing a familiar function.",
    "explore": "Give a familiar tool a useful job other than its usual one.",
    "why": "The first function you associate with a structure may not be its only one. Look at what it actually does in its present setting.",
    "related": [
      "ostrich-toes",
      "playdoh-cleaner"
    ]
  },
  {
    "id": "lightning-repeat",
    "category": "Everyday science",
    "sourceKey": "lightning",
    "question": "Can lightning strike the same place twice?",
    "title": "Lightning can strike the same place repeatedly.",
    "text": "Tall, isolated objects are especially likely targets. A previous strike does not make a location safe; seek proper shelter when thunder is heard.",
    "explore": "Explain why a random event can still favor some locations over others.",
    "why": "Chance does not imply equal probability everywhere. A memorable saying should not replace an explanation of the conditions that affect risk.",
    "related": [
      "lightning-hot",
      "eiffel-sun-lean"
    ]
  },
  {
    "id": "ostrich-speed",
    "category": "Nature",
    "sourceKey": "ostrich",
    "question": "Could a flightless bird outrun many city speed limits?",
    "title": "Ostriches can sprint at about 70 kilometers per hour.",
    "text": "That is a short-burst speed, not a pace they maintain indefinitely. Their legs can cover several meters in one stride.",
    "explore": "Compare a sprint record with a comfortable all-day travel speed.",
    "why": "A number becomes more useful when its conditions are clear. Distinguish peak performance from sustainable performance when comparing animals or machines.",
    "related": [
      "ostrich-toes",
      "jupiter-fast-spin"
    ]
  },
  {
    "id": "lightning-hot",
    "category": "Everyday science",
    "sourceKey": "thunderheat",
    "question": "Can a lightning channel be hotter than the Sun’s visible surface?",
    "title": "A lightning flash can heat air to around 30,000 degrees Celsius.",
    "text": "That is several times hotter than the Sun’s visible surface, not hotter than its core. The comparison concerns temperature, not total energy.",
    "explore": "Compare a tiny very hot region with a much larger cooler one.",
    "why": "Temperature and total heat are different quantities. A surprising comparison becomes clearer when it names the part being measured and avoids implying equal energy.",
    "related": [
      "sun-photosphere",
      "thunder-expansion"
    ]
  },
  {
    "id": "anteater-teeth",
    "category": "Nature",
    "sourceKey": "anteater",
    "question": "How does a giant anteater eat without teeth?",
    "title": "A giant anteater gathers insects with a long, sticky tongue.",
    "text": "The tongue carries tiny backward-pointing spines and can reach about 60 centimeters. Teeth are not the only way to collect a meal.",
    "explore": "Design a collector for small objects trapped in narrow spaces.",
    "why": "A specialized tool can replace a familiar one. Start with the food and its hiding place to understand the feeding system.",
    "related": [
      "flamingo-filter",
      "octopus-taste"
    ]
  },
  {
    "id": "thunder-expansion",
    "category": "Everyday science",
    "sourceKey": "thunderheat",
    "question": "What turns a lightning flash into a crash of thunder?",
    "title": "Rapid heating by lightning makes air expand and creates a shock wave.",
    "text": "That pressure disturbance travels outward as thunder. The sound is a physical consequence of the flash, not clouds colliding.",
    "explore": "Draw an expanding disturbance around a narrow heated path.",
    "why": "Following a chain of causes connects light, heat, pressure, and sound. The visible event and the audible one can be different stages of one process.",
    "related": [
      "thunder-delay",
      "ocean-fast-sound"
    ]
  },
  {
    "id": "anteater-fists",
    "category": "Nature",
    "sourceKey": "anteater",
    "question": "Which animal walks on its fists to protect its tools?",
    "title": "Giant anteaters curl their front claws inward while walking.",
    "text": "This helps keep the claws sharp for opening insect nests and for defense. Walking and digging place different demands on the same limbs.",
    "explore": "Sketch a tool that can be tucked away while being transported.",
    "why": "A useful design needs a safe resting position as well as a working one. How a tool is carried can help preserve its function.",
    "related": [
      "anteater-teeth",
      "gecko-release"
    ]
  },
  {
    "id": "static-shock",
    "category": "Everyday science",
    "sourceKey": "electricity",
    "question": "Can walking across a carpet help produce a tiny spark?",
    "title": "A buildup of electric charge can discharge as a static shock.",
    "text": "A sudden transfer of charge between you and another object can produce the familiar small spark. It does not require a battery in your clothing.",
    "explore": "Sketch charge building up in one place and then taking a new path.",
    "why": "Energy-related effects can come from a buildup as well as a steady supply. Tracking what accumulates helps explain a sudden release.",
    "related": [
      "electric-imbalance",
      "lightning-repeat"
    ]
  },
  {
    "id": "anteater-blanket",
    "category": "Nature",
    "sourceKey": "anteater",
    "question": "Can a tail double as a blanket?",
    "title": "A giant anteater can use its bushy tail as cover.",
    "text": "The long hair can provide a blanket or sunshade. A tail’s function is not limited to balance or signaling.",
    "explore": "Give one item in your bag a second useful purpose.",
    "why": "Multi-purpose design starts by noticing material properties. A broad, hairy surface invites different uses from a thin, rigid one.",
    "related": [
      "binturong-tail",
      "ur-reversible-box"
    ]
  },
  {
    "id": "electric-imbalance",
    "category": "Everyday science",
    "sourceKey": "electricity",
    "question": "Do positive and negative electric charges behave the same way together?",
    "title": "Opposite electric charges attract, while like charges repel.",
    "text": "An imbalance between positive and negative charge underlies static-electric effects. A neutral object has balanced charge, not an absence of charged particles.",
    "explore": "Draw pairs of positive and negative symbols, then remove one symbol.",
    "why": "A balanced total can hide active components. Distinguishing neutrality from absence is a useful way to reason about many systems.",
    "related": [
      "static-shock",
      "first-transistor"
    ]
  },
  {
    "id": "binturong-popcorn",
    "category": "Nature",
    "sourceKey": "binturong",
    "question": "What animal smells surprisingly like popcorn?",
    "title": "Binturongs have a scent often compared with freshly made popcorn.",
    "text": "Despite the nickname bearcat, a binturong is neither a bear nor a cat; it belongs to the civet family.",
    "explore": "Describe a smell using comparisons rather than its name.",
    "why": "A surprising sensory detail can become a doorway into classification. Keep the observation separate from the nickname when explaining the animal.",
    "related": [
      "binturong-tail",
      "smell-combinations"
    ]
  },
  {
    "id": "firework-colors",
    "category": "Everyday science",
    "sourceKey": "fireworks",
    "question": "What connects a blue firework with a red one?",
    "title": "Different chemical elements help produce different firework colors.",
    "text": "Copper compounds can produce blue, while strontium compounds produce red. The display’s palette has a material basis rather than being colored light bulbs.",
    "explore": "Match an imaginary light display to a set of material ingredients.",
    "why": "A visual effect can reveal material properties. Connecting appearance with composition turns a celebration into a question about how matter behaves.",
    "related": [
      "art-pigments",
      "firework-gold-sparks"
    ]
  },
  {
    "id": "binturong-tail",
    "category": "Nature",
    "sourceKey": "binturong",
    "question": "Could your tail work like an extra hand?",
    "title": "A binturong’s prehensile tail can grip branches.",
    "text": "The muscular tail has a grippy patch near its tip. Adults still use their paws for support rather than relying entirely on the tail.",
    "explore": "Design a supporting arm that grips without a separate hand.",
    "why": "Support can be distributed across several contact points. Looking at how an animal holds on may suggest a useful mechanical arrangement.",
    "related": [
      "koala-thumbs",
      "anteater-blanket"
    ]
  },
  {
    "id": "firework-gold-sparks",
    "category": "Everyday science",
    "sourceKey": "fireworks",
    "question": "Do golden firework sparks need to contain gold?",
    "title": "Iron filings and small charcoal pieces can create gold-colored sparks.",
    "text": "The color name describes the appearance of the effect, not a requirement to use the precious metal.",
    "explore": "Name three things described as golden that are not made of gold.",
    "why": "Color words are not ingredient lists. Keeping an appearance separate from composition helps avoid a surprisingly common inference.",
    "related": [
      "firework-colors",
      "liberty-gold-torch"
    ]
  },
  {
    "id": "redpanda-thumb",
    "category": "Nature",
    "sourceKey": "redpanda",
    "question": "Can a wrist bone act like a thumb?",
    "title": "Red pandas have a wrist bone that helps them grasp bamboo.",
    "text": "This so-called false thumb supports feeding without being an ordinary finger. A useful grip can emerge from a different part of the skeleton.",
    "explore": "Sketch a clamp added beside a hand’s existing fingers.",
    "why": "A new function does not always require an entirely new part. Repositioning or adapting an existing structure can offer another solution.",
    "related": [
      "koala-thumbs",
      "babbage-loom"
    ]
  },
  {
    "id": "redpanda-family",
    "category": "Nature",
    "sourceKey": "redpanda",
    "question": "Is the red panda simply a small kind of giant panda?",
    "title": "Red pandas belong to their own family, Ailuridae.",
    "text": "They are not miniature giant pandas. Modern classification places this bamboo-eating animal in a distinct mammal family.",
    "explore": "Compare a shared name with the evidence needed to establish a relationship.",
    "why": "Names can group things more loosely than scientific classifications do. Similar diets and appearances are questions to investigate, not proof of close kinship.",
    "related": [
      "okapi-relative",
      "koala-not-bear"
    ]
  },
  {
    "id": "polar-clear-fur",
    "category": "Nature",
    "sourceKey": "polar",
    "question": "Is a polar bear’s fur really white?",
    "title": "Polar bear guard hairs are clear rather than white-pigmented.",
    "text": "The coat looks white even though the individual hairs are transparent, hollow structures. Appearance and material color need not be the same thing.",
    "explore": "Compare a clear material on its own with a pile of the same material.",
    "why": "Light interacting with a structure can produce an appearance that its individual parts do not suggest. Ask about both the material and its arrangement.",
    "related": [
      "art-stained-glass",
      "sunlight-colors"
    ]
  },
  {
    "id": "polar-swimmer",
    "category": "Nature",
    "sourceKey": "polar",
    "question": "Can a bear swim farther than a marathon?",
    "title": "Polar bears have been known to swim about 100 kilometers without resting.",
    "text": "Their broad front paws provide propulsion, while their rear legs help steer. This is an observed capability, not a required daily distance.",
    "explore": "Sketch a swimmer with separate surfaces for propulsion and steering.",
    "why": "Dividing work among body parts makes movement easier to analyze. Separating an observed feat from a normal routine also makes the claim more precise.",
    "related": [
      "binturong-tail",
      "octopus-hearts"
    ]
  },
  {
    "id": "hippo-sunscreen",
    "category": "Nature",
    "sourceKey": "hippo",
    "question": "Is a hippo’s reddish skin secretion actually blood?",
    "title": "Hippos release a reddish protective secretion, not blood sweat.",
    "text": "It helps keep the skin moist and protects against sunburn. The dramatic nickname can hide a more useful explanation.",
    "explore": "Name a protective coating by what it does rather than what it resembles.",
    "why": "A nickname is not a chemical description. Asking about a substance’s function helps move from a memorable phrase to an explanation.",
    "related": [
      "elephant-wrinkles",
      "art-environment"
    ]
  },
  {
    "id": "hippo-teeth",
    "category": "Nature",
    "sourceKey": "hippo",
    "question": "Can a hippo keep growing its fighting teeth?",
    "title": "Hippo canine and incisor teeth grow continuously.",
    "text": "The enlarged canines are used in confrontations. This differs from imagining every adult tooth as a finished, unchanging structure.",
    "explore": "Compare a tool that wears out with one that keeps adding material.",
    "why": "Growth and wear can be part of the same system. Looking at both helps explain why a structure maintains its form over time.",
    "related": [
      "elephant-tusks",
      "roman-concrete"
    ]
  },
  {
    "id": "horseshoe-family",
    "category": "Nature",
    "sourceKey": "horseshoe",
    "question": "Is a horseshoe crab really a crab?",
    "title": "Horseshoe crabs are more closely related to spiders and scorpions than to true crabs.",
    "text": "Their common name comes from appearance rather than a close relationship to crustacean crabs.",
    "explore": "Invent a misleading animal nickname, then explain why it misleads.",
    "why": "A familiar label can be a poor guide to ancestry. Comparing relationships rather than silhouettes can overturn an easy first impression.",
    "related": [
      "okapi-relative",
      "redpanda-family"
    ]
  },
  {
    "id": "horseshoe-blue",
    "category": "Nature",
    "sourceKey": "horseshoe",
    "question": "What does blue blood have to do with checking medical products?",
    "title": "Horseshoe crab blood has been used to detect bacterial toxins.",
    "text": "The copper-based blood is blue, and a clotting response to bacterial endotoxins has made it valuable for testing certain medical products.",
    "explore": "Design a test in which a visible change signals an invisible contaminant.",
    "why": "A biological response can become a measuring tool. The useful connection is between a specific reaction and the thing it helps detect.",
    "related": [
      "horseshoe-family",
      "hydrometer"
    ]
  },
  {
    "id": "horseshoe-tail",
    "category": "Nature",
    "sourceKey": "horseshoe",
    "question": "Is that long tail only a weapon-shaped decoration?",
    "title": "Horseshoe crabs use their tails to help right themselves when overturned.",
    "text": "The tail also helps with steering in water. Shape alone can suggest a function that is quite different from the observed one.",
    "explore": "Sketch a way to turn over without using arms.",
    "why": "Understanding a feature means observing its use. A recovery mechanism may be just as important as the normal way an animal moves.",
    "related": [
      "binturong-tail",
      "gecko-release"
    ]
  },
  {
    "id": "ocean-oxygen",
    "category": "Nature",
    "sourceKey": "oxygen",
    "question": "Do tiny ocean organisms help make the oxygen around us?",
    "title": "Roughly half of Earth’s oxygen production comes from the ocean.",
    "text": "Photosynthetic plankton do much of this work. Marine life and decay consume roughly as much, so production is not the same as a net addition to the atmosphere.",
    "explore": "Draw separate arrows for oxygen production and oxygen use.",
    "why": "A large flow is different from a growing stock. Keeping production and consumption separate helps explain an environmental system accurately.",
    "related": [
      "coral-partnership",
      "water-evaporation"
    ]
  },
  {
    "id": "cacao-trunk",
    "category": "Nature",
    "sourceKey": "cacao",
    "question": "Can flowers grow straight out of a tree trunk?",
    "title": "Cacao produces flowers directly on its trunk and branches.",
    "text": "This growth pattern is called cauliflory. The tree that supplies chocolate has a flowering habit unlike the twig-tip flowers many people picture.",
    "explore": "Draw a tree with three possible places for its flowers.",
    "why": "A familiar plant outline can hide different growth strategies. Observing where a structure forms can be as interesting as identifying the structure itself.",
    "related": [
      "cacao-seeds",
      "vanilla-orchid"
    ]
  },
  {
    "id": "coffee-wild",
    "category": "Nature",
    "sourceKey": "coffee",
    "question": "Can a widely grown crop have endangered wild relatives?",
    "title": "Wild arabica coffee is classified as Endangered.",
    "text": "Kew’s assessment identifies threats including deforestation and climate change. Widespread cultivation does not guarantee security for wild populations.",
    "explore": "Compare a cultivated garden with the wild population of the same plant.",
    "why": "Abundance in shops and security in nature are different questions. Specify which population a claim describes before assuming that a crop is safe everywhere.",
    "related": [
      "coffee-seeds",
      "coral-bleaching"
    ]
  },
  {
    "id": "peanut-underground",
    "category": "Nature",
    "sourceKey": "peanut",
    "question": "Can a plant flower above ground but develop fruit below it?",
    "title": "Peanut pods develop underground after the flower is pollinated.",
    "text": "A growing peg carries the developing ovary into the soil. This unusual fruiting pattern is called geocarpy.",
    "explore": "Sketch the route from an above-ground flower to an underground pod.",
    "why": "Growth can move a developing structure into a different environment. Following the sequence makes an unusual life cycle easier to understand.",
    "related": [
      "peanut-legume",
      "cacao-trunk"
    ]
  }
];

export const soundsMadeUpFacts: SoundsMadeUpFact[] = drafts.map(draft => ({ ...draft, collection: 'sounds-made-up', source: soundsMadeUpSources[draft.sourceKey].label, url: soundsMadeUpSources[draft.sourceKey].url }));
