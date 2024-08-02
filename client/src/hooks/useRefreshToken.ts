import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export const useRefreshToken = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/refresh",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();

      if (response.status == 200) {
        login(result.accessToken);
      } else {
        logout();
      }
    };

    refreshAccessToken();

    const interval = setInterval(refreshAccessToken, 14 * 60 * 1000); // Refresh every 15 minutes
    return () => clearInterval(interval);
  }, [login, logout]);
};
