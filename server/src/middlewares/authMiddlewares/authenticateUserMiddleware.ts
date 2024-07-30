import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../utils/customErrors";
import { verifyToken } from "../../utils/verifyToken";
import { getUser } from "../../services/users/getUser";
import { authenticatedRequest, DecodedData } from "../../types";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedData = verifyToken(req.headers.authorization) as DecodedData;

  const user = await getUser(decodedData?.id);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  (req as authenticatedRequest).user = decodedData;

  next();
};
