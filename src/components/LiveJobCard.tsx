import type { LiveJob } from '../types/liveJob'

function formatIncomeRange(min?: number, max?: number) {
  if (!min && !max) return null
  if (min && max) return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k`
  const value = min ?? max
  return `$${((value as number) / 1000).toFixed(0)}k`
}

export function LiveJobCard({ job }: { job: LiveJob }) {
  const income = formatIncomeRange(job.incomeMin, job.incomeMax)

  return (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-emerald-900 dark:bg-emerald-950/20"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{job.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{job.employer}</p>
        </div>
        {income && (
          <span className="whitespace-nowrap text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {income}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        {job.location && <span>📍 {job.location}</span>}
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          Live · {job.source}
        </span>
      </div>

      {job.description && (
        <p className="mt-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {job.description}
        </p>
      )}

      <p className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
        View original posting ↗
      </p>
    </a>
  )
}
