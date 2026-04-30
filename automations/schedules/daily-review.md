# Daily Review Automation

**Frequency:** End of day, or on-demand
**Trigger:** "Run the daily review automation" or "daily review"
**Estimated time:** 5–10 minutes

---

## Purpose

Close out the day cleanly: log what was accomplished, triage what's left, check tomorrow's agenda, and keep active-projects.md current. This is the bookend to the Morning Brief skill.

---

## Steps

### 1. Read Today's Context
- Read today's daily note at `./memory/daily-notes/YYYY-MM-DD.md` (if Morning Brief created one)
- Read `./context/active-projects.md` for current project state
- Note which items from today's priorities were completed vs. not

### 2. Inbox Final Pass
- Use `mcp__claude_ai_Gmail__search_threads` with `is:unread newer_than:1d`
- Flag anything urgent that needs same-day action
- If anything can't wait until tomorrow, surface it now

### 3. Check Tomorrow's Agenda
- Use Google Calendar MCP to pull tomorrow's events
- Note any prep needed for tomorrow's meetings
- Flag early-morning commitments that affect morning focus time

### 4. Update Active Projects
- For each project worked on today, update `./context/active-projects.md`:
  - Update "Current focus" to reflect current state
  - Update "Next action" to the actual next step
  - Change status if something completed or stalled
- Keep entries factual and brief — this file is read at session start

### 5. Write / Update Daily Note
If a daily note exists for today, append the end-of-day summary:

```markdown
## EOD Summary — [HH:MM CST]

### Completed
- [ ] (check off completed items)

### Carry-forward
- [items not completed — will appear in tomorrow's brief]

### Tomorrow
- [top 1-3 priorities for tomorrow]
- [any calendar prep needed]
```

If no daily note exists, create one at `./memory/daily-notes/YYYY-MM-DD.md` with just the EOD summary.

### 6. Learning Capture (if applicable)
If something notable happened today — a decision made, a lesson learned, a client insight — append to `./memory/LEARNINGS.md`:

```markdown
## YYYY-MM-DD — [Topic]
- What worked:
- What didn't:
- What to do differently:
```

Only log it if it's worth remembering. Don't pad.

---

## Output
- Updated `./memory/daily-notes/YYYY-MM-DD.md`
- Updated `./context/active-projects.md`
- Optional: new entry in `./memory/LEARNINGS.md`
- Brief in-session summary: what was completed, what carries forward, what tomorrow looks like
