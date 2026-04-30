# Client Pulse Check

**Trigger:** "Run client pulse check" or "check on clients" or "client status"
**Category:** business
**Schedule:** Weekdays 9:00 AM CST
**Estimated time:** 5 minutes
**Estimated cost:** ~$0.10

---

## Purpose

Catch stale clients and missed follow-ups before they become problems. Review active projects, flag anything that hasn't had contact in 3+ days, and surface next actions.

---

## Inputs

- `./context/active-projects.md`
- `./memory/projects/` — project-specific notes
- Gmail (via `mcp__claude_ai_Gmail__search_threads`) — recent client threads
- `./memory/people/` — client contact notes

## Steps

### 1. Load Active Projects
- Read `./context/active-projects.md`
- For each client project with status "Active":
  - Note the current focus, next action, and any dates mentioned
  - Flag if "Next action" is empty — that's a stale project

### 2. Check Recent Communication
- For each active client, search Gmail:
  - `from:clientdomain OR to:clientdomain newer_than:7d`
  - Or search by client name if domain unknown
- Record last email date and direction (sent vs received)
- Flag clients with no communication in 3+ business days

### 3. Project Health Assessment
- For each active client, rate:
  - **GREEN** — active communication, clear next steps
  - **YELLOW** — 3-5 days since contact, or unclear next steps
  - **RED** — 5+ days silent, or blocked with no resolution path

### 4. Generate Pulse Report
- Save to `./memory/inbox/YYYY-MM-DD-client-pulse.md`:

```markdown
---
type: client-pulse
date: YYYY-MM-DD
routine: client-pulse-check
---

# Client Pulse — YYYY-MM-DD

| Client | Status | Last Contact | Next Action | Flag |
|--------|--------|-------------|-------------|------|
| [CLIENT_1] | 🟢/🟡/🔴 | [date] | [action] | [if any] |
| [CLIENT_2] | ... | ... | ... | ... |
| [CLIENT_3] | ... | ... | ... | ... |
| [CLIENT_4] | ... | ... | ... | ... |
| [CLIENT_5] | ... | ... | ... | ... |

## Needs Attention
- [any RED or YELLOW clients with recommended actions]

## Suggested Follow-ups
- [specific emails to send or actions to take]
```

### 5. Update Active Projects (if needed)
- If any project's status or next action has clearly changed based on email evidence, update `./context/active-projects.md`
- Only update facts — don't speculate on project direction

### 6. Email Pulse Report
- Send the client pulse report via SMTP:
```bash
npx tsx automations/send-email.ts --to "[YOUR_EMAIL]@gmail.com" --subject "Client Pulse · YYYY-MM-DD" --body "$(cat memory/inbox/YYYY-MM-DD-client-pulse.md)"
```

---

## Outputs

- `./memory/inbox/YYYY-MM-DD-client-pulse.md` — pulse report
- Updated `./context/active-projects.md` (if changes found)
- Email sent to [YOUR_NAME] with the pulse report
- In-session summary of client health
