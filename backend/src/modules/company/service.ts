import { ICompanyRepository } from "./repository";
import { companyProps } from "./types";

export interface ICompanyService {
  repo: ICompanyRepository
  createProfile(profiledata: companyProps): Promise<any>
  getProfileById(id: number): Promise<any>
}

export default class CompanyService implements ICompanyService{
  repo: ICompanyRepository

  constructor(repo: ICompanyRepository) {
    this.repo = repo
  }

  async createProfile(profiledata: companyProps): Promise<any> {
    const result = await this.repo.create(profiledata)
    return { success: true, message: "Profile created successfully !" }
  }

  async getProfileById(id: number): Promise<any> {
    const result = await this.repo.read(id)
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "Profile not found !" }
  }
}