import { Router } from "express";
import { controller } from ".";

const jobRouter: Router = Router()

jobRouter.post("/postJob", (req, res, next) =>
  controller.postJob(req, res, next)
)

jobRouter.get("/getCompanyJobs/:id", (req, res, next) =>
  controller.getCompayJobs(req, res, next)
)

jobRouter.get("/getAllJobs", (req, res, next) =>
  controller.getAllJobs(req, res, next)
)

jobRouter.post("/updateJob/:id", (req, res, next) =>
  controller.updateJob(req, res, next)
)

export default jobRouter