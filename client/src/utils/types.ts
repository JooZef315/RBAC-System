export type TUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  bio?: string;
  createdAt: Date;
};

export enum Role {
  USER = "USER",
  SUPER_USER = "SUPER_USER",
  ADMIN = "ADMIN",
}

export enum Permission {
  SUPER = "SUPER",
  ADMIN = "ADMIN",
}

export type Payload = {
  id: string;
  email: string;
  role: Role;
  exp: number;
  iat: number;
};
