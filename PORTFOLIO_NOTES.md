# Portfolio Notes — ShipSafe

Ready-to-use copy for resumes, applications, and profiles. Keep these consistent everywhere so your story reads the same across every platform.

---

## 30-Second Pitch (spoken)

> ShipSafe is a web security audit tool I built. You paste in any website's URL, and in about fifteen seconds it runs nineteen security checks — things like whether the site forces HTTPS, whether it's leaking config files, whether its security headers are set correctly — and then an AI model writes a plain-English summary telling you exactly what to fix first. It's the check a developer runs right before they launch a site. It's full-stack TypeScript on Next.js, with a PostgreSQL database and a model-agnostic AI layer, and it's deployed on Vercel.

---

## 60-Second Pitch (spoken)

> ShipSafe is a web security audit tool I designed and built end to end. The problem it solves is that most developers ship websites without checking the basics — missing security headers, exposed `.env` files, cookies without the right flags — and those are exactly the mistakes attackers look for.
>
> You give it a URL and it fires nineteen independent checks in parallel, each one a direct HTTP request to the target, so it's fast and doesn't need a heavy headless browser. It scores the site from zero to a hundred and assigns a letter grade. Then it sends the failed checks to a language model, which returns a structured analysis: a summary, the top risks, and a prioritized fix list ranked by severity and effort. Every report is saved to a shareable link.
>
> The parts I'm most proud of are the engineering decisions. The AI layer is vendor-agnostic — I can switch between Groq, OpenAI, and Grok with one environment variable. And the whole thing is built around graceful degradation: if the database or the AI key is missing, the core audit still runs. Nothing optional is allowed to break the critical path. It's built on Next.js, TypeScript, Prisma 7, and PostgreSQL, and it's deployed on Vercel and Neon.

---

## Resume Bullet

**One-liner:**

> Built and deployed **ShipSafe**, a full-stack web security scanner (Next.js, TypeScript, Prisma, PostgreSQL) running 19 parallel checks with LLM-generated remediation; designed a vendor-agnostic AI interface and graceful-degradation architecture.

**Two-line (more detail):**

> **ShipSafe — Web Security Audit Tool** · Next.js, TypeScript, Prisma, PostgreSQL, Vercel
> Designed and shipped a security scanner running 19 parallel HTTP checks (headers, HTTPS, exposed files, cookies) with a 0–100 scoring engine and an LLM that returns prioritized, plain-English fixes. Built a model-agnostic AI provider abstraction (Groq/OpenAI/Grok) and isolated failure domains so optional services never break the core audit.

---

## LinkedIn Project Description

> **ShipSafe — Web Security Audit Tool**
>
> A full-stack tool that audits any website's security posture in seconds and explains the results in plain English. Submit a URL and ShipSafe runs 19 parallel checks — HTTPS enforcement, security headers (CSP, HSTS, and more), exposed sensitive files, cookie flags, and performance — then uses a language model to generate a prioritized remediation plan. Reports are scored A–F and saved to shareable links.
>
> Built with Next.js, TypeScript, Prisma 7, and PostgreSQL (Neon), deployed on Vercel. Notable engineering: a model-agnostic AI interface that swaps between Groq, OpenAI, and Grok via a single environment variable, and a graceful-degradation design where the core audit functions even without a database or AI key.
>
> Live demo and source on GitHub.

---

## College Application Description

> I built ShipSafe, a web security tool that scans any website and reports how secure it is. I created it because I noticed that developers — including me — often launch websites without checking for basic security mistakes, like leaving configuration files publicly readable or forgetting to enforce encrypted connections. ShipSafe automates nineteen of those checks and then uses artificial intelligence to explain the results in clear language and rank the fixes by importance.
>
> The project taught me far more than how to write code. I had to make real engineering trade-offs: how to keep the tool fast by running checks in parallel, how to design it so that it keeps working even when an external service fails, and how to structure the AI component so it isn't locked to a single company's model. I built the entire system myself — the interface, the security checks, the database, and the deployment — and made it publicly available so other developers can actually use it.

---

## GitHub Repository Description (the short "About" field)

> Web security audit tool — scans any URL for HTTPS, security headers, exposed files, and more, with AI-generated fixes. Next.js · TypeScript · Prisma · PostgreSQL.

**Suggested topics/tags:**
`nextjs` `typescript` `security` `web-security` `prisma` `postgresql` `ai` `groq` `security-scanner` `vercel`

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript |
| Styling | Tailwind CSS v4 (GitHub-dark design system) |
| Backend | Next.js route handlers, Node runtime |
| Database | PostgreSQL (Neon, serverless) |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| AI | Groq `llama-3.3-70b-versatile`, model-agnostic (OpenAI / Grok ready) |
| Deployment | Vercel + Neon |
| Tooling | ESLint, TypeScript strict mode |

---

## Consistency checklist

Use the same facts everywhere:

- [ ] **19 parallel checks** (not "many" or "several")
- [ ] **0–100 score, A–F grade**
- [ ] **Model-agnostic AI** (Groq default; OpenAI/Grok swappable)
- [ ] **Next.js, TypeScript, Prisma 7, PostgreSQL, Vercel, Neon**
- [ ] **Graceful degradation** is the signature engineering decision worth naming
- [ ] Always link the **live demo** and the **GitHub repo** together
