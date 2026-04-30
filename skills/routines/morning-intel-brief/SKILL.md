# Morning Intel Brief

**Trigger:** "Run morning intel brief" or "morning brief" or "start my day"
**Category:** productivity
**Schedule:** Daily 7:00 AM CST
**Estimated time:** 8 minutes
**Estimated cost:** ~$0.15

---

## Purpose

Start the day with signal, not noise. Scan AI/dev news, summarize unread email, preview today's calendar, and create today's daily note with priorities.

---

## Inputs

- Gmail (via `mcp__claude_ai_Gmail__search_threads`)
- Google Calendar (today's events)
- Web search for AI/dev news
- `./context/active-projects.md`
- `./memory/daily-notes/` (yesterday's note for carry-forward items)

## Steps

### 1. AI & Dev News Scan
- Web search for top AI/dev news from the last 24 hours
- Focus on: Claude/Anthropic updates, OpenAI, LLM tooling, MCP ecosystem, Next.js, Vercel
- Pick the top 3-5 most relevant items
- Format as bullet points with one-line summaries

### 2. Email Summary
- Use `mcp__claude_ai_Gmail__search_threads` with `is:unread newer_than:1d`
- Categorize threads:
  - **ACTION REQUIRED** — needs a reply or decision today
  - **FYI** — informational, no action needed
  - **CLIENT** — anything from active clients
- List each with: sender, subject, one-line summary, category

### 3. Calendar Preview
- Pull today's events from Google Calendar
- List each with: time, title, attendees (if any)
- Flag any prep needed (e.g., "[CLIENT_2] call — review latest dashboard")

### 4. Yesterday's Carry-Forward
- Read yesterday's daily note from `./memory/daily-notes/`
- Extract any items marked as "carry-forward" or incomplete priorities
- These become today's starting priorities

### 5. Create Today's Daily Note
- Write to `./memory/daily-notes/YYYY-MM-DD.md`:

```markdown
# YYYY-MM-DD — Daily Note

## Priorities
- [ ] [carry-forward items from yesterday]
- [ ] [items from ACTION REQUIRED emails]
- [ ] [items from calendar/meetings]

## News & Signals
- [top 3-5 AI/dev news items]

## Email Summary
### Action Required
- [list]
### Client
- [list]
### FYI
- [list]

## Calendar
- [HH:MM] [Event name]
- ...

## Notes
[blank — filled throughout the day]
```

### 6. Save to Inbox
- Save a condensed briefing to `./memory/inbox/YYYY-MM-DD-morning-brief.md`:

```markdown
---
type: morning-brief
date: YYYY-MM-DD
routine: morning-intel-brief
---

# Morning Brief — YYYY-MM-DD

## Top Priorities
- [3-5 items]

## News
- [3-5 items]

## Emails Needing Action
- [list]

## Today's Calendar
- [list]
```

### 7. Email Briefing
- Send the morning brief via SMTP:
```bash
npx tsx automations/send-email.ts --to "[YOUR_EMAIL]@gmail.com" --subject "Morning Brief · YYYY-MM-DD" --body "$(cat memory/inbox/YYYY-MM-DD-morning-brief.md)"
```

---

## Outputs

- `./memory/daily-notes/YYYY-MM-DD.md` — today's daily note
- `./memory/inbox/YYYY-MM-DD-morning-brief.md` — condensed briefing
- Email sent to [YOUR_NAME] with the morning brief
- In-session summary of the day ahead
