import { Router } from "express";
import { controller } from ".";

const applicationRouter: Router = Router()

applicationRouter.post("/apply", (req, res, next) =>
  controller.createApplication(req, res, next)
)

applicationRouter.get("/getJobSeekerApplications/:id", (req, res, next) =>
  controller.getJobseekerApp(req, res, next)
)

applicationRouter.get("/getJobApplications/:id", (req, res, next) =>
  controller.getJobApp(req, res, next)
)

applicationRouter.get("/getCompanyApplications/:id", (req, res, next) =>
  controller.getCompanyJobsApp(req, res, next)
)

applicationRouter.post("/updateApplication/:id", (req, res, next) =>
  controller.updateApplication(req, res, next)
)

export default applicationRouter