---
name: project-brief
trigger: "create a project brief", "project brief for [project]", "brief this project", "scope document", "project kickoff doc"
inputs:
  - Project name and client
  - Goals and requirements (even rough/incomplete)
  - Optional: deadline, budget, stakeholders
outputs:
  - Structured project brief document
  - Saved to ./memory/projects/PROJECT/brief.md
dependencies:
  - Read: ./context/active-projects.md
  - Read: ./memory/people/ (stakeholder notes)
  - Write: ./memory/projects/
---

## Purpose

Create an internal project brief that captures goals, scope, constraints, and decisions for any project — client or personal. This is the reference document the Agentic OS uses to stay aligned throughout the project lifecycle.

---

## Execution Steps

### 1. Gather Information
From conversation context and vault, extract:
- What is being built and for whom
- Why it matters (business goal, user need)
- Hard constraints (deadline, budget, platform, tech requirements)
- Key stakeholders and their priorities
- Any decisions already made

### 2. Write the Brief

```markdown
# Project Brief: [Project Name]
Client: [name or "internal"]
Created: YYYY-MM-DD
Status: active

## One-liner
[Single sentence: what this is and who it's for]

## Goals
1. [Primary goal — the thing that defines success]
2. [Secondary goal]
3. [Tertiary goal]

## Background
[2-3 paragraphs of context. Why does this project exist? What's the current state?]

## Scope

### In Scope
- [Specific deliverable or feature]
- [Specific deliverable or feature]

### Out of Scope
- [What we're explicitly NOT doing]

### Open Questions
- [ ] [Decision that needs to be made]
- [ ] [Uncertainty that needs resolution]

## Technical Approach
- **Stack:** [technologies]
- **Architecture:** [high-level approach]
- **Key dependencies:** [APIs, services, data sources]
- **Deployment:** [where and how]

## Timeline
| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Kickoff | YYYY-MM-DD | done |
| Phase 1 complete | YYYY-MM-DD | in-progress |
| Launch | YYYY-MM-DD | pending |

## Stakeholders
| Person | Role | Priority |
|--------|------|----------|
| [Name] | [Client/Owner/User] | [what they care most about] |

## Success Criteria
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

## Related
[[active-projects]] [[client-name]]
```

### 3. Register the Project
- If this is a new project, add it to `./context/active-projects.md`
- Create the project folder: `./memory/projects/[project-name]/`
- Save the brief as `./memory/projects/[project-name]/brief.md`

### 4. Identify Immediate Next Actions
List the first 3 concrete actions to move the project forward. Don't plan the whole thing — just the next sprint.

---

## Notes
- The brief should be the single source of truth for "what are we building and why"
- Update the brief when scope changes — don't let it go stale
- Keep it concise: if the brief is longer than 2 pages, it's a spec, not a brief
- Open Questions section is critical — unresolved questions are the #1 cause of project delays
- For personal projects, the brief can be lighter — skip stakeholders, simplify timeline
