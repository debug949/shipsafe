"use client"

import { useState } from "react"
import type { AuditResult, CheckResult, Severity } from "@/lib/checks/types"

const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
}

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: "text-red-400 bg-red-400/10 border-red-400/20",
  high: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  low: "text-blue-400 bg-blue-400/10 border-blue-400/20",
}

const STATUS_ICON: Record<CheckResult["status"], string> = {
  pass: "✓",
  fail: "✗",
  warn: "⚠",
  error: "?",
}

const STATUS_COLOR: Record<CheckResult["status"], string> = {
  pass: "text-emerald-400",
  fail: "text-red-400",
  warn: "text-yellow-400",
  error: "text-zinc-400",
}

const GRADE_COLOR: Record<AuditResult["grade"], string> = {
  A: "text-emerald-400",
  B: "text-green-400",
  C: "text-yellow-400",
  D: "text-orange-400",
  F: "text-red-400",
}

function ScoreRing({ score, grade }: { score: number; grade: AuditResult["grade"] }) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          className={GRADE_COLOR[grade]}
        />
        <text x="50" y="46" textAnchor="middle" className="fill-white" fontSize="20" fontWeight="bold">
          {score}
        </text>
        <text x="50" y="62" textAnchor="middle" className="fill-zinc-400" fontSize="11">
          / 100
        </text>
      </svg>
      <span className={`text-4xl font-bold ${GRADE_COLOR[grade]}`}>{grade}</span>
    </div>
  )
}

function CheckRow({ check }: { check: CheckResult }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-800 last:border-0">
      <span className={`mt-0.5 text-lg font-bold w-5 shrink-0 ${STATUS_COLOR[check.status]}`}>
        {STATUS_ICON[check.status]}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-zinc-100">{check.name}</span>
          <span
            className={`text-xs px-1.5 py-0.5 rounded border font-medium ${SEVERITY_COLOR[check.severity]}`}
          >
            {SEVERITY_LABEL[check.severity]}
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">{check.description}</p>
        {check.detail && check.status !== "pass" && (
          <p className="text-xs text-zinc-500 mt-1 font-mono break-words">{check.detail}</p>
        )}
      </div>
    </div>
  )
}

export function AuditResults({ result, reportId }: { result: AuditResult; reportId?: string | null }) {
  const [copied, setCopied] = useState(false)
  const failedChecks = result.checks.filter((c) => c.status === "fail")
  const passedChecks = result.checks.filter((c) => c.status === "pass")
  const otherChecks = result.checks.filter((c) => c.status === "warn" || c.status === "error")

  function copyShareLink() {
    if (!reportId) return
    const url = `${window.location.origin}/report/${reportId}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Audited</p>
            <p className="text-zinc-200 font-mono text-sm break-all">{result.url}</p>
            <p className="text-xs text-zinc-600 mt-1">
              {new Date(result.scannedAt).toLocaleString()}
            </p>
            {reportId && (
              <button
                onClick={copyShareLink}
                className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {copied ? "✓ Copied!" : "🔗 Copy share link"}
              </button>
            )}
          </div>
          <ScoreRing score={result.score} grade={result.grade} />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="rounded-lg bg-zinc-800 p-3 text-center">
            <div className="text-2xl font-bold text-emerald-400">{result.summary.passed}</div>
            <div className="text-xs text-zinc-400 mt-0.5">Passed</div>
          </div>
          <div className="rounded-lg bg-zinc-800 p-3 text-center">
            <div className="text-2xl font-bold text-red-400">{result.summary.failed}</div>
            <div className="text-xs text-zinc-400 mt-0.5">Failed</div>
          </div>
          <div className="rounded-lg bg-zinc-800 p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {result.summary.warnings + result.summary.errors}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">Warnings</div>
          </div>
        </div>

        {result.pagespeed?.score != null && (
          <div className="mt-4 rounded-lg bg-zinc-800 p-4">
            <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Performance (mobile)</p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`text-2xl font-bold ${result.pagespeed.score >= 90 ? "text-emerald-400" : result.pagespeed.score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                {result.pagespeed.score}
              </span>
              <div className="flex gap-4 text-xs text-zinc-400">
                {result.pagespeed.lcp && <span>LCP: <span className="text-zinc-200">{result.pagespeed.lcp}</span></span>}
                {result.pagespeed.fcp && <span>FCP: <span className="text-zinc-200">{result.pagespeed.fcp}</span></span>}
                {result.pagespeed.cls && <span>CLS: <span className="text-zinc-200">{result.pagespeed.cls}</span></span>}
              </div>
            </div>
          </div>
        )}
      </div>

      {result.synthesis && (
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-5 space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">AI Analysis</span>
            <span className="text-xs text-zinc-600">powered by Groq</span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">{result.synthesis.summary}</p>

          {result.synthesis.shareLine && (
            <div className="rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2.5 text-xs text-zinc-400 font-mono">
              {result.synthesis.shareLine}
            </div>
          )}

          {result.synthesis.topRisks?.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Top Risks</p>
              {result.synthesis.topRisks.map((risk, i) => (
                <div key={i} className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-zinc-200">{risk.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${
                      risk.severity === "critical" ? "text-red-400 bg-red-400/10 border-red-400/20" :
                      risk.severity === "high" ? "text-orange-400 bg-orange-400/10 border-orange-400/20" :
                      "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                    }`}>{risk.severity}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{risk.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {result.synthesis.fixes?.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Prioritized Fixes</p>
              {result.synthesis.fixes.map((fix, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-zinc-800 last:border-0">
                  <span className="text-xs font-bold text-zinc-600 w-5 shrink-0 mt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-medium text-zinc-200">{fix.title}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded border ${
                        fix.effort === "low" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" :
                        fix.effort === "medium" ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" :
                        "text-red-400 bg-red-400/10 border-red-400/20"
                      }`}>{fix.effort} effort</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-mono break-words">{fix.action}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {failedChecks.length > 0 && (
        <div className="rounded-xl border border-red-900/40 bg-zinc-900 p-5">
          <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">
            Failed ({failedChecks.length})
          </h2>
          {failedChecks.map((c) => (
            <CheckRow key={c.id} check={c} />
          ))}
        </div>
      )}

      {otherChecks.length > 0 && (
        <div className="rounded-xl border border-yellow-900/40 bg-zinc-900 p-5">
          <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3">
            Warnings ({otherChecks.length})
          </h2>
          {otherChecks.map((c) => (
            <CheckRow key={c.id} check={c} />
          ))}
        </div>
      )}

      {passedChecks.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Passed ({passedChecks.length})
          </h2>
          {passedChecks.map((c) => (
            <CheckRow key={c.id} check={c} />
          ))}
        </div>
      )}
    </div>
  )
}
