import { User, userRouter } from "./user"
import { JobSeeker, jobSeekerRouter } from "./jobSeeker";
import { Company, companyRouter } from "./company";

const entities = { User, JobSeeker, Company }
const routers = { 
  '/user': userRouter, 
  '/jobSeeker': jobSeekerRouter,
  '/company': companyRouter
}

export { entities, routers }