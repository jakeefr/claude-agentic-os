---
name: gmail
trigger: "check email", "triage inbox", "draft a reply to [person]", "send an email", "what emails need attention", Gmail-related requests
inputs:
  - Task type: triage | draft | send | search | label
  - Optional: specific email context (sender, subject, thread ID)
  - Optional: reply tone or constraints
outputs:
  - Triage summary with categorized emails
  - Draft replies in [YOUR_NAME]'s voice
  - Sent confirmations or saved drafts
dependencies:
  - Gmail MCP (mcp__claude_ai_Gmail tools)
  - Read: ./context/brand.md (for voice when drafting)
  - Read: ./context/user-preferences.md (for communication style)
---

## Triage Categories
Every email gets one of four labels:
- **urgent** — requires action today, blocks something, or is time-sensitive
- **respond-today** — needs a reply but not blocking anything
- **fyi** — informational, no action needed, worth reading
- **archive** — newsletters, notifications, receipts, no action

---

## Execution Steps

### Triage Mode
Triggered by: "check email", "triage inbox", "what's in my inbox"

1. Search recent threads using Gmail MCP:
   - `mcp__claude_ai_Gmail__search_threads` with query: `is:unread` or `in:inbox`
2. For each thread, read subject + snippet to categorize
3. Present a structured triage summary:

```
URGENT (action required today)
- [Subject] from [Sender] — [one-line description of what's needed]

RESPOND TODAY
- [Subject] from [Sender] — [one-line description]

FYI (read, no action)
- [Subject] from [Sender]

ARCHIVE (safe to dismiss)
- [Subject] from [Sender] — [type: newsletter / notification / receipt]
```

4. Ask: "Want me to draft replies to any of these, or apply labels?"

### Draft Mode
Triggered by: "draft a reply to [person/subject]", "write an email to [person] about [topic]"

1. Read `./context/brand.md` for voice — specifically the "Outreach / Email" tone: direct, no filler, gets to the point
2. Read the thread context using `mcp__claude_ai_Gmail__get_thread`
3. Draft the reply:
   - Open with the main point or answer — no "Hope you're well" openers
   - Use short paragraphs (1-3 sentences each)
   - End with a clear next step or question if one is needed
   - Sign off: "[YOUR_NAME]" or "— [YOUR_NAME]" (not "Best regards, [YOUR_NAME]")
4. Show draft to [YOUR_NAME] before sending. Ask: "Want to send this, edit it, or save as draft?"

### Send Mode
Only send after [YOUR_NAME] explicitly confirms. Use `mcp__claude_ai_Gmail__create_draft` to stage it first if there's any ambiguity.

### Search Mode
Triggered by: "find the email from [person/topic]", "search for [query]"

Use `mcp__claude_ai_Gmail__search_threads` with appropriate query syntax:
- `from:email@domain.com`
- `subject:"keyword"`
- `after:2026/01/01`
- `is:starred`

Return the matching threads with subject, sender, date, and a one-line summary.

---

## Email Voice Guidelines (from brand.md)
- No filler openers ("Hope you're doing well", "I wanted to reach out")
- Lead with the point
- Short sentences, short paragraphs
- Specific about what you're asking for or what you're providing
- Sign: "[YOUR_NAME]" — never "Best regards" or "Sincerely"

---

## Client Email Notes
When drafting emails to or about clients ([CLIENT_1], [CLIENT_2], [CLIENT_3], [CLIENT_4], [CLIENT_5]), ask [YOUR_NAME] if the thread should be logged to the relevant project in `./context/active-projects.md` or `./memory/projects/`.

---

## Notes
- Never send without explicit [YOUR_NAME] confirmation
- If Gmail MCP isn't connected, tell [YOUR_NAME] exactly what to do: check .mcp.json and verify OAuth
- For bulk triage (20+ emails), prioritize by sender importance and recency
