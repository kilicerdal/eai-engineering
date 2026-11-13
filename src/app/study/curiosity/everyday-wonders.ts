import type { Fact } from './facts';

// V1.6: append-only records; source claims checked 2026-11-13.
// Explore and Why it matters are original editorial reflections, not extra factual claims.
export const everydayWonderSources = {
  "banana": {
    "label": "Kew · Cavendish banana",
    "url": "https://www.kew.org/plants/cavendish-banana",
    "reviewedOn": "2026-11-13"
  },
  "bananaberry": {
    "label": "University of Oxford · Musa × paradisiaca",
    "url": "https://herbaria.plants.ox.ac.uk/bol/plants400/Profiles/MN/Musa",
    "reviewedOn": "2026-11-13"
  },
  "bananawild": {
    "label": "Kew · Musa × paradisiaca",
    "url": "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A797527-1/general-information",
    "reviewedOn": "2026-11-13"
  },
  "pineapple": {
    "label": "University of Florida IFAS · Pineapple",
    "url": "https://gardeningsolutions.ifas.ufl.edu/plants/edibles/fruits/pineapple/",
    "reviewedOn": "2026-11-13"
  },
  "pineapplecrown": {
    "label": "Kew · Pineapple",
    "url": "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A12322-2/general-information",
    "reviewedOn": "2026-11-13"
  },
  "strawberry": {
    "label": "Kew · Garden strawberry",
    "url": "https://www.kew.org/plants/garden-strawberry",
    "reviewedOn": "2026-11-13"
  },
  "cashew": {
    "label": "Indian Institute of Science · Anacardium occidentale",
    "url": "https://indiatrees-ces.iisc.ac.in/herbsheet.php?cat=16&id=153",
    "reviewedOn": "2026-11-13"
  },
  "spices": {
    "label": "FDA · Spice definitions",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/cpg-sec-525750-spices-definitions",
    "reviewedOn": "2026-11-13"
  },
  "allspice": {
    "label": "Kew · Pimenta dioica",
    "url": "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A196799-2/general-information",
    "reviewedOn": "2026-11-13"
  },
  "bread": {
    "label": "Exploratorium · Bread science",
    "url": "https://annex.exploratorium.edu/cooking/bread/bread_science.html",
    "reviewedOn": "2026-11-13"
  },
  "eggs": {
    "label": "Exploratorium · Egg science",
    "url": "https://annex.exploratorium.edu/cooking/eggs/eggscience.html",
    "reviewedOn": "2026-11-13"
  },
  "sugar": {
    "label": "Exploratorium · Sugar science",
    "url": "https://annex.exploratorium.edu/cooking/candy/sugar.html",
    "reviewedOn": "2026-11-13"
  },
  "popcorn": {
    "label": "Purdue University · Popcorn research",
    "url": "https://ag.purdue.edu/news/2020/02/whats-under-the-shell-of-this-popular-snack.html",
    "reviewedOn": "2026-11-13"
  },
  "cabbage": {
    "label": "American Chemical Society · Red cabbage indicator",
    "url": "https://www.acs.org/education/activities/red-cabbage-indicator.html",
    "reviewedOn": "2026-11-13"
  },
  "maple": {
    "label": "Michigan DNR · Maple syrup",
    "url": "https://www.michigan.gov/dnr/things-to-do/foraging/maple-syrup",
    "reviewedOn": "2026-11-13"
  },
  "ginger": {
    "label": "Kew · Ginger",
    "url": "https://www.kew.org/plants/ginger",
    "reviewedOn": "2026-11-13"
  },
  "caper": {
    "label": "University of Wisconsin Extension · Capers",
    "url": "https://hort.extension.wisc.edu/articles/capers-capparis-spinosa/",
    "reviewedOn": "2026-11-13"
  },
  "pepper": {
    "label": "ICAR–Indian Institute of Spices Research · Black pepper",
    "url": "https://spices.res.in/products/spices/black-pepper.html",
    "reviewedOn": "2026-11-13"
  },
  "cloudwater": {
    "label": "USGS · Cloud weight calculation",
    "url": "https://www.usgs.gov/water-science-school/science/how-much-does-a-cloud-weigh",
    "reviewedOn": "2026-11-13"
  },
  "cloud": {
    "label": "NOAA JetStream · How clouds form",
    "url": "https://www.noaa.gov/jetstream/clouds/how-clouds-form",
    "reviewedOn": "2026-11-13"
  },
  "fog": {
    "label": "National Weather Service · Fog tutorial",
    "url": "https://www.weather.gov/lmk/fog_tutorial",
    "reviewedOn": "2026-11-13"
  },
  "precip": {
    "label": "NOAA NSSL · Types of frozen precipitation",
    "url": "https://www.nssl.noaa.gov/education/svrwx101/hail/types/",
    "reviewedOn": "2026-11-13"
  },
  "hail": {
    "label": "NOAA JetStream · Hail",
    "url": "https://www.noaa.gov/jetstream/hail",
    "reviewedOn": "2026-11-13"
  },
  "optics": {
    "label": "Met Office · Optical effects",
    "url": "https://weather.metoffice.gov.uk/learn-about/weather/optical-effects",
    "reviewedOn": "2026-11-13"
  },
  "weird": {
    "label": "National Weather Service · Weird weather",
    "url": "https://www.weather.gov/owlie/weird-weather",
    "reviewedOn": "2026-11-13"
  },
  "pumice": {
    "label": "USGS · Pumice",
    "url": "https://volcanoes.usgs.gov/vsc/glossary/pumice.html",
    "reviewedOn": "2026-11-13"
  },
  "obsidian": {
    "label": "National Park Service · Obsidian",
    "url": "https://www.nps.gov/band/learn/nature/obsidian.htm",
    "reviewedOn": "2026-11-13"
  },
  "columns": {
    "label": "National Park Service · Columnar jointing",
    "url": "https://www.nps.gov/subjects/volcanoes/columnar-jointing.htm",
    "reviewedOn": "2026-11-13"
  },
  "water": {
    "label": "USGS · How much water is there on Earth?",
    "url": "https://www.usgs.gov/water-science-school/science/how-much-water-there-earth",
    "reviewedOn": "2026-11-13"
  },
  "glaciers": {
    "label": "USGS · Water stored in glaciers",
    "url": "https://www.usgs.gov/faqs/how-much-earths-water-stored-glaciers",
    "reviewedOn": "2026-11-13"
  },
  "groundwater": {
    "label": "USGS · Groundwater basics",
    "url": "https://www.usgs.gov/mission-areas/water-resources/science/groundwater-basics",
    "reviewedOn": "2026-11-13"
  },
  "antarctic": {
    "label": "British Antarctic Survey · Antarctica",
    "url": "https://www.bas.ac.uk/about/where-we-work/antarctica/",
    "reviewedOn": "2026-11-13"
  },
  "mountain": {
    "label": "NOAA · Highest point on Earth",
    "url": "https://oceanservice.noaa.gov/facts/highestpoint.html",
    "reviewedOn": "2026-11-13"
  },
  "ridge": {
    "label": "NOAA · Longest mountain range",
    "url": "https://oceanservice.noaa.gov/facts/midoceanridge.html",
    "reviewedOn": "2026-11-13"
  },
  "dew": {
    "label": "Met Office · Dew",
    "url": "https://weather.metoffice.gov.uk/learn-about/weather/types-of-weather/temperature/dew",
    "reviewedOn": "2026-11-13"
  },
  "frost": {
    "label": "National Weather Service · Dew and frost development",
    "url": "https://www.weather.gov/source/zhu/ZHU_Training_Page/fog_stuff/Dew_Frost/Dew_Frost.htm",
    "reviewedOn": "2026-11-13"
  },
  "waterspout": {
    "label": "NOAA · Waterspouts",
    "url": "https://oceanservice.noaa.gov/facts/waterspout.html",
    "reviewedOn": "2026-11-13"
  },
  "barcode": {
    "label": "GS1 · Historical timeline",
    "url": "https://support.gs1.org/support/solutions/articles/43000734073-gs1-historical-timeline",
    "reviewedOn": "2026-11-13"
  },
  "pencil": {
    "label": "American Chemical Society · Pencils and erasers",
    "url": "https://www.acs.org/content/dam/acsorg/education/whatischemistry/adventuresinchemistry/secretscience/pencil/pencils.pdf",
    "reviewedOn": "2026-11-13"
  },
  "biro": {
    "label": "National Inventors Hall of Fame · László Bíró",
    "url": "https://www.invent.org/inductees/laszlo-josef-biro",
    "reviewedOn": "2026-11-13"
  },
  "zipper": {
    "label": "National Inventors Hall of Fame · Gideon Sundback",
    "url": "https://www.invent.org/inductees/gideon-sundback",
    "reviewedOn": "2026-11-13"
  },
  "pin": {
    "label": "National Inventors Hall of Fame · Walter Hunt",
    "url": "https://www.invent.org/inductees/walter-hunt",
    "reviewedOn": "2026-11-13"
  },
  "microwave": {
    "label": "FDA · Microwave ovens",
    "url": "https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens",
    "reviewedOn": "2026-11-13"
  },
  "flask": {
    "label": "Royal Institution · James Dewar’s vacuum flask",
    "url": "https://www.rigb.org/explore-science/explore/collection/james-dewars-vacuum-flask",
    "reviewedOn": "2026-11-13"
  },
  "led": {
    "label": "US Department of Energy · LED basics",
    "url": "https://www.energy.gov/cmei/ssl/led-basics",
    "reviewedOn": "2026-11-13"
  },
  "buttertaste": {
    "label": "Florida Museum · How butterflies taste",
    "url": "https://www.floridamuseum.ufl.edu/exhibits/blog/butterfly-moment-how-do-they-taste/",
    "reviewedOn": "2026-11-13"
  },
  "butterfly": {
    "label": "Florida Museum · Butterfly educator’s guide",
    "url": "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/16/2017/02/Butterfly-Educators-Guide.pdf",
    "reviewedOn": "2026-11-13"
  },
  "dragon": {
    "label": "Missouri Department of Conservation · Dragonfly larvae",
    "url": "https://mdc.mo.gov/discover-nature/field-guide/dragonfly-larvae",
    "reviewedOn": "2026-11-13"
  },
  "darner": {
    "label": "National Park Service · Common green darner",
    "url": "https://www.nps.gov/articles/000/common-green-darner.htm",
    "reviewedOn": "2026-11-13"
  },
  "snail": {
    "label": "Australian Museum · Snails and slugs",
    "url": "https://australian.museum/learn/animals/molluscs/snails-and-slugs/",
    "reviewedOn": "2026-11-13"
  },
  "mollusc": {
    "label": "Australian Museum · Molluscs",
    "url": "https://australian.museum/learn/animals/molluscs/",
    "reviewedOn": "2026-11-13"
  },
  "ants": {
    "label": "Smithsonian · Insect Zoo exhibit tour",
    "url": "https://naturalhistory.si.edu/visit/accessibility/audio-and-visual-description/insect-zoo-audio-description-tour",
    "reviewedOn": "2026-11-13"
  },
  "antbacteria": {
    "label": "Nature Communications · Acromyrmex defensive symbiosis, 2018",
    "url": "https://www.nature.com/articles/s41467-018-04520-1",
    "reviewedOn": "2026-11-13"
  },
  "worm": {
    "label": "University of Illinois Extension · Worm facts",
    "url": "https://web.extension.illinois.edu/worms/facts/",
    "reviewedOn": "2026-11-13"
  },
  "spider": {
    "label": "San Diego Zoo Wildlife Alliance · Spider",
    "url": "https://animals.sandiegozoo.org/animals/spider",
    "reviewedOn": "2026-11-13"
  },
  "frog": {
    "label": "Colorado Parks and Wildlife · Wood frog",
    "url": "https://cpw.state.co.us/species/wood-frog",
    "reviewedOn": "2026-11-13"
  },
  "frogsugar": {
    "label": "National Park Service · Denali amphibians",
    "url": "https://www.nps.gov/dena/learn/nature/amphibians.htm",
    "reviewedOn": "2026-11-13"
  },
  "blind": {
    "label": "American Academy of Ophthalmology · Blind spot",
    "url": "https://www.aao.org/eye-health/anatomy/blind-spot",
    "reviewedOn": "2026-11-13"
  },
  "rods": {
    "label": "Stanford University · Rods and cones",
    "url": "https://web.stanford.edu/class/ee168/handouts/handout2.pdf",
    "reviewedOn": "2026-11-13"
  },
  "eye": {
    "label": "National Eye Institute · How the eyes work",
    "url": "https://www.nei.nih.gov/eye-health-information/healthy-vision/how-eyes-work",
    "reviewedOn": "2026-11-13"
  },
  "balance": {
    "label": "NIH NIDCD · How the body keeps its balance",
    "url": "https://www.nidcd.nih.gov/health/balance-disorders",
    "reviewedOn": "2026-11-13"
  },
  "skin": {
    "label": "NIH NIAMS · Learning about skin",
    "url": "https://www.niams.nih.gov/health-topics/educational-resources/health-lesson-learning-about-skin",
    "reviewedOn": "2026-11-13"
  }
} as const;

export type EverydayWonder = Fact & { sourceKey: keyof typeof everydayWonderSources; why: string; related: [string, string] };
const drafts: Omit<EverydayWonder, 'source' | 'url' | 'collection'>[] = [
  {
    "id": "banana-herb",
    "category": "Food & Drink",
    "sourceKey": "banana",
    "question": "Can a banana plant be a giant herb?",
    "title": "That banana “trunk” is not wood.",
    "text": "Bananas are large herbaceous plants. Their apparent trunk is a pseudostem built from tightly packed leaf bases.",
    "explore": "Sketch a trunk assembled from overlapping leaves.",
    "why": "A familiar silhouette can conceal unfamiliar construction. Look at the parts before deciding that two structures work the same way.",
    "related": [
      "banana-seeds",
      "cacao-trunk"
    ]
  },
  {
    "id": "cloud-visible",
    "category": "Earth & Weather",
    "sourceKey": "cloud",
    "question": "Can you actually see water vapor in a cloud?",
    "title": "Clouds are visible droplets or ice.",
    "text": "Water vapor itself is invisible. The cloud we see contains condensed liquid droplets, ice crystals, or both.",
    "explore": "Draw water in invisible and visible atmospheric forms.",
    "why": "Visibility does not tell us whether a substance is present. Distinguishing a gas from its condensed forms prevents a common mistake about clouds.",
    "related": [
      "cloud-mass",
      "ice-floats"
    ]
  },
  {
    "id": "first-upc-gum",
    "category": "Inventions",
    "sourceKey": "barcode",
    "question": "What item made supermarket barcode history in 1974?",
    "title": "A pack of gum marked a checkout milestone.",
    "text": "The first UPC scan at a supermarket checkout was a pack of Wrigley’s chewing gum in Ohio in June 1974. It was not the first use of every kind of barcode.",
    "explore": "Choose an ordinary object that could become a technology milestone.",
    "why": "Major infrastructure can enter daily life through an unremarkable purchase. A precise description of the milestone keeps the story accurate.",
    "related": [
      "ballpoint-ball",
      "qr-two-dimensions"
    ]
  },
  {
    "id": "butterfly-feet",
    "category": "Nature",
    "sourceKey": "buttertaste",
    "question": "Can a butterfly taste with its feet?",
    "title": "Butterfly feet carry taste receptors.",
    "text": "Contact with a plant can provide chemical information that helps a butterfly assess it.",
    "explore": "Design a robot foot that senses both contact and chemistry.",
    "why": "Sensing is not limited to the body parts we expect. A useful sensor can be placed where information is needed during an action.",
    "related": [
      "butterfly-straw",
      "octopus-taste"
    ]
  },
  {
    "id": "eye-blindspot",
    "category": "Human body",
    "sourceKey": "blind",
    "question": "Does each healthy eye have a natural blind spot?",
    "title": "The optic nerve exits through a gap in light sensing.",
    "text": "At that location on the retina, there are no photoreceptors to detect incoming light.",
    "explore": "Draw a sensor sheet with one opening for its cable.",
    "why": "Biological systems have structural constraints as well as abilities. A gap can be part of normal construction rather than evidence of a broken system.",
    "related": [
      "pupil-opening",
      "hearing-signals"
    ]
  },
  {
    "id": "banana-berry",
    "category": "Food & Drink",
    "sourceKey": "bananaberry",
    "question": "Does a banana count as a berry?",
    "title": "A banana is a botanical berry.",
    "text": "Botanical fruit categories follow how flowers develop into fruits, rather than the names we use in the kitchen.",
    "explore": "Invent separate grocery and botanical labels for one fruit.",
    "why": "Classification depends on the question being asked. Everyday language and scientific categories can both be useful without matching perfectly.",
    "related": [
      "strawberry-achenes",
      "peanut-legume"
    ]
  },
  {
    "id": "cloud-mass",
    "category": "Earth & Weather",
    "sourceKey": "cloudwater",
    "question": "Could a small cloud hold hundreds of tonnes of water?",
    "title": "A cloud’s water can have a surprising mass.",
    "text": "Using 0.5 grams of liquid water per cubic meter, a one-cubic-kilometer cloud would contain about 500 metric tonnes of water. This is an estimate, not a universal cloud weight.",
    "explore": "Try multiplying a tiny amount by a billion cubic meters.",
    "why": "Small quantities add up across large volumes. Keeping the assumed density and volume beside the answer makes an impressive number meaningful.",
    "related": [
      "cloud-visible",
      "salt-density"
    ]
  },
  {
    "id": "pencil-graphite",
    "category": "Inventions",
    "sourceKey": "pencil",
    "question": "Does a pencil’s “lead” contain lead metal?",
    "title": "A pencil writes with graphite.",
    "text": "The dark writing material is a form of carbon, not metallic lead.",
    "explore": "Draw the difference between a traditional name and a material label.",
    "why": "Names can outlast an old misunderstanding. Checking composition is a useful habit when a familiar word suggests the wrong substance.",
    "related": [
      "eraser-adhesion",
      "first-transistor"
    ]
  },
  {
    "id": "butterfly-straw",
    "category": "Nature",
    "sourceKey": "butterfly",
    "question": "What does a butterfly unroll to drink?",
    "title": "Its proboscis is a coiled feeding tube.",
    "text": "Many adult butterflies use this tube to take in liquids, then coil it away when it is not in use.",
    "explore": "Design a long tool that folds into a small space.",
    "why": "Storage and reach can be solved together. A coiled structure offers a simple way to carry a long tool without keeping it fully extended.",
    "related": [
      "butterfly-scales",
      "anteater-teeth"
    ]
  },
  {
    "id": "rods-cones",
    "category": "Human body",
    "sourceKey": "rods",
    "question": "Do the same eye cells handle color and dim light?",
    "title": "Rods and cones specialize differently.",
    "text": "Rods support vision in dim light, while cones provide color and fine detail under brighter conditions.",
    "explore": "Design two sensor types optimized for different lighting.",
    "why": "There is rarely one perfect sensor for every condition. Specialization lets a system cover a wider range of tasks.",
    "related": [
      "cornea-focus",
      "hearing-pitch"
    ]
  },
  {
    "id": "banana-seeds",
    "category": "Food & Drink",
    "sourceKey": "bananawild",
    "question": "Why do supermarket bananas lack hard seeds?",
    "title": "Edible bananas have a cultivated history.",
    "text": "Many wild bananas contain hard seeds. Common edible cultivars were selected for fleshy, effectively seedless fruit.",
    "explore": "Imagine choosing which wild fruit to cultivate over generations.",
    "why": "Familiar foods are also records of human choices. Comparing wild relatives with cultivated plants reveals changes that a shopping trip hides.",
    "related": [
      "pineapple-flowers",
      "cacao-seeds"
    ]
  },
  {
    "id": "cloud-nuclei",
    "category": "Earth & Weather",
    "sourceKey": "cloud",
    "question": "Can a speck of salt help start a cloud droplet?",
    "title": "Cloud droplets can grow around tiny particles.",
    "text": "Dust and sea salt can act as condensation nuclei, giving water a surface on which to collect.",
    "explore": "Sketch a droplet forming around a microscopic speck.",
    "why": "The surroundings can help a phase change begin. A particle far too small to notice can contribute to something visible across the sky.",
    "related": [
      "fog-ground",
      "water-capillary"
    ]
  },
  {
    "id": "eraser-adhesion",
    "category": "Inventions",
    "sourceKey": "pencil",
    "question": "How can rubber lift a pencil mark?",
    "title": "An eraser gives graphite somewhere else to stick.",
    "text": "Graphite can adhere more strongly to eraser material than to the paper, allowing rubbing to lift the mark.",
    "explore": "Sketch graphite moving from paper to another surface.",
    "why": "Removing a mark is also a materials problem. Relative attraction between surfaces can explain an everyday tool’s job.",
    "related": [
      "ballpoint-ball",
      "first-transistor"
    ]
  },
  {
    "id": "butterfly-scales",
    "category": "Nature",
    "sourceKey": "butterfly",
    "question": "What covers a butterfly’s wings?",
    "title": "Tiny overlapping scales cover the wings.",
    "text": "The order name Lepidoptera refers to these scaled wings.",
    "explore": "Draw a wing surface as many small overlapping tiles.",
    "why": "A delicate surface can be built from repeated small parts. Looking closely reveals a construction pattern that is hidden at normal viewing distance.",
    "related": [
      "dragonfly-water",
      "octopus-hearts"
    ]
  },
  {
    "id": "pupil-opening",
    "category": "Human body",
    "sourceKey": "eye",
    "question": "Is the pupil a black object inside the eye?",
    "title": "The pupil is an opening.",
    "text": "The iris controls how much light enters through this opening before reaching the lens and retina.",
    "explore": "Draw an adjustable opening in front of a light sensor.",
    "why": "An opening can be an active part of a system. Controlling what gets in is as important as processing it afterward.",
    "related": [
      "cornea-focus",
      "octopus-taste"
    ]
  },
  {
    "id": "pineapple-flowers",
    "category": "Food & Drink",
    "sourceKey": "pineapple",
    "question": "How many flowers help make one pineapple?",
    "title": "A pineapple begins as many flowers.",
    "text": "Their developing fruits join into a single multiple fruit, also called a syncarp.",
    "explore": "Draw many small flower units merging into one outline.",
    "why": "An object that looks like one unit can have a collective origin. Following its development reveals a different kind of structure.",
    "related": [
      "pineapple-crown",
      "cacao-seeds"
    ]
  },
  {
    "id": "fog-ground",
    "category": "Earth & Weather",
    "sourceKey": "fog",
    "question": "Can a cloud reach the ground without falling?",
    "title": "Fog is a cloud near ground level.",
    "text": "Its suspended droplets reduce visibility where we live and travel.",
    "explore": "Draw one cloud touching a hill and another above it.",
    "why": "A familiar phenomenon can look different depending on our position. Fog brings cloud processes into the space we move through.",
    "related": [
      "advection-fog",
      "ice-floats"
    ]
  },
  {
    "id": "ballpoint-ball",
    "category": "Inventions",
    "sourceKey": "biro",
    "question": "What tiny moving part makes a ballpoint pen work?",
    "title": "A rolling ball carries ink onto paper.",
    "text": "As the ball turns in its socket, it picks up ink from the reservoir and deposits it on the page.",
    "explore": "Draw a rotating wheel moving material between two surfaces.",
    "why": "A small mechanical interface can solve a larger delivery problem. Follow the material through the moving part to understand the design.",
    "related": [
      "zipper-slider",
      "first-transistor"
    ]
  },
  {
    "id": "dragonfly-water",
    "category": "Nature",
    "sourceKey": "dragon",
    "question": "Where does a dragonfly spend its early life?",
    "title": "Dragonfly nymphs live in water.",
    "text": "The flying adult is only one stage; the immature nymph develops as an aquatic predator.",
    "explore": "Draw the same animal’s needs in water and in air.",
    "why": "A species can occupy very different environments during its lifetime. Protecting one life stage may depend on understanding another.",
    "related": [
      "dragonfly-jet",
      "axolotl-gills"
    ]
  },
  {
    "id": "cornea-focus",
    "category": "Human body",
    "sourceKey": "eye",
    "question": "Does the eye’s lens do all the focusing?",
    "title": "The cornea also bends incoming light.",
    "text": "The clear front layer of the eye works with the lens to focus light on the retina.",
    "explore": "Sketch two optical parts sharing a focusing task.",
    "why": "A visible result can depend on several components working together. Assigning all the credit to one part hides the system’s organization.",
    "related": [
      "inner-ear-loops",
      "octopus-taste"
    ]
  },
  {
    "id": "pineapple-crown",
    "category": "Food & Drink",
    "sourceKey": "pineapplecrown",
    "question": "Can the top of a pineapple start a plant?",
    "title": "A pineapple crown can grow again.",
    "text": "The leafy crown is one way growers can propagate a pineapple plant vegetatively, without starting from seed.",
    "explore": "Compare reproduction by seed with reproduction from a plant part.",
    "why": "Plant growth offers more than one route to the next generation. Separating propagation from seed production broadens the way we think about reproduction.",
    "related": [
      "strawberry-achenes",
      "cacao-seeds"
    ]
  },
  {
    "id": "advection-fog",
    "category": "Earth & Weather",
    "sourceKey": "fog",
    "question": "Can wind bring fog across a cold surface?",
    "title": "Moving air can make advection fog.",
    "text": "Warm, moist air passing over a colder surface can cool to saturation and form fog.",
    "explore": "Draw an air parcel traveling over a colder landscape.",
    "why": "Weather depends on both motion and temperature. Following the air’s path can explain a change that a single location cannot.",
    "related": [
      "graupel-coating",
      "ice-floats"
    ]
  },
  {
    "id": "zipper-slider",
    "category": "Inventions",
    "sourceKey": "zipper",
    "question": "How does a zipper join two rows so quickly?",
    "title": "A slider brings rows of teeth together.",
    "text": "Gideon Sundback improved the zipper with closely spaced fastening elements and a slider that joined the opposing rows.",
    "explore": "Sketch a guide that steers two lines of parts into alignment.",
    "why": "Convenient tools often depend on careful geometry. A guiding shape can coordinate many small connections with one simple movement.",
    "related": [
      "safety-pin-spring",
      "first-transistor"
    ]
  },
  {
    "id": "dragonfly-jet",
    "category": "Nature",
    "sourceKey": "dragon",
    "question": "Can a dragonfly nymph move with a water jet?",
    "title": "Some nymphs propel themselves by expelling water.",
    "text": "Water pushed from the rear of the body can provide a sudden burst of movement.",
    "explore": "Sketch a body moving one way while water exits the other.",
    "why": "Jet propulsion is not limited to machines. Tracing the direction of expelled material helps explain the resulting movement.",
    "related": [
      "darner-air",
      "shrimp-spring"
    ]
  },
  {
    "id": "inner-ear-loops",
    "category": "Human body",
    "sourceKey": "balance",
    "question": "What helps your brain sense a turn of the head?",
    "title": "Three inner-ear loops detect rotation.",
    "text": "Fluid-filled semicircular canals lie roughly at right angles, allowing them to respond to head rotation in different directions.",
    "explore": "Draw three loops facing different directions.",
    "why": "A three-dimensional problem benefits from sensors arranged in different planes. Orientation is part of how the system obtains useful information.",
    "related": [
      "ear-crystals",
      "octopus-taste"
    ]
  },
  {
    "id": "strawberry-achenes",
    "category": "Food & Drink",
    "sourceKey": "strawberry",
    "question": "Are the dots outside a strawberry really seeds?",
    "title": "Each strawberry dot is a tiny fruit.",
    "text": "Those structures are achenes, each containing a seed. The seed is inside the little fruit on the surface.",
    "explore": "Draw a strawberry, then zoom in twice: fruit, achene, seed.",
    "why": "Changing scale can change what we think we are looking at. Small structures deserve the same careful naming as the whole object.",
    "related": [
      "strawberry-receptacle",
      "cacao-seeds"
    ]
  },
  {
    "id": "graupel-coating",
    "category": "Earth & Weather",
    "sourceKey": "precip",
    "question": "What gives graupel its soft-looking coat?",
    "title": "Graupel is snow coated in frozen droplets.",
    "text": "Supercooled water droplets freeze onto a snow crystal, building a rounded, opaque pellet.",
    "explore": "Sketch a delicate crystal acquiring a coating of tiny beads.",
    "why": "Different kinds of frozen precipitation have different growth histories. The path through a cloud helps explain what reaches the ground.",
    "related": [
      "sleet-pellets",
      "ice-floats"
    ]
  },
  {
    "id": "safety-pin-spring",
    "category": "Inventions",
    "sourceKey": "pin",
    "question": "What makes a safety pin hold itself closed?",
    "title": "Its bent wire also acts as a spring.",
    "text": "Walter Hunt’s design combined a protective clasp with a circular twist that helped keep the pin in place.",
    "explore": "Imagine giving one piece of wire both a fastening and spring function.",
    "why": "One part can perform several jobs when its shape is chosen carefully. This is a compact example of design through geometry.",
    "related": [
      "zipper-slider",
      "shrimp-spring"
    ]
  },
  {
    "id": "darner-air",
    "category": "Nature",
    "sourceKey": "darner",
    "question": "Can a dragonfly catch dinner while flying?",
    "title": "Common green darners hunt in the air.",
    "text": "Adults catch flying insects as prey rather than relying on a stationary trap.",
    "explore": "Design a moving interception route for two dots on a page.",
    "why": "Catching a moving target is a problem of timing as well as speed. Comparing interception with chasing can reveal different strategies.",
    "related": [
      "snail-radula",
      "octopus-hearts"
    ]
  },
  {
    "id": "ear-crystals",
    "category": "Human body",
    "sourceKey": "balance",
    "question": "Why are tiny crystals useful inside your ear?",
    "title": "Calcium carbonate grains help signal head position.",
    "text": "In the otolith organs, dense grains shift with gravity and motion, influencing sensory hair cells.",
    "explore": "Sketch small weights acting on a flexible sensor layer.",
    "why": "A sensor can turn a mechanical force into information. Even a tiny mass can be useful when the surrounding structure responds to its movement.",
    "related": [
      "balance-team",
      "octopus-taste"
    ]
  },
  {
    "id": "strawberry-receptacle",
    "category": "Food & Drink",
    "sourceKey": "strawberry",
    "question": "Which flower part becomes a strawberry’s red flesh?",
    "title": "A strawberry swells from its flower base.",
    "text": "The juicy red part develops from the receptacle, the flower’s supporting base, rather than just from an ovary.",
    "explore": "Sketch a flower base growing while its other parts change.",
    "why": "Fruit development is more varied than a single textbook outline. Tracing where tissues came from helps explain that variety.",
    "related": [
      "cashew-seed",
      "cacao-seeds"
    ]
  },
  {
    "id": "sleet-pellets",
    "category": "Earth & Weather",
    "sourceKey": "precip",
    "question": "Can a raindrop freeze before it lands?",
    "title": "Sleet arrives as ice pellets.",
    "text": "Rain or partly melted snow can refreeze while falling through a sufficiently deep cold layer of air.",
    "explore": "Draw a falling drop passing through warm and cold layers.",
    "why": "The temperature at ground level is only part of the story. Conditions along the whole journey shape the final result.",
    "related": [
      "freezing-rain",
      "ice-floats"
    ]
  },
  {
    "id": "microwave-outside",
    "category": "Inventions",
    "sourceKey": "microwave",
    "question": "Does a microwave oven cook everything from the inside out?",
    "title": "Microwave cooking is not simply inside-out.",
    "text": "Microwaves penetrate food only to a limited depth. Heat then spreads through thicker food by conduction.",
    "explore": "Draw energy entering a thick food and heat spreading further.",
    "why": "A convenient phrase can hide the actual process. Distinguishing direct energy absorption from later heat flow gives a better model.",
    "related": [
      "microwave-radioactivity",
      "first-transistor"
    ]
  },
  {
    "id": "snail-radula",
    "category": "Nature",
    "sourceKey": "snail",
    "question": "What does a snail use to scrape food?",
    "title": "Many snails feed with a tooth-covered radula.",
    "text": "This ribbon-like feeding structure bears numerous tiny teeth used to rasp food.",
    "explore": "Imagine a conveyor belt covered in miniature scrapers.",
    "why": "A repeated array of small working parts can perform a demanding task. Scale and arrangement matter as much as the size of an individual tooth.",
    "related": [
      "snail-foot",
      "octopus-hearts"
    ]
  },
  {
    "id": "balance-team",
    "category": "Human body",
    "sourceKey": "balance",
    "question": "Does balance come only from the inner ear?",
    "title": "Balance combines several streams of information.",
    "text": "The brain uses signals from the eyes, inner ears, muscles, and touch sensors to help maintain posture.",
    "explore": "Design a balancing robot using more than one kind of sensor.",
    "why": "Combining sources can make a system more informative than any one source alone. The relationships among signals matter as much as individual sensors.",
    "related": [
      "inner-ear-loops",
      "cochlea-fluid"
    ]
  },
  {
    "id": "cashew-seed",
    "category": "Food & Drink",
    "sourceKey": "cashew",
    "question": "What part of a cashew do we snack on?",
    "title": "The cashew kernel is a seed.",
    "text": "It sits inside the kidney-shaped true fruit attached to the much larger cashew apple.",
    "explore": "Draw a cashew apple and locate the true fruit and seed.",
    "why": "Food names can blur layers of plant anatomy. Separating the seed from the structure around it makes the plant easier to understand.",
    "related": [
      "cashew-apple",
      "cacao-seeds"
    ]
  },
  {
    "id": "freezing-rain",
    "category": "Earth & Weather",
    "sourceKey": "precip",
    "question": "Can rain stay liquid until it touches a surface?",
    "title": "Freezing rain freezes on contact.",
    "text": "Supercooled liquid drops can form an icy coating when they strike a freezing surface, unlike sleet that is already frozen in the air.",
    "explore": "Compare two drops that freeze at different points in their journey.",
    "why": "Similar weather reports can describe very different processes. Separating where freezing occurs makes the distinction easier to remember.",
    "related": [
      "hail-updraft",
      "ice-floats"
    ]
  },
  {
    "id": "microwave-radioactivity",
    "category": "Inventions",
    "sourceKey": "microwave",
    "question": "Does microwave cooking make food radioactive?",
    "title": "Microwaves do not make food radioactive.",
    "text": "The radiation used for cooking is non-ionizing. Absorbing its energy heats food rather than turning it into a radioactive source.",
    "explore": "Separate “energy absorbed” from “new radioactive material” in a diagram.",
    "why": "The word radiation covers different physical processes. Naming the type helps avoid treating every use of the word as the same phenomenon.",
    "related": [
      "microwave-outside",
      "microwave-radar"
    ]
  },
  {
    "id": "snail-foot",
    "category": "Nature",
    "sourceKey": "snail",
    "question": "How many feet does a snail crawl on?",
    "title": "A snail moves on one broad muscular foot.",
    "text": "Waves of muscular motion help the animal travel along a surface.",
    "explore": "Draw a crawling surface as a sequence of moving ripples.",
    "why": "Movement does not require jointed legs. Different structures can solve the same locomotion problem through different patterns of motion.",
    "related": [
      "mollusc-cousins",
      "octopus-hearts"
    ]
  },
  {
    "id": "skin-organ",
    "category": "Human body",
    "sourceKey": "skin",
    "question": "Which organ wraps around your whole body?",
    "title": "Skin is the body’s largest organ.",
    "text": "It is a living organ with protective and sensory roles, rather than just a passive wrapper.",
    "explore": "List jobs a protective outer layer would need to perform.",
    "why": "A boundary can do many kinds of work. Thinking of skin as an organ makes its active roles easier to recognize.",
    "related": [
      "skin-renewal",
      "octopus-taste"
    ]
  },
  {
    "id": "cashew-apple",
    "category": "Food & Drink",
    "sourceKey": "cashew",
    "question": "Is a cashew apple an ordinary apple?",
    "title": "The cashew “apple” is a swollen stalk.",
    "text": "The fleshy accessory structure develops from the flower stalk beneath the kidney-shaped fruit.",
    "explore": "Compare the origin of a cashew apple with a strawberry’s flesh.",
    "why": "Similar-looking foods can come from different plant parts. Development provides a stronger explanation than appearance alone.",
    "related": [
      "cinnamon-bark",
      "cacao-seeds"
    ]
  },
  {
    "id": "hail-updraft",
    "category": "Earth & Weather",
    "sourceKey": "hail",
    "question": "How can a storm keep a growing hailstone aloft?",
    "title": "An updraft supports a hailstone’s growth.",
    "text": "Rising air can hold ice in a storm while supercooled droplets collide with it and freeze onto it.",
    "explore": "Draw upward airflow competing with a stone’s fall.",
    "why": "Growth can depend on how long something remains in an environment. Movement and material accumulation are linked.",
    "related": [
      "hail-layers",
      "ice-floats"
    ]
  },
  {
    "id": "dewar-cold",
    "category": "Inventions",
    "sourceKey": "flask",
    "question": "Was the vacuum flask first designed for hot coffee?",
    "title": "Dewar’s flask served very cold science.",
    "text": "James Dewar developed his vacuum flask in 1892 to help work with liquefied gases. The insulating idea also keeps hot drinks hot.",
    "explore": "Design one barrier that slows heat transfer in either direction.",
    "why": "A laboratory solution can become an everyday object. Understanding the underlying principle reveals why it works beyond its original purpose.",
    "related": [
      "white-led-color",
      "water-evaporation"
    ]
  },
  {
    "id": "mollusc-cousins",
    "category": "Nature",
    "sourceKey": "mollusc",
    "question": "What connects a garden snail with an octopus?",
    "title": "Both belong to the molluscs.",
    "text": "The same animal phylum includes snails, slugs, clams, squid, and octopuses despite their striking differences.",
    "explore": "Group animals by shared ancestry rather than silhouette.",
    "why": "Biological relationships can be hidden by different lifestyles. Classification invites us to look beyond the most obvious shape.",
    "related": [
      "snail-foot",
      "octopus-hearts"
    ]
  },
  {
    "id": "skin-renewal",
    "category": "Human body",
    "sourceKey": "skin",
    "question": "Where do replacement surface skin cells begin?",
    "title": "New epidermal cells form below the surface.",
    "text": "Cells developing at the bottom of the epidermis replace older cells that eventually flake away.",
    "explore": "Draw a moving stack with new layers added below.",
    "why": "An apparently stable surface can be continuously renewed. A process can preserve a structure while its individual parts change.",
    "related": [
      "skin-water-barrier",
      "octopus-taste"
    ]
  },
  {
    "id": "cinnamon-bark",
    "category": "Food & Drink",
    "sourceKey": "spices",
    "question": "Which tree part flavors a cinnamon roll?",
    "title": "Cinnamon is dried bark.",
    "text": "The familiar spice comes from the bark of several Cinnamomum species.",
    "explore": "Imagine labeling a spice shelf by plant part instead of flavor.",
    "why": "A kitchen can double as a botanical collection. Asking which part we use connects everyday ingredients with the plants that produced them.",
    "related": [
      "clove-buds",
      "cacao-seeds"
    ]
  },
  {
    "id": "hail-layers",
    "category": "Earth & Weather",
    "sourceKey": "hail",
    "question": "Why can a hailstone have clear and cloudy layers?",
    "title": "Hail layers record freezing conditions.",
    "text": "Rapid freezing can trap bubbles and make cloudy ice; slower freezing can let bubbles escape and leave clearer ice.",
    "explore": "Sketch alternating layers and label their different freezing conditions.",
    "why": "A material can preserve clues about the environment that made it. Visible layers are evidence to interpret, rather than decoration.",
    "related": [
      "ice-halo",
      "ice-floats"
    ]
  },
  {
    "id": "white-led-color",
    "category": "Inventions",
    "sourceKey": "led",
    "question": "How can colored LED light become white light?",
    "title": "White LEDs can use color conversion or mixing.",
    "text": "A phosphor can convert some LED light to other wavelengths, or several colored LEDs can be combined to make white light.",
    "explore": "Sketch two different routes from colored light to white.",
    "why": "A similar visible result can come from different designs. Looking inside the light source reveals choices that appearance alone does not show.",
    "related": [
      "ballpoint-ball",
      "sunlight-colors"
    ]
  },
  {
    "id": "leafcutter-farm",
    "category": "Nature",
    "sourceKey": "ants",
    "question": "Are leafcutter ants simply eating all those leaves?",
    "title": "Leafcutter ants cultivate a fungus crop.",
    "text": "They use gathered plant material to support fungus gardens that provide food for the colony.",
    "explore": "Draw a chain from collected leaf to cultivated fungus to ant.",
    "why": "Food collection can involve an intermediate crop. Following the full chain reveals a partnership that a single observation might miss.",
    "related": [
      "leafcutter-chambers",
      "octopus-hearts"
    ]
  },
  {
    "id": "skin-water-barrier",
    "category": "Human body",
    "sourceKey": "skin",
    "question": "What keeps your body from losing water through its surface?",
    "title": "Skin helps keep body fluids inside.",
    "text": "Its barrier function limits water loss as well as helping protect the body from the outside environment.",
    "explore": "Design a boundary that must protect in both directions.",
    "why": "Protection is not only about keeping threats out. A useful barrier may also need to retain the resources a system depends on.",
    "related": [
      "skin-renewal",
      "elephant-wrinkles"
    ]
  },
  {
    "id": "clove-buds",
    "category": "Food & Drink",
    "sourceKey": "spices",
    "question": "What was a clove before it became a spice?",
    "title": "A clove is an unopened flower bud.",
    "text": "The buds are harvested and dried before they open into flowers.",
    "explore": "Sketch the outline of a clove as a future flower.",
    "why": "Timing matters in how we use plants. A harvested ingredient can represent a particular moment in a plant’s life cycle.",
    "related": [
      "saffron-stigma",
      "cacao-seeds"
    ]
  },
  {
    "id": "ice-halo",
    "category": "Earth & Weather",
    "sourceKey": "optics",
    "question": "What can draw a ring around the Sun or Moon?",
    "title": "Ice crystals can create a halo.",
    "text": "Light interacting with high-cloud ice crystals can make a ring; the common halo has an angular radius of about 22 degrees.",
    "explore": "Draw a ring around a light source without treating it as a solid object.",
    "why": "An apparent object in the sky may be a viewing effect. Geometry and light can explain shapes that are not physical structures.",
    "related": [
      "cloud-corona",
      "rainbow-circle"
    ]
  },
  {
    "id": "leafcutter-chambers",
    "category": "Nature",
    "sourceKey": "ants",
    "question": "Can an ant colony keep gardens in separate rooms?",
    "title": "Leafcutter nests contain fungus-growing chambers.",
    "text": "The colony’s underground spaces provide places to maintain its cultivated fungus.",
    "explore": "Sketch a miniature farm organized into connected chambers.",
    "why": "The layout of a habitat can support the work done inside it. Organization matters even when the builders and their rooms are very small.",
    "related": [
      "ant-bacterial-help",
      "coral-partnership"
    ]
  },
  {
    "id": "saffron-stigma",
    "category": "Food & Drink",
    "sourceKey": "spices",
    "question": "Which flower part becomes saffron?",
    "title": "Saffron comes from a crocus’s stigmas.",
    "text": "The dried stigmas of Crocus sativus provide the spice’s delicate threads.",
    "explore": "Imagine sorting tiny flower parts into separate ingredient bowls.",
    "why": "Small plant structures can become culturally important ingredients. Looking closely turns an expensive seasoning into a lesson in flower anatomy.",
    "related": [
      "nutmeg-mace",
      "cacao-seeds"
    ]
  },
  {
    "id": "cloud-corona",
    "category": "Earth & Weather",
    "sourceKey": "optics",
    "question": "Can tiny droplets make colored rings around light?",
    "title": "Diffraction can produce a corona.",
    "text": "Small cloud droplets bend and spread light, producing colored rings close to the Sun or Moon.",
    "explore": "Imagine the same light passing around many tiny obstacles.",
    "why": "Light can form patterns through several different processes. Distinguishing diffraction from refraction makes similar sky displays easier to explain.",
    "related": [
      "light-pillar",
      "ice-floats"
    ]
  },
  {
    "id": "ant-bacterial-help",
    "category": "Nature",
    "sourceKey": "antbacteria",
    "question": "Can ants enlist bacteria to help protect a crop?",
    "title": "Some fungus-growing ants host defensive bacteria.",
    "text": "Research on Acromyrmex ants describes Pseudonocardia bacteria associated with chemical defenses for the fungus-growing partnership.",
    "explore": "Draw a three-part partnership with a separate role for each organism.",
    "why": "An interaction may involve more partners than first appear. Adding a third organism can change how we explain a familiar two-part relationship.",
    "related": [
      "worm-light",
      "octopus-hearts"
    ]
  },
  {
    "id": "nutmeg-mace",
    "category": "Food & Drink",
    "sourceKey": "spices",
    "question": "Can one fruit provide two different spices?",
    "title": "Nutmeg and mace come from one fruit.",
    "text": "Nutmeg is the seed kernel; mace is the aril, the covering around the seed.",
    "explore": "Draw nested layers and give each spice its own label.",
    "why": "One organism can supply different materials with different uses. Distinguishing the layers explains a connection that their separate names conceal.",
    "related": [
      "cinnamon-bark",
      "cacao-seeds"
    ]
  },
  {
    "id": "light-pillar",
    "category": "Earth & Weather",
    "sourceKey": "weird",
    "question": "Can ice make a streetlight appear to reach into the sky?",
    "title": "Light pillars are reflections in ice crystals.",
    "text": "Plate-like crystals in the air can reflect light into an apparent vertical column; the source can be a lamp, the Sun, or the Moon.",
    "explore": "Draw a light source and several separated reflecting plates.",
    "why": "A continuous-looking beam may be assembled by our viewpoint. Asking where the light actually travels can reveal the illusion.",
    "related": [
      "ice-halo",
      "rainbow-second-bow"
    ]
  },
  {
    "id": "worm-light",
    "category": "Nature",
    "sourceKey": "worm",
    "question": "Can an earthworm detect light without eyes?",
    "title": "Earthworms have light-sensitive cells.",
    "text": "They lack eyes like ours but can still respond to light.",
    "explore": "Design a simple light detector without an image-forming camera.",
    "why": "Detecting a condition and forming a detailed image are different tasks. A simpler sensor can be enough for a useful response.",
    "related": [
      "worm-both",
      "octopus-hearts"
    ]
  },
  {
    "id": "allspice-fruit",
    "category": "Food & Drink",
    "sourceKey": "allspice",
    "question": "Is allspice a mixture of spices?",
    "title": "Allspice is one plant’s fruit.",
    "text": "Its flavor suggests several spices, but the ingredient comes from Pimenta dioica rather than a blended recipe.",
    "explore": "Invent a misleading food name, then explain its real origin.",
    "why": "A name can invite the wrong assumption. Checking the underlying ingredient is more reliable than treating a descriptive label as a recipe.",
    "related": [
      "yeast-fungus",
      "cacao-seeds"
    ]
  },
  {
    "id": "virga-evaporation",
    "category": "Earth & Weather",
    "sourceKey": "weird",
    "question": "Can rain disappear before reaching the ground?",
    "title": "Virga leaves falling streaks beneath a cloud.",
    "text": "Precipitation can evaporate in dry air before it reaches the surface.",
    "explore": "Sketch a rain shaft that becomes vapor on the way down.",
    "why": "A process observed above us does not guarantee the same outcome below. Conditions between the starting point and destination matter.",
    "related": [
      "snow-rollers",
      "ice-floats"
    ]
  },
  {
    "id": "worm-both",
    "category": "Nature",
    "sourceKey": "worm",
    "question": "Are earthworms simply male or female?",
    "title": "Earthworms have both reproductive systems.",
    "text": "An individual earthworm has male and female reproductive organs, although reproduction typically involves a partner.",
    "explore": "Invent a classification chart that allows more than two exclusive boxes.",
    "why": "Biology does not always fit everyday categories neatly. Describing the actual structures is more informative than forcing a familiar label.",
    "related": [
      "worm-cocoons",
      "octopus-hearts"
    ]
  },
  {
    "id": "yeast-fungus",
    "category": "Food & Drink",
    "sourceKey": "bread",
    "question": "Is bread dough home to a living fungus?",
    "title": "Baker’s yeast is alive.",
    "text": "Saccharomyces cerevisiae is a fungus that consumes sugars during bread making.",
    "explore": "Draw bread making as a partnership between a cook and a microbe.",
    "why": "Some everyday manufacturing depends on living organisms. Recognizing their role connects cooking with biotechnology.",
    "related": [
      "dough-bubbles",
      "cacao-seeds"
    ]
  },
  {
    "id": "snow-rollers",
    "category": "Earth & Weather",
    "sourceKey": "weird",
    "question": "Can wind roll its own snowballs?",
    "title": "Snow rollers can form without human hands.",
    "text": "With suitable snow and wind, a thin sticky layer can roll into a cylinder, sometimes with a hollow center.",
    "explore": "Design the conditions needed to roll a fragile sheet without breaking it.",
    "why": "Unusual shapes can emerge from ordinary forces under specific conditions. The combination is often more important than any single ingredient.",
    "related": [
      "lenticular-wave",
      "ice-floats"
    ]
  },
  {
    "id": "worm-cocoons",
    "category": "Nature",
    "sourceKey": "worm",
    "question": "Where do baby earthworms begin?",
    "title": "Earthworm eggs develop in cocoons.",
    "text": "A small protective cocoon holds developing young before they hatch.",
    "explore": "Sketch the stages between an adult worm and a hatchling.",
    "why": "An animal’s visible form is only one part of its life cycle. Hidden stages can explain how the next generation survives.",
    "related": [
      "worm-both",
      "platypus-eggs"
    ]
  },
  {
    "id": "dough-bubbles",
    "category": "Food & Drink",
    "sourceKey": "bread",
    "question": "What inflates the bubbles in bread dough?",
    "title": "Yeast releases carbon dioxide.",
    "text": "Gas produced as yeast uses sugars helps dough rise when the dough can retain it.",
    "explore": "Draw a cutaway loaf with the gas spaces highlighted.",
    "why": "The empty spaces are part of the product’s structure. Asking what created them helps explain how a material acquired its texture.",
    "related": [
      "gluten-network",
      "cacao-seeds"
    ]
  },
  {
    "id": "lenticular-wave",
    "category": "Earth & Weather",
    "sourceKey": "weird",
    "question": "Why can a cloud look like a flying saucer?",
    "title": "Lenticular clouds form in atmospheric waves.",
    "text": "Moist air flowing through waves, often near mountains, can form smooth lens-shaped clouds.",
    "explore": "Sketch a wave in moving air and mark where condensation could occur.",
    "why": "A shape can reveal invisible motion. Clouds can act as clues to the way air moves through a landscape.",
    "related": [
      "pumice-float",
      "ice-floats"
    ]
  },
  {
    "id": "spider-no-web",
    "category": "Nature",
    "sourceKey": "spider",
    "question": "Must a spider use a web to catch dinner?",
    "title": "Many spiders hunt without a capture web.",
    "text": "Spiders can produce silk, but some stalk or ambush prey instead of catching it in a web.",
    "explore": "Compare a trap, an ambush, and a chase as hunting designs.",
    "why": "A shared material does not force every animal to use the same strategy. Ability and habitual use are different things.",
    "related": [
      "spider-recycle",
      "octopus-hearts"
    ]
  },
  {
    "id": "gluten-network",
    "category": "Food & Drink",
    "sourceKey": "bread",
    "question": "What keeps bread dough’s bubbles from escaping?",
    "title": "Gluten can form a stretchy network.",
    "text": "Water and mixing help wheat proteins form gluten, which can stretch around gas bubbles in dough.",
    "explore": "Design an imaginary flexible cage for an expanding bubble.",
    "why": "Material behavior matters as much as ingredients. A structure must deform without failing if it is going to hold something that expands.",
    "related": [
      "egg-heat",
      "cacao-seeds"
    ]
  },
  {
    "id": "pumice-float",
    "category": "Earth & Weather",
    "sourceKey": "pumice",
    "question": "Can a rock float on water?",
    "title": "Some pumice is light enough to float.",
    "text": "Gas bubbles leave many pores in this volcanic rock. Enough trapped air can make its overall density lower than water’s, at least for a time.",
    "explore": "Compare a solid block with a block containing many sealed spaces.",
    "why": "Density describes a whole object as well as its solid material. Internal spaces can change how an object behaves.",
    "related": [
      "obsidian-glass",
      "ice-floats"
    ]
  },
  {
    "id": "spider-recycle",
    "category": "Nature",
    "sourceKey": "spider",
    "question": "Can a spider eat its own old web?",
    "title": "Many orb-weavers recycle their silk.",
    "text": "Eating an old web allows the spider to reclaim material before making another.",
    "explore": "Design a temporary structure with a plan for recovering its material.",
    "why": "A structure’s end can be part of its design story. Recovery and reuse matter alongside construction.",
    "related": [
      "spider-balloon",
      "octopus-hearts"
    ]
  },
  {
    "id": "egg-heat",
    "category": "Food & Drink",
    "sourceKey": "eggs",
    "question": "Why does heating an egg change its texture?",
    "title": "Egg proteins unfold and join together.",
    "text": "Heating can denature egg proteins, allowing them to form a network that changes a liquid into a firmer structure.",
    "explore": "Draw scattered folded strings turning into a connected mesh.",
    "why": "A change at molecular scale can transform something we can touch. Texture is a useful clue to hidden changes in structure.",
    "related": [
      "egg-foam",
      "cacao-seeds"
    ]
  },
  {
    "id": "obsidian-glass",
    "category": "Earth & Weather",
    "sourceKey": "obsidian",
    "question": "Can a volcano make natural glass?",
    "title": "Obsidian is volcanic glass.",
    "text": "Rapid cooling of suitable lava can leave little time for crystals to form, producing a glassy rock.",
    "explore": "Draw particles frozen in a disordered arrangement.",
    "why": "A material’s history affects its structure. The speed of a change can determine which arrangements have time to develop.",
    "related": [
      "rock-columns",
      "ice-floats"
    ]
  },
  {
    "id": "spider-balloon",
    "category": "Nature",
    "sourceKey": "spider",
    "question": "How can a tiny spider travel through the air?",
    "title": "Some spiders disperse on silk threads.",
    "text": "In ballooning, released silk helps them become airborne and travel on air currents.",
    "explore": "Sketch a tiny passenger attached to a lightweight thread.",
    "why": "Travel can use forces already present in the environment. Small scale can make a movement strategy practical that would not work the same way for us.",
    "related": [
      "spider-recycle",
      "gecko-foot-hairs"
    ]
  },
  {
    "id": "egg-foam",
    "category": "Food & Drink",
    "sourceKey": "eggs",
    "question": "How can liquid egg white hold so much air?",
    "title": "Beating egg whites builds protein films.",
    "text": "Unfolded proteins help stabilize the surfaces of air bubbles, creating a foam.",
    "explore": "Imagine drawing each bubble with a thin supporting skin.",
    "why": "Foams are engineered arrangements of gas and material. Looking at their boundaries explains why simply adding air is not enough.",
    "related": [
      "yolk-emulsion",
      "cacao-seeds"
    ]
  },
  {
    "id": "rock-columns",
    "category": "Earth & Weather",
    "sourceKey": "columns",
    "question": "Who carved those polygonal rock columns?",
    "title": "Cooling rock can fracture into columns.",
    "text": "Contraction during cooling creates joints. Many columns have six sides, but other numbers of sides occur too.",
    "explore": "Sketch a shrinking surface divided by connecting cracks.",
    "why": "Order can emerge without a designer cutting each shape. A repeated physical process can organize a material into a recognizable pattern.",
    "related": [
      "obsidian-glass",
      "regular-tilings"
    ]
  },
  {
    "id": "woodfrog-freeze",
    "category": "Nature",
    "sourceKey": "frog",
    "question": "Can a wood frog survive partial freezing?",
    "title": "A wood frog can endure ice between its cells.",
    "text": "During winter freezing, its heartbeat can stop. This does not mean every part becomes a solid block of ice.",
    "explore": "Draw a distinction between ice outside cells and ice inside them.",
    "why": "An extraordinary adaptation needs a precise description. The location of freezing matters more than the dramatic phrase “frozen solid.”",
    "related": [
      "woodfrog-glucose",
      "tardigrade-tun"
    ]
  },
  {
    "id": "yolk-emulsion",
    "category": "Food & Drink",
    "sourceKey": "eggs",
    "question": "What helps mayonnaise keep oil and water together?",
    "title": "Egg yolk supplies emulsifiers.",
    "text": "These molecules help stabilize oil droplets dispersed through the watery part of mayonnaise.",
    "explore": "Sketch two liquids separated, then one dispersed as droplets.",
    "why": "Mixing is not always the same as dissolving. Thinking about interfaces helps explain how materials that separate can be held in a useful arrangement.",
    "related": [
      "egg-foam",
      "art-egg-tempera"
    ]
  },
  {
    "id": "earth-freshwater",
    "category": "Earth & Weather",
    "sourceKey": "water",
    "question": "How much of Earth’s water is fresh?",
    "title": "Only about 2.5 percent is freshwater.",
    "text": "The overwhelming majority of Earth’s water is saline; freshwater is a small share of the total.",
    "explore": "Divide a hundred-square grid into fresh and saline water shares.",
    "why": "A planet rich in water is not automatically rich in usable freshwater. Comparing the categories clarifies what a large total can conceal.",
    "related": [
      "glacier-store",
      "qanat-gravity"
    ]
  },
  {
    "id": "woodfrog-glucose",
    "category": "Nature",
    "sourceKey": "frogsugar",
    "question": "What helps a wood frog protect itself during freezing?",
    "title": "Its liver releases a surge of glucose.",
    "text": "Stored glycogen is converted to glucose as freezing begins, helping protect tissues during the frozen period.",
    "explore": "Sketch stored material being rapidly converted into a protective resource.",
    "why": "Survival can depend on a timed chemical response. Understanding when a response begins helps explain how the adaptation works.",
    "related": [
      "woodfrog-freeze",
      "tardigrade-tun"
    ]
  },
  {
    "id": "sucrose-pair",
    "category": "Food & Drink",
    "sourceKey": "sugar",
    "question": "Is table sugar built from two smaller sugars?",
    "title": "Sucrose joins glucose and fructose.",
    "text": "A molecule of ordinary table sugar contains these two linked sugar units.",
    "explore": "Draw two labeled shapes connected by one link.",
    "why": "Chemical names can reveal structure rather than just taste. Breaking a familiar substance into its molecular parts makes chemistry less abstract.",
    "related": [
      "sugar-supersaturation",
      "cacao-seeds"
    ]
  },
  {
    "id": "glacier-store",
    "category": "Earth & Weather",
    "sourceKey": "glaciers",
    "question": "Where is most of Earth’s freshwater stored?",
    "title": "Most freshwater is locked in ice.",
    "text": "Glaciers and ice caps contain roughly two-thirds of Earth’s freshwater, rather than lakes and rivers holding most of it.",
    "explore": "Draw freshwater stores as differently sized containers.",
    "why": "A resource’s total amount and its accessibility are separate questions. Location and physical form both affect how available it is.",
    "related": [
      "groundwater-pores",
      "ice-floats"
    ]
  },
  {
    "id": "sugar-supersaturation",
    "category": "Food & Drink",
    "sourceKey": "sugar",
    "question": "Can a sugar solution hold more than its usual limit?",
    "title": "A supersaturated solution is poised to crystallize.",
    "text": "A hot sugar solution can cool with extra sugar still dissolved. A disturbance or seed crystal can trigger crystallization.",
    "explore": "Imagine a crowded room waiting for the first person to move.",
    "why": "A system can remain in a state that is ready to change. The trigger and the conditions both matter when explaining a sudden transformation.",
    "related": [
      "candy-structure",
      "cacao-seeds"
    ]
  },
  {
    "id": "groundwater-pores",
    "category": "Earth & Weather",
    "sourceKey": "groundwater",
    "question": "Must groundwater flow through underground rivers?",
    "title": "Groundwater often fills pores and cracks.",
    "text": "It saturates spaces within soil and rock; a vast open underground channel is not required.",
    "explore": "Draw water moving between sand grains and through a rock fracture.",
    "why": "Empty space can exist inside apparently solid ground. A model based on connected small spaces can explain what a cave-only picture misses.",
    "related": [
      "antarctic-desert",
      "ice-floats"
    ]
  },
  {
    "id": "candy-structure",
    "category": "Food & Drink",
    "sourceKey": "sugar",
    "question": "Why are fudge and lollipops so different?",
    "title": "Sugar can set with different structures.",
    "text": "Fudge contains sugar crystals; many hard candies have an amorphous structure, without an ordered crystal arrangement.",
    "explore": "Sketch an ordered tile pattern beside a jumbled one.",
    "why": "The same ingredient can produce different textures through different arrangements. Processing can matter as much as the ingredient list.",
    "related": [
      "popcorn-pressure",
      "cacao-seeds"
    ]
  },
  {
    "id": "antarctic-desert",
    "category": "Earth & Weather",
    "sourceKey": "antarctic",
    "question": "Can a frozen continent also be a desert?",
    "title": "Antarctica includes extremely dry desert.",
    "text": "Desert describes low precipitation, not necessarily heat. Parts of the Antarctic interior receive very little snowfall.",
    "explore": "Compare a hot desert and a cold desert using precipitation alone.",
    "why": "Definitions can cut across familiar pictures. Choosing the relevant measurement prevents appearance from deciding the category.",
    "related": [
      "antarctic-volcano",
      "ice-floats"
    ]
  },
  {
    "id": "popcorn-pressure",
    "category": "Food & Drink",
    "sourceKey": "popcorn",
    "question": "What makes a popcorn kernel burst?",
    "title": "Popcorn builds pressure inside its hull.",
    "text": "Heating moisture inside the kernel creates steam pressure until the hull breaks and the contents expand.",
    "explore": "Draw a kernel before and after its shell opens.",
    "why": "A tiny container can change the behavior of what is inside it. Boundaries are an essential part of the explanation.",
    "related": [
      "popcorn-hull",
      "cacao-seeds"
    ]
  },
  {
    "id": "antarctic-volcano",
    "category": "Earth & Weather",
    "sourceKey": "antarctic",
    "question": "Can active volcanoes exist on an icy continent?",
    "title": "Antarctica has active volcanoes.",
    "text": "An ice-covered landscape does not mean that the geological heat below it has disappeared.",
    "explore": "Sketch an icy surface above a volcanic heat source.",
    "why": "Surface conditions and deep processes operate on different scales. An icy appearance does not tell the whole geological story.",
    "related": [
      "antarctic-desert",
      "mars-olympus"
    ]
  },
  {
    "id": "popcorn-hull",
    "category": "Food & Drink",
    "sourceKey": "popcorn",
    "question": "Why can a damaged popcorn kernel fail to pop?",
    "title": "A leaky hull loses its advantage.",
    "text": "Weaknesses in a popcorn kernel’s outer covering can let moisture escape before enough pressure builds.",
    "explore": "Compare an intact balloon with one containing a small leak.",
    "why": "Failure can reveal what a successful design depends on. A small change to a barrier can prevent the whole process from working.",
    "related": [
      "popcorn-pressure",
      "binturong-popcorn"
    ]
  },
  {
    "id": "mauna-kea-base",
    "category": "Earth & Weather",
    "sourceKey": "mountain",
    "question": "Does Everest win every way of measuring a mountain?",
    "title": "Mauna Kea is taller from base to summit.",
    "text": "Everest reaches higher above sea level, but much of Mauna Kea rises from the ocean floor.",
    "explore": "Draw two mountains with different starting levels.",
    "why": "A superlative needs a measurement rule. Changing the baseline can change which object ranks first.",
    "related": [
      "chimborazo-center",
      "ice-floats"
    ]
  },
  {
    "id": "cabbage-indicator",
    "category": "Food & Drink",
    "sourceKey": "cabbage",
    "question": "Can a vegetable reveal differences in acidity?",
    "title": "Red cabbage pigments respond to pH.",
    "text": "Anthocyanins in red cabbage can change color between acidic and basic conditions.",
    "explore": "Design a color key for an imaginary chemical sensor.",
    "why": "Useful sensors can be found in biological materials. A visible response can help us reason about a property we cannot directly see.",
    "related": [
      "maple-concentration",
      "cacao-seeds"
    ]
  },
  {
    "id": "chimborazo-center",
    "category": "Earth & Weather",
    "sourceKey": "mountain",
    "question": "Which mountain summit is farthest from Earth’s center?",
    "title": "Chimborazo wins a different height contest.",
    "text": "Earth bulges near the equator, so Chimborazo’s summit is farther from the center than Everest’s, despite its lower elevation above sea level.",
    "explore": "Compare distance from a center with height above a curved surface.",
    "why": "Different reference frames answer different questions. State the origin of a measurement before comparing the numbers.",
    "related": [
      "underwater-ridge",
      "ice-floats"
    ]
  },
  {
    "id": "maple-concentration",
    "category": "Food & Drink",
    "sourceKey": "maple",
    "question": "Why does a little maple syrup require so much sap?",
    "title": "Maple syrup concentrates a dilute starting material.",
    "text": "About 40 gallons of sap can yield one gallon of syrup, but the ratio varies with the sap’s sugar concentration.",
    "explore": "Compare two starting solutions with different amounts of sugar.",
    "why": "A yield estimate needs its assumptions. The same finished amount can require very different inputs when the starting material changes.",
    "related": [
      "sucrose-pair",
      "salt-density"
    ]
  },
  {
    "id": "underwater-ridge",
    "category": "Earth & Weather",
    "sourceKey": "ridge",
    "question": "Where is Earth’s longest mountain range hiding?",
    "title": "The longest mountain range is mostly underwater.",
    "text": "The global mid-ocean ridge system extends across ocean basins rather than standing entirely on land.",
    "explore": "Sketch a mountain chain continuing beneath a blue ocean layer.",
    "why": "Maps of land show only part of the planet’s relief. Looking below the waterline changes the scale of the landscape.",
    "related": [
      "mauna-kea-base",
      "ocean-midnight"
    ]
  },
  {
    "id": "ginger-stem",
    "category": "Food & Drink",
    "sourceKey": "ginger",
    "question": "Is the ginger in a kitchen really a root?",
    "title": "Ginger is an underground stem.",
    "text": "The part commonly called ginger root is a rhizome, a stem that grows beneath the soil.",
    "explore": "Sketch where buds could grow on an underground stem.",
    "why": "Position alone does not define a plant part. Looking at structure and growth gives a better classification than simply asking whether it is underground.",
    "related": [
      "caper-bud",
      "cacao-seeds"
    ]
  },
  {
    "id": "dew-condenses",
    "category": "Earth & Weather",
    "sourceKey": "dew",
    "question": "Does morning dew fall from a cloud?",
    "title": "Dew forms on a cooling surface.",
    "text": "Water vapor condenses into liquid when a surface cools enough for the surrounding moisture to condense on it.",
    "explore": "Trace the water on a blade of grass back to the nearby air.",
    "why": "Not every drop has fallen from above. Asking where a phase change happens can distinguish processes that leave similar results.",
    "related": [
      "frost-deposition",
      "ice-floats"
    ]
  },
  {
    "id": "caper-bud",
    "category": "Food & Drink",
    "sourceKey": "caper",
    "question": "What are capers before they are pickled?",
    "title": "Capers are unopened flower buds.",
    "text": "They are harvested from the caper bush before flowering; caper berries are its fruits instead.",
    "explore": "Draw the same plant part before flowering and after fruiting.",
    "why": "Related ingredients may represent different stages of development. Naming the stage helps explain why they differ.",
    "related": [
      "pepper-fruit",
      "cacao-seeds"
    ]
  },
  {
    "id": "frost-deposition",
    "category": "Earth & Weather",
    "sourceKey": "frost",
    "question": "Must frost begin as liquid water?",
    "title": "Frost can grow directly from water vapor.",
    "text": "Deposition changes vapor straight into ice on a sufficiently cold surface; frozen dew is a different route to surface ice.",
    "explore": "Draw separate routes from vapor to ice and from liquid to ice.",
    "why": "The same final material can form along different paths. Keeping the intermediate stages visible makes phase changes clearer.",
    "related": [
      "waterspout-origin",
      "ice-floats"
    ]
  },
  {
    "id": "pepper-fruit",
    "category": "Food & Drink",
    "sourceKey": "pepper",
    "question": "What is a peppercorn before it is dried?",
    "title": "A peppercorn is a pepper plant’s fruit.",
    "text": "Black pepper comes from the fruits of the climbing vine Piper nigrum.",
    "explore": "Reimagine a pepper grinder as a container of dried fruits.",
    "why": "A familiar seasoning can hide its botanical identity. Restoring that identity connects the dining table with a living plant.",
    "related": [
      "caper-bud",
      "vanilla-orchid"
    ]
  },
  {
    "id": "waterspout-origin",
    "category": "Earth & Weather",
    "sourceKey": "waterspout",
    "question": "Do all waterspouts descend from severe thunderstorms?",
    "title": "Fair-weather waterspouts develop differently.",
    "text": "They can begin near the water surface and develop upward, unlike tornadic waterspouts associated with thunderstorms.",
    "explore": "Compare two diagrams with opposite directions of development.",
    "why": "A shared appearance does not guarantee a shared origin. Understanding the formation process is more useful than relying on the outline alone.",
    "related": [
      "advection-fog",
      "thunder-delay"
    ]
  }
];

export const everydayWonderFacts: EverydayWonder[] = drafts.map(draft => ({ ...draft, collection: 'everyday-wonders', source: everydayWonderSources[draft.sourceKey].label, url: everydayWonderSources[draft.sourceKey].url }));
