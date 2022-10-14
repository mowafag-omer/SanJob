import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserRepo } from "./repository";
import { ServicReturnType, userProps } from "./types";
import config from "../../config/constants";
import { generateAccessToken, generateRefreshToken } from "../../helpers/jwt";

export interface IUserService {
  userRepo: IUserRepo;
  registerUser(props: userProps): Promise<ServicReturnType>;
  login(props: userProps): Promise<any>;
  getUser(email: string): Promise<any>;
}

export default class UserService implements IUserService {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async registerUser(props: userProps): Promise<ServicReturnType> {
    const { email, password, role } = props;
    const userExists = await this.userRepo.exists(email, role);
    if (userExists) return { success: false, message: "User already exist !" };

    const hashedPass = await bcrypt.hash(password, 10);
    props.password = hashedPass;
    props.email = email.toLowerCase();

    const user = await this.userRepo.create(props);

    const result = {
      id: user.id,
      email: user.email,
      role: user.role,
      hasProfile: user.hasProfile,
    };
    const access_token = generateAccessToken(result);

    const refresh_token = generateRefreshToken(user.email);

    return {
      success: true,
      message: "User registered successfully !",
      payload: { access_token, refresh_token },
    };
  }

  async login(props: userProps): Promise<any> {
    const user = await this.userRepo.getUserByEmail(props.email);
    if (!user)
      return { success: false, message: "Incorrect email or password" };

    const checkPass = bcrypt.compareSync(props.password, user.password);
    if (!checkPass)
      return { success: false, message: "incorrect email or password" };

    const access_token = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
      hasProfile: user.hasProfile,
    });

    const refresh_token = generateRefreshToken(user.email);

    return {
      success: true,
      payload: { access_token, refresh_token },
      message: "",
    };
  }

  async getUser(email: any): Promise<any> {
    const result = await this.userRepo.getUserByEmail(email as string);

    if (result) {
      return { sucess: true, payload: result };
    } else {
      return { sucess: false };
    }
  }
}
