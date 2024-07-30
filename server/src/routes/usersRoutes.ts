import express from "express";
import asyncHandler from "express-async-handler";
import {
  assignRolesController,
  deleteUserController,
  editUserController,
  getUserController,
  getUsersController,
} from "../controllers";
import { verifyAdmin } from "../middlewares/authMiddlewares/verifyAdminMiddleware";
import { authenticateUser } from "../middlewares/authMiddlewares/authenticateUserMiddleware";
import { verifyOwner } from "../middlewares/authMiddlewares/verifyOwnerMiddleware";
import { verifySuperUser } from "../middlewares/authMiddlewares/verifySuperUserMiddleware";

export const usersRouter = express.Router();

usersRouter.use(asyncHandler(authenticateUser));

usersRouter.get(
  "/",
  asyncHandler(verifySuperUser),
  asyncHandler(getUsersController)
);

usersRouter
  .route("/:id")
  .get(asyncHandler(verifyOwner), asyncHandler(getUserController))
  .put(asyncHandler(verifyOwner), asyncHandler(editUserController))
  .delete(asyncHandler(verifyOwner), asyncHandler(deleteUserController));

//assigning roles
usersRouter.put(
  "/:id/roles",
  asyncHandler(verifyAdmin),
  asyncHandler(assignRolesController)
);
