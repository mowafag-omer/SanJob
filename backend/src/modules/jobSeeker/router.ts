import { Router } from "express";
import { controller } from ".";

const jobSeekerRouter: Router = Router()

jobSeekerRouter.post("/createProfile", (req, res, next) =>
  controller.createProfile(req, res, next)
)

jobSeekerRouter.get("/getJobSeekerProfile:id",  (req, res, next) =>
controller.getProfile(req, res, next)
)

jobSeekerRouter.post("/updateJobSeekerProfile:id",  (req, res, next) =>
controller.updateProfile(req, res, next)
)

export default jobSeekerRouter