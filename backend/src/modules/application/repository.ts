import { getEntityRepository } from "../../helpers/getentityRepository";
import { EntityTarget, Repository } from "typeorm";
import Applicaton from "./entity";
import { applicationProps, updateApplicationProps } from "./types";

export interface IApplicatonRepository {
  entity: EntityTarget<Applicaton>
  repo: (entity: EntityTarget<Applicaton>) => Repository<Applicaton>
  create(applicaton: applicationProps): Promise<applicationProps>
  readJobseekerApp(id: number): Promise<any>
  readJobApp(id: number): Promise<any>
  readCompanyJobsApp(id: number): Promise<any>
  update(applicatonDetails: updateApplicationProps, id: number): Promise<updateApplicationProps | false>
}

export default class ApplicatonRepository implements IApplicatonRepository{
  entity: EntityTarget<Applicaton>
  repo: (entity: EntityTarget<Applicaton>) => Repository<Applicaton>
  
  constructor(entity: EntityTarget<Applicaton>) {
    this.entity = entity
    this.repo = getEntityRepository
  }

  async create(applicaton: applicationProps): Promise<applicationProps> {
    const repo = this.repo(this.entity)
    return await repo.save(applicaton)
  }

  async readJobseekerApp(id: number): Promise<any> {
    const repo = this.repo(this.entity)
    return await repo.find({where: {jobSeeker: {id}}, relations: ['jobSeeker']})
  }

  async readJobApp(id: number): Promise<any> {
    const repo = this.repo(this.entity)
    return await repo.find({where: {jobOffer: {id}}, relations: ['jobOffer']})
  }

  async readCompanyJobsApp(id: number): Promise<any> {
    const repo = this.repo(this.entity)
    return await repo.find({where: {jobOffer: {company: {id}}}, relations: ['jobOffer']})
  }


  async update(applicatonDetails: updateApplicationProps, id: number): Promise<updateApplicationProps | false> {
    const repo = this.repo(this.entity)
    const result = await repo.save({id: id, ...applicatonDetails})

    return result ? result : false
  }
}