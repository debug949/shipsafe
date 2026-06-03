# ShipSafe

Instant security audit for any website. Paste a URL and get a scored report covering HTTPS, security headers, exposed files, cookie flags, and performance — with AI-generated plain-English fixes.

**[shipsafe.vercel.app →](https://shipsafe.vercel.app)**

---

## What it checks (19 checks)

| Category | Details |
|---|---|
| HTTPS | Protocol enforcement, HTTP→HTTPS redirect |
| Security headers | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| Exposed files | `.env`, `.git/config`, `wp-config.php`, `credentials.json`, `database.yml` + more |
| Cookie flags | Secure, HttpOnly, SameSite attributes |
| Info disclosure | `Server` and `X-Powered-By` header leakage |
| Performance | PageSpeed score, LCP, FCP, CLS via Google PageSpeed Insights |
| AI analysis | Plain-English summary, top risks, prioritized fix list via Groq |

Each audit scores 0–100 with a letter grade (A–F). Reports are saved to a shareable permalink.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16, TypeScript, App Router |
| Database | PostgreSQL on [Neon](https://neon.tech), Prisma 7 |
| AI | [Groq](https://groq.com) `llama-3.3-70b-versatile` — model-agnostic (swap via env var) |
| Deployment | [Vercel](https://vercel.com) |

---

## Run locally

```bash
git clone https://github.com/debug949/shipsafe
cd shipsafe
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```env
DATABASE_URL=       # neon.tech — free PostgreSQL
AI_PROVIDER=groq
GROK_API_KEY=       # console.groq.com — free tier
GROQ_MODEL=llama-3.3-70b-versatile
```

```bash
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push to GitHub
2. Create a free database at [neon.tech](https://neon.tech)
3. Run `npx prisma migrate deploy` with your `DATABASE_URL`
4. Import at [vercel.com/new](https://vercel.com/new) — set `DATABASE_URL`, `AI_PROVIDER`, `GROK_API_KEY`
5. Deploy

---

## AI provider

Switch providers by changing one env var — no code changes needed:

```env
AI_PROVIDER=groq    # default — Groq (free, fast)
AI_PROVIDER=openai  # OpenAI — set OPENAI_API_KEY
AI_PROVIDER=grok    # xAI Grok — set GROK_API_KEY
```

---

Built by [@debug949](https://github.com/debug949)
