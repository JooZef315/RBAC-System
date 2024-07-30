import { prisma } from "../../utils/initPrisma";

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
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

  return user;
};
