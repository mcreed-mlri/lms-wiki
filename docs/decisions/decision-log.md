# Decision Log

Every significant decision about how we build and run the MLRI Brightspace system lives here — what was decided, when, and **why**. The "why" is the most important part. It prevents future-you from second-guessing choices that were made for good reasons.

**Open decisions are at the top.** Resolved ones are below.

---

## Open — Needs a Decision

### Versioning Threshold
**Question:** When do we archive a course and create a new offering vs. updating the existing one in place? We need a clear line between "minor" and "major."

**Why it matters:** Without a defined threshold, this becomes a judgment call every time — and over time, inconsistent decisions make the catalog messy. A clear rule also helps us communicate to learners when they need to retake something.

**Options being considered:**
- Archive only when the law changes or >30–40% of content is replaced
- Archive any time a new assessment is added
- Archive any time completion requirements change

**Status:** Open · Added 2026-05-13
**See:** [Versioning & Archiving policy](../policies/versioning.md)

---

### Learner Update Notices
**Question:** If enrolled learners need to know about a significant content change, how do we reach them reliably? Brightspace email has deliverability limitations.

**Why it matters:** Legal professionals need accurate information. If a law changes and we update a course, we need to be confident the right people actually see the notice — not just that we sent an email that may have gone to spam.

**Options being considered:**
- Brightspace email only (available now, but unreliable for critical notices)
- Custom frontend dashboard notification (reliable, but not built until Phase 3)
- Direct outreach by the training team for critical updates

**Status:** Open · Added 2026-05-13
**See:** [Learner Update Notices policy](../policies/learner-updates.md)

---

### Sections vs. New Offerings for Cohorts
**Question:** When we have different cohorts, organizations, or scheduled runs of the same course — do we use Brightspace Sections inside one Offering, or create a separate Offering for each?

**Why it matters:** This affects enrollment management, completion reporting, and how much administrative overhead is created for every new cohort.

**Options being considered:**
- Sections inside one Offering (less clutter, but may complicate reporting)
- Separate Offerings per cohort (cleaner reporting, but more objects to manage)

**Status:** Open · Added 2026-05-13

---

### Discover Page vs. Custom Catalog
**Question:** Are we using Brightspace's built-in Discover page, our own custom frontend catalog, or both for learners to find courses?

**Why it matters:** This affects Phase 1 scope and the long-term UX of the platform. Running both requires keeping them in sync.

**Status:** Open · Added 2026-05-13

---

## Resolved Decisions

### Use Training Area as a new hierarchy layer
**Decision:** Add a **Training Area** layer between Massachusetts and Program in the Brightspace hierarchy.

**Why:** Without it, the catalog would be a flat list of Programs with no navigational grouping. As the catalog grows, learners and admins would have no way to quickly filter or browse by content type.

**What we decided:** Start with two Training Areas: **Legal Skills** and **Substantive Law**.

**Resolved:** 2026-05-13 · [See Training Areas](../org-structure/training-areas.md)

---

### Use Program → Course Template → Course Offering structure
**Decision:** Organize content as: Program → Course Template → Course Offering (with optional Section).

**Why:** This structure supports evergreen courses by giving each "course family" a container (Template) that holds all versions. It also separates the learner-facing name (Offering) from the administrative container (Template), keeping the catalog clean while preserving version history.

**Resolved:** 2026-05-13 · [See Org Hierarchy](../org-structure/index.md)

---

### Naming convention for templates and archived offerings
**Decision:** Templates use `[Name] Template`. Archived offerings use `ARCHIVED: [Name] V#`. Current offerings use a clean name with no prefix or version number visible to learners.

**Why:** Makes administrative views scannable. The ARCHIVED prefix is immediately visible in dropdown lists and search. The clean name for current offerings keeps the learner experience tidy.

**Resolved:** 2026-05-13 · [See Naming Conventions](../org-structure/naming-conventions.md)

---

*To add a new decision: copy the Open template above, fill in the question and context, and add today's date.*
