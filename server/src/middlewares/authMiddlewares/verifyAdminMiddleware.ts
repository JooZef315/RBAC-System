import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../utils/customErrors";
import { getUser } from "../../services/users/getUser";
import { authenticatedRequest, DecodedData, Role } from "../../types";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData: DecodedData = (req as authenticatedRequest).user;

  const user = await getUser(decodedData?.id);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  if (decodedData.role !== Role.ADMIN) {
    throw new CustomError("user Unauthorized", 401);
  }

  next();
};
