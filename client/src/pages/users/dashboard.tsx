import { useEffect, useState } from "react";
import DropDownButton from "../../components/dropDownButton";
import { useAuthStore } from "../../store/authStore";
import { TUser } from "../../utils/types";
import LoadingSpinner from "../../components/loadingSpinner";

export default function Dashboard() {
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const result = (await response.json()) as TUser[];
      console.log(result);
      setUsers(result);
      setLoading(false);
    };

    fetchUsers();
  }, [jwtToken]);

  const handleEditRoles = async () => {
    console.log(users);
  };
  return (
    <main className="flex flex-col gap-3 p-6 max-w-6xl mx-auto">
      <h2 className="text-gray-600 font-bold text-2xl">
        Admin dashboard for assigning roles and permissions (Admins only)
      </h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="w-full rounded-xl text-white mt-2">
          <thead className="bg-gray-500 border-b-4 border-white">
            <tr className="mb-2">
              <th className="p-4 rounded-l-md text-center">Id</th>
              <th className="p-4 text-center">Name</th>
              <th className="p-4 text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr className="fade-in text-gray-800 bg-gray-200 border-b-white border-b-8">
                  <td className="p-3 text-center">{user.id}</td>
                  <td className="p-3 text-center">{user.name}</td>
                  <td className="p-3 text-center">
                    <DropDownButton defaultRole={user.role} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!loading && (
        <button
          onClick={handleEditRoles}
          className="bg-gray-600 hover:bg-gray-800 rounded-3xl py-2 px-10 text-white ml-3 mr-auto"
        >
          Save
        </button>
      )}
    </main>
  );
}
