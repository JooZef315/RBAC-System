import { z } from "zod";

export const signUpSchema = z
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

const signUpZodSchema = signUpSchema._def.schema;

const editUserZodSchema = signUpZodSchema.partial();

export const editUserSchema = editUserZodSchema.refine(
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

export type TSignUp = z.infer<typeof signUpSchema>;
export type TEditUser = z.infer<typeof editUserSchema>;