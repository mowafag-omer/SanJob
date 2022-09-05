import { User, userRouter } from "./user"
import { JobSeeker, jobSeekerRouter } from "./jobSeeker";
import { Company, companyRouter } from "./company";
import { Job, jobRouter } from "./job";

const entities = { User, JobSeeker, Company, Job }
const routers = { 
  '/user': userRouter, 
  '/jobSeeker': jobSeekerRouter,
  '/company': companyRouter,
  '/job': jobRouter
}

export { entities, routers }