# Elivique website

Next.js on Vercel · Clerk for the member area · Notion as CMS and enquiry inbox.

Built from the Elivique Website Content Pack and Claude Code build brief. Copy is verbatim from the content pack;
prices come only from `data/packages.json`, generated from the Offer Master.

## Run locally
```
npm install
cp .env.example .env.local   # fill in what you have; everything is optional
npm run dev
```

## What each service does
| Service | Used for | Env vars |
|---|---|---|
| Notion | Articles (/blog), Jobs (/jobs + member area), Enquiries inbox, Members list | `NOTION_TOKEN`, `NOTION_*_DATA_SOURCE_ID` |
| Clerk | Sign in / sign up, `/account` member area | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` |
| Vercel | Hosting | — |
| Resend (optional) | Email copy of each enquiry to hello@ | `RESEND_API_KEY` |
| Google Sheets (optional) | Append each enquiry to the CRM sheet via Apps Script webhook | `SHEETS_WEBHOOK_URL` |

The site builds and runs with none of these set: Notion lists are empty, the member area says "not open yet",
and the contact form tells visitors to use WhatsApp. Nothing breaks and no placeholder is ever shown.

## Notion setup
The databases live under the private **Elivique Website** page in Notion. Create an internal integration
(notion.so/profile/integrations), copy its token into `NOTION_TOKEN`, then on the Elivique Website page use
••• → Connections → add the integration. The data source IDs are already in `.env.example`.

## Updating prices
Export the Offer Master's "Offer Master" sheet to CSV, then `npm run sync-prices -- path/to/file.csv`.
Never type a price into a page. Products in `data/publish.json` are hidden until Daniel approves them.

## Facts left off the site until confirmed
RC number, registered address, phone, opening hours, social profiles, Calendly link and WhatsApp number are all
environment variables. Empty = not shown. Legal pages stay off (`NEXT_PUBLIC_LEGAL_PAGES_ENABLED=false`) until a
Nigerian lawyer has reviewed the drafts.
