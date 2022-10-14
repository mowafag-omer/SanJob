import { Request, Response, NextFunction } from "express";
import { IJobOfferService } from "./service";

export interface IJobOfferController {
  service: IJobOfferService;
  postJobOffer(req: Request, res: Response, next: NextFunction): Promise<void>
  getCompayJobOffers(req: Request, res: Response, next: NextFunction): Promise<void> 
  getAllJobOffers(req: Request, res: Response, next: NextFunction): Promise<void> 
  updateJobOffer(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default class JobOfferController implements IJobOfferController {
  service: IJobOfferService;

  constructor(service: IJobOfferService) {
    this.service = service;
  }

  async postJobOffer(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.contract_type = JSON.stringify(req.body.contract_type)
      const result = await this.service.postJobOffer(req.body);
      if (result.success)
        res.status(201).json({ payload: result.payload, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async getCompayJobOffers(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number= +req.params.id
      const result = await this.service.getCompayJobOffers(id)
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async getAllJobOffers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.getJobOffers()
      result.success
        ? res.status(200).json(result.payload)
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async updateJobOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = +req.params.id
      req.body.contract_type = JSON.stringify(req.body.contract_type)
      const result = await this.service.updateJobOffer(req.body, id)
      result.success
        ? res.status(200).json({ payload: result.payload, message: result.message })
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

}
