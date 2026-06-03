export type Severity = "critical" | "high" | "medium" | "low"
export type CheckStatus = "pass" | "fail" | "warn" | "error"

export interface CheckResult {
  id: string
  name: string
  description: string
  severity: Severity
  status: CheckStatus
  detail?: string
}

export interface AISynthesis {
  summary: string
  topRisks: {
    title: string
    explanation: string
    severity: "critical" | "high" | "medium"
  }[]
  fixes: {
    title: string
    action: string
    effort: "low" | "medium" | "high"
    severity: "critical" | "high" | "medium" | "low"
  }[]
  shareLine: string
}

export interface PageSpeedData {
  score: number | null
  lcp: string | null
  cls: string | null
  fcp: string | null
  raw: Record<string, unknown>
}

export interface AuditResult {
  url: string
  score: number
  grade: "A" | "B" | "C" | "D" | "F"
  scannedAt: string
  checks: CheckResult[]
  summary: {
    passed: number
    failed: number
    warnings: number
    errors: number
  }
  pagespeed?: PageSpeedData
  synthesis?: AISynthesis
}
