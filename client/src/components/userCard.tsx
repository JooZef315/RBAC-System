import { TUser } from "../utils/types";
import userImg from "../../assets/user.jpg";

export default function UserCard({
  id,
  name,
  email,
  role,
  bio,
  createdAt,
}: TUser) {
  return (
    <div className="bg-gray-100 p-8 flex items-center gap-4 shadow-sm rounded-md">
      <div className="flex-shrink">
        <img src={userImg} alt="userImg" className="w-24 h-24 rounded-full" />
      </div>
      <div className="flex-grow flex flex-col gap-2 text-gray-500">
        <h2 className="font-bold text-xl pl-2">{name}</h2>
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
      </div>
    </div>
  );
}
