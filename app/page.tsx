"use client"

import { motion } from "framer-motion"
import { AuditForm } from "@/components/AuditForm"

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"

const CAPABILITIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: "#fff" }}>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "HTTPS & Protocol",
    tags: ["Protocol Check", "HTTP Redirect", "HSTS"],
    body: "Verifies HTTPS enforcement and HTTP-to-HTTPS redirect. Checks HSTS headers and certificate exposure via server disclosure.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: "#fff" }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Security Headers",
    tags: ["CSP", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"],
    body: "Audits all six critical security headers. Missing any one exposes your users to XSS, clickjacking, or data leakage.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: "#fff" }}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: "Exposed Files",
    tags: [".env", ".git/config", "wp-config", "credentials"],
    body: "Probes 9 known sensitive paths attackers check first. One exposed .env can leak your entire database and API key set.",
  },
]

const STATS = [
  { value: "19", label: "Parallel Checks" },
  { value: "10–20s", label: "Scan Time" },
  { value: "A–F", label: "Security Grade" },
]

const NAV_LINKS = ["Home", "Features", "GitHub"]

const blurIn = { filter: "blur(10px)", opacity: 0, y: 20 } as const
const blurOut = { filter: "blur(0px)", opacity: 1, y: 0 } as const

export default function Home() {
  return (
    <div style={{ background: "#000", minHeight: "100dvh" }}>
      {/* Fixed video */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <video autoPlay muted loop playsInline preload="metadata"
          style={{ width: "120%", height: "120%", objectFit: "cover", objectPosition: "top", position: "absolute", left: "50%", top: 0, transform: "translateX(-50%) scale(1.08)", filter: "blur(5px) brightness(0.72)" }}>
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Nav */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", padding: "16px 16px 0" }}>
          <div className="liquid-glass" style={{ display: "inline-flex", alignItems: "center", borderRadius: 9999, padding: "8px 10px", gap: 4 }}>
            <div className="liquid-glass" style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-instrument-serif,serif)", fontStyle: "italic", fontSize: 16, color: "#fff", flexShrink: 0 }}>
              S
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 8px" }} />
            {NAV_LINKS.map((link) => (
              <a key={link}
                href={link === "GitHub" ? "https://github.com/debug949/shipsafe" : "#"}
                target={link === "GitHub" ? "_blank" : undefined}
                rel={link === "GitHub" ? "noopener noreferrer" : undefined}
                style={{ padding: "6px 14px", borderRadius: 9999, fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)", textDecoration: "none", fontFamily: "var(--font-barlow,sans-serif)", transition: "color 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)" }}>
                {link}
              </a>
            ))}
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 8px" }} />
            <a href="#audit" style={{ padding: "6px 16px", borderRadius: 9999, fontSize: 13, fontWeight: 500, background: "#fff", color: "#000", textDecoration: "none", fontFamily: "var(--font-barlow,sans-serif)", whiteSpace: "nowrap", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}>
              Run Audit ↗
            </a>
          </div>
        </div>

        {/* Hero */}
        <section id="audit" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", textAlign: "center", position: "relative" }}>
          <motion.div initial={blurIn} animate={blurOut} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }} style={{ marginBottom: 28 }}>
            <div className="liquid-glass" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 9999, padding: "6px 16px", fontSize: 11, color: "rgba(255,255,255,0.8)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-barlow,sans-serif)", fontWeight: 500 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 6px #3fb950", display: "inline-block" }} />
              ShipSafe · Web Security Audit
            </div>
          </motion.div>

          <motion.h1
            initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-instrument-serif,serif)", fontStyle: "italic", fontSize: "clamp(52px,9vw,100px)", fontWeight: 400, color: "#fff", lineHeight: 0.9, letterSpacing: "-0.04em", margin: "0 0 28px", maxWidth: 860 }}>
            Secure your site<br />before it ships.
          </motion.h1>

          <motion.p
            initial={blurIn} animate={blurOut} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-barlow,sans-serif)", fontSize: "clamp(14px,2vw,16px)", fontWeight: 300, color: "rgba(255,255,255,0.65)", maxWidth: 440, lineHeight: 1.65, marginBottom: 40 }}>
            19 parallel checks. AI-powered prioritized fixes. A scored report in under 20 seconds. Free, no account required.
          </motion.p>

          <motion.div
            initial={blurIn} animate={blurOut} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="liquid-glass-strong"
            style={{ width: "100%", maxWidth: 560, borderRadius: 20, padding: "24px 28px" }}>
            <AuditForm />
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-barlow,sans-serif)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Try:</span>
              {["github.com", "stripe.com", "vercel.com"].map((url) => (
                <button
                  key={url}
                  onClick={() => {
                    const input = document.querySelector<HTMLInputElement>("input[type='url'],input[type='text'],input[name='url']")
                    if (!input) return
                    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
                    setter?.call(input, `https://${url}`)
                    input.dispatchEvent(new Event("input", { bubbles: true }))
                    input.focus()
                  }}
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9999, padding: "4px 12px", cursor: "pointer", fontFamily: "var(--font-barlow,sans-serif)", transition: "background 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)" }}
                >
                  {url}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", justifyContent: "center" }}>
            {STATS.map((s) => (
              <div key={s.label} className="liquid-glass" style={{ padding: "16px 22px", borderRadius: 16, textAlign: "center", minWidth: 110 }}>
                <div style={{ fontFamily: "var(--font-instrument-serif,serif)", fontStyle: "italic", fontSize: 28, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-barlow,sans-serif)", fontWeight: 300 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
            style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-barlow,sans-serif)" }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "rgba(255,255,255,0.7)", animation: "ss-scroll 1.6s ease-in-out infinite" }} />
            </div>
          </motion.div>
        </section>

        {/* Capabilities */}
        <section style={{ minHeight: "100dvh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 32px 48px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }}
              style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 10, fontFamily: "var(--font-barlow,sans-serif)", fontWeight: 400 }}>// What we scan</p>
              <h2 style={{ fontFamily: "var(--font-instrument-serif,serif)", fontStyle: "italic", fontSize: "clamp(52px,7vw,90px)", fontWeight: 400, color: "#fff", lineHeight: 0.9, letterSpacing: "-0.03em", margin: 0 }}>
                Security,<br />analyzed.
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
              {CAPABILITIES.map((cap, i) => (
                <motion.div key={cap.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="liquid-glass"
                  style={{ borderRadius: 20, padding: 24, minHeight: 280, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: "auto" }}>
                    <div className="liquid-glass" style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {cap.icon}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "flex-end" }}>
                      {cap.tags.map((tag) => (
                        <div key={tag} className="liquid-glass" style={{ borderRadius: 9999, padding: "3px 10px", fontSize: 11, color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", fontFamily: "var(--font-barlow,sans-serif)" }}>{tag}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 28 }}>
                    <h3 style={{ fontFamily: "var(--font-instrument-serif,serif)", fontStyle: "italic", fontSize: 28, fontWeight: 400, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, margin: "0 0 10px" }}>{cap.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-barlow,sans-serif)", fontWeight: 300 }}>{cap.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="liquid-glass" style={{ padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-barlow,sans-serif)" }}>ShipSafe · Web Security Audit</span>
          <a href="https://github.com/debug949/shipsafe" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontFamily: "var(--font-barlow,sans-serif)" }}>GitHub ↗</a>
        </div>
      </div>

      <style>{`
        @keyframes ss-scroll {
          0%   { transform: translateY(-100%); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
