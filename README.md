# LACE Brightspace + Build Wiki

Static site for the LACE Brightspace platform build. Hand-coded HTML, no build step.

## What's in here

| File | What it is | Audience |
|---|---|---|
| [`index.html`](index.html) | Team wiki — project status, org structure, compliance (user types), policies, decisions, glossary, quick tasks | Internal LACE staff (ED, program managers, admin) |
| [`marlana.html`](marlana.html) | Marlie's workspace — platform build roadmap (3 phases), open decisions in flight, working notes | Marlie (sole technical lead); future technical hires |
| [`brightspace-interactive-guide.html`](brightspace-interactive-guide.html) | Trainer-facing reference for Brightspace Creator+ / H5P features and built-in tools | Trainers, facilitators |
| [`mlri-architecture.html`](mlri-architecture.html) | System architecture overview | Anyone needing the stack picture |
| [`styles.css`](styles.css) | Shared visual language (navy sidebar, intro cards, tip/note callouts, step lists, tables) used by all four pages |  |
| [`screenshots/`](screenshots) | Screenshot assets referenced from the trainer guide |  |

The four HTML files share the same look via `styles.css`. They each carry their own sidebar markup and cross-link to the others under a "Related Docs" group at the bottom of the sidebar.

### How the two wikis relate

- `index.html` (Team Wiki) is what LACE staff read. It documents how things are organized and what's been decided.
- `marlana.html` (Workspace) is Marlie's working space — the technical roadmap, open questions she's still resolving, and phase-level task tracking. Open decisions live here until they resolve, then move to the Team Wiki's Decision Log.

## Editing

All content is plain HTML. No build, no toolchain, no Python.

- Open the file you want to edit (e.g. `index.html`) in any editor.
- Each section is a `<section class="guide-section" id="...">` block. Add or edit sections in place.
- The sidebar in each file is a flat `<nav>` near the top. When you add a new section, add a matching `<a href="#new-id">` link in the sidebar so it shows up.
- Reusable components defined in `styles.css`:
    - `.intro-card` — bordered panels for "what is X" context blocks
    - `.tip` / `.note` — colored callouts (teal tip, amber note)
    - `ol.steps` — numbered list with blue circle badges
    - `ul.task-list` with `<input type="checkbox" disabled>` — checkbox-style to-do lists
    - `.status` with modifiers `.in-progress`, `.not-started`, `.done`, `.proposed`, `.blocked` — colored status pills
    - `.table-wrap` + `<table>` — striped tables with navy headers
    - `<pre>` — dark code/diagram blocks
    - `blockquote` — soft callout for asides
- Status badges already styled (`.status.in-progress`, `.status.done`, etc.) — use these next to phase titles or decision headings.

## Previewing locally

The site is fully static, so you can:

- Double-click `index.html` to open it directly in a browser, **or**
- Serve the folder from any static server, e.g. `python -m http.server` and visit `http://localhost:8000/`.

A static server is recommended over `file://` so the stylesheet and inter-file links resolve cleanly.

## Deployment

GitHub Pages, via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On push to `main`, the workflow copies the four HTML files plus `styles.css` (and `screenshots/`) into a Pages artifact and publishes it. No build step.

## Working notes (not deployed)

- [`meeting.md`](meeting.md), [`screenshot-checklist.md`](screenshot-checklist.md) — local working notes, intentionally excluded from the deployed site.
