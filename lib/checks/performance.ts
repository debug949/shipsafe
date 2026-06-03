import type { CheckResult } from "./types"

interface PageSpeedResult {
  score: number | null
  lcp: string | null
  cls: string | null
  fcp: string | null
  raw: Record<string, unknown>
}

export async function checkPerformance(url: string): Promise<{
  checks: CheckResult[]
  pagespeed: PageSpeedResult | null
}> {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile${apiKey ? `&key=${apiKey}` : ""}`

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 20000)
    const response = await fetch(endpoint, { signal: controller.signal })
    clearTimeout(timer)

    if (!response.ok) {
      return { checks: [], pagespeed: null }
    }

    const data = await response.json()
    const categories = data?.lighthouseResult?.categories
    const audits = data?.lighthouseResult?.audits

    const score = categories?.performance?.score != null
      ? Math.round(categories.performance.score * 100)
      : null

    const lcp = audits?.["largest-contentful-paint"]?.displayValue ?? null
    const cls = audits?.["cumulative-layout-shift"]?.displayValue ?? null
    const fcp = audits?.["first-contentful-paint"]?.displayValue ?? null

    const pagespeed: PageSpeedResult = { score, lcp, cls, fcp, raw: {} }

    const checks: CheckResult[] = []

    if (score !== null) {
      checks.push({
        id: "perf-score",
        name: "Performance Score",
        description: "Google PageSpeed performance score (mobile).",
        severity: "medium",
        status: score >= 90 ? "pass" : score >= 50 ? "warn" : "fail",
        detail: `Score: ${score}/100${lcp ? ` · LCP: ${lcp}` : ""}${cls ? ` · CLS: ${cls}` : ""}${fcp ? ` · FCP: ${fcp}` : ""}`,
      })
    }

    return { checks, pagespeed }
  } catch {
    return { checks: [], pagespeed: null }
  }
}
