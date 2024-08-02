import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signUpSchema, TSignUp } from "../../utils/zodValidation";
import LoadingSpinner from "../../components/loadingSpinner";
import { useAuthStore } from "../../store/authStore";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof TSignUp, string>>
  >({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});
    setError("");
    setSuccess("");
    const formData = { name, email, bio, password, confirmPassword };
    const parsedData = signUpSchema.safeParse(formData);

    if (!parsedData.success) {
      const fieldErrors: Partial<Record<keyof TSignUp, string>> = {};
      parsedData.error.errors.forEach((error) => {
        const fieldName = error.path[0] as keyof TSignUp;
        fieldErrors[fieldName] = error.message;
      });
      setFormErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3001/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData.data),
    });

    const result = await response.json();

    if (response.status != 200) {
      setLoading(false);
      setError(result.message);
      return;
    } else {
      setLoading(false);
      setSuccess(result.message);
      return;
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <main className="my-8 flex justify-center items-center">
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
          {success && (
            <p className="w-full bg-green-700 text-white p-2 text-center text-xs my-1">
              {success}
            </p>
          )}
          <div className="w-full">
            <input
              className="w-full py-3 px-5 text-gray-500 border-none"
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && (
              <p className="w-full bg-red-800 text-white p-2 text-center text-xs mb-1">
                {formErrors.name}
              </p>
            )}
          </div>
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
            {formErrors.email && (
              <p className="w-full bg-red-800 text-white p-2 text-center text-xs mb-1">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="w-full">
            <textarea
              className="w-full py-3 px-5 text-gray-500 border-none"
              name="Bio"
              id="Bio"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            {formErrors.bio && (
              <p className="w-full bg-red-800 text-white p-2 text-center text-xs mb-1">
                {formErrors.bio}
              </p>
            )}
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
            {formErrors.password && (
              <p className="w-full bg-red-800 text-white p-2 text-center text-xs mb-1">
                {formErrors.password}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              className="w-full py-3 px-5 text-gray-500 border-none"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {formErrors.confirmPassword && (
              <p className="w-full bg-red-800 text-white p-2 text-center text-xs mb-1">
                {formErrors.confirmPassword}
              </p>
            )}
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
      )}
    </main>
  );
}
