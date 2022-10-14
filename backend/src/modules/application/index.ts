import Application  from "./entity"
import ApplicatonRepository from "./repository"
import ApplicationService from "./service"
import ApplicationController from "./controller"
import applicationRouter from "./router"

const repository = new ApplicatonRepository(Application)
const service = new ApplicationService(repository)
const controller = new ApplicationController(service)

export { Application, controller, applicationRouter }