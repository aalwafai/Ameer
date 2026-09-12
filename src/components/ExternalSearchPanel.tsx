import { useState } from 'react'
import { EXTERNAL_SITES } from '../data/externalSites'

interface Props {
  keyword: string
  location: string
}

export function ExternalSearchPanel({ keyword, location }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            🔎 Search other job sites
          </h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Open your current search on LinkedIn, medical societies, and top recruitment sites
          </p>
        </div>
        <span className="text-slate-400">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {EXTERNAL_SITES.map((site) => (
            <a
              key={site.id}
              href={site.buildUrl(keyword, location)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span>
                <span className="font-medium text-slate-800 dark:text-slate-100">{site.name}</span>
                <span className="block text-xs text-slate-400">{site.description}</span>
              </span>
              <span className="text-slate-400">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
