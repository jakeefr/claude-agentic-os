---
name: yt-pipeline
trigger: "watch this video, analyze this YouTube, /watch-video [url], any YouTube URL dropped in conversation, extract insights from [video]"
inputs:
  - "YouTube URL or local video file path"
  - "Optional: specific focus (extract the architecture, find all action items, get the timestamps)"
outputs:
  - "Structured video breakdown saved to ./memory/research/YYYY-MM-DD-video-title.md"
  - "Linked notes for key concepts, tools, or people mentioned"
  - "In-session summary of top insights and action items"
dependencies:
  - "Video Vision plugin (/watch-video command)"
  - "Read/Write tools for memory"
---

## Execution Steps

### 1. Process the Video
Use the video vision plugin:
```
/watch-video [URL or file path] "[focus instruction]"
```

Default focus instruction if none provided:
> "Extract all key insights, timestamps for important moments, notable quotes, tools or frameworks mentioned, action items or recommendations, and any specific architecture or structure the speaker describes."

### 2. Structure the Output
Organize extracted content into:

- **Video metadata** (title, channel, URL, date watched)
- **One-paragraph summary** — what is this video actually about and why does it matter?
- **Key insights** — bulleted, in order of importance (not chronological)
- **Timestamps** — notable moments with description (e.g., `14:32 — Explains the memory layer architecture`)
- **Quotes worth keeping** — direct quotes, marked as such
- **Tools / frameworks / resources mentioned** — with context
- **Action items** — concrete things [YOUR_NAME] could do based on this video
- **Questions raised** — things to follow up on or research further

### 3. Save Memory Note
Save to `./memory/research/YYYY-MM-DD-video-slug.md`

```markdown
# [Video Title]
Source: [Channel Name] — [URL]
Watched: YYYY-MM-DD
Tags: #video #[topic-tags]

## Summary
[One paragraph]

## Key Insights
- 

## Timestamps
- `MM:SS` — 

## Quotes
> "[quote]" — Speaker Name

## Tools & Resources
- 

## Action Items
- [ ] 

## Questions to Follow Up
- 

## Related
[[link-to-related-notes]]
```

### 4. Create Linked Notes
For any tool, framework, person, or concept that came up and is worth remembering on its own, create or update a stub note and link to it from the video note.

### 5. Deliver In-Session
Give [YOUR_NAME] a tight summary of what you found — 3–5 bullets of the most actionable or interesting things, plus which action items are most relevant to current projects.

---

## Notes
- If the video plugin isn't available, ask [YOUR_NAME] to share a transcript or timestamps manually and proceed with text analysis
- For long videos (1hr+), ask [YOUR_NAME] if there's a specific section to focus on first
- Tag notes with the relevant domain: #architecture, #content, #ai-systems, #business, etc.
