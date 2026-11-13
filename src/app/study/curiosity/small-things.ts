import type { Fact } from './facts';

// V1.9: append-only identities; sources checked 2026-11-13.
// Questions, significance and thought experiments are original editorial writing.
export const smallThingsSources = {
  "bicycletire": {"label":"National Museums Scotland · The Dunlop tyre","url":"https://www.nms.ac.uk/discover-catalogue/dunlop-tyre-air-apparent","reviewedOn":"2026-11-13"},
  "snakehearing": {"label":"University of Queensland · Snakes can hear more than you think","url":"https://stories.uq.edu.au/news/2023/snakes-can-hear-more-than-you-think/index.html","reviewedOn":"2026-11-13"},
  "leeuwenhoekclose": {"label":"Science Museum Group · Model of Leeuwenhoek’s microscope","url":"https://collection.sciencemuseumgroup.org.uk/objects/co119600/model-of-leeuwenhoeks-microscope-microscope","reviewedOn":"2026-11-13"},
  "seed": {
    "label": "NC State Extension · Plant propagation",
    "url": "https://content.ces.ncsu.edu/extension-gardener-handbook/13-propagation",
    "reviewedOn": "2026-11-13"
  },
  "orchid": {
    "label": "Royal Botanic Gardens, Kew · Orchid seeds",
    "url": "https://www.kew.org/read-and-watch/orchid-seeds-natures-tiny-treasures",
    "reviewedOn": "2026-11-13"
  },
  "moss": {
    "label": "Royal Botanic Gardens, Kew · The miniature world of moss",
    "url": "https://www.kew.org/read-and-watch/moss",
    "reviewedOn": "2026-11-13"
  },
  "fern": {
    "label": "Iowa State University Extension · Growing ferns from spores",
    "url": "https://yardandgarden.extension.iastate.edu/how-to/growing-ferns-spores",
    "reviewedOn": "2026-11-13"
  },
  "carnivore": {
    "label": "Royal Botanic Gardens, Kew · Carnivorous plants",
    "url": "https://www.kew.org/read-and-watch/carnivorous-plants",
    "reviewedOn": "2026-11-13"
  },
  "diatom": {
    "label": "University of Gothenburg · Diatom photonics research",
    "url": "https://www.gu.se/en/research/photonic-properties-of-diatoms",
    "reviewedOn": "2026-11-13"
  },
  "diatomvalves": {
    "label": "UC San Diego Scripps · Diatom composition",
    "url": "https://earthguide.ucsd.edu/diatom/d3.html",
    "reviewedOn": "2026-11-13"
  },
  "diatomsediment": {
    "label": "SUNY Geneseo · Diatoms",
    "url": "https://milnepublishing.geneseo.edu/botany/chapter/the-diatoms/",
    "reviewedOn": "2026-11-13"
  },
  "firefly": {
    "label": "University of Wisconsin–Madison Extension · Fireflies",
    "url": "https://hort.extension.wisc.edu/articles/fireflies/",
    "reviewedOn": "2026-11-13"
  },
  "strider": {
    "label": "US National Park Service · Water striders",
    "url": "https://home.nps.gov/articles/pecies-spotlight-water-strider.htm",
    "reviewedOn": "2026-11-13"
  },
  "nematode": {
    "label": "University of Florida IFAS · Soil-inhabiting nematodes",
    "url": "https://edis.ifas.ufl.edu/publication/IN138/pdf",
    "reviewedOn": "2026-11-13"
  },
  "rotifer": {
    "label": "University of Michigan Animal Diversity Web · Rotifera",
    "url": "https://animaldiversity.org/accounts/Rotifera/",
    "reviewedOn": "2026-11-13"
  },
  "springtail": {
    "label": "University of Minnesota Extension · Springtails",
    "url": "https://extension.umn.edu/garden-and-home/home-maintenance/household-insects/springtails",
    "reviewedOn": "2026-11-13"
  },
  "owl": {
    "label": "Cornell Lab of Ornithology · The wonderful world of owls",
    "url": "https://dl.allaboutbirds.org/hubfs/Bird%20Academy/WonderfulWorldOwlsPoster_July%202024.pdf",
    "reviewedOn": "2026-11-13"
  },
  "owltuft": {
    "label": "Cornell Lab of Ornithology · Owl ear tufts",
    "url": "https://dl.allaboutbirds.org/hubfs/Bird%20Academy/WonderfulWorldOwlsPoster_July%202024.pdf",
    "reviewedOn": "2026-11-13"
  },
  "bat": {
    "label": "San Diego Zoo Wildlife Alliance · Bats",
    "url": "https://animals.sandiegozoo.org/animals/bat",
    "reviewedOn": "2026-11-13"
  },
  "snake": {
    "label": "San Diego Zoo Wildlife Alliance · Snakes",
    "url": "https://animals.sandiegozoo.org/animals/snake",
    "reviewedOn": "2026-11-13"
  },
  "rattlesnake": {
    "label": "San Diego Zoo Wildlife Alliance · Rattlesnakes",
    "url": "https://animals.sandiegozoo.org/animals/rattlesnake",
    "reviewedOn": "2026-11-13"
  },
  "sharksenses": {
    "label": "Smithsonian Ocean · Shark sensory systems",
    "url": "https://ocean.si.edu/ocean-life/sharks-rays/sharks",
    "reviewedOn": "2026-11-13"
  },
  "mantis": {
    "label": "University of Queensland research team · Mantis shrimp vision",
    "url": "https://news.uq.edu.au/2008-03-20-new-type-vision-found-shrimp",
    "reviewedOn": "2026-11-13"
  },
  "mantistest": {
    "label": "University of Queensland research team · Color discrimination experiments",
    "url": "https://qbi.uq.edu.au/article/2014/01/discovery-gives-new-insight-colour-vision",
    "reviewedOn": "2026-11-13"
  },
  "mantisuv": {
    "label": "Bok and colleagues · Biological sunscreens tune ultraviolet vision",
    "url": "https://www.sciencedirect.com/science/article/pii/S0960982214006721",
    "reviewedOn": "2026-11-13"
  },
  "mantismid": {
    "label": "Marshall and colleagues · Color vision in stomatopod crustaceans",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9441230/",
    "reviewedOn": "2026-11-13"
  },
  "bicycle": {
    "label": "Smithsonian Institution · The safety bicycle",
    "url": "https://www.si.edu/spotlight/si-bikes/si-bikes-safety",
    "reviewedOn": "2026-11-13"
  },
  "bicyclelower": {
    "label": "Science Museum · The Rover safety bicycle",
    "url": "https://blog.sciencemuseum.org.uk/adopt-an-object-trail/",
    "reviewedOn": "2026-11-13"
  },
  "camera": {
    "label": "National Science and Media Museum · Camera obscura",
    "url": "https://blog.scienceandmediamuseum.org.uk/introduction-camera-obscura/",
    "reviewedOn": "2026-11-13"
  },
  "time": {
    "label": "US NIST · Timekeeping and clocks",
    "url": "https://www.nist.gov/pml/time-and-frequency-division/timekeeping-and-clocks-faqs",
    "reviewedOn": "2026-11-13"
  },
  "gecko": {
    "label": "UC Berkeley research team · Gecko toes and climbing robots",
    "url": "https://news.berkeley.edu/2020/05/08/to-climb-like-a-gecko-robots-need-toes/",
    "reviewedOn": "2026-11-13"
  },
  "micrographia": {
    "label": "University of Glasgow · Robert Hooke’s Micrographia",
    "url": "https://www.gla.ac.uk/myglasgow/archivespecialcollections/digitisedcollections/birdsbeesandblooms/bees/roberthookemicrographia/",
    "reviewedOn": "2026-11-13"
  },
  "hookeimages": {
    "label": "Royal Society · Micrographia flea engraving",
    "url": "https://catalogues.royalsociety.org/calmview/Record.aspx?id=IM%2F002201&src=CalmView.catalog",
    "reviewedOn": "2026-11-13"
  },
  "leeuwenhoek": {
    "label": "University of Cambridge Whipple Museum · Leeuwenhoek-type microscopes",
    "url": "https://www.whipplemuseum.cam.ac.uk/explore-whipple-collections/microscopes/dutch-pioneer-antoni-van-leeuwenhoek/two-leeuwenhoek-type",
    "reviewedOn": "2026-11-13"
  },
  "printing": {
    "label": "British Library International Dunhuang Programme · Diamond Sutra",
    "url": "https://idp.bl.uk/discover/learning/dunhuang/dunhuang-articles/cave-17-the-library-cave/what-was-stored-in-cave-17/",
    "reviewedOn": "2026-11-13"
  },
  "jikji": {
    "label": "Bibliothèque nationale de France · Jikji and movable metal type",
    "url": "https://www.bnf.fr/en/jikji-treasure-world-printing",
    "reviewedOn": "2026-11-13"
  },
  "coins": {
    "label": "Archaeological Exploration of Sardis · The coins of Sardis",
    "url": "https://www.sardisexpedition.org/en/essays/latw-kroll-coins-of-sardis",
    "reviewedOn": "2026-11-13"
  },
  "wave": {
    "label": "The Metropolitan Museum of Art · Anatomy of the Great Wave",
    "url": "https://www.metmuseum.org/essays/hokusai-great-wave",
    "reviewedOn": "2026-11-13"
  },
  "census": {
    "label": "US Census Bureau · The Hollerith machine",
    "url": "https://www.census.gov/about/history/bureau-history/census-innovations/technology/hollerith-machine.html",
    "reviewedOn": "2026-11-13"
  },
  "censuspins": {
    "label": "US Census Bureau · Tabulation and processing",
    "url": "https://www.census.gov/about/history/bureau-history/census-innovations/technology/tabulation-and-processing.html",
    "reviewedOn": "2026-11-13"
  }
} as const;
type SourceKey = keyof typeof smallThingsSources;
type Draft = Omit<Fact,'source' | 'url' | 'collection'> & { sourceKey: SourceKey; question: string; why: string; related: [string,string] };
const drafts: Draft[] = [
  {
    "id": "seed-living-pause",
    "question": "Can a seed be alive without sprouting?",
    "title": "A viable seed can remain dormant.",
    "text": "Some seeds have internal barriers to germination even when external conditions seem suitable.",
    "explore": "Compare being inactive with being dead. What observation would distinguish them?",
    "why": "A pause can be part of a life cycle. Distinguishing activity from the capacity for activity makes a small seed more interesting.",
    "category": "Nature",
    "sourceKey": "seed",
    "related": [
      "seed-winter-signal",
      "dandelion-hinge"
    ]
  },
  {
    "id": "orchid-dust-seeds",
    "question": "Can one orchid fruit hold millions of seeds?",
    "title": "A Cycnoches chlorochilon capsule can produce almost four million seeds.",
    "text": "Many orchid seeds are dust-sized, making huge numbers possible in a single capsule.",
    "explore": "Imagine distributing a million tiny chances instead of a few large ones.",
    "why": "Size changes what is practical. This example invites a comparison between many small investments and fewer well-provisioned ones.",
    "category": "Nature",
    "sourceKey": "orchid",
    "related": [
      "orchid-fungal-start",
      "dandelion-hinge"
    ]
  },
  {
    "id": "moss-rootless",
    "question": "What anchors moss if it has no true roots?",
    "title": "Hair-like rhizoids help hold moss in place.",
    "text": "Mosses have stems and leaves but lack the true roots of familiar flowering plants.",
    "explore": "Separate the job of anchoring from the job of taking up water.",
    "why": "A structure that looks root-like need not be a root. Comparing jobs helps explain different solutions to living on a surface.",
    "category": "Nature",
    "sourceKey": "moss",
    "related": [
      "moss-sponges",
      "dandelion-hinge"
    ]
  },
  {
    "id": "fern-not-seeds",
    "question": "What does a fern release instead of seeds?",
    "title": "Ferns reproduce through spores.",
    "text": "The spores are produced in spore cases, often grouped into sori on a frond’s underside.",
    "explore": "Compare a seed with a spore without assuming they contain the same structures.",
    "why": "Similar-looking reproductive dust can belong to different life cycles. Naming the stage correctly makes the rest of the process easier to follow.",
    "category": "Nature",
    "sourceKey": "fern",
    "related": [
      "fern-heart-stage",
      "dandelion-hinge"
    ]
  },
  {
    "id": "flytrap-two-touches",
    "question": "Why doesn’t a Venus flytrap close after every tiny disturbance?",
    "title": "Its trap normally needs two trigger-hair touches close together.",
    "text": "One hair touched twice or two hairs touched in quick succession can trigger closure.",
    "explore": "Design a trigger that requires two signals rather than one.",
    "why": "Responding has a cost. A threshold can help distinguish a passing disturbance from an event worth acting on.",
    "category": "Nature",
    "sourceKey": "carnivore",
    "related": [
      "pitcher-leaf-trap",
      "dandelion-hinge"
    ]
  },
  {
    "id": "diatom-silica",
    "question": "What microscopic organism builds a silica wall?",
    "title": "Diatoms have silica cell walls called frustules.",
    "text": "These microscopic algae make intricate structures from a material also familiar in glassmaking.",
    "explore": "Compare building a wall by a living cell with manufacturing one in a workshop.",
    "why": "Materials connect biology and engineering in unexpected ways. The same broad substance can take very different forms at different scales.",
    "category": "Nature",
    "sourceKey": "diatom",
    "related": [
      "diatom-patterned-pores",
      "dandelion-hinge"
    ]
  },
  {
    "id": "firefly-beetle",
    "question": "Is a firefly really a fly?",
    "title": "Fireflies are beetles in the family Lampyridae.",
    "text": "Their soft wing covers distinguish them from the harder covers of many other beetles.",
    "explore": "Compare a common name with the group an animal belongs to.",
    "why": "Names can preserve an impression rather than a classification. Checking the actual group opens the door to a more accurate picture.",
    "category": "Nature",
    "sourceKey": "firefly",
    "related": [
      "firefly-chemistry",
      "dandelion-hinge"
    ]
  },
  {
    "id": "strider-air-hairs",
    "question": "What helps a water strider keep its legs from getting wet?",
    "title": "Microscopic grooved hairs trap air around the legs.",
    "text": "The water-repellent surface works with water’s surface tension to support the insect.",
    "explore": "Draw the contact between a hairy leg, air, and water.",
    "why": "The boundary between materials can be part of a support system. Looking closely at the contact changes how we explain the feat.",
    "category": "Nature",
    "sourceKey": "strider",
    "related": [
      "strider-rowing",
      "dandelion-hinge"
    ]
  },
  {
    "id": "nematode-not-all-parasites",
    "question": "Are all soil nematodes plant parasites?",
    "title": "Most kinds of soil nematodes do not parasitize plants.",
    "text": "Many free-living forms participate in the soil food web and decomposition.",
    "explore": "Make a group with several feeding roles instead of one shared reputation.",
    "why": "A broad name can hide very different lifestyles. Understanding the variety helps prevent one damaging example from defining an entire group.",
    "category": "Nature",
    "sourceKey": "nematode",
    "related": [
      "nematode-bacteria-menu",
      "dandelion-hinge"
    ]
  },
  {
    "id": "rotifer-wheel",
    "question": "Does a rotifer have real spinning wheels on its head?",
    "title": "Beating cilia can create the appearance of rotating wheels.",
    "text": "This movement gives the group its common name, wheel animals.",
    "explore": "Compare an actual rotating part with a traveling sequence of movements.",
    "why": "An appearance can result from coordinated motion rather than the mechanism we first imagine. The distinction is worth looking for in other moving patterns.",
    "category": "Nature",
    "sourceKey": "rotifer",
    "related": [
      "rotifer-jaws",
      "dandelion-hinge"
    ]
  },
  {
    "id": "springtail-fork",
    "question": "What gives a springtail its spring?",
    "title": "A forked structure under the abdomen helps launch it.",
    "text": "The tiny animal can jump despite having no wings.",
    "explore": "Sketch a stored-away lever that can suddenly push against a surface.",
    "why": "A leap need not be powered only by long legs. Different structures can store and release movement in unexpected ways.",
    "category": "Nature",
    "sourceKey": "springtail",
    "related": [
      "springtail-snow-flea",
      "dandelion-hinge"
    ]
  },
  {
    "id": "owl-facial-dish",
    "question": "What is an owl’s facial disk doing besides looking distinctive?",
    "title": "Its feathers help funnel sound toward the ear openings.",
    "text": "The functional ears are hidden behind feathers rather than being the visible head tufts.",
    "explore": "Compare a sound-collecting surface with an ear opening.",
    "why": "The surrounding shape can be part of a sensory system. An owl’s face makes that relationship unusually easy to picture.",
    "category": "Nature",
    "sourceKey": "owl",
    "related": [
      "owl-offset-ears",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bat-finger-wings",
    "question": "What bones form much of a bat’s wing framework?",
    "title": "Elongated finger bones support a flexible skin membrane.",
    "text": "The wing is a modified forelimb, rather than a sheet of feathers like a bird’s wing.",
    "explore": "Compare a hand skeleton with a wing outline.",
    "why": "Different body plans can achieve flight. Looking at the supporting bones reveals the construction beneath a similar function.",
    "category": "Nature",
    "sourceKey": "bat",
    "related": [
      "bat-not-blind",
      "dandelion-hinge"
    ]
  },
  {
    "id": "snake-tongue-samples",
    "question": "Does a flicking snake tongue work like a little hand collecting information?",
    "title": "It picks up odor particles for a specialized sensory organ.",
    "text": "The particles are delivered to the Jacobson’s organ in the roof of the mouth.",
    "explore": "Separate collecting a sample from analyzing it.",
    "why": "Sensing can require transport before detection. A snake’s tongue makes the sampling step visible.",
    "category": "Nature",
    "sourceKey": "rattlesnake",
    "related": [
      "snake-heat-pits",
      "dandelion-hinge"
    ]
  },
  {
    "id": "shark-electric-fields",
    "question": "What invisible signal can help a shark find nearby prey?",
    "title": "Sharks can detect weak electric fields from other animals.",
    "text": "Sensory organs called ampullae of Lorenzini connect with small pores around the head.",
    "explore": "Add an electrical channel to an imaginary animal’s sensing diagram.",
    "why": "The available information is broader than what humans directly perceive. A new channel can change how we imagine finding something hidden.",
    "category": "Nature",
    "sourceKey": "sharksenses",
    "related": [
      "shark-lateral-line",
      "dandelion-hinge"
    ]
  },
  {
    "id": "mantis-polarization",
    "question": "Can a mantis shrimp detect a property of light we barely notice?",
    "title": "Some mantis shrimp detect circularly polarized light.",
    "text": "Their visual system can distinguish more than brightness and ordinary color.",
    "explore": "List different properties of one light beam instead of treating it as a single number.",
    "why": "One physical signal can carry several kinds of information. An unusual eye reveals a dimension that everyday vision does not make obvious.",
    "category": "Nature",
    "sourceKey": "mantis",
    "related": [
      "mantis-colour-test",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bicycle-equal-wheels",
    "question": "Why didn’t the modern bicycle need a giant front wheel?",
    "title": "Chain drive and gearing helped make similarly sized wheels practical.",
    "text": "The safety bicycle replaced the high-wheel layout with a lower riding position.",
    "explore": "Compare changing wheel size with changing the ratio in a drive system.",
    "why": "A transmission can separate the size of a wheel from how far a pedal stroke carries the rider. That creates new design possibilities.",
    "category": "Inventions",
    "sourceKey": "bicycle",
    "related": [
      "bicycle-pneumatic",
      "first-transistor"
    ]
  },
  {
    "id": "pinhole-room",
    "question": "Can a tiny hole turn a dark room into an image projector?",
    "title": "A small opening can project an inverted outdoor scene onto the opposite wall.",
    "text": "A basic camera obscura needs neither a digital sensor nor a photographic recording material.",
    "explore": "Trace rays from the top and bottom of an object through one small opening.",
    "why": "An image can form before anyone records it. Separating projection from photography makes the history of cameras clearer.",
    "category": "Inventions",
    "sourceKey": "camera",
    "related": [
      "camera-name-room",
      "first-transistor"
    ]
  },
  {
    "id": "time-counting-swings",
    "question": "What is a pendulum clock actually counting?",
    "title": "Its mechanism counts repeating swings.",
    "text": "A clock turns a regular event into an accumulated measure of elapsed time.",
    "explore": "Compare a repeating movement with the total number of repetitions.",
    "why": "A clock needs both repetition and counting. Separating those jobs reveals a common structure behind very different timekeepers.",
    "category": "Inventions",
    "sourceKey": "time",
    "related": [
      "watch-quartz-number",
      "first-transistor"
    ]
  },
  {
    "id": "gecko-molecular-grip",
    "question": "Does a gecko need wet glue to cling to smooth glass?",
    "title": "Its toe hairs can adhere through intermolecular forces.",
    "text": "Van der Waals interactions become useful when many fine structures make close surface contact.",
    "explore": "Compare a sticky liquid with a dry structure making many contacts.",
    "why": "Adhesion can depend on geometry as well as chemistry. A living example suggests a different way to think about a reusable grip.",
    "category": "Patterns & invention",
    "sourceKey": "gecko",
    "related": [
      "gecko-split-tips",
      "roman-concrete"
    ]
  },
  {
    "id": "hooke-cork-cells",
    "question": "Why did the word cell become part of biology?",
    "title": "Robert Hooke used it while describing the structure of cork.",
    "text": "His microscopic observations appeared in the 1665 book Micrographia.",
    "explore": "Compare the compartments in a material with rooms in a building.",
    "why": "Scientific names can begin with an analogy. Knowing its origin helps explain the word without assuming the first observer saw everything we know today.",
    "category": "Art & ideas",
    "sourceKey": "micrographia",
    "related": [
      "hooke-flea-engraving",
      "art-pigments"
    ]
  },
  {
    "id": "diamond-sutra-date",
    "question": "What printed book carries a date from the year 868?",
    "title": "The surviving Diamond Sutra scroll is dated 11 May 868.",
    "text": "Its colophon records the date and the sponsor Wang Jie; it is not a claim that printing began that day.",
    "explore": "Compare the earliest surviving dated example with the moment a technique was invented.",
    "why": "Evidence has a boundary. A precise surviving date can tell us something important without identifying the very first use of a technology.",
    "category": "Ancient ingenuity",
    "sourceKey": "printing",
    "related": [
      "diamond-woodblocks",
      "gobekli-builders"
    ]
  },
  {
    "id": "lydian-electrum",
    "question": "Were some early coins made from a mixture of gold and silver?",
    "title": "Lydian coinage used the alloy electrum.",
    "text": "Naturally occurring proportions could vary, complicating judgments of the metal’s value.",
    "explore": "Compare equal-weight objects made from different proportions of two metals.",
    "why": "Weight is not the only property that determines value. Composition creates a separate measurement problem.",
    "category": "Ancient ingenuity",
    "sourceKey": "coins",
    "related": [
      "coin-touchstone",
      "gobekli-builders"
    ]
  },
  {
    "id": "wave-not-painting",
    "question": "Is Hokusai’s Great Wave a single painted original?",
    "title": "The famous image is a color woodblock print.",
    "text": "Multiple impressions were produced from a printing process rather than each being separately painted.",
    "explore": "Compare a designed image with the individual impressions made from it.",
    "why": "An artwork can have a reproducible production method. Understanding the medium changes what we mean by an original impression.",
    "category": "Art & ideas",
    "sourceKey": "wave",
    "related": [
      "wave-fuji-background",
      "art-pigments"
    ]
  },
  {
    "id": "census-paper-data",
    "question": "What did a punched hole mean to an early data-processing machine?",
    "title": "Its position on a card represented a recorded characteristic.",
    "text": "Hollerith’s system transferred information from census questionnaires into machine-readable hole patterns.",
    "explore": "Encode a few imaginary categories as positions on a small card.",
    "why": "Information needs a representation before a machine can process it. The physical medium can be simple even when the dataset is large.",
    "category": "Computing & AI",
    "sourceKey": "census",
    "related": [
      "census-electric-pins",
      "jacquard-patterns"
    ]
  },
  {
    "id": "seed-winter-signal",
    "question": "Why do some seeds need a cold, damp period before growing?",
    "title": "Moist chilling can release dormancy in certain species.",
    "text": "This cold stratification can happen naturally over winter; requirements vary by species.",
    "explore": "Sketch a seasonal sequence rather than a single moment of watering.",
    "why": "The order of conditions can matter. A seed offers a useful example of a process that depends on its earlier environment.",
    "category": "Nature",
    "sourceKey": "seed",
    "related": [
      "seed-scarification",
      "dandelion-hinge"
    ]
  },
  {
    "id": "orchid-fungal-start",
    "question": "Why might a seed need a fungus to get started?",
    "title": "Many orchid seedlings depend on a compatible fungal partner.",
    "text": "Their tiny seeds lack the large food reserve found in many other seeds; there are exceptions.",
    "explore": "Draw the resources reaching a seedling from a partner rather than a packed lunch.",
    "why": "A small package can depend on outside support. The relationship makes germination a partnership rather than a completely solitary event.",
    "category": "Nature",
    "sourceKey": "orchid",
    "related": [
      "orchid-air-envelope",
      "dandelion-hinge"
    ]
  },
  {
    "id": "moss-sponges",
    "question": "How can a moss cushion hold rainwater?",
    "title": "Tiny capillary spaces retain water between its structures.",
    "text": "This sponge-like behavior helps maintain moisture around the moss.",
    "explore": "Draw water held in spaces rather than inside one large reservoir.",
    "why": "The gaps in a material can do useful work. A moss cushion offers a small-scale way to picture water retention.",
    "category": "Nature",
    "sourceKey": "moss",
    "related": [
      "moss-dragon-gold",
      "dandelion-hinge"
    ]
  },
  {
    "id": "fern-heart-stage",
    "question": "Does a fern spore immediately become a little fern frond?",
    "title": "It first grows into a small gametophyte.",
    "text": "This often heart-shaped structure, also called a prothallus, produces eggs and sperm.",
    "explore": "Draw two different-looking stages belonging to one life cycle.",
    "why": "One organism’s life story need not be a simple enlargement of one shape. Alternating forms can hide in a familiar plant’s beginnings.",
    "category": "Nature",
    "sourceKey": "fern",
    "related": [
      "fern-swimming-sperm",
      "dandelion-hinge"
    ]
  },
  {
    "id": "pitcher-leaf-trap",
    "question": "Is a pitcher plant’s trap a separate flower?",
    "title": "The fluid-holding pitcher is a modified leaf.",
    "text": "Slippery rims and inward-facing structures can help keep prey inside.",
    "explore": "Redesign a leaf as a container. Which parts would need different shapes?",
    "why": "A familiar plant part can take on a very different role. Function is worth checking before identifying an organ by appearance.",
    "category": "Nature",
    "sourceKey": "carnivore",
    "related": [
      "sundew-sticky-trap",
      "dandelion-hinge"
    ]
  },
  {
    "id": "diatom-patterned-pores",
    "question": "Are the tiny holes in a diatom wall random damage?",
    "title": "Its frustule has patterned micro- and nanopores.",
    "text": "The pore geometry varies among species and provides routes for exchange with the surroundings.",
    "explore": "Draw a wall that protects while still allowing exchange.",
    "why": "An effective boundary may need carefully arranged openings. A microscopic wall illustrates the balance between separation and access.",
    "category": "Nature",
    "sourceKey": "diatom",
    "related": [
      "diatom-two-valves",
      "dandelion-hinge"
    ]
  },
  {
    "id": "firefly-chemistry",
    "question": "What powers a firefly’s glow?",
    "title": "Luciferin reacts with oxygen with help from the enzyme luciferase.",
    "text": "Special light-producing cells support this chemical reaction, which releases very little heat.",
    "explore": "Trace the light to a chemical process rather than a heated filament.",
    "why": "There is more than one way to produce light. A familiar summer insect provides a striking example of biological chemistry.",
    "category": "Nature",
    "sourceKey": "firefly",
    "related": [
      "firefly-larva",
      "dandelion-hinge"
    ]
  },
  {
    "id": "strider-rowing",
    "question": "Do all six water-strider legs do the same job?",
    "title": "The three pairs specialize in different tasks.",
    "text": "Front legs grasp prey, middle legs provide rowing propulsion, and rear legs help with steering and braking.",
    "explore": "Assign separate jobs to three pairs of supports on a small vehicle.",
    "why": "A repeated body part can be specialized rather than redundant. Dividing tasks helps explain coordinated movement.",
    "category": "Nature",
    "sourceKey": "strider",
    "related": [
      "strider-snowshoe",
      "dandelion-hinge"
    ]
  },
  {
    "id": "nematode-bacteria-menu",
    "question": "What does a bacteria-eating nematode use as a mouth?",
    "title": "A hollow tube takes in its bacterial food.",
    "text": "These bacterivores feed on bacteria rather than using a piercing stylet to attack plant roots.",
    "explore": "Compare a tube with a puncturing tool. Which food would suit each?",
    "why": "Small mouth structures can reveal an animal’s feeding role. Form becomes a clue to interactions we cannot easily watch unaided.",
    "category": "Nature",
    "sourceKey": "nematode",
    "related": [
      "nematode-mini-predator",
      "dandelion-hinge"
    ]
  },
  {
    "id": "rotifer-jaws",
    "question": "Can a microscopic animal have grinding jaws?",
    "title": "Rotifers have a muscular feeding organ called the mastax.",
    "text": "Hardened structures called trophi can grasp, pierce, or grind food, depending on the species.",
    "explore": "Sketch a feeding tool inside a body too small to see clearly unaided.",
    "why": "Small size does not mean an absence of specialized parts. A microscopic animal can have a surprisingly elaborate way to handle food.",
    "category": "Nature",
    "sourceKey": "rotifer",
    "related": [
      "rotifer-anchor",
      "dandelion-hinge"
    ]
  },
  {
    "id": "springtail-snow-flea",
    "question": "Are the tiny jumpers called snow fleas actually fleas?",
    "title": "Snow fleas are springtails, not biting fleas.",
    "text": "The nickname describes their appearance on snow rather than their biological identity.",
    "explore": "Write a label that distinguishes appearance, habitat, and classification.",
    "why": "A vivid nickname is a starting point, not a complete explanation. Checking its meaning can turn a small seasonal sight into a discovery.",
    "category": "Nature",
    "sourceKey": "springtail",
    "related": [
      "springtail-moisture",
      "dandelion-hinge"
    ]
  },
  {
    "id": "owl-offset-ears",
    "question": "Why can uneven ear openings be useful to a Boreal Owl?",
    "title": "Asymmetrical ear placement helps locate sounds vertically.",
    "text": "Differences in incoming sound help the owl pinpoint prey above or below.",
    "explore": "Place two imaginary sensors at different heights. What extra comparison becomes possible?",
    "why": "Symmetry is not always the most useful arrangement. A deliberate difference in sensor placement can provide information.",
    "category": "Nature",
    "sourceKey": "owl",
    "related": [
      "owl-tubular-eyes",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bat-not-blind",
    "question": "Does echolocation mean a bat cannot see?",
    "title": "Bats are not blind.",
    "text": "Many use vision alongside other senses; echolocation does not replace the existence of eyes.",
    "explore": "Compare having an extra sensing method with lacking an ordinary one.",
    "why": "One impressive ability can lead to a false assumption about another. Separating the two makes a familiar myth easier to correct.",
    "category": "Nature",
    "sourceKey": "bat",
    "related": [
      "bat-air-sensors",
      "dandelion-hinge"
    ]
  },
  {
    "id": "snake-heat-pits",
    "question": "Can some snakes detect a warm animal without ordinary visible light?",
    "title": "Pit vipers and some boas and pythons have heat-sensitive pits.",
    "text": "These organs detect thermal information; not every snake has them.",
    "explore": "Compare seeing reflected light with detecting a warm source.",
    "why": "Different physical signals can reveal the same object. Distinguishing those channels broadens our picture of what sensing can mean.",
    "category": "Nature",
    "sourceKey": "snake",
    "related": [
      "snake-jaw-connection",
      "dandelion-hinge"
    ]
  },
  {
    "id": "shark-lateral-line",
    "question": "How can a shark detect nearby water movement?",
    "title": "Its lateral line senses vibrations and pressure changes.",
    "text": "Specialized sensory cells in this system help register disturbances around the body.",
    "explore": "Draw a row of sensors along a moving object.",
    "why": "Distributed sensors can reveal patterns around a body. This is a useful comparison with a single sensor concentrated at the front.",
    "category": "Nature",
    "sourceKey": "sharksenses",
    "related": [
      "shark-eye-reflector",
      "dandelion-hinge"
    ]
  },
  {
    "id": "mantis-colour-test",
    "question": "Do more color-receptor types guarantee finer color discrimination?",
    "title": "A tested mantis-shrimp species performed worse than humans at separating similar colors.",
    "text": "Haptosquilla trispinosa has twelve color channels, yet the behavioral result challenged the expected advantage.",
    "explore": "Compare the number of inputs with performance on one clearly defined task.",
    "why": "More components do not automatically mean better performance on every task. Measuring the result is more revealing than counting the parts.",
    "category": "Nature",
    "sourceKey": "mantistest",
    "related": [
      "mantis-uv-filters",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bicycle-pneumatic",
    "question": "What small change helped make early bicycles more comfortable?",
    "title": "Air-filled pneumatic tires followed the safety bicycle’s arrival.",
    "text": "John Boyd Dunlop’s tire development was part of the late nineteenth-century bicycle’s evolution.",
    "explore": "Draw a wheel with a compressible layer around its rim.",
    "why": "An improvement at the contact surface can change the experience of the whole machine. The basic frame is only part of the story.",
    "category": "Inventions",
    "sourceKey": "bicycletire",
    "related": [
      "bicycle-low-seat",
      "first-transistor"
    ]
  },
  {
    "id": "camera-name-room",
    "question": "Why does an imaging device have a name meaning dark room?",
    "title": "Camera obscura comes from the Latin for dark room.",
    "text": "The early room-sized arrangement later appeared in smaller portable forms.",
    "explore": "Compare a room, a tent, and a small box serving the same optical function.",
    "why": "A name can preserve an earlier scale of a technology. Miniaturization may change the container while retaining the underlying principle.",
    "category": "Inventions",
    "sourceKey": "camera",
    "related": [
      "camera-mirror-paper",
      "first-transistor"
    ]
  },
  {
    "id": "watch-quartz-number",
    "question": "Why does 32,768 appear so often in quartz timekeeping?",
    "title": "Many quartz watches use a crystal oscillating at 32,768 hertz.",
    "text": "Electronics divide that frequency down to a once-per-second timing signal.",
    "explore": "Repeatedly halve 32,768 until you reach one. How many steps does it take?",
    "why": "A carefully chosen number can simplify an electronic design. The connection makes an ordinary watch a small lesson in repeated division.",
    "category": "Inventions",
    "sourceKey": "time",
    "related": [
      "atomic-resonance",
      "first-transistor"
    ]
  },
  {
    "id": "gecko-split-tips",
    "question": "What is useful about a gecko toe hair having many split ends?",
    "title": "Fine branching creates many tiny contact tips.",
    "text": "These nanoscale tips help the toe contact the surface closely.",
    "explore": "Draw one large contact and then subdivide it into many smaller contacts.",
    "why": "Subdividing a structure can change its interaction with a surface. Small features can collectively affect a much larger movement.",
    "category": "Patterns & invention",
    "sourceKey": "gecko",
    "related": [
      "gecko-peeling",
      "roman-concrete"
    ]
  },
  {
    "id": "hooke-flea-engraving",
    "question": "How did seventeenth-century readers see a flea enlarged?",
    "title": "Micrographia included detailed engraved microscopic views.",
    "text": "The illustrations made tiny structures available to readers who did not have their own microscopes.",
    "explore": "Imagine communicating a new observation without a camera or screen.",
    "why": "An observation becomes more useful when others can inspect a representation. Image-making has long been part of scientific communication.",
    "category": "Art & ideas",
    "sourceKey": "hookeimages",
    "related": [
      "leeuwenhoek-one-lens",
      "art-pigments"
    ]
  },
  {
    "id": "diamond-woodblocks",
    "question": "Was the 868 Diamond Sutra printed with movable metal letters?",
    "title": "It was made using woodblock printing.",
    "text": "Text and an illustrated frontispiece were reproduced through a process different from movable type.",
    "explore": "Compare a whole carved page with a page assembled from reusable characters.",
    "why": "The word printed covers more than one mechanism. Distinguishing the method helps preserve the ingenuity of different traditions.",
    "category": "Ancient ingenuity",
    "sourceKey": "printing",
    "related": [
      "jikji-metal-type",
      "gobekli-builders"
    ]
  },
  {
    "id": "coin-touchstone",
    "question": "How could ancient metalworkers inspect a precious-metal mixture?",
    "title": "They compared the streak it left on a touchstone.",
    "text": "The visual test helped assess metal content, though testing many tiny pieces remained difficult.",
    "explore": "Imagine testing a material by a trace it leaves rather than destroying the whole piece.",
    "why": "A small sample can stand in for a larger object. Understanding the test also means understanding its practical limits.",
    "category": "Ancient ingenuity",
    "sourceKey": "coins",
    "related": [
      "lydian-tiny-fractions",
      "gobekli-builders"
    ]
  },
  {
    "id": "wave-fuji-background",
    "question": "What mountain hides beyond Hokusai’s towering wave?",
    "title": "Mount Fuji appears in the distance.",
    "text": "The print belongs to the series Thirty-six Views of Mount Fuji, despite the wave dominating its familiar nickname.",
    "explore": "Look for the less obvious subject within a dramatic foreground.",
    "why": "A title or series can redirect attention. The main visual impression need not be the only subject worth noticing.",
    "category": "Art & ideas",
    "sourceKey": "wave",
    "related": [
      "wave-two-blues",
      "art-pigments"
    ]
  },
  {
    "id": "census-electric-pins",
    "question": "How could a hole in paper trigger an electrical count?",
    "title": "A metal pin passed through the hole and completed a circuit.",
    "text": "The reading mechanism turned a physical opening into an electrical event.",
    "explore": "Draw a circuit interrupted by paper except where a hole is present.",
    "why": "A boundary between two states can encode information. Following the conversion step connects physical objects with data handling.",
    "category": "Computing & AI",
    "sourceKey": "censuspins",
    "related": [
      "census-1890",
      "jacquard-patterns"
    ]
  },
  {
    "id": "seed-scarification",
    "question": "How can a small scratch help some seeds germinate?",
    "title": "A hard seed coat may block water and gases.",
    "text": "Scarification makes the coat more permeable in species with this type of dormancy.",
    "explore": "Imagine a protective container that must eventually let water enter.",
    "why": "Protection and access can pull in different directions. A seed coat has to serve a different role at different stages.",
    "category": "Nature",
    "sourceKey": "seed",
    "related": [
      "seed-needs-air",
      "dandelion-hinge"
    ]
  },
  {
    "id": "orchid-air-envelope",
    "question": "What helps many orchid seeds travel on air?",
    "title": "A thin seed coat forms a light envelope around a tiny embryo.",
    "text": "In many orchids this balloon-like structure is suited to wind dispersal.",
    "explore": "Compare the space occupied by an embryo with the space around it.",
    "why": "Empty space can be functional. Looking at the envelope as well as its contents helps explain a tiny traveling structure.",
    "category": "Nature",
    "sourceKey": "orchid",
    "related": [
      "orchid-partner-choice",
      "dandelion-hinge"
    ]
  },
  {
    "id": "moss-dragon-gold",
    "question": "Does dragon’s gold moss make its own green light?",
    "title": "Schistostega pennata reflects incoming light from specialized cells.",
    "text": "Lens-shaped cells help concentrate weak light; the glow is reflection rather than firefly-like light production.",
    "explore": "Compare a reflector with a lamp. What happens if incoming light disappears?",
    "why": "Two similar appearances can have different causes. Asking where the light comes from is a valuable first step in explaining a glow.",
    "category": "Nature",
    "sourceKey": "moss",
    "related": [
      "moss-mini-habitat",
      "dandelion-hinge"
    ]
  },
  {
    "id": "fern-swimming-sperm",
    "question": "Why does water matter to fern fertilization?",
    "title": "Fern sperm swim through a thin film of water to reach an egg.",
    "text": "Moisture is therefore part of reproduction as well as growth.",
    "explore": "Sketch the short journey between reproductive cells on a tiny plant.",
    "why": "The environment can be part of a reproductive mechanism. A film of water may serve as a route rather than merely a drink.",
    "category": "Nature",
    "sourceKey": "fern",
    "related": [
      "fern-two-generations",
      "dandelion-hinge"
    ]
  },
  {
    "id": "sundew-sticky-trap",
    "question": "How does a sundew catch prey without snapping shut?",
    "title": "Sticky droplets on its leaves hold small animals.",
    "text": "This adhesive trap is a different strategy from a flytrap’s rapid closing leaves.",
    "explore": "Compare an adhesive surface with a moving trap.",
    "why": "Different mechanisms can solve a related problem. Comparing them helps reveal the choices hidden behind the broad label carnivorous plant.",
    "category": "Nature",
    "sourceKey": "carnivore",
    "related": [
      "pitcher-tree-shrew",
      "dandelion-hinge"
    ]
  },
  {
    "id": "diatom-two-valves",
    "question": "How is a diatom’s protective wall like a box with a lid?",
    "title": "Its two overlapping halves fit one over the other.",
    "text": "These silica valves surround the cell rather than forming one seamless shell.",
    "explore": "Sketch two shallow parts that overlap to enclose a space.",
    "why": "A tiny enclosure can use a familiar construction pattern. Recognizing the arrangement makes an unfamiliar organism easier to picture.",
    "category": "Nature",
    "sourceKey": "diatomvalves",
    "related": [
      "diatom-sediment",
      "dandelion-hinge"
    ]
  },
  {
    "id": "firefly-larva",
    "question": "Can a firefly glow before it has adult wings?",
    "title": "The larvae of some firefly species glow too.",
    "text": "Many larvae live around damp soil and hunt small prey such as snails and slugs.",
    "explore": "Draw a life cycle and mark more than one light-producing stage.",
    "why": "The best-known adult form is not the whole story. Looking at earlier stages can reveal a different habitat and way of life.",
    "category": "Nature",
    "sourceKey": "firefly",
    "related": [
      "firefly-flash-code",
      "dandelion-hinge"
    ]
  },
  {
    "id": "strider-snowshoe",
    "question": "Why do long leg sections touch the water instead of just tiny tips?",
    "title": "The contact spreads the insect’s weight over a larger area.",
    "text": "The National Park Service compares the arrangement to a snowshoe.",
    "explore": "Compare one small contact point with a long contact line.",
    "why": "How a load is applied can matter as much as its size. Contact geometry offers an accessible bridge between animals and mechanical design.",
    "category": "Nature",
    "sourceKey": "strider",
    "related": [
      "strider-detergent",
      "dandelion-hinge"
    ]
  },
  {
    "id": "nematode-mini-predator",
    "question": "Can microscopic worms hunt other microscopic worms?",
    "title": "Some nematodes prey on other nematodes and similarly sized animals.",
    "text": "The soil food web includes predators even at a scale too small to notice while gardening.",
    "explore": "Draw a food web within a small pinch of soil.",
    "why": "Predation is not restricted to large visible animals. Changing scale reveals an active ecosystem beneath an ordinary surface.",
    "category": "Nature",
    "sourceKey": "nematode",
    "related": [
      "nematode-recycling",
      "dandelion-hinge"
    ]
  },
  {
    "id": "rotifer-anchor",
    "question": "Must a rotifer swim freely all the time?",
    "title": "Some rotifers attach to a surface or live in colonies.",
    "text": "The group includes sessile forms as well as free-swimming animals.",
    "explore": "Compare drifting through water with staying attached and bringing food toward you.",
    "why": "An aquatic lifestyle can take several forms. The choice between moving to resources and moving resources toward oneself is a useful comparison.",
    "category": "Nature",
    "sourceKey": "rotifer",
    "related": [
      "rotifer-feeding-current",
      "dandelion-hinge"
    ]
  },
  {
    "id": "springtail-moisture",
    "question": "Why are springtails often found in damp places?",
    "title": "Springtails thrive around moisture and organic debris.",
    "text": "Their habitat includes soil, leaf litter, and other humid locations.",
    "explore": "Map the damp microhabitats around a garden without disturbing them.",
    "why": "A creature’s location can reveal its environmental needs. Small patches of habitat may differ greatly within one apparently uniform area.",
    "category": "Nature",
    "sourceKey": "springtail",
    "related": [
      "springtail-menu",
      "dandelion-hinge"
    ]
  },
  {
    "id": "owl-tubular-eyes",
    "question": "Are owl eyes shaped just like little human eyeballs?",
    "title": "Owls have tube-shaped eyes supported by specialized sockets.",
    "text": "This arrangement accommodates large retinas within the skull.",
    "explore": "Compare a sphere with an elongated optical instrument.",
    "why": "An organ’s internal shape can differ from its visible front. Looking beyond the outline helps explain specialized anatomy.",
    "category": "Nature",
    "sourceKey": "owl",
    "related": [
      "owl-ear-tufts",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bat-air-sensors",
    "question": "Can a bat’s wing sense the air moving over it?",
    "title": "Tiny sensory hairs help provide airflow information.",
    "text": "This information can contribute to adjustments of the flexible wing during flight.",
    "explore": "Add sensors to a flexible wing rather than treating it as passive fabric.",
    "why": "A moving structure can also be a sensing surface. Combining those roles is an interesting connection between animal flight and control design.",
    "category": "Nature",
    "sourceKey": "bat",
    "related": [
      "bat-echo-map",
      "dandelion-hinge"
    ]
  },
  {
    "id": "snake-jaw-connection",
    "question": "Must a snake dislocate its jaw to swallow large prey?",
    "title": "Flexible connections let its jaws move without that dislocation.",
    "text": "The mouth bones are loosely connected, and the two lower-jaw halves are not rigidly fused like ours.",
    "explore": "Compare a rigid frame with parts joined by flexible links.",
    "why": "A surprising movement may reflect a different construction rather than an injury. Understanding the connections can replace a persistent myth.",
    "category": "Nature",
    "sourceKey": "snake",
    "related": [
      "snake-no-ear-flaps",
      "dandelion-hinge"
    ]
  },
  {
    "id": "shark-eye-reflector",
    "question": "What helps a shark reuse light that reaches its eye?",
    "title": "A reflective layer behind the retina sends light back through it.",
    "text": "The tapetum lucidum is an adaptation also familiar in animals such as cats.",
    "explore": "Draw a light path that crosses a sensing layer twice.",
    "why": "The path through a sensor can be engineered by surrounding structures. A reflector can matter as much as the detector itself.",
    "category": "Nature",
    "sourceKey": "sharksenses",
    "related": [
      "shark-senses-team",
      "dandelion-hinge"
    ]
  },
  {
    "id": "mantis-uv-filters",
    "question": "How can a mantis shrimp tune its sensitivity to ultraviolet light?",
    "title": "Special optical filters modify the light reaching some receptors.",
    "text": "Researchers identified UV filters using compounds related to biological sunscreens.",
    "explore": "Place a filter before a sensor in a diagram. What information could it change?",
    "why": "A sensor is influenced by what happens before detection. Filtering can be a functional part of the system rather than just protection.",
    "category": "Nature",
    "sourceKey": "mantisuv",
    "related": [
      "mantis-midband",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bicycle-low-seat",
    "question": "Why was the safety bicycle’s lower riding position significant?",
    "title": "Smaller wheels brought the rider closer to the ground.",
    "text": "It was developed as a safer alternative to the high-wheeled ordinary, or penny-farthing.",
    "explore": "Compare the consequences of losing balance from two different heights.",
    "why": "The scale of a possible failure matters in design. Lowering a user’s position can change a machine’s practical accessibility.",
    "category": "Inventions",
    "sourceKey": "bicyclelower",
    "related": [
      "bicycle-independent-travel",
      "first-transistor"
    ]
  },
  {
    "id": "camera-mirror-paper",
    "question": "How did some portable camera obscuras help artists sketch upright images?",
    "title": "An inclined mirror redirected the lens image onto translucent paper.",
    "text": "The reflex-box arrangement made the projection accessible from above.",
    "explore": "Add a mirror to a ray diagram and follow the change in direction.",
    "why": "Changing the light path can change how a tool is used. A small internal part can make an optical principle practical for a person.",
    "category": "Inventions",
    "sourceKey": "camera",
    "related": [
      "camera-before-photo",
      "first-transistor"
    ]
  },
  {
    "id": "atomic-resonance",
    "question": "Does an atomic clock count tiny planets orbiting inside atoms?",
    "title": "It uses the frequency associated with an atomic energy-level transition.",
    "text": "The reference is a reproducible physical property rather than a miniature mechanical orbit.",
    "explore": "Replace a moving pointer in your mental model with a measured resonance.",
    "why": "An everyday analogy can become misleading at a different scale. Describing what is measured helps keep the explanation grounded.",
    "category": "Inventions",
    "sourceKey": "time",
    "related": [
      "second-cesium-count",
      "first-transistor"
    ]
  },
  {
    "id": "gecko-peeling",
    "question": "How can a gecko release a foot that was holding firmly?",
    "title": "It uncurls and peels its toes away.",
    "text": "Detaching the fine contacts in a controlled way permits rapid stepping rather than permanent sticking.",
    "explore": "Compare pulling an entire patch straight off with peeling from one edge.",
    "why": "Release matters as much as grip in a moving system. A useful attachment needs a workable way to disengage.",
    "category": "Patterns & invention",
    "sourceKey": "gecko",
    "related": [
      "gecko-robot-toes",
      "roman-concrete"
    ]
  },
  {
    "id": "leeuwenhoek-one-lens",
    "question": "Did Leeuwenhoek need a long tube full of lenses to investigate tiny life?",
    "title": "His microscopes used a single very small lens.",
    "text": "The compact instruments differ greatly from a modern classroom microscope.",
    "explore": "Compare a tool’s size with the scale of the things it reveals.",
    "why": "A powerful result does not always require a large-looking instrument. The example encourages attention to the crucial component.",
    "category": "Art & ideas",
    "sourceKey": "leeuwenhoek",
    "related": [
      "leeuwenhoek-close-work",
      "art-pigments"
    ]
  },
  {
    "id": "jikji-metal-type",
    "question": "Did movable metal type exist before Gutenberg’s Bible?",
    "title": "Jikji was printed in Korea in 1377 using movable metal characters.",
    "text": "The surviving volume is recognized by the Bibliothèque nationale de France as the oldest known book made by this process.",
    "explore": "Place several printing traditions on one timeline without giving them identical methods.",
    "why": "A wider timeline can reveal contributions hidden by one familiar name. Specific dates and techniques make the comparison more meaningful.",
    "category": "Ancient ingenuity",
    "sourceKey": "jikji",
    "related": [
      "jikji-reusable-characters",
      "gobekli-builders"
    ]
  },
  {
    "id": "lydian-tiny-fractions",
    "question": "How small could a Lydian fractional coin be?",
    "title": "Some lion’s-paw coins were about four millimeters across.",
    "text": "The Sardis study describes fractions weighing around 0.15 grams, a tiny scale for a piece of precious-metal currency.",
    "explore": "Compare the diameter with a familiar small object without assuming equal value.",
    "why": "Physical size and economic significance are different. A small artifact can reveal a large system of measurement and exchange.",
    "category": "Ancient ingenuity",
    "sourceKey": "coins",
    "related": [
      "croesus-two-metals",
      "gobekli-builders"
    ]
  },
  {
    "id": "wave-two-blues",
    "question": "Was the Great Wave’s dark blue outline made with only one blue pigment?",
    "title": "Analysis found mixtures of Prussian blue and indigo.",
    "text": "Met scientists investigated the pigments to understand the printers’ choices.",
    "explore": "Compare a color’s appearance with the ingredients used to make it.",
    "why": "One visible color can contain a material mixture. Scientific analysis can reveal artistic decisions that the eye alone cannot separate.",
    "category": "Art & ideas",
    "sourceKey": "wave",
    "related": [
      "wave-double-print",
      "art-pigments"
    ]
  },
  {
    "id": "census-1890",
    "question": "Which large counting task used Hollerith’s electric tabulation system?",
    "title": "The US census of 1890 used it to process population data.",
    "text": "The machinery was a practical response to the scale of statistical work.",
    "explore": "Imagine organizing a large count with the same question repeated across many records.",
    "why": "Large workloads can motivate new tools. Computing history includes the effort to make ordinary repeated tasks manageable.",
    "category": "Computing & AI",
    "sourceKey": "census",
    "related": [
      "census-pantograph",
      "jacquard-patterns"
    ]
  },
  {
    "id": "seed-needs-air",
    "question": "Can a germinating seed need air before it has leaves?",
    "title": "Seeds need oxygen during germination.",
    "text": "A reduced oxygen supply can slow or prevent germination, alongside other unsuitable conditions.",
    "explore": "List what a seed needs besides soil. Which requirements are invisible?",
    "why": "An early stage of growth has its own resource needs. Looking beyond the visible shoot helps explain what is happening underground.",
    "category": "Nature",
    "sourceKey": "seed",
    "related": [
      "seed-living-pause",
      "dandelion-hinge"
    ]
  },
  {
    "id": "orchid-partner-choice",
    "question": "Will any fungus do for an orchid seedling?",
    "title": "Some orchids accept many fungi; others need a much narrower match.",
    "text": "Compatibility varies among orchids, so merely reaching a patch of ground need not be enough.",
    "explore": "Design a matching game in which some pieces have many partners and others only a few.",
    "why": "Relationships can be specific rather than interchangeable. This adds another dimension to the problem of finding a suitable place to grow.",
    "category": "Nature",
    "sourceKey": "orchid",
    "related": [
      "orchid-dust-seeds",
      "dandelion-hinge"
    ]
  },
  {
    "id": "moss-mini-habitat",
    "question": "Can a patch of moss be a home for other creatures?",
    "title": "Moss communities provide microhabitats for small animals.",
    "text": "Insects can shelter, lay eggs, and hunt within these miniature landscapes.",
    "explore": "Draw a moss patch from the viewpoint of a very small inhabitant.",
    "why": "A habitat depends on the scale of its occupant. An ordinary patch can become a complex landscape when we change perspective.",
    "category": "Nature",
    "sourceKey": "moss",
    "related": [
      "moss-rootless",
      "dandelion-hinge"
    ]
  },
  {
    "id": "fern-two-generations",
    "question": "Which stage becomes the large leafy fern we recognize?",
    "title": "The familiar fern is the sporophyte generation.",
    "text": "It develops after fertilization and eventually produces spores that begin the cycle again.",
    "explore": "Connect the gametophyte and sporophyte with arrows showing what each produces.",
    "why": "A cycle can alternate between different roles. Following the arrows makes an unfamiliar biological pattern easier to understand.",
    "category": "Nature",
    "sourceKey": "fern",
    "related": [
      "fern-not-seeds",
      "dandelion-hinge"
    ]
  },
  {
    "id": "pitcher-tree-shrew",
    "question": "Can an animal’s droppings feed a pitcher plant?",
    "title": "Nepenthes lowii can obtain nutrients from tree-shrew droppings.",
    "text": "A visiting shrew can use the pitcher like a toilet rather than becoming its prey.",
    "explore": "Draw two ways nutrients could reach the same leaf-shaped container.",
    "why": "A structure can participate in an unexpected relationship. The example challenges the assumption that every pitcher works only by catching insects.",
    "category": "Nature",
    "sourceKey": "carnivore",
    "related": [
      "flytrap-two-touches",
      "dandelion-hinge"
    ]
  },
  {
    "id": "diatom-sediment",
    "question": "What can remain after a diatom dies?",
    "title": "Its resistant silica wall can become part of sediment.",
    "text": "The two halves can separate and settle to the bottom of the water body.",
    "explore": "Separate a living cell’s contents from the structures it leaves behind.",
    "why": "A short-lived organism can leave a durable material trace. This connects microscopic life with the longer history recorded in sediments.",
    "category": "Nature",
    "sourceKey": "diatomsediment",
    "related": [
      "diatom-silica",
      "dandelion-hinge"
    ]
  },
  {
    "id": "firefly-flash-code",
    "question": "Why don’t all fireflies flash in the same rhythm?",
    "title": "Flash patterns can help identify potential mates.",
    "text": "Rhythm and intensity vary among species; some also synchronize their flashes.",
    "explore": "Invent two recognizable rhythms using the same single light.",
    "why": "A signal can carry information through timing. This is a natural example of meaning encoded in a sequence rather than a new color or shape.",
    "category": "Nature",
    "sourceKey": "firefly",
    "related": [
      "firefly-beetle",
      "dandelion-hinge"
    ]
  },
  {
    "id": "strider-detergent",
    "question": "Why can detergent threaten a water strider’s footing?",
    "title": "Surfactants reduce the surface tension it relies on.",
    "text": "Changing the water’s surface can undermine the insect’s support; this is not a suggested experiment.",
    "explore": "Imagine changing the supporting surface without changing the animal.",
    "why": "A small chemical change can alter a mechanical situation. The example shows why the environment belongs inside an explanation of performance.",
    "category": "Nature",
    "sourceKey": "strider",
    "related": [
      "strider-air-hairs",
      "dandelion-hinge"
    ]
  },
  {
    "id": "nematode-recycling",
    "question": "How can eating bacteria help return nutrients to soil?",
    "title": "Bacterial- and fungal-feeding nematodes contribute to nutrient recycling.",
    "text": "Their feeding releases nutrients from microbial biomass, making them accessible again in the soil system.",
    "explore": "Follow a nutrient through a microbe, a grazer, and the surrounding soil.",
    "why": "Recycling can involve several living steps. Tracing the transfers is more revealing than calling soil simply dirt.",
    "category": "Nature",
    "sourceKey": "nematode",
    "related": [
      "nematode-not-all-parasites",
      "dandelion-hinge"
    ]
  },
  {
    "id": "rotifer-feeding-current",
    "question": "How can a tiny animal bring food toward its mouth?",
    "title": "Filter-feeding rotifers use cilia to generate feeding currents.",
    "text": "Particles move along a feeding groove rather than needing to be chased one by one.",
    "explore": "Design a moving surface that draws small particles toward one place.",
    "why": "A flow can do the collecting. This connects a microscopic feeding strategy with the wider idea of using fluid movement as a tool.",
    "category": "Nature",
    "sourceKey": "rotifer",
    "related": [
      "rotifer-wheel",
      "dandelion-hinge"
    ]
  },
  {
    "id": "springtail-menu",
    "question": "What can a springtail find to eat in decaying material?",
    "title": "Many springtails feed on fungi, algae, and decaying plant matter.",
    "text": "They are part of the small-scale community associated with organic debris.",
    "explore": "Draw a feeding scene with no large leaves or visible prey.",
    "why": "Food exists at scales we easily overlook. Thinking about those resources helps explain why a seemingly empty patch can support life.",
    "category": "Nature",
    "sourceKey": "springtail",
    "related": [
      "springtail-fork",
      "dandelion-hinge"
    ]
  },
  {
    "id": "owl-ear-tufts",
    "question": "Are an owl’s feather tufts its ears?",
    "title": "The apparent ears on tufted owls are feathers.",
    "text": "The actual openings are concealed at the sides of the head near the facial disk.",
    "explore": "Label what you can see separately from the structure doing the sensing.",
    "why": "A resemblance can invite a wrong identification. Checking function before naming a part is a useful habit in observing animals.",
    "category": "Nature",
    "sourceKey": "owltuft",
    "related": [
      "owl-facial-dish",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bat-echo-map",
    "question": "How do many bats locate insects in darkness?",
    "title": "They emit calls and interpret the returning echoes.",
    "text": "The outgoing signal and its reflections provide information about nearby objects and prey.",
    "explore": "Draw one signal traveling out and several reflections returning.",
    "why": "Active sensing changes the environment to obtain information. Following both halves of the journey explains why an echo can be useful.",
    "category": "Nature",
    "sourceKey": "bat",
    "related": [
      "bat-finger-wings",
      "dandelion-hinge"
    ]
  },
  {
    "id": "snake-no-ear-flaps",
    "question": "Can a snake sense vibrations without external ear flaps?",
    "title": "Its body can detect vibrations from the surroundings.",
    "text": "Snakes lack the conspicuous outer ears familiar on many mammals.",
    "explore": "Design a sensor coupled to a surface rather than pointed into the air.",
    "why": "An absent familiar structure does not mean absent information. Different routes can provide clues about the environment.",
    "category": "Nature",
    "sourceKey": "snakehearing",
    "related": [
      "snake-tongue-samples",
      "dandelion-hinge"
    ]
  },
  {
    "id": "shark-senses-team",
    "question": "Does a shark hunt with smell alone?",
    "title": "Sharks combine several sensory systems when finding prey.",
    "text": "Vision, hearing, smell, lateral-line sensing, and electroreception provide different kinds of information.",
    "explore": "Give each sensing channel a different clue in a search problem.",
    "why": "A reputation built around one sense can obscure a larger system. Combining complementary signals can be more informative than relying on one alone.",
    "category": "Nature",
    "sourceKey": "sharksenses",
    "related": [
      "shark-electric-fields",
      "dandelion-hinge"
    ]
  },
  {
    "id": "mantis-midband",
    "question": "What unusual stripe divides many mantis-shrimp compound eyes?",
    "title": "A specialized midband separates upper and lower retinal regions.",
    "text": "Its rows of light-sensing units contribute to the eye’s elaborate organization.",
    "explore": "Compare one uniform sensor array with regions assigned different roles.",
    "why": "A complex sensor may contain specialized zones. Looking at the arrangement adds information that a total receptor count misses.",
    "category": "Nature",
    "sourceKey": "mantismid",
    "related": [
      "mantis-polarization",
      "dandelion-hinge"
    ]
  },
  {
    "id": "bicycle-independent-travel",
    "question": "What social role did the bicycle play before cars were common?",
    "title": "It offered comparatively inexpensive individual transport.",
    "text": "Riders used bicycles for commuting, deliveries, recreation, and sport in the late nineteenth century.",
    "explore": "Imagine the same town before and after affordable personal transport.",
    "why": "A mechanical design can change what people can do independently. Evaluating an invention includes its place in everyday life.",
    "category": "Inventions",
    "sourceKey": "bicycle",
    "related": [
      "bicycle-equal-wheels",
      "first-transistor"
    ]
  },
  {
    "id": "camera-before-photo",
    "question": "Did cameras exist before photographs could be permanently recorded?",
    "title": "Camera obscuras were used before the invention of photography.",
    "text": "Portable box versions supplied an optical starting point for early photographic experiments.",
    "explore": "Separate forming an image, observing it, and preserving it into three steps.",
    "why": "An invention can build on a tool that already solves part of the problem. Distinguishing the steps makes the new contribution easier to identify.",
    "category": "Inventions",
    "sourceKey": "camera",
    "related": [
      "pinhole-room",
      "first-transistor"
    ]
  },
  {
    "id": "second-cesium-count",
    "question": "What very large count defines one SI second?",
    "title": "The definition uses 9,192,631,770 periods of specified cesium-133 radiation.",
    "text": "It refers to the transition between two ground-state hyperfine energy levels under the definition’s specified conditions.",
    "explore": "Compare a human-scale second with the much faster cycle used to define it.",
    "why": "A shared unit needs a reproducible reference. A very fast physical process can provide the basis for a familiar interval.",
    "category": "Inventions",
    "sourceKey": "time",
    "related": [
      "time-counting-swings",
      "first-transistor"
    ]
  },
  {
    "id": "gecko-robot-toes",
    "question": "Why did researchers study gecko toes individually for climbing robots?",
    "title": "Separate flexible toes can adapt to irregular surface contact.",
    "text": "The Berkeley team investigated how toe behavior helps maintain attachment on changing terrain.",
    "explore": "Give a robot several independently adjusting contacts rather than one rigid pad.",
    "why": "Breaking a contact surface into adjustable parts can improve adaptability. This is a direct bridge from observing an animal to testing a design.",
    "category": "Patterns & invention",
    "sourceKey": "gecko",
    "related": [
      "gecko-molecular-grip",
      "roman-concrete"
    ]
  },
  {
    "id": "leeuwenhoek-close-work",
    "question": "Why could Leeuwenhoek’s simple microscopes be difficult to use?",
    "title": "The eye and specimen had to work very close to the tiny lens.",
    "text": "The compact single-lens arrangement required careful positioning rather than a comfortable distant view.",
    "explore": "Sketch a usable workspace around a very small optical component.",
    "why": "An effective instrument is also an interaction between a person and a device. Precision can come with practical demands on the user.",
    "category": "Art & ideas",
    "sourceKey": "leeuwenhoekclose",
    "related": [
      "hooke-cork-cells",
      "art-pigments"
    ]
  },
  {
    "id": "jikji-reusable-characters",
    "question": "What makes movable type different from a complete carved block?",
    "title": "Individual characters can be arranged to compose text.",
    "text": "Jikji’s cast metal characters represent this method rather than carving each whole page as one surface.",
    "explore": "Build two messages from the same small set of letter pieces.",
    "why": "Reconfigurable parts can change how information is reproduced. The small unit of reuse is central to the larger production method.",
    "category": "Ancient ingenuity",
    "sourceKey": "jikji",
    "related": [
      "diamond-sutra-date",
      "gobekli-builders"
    ]
  },
  {
    "id": "croesus-two-metals",
    "question": "What changed when Croesus reformed Lydian coinage?",
    "title": "Separate gold and silver coins replaced electrum issues.",
    "text": "The reform made the metal categories more distinct than a variable gold-silver mixture.",
    "explore": "Compare a variable mixture with two separately defined materials.",
    "why": "Standardization can change how easily people compare objects. Coinage connects material processing with trust and coordination.",
    "category": "Ancient ingenuity",
    "sourceKey": "coins",
    "related": [
      "lydian-electrum",
      "gobekli-builders"
    ]
  },
  {
    "id": "wave-double-print",
    "question": "How did printers deepen the Great Wave’s blue without simply changing its color?",
    "title": "They printed one blue pigment over another.",
    "text": "Evidence of double printing helped Met researchers explain the rich result.",
    "explore": "Compare mixing two pigments first with layering them in separate impressions.",
    "why": "Sequence is part of a material process. A similar set of ingredients can produce different results depending on how it is applied.",
    "category": "Art & ideas",
    "sourceKey": "wave",
    "related": [
      "wave-not-painting",
      "art-pigments"
    ]
  },
  {
    "id": "census-pantograph",
    "question": "How did an operator punch a card without aiming at a tiny blank position?",
    "title": "A pantograph-style punch used a labeled template and stylus.",
    "text": "Moving the stylus to a position guided the corresponding hole in the card.",
    "explore": "Separate an easy-to-read control layout from the smaller output it produces.",
    "why": "A tool can translate a comfortable human movement into a precise mark. Interface design mattered long before screens.",
    "category": "Computing & AI",
    "sourceKey": "census",
    "related": [
      "census-paper-data",
      "jacquard-patterns"
    ]
  }
];
export const smallThingsFacts = drafts.map(draft => ({...draft,collection:'small-things' as const,source:smallThingsSources[draft.sourceKey].label,url:smallThingsSources[draft.sourceKey].url}));
