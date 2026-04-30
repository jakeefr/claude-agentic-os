# GitHub Repo Health

**Trigger:** "Run GitHub repo health" or "check repos" or "GitHub status"
**Category:** dev
**Schedule:** Mon/Wed/Fri 10:00 AM CST
**Estimated time:** 4 minutes
**Estimated cost:** ~$0.08

---

## Purpose

Keep [YOUR_NAME]'s repos healthy. Check for open PRs, issues, stale branches, and failing CI across his key repositories. Surface anything that needs attention.

---

## Inputs

- GitHub CLI (`gh`) — must be authenticated
- Target repos: `[YOUR_GITHUB]/[YOUR_REPO_1]`, `[YOUR_GITHUB]/[YOUR_REPO_2]`, `[YOUR_GITHUB]/[YOUR_REPO_3]`, `[YOUR_GITHUB]/[YOUR_WEBSITE]`

## Steps

### 1. Check Each Repo
For each target repo, run:

```bash
# Open PRs
gh pr list --repo [YOUR_GITHUB]/REPO --state open --limit 10

# Open issues
gh issue list --repo [YOUR_GITHUB]/REPO --state open --limit 10

# Recent commits (last 7 days)
gh api repos/[YOUR_GITHUB]/REPO/commits --jq '.[0:5] | .[] | .commit.message + " (" + .commit.author.date + ")"'

# Stale branches (no commits in 14+ days)
gh api repos/[YOUR_GITHUB]/REPO/branches --jq '.[] | .name'
```

### 2. CI/CD Status
For each repo with recent commits:
- Check the latest commit's CI status
- Flag any failing checks

### 3. Assess Health
Rate each repo:
- **GREEN** — no open PRs/issues blocking, CI passing, recent activity
- **YELLOW** — open PRs > 3 days, or minor issues
- **RED** — failing CI, stale PRs > 7 days, or critical open issues

### 4. Save Health Report to Inbox
- Save to `./memory/inbox/YYYY-MM-DD-github-health.md`:

```markdown
---
type: github-health
date: YYYY-MM-DD
routine: github-repo-health
---

# GitHub Repo Health — YYYY-MM-DD

## [YOUR_REPO_1]
**Status:** 🟢/🟡/🔴
- Open PRs: [count] — [list if any]
- Open Issues: [count] — [list if any]
- Last commit: [date] — [message]
- CI: passing/failing

## [YOUR_REPO_2]
...

## [YOUR_REPO_3]
...

## [YOUR_WEBSITE]
...

## Action Items
- [any PRs to review, issues to close, branches to clean up]
```

### 5. Email Health Report
- Send the GitHub health report via SMTP:
```bash
npx tsx automations/send-email.ts --to "[YOUR_EMAIL]@gmail.com" --subject "GitHub Health · YYYY-MM-DD" --body "$(cat memory/inbox/YYYY-MM-DD-github-health.md)"
```

---

## Outputs

- `./memory/inbox/YYYY-MM-DD-github-health.md` — health report
- Email sent to [YOUR_NAME] with health report
- In-session summary of repo status

---

## Notes

- If `gh` CLI is not authenticated, flag it immediately and stop
- Don't create issues or PRs — this is read-only
- If a repo doesn't exist or [YOUR_NAME] doesn't have access, skip it and note in report
