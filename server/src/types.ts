import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export enum Role {
  USER = "USER",
  SUPER_USER = "SUPER_USER",
  ADMIN = "ADMIN",
}

export type RefreshPyload = JwtPayload & {
  id: string;
};

export type DecodedData = JwtPayload & {
  id: string;
  email: string;
  role: Role;
};

export type authenticatedRequest = Request & DecodedData;
