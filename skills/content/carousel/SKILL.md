---
name: carousel
trigger: "create carousel", "carousel post", "slide deck for X", "carousel for [topic]", "LinkedIn carousel", "Instagram carousel"
inputs:
  - Topic or insight to convey
  - Platform: X | LinkedIn | Instagram (default: X)
  - Optional: number of slides (default: 8-10)
  - Optional: source content to adapt from
outputs:
  - Full carousel text content (slide by slide)
  - Saved to ./memory/projects/carousel/YYYY-MM-DD-topic.md
dependencies:
  - Read: ./context/brand.md
  - Write: ./memory/projects/carousel/
---

## Purpose

Create carousel/slide posts for social media. Each slide is a self-contained visual with bold text and minimal copy. The format is high-engagement on X and LinkedIn for educational content.

---

## Execution Steps

### 1. Load Brand Voice
Read `./context/brand.md`. Carousel tone is bold, confident, educational.

### 2. Structure the Carousel

**Standard carousel structure (8-10 slides):**

| Slide | Purpose | Copy Guidelines |
|-------|---------|-----------------|
| 1 — Cover | Hook / title slide | Bold claim or question. 5-8 words max. |
| 2 — Setup | Why this matters | 1-2 sentences. Create the gap. |
| 3-8 — Body | One point per slide | Heading (bold) + 1-2 supporting lines |
| 9 — Summary | Recap key points | Bullet list of main takeaways |
| 10 — CTA | What to do next | Follow, save, share, comment prompt |

### 3. Write Each Slide
For each slide, provide:
```
## Slide [N]
**Heading:** [Bold text — the main point]
**Body:** [1-2 supporting lines, max 30 words]
**Visual note:** [Color emphasis, icon suggestion, layout]
```

### 4. Design Notes
- **X carousels**: 1080x1350px, dark background, bold white/amber text
- **LinkedIn**: Same dimensions, slightly more professional tone
- **Instagram**: Same dimensions, can be more visual
- Font: bold sans-serif for headings, regular for body
- Keep [YOUR_NAME]'s color palette: black background, white text, amber (#D97706) accents
- One idea per slide — if you need two sentences, it might be two slides

### 5. Save
Save to `./memory/projects/carousel/YYYY-MM-DD-[topic-slug].md`.

---

## Notes
- Slide 1 is a scroll-stopper — treat it like a YouTube thumbnail
- People swipe fast — if a slide doesn't communicate in 3 seconds, simplify it
- Educational carousels ("5 things I learned", "How to X in Y steps") consistently outperform opinion carousels
- End with a CTA that matches the platform: X → "Follow @[YOUR_X_HANDLE]", LinkedIn → "Follow for more"
- The carousel should be self-contained — someone who doesn't swipe to the end should still get value
