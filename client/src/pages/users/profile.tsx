import UserCard from "../../components/userCard";

export default function Profile() {
  return (
    <main>
      <UserCard title="id" info="123456789" />
      <UserCard title="Name" info="Joo" />
      <UserCard title="Email" info="Joo@knb.com" />
      <UserCard title="Role" info="User" />
      <UserCard title="Joined At" info="1/8/2024" />
    </main>
  );
}
