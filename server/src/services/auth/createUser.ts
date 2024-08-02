import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/customErrors";
import { TCreateUser } from "../../validators/zodTypes";
import { prisma } from "../../utils/initPrisma";
import { Role } from "@prisma/client";

export const createUser = async (userData: TCreateUser) => {
  const existedUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existedUser) {
    throw new CustomError("user already exists!", 400);
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: Role.USER,
      bio: !userData.bio?.length ? null : userData.bio,
    },
    select: {
      name: true,
    },
  });

  return newUser;
};
