import {
  FOCUS_TAGS,
  SETTING_LABELS,
  WORK_FORMAT_LABELS,
  type PracticeSetting,
  type WorkFormat,
} from '../types/job'

export interface Filters {
  keyword: string
  location: string
  minIncome: number
  workFormats: WorkFormat[]
  settings: PracticeSetting[]
  focusTags: string[]
}

export const DEFAULT_FILTERS: Filters = {
  keyword: '',
  location: '',
  minIncome: 0,
  workFormats: [],
  settings: [],
  focusTags: [],
}

const WORK_FORMATS = Object.keys(WORK_FORMAT_LABELS) as WorkFormat[]
const SETTINGS = Object.keys(SETTING_LABELS) as PracticeSetting[]

const INCOME_STEP = 10000
const INCOME_MAX = 500000

function formatIncome(value: number) {
  return `$${(value / 1000).toFixed(0)}k`
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

interface Props {
  filters: Filters
  onChange: (next: Filters) => void
  resultCount: number
}

export function FilterPanel({ filters, onChange, resultCount }: Props) {
  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value })
  }

  const hasActiveFilters =
    filters.keyword ||
    filters.location ||
    filters.minIncome > 0 ||
    filters.workFormats.length > 0 ||
    filters.settings.length > 0 ||
    filters.focusTags.length > 0

  return (
    <aside className="w-full shrink-0 space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:w-80">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Keyword
        </label>
        <input
          type="text"
          value={filters.keyword}
          onChange={(e) => set('keyword', e.target.value)}
          placeholder="Specialty, title, employer…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Location
        </label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="City, state, or 'remote'"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Minimum income
          </label>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {filters.minIncome > 0 ? formatIncome(filters.minIncome) : 'Any'}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={INCOME_MAX}
          step={INCOME_STEP}
          value={filters.minIncome}
          onChange={(e) => set('minIncome', Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>$0</span>
          <span>{formatIncome(INCOME_MAX)}+</span>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Work format</h3>
        <div className="flex flex-wrap gap-2">
          {WORK_FORMATS.map((wf) => (
            <button
              key={wf}
              onClick={() => set('workFormats', toggle(filters.workFormats, wf))}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                filters.workFormats.includes(wf)
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 text-slate-600 hover:border-blue-400 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              {WORK_FORMAT_LABELS[wf]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          Practice setting
        </h3>
        <div className="flex flex-wrap gap-2">
          {SETTINGS.map((s) => (
            <button
              key={s}
              onClick={() => set('settings', toggle(filters.settings, s))}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                filters.settings.includes(s)
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-300 text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              {SETTING_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          What you want to do
        </h3>
        <div className="flex flex-wrap gap-2">
          {FOCUS_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => set('focusTags', toggle(filters.focusTags, tag))}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                filters.focusTags.includes(tag)
                  ? 'border-violet-600 bg-violet-600 text-white'
                  : 'border-slate-300 text-slate-600 hover:border-violet-400 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-200">{resultCount}</span>{' '}
        job{resultCount === 1 ? '' : 's'} match your filters
      </p>
    </aside>
  )
}
