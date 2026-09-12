export interface LiveJob {
  id: string
  title: string
  employer: string
  location: string
  url: string
  description: string
  incomeMin?: number
  incomeMax?: number
  source: string
  postedAt?: string
}

export interface LiveJobsResponse {
  configured: boolean
  message?: string
  jobs: LiveJob[]
}
