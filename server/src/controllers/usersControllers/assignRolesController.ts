import { Request, Response } from "express";
import { Role } from "../../types";
import { assignRoles } from "../../services/users/assignRoles";
import { CustomError } from "../../utils/customErrors";

// @desc    change user roles
// @route   PUT /api/v1/users/:id/roles
// @access  Private (admins)
// @param   {string} id - User ID.
export const assignRolesController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const newRole: Role = req.body.role;

  if (!Object.values(Role).includes(newRole)) {
    throw new CustomError("Invalid Role", 400);
  }

  const { role } = await assignRoles(userId, newRole);

  res.status(200).json({
    message: `User's role was updated successfully to ${role}`,
  });
};
