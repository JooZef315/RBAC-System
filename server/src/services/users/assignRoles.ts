import { Role } from "../../types";
import { CustomError } from "../../utils/customErrors";
import { prisma } from "../../utils/initPrisma";

export const assignRoles = async (id: string, role: Role) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
    select: {
      id: true,
      role: true,
    },
  });

  return updatedUser;
};
