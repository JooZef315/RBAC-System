import { TUser } from "../utils/types";
import userImg from "../../assets/user.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

export default function UserCard({
  id,
  name,
  email,
  role,
  bio,
  createdAt,
}: TUser) {
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const payload = useAuthStore((state) => state.payload);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/api/v1/users/${payload?.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    const result = await response.json();
    logout();
    toast.error(result.message);
    navigate("/");
  };
  return (
    <div className="bg-gray-100 p-8 flex items-center gap-4 shadow-sm rounded-md">
      <div className="flex-shrink">
        <img src={userImg} alt="userImg" className="w-24 h-24 rounded-full" />
      </div>
      <div className="flex-grow flex flex-col gap-2 text-gray-500">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl pl-2">{name}</h2>
        </div>
        <p>
          <span className="font-semibold">Id</span> : {id}
        </p>
        <p>
          <span className="font-semibold">Email</span> : {email}
        </p>
        <p>
          <span className="font-semibold">Role</span> : {role}
        </p>
        <p>
          <span className="font-semibold">Bio</span> : {bio || "No Bio"}
        </p>
        <p>
          <span className="font-semibold">joined At</span> :
          {createdAt.toString()}
        </p>
        {payload?.id == id && (
          <div className="flex my-3 justify-evenly items-center gap-2">
            <Link
              to="/editProfile"
              className="bg-white hover:bg-gray-300 rounded-xl py-2 px-6 text-gray-500 "
            >
              Edit Your Profile
            </Link>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-800 rounded-xl py-2 px-6 text-white "
              onClick={handleDelete}
            >
              Delete Your Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
