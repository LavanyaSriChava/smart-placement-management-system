import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";

export default function RecentStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setStudents(data.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        Loading recent students...
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        No students available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Recent Students
      </h2>

      {students.map((student) => (
        <div
          key={student.id}
          className="flex justify-between items-center border-b py-3 last:border-b-0"
        >
          <div>
            <p className="font-medium">
              {student.name}
            </p>
            <p className="text-sm text-gray-500">
              {student.email}
            </p>
          </div>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {student.branch}
          </span>
        </div>
      ))}
    </div>
  );
}