import { useEffect, useState } from "react";
import UserCard from "../../components/userCard";
import { useAuthStore } from "../../store/authStore";
import { TUser } from "../../utils/types";

export default function UsersList() {
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3001/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const result = (await response.json()) as TUser[];
      setUsers(result);
    };

    fetchUsers();
  }, [jwtToken]);

  return (
    <main className="flex flex-col items-center gap-3 my-4 max-w-5xl mx-auto">
      <h2 className="text-gray-600 font-bold text-2xl">
        Users List (Super Users only){" "}
      </h2>
      <ul className="flex justify-center gap-6 flex-wrap m-3">
        {users.map((user) => {
          return (
            <li>
              <UserCard
                key={user.id}
                id={user?.id}
                name={user?.name}
                email={user?.email}
                bio={user?.bio}
                role={user?.role}
                createdAt={user?.createdAt}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
