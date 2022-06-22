import { Router } from "express";
import { userController } from ".";

const userRouter: Router = Router();

userRouter.route('/register').post(userController.register)

export default userRouter