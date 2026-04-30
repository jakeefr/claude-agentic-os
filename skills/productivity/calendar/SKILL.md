---
name: calendar
trigger: "what's on my calendar", "schedule a meeting", "check my schedule", "am I free [day/time]", "add an event", "find a time for [meeting]", any scheduling-related request
inputs:
  - Task type: view | create | check-availability | suggest-time | reschedule
  - Optional: date/time range, participants, event details
outputs:
  - Agenda view or availability summary
  - Created/updated calendar events
  - Suggested meeting times based on preferences
dependencies:
  - Google Calendar MCP (mcp__claude_ai_Google_Calendar tools)
  - Read: ./context/user-preferences.md (for timezone + scheduling preferences)
---

## [YOUR_NAME]'s Scheduling Preferences
- **Timezone:** CST (UTC-6 standard / UTC-5 DST)
- **Preferred focus time:** Mornings — protect this for deep work when possible
- **Meeting preference:** Afternoons (12pm-5pm CST) when possible
- **Buffer preference:** Avoid back-to-back meetings — 15-min buffer preferred

---

## Execution Steps

### View Agenda
Triggered by: "what's on my calendar", "show my schedule", "what do I have [day]"

1. Authenticate with Google Calendar MCP if needed
2. Pull events for the requested timeframe (default: today + tomorrow)
3. Present as a clean agenda:

```
TODAY — Wednesday, April 23
  9:00am  [Event Title] (1hr) — [location or link if available]
  2:00pm  [Event Title] (30min)

TOMORROW — Thursday, April 24
  (no events)
```

4. Flag any scheduling conflicts or tight transitions.

### Check Availability
Triggered by: "am I free [day/time]?", "do I have anything [day]?"

1. Pull events for the specified window
2. Return a direct yes/no with context: "You're free 2-4pm Thursday. You have a 30-min block at 4pm."
3. If checking for a meeting: suggest the best open window based on [YOUR_NAME]'s preferences (afternoons, buffer time)

### Create Event
Triggered by: "add [event] on [day] at [time]", "schedule [meeting]"

Required info — ask for anything missing:
- Title
- Date and time (confirm timezone = CST)
- Duration
- Location or video link (optional)
- Attendees (optional)

Confirm before creating: "Creating: [Title] on [Date] at [Time] CST — confirm?"

### Suggest Meeting Time
Triggered by: "find a time to meet with [person]", "what's a good time for [meeting]?"

1. Check [YOUR_NAME]'s calendar for the next 5 business days
2. Identify open afternoon slots (12pm-5pm CST preferred)
3. Return 2-3 options:
```
Option 1: Thursday Apr 25, 2:00-2:30pm CST
Option 2: Friday Apr 26, 3:00-3:30pm CST
Option 3: Monday Apr 28, 1:00-1:30pm CST
```
4. If [YOUR_NAME] needs to send a scheduling link, remind him to use Calendly or a similar tool.

### Reschedule
Get the event title/date, confirm the new time, update it. Always confirm before making changes.

---

## Notes
- Always convert times to CST when displaying — never show UTC without converting
- If Calendar MCP isn't authenticated, guide [YOUR_NAME]: check .mcp.json and run the OAuth flow
- For recurring events (weekly standups, etc.), confirm before touching the series vs. single instance
- Don't schedule meetings during morning hours (before 12pm CST) without [YOUR_NAME] explicitly asking
