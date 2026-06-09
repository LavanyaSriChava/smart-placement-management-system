import { useEffect, useState } from "react";
import CompanyTable from "../components/tables/CompanyTable";
import { getCompanies } from "../api/companyApi";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCompanies()
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load companies");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading companies...
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
        Companies
      </h1>

      <CompanyTable companies={companies} />
    </div>
  );
}