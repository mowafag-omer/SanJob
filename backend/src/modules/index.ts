import db from "../config/database";
import { User } from "./user"
import userRouter from "./user/router";

console.log('indexmodules');

const entities = { User }
const router = { '/user': userRouter }

export { db, entities, router }