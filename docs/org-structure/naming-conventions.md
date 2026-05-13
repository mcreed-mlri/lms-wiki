# Naming Conventions

Consistent naming keeps the Brightspace backend clean as the catalog grows. These rules apply to everything we create in Brightspace.

---

## The Rules

### Course Templates
Use the course name followed by **"Template"**.

```
Legal Writing Template
Eviction Defense Basics Template
Client Intake Template
```

Templates are not learner-facing, so the name is purely administrative. The word "Template" makes it immediately obvious this is a container, not an enrollable course.

### Current Course Offerings
Use a clean, readable name — no version number in the title unless needed for clarity. The "current" offering is just the clean name.

```
Legal Writing
Eviction Defense Basics
Client Intake Fundamentals
```

> **Why no version number on the current offering?** Learners see this name. "Legal Writing" reads better than "Legal Writing V2." The version is tracked inside the template container.

### Archived Course Offerings
Prefix with **"ARCHIVED:"** and include the version number.

```
ARCHIVED: Legal Writing V1
ARCHIVED: Eviction Defense Basics V1
```

Archived offerings should also be **hidden** from learners so they don't accidentally enroll. The ARCHIVED prefix makes them easy to spot in admin views.

### Programs
Plain descriptive name — no special prefix. Should be clear to a learner browsing a catalog.

```
Intro to Legal Skills
Housing Law
Benefits Law
Client Communication
```

### Training Areas
Broad, stable category names. We currently have two:

```
Legal Skills
Substantive Law
```

See [Training Areas](training-areas.md) for what belongs in each.

---

## Quick Reference

| Item | Format | Example |
|---|---|---|
| Course Template | `[Name] Template` | `Legal Writing Template` |
| Current Offering | Clean name, no prefix | `Legal Writing` |
| Archived Offering | `ARCHIVED: [Name] V#` | `ARCHIVED: Legal Writing V1` |
| Program | Plain descriptive name | `Housing Law` |
| Training Area | Broad category | `Legal Skills` |

---

## When to Increment the Version Number

The version number (V1, V2) tracks major revisions — not minor edits. See [Versioning & Archiving](../policies/versioning.md) for the full policy on when to create a new version vs. editing in place.
