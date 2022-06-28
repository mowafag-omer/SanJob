import { Router, Request, Response } from "express"
import { User } from "../modules/user"
import UserRepository from "../modules/user/repository"
import checkAuth from "../middlewares/auth"
import { router } from "../modules"
import { Repository } from "typeorm"

const v1Router: Router = Router()

v1Router.get("/", (_: Request, res: Response) => {
  res.json("SanJob API V1")
})

v1Router.post("/test", async (req: Request, res: Response) => {
  const repo = new UserRepository(User)

  const r = await repo.getUserByEmail(req.body.email)
  console.log(r);
  
  res.json(r)
})

const routes = {
  '/': v1Router,
  ...router
}

export default routes;