import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { jwtDecode } from "jwt-decode";
import { applyToCompany } from "../../api/studentapplicationApi";

function CompanyCard({ company, alreadyApplied }) {

  const [showModal, setShowModal] = useState(false);

  const handleApply = async () => {
    if (alreadyApplied) return;
    try {

      const token =
        localStorage.getItem("token");

      const user =
        jwtDecode(token);

      const response =
        await applyToCompany(
          user.id,
          company.id
        );

      console.log(
        "Application Submitted",
        response.data
      );

      toast.success("Application Submitted Successfully");

    } catch (error) {

      console.error(error);

      toast.error("Application Failed");

    }

  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-bold mb-4">
        {company.companyName}
      </h2>

      <p>
        <strong>Role:</strong> {company.role}
      </p>

      <p>
        <strong>CTC:</strong> {company.ctc} LPA
      </p>

      <p>
        <strong>Required CGPA:</strong> {company.requiredCgpa}
      </p>

      <p>
        <strong>Allowed Backlogs:</strong> {company.allowedBacklogs}
      </p>

      <p>
        <strong>Eligible Branches:</strong>{" "}
        {company.eligibleBranches}
      </p>

      <p>
        <strong>Required Skills:</strong>{" "}
        {company.requiredSkills}
      </p>

      <button
        onClick={() => setShowModal(true)}
        disabled={alreadyApplied}
        className={`mt-4 w-full p-2 rounded text-white transition ${alreadyApplied
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
          }`}
      >
        {alreadyApplied ? "Applied" : "Apply"}
      </button>
      
      <ConfirmationModal
        isOpen={showModal}
        title="Confirm Application"
        message={`Are you sure you want to apply for ${company.companyName}?`}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          handleApply();
        }}
      />
    </div>
  );
}

export default CompanyCard;