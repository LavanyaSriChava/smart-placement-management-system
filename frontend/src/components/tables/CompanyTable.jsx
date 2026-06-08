export default function CompanyTable() {
  const companies = [
    {
      id: 1,
      company: "Google",
      package: "25 LPA",
      deadline: "2026-07-15",
    },
    {
      id: 2,
      company: "Amazon",
      package: "22 LPA",
      deadline: "2026-07-20",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
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
              className="border-t"
            >
              <td className="p-3">
                {company.company}
              </td>

              <td className="p-3">
                {company.package}
              </td>

              <td className="p-3">
                {company.deadline}
              </td>

              <td className="p-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">
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