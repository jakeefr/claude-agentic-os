<div align="center">

# AGENTIC OS

**Your AI-powered personal operating system, built on Claude Code.**

![Agentic OS Demo](public/agentic-os-demo.gif)

</div>

## What is this?

Agentic OS is a 4-layer system that turns Claude Code into a full personal operating system — memory, skills, automated routines, and a real-time dashboard. It reads your context, executes modular skills, writes persistent memory to an Obsidian vault, and runs scheduled automations headlessly.

## Features

- **Obsidian-backed memory** — persistent, linked markdown vault that Claude reads and writes
- **Modular skill fleet** — 30+ skills across productivity, research, content, dev, and business
- **Automated routines** — 7 scheduled routines (morning brief, inbox triage, lead scanner, etc.)
- **Real-time dashboard** — Next.js dashboard with token tracking, activity charts, routine status
- **Headless execution** — routines run unattended via cron/Task Scheduler on any machine
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
│   ├── productivity/       # Gmail, calendar, vault cleanup
│   ├── research/           # Deep research, YouTube pipeline
│   ├── content/            # X threads, carousels, ideation
│   ├── business/           # Proposals, outreach, status updates
│   ├── dev/                # GitHub, code review, READMEs
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

Each skill is a `SKILL.md` file with a structured format: name, trigger, inputs, steps, outputs.

```
skills/
  productivity/   gmail, calendar, morning-brief, vault-cleanup
  research/       deep-research, yt-pipeline, github-trending, competitor-analysis
  content/        ideation, outlines, content-cascade, short-form, carousel, x-growth
  business/       proposal-generator, cold-outreach, status-update, project-brief
  dev/            github, code-review, commit-summary, readme-generator
  routines/       morning-intel-brief, inbox-triage, client-pulse-check, + 4 more
```

To add a skill: create `skills/{category}/{skill-name}/SKILL.md` following the existing format.

## Routines

Routines are skills that run on a schedule. Definitions live in `automations/routines.json`.

| Routine | Schedule | What it does |
|---------|----------|--------------|
| Morning Intel Brief | Daily 7 AM | AI/dev news, email summary, daily note |
| Inbox Triage | Daily 8 AM | Gmail categorize + draft replies |
| Client Pulse Check | Weekdays 9 AM | Review clients, flag stale ones |
| GitHub Repo Health | Mon/Wed/Fri 10 AM | PRs, issues, CI across repos |
| Lead Scanner | Mon/Thu 11 AM | Reddit/X/HN prospect search |
| Content Pipeline | Weekdays 12 PM | Mine notes for X content ideas |
| Daily Wrap | Daily 6 PM | Summarize day, email wrap-up |

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

Routines can send email summaries via SMTP. Configure `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env`, then routines like Daily Wrap will email you results automatically.

```bash
# Test email manually
npx tsx automations/send-email.ts --to you@email.com --subject "Test" --body "Hello"
```

## Tech Stack

Next.js · TypeScript · Tailwind CSS · shadcn/ui · Recharts · Framer Motion · Obsidian · Node.js

## License

MIT
