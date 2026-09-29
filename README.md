# ISEYC Command Hub

Minimal institutional hub for ISEYC staff.

**Stack:** Next.js · Vercel · optional Notion  
**Not used:** Supabase Auth, Postgres, Drizzle, Express

## What it does

- Public home: links to **Civic Mandate**, Kaduna Brief, operators, **Civic Brain**
- `/staff`: unlock with server-only `ISEYC_STAFF_KEY`
- Optional Notion **staff roster** (separate from Civic Mandate data)

## Env (Vercel Production)

| Variable | Required | Notes |
|----------|----------|--------|
| `ISEYC_STAFF_KEY` | Yes for `/staff` | Long secret only staff know |
| `NOTION_TOKEN` | No | **Reuse** the same integration token as Civic Mandate |
| `NOTION_STAFF_DATABASE_ID` | No | **New** Staff Roster DB only — **not** the Mandate DB id |

### Reusing Civic Mandate Notion setup

- **OK:** copy `NOTION_TOKEN` from project `2027-street-mandate`
- **Not OK:** copy `NOTION_DATABASE_ID` into `NOTION_STAFF_DATABASE_ID`  
  Mandate DB = citizen demands. Staff DB = people (Name, Role, Unit, Status).

You can deploy with **only** `ISEYC_STAFF_KEY`. Notion roster can wait.

## Notion staff DB (optional)

1. New full-page database: **ISEYC Staff Roster**
2. Properties: **Name** (title), **Role**, **Unit**, **Status**
3. ⋯ → Connections → connect your ISEYC integration
4. Copy database id from the URL → `NOTION_STAFF_DATABASE_ID`

## Deploy

1. Import this repo on Vercel  
2. Set `ISEYC_STAFF_KEY`  
3. Optionally set `NOTION_TOKEN` (and later staff DB id)  
4. Deploy → open URL → Staff workspace  

## Related

- Civic Mandate: https://2027-street-mandate.vercel.app  
- Supabase DOC path: paused in favour of this hub  

Non-partisan. No rankings, polls, or endorsements.
