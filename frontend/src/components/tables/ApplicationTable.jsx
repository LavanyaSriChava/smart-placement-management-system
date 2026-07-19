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
        No applications available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-indigo-50">
          <tr className="text-gray-700">
            <th className="px-5 py-4 text-left">Student</th>
            <th className="px-5 py-4 text-left">Company</th>
            <th className="px-5 py-4 text-center">Status</th>
            <th className="px-5 py-4 text-center">Actions</th>
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

            const status = app.status?.toUpperCase();

            return (
              <tr
                key={app.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Student */}
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-800">
                    {student?.name || `Student #${app.studentId}`}
                  </div>

                  <div className="text-sm text-gray-500">
                    {student?.email}
                  </div>
                </td>

                {/* Company */}
                <td className="px-5 py-4">
                  <div className="font-medium">
                    {company?.companyName ||
                      `Company #${app.companyId}`}
                  </div>

                  <div className="text-sm text-gray-500">
                    {company?.role}
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4 text-center">
                  <StatusBadge status={app.status} />
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2 flex-wrap">

                    <button
                      disabled={status === "PLACED"}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Shortlist this application?"
                          )
                        ) {
                          onStatusUpdate(
                            app,
                            "Shortlisted"
                          );
                        }
                      }}
                      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-sm px-3 py-1 rounded-md transition"
                    >
                      Shortlist
                    </button>

                    <button
                      disabled={
                        status === "REJECTED" ||
                        status === "PLACED"
                      }
                      onClick={() => {
                        if (
                          window.confirm(
                            "Reject this application?"
                          )
                        ) {
                          onStatusUpdate(
                            app,
                            "Rejected"
                          );
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white text-sm px-3 py-1 rounded-md transition"
                    >
                      Reject
                    </button>

                    <button
                      disabled={status === "PLACED"}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Confirm placement of this student?"
                          )
                        ) {
                          onStatusUpdate(
                            app,
                            "Placed"
                          );
                        }
                      }}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white text-sm px-3 py-1 rounded-md transition"
                    >
                      Place
                    </button>

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}