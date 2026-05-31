# Chapter Review Report Template

Copy and fill in this template when completing a chapter review.

---

```
## Chapter Review: Chapter N — <Title>
Reviewed: <YYYY-MM-DD>
File: src/pages/chapters/NN-slug.astro

### Summary
<One paragraph (3–5 sentences) on overall chapter health: what is strong, what is the biggest
concern, and whether the chapter is ready to publish as-is or needs work before the next push.>

---

### Missing Concepts
<!-- List concepts, tools, or developments that should be in this chapter but are absent. -->
<!-- Format: [MISSING] <concept> — <why it belongs here> -->

- [MISSING] ...
- [MISSING] ...

### Outdated Concepts
<!-- List content that has been superseded, deprecated, or meaningfully changed. -->
<!-- Format: [OUTDATED] <what is outdated> — <what replaced it or what changed> -->

- [OUTDATED] ...
- [OUTDATED] ...

---

### 🔴 Critical Findings (fix before next publish)

| # | Dimension | Finding | Scope |
|---|---|---|---|
| C1 | ACCURACY | <what is wrong and where> | [small/medium/large] |
| C2 | STRUCTURE | <what is missing> | [small/medium/large] |

### 🟡 Important Findings (fix in next revision)

| # | Dimension | Finding | Scope |
|---|---|---|---|
| I1 | CURRENCY | <what is outdated> | [small/medium/large] |
| I2 | DUPLICATION | <what is duplicated and where the canonical explanation lives> | [small/medium/large] |
| I3 | READABILITY | <what is unclear or jargon-heavy> | [small/medium/large] |
| I4 | SEQUENCE | <what assumes knowledge not yet introduced> | [small/medium/large] |

### 🟢 Optional Findings (nice to have)

| # | Dimension | Finding | Scope |
|---|---|---|---|
| O1 | SEO | <heading or description improvement> | [small] |
| O2 | READABILITY | <minor style improvement> | [small] |

---

### Rewrite Recommendations

For each Critical and Important finding above:

**C1** — Replace `<current text>` with `<recommended change or direction>`. [small]
**C2** — Add `<missing element>` after `<location in file>`. [small]
**I1** — Update `<outdated item>` to reflect `<what changed>`. Verify at `<source>`. [medium]
**I2** — Replace `<duplicated section>` with a cross-link to Chapter N. [small]
**I3** — Define `<term>` on first use in section `<heading>`. [small]
**I4** — Move `<concept>` to Chapter N or add a prerequisite cross-link. [medium]

---

### REVIEW Flags in Current File
<!-- List any existing <!-- REVIEW: --> comments found in the chapter -->

- Line ~XX: `<!-- REVIEW: <text> -->` — Status: still open / can be resolved by <action>

---

### Handoff to Chapter Editor

Use this prompt to hand off approved findings:

> @chapter-editor Apply the following approved findings to `src/pages/chapters/NN-slug.astro`:
> C1 (accuracy fix), I1 (update outdated model info), I2 (replace duplication with cross-link to chapter N).
> Do not apply O1 or O2 in this pass.
```
