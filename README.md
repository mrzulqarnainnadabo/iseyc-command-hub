# ISEYC Command Hub

Minimal institutional hub for ISEYC staff.

**Stack:** Next.js · Vercel · optional Notion  
**Not used:** Supabase Auth, Postgres, Drizzle, Express

## What it does

- Public home: links to **Civic Mandate**, Kaduna Brief, operators, **Civic Brain**
- `/staff`: unlock with server-only `ISEYC_STAFF_KEY`
- Optional Notion staff roster (`NOTION_TOKEN` + `NOTION_STAFF_DATABASE_ID`)

## Env (Vercel Production)

| Variable | Required | Purpose |
|----------|----------|---------|
| `ISEYC_STAFF_KEY` | Yes for /staff | Shared staff key (choose a long random string) |
| `NOTION_TOKEN` | No | Notion integration secret |
| `NOTION_STAFF_DATABASE_ID` | No | Staff roster database |

## Notion staff DB (optional)

Create a database with properties:

- **Name** (Title)
- **Role** (Select or Text)
- **Unit** (Select or Text)
- **Status** (Status or Select)

Share the database with your Notion integration.

## Deploy

1. Import this repo on Vercel
2. Set `ISEYC_STAFF_KEY`
3. Deploy
4. Open the site → Staff workspace

## Related products

- Civic Mandate: https://2027-street-mandate.vercel.app
- Old DOC (Supabase, paused path): iseyc-digital-operations-centre

Non-partisan. No rankings, polls, or endorsements.
