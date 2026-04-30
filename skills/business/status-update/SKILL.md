---
name: status-update
trigger: "project status", "status update for [client]", "where are we on [project]", "client update", "write a status update"
inputs:
  - Project or client name
  - Optional: audience (client, internal, stakeholder)
  - Optional: specific accomplishments or blockers to highlight
outputs:
  - Formatted status update ready to send
  - Saved to ./memory/projects/PROJECT/status-YYYY-MM-DD.md
dependencies:
  - Read: ./memory/projects/PROJECT/ (brief, recent notes)
  - Read: ./context/active-projects.md
  - Git log access for development projects
  - Write: ./memory/projects/
---

## Purpose

Generate clear, professional project status updates for clients or internal tracking. Pulls from git history, project notes, and conversation context to produce accurate updates without [YOUR_NAME] having to remember every detail.

---

## Execution Steps

### 1. Gather Current State
- Read the project brief at `./memory/projects/[project]/brief.md`
- Read recent project notes and decisions
- If dev project: run `git log --since="last week"` for recent commits
- Check active-projects.md for recorded status
- Note any blockers, risks, or delays from conversation context

### 2. Determine Audience
Adjust tone and detail:
- **Client**: Professional, non-technical, focus on outcomes and timeline
- **Internal**: Technical, detailed, focus on blockers and decisions
- **Stakeholder**: High-level, focus on progress percentage and milestones

### 3. Write the Update

**Client format:**
```markdown
## Project Update: [Project Name]
**Date:** YYYY-MM-DD
**Status:** On Track | At Risk | Blocked

### Completed This Period
- [User-facing accomplishment in plain language]
- [User-facing accomplishment]

### In Progress
- [What's actively being worked on and expected completion]

### Upcoming
- [What's next on the roadmap]

### Blockers / Need From You
- [Anything blocking progress that requires client action]

### Timeline Check
[Are we on track? Any adjustments needed?]
```

**Internal format:**
```markdown
## [Project] Status — YYYY-MM-DD

### Done
- [Technical detail with commit references]

### Doing
- [Current work with ETA]

### Blocked
- [Blocker with required resolution]

### Decisions Needed
- [Decision with options and recommendation]

### Health: 🟢/🟡/🔴
[One-line assessment]
```

### 4. Save
Save to `./memory/projects/[project-name]/status-YYYY-MM-DD.md`.

### 5. Delivery Recommendation
Suggest the best channel to deliver the update:
- Email for formal client updates
- Slack/DM for quick internal updates
- Include in daily note for personal tracking

---

## Notes
- Never surprise a client with bad news in a status update — flag risks early
- "On Track" should be the default unless there's a specific reason it isn't
- If there's nothing to report, say "steady progress, no blockers" — don't pad the update
- For recurring client updates, maintain a consistent format so they know what to expect
- Link status updates to the project brief: [[project-brief]]
