---
name: content-cascade
trigger: "repurpose this", "content cascade", "turn this into", "cross-post this", "make a thread from this video", "repurpose content"
inputs:
  - Source content (URL, transcript, blog post, thread, or paste)
  - Source platform (YouTube, X, blog, newsletter, etc.)
  - Target platforms (default: all applicable)
outputs:
  - Adapted content for each target platform
  - Saved to ./memory/projects/content-cascade/YYYY-MM-DD-source-slug.md
dependencies:
  - Read: ./context/brand.md
  - Write: ./memory/projects/content-cascade/
---

## Purpose

Take one piece of content and cascade it across multiple platforms — adapted for each platform's format, audience expectations, and constraints. One long-form piece should produce 5-8 derivative pieces.

---

## Execution Steps

### 1. Load Brand Voice
Read `./context/brand.md` — each platform adaptation needs platform-appropriate tone.

### 2. Analyze Source Content
- Identify the core thesis (1 sentence)
- Extract 3-5 key insights or takeaways
- Note any quotable lines, stats, or stories
- Determine what makes this content valuable (educational, entertaining, inspiring)

### 3. Generate Cascade

**From YouTube Video → produce all of:**

| Output | Format | Length |
|--------|--------|--------|
| X Thread | 5-10 tweets, hook + key insights + CTA | ~1000 chars |
| Short-form script | 60-90 sec vertical video script | ~200 words |
| Carousel | 8-10 slides, 1 insight per slide | ~50 words/slide |
| LinkedIn post | Professional angle, paragraph format | ~200 words |
| Newsletter snippet | Teaser that drives to video | ~150 words |
| Blog post | SEO-optimized long-form | ~800 words |

**From X Thread → produce:**
| Output | Format |
|--------|--------|
| Short-form script | Expand the hook, condense the body |
| Carousel | 1 tweet = 1 slide |
| YouTube outline | Thread becomes video skeleton |

**From Blog Post → produce:**
| Output | Format |
|--------|--------|
| X Thread | Extract key points as tweets |
| Short-form script | Lead with the strongest insight |
| Carousel | H2 sections become slides |

### 4. Adapt Voice Per Platform
- **X**: Punchy, first-person, conversational. Short sentences.
- **YouTube**: Spoken word, slightly longer explanations, personality-forward
- **LinkedIn**: Professional but not corporate. Lead with insight.
- **Short-form**: Fastest pace. Hook in first 2 seconds. No fluff.
- **Carousel**: Bold text per slide. One idea per frame. Visual hierarchy.

### 5. Save
Save all outputs to `./memory/projects/content-cascade/YYYY-MM-DD-[source-slug].md` with clear sections per platform.

---

## Notes
- Don't just copy-paste across platforms — each adaptation should feel native
- The hook changes per platform: X hook ≠ YouTube hook ≠ short-form hook
- Always preserve the core insight but change the wrapper
- Flag which outputs [YOUR_NAME] should publish first (usually X thread for momentum, then video)
