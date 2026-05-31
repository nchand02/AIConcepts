# Claim Taxonomy

Definitions and examples for each verifiable claim type extracted during fact verification.

---

## Benchmark / Score

A quantitative result on a named evaluation task.

| Pattern | Example |
|---|---|
| Percentage on a named benchmark | "86% on MMLU", "90th percentile on the bar exam" |
| Rank or comparison score | "human-level performance on HumanEval" |
| Model-specific leaderboard position | "top-1 on HELM at time of release" |

**Staleness risk**: High — benchmarks are surpassed frequently. Claims older than 12 months are suspect.

---

## Parameter Count

The number of weights in a model, often used as a proxy for capability or cost.

| Pattern | Example |
|---|---|
| Exact count | "175B parameters", "70B/405B open-weight models" |
| Estimated count | "estimated ~1.7T parameters (mixture of experts)" |
| Training token count | "trained on 15T tokens", "300B tokens" |

**Staleness risk**: Medium — parameter counts for released models are stable, but "estimated" figures for proprietary models change as analyses improve.

---

## Date / Timeline

A specific date, quarter, or year associated with a model, paper, or event.

| Pattern | Example |
|---|---|
| Release date | "released March 2023", "GPT-3 in May 2020" |
| Training data cutoff | "knowledge cutoff April 2024" |
| Paper publication | "Hoffmann et al., March 2022" |

**Staleness risk**: Low for historical dates (stable). High for "latest" or "current" claims tied to a date.

---

## Capability Claim

An assertion about what a model can or cannot do.

| Pattern | Example |
|---|---|
| Feature claim | "supports 1 million token context" |
| Unique claim | "first model to achieve X", "only model that…" |
| Negative claim | "cannot process images" (may change with updates) |

**Staleness risk**: Very high — capability claims change with model updates and new releases.

---

## Comparative Claim

A claim that one model or approach is better, faster, cheaper, or more capable than another.

| Pattern | Example |
|---|---|
| Superlative | "best open-source model", "most efficient architecture" |
| Direct comparison | "outperforms GPT-4 on coding tasks" |
| Relative improvement | "4× faster than the previous version" |

**Staleness risk**: Very high — rankings shift constantly. Treat all comparative claims as Medium or Low confidence unless dated.

---

## Cost / Pricing

A specific dollar amount for training, inference, or API access.

| Pattern | Example |
|---|---|
| Training cost | "$4.6M estimated training cost" |
| Inference pricing | "$0.002 per 1K tokens" |
| Hardware cost | "requires 8× A100 GPUs" |

**Staleness risk**: High — pricing changes frequently. Always flag with a date.

---

## Licensing

A specific license name or terms of use for a model or dataset.

| Pattern | Example |
|---|---|
| Named license | "Apache 2.0 license", "MIT license" |
| Use restriction | "non-commercial only", "research use only" |
| Terms reference | "Meta's acceptable use policy" |

**Staleness risk**: Medium — licenses can change between model versions. Always verify for the specific version cited.

---

## Named Result

A specific scientific result, law, or discovery attributed to a paper or team.

| Pattern | Example |
|---|---|
| Scaling law | "Chinchilla scaling laws (Hoffmann et al., 2022)" |
| Scientific result | "AlphaFold solved protein structure prediction" |
| Technique origin | "RLHF introduced by Christiano et al., 2017" |

**Staleness risk**: Low for foundational results (stable). Medium if the claim includes a "state of the art" framing.

---

## Attribution

A claim that credits a specific person, team, or organization with an idea or result.

| Pattern | Example |
|---|---|
| Paper authorship | "Vaswani et al. introduced the Transformer" |
| Company attribution | "OpenAI released InstructGPT in 2022" |
| Named researcher | "Geoffrey Hinton, Yann LeCun, and Yoshua Bengio" |

**Staleness risk**: Low for historical attributions. Medium if "current" role or affiliation is mentioned.

---

## Statistic

A quantitative claim about adoption, usage, or market impact.

| Pattern | Example |
|---|---|
| User numbers | "100M users in 2 months" |
| Growth rate | "fastest-growing consumer application in history" |
| Market size | "$X billion market by 2026" |

**Staleness risk**: High — usage stats age quickly and are often contested.
