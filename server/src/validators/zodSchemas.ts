import { z } from "zod";

export const createUserDto = z
  .object({
    name: z.string().trim().min(1, { message: "name is required" }),
    email: z.string().email("This is not a valid email.").toLowerCase(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    bio: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const createUserDtoZodSchema = createUserDto._def.schema;

const editUserDtoZodSchema = createUserDtoZodSchema.partial();

export const editUserDto = editUserDtoZodSchema.refine(
  (data) => {
    if (data.confirmPassword || data.password) {
      return data.confirmPassword === data.password;
    }
    return true;
  },
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);
