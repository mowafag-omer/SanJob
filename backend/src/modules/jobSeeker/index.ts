import JobSeekerController from "./controller";
import JobSeeker from "./entity";
import JobSeekerRepository from "./repository";
import JobSeekerService from "./service";
import jobSeekerRouter from "./router";

const repository = new JobSeekerRepository(JobSeeker)
const service = new JobSeekerService(repository)
const controller = new JobSeekerController(service)

export { JobSeeker, controller, jobSeekerRouter}