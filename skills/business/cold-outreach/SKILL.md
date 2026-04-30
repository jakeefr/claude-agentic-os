---
name: cold-outreach
trigger: "write outreach, cold email to [person], draft an outreach message, reach out to [company], cold DM, prospecting email"
inputs:
  - "Target person/company name and context"
  - "What [YOUR_NAME] offers that's relevant to them"
  - "Optional: channel (email, X DM, LinkedIn)"
  - "Optional: specific pain point or trigger event"
outputs:
  - "3 outreach message variations"
  - "Saved to ./memory/projects/outreach/YYYY-MM-DD-target.md"
dependencies:
  - "Read: ./context/brand.md"
  - "Read: ./memory/people/ (if target has existing notes)"
  - "Web search for target research"
  - "Write: ./memory/projects/outreach/"
---

## Purpose

Draft personalized cold outreach messages for business development. Each message should feel like [YOUR_NAME] wrote it personally — no templates, no "I hope this email finds you well."

---

## Execution Steps

### 1. Research the Target
- Search for the target person/company online
- Check `./memory/people/` for existing notes
- Identify:
  - What they do and what they care about
  - A recent trigger (new funding, product launch, hiring, public complaint about a problem [YOUR_NAME] solves)
  - Their tech stack or tools (if relevant)
  - Mutual connections or shared interests

### 2. Find the Angle
Connect [YOUR_NAME]'s offering to their specific situation:
- What problem do they have that [YOUR_NAME] can solve?
- What's the cost of NOT solving it?
- Why is [YOUR_NAME] uniquely positioned to help? (AI expertise, specific tech stack, similar project experience)
- What proof/credibility supports the claim?

### 3. Write 3 Variations

**Variation 1: Direct value**
```
[Observation about their business/situation]

I build [specific thing] for [companies like theirs]. Recently helped [similar company] [achieve specific result].

Would it make sense to chat about [specific outcome] for [their company]?

— [YOUR_NAME]
```

**Variation 2: Curiosity/question**
```
[Question about something they're doing or a challenge in their space]

I've been working on [relevant thing] and noticed [insight about their situation].

Curious if [specific question about their needs]?

— [YOUR_NAME]
```

**Variation 3: Mutual interest/connection**
```
[Reference to shared interest, mutual connection, or their content]

I'm building [relevant thing] and thought of your work on [their project].

[Specific ask or offer — not a generic "let's chat"]

— [YOUR_NAME]
```

### 4. Adapt for Channel
- **Email**: 3-5 sentences max. Clear subject line. No attachments.
- **X DM**: 2-3 sentences. Casual, direct. Reference their tweets.
- **LinkedIn**: Slightly more formal. Reference their profile/posts.

### 5. Subject Lines (email only)
Generate 3 subject line options:
- Specific to their situation (not generic)
- Under 6 words when possible
- No "Quick question" or "Reaching out" — those signal cold email

### 6. Save
Save to `./memory/projects/outreach/YYYY-MM-DD-[target-slug].md` with all variations, research notes, and recommended approach.

---

## Notes
- The message must prove [YOUR_NAME] did research — generic outreach gets deleted
- One ask per message. Don't pitch services AND ask for a meeting AND offer a free audit.
- Keep it under 100 words. Brevity = respect for their time.
- "Would it make sense to..." is better than "Are you available for a call?"
- Follow up once after 3-5 days. After that, move on.
- Never claim results [YOUR_NAME] hasn't actually achieved — credibility is the brand
- For warm intros (mutual connection), lead with the connection, not the pitch
