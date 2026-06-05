# Screenshot Guide

This guide explains exactly how to capture every screenshot referenced in the README. **Use only real screenshots from the running application** — no mockups, no AI-generated images, no edited fakes. Authenticity is the entire point: a recruiter can tell the difference, and a real screenshot of working software is more impressive than any mockup.

---

## Before you start

**1. Run the app locally with a database and AI key configured** (so the AI panel and shareable links appear):

```bash
cd shipsafe
npm run dev
```

Open `http://localhost:3000`.

**2. Create the screenshots folder:**

```
shipsafe/docs/screenshots/
```

**3. Recommended capture settings (apply to all shots):**

| Setting | Value |
|---|---|
| Browser | Chrome, Edge, or Brave (Chromium) |
| Window width | 1440 px (drag the window wide, or use DevTools device toolbar at 1440×900) |
| Browser zoom | **100%** (press `Ctrl+0` to reset) |
| Color theme | The app is dark by default — no change needed |
| Hide | Bookmarks bar, extensions clutter — use a clean window |
| Capture tool | Windows: `Win+Shift+S`. macOS: `Cmd+Shift+4`. Or DevTools "Capture screenshot". |

**Tip for clean, full-page shots:** open DevTools (`F12`) → `Ctrl+Shift+P` → type "screenshot" → choose **"Capture full size screenshot"**. This grabs the whole page at exact resolution with no OS chrome.

---

## 1. `landing-page.png`

| | |
|---|---|
| **URL** | `http://localhost:3000` |
| **State** | Fresh page load, nothing typed yet |
| **Must be visible** | The "ShipSafe" header, the "Web security audit" heading, the URL input with its `https://example.com` placeholder, the "Run audit" button, and the "What gets checked" table below |
| **Zoom** | 100% |
| **Window** | 1440 px wide |
| **Filename** | `docs/screenshots/landing-page.png` |

Do not type anything. This shot shows the clean entry point.

---

## 2. `audit-results.png`

| | |
|---|---|
| **URL** | `http://localhost:3000` |
| **State** | After running a scan on **`https://github.com`** (it scores well — an A — which photographs cleanly and shows passing + failing checks) |
| **Steps** | Type `https://github.com` → click **Run audit** → wait ~15s for results |
| **Must be visible** | The score header (`90 / 100  A`), the passed/failed summary line, and the "Failed" checks table with severity tags |
| **Zoom** | 100% |
| **Window** | 1440 px wide |
| **Filename** | `docs/screenshots/audit-results.png` |

Scroll so the **score header and the Failed section** are both in frame. This is the money shot — it shows the product actually working.

---

## 3. `ai-analysis.png`

| | |
|---|---|
| **URL** | `http://localhost:3000` (same scan as above) |
| **State** | Same `github.com` scan, scrolled down to the **AI Analysis** panel |
| **Steps** | After the scan completes, scroll to the bordered "Analysis · Groq / llama-3.3-70b" box |
| **Must be visible** | The "Analysis" label, the plain-English summary paragraph, the one-line shareable verdict, and the numbered "Prioritized fixes" list with effort tags |
| **Zoom** | 100% |
| **Window** | 1440 px wide |
| **Filename** | `docs/screenshots/ai-analysis.png` |

This is the differentiator — it proves the AI integration is real and produces useful output.

---

## 4. `report-page.png`

| | |
|---|---|
| **URL** | `http://localhost:3000/report/[id]` |
| **State** | A saved, shareable report opened by its permalink |
| **Steps** | Run any scan → click **"Copy link"** in the result header → paste that URL into a new tab → screenshot the loaded report |
| **Must be visible** | The minimal report header with "← New audit", the score, and the full read-only report below |
| **Zoom** | 100% |
| **Window** | 1440 px wide |
| **Filename** | `docs/screenshots/report-page.png` |

This proves persistence and the shareable-link feature work end to end.

---

## 5. `architecture-diagram.png`

| | |
|---|---|
| **Source** | The Mermaid diagram already in `README.md` (the `flowchart TD` block) |
| **State** | Rendered diagram, not code |
| **Option A (recommended)** | Open the README on GitHub after pushing — GitHub renders Mermaid automatically. Screenshot the rendered flowchart. |
| **Option B** | Paste the Mermaid code into [mermaid.live](https://mermaid.live), then export as PNG directly. |
| **Must be visible** | The full flow: Browser → Route Handler → checks → scoring → AI + Database → report page |
| **Filename** | `docs/screenshots/architecture-diagram.png` |

Option B gives the cleanest export. If you use it, set the background to transparent or the GitHub-dark color so it matches.

---

## After capturing

1. Confirm all five files exist in `docs/screenshots/` with the exact filenames above.
2. The README already references them — no edits needed.
3. Commit:

```bash
git add docs/screenshots README.md
git commit -m "docs: add application screenshots"
git push
```

4. Open the repo on GitHub and verify every image renders.

---

## Quality checklist

- [ ] Captured at 100% zoom (no blurry scaling)
- [ ] 1440 px window (consistent width across all shots)
- [ ] No personal data, no API keys, no email addresses visible
- [ ] Dark theme consistent across every image
- [ ] Real screenshots only — no mockups or AI images
- [ ] Filenames match exactly: `landing-page.png`, `audit-results.png`, `ai-analysis.png`, `report-page.png`, `architecture-diagram.png`
