import { getAIProvider } from "./index"
import type { CheckResult } from "@/lib/checks/types"

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

const SYSTEM_PROMPT = `You are a web security expert. Analyze the failed security checks for a website and return a JSON object with exactly these fields:
- summary: 2-3 plain-English sentences explaining the overall security posture
- topRisks: array of up to 3 objects { title, explanation, severity } — most critical risks only
- fixes: array of objects { title, action, effort, severity } sorted by priority (critical first, then by effort=low first) — one fix per failed check
- shareLine: single sentence like "example.com scored F — missing HSTS, CSP, and has exposed .env files"

Return only valid JSON. No markdown. No explanation outside the JSON.`

export async function synthesizeAudit(
  url: string,
  score: number,
  grade: string,
  failedChecks: CheckResult[]
): Promise<AISynthesis | null> {
  if (failedChecks.length === 0) return null
  if (!process.env.GROK_API_KEY) return null

  try {
    const ai = getAIProvider()

    const userMessage = `Site: ${url}
Score: ${score}/100 (Grade ${grade})
Failed checks:
${failedChecks.map((c) => `- ${c.name} [${c.severity}]: ${c.detail ?? c.description}`).join("\n")}

Return JSON only.`

    const raw = await ai.complete([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ])

    // Strip any accidental markdown fences
    const cleaned = raw.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim()
    return JSON.parse(cleaned) as AISynthesis
  } catch {
    return null // Never break the audit if AI fails
  }
}
