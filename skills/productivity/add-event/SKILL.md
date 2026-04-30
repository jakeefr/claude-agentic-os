---
name: add-event
trigger: "add to calendar, schedule, remind me, block time for, set up a meeting, tomorrow at, this Friday, any natural language time/event request"
inputs:
  - "Natural language event description (e.g., tomorrow at 3pm, call with [CLIENT_1] client)"
  - "Optional: duration (default 30 minutes)"
  - "Optional: description or notes"
  - "Optional: attendees (email addresses)"
outputs:
  - "Google Calendar event created via MCP"
  - "Confirmation with event title, date, time, and duration"
dependencies:
  - "Google Calendar MCP (mcp__claude_ai_Google_Calendar tools)"
  - "Timezone: America/Chicago (CST/CDT)"
---

## Purpose

Create Google Calendar events from natural language input. No forms, no formatting required — just say what you need and when, and it gets scheduled. "Tomorrow at 3pm, call with [CLIENT_1] client" should just work.

---

## Execution Steps

### 1. Parse the Input
Extract from the natural language request:

| Field | How to Parse | Default |
|-------|-------------|---------|
| **Title** | The main noun phrase / event description | Required — ask if missing |
| **Date** | "tomorrow", "this Friday", "June 5", "next Monday", relative or absolute | Required — ask if missing |
| **Time** | "at 3pm", "morning" (→ 9am), "afternoon" (→ 1pm), "evening" (→ 6pm) | Ask if missing |
| **Duration** | "for 1 hour", "30 min", "all day" | 30 minutes |
| **Description** | Any extra context after the core event info | Empty |
| **Location** | "at [place]", "on Zoom", "Google Meet" | Empty |

**Natural language examples:**
- "tomorrow at 3pm call with [CLIENT_1] client" → Title: "Call with [CLIENT_1] client", Date: tomorrow, Time: 3:00 PM CST, Duration: 30min
- "block 2 hours Friday morning for deep work" → Title: "Deep Work", Date: this Friday, Time: 9:00 AM CST, Duration: 2h
- "lunch with Marcus next Tuesday at noon" → Title: "Lunch with Marcus", Date: next Tuesday, Time: 12:00 PM CST, Duration: 1h
- "remind me to send invoice Thursday" → Title: "Send invoice", Date: this Thursday, Time: 9:00 AM CST, Duration: 15min

### 2. Resolve Dates and Times
All times are in **America/Chicago** (Central Time).

- "tomorrow" → current date + 1 day
- "this [day]" → next occurrence of that day in the current week
- "next [day]" → that day in the following week
- "morning" → 9:00 AM
- "afternoon" → 1:00 PM
- "evening" → 6:00 PM
- "end of day" → 5:00 PM
- "lunch" → 12:00 PM, default duration 1 hour

### 3. Confirm Before Creating
Before calling the API, confirm the parsed details:

```
Creating event:
  📅 [Title]
  🕐 [Day, Month Date] at [Time] CST
  ⏱ [Duration]
  📝 [Description, if any]

Sound right?
```

If [YOUR_NAME] says yes or doesn't object, proceed. If he corrects something, update and confirm again.

### 4. Create the Event
Use the Google Calendar MCP to create the event:

```
Tool: mcp__claude_ai_Google_Calendar__create_event (or equivalent)
Parameters:
  - summary: [title]
  - start: [ISO 8601 datetime with timezone]
  - end: [ISO 8601 datetime with timezone]
  - description: [description if provided]
  - location: [location if provided]
```

If the MCP tool requires a specific format, adapt accordingly. Use the timezone `America/Chicago` for all events.

### 5. Confirm Creation
After successful creation:

```
✅ Scheduled: [Title]
   [Day, Month Date] · [Start Time] – [End Time] CST
```

Keep confirmation brief — one or two lines max.

### 6. Handle Conflicts
If the time slot has an existing event:
- Mention the conflict: "You already have [existing event] at that time."
- Suggest alternatives: 30 minutes before, 30 minutes after, or next available slot
- Let [YOUR_NAME] decide — don't auto-resolve

---

## Duration Defaults by Event Type

| Keyword in title | Default duration |
|-----------------|-----------------|
| "call", "meeting", "sync", "standup" | 30 minutes |
| "lunch", "coffee", "dinner" | 1 hour |
| "deep work", "focus", "block" | 2 hours |
| "reminder", "send", "check" | 15 minutes |
| "workshop", "presentation" | 1 hour |
| Everything else | 30 minutes |

---

## Notes
- Always use Central Time (America/Chicago) — [YOUR_NAME] is in [YOUR_CITY]
- If the time is ambiguous (e.g., "at 3" with no AM/PM), assume PM for business hours (9am-6pm context)
- "Remind me to X" creates a short event (15min) as a calendar reminder, not a task
- Don't ask for fields that weren't mentioned — fill in sensible defaults and confirm
- If Google Calendar MCP isn't connected, say so and suggest [YOUR_NAME] add it via claude.ai integrations
