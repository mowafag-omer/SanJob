import db from "../config/database";

export function getEntityRepository(entity: any) {
  return db.getRepository(entity)
}