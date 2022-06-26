import { EntityTarget, Repository } from "typeorm";
import { getEntityRepository } from "../../helpers/getentityRepository";
import User from "./entity";
import { userProps } from "./userTypes";

export interface IuserRepo {
  userEntity: EntityTarget<User>;
  exists(email: string, type: string): Promise<boolean>;
  create(user: userProps): Promise<userProps | false>;
  getUserByEmail(email: string): Promise<User | null>;
}

export default class UserRepository {
  userEntity: EntityTarget<User>;
  userRepo: (entity: EntityTarget<User>) => Repository<User>;

  constructor(userEntity: EntityTarget<User>) {
    this.userEntity = userEntity;
    this.userRepo = getEntityRepository;
  }

  async exists(email: string, type: string): Promise<boolean> {
    const userRepo = this.userRepo(this.userEntity);
    const result = await userRepo.findOneBy({ email: email, type: type });
    return !!result;
  }

  async create(user: userProps): Promise<userProps | false> {
    const userRepo = this.userRepo(this.userEntity);
    const userExists = await this.exists(user.email, user.type);
    return !userExists ? await userRepo.save(user) : false;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userRepo = this.userRepo(this.userEntity);
    return await userRepo.findOneBy({ email: email });
  }
}
