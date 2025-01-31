import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import { useAuthStore } from "../store/authStore";

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <header className="flex sm:h-3/4 h-full max-w-6xl mx-auto mt-6  flex-col-reverse sm:flex-row gap-6 px-8 py-12">
      <div className="flex-1 flex flex-col gap-2 p-4">
        <h1 className="text-black font-bold text-6xl pb-5">Technical Task</h1>
        <p className="text-gray-500">
          This is a Role-Based Access Control (RBAC) system using React for the
          frontend and Express for the backend.
        </p>
        <div className="flex flex-col gap-3">
          {isLoggedIn ? (
            <p className="text-gray-500">
              Hi There! You can visit your &nbsp;
              <Link
                className="text-xl hover:text-gray-700 hover:underline"
                to={"/profile"}
              >
                Profile!
              </Link>
            </p>
          ) : (
            <Link
              to={"/login"}
              className="bg-gray-600 hover:bg-gray-800 rounded-3xl py-2 px-10 text-white ml-3 mr-auto"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1">
        <img
          src={hero}
          alt="hero image"
          className="mx-auto w-96 h-96 bg-white"
        />
      </div>
    </header>
  );
}
