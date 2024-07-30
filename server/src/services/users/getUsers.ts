import { prisma } from "../../utils/initPrisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      role: true,
      createdAt: true,
    },
  });
  return users;
};
