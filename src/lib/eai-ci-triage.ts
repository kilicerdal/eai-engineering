/** Conservative first-pass checks. A matching log is evidence, not a proven root cause. */
export function triageCILog(log: string): string {
  const rules = [
    {pattern:/(?:returned|responded with|status(?: code)?\s*[:=]?)\s*401\b|HTTP(?:\/\d(?:\.\d)?)?\s+401\b/i, cause:"Missing, expired, or rejected authentication credentials.", check:"Check whether this CI job receives the intended credential and sends the expected authentication header. Inspect presence and expiry without printing the secret."},
    {pattern:/(?:returned|responded with|status(?: code)?\s*[:=]?)\s*403\b|HTTP(?:\/\d(?:\.\d)?)?\s+403\b/i, cause:"The identity may lack permission, or a policy may deny this request.", check:"Compare the CI identity's permissions and target environment with the required operation. A 403 alone does not prove which policy denied access."},
    {pattern:/ECONNREFUSED/, cause:"The target service may not be listening at the configured host and port.", check:"Check the service health and host/port from the same CI container before rerunning the failing request."},
    {pattern:/ENOTFOUND|EAI_AGAIN/, cause:"Hostname configuration or DNS resolution may be failing.", check:"Resolve the configured hostname from the CI runner and compare it with the intended environment."},
    {pattern:/locator\.click.*(?:timed out|timeout)|Timeout.*locator\.click/i, cause:"The target may not match, be visible, stable, enabled, or receive pointer events.", check:"Open the Playwright trace or action log for that click and identify the first unmet actionability condition before changing timeouts."},
    {pattern:/Cannot find module|ModuleNotFoundError/, cause:"A dependency or import path may differ in CI.", check:"Compare the missing module name with the lockfile, install step, working directory, and case-sensitive import path."},
  ];
  const lines=log.split(/\r?\n/).filter(line=>line.trim());
  const matches=rules.flatMap(rule=>{const line=lines.find(line=>rule.pattern.test(line));return line?[{...rule,line}]:[];}).slice(0,3);
  if (!matches.length) return "**More evidence needed**\n\nNo supported failure signature was identified. Share the first failing command, its error line, and the nearby output with secrets removed. A job's final exit code alone does not identify the cause.";
  return "**CI log first-pass checks**\n\nThese checks use the pasted lines only; they do not inspect your repository or prove a root cause.\n\n"+matches.map(({line,cause,check})=>`**Observed line**\n\n${line.slice(0,500).replace(/[\\`*_{}\[\]<>#!|]/g, "\\$&")}\n\n**Possible cause:** ${cause}\n\n**Verify next:** ${check}`).join("\n\n---\n\n");
}
