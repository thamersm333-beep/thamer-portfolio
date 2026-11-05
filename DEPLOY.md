# Deploy — GitHub Pages

**Target repo (empty, public):** https://github.com/thamersm333-beep/thamer-portfolio

**Expected live URL after Pages is on:**
https://thamersm333-beep.github.io/thamer-portfolio/

## Steps
1. Push every file in this folder to `main` at the **repo root** (not nested in a subfolder).
2. GitHub → Settings → Pages → Build and deployment:
   - Source: Deploy from a branch
   - Branch: `main` / folder: `/ (root)`
3. Wait ~1 minute; open the URL above.

`.nojekyll` is present. Paths are relative — works at `/thamer-portfolio/`.

## Local
`python3 -m http.server 8765` → http://127.0.0.1:8765/
