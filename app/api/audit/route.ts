import { NextRequest, NextResponse } from "next/server"
import { runAudit } from "@/lib/checks"
import { prisma } from "@/lib/db"
import { synthesizeAudit } from "@/lib/ai/synthesize"

export const maxDuration = 45

export async function POST(req: NextRequest) {
  let body: { url?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const { url } = body

  if (!url || typeof url !== "string" || url.trim() === "") {
    return NextResponse.json({ error: "URL is required." }, { status: 400 })
  }

  const trimmed = url.trim()

  try {
    new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`)
  } catch {
    return NextResponse.json({ error: "Invalid URL format." }, { status: 400 })
  }

  try {
    const result = await runAudit(trimmed)

    // Run AI synthesis in parallel with DB save — both fail silently
    const failedChecks = result.checks.filter((c) => c.status === "fail")
    const [synthesis, reportId] = await Promise.all([
      synthesizeAudit(result.url, result.score, result.grade, failedChecks),
      prisma.auditReport
        .create({ data: { url: result.url, result: result as object } })
        .then((r) => r.id)
        .catch(() => null),
    ])

    const finalResult = { ...result, synthesis: synthesis ?? undefined }

    // Update saved report with synthesis included
    if (reportId) {
      await prisma.auditReport
        .update({ where: { id: reportId }, data: { result: finalResult as object } })
        .catch(() => null)
    }

    return NextResponse.json({ ...finalResult, reportId })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Audit failed."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
