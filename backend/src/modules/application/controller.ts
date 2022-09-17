import { Request, Response, NextFunction } from "express";
import { IApplicationService } from "./service";

export interface IApplicationController {
  service: IApplicationService;
  createApplication(req: Request, res: Response, next: NextFunction): Promise<void>
  getJobseekerApp(req: Request, res: Response, next: NextFunction): Promise<void> 
  getJobApp(req: Request, res: Response, next: NextFunction): Promise<void> 
  getCompanyJobsApp(req: Request, res: Response, next: NextFunction): Promise<void> 
  updateApplication(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default class ApplicationController implements IApplicationController {
  service: IApplicationService;

  constructor(service: IApplicationService) {
    this.service = service; 
  }

  async createApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.createApplication(req.body);
      if (result.success)
        res.status(201).json({ data: result.payload, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async getJobseekerApp(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number= +req.params.id
      const result = await this.service.getJobseekerApp(id)
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async getJobApp(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number= +req.params.id
      const result = await this.service.getJobApp(id)
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async getCompanyJobsApp(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number= +req.params.id
      const result = await this.service.getCompanyJobsApp(id)
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async updateApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = +req.params.id
      const result = await this.service.updateApplication(req.body, id)
      result.success
        ? res.status(200).json({ payload: result.payload, message: result.message })
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}
