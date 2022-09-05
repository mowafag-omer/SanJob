import Company from "./entity";
import CompanyController from "./controller";
import CompanyRepository from "./repository";
import CompanyService from "./service";
import companyRouter from "./router";

const repository = new CompanyRepository(Company)
const service = new CompanyService(repository)
const controller = new CompanyController(service)

export { Company, controller, companyRouter }