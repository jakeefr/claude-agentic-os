---
name: kb-query
trigger: "search memory, find in vault, what do I know about [topic], check my notes on [topic], kb query [topic], search notes for [topic]"
inputs:
  - "Query: keyword, topic, person name, project name, or question"
  - "Optional: scope (all | research | projects | people | decisions | daily-notes)"
  - "Optional: time range (e.g., last 30 days, this month)"
outputs:
  - "Ranked list of matching notes with relevant excerpts"
  - "Summary of what the vault contains on the topic"
  - "Links to the most relevant notes"
dependencies:
  - "Read access to ./memory/ (full vault)"
  - "Grep tool for content search"
  - "Glob tool for file discovery"
---

## Purpose

Search and query the memory vault to surface relevant notes, decisions, research, and context. This is how the Agentic OS retrieves its own knowledge — without this, memory only grows and never gets used.

---

## Execution Steps

### 1. Parse Query
- Extract the core search terms from the user's request
- Determine scope: is the user looking for research, a person, a project, a decision, or searching broadly?
- Determine time constraint if any

### 2. Search Phase
Run searches in this order, stopping when enough results are found:

**a. File name match**
- Glob for files in `./memory/` whose names contain the search terms
- Check all subdirectories: research/, projects/, people/, decisions/, daily-notes/, inbox/, learnings/

**b. Content search**
- Grep through `./memory/**/*.md` for the search terms
- Search for both exact phrases and individual keywords
- Search for `[[wiki-links]]` that reference the topic

**c. Related note discovery**
- For each matching file, read it and check its `## Related` section for linked notes
- Follow one level of links to find connected notes the keyword search might miss

### 3. Rank Results
Order results by relevance:
1. Exact file name match (e.g., searching "example-project" finds `projects/example-project.md`)
2. Title/heading match (the topic appears in an H1 or H2)
3. Frequent content match (topic appears multiple times in the note)
4. Single mention or tangential reference
5. Linked-from-a-match (found via Related section, not direct match)

Within each tier, sort by modification time (newest first).

### 4. Present Results
For each result (up to 10):
- **File path** (relative to memory/)
- **Last modified** date
- **Relevant excerpt** (2-3 lines of context around the match)
- **Connection** (why this matched — direct hit, linked note, etc.)

### 5. Summarize
After the result list, give a 2-3 sentence summary:
- What the vault contains on this topic
- Any gaps (e.g., "no decisions logged about this" or "last note on this is 3 months old")
- Suggest follow-up if warranted (e.g., "want me to run deep-research to update this?")

---

## Scope Shortcuts

| User says | Search in |
|-----------|-----------|
| "search research" | ./memory/research/ only |
| "check project notes" | ./memory/projects/ only |
| "who is [name]" | ./memory/people/ first, then broad |
| "what did I decide about" | ./memory/decisions/ first, then broad |
| "recent notes on" | All, sorted by recency, last 14 days |

---

## Notes
- Don't read every file in the vault — use Glob and Grep to narrow first, then Read the matches
- If the vault is empty or has no matches, say so directly — don't fabricate results
- If a search returns too many results (20+), narrow by asking the user for scope
- This skill is read-only — it never modifies notes
