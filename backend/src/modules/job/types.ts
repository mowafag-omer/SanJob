export type jobProps = {
  id?: number;
  job_title: string;
  location: string;
  contract_type: string;
  description: string
  requirement: string
  start_date: Date
  hiring_process: string
  status: string
  company: { id: number }
}