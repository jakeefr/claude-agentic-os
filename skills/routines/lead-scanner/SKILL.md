# Lead Scanner

**Trigger:** "Run lead scanner" or "find leads" or "scan for prospects"
**Category:** business
**Schedule:** Mon/Thu 11:00 AM CST
**Estimated time:** 7 minutes
**Estimated cost:** ~$0.15

---

## Purpose

Find potential freelance/consulting leads by scanning Reddit, X, and Hacker News for people asking for help with AI systems, web apps, automations, or Claude/LLM tooling. Surface opportunities — NEVER reach out automatically.

---

## Inputs

- Web search (Reddit, X/Twitter, Hacker News)
- `./context/brand.md` — [YOUR_NAME]'s positioning
- `./context/active-projects.md` — current capacity context

## Steps

### 1. Define Search Queries
Search for signals like:
- "looking for freelancer" + (AI / automation / Claude / web app / Next.js)
- "need help building" + (AI agent / chatbot / dashboard / automation)
- "hiring freelance developer" + (AI / LLM / GPT / Claude)
- Reddit: r/freelance, r/forhire, r/SaaS, r/artificial, r/webdev
- Hacker News: "Ask HN" + freelance/consulting signals
- X: people complaining about building AI features, asking for recommendations

### 2. Filter Results
For each result, evaluate:
- **Fit** — does it match [YOUR_NAME]'s skills? (AI systems, web apps, automations, dashboards)
- **Recency** — posted in the last 3 days?
- **Budget signals** — any mention of budget, company size, or project scope?
- **Competition** — already flooded with replies?

Keep only results that score well on fit + recency.

### 3. Research Prospects
For each kept lead:
- Check their profile/history for context
- Note their company, role, or project if visible
- Identify what they actually need (not just what they asked for)

### 4. Draft Approach Notes
For each lead, write:
- **What they need** (1 sentence)
- **Why [YOUR_NAME] is a fit** (1 sentence)
- **Suggested approach** (DM, reply, email — with a draft opening line)
- DO NOT auto-send anything

### 5. Save to Inbox
- Save to `./memory/inbox/YYYY-MM-DD-leads.md`:

```markdown
---
type: lead-scan
date: YYYY-MM-DD
routine: lead-scanner
---

# Lead Scanner — YYYY-MM-DD

**Leads found:** [count]
**Worth pursuing:** [count]

## Hot Leads

### 1. [Platform] — [Username/Company]
**Source:** [URL or description]
**Need:** [what they're looking for]
**Fit:** [why [YOUR_NAME] matches]
**Approach:** [suggested outreach — DM/reply/email]
**Draft opener:** "[suggested first message]"

### 2. ...

## Warm Leads
- [lower-priority leads worth monitoring]

## Market Signals
- [any trends noticed — e.g., "lots of demand for Claude integrations this week"]
```

### 6. Email Lead Report
- Send the lead scanner report via SMTP:
```bash
npx tsx automations/send-email.ts --to "[YOUR_EMAIL]@gmail.com" --subject "Lead Scanner · YYYY-MM-DD" --body "$(cat memory/inbox/YYYY-MM-DD-leads.md)"
```

---

## Outputs

- `./memory/inbox/YYYY-MM-DD-leads.md` — lead report
- Email sent to [YOUR_NAME] with lead report
- In-session summary of opportunities found

---

## Rules

- **NEVER send messages, DMs, emails, or replies automatically**
- **NEVER create social media posts or comments**
- [YOUR_NAME] reviews every lead and decides whether/how to reach out
- This is intelligence gathering, not outreach automation
- If no good leads found, say so — don't pad the report
