export type companyProps = {
  id?: number
  logo_url: string
  name: string
  location: string
  sector: string[]
  presentation: string
  founding_year: string
  employees: number
  website: string
  user: { id: number }
}