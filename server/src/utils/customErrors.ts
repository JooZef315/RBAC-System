import { ZodError } from "zod";

export class CustomError extends Error {
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const generateZodCustomError = (zodError: ZodError) => {
  const errorMessage = `${zodError.errors[0].path[0]}, ${zodError.errors[0].message}`;
  return { message: errorMessage };
};
