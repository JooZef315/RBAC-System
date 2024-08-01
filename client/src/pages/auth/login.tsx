import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="h-4/5 flex justify-center items-center">
      <form className="min-w-96 bg-gray-100 flex flex-col justify-center items-center gap-5 py-12 px-10 shadow-xl">
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
          <input
            className="w-full py-3 px-5 text-gray-500 border-none"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full py-3 px-5 bg-blue-900 hover:bg-blue-700 text-white"
          >
            LOGIN
          </button>
        </div>
        <p>
          Not registered?{" "}
          <Link to="/signup" className="text-blue-900 hover:text-blue-700">
            Create An Account
          </Link>
        </p>
      </form>
    </main>
  );
}
