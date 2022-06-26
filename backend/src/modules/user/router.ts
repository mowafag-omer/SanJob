import { Router } from "express";
import { userController } from ".";

const userRouter: Router = Router();

userRouter.post("/register", (req, res, next) =>
  userController.register(req, res, next)
);

userRouter.post("/login", (req, res, next) =>
  userController.login(req, res, next)
);

export default userRouter;
