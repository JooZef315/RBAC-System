import { Request, Response } from "express";
import { validateCreateUserDto } from "../../validators/userValidator";
import { CustomError } from "../../utils/customErrors";
import { createUser } from "../../services/auth/createUser";

// @desc    signup
// @route   POST /api/v1/auth/signup
// @access  Public
export const signupController = async (req: Request, res: Response) => {
  const { userData, error } = validateCreateUserDto(req.body);
  if (error) {
    throw new CustomError(error.message, 400);
  }

  const newUser = await createUser(userData);

  res.status(200).json({
    message: `new user ${newUser.name} was created successfully, please login`,
  });
};
