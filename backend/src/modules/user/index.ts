import User from "./entity";
import UserRepository from "./repository";
import UserService from "./service";
import UserController from "./controller";


const userRepo = new UserRepository(User)

// async function hello() {
//   const r = await userRepo.exists('mmo@o.com', 'applicant')
//   console.log(r);
  
// }

// hello()
const userService = new UserService(userRepo)

const userController = new UserController(userService)

export { userController }

export { User }