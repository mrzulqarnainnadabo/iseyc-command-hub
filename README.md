# ISEYC Digital Operations Centre (deploy path)

DOC product shape on a phone-friendly stack:

- Next.js + Vercel
- Staff key (`ISEYC_STAFF_KEY`)
- Optional Notion
- **No Supabase**

## Routes

| Path | Role |
|------|------|
| `/` | Institutional gate |
| `/ops` | Presidential Command Brief + sidebar |
| `/ops/chamber` | Digital Chamber |
| `/ops/meetings` | Meeting & Decisions |
| `/ops/media` | Media & Content Command |
| `/ops/staff` | Officer access |

Civic Mandate / Brain open as external live products.

## Env

`ISEYC_STAFF_KEY` required for staff unlock.  
`NOTION_TOKEN` optional (reuse Mandate).  
`NOTION_STAFF_DATABASE_ID` optional separate roster — not Mandate DB.
