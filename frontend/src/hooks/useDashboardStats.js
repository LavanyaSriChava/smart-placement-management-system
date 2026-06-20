import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";
import { getCompanies } from "../api/companyApi";
import { getApplications } from "../api/applicationApi";

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    applications: 0,
    placed: 0,
  });

  useEffect(() => {
    Promise.all([
      getUsers(),
      getCompanies(),
      getApplications(),
    ])
      .then(([users, companies, applications]) => {
        const placedCount = applications.filter(
          (app) => app.status === "PLACED"
        ).length;

        setStats({
          students: users.length,
          companies: companies.length,
          applications: applications.length,
          placed: placedCount,
        });
      })
      .catch(console.error);
  }, []);

  return stats;
}