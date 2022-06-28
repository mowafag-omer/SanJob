import { EntityTarget, Repository } from "typeorm";
import { getEntityRepository } from "../../helpers/getentityRepository";
import User from "./entity";
import { userProps } from "./types";

export interface IUserRepo {
  userEntity: EntityTarget<User>;
  userRepo: (entity: EntityTarget<User>) => Repository<User>;
  exists(email: string, type: string): Promise<boolean>;
  create(user: userProps): Promise<userProps | false>;
  getUserByEmail(email: string): Promise<User | null>;
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
    const result = await userRepo.findOneBy({ email: email, role: role });
    return !!result;
  }

  async create(user: userProps): Promise<userProps | false> {
    const userRepo = this.userRepo(this.userEntity);
    const userExists = await this.exists(user.email, user.role);
    return !userExists ? await userRepo.save(user) : false;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userRepo = this.userRepo(this.userEntity);
    return await userRepo.findOneBy({ email: email });
  }
}
