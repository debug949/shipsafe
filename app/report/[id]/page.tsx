import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { AuditResults } from "@/components/AuditResults"
import type { AuditResult } from "@/lib/checks/types"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params

  let result: AuditResult | null = null

  try {
    const report = await prisma.auditReport.findUnique({ where: { id } })
    if (!report) notFound()
    result = report.result as unknown as AuditResult
  } catch {
    notFound()
  }

  if (!result) notFound()

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", textDecoration: "none", letterSpacing: "-0.01em" }}>
            ShipSafe
          </Link>
          <Link href="/" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
            ← New audit
          </Link>
        </div>
      </header>
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px 80px" }}>
        <AuditResults result={result} reportId={id} />
      </main>
    </div>
  )
}
