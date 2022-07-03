import { EntityTarget, Repository, UpdateResult } from "typeorm";
import JobSeeker from "./entity";
import { getEntityRepository } from "../../helpers/getentityRepository";
import { jobSeekerProps } from "./types";

export interface IJobSeekerRepository {
  jobSeekerEntity: EntityTarget<JobSeeker>
  jobSeekerRepo: (entity: EntityTarget<JobSeeker>) => Repository<JobSeeker>
  create(jobSeeker: jobSeekerProps): Promise<jobSeekerProps>
  read(id: number): Promise<jobSeekerProps | null>
  update(jobSeeker: jobSeekerProps): Promise<UpdateResult | false>
}

export default class JobSeekerRepository implements IJobSeekerRepository {
  jobSeekerEntity: EntityTarget<JobSeeker>
  jobSeekerRepo: (entity: EntityTarget<JobSeeker>) => Repository<JobSeeker>

  constructor(entity: EntityTarget<JobSeeker>) {
    this.jobSeekerEntity = entity
    this.jobSeekerRepo = getEntityRepository
  }

  async create(jobSeeker: jobSeekerProps): Promise<jobSeekerProps> {
    const repo = this.jobSeekerRepo(this.jobSeekerEntity);
    return await repo.save(jobSeeker)
  }

  async read(id: number): Promise<jobSeekerProps | null> {
    const repo = this.jobSeekerRepo(this.jobSeekerEntity);
    return await repo.findOneBy({id: id})
  }

  async update(jobSeekerProfile: jobSeekerProps): Promise<UpdateResult | false> {
    const repo = this.jobSeekerRepo(this.jobSeekerEntity);
    const jobSeekerId = jobSeekerProfile.id
    delete jobSeekerProfile.id
    const result = await repo.createQueryBuilder()
      .update({ ...jobSeekerProfile })
      .where({ id: jobSeekerId })
      .returning('*')
      .execute()

    return result ? result : false
  }
}