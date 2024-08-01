import { create } from "zustand";
import { TUser } from "../utils/types";

type UserState = {
  user: TUser | null;
  setUser: (userDate: TUser) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser(userDate) {
    set({ user: userDate });
  },
}));
