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
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            ← Audit another site
          </Link>
          <span className="text-xs text-zinc-600 font-mono">{id}</span>
        </div>
        <AuditResults result={result} reportId={id} />
      </div>
    </main>
  )
}
