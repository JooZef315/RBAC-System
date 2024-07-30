import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/customErrors";
import { prisma } from "../../utils/initPrisma";

export const logIn = async (email: string, password: string) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new CustomError("wrong email or passowrd", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new CustomError("wrong email or passowrd", 401);
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
