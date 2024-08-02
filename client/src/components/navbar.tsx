import { Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/user.jpg";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:3001/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: "include",
    });

    if (response.status == 200) {
      const result = await response.json();
      console.log(result);
      logout();
      navigate("/");
    } else {
      console.log(response);
    }
  };

  return (
    <nav className="bg-white flex justify-around items-center h-14 py-4 mx-auto shadow-sm sticky top-0 z-50">
      <h3 className="font-bold text-xl text-gray-800">Knb task</h3>
      <ul className="hidden sm:flex justify-center items-center gap-3 text-gray-500 text-sm">
        <li className="hover:text-gray-800">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-800">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="hover:text-gray-800">
          <Link to="/users">Users</Link>
        </li>
        <li className="hover:text-gray-800">
          <Link to="/dashboard">DashBoard</Link>
        </li>
      </ul>
      <div className="hidden sm:flex gap-2">
        {!isLoggedIn ? (
          <ul className="flex justify-center items-center gap-3 text-gray-500 text-sm">
            <li className="hover:text-gray-800">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="hover:text-gray-800">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        ) : (
          <div className="hidden sm:flex gap-3">
            <Link to="/profile">
              <img src={userImg} className="h-8 w-8 rounded-full" />
            </Link>
            <button
              type="button"
              className="text-gray-500 text-sm hover:text-gray-800"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
      <div
        className="sm:hidden flex flex-col gap-1 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-1 w-5 bg-black rounded-md"></div>
        <div className="h-1 w-5 bg-black rounded-md"></div>
        <div className="h-1 w-5 bg-black rounded-md"></div>
      </div>

      {/* modal */}
      {isOpen && (
        <div className="absolute text-gray-500 top-14 left-0 w-full h-screen z-50 bg-gray-50 flex flex-col gap-1 justify-center items-center">
          <ul>
            {isLoggedIn ? (
              <>
                <li className="hover:text-gray-800">
                  <Link to="/profile">
                    <img src={userImg} className="h-8 w-8 rounded-full" />
                  </Link>
                </li>
                <li className="hover:text-gray-800">
                  <button
                    type="button"
                    className="text-gray-500 text-sm hover:text-gray-800"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-gray-800">
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="hover:text-gray-800">
                  <Link to="/login">Log in</Link>
                </li>
              </>
            )}
            <li className="hover:text-gray-800 mt-3">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-gray-800">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:text-gray-800">
              <Link to="/users">Users</Link>
            </li>
            <li className="hover:text-gray-800">
              <Link to="/dashboard">DashBoard</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
