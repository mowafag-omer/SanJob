import { Router } from "express";
import checkAuth from "../../middlewares/auth";
import { controller } from ".";

const jobSeekerRouter: Router = Router()

jobSeekerRouter.post("/createProfile", checkAuth, (req, res, next) =>
  controller.createProfile(req, res, next)
)

jobSeekerRouter.get("/getJobSeekerProfile/:id", checkAuth, (req, res, next) =>
  controller.getProfile(req, res, next)
)

jobSeekerRouter.post("/updateJobSeekerProfile/:id", checkAuth, (req, res, next) =>
  controller.updateProfile(req, res, next)
)

export default jobSeekerRouter