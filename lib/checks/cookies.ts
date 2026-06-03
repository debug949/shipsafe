import type { CheckResult } from "./types"

export async function checkCookies(url: string): Promise<CheckResult[]> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(url, { redirect: "follow", signal: controller.signal })
    clearTimeout(timer)

    const setCookie = response.headers.get("set-cookie")

    if (!setCookie) {
      return [
        {
          id: "cookie-secure",
          name: "Cookie Security",
          description: "Cookies are set with Secure, HttpOnly, and SameSite flags.",
          severity: "medium",
          status: "pass",
          detail: "No cookies set on this response.",
        },
      ]
    }

    const results: CheckResult[] = []
    const cookieStr = setCookie.toLowerCase()

    results.push({
      id: "cookie-secure",
      name: "Cookie Secure Flag",
      description: "Cookies should have the Secure flag to prevent transmission over HTTP.",
      severity: "high",
      status: cookieStr.includes("secure") ? "pass" : "fail",
      detail: cookieStr.includes("secure")
        ? "Secure flag present."
        : "Missing Secure flag. Cookies can be sent over unencrypted HTTP.",
    })

    results.push({
      id: "cookie-httponly",
      name: "Cookie HttpOnly Flag",
      description: "Cookies should have HttpOnly to prevent JavaScript access.",
      severity: "high",
      status: cookieStr.includes("httponly") ? "pass" : "fail",
      detail: cookieStr.includes("httponly")
        ? "HttpOnly flag present."
        : "Missing HttpOnly flag. JavaScript can read these cookies (XSS risk).",
    })

    results.push({
      id: "cookie-samesite",
      name: "Cookie SameSite Flag",
      description: "Cookies should have SameSite to prevent CSRF attacks.",
      severity: "medium",
      status: cookieStr.includes("samesite") ? "pass" : "fail",
      detail: cookieStr.includes("samesite")
        ? "SameSite flag present."
        : "Missing SameSite flag. Site may be vulnerable to cross-site request forgery.",
    })

    return results
  } catch {
    return [
      {
        id: "cookie-secure",
        name: "Cookie Security",
        description: "Cookies are set with Secure, HttpOnly, and SameSite flags.",
        severity: "medium",
        status: "error",
        detail: "Could not check cookies.",
      },
    ]
  }
}
