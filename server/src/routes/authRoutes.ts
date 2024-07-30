import express from "express";
import asyncHandler from "express-async-handler";
import {
  loginController,
  refreshController,
  logoutController,
  signupController,
} from "../controllers";
import { authenticateUser } from "../middlewares/authMiddlewares/authenticateUserMiddleware";

export const authRouter = express.Router();

authRouter.post("/signup", asyncHandler(signupController));

authRouter.post("/login", asyncHandler(loginController));

authRouter.get("/refresh", asyncHandler(refreshController));

authRouter.post(
  "/logout",
  asyncHandler(authenticateUser),
  asyncHandler(logoutController)
);
