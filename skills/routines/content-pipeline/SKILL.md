# Content Pipeline

**Trigger:** "Run content pipeline" or "find content ideas" or "mine for content"
**Category:** content
**Schedule:** Weekdays 12:00 PM CST
**Estimated time:** 6 minutes
**Estimated cost:** ~$0.12

---

## Purpose

Turn today's research, notes, and news into actionable content ideas for X. Mine the vault for signal worth sharing. [YOUR_NAME]'s brand is practical AI/dev insights — not hype, not theory.

---

## Inputs

- `./memory/daily-notes/YYYY-MM-DD.md` — today's daily note (news, research)
- `./memory/research/` — recent research notes (last 7 days)
- `./memory/inbox/` — recent routine outputs (morning briefs, etc.)
- `./context/brand.md` — voice/tone guidelines

## Steps

### 1. Read Today's Context
- Read today's daily note for news items and research
- Scan `./memory/research/` for files modified in the last 7 days
- Read `./context/brand.md` for voice/tone

### 2. Mine for Content Angles
For each interesting finding, generate content angles:
- **Hot take** — contrarian or strong opinion on a trend
- **How-to** — practical walkthrough of something [YOUR_NAME] built or learned
- **Thread idea** — multi-post deep dive on a topic
- **Quote tweet hook** — reaction to someone else's post
- **Short-form script** — 30-60 second video concept

### 3. Score and Rank
Rate each idea on:
- **Relevance to [YOUR_NAME]'s brand** (AI, dev tools, freelancing, building in public)
- **Timeliness** (is this trending now?)
- **Effort** (can it ship today?)
Pick the top 3-5 ideas.

### 4. Draft Hooks
For each top idea, write 2-3 hook variations (first line of the post/thread):
- Keep [YOUR_NAME]'s voice: direct, slightly irreverent, practical
- No corporate speak, no generic "5 things I learned" formats
- Hooks should stop the scroll

### 5. Save to Inbox
- Save to `./memory/inbox/YYYY-MM-DD-content-pipeline.md`:

```markdown
---
type: content-pipeline
date: YYYY-MM-DD
routine: content-pipeline
---

# Content Pipeline — YYYY-MM-DD

## Top Ideas

### 1. [Idea Title]
**Angle:** [hot take / how-to / thread / etc.]
**Source:** [what research/news inspired this]
**Hooks:**
- [hook 1]
- [hook 2]
**Format:** [X post / thread / short-form / carousel]
**Effort:** [quick / medium / deep]

### 2. [Idea Title]
...

### 3. [Idea Title]
...

## Backlog
- [lower-priority ideas worth saving for later]
```

### 6. Email Content Ideas
- Send the content pipeline report via SMTP:
```bash
npx tsx automations/send-email.ts --to "[YOUR_EMAIL]@gmail.com" --subject "Content Pipeline · YYYY-MM-DD" --body "$(cat memory/inbox/YYYY-MM-DD-content-pipeline.md)"
```

---

## Outputs

- `./memory/inbox/YYYY-MM-DD-content-pipeline.md` — ranked content ideas with hooks
- Email sent to [YOUR_NAME] with content ideas
- In-session summary of top content opportunities
