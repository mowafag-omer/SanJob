import { Router } from "express";
import { controller } from ".";

const userRouter: Router = Router();

userRouter.post("/register", (req, res, next) =>
  controller.register(req, res, next)
);

userRouter.post("/login", (req, res, next) =>
  controller.login(req, res, next)
);

userRouter.get("/refresh", (req, res, next) =>
  controller.refresh(req, res, next)
);

userRouter.get("/logout", (req, res, next) =>
  controller.logout(req, res, next)
);

export default userRouter;
