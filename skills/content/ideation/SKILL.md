---
name: ideation
trigger: "content ideas", "what should I post about", "brainstorm topics", "content ideation", "what should I make next", "video ideas"
inputs:
  - Optional: platform focus (X, YouTube, short-form, all)
  - Optional: niche/angle constraint (AI, dev tools, freelancing, automation)
  - Optional: recent trends or events to riff on
outputs:
  - 15-20 content ideas with platform assignments
  - Saved to ./memory/projects/content-ideation/YYYY-MM-DD.md
dependencies:
  - Read: ./context/brand.md
  - Read: ./context/active-projects.md
  - Read: ./memory/projects/ (scan recent content for gaps)
  - Write: ./memory/projects/content-ideation/
---

## Purpose

Generate a batch of content ideas across platforms by mining [YOUR_NAME]'s active projects, expertise, audience interests, and current trends. This is the upstream skill that feeds into outlines, hooks, and drafts.

---

## Execution Steps

### 1. Load Context
- Read `./context/brand.md` for positioning and voice
- Read `./context/active-projects.md` for current work (content from real work > abstract content)
- Scan `./memory/projects/` for recent content to avoid repeats
- Check `./memory/research/` for recent research that could become content

### 2. Idea Generation Lenses
Run through each lens and generate 3-4 ideas per lens:

**From Real Work**
- What did [YOUR_NAME] build/ship/learn this week that others would find valuable?
- Any client problems solved that can be abstracted into general advice?
- New tools, patterns, or workflows discovered?

**From Audience Pain**
- What questions do developers/entrepreneurs/AI builders keep asking?
- What common mistakes does [YOUR_NAME] see in his niche?
- What's confusing about the current AI tooling landscape?

**From Trends**
- What's happening in AI/tech right now that [YOUR_NAME] has an informed take on?
- Any new tools, updates, or announcements worth covering?
- Contrarian take on something the consensus is wrong about?

**Evergreen/SEO**
- Tutorial content that will rank for months
- "How I" stories from [YOUR_NAME]'s real experience
- Comparison/breakdown content (Tool A vs Tool B)

### 3. Format Ideas
For each idea:
```
[#] [TITLE CONCEPT]
Platform: X thread | YouTube | Short-form | Blog | Carousel
Angle: [1-line description of the unique angle]
Urgency: high | medium | low (is this timely or evergreen?)
Effort: quick (1hr) | medium (half day) | deep (full day+)
```

### 4. Prioritize
Group into:
1. **Ship this week** — timely, low effort, high engagement potential
2. **Develop this week** — needs outline/research, publish next week
3. **Backlog** — good ideas, no urgency

### 5. Save
Save to `./memory/projects/content-ideation/YYYY-MM-DD.md` with all ideas and priority groups.

---

## Notes
- Content from real work always outperforms abstract content — lead with what [YOUR_NAME] is actually doing
- Avoid ideas that require [YOUR_NAME] to pretend expertise he doesn't have
- Cross-platform repurposing: a YouTube video can become an X thread, a short-form clip, and a carousel — flag these opportunities
- Link to [[brand]] and relevant project notes in the saved file
