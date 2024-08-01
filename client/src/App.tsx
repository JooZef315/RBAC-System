import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import ErrorPage from "./pages/error-page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Profile from "./pages/users/profile";
import UsersList from "./pages/users/userList";
import Dashboard from "./pages/users/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/users",
        element: <UsersList />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
