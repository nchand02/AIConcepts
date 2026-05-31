# Confidence Rubric

Rules for assigning a confidence level to each extracted claim.

Apply the **first matching rule** from top to bottom.

---

## 🚫 Remove — Assign when any of the following are true

- The claim uses unsourced marketing superlatives with no factual grounding:
  "revolutionary", "game-changing", "unprecedented", "the most powerful AI ever"
- The claim is demonstrably wrong based on common knowledge (e.g., wrong release year for a well-known model)
- The claim uses vague hype language that cannot be verified or falsified:
  "AI is transforming everything", "the possibilities are endless"
- The claim attributes a specific number to a proprietary system that has publicly denied or contradicted it

**Action**: Flag `[REMOVE]` — the claim weakens credibility and should be cut or replaced with a factual statement.

---

## ❌ Low Confidence — Assign when any of the following are true

- The claim is a specific number (benchmark score, parameter count, cost, date) with **no inline source or citation**
- The claim uses a comparative superlative without a dated comparison:
  "outperforms all open-source models", "best performance on X"
- The claim refers to a capability, pricing, or licensing detail that **changes frequently** and has no date anchor
- The claim is about a model or tool released before January 2024 and makes a "current" assertion
- The existing `<!-- REVIEW: -->` flag in the file already marks this claim as unverified

**Action**: Flag `[VERIFY]` with a recommended source, `[REWRITE]` to remove the unverifiable precision, or `[FLAG]` to add/update a `<!-- REVIEW: -->` comment.

---

## ⚠️ Medium Confidence — Assign when any of the following are true

- The claim is specific and plausible, but **no inline source is provided** and the claim is not common knowledge
- The claim is about a historical fact (pre-2022) that is well-established but not universally known
- The claim refers to a model capability that was accurate at a point in time but **may have changed**
- The claim includes a date anchor but the date is more than 18 months before the current date (May 2026)
- The claim is attributed to a named paper but no link or DOI is provided

**Action**: Flag `[VERIFY]` with a recommended source. If verification is not possible in this session, flag with `<!-- REVIEW: verify [claim] against [source] -->`.

---

## ✅ High Confidence — Assign when all of the following are true

- The claim describes a **stable historical fact** that is widely documented and unlikely to change
  (e.g., "the Transformer architecture was introduced in the paper 'Attention Is All You Need' in 2017")
- The claim is already accompanied by an inline source link in the chapter text
- The claim is a well-known founding result (e.g., "AlphaGo defeated Lee Sedol in 2016")
- The claim is a definitional statement, not a comparative or quantitative assertion

**Action**: No action needed. List in the High Confidence section of the report for completeness.

---

## Staleness Override

Regardless of the rules above, downgrade any claim by one level if:

- The claim was accurate before 2024 and involves model rankings, pricing, or availability
- The claim uses the words "currently", "now", "today", "as of writing", or "latest" without a date
- The chapter's implicit writing date (inferred from model names and events) is more than 18 months ago

The current date for staleness assessment is **May 2026**.
