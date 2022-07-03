import { IJobSeekerRepository } from "./repository";
import { jobSeekerProps, ServicReturnType } from "./types";

export interface IJobSeekerService {
  repo: IJobSeekerRepository
  createProfile(jobSeekerdata: jobSeekerProps): Promise<ServicReturnType>
  getProfileById(id: number): Promise<any>
  updateProfile (jobSeekerdata: jobSeekerProps): Promise<ServicReturnType>
}

export default class JobSeekerService implements IJobSeekerService{
  repo: IJobSeekerRepository

  constructor(repo: IJobSeekerRepository) {
    this.repo = repo
  }

  async createProfile(jobSeekerdata: jobSeekerProps): Promise<ServicReturnType> {
    const result = await this.repo.create(jobSeekerdata)
    return { success: true, message: "Profile created successfully !" }
  }

  async getProfileById(id: number): Promise<any> {
    const result = await this.repo.read(id)
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "Profile not found !" }
  }

  async updateProfile(jobSeekerdata: jobSeekerProps): Promise<ServicReturnType> {
    const result = await this.repo.update(jobSeekerdata)
    return result 
      ? { success: true, message: "Profile updated successfully !" }
      : { success: false, message: "Profile not found !"}
  }
}