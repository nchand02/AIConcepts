# Chapter Review Checklist

Evaluate every chapter against all seven dimensions. Only report genuine issues.

---

## 1. Factual Accuracy

- [ ] Are all benchmark numbers sourced or flagged with `<!-- REVIEW: -->`?
- [ ] Are model parameter counts, context window sizes, and release dates correct?
- [ ] Are named capabilities (e.g., "GPT-4 passes the bar exam at 90th percentile") still accurate?
- [ ] Are any claims about model availability, pricing, or licensing still current?
- [ ] Are there unsourced superlatives ("best", "most powerful", "only model that…")?

**Flag as 🔴 Critical** if the error would mislead a reader making a real decision.
**Flag as 🟡 Important** if the error is a stale statistic that weakens credibility.

---

## 2. Currency / Outdated Content

Check for content that may have been accurate at time of writing but has since changed:

- [ ] Are there models, tools, or frameworks mentioned that have been deprecated, acquired, or superseded?
- [ ] Are there techniques described as "new" or "emerging" that are now mainstream or abandoned?
- [ ] Is the knowledge cutoff date implied by the content materially earlier than the current date (May 2026)?
- [ ] Are there existing `<!-- REVIEW: -->` flags in the chapter? List them — they are known debt.
- [ ] Missing major developments: what happened in this topic area between the chapter's implicit date and now?

**Flag as 🔴 Critical** if outdated content could cause a reader to make a wrong technical or business decision.
**Flag as 🟡 Important** if it reduces trust or makes the portal feel unmaintained.

---

## 3. Prerequisites and Learning Sequence

- [ ] Does the chapter use terms or assume concepts not introduced in earlier chapters (1 through N-1)?
- [ ] Is the chapter's complexity level appropriate for its position (Foundations / Applications / Production)?
- [ ] Are there concepts that belong in an earlier chapter but appear here first?
- [ ] Are prerequisite and next-chapter links present in `chapter-meta`?
- [ ] Do the cross-links use the `${base}` variable pattern (not hardcoded paths)?

**Flag as 🔴 Critical** if a required concept is used before it is introduced anywhere in the portal.
**Flag as 🟡 Important** if the chapter assumes knowledge that would trip up the target audience.

---

## 4. Duplication

- [ ] Is any concept explained in full that is already covered in a prior chapter?
- [ ] Are there repeated definitions within this chapter itself?
- [ ] Are there sections that could be reduced to a one-sentence summary + cross-link?

Cross-link pattern: `See <a href="${base}/chapters/NN-slug">Chapter N — Title</a> for a full explanation.`

**Flag as 🟡 Important** if duplication causes a reader to question which explanation is canonical.
**Flag as 🟢 Optional** if the repetition is mild and provides useful reinforcement.

---

## 5. Readability for Semi-Technical Leaders

The audience is CTOs, VPs, engineering managers, and tech leads — people who read technical decisions but do not write production code daily.

- [ ] Are AI terms defined on first use?
- [ ] Are sentences short and in active voice?
- [ ] Is there hype, marketing language, or unexplained jargon? ("revolutionary", "game-changing", "unprecedented")
- [ ] Do learning objectives (in `callout info` with `📌`) use measurable action verbs (Explain, Compare, Identify)?
- [ ] Do the learning objectives match what the chapter actually covers?
- [ ] Is there a concrete, real-world example for each major concept?

**Flag as 🟡 Important** if a key concept is left undefined or a section relies on insider knowledge.
**Flag as 🟢 Optional** for sentence-level style issues.

---

## 6. SEO and Discoverability

- [ ] Does the `description` prop accurately describe the chapter in one sentence?
- [ ] Are `<h2>` and `<h3>` headings descriptive and keyword-rich (not just "Overview" or "Summary")?
- [ ] Are important terms used naturally in headings, not just in body text?
- [ ] Are there missed opportunities to include terms a semi-technical leader would actually search for?

Do not keyword-stuff. Flag only genuine gaps or improvements.

**Flag as 🟢 Optional** unless the description is actively misleading or the headings are completely generic.

---

## 7. Structural Completeness

Required elements in every chapter — flag missing ones as 🔴 Critical:

- [ ] `<nav class="chapter-breadcrumb">` present
- [ ] `<div class="chapter-meta">` with chapter progress (`Chapter N of 15`), prereq link, and next link
- [ ] `<div class="callout info">` with `📌 Learning objectives` containing 4–6 items
- [ ] At least one `<div class="diagram-container">` with a Mermaid diagram
- [ ] All Mermaid `<pre>` elements have `role="img"` and `aria-label`
- [ ] All internal links use `${base}` variable (search for hardcoded `/AIConcepts/`)
- [ ] External links use `target="_blank"`
- [ ] `<!-- REVIEW: -->` comment near the top for any quantitative or time-sensitive claims
