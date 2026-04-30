<div align="center">

# AGENTIC OS

**Your AI-powered personal operating system, built on Claude Code.**

![Agentic OS Demo](public/agentic-os-demo.gif)

</div>

## What is this?

Agentic OS turns Claude Code into a personal operating system. It's a 4-layer framework — memory, skills, automations, and a dashboard — that you customize to fit how you work. Clone it, fill in your context, build your skills, and let it run.

## Features

- **Obsidian-backed memory** — persistent, linked markdown vault that Claude reads and writes
- **Skill framework** — structured `SKILL.md` format with example templates across 5 categories
- **Routine automation** — define scheduled tasks that run headlessly via cron or Task Scheduler
- **Real-time dashboard** — Next.js dashboard with token tracking, activity charts, routine status
- **Headless execution** — routines run unattended on any machine
- **VPS deployment ready** — deploy to a free-tier VM and let it run 24/7

## Quick Start

```bash
# 1. Clone
git clone https://github.com/jakeefr/claude-agentic-os.git
cd claude-agentic-os

# 2. Install dashboard dependencies
cd dashboard && npm install && cd ..

# 3. Configure
cp .env.example .env
# Edit .env with your credentials
# Edit CLAUDE.md — replace all [PLACEHOLDER] values with your info
# Edit context/user-preferences.md, context/active-projects.md, context/brand.md

# 4. Update timezone (default: America/Chicago)
# Search dashboard/ for "America/Chicago" and replace with your timezone

# 5. Open the memory vault in Obsidian
# Point Obsidian at the ./memory/ folder

# 6. Run the dashboard
cd dashboard && npm run dev
```

## Architecture

Four layers, each independent but interconnected:

```
agentic-os/
├── memory/                 # Layer 1: Obsidian vault (persistent memory)
│   ├── inbox/              # Routine outputs land here
│   ├── daily-notes/        # Daily logs
│   ├── research/           # Research notes
│   ├── people/             # Contact notes
│   ├── decisions/          # Decision logs
│   └── LEARNINGS.md        # Running improvement log
│
├── skills/                 # Layer 2: Modular skill definitions
│   ├── productivity/       # Email, calendar, maintenance
│   ├── research/           # Web research, video analysis, trending
│   ├── content/            # Social media, writing, ideation
│   ├── business/           # Proposals, outreach, client management
│   ├── dev/                # Git workflows, code review, documentation
│   └── routines/           # Scheduled automation skills
│
├── automations/            # Layer 3: Routine runner + schedules
│   ├── routines.json       # Routine definitions (id, schedule, skill path)
│   ├── run-routine.ts      # Standalone routine executor
│   └── send-email.ts       # SMTP email notifications
│
├── dashboard/              # Layer 4: Next.js real-time dashboard
│   ├── app/                # Pages + API routes
│   ├── components/         # UI components
│   └── lib/                # Data layer (vault, routines, token tracking)
│
├── context/                # User context files (read at session start)
│   ├── user-preferences.md
│   ├── active-projects.md
│   └── brand.md
│
└── CLAUDE.md               # Master instructions (loaded every session)
```

## Memory

The `memory/` folder is an Obsidian-compatible vault. Claude reads and writes it freely during sessions.

- Notes link with `[[double brackets]]` — Obsidian renders the graph
- Research goes to `memory/research/`, people to `memory/people/`, etc.
- Routine outputs land in `memory/inbox/` as dated markdown files
- `LEARNINGS.md` is a running log of what worked and what didn't

Open `memory/` as an Obsidian vault to browse, search, and visualize your knowledge graph.

## Skills

A skill is a `SKILL.md` file that tells Claude how to execute a specific task. Skills are organized into categories:

```
skills/
  productivity/   # Email, calendar, vault maintenance
  research/       # Deep research, YouTube analysis, trending repos
  content/        # Social posts, threads, carousels, ideation
  business/       # Proposals, outreach, status updates
  dev/            # GitHub workflows, code review, READMEs
  routines/       # Skills designed to run on a schedule
```

Example templates are included in each category as starting points — customize them or build your own.

**SKILL.md format:**

```yaml
---
name: my-skill
trigger: "phrases that activate this skill"
inputs:
  - "What the skill needs to run"
outputs:
  - "What the skill produces"
dependencies:
  - "Tools or files required"
---
```

Below the frontmatter, write the step-by-step instructions Claude should follow. Include the purpose, detailed steps, output format, and any guardrails.

**To create a new skill:** add a folder at `skills/{category}/{skill-name}/` with a `SKILL.md` inside. Claude discovers skills by scanning this directory tree.

## Routines

Routines are skills that run on a schedule — unattended, headlessly. Each routine points to a `SKILL.md` and is defined in `automations/routines.json`.

**Example routine entry:**

```json
{
  "id": "morning-intel-brief",
  "name": "Morning Intel Brief",
  "description": "AI/dev news scan, email summary, daily note creation",
  "schedule": "0 7 * * *",
  "scheduleHuman": "Daily 7:00 AM",
  "category": "productivity",
  "skillPath": "skills/routines/morning-intel-brief/SKILL.md",
  "estimatedMinutes": 8,
  "estimatedCost": 0.15,
  "enabled": true
}
```

Define your own routines by adding entries to `routines.json` and creating the corresponding `SKILL.md` in `skills/routines/`. The dashboard picks them up automatically.

**Run manually:**
```bash
npx tsx automations/run-routine.ts morning-intel-brief
```

**Deployment options:**
- Windows Task Scheduler / macOS launchd / Linux cron
- Google Cloud free tier (e2-micro VM)
- Oracle Cloud free tier (ARM instance)
- Any VPS with cron
- GitHub Actions

## Email Notifications

Routines can send email summaries via SMTP. Configure `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env`, then routines will email you results automatically.

```bash
# Test email manually
npx tsx automations/send-email.ts --to you@email.com --subject "Test" --body "Hello"
```

## Tech Stack

Next.js · TypeScript · Tailwind CSS · shadcn/ui · Recharts · Framer Motion · Obsidian · Node.js

## Credits 

Inspired by [Chase AI's Agentic OS architecture](https://www.youtube.com/watch?v=pfPi04pIfaw&t=874s)

## License

MIT
