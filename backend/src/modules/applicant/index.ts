import ApplicantController from "./controller";
import Applicant from "./entity";
import ApplicantRepository from "./repository";
import ApplicantService from "./service";

const repository = new ApplicantRepository(Applicant)
const service = new ApplicantService(repository)
const controller = new ApplicantController(service)

export { Applicant, controller}