"use client"

import { useState } from "react"
import type { AuditResult } from "@/lib/checks/types"
import { AuditResults } from "./AuditResults"

export function AuditForm() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [reportId, setReportId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setResult(null)
    setReportId(null)

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Audit failed.")
        return
      }
      setResult(data)
      setReportId(data.reportId ?? null)
    } catch {
      setError("Network error. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={loading}
            style={{
              flex: 1,
              height: 36,
              padding: "0 12px",
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              color: "var(--text)",
              fontSize: 14,
              fontFamily: "var(--font-geist-mono), monospace",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            style={{
              height: 36,
              padding: "0 16px",
              background: loading || !url.trim() ? "var(--border)" : "var(--blue)",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: loading || !url.trim() ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Scanning…" : "Run audit"}
          </button>
        </div>

        {loading && (
          <p style={{ margin: "12px 0 0", fontSize: 13, color: "var(--text-muted)" }}>
            Running checks — this takes 10–20 seconds…
          </p>
        )}
      </form>

      {error && (
        <div style={{
          marginTop: 16,
          padding: "10px 14px",
          background: "rgba(248, 81, 73, 0.08)",
          border: "1px solid rgba(248, 81, 73, 0.3)",
          borderRadius: 6,
          fontSize: 13,
          color: "var(--red)",
        }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 32 }}>
          <AuditResults result={result} reportId={reportId} />
        </div>
      )}
    </div>
  )
}
