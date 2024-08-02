import { FormEvent, useEffect, useState } from "react";
import { TEditUser, editUserSchema } from "../../utils/zodValidation";
import LoadingSpinner from "../../components/loadingSpinner";
import { useAuthStore } from "../../store/authStore";
import { TUser } from "../../utils/types";

export default function EditUser() {
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const payload = useAuthStore((state) => state.payload);
  const [user, setUser] = useState<TUser>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof TEditUser, string>>
  >({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:3001/api/v1/users/${payload?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const result = (await response.json()) as TUser;
      setUser(result);
    };

    fetchUser();
  }, [jwtToken, payload]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});
    setError("");
    setSuccess("");
    const formData = {
      name: name || undefined,
      email: email || undefined,
      bio: bio || undefined,
      password: password || undefined,
    };

    if (
      !formData.name &&
      !formData.email &&
      !formData.bio &&
      !formData.password
    ) {
      setLoading(false);
      return;
    }

    const parsedData = editUserSchema.safeParse(formData);

    if (!parsedData.success) {
      const fieldErrors: Partial<Record<keyof TEditUser, string>> = {};
      parsedData.error.errors.forEach((error) => {
        const fieldName = error.path[0] as keyof TEditUser;
        fieldErrors[fieldName] = error.message;
      });
      setFormErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const response = await fetch(
      `http://localhost:3001/api/v1/users/${payload?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(parsedData.data),
      }
    );

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
              placeholder={user?.name}
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
              placeholder={user?.email}
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
              placeholder={user?.bio}
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
            <button
              type="submit"
              className="w-full py-3 px-5 bg-gray-500 hover:bg-gray-400 text-white"
            >
              Edit Profile
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
