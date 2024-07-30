import { Request, Response } from "express";
import { getUser } from "../../services/users/getUser";

// @desc    get a user
// @route   GET /api/v1/users/:id
// @access  Private  (owners)
// @param   {string} id - User ID.
export const getUserController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await getUser(id);

  res.status(200).json(data);
};
