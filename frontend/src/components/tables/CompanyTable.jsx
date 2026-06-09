export default function CompanyTable({ companies }) {
  if (companies.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
        No companies available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Package</th>
            <th className="p-3 text-left">Deadline</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-3">
                {company.companyName || company.company}
              </td>

              <td className="p-3">
                {company.package || "N/A"}
              </td>

              <td className="p-3">
                {company.deadline || "N/A"}
              </td>

              <td className="p-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}