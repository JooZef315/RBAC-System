import { generateZodCustomError } from "../utils/customErrors";
import { createUserDto, editUserDto } from "./zodSchemas";
import { TCreateUser, TEditUser, TZodError } from "./zodTypes";

export const validateCreateUserDto = (reqData: TCreateUser) => {
  const parsedData = createUserDto.safeParse(reqData);
  if (!parsedData.success) {
    const error: TZodError = generateZodCustomError(parsedData.error);
    return { userData: null, error };
  } else {
    const userData: TCreateUser = parsedData.data;
    return { userData, error: null };
  }
};

export const validateEditUserDto = (reqData: TEditUser) => {
  const parsedData = editUserDto.safeParse(reqData);
  if (!parsedData.success) {
    const error: TZodError = generateZodCustomError(parsedData.error);
    return { userData: null, error };
  } else {
    const userData: TEditUser = parsedData.data;
    return { userData, error: null };
  }
};
