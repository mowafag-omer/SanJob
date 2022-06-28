import { IApplicantRepository } from "./repository";
import { applicantProps, ServicReturnType } from "./types";

export interface IApplicantService {
  repo: IApplicantRepository
  createProfile(applicantdata: applicantProps): Promise<ServicReturnType>
  getProfileById(id: number): Promise<any>
  updateProfile (applicantdata: applicantProps): Promise<ServicReturnType>
}

export default class ApplicantService implements IApplicantService{
  repo: IApplicantRepository

  constructor(repo: IApplicantRepository) {
    this.repo = repo
  }

  async createProfile(applicantdata: applicantProps): Promise<ServicReturnType> {
    const result = await this.repo.create(applicantdata)
    return { success: true, message: "Profile created successfully !" }
  }

  async getProfileById(id: number): Promise<any> {
    const result = await this.repo.read(id)
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "Profile not found !" }
  }

  async updateProfile(applicantdata: applicantProps): Promise<ServicReturnType> {
    const result = await this.repo.update(applicantdata)
    return result 
      ? { success: true, message: "Profile updated successfully !" }
      : { success: false, message: "Profile not found !"}
  }
}