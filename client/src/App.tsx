import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import ErrorPage from "./pages/error-page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Profile from "./pages/users/profile";
import UsersList from "./pages/users/userList";
import Dashboard from "./pages/users/dashboard";
import EditUser from "./pages/users/editUser";
import ProtectedRoute from "./components/protectedRoute";
import { Permission } from "./utils/types";
import { useRefreshToken } from "./hooks/useRefreshToken";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/editProfile",
            element: <EditUser />,
          },
        ],
      },
      {
        path: "/users",
        element: <ProtectedRoute permission={Permission.SUPER} />,
        children: [
          {
            path: "",
            element: <UsersList />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute permission={Permission.ADMIN} />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
function App() {
  useRefreshToken();
  return <RouterProvider router={router} />;
}

export default App;
