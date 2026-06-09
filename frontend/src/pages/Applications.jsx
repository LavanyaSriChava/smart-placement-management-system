import { useEffect, useState } from "react";
import { getApplications } from "../api/applicationApi";
import ApplicationTable from "../components/tables/ApplicationTable";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getApplications()
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load applications");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading applications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Applications
      </h1>

      <ApplicationTable applications={applications} />
    </div>
  );
}