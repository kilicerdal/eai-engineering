import type { Fact } from './facts';

// V1.7: stable append-only identities. Claims checked against the linked sources.
// Explore and Why it matters are original editorial prompts, not extra historical claims.
export const hiddenConnectionSources = {
  "shushtar": {
    "label": "UNESCO · Shushtar Historical Hydraulic System",
    "url": "https://whc.unesco.org/en/list/1315/",
    "reviewedOn": "2026-11-13"
  },
  "dujiangyan": {
    "label": "UNESCO · Dujiangyan Irrigation System",
    "url": "https://whc.unesco.org/en/list/1001/",
    "reviewedOn": "2026-11-13"
  },
  "inca": {
    "label": "UNESCO · Qhapaq Ñan, Andean Road System",
    "url": "https://whc.unesco.org/en/list/1459/",
    "reviewedOn": "2026-11-13"
  },
  "angkor": {
    "label": "UNESCO · Angkor",
    "url": "https://whc.unesco.org/en/list/668/",
    "reviewedOn": "2026-11-13"
  },
  "zimbabwe": {
    "label": "UNESCO · Great Zimbabwe",
    "url": "https://whc.unesco.org/en/list/364/",
    "reviewedOn": "2026-11-13"
  },
  "borobudur": {
    "label": "UNESCO · Borobudur Temple Compounds",
    "url": "https://whc.unesco.org/en/list/592/",
    "reviewedOn": "2026-11-13"
  },
  "lotus": {
    "label": "European Commission CORDIS · Lotus-effect research",
    "url": "https://cordis.europa.eu/article/id/443091-how-do-lotus-leaves-clean-themselves",
    "reviewedOn": "2026-11-13"
  },
  "birds": {
    "label": "Smithsonian · Bio-inspired design",
    "url": "https://naturalhistory.si.edu/education/teaching-resources/life-science/bio-inspired-design-discover-animal-adaptations-can-change-world",
    "reviewedOn": "2026-11-13"
  },
  "riblet": {
    "label": "Nikon / JAXA research team · Shark-inspired riblet flight tests",
    "url": "https://www.nikon.com/company/news/2023/0303_riblet_01/",
    "reviewedOn": "2026-11-13"
  },
  "whale": {
    "label": "Miklosovic and colleagues · Flipper-model wind-tunnel study, 2004",
    "url": "https://www.wcupa.edu/sciences-mathematics/biology/fFish/documents/2004PF-Megaptera.pdf",
    "reviewedOn": "2026-11-13"
  },
  "pine": {
    "label": "ETH Zurich · Pine-cone-inspired shading prototype",
    "url": "https://ethz.ch/en/news-and-events/eth-news/news/2018/08/from-pin-cones-to-an-adaptive-shading-system.html",
    "reviewedOn": "2026-11-13"
  },
  "termite": {
    "label": "Harvard research team · Termite-mound ventilation, 2015",
    "url": "https://seas.harvard.edu/news/2015/09/how-termites-ventilate",
    "reviewedOn": "2026-11-13"
  },
  "mussel": {
    "label": "MIT research team · Engineered underwater adhesives, 2014",
    "url": "https://news.mit.edu/2014/new-adhesives-stick-in-water-0921",
    "reviewedOn": "2026-11-13"
  },
  "butterfly": {
    "label": "Kolle and colleagues · Mimicking Papilio wing structures, 2010",
    "url": "https://www.np.phy.cam.ac.uk/wp-content/uploads/sites/50/2024/06/naturenanotech10-butterfly-mimic.pdf",
    "reviewedOn": "2026-11-13"
  },
  "aerogel": {
    "label": "NASA JPL · Ideas that Gel",
    "url": "https://www.jpl.nasa.gov/news/ideas-that-gel/",
    "reviewedOn": "2026-11-13"
  },
  "aeroart": {
    "label": "NASA · Comet-catching aerogel and art",
    "url": "https://www.nasa.gov/technology/tech-transfer-spinoffs/comet-catching-nasa-technology-enables-exotic-works-of-art/",
    "reviewedOn": "2026-11-13"
  },
  "tire": {
    "label": "NASA Glenn · Superelastic Tire",
    "url": "https://technology.nasa.gov/patent/LEW-TOPS-99",
    "reviewedOn": "2026-11-13"
  },
  "polar": {
    "label": "Exploratorium · Bone Stress",
    "url": "https://www.exploratorium.edu/snacks/bone-stress",
    "reviewedOn": "2026-11-13"
  },
  "lc": {
    "label": "University of Wisconsin–Madison MRSEC · Liquid crystals",
    "url": "https://education.mrsec.wisc.edu/liquid-crystals/",
    "reviewedOn": "2026-11-13"
  },
  "quartz": {
    "label": "NIST · The Evolution of Time Measurement: Quartz Clocks",
    "url": "https://tf.nist.gov/general/pdf/2534.pdf",
    "reviewedOn": "2026-11-13"
  },
  "fiber": {
    "label": "Corning · How optical fiber works",
    "url": "https://www.corning.com/worldwide/en/innovation/the-glass-age/science-of-glass/how-it-works-optical-fiber.html",
    "reviewedOn": "2026-11-13"
  },
  "eink": {
    "label": "E Ink · Electronic ink mechanisms",
    "url": "https://www.eink.com/tech/detail/How_it_works",
    "reviewedOn": "2026-11-13"
  },
  "einkbenefits": {
    "label": "E Ink · Reflective and bistable displays",
    "url": "https://www.eink.com/tech/detail/Benefits",
    "reviewedOn": "2026-11-13"
  },
  "gps": {
    "label": "NIST · Knowing Where We Are",
    "url": "https://www.nist.gov/atomic-clocks/a-technology-powerhouse/knowing-where-we-are",
    "reviewedOn": "2026-11-13"
  },
  "ultrasound": {
    "label": "NIH NIBIB · Ultrasound",
    "url": "https://www.nibib.nih.gov/science-education/science-topics/ultrasound",
    "reviewedOn": "2026-11-13"
  },
  "mri": {
    "label": "NIH NIBIB · Magnetic resonance imaging",
    "url": "https://www.nibib.nih.gov/science-education/science-topics/magnetic-resonance-imaging-mri",
    "reviewedOn": "2026-11-13"
  },
  "faraday": {
    "label": "Royal Institution · Faraday’s induction ring",
    "url": "https://www.rigb.org/explore-science/explore/collection/michael-faradays-ring-coil-apparatus",
    "reviewedOn": "2026-11-13"
  },
  "generator": {
    "label": "Royal Institution · Faraday’s generator",
    "url": "https://www.rigb.org/explore-science/explore/collection/michael-faradays-generator",
    "reviewedOn": "2026-11-13"
  },
  "ccd": {
    "label": "Royal Swedish Academy of Sciences · Physics Nobel scientific background, 2009",
    "url": "https://www.nobelprize.org/uploads/2018/06/advanced-physicsprize2009-1.pdf",
    "reviewedOn": "2026-11-13"
  },
  "pv": {
    "label": "US Department of Energy · Solar photovoltaic cell basics",
    "url": "https://www.energy.gov/cmei/systems/solar-photovoltaic-cell-basics",
    "reviewedOn": "2026-11-13"
  }
} as const;

export type HiddenConnection = Fact & { sourceKey: keyof typeof hiddenConnectionSources; why: string; related: [string, string] };
const drafts: Omit<HiddenConnection, 'source' | 'url' | 'collection'>[] = [
  {
    "id": "shushtar-mills",
    "category": "Ancient ingenuity",
    "sourceKey": "shushtar",
    "question": "Could a city’s water supply also power its machinery?",
    "title": "Shushtar routed river water through mill tunnels.",
    "text": "Its hydraulic network diverted water from the Kârun River to supply the city and drive watermills.",
    "explore": "Sketch one water route doing two useful jobs.",
    "why": "Infrastructure can serve several purposes at once. Following the water reveals how supply and mechanical work can fit into one system.",
    "related": [
      "shushtar-measure",
      "qanat-watermills"
    ]
  },
  {
    "id": "lotus-droplets",
    "category": "Nature",
    "sourceKey": "lotus",
    "question": "Can rain wash a leaf without soap?",
    "title": "Rolling droplets help clean lotus leaves.",
    "text": "Their highly water-repellent surfaces let drops gather loose contaminants as they roll away.",
    "explore": "Draw a rolling droplet picking up loose specks.",
    "why": "A cleaning strategy can depend on preventing attachment in the first place. Consider what the surface contributes before adding another chemical.",
    "related": [
      "lotus-roughness",
      "water-surface-tension"
    ]
  },
  {
    "id": "kingfisher-train",
    "category": "Inventions",
    "sourceKey": "birds",
    "question": "What connects a diving bird with a high-speed train?",
    "title": "A kingfisher’s bill inspired a Shinkansen nose design.",
    "text": "Engineers looked to the bird’s streamlined entry into water when addressing train pressure-noise problems.",
    "explore": "Sketch a gradual transition between two different environments.",
    "why": "A useful analogy can cross from one medium to another. Identify the shared physical problem before borrowing a shape.",
    "related": [
      "owl-pantograph",
      "velcro-burrs"
    ]
  },
  {
    "id": "aerogel-empty",
    "category": "Space",
    "sourceKey": "aerogel",
    "question": "Can a solid consist almost entirely of empty space?",
    "title": "Silica aerogel can be about 99 percent air by volume.",
    "text": "Its sparse solid framework leaves an exceptionally porous material.",
    "explore": "Sketch a solid network that occupies only a small part of a box.",
    "why": "An object’s volume is not the same as the amount of solid material it contains. Internal structure can change what “solid” feels like.",
    "related": [
      "aerogel-tracks",
      "stardust-return"
    ]
  },
  {
    "id": "polar-direction",
    "category": "Everyday science",
    "sourceKey": "polar",
    "question": "Can a filter select light by its direction of vibration?",
    "title": "A polarizer transmits a preferred polarization.",
    "text": "It selects an orientation of the light’s electric-field oscillation rather than simply choosing a color.",
    "explore": "Draw waves with different orientations approaching one filter.",
    "why": "Light has properties beyond brightness and color. A filter can reveal information that ordinary viewing does not separate.",
    "related": [
      "polar-plastic",
      "sunlight-colors"
    ]
  },
  {
    "id": "fiber-photons",
    "category": "Computing & AI",
    "sourceKey": "fiber",
    "question": "Can a message spend part of its journey as light?",
    "title": "Optical fibers carry information in light signals.",
    "text": "Transmitters convert electrical signals into optical ones; receivers convert the arriving light back into electrical information.",
    "explore": "Draw one message changing its physical carrier twice.",
    "why": "Information can survive a change in medium. Separate the message from the physical signal used to transport it.",
    "related": [
      "fiber-cladding",
      "web-scientists"
    ]
  },
  {
    "id": "ultrasound-distance",
    "category": "Human body",
    "sourceKey": "ultrasound",
    "question": "How can an echo become a picture of the body?",
    "title": "Ultrasound scanners time returning sound waves.",
    "text": "Using echo travel time and sound speed, the scanner estimates distances to tissue boundaries.",
    "explore": "Sketch an outgoing pulse and a returning echo on a timeline.",
    "why": "A picture can be reconstructed from measurements rather than recorded as ordinary light. Timing is one route from a signal to a spatial model.",
    "related": [
      "ultrasound-probe",
      "bat-echoes"
    ]
  },
  {
    "id": "shushtar-measure",
    "category": "Ancient ingenuity",
    "sourceKey": "shushtar",
    "question": "How did a historic water system keep track of river level?",
    "title": "Shushtar included a water-measuring tower.",
    "text": "The tower belonged to an ensemble of canals, dams, bridges, basins, and mills.",
    "explore": "Add a measuring point to a sketch of a water network.",
    "why": "A system needs observation as well as construction. A way to measure changing conditions can be as important as the channels carrying the flow.",
    "related": [
      "shushtar-orchards",
      "qanat-watermills"
    ]
  },
  {
    "id": "lotus-roughness",
    "category": "Nature",
    "sourceKey": "lotus",
    "question": "Could making a surface rougher help it repel water?",
    "title": "Lotus leaves combine tiny bumps with wax crystals.",
    "text": "This multiscale texture helps create the leaf’s exceptional water repellency.",
    "explore": "Draw two levels of texture on one surface.",
    "why": "Roughness does not always have the same effect. Geometry and surface chemistry need to be considered together.",
    "related": [
      "lotus-paint",
      "water-surface-tension"
    ]
  },
  {
    "id": "owl-pantograph",
    "category": "Inventions",
    "sourceKey": "birds",
    "question": "Could an owl influence a train part that never leaves the ground?",
    "title": "Owl feathers helped inspire quieter pantograph design.",
    "text": "Engineers studied feather features while redesigning the structure that connects a train to overhead power lines.",
    "explore": "Look for a noisy moving part that might benefit from surface changes.",
    "why": "Bio-inspired design can transfer a mechanism rather than copy an animal’s entire motion. The useful feature may be surprisingly small.",
    "related": [
      "kingfisher-dive",
      "velcro-burrs"
    ]
  },
  {
    "id": "aerogel-tracks",
    "category": "Space",
    "sourceKey": "aerogel",
    "question": "Can a dust grain leave a trail much longer than itself?",
    "title": "Impacts can make carrot-shaped tracks in aerogel.",
    "text": "These tracks helped scientists locate captured particles in Stardust’s collector.",
    "explore": "Draw a moving speck slowing along a tapering path.",
    "why": "A tiny event can leave a larger, readable trace. Preserving the path can help investigators find and interpret the final object.",
    "related": [
      "aerogel-density",
      "stardust-return"
    ]
  },
  {
    "id": "polar-plastic",
    "category": "Everyday science",
    "sourceKey": "polar",
    "question": "Can a clear plastic fork reveal a hidden rainbow?",
    "title": "Stressed plastic can show colors between polarizers.",
    "text": "Changes in its structure alter the way differently polarized light travels through it.",
    "explore": "Sketch a clear object becoming a map of colored regions.",
    "why": "An invisible mechanical condition can become an optical signal. Measurement can depend on translating one kind of change into another.",
    "related": [
      "polar-rotate",
      "sunlight-colors"
    ]
  },
  {
    "id": "fiber-cladding",
    "category": "Computing & AI",
    "sourceKey": "fiber",
    "question": "Why does an optical fiber need a layer around its core?",
    "title": "Cladding helps confine light inside the fiber.",
    "text": "Its lower refractive index relative to the core keeps guided light from simply escaping outward.",
    "explore": "Sketch a core and surrounding layer with different optical properties.",
    "why": "A surrounding layer can be essential to the main component’s job. The boundary deserves as much attention as the material in the center.",
    "related": [
      "fiber-purity",
      "web-scientists"
    ]
  },
  {
    "id": "ultrasound-probe",
    "category": "Human body",
    "sourceKey": "ultrasound",
    "question": "Can the same ultrasound probe speak and listen?",
    "title": "Its transducer can emit pulses and detect echoes.",
    "text": "Piezoelectric elements convert electrical signals into sound and returning sound into electrical signals.",
    "explore": "Draw one component with arrows running in both directions.",
    "why": "A reversible conversion can simplify a system. One carefully chosen component can take turns generating a signal and sensing its return.",
    "related": [
      "quartz-reverse",
      "hearing-signals"
    ]
  },
  {
    "id": "shushtar-orchards",
    "category": "Ancient ingenuity",
    "sourceKey": "shushtar",
    "question": "Can a canal network help shape an agricultural landscape?",
    "title": "Shushtar’s water supported orchards and farmland.",
    "text": "After serving the city, the network supplied the Mianâb plain to its south.",
    "explore": "Trace a resource from a city into the surrounding countryside.",
    "why": "A piece of infrastructure can affect a much wider area than its central monument. Think about the whole landscape connected to it.",
    "related": [
      "shushtar-control",
      "qanat-watermills"
    ]
  },
  {
    "id": "lotus-paint",
    "category": "Nature",
    "sourceKey": "lotus",
    "question": "Can a leaf suggest a way to clean a building?",
    "title": "Lotus-inspired paints imitate a self-cleaning surface.",
    "text": "They use surface design to help rain carry dirt away; durability remains an engineering challenge.",
    "explore": "Compare a renewable leaf with a coating expected to last years.",
    "why": "Borrowing a biological idea requires adapting it to a different life cycle. A manufactured surface cannot simply grow a replacement leaf.",
    "related": [
      "lotus-droplets",
      "eiffel-paint"
    ]
  },
  {
    "id": "kingfisher-dive",
    "category": "Inventions",
    "sourceKey": "birds",
    "question": "Why would train engineers pay attention to a bird entering water?",
    "title": "Kingfishers dive with little splash.",
    "text": "Their long bills provide a natural model for moving smoothly between air and water.",
    "explore": "Draw a blunt shape and a tapered shape entering an imaginary surface.",
    "why": "Transitions can be a design problem of their own. Consider how a shape begins interacting with a new environment, not only how it travels within one.",
    "related": [
      "kingfisher-train",
      "dragonfly-water"
    ]
  },
  {
    "id": "aerogel-density",
    "category": "Space",
    "sourceKey": "aerogel",
    "question": "Why was Stardust’s collector not equally dense all the way through?",
    "title": "Its aerogel density increased below the impact surface.",
    "text": "A gentle entry followed by denser material helped slow incoming particles.",
    "explore": "Design a cushion whose resistance increases with depth.",
    "why": "A gradual transition can do a job that one uniform material cannot. Consider how the object’s needs change along its path.",
    "related": [
      "aerogel-rover",
      "stardust-return"
    ]
  },
  {
    "id": "polar-rotate",
    "category": "Everyday science",
    "sourceKey": "polar",
    "question": "Can rotating a filter change colors without changing the object?",
    "title": "The analyzer controls which polarized components pass.",
    "text": "Rotating the second filter changes the color pattern visible through stressed plastic.",
    "explore": "Draw several views of one unchanged object through different filter angles.",
    "why": "The instrument influences what information becomes visible. A change in the image does not always mean the object itself changed.",
    "related": [
      "polar-stress",
      "sunlight-colors"
    ]
  },
  {
    "id": "fiber-purity",
    "category": "Computing & AI",
    "sourceKey": "fiber",
    "question": "Why must communication glass be unusually pure?",
    "title": "Impurities can scatter or absorb the signal.",
    "text": "Reducing these losses lets light carry information farther through an optical fiber.",
    "explore": "Draw a route with many tiny losses and compare it with a cleaner route.",
    "why": "Small losses accumulate over a long distance. Material purity can become a network-scale issue rather than only a manufacturing detail.",
    "related": [
      "fiber-modes",
      "web-scientists"
    ]
  },
  {
    "id": "ultrasound-gel",
    "category": "Human body",
    "sourceKey": "ultrasound",
    "question": "Why is gel used between an ultrasound probe and skin?",
    "title": "Gel helps remove air gaps that obstruct sound transmission.",
    "text": "Maintaining acoustic contact lets more of the ultrasound reach the body.",
    "explore": "Draw the boundary between a sensor and the object it measures.",
    "why": "An interface can limit an otherwise capable instrument. Good measurement may require preparing the contact, not only improving the sensor.",
    "related": [
      "ultrasound-hearing",
      "bat-echoes"
    ]
  },
  {
    "id": "shushtar-control",
    "category": "Ancient ingenuity",
    "sourceKey": "shushtar",
    "question": "Could a castle also be a water-management headquarters?",
    "title": "Salâsel Castle served a hydraulic role.",
    "text": "It was the operating center of Shushtar’s wider water system.",
    "explore": "Design a control center for a network spread across a town.",
    "why": "Architecture can support organization as well as shelter. A striking building may be part of a larger working system rather than an isolated object.",
    "related": [
      "shushtar-mills",
      "qanat-watermills"
    ]
  },
  {
    "id": "whale-tubercles",
    "category": "Nature",
    "sourceKey": "whale",
    "question": "Why is a humpback whale’s flipper edge bumpy?",
    "title": "Rounded tubercles give the flipper a scalloped edge.",
    "text": "These bumps on the leading edge have inspired experiments on lifting surfaces.",
    "explore": "Sketch a smooth edge beside a repeating scalloped one.",
    "why": "A feature that looks like an imperfection may deserve investigation. Start with observation before deciding which shape should perform best.",
    "related": [
      "whale-stall",
      "shrimp-spring"
    ]
  },
  {
    "id": "shark-aircraft",
    "category": "Inventions",
    "sourceKey": "riblet",
    "question": "Can shark-inspired texture help an aircraft move through air?",
    "title": "Aircraft riblets borrow an idea from shark skin.",
    "text": "Fine grooves aligned with flow can reduce skin-friction drag under suitable conditions.",
    "explore": "Compare copying an animal’s outline with copying its surface texture.",
    "why": "The useful feature may be microscopic rather than visible from a distance. Small structures can affect how a much larger object moves.",
    "related": [
      "riblet-vortices",
      "shark-denticles"
    ]
  },
  {
    "id": "aerogel-rover",
    "category": "Space",
    "sourceKey": "aerogel",
    "question": "What links comet collecting with keeping rover electronics protected?",
    "title": "Aerogel has also served as spacecraft insulation.",
    "text": "JPL used it around the electronics box of the Sojourner Mars rover.",
    "explore": "Give one unusual material two jobs based on different properties.",
    "why": "A material can have more than one useful behavior. An invention may travel between fields when someone notices a second property.",
    "related": [
      "aerogel-empty",
      "dewar-cold"
    ]
  },
  {
    "id": "polar-stress",
    "category": "Everyday science",
    "sourceKey": "polar",
    "question": "Where might a plastic object concentrate mechanical stress?",
    "title": "Sharp corners can produce concentrated stress patterns.",
    "text": "Polarized-light observations can reveal rapid color changes near these regions in suitable plastics.",
    "explore": "Compare a sharp notch with a gently rounded transition.",
    "why": "Geometry can direct forces into small regions. A visual stress pattern can help turn a vague weak point into something worth investigating.",
    "related": [
      "polar-direction",
      "sunlight-colors"
    ]
  },
  {
    "id": "fiber-modes",
    "category": "Computing & AI",
    "sourceKey": "fiber",
    "question": "Are all communication fibers designed for the same light paths?",
    "title": "Single-mode and multimode fibers guide light differently.",
    "text": "Their different core designs suit different distances and transmission needs.",
    "explore": "Sketch one path beside several possible paths through a cable.",
    "why": "More possible paths are not automatically better for every task. Choose a design by how the signal needs to arrive, not just how much fits inside.",
    "related": [
      "fiber-photons",
      "web-scientists"
    ]
  },
  {
    "id": "ultrasound-hearing",
    "category": "Human body",
    "sourceKey": "ultrasound",
    "question": "Could an imaging machine use sound too high for us to hear?",
    "title": "Diagnostic ultrasound usually operates in the megahertz range.",
    "text": "These frequencies are far above the upper range of ordinary human hearing.",
    "explore": "Place speech, high audible sounds, and ultrasound on a frequency scale.",
    "why": "Our senses sample only part of the physical world. Instruments can use signals outside that range to make otherwise hidden structures accessible.",
    "related": [
      "ultrasound-distance",
      "bat-echoes"
    ]
  },
  {
    "id": "dujiangyan-damless",
    "category": "Ancient ingenuity",
    "sourceKey": "dujiangyan",
    "question": "Can a river be managed without a conventional dam?",
    "title": "Dujiangyan works with the river’s natural setting.",
    "text": "The ancient irrigation system uses terrain and flow to divert water, manage floods, and remove sediment without damming the river.",
    "explore": "Compare redirecting a flow with storing it behind a barrier.",
    "why": "Engineering can guide a natural process rather than stop it. Start by asking which features of the setting can do useful work.",
    "related": [
      "dujiangyan-sediment",
      "petra-water"
    ]
  },
  {
    "id": "whale-stall",
    "category": "Nature",
    "sourceKey": "whale",
    "question": "Can a bumpy model flipper outperform a smooth one?",
    "title": "Tubercles delayed stall in a wind-tunnel experiment.",
    "text": "A 2004 study found a roughly 40 percent higher stall angle for its idealized flipper model, not a universal improvement for every wing.",
    "explore": "Compare two designs while keeping the test conditions fixed.",
    "why": "An impressive result needs the model and conditions beside it. A measured advantage should guide further tests rather than become an unlimited promise.",
    "related": [
      "whale-air-water",
      "shrimp-spring"
    ]
  },
  {
    "id": "riblet-vortices",
    "category": "Inventions",
    "sourceKey": "riblet",
    "question": "Why might grooves reduce friction rather than increase it?",
    "title": "Riblets can move near-wall vortices away from a surface.",
    "text": "That change in turbulent flow helps explain their skin-friction benefit; groove geometry and flow conditions matter.",
    "explore": "Sketch a rotating flow close to a wall and farther from it.",
    "why": "An intuitive rule such as “smoother is always better” needs testing. The surrounding flow can change which surface design works best.",
    "related": [
      "riblet-flight",
      "shark-denticles"
    ]
  },
  {
    "id": "gps-clocks",
    "category": "Space",
    "sourceKey": "gps",
    "question": "What do satellite navigation and a precise clock have in common?",
    "title": "GPS positioning depends on atomic clocks.",
    "text": "Satellite timing information is part of how a receiver determines its position.",
    "explore": "Draw a location measurement built from timing signals.",
    "why": "Knowing where can depend on knowing when. A navigation system connects two measurements that seem separate in daily life.",
    "related": [
      "gps-four",
      "compass-north"
    ]
  },
  {
    "id": "pv-electrons",
    "category": "Everyday science",
    "sourceKey": "pv",
    "question": "How can sunlight become electrical current without a spinning turbine?",
    "title": "A photovoltaic cell transfers light energy to electrons.",
    "text": "Its semiconductor absorbs light and makes that energy available as electrical current.",
    "explore": "Draw an energy path from light directly to an electric circuit.",
    "why": "The same useful output can be reached through different conversions. A solar cell offers a route that does not begin with turning a generator.",
    "related": [
      "pv-gridlines",
      "white-led-color"
    ]
  },
  {
    "id": "ccd-charge",
    "category": "Computing & AI",
    "sourceKey": "ccd",
    "question": "What can a digital image sensor collect instead of film chemistry?",
    "title": "A CCD accumulates light-generated electric charge.",
    "text": "Its pixels store charge related to the light arriving during an exposure.",
    "explore": "Draw an image as a grid of containers filling by different amounts.",
    "why": "An image can begin as many local measurements. Separating collection from later display clarifies how a scene becomes data.",
    "related": [
      "ccd-buckets",
      "art-infrared"
    ]
  },
  {
    "id": "mri-water",
    "category": "Human body",
    "sourceKey": "mri",
    "question": "What connects water in the body with an MRI image?",
    "title": "MRI can detect signals associated with hydrogen protons.",
    "text": "Strong magnetic fields and radiofrequency pulses make those signals useful for imaging tissues.",
    "explore": "Draw an ordinary body ingredient becoming a source of measurement.",
    "why": "An imaging method can exploit properties already present in the object. The useful signal need not come from a visible dye or an external photograph.",
    "related": [
      "mri-tissue",
      "neuron-branches"
    ]
  },
  {
    "id": "dujiangyan-sediment",
    "category": "Ancient ingenuity",
    "sourceKey": "dujiangyan",
    "question": "Why does an irrigation system need to handle more than water?",
    "title": "Dujiangyan also manages sediment.",
    "text": "Its design addresses the material carried by the Minjiang River alongside the water delivered to farmland.",
    "explore": "Draw a channel carrying water and suspended grains.",
    "why": "A useful flow often carries unwanted material too. Designing for the mixture can matter more than treating it as pure water.",
    "related": [
      "dujiangyan-three",
      "petra-water"
    ]
  },
  {
    "id": "whale-air-water",
    "category": "Nature",
    "sourceKey": "whale",
    "question": "Why test a whale-inspired shape in air instead of water?",
    "title": "Wind tunnels can investigate flipper-like lifting surfaces.",
    "text": "Researchers used scaled stationary models to study forces relevant to flow around humpback flippers.",
    "explore": "Design a model test and list what it leaves out.",
    "why": "Models can make a hard problem measurable. Their value depends on knowing which features carry over and which remain simplified.",
    "related": [
      "whale-stall",
      "shark-aircraft"
    ]
  },
  {
    "id": "riblet-flight",
    "category": "Inventions",
    "sourceKey": "riblet",
    "question": "How do researchers check whether a delicate aircraft texture lasts?",
    "title": "Riblet coatings have been tested on airline aircraft.",
    "text": "JAXA and industry partners inspected textured coatings on Boeing 737-800 fuselages during flight testing.",
    "explore": "Design a test that checks wear as well as initial performance.",
    "why": "A promising effect is only part of a practical invention. A surface also has to survive the environment in which people will use it.",
    "related": [
      "shark-aircraft",
      "eiffel-paint"
    ]
  },
  {
    "id": "gps-four",
    "category": "Space",
    "sourceKey": "gps",
    "question": "Why does a GPS receiver normally need at least four satellites?",
    "title": "It must solve for time as well as position.",
    "text": "Combining signals from at least four satellites lets it account for receiver-clock error alongside its location.",
    "explore": "List four unknowns rather than assuming the receiver already knows the time.",
    "why": "An extra measurement may solve a hidden unknown. Counting what must be determined is a useful first step in understanding a system.",
    "related": [
      "gps-clocks",
      "thunder-delay"
    ]
  },
  {
    "id": "pv-gridlines",
    "category": "Everyday science",
    "sourceKey": "pv",
    "question": "Why do many solar cells have thin metal lines across them?",
    "title": "Conductive contacts collect the generated current.",
    "text": "The visible grid helps extract electrical energy from the photovoltaic material.",
    "explore": "Draw both the light-absorbing region and its collection network.",
    "why": "A material that produces a useful effect still needs connections to deliver it. Collection and transport are part of the design.",
    "related": [
      "pv-silicon",
      "white-led-color"
    ]
  },
  {
    "id": "ccd-buckets",
    "category": "Computing & AI",
    "sourceKey": "ccd",
    "question": "Why is a CCD sometimes compared with a bucket brigade?",
    "title": "Stored charge is shifted across the sensor for readout.",
    "text": "Voltage pulses move charge packets step by step before they are measured.",
    "explore": "Sketch values moving along a row without losing their order.",
    "why": "Moving information can require preserving both its amount and its position. The transfer method is part of how a picture stays organized.",
    "related": [
      "ccd-color",
      "art-infrared"
    ]
  },
  {
    "id": "mri-tissue",
    "category": "Human body",
    "sourceKey": "mri",
    "question": "Why can different soft tissues look different in MRI?",
    "title": "Their proton signals relax in different ways.",
    "text": "The molecular environment affects signal behavior after a radiofrequency pulse, helping distinguish tissues.",
    "explore": "Compare two responses to the same brief input.",
    "why": "A material can be identified partly by how it responds over time. The response pattern may reveal more than its appearance at rest.",
    "related": [
      "mri-radio",
      "neuron-branches"
    ]
  },
  {
    "id": "dujiangyan-three",
    "category": "Ancient ingenuity",
    "sourceKey": "dujiangyan",
    "question": "Can three different structures share one river-management job?",
    "title": "Dujiangyan combines a dike, floodgate, and diversion passage.",
    "text": "The Yuzui, Feishayan, and Baopingkou components work together to regulate the river’s flow.",
    "explore": "Give three parts of an imaginary system different roles.",
    "why": "A durable solution may distribute work among complementary parts. Understanding their relationships is more useful than treating each part separately.",
    "related": [
      "dujiangyan-renewed",
      "petra-water"
    ]
  },
  {
    "id": "pinecone-humidity",
    "category": "Nature",
    "sourceKey": "pine",
    "question": "Can a pine cone act as a natural humidity indicator?",
    "title": "Pine-cone scales open as the air becomes drier.",
    "text": "They close in damp conditions through a response of their material structure.",
    "explore": "Draw the same cone in dry and damp air.",
    "why": "Movement does not always require a motor or a nervous system. A material can respond directly to changing surroundings.",
    "related": [
      "pinecone-layers",
      "pineapple-crown"
    ]
  },
  {
    "id": "tire-airless",
    "category": "Inventions",
    "sourceKey": "tire",
    "question": "Can a tire carry a vehicle without holding compressed air?",
    "title": "NASA developed an airless superelastic tire.",
    "text": "Its load-bearing metal structure replaces the need for pneumatic inflation.",
    "explore": "Draw a wheel supported by a flexible framework instead of air.",
    "why": "A familiar function can be delivered by a different mechanism. Start with the load that must be supported rather than the usual construction.",
    "related": [
      "tire-alloy",
      "safety-pin-spring"
    ]
  },
  {
    "id": "gps-ground",
    "category": "Space",
    "sourceKey": "gps",
    "question": "Do satellite atomic clocks keep perfect time forever?",
    "title": "GPS satellite clocks receive ground-based corrections.",
    "text": "They drift, so better reference clocks on the ground help maintain the system’s timing.",
    "explore": "Draw a feedback link between a remote instrument and its reference.",
    "why": "Accuracy can come from a maintained system rather than one perfect device. Correction and comparison belong in the design.",
    "related": [
      "gps-networks",
      "compass-north"
    ]
  },
  {
    "id": "pv-silicon",
    "category": "Everyday science",
    "sourceKey": "pv",
    "question": "What material links many solar cells with computer chips?",
    "title": "Silicon is a semiconductor used in both.",
    "text": "It is the dominant material in conventional solar cells and a major material in electronics, though the devices do different jobs.",
    "explore": "Compare one ingredient used for two very different functions.",
    "why": "The same material can support different technologies when its structure and surroundings change. An ingredient alone does not define a device.",
    "related": [
      "pv-electrons",
      "first-transistor"
    ]
  },
  {
    "id": "ccd-color",
    "category": "Computing & AI",
    "sourceKey": "ccd",
    "question": "Does a bare CCD pixel know whether light is red or blue?",
    "title": "Color imaging can use filters to separate wavelength bands.",
    "text": "A Bayer pattern arranges red, green, and blue filters across a sensor grid.",
    "explore": "Draw a color-filter mosaic above a grid of light measurements.",
    "why": "A full-color image can be assembled from selective measurements. What the final picture shows may involve more processing than a single pixel records.",
    "related": [
      "papilio-mixing",
      "art-pigments"
    ]
  },
  {
    "id": "mri-radio",
    "category": "Human body",
    "sourceKey": "mri",
    "question": "Is MRI simply another form of X-ray photography?",
    "title": "MRI uses magnetic fields and radiofrequency signals.",
    "text": "It does not use the ionizing X-rays employed by CT or ordinary radiography.",
    "explore": "Group imaging methods by the signals they measure.",
    "why": "Different instruments can produce similar-looking outputs through very different physics. Understanding the mechanism is more informative than the image format.",
    "related": [
      "ultrasound-distance",
      "microwave-radioactivity"
    ]
  },
  {
    "id": "dujiangyan-renewed",
    "category": "Ancient ingenuity",
    "sourceKey": "dujiangyan",
    "question": "Can ancient infrastructure remain useful through repeated redesign?",
    "title": "Dujiangyan was enlarged across successive dynasties.",
    "text": "Begun in the third century BCE, it has been modified over centuries and still supplies irrigation.",
    "explore": "Draw a timeline showing maintenance and adaptation beside initial construction.",
    "why": "Long life does not mean no change. A working heritage system can be the result of many generations of care and improvement.",
    "related": [
      "dujiangyan-damless",
      "petra-water"
    ]
  },
  {
    "id": "pinecone-layers",
    "category": "Nature",
    "sourceKey": "pine",
    "question": "What makes a pine-cone scale bend as humidity changes?",
    "title": "Its joined layers change dimensions by different amounts.",
    "text": "Their unequal response makes the scale curve instead of simply shrinking uniformly.",
    "explore": "Sketch two bonded layers trying to become different lengths.",
    "why": "Combining materials can turn a small dimensional change into useful motion. The relationship between layers is the mechanism.",
    "related": [
      "pinecone-shade",
      "pineapple-crown"
    ]
  },
  {
    "id": "tire-alloy",
    "category": "Inventions",
    "sourceKey": "tire",
    "question": "Can metal return from a surprisingly large deformation?",
    "title": "NASA’s tire uses nickel-titanium shape-memory alloys.",
    "text": "The design exploits reversible strain to recover from deformation that would permanently damage ordinary spring materials.",
    "explore": "Sketch a structure bending and then returning to its working shape.",
    "why": "Recovery matters as well as strength. A material may be useful because it tolerates a large change and comes back.",
    "related": [
      "tire-stiffness",
      "safety-pin-spring"
    ]
  },
  {
    "id": "gps-networks",
    "category": "Space",
    "sourceKey": "gps",
    "question": "Does GPS timing do work beyond giving directions?",
    "title": "Communications networks use GPS for synchronization.",
    "text": "Precise shared time helps coordinate operations across a network, not only locate travelers.",
    "explore": "Imagine many transmitters needing to agree on when to act.",
    "why": "A technology’s most visible use may hide its supporting roles. Shared timing can organize activity even when nobody is asking for a map.",
    "related": [
      "gps-clocks",
      "compass-north"
    ]
  },
  {
    "id": "pv-thinfilm",
    "category": "Everyday science",
    "sourceKey": "pv",
    "question": "Must every solar cell be a thick crystalline wafer?",
    "title": "Thin-film cells deposit photovoltaic layers on a support.",
    "text": "The support can be glass, plastic, or metal, depending on the design.",
    "explore": "Sketch a functional coating carried by a different supporting material.",
    "why": "Separating the active layer from its support opens different manufacturing possibilities. The part doing the electrical work need not fill the whole structure.",
    "related": [
      "pv-electrons",
      "white-led-color"
    ]
  },
  {
    "id": "ccd-saturation",
    "category": "Computing & AI",
    "sourceKey": "ccd",
    "question": "Can a pixel become too full to measure more light?",
    "title": "CCD pixels have a finite charge capacity.",
    "text": "Once a charge-storage well fills, additional exposure cannot be recorded in the same linear way.",
    "explore": "Compare a nearly empty measuring cup with one already full.",
    "why": "Every measuring system has a range. Knowing the limit helps explain why a bright image region can lose detail rather than simply grow more informative.",
    "related": [
      "ccd-charge",
      "art-infrared"
    ]
  },
  {
    "id": "mri-functional",
    "category": "Human body",
    "sourceKey": "mri",
    "question": "Does a brain-activity image directly photograph a thought?",
    "title": "Functional MRI tracks changes linked with blood oxygenation.",
    "text": "It uses a physiological response associated with activity, rather than directly reading thoughts from a picture.",
    "explore": "Separate a process from an indirect signal used to study it.",
    "why": "A measurement can be informative without being a direct view of its subject. Knowing the intermediate steps helps prevent overinterpretation.",
    "related": [
      "mri-water",
      "neuron-branches"
    ]
  },
  {
    "id": "inca-network",
    "category": "Ancient ingenuity",
    "sourceKey": "inca",
    "question": "How long could a road network become before motor vehicles?",
    "title": "The Andean road system extended over 30,000 kilometers.",
    "text": "Qhapaq Ñan linked communities through mountains, valleys, deserts, and other demanding landscapes.",
    "explore": "Sketch a route that must adapt to three different terrains.",
    "why": "Transport is a network problem as much as a paving problem. Connections across different environments require more than one construction approach.",
    "related": [
      "inca-cusco",
      "stonehenge-transport"
    ]
  },
  {
    "id": "pinecone-shade",
    "category": "Nature",
    "sourceKey": "pine",
    "question": "Could a window shade move without electronics?",
    "title": "ETH researchers built a pine-cone-inspired wooden sunshade.",
    "text": "Its bilayer planks responded to humidity without sensors, motors, or electricity in the prototype.",
    "explore": "Design a shade driven by a change in its environment.",
    "why": "A responsive material can perform some work usually assigned to a control system. Evaluate the speed and limits of that response as well as its elegance.",
    "related": [
      "pinecone-layers",
      "lc-privacy"
    ]
  },
  {
    "id": "tire-stiffness",
    "category": "Inventions",
    "sourceKey": "tire",
    "question": "Could a tire be designed to soften as it deflects?",
    "title": "NASA’s superelastic design can tune stiffness with deformation.",
    "text": "This offers a way to reduce energy transferred to a vehicle during large deflections.",
    "explore": "Draw two different force-versus-deflection curves.",
    "why": "A spring does not have to respond in only one simple way. Tailoring the response can change how a whole vehicle experiences a bump.",
    "related": [
      "tire-apollo",
      "safety-pin-spring"
    ]
  },
  {
    "id": "inca-cusco",
    "category": "Ancient ingenuity",
    "sourceKey": "inca",
    "question": "Could four routes organize an empire’s road network?",
    "title": "Qhapaq Ñan’s main routes began at Cusco.",
    "text": "Four principal routes radiated from the central square and connected with smaller roads.",
    "explore": "Draw four trunk routes with local branches.",
    "why": "Large networks can combine a clear overall structure with many local connections. Think about what belongs at the center and what belongs near users.",
    "related": [
      "inca-support",
      "stonehenge-transport"
    ]
  },
  {
    "id": "termite-breathing",
    "category": "Nature",
    "sourceKey": "termite",
    "question": "Can day-and-night temperatures help ventilate a termite mound?",
    "title": "Some studied mounds use daily heating and cooling.",
    "text": "A 2015 study in India measured temperature-driven circulation that helped move carbon dioxide outward.",
    "explore": "Draw a daily cycle with different airflow arrows by day and night.",
    "why": "A changing environment can provide a driving force rather than only a disturbance. Passive design begins by understanding that cycle.",
    "related": [
      "termite-walls",
      "leafcutter-chambers"
    ]
  },
  {
    "id": "tire-apollo",
    "category": "Inventions",
    "sourceKey": "tire",
    "question": "Can one generation of space wheels inspire another?",
    "title": "The superelastic tire builds on the earlier Spring Tire.",
    "text": "NASA Glenn and Goodyear’s work drew inspiration from Apollo lunar tires.",
    "explore": "Draw a family tree of designs, with one changed mechanism per generation.",
    "why": "Innovation often combines inherited ideas with a new material. Tracing the lineage makes the improvement more concrete than a claim of total novelty.",
    "related": [
      "tire-alloy",
      "apollo-rope"
    ]
  },
  {
    "id": "inca-support",
    "category": "Ancient ingenuity",
    "sourceKey": "inca",
    "question": "What did a long-distance road need besides a walking surface?",
    "title": "The Andean network included storage and accommodation.",
    "text": "Associated buildings helped support movement and exchange along the routes.",
    "explore": "Plan a long journey and mark where supplies and rest become necessary.",
    "why": "A route becomes useful when travelers can sustain the journey. Supporting services are part of the infrastructure, even if they receive less attention.",
    "related": [
      "inca-terrain",
      "stonehenge-transport"
    ]
  },
  {
    "id": "termite-walls",
    "category": "Nature",
    "sourceKey": "termite",
    "question": "Can a wall limit wind while still exchanging gases?",
    "title": "The studied termite mounds had porous outer walls.",
    "text": "These walls allowed gas exchange without simply admitting the wind as an open window would.",
    "explore": "Compare a large opening with many small connected pores.",
    "why": "A boundary can filter movement rather than only block or permit it. Different processes may pass through the same material in different ways.",
    "related": [
      "termite-reversal",
      "leafcutter-chambers"
    ]
  },
  {
    "id": "lc-order",
    "category": "Inventions",
    "sourceKey": "lc",
    "question": "Can a material be fluid yet keep some molecular order?",
    "title": "Liquid crystals sit between familiar liquid and crystal behavior.",
    "text": "They have more molecular ordering than ordinary liquids but less than crystalline solids.",
    "explore": "Sketch flowing rods that still tend to share an orientation.",
    "why": "Everyday state-of-matter categories can be incomplete. Useful materials often occupy a range of structures between the simplest examples.",
    "related": [
      "lc-voltage",
      "white-led-color"
    ]
  },
  {
    "id": "inca-terrain",
    "category": "Ancient ingenuity",
    "sourceKey": "inca",
    "question": "Did Inca road builders use one design everywhere?",
    "title": "Qhapaq Ñan combined stairs, bridges, drains, and paving.",
    "text": "Construction methods varied with the difficult terrain of the Andes.",
    "explore": "Design different crossings for a slope, stream, and wet patch.",
    "why": "Consistent service does not require identical parts everywhere. Adapting the method to the setting can keep the whole network functioning.",
    "related": [
      "inca-network",
      "stonehenge-transport"
    ]
  },
  {
    "id": "termite-reversal",
    "category": "Nature",
    "sourceKey": "termite",
    "question": "Can ventilation reverse direction over a day?",
    "title": "Airflow reversed in the termite mounds researchers measured.",
    "text": "The outer flutes and central core warmed and cooled differently, changing the circulation direction.",
    "explore": "Sketch two connected air paths whose relative temperatures swap.",
    "why": "A system’s behavior can change without moving valves. Relative temperatures can organize a flow and reverse it as conditions change.",
    "related": [
      "termite-breathing",
      "leafcutter-chambers"
    ]
  },
  {
    "id": "lc-voltage",
    "category": "Inventions",
    "sourceKey": "lc",
    "question": "How can a small voltage make a watch segment appear dark?",
    "title": "An LCD changes molecular orientation to control light.",
    "text": "In a twisted-nematic watch display, voltage changes how light passes through the liquid-crystal and polarizer layers.",
    "explore": "Draw a switch that redirects light instead of producing it.",
    "why": "A display can make an image by controlling transmission. Separating light production from light control helps explain its construction.",
    "related": [
      "lc-seven",
      "white-led-color"
    ]
  },
  {
    "id": "angkor-water",
    "category": "Ancient ingenuity",
    "sourceKey": "angkor",
    "question": "Is Angkor only a collection of temples?",
    "title": "Angkor also preserves an extensive water landscape.",
    "text": "Basins, dykes, canals, and reservoirs were part of its urban infrastructure.",
    "explore": "Draw the invisible service network behind a famous skyline.",
    "why": "A city is more than its most photographed buildings. Looking for everyday systems reveals the work that supported monumental architecture.",
    "related": [
      "angkor-capitals",
      "dholavira-reservoirs"
    ]
  },
  {
    "id": "mussel-wet-glue",
    "category": "Nature",
    "sourceKey": "mussel",
    "question": "What helps a mussel cling where ordinary glue struggles?",
    "title": "Mussels secrete adhesive proteins that work underwater.",
    "text": "Their attachment chemistry has inspired research into wet-surface adhesives.",
    "explore": "Design a fastening problem where drying the surface is impossible.",
    "why": "The environment is part of an adhesive’s job. A good bond in dry air does not automatically solve a wet-surface problem.",
    "related": [
      "mussel-bacteria",
      "mollusc-cousins"
    ]
  },
  {
    "id": "lc-seven",
    "category": "Inventions",
    "sourceKey": "lc",
    "question": "How can seven bars display ten different digits?",
    "title": "Seven-segment displays reuse the same small set of parts.",
    "text": "Different combinations of illuminated or darkened segments form the numerals zero through nine.",
    "explore": "Draw all ten digits using a fixed seven-bar layout.",
    "why": "A compact representation can describe many states. Reusing components efficiently is an information problem as well as a hardware problem.",
    "related": [
      "lc-privacy",
      "white-led-color"
    ]
  },
  {
    "id": "angkor-capitals",
    "category": "Ancient ingenuity",
    "sourceKey": "angkor",
    "question": "Can one archaeological landscape contain several urban plans?",
    "title": "Angkor preserves successive Khmer capitals.",
    "text": "Different city layouts developed there over centuries rather than one single plan appearing all at once.",
    "explore": "Layer several city plans on an imaginary map.",
    "why": "Places accumulate decisions through time. A complex layout may record successive generations rather than one designer’s master plan.",
    "related": [
      "angkor-living",
      "dholavira-reservoirs"
    ]
  },
  {
    "id": "mussel-bacteria",
    "category": "Nature",
    "sourceKey": "mussel",
    "question": "Can bacteria help researchers manufacture a mussel-inspired material?",
    "title": "MIT researchers engineered bacteria to produce hybrid adhesive proteins.",
    "text": "The 2014 experimental material combined mussel proteins with bacterial curli proteins.",
    "explore": "Draw a material assembled from two biological building blocks.",
    "why": "Bio-inspired engineering can combine functions rather than copy one organism exactly. Separate the manufacturing method from the final material’s job.",
    "related": [
      "mussel-mesh",
      "mollusc-cousins"
    ]
  },
  {
    "id": "lc-privacy",
    "category": "Inventions",
    "sourceKey": "lc",
    "question": "Can liquid crystals help a window switch its appearance?",
    "title": "Liquid-crystal technology can control a window’s transparency.",
    "text": "The same broad family of responsive materials used in displays also appears in switchable privacy glazing.",
    "explore": "Compare making a symbol visible with obscuring an entire pane.",
    "why": "A material’s response can be useful at very different sizes. Moving an idea from a display to architecture changes the task without abandoning the principle.",
    "related": [
      "lc-order",
      "white-led-color"
    ]
  },
  {
    "id": "angkor-living",
    "category": "Ancient ingenuity",
    "sourceKey": "angkor",
    "question": "Can people still live inside a famous archaeological park?",
    "title": "Angkor contains inhabited villages.",
    "text": "The protected landscape is also home to communities practicing agriculture, including rice cultivation.",
    "explore": "List the needs of residents alongside the needs of a monument.",
    "why": "Heritage protection involves living places as well as old stones. Design decisions must consider people who use the landscape every day.",
    "related": [
      "angkor-recovery",
      "dholavira-reservoirs"
    ]
  },
  {
    "id": "mussel-mesh",
    "category": "Nature",
    "sourceKey": "mussel",
    "question": "How can individual proteins become an adhesive network?",
    "title": "The engineered proteins assembled into dense fibrous meshes.",
    "text": "In the MIT study, the resulting hybrid structure bound to both dry and wet surfaces.",
    "explore": "Sketch small components joining into a larger interconnected sheet.",
    "why": "Performance can emerge from organization at more than one scale. Both the molecules and the network they form deserve attention.",
    "related": [
      "mussel-wet-glue",
      "mollusc-cousins"
    ]
  },
  {
    "id": "quartz-pressure",
    "category": "Inventions",
    "sourceKey": "quartz",
    "question": "Can squeezing a crystal produce an electrical signal?",
    "title": "Piezoelectric crystals develop charge under strain.",
    "text": "The Curie brothers demonstrated this pressure-related effect in 1880.",
    "explore": "Draw an input arrow labeled force and an output labeled electrical signal.",
    "why": "A sensor can translate a mechanical event into an electrical one. Identifying that conversion helps explain many devices without opening them.",
    "related": [
      "quartz-reverse",
      "inner-ear-loops"
    ]
  },
  {
    "id": "angkor-recovery",
    "category": "Ancient ingenuity",
    "sourceKey": "angkor",
    "question": "Can international cooperation change a heritage site’s prospects?",
    "title": "Angkor left the endangered World Heritage list in 2004.",
    "text": "Conservation involved Cambodian authorities and international coordination rather than one isolated repair.",
    "explore": "Map the different kinds of expertise needed to protect a whole site.",
    "why": "Preservation is a continuing systems task. Cooperation, maintenance, and shared standards can matter alongside the skill of an individual restorer.",
    "related": [
      "angkor-water",
      "dholavira-reservoirs"
    ]
  },
  {
    "id": "papilio-structure",
    "category": "Nature",
    "sourceKey": "butterfly",
    "question": "Can a butterfly’s green come from microscopic architecture?",
    "title": "Papilio wing scales contain light-reflecting multilayers.",
    "text": "Alternating cuticle and air layers contribute to structural color rather than relying only on colored pigment.",
    "explore": "Imagine producing color by rearranging clear material.",
    "why": "Appearance can depend on structure as well as chemical colorants. The arrangement of small parts can change how light returns to us.",
    "related": [
      "papilio-mixing",
      "butterfly-scales"
    ]
  },
  {
    "id": "quartz-reverse",
    "category": "Inventions",
    "sourceKey": "quartz",
    "question": "Can electricity make a crystal change shape?",
    "title": "The piezoelectric effect also works in reverse.",
    "text": "An applied electric field can strain a suitable crystal, allowing electrical energy to drive mechanical motion.",
    "explore": "Reverse the arrows on a sketch of a pressure sensor.",
    "why": "Some physical couplings are useful in both directions. One material may provide both a way to sense motion and a way to create it.",
    "related": [
      "quartz-radio",
      "inner-ear-loops"
    ]
  },
  {
    "id": "zimbabwe-granite",
    "category": "Ancient ingenuity",
    "sourceKey": "zimbabwe",
    "question": "What shaped the great walls of Great Zimbabwe?",
    "title": "Builders arranged cut granite in regular courses.",
    "text": "The Great Enclosure shows careful stone construction by the ancestors of the Shona people.",
    "explore": "Sketch a curved wall assembled from repeated stone courses.",
    "why": "Major engineering traditions developed in many regions. Giving builders proper credit begins with studying the actual evidence of their work.",
    "related": [
      "zimbabwe-daga",
      "gobekli-builders"
    ]
  },
  {
    "id": "papilio-mixing",
    "category": "Nature",
    "sourceKey": "butterfly",
    "question": "Can blue and yellow-green reflections look green together?",
    "title": "Papilio blumei mixes colors across tiny scale regions.",
    "text": "Microscopic centers and edges reflect different colors that combine in the wing’s appearance.",
    "explore": "Draw a large patch made of tiny regions with different colors.",
    "why": "What we see at one scale can combine details at a smaller scale. A single-looking color may contain a patterned mixture.",
    "related": [
      "papilio-copy",
      "white-led-color"
    ]
  },
  {
    "id": "quartz-radio",
    "category": "Inventions",
    "sourceKey": "quartz",
    "question": "What connects a crystal oscillator with radio broadcasting?",
    "title": "Quartz helped provide stable radio-frequency standards.",
    "text": "Its sharp resonance made it valuable for keeping transmitters close to their assigned frequencies.",
    "explore": "Imagine neighboring stations drifting across a frequency scale.",
    "why": "Communication requires shared references as well as messages. Stability can prevent one user’s signal from interfering with another’s.",
    "related": [
      "quartz-pressure",
      "gps-clocks"
    ]
  },
  {
    "id": "zimbabwe-daga",
    "category": "Ancient ingenuity",
    "sourceKey": "zimbabwe",
    "question": "Was every structure at Great Zimbabwe made from stone?",
    "title": "Its architecture combined stone with daga buildings.",
    "text": "Daga used granitic sand and clay; living spaces stood within stone enclosure walls.",
    "explore": "Design a settlement using different materials for different jobs.",
    "why": "A monumental wall can hide a more varied building tradition. Looking inside the enclosure reveals material choices made for everyday life.",
    "related": [
      "zimbabwe-patterns",
      "gobekli-builders"
    ]
  },
  {
    "id": "papilio-copy",
    "category": "Nature",
    "sourceKey": "butterfly",
    "question": "Can engineers recreate a butterfly’s optical trick with different materials?",
    "title": "Researchers made inorganic mimics of Papilio wing scales.",
    "text": "A 2010 study reproduced key color effects with shaped multilayers rather than rebuilding the whole biological wing.",
    "explore": "Copy the function of a structure while changing its ingredients.",
    "why": "A useful imitation does not have to duplicate every detail. Decide which behavior matters before choosing what to reproduce.",
    "related": [
      "papilio-structure",
      "polar-plastic"
    ]
  },
  {
    "id": "quartz-sonar",
    "category": "Inventions",
    "sourceKey": "quartz",
    "question": "What early practical job helped launch piezoelectric technology?",
    "title": "Underwater echo-ranging used piezoelectric transducers.",
    "text": "Work during World War I used crystals to send and receive sound for detecting submarines.",
    "explore": "Compare a device listening for an echo with one generating a pulse.",
    "why": "One conversion mechanism can link sensing and communication. Following its early use reveals how a scientific curiosity became a practical tool.",
    "related": [
      "quartz-reverse",
      "ultrasound-probe"
    ]
  },
  {
    "id": "zimbabwe-patterns",
    "category": "Ancient ingenuity",
    "sourceKey": "zimbabwe",
    "question": "Can a wall carry a pattern as well as a load?",
    "title": "Great Zimbabwe’s masonry includes chevrons and checks.",
    "text": "Decorative arrangements are built into the stonework rather than existing only as separate objects.",
    "explore": "Design a repeating wall pattern that uses the building units themselves.",
    "why": "Structure and expression can share the same material. A construction method can also become a visual language.",
    "related": [
      "zimbabwe-birds",
      "gobekli-builders"
    ]
  },
  {
    "id": "eink-particles",
    "category": "Inventions",
    "sourceKey": "eink",
    "question": "Does electronic paper move actual pigment?",
    "title": "Some e-paper uses charged black and white particles.",
    "text": "In E Ink’s two-particle system, tiny capsules hold pigments in a clear fluid.",
    "explore": "Sketch one capsule with dark and light particles at different depths.",
    "why": "An electronic image can still depend on physical material moving. “Digital” describes control and information, not the absence of moving matter.",
    "related": [
      "eink-field",
      "electric-imbalance"
    ]
  },
  {
    "id": "zimbabwe-birds",
    "category": "Ancient ingenuity",
    "sourceKey": "zimbabwe",
    "question": "What small sculptures connect with Great Zimbabwe’s monumental ruins?",
    "title": "Carved stone birds were found at the Hill Ruins.",
    "text": "Six upright steatite posts topped by birds came from an enclosure there; their role is interpreted as ritual.",
    "explore": "Imagine an archaeologist finding one symbol without its full context.",
    "why": "Material evidence can be clear while meaning remains partly uncertain. Keep what was found separate from what researchers infer about its purpose.",
    "related": [
      "zimbabwe-granite",
      "gobekli-builders"
    ]
  },
  {
    "id": "eink-field",
    "category": "Inventions",
    "sourceKey": "eink",
    "question": "How can a capsule change from a light spot to a dark one?",
    "title": "An electric field moves e-paper pigments toward the viewing side.",
    "text": "Which particles become visible determines the appearance of that region.",
    "explore": "Draw the same capsule under two opposite field directions.",
    "why": "A microscopic rearrangement can become a readable mark. The mechanism connects electric forces with a familiar printed-page appearance.",
    "related": [
      "eink-particles",
      "electric-imbalance"
    ]
  },
  {
    "id": "borobudur-geometry",
    "category": "Ancient ingenuity",
    "sourceKey": "borobudur",
    "question": "Can a monument change from squares to circles as you climb?",
    "title": "Borobudur combines square terraces and circular platforms.",
    "text": "Five concentric square terraces lead upward to three circular platforms and a crowning stupa.",
    "explore": "Sketch a transition between two geometric layouts.",
    "why": "Geometry can guide an experience through space. A change in plan can organize both movement and the meaning of a journey.",
    "related": [
      "borobudur-stupas",
      "regular-tilings"
    ]
  },
  {
    "id": "eink-memory",
    "category": "Inventions",
    "sourceKey": "einkbenefits",
    "question": "Can a display hold an image after its power is removed?",
    "title": "Bistable e-paper retains its displayed image.",
    "text": "The display needs energy to change the image, but not to keep that image in place; other device functions can still use power.",
    "explore": "Separate an image-holding budget from a device’s total energy budget.",
    "why": "A component’s energy use and a whole product’s energy use are different claims. Precise boundaries make an impressive property more useful.",
    "related": [
      "eink-field",
      "manchester-baby"
    ]
  },
  {
    "id": "borobudur-stupas",
    "category": "Ancient ingenuity",
    "sourceKey": "borobudur",
    "question": "How many small stupas surround Borobudur’s upper platforms?",
    "title": "Seventy-two openwork stupas encircle the platforms.",
    "text": "Each of these structures contains a Buddha statue.",
    "explore": "Arrange repeated units around three imaginary circular platforms.",
    "why": "Repeated components can create a large architectural whole. Think about how spacing and arrangement change the experience of repetition.",
    "related": [
      "borobudur-reliefs",
      "regular-tilings"
    ]
  },
  {
    "id": "eink-reflect",
    "category": "Inventions",
    "sourceKey": "einkbenefits",
    "question": "Why can electronic paper resemble ordinary paper in daylight?",
    "title": "Reflective e-paper uses light from its surroundings.",
    "text": "Its pigments reflect ambient light rather than requiring light to shine through from behind the image.",
    "explore": "Compare a lit sign with a printed sign under the same lamp.",
    "why": "A display can show information by reflecting light or producing it. The lighting environment becomes part of the reading experience.",
    "related": [
      "eink-particles",
      "lc-voltage"
    ]
  },
  {
    "id": "borobudur-reliefs",
    "category": "Ancient ingenuity",
    "sourceKey": "borobudur",
    "question": "Can a building’s surfaces become a vast illustrated story?",
    "title": "Borobudur’s reliefs cover about 2,500 square meters.",
    "text": "Carved panels decorate walls and balustrades throughout the monument.",
    "explore": "Design a path through a story told without a printed book.",
    "why": "Architecture can carry information as well as enclose space. A viewer’s movement can become part of how a story unfolds.",
    "related": [
      "borobudur-drainage",
      "regular-tilings"
    ]
  },
  {
    "id": "faraday-coils",
    "category": "Inventions",
    "sourceKey": "faraday",
    "question": "Can one wire coil influence another without a direct wire between them?",
    "title": "Faraday’s induction ring coupled two separate coils.",
    "text": "In 1831, changing current in one coil produced a brief current in the other through electromagnetic induction.",
    "explore": "Draw two circuits linked by a shared magnetic core.",
    "why": "A connection does not always require direct electrical contact. Looking for another physical coupling can explain an apparently disconnected response.",
    "related": [
      "faraday-cotton",
      "first-transistor"
    ]
  },
  {
    "id": "borobudur-drainage",
    "category": "Ancient ingenuity",
    "sourceKey": "borobudur",
    "question": "Why might restoring a temple require thinking about rainwater?",
    "title": "Borobudur’s restoration included drainage improvements.",
    "text": "Twentieth-century work largely reused original materials while also consolidating and protecting the monument.",
    "explore": "Add drainage paths to a drawing of stacked terraces.",
    "why": "Keeping a structure standing involves controlling what moves through it. Water management belongs in the story of conservation as well as original construction.",
    "related": [
      "angkor-water",
      "petra-water"
    ]
  },
  {
    "id": "faraday-cotton",
    "category": "Inventions",
    "sourceKey": "faraday",
    "question": "What links an early electrical breakthrough with cotton thread?",
    "title": "Faraday insulated his induction-ring coils with cotton.",
    "text": "The apparatus combined copper wire, an iron ring, and everyday insulating material.",
    "explore": "Give each material in a simple instrument a separate job.",
    "why": "An experiment depends on supporting materials as well as its famous principle. Keeping parts apart can be as important as joining them.",
    "related": [
      "faraday-coils",
      "first-transistor"
    ]
  },
  {
    "id": "faraday-motion",
    "category": "Inventions",
    "sourceKey": "generator",
    "question": "Can a moving magnet make current in a stationary coil?",
    "title": "Faraday demonstrated induction by moving a bar magnet.",
    "text": "A galvanometer registered current when he moved the magnet back and forth through the coil.",
    "explore": "Draw the moving part and the measuring part separately.",
    "why": "Motion can be converted into an electrical signal. Tracing the energy and the changing magnetic environment makes the connection visible.",
    "related": [
      "faraday-coils",
      "static-shock"
    ]
  },
  {
    "id": "generator-shared",
    "category": "Inventions",
    "sourceKey": "generator",
    "question": "What connects a wind turbine with a hydroelectric generator?",
    "title": "Both can use mechanical motion to generate electricity.",
    "text": "Different energy sources can drive generators based on electromagnetic induction.",
    "explore": "Draw several energy sources converging on one conversion step.",
    "why": "Different starting points can share the same underlying mechanism. Recognizing the common step makes a complicated energy system easier to compare.",
    "related": [
      "pv-electrons",
      "faraday-motion"
    ]
  }
];

export const hiddenConnectionFacts: HiddenConnection[] = drafts.map(draft => ({ ...draft, collection: 'hidden-connections', source: hiddenConnectionSources[draft.sourceKey].label, url: hiddenConnectionSources[draft.sourceKey].url }));
