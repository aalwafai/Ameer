import http from 'node:http'

const PORT = process.env.PORT || 8787
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY
const ADZUNA_COUNTRY = process.env.ADZUNA_COUNTRY || 'us'

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

function normalizeAdzunaJob(job) {
  return {
    id: `adzuna-${job.id}`,
    title: job.title?.replace(/<[^>]+>/g, '') ?? 'Untitled role',
    employer: job.company?.display_name ?? 'Unknown employer',
    location: job.location?.display_name ?? '',
    url: job.redirect_url,
    description: (job.description ?? '').replace(/<[^>]+>/g, '').slice(0, 400),
    incomeMin: job.salary_min ? Math.round(job.salary_min) : undefined,
    incomeMax: job.salary_max ? Math.round(job.salary_max) : undefined,
    source: 'Adzuna',
    postedAt: job.created,
  }
}

async function handleLiveJobs(query, res) {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    sendJson(res, 200, {
      configured: false,
      message:
        'Live web search is not configured. Set ADZUNA_APP_ID and ADZUNA_APP_KEY (free keys at developer.adzuna.com) to enable it.',
      jobs: [],
    })
    return
  }

  const keyword = query.get('keyword') || 'physician'
  const location = query.get('location') || ''

  const params = new URLSearchParams({
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    results_per_page: '20',
    what: keyword,
    category: 'healthcare-nursing-jobs',
    'content-type': 'application/json',
  })
  if (location && location.toLowerCase() !== 'remote') {
    params.set('where', location)
  }

  const url = `https://api.adzuna.com/v1/api/jobs/${ADZUNA_COUNTRY}/search/1?${params.toString()}`

  try {
    const upstream = await fetch(url)
    if (!upstream.ok) {
      sendJson(res, 502, {
        configured: true,
        message: `Adzuna API returned ${upstream.status}`,
        jobs: [],
      })
      return
    }
    const data = await upstream.json()
    const jobs = (data.results ?? []).map(normalizeAdzunaJob)
    sendJson(res, 200, { configured: true, jobs })
  } catch (err) {
    sendJson(res, 502, {
      configured: true,
      message: `Failed to reach Adzuna: ${err instanceof Error ? err.message : String(err)}`,
      jobs: [],
    })
  }
}

const server = http.createServer((req, res) => {
  setCors(res)

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`)

  if (req.method === 'GET' && parsedUrl.pathname === '/api/live-jobs') {
    handleLiveJobs(parsedUrl.searchParams, res)
    return
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, adzunaConfigured: Boolean(ADZUNA_APP_ID && ADZUNA_APP_KEY) })
    return
  }

  sendJson(res, 404, { message: 'Not found' })
})

server.listen(PORT, () => {
  console.log(`Live job search proxy listening on http://localhost:${PORT}`)
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    console.log('ADZUNA_APP_ID / ADZUNA_APP_KEY not set — /api/live-jobs will report "not configured".')
  }
})
