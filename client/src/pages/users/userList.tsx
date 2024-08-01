import UserCard from "../../components/userCard";
import { Role } from "../../utils/types";

export default function UsersList() {
  return (
    <main className="flex flex-col items-center gap-3 my-4 max-w-5xl mx-auto">
      <h2 className="text-gray-600 font-bold text-2xl">
        Users List (Super Users only){" "}
      </h2>
      <ul className="flex justify-center gap-6 flex-wrap m-3">
        <li>
          <UserCard
            id="123456789-123456789-123456789-123456789-123456789"
            name="joo"
            email="joo@knb.com"
            role={Role.USER}
            joinedAt={new Date()}
          />
        </li>
        <li>
          <UserCard
            id="123456789-123456789-123456789-123456789-123456789"
            name="joo"
            email="joo@knb.com"
            role={Role.USER}
            joinedAt={new Date()}
          />
        </li>
        <li>
          <UserCard
            id="123456789-123456789-123456789-123456789-123456789"
            name="joo"
            email="joo@knb.com"
            role={Role.USER}
            joinedAt={new Date()}
          />
        </li>
      </ul>
    </main>
  );
}
