import { checkHeaders } from "./headers"
import { checkHttps } from "./https"
import { checkExposedFiles } from "./exposed"
import { checkCookies } from "./cookies"
import { checkDisclosure } from "./disclosure"
import { checkPerformance } from "./performance"
import type { AuditResult, CheckResult, Severity } from "./types"

export type { AuditResult, CheckResult } from "./types"

const SEVERITY_PENALTY: Record<Severity, number> = {
  critical: 30,
  high: 20,
  medium: 10,
  low: 5,
}

function scoreGrade(score: number): AuditResult["grade"] {
  if (score >= 90) return "A"
  if (score >= 75) return "B"
  if (score >= 55) return "C"
  if (score >= 35) return "D"
  return "F"
}

function computeScore(checks: CheckResult[]): number {
  let score = 100
  for (const check of checks) {
    if (check.status === "fail") score -= SEVERITY_PENALTY[check.severity]
    if (check.status === "warn") score -= Math.floor(SEVERITY_PENALTY[check.severity] / 2)
  }
  return Math.max(0, Math.min(100, score))
}

export async function runAudit(url: string): Promise<AuditResult> {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`

  const [
    httpsChecks,
    headerChecks,
    exposedChecks,
    cookieChecks,
    disclosureChecks,
    { checks: perfChecks, pagespeed },
  ] = await Promise.all([
    checkHttps(normalizedUrl),
    checkHeaders(normalizedUrl),
    checkExposedFiles(normalizedUrl),
    checkCookies(normalizedUrl),
    checkDisclosure(normalizedUrl),
    checkPerformance(normalizedUrl),
  ])

  const checks = [
    ...httpsChecks,
    ...headerChecks,
    ...exposedChecks,
    ...cookieChecks,
    ...disclosureChecks,
    ...perfChecks,
  ]

  const score = computeScore(checks)

  const summary = {
    passed: checks.filter((c) => c.status === "pass").length,
    failed: checks.filter((c) => c.status === "fail").length,
    warnings: checks.filter((c) => c.status === "warn").length,
    errors: checks.filter((c) => c.status === "error").length,
  }

  return {
    url: normalizedUrl,
    score,
    grade: scoreGrade(score),
    scannedAt: new Date().toISOString(),
    checks,
    summary,
    pagespeed: pagespeed ?? undefined,
  }
}
