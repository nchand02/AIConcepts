# Fact Verification Report Template

Copy and fill in this template when completing a fact verification run.

---

```
## Fact Verification Report: Chapter N — <Title>
Verified: <YYYY-MM-DD>
File: src/pages/chapters/NN-slug.astro
Total claims extracted: <N>

### Summary
<2–3 sentences: how many claims, breakdown by confidence level, and the single most urgent issue.>

Confidence breakdown:
- ✅ High: N claims
- ⚠️ Medium: N claims (recommend verification)
- ❌ Low: N claims (require action before publish)
- 🚫 Remove: N claims (cut or rewrite immediately)

---

### Existing <!-- REVIEW: --> Flags in File

| Location | Flag text | Resolution |
|---|---|---|
| ~Line XX | `<!-- REVIEW: <text> -->` | [RESOLVED by CLAIM-N] / [STILL OPEN — see CLAIM-N] |

---

### ✅ High Confidence Claims
*(No action needed — listed for completeness)*

| ID | Type | Claim (quoted) | Location |
|---|---|---|---|
| H1 | Date | "the Transformer was introduced in 2017" | §2.1 Attention Mechanism |
| H2 | Named result | "AlphaGo defeated Lee Sedol in 2016" | §1.3 History |

---

### ⚠️ Medium Confidence Claims
*(Verify before next publish)*

| ID | Type | Claim (quoted) | Location | Recommended Source |
|---|---|---|---|---|
| M1 | Benchmark | "GPT-3 achieved few-shot learning at 13B params" | §3 Scaling | [Wikipedia: GPT-3](https://en.wikipedia.org/wiki/GPT-3) |
| M2 | Attribution | "RLHF introduced by Christiano et al., 2017" | §4 Alignment | Search: "Learning to summarize from human feedback Stiennon 2020" |

---

### ❌ Low Confidence Claims
*(Require VERIFY / REWRITE / REMOVE / FLAG before publishing)*

| ID | Type | Claim (quoted) | Location | Action | Detail |
|---|---|---|---|---|---|
| L1 | Benchmark | "86% MMLU benchmark" | §2 Overview callout | [VERIFY] | Check current MMLU leaderboard; add date qualifier |
| L2 | Cost | "$4.6M estimated training cost" | §2 callout | [FLAG] | Add `<!-- REVIEW: training cost estimate, verify source -->` |
| L3 | Comparative | "fastest-growing consumer app in history" | §2 callout | [REWRITE] | Remove superlative; replace with "reached 100M users in ~2 months (as of early 2023)" |
| L4 | Capability | "only model that supports 1M token context" | §5.2 | [REWRITE] | Remove "only" — multiple models now support long context as of 2025 |

---

### 🚫 Remove List
*(Cut or rewrite immediately — these weaken credibility)*

| ID | Claim (quoted) | Location | Reason | Suggested replacement |
|---|---|---|---|---|
| R1 | "revolutionary capabilities that will transform everything" | §1 intro | Unsourced hype | Remove entirely or replace with a specific capability statement |
| R2 | "unprecedented in the history of technology" | §3.1 | Unfalsifiable superlative | Remove |

---

### Recommended `<!-- REVIEW: -->` Updates

Add or update these comments in the chapter source:

```html
<!-- REVIEW: CLAIM-L2 — training cost $4.6M is widely cited but original source unclear; verify against Epoch AI or Cottier et al. -->
<!-- REVIEW: CLAIM-M1 — few-shot emergence at 13B params; verify exact threshold against Brown et al. 2020 -->
```

---

### Handoff to Chapter Editor

Use this prompt to apply the verified findings:

> @chapter-editor Apply the following fact-verification findings to `src/pages/chapters/NN-slug.astro`:
> Remove R1 and R2. Rewrite L3 and L4 per recommendations. Add REVIEW comments for L2 and M1.
> Do not change any High or Medium claims — leave them for a future verification pass with external sources.
```
