import type {Fact} from './facts';

// V2.0 append-only discoveries. See docs/curiosity-v20-source-review.md.
export const worldWonderSources = {
  "nautilus": {
    "label": "NOAA National Ocean Service · What is a nautilus?",
    "url": "https://oceanservice.noaa.gov/facts/nautilus.html",
    "reviewedOn": "2026-11-13"
  },
  "cuttlefish": {
    "label": "Monterey Bay Aquarium · Common cuttlefish",
    "url": "https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/common-cuttlefish",
    "reviewedOn": "2026-11-13"
  },
  "pangolin": {
    "label": "San Diego Zoo Wildlife Alliance · Tree pangolin",
    "url": "https://animals.sandiegozoo.org/animals/tree-pangolin",
    "reviewedOn": "2026-11-13"
  },
  "otter": {
    "label": "Monterey Bay Aquarium · Sea otter",
    "url": "https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/sea-otter",
    "reviewedOn": "2026-11-13"
  },
  "echidna": {
    "label": "San Diego Zoo Wildlife Alliance · Echidna",
    "url": "https://animals.sandiegozoo.org/animals/echidna",
    "reviewedOn": "2026-11-13"
  },
  "sloth": {
    "label": "San Diego Zoo Wildlife Alliance · Two-toed sloth",
    "url": "https://animals.sandiegozoo.org/animals/two-toed-sloth",
    "reviewedOn": "2026-11-13"
  },
  "archer": {
    "label": "Aquarium of the Pacific · Banded archerfish",
    "url": "https://www.aquariumofpacific.org/onlinelearningcenter/species/banded_archerfish/",
    "reviewedOn": "2026-11-13"
  },
  "cucumber": {
    "label": "Aquarium of the Pacific · Johnsons sea cucumber",
    "url": "https://www.aquariumofpacific.org/onlinelearningcenter/species/johnsons_sea_cucumber",
    "reviewedOn": "2026-11-13"
  },
  "bower": {
    "label": "Australian Museum · Satin bowerbird",
    "url": "https://australian.museum/learn/animals/birds/satin-bowerbird/",
    "reviewedOn": "2026-11-13"
  },
  "trapant": {
    "label": "Smithsonian research team · Spring-loaded trap-jaw ants",
    "url": "https://www.si.edu/newsdesk/releases/scientists-reveal-how-these-ants-snap-their-jaws-shut-blink-eye",
    "reviewedOn": "2026-11-13"
  },
  "aflaj": {
    "label": "UNESCO · Aflaj Irrigation Systems of Oman",
    "url": "https://whc.unesco.org/en/list/1207/",
    "reviewedOn": "2026-11-13"
  },
  "chanchan": {
    "label": "UNESCO · Chan Chan Archaeological Zone",
    "url": "https://whc.unesco.org/en/list/366/",
    "reviewedOn": "2026-11-13"
  },
  "hattusha": {
    "label": "UNESCO · Hattusha, the Hittite Capital",
    "url": "https://whc.unesco.org/en/list/377/",
    "reviewedOn": "2026-11-13"
  },
  "mesa": {
    "label": "US National Park Service · Mesa Verde",
    "url": "https://www.nps.gov/articles/mesaverde.htm",
    "reviewedOn": "2026-11-13"
  },
  "jantar": {
    "label": "UNESCO · The Jantar Mantar, Jaipur",
    "url": "https://whc.unesco.org/en/list/1338/",
    "reviewedOn": "2026-11-13"
  },
  "battery": {
    "label": "Smithsonian National Museum of American History · Voltaic pile",
    "url": "https://americanhistory.si.edu/collections/object/nmah_703289",
    "reviewedOn": "2026-11-13"
  },
  "phonograph": {
    "label": "Smithsonian National Museum of American History · Edison tinfoil phonograph",
    "url": "https://americanhistory.si.edu/collections/object/nmah_855475",
    "reviewedOn": "2026-11-13"
  },
  "tubemail": {
    "label": "Smithsonian National Postal Museum · Pneumatic tube mail",
    "url": "https://postalmuseum.si.edu/exhibition/customers-and-communities-serving-the-cities-city-free-delivery/pneumatic-tube-mail",
    "reviewedOn": "2026-11-13"
  },
  "newcomen": {
    "label": "Science Museum Group · Newcomen atmospheric engine",
    "url": "https://collection.sciencemuseumgroup.org.uk/objects/co50900/newcomen-atmospheric-engine",
    "reviewedOn": "2026-11-13"
  },
  "typewriter": {
    "label": "Smithsonian National Museum of American History · Sholes & Glidden Type Writer",
    "url": "https://americanhistory.si.edu/ne/collections/object/nmah_850542",
    "reviewedOn": "2026-11-13"
  },
  "geyser": {
    "label": "US National Park Service · How geysers work",
    "url": "https://www.nps.gov/features/yell/tours/fountainpaint/geyser_works.htm",
    "reviewedOn": "2026-11-13"
  },
  "magnetic": {
    "label": "US Geological Survey · Magnetic striping and polar reversals",
    "url": "https://pubs.usgs.gov/gip/dynamic/developing.html",
    "reviewedOn": "2026-11-13"
  },
  "cave": {
    "label": "US National Park Service · Cave speleothems",
    "url": "https://www.nps.gov/subjects/caves/speleothems.htm",
    "reviewedOn": "2026-11-13"
  },
  "fulgurite": {
    "label": "US National Park Service · Fulgurites, the power of lightning",
    "url": "https://www.nps.gov/articles/grsa-fulgurites.htm",
    "reviewedOn": "2026-11-13"
  },
  "pillow": {
    "label": "US Geological Survey · Pillow lava",
    "url": "https://www.usgs.gov/observatories/calvo/news/dont-try-have-a-pillow-fight-these-pillows",
    "reviewedOn": "2026-11-13"
  }
} as const;
type Draft = Omit<Fact,'source'|'url'|'collection'> & {sourceKey:keyof typeof worldWonderSources;why:string;related:[string,string]};
const drafts:Draft[] = [
  {
    "id": "nautilus-room",
    "question": "Does a nautilus live inside every room of its shell?",
    "title": "The animal occupies the largest shell chamber.",
    "text": "The smaller sealed compartments serve a different role from its living space.",
    "explore": "Sketch one occupied room alongside compartments with another purpose.",
    "why": "A repeated structure need not repeat the same function. Looking inside the shell reveals a division of labor hidden by its outside shape.",
    "category": "Nature",
    "sourceKey": "nautilus",
    "related": [
      "nautilus-ballast",
      "octopus-hearts"
    ]
  },
  {
    "id": "cuttle-bone",
    "question": "Does a cuttlefish hide a shell inside its body?",
    "title": "The cuttlebone is a gas-containing internal shell.",
    "text": "It helps control buoyancy rather than acting as a fish skeleton.",
    "explore": "Separate support and buoyancy jobs in a sketch of an aquatic animal.",
    "why": "A familiar name can obscure an unfamiliar structure. Asking what a part does gives a better explanation than relying on what it is called.",
    "category": "Nature",
    "sourceKey": "cuttlefish",
    "related": [
      "cuttle-two-displays",
      "octopus-hearts"
    ]
  },
  {
    "id": "pangolin-scales",
    "question": "What connects a pangolin’s armor with your fingernails?",
    "title": "Its overlapping scales are made of keratin.",
    "text": "These protective scales cover most of the body but leave areas such as the belly uncovered.",
    "explore": "Compare overlapping pieces with one continuous rigid shell.",
    "why": "Material and arrangement work together. A familiar substance can have a very different job when it is shaped and placed in a different way.",
    "category": "Nature",
    "sourceKey": "pangolin",
    "related": [
      "pangolin-grinding",
      "octopus-hearts"
    ]
  },
  {
    "id": "otter-fur",
    "question": "How does a sea otter stay warm without a thick blubber layer?",
    "title": "It relies on an exceptionally dense, insulating coat.",
    "text": "Its fur supplies protection in cold water rather than a thick layer of blubber.",
    "explore": "Compare two different ways to insulate the same warm object.",
    "why": "Similar challenges can be met with different structures. This comparison is a reminder to look for the working principle before assuming every animal uses the same solution.",
    "category": "Nature",
    "sourceKey": "otter",
    "related": [
      "otter-pockets",
      "octopus-hearts"
    ]
  },
  {
    "id": "echidna-egg",
    "question": "Which spiny mammal hatches from an egg?",
    "title": "An echidna is an egg-laying mammal.",
    "text": "The young hatch from an egg kept in the mother’s belly pouch.",
    "explore": "Build a classification rule that allows more than one reproductive pattern.",
    "why": "A category can include surprising variation. One unusual example encourages us to distinguish the defining features of a group from its most familiar members.",
    "category": "Nature",
    "sourceKey": "echidna",
    "related": [
      "echidna-milk",
      "octopus-hearts"
    ]
  },
  {
    "id": "sloth-hair-direction",
    "question": "Why does a sloth’s coat part along its belly?",
    "title": "Its hair grows toward its back to suit hanging upside down.",
    "text": "That orientation helps rain run off its body.",
    "explore": "Rotate a drawing of a roof and reconsider the direction water should travel.",
    "why": "The best arrangement depends on orientation. A feature that looks backward from our viewpoint can make sense in the animal’s normal position.",
    "category": "Nature",
    "sourceKey": "sloth",
    "related": [
      "sloth-algae",
      "octopus-hearts"
    ]
  },
  {
    "id": "archer-water-shot",
    "question": "How can a fish catch an insect above the water?",
    "title": "An archerfish shoots a jet of water at its target.",
    "text": "The impact can knock a morsel down where the fish can reach it.",
    "explore": "Draw the path of a tool that crosses a boundary before the hunter does.",
    "why": "A creature need not reach a target with its own body. The action invites us to separate the place of control from the place where force is applied.",
    "category": "Nature",
    "sourceKey": "archer",
    "related": [
      "archer-refraction",
      "octopus-hearts"
    ]
  },
  {
    "id": "cucumber-breathing",
    "question": "Can an animal move breathing water through its rear end?",
    "title": "This sea cucumber takes water through its anus into respiratory trees.",
    "text": "The branching organs absorb oxygen from the water.",
    "explore": "Trace a flow route without assuming its entrance must be near the head.",
    "why": "Our familiar body plan is only one possibility. Following the actual route of water offers a clearer explanation than relying on an analogy with our own lungs.",
    "category": "Nature",
    "sourceKey": "cucumber",
    "related": [
      "cucumber-sand-sifter",
      "octopus-hearts"
    ]
  },
  {
    "id": "bower-not-nest",
    "question": "Is a satin bowerbird’s decorated bower its nest?",
    "title": "The bower is a courtship display structure.",
    "text": "The female builds a separate nest in a tree or bush.",
    "explore": "Compare a performance space with a nursery.",
    "why": "A structure’s purpose cannot always be read from its appearance. Distinguishing display from shelter changes how we interpret the builder’s work.",
    "category": "Nature",
    "sourceKey": "bower",
    "related": [
      "bower-blue",
      "octopus-hearts"
    ]
  },
  {
    "id": "trapant-spring",
    "question": "How can tiny ant jaws move faster than direct muscle action allows?",
    "title": "Myrmoteras ants load elastic energy before releasing their jaws.",
    "text": "A latch, spring-like structure, and trigger separate loading from the strike.",
    "explore": "Compare slowly charging a mechanism with rapidly releasing it.",
    "why": "The speed of an action need not match the speed at which its energy was stored. This distinction helps make a spectacular movement understandable.",
    "category": "Patterns & invention",
    "sourceKey": "trapant",
    "related": [
      "trapant-angle",
      "mobius-strip"
    ]
  },
  {
    "id": "aflaj-time-share",
    "question": "How can a sundial help share irrigation water?",
    "title": "Aflaj communities allocate water through time shares.",
    "text": "A community sundial helps monitor access, and sluices direct water to farms.",
    "explore": "Allocate a limited flow by time rather than by separate containers.",
    "why": "Infrastructure needs rules as well as channels. The way people divide access is part of understanding how the engineering serves a community.",
    "category": "Ancient ingenuity",
    "sourceKey": "aflaj",
    "related": [
      "aflaj-crossing",
      "gobekli-builders"
    ]
  },
  {
    "id": "chanchan-earth",
    "question": "Can a monumental city be built mainly from earth?",
    "title": "Chan Chan is a vast example of earthen urban architecture.",
    "text": "High, thick walls enclosed its major rectangular complexes.",
    "explore": "Compare a building material’s availability with the demands of its setting.",
    "why": "Monumental architecture does not require one particular material. A city’s construction makes more sense when viewed alongside its local resources and environment.",
    "category": "Ancient ingenuity",
    "sourceKey": "chanchan",
    "related": [
      "chanchan-friezes",
      "gobekli-builders"
    ]
  },
  {
    "id": "hattusha-eight-km",
    "question": "How extensive were Hattusha’s city defenses?",
    "title": "A monumental enclosure wall stretched for more than eight kilometers.",
    "text": "Internal walls also divided parts of the city.",
    "explore": "Compare an outer boundary with boundaries inside it.",
    "why": "A large enclosure can contain several distinct spaces. Understanding both levels helps explain how a city was organized rather than treating it as one uniform area.",
    "category": "Ancient ingenuity",
    "sourceKey": "hattusha",
    "related": [
      "hattusha-tunnel",
      "gobekli-builders"
    ]
  },
  {
    "id": "mesa-fit-space",
    "question": "Did cliff-dwelling builders start with an empty rectangular site?",
    "title": "Ancestral Pueblo builders fitted dwellings into natural alcoves.",
    "text": "Sandstone blocks and mud mortar formed the walls within the available space.",
    "explore": "Design a room around an irregular existing boundary.",
    "why": "A constraint can become the starting point of a design. Understanding the available space helps give the builders’ choices their proper context.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-storage",
      "gobekli-builders"
    ]
  },
  {
    "id": "jantar-naked-eye",
    "question": "Must an observatory be filled with telescopes?",
    "title": "Jaipur’s Jantar Mantar was designed for naked-eye positional astronomy.",
    "text": "Its monumental fixed instruments turn geometry into a measuring tool.",
    "explore": "Imagine measuring a sky position with a carefully aligned structure.",
    "why": "An instrument need not resemble a modern laboratory device. Recognizing the measurement task can reveal the scientific purpose of a remarkable piece of architecture.",
    "category": "Ancient ingenuity",
    "sourceKey": "jantar",
    "related": [
      "jantar-masonry",
      "gobekli-builders"
    ]
  },
  {
    "id": "volta-steady",
    "question": "What changed when electricity became available as a steady current?",
    "title": "Volta announced a current-producing battery in 1800.",
    "text": "Earlier electrical work often relied on brief static discharges.",
    "explore": "Compare a brief pulse with a sustained supply for an experiment.",
    "why": "A new kind of supply can change which questions are practical to investigate. The innovation affected experiments as well as the device itself.",
    "category": "Inventions",
    "sourceKey": "battery",
    "related": [
      "volta-wet-cloth",
      "web-scientists"
    ]
  },
  {
    "id": "phonograph-foil",
    "question": "What carried the sound on Edison’s early phonograph?",
    "title": "A stylus indented tinfoil wrapped around a rotating drum.",
    "text": "The moving surface held a physical pattern of the recording.",
    "explore": "Translate a changing signal into marks along a moving strip.",
    "why": "Information can be stored as a physical trace. This makes recording easier to picture as a sequence of transformations rather than an invisible act.",
    "category": "Inventions",
    "sourceKey": "phonograph",
    "related": [
      "phonograph-diaphragm",
      "web-scientists"
    ]
  },
  {
    "id": "mail-under-streets",
    "question": "Did city mail ever travel through underground air tubes?",
    "title": "Pneumatic networks carried letters below streets.",
    "text": "Several American cities used the systems from the 1890s onward.",
    "explore": "Draw a second transport network beneath a busy street map.",
    "why": "A familiar service may once have used an unfamiliar route. Looking below the street adds another layer to the history of urban infrastructure.",
    "category": "Inventions",
    "sourceKey": "tubemail",
    "related": [
      "mail-canister",
      "web-scientists"
    ]
  },
  {
    "id": "newcomen-air-push",
    "question": "What actually pushed a Newcomen engine’s piston downward?",
    "title": "Atmospheric pressure supplied the downward force.",
    "text": "Condensing steam inside the cylinder created a partial vacuum.",
    "explore": "Label the outside air as an active part of the mechanism.",
    "why": "An empty-looking space can change the forces around it. The engine becomes clearer when we consider both sides of the piston rather than only the steam supply.",
    "category": "Inventions",
    "sourceKey": "newcomen",
    "related": [
      "newcomen-mine-pump",
      "web-scientists"
    ]
  },
  {
    "id": "typewriter-capitals",
    "question": "Could an early commercial typewriter type lowercase letters?",
    "title": "The first Remington-made model typed capitals only.",
    "text": "A later model introduced both upper- and lowercase writing.",
    "explore": "Compare a communication task with the character set available to it.",
    "why": "A familiar interface may have begun with narrower capabilities. Its limitations help us see which features later users came to take for granted.",
    "category": "Inventions",
    "sourceKey": "typewriter",
    "related": [
      "typewriter-treadle",
      "web-scientists"
    ]
  },
  {
    "id": "geyser-three-needs",
    "question": "Why doesn’t every hot spring erupt as a geyser?",
    "title": "A geyser needs heat, water, and suitable underground plumbing.",
    "text": "Constrictions help distinguish an erupting geyser system from an open hot spring.",
    "explore": "Draw three necessary parts rather than looking for one magic ingredient.",
    "why": "A striking result can depend on several conditions working together. Identifying the combination is more useful than attributing the behavior to heat alone.",
    "category": "Earth & Weather",
    "sourceKey": "geyser",
    "related": [
      "geyser-rainwater",
      "cloud-visible"
    ]
  },
  {
    "id": "rock-magnetic-memory",
    "question": "Can a cooled volcanic rock retain a magnetic memory?",
    "title": "Magnetite grains can preserve the field orientation present during cooling.",
    "text": "Their alignment becomes locked into the solidifying rock.",
    "explore": "Treat a rock sample as a record of an earlier condition.",
    "why": "A material can preserve information without anyone intending to write it. Recognizing that record turns an ordinary sample into evidence about the past.",
    "category": "Earth & Weather",
    "sourceKey": "magnetic",
    "related": [
      "seafloor-zebra",
      "cloud-visible"
    ]
  },
  {
    "id": "cave-soda-straw",
    "question": "Can a cave formation start as a tiny hollow straw?",
    "title": "A soda-straw stalactite grows around a dripping water route.",
    "text": "Mineral deposits accumulate around the edge of the drop.",
    "explore": "Sketch a ring becoming a tube through repeated small additions.",
    "why": "Large structures can begin with a simple repeated process. Looking at the earliest stage can explain a shape that seems complicated when fully grown.",
    "category": "Earth & Weather",
    "sourceKey": "cave",
    "related": [
      "cave-floor-mound",
      "cloud-visible"
    ]
  },
  {
    "id": "lightning-glass",
    "question": "Can a lightning strike leave glass inside sand?",
    "title": "Its heat can melt sand into a fulgurite.",
    "text": "At Great Sand Dunes, these traces can appear as dark glass tubes.",
    "explore": "Trace the change from loose grains to a fused material on paper.",
    "why": "A brief event can leave a lasting material record. The resulting object connects an intense process with something people can examine afterward.",
    "category": "Earth & Weather",
    "sourceKey": "fulgurite",
    "related": [
      "fulgurite-hollow",
      "cloud-visible"
    ]
  },
  {
    "id": "lava-pillows",
    "question": "How can lava form a pile of rounded pillows?",
    "title": "Water rapidly chills the outside of a lava lobe.",
    "text": "The molten interior can continue feeding and inflating the form.",
    "explore": "Compare the cooling rate at a surface with the conditions inside it.",
    "why": "A material can be solid outside while remaining mobile within. Distinguishing those regions helps explain the growth of an unusual shape.",
    "category": "Earth & Weather",
    "sourceKey": "pillow",
    "related": [
      "lava-glass-skin",
      "cloud-visible"
    ]
  },
  {
    "id": "nautilus-ballast",
    "question": "How can a shell help an animal adjust its buoyancy?",
    "title": "A tissue canal links the nautilus’s internal chambers.",
    "text": "The siphuncle helps regulate chamber fluid and the animal’s overall buoyancy.",
    "explore": "Compare a rigid shell with a submarine’s ballast arrangement.",
    "why": "Control can happen inside an apparently fixed structure. It is a useful invitation to distinguish an outer shape from the system operating within it.",
    "category": "Nature",
    "sourceKey": "nautilus",
    "related": [
      "nautilus-jet",
      "octopus-taste"
    ]
  },
  {
    "id": "cuttle-two-displays",
    "question": "Can a cuttlefish display two messages at once?",
    "title": "It can show different displays on opposite sides of its body.",
    "text": "A common cuttlefish can court a mate on one side while signaling to a rival on the other.",
    "explore": "Imagine a display viewed by two different audiences.",
    "why": "A signal depends on who can see it. This living example makes audience and viewpoint part of the explanation, rather than treating a display as one uniform message.",
    "category": "Nature",
    "sourceKey": "cuttlefish",
    "related": [
      "cuttle-sepia",
      "octopus-taste"
    ]
  },
  {
    "id": "pangolin-grinding",
    "question": "How does a toothless pangolin break down its insect meals?",
    "title": "Its muscular stomach helps grind swallowed insects.",
    "text": "Sand and small stones taken in with the food assist the process.",
    "explore": "Move the grinding stage to a different part of a system diagram.",
    "why": "The absence of one familiar tool does not mean the task disappears. Following the whole process reveals where the work is actually being done.",
    "category": "Nature",
    "sourceKey": "pangolin",
    "related": [
      "pangolin-tail",
      "octopus-taste"
    ]
  },
  {
    "id": "otter-pockets",
    "question": "Can an animal have built-in food pockets?",
    "title": "Sea otters stash prey in loose skin under their forearms.",
    "text": "The folds let them gather food while keeping their paws available.",
    "explore": "Sketch storage that frees the working parts of a system.",
    "why": "Storage can change what a worker is able to do next. Even a small space becomes interesting when it allows several tasks to be coordinated.",
    "category": "Nature",
    "sourceKey": "otter",
    "related": [
      "otter-rock-tools",
      "octopus-taste"
    ]
  },
  {
    "id": "echidna-milk",
    "question": "How does a baby echidna drink milk without a nipple?",
    "title": "Milk is secreted from specialized glands in the pouch.",
    "text": "The young echidna laps it up rather than nursing from a nipple.",
    "explore": "Compare delivery through an opening with delivery across a surface.",
    "why": "A shared function can use a different interface. This example broadens the way we picture a process that often seems familiar and uniform.",
    "category": "Nature",
    "sourceKey": "echidna",
    "related": [
      "echidna-comb",
      "octopus-taste"
    ]
  },
  {
    "id": "sloth-algae",
    "question": "Why can a sloth’s fur look greenish?",
    "title": "Algae can grow in grooves in the fur.",
    "text": "The tint can become especially noticeable during the wet season.",
    "explore": "Look at a surface as a possible habitat for something smaller.",
    "why": "An animal’s outer surface can host another living world. Looking at a different scale reveals relationships that are easy to overlook.",
    "category": "Nature",
    "sourceKey": "sloth",
    "related": [
      "sloth-toes",
      "octopus-taste"
    ]
  },
  {
    "id": "archer-refraction",
    "question": "What optical complication faces an underwater hunter aiming into air?",
    "title": "Light bends at the air–water boundary.",
    "text": "Archerfish learn to compensate for the resulting distortion when targeting prey.",
    "explore": "Compare a target’s apparent position from above and below a water surface.",
    "why": "A measurement can be changed by the medium between observer and target. Accounting for that boundary is part of understanding the task.",
    "category": "Nature",
    "sourceKey": "archer",
    "related": [
      "archer-eyes",
      "octopus-taste"
    ]
  },
  {
    "id": "cucumber-sand-sifter",
    "question": "Why does a sea cucumber take sand into its mouth?",
    "title": "It sifts food particles from seafloor material.",
    "text": "The sand is expelled while suitable food is retained.",
    "explore": "Draw a sorting process with separate retained and discarded outputs.",
    "why": "Feeding may be a separation problem. The useful material can arrive mixed with a much larger amount of something the animal does not keep.",
    "category": "Nature",
    "sourceKey": "cucumber",
    "related": [
      "cucumber-sacrifice",
      "octopus-taste"
    ]
  },
  {
    "id": "bower-blue",
    "question": "Why might a bird collect blue bottle tops?",
    "title": "Male satin bowerbirds decorate their bowers with blue objects.",
    "text": "Natural decorations include blue feathers and flowers; human-made objects can join the display.",
    "explore": "Imagine a palette assembled from found objects instead of paint.",
    "why": "A visual display can be composed by selecting and arranging existing material. The source of an object and its role in a composition are different questions.",
    "category": "Nature",
    "sourceKey": "bower",
    "related": [
      "bower-paint",
      "octopus-taste"
    ]
  },
  {
    "id": "trapant-angle",
    "question": "How far back can Myrmoteras ants hold their jaws ready?",
    "title": "Their slender mandibles can open to about 280 degrees.",
    "text": "The latched position prepares the stored-energy strike.",
    "explore": "Draw an angle larger than a straight line around a joint.",
    "why": "Range of motion can be surprising when we assume every joint behaves like our own. A measured angle makes that difference concrete.",
    "category": "Patterns & invention",
    "sourceKey": "trapant",
    "related": [
      "trapant-camera",
      "infinite-primes"
    ]
  },
  {
    "id": "aflaj-crossing",
    "question": "How did aflaj builders carry water across difficult ground?",
    "title": "Aqueducts and siphons helped transfer water across wadi beds.",
    "text": "Careful routing kept the water moving through a challenging landscape.",
    "explore": "Draw two different ways for a water route to cross a dip.",
    "why": "A route is a sequence of local problems. Seeing how one difficult crossing is solved helps explain the operation of the larger network.",
    "category": "Ancient ingenuity",
    "sourceKey": "aflaj",
    "related": [
      "aflaj-maintenance",
      "gobekli-symbols"
    ]
  },
  {
    "id": "chanchan-friezes",
    "question": "What pictures appear on Chan Chan’s earthen walls?",
    "title": "Friezes include abstract patterns and human and animal subjects.",
    "text": "The wall surfaces served as decorated spaces as well as enclosure boundaries.",
    "explore": "Give a structural wall a second role as a visual surface.",
    "why": "A practical structure can carry cultural expression at the same time. Separating those jobs too sharply can hide part of what the builders accomplished.",
    "category": "Ancient ingenuity",
    "sourceKey": "chanchan",
    "related": [
      "chanchan-canal",
      "gobekli-symbols"
    ]
  },
  {
    "id": "hattusha-tunnel",
    "question": "What runs beneath Hattusha’s elevated Sphinx Gate?",
    "title": "An arched stone tunnel passes under its artificial bastion.",
    "text": "Staircases led to the gateway above the built-up slopes.",
    "explore": "Draw routes above and below the same structure.",
    "why": "A single place can organize movement on several levels. A cross-section often reveals relationships that a flat map leaves out.",
    "category": "Ancient ingenuity",
    "sourceKey": "hattusha",
    "related": [
      "hattusha-rock-chambers",
      "gobekli-symbols"
    ]
  },
  {
    "id": "mesa-storage",
    "question": "Were all rooms in a cliff dwelling used as living rooms?",
    "title": "Smaller rear and upper rooms were likely used for storage.",
    "text": "Different spaces served different purposes within the compact settlements.",
    "explore": "Give several rooms distinct functions rather than assuming every room is alike.",
    "why": "A plan becomes more informative when we ask what each space was for. Small differences in location can suggest how a settlement’s everyday tasks were arranged.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-kivas",
      "gobekli-symbols"
    ]
  },
  {
    "id": "jantar-masonry",
    "question": "Can a scientific instrument be made like a building?",
    "title": "Many Jantar Mantar instruments are monumental masonry structures.",
    "text": "Their dimensions and alignment are central to their observational role.",
    "explore": "Compare a hand-held instrument with a fixed structure serving a similar purpose.",
    "why": "Changing an instrument’s scale changes how it is built and used. The connection between architecture and measurement becomes visible in the same object.",
    "category": "Ancient ingenuity",
    "sourceKey": "jantar",
    "related": [
      "jantar-cultural-meeting",
      "gobekli-symbols"
    ]
  },
  {
    "id": "volta-wet-cloth",
    "question": "What humble material separated the metals in a voltaic pile?",
    "title": "Cloth soaked in salt water sat between metal pairs.",
    "text": "The pile combined zinc and copper discs with the wet separators.",
    "explore": "Sketch a repeated stack and label the role of each layer.",
    "why": "A working device may depend on an easily overlooked separator. Looking at every layer gives a better explanation than focusing only on its most prominent materials.",
    "category": "Inventions",
    "sourceKey": "battery",
    "related": [
      "volta-closed-circuit",
      "web-editor"
    ]
  },
  {
    "id": "phonograph-diaphragm",
    "question": "How did a voice move the phonograph’s recording stylus?",
    "title": "Sound waves vibrated a diaphragm linked to the stylus.",
    "text": "Its motion produced the indentations on the foil.",
    "explore": "Connect sound, motion, and a mark with three arrows.",
    "why": "A transducer connects one kind of signal with another. Following those steps helps explain how a mechanical device could capture something as fleeting as a voice.",
    "category": "Inventions",
    "sourceKey": "phonograph",
    "related": [
      "phonograph-playback",
      "web-editor"
    ]
  },
  {
    "id": "mail-canister",
    "question": "Were letters sent loose through pneumatic mail tubes?",
    "title": "They traveled inside canisters that could hold hundreds of letters.",
    "text": "Some containers held up to 600 letters.",
    "explore": "Compare moving many small items separately with grouping them in a carrier.",
    "why": "A container can become an interface between cargo and transport. Grouping changes how a system handles objects without changing the objects themselves.",
    "category": "Inventions",
    "sourceKey": "tubemail",
    "related": [
      "mail-air-power",
      "web-editor"
    ]
  },
  {
    "id": "newcomen-mine-pump",
    "question": "What urgent problem helped drive early steam-engine use?",
    "title": "Newcomen engines lifted pump rods to drain mines.",
    "text": "The rocking beam transferred piston motion to the pumping system.",
    "explore": "Separate the power-producing part from the job it performs.",
    "why": "A major technology can begin with a specific practical need. Connecting the mechanism to its task gives the invention a human and industrial context.",
    "category": "Inventions",
    "sourceKey": "newcomen",
    "related": [
      "newcomen-beam-material",
      "web-editor"
    ]
  },
  {
    "id": "typewriter-treadle",
    "question": "What did an early typewriter borrow from a sewing-machine setup?",
    "title": "It came on a sewing-machine stand with a foot treadle.",
    "text": "The treadle operated carriage return and advanced the paper.",
    "explore": "Assign different parts of a task to hands and feet.",
    "why": "An interface can distribute work across different movements. The historical arrangement reminds us that today’s keyboard layout is not the only way a writing machine can be operated.",
    "category": "Inventions",
    "sourceKey": "typewriter",
    "related": [
      "typewriter-flowers",
      "web-editor"
    ]
  },
  {
    "id": "geyser-rainwater",
    "question": "Where does a geyser’s water begin its underground journey?",
    "title": "Rain and snow can seep through fractures in the rock.",
    "text": "The water is heated underground before returning toward the surface.",
    "explore": "Connect a surface water source with a hidden circulation route.",
    "why": "A dramatic event can begin with ordinary water entering an unseen path. Following the whole cycle links the visible eruption with the surrounding landscape.",
    "category": "Earth & Weather",
    "sourceKey": "geyser",
    "related": [
      "geyser-silica",
      "cloud-mass"
    ]
  },
  {
    "id": "seafloor-zebra",
    "question": "Are the ocean floor’s magnetic variations random patches?",
    "title": "Mapping revealed alternating magnetic bands beside mid-ocean ridges.",
    "text": "Normal and reversed polarity form a zebra-like pattern.",
    "explore": "Compare a random map with repeated bands on both sides of a line.",
    "why": "Spatial patterns can help distinguish an explanation from a coincidence. A map may reveal a relationship that an isolated measurement cannot.",
    "category": "Earth & Weather",
    "sourceKey": "magnetic",
    "related": [
      "rock-reversed",
      "cloud-mass"
    ]
  },
  {
    "id": "cave-floor-mound",
    "question": "Why are stalagmites often broader than the points above them?",
    "title": "Falling drops splash and deposit material across the floor.",
    "text": "The mound grows upward rather than as a hollow hanging tube.",
    "explore": "Compare depositing material from a hanging drop with depositing it after impact.",
    "why": "The same material can produce different shapes through a different delivery process. Where and how a drop arrives both matter.",
    "category": "Earth & Weather",
    "sourceKey": "cave",
    "related": [
      "cave-column",
      "cloud-mass"
    ]
  },
  {
    "id": "fulgurite-hollow",
    "question": "Why can a lightning-made glass tube have an empty center?",
    "title": "The strike can vaporize material along its central path.",
    "text": "Surrounding sand melts and remains as glass around that route.",
    "explore": "Compare the most intensely heated center with the surrounding material.",
    "why": "One event can affect nearby regions differently. A cross-section reveals information that the outside of the object does not show.",
    "category": "Earth & Weather",
    "sourceKey": "fulgurite",
    "related": [
      "fulgurite-latin",
      "cloud-mass"
    ]
  },
  {
    "id": "lava-glass-skin",
    "question": "What gives some lava pillows a glassy outer skin?",
    "title": "Rapid cooling in water can produce volcanic glass at the surface.",
    "text": "The chilled shell also insulates the hot material within.",
    "explore": "Sketch a boundary that both forms quickly and slows later heat loss.",
    "why": "A surface can record how it formed and influence what happens next. The boundary is an active part of the process, not merely an outline.",
    "category": "Earth & Weather",
    "sourceKey": "pillow",
    "related": [
      "lava-inland-water",
      "cloud-mass"
    ]
  },
  {
    "id": "nautilus-jet",
    "question": "How does a nautilus move without flapping fins?",
    "title": "It propels itself by expelling water.",
    "text": "The water jet can push the nautilus backward and help it turn.",
    "explore": "Draw arrows for the water’s direction and the animal’s movement.",
    "why": "A movement becomes easier to explain when we follow what leaves a system. The same question can help us reason about many propulsion designs.",
    "category": "Nature",
    "sourceKey": "nautilus",
    "related": [
      "nautilus-spiral",
      "octopus-colors"
    ]
  },
  {
    "id": "cuttle-sepia",
    "question": "What connects cuttlefish with old brown drawings?",
    "title": "Their dark-brown ink supplied the pigment called sepia.",
    "text": "Common-cuttlefish ink was historically used for writing and drawing.",
    "explore": "Follow one material from an animal into an artist’s toolkit.",
    "why": "Art materials have biological as well as mineral histories. Tracing an ingredient can connect the study of living things with the making of cultural objects.",
    "category": "Nature",
    "sourceKey": "cuttlefish",
    "related": [
      "cuttle-eggs",
      "octopus-colors"
    ]
  },
  {
    "id": "pangolin-tail",
    "question": "Can a tree pangolin use its tail as a grip?",
    "title": "Its prehensile tail helps it hold branches.",
    "text": "The bare patch at the tail tip provides extra purchase.",
    "explore": "Draw a climbing support that can wrap around its anchor.",
    "why": "A supporting part can also be an active contact surface. The detail invites us to notice how shape and surface texture contribute to the same task.",
    "category": "Nature",
    "sourceKey": "pangolin",
    "related": [
      "pangolin-seal",
      "octopus-colors"
    ]
  },
  {
    "id": "otter-rock-tools",
    "question": "What tool might a sea otter bring to a shellfish meal?",
    "title": "It may use a rock to crack hard-shelled prey.",
    "text": "An otter floating on its back can use its chest as a working surface.",
    "explore": "Separate tool, workpiece, and support in a simple diagram.",
    "why": "Tool use involves an arrangement, not just an object. Noticing the supporting surface makes the action easier to understand.",
    "category": "Nature",
    "sourceKey": "otter",
    "related": [
      "otter-surface-table",
      "octopus-colors"
    ]
  },
  {
    "id": "echidna-comb",
    "question": "What grooming tool does an echidna carry on its back foot?",
    "title": "An elongated hind claw helps clean between its spines.",
    "text": "Its backward-pointing hind legs make the unusual grooming arrangement possible.",
    "explore": "Sketch a tool that must reach awkward spaces on its own support.",
    "why": "A body part can be understood through the range of places it can reach. Geometry is part of the explanation, not merely a detail of appearance.",
    "category": "Nature",
    "sourceKey": "echidna",
    "related": [
      "echidna-burrow",
      "octopus-colors"
    ]
  },
  {
    "id": "sloth-toes",
    "question": "Does a two-toed sloth have only two toes on every foot?",
    "title": "It has two clawed digits on its front feet and three on its back feet.",
    "text": "The common name describes only part of the arrangement.",
    "explore": "Check whether a short label describes every part of an object.",
    "why": "Names are useful shortcuts, but they can hide qualifications. This is a gentle reminder to inspect the details before extending a label too far.",
    "category": "Nature",
    "sourceKey": "sloth",
    "related": [
      "sloth-swimming",
      "octopus-colors"
    ]
  },
  {
    "id": "archer-eyes",
    "question": "What helps an archerfish judge a target’s distance?",
    "title": "Its large, forward-set eyes support binocular vision.",
    "text": "The overlapping views help with depth perception while aiming.",
    "explore": "Sketch the area where two fields of view overlap.",
    "why": "Two views can supply information that a single view does not. Sensor placement is therefore part of the sensing method.",
    "category": "Nature",
    "sourceKey": "archer",
    "related": [
      "archer-flat-back",
      "octopus-colors"
    ]
  },
  {
    "id": "cucumber-sacrifice",
    "question": "How can a sea cucumber escape at a startling cost?",
    "title": "Johnsons sea cucumbers can shed internal organs to deter predators.",
    "text": "This defensive process is called self-evisceration.",
    "explore": "Compare preserving a whole system with sacrificing one part to escape.",
    "why": "An extreme defense challenges our assumptions about what must always be protected. It invites careful attention to trade-offs rather than a single idea of toughness.",
    "category": "Nature",
    "sourceKey": "cucumber",
    "related": [
      "cucumber-feet",
      "octopus-colors"
    ]
  },
  {
    "id": "bower-paint",
    "question": "Can a bird paint its own display walls?",
    "title": "Satin bowerbirds apply chewed plant material mixed with saliva.",
    "text": "The mixture is used on the walls of the bower.",
    "explore": "Separate making a structure from treating its surface.",
    "why": "Construction includes finishes as well as frames. A small surface treatment can reveal another stage in how an object is made.",
    "category": "Nature",
    "sourceKey": "bower",
    "related": [
      "bower-performance",
      "octopus-colors"
    ]
  },
  {
    "id": "trapant-camera",
    "question": "How did researchers see a jaw strike too fast for ordinary viewing?",
    "title": "They filmed Myrmoteras at 50,000 frames per second.",
    "text": "The images let them measure a strike lasting roughly half a millisecond.",
    "explore": "Compare an event’s duration with the interval between camera frames.",
    "why": "A phenomenon can seem instantaneous because the observation tool is too slow. Changing the measurement scale can reveal a sequence of events.",
    "category": "Patterns & invention",
    "sourceKey": "trapant",
    "related": [
      "trapant-independent",
      "jacquard-patterns"
    ]
  },
  {
    "id": "aflaj-maintenance",
    "question": "How could an irrigation system help pay for its own upkeep?",
    "title": "Some water and land were reserved to support the falaj itself.",
    "text": "The resources raised funds for management and maintenance.",
    "explore": "Add a maintenance budget to a diagram of a working system.",
    "why": "Construction is only the beginning of a system’s life. Planning how to sustain it can be as important as deciding how to build it.",
    "category": "Ancient ingenuity",
    "sourceKey": "aflaj",
    "related": [
      "aflaj-towers",
      "rosetta-scripts"
    ]
  },
  {
    "id": "chanchan-canal",
    "question": "How could a dry coastal region support a large settlement?",
    "title": "An approximately 80-kilometer canal served the Chan Chan region.",
    "text": "Water from the Moche and Chicama rivers supported irrigation.",
    "explore": "Compare the size of a city with the reach of the system supporting it.",
    "why": "The visible settlement is only part of its working landscape. A long supply route can connect a compact place with much wider environmental resources.",
    "category": "Ancient ingenuity",
    "sourceKey": "chanchan",
    "related": [
      "chanchan-workshops",
      "rosetta-scripts"
    ]
  },
  {
    "id": "hattusha-rock-chambers",
    "question": "Where did Hittite artists carve an open-air sanctuary?",
    "title": "Yazılıkaya uses natural bedrock chambers near Hattusha.",
    "text": "Their walls carry reliefs of deities and royal figures.",
    "explore": "Compare building a room with adapting a space already present in rock.",
    "why": "Design can begin with an existing landscape rather than an empty site. The result joins natural form with deliberate cultural choices.",
    "category": "Ancient ingenuity",
    "sourceKey": "hattusha",
    "related": [
      "hattusha-temple-district",
      "rosetta-scripts"
    ]
  },
  {
    "id": "mesa-kivas",
    "question": "What lies below the floor level of many Mesa Verde villages?",
    "title": "Many settlements included underground kivas.",
    "text": "These chambers are thought to have had ceremonial uses.",
    "explore": "Include spaces below ground when sketching a settlement.",
    "why": "What is visible from outside may be only part of a building. Remembering hidden spaces also helps us avoid reducing a place to its most photographed facade.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-late-alcoves",
      "rosetta-scripts"
    ]
  },
  {
    "id": "jantar-cultural-meeting",
    "question": "Was Jantar Mantar an isolated scientific project?",
    "title": "The observatory became a meeting point for different scientific cultures.",
    "text": "Its positional astronomy belonged to a tradition shared across civilizations.",
    "explore": "Draw a knowledge network instead of a single-inventor timeline.",
    "why": "Scientific work often connects people and traditions across places. A monument can make those exchanges visible without reducing them to one simple origin story.",
    "category": "Ancient ingenuity",
    "sourceKey": "jantar",
    "related": [
      "jantar-tables",
      "rosetta-scripts"
    ]
  },
  {
    "id": "volta-closed-circuit",
    "question": "Would an open gap allow a voltaic pile to sustain current around a circuit?",
    "title": "The current requires a closed conducting path.",
    "text": "The pile supplies a potential difference, while the connected circuit provides the route.",
    "explore": "Draw the difference between an energy source and a complete path.",
    "why": "A source and a working system are different things. The connection between parts matters as much as the presence of the individual components.",
    "category": "Inventions",
    "sourceKey": "battery",
    "related": [
      "volta-new-experiments",
      "first-website"
    ]
  },
  {
    "id": "phonograph-playback",
    "question": "How did the same pattern become sound again?",
    "title": "A stylus retraced the recorded indentations.",
    "text": "The resulting diaphragm vibrations recreated sound waves.",
    "explore": "Reverse the arrows in a diagram of the recording process.",
    "why": "A stored pattern becomes useful when a system can interpret it. Recording and playback are connected processes with different directions of transformation.",
    "category": "Inventions",
    "sourceKey": "phonograph",
    "related": [
      "phonograph-before",
      "first-website"
    ]
  },
  {
    "id": "mail-air-power",
    "question": "What pushed pneumatic mail through its tubes?",
    "title": "Compressed air or vacuum suction moved the containers.",
    "text": "Pressure differences supplied the driving force.",
    "explore": "Draw a pressure difference on either side of a capsule.",
    "why": "The route and the power source can be different parts of a design. Following the force explains how motion occurs inside an enclosed network.",
    "category": "Inventions",
    "sourceKey": "tubemail",
    "related": [
      "mail-fixed-route",
      "first-website"
    ]
  },
  {
    "id": "newcomen-beam-material",
    "question": "Were early Newcomen engine beams always cast iron?",
    "title": "Earlier beams used wood with wrought-iron fittings.",
    "text": "The Science Museum’s later example has a cast-iron beam.",
    "explore": "Compare successive material choices for the same structural job.",
    "why": "A technology’s familiar appearance may represent only one stage in its development. Material changes can reveal how a design evolved after its basic principle was established.",
    "category": "Inventions",
    "sourceKey": "newcomen",
    "related": [
      "newcomen-craft-skills",
      "first-website"
    ]
  },
  {
    "id": "typewriter-flowers",
    "question": "Why did some early typewriters resemble decorated sewing machines?",
    "title": "Remington gave them shiny black cases with floral designs.",
    "text": "Their appearance echoed another product the factory already made.",
    "explore": "Compare a machine’s working mechanism with its visual identity.",
    "why": "An object can inherit styling from a different product family. Appearance may tell a manufacturing and marketing story alongside the technical one.",
    "category": "Inventions",
    "sourceKey": "typewriter",
    "related": [
      "typewriter-not-first",
      "first-website"
    ]
  },
  {
    "id": "geyser-silica",
    "question": "Can hot water help shape a geyser’s own plumbing?",
    "title": "It dissolves silica from rock and carries it into cracks.",
    "text": "Deposited silica can line the passages and help form constrictions.",
    "explore": "Imagine a flowing liquid gradually modifying its own route.",
    "why": "A system’s materials can change through its operation. The flow is not simply passing through an unchanging set of pipes.",
    "category": "Earth & Weather",
    "sourceKey": "geyser",
    "related": [
      "geyser-pressure-drop",
      "cloud-nuclei"
    ]
  },
  {
    "id": "rock-reversed",
    "question": "Can a rock’s magnetic direction oppose today’s field?",
    "title": "Some rocks preserve reversed rather than normal polarity.",
    "text": "The difference records changes in Earth’s magnetic field through geological time.",
    "explore": "Separate a compass’s current reading from a rock’s preserved direction.",
    "why": "A present-day reference is not necessarily the condition under which an old object formed. The distinction is essential when interpreting historical evidence.",
    "category": "Earth & Weather",
    "sourceKey": "magnetic",
    "related": [
      "magnetometers-seafloor",
      "cloud-nuclei"
    ]
  },
  {
    "id": "cave-column",
    "question": "How can a cave ceiling and floor become joined by mineral growth?",
    "title": "A stalactite and its feeder stalagmite can meet to form a column.",
    "text": "The joined formation records growth from two directions.",
    "explore": "Draw two gradually growing structures until their boundaries meet.",
    "why": "A continuous-looking object can have a two-part history. Understanding its formation can reveal a connection hidden in its final shape.",
    "category": "Earth & Weather",
    "sourceKey": "cave",
    "related": [
      "cave-degassing",
      "cloud-nuclei"
    ]
  },
  {
    "id": "fulgurite-latin",
    "question": "What does the name fulgurite have to do with a flash in the sky?",
    "title": "It comes from the Latin word fulgur, meaning lightning.",
    "text": "The name points to the event that formed the object.",
    "explore": "Compare names based on shape with names based on origin.",
    "why": "Scientific vocabulary can preserve a clue to a process. Following a word’s origin can offer a second route into understanding a specimen.",
    "category": "Earth & Weather",
    "sourceKey": "fulgurite",
    "related": [
      "fulgurite-roman-phrase",
      "cloud-nuclei"
    ]
  },
  {
    "id": "lava-inland-water",
    "question": "Must pillow lava have formed at the bottom of an ocean?",
    "title": "It can also form when lava enters lakes or rivers.",
    "text": "The USGS describes examples near the former Copco Lake in California.",
    "explore": "Consider several environments that supply the same essential condition.",
    "why": "A characteristic shape can indicate a process without identifying one unique location. Good interpretation separates a necessary condition from an overly specific story.",
    "category": "Earth & Weather",
    "sourceKey": "pillow",
    "related": [
      "lava-new-breakout",
      "cloud-nuclei"
    ]
  },
  {
    "id": "nautilus-spiral",
    "question": "What mathematical shape helps describe a nautilus shell?",
    "title": "Its coiled shell can be described as a logarithmic spiral.",
    "text": "That description does not require calling it a perfect golden spiral.",
    "explore": "Compare a spiral with a circle while thinking about growth.",
    "why": "A mathematical model can illuminate a natural form without making it perfectly exact. The useful connection is a pattern, not a claim that nature obeys an ideal diagram.",
    "category": "Nature",
    "sourceKey": "nautilus",
    "related": [
      "nautilus-room",
      "bee-dance"
    ]
  },
  {
    "id": "cuttle-eggs",
    "question": "Why can cuttlefish eggs resemble dark grapes?",
    "title": "Common cuttlefish coat their eggs in inky jelly.",
    "text": "Females lay clusters of these dark, grape-shaped eggs in shallow water.",
    "explore": "Compare one protective covering with a cluster of covered objects.",
    "why": "A material can serve more than one role across a life cycle. Here the interesting detail lies in how a familiar secretion is used around the next generation.",
    "category": "Nature",
    "sourceKey": "cuttlefish",
    "related": [
      "cuttle-bone",
      "bee-dance"
    ]
  },
  {
    "id": "pangolin-seal",
    "question": "How does a pangolin keep angry ants out of sensitive openings?",
    "title": "It can close its nostrils and ears while feeding.",
    "text": "Thick eyelids also help protect its eyes from the insects.",
    "explore": "Add protective boundaries to a diagram of a feeding system.",
    "why": "A successful feeding method needs defenses as well as access. Thinking about the unwanted things that might enter a system can be as revealing as following its intended input.",
    "category": "Nature",
    "sourceKey": "pangolin",
    "related": [
      "pangolin-scales",
      "bee-dance"
    ]
  },
  {
    "id": "otter-surface-table",
    "question": "Does a sea otter usually eat its catch on the seabed?",
    "title": "It returns to the surface to eat.",
    "text": "Food collected during a dive can be handled while the otter floats on its back.",
    "explore": "Map the collecting location and the processing location separately.",
    "why": "A task can be split across places. Following that sequence helps reveal why collecting, carrying, and processing are different parts of a feeding strategy.",
    "category": "Nature",
    "sourceKey": "otter",
    "related": [
      "otter-fur",
      "bee-dance"
    ]
  },
  {
    "id": "echidna-burrow",
    "question": "Why does a baby echidna eventually leave its mother’s pouch?",
    "title": "Growing spines make pouch life impractical.",
    "text": "The mother transfers the youngster to a burrow and continues returning to feed it.",
    "explore": "Redesign a nursery as its occupant changes size and surface.",
    "why": "A useful arrangement may stop being useful as its user grows. The transition is a small example of how a system must accommodate changing requirements.",
    "category": "Nature",
    "sourceKey": "echidna",
    "related": [
      "echidna-egg",
      "bee-dance"
    ]
  },
  {
    "id": "sloth-swimming",
    "question": "Can a tree-dwelling sloth travel by swimming?",
    "title": "Two-toed sloths can swim between areas of trees.",
    "text": "Flooded forest can provide a route to a different part of their habitat.",
    "explore": "Compare the same landscape when dry and when flooded.",
    "why": "An obstacle can become a route under different conditions. Considering the environment alongside the animal changes the way we understand its movement.",
    "category": "Nature",
    "sourceKey": "sloth",
    "related": [
      "sloth-hair-direction",
      "bee-dance"
    ]
  },
  {
    "id": "archer-flat-back",
    "question": "How can an archerfish remain close to the surface while hunting?",
    "title": "Its flat back and rear-positioned head suit surface swimming.",
    "text": "Dark markings also help conceal it when seen from above.",
    "explore": "View a hunter’s outline from the direction of a possible observer.",
    "why": "A useful shape can depend on both movement and visibility. Changing the viewing angle helps explain features that a side view alone cannot.",
    "category": "Nature",
    "sourceKey": "archer",
    "related": [
      "archer-water-shot",
      "bee-dance"
    ]
  },
  {
    "id": "cucumber-feet",
    "question": "How does a sea cucumber inch across the seabed?",
    "title": "It moves with tube feet and flexing body movements.",
    "text": "These small appendages help carry the long body along the seafloor.",
    "explore": "Sketch many small contact points acting under one long shape.",
    "why": "Movement can be distributed across many tiny parts. The overall motion becomes less mysterious when we identify the repeated points of contact.",
    "category": "Nature",
    "sourceKey": "cucumber",
    "related": [
      "cucumber-breathing",
      "bee-dance"
    ]
  },
  {
    "id": "bower-performance",
    "question": "Is a bowerbird’s courtship display silent architecture?",
    "title": "The male adds strutting, bowing, wing movements, and calls.",
    "text": "Buzzing, rattling, and mimicry accompany the display.",
    "explore": "Describe one space through its sounds and movement as well as its shape.",
    "why": "A built setting can be part of a performance. Looking beyond the static object reveals how several kinds of signal work together.",
    "category": "Nature",
    "sourceKey": "bower",
    "related": [
      "bower-not-nest",
      "bee-dance"
    ]
  },
  {
    "id": "trapant-independent",
    "question": "Did every trap-jaw ant inherit one identical mechanism?",
    "title": "Spring-loaded jaw systems evolved independently in multiple ant groups.",
    "text": "The Myrmoteras arrangement differs from other studied trap-jaw designs.",
    "explore": "Sketch two different mechanisms that accomplish the same task.",
    "why": "A similar result does not prove an identical construction or a single origin. Comparing mechanisms is more informative than comparing only their outcomes.",
    "category": "Patterns & invention",
    "sourceKey": "trapant",
    "related": [
      "trapant-spring",
      "babbage-loom"
    ]
  },
  {
    "id": "aflaj-towers",
    "question": "Why do watchtowers appear beside irrigation works?",
    "title": "They were built to defend vital aflaj water systems.",
    "text": "The towers reflect how strongly communities depended on their water supply.",
    "explore": "Identify the most critical part of a settlement’s shared infrastructure.",
    "why": "A utility can also be a strategic resource. The structures built to protect it reveal how much of everyday life depends on its continued operation.",
    "category": "Ancient ingenuity",
    "sourceKey": "aflaj",
    "related": [
      "aflaj-time-share",
      "stonehenge-transport"
    ]
  },
  {
    "id": "chanchan-workshops",
    "question": "Was Chan Chan only a collection of palaces?",
    "title": "Its remains include production sectors for weaving, woodwork, and metalwork.",
    "text": "Water management and agricultural areas also belonged to the larger urban system.",
    "explore": "Add places of production to a map of ceremonial buildings.",
    "why": "A city is sustained by work that may be less visually prominent than its monuments. Following production gives a fuller picture of how an urban place functioned.",
    "category": "Ancient ingenuity",
    "sourceKey": "chanchan",
    "related": [
      "chanchan-earth",
      "stonehenge-transport"
    ]
  },
  {
    "id": "hattusha-temple-district",
    "question": "Could an ancient city have a concentrated temple district?",
    "title": "Much of Hattusha’s Upper City consisted of temples.",
    "text": "A particularly well-preserved Great Temple stands in the Lower City.",
    "explore": "Mark different concentrations of buildings on a city map.",
    "why": "The distribution of buildings can reveal how a place was used. Location and grouping add information beyond the design of any single monument.",
    "category": "Ancient ingenuity",
    "sourceKey": "hattusha",
    "related": [
      "hattusha-eight-km",
      "stonehenge-transport"
    ]
  },
  {
    "id": "mesa-late-alcoves",
    "question": "Were Mesa Verde’s famous cliff dwellings its first homes?",
    "title": "Most of the famous cliff dwellings date to the late 1100s and 1200s.",
    "text": "Ancestral Pueblo communities had lived in the region much earlier.",
    "explore": "Draw a timeline that separates a place’s settlement from its best-known buildings.",
    "why": "The most recognizable phase is not necessarily the beginning. A longer timeline gives more credit to the history that preceded the surviving monument.",
    "category": "Ancient ingenuity",
    "sourceKey": "mesa",
    "related": [
      "mesa-fit-space",
      "stonehenge-transport"
    ]
  },
  {
    "id": "jantar-tables",
    "question": "What could observations at Jantar Mantar help produce?",
    "title": "They contributed to astronomical tables called Zij.",
    "text": "The tables organized positional information about celestial bodies.",
    "explore": "Turn repeated observations into a structured reference table.",
    "why": "Measurement becomes useful beyond the instant it is made when it can be recorded and organized. The table is part of the scientific toolset alongside the instrument.",
    "category": "Ancient ingenuity",
    "sourceKey": "jantar",
    "related": [
      "jantar-naked-eye",
      "stonehenge-transport"
    ]
  },
  {
    "id": "volta-new-experiments",
    "question": "Why was the early battery important beyond portable power?",
    "title": "Flowing current opened up new electrical experiments.",
    "text": "Researchers could investigate links with magnetism, light, and heat.",
    "explore": "List questions that would be difficult with only a brief spark.",
    "why": "A tool can matter because it expands what people can investigate. Its significance includes the possibilities it creates for later work, not just its immediate output.",
    "category": "Inventions",
    "sourceKey": "battery",
    "related": [
      "volta-steady",
      "web-open"
    ]
  },
  {
    "id": "phonograph-before",
    "question": "Had anyone recorded sound before Edison’s talking machine?",
    "title": "Earlier experimenters had recorded sound visually.",
    "text": "The phonograph added the ability to reproduce recorded sound.",
    "explore": "Compare keeping a visible trace with making the original kind of signal again.",
    "why": "An invention’s contribution can be precise without erasing earlier work. Separating capture from reproduction gives a clearer account of what changed.",
    "category": "Inventions",
    "sourceKey": "phonograph",
    "related": [
      "phonograph-foil",
      "web-open"
    ]
  },
  {
    "id": "mail-fixed-route",
    "question": "Why did underground tube mail become hard to adapt?",
    "title": "Its routes were fixed while post offices and businesses could move.",
    "text": "Changing urban geography made the buried network less practical.",
    "explore": "Compare relocating a destination with relocating the route serving it.",
    "why": "Infrastructure can outlast the pattern of demand it was designed for. Adaptability matters alongside speed when considering the life of a transport system.",
    "category": "Inventions",
    "sourceKey": "tubemail",
    "related": [
      "mail-under-streets",
      "web-open"
    ]
  },
  {
    "id": "newcomen-craft-skills",
    "question": "Did steam-engine construction depend only on new science?",
    "title": "It also relied on carpenters, masons, blacksmiths, and other crafts.",
    "text": "Older practical skills helped turn physical ideas into working engines.",
    "explore": "List the skills needed to build a mechanism, beyond describing its principle.",
    "why": "A working invention joins knowledge with making. Giving credit to the crafts involved produces a fuller picture of engineering than an account centered on theory alone.",
    "category": "Inventions",
    "sourceKey": "newcomen",
    "related": [
      "newcomen-air-push",
      "web-open"
    ]
  },
  {
    "id": "typewriter-not-first",
    "question": "Was the successful Sholes & Glidden machine the first writing-machine idea?",
    "title": "It followed earlier mechanical writing machines.",
    "text": "Its importance includes achieving early commercial success rather than inventing the entire idea from nothing.",
    "explore": "Separate first proposal, working device, and successful adoption on a timeline.",
    "why": "Different milestones deserve different credit. A more careful timeline lets us appreciate a breakthrough without overlooking what came before it.",
    "category": "Inventions",
    "sourceKey": "typewriter",
    "related": [
      "typewriter-capitals",
      "web-open"
    ]
  },
  {
    "id": "geyser-pressure-drop",
    "question": "Why can a pressure drop trigger a burst of steam?",
    "title": "Hot water can flash into steam as pressure falls near the surface.",
    "text": "The expansion helps drive the geyser eruption.",
    "explore": "Compare the behavior of a hot liquid under different surrounding pressures on paper.",
    "why": "Temperature alone does not determine a liquid’s behavior. Considering pressure adds a crucial part of the explanation for the sudden change.",
    "category": "Earth & Weather",
    "sourceKey": "geyser",
    "related": [
      "geyser-three-needs",
      "fog-ground"
    ]
  },
  {
    "id": "magnetometers-seafloor",
    "question": "What helped scientists map an invisible pattern under the ocean?",
    "title": "Magnetometers detected variations across the seafloor.",
    "text": "Instruments adapted from wartime airborne detection contributed to this research.",
    "explore": "Design a map layer that records something a camera cannot see.",
    "why": "Exploration does not depend only on images. A measurement tool can reveal a landscape through properties that ordinary sight does not capture.",
    "category": "Earth & Weather",
    "sourceKey": "magnetic",
    "related": [
      "rock-magnetic-memory",
      "fog-ground"
    ]
  },
  {
    "id": "cave-degassing",
    "question": "How can losing a gas help build a cave decoration?",
    "title": "Carbon dioxide loss can cause dissolved carbonate to precipitate.",
    "text": "The deposited mineral can contribute to calcite cave formations.",
    "explore": "Follow dissolved material through a change in its surrounding conditions.",
    "why": "A solid can appear because the chemistry of a solution changes. Formation is not always a matter of simply drying out all the water.",
    "category": "Earth & Weather",
    "sourceKey": "cave",
    "related": [
      "cave-soda-straw",
      "fog-ground"
    ]
  },
  {
    "id": "fulgurite-roman-phrase",
    "question": "What might a Roman phrase about digging up thunderbolts evoke?",
    "title": "Cicero used the expression condere fulmina.",
    "text": "The National Park Service connects this phrase with ancient recognition of lightning traces in sand.",
    "explore": "Compare a historical description with the modern explanation of the object.",
    "why": "An unfamiliar explanation from the past may refer to something people really observed. Reading it carefully can connect the history of language with material evidence.",
    "category": "Earth & Weather",
    "sourceKey": "fulgurite",
    "related": [
      "lightning-glass",
      "fog-ground"
    ]
  },
  {
    "id": "lava-new-breakout",
    "question": "How does a pillow-lava flow keep advancing after a crust forms?",
    "title": "New lava can break out and repeat the chilling process.",
    "text": "The rounded forms can build into closely packed stacks.",
    "explore": "Draw a sequence of new lobes rather than one expanding outer balloon.",
    "why": "A growing front can advance through repeated local breakouts. Thinking in stages makes the final pile easier to understand.",
    "category": "Earth & Weather",
    "sourceKey": "pillow",
    "related": [
      "lava-pillows",
      "fog-ground"
    ]
  }
];
export const worldWonderFacts=drafts.map(draft=>({...draft,collection:'world-worth-wondering' as const,source:worldWonderSources[draft.sourceKey].label,url:worldWonderSources[draft.sourceKey].url}));
