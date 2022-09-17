export type jobOfferProps = {
  id?: number;
  job_title: string;
  location: string;
  contract_type: string[];
  sector: string
  description: string
  requirement: string
  start_date: Date
  posted_at: string
  hiring_process: string
  status: string
  company: { id: number }
}