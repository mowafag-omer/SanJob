import { IJobOfferRepository } from "./repository";
import { jobOfferProps } from "./types";

export interface IJobOfferService {
  repo: IJobOfferRepository
  postJobOffer(jobOfferDetails: jobOfferProps): Promise<any>
  getCompayJobOffers(id: number): Promise<any>
  getJobOffers(): Promise<any>
  updateJobOffer(jobOfferDetails: jobOfferProps, id: number): Promise<any>
}

export default class JobOfferService implements IJobOfferService{
  repo: IJobOfferRepository

  constructor(repo: IJobOfferRepository) {
    this.repo = repo
  }

  async postJobOffer(jobOfferDetails: jobOfferProps): Promise<any> {
    const result = await this.repo.create(jobOfferDetails)
    return { success: true, payload: result, message: "The Offer posted successfully !" }
  }

  async getCompayJobOffers(id: number): Promise<any> {
    const result = await this.repo.readCompanyjobOffers(id)
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No job Offers had posted yet !" }
  }

  async getJobOffers(): Promise<any> {
    const result = await this.repo.readAll()
    return result 
      ? { success: true, payload: result }
      : { success: false, message: "No jobs Offers had posted yet !" }
  }

  async updateJobOffer(companyProfile: jobOfferProps, id: number): Promise<any> {
    const result = await this.repo.update(companyProfile, id)
    return result 
      ? { success: true, payload: result, message: "Offer updated successfully !" }
      : { success: false, message: "Job not found !"}
  }
}