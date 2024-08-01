import DropDownButton from "../../components/dropDownButton";

export default function Dashboard() {
  return (
    <main>
      <h2>Admin dashboard for assigning roles and permissions</h2>
      <table className="w-full rounded-xl text-white mt-2">
        <thead className="bg-blue-950 border-b-4 border-white">
          <tr className="mb-2">
            <th className="p-4 rounded-l-md text-center">Id</th>
            <th className="p-4 text-center">Name</th>
            <th className="p-4 text-center">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="fade-in text-blue-950 bg-slate-200 border-b-white border-b-8">
            <td className="p-3 text-center">123456789</td>
            <td className="p-3 text-center">Joo</td>
            <td className="p-3 text-center">
              <DropDownButton defaultRole={"User"} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button">Save</button>
    </main>
  );
}
