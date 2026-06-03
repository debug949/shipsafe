"use client"

import { useState } from "react"
import type { AuditResult, CheckResult, Severity } from "@/lib/checks/types"

// ── Helpers ──────────────────────────────────────────────────────────────────

const GRADE_COLOR: Record<AuditResult["grade"], string> = {
  A: "var(--green)",
  B: "#57ab5a",
  C: "var(--yellow)",
  D: "var(--orange)",
  F: "var(--red)",
}

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: "var(--red)",
  high:     "var(--orange)",
  medium:   "var(--yellow)",
  low:      "var(--text-muted)",
}

const EFFORT_COLOR: Record<string, string> = {
  low:    "var(--green)",
  medium: "var(--yellow)",
  high:   "var(--red)",
}

function StatusDot({ status }: { status: CheckResult["status"] }) {
  const color =
    status === "pass"  ? "var(--green)"  :
    status === "fail"  ? "var(--red)"    :
    status === "warn"  ? "var(--yellow)" : "var(--text-dim)"

  const label = status === "pass" ? "✓" : status === "fail" ? "✗" : status === "warn" ? "!" : "?"

  return (
    <span style={{ color, fontWeight: 700, fontSize: 13, fontFamily: "monospace", minWidth: 14, display: "inline-block" }}>
      {label}
    </span>
  )
}

function Tag({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "1px 7px",
      border: `1px solid ${color}40`,
      borderRadius: 4,
      fontSize: 11,
      color,
      fontWeight: 500,
      whiteSpace: "nowrap",
    }}>
      {text}
    </span>
  )
}

// ── Check row ─────────────────────────────────────────────────────────────────

function CheckRow({ check }: { check: CheckResult }) {
  const [open, setOpen] = useState(false)
  const hasDetail = check.status !== "pass" && !!check.detail

  return (
    <>
      <tr
        onClick={() => hasDetail && setOpen((v) => !v)}
        style={{
          borderBottom: "1px solid var(--border-muted)",
          cursor: hasDetail ? "pointer" : "default",
        }}
      >
        <td style={{ padding: "8px 12px 8px 0", width: 20 }}>
          <StatusDot status={check.status} />
        </td>
        <td style={{ padding: "8px 12px 8px 0", fontSize: 13, color: "var(--text)", lineHeight: 1.4 }}>
          {check.name}
        </td>
        <td style={{ padding: "8px 12px 8px 0", width: 80 }}>
          <Tag text={check.severity} color={SEVERITY_COLOR[check.severity]} />
        </td>
        <td style={{ padding: "8px 0", width: 16, textAlign: "right", color: "var(--text-dim)", fontSize: 11 }}>
          {hasDetail && (open ? "▲" : "▼")}
        </td>
      </tr>
      {open && hasDetail && (
        <tr style={{ borderBottom: "1px solid var(--border-muted)" }}>
          <td />
          <td colSpan={3} style={{ padding: "4px 0 12px", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-geist-mono), monospace", lineHeight: 1.6 }}>
            {check.detail}
          </td>
        </tr>
      )}
    </>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function AuditResults({ result, reportId }: { result: AuditResult; reportId?: string | null }) {
  const [copied, setCopied] = useState(false)

  const failed  = result.checks.filter((c) => c.status === "fail")
  const warned  = result.checks.filter((c) => c.status === "warn")
  const passed  = result.checks.filter((c) => c.status === "pass")
  const [showPassed, setShowPassed] = useState(false)

  function copyLink() {
    if (!reportId) return
    navigator.clipboard.writeText(`${window.location.origin}/report/${reportId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>

      {/* ── Score header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: GRADE_COLOR[result.grade], letterSpacing: "-0.03em", lineHeight: 1 }}>
              {result.score}
            </span>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>/100</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: GRADE_COLOR[result.grade], letterSpacing: "-0.02em" }}>
              {result.grade}
            </span>
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-geist-mono), monospace" }}>
            {result.url}
          </p>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--text-dim)" }}>
            {new Date(result.scannedAt).toLocaleString()} ·{" "}
            <span style={{ color: "var(--green)" }}>{result.summary.passed} passed</span>
            {result.summary.failed > 0 && <> · <span style={{ color: "var(--red)" }}>{result.summary.failed} failed</span></>}
            {result.summary.warnings > 0 && <> · <span style={{ color: "var(--yellow)" }}>{result.summary.warnings} warnings</span></>}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {result.pagespeed?.score != null && (
            <span style={{ fontSize: 12, color: "var(--text-muted)", borderRight: "1px solid var(--border)", paddingRight: 8, marginRight: 0 }}>
              PageSpeed <span style={{ color: result.pagespeed.score >= 90 ? "var(--green)" : result.pagespeed.score >= 50 ? "var(--yellow)" : "var(--red)", fontWeight: 600 }}>{result.pagespeed.score}</span>
              {result.pagespeed.lcp && <span style={{ color: "var(--text-dim)" }}> · LCP {result.pagespeed.lcp}</span>}
            </span>
          )}
          {reportId && (
            <button
              onClick={copyLink}
              style={{
                height: 28,
                padding: "0 12px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                color: copied ? "var(--green)" : "var(--text-muted)",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {copied ? "✓ Copied" : "Copy link"}
            </button>
          )}
        </div>
      </div>

      {/* ── AI Analysis ── */}
      {result.synthesis && (
        <div style={{
          marginBottom: 24,
          padding: 16,
          background: "var(--bg-subtle)",
          border: "1px solid var(--border)",
          borderRadius: 6,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Analysis
            </span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>· Groq / llama-3.3-70b</span>
          </div>

          <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text)", lineHeight: 1.65 }}>
            {result.synthesis.summary}
          </p>

          {result.synthesis.shareLine && (
            <p style={{ margin: "0 0 14px", fontSize: 12, fontFamily: "var(--font-geist-mono), monospace", color: "var(--text-muted)", padding: "8px 10px", background: "var(--bg)", borderRadius: 4, border: "1px solid var(--border-muted)" }}>
              {result.synthesis.shareLine}
            </p>
          )}

          {result.synthesis.fixes?.length > 0 && (
            <div>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Prioritized fixes
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {result.synthesis.fixes.map((fix, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 11, color: "var(--text-dim)", minWidth: 16, paddingTop: 1 }}>{i + 1}.</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{fix.title}</span>
                        <Tag text={`${fix.effort} effort`} color={EFFORT_COLOR[fix.effort] ?? "var(--text-dim)"} />
                      </div>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-geist-mono), monospace" }}>
                        {fix.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Failed checks ── */}
      {failed.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Failed · {failed.length}
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {failed.map((c) => <CheckRow key={c.id} check={c} />)}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Warnings ── */}
      {warned.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Warnings · {warned.length}
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {warned.map((c) => <CheckRow key={c.id} check={c} />)}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Passed (collapsed) ── */}
      {passed.length > 0 && (
        <div>
          <button
            onClick={() => setShowPassed((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Passed · {passed.length}
            </span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{showPassed ? "▲" : "▼"}</span>
          </button>
          {showPassed && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {passed.map((c) => <CheckRow key={c.id} check={c} />)}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
