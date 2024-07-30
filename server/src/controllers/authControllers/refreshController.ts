import { Request, Response } from "express";
import { refreshAccessToken } from "../../services/auth/refreshAccessToken";

// @desc    refresh the access token
// @route   GET /api/v1/auth/refresh
// @access  Private
export const refreshController = async (req: Request, res: Response) => {
  const refreshToken: string = req.cookies?.jwt || "";

  const accessToken = await refreshAccessToken(refreshToken);

  res.status(200).json({ accessToken });
};
