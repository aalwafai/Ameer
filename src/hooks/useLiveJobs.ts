import { useEffect, useState } from 'react'
import type { LiveJob } from '../types/liveJob'

interface State {
  jobs: LiveJob[]
  loading: boolean
  error: string | null
  configured: boolean
}

export function useLiveJobs(enabled: boolean, keyword: string, location: string) {
  const [state, setState] = useState<State>({
    jobs: [],
    loading: false,
    error: null,
    configured: true,
  })

  useEffect(() => {
    if (!enabled) {
      setState((s) => ({ ...s, loading: false, error: null }))
      return
    }

    const controller = new AbortController()
    setState((s) => ({ ...s, loading: true, error: null }))

    const timeout = setTimeout(() => {
      const params = new URLSearchParams()
      if (keyword) params.set('keyword', keyword)
      if (location) params.set('location', location)

      fetch(`/api/live-jobs?${params.toString()}`, { signal: controller.signal })
        .then(async (res) => {
          const data = await res.json()
          if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`)
          setState({
            jobs: data.jobs ?? [],
            loading: false,
            error: data.configured === false ? data.message : null,
            configured: data.configured !== false,
          })
        })
        .catch((err) => {
          if (controller.signal.aborted) return
          setState({ jobs: [], loading: false, error: err.message, configured: true })
        })
    }, 400)

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [enabled, keyword, location])

  return state
}
