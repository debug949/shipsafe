import { AuditForm } from "@/components/AuditForm"

const CHECKS = [
  ["HTTPS", "Protocol enforcement and HTTP→HTTPS redirect"],
  ["Security headers", "CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy"],
  ["Exposed files", ".env, .git/config, wp-config.php, credentials.json, database.yml"],
  ["Cookie flags", "Secure, HttpOnly, SameSite attributes"],
  ["Info disclosure", "Server and X-Powered-By header leakage"],
  ["Performance", "PageSpeed score, LCP, FCP, CLS via Google PageSpeed API"],
]

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", letterSpacing: "-0.01em" }}>ShipSafe</span>
          <a
            href="https://github.com/debug949/shipsafe"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--text)", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            Web security audit
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-muted)", margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
            Paste a URL. Get a scored security report with AI-generated fixes in under 20 seconds. Free, no account required.
          </p>
        </div>

        <AuditForm />

        {/* What we check */}
        <div style={{ marginTop: 56, borderTop: "1px solid var(--border-muted)", paddingTop: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" }}>
            What gets checked
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {CHECKS.map(([name, desc]) => (
                <tr key={name} style={{ borderBottom: "1px solid var(--border-muted)" }}>
                  <td style={{ padding: "10px 16px 10px 0", width: 160, fontSize: 13, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", verticalAlign: "top" }}>
                    {name}
                  </td>
                  <td style={{ padding: "10px 0", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
