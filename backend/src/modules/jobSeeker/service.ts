import { IJobSeekerRepository } from "./repository";
import { jobSeekerProps, jobSeekerUpdateProps, ServicReturnType } from "./types";
import { userRepo } from '../user'

export interface IJobSeekerService {
  repo: IJobSeekerRepository
  createProfile(jobSeekerdata: jobSeekerProps): Promise<ServicReturnType>
  getProfileById(id: number): Promise<any>
  updateProfile (jobSeekerdata: jobSeekerUpdateProps, id: number): Promise<ServicReturnType>
}

export default class JobSeekerService implements IJobSeekerService{
  repo: IJobSeekerRepository

  constructor(repo: IJobSeekerRepository) {
    this.repo = repo
  }

  async createProfile(jobSeekerdata: jobSeekerProps): Promise<ServicReturnType> {
    const result = await this.repo.create(jobSeekerdata)
    if (result) userRepo.updateUserStatus(+jobSeekerdata.user)
    return { success: true, payload: result, message: "Profile created successfully !" }
  }

  async getProfileById(id: number): Promise<any> {
    const result = await this.repo.read(id)
    result!.user = {id: result!.user!.id}
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "Profile not found !" }
  }

  async updateProfile(jobSeekerdata: jobSeekerUpdateProps, id: number): Promise<ServicReturnType> {
    const result = await this.repo.update(jobSeekerdata, id)
    return result 
      ? { success: true, payload: result, message: "Profile updated successfully !" }
      : { success: false, message: "Profile not found !"}
  }
}