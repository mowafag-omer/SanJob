import User from "./entity";
import UserRepository from "./repository";
import UserService from "./service";
import UserController from "./controller";

const userRepo = new UserRepository(User)
const userService = new UserService(userRepo)
const userController = new UserController(userService)

export { User, userController }