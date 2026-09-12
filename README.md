# Physician Job Search

A job search app built specifically for physicians. Search and filter roles by:

- **Keyword** — specialty, job title, or employer
- **Location** — city, state, or remote
- **Income** — minimum annual compensation
- **Work format** — In-Person, Telehealth, or Shift Work
- **Practice setting** — Private Practice, Hospital / Health System, or Academia
- **What you want to do** — tags like Outpatient, Procedures, No Call, Teaching, Research, Loan Repayment, Partnership Track, and more

Click any job card to see full details (compensation, schedule, description, and focus areas).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS

Job data currently lives in `src/data/jobs.ts` as a static sample dataset — swap it for a live API/database when one is available.
