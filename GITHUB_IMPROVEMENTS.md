# GitHub Improvements — Prioritized

A review of the repository for portfolio readiness. Items are ordered by impact. Anything marked **(done)** was handled while creating these docs; the rest are quick actions you can take.

---

## P0 — Do before sharing the repo

**1. Verify secrets are NOT committed.** ⚠️ Highest priority.
`.env` and `.env.local` exist in the working directory. They are listed in `.gitignore` (`.env*`), so they should be untracked — but confirm with:
```bash
git ls-files | findstr .env
```
This should return **only `.env.example`**. If it shows `.env` or `.env.local`, remove them from tracking immediately:
```bash
git rm --cached .env .env.local
git commit -m "chore: stop tracking secret env files"
```
Your Groq API key and database URL live in those files. They must never reach GitHub. **Also regenerate the Groq key** at console.groq.com, since it was shared during development.

**2. Add a LICENSE file.** **(done)** — The README advertises MIT but no license file existed. An MIT `LICENSE` has been added so the badge is truthful and the code is legally reusable.

**3. Add the screenshots.** The README references five images in `docs/screenshots/`. The folder has been created **(done)** with a placeholder; follow [`SCREENSHOT_GUIDE.md`](SCREENSHOT_GUIDE.md) to capture the real images. **A repo with broken image links looks unfinished** — this is the single most visible polish item.

---

## P1 — Strongly recommended

**4. Set the GitHub "About" section.** On the repo page, click the gear next to "About" and add:
- **Description:** `Web security audit tool — scans any URL for HTTPS, headers, exposed files, and more, with AI-generated fixes. Next.js · TypeScript · Prisma · PostgreSQL.`
- **Website:** https://shipsafe-xzne.vercel.app/
- **Topics:** `nextjs` `typescript` `security` `web-security` `prisma` `postgresql` `ai` `security-scanner` `vercel`

This is what recruiters see first and it takes 60 seconds.

**5. Pin the live demo at the top.** Once deployed, replace the placeholder URL in the README's "Live Demo" section and in `PROJECT_CAPSULE.md`. A clickable, working demo is the most persuasive thing in the entire repo.

**6. Remove development-only files from the repo.** These add noise and signal "unfinished":
- `AGENTS.md` and `CLAUDE.md` — internal AI-assistant instructions, not part of the product.
- `git` — a stray zero-purpose file (likely a mistyped command). Delete it.
- `tsconfig.tsbuildinfo` — a build cache artifact; add it to `.gitignore`.
```bash
git rm --cached AGENTS.md CLAUDE.md git tsconfig.tsbuildinfo
```
(Keep `AGENTS.md`/`CLAUDE.md` locally if you want — just stop tracking them.)

---

## P2 — Nice to have

**7. Add real badges that reflect reality.** The README badges are currently static. Once deployed you can add a live Vercel deployment badge and a GitHub "last commit" badge for a more active feel.

**8. Write a short CONTRIBUTING note or "Running the tests" section** if you add tests later — signals engineering maturity.

**9. Add a `.github/` touch:** an issue template or a simple GitHub Actions workflow that runs `npm run build` on push. A green "build passing" check is a strong, honest signal.

**10. Consider a custom domain** (e.g. `shipsafe.dev`) for the live demo. Free to point via Vercel; looks more professional than `*.vercel.app`.

---

## Summary checklist

- [ ] **P0** Confirm `.env` / `.env.local` are untracked (`git ls-files | findstr .env`)
- [ ] **P0** Regenerate the Groq API key
- [x] **P0** LICENSE added
- [ ] **P0** Capture and commit the 5 screenshots
- [ ] **P1** Fill in the GitHub "About" section + topics
- [ ] **P1** Replace the live-demo placeholder URL once deployed
- [ ] **P1** Stop tracking `AGENTS.md`, `CLAUDE.md`, `git`, `tsconfig.tsbuildinfo`
- [ ] **P2** Live badges, build workflow, custom domain
