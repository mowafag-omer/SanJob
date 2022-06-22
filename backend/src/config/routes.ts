import { Router, Request, Response } from "express"
import UserRepository from "../modules/user/repository";
import { User } from "../modules/user"
import db from "./database"
import { router } from "../modules"
import UserService from "../modules/user/service";
import UserController from "../modules/user/controller";


const v1Router: Router = Router()
console.log('router');

v1Router.get("/", (_: Request, res: Response) => {
  res.json("SanJob API V1")
})

v1Router.post("/test", async (req: Request, res: Response) => {
  const userrepo: any = db.getRepository(User)
  
  await userrepo.save(req.body)

  res.json("done")
})

// const userRepo = new UserRepository(User)
// const userService = new UserService(userRepo)
// const userController = new UserController(userService)

// v1Router.post("/testt", async (req: Request, res: Response) => userController.register(req, res))

const routes = {
  '/': v1Router,
  ...router
}

export default routes;