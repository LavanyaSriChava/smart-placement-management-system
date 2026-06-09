import { useEffect, useState } from "react";
import CompanyTable from "../components/tables/CompanyTable";
import {
  getCompanies,
  deleteCompany,
  updateCompany,
} from "../api/companyApi";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCompany, setEditingCompany] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);

      setCompanies((prev) =>
        prev.filter((company) => company.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete company");
    }
  };

  const handleEdit = (company) => {
    setEditingCompany({ ...company });
  };

  const handleSave = async () => {
    try {
      const updated = await updateCompany(
        editingCompany.id,
        editingCompany
      );

      setCompanies((prev) =>
        prev.map((company) =>
          company.id === updated.id
            ? updated
            : company
        )
      );

      setEditingCompany(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update company");
    }
  };

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
    <>
      {editingCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Edit Company
            </h2>

            <input
              type="text"
              placeholder="Company Name"
              className="border p-2 w-full mb-3 rounded"
              value={editingCompany.companyName || ""}
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  companyName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Role"
              className="border p-2 w-full mb-3 rounded"
              value={editingCompany.role || ""}
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  role: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="CTC"
              className="border p-2 w-full mb-3 rounded"
              value={editingCompany.ctc || ""}
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  ctc: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              placeholder="Required CGPA"
              className="border p-2 w-full mb-3 rounded"
              value={editingCompany.requiredCgpa || ""}
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  requiredCgpa: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              placeholder="Allowed Backlogs"
              className="border p-2 w-full mb-3 rounded"
              value={editingCompany.allowedBacklogs || ""}
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  allowedBacklogs: Number(
                    e.target.value
                  ),
                })
              }
            />

            <input
              type="text"
              placeholder="Eligible Branches"
              className="border p-2 w-full mb-3 rounded"
              value={editingCompany.eligibleBranches || ""}
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  eligibleBranches: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Required Skills"
              className="border p-2 w-full mb-4 rounded"
              value={editingCompany.requiredSkills || ""}
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  requiredSkills: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setEditingCompany(null)
                }
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold mb-6">
          Companies
        </h1>

        <CompanyTable
          companies={companies}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
}