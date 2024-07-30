import { z } from "zod";
import { createUserDto, editUserDto } from "./zodSchemas";

export type TZodError = {
  message: string;
};

export type TCreateUser = z.infer<typeof createUserDto>;
export type TEditUser = z.infer<typeof editUserDto>;
