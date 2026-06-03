import type { CheckResult } from "./types"

const LEAKY_HEADERS = ["x-powered-by", "server", "x-aspnet-version", "x-aspnetmvc-version"]

export async function checkDisclosure(url: string): Promise<CheckResult[]> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(url, { redirect: "follow", signal: controller.signal })
    clearTimeout(timer)

    const leaks: string[] = []

    for (const header of LEAKY_HEADERS) {
      const val = response.headers.get(header)
      if (val) leaks.push(`${header}: ${val}`)
    }

    return [
      {
        id: "info-disclosure",
        name: "Server Information Disclosure",
        description: "Server should not reveal technology stack via response headers.",
        severity: "low",
        status: leaks.length === 0 ? "pass" : "fail",
        detail:
          leaks.length === 0
            ? "No technology stack headers found."
            : `Leaking: ${leaks.join(", ")}. Remove these headers to avoid fingerprinting.`,
      },
    ]
  } catch {
    return [
      {
        id: "info-disclosure",
        name: "Server Information Disclosure",
        description: "Server should not reveal technology stack via response headers.",
        severity: "low",
        status: "error",
        detail: "Could not check headers.",
      },
    ]
  }
}
