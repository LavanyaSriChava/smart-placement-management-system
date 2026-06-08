import CompanyTable from "../components/tables/CompanyTable";

export default function Companies() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Companies
        </h1>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Company
        </button>
      </div>

      <CompanyTable />
    </div>
  );
}
