---
name: short-form
trigger: "short-form script", "reel script", "shorts script", "TikTok script", "vertical video script", "60 second video"
inputs:
  - Topic or key insight to convey
  - Optional: source content to adapt from (video, thread, blog)
  - Optional: style (talking head, screen recording, B-roll overlay)
outputs:
  - 3 script variations (60s, 90s, 30s)
  - Saved to ./memory/projects/short-form/YYYY-MM-DD-topic.md
dependencies:
  - Read: ./context/brand.md
  - Write: ./memory/projects/short-form/
---

## Purpose

Write scripts for vertical short-form video (YouTube Shorts, X video, Instagram Reels). The constraint is extreme brevity — every word must earn its place.

---

## Execution Steps

### 1. Load Brand Voice
Read `./context/brand.md`. Short-form [YOUR_NAME] is faster, punchier, more direct than long-form [YOUR_NAME].

### 2. Identify the Single Insight
A short-form video delivers ONE idea. If there are multiple ideas, split into multiple scripts. Extract:
- The single takeaway the viewer should remember
- The "so what" — why this matters to the viewer RIGHT NOW

### 3. Write Scripts

**60-second script (~150 words):**
```
HOOK (0-3s): [Pattern interrupt. Statement or question that stops the scroll.]
SETUP (3-10s): [Context. Why should they care? 1-2 sentences max.]
BODY (10-45s): [The insight/tutorial/story. Be specific. Show don't tell.]
PAYOFF (45-55s): [The result, punchline, or "aha" moment.]
CTA (55-60s): [Follow for more, try this, comment your take.]
```

**90-second script (~225 words):**
Same structure but expand BODY with one more example or step.

**30-second script (~75 words):**
Hook + single point + payoff. No setup, no CTA. Pure value.

### 4. Visual Direction
For each script, include:
- **Format**: talking head / screen recording / mixed
- **Text overlays**: key phrases to display on screen
- **Transition notes**: any cuts, zooms, or visual hooks

### 5. Save
Save to `./memory/projects/short-form/YYYY-MM-DD-[topic-slug].md`.

---

## Notes
- The first 1-2 seconds determine everything — the hook must be visual AND verbal
- Speak in short, punchy sentences. No compound sentences. No filler.
- Screen recordings: show the result FIRST, then explain how
- [YOUR_NAME]'s niche (AI/dev/automation) works best with screen recording + talking head combo
- Optimal: 60 seconds for tutorials, 30 seconds for hot takes, 90 seconds for stories
