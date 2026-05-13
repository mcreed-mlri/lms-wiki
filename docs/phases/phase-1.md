# Phase 1 · Connect to Brightspace

**Timeline:** Months 1–2 · **Status:** 🟡 In progress

The goal of Phase 1 is a working, authenticated connection to the Brightspace API and core learner data surfaced in our custom frontend. Everything in Phase 2 and 3 depends on this foundation being solid.

---

## Task Checklist

### Brightspace API Auth
- [ ] Set up OAuth 2.0 connection to Brightspace
- [ ] Implement token management (storage, refresh)
- [ ] Test connection in Brightspace sandbox environment
- [ ] Document the auth flow for future reference

### Pull Core Data
- [ ] Enrollments — who is in which course
- [ ] Completions — who has finished what
- [ ] Grades — quiz and assessment scores
- [ ] Time-in-course — how long learners spend
- [ ] Last accessed — when someone was last active

### Display in Frontend
- [ ] Wire Brightspace data into the custom discovery layer
- [ ] Learner can see their enrolled courses
- [ ] Learner can see their completion status
- [ ] Basic progress display working end-to-end

### SSO / Auth
- [ ] Single login — learner authenticates once, gets into both the frontend and Brightspace
- [ ] No double sign-in required
- [ ] Identity flow tested with a real account

---

## Notes & Blockers

> Use this section for notes as you work through Phase 1. Add dates when things happen.

- *(Add notes here)*

---

## Resources

- [Brightspace API documentation](https://docs.valence.desire2learn.com/) — D2L's official API docs
- [Phase Overview](overview.md) — Full roadmap context
