import { useEffect, useState } from "react";
import CompanyTable from "../components/tables/CompanyTable";
import {
  getCompanies,
  addCompany,
  deleteCompany,
  updateCompany,
} from "../api/companyApi";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [branchFilter, setBranchFilter] = useState("ALL");
  const [editingCompany, setEditingCompany] =
    useState(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

 
  const [newCompany, setNewCompany] =
    useState({
      companyName: "",
      role: "",
      ctc: 0,
      requiredCgpa: 0,
      allowedBacklogs: 0,
      eligibleBranches: "",
      requiredSkills: "",
      jobDescription: "",
    });


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
        prev.filter(
          (company) => company.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete company");
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
      toast.error("Failed to update company");
    }
  };

  const handleAddCompany = async () => {
    try {
      const created = await addCompany(
        newCompany
      );

      setCompanies((prev) => [
        ...prev,
        created,
      ]);

      setNewCompany({

  companyName: "",
  role: "",
  ctc: 0,
  requiredCgpa: 0,
  allowedBacklogs: 0,
  eligibleBranches: "",
  requiredSkills: "",
  jobDescription: "",
});

      setShowAddModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add company");
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
const filteredCompanies = companies.filter((company) => {
  const matchesSearch =
    company.companyName
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesBranch =
    branchFilter === "ALL" ||
    company.eligibleBranches
      ?.toLowerCase()
      .includes(branchFilter.toLowerCase());

  return matchesSearch && matchesBranch;
});
  return (
    <>
      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Add Company
            </h2>

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Company Name"
              value={newCompany.companyName}
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  companyName: e.target.value,
                })
              }
            />

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Role"
              value={newCompany.role}
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  role: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-3 rounded"
              placeholder="CTC"
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  ctc: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-3 rounded"
              placeholder="Required CGPA"
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  requiredCgpa: Number(
                    e.target.value
                  ),
                })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-3 rounded"
              placeholder="Allowed Backlogs"
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  allowedBacklogs: Number(
                    e.target.value
                  ),
                })
              }
            />

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Eligible Branches"
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  eligibleBranches:
                    e.target.value,
                })
              }
            />

            <input
              className="border p-2 w-full mb-4 rounded"
              placeholder="Required Skills"
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  requiredSkills:
                    e.target.value,
                })
              }
            />

           <textarea
  placeholder="Job Description"
  className="border p-2 w-full mb-3 rounded"
  rows={5}
  value={newCompany.jobDescription}
  onChange={(e) =>
    setNewCompany({
      ...newCompany,
      jobDescription: e.target.value,
    })
  }
/>

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowAddModal(false)
                }
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddCompany}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Company Modal */}
      {editingCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Edit Company
            </h2>

            <input
              className="border p-2 w-full mb-3 rounded"
              value={
                editingCompany.companyName || ""
              }
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  companyName:
                    e.target.value,
                })
              }
            />

            <input
              className="border p-2 w-full mb-3 rounded"
              value={
                editingCompany.role || ""
              }
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  role: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-3 rounded"
              value={
                editingCompany.ctc || ""
              }
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  ctc: Number(
                    e.target.value
                  ),
                })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-4 rounded"
              value={
                editingCompany.requiredCgpa ||
                ""
              }
              onChange={(e) =>
                setEditingCompany({
                  ...editingCompany,
                  requiredCgpa: Number(
                    e.target.value
                  ),
                })
              }
            />
            <input
  type="number"
  className="border p-2 w-full mb-3 rounded"
  placeholder="Allowed Backlogs"
  value={editingCompany.allowedBacklogs || ""}
  onChange={(e) =>
    setEditingCompany({
      ...editingCompany,
      allowedBacklogs: Number(e.target.value),
    })
  }
/>

<input
  className="border p-2 w-full mb-3 rounded"
  placeholder="Eligible Branches"
  value={editingCompany.eligibleBranches || ""}
  onChange={(e) =>
    setEditingCompany({
      ...editingCompany,
      eligibleBranches: e.target.value,
    })
  }
/>

<input
  className="border p-2 w-full mb-3 rounded"
  placeholder="Required Skills"
  value={editingCompany.requiredSkills || ""}
  onChange={(e) =>
    setEditingCompany({
      ...editingCompany,
      requiredSkills: e.target.value,
    })
  }
/>

<textarea
  className="border p-2 w-full mb-4 rounded"
  placeholder="Job Description"
  rows={5}
  value={editingCompany.jobDescription || ""}
  onChange={(e) =>
    setEditingCompany({
      ...editingCompany,
      jobDescription: e.target.value,
    })
  }
/>
            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setEditingCompany(null)
                }
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Companies
        </h1>

        <button
          onClick={() =>
            setShowAddModal(true)
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Company
        </button>
      </div>
<div className="bg-white rounded-xl shadow p-4 mb-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search company..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2"
    />

    <select
      value={branchFilter}
      onChange={(e) => setBranchFilter(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="ALL">All Branches</option>
      <option value="CSE">CSE</option>
      <option value="ECE">ECE</option>
      <option value="EEE">EEE</option>
      <option value="MECH">MECH</option>
      <option value="CIVIL">CIVIL</option>
    </select>

    <button
      onClick={() => setShowAddModal(true)}
      className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
    >
      + Add Company
    </button>

  </div>
</div>
     <CompanyTable
  companies={filteredCompanies}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
    </>
  );
}