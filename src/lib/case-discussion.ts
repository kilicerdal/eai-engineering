import checkout from "../../public/evidence/checkout-scenarios.json";
import claims from "../../public/evidence/claim-redelivery.json";

const replay = checkout.cases.find(item => item.id === "replay")!;
const redelivery = claims.stages.find(item => item.id === "redelivery")!;
export const caseDiscussions = {
  "order-once": {
    title: "Checkout retry",
    question: "What happens when this checkout request is repeated?",
    result: `A repeated checkout returned HTTP ${replay.requestStatuses.join(" then ")}. PostgreSQL recorded ${replay.orderCount} order. Stock went from ${replay.stockBefore} to ${replay.stockAfter}.`,
    scope: checkout.scope,
    source: "/evidence/checkout-scenarios.json",
  },
  "claim-twice": {
    title: "Claim redelivery",
    question: "What happened when the simulated claim was delivered again?",
    result: `After the injected acknowledgement failure, redelivery returned HTTP ${redelivery.apiStatus}. The database held ${redelivery.persistedClaims} claim with the original amount of ${redelivery.storedAmount}.`,
    scope: claims.setup,
    source: "/evidence/claim-redelivery.json",
  },
};
export type CaseName = keyof typeof caseDiscussions;
