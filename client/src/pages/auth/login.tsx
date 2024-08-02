import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../../components/loadingSpinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email || !password) {
      setError("Email / Password can't be empty!");
      setLoading(false);
      return;
    }
    const body = { email, password };

    const response = await fetch("http://localhost:3001/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.status != 200) {
      setError(result.message);
      setLoading(false);
      return;
    }

    login(result.accessToken);
    setLoading(false);
    navigate("/");
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <main className="h-4/5 flex justify-center items-center">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="min-w-96 bg-gray-100 flex flex-col justify-center items-center gap-5 py-12 px-10 shadow-xl"
        >
          {error && (
            <p className="w-full bg-red-800 text-white p-2 text-center text-xs my-1">
              {error}
            </p>
          )}
          <div className="w-full">
            <input
              className="w-full py-3 px-5 text-gray-500 border-none"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              className="w-full py-3 px-5 text-gray-500 border-none"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
      )}
    </main>
  );
}
