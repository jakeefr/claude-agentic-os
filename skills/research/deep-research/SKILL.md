---
name: deep-research
trigger: "research [topic], find out about [topic], dig into [topic], any request for background on a company/person/concept/technology"
inputs:
  - "Topic or question to research"
  - "Optional: scope (broad overview vs. specific angle)"
  - "Optional: output format preference"
outputs:
  - "Structured research brief saved to ./memory/research/TOPIC-NAME.md"
  - "Linked notes for key people, companies, or concepts (if significant)"
  - "Summary delivered in-session"
dependencies:
  - "Web search (built-in)"
  - "Read/Write tools for memory"
---

## Execution Steps

### 1. Clarify Scope (skip if obvious)
- What is the core question to answer?
- Is this for a client deliverable, personal understanding, content, or a decision?
- How deep: quick orientation (5 min) or thorough brief (full research pass)?

### 2. Search Phase
Run 3–6 targeted searches, covering:
- Core topic / definition / history
- Current state / recent developments (last 12 months)
- Key players (companies, people, tools)
- Critiques, limitations, or open questions
- Relevance to [YOUR_NAME]'s work (clients, stack, business)

Use specific search queries, not vague ones. Iterate — if first results are thin, refine.

### 3. Synthesize
Organize findings into:
- **Summary** (2–4 sentences: what it is and why it matters)
- **Key facts** (bullet list of the most important things to know)
- **Key players** (companies, people, tools worth knowing)
- **Open questions / unknowns**
- **Relevance to [YOUR_NAME]** (how does this connect to client work, stack, or opportunities?)
- **Sources** (list URLs with one-line descriptions)

### 4. Write Memory Note
Save to `./memory/research/YYYY-MM-DD-topic-name.md`

Use this structure:
```markdown
# [Topic Name]
Date: YYYY-MM-DD
Tags: #research #[relevant-category]

## Summary
[2-4 sentence overview]

## Key Facts
- 

## Key Players
- [[Person or Company Name]] — brief description

## Open Questions
- 

## Relevance to [YOUR_NAME]
- 

## Sources
- [Title](URL) — one line description

## Related
[[link-to-related-note]]
```

### 5. Create Linked Notes (if warranted)
If a key person, company, or concept came up that's significant enough to reference later, create a stub note:
- People: `./memory/people/first-last.md`
- Companies/tools: `./memory/research/company-or-tool-name.md`

Use `[[links]]` in the main research note to connect them.

### 6. Deliver Summary In-Session
After saving, give [YOUR_NAME] a concise summary of findings — what matters, what's actionable, what to follow up on. Don't just say "I saved a note."

---

## Notes
- Prefer primary sources (official docs, founder interviews, original papers) over SEO content
- If research is for a client context, tag accordingly and consider whether to save to `./memory/projects/CLIENT-NAME/`
- Don't pad — if the topic doesn't warrant a full brief, write a shorter note and say so
