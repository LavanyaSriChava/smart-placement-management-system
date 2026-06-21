import { useEffect, useState } from "react";
import { getApplications } from "../api/applicationApi";
import ApplicationTable from "../components/tables/ApplicationTable";
import { getUsers } from "../api/userApi";
import { getCompanies } from "../api/companyApi";
import { updateApplicationStatus } from "../api/applicationApi";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [users, setUsers] = useState([]);
const [companies, setCompanies] = useState([]);
const handleStatusUpdate = async (
  application,
  status
) => {
  try {
    const updated =
      await updateApplicationStatus(
        application,
        status
      );

    setApplications((prev) =>
      prev.map((app) =>
        app.id === updated.id
          ? updated
          : app
      )
    );
  } catch (error) {
    console.error(error);
  }
};
 useEffect(() => {
  Promise.all([
    getApplications(),
    getUsers(),
    getCompanies(),
  ])
    .then(([apps, usersData, companiesData]) => {
      setApplications(apps);
      setUsers(usersData);
      setCompanies(companiesData);
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

      <ApplicationTable
  applications={applications}
  users={users}
  companies={companies}
  onStatusUpdate={handleStatusUpdate}
/>
    </div>
  );
}