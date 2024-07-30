import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/customErrors";
import { TEditUser } from "../../validators/zodTypes";
import { prisma } from "../../utils/initPrisma";

export const editUser = async (id: string, userData: TEditUser) => {
  if (userData.email) {
    const existedUser = await prisma.user.findUnique({
      where: {
        NOT: {
          id: {
            equals: id,
          },
        },
        email: userData.email,
      },
    });

    if (existedUser) {
      throw new CustomError("Email already taken", 400);
    }
  }

  if (userData.password) {
    const newHashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = newHashedPassword;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...userData,
    },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      role: true,
      createdAt: true,
    },
  });

  return updatedUser;
};
