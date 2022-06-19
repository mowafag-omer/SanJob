import config from "./constants";
import { DataSource } from "typeorm";

const db = new DataSource({
  "type": "mysql",
  "host": config.DB_HOST,
  "port": config.DB_PORT,
  "username": config.DB_USERNAME,
  "password": config.DB_PASSWORD,
  "database": config.DB_NAME,
  "logging": false,
  "synchronize": true,
  "entities": [] as any[],
  "subscribers": [],
  "migrations": [],
})

export default db