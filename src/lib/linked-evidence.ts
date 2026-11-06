export type CaptureSource = { repository: string; commit: string };
export type CheckoutCase = {
  id: string;
  requestStatuses: number[];
  orderCount: number;
  distinctSuccessfulOrderIdentities: number;
  stockBefore: number;
  stockAfter: number;
  stockReduction: number;
  cartCount: number;
  totalCents: number;
};
export type CheckoutCapture = {
  capturedAt: string;
  origin: string;
  backend: string;
  modelCalls: number;
  source: CaptureSource;
  cases: CheckoutCase[];
  reproduction: string;
  scope: string;
};
export type ClaimStage = {
  id: string;
  title: string;
  apiStatus: number;
  persistedClaims: number;
  storedAmount: number;
  acknowledgement: string;
  sameClaimAsFirst: boolean | null;
};
export type ClaimCapture = {
  capturedAt: string;
  origin: string;
  backend: string;
  simulator: string;
  modelCalls: number;
  realAWSCalls: number;
  source: CaptureSource;
  setup: string;
  stages: ClaimStage[];
  safety: string;
  reproduction: string;
};
export function checkedCheckout(capture: CheckoutCapture) {
  if (
    capture.origin !== "authored-synthetic-local-capture" ||
    capture.backend !== "postgres" ||
    capture.modelCalls !== 0 ||
    !/^[a-f0-9]{40}$/.test(capture.source.commit) ||
    capture.cases.length !== 3 ||
    capture.cases.some(
      (item) =>
        item.orderCount !== 1 ||
        item.stockBefore - item.stockAfter !== item.stockReduction ||
        item.cartCount !== 0,
    )
  )
    throw new Error("Invalid checkout capture");
  return capture.cases;
}
export function checkedClaims(capture: ClaimCapture) {
  if (
    capture.origin !== "authored-synthetic-local-capture" ||
    capture.backend !== "postgres" ||
    capture.simulator !== "Moto" ||
    capture.modelCalls !== 0 ||
    capture.realAWSCalls !== 0 ||
    !/^[a-f0-9]{40}$/.test(capture.source.commit) ||
    capture.stages.length !== 3 ||
    capture.stages.some((stage) => stage.persistedClaims !== 1) ||
    !capture.stages.find((stage) => stage.id === "redelivery")?.sameClaimAsFirst
  )
    throw new Error("Invalid claim redelivery capture");
  return capture.stages;
}
