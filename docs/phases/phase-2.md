# Phase 2 · Own Data Layer

**Timeline:** Months 2–4 · **Status:** ⬜ Not started

Brightspace tracks what happens inside its own courses — but it can't capture how learners interact with our custom frontend: what they search for, where they get lost, what content they rate highly. Phase 2 builds a Supabase (Postgres) database to capture exactly that.

---

## Task Checklist

### Supabase Backend
- [ ] Set up Supabase project and database schema
- [ ] Define tables for: users, events, search logs, feedback
- [ ] Connect frontend to Supabase
- [ ] Set up row-level security so only appropriate data is accessible

### Search Tracking
- [ ] Log what learners search for in the catalog
- [ ] Log what results they get (and click vs. skip)
- [ ] Log "zero results" searches — content gaps
- [ ] Build a way to review search logs periodically

### Engagement Events
- [ ] Track time on page (frontend layer, not Brightspace)
- [ ] Log click paths — how learners navigate the catalog
- [ ] Log path navigation patterns
- [ ] Track drop-off points — where learners leave without completing

### Learner Feedback
- [ ] Build a lightweight rating mechanism (e.g., 👍/👎 or stars)
- [ ] Allow learners to flag content (outdated, unclear, etc.)
- [ ] Store usefulness signals by content item
- [ ] Decide: is feedback anonymous or attributed?

---

## Notes & Blockers

> Use this section for notes as you work through Phase 2. Add dates when things happen.

- *(Add notes here)*

---

## Open Questions for Phase 2

- [ ] What's the privacy policy for behavioral tracking? Do learners need to be informed?
- [ ] Is feedback anonymous or tied to learner accounts?
- [ ] What's the data retention policy for event logs?

---

## Resources

- [Phase Overview](overview.md) — Full roadmap context
- [Supabase documentation](https://supabase.com/docs)
