import { SETTING_LABELS, WORK_FORMAT_LABELS, type PhysicianJob } from '../types/job'

function formatIncomeRange(min: number, max: number) {
  return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k`
}

function formatPosted(daysAgo: number) {
  if (daysAgo === 0) return 'Posted today'
  if (daysAgo === 1) return 'Posted 1 day ago'
  return `Posted ${daysAgo} days ago`
}

const SETTING_BADGE_STYLES: Record<string, string> = {
  private_practice: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  hospital_health_system: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  academia: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

interface Props {
  job: PhysicianJob
  onSelect: () => void
}

export function JobCard({ job, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className="w-full rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{job.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {job.specialty} · {job.employer}
          </p>
        </div>
        <span className="whitespace-nowrap text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          {formatIncomeRange(job.incomeMin, job.incomeMax)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span className="inline-flex items-center gap-1">
          📍 {job.remote ? 'Remote' : `${job.city}, ${job.state}`}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${SETTING_BADGE_STYLES[job.setting]}`}
        >
          {SETTING_LABELS[job.setting]}
        </span>
        {job.workFormats.map((wf) => (
          <span
            key={wf}
            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {WORK_FORMAT_LABELS[wf]}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.focusTags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
          >
            {tag}
          </span>
        ))}
        {job.focusTags.length > 4 && (
          <span className="rounded-md px-2 py-0.5 text-xs font-medium text-slate-400">
            +{job.focusTags.length - 4} more
          </span>
        )}
      </div>

      <p className="mt-3 text-xs text-slate-400">{formatPosted(job.postedDaysAgo)}</p>
    </button>
  )
}
