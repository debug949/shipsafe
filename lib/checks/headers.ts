import type { CheckResult, Severity } from "./types"

const SECURITY_HEADERS: {
  header: string
  id: string
  name: string
  description: string
  severity: Severity
  tip: string
}[] = [
  {
    header: "strict-transport-security",
    id: "hsts",
    name: "Strict-Transport-Security (HSTS)",
    description: "Forces browsers to use HTTPS for all future requests.",
    severity: "high",
    tip: 'Add: Strict-Transport-Security: max-age=63072000; includeSubDomains; preload',
  },
  {
    header: "content-security-policy",
    id: "csp",
    name: "Content-Security-Policy",
    description: "Restricts which resources the browser can load, blocking XSS attacks.",
    severity: "high",
    tip: "Add a Content-Security-Policy header to restrict script and resource sources.",
  },
  {
    header: "x-frame-options",
    id: "x-frame-options",
    name: "X-Frame-Options",
    description: "Prevents your site from being embedded in iframes (clickjacking protection).",
    severity: "medium",
    tip: 'Add: X-Frame-Options: DENY or X-Frame-Options: SAMEORIGIN',
  },
  {
    header: "x-content-type-options",
    id: "x-content-type-options",
    name: "X-Content-Type-Options",
    description: "Stops browsers from guessing file types, preventing MIME-type attacks.",
    severity: "medium",
    tip: "Add: X-Content-Type-Options: nosniff",
  },
  {
    header: "referrer-policy",
    id: "referrer-policy",
    name: "Referrer-Policy",
    description: "Controls how much referrer info is sent with requests.",
    severity: "low",
    tip: "Add: Referrer-Policy: strict-origin-when-cross-origin",
  },
  {
    header: "permissions-policy",
    id: "permissions-policy",
    name: "Permissions-Policy",
    description: "Restricts which browser features (camera, mic, location) the page can use.",
    severity: "low",
    tip: "Add: Permissions-Policy: geolocation=(), microphone=(), camera=()",
  },
]

export async function checkHeaders(url: string): Promise<CheckResult[]> {
  let responseHeaders: Headers

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
    })
    clearTimeout(timer)
    responseHeaders = response.headers
  } catch (err) {
    return SECURITY_HEADERS.map((h) => ({
      id: h.id,
      name: h.name,
      description: h.description,
      severity: h.severity,
      status: "error" as const,
      detail: "Could not connect to the site to check headers.",
    }))
  }

  return SECURITY_HEADERS.map((h) => {
    const value = responseHeaders.get(h.header)
    return {
      id: h.id,
      name: h.name,
      description: h.description,
      severity: h.severity,
      status: value ? "pass" : "fail",
      detail: value ? `Present: ${value}` : h.tip,
    }
  })
}
