import { Router } from "express";
import { controller } from ".";

const companyRouter: Router = Router()

companyRouter.post("/createProfile", (req, res, next) =>
  controller.createProfile(req, res, next)
)

companyRouter.get("/getCompanyProfile/:id", (req, res, next) =>
  controller.getProfile(req, res, next)
)

companyRouter.get("/getProfiles", (req, res, next) =>
  controller.getAllProfiles(req, res, next)
)

companyRouter.post("/updateCompanyProfile/:id", (req, res, next) =>
  controller.updateProfile(req, res, next)
)

export default companyRouter