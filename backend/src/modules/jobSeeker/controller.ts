import express, { Request, Response, NextFunction } from "express";
import ApiError from "../../helpers/ApiError";
import { IJobSeekerService } from "./service";
import { RequestCreateProfileDto } from "./dto";
import fileUpload from 'express-fileupload'

function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
  return typeof file === 'object' && (file as UploadedFile).name !== undefined;
}

type FileArray = fileUpload.FileArray;
type UploadedFile = fileUpload.UploadedFile;
type Options = fileUpload.Options;


function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
  return Array.isArray(file);
}

export interface IJobSeekerController {
  service: IJobSeekerService;
  createProfile(req: Request, res: Response, next: NextFunction): Promise<void>
  getProfile(req: Request, res: Response, next: NextFunction): Promise<void> 
  updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> 
}

export default class JobSeekerController implements IJobSeekerController {
  service: IJobSeekerService;

  constructor(service: IJobSeekerService) {
    this.service = service;
  }

  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
       const createProfileDto = new RequestCreateProfileDto(req.body);
       const dtoErrors = await createProfileDto.isValid(createProfileDto);
      if (!!dtoErrors) throw new ApiError(400, dtoErrors);
      
      const result = await this.service.createProfile(req.body);
      res.status(201).json({ payload: result.payload, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = +req.params.id
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
      const id: number = +req.params.id
      let result

      if (req.files != null && typeof req.files?.CV !== 'undefined') {
        const file = req.files.CV
        if (isSingleFile(file)) {
          file.data.toString("base64")
          result = await this.service.updateProfile({ CV: file.data }, id)
        }
      } else {
        result = await this.service.updateProfile(req.body, id)
      }
      
      result?.success
        ? res.status(200).json({ data: result.payload, message: result.message })
        : res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}


