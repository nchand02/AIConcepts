---
name: chapter-review
description: 'Run a structured review of a single AI Learning Portal chapter. Use for: reviewing chapter accuracy, checking for outdated AI concepts, finding missing modern context, identifying repetition and duplication, evaluating readability for semi-technical leaders, checking structural completeness and learning sequence fit, generating rewrite recommendations with priority ranking. Triggers: "review chapter", "chapter review", "check chapter N", "what is missing from chapter", "is chapter N current", "run chapter review", "full review of chapter".'
argument-hint: "Chapter file or number to review (e.g., src/pages/chapters/08-rag.astro or 'chapter 8')"
---

# Chapter Review Skill

A structured end-to-end review of one AI Learning Portal chapter. Performs a comprehensive multi-dimension evaluation — combining structural analysis (breadcrumbs, links, sequence, duplication) with AI concept quality review — and produces a prioritized findings report with rewrite recommendations ready for the **Chapter Editor**.

**Use this skill when you want a single comprehensive review pass.** For targeted reviews, use:
- `@Chapter Auditor` — structural-only quick audit (links, breadcrumbs, meta, sequence)
- `@AI Learning Architect` — deep AI domain accuracy and learning flow only
- `/fact-verification` — fact-check specific claims and benchmark numbers
- `/seo-discoverability` — quick keyword and metadata improvements (editor-ready)
- `@SEO Discoverability Expert` — deep SEO analysis with AI discoverability, FAQ, glossary, and search intent (10 dimensions)

## When to Use

- Before editing any chapter — establishes a quality baseline
- When a chapter feels stale or may contain outdated AI content
- When you want a rewrite plan with explicit priority ordering
- When preparing a chapter for publication or a content sprint

## Inputs

| Input | Required | Description |
|---|---|---|
| Chapter file | Yes | Path (`src/pages/chapters/NN-slug.astro`) or chapter number |
| Reference notes | No | Optional notes, corrections, or external findings to incorporate |

## Procedure

### Step 1 — Locate the Chapter

If given a chapter number (e.g., "chapter 8"), resolve it to the file:
`src/pages/chapters/08-rag.astro`

Refer to [chapter-index.md](./references/chapter-index.md) for the full chapter list and file map.

### Step 2 — Read the Chapter

Read the full chapter file. Do not truncate or skip sections.

Also read:
- The immediately preceding chapter (for sequencing context)
- The immediately following chapter (for duplication check)

### Step 3 — Evaluate Against All Seven Dimensions

Work through each dimension in [review-checklist.md](./references/review-checklist.md). Note every issue with its dimension label and severity.

**Severity scale:**
- 🔴 **Critical** — factual error, broken link, missing required structural element, or content that actively misleads
- 🟡 **Important** — outdated concept, missing modern context, significant duplication, or readability problem that reduces comprehension
- 🟢 **Optional** — SEO improvement, minor wording, enhancement that would add value but is not urgent

### Step 4 — Identify Missing Concepts

For the chapter's topic area, identify:
- Concepts or tools that have emerged since the chapter was likely written (post-2023)
- Standard patterns or practices a semi-technical leader would expect to see
- Cross-references that should link to other chapters but are absent

Flag each as: `[MISSING — <brief reason>]`

### Step 5 — Identify Outdated Concepts

Flag content that is:
- Superseded by a newer model, tool, or technique
- Based on benchmark data that has been meaningfully surpassed
- Referring to a product or service that has changed significantly
- Using terminology that the field has moved away from

Flag each as: `[OUTDATED — <what replaced it or what changed>]`

### Step 6 — Produce Rewrite Recommendations

For every 🔴 and 🟡 finding, produce a one-line recommendation:
- What to change
- What to change it to (or where to look)
- Estimated scope: `[small]` (one sentence), `[medium]` (one section), `[large]` (restructure)

Do not write the rewrite itself — that is the Chapter Editor's job.

### Step 7 — Compile the Report

Format the output using the [report-template.md](./references/report-template.md).

Order findings within each severity tier by impact on the reader.

## Output

A structured report containing:
1. **Summary** — one-paragraph overview of overall chapter health
2. **Missing concepts** — labelled list
3. **Outdated concepts** — labelled list  
4. **Findings by severity** — Critical → Important → Optional
5. **Rewrite recommendations** — one per finding, with scope estimate
6. **Handoff line** — ready-to-use prompt for the Chapter Editor

## Constraints

- Review only one chapter per skill invocation.
- Do not edit any file during this skill — findings only.
- Do not invent corrections; flag uncertain items as `[NEEDS VERIFICATION — <where to check>]`.
- If reference notes are provided, incorporate them as additional context but do not treat them as authoritative without checking against the chapter.
