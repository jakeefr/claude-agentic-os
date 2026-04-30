---
name: readme-generator
trigger: "generate readme, write a README, create project readme, README for [repo], document this project"
inputs:
  - "Repository path or name"
  - "Optional: target audience (developers, users, contributors, clients)"
  - "Optional: sections to include or exclude"
outputs:
  - "README.md file written to the repo root"
  - "If client project: saved copy to ./memory/projects/CLIENT/readme-draft.md"
dependencies:
  - "Read access to the target repository"
  - "Read: package.json, pyproject.toml, or equivalent for dependencies"
  - "Read: source code for API/feature discovery"
---

## Purpose

Generate a comprehensive, well-structured README for any project in [YOUR_NAME]'s GitHub repos or client projects. Reads the actual codebase to produce accurate documentation — not generic templates.

---

## Execution Steps

### 1. Analyze the Repository
Read the following to understand the project:
- `package.json` or `pyproject.toml` (name, description, dependencies, scripts)
- Entry point files (`app/`, `src/index.ts`, `main.py`)
- Config files (`.env.example`, `next.config.ts`, `tsconfig.json`, `docker-compose.yml`)
- Existing README (if updating)
- Directory structure (top 2 levels)

### 2. Determine Project Type
Based on analysis, classify:
- **Next.js app** → emphasize setup, env vars, deployment
- **Python tool/API** → emphasize installation, CLI usage, API docs
- **Library/package** → emphasize API reference, examples, installation
- **Full-stack app** → emphasize architecture, setup, both frontend and backend
- **CLI tool** → emphasize installation, commands, examples

### 3. Generate README Sections

```markdown
# Project Name

One-line description.

## Quick Start
[Fastest path from clone to running — 3-5 commands max]

## Prerequisites
[Runtime versions, required services, API keys]

## Installation
[Step-by-step setup including env vars]

## Usage
[Primary use cases with code examples]

## Architecture
[Brief overview of how the project is structured — only for non-trivial projects]

## Development
[How to run tests, lint, build]

## Deployment
[How to deploy — Vercel, Docker, etc.]

## Environment Variables
[Table of required env vars with descriptions — never include actual values]

## Tech Stack
[Key technologies with versions]

## License
[License type]
```

### 4. Adapt for Audience
- **Open source**: Include contributing guidelines, issue templates, badges
- **Client delivery**: Include architecture decisions, handoff notes
- **Internal/personal**: Keep it minimal, focus on setup and gotchas

### 5. Write the File
Write `README.md` to the repository root. If updating an existing README, preserve any custom sections the user added.

---

## Notes
- Never include secrets, API keys, or credentials — use `YOUR_API_KEY` placeholders
- For Next.js projects on [YOUR_NAME]'s stack: assume Vercel deployment, Tailwind CSS, TypeScript
- Test the Quick Start steps mentally — if they won't work on a fresh clone, fix them
- Use real examples from the codebase, not hypothetical ones
- Keep it scannable — developers read READMEs by skimming headers
