import express from "express";
import { authRouter } from "./authRoutes";
import { usersRouter } from "./usersRoutes";

export const rootRouter = express.Router();

rootRouter.get("/", async (req, res) => {
  res.send("OK!");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
