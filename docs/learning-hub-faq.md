## **Training Unit: Learning Hub FAQ**

| Note: Please don't worry about formatting. Add/modify any questions you can think of\!  Just highlight in any color to draw my attention 🙂 |
| :---: |

**How to read this FAQ:** answers are written in plain language for the Training Unit. Where an answer is settled, it is stated directly. Where a decision has not been made yet, the answer says **Decision pending** and points to where it is being worked out. Two names come up a lot: the **Learning Hub** is the friendly front door learners use, and **Brightspace** is the system underneath that signs people in, hosts courses, and keeps the official records.

| Topic | Covers |
| :---- | :---- |
| 1. Big Picture | What LACE and the Learning Hub are, how they relate to Brightspace, what works today, when it launches |
| 2. Users, Onboarding, and Growth | User types, how people are added, profile attributes, how the platform grows |
| 3. Access, Permissions, and Compliance | Who sees what, UPL, security, certificates, CLE, privacy, data storage |
| 4. Course Structure and Content Management | How courses are built and organized, how non-coders can create courses, completion, where content lives, old versions |
| 5. Law Changes and Evergreen Courses | Minor vs. major updates, learner notices, what happens to past completions |
| 6. Data, Reporting, and Evaluation | What we can measure, reporting needs, Learning Groups, evaluation |
| 7. Technical Foundations | Plain definitions: LMS, Brightspace, API, OAuth, SSO, Supabase, Brightspace Manager, the wrapper, the app |
| 8. Learner Experience | Mobile, finding courses, progress, support, login, accessibility, languages |

## **1\. Big Picture**

**What LACE and the Learning Hub are**

- **What is LACE?** LACE is MLRI's learning initiative: a shared training platform for the Massachusetts legal aid community, built and run by the Massachusetts Law Reform Institute (MLRI). Its purpose is to strengthen legal aid by strengthening learning.
- **What is the Learning Hub?** The Learning Hub is the experience we are building around Brightspace. It gives learners a cleaner front door for finding training, while Brightspace stays the system underneath for sign-in, hosting, enrollments, completion records, and certificates.
  - **How does it support the Training Unit?** It moves the team from one-off training delivery to a reliable learning system: a shared catalog, structured user profiles, clearer access rules, durable records, and better signals about what learners need next.
  - **How is it different from Brightspace?** The Learning Hub is the front door and learner experience (landing page, search, filters, dashboard, clean course view). Brightspace is the engine and source of truth (sign-in, hosting, enrollments, progress, completion, certificates, grades, audit records).

- **Learner flow**
  - **What happens when a learner signs in?** Brightspace confirms who they are through a trusted login.
  - **What does the learner see first?** Their dashboard, with training that fits their profile (user type, jurisdiction, practice area).
  - **How does a learner find and start a course?** Through the dashboard, search, filters, and recommendations that point to relevant training.
  - **Where is learner progress recorded?** In Brightspace, the official record. The Learning Hub can display that progress, but it does not replace Brightspace as the record keeper.

- **Learning Hub vs. Brightspace**
  - **What happens in the Learning Hub?** The landing page, dashboard, search, filters, recommendations, profile updates, and the clean course entry point.
  - **What happens in Brightspace?** Authentication, course hosting, enrollments, progress, completion, certificates, grades, and official audit records.
  - **What happens in Brightspace Manager?** Brightspace Manager is the staff/admin command center we are building behind the Learning Hub. It is for course building, draft management, sync checks, file review, publishing workflows, and system monitoring. It lets staff manage the platform without turning the learner-facing Learning Hub into a cluttered admin tool.
  - **Which system is the "source of truth"?** Brightspace, for courses, progress, completion, and certificates. The Learning Hub displays and enriches that information; it does not own it.

- **Where the build stands**
  - **Is it live yet, and what works today?** It is an early working version (a "spike"), not the finished product. Today: the course wrapper can deliver courses, the Learning Hub connects to Brightspace through a secure login (OAuth), and it can read a test course and sync that course's basic information into our own database. Learner dashboards, manager views, and reporting are still being built.
  - **When does it launch?** Pilot 1 (internal LACE cohort, Pre-Trial Skills) is planned for September 2026. Pilot 2 (broader legal aid community) for October 2026. A partial public launch (Foundations, Pre-Trial, and Trial Skills) is planned for mid-January 2027.

## **2\. Users, Onboarding, and Growth**

- **User types**
  - **Who are the different user types?** Licensed attorney (broadest access), paralegal (works under attorney supervision), advocate (trained non-lawyer who helps clients, within a defined scope), and community member (general public, foundational material only).
    - **How do these differ from "role types" (learner, admin, manager)?** A user type describes the person's professional identity and controls course access and certificate wording. A system role describes what the person can do in the software (learner, manager, admin, org administrator).
  - **How do attorneys, paralegals, advocates, and community members differ in the system?** Each tier reaches different content and different certificate language, scaled to professional responsibility and legal risk. Attorneys can reach attorney-only material; community members see the most limited, public-facing content.
  - **What access does each user type need?** **Decision pending.** The exact access and completion language for each user type is still under legal sign-off (see Team Wiki, User Types & Access Matrix). The agreed principle is broadest access for attorneys and the tightest gate for community members.

- **Onboarding**
  - **How will learners be added to the platform?** MLRI staff: mostly automatic, using known staff records and bulk attribute uploads. Partners and volunteers: through a sign-up flow, an invitation, or an admin-created account. Future external users: through a more formal front-door workflow with eligibility checks where needed. **Decision pending:** whether learners self-register or are admin-created is not finalized (Team Wiki Open Items).
  - **What information do we need from learners when they join?** Name, email, user type, jurisdiction, practice area, organization, and onboarding date.
  - **What information should we avoid collecting?** Sensitive client information, unnecessary demographic detail, free-text legal facts, and anything we do not need for access, training, reporting, compliance, or support. Collect less by default.

- **User attributes**
  - **What are user attributes and how will they be collected?** User attributes are controlled profile labels that travel with a learner, such as user type, jurisdiction, practice area, bar number, and onboarding date. They are collected at onboarding, through bulk uploads, and through course activities. **Decision pending:** the final attribute set is not yet frozen (Team Wiki Open Items).
  - **How are attributes used to organize learners?** They route learners to the right training, drive Learning Groups, power recommendations, and support reporting, without manual course-by-course placement.
  - **How are attributes updated if someone changes role or organization?** Admins control high-impact fields (user type, organization, jurisdiction, eligibility) when those fields affect access or certificates. Learners can update low-risk preferences themselves.

- **Profile information**
  - **How might we collect learner profile information over time?** Through a future My Profile page, onboarding, forms or surveys, and course activities.
  - **Could we collect some information through forms, surveys, or course activity?** Yes. Course activities can capture one-time confirmations such as a UPL acknowledgement, a bar-number prompt, or a welcome survey response.
  - **What information should learners be able to update themselves?** Low-risk preferences such as practice areas and interests. High-impact fields that affect access or certificates stay admin-controlled.

- **Growth**
  - **How do we scale the Learning Hub as more learners, courses, and states are added?** By configuration wherever possible: add users through invitations, bulk upload, or sign-up flows; add courses as new Course Offerings under a predictable structure; add practice areas as controlled attributes and filters; add states as new jurisdiction branches.
  - **How do we expand safely in Brightspace?** Keep each state in its own branch instead of mixing state-specific law, follow the archive-never-delete rule, and use consistent naming.

- **Training history**
  - **What happens if a learner changes organizations?** The account stays; the learner is moved between the relevant organization groups rather than recreated.
  - **What happens if a learner leaves legal aid?** The account is deactivated or removed from active groups, not deleted, and the date and reason are recorded.
  - **Can a learner keep access to past certificates or completion records?** Records are preserved under the archive-never-delete rule, so past completions and certificates stay historically true even after a move or departure.

## **3\. Access, Permissions, and Compliance**

- **The legal bright line (UPL)**
  - **What is UPL and why does it shape access?** UPL is the unauthorized practice of law. A non-lawyer must never receive access, certificates, or completion wording that suggests authority to practice law. This is why access and certificates are tied closely to user type.

- **Access rules**
  - **Who can see what?** Access is based on user type, jurisdiction, practice area, and organization or group.
  - **How does the platform decide what each learner can see or access?** It reads those signals: user type sets the professional access level and certificate language, jurisdiction sets which state's content appears, practice area drives recommendations, and organization or group drives team views and required training.
  - **What happens if someone has more than one role?** They can belong to more than one group. Access is additive for appropriate training but conservative on legal-risk boundaries: when there is uncertainty, the safer user type wins until an admin verifies the record.

- **Progress visibility**
  - **Who can view learner progress?** Learners see their own; managers see the learners they are responsible for; the Training Unit sees patterns needed to support and improve courses; admins see system health.
  - **Who can view completion records?** The same viewers, with Brightspace holding the official completion records.
  - **Can managers see individual learner activity, or only summaries?** Managers may need individual completion status for required training. Broader evaluation reporting should prefer summaries unless individual detail is genuinely needed.

- **Security**
  - **How is access kept secure?** Through a trusted Brightspace-supported sign-in (OAuth or another approved setup), approved-user controls, and least-privilege roles.
  - **How do we make sure only approved users can enter the platform?** Through account creation, invitations, or eligibility checks that decide who can enter.
  - **What happens when someone leaves an organization?** The account is deactivated or removed from the organization's active groups, not deleted, with the date and reason recorded.

- **Certificates**
  - **How are certificates and training records handled?** Certificates are built from Brightspace completion records and must match the learner's verified user type.
  - **How do we make sure a paralegal, advocate, or non-attorney never receives an attorney certificate?** Certificate language is role-appropriate, attorney or CLE wording appears only for a verified attorney, and user type is verified before issuing.
  - **What information appears on a certificate?** Learner name, course title, completion date, role-appropriate language, and a bar number only where attorney compliance requires it.
    - **Do we want to allow learners to share certificates on LinkedIn or other platforms?** **Decision pending.** Sharing should be a future product and policy decision, and we should agree on appropriate public wording before enabling it.
  - **Does completion earn CLE credit?** The system is built to support CLE: Brightspace records official visits and completions that can feed jurisdictional CLE reporting, and CLE language appears only for verified attorneys. **Decision pending:** whether a specific course is accredited for CLE credit is a per-course decision and is not yet established.

- **Privacy**
  - **How do we protect learner personal information?** We collect less by default and store only what we need. Brightspace holds the official records, the custom layer holds limited engagement and profile data, and sensitive client information is never collected.

- **Data storage**
  - **Where is learner data stored?** Across two places: Brightspace for official records, and our custom layer (Supabase) for catalog and engagement data.
  - **What data is stored in Brightspace?** Enrollments, progress, completion, grades, and certificates.
  - **What data is stored outside of Brightspace?** Catalog metadata, search behavior, ratings, profile preferences, and dashboard data.

## **4\. Course Structure and Content Management**

- **Brightspace structure**
  - **How is Brightspace organized?** As a tree: MLRI at the top, then state or jurisdiction, then Training Area, then Program, then Course Template, then Course Offering, then optional Section.
  - **What are the main levels or containers?** Course Template is the master container for a course and its versions (learners do not enroll here). Course Offering is the live version people actually take (learners enroll here).
  - **How do programs, courses, modules, and activities fit together?** A Program is a topic cluster (such as Housing Law); a Course Offering is the live course; modules are its major parts; activities are what the learner does inside them.

- **Course basics**
  - **What is a course made of?** Modules, topics or pages, activities, knowledge checks, and sometimes a certificate.
  - **What does a learner actually do inside a course?** They read, watch, work through activities, and complete knowledge checks.
  - **What is the difference between a course, module, activity, quiz, and certificate?** A course is the full training on one subject; a module is a major part of it; an activity is something the learner does (reflection, scenario, checklist); a quiz is a knowledge check; a certificate is the record a learner can receive after meeting completion requirements.

- **Who builds courses**
  - **Who builds and maintains courses?** One central course owner builds courses as custom HTML files locally, tests them, then uploads them to Brightspace. Custom HTML is the default course model; native Brightspace tools (quizzes, surveys, discussions) are used only when they are simpler than custom HTML for a specific need.
  - **What if I want to create a course but I do not code?** The goal is for Brightspace Manager to provide a course builder where staff can draft a course from structured fields and reusable templates: course title, description, modules, topics, activities, resources, and completion rules. Behind the scenes, the system can turn that structured draft into the HTML wrapper/course package and Brightspace-ready files. Staff should not need to hand-code HTML for every course.
  - **Can I still use Brightspace-native course tools?** Yes, when they are the best fit. Quizzes, surveys, discussions, assignments, certificates, release conditions, and Intelligent Agents can still live in Brightspace. Brightspace Manager should help us decide and document which pieces are custom Learning Hub content and which pieces are native Brightspace activities.
  - **What will a non-code course workflow look like?** Draft in Brightspace Manager, preview the course, check accessibility and completion rules, export or publish to Brightspace, then sync the course metadata into the Learning Hub catalog. Brightspace remains the official LMS record; Brightspace Manager is the easier authoring and operations layer.
  - **How do courses work across states?** As one "course family" (for example, Eviction Defense) with a separate Course Offering for each state, because law, forms, deadlines, and local resources differ. Shared source material is reused, but learner-facing legal guidance stays specific to each state.

- **Completion**
  - **What does completion mean?** A recorded finish of a Course Offering in Brightspace.
  - **What actions count toward completion?** Opening a page is not enough. Completion should require at least one real action: a quiz, check-in, reflection, scenario, upload, acknowledgement, or deliberate mark-complete.
  - **Can completion mean different things for different courses?** Yes, but it should always be documented clearly in Brightspace so the record and certificate mean something.

- **Content storage**
  - **Where is our content stored?** In several places, each with a job: course-specific HTML, images, and documents in Brightspace Manage Files; shared styling, logos, and templates in Organization Files; video and audio (with captions and transcripts) in the Media Library; reusable modules in the Learning Object Repository (LOR); catalog and search data in the Learning Hub; and drafts and working files in Google Drive or another shared system before publication.
  - **What lives in Brightspace?** The published course files and the official course records.
  - **What lives in the Learning Hub?** Catalog metadata, search, recommendations, dashboard display, and profile-driven course surfacing.
  - **What lives somewhere else, like Google Drive?** Drafts, source documents, planning files, and working materials before they are published.

- **Old versions**
  - **What happens to old course versions?** They are archived, never deleted: renamed clearly (for example, `ARCHIVED: [Name] V#`) and hidden from the catalog, but kept so past completions still make sense.
  - **When do we archive Learning Hub content?** Once a course is replaced by a new version, or is no longer current.
  - **How do we prevent learners from using outdated materials?** By hiding old offerings and old Learning Hub cards from the catalog while keeping the records attached for audit.

## **5\. Law Changes and Evergreen Courses**

- **Law changes**
  - **How do we manage course updates when the law changes?** Minor changes are edited in the live offering. Major changes (including law changes) create a new Course Offering, and the old one is archived.
  - **Who decides whether a change is minor or major?** The Training Unit owns the content decision, with legal subject-matter input when needed. The platform supports the decision; it does not decide legal significance on its own.
  - **How quickly do updates need to happen?** As quickly as the legal significance requires, with critical changes prioritized. **Decision pending:** a formal turnaround standard has not been set.

- **Minor updates**
  - **What counts as a minor update?** Typos, broken links, formatting, clarified wording, and small example changes.
  - **Can we fix typos, links, examples, or small clarifications without creating a new version?** Yes. These are edited directly in the live offering. Version numbers track major revisions only.
  - **How are minor updates documented?** Lightly, enough to keep a record of what changed.

- **Major updates**
  - **What counts as a major update?** A meaningful law, regulation, procedure, or practice change, a major rewrite, new required content, or new completion rules.
  - **When does a law change require a new course version?** When it changes what the course teaches.
  - **When should an older version be archived?** Once the new offering is live: rename the old one and hide it from learners.

- **Learner notifications**
  - **How are learners notified when the law changes?** Through Brightspace email today, with dashboard banners planned for the future. Critical updates may also need direct team outreach.
  - **Can learners be asked to review an update?** Yes, either as a recommended review or a required retake.
  - **How do we track who has reviewed updated material?** Through Brightspace completion of an update module or a retake of the new version.

- **Past completion**
  - **What happens to learners who completed an older version?** Their past completion remains historically true.
  - **Does their certificate still count?** Usually yes, for the version they completed, though current compliance may require the newer version.
  - **Do they need to retake the course or only review the update?** It depends on the change: no action, a recommended review, or a required retake by a stated date.

## **6\. Data, Reporting, and Evaluation**

- **Available data**
  - **What data will we have access to?** Two kinds: official records from Brightspace, and richer engagement data from the custom layer.
  - **What does Brightspace track automatically?** Enrollments, course starts, topic visits, progress, completions, grades, and certificates.
  - **What does the Learning Hub track separately?** Search terms, filters, ratings, profile preferences, drop-off points, and dashboard interactions.

- **Learner activity**
  - **Can we see course starts, progress, completion, and certificates?** Yes, these are official Brightspace records.
  - **Can we see whether learners watched videos or opened materials?** We can see topic visits reliably. Video-watching behavior is partially visible and should be interpreted carefully.
  - **What activity data is reliable, and what should we be careful interpreting?** Reliable for records: enrollment, completion, certificates, grades, and tracked visits. Interpret carefully: time on page, video behavior, search terms, ratings, and drop-off, which show patterns rather than full explanations.

- **Reporting**
  - **What reports will the Training Unit need?** Enrollment, completion, feedback, course performance, learner demand, and where people get stuck.
  - **What if I want to monitor Learning Hub data?** Brightspace Manager is where staff should go for the operating dashboard: sync status, catalog health, course inventory, broken links, file checks, draft/publish status, and basic Learning Hub engagement signals. The Learning Hub can show simple staff summaries, but the deeper monitoring view belongs in Brightspace Manager.
  - **What data should Brightspace Manager show first?** Start with practical operating questions: Did the Brightspace sync run? Which courses are visible in the Learning Hub catalog? Are any launch links broken? Which courses have missing descriptions, dates, completion rules, or audience tags? Are learners searching for topics that do not exist yet?
  - **What reports will managers or partners need?** Managers: team progress, overdue required training, certificates, and deadlines. Partners: participation and completion for their own learners or agreed program groups.
  - **What reports are required for grant, funder, or internal evaluation purposes?** Aggregate participation, completion, reach, topic coverage, and evaluation outcomes such as usefulness and equity of access.

- **Learning Groups**
  - **How do the Manager Dashboard and Learning Groups work?** Learning Groups can automatically enroll learners based on attributes (user type, jurisdiction, practice area, organization). The Manager Dashboard lets supervisors view team progress in one place.
    - **Do we need them, or might this be a feature to explore in the future?** They are useful once attributes are stable but are optional for a small pilot. **Decision pending:** which groups are automatic versus manual is not finalized (Team Wiki Open Items).
  - **How are learners assigned to groups?** By attributes, or manually.
  - **Can learners belong to more than one group?** Yes.

- **Evaluation**
  - **What data will help us know whether trainings are useful?** Completion combined with feedback, learner confidence, course quality, equity of access, and training gaps.
  - **How will we collect learner feedback?** Through course ratings, short surveys, reflection prompts, support requests, search behavior, and completion patterns.
  - **How will we use data to improve future trainings?** As an improvement loop: what learners look for, where they struggle, and what training the team should build or revise next.

## **7\. Technical Foundations**

- **Key terms**
  - **What is an LMS?** A Learning Management System: the software that hosts courses, signs learners in, tracks progress, and stores records. Brightspace is our LMS.
  - **What is Brightspace (D2L)?** Our LMS, made by a company called D2L. It is the engine underneath the Learning Hub.
  - **What is an API?** A controlled doorway between systems. Only specific, permitted information passes through, and only for approved requests.
  - **What is OAuth?** A standard way to sign in through a trusted provider without handing your password to every app you use.
  - **What is SSO?** Single sign-on: one login that carries across the Learning Hub and Brightspace so learners do not have to sign in twice. (Still being set up.)
  - **What is a system of record?** The authoritative source for a type of data. For training records, that source is Brightspace.
  - **What is Supabase (our database)?** The database service behind the custom layer. It supports speed, search, dashboards, and engagement features; it does not replace Brightspace records.
  - **What is Brightspace Manager?** The LACE-built admin command center and course builder. It gives staff a simpler place to create courses, inspect Brightspace/Learning Hub data, monitor sync health, review files and links, and manage publishing workflows without coding.
  - **What is a custom frontend?** The Learning Hub interface we control, layered over Brightspace.
  - **What is the wrapper?** The shared LACE navigation and design that surrounds course pages, so every course looks and feels consistent inside Brightspace.
  - **What is the installable app (PWA)?** The Learning Hub is a Progressive Web App, so learners can add it to their phone's home screen like an app, with nothing to download from an app store.

- **System roles**
  - **What information lives in Brightspace and in Supabase?** Brightspace holds the official records (enrollments, progress, completion, grades, certificates). Supabase holds catalog data, engagement signals, and profile preferences.
  - **What information lives in the Learning Hub?** The experience layer: the catalog, search, dashboards, recommendations, and clean course entry.

- **Data collection**
  - **Will the customized HTML wrapper affect data collection?** No, as long as course navigation points to Brightspace's official topic URLs.
  - **Will learner progress still be recorded correctly?** Yes. The clean course view still lets Brightspace record visits and completion, as long as links use official topic URLs.
  - **What data might Brightspace miss if content is displayed differently?** If content bypasses official topic URLs, visits and completion may not record. So the rule is to point course links at Brightspace topic URLs.

- **IT support**
  - **What needs Brightspace support?** Tenant setup, the vanity URL and SSL, SSO deep-linking, OAuth app registration, and confirming API versions. Note: after implementation ends, D2L moves to Standard Support, meaning tickets and help resources but no dedicated implementation manager.
  - **What needs to be documented for security or long-term maintenance?** OAuth applications and scopes, the service user, where each attribute comes from, offboarding steps, and key decisions.

## **8\. Learner Experience**

- **Mobile use**
  - **Can learners easily use the Learning Hub on their phones?** Yes. It works in a phone browser and can be installed like an app by choosing "Add to Home Screen," after which it opens from the home screen with its own icon. (This is the installable LACE app, a PWA, not Brightspace Pulse.)
  - **Are there any mobile limitations?** One small one: on iPhone or iPad, opening a course page that still lives directly on Brightspace may briefly show the Safari browser interface, because Brightspace is a separate website outside the Learning Hub app. The plan is to move more course pages to Learning Hub-owned URLs over time.

- **Finding courses**
  - **How will learners find courses?** Through search, browsing by category, filters, and recommendations.
  - **Can learners search, filter, or browse by topic?** Yes: search by keyword, browse by category (such as Legal Skills or Substantive Law), and filter by jurisdiction, practice area, role, format, or completion status.
  - **How will learners know which courses are relevant to them?** The dashboard surfaces training that fits their profile (jurisdiction and practice area).
    - **Should we set up recommendations by practice area?** Yes, as a good future layer once profile data is reliable.

- **Progress tracking**
  - **How will learners know what they have started?** Through a dashboard area for in-progress courses with resume links.
  - **How will learners know what they have completed?** Through a completed-courses or history view, based on Brightspace records.
  - **Where will learners find certificates?** In a certificates area that points back to the official Brightspace certificate.

- **Support**
  - **What happens if a learner gets stuck?** They are routed to the right owner based on the kind of issue.
  - **Who should learners contact for help?** It depends on the issue (see below).
  - **What issues go to the Training Unit, IT, or Brightspace support?** Course content questions go to the Training Unit or course owner. Certificate or completion concerns go to the Training Unit first, with Brightspace admin help if a record needs review. Login or password issues go to Brightspace support, IT, or the identity-provider path. Broken links and display problems go to Learning Hub technical support. Access that looks wrong goes to the Training Unit or admin to review user type, jurisdiction, organization, and group assignments.

- **Login experience**
  - **What happens if a learner forgets their password?** They use the configured Brightspace or identity-provider reset flow, not a separate Learning Hub-only workaround.
  - **How do we make the login process as simple as possible?** Through a single trusted sign-in path. The goal is single sign-on (SSO), so one login carries across both the Learning Hub and Brightspace.

- **Accessibility**
  - **Is the Learning Hub accessible for screen readers, captions, and keyboard navigation?** We are building toward it: video and audio go in the Media Library with captions and transcripts, and accessibility is a current (June 2026) hardening priority. **Decision pending:** the formal target standard (such as ADA / Section 508 / WCAG conformance level) is still being set.

- **Languages**
  - **Is the Learning Hub available in other languages?** The Brightspace interface can show some text in multiple languages based on locale settings, including English, Spanish, Hmong, Somali, and Karen. Course content itself is authored per language, and is mostly English for the pilot. **Decision pending:** which courses get translated, and into which languages, is a future decision.
