import { useEffect, useMemo, useState } from "react";
import {
  getApplications,
  updateApplicationStatus,
} from "../api/applicationApi";
import { getUsers } from "../api/userApi";
import { getCompanies } from "../api/companyApi";

import ApplicationTable from "../components/tables/ApplicationTable";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [companyFilter, setCompanyFilter] = useState("ALL");

  useEffect(() => {
    Promise.all([
      getApplications(),
      getUsers(),
      getCompanies(),
      
    ])
      .then(([apps, usersData, companiesData]) => {
  console.log("Applications:", apps);

  apps.forEach((app) => {
    console.log("Status:", app.status);
  });

  setApplications(apps);
  setUsers(usersData);
  setCompanies(companiesData);
  setLoading(false);
})
      .catch(() => {
        setError("Failed to load applications");
        setLoading(false);
      });
      
  }, []);

  const handleStatusUpdate = async (application, status) => {
    try {
      const updated = await updateApplicationStatus(
        application,
        status
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === updated.id ? updated : app
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const student = users.find(
        (u) => u.id === app.studentId
      );

      const company = companies.find(
        (c) => c.id === app.companyId
      );

      const studentName =
        student?.name?.toLowerCase() || "";

      const matchesSearch =
        studentName.includes(search.toLowerCase());

      const matchesStatus =
  statusFilter === "ALL" ||
  app.status?.trim().toLowerCase() ===
    statusFilter.toLowerCase();

      const matchesCompany =
        companyFilter === "ALL" ||
        company?.id === Number(companyFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompany
      );
    });
  }, [
    applications,
    users,
    companies,
    search,
    statusFilter,
    companyFilter,
  ]);

  if (loading)
    return <div>Loading...</div>;

  if (error)
    return (
      <div className="text-red-600">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Applications
        </h1>

        <p className="text-gray-500 mt-1">
          Review, shortlist, reject and place
          student applications.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          />

          <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border rounded-lg px-4 py-2"
>
  <option value="ALL">All Status</option>
  <option value="applied">Applied</option>
  <option value="shortlisted">Shortlisted</option>
  <option value="rejected">Rejected</option>
  <option value="placed">Placed</option>
</select>

          <select
            value={companyFilter}
            onChange={(e) =>
              setCompanyFilter(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="ALL">
              All Companies
            </option>

            {companies.map((company) => (
              <option
                key={company.id}
                value={company.id}
              >
                {company.companyName}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <ApplicationTable
          applications={filteredApplications}
          users={users}
          companies={companies}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
}