---
name: fact-verification
description: 'Verify factual claims in an AI Learning Portal chapter against reliable sources. Use for: checking benchmark numbers, model parameter counts, release dates, capability claims, pricing, licensing, and named results cited in a chapter. Produces a claim list with confidence levels, flags what needs external verification, and recommends what to rewrite or remove. Triggers: "verify facts", "fact check chapter", "check claims", "are these numbers right", "verify benchmarks", "check dates", "is this accurate", "fact verification", "verify chapter N", "check model claims".'
argument-hint: "Chapter file or number to fact-check (e.g., src/pages/chapters/05-llms.astro or 'chapter 5')"
---

# Fact Verification Skill

Extracts every verifiable factual claim from a single chapter and assesses each claim's confidence level. Produces an actionable report: what is likely correct, what needs external verification, and what should be rewritten or removed.

Does **not** make editorial improvements — that is the Chapter Editor's job. Fact verification produces inputs for the editor, not direct edits.

## When to Use

- Before publishing or promoting a chapter
- After an AI news cycle that may have invalidated existing claims
- When a `<!-- REVIEW: -->` flag already exists in the file and needs resolution
- When a specific claim is disputed or looks stale
- As part of the `/chapter-review` workflow to supplement structural review

## Inputs

| Input | Required | Description |
|---|---|---|
| Chapter file | Yes | Path (`src/pages/chapters/NN-slug.astro`) or chapter number |
| Specific claim | No | Optional focus: verify only a named claim or section |

## Claim Types to Extract

Scan the entire chapter for all of the following. Refer to [claim-taxonomy.md](./references/claim-taxonomy.md) for definitions and examples.

| Type | Examples |
|---|---|
| **Benchmark / score** | "GPT-4 scored 90th percentile on the bar exam", "86% on MMLU" |
| **Parameter count** | "GPT-3 has 175B parameters", "estimated ~1.7T MoE" |
| **Date / timeline** | "released March 2023", "trained on data through April 2024" |
| **Capability claim** | "only model that can process 1M tokens", "first to achieve X" |
| **Comparative claim** | "outperforms all open-source models", "better than human baseline" |
| **Cost / pricing** | "$4.6M estimated training cost", "available for $0.002/1K tokens" |
| **Licensing** | "Apache 2.0 license", "commercial use permitted" |
| **Named result** | "Chinchilla scaling law", "AlphaFold solved protein folding" |
| **Attribution** | "Hoffmann et al., DeepMind, March 2022", "OpenAI 2022" |
| **Statistic** | "100M users in 2 months", "fastest-growing consumer app" |

## Procedure

### Step 1 — Locate the Chapter

Resolve the chapter number to a file path using [chapter-index.md](./references/chapter-index.md).

### Step 2 — Extract All Verifiable Claims

Read the full chapter. For each sentence or bullet that contains a claim matching any type above, record it as a claim entry:

```
[CLAIM-N] Type: <type> | Text: "<exact quoted text>" | Location: <h2 heading or element>
```

Do not paraphrase — quote exactly. Capture the full claim, not just the number.

### Step 3 — Assess Confidence

For each claim, assign a confidence level using the criteria in [confidence-rubric.md](./references/confidence-rubric.md):

| Level | Meaning |
|---|---|
| ✅ **High** | Claim matches well-known, stable facts unlikely to have changed |
| ⚠️ **Medium** | Claim is plausible but specific enough that it requires a source to be trusted |
| ❌ **Low** | Claim is quantitative, comparative, or time-sensitive and has no inline source |
| 🚫 **Remove** | Claim uses unsourced superlatives, marketing language, or is demonstrably wrong |

### Step 4 — Flag `<!-- REVIEW: -->` Comments

Scan for existing `<!-- REVIEW: -->` comments in the chapter. Each one represents a known unresolved claim. List them separately — they are already flagged debt that this skill should help resolve.

### Step 5 — Recommend Action for Each Low/Remove Claim

For every ❌ Low or 🚫 Remove claim, provide one of:

- `[VERIFY]` — specific source to check (Wikipedia article, paper, official docs URL pattern)
- `[REWRITE]` — suggested rewrite that removes the unverifiable precision (e.g., add "approximately" or "as of 2023")
- `[REMOVE]` — claim adds no value without verification and should be deleted
- `[FLAG]` — add or update a `<!-- REVIEW: -->` comment if verification requires external research beyond this session

### Step 6 — Produce the Report

Format using [verification-report-template.md](./references/verification-report-template.md).

Group claims by confidence level. Within each group, order by the severity of potential reader impact if wrong.

## Output

A structured report containing:
1. **Summary** — total claims found, breakdown by confidence level, most urgent issues
2. **Existing `<!-- REVIEW: -->` flags** — list with resolution status
3. **High confidence claims** — brief list (no action needed)
4. **Medium confidence claims** — list with recommended verification source
5. **Low confidence claims** — list with VERIFY / REWRITE / REMOVE / FLAG recommendation
6. **Remove list** — claims that should be cut or rewritten immediately
7. **Handoff line** — ready-to-use prompt for the Chapter Editor

## Constraints

- Do not edit any file. This skill produces a report only.
- Do not fabricate corrections — recommend where to verify, not what the correct value is.
- Do not assess style, readability, or structure — those belong to `/chapter-review`.
- If a claim is ambiguous (could be correct or could be stale), assign ⚠️ Medium and recommend a verification source.
- Current date for staleness assessment: May 2026. Claims about model capabilities or availability from before 2024 are Medium confidence by default unless they describe stable historical facts.
