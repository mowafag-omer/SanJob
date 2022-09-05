import { Request, Response, NextFunction } from "express";
import { IJobService } from "./service";

export interface IJobController {
  service: IJobService;
  postJob(req: Request, res: Response, next: NextFunction): Promise<void>
  getCompayJobs(req: Request, res: Response, next: NextFunction): Promise<void> 
  getAllJobs(req: Request, res: Response, next: NextFunction): Promise<void> 
  updateJob(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default class JobController implements IJobController {
  service: IJobService;

  constructor(service: IJobService) {
    this.service = service;
  }

  async postJob(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.postJob(req.body);
      res.status(201).json({ payload: result.payload, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async getCompayJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number= +req.params.id
      const result = await this.service.getCompayJobs(id)
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async getAllJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.getJobs()
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async updateJob(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = +req.params.id
      const result = await this.service.updateJob(req.body, id)
      result.success
        ? res.status(200).json({ payload: result.payload, message: result.message })
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

}
