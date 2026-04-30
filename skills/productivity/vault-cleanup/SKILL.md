---
name: vault-cleanup
trigger: "clean up vault, vault cleanup, vault maintenance, check vault health, kb status, memory health"
inputs:
  - "Optional: scope (full | inbox-only | stale-check | orphan-check)"
  - "Optional: dry-run flag (show what would be done without doing it)"
outputs:
  - "Vault health report"
  - "List of actions taken (or proposed in dry-run mode)"
  - "Updated LEARNINGS.md with cleanup summary"
dependencies:
  - "Read/Write access to ./memory/"
  - "Glob and Grep tools for scanning"
---

## Purpose

Maintain vault hygiene so memory stays useful over time. Surfaces orphaned notes, stale content, empty files, oversized inbox, and broken links. Run weekly or when the vault feels cluttered.

---

## Execution Steps

### 1. Scan Vault
Gather metrics:
- Total note count (by directory)
- Files modified in last 7 days vs. older than 30 days vs. older than 90 days
- Inbox item count (anything in `./memory/inbox/`)
- Empty files (exist but have no meaningful content)

### 2. Check for Issues

**a. Orphaned notes**
- Find notes that are not linked from any other note (no `[[this-note]]` references elsewhere)
- Exclude: daily-notes (these are inherently standalone), LEARNINGS.md, inbox items
- Flag orphans that are older than 14 days — fresh orphans may just be new

**b. Stale inbox items**
- Anything in `./memory/inbox/` older than 7 days should be filed or deleted
- List each with its age and first line of content

**c. Empty or near-empty files**
- Files with fewer than 3 lines of actual content (excluding frontmatter)
- These are usually stub notes that were never filled in

**d. Broken wiki-links**
- Scan all notes for `[[link-name]]` patterns
- Check if the linked file exists anywhere in `./memory/`
- Report broken links with the source file and the missing target

**e. Stale project notes**
- Notes in `./memory/projects/` not modified in 30+ days
- These may indicate abandoned or completed work that should be archived

### 3. Build Health Report
Present a structured report:

```
VAULT HEALTH REPORT — YYYY-MM-DD

Total notes: [count]
  research/: [count]
  projects/: [count]
  people/: [count]
  decisions/: [count]
  daily-notes/: [count]
  inbox/: [count]
  other: [count]

ISSUES FOUND:
  Orphaned notes: [count]
  Stale inbox items (7+ days): [count]
  Empty files: [count]
  Broken links: [count]
  Stale project notes (30+ days): [count]

RECENT ACTIVITY:
  Modified this week: [count]
  Modified this month: [count]
  Untouched 90+ days: [count]
```

### 4. Propose Actions
For each issue, suggest a specific action:
- **Orphaned notes:** "Link from a related note, or delete if no longer relevant"
- **Stale inbox:** "File to appropriate folder, or delete"
- **Empty files:** "Fill in or delete"
- **Broken links:** "Create the missing note, or fix the link"
- **Stale projects:** "Update status, archive, or mark as done in active-projects.md"

### 5. Execute (if not dry-run)
Only take action with [YOUR_NAME]'s confirmation:
- Delete empty files
- Move stale inbox items to appropriate folders
- Fix obvious broken links (typos in link names)

Never delete notes with real content without explicit approval.

### 6. Log Results
Append a brief entry to `./memory/LEARNINGS.md`:

```markdown
## YYYY-MM-DD — Vault Cleanup
- Notes scanned: [count]
- Issues found: [count]
- Actions taken: [list]
- What to do differently: [any observations]
```

---

## Notes
- Default to dry-run behavior — show what would be done, then ask before executing
- Daily notes should never be flagged as orphans — they're standalone by design
- LEARNINGS.md is a special file — never flag it for cleanup
- If the vault has fewer than 10 notes, skip most checks — too early to worry about hygiene
- Run this after a heavy research or project sprint when lots of notes were created quickly
