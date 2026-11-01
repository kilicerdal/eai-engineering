export const studyReferences = {
  python: {
    title: "Python documentation: control flow and default arguments",
    url: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values",
    matches: /python|default argument|mutable default|range\(/i,
    facts: "A Python default argument is evaluated once when the function is defined. A mutable default can therefore retain changes across calls. A None sentinel with a new list created inside the function avoids sharing that default list. Python range excludes its stop value.",
  },
  plants: {
    title: "OpenStax Biology 2e: nutritional requirements of plants",
    url: "https://openstax.org/books/biology-2e/pages/31-1-nutritional-requirements-of-plants",
    matches: /photosynth|tree.*mass|dry mass|plant.*nutri|soil.*mineral/i,
    facts: "Plants take in atmospheric CO2 and incorporate its carbon into organic molecules. Soil minerals are essential but are not the main source of carbon in plant organic material. Roots absorb water from soil. Do not describe hydrogen from water as atmospheric nitrogen, or imply that ordinary trees directly absorb and fix N2. Do not add unsupported numerical composition tables.",
  },
  force: {
    title: "OpenStax College Physics 2e: Newton’s second law",
    url: "https://openstax.org/books/college-physics-2e/pages/4-3-newtons-second-law-of-motion-concept-of-a-system",
    matches: /newton|net force|frictionless|acceleration/i,
    facts: "For a constant-mass system in classical mechanics, the net external force equals mass times acceleration: F_net = m a. Acceleration points in the direction of net force. Net force is the vector sum, not necessarily the magnitude of one applied force. Use kilograms, meters per second squared, and newtons consistently.",
  },
  caching: {
    title: "AWS: database caching patterns",
    url: "https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/caching-patterns.html",
    matches: /cach|\bttl\b|read.through|write.through/i,
    facts: "In the described cache-aside pattern a hit returns cached data; a miss queries the database and populates the cache. An independent database write does not automatically update a cached copy. An entry can remain stale before expiration if not invalidated or updated. TTL alone does not guarantee immediate freshness. Write-through is a separate write policy. Do not claim that adding write-through or a read pattern automatically establishes linearizability under concurrency.",
  },
} as const;

export function getStudyReferenceContext(message: string, priorUserMessages: string[] = []): string {
  const topic = [...priorUserMessages.slice(-2), message].join("\n");
  const selected = Object.values(studyReferences).filter(source => source.matches.test(topic));
  if (!selected.length) return "";
  return `\nCURATED REFERENCE NOTES (provided by this application, not fetched live):\n${selected.map(source => `${source.title}\n${source.url}\n${source.facts}`).join("\n\n")}\nUse only relevant notes. Attribute a supported explanation to its reference and link it when useful. Do not claim these notes were retrieved by a live search or that they support unrelated statements.\n`;
}
