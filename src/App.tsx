import { useMemo, useState } from 'react'
import { DEFAULT_FILTERS, FilterPanel, type Filters } from './components/FilterPanel'
import { ExternalSearchPanel } from './components/ExternalSearchPanel'
import { JobCard } from './components/JobCard'
import { JobDetail } from './components/JobDetail'
import { LiveJobCard } from './components/LiveJobCard'
import { JOBS } from './data/jobs'
import { useLiveJobs } from './hooks/useLiveJobs'
import type { PhysicianJob } from './types/job'

function matchesFilters(job: PhysicianJob, filters: Filters): boolean {
  if (filters.keyword) {
    const q = filters.keyword.toLowerCase()
    const haystack = `${job.title} ${job.specialty} ${job.employer}`.toLowerCase()
    if (!haystack.includes(q)) return false
  }

  if (filters.location) {
    const q = filters.location.toLowerCase()
    const haystack = job.remote
      ? `remote ${job.state}`.toLowerCase()
      : `${job.city} ${job.state}`.toLowerCase()
    if (!haystack.includes(q)) return false
  }

  if (filters.minIncome > 0 && job.incomeMax < filters.minIncome) return false

  if (filters.workFormats.length > 0) {
    const hasFormat = filters.workFormats.some((wf) => job.workFormats.includes(wf))
    if (!hasFormat) return false
  }

  if (filters.settings.length > 0 && !filters.settings.includes(job.setting)) return false

  if (filters.focusTags.length > 0) {
    const hasAllTags = filters.focusTags.every((tag) => job.focusTags.includes(tag))
    if (!hasAllTags) return false
  }

  return true
}

type SortKey = 'newest' | 'income_high' | 'income_low'

function sortJobs(jobs: PhysicianJob[], sortKey: SortKey): PhysicianJob[] {
  const copy = [...jobs]
  switch (sortKey) {
    case 'income_high':
      return copy.sort((a, b) => b.incomeMax - a.incomeMax)
    case 'income_low':
      return copy.sort((a, b) => a.incomeMin - b.incomeMin)
    case 'newest':
    default:
      return copy.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  }
}

export default function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sortKey, setSortKey] = useState<SortKey>('newest')
  const [selectedJob, setSelectedJob] = useState<PhysicianJob | null>(null)
  const [includeLive, setIncludeLive] = useState(false)

  const filteredJobs = useMemo(() => {
    const matched = JOBS.filter((job) => matchesFilters(job, filters))
    return sortJobs(matched, sortKey)
  }, [filters, sortKey])

  const liveKeyword = filters.keyword || 'physician'
  const live = useLiveJobs(includeLive, liveKeyword, filters.location)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            🩺 Physician Job Search
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Find your next role by income, location, work format, and practice setting.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <FilterPanel filters={filters} onChange={setFilters} resultCount={filteredJobs.length} />

          <section className="min-w-0 flex-1 space-y-6">
            <ExternalSearchPanel keyword={filters.keyword} location={filters.location} />

            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={includeLive}
                onChange={(e) => setIncludeLive(e.target.checked)}
                className="h-4 w-4 accent-emerald-600"
              />
              Also fetch live results from the web (via job-search API)
            </label>

            {includeLive && (
              <div>
                {live.loading && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Searching the web for live listings…
                  </p>
                )}
                {!live.loading && live.error && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
                    {live.error}
                  </div>
                )}
                {!live.loading && !live.error && live.jobs.length > 0 && (
                  <>
                    <h2 className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      {live.jobs.length} live result{live.jobs.length === 1 ? '' : 's'} from the web
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {live.jobs.map((job) => (
                        <LiveJobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </>
                )}
                {!live.loading && !live.error && live.jobs.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No live results found for this search.
                  </p>
                )}
              </div>
            )}

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {filteredJobs.length} result{filteredJobs.length === 1 ? '' : 's'}
                </h2>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="newest">Newest</option>
                  <option value="income_high">Income: High to low</option>
                  <option value="income_low">Income: Low to high</option>
                </select>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-slate-500 dark:text-slate-400">
                    No jobs match your filters. Try broadening your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} onSelect={() => setSelectedJob(job)} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {selectedJob && <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  )
}
