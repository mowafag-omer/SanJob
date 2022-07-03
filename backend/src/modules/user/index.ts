import User from "./entity";
import UserRepository from "./repository";
import UserService from "./service";
import UserController from "./controller";
import userRouter from "./router";

const repo = new UserRepository(User)
const service = new UserService(repo)
const controller = new UserController(service)

export { User, controller, userRouter }