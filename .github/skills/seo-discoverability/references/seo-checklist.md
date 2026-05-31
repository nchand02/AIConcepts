# SEO Checklist

Evaluate each dimension in order. Flag only genuine issues — not every item needs improvement.

---

## 1. Page Title (`title` prop in `<BaseLayout>`)

The rendered `<title>` tag is `{title} | AI Learning Portal`.

**Check:**
- [ ] Does the title include the primary keyword naturally?
- [ ] Is it specific enough to distinguish this chapter from the others? ("Chapter 5: LLMs" is weaker than "Chapter 5: Large Language Models")
- [ ] Is the full form of any acronym used in the title? (Prefer "Large Language Models" over "LLMs" in the title)
- [ ] Is the title under 60 characters (the title prop alone, not including " | AI Learning Portal")?

**Flag as:** Improvement if the title uses only an acronym, is too generic, or omits the primary keyword.

---

## 2. Meta Description (`description` prop in `<BaseLayout>`)

Used in `<meta name="description">` and shown in search engine results.

**Check:**
- [ ] Does it accurately describe the specific chapter content (not the whole portal)?
- [ ] Is it between 140 and 160 characters?
- [ ] Does it naturally include the primary keyword?
- [ ] Does it describe benefit or outcome, not just topic? ("Learn how RAG systems retrieve and ground LLM responses" is stronger than "A guide to RAG")
- [ ] Does it avoid repeating the title verbatim?

**Flag as:** Improvement if description is generic, too short (<100 chars), too long (>165 chars), or doesn't include the primary keyword.

---

## 3. H1 Heading (chapter `<h1>`)

**Check:**
- [ ] Does the H1 match or closely reflect the title?
- [ ] Does it include the primary keyword?
- [ ] Is there exactly one H1 per chapter (there should be)?

**Flag as:** Improvement only if the H1 diverges significantly from the title or omits the primary keyword.

---

## 4. H2 Headings

These are the main section headings used for navigation and scanned by search engines.

**Check each H2:**
- [ ] Is it descriptive and specific? ("What is RAG and Why Does It Matter" > "Overview")
- [ ] Does it naturally include a relevant keyword where appropriate?
- [ ] Does it use a question format where the reader is likely searching in question form?
- [ ] Is it unique within the chapter (no duplicate H2 text)?
- [ ] Does "Summary" or "Conclusion" appear as a standalone H2? — suggest a more specific heading

**Flag as:** Improvement for generic headings ("Introduction", "Summary", "Example", "Details", "More").

---

## 5. H3 Headings

Subsection headings — less SEO weight but important for scannability.

**Check:**
- [ ] Are H3s specific enough to be useful as navigation anchors?
- [ ] Do they avoid meaningless labels ("Step 1", "Part A") without descriptive content?

**Flag as:** Optional unless a key subtopic has an unusable H3 label.

---

## 6. Acronym / Full-Form Gaps

Search engines and AI tools index full forms better than acronyms. Readers also benefit from full forms on first use.

**Check:**
- [ ] Is every acronym expanded on its first use in the chapter? (`RAG` → `Retrieval-Augmented Generation (RAG)`)
- [ ] Are common AI acronyms (LLM, RAG, RLHF, PEFT, MCP, VLM) introduced with their full form?
- [ ] Does the meta description use the full form of the primary acronym if there is one?

**Flag as:** Important for acronyms used in headings without prior expansion. Optional for acronyms in body text only.

---

## 7. Keyword Gaps in Body Text

Not keyword stuffing — look for natural opportunities where a relevant term is described but not named.

**Check:**
- [ ] Are there sections that explain a concept without using the term a reader would search for?
  (e.g., a section describes how vectors represent meaning semantically but never uses "semantic search")
- [ ] Are there synonyms missing that the audience would use?
  (e.g., "model alignment" described without mentioning "responsible AI" or "AI safety")

**Flag as:** Optional — only suggest additions that fit the existing sentence naturally.

---

## 8. Internal Link Opportunities

Internal links improve navigation, reduce bounce rate, and help search engines understand the site's topical structure.

**Check using `chapter-index.md`:**
- [ ] Are there concepts mentioned in this chapter that are explained in depth in another chapter, but not linked?
- [ ] Are there forward references ("we'll cover this later") that could be replaced with actual links?
- [ ] Are there backward references ("as covered earlier") that could be linked?

**Rule**: Suggest at most 3–5 new internal links per chapter. Do not link every mention.

**Flag as:** Important if a key concept (e.g., "embeddings" in the RAG chapter) has no link to the Embeddings chapter.

---

## 9. Existing Link Anchor Text

Weak anchor text ("click here", "this page", "learn more") provides no SEO signal.

**Check all existing `<a href="...">` elements:**
- [ ] Is the anchor text descriptive? ("RAG pipeline architecture" > "here")
- [ ] Does the anchor text reflect the content of the target page?
- [ ] Are there bare URL strings used as anchor text?

**Flag as:** Improvement for any anchor text that is generic or non-descriptive.

---

## 10. Learning Objectives as SEO Signal

Learning objectives in the `📌 Learning objectives` callout are often scanned by both readers and AI search tools. Strong objective verbs and topic terms improve semantic relevance.

**Check:**
- [ ] Do the objectives use specific topic terms (e.g., "Explain how RAG uses dense retrieval" vs. "Understand retrieval")?
- [ ] Are the objectives consistent with the chapter's actual headings and content?

**Flag as:** Optional if objectives are vague or don't reflect key terms.
