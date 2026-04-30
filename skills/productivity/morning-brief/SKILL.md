---
name: morning-brief
trigger: "morning brief, daily review, start my day, what's on today, run the morning brief"
inputs:
  - "None required (reads context automatically)"
  - "Optional: specific focus area or override for today"
outputs:
  - "Daily note saved to ./memory/daily-notes/YYYY-MM-DD.md"
  - "Updated active-projects.md with current status"
  - "In-session summary of the day's priorities"
dependencies:
  - "Gmail MCP (mcp__claude_ai_Gmail tools) for inbox triage"
  - "Read: ./context/active-projects.md"
  - "Read: ./context/user-preferences.md"
  - "Read: ./memory/daily-notes/ (previous day's note if exists)"
---

## Purpose

Single-command daily entry point. Combines calendar awareness, inbox triage, project status, and daily note creation into one orchestrated skill. Run this first thing every morning.

---

## Execution Steps

### 1. Read Context
- Read `./context/active-projects.md` for current project state
- Read `./context/user-preferences.md` for scheduling preferences
- Check if yesterday's daily note exists at `./memory/daily-notes/` — read any unfinished items

### 2. Inbox Triage
- Use `mcp__claude_ai_Gmail__search_threads` with query `is:unread newer_than:1d`
- Categorize into: **urgent**, **respond-today**, **fyi**, **archive**
- Note any emails that relate to active projects

### 3. Project Pulse
For each project in active-projects.md that has status "Active" or "In progress":
- Check if there are related emails from the triage
- Note any deadlines or blockers mentioned in the project notes
- Flag anything that hasn't been updated in 7+ days as potentially stale

### 4. Build Today's Priorities
Assemble a priority list based on:
1. Urgent emails requiring action
2. Active project deadlines or blockers
3. Respond-today emails
4. Carry-over items from yesterday's daily note
5. Any scheduled focus work from preferences

### 5. Write Daily Note
Save to `./memory/daily-notes/YYYY-MM-DD.md`:

```markdown
# YYYY-MM-DD — Daily Note

## Priorities
- [ ] [Priority 1]
- [ ] [Priority 2]
- [ ] [Priority 3]

## Inbox Summary
- **Urgent:** [count] — [brief descriptions]
- **Respond today:** [count]
- **FYI:** [count]
- **Archived:** [count]

## Project Pulse
- **[Project]:** [one-line status / next action]

## Carry-over from Yesterday
- [Any unchecked items from previous daily note]

## Notes
[Space for ad-hoc notes throughout the day]

## Related
[[active-projects]]
```

### 6. Deliver Summary
Present a concise briefing:
- Top 3 priorities for today
- Any urgent items requiring immediate attention
- Quick project status (only projects with movement or deadlines)

Keep it short. Don't dump the full daily note — [YOUR_NAME] can read that in Obsidian.

---

## Notes
- If Gmail MCP isn't connected, skip inbox triage and note it — don't block the entire brief
- Morning focus time is preferred for deep work (from user-preferences) — don't schedule meetings or shallow tasks in the morning slot
- CST timezone — all times should reference Central Time
- If yesterday's note has unchecked items, carry them forward — don't silently drop them
