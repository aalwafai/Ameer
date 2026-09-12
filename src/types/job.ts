export type WorkFormat = 'in_person' | 'telehealth' | 'shift_work'

export type PracticeSetting = 'private_practice' | 'hospital_health_system' | 'academia'

export interface PhysicianJob {
  id: string
  title: string
  specialty: string
  employer: string
  city: string
  state: string
  remote: boolean
  workFormats: WorkFormat[]
  setting: PracticeSetting
  incomeMin: number
  incomeMax: number
  signOnBonus?: number
  schedule: string
  focusTags: string[]
  description: string
  postedDaysAgo: number
}

export const WORK_FORMAT_LABELS: Record<WorkFormat, string> = {
  in_person: 'In-Person',
  telehealth: 'Telehealth',
  shift_work: 'Shift Work',
}

export const SETTING_LABELS: Record<PracticeSetting, string> = {
  private_practice: 'Private Practice',
  hospital_health_system: 'Hospital / Health System',
  academia: 'Academia',
}

export const FOCUS_TAGS = [
  'Outpatient',
  'Inpatient',
  'Procedures',
  'Surgery',
  'No Call',
  'Low Call Burden',
  'Teaching',
  'Research',
  'Leadership Track',
  'Underserved Population',
  'Pediatric Population',
  'Geriatric Population',
  'Chronic Disease Management',
  'Work-Life Balance',
  'Loan Repayment',
  'Partnership Track',
  'Locum-to-Perm',
  'Rural',
] as const
