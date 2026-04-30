---
name: github-trending
trigger: "github trending", "trending repos", "what's hot on GitHub", "new open source projects", "trending in [language]"
inputs:
  - Optional: language filter (TypeScript, Python, Rust, Go, all)
  - Optional: time range (today, this week, this month)
  - Optional: topic filter (AI, web, CLI, automation)
outputs:
  - Curated trending repos with analysis
  - Saved to ./memory/research/github-trending-YYYY-MM-DD.md
dependencies:
  - Web search capability
  - Write: ./memory/research/
---

## Purpose

Surface trending GitHub repositories relevant to [YOUR_NAME]'s work — AI tooling, web frameworks, developer tools, and automation. Identifies tools to evaluate, content opportunities, and market signals.

---

## Execution Steps

### 1. Gather Trending Data
Search for current GitHub trending repos via web search. Focus on:
- Overall trending (all languages)
- TypeScript trending ([YOUR_NAME]'s primary language)
- Python trending (AI/ML ecosystem)
- Any language with topic: AI, LLM, agents, automation

### 2. Filter for Relevance
From the raw trending list, filter to repos relevant to [YOUR_NAME]'s domains:
- AI/LLM tooling (agent frameworks, prompt tools, model wrappers)
- Web development (Next.js ecosystem, React, full-stack)
- Developer tools (CLI tools, VS Code extensions, productivity)
- Automation (workflow engines, CI/CD, scripting)
- Business tools (CRM, e-commerce, analytics)

### 3. Analyze Each Repo
For each relevant repo (up to 10):
```
**[repo-name]** — [one-line description]
Stars: [count] | Language: [lang] | Created: [date] | Trend: [stars gained this period]
Relevance: [why this matters to [YOUR_NAME]'s work]
Action: evaluate | watch | content-opportunity | client-relevant | skip
```

### 4. Identify Opportunities
- **Evaluate**: Tools [YOUR_NAME] should try for his own workflow
- **Content**: Repos that would make good tutorial/review content
- **Client**: Tools relevant to active client projects
- **Market signal**: Patterns in what's trending (e.g., "3 agent frameworks trending = the space is heating up")

### 5. Save
Save to `./memory/research/github-trending-YYYY-MM-DD.md`:
```markdown
# GitHub Trending — YYYY-MM-DD
Filter: [language/topic if any]

## Highlights
[top 3-5 most relevant repos with full analysis]

## Full List
[table of all filtered repos]

## Signals
[what the trends suggest about the market]

## Action Items
- [ ] Evaluate: [repo] for [purpose]
- [ ] Content: [repo] could be a video/thread about [angle]

## Related
[[active-projects]]
```

---

## Notes
- Star count is vanity — look at recent momentum (stars gained this week) and actual utility
- New repos (<1 month old) with rapid growth are the most interesting — they indicate unmet demand
- Check if trending repos compete with or complement tools [YOUR_NAME] already uses
- This skill pairs well with ideation — trending repos are content opportunities
