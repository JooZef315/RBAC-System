import UserCard from "../../components/userCard";

export default function UsersList() {
  return (
    <main>
      <h1>Users</h1>
      <section>
        <ul>
          <li>
            <UserCard title="Name" info="Joo" />
          </li>
          <li>
            <UserCard title="Name" info="Joo" />
          </li>
          <li>
            <UserCard title="Name" info="Joo" />
          </li>
        </ul>
      </section>
    </main>
  );
}
