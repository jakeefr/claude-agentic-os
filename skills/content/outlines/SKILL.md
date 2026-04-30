---
name: outlines
trigger: "outline a [post/thread/video], create content for [topic], draft an outline, plan a YouTube video, write a thread outline, any content planning request"
inputs:
  - "Topic or angle to cover"
  - "Platform: X thread | YouTube | blog post | short-form | carousel | email"
  - "Optional: target audience, tone notes, angle preference"
  - "Optional: project context (which client, which brand, what goal)"
outputs:
  - "Structured content outline saved to ./memory/projects/ under relevant folder"
  - "In-session delivery of the outline for review/iteration"
dependencies:
  - "Read: ./context/brand.md (always — load before writing anything)"
  - "Read: ./context/active-projects.md (for project context)"
  - "Write: ./memory/projects/"
---

## Execution Steps

### 1. Load Brand Voice
Read `./context/brand.md` before writing anything. Apply the voice and tone guidelines for the target platform (see the "Tone by Context" table in brand.md).

### 2. Clarify (if needed)
If the platform or angle is unclear, ask one focused question. Don't ask multiple questions — pick the most important one and infer the rest.

### 3. Build the Outline

#### X Thread
```
Hook (tweet 1): [single punchy statement or question — should make someone stop scrolling]
Tweet 2: [setup / context — why this matters]
Tweet 3-N: [core points, one per tweet — each must stand alone]
CTA tweet: [what to do next — follow, reply, share, click]
---
Target length: 5-10 tweets
Angle: [what makes this thread worth reading vs. everything else on this topic]
```

#### YouTube Video
```
Title options (3 variations):
Hook (0:00-0:30): [what you say in the first 30 seconds to earn the watch]
Intro (0:30-2:00): [why this video, why now, what they'll learn]
Section 1: [title + key points]
Section 2: [title + key points]
Section N: [title + key points]
CTA (final 60s): [subscribe, comment prompt, related video]
---
Target length: [X minutes]
Thumbnail concept: [what the thumbnail should show/say]
```

#### Blog Post / Long-form
```
Title:
Lede: [opening paragraph hook]
Section 1: H2 — [key points]
Section 2: H2 — [key points]
Section N: H2 — [key points]
Conclusion: [what to leave the reader with]
CTA: [what action to take]
---
Target word count: [X words]
SEO angle: [primary keyword if applicable]
```

#### Short-form / Carousel
```
Frame 1 (hook): [must stop the scroll]
Frame 2-N: [one point per frame]
Final frame: [CTA or memorable closer]
---
Visual notes: [any specific visual direction]
```

### 4. Save the Outline
Determine the right save location:
- Personal/X content: `./memory/projects/x-content/YYYY-MM-DD-topic-slug.md`
- YouTube: `./memory/projects/youtube/YYYY-MM-DD-topic-slug.md`
- Client content: `./memory/projects/CLIENT-NAME/content/YYYY-MM-DD-topic-slug.md`

```markdown
# [Platform] Outline: [Topic]
Date: YYYY-MM-DD
Platform: [X | YouTube | Blog | Short-form]
Status: draft

## Outline
[content here]

## Notes
[any angle decisions, what to look up, things to develop further]

## Related
[[brand]] [[relevant-project-note]]
```

### 5. Deliver and Invite Iteration
Share the outline in-session. Offer to adjust angle, platform, tone, or depth based on feedback. Don't wait for [YOUR_NAME] to ask — suggest one alternative angle if you think there's a stronger one.

---

## Notes
- Always read brand.md first — don't write in a generic voice
- The hook is the most important part of any format. Spend the most care there.
- Short-form content for X should be written as if [YOUR_NAME] is tweeting it himself — use "I" voice
- If [YOUR_NAME] provides a rough idea, improve the angle — don't just mirror it back
