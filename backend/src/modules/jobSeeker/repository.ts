import { EntityTarget, Repository } from "typeorm";
import JobSeeker from "./entity";
import { getEntityRepository } from "../../helpers/getentityRepository";
import { jobSeekerProps } from "./types";

export interface IJobSeekerRepository {
  jobSeekerEntity: EntityTarget<JobSeeker>
  jobSeekerRepo: (entity: EntityTarget<JobSeeker>) => Repository<JobSeeker>
  create(jobSeeker: jobSeekerProps): Promise<jobSeekerProps>
  read(id: number): Promise<jobSeekerProps | null>
  update(jobSeeker: jobSeekerProps, id: number): Promise<jobSeekerProps | false>
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
    return await repo.findOne({where: {user: {id}}, relations: ['user']})
  }

  async update(jobSeekerProfile: jobSeekerProps, id: number): Promise<jobSeekerProps | false> {
    const repo = this.jobSeekerRepo(this.jobSeekerEntity);
    const result = await repo.save({id: id, ...jobSeekerProfile})
    
    return result ? result : false
  }
}