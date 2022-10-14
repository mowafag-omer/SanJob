export type applicationProps = {
  id?: number
  applying_date: string
  status: string
  job: { id: number }
  jobSeeker: { id: number }
}

export type updateApplicationProps = {
  id?: number
  applying_date?: string
  status: string
  job?: { id: number }
  jobSeeker?: { id: number }
}