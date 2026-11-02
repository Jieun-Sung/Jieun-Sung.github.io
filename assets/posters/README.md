# Posters

Naming convention:

    YYYY-MM-<venue-slug>-<project>.pdf

| File | Linked from |
|---|---|
| `2026-08-ksscr-fatedriver.pdf` | FateDriver entry, Presentations |
| `2026-07-icml-scdebart.pdf` | scDEBART entry, Presentations |
| `2025-10-ksbi-tdep.pdf` | TDEP entry, Presentations |
| `2024-01-kogo-tdem.pdf` | TDEM entry, Presentations |

All four are single-page, 1.2-4.3 MB, well under the practical limit.
PowerPoint docinfo (`Title: PowerPoint 프레젠테이션`, `Author: syspharm`)
has been replaced on each file — that metadata is visible to anyone who
downloads the PDF, so check it on any poster added later:

    pdfinfo <file>.pdf | grep -Ei '^(Title|Author|Creator|Producer)'

## Compressing a large poster

If a future poster lands above ~5 MB:

    gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 \
       -dPDFSETTINGS=/printer -dNOPAUSE -dQUIET -dBATCH \
       -sOutputFile=out.pdf raw-poster.pdf

`/printer` downsamples images to 300 dpi; `/ebook` gives 150 dpi and a
much smaller file, but poster figures usually go mushy. Check the
smallest axis labels at 100% zoom before committing.

Compress *before* the first commit — a file stays in git history even
after it is deleted.
