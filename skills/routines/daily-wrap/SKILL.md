# Daily Wrap

**Trigger:** "Run daily wrap" or "wrap up the day" or "end of day review"
**Category:** productivity
**Schedule:** Daily 6:00 PM CST
**Estimated time:** 5 minutes
**Estimated cost:** ~$0.10

---

## Purpose

Close out the day cleanly. Summarize what happened, update the daily note, capture learnings, and optionally email [YOUR_NAME] a wrap-up. This replaces the old daily-review automation with a tighter, inbox-aware format.

---

## Inputs

- `./memory/daily-notes/YYYY-MM-DD.md` — today's daily note
- `./memory/inbox/` — today's routine outputs (morning brief, client pulse, etc.)
- `.runs/history.json` — today's skill runs
- `./context/active-projects.md`
- Gmail (via `mcp__claude_ai_Gmail__search_threads`) — threads from today

## Steps

### 1. Gather Today's Activity
- Read today's daily note
- Read all files in `./memory/inbox/` dated today
- Count today's skill runs from `.runs/history.json`
- Check today's email activity (sent/received count)

### 2. Summarize Accomplishments
- Extract completed items from daily note priorities
- List routines that ran and their key outputs
- Note any client interactions or project progress

### 3. Identify Carry-Forward
- Extract incomplete items from daily note priorities
- Flag any URGENT/ACTION emails that weren't resolved
- Note any blocked items and what's blocking them

### 4. Update Daily Note
Append to `./memory/daily-notes/YYYY-MM-DD.md`:

```markdown
## EOD Summary — [HH:MM CST]

### Completed
- [x] [completed items]
- [x] [routines that ran]

### Carry-Forward
- [ ] [incomplete items → tomorrow's priorities]

### Metrics
- Skill runs today: [count]
- Routines completed: [count]/[total]
- Emails processed: [count]

### Tomorrow
- [top 1-3 priorities for tomorrow]
```

### 5. Capture Learnings (if applicable)
If something notable happened today, append to `./memory/LEARNINGS.md`:

```markdown
## YYYY-MM-DD — [Topic]
- What worked:
- What didn't:
- What to do differently:
```

### 6. Save Wrap-Up to Inbox
- Save to `./memory/inbox/YYYY-MM-DD-daily-wrap.md`:

```markdown
---
type: daily-wrap
date: YYYY-MM-DD
routine: daily-wrap
---

# Daily Wrap — YYYY-MM-DD

## Completed
- [list of completed items]

## Carry-Forward
- [list of items for tomorrow]

## Metrics
- Runs: [count] | Routines: [X/7] | Emails: [count]

## Tomorrow's Top 3
1. [priority 1]
2. [priority 2]
3. [priority 3]
```

### 7. Email Wrap-Up
- Send the daily wrap-up via SMTP:
```bash
npx tsx automations/send-email.ts --to "[YOUR_EMAIL]@gmail.com" --subject "Daily Wrap · YYYY-MM-DD" --body "$(cat memory/inbox/YYYY-MM-DD-daily-wrap.md)"
```

---

## Outputs

- Updated `./memory/daily-notes/YYYY-MM-DD.md` with EOD summary
- `./memory/inbox/YYYY-MM-DD-daily-wrap.md` — wrap-up report
- Email sent to [YOUR_NAME] with daily wrap-up
- Optional: Updated `./memory/LEARNINGS.md`
- In-session summary of the day
