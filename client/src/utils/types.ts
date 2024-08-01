export type TUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  bio?: string;
  joinedAt: Date;
};

export enum Role {
  USER = "USER",
  SUPER_USER = "SUPER_USER",
  ADMIN = "ADMIN",
}
