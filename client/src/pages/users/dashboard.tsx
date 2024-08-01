import DropDownButton from "../../components/dropDownButton";

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-3 p-6 max-w-6xl mx-auto">
      <h2 className="text-gray-600 font-bold text-2xl">
        Admin dashboard for assigning roles and permissions (Admins only)
      </h2>
      <table className="w-full rounded-xl text-white mt-2">
        <thead className="bg-gray-500 border-b-4 border-white">
          <tr className="mb-2">
            <th className="p-4 rounded-l-md text-center">Id</th>
            <th className="p-4 text-center">Name</th>
            <th className="p-4 text-center">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="fade-in text-gray-800 bg-gray-200 border-b-white border-b-8">
            <td className="p-3 text-center">123456789</td>
            <td className="p-3 text-center">Joo</td>
            <td className="p-3 text-center">
              <DropDownButton defaultRole={"User"} />
            </td>
          </tr>
          <tr className="fade-in text-blue-950 bg-slate-200 border-b-white border-b-8">
            <td className="p-3 text-center">123456789</td>
            <td className="p-3 text-center">Joo</td>
            <td className="p-3 text-center">
              <DropDownButton defaultRole={"User"} />
            </td>
          </tr>
          <tr className="fade-in text-blue-950 bg-slate-200 border-b-white border-b-8">
            <td className="p-3 text-center">123456789</td>
            <td className="p-3 text-center">Joo</td>
            <td className="p-3 text-center">
              <DropDownButton defaultRole={"User"} />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="bg-gray-600 hover:bg-gray-800 rounded-3xl py-2 px-10 text-white ml-3 mr-auto">
        Save
      </button>
    </main>
  );
}
