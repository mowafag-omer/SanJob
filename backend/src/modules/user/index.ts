import User from "./entity";
import UserRepository from "./repository";
import UserService from "./service";
import UserController from "./controller";
import userRouter from "./router";

const userRepo = new UserRepository(User)
const service = new UserService(userRepo)
const controller = new UserController(service)

export { User, controller, userRouter, userRepo }