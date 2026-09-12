import { SETTING_LABELS, WORK_FORMAT_LABELS, type PhysicianJob } from '../types/job'

function formatIncomeRange(min: number, max: number) {
  return `$${min.toLocaleString()} – $${max.toLocaleString()}`
}

interface Props {
  job: PhysicianJob
  onClose: () => void
}

export function JobDetail({ job, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 pt-10 sm:pt-16"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{job.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {job.specialty} · {job.employer}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-xs text-slate-400">Location</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {job.remote ? 'Remote' : `${job.city}, ${job.state}`}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-xs text-slate-400">Compensation</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {formatIncomeRange(job.incomeMin, job.incomeMax)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-xs text-slate-400">Setting</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {SETTING_LABELS[job.setting]}
            </p>
          </div>
          {job.signOnBonus && (
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs text-slate-400">Sign-on bonus</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                ${job.signOnBonus.toLocaleString()}
              </p>
            </div>
          )}
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-xs text-slate-400">Work format</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {job.workFormats.map((wf) => WORK_FORMAT_LABELS[wf]).join(', ')}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-xs text-slate-400">Schedule</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{job.schedule}</p>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            About this role
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {job.description}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            What you'll be doing
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {job.focusTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to results
        </button>
      </div>
    </div>
  )
}
