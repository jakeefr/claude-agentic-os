---
name: yt-search
trigger: "search YouTube for, find YouTube videos about, YT search, what videos exist on [topic], YouTube research"
inputs:
  - "Search query or topic"
  - "Optional: channel filter, date range, min view count"
  - "Optional: purpose (competitive research, learning, content gap analysis)"
outputs:
  - "Curated list of relevant videos with analysis"
  - "Saved to ./memory/research/yt-search-YYYY-MM-DD-topic.md"
dependencies:
  - "Web search capability"
  - "Read: ./context/brand.md (for content gap analysis)"
  - "Write: ./memory/research/"
---

## Purpose

Search YouTube for videos on a topic, analyze what exists, identify content gaps, and surface videos worth watching or studying. This feeds into content strategy (what to make) and learning (what to watch).

---

## Execution Steps

### 1. Parse Search Intent
Determine the purpose:
- **Content gap**: What's missing that [YOUR_NAME] could fill?
- **Competitive**: What are others in the niche doing?
- **Learning**: Find the best videos to learn from
- **Trend**: What's getting views right now on this topic?

### 2. Execute Search
- Search YouTube via web search for the topic
- Collect top 10-15 results with: title, channel, view count, publish date, video length
- Note any channels that appear multiple times (dominant voices on this topic)

### 3. Analyze Results
For each video, note:
- **Title pattern**: What hook/format did they use?
- **View performance**: High views relative to channel size = strong topic
- **Content angle**: Educational, opinion, tutorial, showcase, reaction?
- **Production**: Talking head, screen recording, animated, mixed?

### 4. Identify Opportunities
Based on the analysis:
- **Content gaps**: Topics with high search interest but weak existing content
- **Angle gaps**: Existing videos all take the same approach — where's the contrarian or unique angle?
- **Format gaps**: All long-form? Short-form opportunity. All tutorials? Opinion/story opportunity.
- **Recency gaps**: Top results are 6+ months old on a fast-moving topic

### 5. Save Research
Save to `./memory/research/yt-search-YYYY-MM-DD-[topic-slug].md`:
```markdown
# YouTube Research: [Topic]
Date: YYYY-MM-DD
Query: [what was searched]

## Top Results
[table of videos with title, channel, views, date, length]

## Analysis
[patterns, dominant angles, production styles]

## Opportunities
[gaps [YOUR_NAME] could fill]

## Recommended Watches
[2-3 videos worth actually watching, with why]

## Related
[[brand]] [[content ideation]]
```

---

## Notes
- View count alone doesn't indicate a good content opportunity — a video with 500K views on a 5M subscriber channel underperformed
- For [YOUR_NAME]'s niche (AI/dev/automation), channels under 100K subscribers with videos over 50K views indicate hot topics
- Always check publish date — a video from 2023 about AI tools is likely outdated
- This skill pairs with ideation and yt-titles for a full content development pipeline
