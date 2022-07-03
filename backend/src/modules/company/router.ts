import { Router } from "express";
import { controller } from ".";

const companyRouter: Router = Router()

companyRouter.post("/createProfile", (req, res, next) =>
  controller.createProfile(req, res, next)
)

companyRouter.get("/getProfile:id",  (req, res, next) =>
controller.getProfile(req, res, next)
)

export default companyRouter