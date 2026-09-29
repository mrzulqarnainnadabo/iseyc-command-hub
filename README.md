# ISEYC Digital Operations Centre

Notion + Vercel deploy path (no Supabase).

## Architecture

```
Staff key → /api/ops/records → Notion databases
Public    → Civic Mandate / Civic Brain (separate apps)
```

## Env

| Variable | Purpose |
|----------|---------|
| `ISEYC_STAFF_KEY` | Unlock ops Notion data |
| `NOTION_TOKEN` | Integration secret (reuse Mandate) |
| `NOTION_MEETINGS_DATABASE_ID` | Meetings table |
| `NOTION_CHAMBER_DATABASE_ID` | Chamber table |
| `NOTION_MEDIA_DATABASE_ID` | Media table |
| `NOTION_STAFF_DATABASE_ID` | Staff roster |

Suggested Notion properties: **Name** (title), **Status**, **Notes** or **Summary**, **Date**.

Share each database with the integration.

## Routes

- `/` gate · `/ops` Command Brief · `/ops/meetings|chamber|media|staff`
