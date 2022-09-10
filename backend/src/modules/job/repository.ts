import { getEntityRepository } from "../../helpers/getentityRepository";
import { EntityTarget, Repository } from "typeorm";
import Job from "./entity";
import { jobProps } from "./types";

export interface IJobRepository {
  entity: EntityTarget<Job>
  jobRepo: (entity: EntityTarget<Job>) => Repository<Job>
  create(job: jobProps): Promise<jobProps>
  // read(id: number): Promise<jobProps | null>
  readCompanyjobs(id: number): Promise<any>
  readAll(): Promise<any>
  update(jobDetails: jobProps, id: number): Promise<jobProps | false>
}

export default class JobRepository {
  entity: EntityTarget<Job>
  jobRepo: (entity: EntityTarget<Job>) => Repository<Job>
  
  constructor(entity: EntityTarget<Job>) {
    this.entity = entity
    this.jobRepo = getEntityRepository
  }

  async create(job: jobProps): Promise<jobProps> {
    const repo = this.jobRepo(this.entity)
    return await repo.save(job)
  }

  // async read(id: number): Promise<jobProps | null> {
  //   const repo = this.jobRepo(this.entity)
  //   return await repo.findOne({where: {company: {id}}, relations: ['company']})
  // }

  async readCompanyjobs(id: number): Promise<any> {
    const repo = this.jobRepo(this.entity)
    return await repo.find({where: {company: {id}}, relations: ['company']})
  }

  async readAll(): Promise<any> {
    const repo = this.jobRepo(this.entity)
    return await repo.find({relations: ['company']})
  }

  async update(jobDetails: jobProps, id: number): Promise<jobProps | false> {
    const repo = this.jobRepo(this.entity)
    const result = await repo.save({id: id, ...jobDetails})

    return result ? result : false
  }
}