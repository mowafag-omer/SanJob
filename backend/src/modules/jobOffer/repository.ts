import { getEntityRepository } from "../../helpers/getentityRepository";
import { EntityTarget, Repository } from "typeorm";
import JobOffer from "./entity";
import { jobOfferProps } from "./types";

export interface IJobOfferRepository {
  entity: EntityTarget<JobOffer>
  repo: (entity: EntityTarget<JobOffer>) => Repository<JobOffer>
  create(jobOffer: jobOfferProps): Promise<jobOfferProps>
  // read(id: number): Promise<jobOfferProps | null>
  readCompanyjobOffers(id: number): Promise<any>
  readAll(): Promise<any>
  update(jobOfferDetails: jobOfferProps, id: number): Promise<jobOfferProps | false>
}

export default class JobOfferRepository {
  entity: EntityTarget<JobOffer>
  repo: (entity: EntityTarget<JobOffer>) => Repository<JobOffer>
  
  constructor(entity: EntityTarget<JobOffer>) {
    this.entity = entity
    this.repo = getEntityRepository
  }

  async create(jobOffer: jobOfferProps): Promise<jobOfferProps> {
    const repo = this.repo(this.entity)
    return await repo.save(jobOffer)
  }

  // async read(id: number): Promise<jobOfferProps | null> {
  //   const repo = this.repo(this.entity)
  //   return await repo.findOne({where: {company: {id}}, relations: ['company']})
  // }

  async readCompanyjobOffers(id: number): Promise<any> {
    const repo = this.repo(this.entity)
    return await repo.find({where: {company: {id}}, relations: ['company']})
  }

  async readAll(): Promise<any> {
    const repo = this.repo(this.entity)
    return await repo.find({relations: ['company']})
  }

  async update(jobOfferDetails: jobOfferProps, id: number): Promise<jobOfferProps | false> {
    const repo = this.repo(this.entity)
    const result = await repo.save({id: id, ...jobOfferDetails})

    return result ? result : false
  }
}