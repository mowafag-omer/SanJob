import { Router } from "express";
import { controller } from ".";

const jobOfferRouter: Router = Router()

jobOfferRouter.post("/postJobOffer", (req, res, next) =>
  controller.postJobOffer(req, res, next)
)

jobOfferRouter.get("/getCompanyJobOffers/:id", (req, res, next) =>
  controller.getCompayJobOffers(req, res, next)
)

jobOfferRouter.get("/getAllJobOffers", (req, res, next) =>
  controller.getAllJobOffers(req, res, next)
)

jobOfferRouter.post("/updateJobOffer/:id", (req, res, next) =>
  controller.updateJobOffer(req, res, next)
)

export default jobOfferRouter