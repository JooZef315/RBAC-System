import { useEffect, useState } from "react";
import UserCard from "../../components/userCard";
import { useAuthStore } from "../../store/authStore";
import { TUser } from "../../utils/types";

export default function Profile() {
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const payload = useAuthStore((state) => state.payload);
  const [user, setUser] = useState<TUser>();

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

  return (
    <main className="flex flex-col gap-3 my-4 md:ml-6 max-w-2xl md:mr-auto mx-2">
      <h2 className="text-gray-600 font-bold text-2xl">
        User's Profile (Owners only)
      </h2>
      {user && (
        <UserCard
          id={user?.id}
          name={user?.name}
          email={user?.email}
          bio={user?.bio}
          role={user?.role}
          createdAt={user?.createdAt}
        />
      )}
    </main>
  );
}
