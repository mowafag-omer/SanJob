import { getEntityRepository } from "../../helpers/getentityRepository";
import { EntityTarget, Repository, UpdateResult } from "typeorm";
import Company from "./entity";
import { companyProps } from "./types";

export interface ICompanyRepository {
  entity: EntityTarget<Company>
  companyRepo: (entity: EntityTarget<Company>) => Repository<Company>
  create(company: companyProps): Promise<companyProps>
  read(id: number): Promise<companyProps | null>
  readAll(): Promise<any>
}

export default class CompanyRepository {
  entity: EntityTarget<Company>
  companyRepo: (entity: EntityTarget<Company>) => Repository<Company>
  
  constructor(entity: EntityTarget<Company>) {
    this.entity = entity
    this.companyRepo = getEntityRepository
  }

  async create(company: companyProps): Promise<companyProps> {
    const repo = this.companyRepo(this.entity)
    return await repo.save(company)
  }

  async read(id: number): Promise<companyProps | null> {
    const repo = this.companyRepo(this.entity)
    return await repo.findOneBy({id: id})
  }

  async readAll(): Promise<any> {
    const repo = this.companyRepo(this.entity)
    return await repo.find()
  }

  // async update(companyProfile: companyProps): Promise<UpdateResult | false> {
  //   const repo = this.companyRepo(this.entity)
  //   const companyId = companyProfile.id
  //   delete companyProfile.id
  //   const result = await repo.createQueryBuilder()
  //     .update({ ...companyProfile })
  //     .where({ id: companyId })
  //     .returning('*')
  //     .execute()

  //   return result ? result : false
  // }
}