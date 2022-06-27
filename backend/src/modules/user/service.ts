import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IuserRepo } from "./repository";
import { userProps } from "./types";
import config from "../../config/constants";

export interface IuserService {
  userRepo: IuserRepo;
  registerUser(props: userProps): Promise<any>;
  login(props: userProps): Promise<any>;
}

export default class UserService implements IuserService {
  userRepo: IuserRepo;

  constructor(userRepo: IuserRepo) {
    this.userRepo = userRepo;
  }

  async registerUser(props: userProps): Promise<any> {
    const { email, password, role } = props;
    try {
      const userExists = await this.userRepo.exists(email, role);
      if (userExists)
        return { success: false, message: "User already exist !" };

      const hashedPass = await bcrypt.hash(password, 10);
      props.password = hashedPass;
      props.email = email.toLowerCase()

      await this.userRepo.create(props);
      return { success: true, message: "User registered successfully !" };
    } catch (error) {
      throw error;
    }
  }

  async login(props: userProps): Promise<any> {
    try {
      const user = await this.userRepo.getUserByEmail(props.email);
      if (!user)
        return { success: false, message: "Incorrect email or password" };

      const checkPass = bcrypt.compareSync(props.password, user.password);
      if (!checkPass)
        return { success: false, message: "incorrect email or password" };

      const access_token = jwt.sign(
        { id: user.id, email: user.email, type: user.role },
        config.JWT_SECRET,
        { expiresIn: "2h" }
      );

      const refresh_token = jwt.sign(
        { id: user.id }, 
        config.JWT_SECRET, 
        { expiresIn: "24h" }
      );

      return { success: true, payload: { access_token, refresh_token } };
    } catch (error) {
      throw error;
    }
  }
}
