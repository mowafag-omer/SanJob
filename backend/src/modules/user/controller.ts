import { Request, Response, NextFunction } from "express"
import ApiError from "../../helpers/ApiError"
import { IuserService } from "./service"

export interface IuserController {
  userService: IuserService
  register(req: Request, res: Response, next: NextFunction): any
}

export default class UserController implements IuserController {
  userService: IuserService

  constructor(userService: IuserService) {
    this.userService = userService
  } 

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.registerUser(req.body)
      
      if(result.success)
        res.status(201).json({message: 'User registered successfully !'})
      
      if(!result.success)
        throw new ApiError(409, 'User already exist !')

    } catch (error) {            
      next(error)
    }
  }
}

// export default class UserController {
//   userService: any

//   constructor(userService: any) {
//     this.userService = userService    
//   } 

//   register = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await this.userService.registerUser(req.body)
      
//       if (result.success)
//       res.status(201).json({message: 'User registered successfully !'})

//     } catch (error) {            
//       next(error)
//     }
//   }
// }