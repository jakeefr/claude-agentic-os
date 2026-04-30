---
name: github
trigger: "commit [changes], open a PR, write a PR description, update the README, summarize what changed, push [branch], any GitHub/git workflow request, references to [YOUR_REPO_1] / [YOUR_REPO_2] / [YOUR_REPO_3]"
inputs:
  - "Task type: commit | pr | readme | status | branch | release-notes"
  - "Optional: repo name ([YOUR_REPO_1] | [YOUR_REPO_2] | [YOUR_REPO_3] | other)"
  - "Optional: scope of changes, PR title, audience for README"
outputs:
  - "Commit with a clean, accurate message"
  - "PR description ready to open"
  - "README draft or update"
  - "Git status summary"
dependencies:
  - "GitHub CLI (gh) — must be authenticated: gh auth status"
  - "Git (standard)"
  - "Bash tool for running git/gh commands"
---

## Repos Context
- **[YOUR_REPO_1]** — Claude Code health analysis tool (PRISM framework)
- **[YOUR_REPO_2]** — MCP server security/monitoring tool
- **[YOUR_REPO_3]** — Claude Code session briefing / context tool
All are open source tools [YOUR_NAME] builds and maintains.

---

## Execution Steps

### Commit
Triggered by: "commit", "commit these changes", "save this"

1. Run `git status` to see what's staged/unstaged
2. Run `git diff` (or `git diff --staged`) to read the actual changes
3. Write a commit message that:
   - Describes WHAT changed and WHY, not the mechanical steps
   - Uses imperative tense: "add", "fix", "update", "remove" — not "added", "fixed"
   - Stays under 72 chars for the subject line
   - Adds a body if the change needs context (breaking change, non-obvious decision)
4. Never add "Co-Authored-By: Claude" or AI attribution — per [YOUR_NAME]'s CLAUDE.md
5. Stage specific files, not `git add .` unless [YOUR_NAME] explicitly says so
6. Confirm the message before committing if there's any ambiguity

**Commit message format:**
```
[verb] [what] [why/context if needed]

[optional body — use for complex changes]
```

**Examples:**
```
add streaming support to analysis pipeline
fix race condition in concurrent request handler
update README with installation instructions for Windows
remove deprecated --verbose flag from CLI
```

### PR Description
Triggered by: "open a PR", "write a PR description", "create a pull request"

1. Run `git log main..HEAD --oneline` to see what commits are in this branch
2. Run `git diff main...HEAD` to see the full diff
3. Draft a PR description:

```markdown
## What
[1-3 bullets describing what changed — specific, not vague]

## Why
[What problem this solves or what it enables]

## How
[Key implementation details worth calling out — only if non-obvious]

## Testing
[How to verify this works — commands to run, scenarios to check]

## Notes
[Anything reviewers should know — gotchas, follow-up work, decisions made]
```

4. Use `gh pr create` with title and body. Confirm with [YOUR_NAME] before opening if it's a significant change.

**PR title format:** Same as commit — imperative, specific, under 72 chars.

### README Generation / Update
Triggered by: "write a README", "update the README", "document this tool"

For open source tools ([YOUR_REPO_1], [YOUR_REPO_2], [YOUR_REPO_3]), README structure:

```markdown
# Tool Name
[One sentence: what it is]

[One paragraph: what problem it solves and for whom]

## Install
[Minimal steps to get running]

## Usage
[Most common command or pattern, with example output]

## Configuration
[Key options or config — only what's needed]

## How It Works
[Brief architecture note — only if it helps users understand what's happening]

## Contributing
[Minimal contribution guide if open to PRs]

## License
[License type]
```

Rules for README writing:
- Lead with what it does for the user, not what [YOUR_NAME] built
- Show the most common usage within the first screen
- Avoid wall-of-text explanations — code examples over paragraphs
- No marketing language — this is for developers

### Status Check
Triggered by: "what's the git status", "what branch am I on", "what repos need attention"

Run:
```bash
git status
git branch --show-current
git log --oneline -10
```

Report: current branch, uncommitted changes, and last 5-10 commits summary.

### Release Notes
Triggered by: "write release notes", "what changed in this release"

1. Get the tag range: `git log [prev-tag]..[current-tag] --oneline`
2. Group changes by type:
   - **Features** (new capabilities)
   - **Fixes** (bug fixes)
   - **Breaking changes** (if any — call these out clearly)
   - **Internal** (refactors, docs, CI — group these if minor)
3. Write in plain language — someone upgrading should know if they need to do anything

---

## gh CLI Reference (common commands)
```bash
gh pr create --title "title" --body "body"
gh pr list
gh pr view [number]
gh pr merge [number] --squash
gh issue create --title "title" --body "body"
gh issue list
gh release create v1.0.0 --notes "release notes"
gh repo view --web   # open in browser
```

---

## Notes
- Always read the diff before writing a commit or PR message — don't guess what changed
- For [YOUR_REPO_1]/[YOUR_REPO_2]/[YOUR_REPO_3]: these are public tools, so README quality matters. Write for a developer who just found it via search.
- Never force push to main. If [YOUR_NAME] asks, confirm it's intentional and note the risk.
- If gh isn't authenticated, run: `gh auth login`
