import { Request, Response } from "express";
import { getUsers } from "../../services/users/getUsers";

// @desc    get all users
// @route   GET /api/v1/users
// @access  Private (super users)
export const getUsersController = async (req: Request, res: Response) => {
  const data = await getUsers();
  res.status(200).json(data);
};
