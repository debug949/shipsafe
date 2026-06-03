# ShipSafe — Project Capsule

> Last updated: 2026-06-03

---

## What It Is

ShipSafe is a free web security audit tool. You paste a URL and within ~15 seconds get a scored report covering HTTPS enforcement, security headers, exposed sensitive files, cookie flags, server information disclosure, and performance — followed by an AI-generated plain-English analysis with prioritized fixes.

**Live:** https://shipsafe.vercel.app (pending deploy)
**GitHub:** https://github.com/yourusername/shipsafe (pending push)

---

## Why It Was Built

To demonstrate real engineering skills — specifically security tooling, AI integration, full-stack TypeScript, and SaaS architecture — in a form that is immediately useful to real developers and immediately impressive to recruiters, founders, and university admissions officers.

Built by a 15-year-old developer optimizing for portfolio value, internship applications, and long-term international career opportunities.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL on Neon (serverless) |
| ORM | Prisma 7 (pg adapter) |
| AI | Groq API — llama-3.3-70b-versatile |
| AI Interface | Model-agnostic (swap groq/grok/openai via env var) |
| Deployment | Vercel (web) + Neon (database) |

---

## Architecture

```
Browser
  └── Next.js App Router (Vercel)
        ├── /                     Landing page + URL input
        ├── /report/[id]          Shareable read-only report
        └── /api/audit            POST — runs checks + AI, saves to DB
              ├── lib/checks/     19 parallel HTTP checks
              ├── lib/ai/         Model-agnostic AI synthesis
              └── lib/db.ts       Prisma → Neon PostgreSQL
```

All checks run server-side via `Promise.all` — 19 parallel HTTP requests to the target URL. No headless browser, no external scanning APIs (except optional PageSpeed). AI synthesis runs after checks complete. Results saved to DB and a shareable `reportId` returned.

---

## Features Completed

- [x] HTTPS protocol check
- [x] HTTP → HTTPS redirect check
- [x] 6 security header checks (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [x] 9 exposed sensitive file probes (.env, .git/config, wp-config.php, credentials.json, etc.)
- [x] Cookie security flags (Secure, HttpOnly, SameSite)
- [x] Server information disclosure (X-Powered-By, Server headers)
- [x] Google PageSpeed Insights integration (optional — degrades gracefully)
- [x] Composite security score (0–100) + letter grade (A–F)
- [x] AI synthesis: plain-English summary, top risks, prioritized fix list, shareable one-liner
- [x] Shareable report URLs (/report/[id]) backed by Neon PostgreSQL
- [x] Model-agnostic AI provider interface (Groq default, OpenAI/Grok ready)
- [x] Silent failure on missing DB/AI keys — core audit always works
- [x] Production build passing, TypeScript clean

---

## Features Remaining (Post-MVP)

- [ ] GitHub repo scanning (check for exposed secrets in code)
- [ ] Scheduled re-scans + change alerts
- [ ] PDF report export
- [ ] API access (for CI/CD integration)
- [ ] User accounts + scan history dashboard
- [ ] Monetization: free tier (3 scans/day) + Pro ($7/mo, unlimited + PDF + API)
- [ ] Google PageSpeed API key for higher rate limits
- [ ] Subdomain enumeration
- [ ] TLS certificate expiry check
- [ ] Accessibility checks (axe-core)

---

## Deployment Status

| Service | Status | Notes |
|---|---|---|
| Neon PostgreSQL | ✅ Live | Migration applied, AuditReport table created |
| Vercel | ⏳ Pending | Awaiting first push + import |
| Custom domain | ⏳ Pending | shipsafe.dev or similar |

---

## Problems Solved

1. **Prisma 7 breaking changes** — v7 removed `url` from schema.prisma and requires a pg adapter. Adapted to use `prisma.config.ts` + `@prisma/adapter-pg`.
2. **Prisma CLI reads `.env`, not `.env.local`** — Next.js loads `.env.local` but Prisma CLI uses `dotenv/config`. Fixed by keeping DATABASE_URL in both files.
3. **React controlled inputs in preview** — `execCommand('insertText')` required to trigger React synthetic events from automation tooling.
4. **Groq vs Grok naming** — user provided a Groq key (gsk_...), not xAI Grok. Added Groq as a separate provider while keeping the interface model-agnostic.
5. **API timeout on Vercel** — increased `maxDuration` to 45s to handle parallel checks + AI synthesis within Vercel's function timeout.

---

## Lessons Learned

- Security tooling is genuinely useful to developers and immediately understandable to non-technical evaluators
- Prisma 7 is a significant breaking change from v5/v6 — always check the installed version before copying patterns
- Model-agnostic AI abstraction is worth the 30 minutes it takes — switching providers is now a one-line env var change
- Silent failure design (AI optional, DB optional) means the core product always works regardless of configuration

---

## Current Portfolio Value

**What this demonstrates to evaluators:**

- Security engineering knowledge (OWASP headers, attack vectors)
- Full-stack TypeScript (Next.js App Router, API routes, Prisma)
- AI integration (prompt engineering, structured output parsing, provider abstraction)
- Database design + ORM (Prisma 7, PostgreSQL, migrations)
- Production deployment (Vercel + Neon, env management, build pipeline)
- System design (parallel checks, graceful degradation, shareable state via DB)
- Product thinking (real use case, real users, real monetization path)

**Resume line:** Built ShipSafe — a web security audit tool with AI-powered analysis (Next.js, TypeScript, Groq, PostgreSQL). Deployed with shareable report links. Used by developers before shipping.

---

## Future Improvements

1. **Diff scanning** — re-scan a URL weekly and alert if security posture degrades
2. **GitHub Actions integration** — `shipsafe scan --url $URL --fail-on F` for CI/CD
3. **Badges** — embed a live security grade badge in a README
4. **Bulk scanning** — scan all pages of a sitemap
5. **Competitor comparison** — scan your site vs a competitor's
6. **Chrome extension** — one-click audit of the current tab
