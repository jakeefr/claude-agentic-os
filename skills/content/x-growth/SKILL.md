---
name: x-growth
trigger: "write a tweet, draft a thread, X content for [topic], post idea, what should I post about, help me grow on X, engagement strategy questions for @[YOUR_X_HANDLE]"
inputs:
  - "Topic, idea, or goal (what to post about or what growth problem to solve)"
  - "Optional: format preference (single tweet, thread, reply, quote tweet)"
  - "Optional: context (what's happening in [YOUR_NAME]'s work or life that's relevant)"
outputs:
  - "Ready-to-post tweet/thread draft"
  - "Optional: saved draft to ./memory/projects/x-content/"
  - "Optional: content calendar additions"
dependencies:
  - "Read: ./context/brand.md (always)"
  - "Read: ./memory/projects/x-content/ (for recent posts — avoid repetition)"
  - "Write: ./memory/projects/x-content/"
---

## Account Context
- **Handle:** @[YOUR_X_HANDLE]
- **Audience:** Developers, AI builders, indie hackers, technical founders
- **Positioning:** Builder sharing real work — not a content creator, not an influencer. A developer who posts.
- **Growth approach:** Consistency + value + authenticity over posting frequency hacks

---

## Execution Steps

### 1. Load Brand Voice
Read `./context/brand.md`. For X specifically: casual, direct, punchy, no buzzwords, first-person.

### 2. Format Selection

**Single tweet** — for observations, quick takes, short lessons, reactions
- Max 280 characters (aim for 240 to leave room for replies/QTs)
- One idea, fully stated
- No filler opener ("Hot take:", "Unpopular opinion:", etc.)

**Thread** — for tutorials, multi-part insights, build logs, explanations
- Tweet 1: hook — earns the click to expand
- Tweet 2: setup — why this matters
- Tweets 3-N: one point per tweet, each standalone-readable
- Final tweet: summary or CTA
- Use numbering only if sequence matters (1/, 2/, etc.)
- Aim for 5-8 tweets; 10+ only if the content warrants it

**Reply / Quote tweet** — for engagement
- Add perspective, not just agreement
- Disagree respectfully when you have a real take
- Never reply-fish (vague "thoughts?" replies to big accounts)

### 3. Hook Patterns That Work for @[YOUR_X_HANDLE]
Pick the pattern that fits the content — don't force it:

- **Counterintuitive result:** "I expected X. Got Y. Here's what happened."
- **Specific number/timeframe:** "After 3 months of [thing], here's what I'd do differently."
- **Problem/solution lead:** "The problem with [common thing] is [specific insight]."
- **Show the work:** "Built [thing] in [timeframe]. Here's the full breakdown."
- **Honest take:** "Most [topic] advice is wrong. Here's what actually works."
- **Strong opinion:** "[Common belief] is [short rebuttal]. [Evidence]."

### 4. Content Pillars (rotate through)
1. **AI systems & tooling** — what I'm building, what's working, what's not
2. **Client work insights** — real lessons from [YOUR_BUSINESS] projects (keep clients anonymous unless given permission)
3. **Developer productivity** — tools, shortcuts, workflow improvements
4. **Building [YOUR_BUSINESS]** — transparent entrepreneurship, the business side

### 5. Draft the Content
Write in [YOUR_NAME]'s voice — first person, developer talking to developers. Read it aloud mentally. If it sounds like marketing copy, rewrite it.

Checklist before finalizing:
- [ ] Hook is specific and earns the read
- [ ] No buzzwords or filler phrases
- [ ] Each tweet/sentence earns its place
- [ ] Ends with something — insight, CTA, question, or memorable line
- [ ] Sounds like [YOUR_NAME], not a content template

### 6. Save Draft (optional, for threads or anything worth keeping)
Save to `./memory/projects/x-content/YYYY-MM-DD-slug.md`

```markdown
# X Draft: [Topic]
Date: YYYY-MM-DD
Format: [single tweet | thread | reply]
Status: draft | posted | scheduled

## Content
[full tweet or thread text]

## Notes
[angle decisions, what performed well if posted, what to do differently]
```

### 7. Performance Notes
If [YOUR_NAME] shares performance data on a post, append to the relevant draft file:
```markdown
## Performance (posted YYYY-MM-DD)
- Impressions:
- Engagements:
- What worked:
- What to repeat:
```

---

## Engagement Strategy Notes
- Reply to replies within the first hour of posting when possible
- Engage with accounts in the same space (AI builders, devs) — add real value in replies
- Don't chase viral — optimize for attracting the right 100 followers, not 10k random ones
- Build in public: share the thing you're building, the decision you made, the result you got

---

## Notes
- Never use "🚀", "💡", or thread-bro patterns ("Here's what I learned:", "Let me explain:")
- If [YOUR_NAME] shares a rough idea or raw thought, improve the angle and packaging — don't just clean up the grammar
- If there's no clear post idea, ask what [YOUR_NAME] is currently working on and pull a thread from that
