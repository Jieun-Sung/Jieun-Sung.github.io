# Design system

Small system, one rule: **no raw values outside `tokens.css`**. If a component
needs a value that does not exist, add the token first.

## Direction

The page has one job: convince a research hiring manager, in about thirty
seconds, that the work is substantial and independently owned. Everything
serves that — work first, credentials second, biography last.

Ewha Green is the brand constraint. A dark green over large areas reads as an
official university page, so it is held under roughly 5% of surface: links,
section rules, status badges, metric chips, and the active tab. The page
itself is a cool near-white with a faint green cast, not a warm cream.

## Tokens

### Color

| Token | Value | Use | Contrast on `--c-paper` |
|---|---|---|---|
| `--c-green` | `#00643E` | Brand. Links, badges, accents | 7.0:1 — AAA |
| `--c-green-deep` | `#00432A` | Hover, pressed, badge text | 10.9:1 |
| `--c-green-wash` | `#E4EDE7` | Chip and badge fill | — (fill only) |
| `--c-ink` | `#12211B` | Primary text | 15.2:1 |
| `--c-muted` | `#5B6660` | Secondary text, metadata | 5.5:1 — AA |
| `--c-paper` | `#F6F7F4` | Page background | — |
| `--c-rule` | `#D6DCD6` | Hairlines, dividers, borders | — (non-text) |

Ratios computed with the WCAG 2.1 relative-luminance formula. `--c-muted`
clears AA for body text but not AAA — do not use it below `--t--1`.

No dark mode. `#00643E` fails contrast on a dark surface and would need a
second brand green, which doubles the palette for little gain on a page this
size.

### Type

One face, IBM Plex Sans, everywhere. Hierarchy comes from size, weight, and
letter-spacing rather than from mixing typefaces:

| Role | Treatment |
|---|---|
| Display | `--t-2`/`--t-3`, weight 600, `--ls-tight` |
| Body | `--t-0`/`--t-1`, weight 400, `--lh-body` |
| Utility | `--t--1`, weight 500, uppercase + `--ls-caps` for eyebrows and badges |

`--f-display`, `--f-body`, and `--f-mono` all resolve to `--f-sans`. The three
tokens survive so component rules still say which role they are playing; swap
one token if a second face is ever reintroduced.

Numbers carry `font-variant-numeric: tabular-nums`, so `0.846` and `1,798`
align as data rather than prose.

Scale: `--t--1` 0.8125rem · `--t-0` 1rem · `--t-1` 1.125 · `--t-2` 1.375 ·
`--t-3` and `--t-4` fluid via `clamp()`.

### Space

`--sp-1` 0.25rem through `--sp-9` 6.5rem, roughly geometric. Section rhythm is
`--sp-8`; within a section, `--sp-6`.

## Components

### Status badge — `.status`

Publication state, shown in the entry gutter because it is metadata about the
work, not part of it.

| Variant | Visual | Use when |
|---|---|---|
| `--published` | Solid green, white text | Accepted or published — venue name as label |
| `--review` | Green wash, deep green text | Under review |
| `--prep` | Solid hairline border | In preparation |
| `--progress` | Dashed hairline border | Ongoing, unwritten |

Weight decreases as certainty decreases. A reader scanning the gutter sees the
maturity of the portfolio without reading a word.

### Metric chip — `.metrics li`

One number plus its unit. Tabular figures, green wash. Never more than three per
entry — beyond that they stop being scannable and become a table.
Do not put a metric here that is not in the paper.

### Entry — `.entry`

Research item. Two columns above 48rem: a 9rem gutter for status and year, and
the body (title, lede, metrics, links). Stacks below that. The same gutter
width is reused by `.record` and `.deflist` so the three sections align down
the page.

### Top tab bar — `.topbar` / `.nav__item`

Every section is a tab in a sticky bar at the top of the page, in reading
order: About, Research, Funding & Awards, Publications, Patents, Presentations,
Education. The bar is `--h-topbar` tall over a translucent, blurred paper
background; sections carry a matching `scroll-margin-top` so an anchor never
lands under it.

| State | Visual |
|---|---|
| Default | Muted text, transparent bottom border |
| Hover | Ink text |
| Current | Green text, green bottom border, `aria-current="true"` |

Set by IntersectionObserver, not by click, so the marker follows the scroll
position and stays correct after in-page anchors. The bar scrolls horizontally
on narrow screens, and the active tab is nudged into view with
`scrollIntoView({ block: "nearest", inline: "nearest" })` — "nearest" on both
axes so it never scrolls the page itself.

### Work detail page — `work/*.html`

One page per Selected work entry, opened in a new tab from the entry title.
Same shell and tokens as the home page, but `.shell--single` cancels the two
column grid — there is no rail, so the content runs full width to 56rem.

Fixed section order, so the four pages stay comparable: **Problem → Approach →
Results → Technical details → Reproducibility → Citation.** The top bar's tabs
mirror that order, with a leading "← All work" back to `index.html#research`.

| Block | Class | Holds |
|---|---|---|
| Head | `.detail__head` | Status badge, year, title, lede, authors, metrics, links |
| Hero figure | `.figure--hero` | The same figure as the home-page card |
| Spec list | `.specs` | Architecture, data, compute — term/value pairs |
| Results table | `.table` in `.table-wrap` | Best value per column gets `.is-best` |
| Body bullets | `.bullets` | Prose that happens to be enumerated |
| Caveat | `.callout` | A limitation or negative result, stated not buried |
| Code | `.code` | Shell commands and BibTeX |
| Draft marker | `.todo` | Scaffolding waiting on real content |

Section order varies by page — the four research pages run Problem → Approach →
Results → Citation with extra sections where the work earns them (scDEBART adds
Corpus and Takeaway, TDEP adds Limits and Reproducibility). Nav tabs are built
from whatever sections the page defines, so adding one is a single entry.

`.todo` blocks are prompts to the author, not site content. Delete the element
once the section is written — nothing else depends on it. A page with no
`.todo` left is finished.

A note on tone: these pages report negative and limiting results in the same
voice as the positive ones — `.callout` exists for exactly that. TDEM says
gradient training contributes nothing and that the knockdown comparison failed;
TDEP says its unseen-drug split is an upper bound. That is what the manuscripts
say, and softening it here would misrepresent them.

`.code` is the one place that intentionally uses a monospace stack rather than
`--f-sans`: code has to align by character. That is functional, not decorative,
and is not a break from the single-typeface rule.

## Accessibility floor

- Skip link to `#main`
- `:focus-visible` — 2px green outline, 3px offset, on every interactive element
- All text meets WCAG AA; body and headings meet AAA
- `prefers-reduced-motion: reduce` cancels animation and smooth scrolling
- Layout is single-column below 48rem; no horizontal scroll at 320px

## Do / don't

| Do | Don't |
|---|---|
| Add a token, then use it | Write a hex or px in `style.css` |
| Keep green under ~5% of the surface | Fill a section with green |
| Give every research entry a link or a number | Add an entry that has neither |
| Keep one typeface throughout | Reintroduce a second face for "variety" |
