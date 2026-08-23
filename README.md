# jieun-sung.github.io

Personal research site. Static, no build step, no dependencies.

```
index.html
assets/
  css/tokens.css     design tokens — the only place raw values live
  css/style.css      components, built from tokens
  js/main.js         rank strip, scroll-spy, footer year
  img/favicon.svg
  img/portrait.jpg   ← not yet added
  cv/Jieun-Sung-CV.pdf
  posters/           poster PDFs — see posters/README.md
DESIGN.md            token + component reference
```

## Deploy

1. Create a repo named exactly **`Jieun-Sung.github.io`**.
2. Push these files to the default branch, at the repo root.
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
4. Live at `https://jieun-sung.github.io/`.

Local preview:

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```

## Updating the CV

The link in `index.html` is fixed at `assets/cv/Jieun-Sung-CV.pdf`. To
publish a new version, export the DOCX to PDF, **keep that exact
filename**, overwrite the file, and push. No HTML edit is needed and the
URL never changes.

Two things do *not* update themselves, so check them when the CV changes:

- Publication status (`under review` → published) in the Publications
  section and in the matching `.status` badge under Research
- New presentations, which need a `.record--tight` item added

Before overwriting: the CV PDF is served publicly from this repo, so it
is subject to the same disclosure rules as the page itself.

## Adding the photo

Save the retouched shot as `assets/img/portrait.jpg`, 4:5 portrait,
roughly 760×950 px, then in `index.html` replace:

```html
<div class="portrait"><span class="portrait__placeholder">photo</span></div>
```

with

```html
<img class="portrait" src="assets/img/portrait.jpg" alt="Jieun Sung"
     width="380" height="475">
```

The container already reserves 4:5, so the layout does not shift.

## Open TODOs

- [x] Add the four poster PDFs (see `assets/posters/README.md`)
- [ ] Confirm the scDEBART repo name (linked as `github.com/Jieun-Sung/scDEBART`)
- [ ] Confirm the OpenReview forum URL resolves
- [ ] Add `assets/img/og.png` (1200×630) and its `og:image` meta tag
- [ ] Add LinkedIn to the rail links once the profile exists
- [ ] Co-author sign-off before publishing the FateDriver poster
