import { IApplicatonRepository } from "./repository";
import { applicationProps } from "./types";
import filterUserData from "../../helpers/filterUserData";

export interface IApplicationService {
  repo: IApplicatonRepository
  createApplication(application: applicationProps): Promise<any>
  getJobseekerApp(id: number): Promise<any>
  getJobApp(id: number): Promise<any>
  getCompanyJobsApp(id: number): Promise<any>
  updateApplication(application: applicationProps, id: number): Promise<any>
}

export default class ApplicationService implements IApplicationService{
  repo: IApplicatonRepository

  constructor(repo: IApplicatonRepository) {
    this.repo = repo
  }

  async createApplication(application: applicationProps): Promise<any> {
    const result = await this.repo.create(application)
    return { success: true, payload: result, message: "Application sent successfully !" }
  }

  async getJobseekerApp(id: number): Promise<any> {
    const result = await this.repo.readJobseekerApp(id)
    filterUserData(result, 'application')
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No applications has found !" }
  }

  async getJobApp(id: number): Promise<any> {
    const result = await this.repo.readJobApp(id)
    filterUserData(result, 'application')
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No applications has found !" }
  }

  async getCompanyJobsApp(id: number): Promise<any> {
    const result = await this.repo.readCompanyJobsApp(id)
    filterUserData(result, 'application')
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No applications has found !" }
  }

  async updateApplication(Application: applicationProps, id: number): Promise<any> {
    const result = await this.repo.update(Application, id)
    return result 
      ? { success: true, payload: result, message: "Application updated successfully !" }
      : { success: false, message: "Application not found !"}
  }
}