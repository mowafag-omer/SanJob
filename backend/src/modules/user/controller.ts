import { Request, Response, NextFunction } from "express";
import ApiError from "../../helpers/ApiError";
import { IuserService } from "./service";
import { RequestCreateUserDto } from "./UserDto";

export interface IuserController {
  userService: IuserService;
  register(req: Request, res: Response, next: NextFunction): any;
}

export default class UserController implements IuserController {
  userService: IuserService;

  constructor(userService: IuserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const requestUserDto = new RequestCreateUserDto(req.body)
      const dtoErrors = await requestUserDto.isValid(requestUserDto)
      if(!!dtoErrors) throw new ApiError(400, dtoErrors)

      const result = await this.userService.registerUser(req.body);

      if (result.success)
        res.status(201).json({ message: "User registered successfully !" });

      if (!result.success) throw new ApiError(409, "User already exist !");
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.login(req.body)

      if (!result.success) throw new ApiError(400, result.message)

      if (result.success) {
        const { access_token, refresh_token } = result.payload
        const expireAt = new Date(Date.now() + (30 * 86400 * 1000))

        res.header("Authorization", `Bearer ${access_token}`);
        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          expires: expireAt 
        });

        res.status(200).json('u r in');
      }
      
    } catch (error) {
      next(error);
    }
  }
}
