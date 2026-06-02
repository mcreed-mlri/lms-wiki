# MLRI Platform Wiki

Static site for the MLRI learning platform build. Hand-coded HTML, no build step.

This is the stable project memory: current status, open decisions, waiting items, architecture, operating rules, glossary, and team-facing explanations. Fast notes and weekly planning live in `../notes/`.

> **Workspace map:** See [`../README.md`](../README.md) for how this folder relates to the rest of `c:\dev`.

## What's in here

| File | What it is | Audience |
|---|---|---|
| [`index.html`](index.html) | Platform home: landing hub that links to every reference page, plus the current status/phase dashboard | Anyone arriving at the site |
| [`team-wiki.html`](team-wiki.html) | Team wiki: project status, custom HTML course model, org structure, compliance, policies, decisions, glossary, quick tasks | Internal LACE staff (ED, program managers, admin) |
| [`june-2026-priority-tasks.html`](june-2026-priority-tasks.html) | June 2026 priority task list: production hardening, routing policy, accessibility, completion criteria, and Intelligent Agent recipes | LACE implementation team |
| [`marlana.html`](marlana.html) | Marlie's workspace: executive scan for the wrapper, LACE Hub dashboard plan, data/reporting roadmap, open decisions | Marlie; future technical hires |
| [`brightspace-interactive-guide.html`](brightspace-interactive-guide.html) | Secondary reference for optional Brightspace-native tools (Creator+, H5P, quizzes, discussions, assignments) when custom HTML is not the best fit | Marlie; admins evaluating native-tool options |
| [`brightspace-map.html`](brightspace-map.html) | Interactive, expandable map of the Brightspace platform structure (hierarchy, content, users, integrations, course design); replaces the old static mind-map image | Anyone orienting to how Brightspace is organized |
| [`mlri-architecture.html`](mlri-architecture.html) | System architecture overview | Anyone needing the stack picture |
| [`styles.css`](styles.css) | Shared visual language used by the HTML pages |  |
| [`screenshots/`](screenshots) | Screenshot assets referenced from reference pages |  |

The Team Wiki intentionally links only to core team references. Optional native-tool notes are kept secondary so the custom HTML course model stays clear.

### How the Wiki and Obsidian Relate

- `index.html` is the platform home: a landing hub that links to every page and surfaces the current status/phase dashboard. It is the GitHub Pages front page.
- `team-wiki.html` (Team Wiki) is what LACE staff read. It documents how things are organized and what's been decided.
- `june-2026-priority-tasks.html` is the short-term execution list for June 2026 hardening work.
- `marlana.html` (Workspace) is Marlie's working space: technical roadmap, LACE Hub dashboard plan, open questions, and phase-level task tracking. Open decisions live here until they resolve, then move to the Team Wiki's Decision Log.
- LACE course content is built as custom HTML files inside a shared wrapper. Brightspace provides LMS infrastructure: hosting, enrollment, access, completion records, notices, and reporting.
- Obsidian notes in [`../notes/`](../notes/) are the workbench for priorities, meetings, drafts, and scratch thinking. Promote stable sections into this wiki; don't maintain parallel full copies elsewhere.

### Canonical Wiki Homes

- Current project status and phase roadmap: `index.html` and `marlana.html`
- Waiting items and open decisions: `marlana.html`
- Resolved decisions, glossary, SOPs, and team-facing rules: `team-wiki.html`
- June execution tasks: `june-2026-priority-tasks.html`
- System architecture: `mlri-architecture.html`

## Editing

All content is plain HTML. No build, no toolchain, no Python.

- Open the file you want to edit (e.g. `index.html`) in any editor.
- Each section is a `<section class="guide-section" id="...">` block. Add or edit sections in place.
- The sidebar in each file is a flat `<nav>` near the top. When you add a new section, add a matching `<a href="#new-id">` link in the sidebar so it shows up.
- Reusable components defined in `styles.css`:
    - `.intro-card`: bordered panels for context blocks
    - `.tip` / `.note`: colored callouts
    - `ol.steps`: numbered task lists
    - `ul.task-list` with `<input type="checkbox" disabled>`: checkbox-style to-do lists
    - `.status` with modifiers `.in-progress`, `.not-started`, `.done`, `.proposed`, `.blocked`: status pills
    - `.table-wrap` + `<table>`: striped tables with navy headers
    - `<pre>`: dark code/diagram blocks
    - `blockquote`: soft callout for asides

## Previewing Locally

The site is fully static, so you can:

- Double-click `index.html` to open it directly in a browser, or
- Serve the folder from any static server, e.g. `python -m http.server` and visit `http://localhost:8000/`.

A static server is recommended over `file://` so the stylesheet and inter-file links resolve cleanly.

## Deployment

GitHub Pages, via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On push to `main`, the workflow copies the HTML files plus `styles.css` and `screenshots/` into a Pages artifact and publishes it. No build step.

### PWA Updates

The deployed service worker cache is versioned with the Git commit SHA during the Pages workflow. The workflow also stamps the deployed `sidebar.js` asset URL with the same SHA. Each push to `main` creates a new cache name, clears old caches on activation, and the app reloads once when the new service worker takes control. In practice, installed PWA users should see updates after the Pages deployment completes and the app is reopened or refreshed.

## Working Notes

- [`screenshot-checklist.md`](screenshot-checklist.md): local working notes, intentionally excluded from the deployed site.
