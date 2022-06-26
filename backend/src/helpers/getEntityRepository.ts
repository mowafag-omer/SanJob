import { User } from "../modules/user";
import { EntityTarget } from "typeorm";
import db from "../config/database";

export function getEntityRepository(entity: EntityTarget<User>) {
  return db.getRepository(entity)
}