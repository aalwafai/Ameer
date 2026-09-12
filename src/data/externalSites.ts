export interface ExternalSite {
  id: string
  name: string
  description: string
  buildUrl: (keyword: string, location: string) => string
}

export const EXTERNAL_SITES: ExternalSite[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn Jobs',
    description: 'Professional network job board',
    buildUrl: (keyword, location) => {
      const params = new URLSearchParams()
      params.set('keywords', keyword || 'physician')
      if (location) params.set('location', location)
      return `https://www.linkedin.com/jobs/search/?${params.toString()}`
    },
  },
  {
    id: 'indeed',
    name: 'Indeed',
    description: 'General job search engine',
    buildUrl: (keyword, location) => {
      const params = new URLSearchParams()
      params.set('q', keyword || 'physician')
      if (location) params.set('l', location)
      return `https://www.indeed.com/jobs?${params.toString()}`
    },
  },
  {
    id: 'ziprecruiter',
    name: 'ZipRecruiter',
    description: 'General recruitment site',
    buildUrl: (keyword, location) => {
      const params = new URLSearchParams()
      params.set('search', keyword || 'physician')
      if (location) params.set('location', location)
      return `https://www.ziprecruiter.com/jobs-search?${params.toString()}`
    },
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    description: 'Jobs with employer salary & culture data',
    buildUrl: (keyword, location) => {
      const params = new URLSearchParams()
      params.set('sc.keyword', keyword || 'physician')
      if (location) params.set('locKeyword', location)
      return `https://www.glassdoor.com/Job/jobs.htm?${params.toString()}`
    },
  },
  {
    id: 'practicelink',
    name: 'PracticeLink',
    description: 'Physician-only job board',
    buildUrl: (keyword) => {
      const params = new URLSearchParams()
      if (keyword) params.set('q', keyword)
      return `https://jobs.practicelink.com/jobs/physician/?${params.toString()}`
    },
  },
  {
    id: 'practicematch',
    name: 'PracticeMatch',
    description: 'Physician & healthcare recruiting board',
    buildUrl: () => 'https://www.practicematch.com/physicians/job-search/',
  },
  {
    id: 'nejm',
    name: 'NEJM CareerCenter',
    description: 'New England Journal of Medicine physician jobs',
    buildUrl: (keyword, location) => {
      const params = new URLSearchParams()
      if (keyword) params.set('q', keyword)
      if (location) params.set('l', location)
      return `https://www.nejmcareercenter.org/jobs/?${params.toString()}`
    },
  },
  {
    id: 'acp',
    name: 'ACP Career Connection',
    description: 'American College of Physicians (Internal Medicine)',
    buildUrl: () => 'https://careers.acponline.org/jobs/',
  },
  {
    id: 'aafp',
    name: 'AAFP CareerLink',
    description: 'American Academy of Family Physicians',
    buildUrl: () => 'https://www.aafp.org/careerlink',
  },
  {
    id: 'healthecareers',
    name: 'Health eCareers',
    description: 'Healthcare-wide job board & medical societies network',
    buildUrl: (keyword, location) => {
      const params = new URLSearchParams()
      if (keyword) params.set('q', keyword)
      if (location) params.set('location', location)
      return `https://www.healthecareers.com/jobs?${params.toString()}`
    },
  },
  {
    id: 'doximity',
    name: 'Doximity',
    description: 'Physician network job board',
    buildUrl: (keyword, location) => {
      const params = new URLSearchParams()
      params.set('career_specialty_name', keyword || 'all specialties')
      if (location) params.set('location', location)
      return `https://www.doximity.com/careers/home?${params.toString()}`
    },
  },
  {
    id: 'locumtenens',
    name: 'LocumTenens.com',
    description: 'Locum tenens / shift-based physician staffing',
    buildUrl: () => 'https://www.locumtenens.com/jobs/',
  },
]
