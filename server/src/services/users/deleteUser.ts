import { CustomError } from "../../utils/customErrors";
import { prisma } from "../../utils/initPrisma";
export const deleteUser = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return deletedUser;
};
