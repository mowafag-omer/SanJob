import { Router } from "express";
import { controller } from ".";

const applicantRouter: Router = Router()

applicantRouter.post("/createProfile", (req, res, next) =>
  controller.createProfile(req, res, next)
)

applicantRouter.get("/getApplicantProfile:id",  (req, res, next) =>
controller.getProfile(req, res, next)
)

applicantRouter.post("/updateApplicantProfile:id",  (req, res, next) =>
controller.updateProfile(req, res, next)
)