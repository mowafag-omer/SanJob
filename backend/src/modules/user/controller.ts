import { Request, Response, NextFunction } from "express";
import ApiError from "../../helpers/ApiError";
import { IUserService } from "./service";
import { RequestCreateUserDto } from "./dto";

export interface IuserController {
  userService: IUserService;
  register(req: Request, res: Response, next: NextFunction): any;
}

export default class UserController implements IuserController {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const requestUserDto = new RequestCreateUserDto(req.body);
      const dtoErrors = await requestUserDto.isValid(requestUserDto);
      if (!!dtoErrors) throw new ApiError(400, dtoErrors);

      req.body.hasProfile = false

      const result = await this.userService.registerUser(req.body);
      
      if (!result.success) throw new ApiError(409, result.message);

      const { access_token, refresh_token } = result.payload;
      const expireAt = new Date(Date.now() + 30 * 86400 * 1000);

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        expires: expireAt,
      });

      if (result.success) res.status(201).json({ message: result.message, token: access_token });

    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.login(req.body);

      if (!result.success) throw new ApiError(400, result?.message);

      if (result.success) {
        const { access_token, refresh_token } = result.payload;
        const expireAt = new Date(Date.now() + 30 * 86400 * 1000);

        // res.header("authorization", `Bearer ${access_token}`);
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          expires: expireAt,
        });

        res.status(200).json({token: access_token});
      }
    } catch (error) {
      next(error);
    }
  }
}
