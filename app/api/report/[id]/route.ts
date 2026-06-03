import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!prisma) return NextResponse.json({ error: "Database unavailable." }, { status: 503 })

  try {
    const report = await prisma.auditReport.findUnique({ where: { id } })
    if (!report) return NextResponse.json({ error: "Report not found." }, { status: 404 })
    return NextResponse.json(report.result)
  } catch {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 })
  }
}
