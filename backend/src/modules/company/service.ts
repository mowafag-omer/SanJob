import { ICompanyRepository } from "./repository";
import { companyProps } from "./types";
import { userRepo } from '../user'

export interface ICompanyService {
  repo: ICompanyRepository
  createProfile(profiledata: companyProps): Promise<any>
  getProfileById(id: number): Promise<any>
  getProfiles(): Promise<any>
  updateProfile(companyProfile: companyProps, id: number): Promise<any>
}

export default class CompanyService implements ICompanyService{
  repo: ICompanyRepository

  constructor(repo: ICompanyRepository) {
    this.repo = repo
  }

  async createProfile(profiledata: companyProps): Promise<any> {
    const result = await this.repo.create(profiledata)
    if (result) userRepo.updateUserStatus(+profiledata.user)
    return { success: true, payload: result, message: "Profile created successfully !" }
  }

  async getProfileById(id: number): Promise<any> {
    const result = await this.repo.read(id)
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "Profile not found !" }
  }

  async getProfiles(): Promise<any> {
    const result = await this.repo.readAll()
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No companies are found !" }
  }

  async updateProfile(companyProfile: companyProps, id: number): Promise<any> {
    const result = await this.repo.update(companyProfile, id)
    return result 
      ? { success: true, payload: result, message: "Profile updated successfully !" }
      : { success: false, message: "Profile not found !"}
  }
}