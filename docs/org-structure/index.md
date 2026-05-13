# MLRI Org Hierarchy in Brightspace

This is how MLRI's content is organized inside Brightspace. Every course, program, and training area fits into this structure. Understanding the hierarchy is the foundation for every other decision — naming, versioning, user access, and reporting.

---

## The Hierarchy

```
MLRI
└── Massachusetts
    ├── Legal Skills  (Training Area)
    │   ├── Intro to Legal Skills  (Program)
    │   │   └── Legal Writing Template  (Course Template)
    │   │       ├── ARCHIVED: Legal Writing V1  (Course Offering)
    │   │       └── Legal Writing V2  (Course Offering — current)
    │   └── Client Communication  (Program)
    │       └── ...
    └── Substantive Law  (Training Area)
        ├── Housing Law  (Program)
        │   └── Eviction Defense Basics Template  (Course Template)
        │       └── Eviction Defense Basics  (Course Offering — current)
        └── Benefits Law  (Program)
            └── ...
```

---

## What Each Level Means

### MLRI
The top-level organization. Everything lives under MLRI in Brightspace.

### Massachusetts
The current state/jurisdiction level. This layer exists to leave room for future expansion — other states, regions, partner organizations, or business units could be added here later without restructuring everything else.

### Training Area
Broad content categories that help learners navigate and discover courses. Currently:

- **Legal Skills** — Skills applicable across all practice areas
- **Substantive Law** — Area-specific legal content

See [Training Areas](training-areas.md) for full definitions.

### Program
Groups related learning experiences together. A Program is a named curriculum or topic cluster, like *Housing Law* or *Intro to Legal Skills*. Learners may take multiple Course Offerings within a Program over time.

### Course Template
A container that holds all versions of a course. For example, **Legal Writing Template** holds Legal Writing V1, V2, and any future revisions. Templates are not learner-facing — learners enroll in Course Offerings, not templates. Templates exist to keep version history organized.

### Course Offering
The actual learner-facing course. This is where content, assessments, discussions, completion tracking, and activities live. When you enroll a learner, you enroll them in an Offering.

### Section *(optional)*
A subdivision of a Course Offering. May be useful for different cohorts, organizations, or scheduled runs of the same course. Not required for every course — especially self-paced evergreen content.

---

## Why This Structure

The key design decision here is supporting **evergreen content** — courses that stay live and get updated over time rather than being run once and archived. The hierarchy gives us:

- A clean place for multiple versions of a course to coexist (Course Template)
- A named home for related courses to be discovered together (Program)
- Room to grow into other jurisdictions or partner orgs without restructuring (Massachusetts layer)
- Separation between what learners see (Offerings) and how we manage versions (Templates)
