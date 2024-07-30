import { Request, Response } from "express";
import { CustomError } from "../../utils/customErrors";

// @desc    logout
// @route   POST /api/v1/auth/logout
// @access  Private
export const logoutController = (req: Request, res: Response) => {
  const jwtCookie: string | null = req.cookies.jwt || null;

  if (!jwtCookie) {
    throw new CustomError("No Cookie", 204);
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  res.status(200).json({ message: "Cookies cleared!!" });
};
