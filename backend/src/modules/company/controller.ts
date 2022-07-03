import { Request, Response, NextFunction } from "express";
import ApiError from "../../helpers/ApiError";
import { ICompanyService } from "./service";

export interface ICompanyController {
  service: ICompanyService;
  createProfile(req: Request, res: Response, next: NextFunction): Promise<void>
  getProfile(req: Request, res: Response, next: NextFunction): Promise<void> 
}

export default class CompanyController implements ICompanyController {
  service: ICompanyService;

  constructor(service: ICompanyService) {
    this.service = service;
  }

  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
      //  const createProfileDto = new RequestCreateProfileDto(req.body);
      //  const dtoErrors = await createProfileDto.isValid(createProfileDto);
      // if (!!dtoErrors) throw new ApiError(400, dtoErrors);

      const result = await this.service.createProfile(req.body);
      res.status(201).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number= +req.params.id
      const result = await this.service.getProfileById(id)
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}
