---
name: proposal-generator
trigger: "write a proposal, generate proposal for [client], draft a proposal, client proposal, project proposal"
inputs:
  - "Client name and context"
  - "Project scope or brief description"
  - "Optional: budget range, timeline, specific requirements"
  - "Optional: previous conversations or email threads for context"
outputs:
  - "Complete project proposal document"
  - "Saved to ./memory/projects/CLIENT/proposal-YYYY-MM-DD.md"
dependencies:
  - "Read: ./context/brand.md"
  - "Read: ./context/active-projects.md"
  - "Read: ./memory/people/ (client contact notes if they exist)"
  - "Write: ./memory/projects/"
---

## Purpose

Generate professional project proposals for [YOUR_BUSINESS] clients. Covers scope, timeline, pricing structure, and deliverables — tailored to each client's specific needs and [YOUR_NAME]'s actual capabilities.

---

## Execution Steps

### 1. Load Context
- Read `./context/brand.md` for [YOUR_BUSINESS] positioning
- Check `./memory/people/` for existing notes on this client
- Check `./memory/projects/` for any prior work with this client
- Read any email threads or conversation context provided

### 2. Clarify Scope
If not already clear, identify:
- **Problem**: What is the client trying to solve?
- **Solution**: What will [YOUR_NAME] build/deliver?
- **Success criteria**: How will we know it worked?
- **Constraints**: Timeline, budget, tech requirements

### 3. Draft the Proposal

```markdown
# Project Proposal: [Project Name]
**Prepared for:** [Client Name]
**Prepared by:** [YOUR_NAME], [YOUR_BUSINESS]
**Date:** YYYY-MM-DD

---

## Understanding
[2-3 sentences showing you understand their problem. Reference their specific situation.]

## Proposed Solution
[What [YOUR_NAME] will build/deliver. Be specific about features and approach.]

## Scope of Work

### Phase 1: [Name] — [Timeline]
- [ ] Deliverable 1
- [ ] Deliverable 2

### Phase 2: [Name] — [Timeline]
- [ ] Deliverable 3
- [ ] Deliverable 4

### Out of Scope
[Explicitly list what's NOT included to prevent scope creep]

## Tech Stack
[Specific technologies and why they were chosen for this project]

## Timeline
[Visual timeline or milestone list]
- Week 1-2: [Phase 1]
- Week 3-4: [Phase 2]
- Week 5: Testing and launch

## Investment
[Pricing structure — project-based, retainer, or hourly]

| Item | Cost |
|------|------|
| Phase 1 | $X,XXX |
| Phase 2 | $X,XXX |
| **Total** | **$X,XXX** |

## What's Included
- Source code ownership
- [X] rounds of revision
- [X] days of post-launch support
- Documentation and handoff

## Next Steps
1. Review this proposal
2. Schedule a kickoff call
3. Sign agreement and submit deposit
4. Begin Phase 1

---

**[YOUR_NAME]** | [YOUR_BUSINESS]
[contact info]
```

### 4. Pricing Guidelines
- Web app (Next.js): $3,000-15,000 depending on complexity
- AI integration/automation: $2,000-10,000
- Dashboard/analytics: $3,000-8,000
- Full-stack SaaS MVP: $10,000-25,000
- Retainer: $2,000-5,000/month

Adjust based on client size, complexity, and relationship. Always scope to deliverables, not hours.

### 5. Save
Save to `./memory/projects/[client-name]/proposal-YYYY-MM-DD.md`.

---

## Notes
- Never lowball — [YOUR_NAME]'s work is premium quality with AI-accelerated delivery
- The "Understanding" section is the most important — it proves [YOUR_NAME] listened
- Always include "Out of Scope" — this prevents 80% of scope creep
- For returning clients, reference previous work and results
- Proposals should feel confident and specific, not generic and templated
