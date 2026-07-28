import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

import CompanyCard from "../../components/student/CompanyCard";
import { getCompanies } from "../../api/studentCompanyApi";
function Companies() {

  const [companies, setCompanies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

const fetchCompanies = async () => {

  try {

    const response =
      await getCompanies();

    console.log(response.data);

    setCompanies(response.data);

  } catch (error) {

    console.error(error);

  }

};

const filteredCompanies =
  companies.filter((company) =>
    company.companyName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );



  return (
  <div className="min-h-screen bg-gray-100 p-6 md:p-8">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-5xl font-bold text-slate-800">
        Companies
      </h1>

      <p className="text-gray-500 text-lg mt-2">
        Explore placement opportunities and apply to eligible companies
      </p>
    </div>

    {/* Search Bar */}
    <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

      <div className="relative">

        <FaSearch
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            w-full
            pl-12
            pr-4
            py-3
            border
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

    </div>

    {/* Company Grid or Empty State */}
    {filteredCompanies.length > 0 ? (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredCompanies.map((company) => (

          <CompanyCard
            key={company.id}
            company={company}
          />

        ))}

      </div>

    ) : (

      <div className="bg-white rounded-3xl shadow-md p-12 text-center">

        <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">

          <FaBuilding
            size={40}
            className="text-blue-600"
          />

        </div>

        <h2 className="text-2xl font-semibold text-slate-800 mt-6">
          No Companies Available
        </h2>

        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          Companies will appear here once placement drives
          are created and approved by the placement team.
        </p>

      </div>

    )}

  </div>
);
}

export default Companies;