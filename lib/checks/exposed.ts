import type { CheckResult } from "./types"

const SENSITIVE_PATHS: { path: string; label: string }[] = [
  { path: "/.env", label: ".env file" },
  { path: "/.env.local", label: ".env.local file" },
  { path: "/.env.production", label: ".env.production file" },
  { path: "/.git/config", label: "Git config" },
  { path: "/wp-config.php", label: "WordPress config" },
  { path: "/.DS_Store", label: ".DS_Store file" },
  { path: "/config.json", label: "config.json" },
  { path: "/database.yml", label: "database.yml" },
  { path: "/credentials.json", label: "credentials.json" },
]

export async function checkExposedFiles(url: string): Promise<CheckResult[]> {
  const base = new URL(url).origin

  const results = await Promise.allSettled(
    SENSITIVE_PATHS.map(async ({ path, label }) => {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 5000)

      try {
        const response = await fetch(`${base}${path}`, {
          redirect: "follow",
          signal: controller.signal,
        })
        clearTimeout(timer)

        const exposed = response.status === 200

        return {
          id: `exposed-${path.replace(/\W/g, "-")}`,
          name: `${label} exposed`,
          description: `Checks if ${label} is publicly accessible.`,
          severity: "critical" as const,
          status: exposed ? ("fail" as const) : ("pass" as const),
          detail: exposed
            ? `EXPOSED: ${base}${path} returned HTTP 200. This likely contains secrets. Remove it from your public directory immediately.`
            : `Not publicly accessible.`,
        }
      } catch {
        clearTimeout(timer)
        return {
          id: `exposed-${path.replace(/\W/g, "-")}`,
          name: `${label} exposed`,
          description: `Checks if ${label} is publicly accessible.`,
          severity: "critical" as const,
          status: "pass" as const,
          detail: "Not publicly accessible.",
        }
      }
    })
  )

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : {
          id: "exposed-unknown",
          name: "File exposure check",
          description: "Could not complete check.",
          severity: "critical" as const,
          status: "error" as const,
          detail: "Check failed.",
        }
  )
}
