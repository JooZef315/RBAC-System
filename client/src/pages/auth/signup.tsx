import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <main className="h-5/6 flex justify-center items-center">
      <form className="min-w-96 bg-gray-100 flex flex-col justify-center items-center gap-5 py-12 px-10 shadow-xl">
        <div className="w-full">
          <input
            className="w-full py-3 px-5 text-gray-500 border-none"
            type="text"
            name="name"
            id="name"
            placeholder="name"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full py-3 px-5 text-gray-500 border-none"
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
        </div>
        <div className="w-full">
          <textarea
            className="w-full py-3 px-5 text-gray-500 border-none"
            name="Bio"
            id="Bio"
            placeholder="Bio"
          ></textarea>
        </div>
        <div className="w-full">
          <input
            className="w-full py-3 px-5 text-gray-500 border-none"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full py-3 px-5 text-gray-500 border-none"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm Password"
          />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full py-3 px-5 bg-blue-900 hover:bg-blue-700 text-white"
          >
            SIGN UP
          </button>
        </div>
        <p>
          Already have An Account?{" "}
          <Link to="/login" className="text-blue-900 hover:text-blue-700">
            Log In now!
          </Link>
        </p>
      </form>
    </main>
  );
}
