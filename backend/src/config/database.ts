import { DataSource } from "typeorm";
import { entities } from "../modules";
import config from "./constants";

const db = new DataSource({
  "type": "mysql",
  "host": config.DB_HOST,
  "port": config.DB_PORT,
  "username": config.DB_USERNAME,
  "password": config.DB_PASSWORD,
  "database": config.DB_NAME,
  "logging": false,
  "synchronize": false,
  "entities": [entities.User],
});

export default db