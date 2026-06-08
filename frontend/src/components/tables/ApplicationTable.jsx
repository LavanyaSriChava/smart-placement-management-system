import StatusBadge from "../common/StatusBadge";

export default function ApplicationTable() {
  const applications = [
    {
      id: 1,
      student: "Rahul",
      company: "Google",
      status: "Applied",
    },
    {
      id: 2,
      student: "Priya",
      company: "Amazon",
      status: "Shortlisted",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-t">
              <td className="p-3">{app.student}</td>
              <td className="p-3">{app.company}</td>
              <td className="p-3">
                <StatusBadge status={app.status} />
              </td>

              <td className="p-3 space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Shortlist
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Reject
                </button>

                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Place
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}