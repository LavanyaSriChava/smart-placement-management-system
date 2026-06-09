import StatusBadge from "../common/StatusBadge";

export default function ApplicationTable({
  applications,
  users,
  companies,
  onStatusUpdate,
}) {
  if (applications.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
        No applications available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
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
          {applications.map((app) => {
  const student = users.find(
    (u) => u.id === app.studentId
  );

  const company = companies.find(
    (c) => c.id === app.companyId
  );

  return (
    <tr
      key={app.id}
      className="border-t hover:bg-gray-50"
    >
      <td className="p-3">
        {student?.name || `Student #${app.studentId}`}
      </td>

      <td className="p-3">
        {company?.companyName || `Company #${app.companyId}`}
      </td>

      <td className="p-3">
        <StatusBadge status={app.status} />
      </td>

      <td className="p-3 space-x-2">
        <button
  onClick={() => {
    if (
      window.confirm(
        "Shortlist this application?"
      )
    ) {
      onStatusUpdate(app, "Shortlisted");
    }
  }}
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
>
  Shortlist
</button>
        <button
  onClick={() => {
    if (
      window.confirm(
        "Are you sure you want to reject this application?"
      )
    ) {
      onStatusUpdate(app, "Rejected");
    }
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
>
  Reject
</button>

       <button
  onClick={() => {
    if (
      window.confirm(
        "Confirm placement of this student?"
      )
    ) {
      onStatusUpdate(app, "Placed");
    }
  }}
  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
>
  Place
</button>
      </td>
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
  );
}