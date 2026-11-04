# Cinemacity — Our Food Is the Story

A six-section campaign presentation site. Static HTML, CSS and vanilla JS — no build step, no dependencies. Drop it on GitHub Pages and it runs.

## Sections

| # | Chapter | Content |
|---|---------|---------|
| 01 | The idea | Campaign title, the concept, the director's chair |
| 02 | Setting the scene | Storyboard 00:00–00:12 |
| 03 | Changing genres | Storyboard 00:12–00:25 |
| 04 | The confession | Storyboard 00:25–00:35, end frame |
| 05 | Art direction | Chef as auteur, camera arc, food as the star |
| 06 | One production, every screen | Placements and closing statement |

## Adding final photography

Every image area is a labelled placeholder that describes the shot it's waiting for. To swap one in:

1. Put the file in `assets/images/` (e.g. `shot-01.jpg`).
2. Open `assets/js/app.js` and uncomment the matching line in the `IMAGES` map at the top.

Keys left commented out keep their placeholder, so images can go in one at a time without touching the layout. Alt text lives on each `data-alt` attribute in `index.html`.

Recommended crops: `chair` 4:5 · `shot-01` → `shot-04` 16:9 · `shot-05` 21:9 · all `macro-*` 1:1. Export at roughly 2× the display size and compress — the site has no image pipeline.

## Editing copy

All copy sits directly in `index.html`, in reading order, with a comment marking each section. No templating to learn.

## Navigation

Scroll, arrow keys (↑ ↓ ← →), Page Up / Page Down, Home / End, the prev/next buttons or the chapter rail on the right.

## Publishing to GitHub Pages

```bash
git init
git add .
git commit -m "Cinemacity — Our Food Is the Story"
git branch -M main
git remote add origin git@github.com:YOUR-ORG/YOUR-REPO.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**. The included `.nojekyll` file stops Jekyll from touching the `assets` folder.

To preview locally:

```bash
python3 -m http.server 8000
```

## Notes

- Palette and type are defined as CSS custom properties at the top of `assets/css/styles.css`.
- Motion honours `prefers-reduced-motion`.
- The site prints to PDF one section per page.
