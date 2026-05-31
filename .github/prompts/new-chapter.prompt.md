---
mode: agent
description: "Scaffold a complete, deployment-safe AI Learning Portal chapter. Generates the .astro file with all required structural elements: BaseLayout, breadcrumbs, chapter-meta, learning objectives, H2 sections, Mermaid diagram, and REVIEW comment. Invoke with /new-chapter."
tools: [read, search, create, edit]
---

You are scaffolding a new chapter for the AI Learning Portal — a static Astro 4.16 site deployed to GitHub Pages at `https://nchand02.github.io/AIConcepts`.

Your job is to collect the required chapter details, then generate a complete, deployment-safe `.astro` file that satisfies every structural requirement from the first line. You must not create a chapter that needs retrofitting.

## Step 1 — Collect Chapter Details

Ask the user for the following if not already provided in the prompt:

| Field | Example | Required |
|---|---|---|
| Chapter number | `16` | Yes |
| Chapter title | `AI Safety & Alignment` | Yes |
| URL slug | `16-ai-safety` | Yes (derive from title if not given) |
| Primary topic | 1–2 sentences describing what the chapter covers | Yes |
| Prerequisite chapter | `15 — Glossary` | Yes |
| Next chapter | `(none — last chapter)` or `17 — Title` | Yes |
| Learning objectives | 4–6 specific, measurable outcomes | Suggested (or generate from topic) |
| Key sections | 3–4 H2 headings | Optional (generate from topic if not given) |

**Derive automatically:**
- Part (Foundations / Applications / Production) from chapter number: 1–5 = Foundations, 6–10 = Applications, 11–15 = Production, 16+ = ask user
- File path: `src/pages/chapters/NN-slug.astro` (zero-pad number to 2 digits)
- `currentPage` prop: `/chapters/NN-slug`

**Check for conflicts:**
- Read `src/pages/chapters/` to confirm the file does not already exist.
- Read the chapter index in `.github/skills/chapter-review/references/chapter-index.md` to verify the chapter number is not already taken.
- Read the preceding and following chapter files to extract the correct prerequisite title, next-chapter title, and breadcrumb label.

## Step 2 — Confirm Before Creating

Before writing any file, show the user a summary:

```
Chapter: NN — <Title>
File:    src/pages/chapters/NN-slug.astro
Part:    Foundations / Applications / Production
Prereq:  Chapter NN-1 — <Title>
Next:    Chapter NN+1 — <Title>
Objectives:
  1. <objective>
  2. ...
Sections:
  - <H2>
  - ...

Proceed? (yes / edit first)
```

Only proceed after the user confirms.

## Step 3 — Generate the Chapter File

Use this template. Replace every `<PLACEHOLDER>` with the actual value. The template is not a suggestion — it is the required structure. Every element must be present in the generated file.

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Chapter <N>: <Title>"
  description="<One specific sentence, 140–160 chars, primary keyword near the start. What will the reader learn? Who is it for?>"
  currentPage="/chapters/<NN-slug>"
>
  <article class="chapter-content">
    <h1>Chapter <N>: <Title></h1>

    <!-- REVIEW: <List any quantitative claims, model capability statements, dates, or benchmarks introduced in this chapter that must be verified before publication. If none yet, write: No quantitative claims in initial scaffold — add REVIEW flags as content is added.> -->

    <nav class="chapter-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">→</span>
      <span>Chapters</span>
      <span aria-hidden="true">→</span>
      <span aria-current="page"><Short topic label></span>
    </nav>

    <div class="chapter-meta">
      <span class="chapter-progress">Chapter <N> of 15</span>
      <span class="chapter-sep" aria-hidden="true">•</span>
      <span class="chapter-prereq">Prerequisite: <a href="/chapters/<prereq-slug>"><Prereq Title></a></span>
      <span class="chapter-sep" aria-hidden="true">•</span>
      <span class="chapter-next">Next: <a href="/chapters/<next-slug>"><Next Title></a></span>
    </div>

    <div class="callout info">
      <div class="callout-title">📚 Chapter Overview</div>
      <p><2–3 sentence plain-English summary of what the chapter covers and why it matters for the target audience (CTOs, VPs, engineering managers, tech leads).></p>
    </div>

    <div class="callout info">
      <div class="callout-title">📌 Learning objectives</div>
      <ul>
        <li><Objective 1 — starts with an active verb: Explain, Compare, Identify, Choose, Evaluate, Describe></li>
        <li><Objective 2></li>
        <li><Objective 3></li>
        <li><Objective 4></li>
        <!-- add 5th and 6th if appropriate — 4–6 total -->
      </ul>
    </div>

    <!-- ═══════════════════════════════════════════════════
         SECTION 1 — Define the core concept
         ═══════════════════════════════════════════════════ -->

    <h2><Primary concept: define and motivate></h2>

    <p><strong><Primary term (full name)</strong> is <plain-English definition>. Define every AI term on first use. Short sentences. Active voice. No jargon without explanation.></p>

    <p><Why does this matter for a CTO/VP/EM? Frame around a business decision, team concern, or product risk — not implementation detail.></p>

    <h3><Sub-concept or key component></h3>

    <ul>
      <li><strong><Term>:</strong> <One-line explanation></li>
      <li><strong><Term>:</strong> <One-line explanation></li>
      <li><strong><Term>:</strong> <One-line explanation></li>
    </ul>

    <!-- ═══════════════════════════════════════════════════
         DIAGRAM — Required: at least one per chapter
         ═══════════════════════════════════════════════════ -->

    <div class="diagram-container">
      <p class="diagram-title"><Descriptive title: what this diagram shows and what to notice></p>
      <pre class="mermaid"
        role="img"
        aria-label="<Diagram description for screen readers>"
        set:html={`%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#e8f4fd', 'primaryTextColor': '#1a1a2e', 'primaryBorderColor': '#2563eb', 'lineColor': '#64748b', 'secondaryColor': '#f0fdf4', 'tertiaryColor': '#fefce8'}}}%%
flowchart TD
    A[<Node label>] --> B[<Node label>]
    B --> C[<Node label>]
    B --> D[<Node label>]
    C --> E[<Node label>]
    D --> E
`}
      />
    </div>

    <!-- ═══════════════════════════════════════════════════
         SECTION 2 — How it works / key mechanics
         ═══════════════════════════════════════════════════ -->

    <h2><How it works / key mechanics / core patterns></h2>

    <p><Explain the mechanism at the level of "how does this work well enough for a leader to ask good questions and evaluate vendor claims?" Not implementation depth.></p>

    <h3><Sub-topic></h3>

    <p><Content></p>

    <!-- ═══════════════════════════════════════════════════
         CALLOUT — Use info / warning / tip as appropriate
         ═══════════════════════════════════════════════════ -->

    <div class="callout tip">
      <div class="callout-title">💡 Key insight</div>
      <p><The single most important practical insight from this section. What should a leader remember?></p>
    </div>

    <!-- ═══════════════════════════════════════════════════
         SECTION 3 — Trade-offs, decision criteria, or when to use
         ═══════════════════════════════════════════════════ -->

    <h2>When to use <topic> — and when not to</h2>

    <p><Decision-making content is the highest-value content for this audience. Frame as: "Use X when Y. Avoid X when Z." Give concrete conditions, not vague advice.></p>

    <table>
      <thead>
        <tr>
          <th>Situation</th>
          <th>Recommendation</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Situation A></td>
          <td><strong><Choice></strong></td>
          <td><One-line rationale></td>
        </tr>
        <tr>
          <td><Situation B></td>
          <td><strong><Choice></strong></td>
          <td><One-line rationale></td>
        </tr>
        <tr>
          <td><Situation C></td>
          <td><strong><Choice></strong></td>
          <td><One-line rationale></td>
        </tr>
      </tbody>
    </table>

    <!-- ═══════════════════════════════════════════════════
         COLLAPSIBLE — For supplementary depth
         Only use for content that is genuinely optional.
         Core content must NOT be inside a collapsible.
         ═══════════════════════════════════════════════════ -->

    <div class="collapsible">
      <div class="collapsible-header">
        <span>Deep dive: <specific topic for readers who want more detail></span>
      </div>
      <div class="collapsible-content">
        <p><Supplementary content. Must be genuinely optional — a reader who skips this should still fully understand the chapter.></p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════
         CROSS-CHAPTER LINKS
         Link to related chapters inline where helpful.
         Do not duplicate explanations — cross-link instead.
         ═══════════════════════════════════════════════════ -->

    <!-- Example cross-link pattern (add where relevant in the content above):
    For a full explanation of embeddings, see <a href="/chapters/07-embeddings">Chapter 7 — Embeddings & Vector Databases</a>.
    -->

    <!-- ═══════════════════════════════════════════════════
         SECTION 4 — Summary / what to take away
         ═══════════════════════════════════════════════════ -->

    <h2>Summary</h2>

    <p><3–5 sentences that crystallise the most important points. Write as if this is all the reader will remember in six months. Reinforce the decision-making framing.></p>

    <ul>
      <li><Key takeaway 1 — one sentence></li>
      <li><Key takeaway 2></li>
      <li><Key takeaway 3></li>
    </ul>

    <div class="callout info">
      <div class="callout-title">⬅ Previous chapter</div>
      <p><a href="/chapters/<prereq-slug>">Chapter <N-1>: <Prereq Title></a> — <one line on what that chapter covers and why it is prerequisite context></p>
    </div>

    <div class="callout info">
      <div class="callout-title">➡ Next chapter</div>
      <p><a href="/chapters/<next-slug>">Chapter <N+1>: <Next Title></a> — <one line on what the reader will learn next and why it builds on this chapter></p>
    </div>

  </article>
</BaseLayout>
```

## Step 4 — Write the File

Write the completed chapter to `src/pages/chapters/<NN-slug>.astro`.

Replace all `<PLACEHOLDER>` markers with real content. Do not leave any placeholder text in the output file.

Content rules:
- Define every AI term on first use: `<strong>Term (Acronym)</strong> is…`
- Short sentences. Active voice. No filler ("It's worth noting that…", "Leverage synergies").
- No invented benchmark numbers, parameter counts, or dates — omit or mark with `<!-- REVIEW: source needed -->`
- External links: always add `target="_blank" rel="noopener noreferrer"`
- Mermaid diagram: must use `set:html`, must include `%%{init}%%` config, must include `role="img"` and `aria-label`
- Learning objectives: each must start with an active verb (Explain, Compare, Identify, Choose, Evaluate, Describe, Define)
- Content tone: write for someone making AI decisions, not someone implementing AI systems

## Step 5 — Post-Creation Checklist

After writing the file, verify all of the following before reporting success:

| Check | Pass? |
|---|---|
| File created at correct path `src/pages/chapters/NN-slug.astro` | — |
| `title` prop: Chapter N: Title format, ≤60 chars | — |
| `description` prop: unique, specific, 140–160 chars | — |
| `currentPage` prop: `/chapters/NN-slug` (no trailing slash) | — |
| `<h1>` matches title exactly | — |
| `<!-- REVIEW: -->` comment present immediately after `<h1>` | — |
| Breadcrumb `<nav>` present with `aria-label="Breadcrumb"` | — |
| `chapter-meta` div present with progress, prereq link, next link | — |
| Chapter overview callout present | — |
| Learning objectives callout present with 4–6 objectives | — |
| At least one `<h2>` section per major topic | — |
| At least one Mermaid diagram with `set:html`, `%%{init}%%`, `role="img"`, `aria-label` | — |
| No `<PLACEHOLDER>` text remaining in the file | — |
| No invented benchmark numbers or dates without a `<!-- REVIEW: -->` flag | — |
| External links use `target="_blank" rel="noopener noreferrer"` | — |
| Prereq and next chapter links point to files that exist in `src/pages/chapters/` | — |

Report the checklist results to the user.

## Step 6 — Recommend Next Steps

After the file is written and the checklist is complete, suggest:

```
Chapter NN scaffold is ready at src/pages/chapters/NN-slug.astro

Recommended next steps:
1. Run npm run build to confirm no TypeScript or Astro errors.
2. Run @Chapter Auditor on the new chapter to catch any structural issues.
3. Run @AI Learning Architect to validate the AI concepts are explained correctly.
4. Run @SEO Discoverability Expert to optimise discoverability before the first deploy.
5. Run @GitHub Pages Guardrail to confirm the chapter is deployment-safe.
```
