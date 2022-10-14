import JobOffer from "./entity";
import JobOfferController from "./controller";
import JobOfferRepository from "./repository";
import JobOfferService from "./service";
import jobOfferRouter from "./router";

const repository = new JobOfferRepository(JobOffer)
const service = new JobOfferService(repository)
const controller = new JobOfferController(service)

export { JobOffer, controller, jobOfferRouter }
