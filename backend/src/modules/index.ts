import { User, userRouter } from "./user"
import { JobSeeker, jobSeekerRouter } from "./jobSeeker";
import { Company, companyRouter } from "./company";
import { JobOffer, jobOfferRouter } from "./jobOffer";
import { Application, applicationRouter } from "./application";

const entities = { User, JobSeeker, Company, JobOffer, Application }
const routers = { 
  '/user': userRouter, 
  '/jobSeeker': jobSeekerRouter,
  '/company': companyRouter,
  '/jobOffer': jobOfferRouter,
  '/application': applicationRouter 
}

export { entities, routers }