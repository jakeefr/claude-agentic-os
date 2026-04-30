---
name: competitor-analysis
trigger: "analyze competitor, competitor research, what is [person/company] doing, competitive analysis, research [competitor]"
inputs:
  - "Competitor name, URL, or social handle"
  - "Optional: focus area (content strategy, pricing, tech stack, positioning)"
  - "Optional: comparison angle (vs [YOUR_NAME]'s offering, vs another competitor)"
outputs:
  - "Competitor profile with strategic analysis"
  - "Saved to ./memory/research/competitor-YYYY-MM-DD-name.md"
dependencies:
  - "Web search capability"
  - "Read: ./context/brand.md (for positioning comparison)"
  - "Read: ./context/active-projects.md (for relevance to current work)"
  - "Write: ./memory/research/"
---

## Purpose

Research a competitor or peer in [YOUR_NAME]'s space — their content strategy, offerings, positioning, and gaps. This informs both business development (how to differentiate) and content strategy (what angles are underserved).

---

## Execution Steps

### 1. Identify the Competitor
Gather baseline info:
- Name, company, website
- Social presence (X, YouTube, LinkedIn)
- Primary offering (agency, SaaS, content, consulting)
- Niche overlap with [YOUR_BUSINESS]

### 2. Content Analysis (if content creator)
- What platforms do they publish on?
- Post frequency and consistency
- Top-performing content (highest engagement/views)
- Content themes and recurring topics
- Production quality and format preferences
- Audience size and engagement rate

### 3. Offering Analysis (if service provider)
- Services offered and pricing (if visible)
- Tech stack and tools used
- Target client profile
- Case studies or social proof
- Unique selling proposition
- Delivery model (productized, custom, retainer)

### 4. Strategic Analysis
Compare against [YOUR_NAME]'s positioning:
- **Overlap**: Where do they compete directly?
- **Gaps**: What do they NOT offer that [YOUR_NAME] does?
- **Strengths**: What do they do better? (be honest)
- **Weaknesses**: Where are they vulnerable or underserving?
- **Differentiation**: How should [YOUR_NAME] position against them?

### 5. Actionable Takeaways
- Content opportunities: Topics they cover well that [YOUR_NAME] hasn't addressed
- Content gaps: Topics they miss that [YOUR_NAME] can own
- Business opportunities: Client segments they underserve
- Positioning: How to differentiate in messaging

### 6. Save
Save to `./memory/research/competitor-YYYY-MM-DD-[name-slug].md`:
```markdown
# Competitor Analysis: [Name]
Date: YYYY-MM-DD
Type: [content creator | agency | SaaS | consultant]

## Profile
[baseline info]

## Content Strategy
[analysis]

## Offering
[analysis]

## Strategic Position
[overlap, gaps, strengths, weaknesses]

## Action Items
- [ ] [specific actions based on findings]

## Related
[[brand]] [[active-projects]]
```

---

## Notes
- Be objective, not dismissive — competitors do things well too
- Focus on actionable insights, not comprehensive profiles
- If the competitor is also a potential collaborator, note that
- Update existing competitor files rather than creating new ones for the same competitor
- For client work, this skill can analyze the client's competitors too
