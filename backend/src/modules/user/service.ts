import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserRepo } from "./repository";
import { ServicReturnType, userProps } from "./types";
import config from "../../config/constants";

export interface IUserService {
  userRepo: IUserRepo;
  registerUser(props: userProps): Promise<ServicReturnType>;
  login(props: userProps): Promise<any>;
}

export default class UserService implements IUserService {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async registerUser(props: userProps): Promise<ServicReturnType> {
    const { email, password, role } = props;
    const userExists = await this.userRepo.exists(email, role);
    if (userExists)
      return { success: false, message: "User already exist !" };

    const hashedPass = await bcrypt.hash(password, 10);
    props.password = hashedPass;
    props.email = email.toLowerCase()

    const user = await this.userRepo.create(props);

    const result = {
      id: user.id, 
      email: user.email, 
      type: user.role, 
      hasProfile: user.hasProfile
    }
    const access_token = jwt.sign(
      { result },
      config.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const refresh_token = jwt.sign(
      { id: user.id }, 
      config.JWT_SECRET, 
      { expiresIn: "24h" }
    );

    return { 
      success: true, 
      message: "User registered successfully !", 
      payload: { access_token, refresh_token } 
    };
  }

  async login(props: userProps): Promise<any> {
    const user = await this.userRepo.getUserByEmail(props.email);
    if (!user)
      return { success: false, message: "Incorrect email or password" };

    const checkPass = bcrypt.compareSync(props.password, user.password);
    if (!checkPass)
      return { success: false, message: "incorrect email or password" };

    const access_token = jwt.sign(
      { id: user.id, email: user.email, type: user.role, hasProfile: user.hasProfile },
      config.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const refresh_token = jwt.sign(
      { id: user.id }, 
      config.JWT_SECRET, 
      { expiresIn: "24h" }
    );

    return { success: true, payload: { access_token, refresh_token }, message:''};
  }
}
