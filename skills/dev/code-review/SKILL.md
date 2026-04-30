---
name: code-review
trigger: "review this code", "code review", "review my PR", "check this implementation", "review [file/feature]"
inputs:
  - Code to review (file path, PR URL, or pasted code)
  - Optional: focus area (security, performance, architecture, style)
  - Optional: context (what the code is supposed to do)
outputs:
  - Structured code review with actionable feedback
  - Optional: saved to ./memory/projects/PROJECT/review-YYYY-MM-DD.md
dependencies:
  - Read access to source files
  - Git CLI for PR/diff context
---

## Purpose

Review code for correctness, security, performance, and maintainability. Calibrated for [YOUR_NAME]'s stack (Next.js, TypeScript, Python, Tailwind) and [YOUR_BUSINESS] quality bar.

---

## Execution Steps

### 1. Gather Context
- Read the code or diff to review
- If a PR: `git diff main...HEAD` to see all changes
- If a file: read the file plus any files it imports from
- Understand WHAT the code does before judging HOW it does it

### 2. Review Layers
Run through each layer in order of severity:

**Correctness**
- Does the code do what it's supposed to do?
- Edge cases: nulls, empty arrays, missing fields, race conditions
- Type safety: any `any` types, unsafe casts, missing null checks?
- Logic errors: off-by-one, wrong comparison, missing early returns

**Security**
- Input validation at system boundaries (API routes, form handlers)
- SQL injection, XSS, command injection risks
- Secrets in code or logs
- Auth/authz: are protected routes actually protected?
- OWASP top 10 check for web-facing code

**Performance**
- N+1 queries or unnecessary database calls
- Missing pagination on list endpoints
- Expensive operations in render paths or hot loops
- Bundle size impact (large imports, unused dependencies)
- Missing caching where appropriate

**Architecture**
- Does this belong in this file/module?
- Separation of concerns: UI logic in components, business logic in services
- Over-engineering: is this simpler than it needs to be, or more complex?
- Consistency with existing patterns in the codebase

**Style**
- Naming clarity: would another developer understand this?
- Dead code, commented-out code, TODO comments without context
- Unnecessary abstractions or premature optimization

### 3. Format Review

For each finding:
```
### [SEVERITY] [Category]: [Brief title]
**File:** [path:line]
**Issue:** [what's wrong]
**Fix:** [what to do instead]
```

Severity levels:
- **CRITICAL**: Must fix before merge. Security, data loss, crashes.
- **IMPORTANT**: Should fix. Bugs, performance, correctness issues.
- **SUGGESTION**: Nice to have. Style, minor improvements.
- **QUESTION**: Not sure — need clarification on intent.

### 4. Summary
End with:
- Overall assessment (ship it / needs changes / needs rethink)
- Top 3 action items in priority order
- Any patterns that should become conventions

### 5. Save (if requested)
Save to `./memory/projects/[project-name]/review-YYYY-MM-DD.md` for tracking.

---

## Notes
- Lead with what's good — note solid patterns before listing issues
- Don't nitpick style in a PR that solves a critical bug — match severity to context
- For [YOUR_NAME]'s own code: be direct, skip the compliments, focus on action items
- For client code: be thorough but diplomatic — client-facing reviews need different tone
- If reviewing AI-generated code: pay extra attention to hallucinated imports, wrong API usage, and security
