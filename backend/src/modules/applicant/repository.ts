import { EntityTarget, Repository, UpdateResult } from "typeorm";
import Applicant from "./entity";
import { getEntityRepository } from "../../helpers/getentityRepository";
import { applicantProps } from "./types";

export interface IApplicantRepository {
  applicantEntity: EntityTarget<Applicant>
  applicantRepo: (entity: EntityTarget<Applicant>) => Repository<Applicant>
  create(applicant: applicantProps): Promise<applicantProps>
  read(id: number): Promise<applicantProps | null>
  update(applicant: applicantProps): Promise<UpdateResult | false>
}

export default class ApplicantRepository implements IApplicantRepository {
  applicantEntity: EntityTarget<Applicant>
  applicantRepo: (entity: EntityTarget<Applicant>) => Repository<Applicant>

  constructor(entity: EntityTarget<Applicant>) {
    this.applicantEntity = entity
    this.applicantRepo = getEntityRepository
  }

  async create(applicant: applicantProps): Promise<applicantProps> {
    const repo = this.applicantRepo(this.applicantEntity);
    return await repo.save(applicant)
  }

  async read(id: number): Promise<applicantProps | null> {
    const repo = this.applicantRepo(this.applicantEntity);
    return await repo.findOneBy({id: id})
  }

  async update(applicant: applicantProps): Promise<UpdateResult | false> {
    const repo = this.applicantRepo(this.applicantEntity);
    const applicantId = applicant.id
    delete applicant.id
    const result = await repo.createQueryBuilder()
      .update({ ...applicant })
      .where({ id: applicantId })
      .returning('*')
      .execute()

    return result ? result : false
  }

}