# ShipSafe

**Instant security audit for any website.** Checks HTTPS, security headers, exposed sensitive files, cookie flags, and performance — then uses AI to explain what matters and how to fix it.

**Live demo:** [shipsafe.vercel.app](https://shipsafe.vercel.app)

---

## What it checks

| Category | Checks |
|---|---|
| HTTPS | Protocol, HTTP→HTTPS redirect |
| Security Headers | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| Exposed Files | .env, .git/config, wp-config.php, credentials.json, and more |
| Cookies | Secure, HttpOnly, SameSite flags |
| Disclosure | X-Powered-By, Server header leakage |
| Performance | PageSpeed score, LCP, FCP, CLS (via Google PageSpeed API) |
| AI Analysis | Plain-English risk summary + prioritized fix list (via Groq) |

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Database:** PostgreSQL (Neon) + Prisma 7
- **AI:** Groq (`llama-3.3-70b-versatile`) — model-agnostic interface supports OpenAI/Grok/local
- **Deployment:** Vercel

## Local setup

```bash
git clone https://github.com/yourusername/shipsafe
cd shipsafe
npm install
cp .env.example .env.local
# Fill in .env.local (see below)
npx prisma migrate dev --name init
npm run dev
```

## Environment variables

```env
DATABASE_URL=          # Neon PostgreSQL connection string
AI_PROVIDER=groq       # groq | grok | openai
GROK_API_KEY=          # Groq API key from console.groq.com
GROQ_MODEL=llama-3.3-70b-versatile

# Optional
GOOGLE_PAGESPEED_API_KEY=   # Increases PageSpeed rate limits
```

## Deployment (Vercel + Neon)

1. Create a free database at [neon.tech](https://neon.tech)
2. Run `npx prisma migrate deploy` with your `DATABASE_URL`
3. Push to GitHub
4. Import repo on [vercel.com](https://vercel.com) — set all env vars
5. Deploy
