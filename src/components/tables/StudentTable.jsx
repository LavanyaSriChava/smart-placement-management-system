import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";
import StatusBadge from "../common/StatusBadge";

export default function StudentTable({ search }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  useEffect(() => {
  getUsers()
    .then((data) => {
      setStudents(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to load students");
      setLoading(false);
    });
}, []);
if (error) {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-xl">
      {error}
    </div>
  );
}
  const filteredStudents = students.filter((student) =>
  student.name?.toLowerCase()
    .includes(search?.toLowerCase() || "")
);
  if (loading) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      Loading students...
    </div>
  );
}

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Branch</th>
            <th className="p-3 text-left">CGPA</th>
            <th className="p-3 text-left">Backlogs</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.email}</td>
              <td className="p-3">{student.branch}</td>
              <td className="p-3">{student.cgpa}</td>
              <td className="p-3">{student.backlogs}</td>

              <td className="p-3">
                <StatusBadge
                  status={student.role}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}