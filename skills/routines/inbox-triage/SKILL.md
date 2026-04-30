# Inbox Triage

**Trigger:** "Run inbox triage" or "triage my inbox" or "check email"
**Category:** productivity
**Schedule:** Daily 8:00 AM CST
**Estimated time:** 5 minutes
**Estimated cost:** ~$0.10

---

## Purpose

Process unread email fast. Categorize, flag urgent, draft replies for [YOUR_NAME]'s review. Goal: zero-inbox triage, not zero-inbox completion — [YOUR_NAME] still sends the replies.

---

## Inputs

- Gmail (via `mcp__claude_ai_Gmail__search_threads`)
- `./context/active-projects.md` — to identify client emails
- `./memory/people/` — contact context

## Steps

### 1. Pull Unread Threads
- Use `mcp__claude_ai_Gmail__search_threads` with `is:unread`
- Pull up to 20 most recent unread threads
- For each, get subject, sender, snippet, date

### 2. Categorize Each Thread
Assign each thread to exactly one category:
- **URGENT** — needs reply within hours (client deadline, time-sensitive request)
- **ACTION** — needs a reply or decision, but not time-critical
- **CLIENT** — from an active client (cross-reference active-projects.md)
- **NEWSLETTER** — automated/marketing content
- **FYI** — informational, no action needed
- **SPAM/LOW** — can be archived or ignored

### 3. Draft Replies (ACTION + URGENT only)
For threads categorized as URGENT or ACTION:
- Read the full thread via `mcp__claude_ai_Gmail__get_thread`
- Draft a reply in [YOUR_NAME]'s voice (direct, professional, no fluff)
- Save draft via `mcp__claude_ai_Gmail__create_draft`
- Mark the draft clearly: "[DRAFT — review before sending]"

### 4. Label Threads
- Apply Gmail labels based on category:
  - URGENT → label "urgent"
  - CLIENT → label "clients"
- Use `mcp__claude_ai_Gmail__label_thread` for each

### 5. Save Triage Report to Inbox
- Save to `./memory/inbox/YYYY-MM-DD-inbox-triage.md`:

```markdown
---
type: inbox-triage
date: YYYY-MM-DD
routine: inbox-triage
---

# Inbox Triage — YYYY-MM-DD

**Unread processed:** [count]
**Drafts created:** [count]

## Urgent
- [sender] — [subject] — [one-line summary] — DRAFT CREATED
- ...

## Action Required
- [sender] — [subject] — [one-line summary] — DRAFT CREATED
- ...

## Client
- [sender] — [subject] — [one-line summary]
- ...

## FYI
- [sender] — [subject]
- ...

## Archived/Low Priority
- [count] threads — newsletters, notifications, etc.
```

### 6. Email Triage Report
- Send the inbox triage report via SMTP:
```bash
npx tsx automations/send-email.ts --to "[YOUR_EMAIL]@gmail.com" --subject "Inbox Triage · YYYY-MM-DD" --body "$(cat memory/inbox/YYYY-MM-DD-inbox-triage.md)"
```

---

## Outputs

- Gmail drafts for URGENT/ACTION threads ([YOUR_NAME] reviews before sending)
- Gmail labels applied
- `./memory/inbox/YYYY-MM-DD-inbox-triage.md` — triage report
- Email sent to [YOUR_NAME] with triage summary
- In-session summary of inbox state

---

## Rules

- NEVER send emails automatically — only create drafts
- NEVER unsubscribe from anything without asking
- NEVER mark threads as read — [YOUR_NAME] decides what's "done"
- If unsure about urgency, escalate to ACTION (not URGENT)
