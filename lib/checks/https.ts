import type { CheckResult } from "./types"

export async function checkHttps(url: string): Promise<CheckResult[]> {
  const parsed = new URL(url)
  const results: CheckResult[] = []

  results.push({
    id: "https-protocol",
    name: "HTTPS Enabled",
    description: "Site is served over HTTPS, encrypting data in transit.",
    severity: "critical",
    status: parsed.protocol === "https:" ? "pass" : "fail",
    detail:
      parsed.protocol === "https:"
        ? "Site uses HTTPS."
        : "Site is served over HTTP. Attackers can intercept traffic.",
  })

  if (parsed.protocol === "https:") {
    const httpUrl = url.replace("https://", "http://")
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 5000)
      const response = await fetch(httpUrl, {
        redirect: "manual",
        signal: controller.signal,
      })
      clearTimeout(timer)

      const location = response.headers.get("location") ?? ""
      const redirectsToHttps =
        response.status >= 300 &&
        response.status < 400 &&
        location.startsWith("https://")

      results.push({
        id: "https-redirect",
        name: "HTTP → HTTPS Redirect",
        description: "HTTP requests are automatically redirected to HTTPS.",
        severity: "high",
        status: redirectsToHttps ? "pass" : "fail",
        detail: redirectsToHttps
          ? "HTTP correctly redirects to HTTPS."
          : "HTTP version does not redirect to HTTPS. Users who type the URL without https:// get an insecure connection.",
      })
    } catch {
      results.push({
        id: "https-redirect",
        name: "HTTP → HTTPS Redirect",
        description: "HTTP requests are automatically redirected to HTTPS.",
        severity: "high",
        status: "warn",
        detail: "Could not verify HTTP redirect (connection refused or timed out).",
      })
    }
  }

  return results
}
