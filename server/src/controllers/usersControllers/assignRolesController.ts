import { Request, Response } from "express";

// @desc    change user roles
// @route   PUT /api/v1/users/:id/roles
// @access  Private (admins)
// @param   {string} id - User ID.
export const assignRolesController = async (req: Request, res: Response) => {};
