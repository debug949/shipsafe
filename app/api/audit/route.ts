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

    const failedChecks = result.checks.filter((c) => c.status === "fail")

    // AI synthesis — fails silently
    const synthesis = await synthesizeAudit(
      result.url, result.score, result.grade, failedChecks
    ).catch(() => null)

    const finalResult = { ...result, synthesis: synthesis ?? undefined }

    // DB save — fails silently if DATABASE_URL not set or connection fails
    let reportId: string | null = null
    try {
      if (prisma) {
        const report = await prisma.auditReport.create({
          data: { url: finalResult.url, result: finalResult as object },
        })
        reportId = report.id
      }
    } catch {
      // No DB — continue without share link
    }

    return NextResponse.json({ ...finalResult, reportId })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Audit failed."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
