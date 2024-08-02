import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../../utils/customErrors";
import { prisma } from "../../utils/initPrisma";
import { RefreshPyload } from "../../types";

export const refreshAccessToken = async (refreshToken: string) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

  if (!refreshToken) {
    throw new CustomError("invalid token", 401);
  }
  try {
    const payload = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as RefreshPyload;

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new CustomError("Unauthorized user", 401);
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

    return accessToken;
  } catch (error: any) {
    console.log(error.message);
    throw new CustomError(error.message, 401);
  }
};
