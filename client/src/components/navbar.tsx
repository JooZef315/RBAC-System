import { Link } from "react-router-dom";
import userImg from "../../assets/user.jpg";

export default function Navbar() {
  return (
    <nav className="bg-white flex justify-around items-center py-4 mx-auto shadow-sm sticky top-0 z-50">
      <h3 className="font-bold text-xl text-blue-900">Knb task</h3>
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
        <ul className="flex justify-center items-center gap-3 text-gray-500 text-sm">
          <li className="hover:text-gray-800">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="hover:text-gray-800">
            <Link to="/login">Log in</Link>
          </li>
        </ul>
        <div className="hidden sm:flex gap-3">
          <Link to="/profile">
            <img src={userImg} className="h-8 w-8 rounded-full" />
          </Link>
          <button
            type="button"
            className="text-gray-500 text-sm hover:text-gray-800"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="sm:hidden flex flex-col gap-1">
        <div className="h-1 w-5 bg-black rounded-md"></div>
        <div className="h-1 w-5 bg-black rounded-md"></div>
        <div className="h-1 w-5 bg-black rounded-md"></div>
      </div>
    </nav>
  );
}
