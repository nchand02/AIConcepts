# SEO Report Template

Copy and fill in this template when completing an SEO and discoverability review.

---

```
## SEO and Discoverability Report: Chapter N — <Title>
Reviewed: <YYYY-MM-DD>
File: src/pages/chapters/NN-slug.astro

### Summary
Overall SEO health: GOOD / NEEDS WORK / POOR
Primary keyword identified: <keyword>
Secondary keywords identified: <keyword1>, <keyword2>, <keyword3>

<1–2 sentences on the most impactful improvement available.>

---

### 1. Metadata Improvements

#### Page Title
Current:  "<current title prop>"
Suggested: "<improved title prop>"
Rationale: <one line>
Char count: <N> (target: under 60 for the prop alone)

#### Meta Description
Current:  "<current description prop>"
Suggested: "<improved description>"
Rationale: <one line>
Char count: <N> (target: 140–160)

---

### 2. Heading Improvements

#### H1
Current:  "<current h1>"
Suggested: "<improved h1>"   ← or "No change needed"
Rationale: <one line>

#### H2 Changes

| Current heading | Suggested heading | Rationale |
|---|---|---|
| "Overview" | "What is Retrieval-Augmented Generation?" | Generic heading; question form matches search intent |
| "How It Works" | "How the RAG Pipeline Retrieves and Generates" | Adds primary keyword and specificity |
| "Summary" | "RAG in Practice: Key Takeaways for Technical Leaders" | Adds audience-relevant keywords |

#### H3 Changes (if any)

| Current heading | Suggested heading | Rationale |
|---|---|---|
| "Step 1" | "Step 1: Chunk and Embed Your Documents" | Non-descriptive; misses indexable content |

---

### 3. Keyword Opportunities

Natural places to add or surface keywords already supported by the existing content:

| Location (heading/element) | Current text snippet | Suggested addition | Keyword added |
|---|---|---|---|
| §2.1 first paragraph | "...process called retrieval" | Change to "...process called semantic retrieval" | `semantic retrieval` |
| §3 callout | "...grounded responses" | Change to "...grounded, hallucination-reduced responses" | `hallucination` |

**Rule**: Every suggestion above fits the existing sentence without changing its meaning.

---

### 4. Acronym / Full-Form Gaps

| Acronym | First use location | Current text | Suggested fix |
|---|---|---|---|
| RAG | `<h1>` | "RAG Systems" | "Retrieval-Augmented Generation (RAG) Systems" |
| RLHF | §4.2 | "using RLHF" | "using Reinforcement Learning from Human Feedback (RLHF)" |

---

### 5. Internal Link Opportunities

| Location (quote the sentence) | Target chapter | Suggested anchor text |
|---|---|---|
| "...similarity between embeddings is calculated using cosine distance." | Chapter 7 — Embeddings & Vector DBs | `cosine similarity between embeddings` |
| "...dense retrieval outperforms sparse retrieval for semantic queries." | (no dedicated chapter — keep as is) | — |

---

### 6. Anchor Text Fixes

| Current anchor text | Link target | Suggested anchor text |
|---|---|---|
| "here" | /chapters/07-embeddings | "Embeddings and Vector Databases (Chapter 7)" |
| "this guide" | /chapters/09-fine-tuning | "Fine-Tuning and PEFT (Chapter 9)" |

---

### ✅ No Changes Needed
- H1: Already includes primary keyword
- Learning objectives: Specific and well-aligned with content
- Internal links to Chapter 7 and Chapter 9: Already present and well-labeled

---

### Handoff to Chapter Editor

Use this prompt to apply the approved improvements:

> @chapter-editor Apply the following approved SEO improvements to `src/pages/chapters/NN-slug.astro`:
> Update the title prop and description prop per the metadata section.
> Update the H2 headings: replace "Overview" with "What is Retrieval-Augmented Generation?", replace "Summary" with "RAG in Practice: Key Takeaways for Technical Leaders".
> Expand RAG acronym in the H1.
> Add internal link to Chapter 7 at the embeddings sentence.
> Do not apply the anchor text fixes in this pass — those are optional.
```
