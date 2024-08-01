import UserCard from "../../components/userCard";
import { Role } from "../../utils/types";

export default function Profile() {
  return (
    <main className="flex flex-col gap-3 my-4 md:ml-6 max-w-4xl md:mr-auto mx-2">
      <h2 className="text-gray-600 font-bold text-2xl">
        User's Profile (Owners only)
      </h2>
      <UserCard
        id="123456789-123456789-123456789-123456789-123456789"
        name="joo"
        email="joo@knb.com"
        role={Role.USER}
        joinedAt={new Date()}
      />
    </main>
  );
}
