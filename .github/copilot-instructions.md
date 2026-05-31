# Copilot Instructions — AI Learning Portal

## Purpose & Audience
A static educational portal about AI concepts for **semi-technical leaders** (CTOs, VPs, engineering managers, tech leads). Content must be accurate, plain-English, jargon-light, practical, and free of marketing language or hype. See [about.astro](../src/pages/about.astro) for the full audience definition.

---

## Tech Stack
- **Framework**: [Astro 4.16](https://astro.build) — file-based routing, `.astro` pages, static-only output
- **Diagrams**: Mermaid.js 11 (loaded from CDN; theme config in [`src/config/diagramTheme.ts`](../src/config/diagramTheme.ts))
- **Styles**: Single CSS file at [`public/styles/global.css`](../public/styles/global.css) — CSS custom properties, dark/light mode
- **TypeScript**: `~5.8`, strict mode, types in [`types.ts`](../types.ts)
- **No React, no SSR, no API routes** — pure static generation

## Build Commands
```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:4321
npm run build      # generate static output → /dist
npm run preview    # preview /dist locally
```

---

## GitHub Pages Constraints — Do Not Break

The site deploys from `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) to `https://nchand02.github.io/AIConcepts`.

**Critical rules:**
- `astro.config.mjs` sets `base: '/AIConcepts'` — **never remove or change this**.
- All internal links must use the Astro base URL variable: `const base = import.meta.env.BASE_URL.replace(/\/$/, '')` then `${base}/path`.
- Do **not** hardcode `/AIConcepts/` in links; use the variable pattern already in use.
- Do **not** add server-side rendering, API endpoints, or dynamic routes — GitHub Pages is static only.
- Do **not** change the `dist/` output directory or the artifact path in the deploy workflow.
- External CDN resources (Mermaid, fonts) need no special treatment — they work in static output.

---

## Repository Structure

```
src/
  layouts/BaseLayout.astro     # shared HTML shell, nav, SEO meta, Mermaid init
  pages/
    index.astro                # home page
    about.astro                # audience + course overview
    chapters/01-foundations.astro … 15-glossary.astro  # all content chapters
  config/diagramTheme.ts       # Mermaid theme variables (light + dark)
public/
  styles/global.css            # all CSS, including dark mode overrides
  scripts/main.js              # collapsibles, copy buttons, scroll progress, search
```

**All content lives in `src/pages/chapters/`** as `.astro` files. Each chapter is self-contained HTML inside `<BaseLayout>`.

---

## Chapter Template — Required Structure

Every chapter must follow this structure (see `01-foundations.astro` or `08-rag.astro` as canonical examples):

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Chapter N: <Title>"
  description="<One-sentence SEO description>"
  currentPage="/chapters/NN-slug"
>
  <article class="chapter-content">
    <h1>Chapter N: <Title></h1>

    <!-- REVIEW: <note any claims that need fact-checking before publication> -->

    <nav class="chapter-breadcrumb" aria-label="Breadcrumb">...</nav>

    <div class="chapter-meta">
      <span class="chapter-progress">Chapter N of 15</span>
      <!-- include prereq link and next link -->
    </div>

    <div class="callout info">
      <div class="callout-title">📌 Learning objectives</div>
      <ul><!-- 4–6 specific, measurable objectives --></ul>
    </div>

    <!-- content: h2/h3 headings, paragraphs, lists, tables, callouts, diagrams, collapsibles -->

  </article>
</BaseLayout>
```

### Key HTML components available (classes only, no JS imports needed):
| Element | Class / Pattern |
|---|---|
| Callout box (info/warning/tip) | `<div class="callout info">` / `callout warning` / `callout tip` |
| Collapsible deep-dive | `<div class="collapsible"><div class="collapsible-header">…</div><div class="collapsible-content">…</div></div>` |
| Mermaid diagram | `<div class="diagram-container"><p class="diagram-title">…</p><pre class="mermaid" set:html={`…`} /></div>` |
| Inline code | `` `code` `` → standard `<code>` |
| Code block | `<pre><code>…</code></pre>` |

---

## Content Standards

### Tone and clarity
- Write for someone who reads technical decisions but does not write production code daily.
- Short sentences. Active voice. Concrete examples. No filler phrases ("It's worth noting that…", "Leverage synergies").
- Define every AI term on first use; do not assume familiarity.

### Accuracy and sourcing
- Flag uncertain, outdated, or quantitative claims with an HTML comment: `<!-- REVIEW: <reason> -->`.
- Link to authoritative sources (Wikipedia, original papers, official docs) for specific claims. Use `target="_blank"` on external links.
- Do **not** invent benchmark numbers, parameter counts, or dates. If unsure, omit or flag.
- Model capabilities and availability change fast — note the date/version when citing specific benchmarks.

### SEO and discoverability
- Use strong, descriptive `<h2>` and `<h3>` headings with natural keywords.
- Keep the `description` prop specific to the chapter's content (used in `<meta name="description">`).
- Do not keyword-stuff. Write for humans; keywords follow naturally.

### Cross-chapter links
- Always use the base URL variable for chapter links (see above).
- Link prerequisite and next-chapter in `chapter-meta`. Link related concepts inline where genuinely helpful.
- Do not duplicate explanations that belong to another chapter — link instead.

### Learning flow
- Chapters 1–5: Foundations (never assume prior chapters in Ch. 1; assume Chs 1–N-1 in Ch. N).
- Chapters 6–10: Applications.
- Chapters 11–15: Production.
- Preserve this sequence. Do not move advanced content into early chapters.

---

## Mermaid Diagrams

- Use `set:html` directive to embed diagram syntax strings (avoids Astro template escaping issues).
- Always include `%%{init: …}%%` config inline in the diagram for theme compatibility (copy pattern from existing diagrams).
- Include `role="img"` and `aria-label` on `<pre class="mermaid">` for accessibility.
- Supported diagram types: `mindmap`, `flowchart`, `sequenceDiagram`, `graph LR/TD`. Test locally before committing — Mermaid syntax errors silently render blank.

---

## Multi-Expert Review — Required for All Significant Changes

All significant changes must be reviewed from six expert perspectives before implementation. No major change should be approved based on a single perspective.

**What counts as a significant change:** adding or removing a chapter, restructuring navigation, editing `BaseLayout.astro`, modifying `global.css` architecture, changing `astro.config.mjs`, bulk-editing multiple chapters, or any change that affects the learning sequence, SEO, deployment, or user experience.

### The Six Perspectives

| # | Expert | Agent | Scope |
|---|--------|-------|-------|
| 1 | AI Learning Architect | `@AI Learning Architect` | AI concept accuracy, learning flow, missing context, analogies |
| 2 | Principal Software Engineer | `@Principal Engineer` | Architecture, security, performance, technical debt, SOLID |
| 3 | UX/UI Design Lead | `@UX Design Lead` | Cognitive load, visual hierarchy, accessibility, responsiveness |
| 4 | Senior QA Architect | `@QA Architect` | Test plan, regression risks, link integrity, build validation |
| 5 | Product Manager | `@Product Manager` | Audience fit, engagement gaps, competitive positioning, roadmap, scope creep |
| 6 | SEO & AI Discoverability Expert | `@SEO Discoverability Expert` | Metadata, headings, keywords, internal links, semantic clarity, AI discoverability, FAQ and glossary opportunities |

### Review Workflow

```
1. Collect   — Run each expert review. One chapter or change scope at a time.
2. Consolidate — List all findings in a single summary. Group by: content / engineering / UX / QA / product / SEO.
3. Resolve   — Identify conflicts between expert recommendations. Decide which perspective takes priority per finding.
4. Prioritize — Label every finding: Critical (must fix before ship) / Important (fix in this pass) / Optional (future).
5. Plan      — Write a concise implementation plan. List files to change, order of edits, and which agent applies each fix.
6. Implement — Apply changes one file at a time via `@Chapter Editor` or directly. Do not batch multiple files.
7. Validate  — Run `@QA Architect` post-implementation smoke test. Run `npm run build`. Confirm no regressions.
```

**Conflict resolution rule:** Engineering and deployment constraints (Principal Engineer, QA Architect, GitHub Pages Guardrail) take precedence over stylistic preferences. Content accuracy (AI Learning Architect) takes precedence over SEO optimizations. Never sacrifice accessibility for aesthetics.

---

## Update Workflow — One Chapter at a Time

To avoid exceeding context limits and to maintain review quality:

1. **Evaluate first**: Read the target chapter completely. Identify factual issues, stale content, missing topics, structural problems, and duplication.
2. **Recommend**: Summarize proposed changes. Wait for confirmation before editing.
3. **Edit**: Make only the agreed changes. Do not refactor adjacent chapters in the same pass.
4. **Verify**: Run `npm run build` and confirm no TypeScript or Astro errors.

**Do not** load multiple chapters simultaneously unless explicitly asked to compare them.

---

## What NOT to Do

- Do not change `astro.config.mjs` (site/base) without explicit instruction.
- Do not add npm dependencies without checking impact on the static build and bundle size.
- Do not add server-side features (API routes, SSR, middleware).
- Do not alter `BaseLayout.astro` nav structure without considering all 15 chapters.
- Do not replace existing CSS custom properties — extend them if needed.
- Do not use hype, marketing superlatives, or vague claims ("revolutionary", "game-changing", "unprecedented").
- Do not duplicate explanations across chapters — cross-link instead.
