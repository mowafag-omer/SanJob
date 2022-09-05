import { IJobRepository } from "./repository";
import { jobProps } from "./types";

export interface IJobService {
  repo: IJobRepository
  postJob(jobDetails: jobProps): Promise<any>
  getCompayJobs(id: number): Promise<any>
  getJobs(): Promise<any>
  updateJob(jobDetails: jobProps, id: number): Promise<any>
}

export default class JobService implements IJobService{
  repo: IJobRepository

  constructor(repo: IJobRepository) {
    this.repo = repo
  }

  async postJob(jobDetails: jobProps): Promise<any> {
    const result = await this.repo.create(jobDetails)
    return { success: true, payload: result, message: "Job posted successfully !" }
  }

  async getCompayJobs(id: number): Promise<any> {
    const result = await this.repo.readCompanyjobs(id)
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No jobs had posted yet !" }
  }

  async getJobs(): Promise<any> {
    const result = await this.repo.readAll()
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No jobs had posted yet !" }
  }

  async updateJob(companyProfile: jobProps, id: number): Promise<any> {
    const result = await this.repo.update(companyProfile, id)
    return result 
      ? { success: true, payload: result, message: "Job updated successfully !" }
      : { success: false, message: "Job not found !"}
  }
}