# Memory Consolidation Automation

**Frequency:** Weekly (run alongside or after weekly-review)
**Trigger:** "Run memory consolidation" or "consolidate memory" or "clean up the vault"
**Estimated time:** 10–20 minutes depending on vault size

---

## Purpose

Keep the Obsidian vault useful as it grows. Without maintenance, notes accumulate without connecting, inbox fills up, and the vault becomes noise instead of signal. This automation is the vault's immune system.

---

## Relationship to Vault Cleanup Skill
This automation is a scheduled, deeper version of the `vault-cleanup` skill. The skill is for on-demand spot-checks; this automation is for the full weekly maintenance pass. Run this instead of (or after) the skill on weekly review days.

---

## Steps

### 1. Inbox Processing
- Read every file in `./memory/inbox/`
- For each item, determine the right home:
  - Research finding → `./memory/research/`
  - Person note → `./memory/people/`
  - Project note → `./memory/projects/`
  - Decision → `./memory/decisions/`
  - Learning → append to `./memory/LEARNINGS.md`
  - Truly ephemeral → can be deleted (confirm with the user first)
- Present the proposed moves — don't execute without confirmation
- Goal: inbox should be empty after this step

### 2. Orphan Detection
- Scan all notes for `[[wiki-link]]` patterns
- Build a list of all notes that are not linked from anywhere
- Exclude: `LEARNINGS.md`, daily notes (these are standalone by design)
- For each orphan older than 14 days: present with first 3 lines of content
- Suggest: "link from [related note]" or "delete if stale"

### 3. Broken Link Repair
- Find all `[[link-name]]` references across the vault
- Check if the target file exists (exact match or close match)
- For broken links:
  - If close match found (e.g., `[[example-project]]` → `example-project-project.md`): suggest fix
  - If no match: suggest creating a stub note or removing the link
- Present fixes — apply after confirmation

### 4. Stale Content Review
- Find notes not modified in 30+ days in:
  - `./memory/projects/` — may indicate completed or abandoned work
  - `./memory/inbox/` — should have been processed already
- Find notes not modified in 90+ days in:
  - `./memory/research/` — may need a freshness check or archive tag
- Don't delete — flag for the user's decision

### 5. Duplicate Detection
- Search for notes with very similar titles (e.g., `example-project.md` and `example-project-notes.md`)
- Search for content overlap: if two notes share 3+ identical bullet points, surface them
- Suggest merge targets — never auto-merge

### 6. Index Update
If `./memory/` has any index or MOC (Map of Content) files, update them:
- Add newly created notes that aren't indexed
- Remove references to deleted notes
- If no index exists and vault has 20+ notes: suggest creating one at `./memory/index.md`

### 7. Log Results
Append to `./memory/LEARNINGS.md`:

```markdown
## YYYY-MM-DD — Memory Consolidation
- Notes processed from inbox: [count]
- Orphans resolved: [count]
- Broken links fixed: [count]
- Stale notes flagged: [count]
- Total vault size: [count] notes
```

---

## Output
- Empty (or near-empty) inbox
- Proposed orphan/broken-link fixes (awaiting the user's confirmation)
- List of stale notes for review
- Updated LEARNINGS.md with consolidation log
- In-session summary of vault health before and after

---

## Notes
- Always propose before acting — this automation touches a lot of files
- Never delete notes with real content without explicit confirmation
- Daily notes are never orphans, never stale — skip them for all checks
- The vault's job is to be useful, not comprehensive. Suggest pruning, don't resist it.
