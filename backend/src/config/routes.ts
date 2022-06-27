import { Router, Request, Response } from "express"
import checkAuth from "../middlewares/auth"
import { router } from "../modules"

const v1Router: Router = Router()

v1Router.get("/", (_: Request, res: Response) => {
  res.json("SanJob API V1")
})

v1Router.post("/test", checkAuth, (_: Request, res: Response) => {
  res.json("SanJob API test")
})

const routes = {
  '/': v1Router,
  ...router
}

export default routes;