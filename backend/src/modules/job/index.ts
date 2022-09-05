import Job from "./entity";
import JobController from "./controller";
import JobRepository from "./repository";
import JobService from "./service";
import jobRouter from "./router";

const repository = new JobRepository(Job)
const service = new JobService(repository)
const controller = new JobController(service)

export { Job, controller, jobRouter }
