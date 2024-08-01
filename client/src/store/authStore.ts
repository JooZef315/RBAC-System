import { create } from "zustand";
import { Payload } from "../utils/types";
import { jwtDecode } from "jwt-decode";

type AuthState = {
  isLoggedIn: boolean;
  jwtToken: string | null;
  payload: Payload | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  jwtToken: null,
  payload: null,
  login(token) {
    try {
      const decodedJwt = jwtDecode<Payload>(token);
      set({ isLoggedIn: true, jwtToken: token, payload: decodedJwt });
    } catch (error) {
      console.log(error);
    }
  },
  logout() {
    set({ isLoggedIn: false, jwtToken: null, payload: null });
  },
}));
