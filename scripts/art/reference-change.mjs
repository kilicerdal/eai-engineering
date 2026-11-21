/** A connection retry cannot acknowledge an editorial change. */
export function referenceChange(previous,nextHash){
 const baseline=previous?.comparisonBaselineHash??previous?.contentHash??null;
 return {comparisonBaselineHash:baseline,changed:!!previous?.changed||!!baseline&&baseline!==nextHash};
}
