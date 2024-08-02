import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Permission, Role } from "../utils/types";
import UnauthorizedPage from "../pages/unauthorized-page";

type PropsType = {
  permission?: Permission;
};

export default function ProtectedRoute({ permission }: PropsType) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const payload = useAuthStore((state) => state.payload);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  if (permission == Permission.ADMIN && payload?.role != Role.ADMIN) {
    return <UnauthorizedPage text="Only Admins can access this page!" />;
  }

  if (permission == Permission.SUPER && payload?.role == Role.USER) {
    return (
      <UnauthorizedPage text="Only Admins and Super Users can access this page!" />
    );
  }

  return <Outlet />;
}
