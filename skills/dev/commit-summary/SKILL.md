---
name: commit-summary
trigger: "summarize commits, what changed, commit summary, changelog, recent changes in [repo], git log summary"
inputs:
  - "Optional: repository path (default: current directory)"
  - "Optional: time range (default: last 7 days)"
  - "Optional: branch (default: main/current)"
  - "Optional: format (summary, changelog, standup, client update)"
outputs:
  - "Formatted commit summary"
  - "Optional: saved to ./memory/projects/PROJECT/changelog-YYYY-MM-DD.md"
dependencies:
  - "Git CLI access"
  - "Read access to the target repository"
---

## Purpose

Generate human-readable summaries of recent git activity. Used for standups, client updates, changelogs, and personal tracking of what was shipped.

---

## Execution Steps

### 1. Gather Git Data
Run against the target repo:
```bash
git log --since="[timerange]" --pretty=format:"%h|%an|%ad|%s" --date=short
```
Also gather:
- Files changed: `git diff --stat [range]`
- Branches with recent activity: `git branch --sort=-committerdate`
- Any tags in the range: `git tag --sort=-creatordate`

### 2. Categorize Commits
Group commits by type (infer from commit message and files changed):
- **Features**: New functionality added
- **Fixes**: Bug fixes, corrections
- **Refactors**: Code improvements without behavior change
- **Docs**: Documentation changes
- **Config**: Build, CI, deployment config
- **Chores**: Dependencies, tooling, cleanup

### 3. Format Based on Purpose

**Summary (default):**
```
## Commit Summary — [date range]
[total] commits across [branches] branches

### Features
- [commit message] ([hash])

### Fixes
- [commit message] ([hash])

### Other
- [commit message] ([hash])
```

**Standup:**
```
Yesterday/This week I:
- Shipped [feature]
- Fixed [bug]
- Started [work in progress]
```

**Client Update:**
```
## Project Update — [date range]

### Completed
- [User-facing description of feature/fix]

### In Progress
- [What's actively being worked on]

### Next Up
- [What's planned next]
```

**Changelog:**
```
## [version or date]

### Added
- [feature descriptions]

### Fixed
- [bug fix descriptions]

### Changed
- [modification descriptions]
```

### 4. Save (if requested)
Save to `./memory/projects/[project-name]/changelog-YYYY-MM-DD.md` if this is for a tracked project.

---

## Notes
- For client updates, translate commit messages into non-technical language
- Group related commits together (e.g., 5 commits on the same feature = 1 bullet point)
- Flag any large changes (50+ files) or risky changes (migrations, config) for special attention
- If the repo has no recent commits, say so — don't fabricate activity
