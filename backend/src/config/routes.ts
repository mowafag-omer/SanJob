import { Router, Request, Response } from "express"

const v1Router: Router = Router()

v1Router.get("/", (_: Request, response: Response) => {
  response.json("SanJob API V1")
})

const routes = {
  '/': v1Router,
}

export default routes;