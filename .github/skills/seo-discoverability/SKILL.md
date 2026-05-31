---
name: seo-discoverability
description: 'Improve SEO and discoverability of an AI Learning Portal chapter. Use for: improving page title and meta description, strengthening headings with natural keywords, finding internal link opportunities, improving semantic clarity for search engines and AI tools. Does NOT keyword-stuff or change content meaning. Triggers: "improve SEO", "improve discoverability", "add keywords", "fix metadata", "improve headings", "internal links", "meta description", "improve search ranking", "SEO review", "keyword opportunities", "improve page title", "semantic clarity".'
argument-hint: "Chapter file or number to improve (e.g., src/pages/chapters/08-rag.astro or 'chapter 8')"
---

# SEO and Discoverability Skill

Audits a single chapter for SEO and discoverability improvements, then produces an actionable set of recommendations: heading rewrites, keyword additions, metadata improvements, and internal link opportunities. All recommendations must serve the reader first — no keyword stuffing, no meaning changes.

Does **not** edit files directly. Produces inputs for the Chapter Editor.

## When to Use

- After content edits to check whether headings still reflect the final content
- When a chapter covers a high-value topic but isn't discoverable (e.g., "RAG" is searched as "retrieval augmented generation" but the chapter only uses the acronym)
- When adding a new chapter and wanting to optimize it before the first deploy
- As part of the `/chapter-review` workflow's SEO dimension

## Inputs

| Input | Required | Description |
|---|---|---|
| Chapter file | Yes | Path (`src/pages/chapters/NN-slug.astro`) or chapter number |
| Target audience search intent | No | Optional note on how the audience typically searches for this topic |

## What This Skill Covers

| Dimension | What is checked |
|---|---|
| **Page title** | `title` prop in `<BaseLayout>` — does it accurately reflect the chapter and include the primary keyword? |
| **Meta description** | `description` prop — is it specific, 140–160 chars, includes the primary keyword naturally? |
| **H1** | Chapter heading — matches title, includes primary keyword |
| **H2 / H3 headings** | Are they descriptive and keyword-rich, or generic ("Overview", "Summary", "Example")? |
| **Primary keyword** | The one term a target reader would most likely search for this topic |
| **Secondary keywords** | Related terms and synonyms a reader might use |
| **Acronym clarity** | Are acronyms always introduced with their full form on first use? (Good for search and accessibility) |
| **Internal links** | Are there cross-chapter link opportunities that would improve navigation and semantic structure? |
| **Missing anchor text** | Are existing links using descriptive anchor text ("RAG pipeline architecture") vs. bare URLs or "click here"? |

## Procedure

### Step 1 — Locate the Chapter

Resolve the chapter number to a file path. Refer to [chapter-index.md](./references/chapter-index.md) if needed.

### Step 2 — Read the Chapter Metadata and Structure

Read:
- `title` prop and `description` prop in `<BaseLayout>`
- The `<h1>` heading
- All `<h2>` and `<h3>` headings
- All existing internal links (`href="${base}/...`) and their anchor text
- The learning objectives callout

Do not read the full body text until Step 4.

### Step 3 — Identify the Primary and Secondary Keywords

Based on the chapter title, topic, and audience (semi-technical leaders: CTOs, VPs, engineering managers, tech leads), determine:

- **Primary keyword**: The single most likely search query for this chapter's topic
- **Secondary keywords**: 3–6 related terms, synonyms, or common variants

Use [keyword-guidance.md](./references/keyword-guidance.md) for topic-specific keyword lists and rules.

**Rule**: Keywords must already reflect what the chapter actually covers. Do not suggest keywords for content that doesn't exist.

### Step 4 — Audit Each SEO Dimension

Read the full chapter. Evaluate each dimension in the [seo-checklist.md](./references/seo-checklist.md).

For each issue found, record:
- **Dimension** (title / description / heading / keyword / internal-link / acronym)
- **Current state** (exact quoted text)
- **Suggested improvement** (exact replacement text)
- **Rationale** (one line — why this helps the reader or search engine)

### Step 5 — Find Internal Link Opportunities

Scan the chapter for concepts that are covered in depth in another chapter but are mentioned here without a link. Cross-reference the [chapter-index.md](./references/chapter-index.md).

For each opportunity:
- Quote the sentence where the link should be added
- Name the target chapter
- Suggest exact anchor text

**Rule**: Only suggest links where the cross-chapter context genuinely helps the reader. Do not link every mention of a term.

### Step 6 — Produce the Report

Format using [seo-report-template.md](./references/seo-report-template.md).

Order suggestions by impact: metadata first (highest reach), then headings, then keywords in body, then internal links.

## Output

A structured report containing:
1. **Summary** — overall SEO health score (Good / Needs work / Poor), primary and secondary keywords identified
2. **Metadata improvements** — title and description rewrites
3. **Heading improvements** — specific H2/H3 rewrites
4. **Keyword opportunities** — where to naturally add or surface terms already in the content
5. **Acronym / full-form gaps** — terms introduced as acronyms without expansion
6. **Internal link opportunities** — sentence-level additions
7. **Anchor text fixes** — existing links with weak anchor text
8. **Handoff line** — ready-to-use prompt for the Chapter Editor

## Constraints

- Do **not** suggest adding keywords that require new content to support them.
- Do **not** suggest keyword density targets or mechanical repetition.
- Do **not** change the meaning of any heading or sentence.
- Do **not** edit files — this skill produces recommendations only.
- All suggestions must serve the reader first; SEO benefit is secondary.
- Keep suggested meta descriptions between 140 and 160 characters.
- Never suggest removing a cross-link that already exists and is accurate.
