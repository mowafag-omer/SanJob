import bcrypt from "bcrypt";
import ApiError from "../../helpers/ApiError";
import { IuserRepo } from "./repository";
import { userProps } from "./userTypes";

export interface IuserService {
  userRepo: IuserRepo
  registerUser(user: userProps): Promise<any>
}

export default class UserService implements IuserService{
  userRepo: IuserRepo
  constructor(userRepo: IuserRepo) {
    this.userRepo = userRepo
  }

  registerUser = async (user: userProps):  Promise<any> => {
    const { email, password, type } = user
    
    try {
      const userExists = await this.userRepo.exists(email, type)

      if(userExists) {        
        return { success: false}
      }

      const hashedPass = await bcrypt.hash(password, 10)
      user.password = hashedPass

      await this.userRepo.create(user)
      return { success: true }

    } catch(error) {      
      return error
    }
  }
}