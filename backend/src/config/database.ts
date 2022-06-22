import config from "./constants";
import { DataSource } from "typeorm";
import { entities } from "../modules";

const db = new DataSource({
  "type": "mysql",
  "host": config.DB_HOST,
  "port": config.DB_PORT,
  "username": config.DB_USERNAME,
  "password": config.DB_PASSWORD,
  "database": config.DB_NAME,
  "logging": false,
  "synchronize": true,
  "entities": [entities.User],
});

// (async function() {
//   try {
//     await db.initialize()
//     console.log('[App]: Connected to the database');
//   } catch (err) {
//     console.log(err);
//   }
// })()

console.log('db');

export default db