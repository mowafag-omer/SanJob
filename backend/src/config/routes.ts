import { Router, Request, Response } from "express"
import { router } from "../modules"

const v1Router: Router = Router()

v1Router.get("/", (_: Request, res: Response) => {
  res.json("SanJob API V1")
})

const routes = {
  '/': v1Router,
  ...router
}

export default routes;