import { EntityTarget } from "typeorm";
import db from "../config/database";

export function getEntityRepository(entity: EntityTarget<any>) {
  return db.getRepository(entity)
}
