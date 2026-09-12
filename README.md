# Physician Job Search

A job search app built specifically for physicians. Search and filter roles by:

- **Keyword** — specialty, job title, or employer
- **Location** — city, state, or remote
- **Income** — minimum annual compensation
- **Work format** — In-Person, Telehealth, or Shift Work
- **Practice setting** — Private Practice, Hospital / Health System, or Academia
- **What you want to do** — tags like Outpatient, Procedures, No Call, Teaching, Research, Loan Repayment, Partnership Track, and more

Click any job card to see full details (compensation, schedule, description, and focus areas).

## Searching beyond this app

Two ways this app reaches listings outside its own sample dataset:

1. **"Search other job sites" panel** — one click opens your current keyword/location
   search on LinkedIn Jobs, Indeed, ZipRecruiter, Glassdoor, PracticeLink, PracticeMatch,
   NEJM CareerCenter, ACP Career Connection, AAFP CareerLink, Health eCareers, Doximity,
   and LocumTenens.com in a new tab. These are deep-links into each site's own search —
   there's no scraping or login involved, so it works immediately with no setup and
   respects each site's terms of use. (Note: LinkedIn and a few of the medical-society
   boards don't publish stable query-parameter APIs, so those links land you on the
   site's search page pre-filled where supported, or its general job listing page
   otherwise — you may need to re-enter a filter or two once there.)

2. **"Also fetch live results from the web" toggle** — pulls real, live job listings
   inline via the [Adzuna](https://developer.adzuna.com/) job-search API (filtered to
   healthcare/nursing listings), merged into the results with a green "Live" badge and
   a link out to the original posting. This requires a free Adzuna API key and running
   the small local proxy server included here (see below) — a browser can't safely call
   Adzuna directly since that would expose the API key.

   Real-time scraping of LinkedIn and most recruiter/medical-society sites isn't
   something this app does or can do: LinkedIn's terms explicitly prohibit scraping,
   and most of the sites listed above don't offer a public search API. Adzuna is used
   here because it's a legitimate aggregator API that's free and instant to sign up for.

## Development

Install dependencies:

```bash
npm install
```

Run the frontend only (sample dataset + external site deep-links, no live results):

```bash
npm run dev
```

To enable live results, copy `.env.example` to `.env`, fill in your free
`ADZUNA_APP_ID` / `ADZUNA_APP_KEY` from https://developer.adzuna.com/, then run the
proxy server alongside the frontend in a second terminal:

```bash
npm run server   # starts the API proxy on http://localhost:8787
npm run dev      # starts the Vite dev server, proxies /api to the server above
```

Without an Adzuna key configured, the live-results toggle stays functional but shows a
message explaining it isn't set up yet — the rest of the app works normally either way.

## Build

```bash
npm run build
```

## Tech stack

- React + TypeScript, Vite, Tailwind CSS (frontend)
- A dependency-free Node `http` server (`server/index.js`) that proxies to the Adzuna API

Job data currently lives in `src/data/jobs.ts` as a static sample dataset — swap it for
a live API/database when one is available.
