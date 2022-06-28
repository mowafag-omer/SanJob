import { Request, Response, NextFunction } from "express";
import ApiError from "../../helpers/ApiError";
import { IApplicantService } from "./service";
import { RequestCreateProfileDto } from "./dto";

export interface IApplicantController {
  service: IApplicantService;
  createProfile(req: Request, res: Response, next: NextFunction): Promise<void>
  getProfile(req: Request, res: Response, next: NextFunction): Promise<void> 
}

export default class ApplicantController implements IApplicantController {
  service: IApplicantService;

  constructor(service: IApplicantService) {
    this.service = service;
  }

  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
       const createProfileDto = new RequestCreateProfileDto(req.body);
       const dtoErrors = await createProfileDto.isValid(createProfileDto);
      if (!!dtoErrors) throw new ApiError(400, dtoErrors);

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

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.updateProfile(req.body)
      result.success
        ? res.status(200).json(result.message)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}
