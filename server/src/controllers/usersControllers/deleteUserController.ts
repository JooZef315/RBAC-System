import { Request, Response } from "express";
import { deleteUser } from "../../services/users/deleteUser";

// @desc    delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private (owners)
// @param   {string} id - User ID.
export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteddUser = await deleteUser(id);

  res.status(200).json({
    message: `${deleteddUser.name} user was deleted successfully`,
  });
};
