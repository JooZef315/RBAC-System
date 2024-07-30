import jwt from "jsonwebtoken";
import { CustomError } from "./customErrors";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";

export const verifyToken = (authHeader: string | undefined) => {
  const token = authHeader?.split(" ")[1] || "";

  if (!token) {
    throw new CustomError("invalid token", 401);
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return payload;
  } catch (error: any) {
    throw new CustomError(error.message, 401);
  }
};
