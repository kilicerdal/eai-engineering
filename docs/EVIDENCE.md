# Evidence provenance

Documentation review: **2026-11-17**. This date records a documentation/source review, not a rerun of every example.

## Read the labels

- **Current CI** means the workflow outcome for the specific commit shown in Actions. A moving badge is not an immutable release record.
- **Recorded local** means a saved execution under its original environment and date; a screenshot never reruns itself.
- **Historical release** means evidence for an older version. Its count and dependency versions must not be rewritten to resemble current CI.
- **Authored / deterministic** means an intentionally specified scenario or fixture. It is not a newly generated model output.
- **Recorded model experiment** means calls made under the saved protocol; it does not prove live provider availability or general accuracy.

[Current Actions runs](https://github.com/kilicerdal/eai-engineering/actions?query=branch%3Amain) · [Reviewer journey](REVIEWER_GUIDE.md) · [Supported setup](MAINTENANCE.md).

## Recorded evidence inventory

| Item | Label and scope | Inspect |
|---|---|---|
| Claim Twice | Recorded synthetic API/PostgreSQL/Moto capture, November 6, 2026, source `b175a55d882658583e617a95b4a8631b87fd069a`; no real AWS/model calls | [Source record](../public/evidence/claim-redelivery.json) |
| Order Once | Recorded synthetic PostgreSQL checkout capture, November 6, 2026, source `1ddd99a55c7e6b6a7ca4859662b05b26267a6b73` | [Source record](../public/evidence/checkout-scenarios.json) |
| SettlementLab V3.0 case | Historical execution bundle; source revision and dirty state live in its manifest | [Bundle](../public/evidence/showcase-v30.json) |
| SettlementLab V2.2 image in README | Historical presentation image; not the V3.0 execution result | [Image](../public/images/engineering/settlementlab-v22.png) |
| Website quality/browser checks | Current per-commit local-build CI; does not retest the source reference systems | [Workflows](../.github/workflows) |
| Production monitor | Read-only deployed-site checks; skipped unrelated statuses are not uptime measurements | [Monitor contract](BROWSER_MONITORING.md) |

The website presents those records; clicking a story does not rerun its reference application. Follow each record's source pin and reproduce in that repository. Dated local review documents describe their own revision and are not live feature guarantees.

## Immutable documentation snapshot

[Files as reviewed at `c8cd07bbdcc6`](https://github.com/kilicerdal/eai-engineering/tree/c8cd07bbdcc67bd53af66742bf6df5bfd16e71bb). This identifies the containing source snapshot, not an inferred capture commit. Historical artifacts are preserved unchanged.
