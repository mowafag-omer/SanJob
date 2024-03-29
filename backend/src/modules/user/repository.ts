import { EntityTarget, Repository } from "typeorm";
import { getEntityRepository } from "../../helpers/getentityRepository";
import User from "./entity";
import { userProps } from "./types";

export interface IUserRepo {
  userEntity: EntityTarget<User>;
  userRepo: (entity: EntityTarget<User>) => Repository<User>;
  exists(email: string, type: string): Promise<boolean>;
  create(user: userProps): Promise<userProps>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUserStatus(id: number): Promise<void> 
}

export default class UserRepository implements IUserRepo {
  userEntity: EntityTarget<User>;
  userRepo: (entity: EntityTarget<User>) => Repository<User>;

  constructor(userEntity: EntityTarget<User>) {
    this.userEntity = userEntity;
    this.userRepo = getEntityRepository;
  }

  async exists(email: string, role: string): Promise<boolean> {
    const userRepo = this.userRepo(this.userEntity);
    const result = await userRepo.findOneBy({ email: email });
    return !!result;
  }

  async create(props: userProps): Promise<userProps> {
    const userRepo = this.userRepo(this.userEntity);
    return await userRepo.save(props) 
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userRepo = this.userRepo(this.userEntity);
    return await userRepo.findOneBy({ email: email });
  }

  async updateUserStatus(id: number): Promise<void> {
    const userRepo = this.userRepo(this.userEntity);
    const result = await userRepo.createQueryBuilder()
    .update({ hasProfile: true })
    .where({ id })
    .execute()
  }
}
