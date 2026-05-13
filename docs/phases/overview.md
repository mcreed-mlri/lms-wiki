# Project Roadmap — Three Phases

MLRI's Brightspace + custom platform build is organized into three phases over approximately 5–6 months. The goal is to move from a basic Brightspace connection to a full custom data layer and reporting suite that supports MLRI's legal education mission.

---

## Phase Timeline

| Phase | Name | Months | Status |
|---|---|---|---|
| 1 | Connect to Brightspace | 1–2 | 🟡 In progress |
| 2 | Own Data Layer | 2–4 | ⬜ Not started |
| 3 | Reporting & Evaluation | 4–6 | ⬜ Not started |

---

## Phase 1 · Connect to Brightspace (Months 1–2)

Get a working, authenticated connection to the Brightspace API and surface core learner data in our custom frontend.

**Key deliverables:**

- Brightspace API OAuth 2.0 connection with token management
- Pull: enrollments, completions, grades, time-in-course
- Display Brightspace data in the custom frontend discovery layer
- SSO so learners have a single login — no double sign-in

[Phase 1 details →](phase-1.md)

---

## Phase 2 · Own Data Layer (Months 2–4)

Build our own database (Supabase/Postgres) to capture behavioral data that Brightspace cannot track on its own.

**Key deliverables:**

- Supabase backend for custom events and user data
- Search tracking: what learners search for, what they don't find
- Engagement events: time on page, click paths, drop-off points
- Learner feedback: ratings, content usefulness flags

[Phase 2 details →](phase-2.md)

---

## Phase 3 · Reporting & Evaluation (Months 4–6)

Surface data to learners, managers, and the MLRI team through dashboards and evaluation tools.

**Key deliverables:**

- Learner dashboard: personal progress, completions, recommendations
- Manager view: team completion rates, gaps, activity
- Program evaluation: cohort analysis, equity gaps, completion predictors
- Population insights: who's completing, who isn't, and why — by learner segment

[Phase 3 details →](phase-3.md)

---

## System Stack — How the Layers Connect

```
Learner / Manager / Admin (Browser)
            ↕
┌─────────────────────────┐    ↔    ┌─────────────────────────┐
│   Your Frontend Layer   │         │        Supabase          │
│  Discovery · Progress   │         │  Custom events · Users   │
└─────────────────────────┘         └─────────────────────────┘
            ↕
   Brightspace REST API (OAuth 2.0)
            ↕
   Brightspace (D2L)
   Course content · Completions · Grades · Enrollments
```

---

## Data — What Comes From Where

### From Brightspace API
- Enrollment status
- Course completions
- Quiz / assessment scores
- Time in course
- Last accessed date
- Grade data

### From Our Own Layer (Supabase)
- Search queries and results
- Click paths and navigation
- Time on page (frontend layer)
- Content ratings and flags
- Learning path choices
- Drop-off points

### What We Surface (Phase 3 Outputs)
- Learner progress dashboards
- Manager team views
- Program completion rates
- Cohort equity analysis
- Content effectiveness signals
- Catalog gap analysis
