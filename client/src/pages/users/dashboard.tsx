import { useEffect, useState } from "react";
import DropDownButton from "../../components/dropDownButton";
import { useAuthStore } from "../../store/authStore";
import { Role, TUser } from "../../utils/types";
import LoadingSpinner from "../../components/loadingSpinner";

export default function Dashboard() {
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const [users, setUsers] = useState<TUser[]>([]);
  const [usersToEdit, setUsersToEdit] = useState(new Map<string, Role>());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  }, [jwtToken, success]);

  const handleEditRoles = async () => {
    if (usersToEdit.size != 0) {
      try {
        setError("");
        setLoading(true);

        const responsePromises: Promise<Response>[] = [];

        usersToEdit.forEach(async (role, id) => {
          const response = fetch(
            `http://localhost:3001/api/v1/users/${id}/roles`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify({ role }),
            }
          );
          responsePromises.push(response);
        });

        const resultPromises = await Promise.all(responsePromises);
        const results = await Promise.all(resultPromises);

        if (results[0].status != 200) {
          setLoading(false);
          setSuccess("");
          setError(results[0].statusText);
          return;
        }
        setLoading(false);
        setSuccess("New Roles Saved!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="flex flex-col gap-3 p-6 max-w-6xl mx-auto">
      <h2 className="text-gray-600 font-bold text-2xl">
        Admin dashboard for assigning roles and permissions (Admins only)
      </h2>
      {error && (
        <p className="w-full bg-red-800 text-white p-2 text-center text-xs mt-1">
          {error}
        </p>
      )}
      {success && (
        <p className="w-full bg-green-700 text-white p-2 text-center text-xs mt-1">
          {success}
        </p>
      )}
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
                <tr
                  key={user.id}
                  className="fade-in text-gray-800 bg-gray-200 border-b-white border-b-8"
                >
                  <td className="p-3 text-center">{user.id}</td>
                  <td className="p-3 text-center">{user.name}</td>
                  <td className="p-3 text-center">
                    <DropDownButton
                      defaultRole={user.role}
                      id={user.id}
                      editRole={setUsersToEdit}
                    />
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
