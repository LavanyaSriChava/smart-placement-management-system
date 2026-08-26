import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { jwtDecode } from "jwt-decode";
import { applyToCompany } from "../../api/studentapplicationApi";

function CompanyCard({ company, alreadyApplied, onApplied }) {

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  const navigate = useNavigate();

  // ================= APPLY =================
  const handleApply = async () => {

    if (alreadyApplied) return;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to apply.");
      return;
    }

    try {

      const user = jwtDecode(token);

      const response = await applyToCompany(
        user.id,
        company.id
      );

      console.log(
        "Application Submitted:",
        response.data
      );

      // API succeeded
      toast.success(
        "Application Submitted Successfully"
      );

      // Update UI after successful API call
      if (onApplied) {
        try {
          onApplied(company.id);
        } catch (uiError) {
          console.error(
            "UI update error:",
            uiError
          );
        }
      }

    } catch (error) {

      console.error(
        "Application Error:",
        error
      );

      const backendMessage =
        error.response?.data?.message;

      toast.error(
        backendMessage ||
        "Application Failed"
      );
    }
  };

  // ================= ANALYZE RESUME =================
  const handleAnalyzeResume = () => {

    navigate("/ResumeUpload", {
      state: {
        companyId: company.id,
        companyName: company.companyName,
        jobDescription: company.jobDescription,
      },
    });

  };

  return (

    <>

      {/* ================= COMPANY CARD ================= */}

      <div className="
        bg-white
        p-6
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition
        border
        border-gray-100
        flex
        flex-col
        justify-between
      ">

        {/* Company Name */}

        <h2 className="
          text-2xl
          font-bold
          text-gray-800
          mb-4
        ">
          {company.companyName}
        </h2>


        {/* Basic Information */}

        <div className="space-y-2 text-gray-700">

          <p>
            <strong>Role:</strong>{" "}
            {company.role}
          </p>

          <p>
            <strong>CTC:</strong>{" "}
            {company.ctc} LPA
          </p>

          <p>
            <strong>Required CGPA:</strong>{" "}
            {company.requiredCgpa}
          </p>

          <p>
            <strong>Eligible Branches:</strong>{" "}
            {company.eligibleBranches}
          </p>

          <p>
            <strong>Required Skills:</strong>{" "}
            {company.requiredSkills}
          </p>

        </div>


        {/* ================= VIEW JOB DETAILS ================= */}

        <button
          onClick={() =>
            setShowJobModal(true)
          }
          className="
            w-full
            mt-5
            border
            border-indigo-600
            text-indigo-600
            hover:bg-indigo-50
            p-2
            rounded
            transition
            font-medium
          "
        >
          View Job Details
        </button>


        {/* ================= ACTION BUTTONS ================= */}

        <div className="
          mt-3
          grid
          grid-cols-2
          gap-3
        ">

          {/* Analyze Resume */}

          <button
            onClick={handleAnalyzeResume}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              p-2
              rounded
              transition
              font-medium
            "
          >
            Analyze Resume
          </button>


          {/* Apply */}

          <button
            onClick={() =>
              setShowApplyModal(true)
            }
            disabled={alreadyApplied}
            className={`
              p-2
              rounded
              text-white
              transition
              font-medium
              ${alreadyApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
              }
            `}
          >
            {alreadyApplied
              ? "Applied"
              : "Apply"}
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/*                 JOB DETAILS MODAL                 */}
      {/* ================================================= */}

      {showJobModal && (

        <div className="
          fixed
          inset-0
          bg-black
          bg-opacity-50
          flex
          items-center
          justify-center
          z-50
          p-4
        ">

          <div className="
            bg-white
            rounded-2xl
            shadow-xl
            w-full
            max-w-2xl
            max-h-[85vh]
            overflow-y-auto
            p-7
          ">

            {/* Header */}

            <div className="
              flex
              justify-between
              items-start
              mb-5
            ">

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                  text-gray-800
                ">
                  {company.companyName}
                </h2>

                <p className="
                  text-gray-500
                  mt-1
                ">
                  {company.role}
                </p>

              </div>

              <button
                onClick={() =>
                  setShowJobModal(false)
                }
                className="
                  text-gray-500
                  hover:text-gray-800
                  text-2xl
                  font-bold
                "
              >
                ×
              </button>

            </div>


            {/* Job Information */}

            <div className="
              grid
              md:grid-cols-2
              gap-4
              mb-6
            ">

              <div className="
                bg-gray-50
                p-4
                rounded-lg
              ">
                <p className="text-sm text-gray-500">
                  CTC
                </p>

                <p className="font-semibold">
                  {company.ctc} LPA
                </p>
              </div>


              <div className="
                bg-gray-50
                p-4
                rounded-lg
              ">
                <p className="text-sm text-gray-500">
                  Required CGPA
                </p>

                <p className="font-semibold">
                  {company.requiredCgpa}
                </p>
              </div>


              <div className="
                bg-gray-50
                p-4
                rounded-lg
              ">
                <p className="text-sm text-gray-500">
                  Allowed Backlogs
                </p>

                <p className="font-semibold">
                  {company.allowedBacklogs}
                </p>
              </div>


              <div className="
                bg-gray-50
                p-4
                rounded-lg
              ">
                <p className="text-sm text-gray-500">
                  Eligible Branches
                </p>

                <p className="font-semibold">
                  {company.eligibleBranches}
                </p>
              </div>

            </div>


            {/* Required Skills */}

            <div className="mb-6">

              <h3 className="
                text-xl
                font-semibold
                text-gray-800
                mb-2
              ">
                Required Skills
              </h3>

              <p className="text-gray-700">
                {company.requiredSkills}
              </p>

            </div>


            {/* Job Description */}

            <div className="mb-6">

              <h3 className="
                text-xl
                font-semibold
                text-gray-800
                mb-2
              ">
                Job Description
              </h3>

              <div className="
                bg-gray-50
                border
                border-gray-200
                rounded-lg
                p-4
                text-gray-700
                whitespace-pre-line
                leading-relaxed
              ">
                {company.jobDescription
                  ? company.jobDescription
                  : "Job description not available."
                }
              </div>

            </div>


            {/* Close */}

            <div className="
              flex
              justify-end
            ">

              <button
                onClick={() =>
                  setShowJobModal(false)
                }
                className="
                  bg-gray-600
                  hover:bg-gray-700
                  text-white
                  px-5
                  py-2
                  rounded-lg
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/*              APPLICATION CONFIRMATION             */}
      {/* ================================================= */}

      <ConfirmationModal
        isOpen={showApplyModal}
        title="Confirm Application"
        message={`
          Are you sure you want to apply for
          ${company.companyName}?
        `}
        onCancel={() =>
          setShowApplyModal(false)
        }
        onConfirm={() => {

          setShowApplyModal(false);

          handleApply();

        }}
      />

    </>

  );

}

export default CompanyCard;