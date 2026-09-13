# Pronto QualityOS

Quality & Coaching Intelligence for field-service operations. A closed-loop system: **Detect → Diagnose → Intervene → Measure → Learn.**

Built with React + Vite + Recharts. Nine wired screens, fully responsive, no backend required (runs on synthetic demo data).

---

## Run locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

---

## Deploy a shareable link (for LinkedIn) — two options

### Option A — Vercel via GitHub (recommended, ~3 minutes, permanent URL)

1. Create a new repository on GitHub (e.g. `pronto-qualityos`). Keep it public if you want anyone clicking from LinkedIn to see it.
2. In this folder, push the code:
   ```bash
   git init
   git add .
   git commit -m "Pronto QualityOS"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pronto-qualityos.git
   git push -u origin main
   ```
3. Go to **vercel.com → Add New → Project**.
4. Click **Import** next to your `pronto-qualityos` repo.
5. Vercel auto-detects Vite. Leave every setting default:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**. In under a minute you get a live URL like `https://pronto-qualityos.vercel.app`.
7. That link is what you paste into LinkedIn. Every future `git push` redeploys automatically.

### Option B — Vercel CLI (no GitHub)

```bash
npm i -g vercel
vercel
```

Answer the prompts (accept defaults). It builds and returns a live URL. Run `vercel --prod` to promote it to your permanent domain.

### Option C — Netlify drop (fastest, but manual)

```bash
npm run build
```

Then drag the generated `dist/` folder onto https://app.netlify.com/drop. Instant URL, but you re-drag to update.

---

## Customising

- **Data:** everything lives in `src/data.js`. Replace the synthetic professionals, cities, alerts and outcomes with real exports and the whole app updates.
- **Brand:** colours and shared styles are in `src/theme.js`.
- **Screens:** each screen is its own file under `src/screens/`.

---

## For a stronger LinkedIn post

Open Graph tags are already set in `index.html` so the link shows a title and description when shared. Update the `og:image` line with a screenshot URL if you want a preview thumbnail.
