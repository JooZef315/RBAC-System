import userImg from "../../assets/user.jpg";

export default function Navbar() {
  return (
    <nav className="bg-white flex justify-around items-center py-4 mx-auto shadow-sm sticky top-0 z-50">
      <h3 className="font-bold text-xl text-blue-900">Knb task</h3>
      <ul className="hidden sm:flex justify-center items-center gap-3 text-gray-500 text-sm">
        <li className="hover:text-gray-800">
          <a href="/">Home</a>
        </li>
        <li className="hover:text-gray-800">
          <a href="/profile">Profile</a>
        </li>
        <li className="hover:text-gray-800">
          <a href="/users">Users</a>
        </li>
        <li className="hover:text-gray-800">
          <a href="/dashboard">DashBoard</a>
        </li>
      </ul>
      <div className="flex">
        {/* <ul className="hidden sm:flex justify-center items-center gap-3 text-gray-500 text-sm">
          <li className="hover:text-gray-800">
            <a href="/signup">Sign Up</a>
          </li>
          <li className="hover:text-gray-800">
            <a href="/login">Log in</a>
          </li>
        </ul> */}
        <a href="/profile">
          <img src={userImg} className="h-8 w-8 rounded-full" />
        </a>
      </div>
      <div className="sm:hidden flex flex-col gap-1">
        <div className="h-1 w-5 bg-black rounded-md"></div>
        <div className="h-1 w-5 bg-black rounded-md"></div>
        <div className="h-1 w-5 bg-black rounded-md"></div>
      </div>
    </nav>
  );
}
