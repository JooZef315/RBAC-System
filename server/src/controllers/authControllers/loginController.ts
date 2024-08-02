import { Request, Response } from "express";
import { logIn } from "../../services/auth/logIn";
import { CustomError } from "../../utils/customErrors";

// @desc    login
// @route   POST /api/v1/auth/login
// @access  Public
export const loginController = async (req: Request, res: Response) => {
  const email: string = req.body.email?.trim().toLowerCase() || "";
  const password: string = req.body.password || "";

  if (!email || !password) {
    throw new CustomError("email and passowrd required", 400);
  }

  const { accessToken, refreshToken } = await logIn(email, password);

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: false, //https
    sameSite: "lax", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry
  });

  res.status(200).json({ accessToken });
};
