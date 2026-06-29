import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  uploadResume,
  getResumeByStudentId,
} from "../../api/resumeApi";

import {
  FaFileAlt,
  FaUpload,
  FaCheckCircle,
  FaFilePdf,
} from "react-icons/fa";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const user =
        jwtDecode(token);

      const response =
        await getResumeByStudentId(user.id);

      setResume(response.data);
    } catch (error) {
      console.log(
        "No resume found yet"
      );
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const response =
        await uploadResume(file);

      console.log(response.data);

      alert(
        "Resume Uploaded Successfully"
      );

      setFile(null);

      fetchResume();
    } catch (error) {
      console.error("Full Error:", error);

      console.log(
        "Response Data:",
        error.response?.data
      );

      console.log(
        "Status:",
        error.response?.status
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-slate-800">
          Resume Management
        </h1>

        <p className="text-gray-500 text-lg mt-2">
          Upload your latest resume
        </p>
      </div>

      {/* Resume Status Card */}
      <div className="bg-white rounded-3xl shadow-md p-8 mb-8">

        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
            <FaFileAlt
              className="text-white"
              size={40}
            />
          </div>

          <div className="flex-1">

            <h2 className="text-3xl font-semibold text-slate-800">
              Current Resume
            </h2>

            {resume ? (
              <>
                <div className="flex items-center gap-2 mt-3 text-green-600">
                  <FaCheckCircle />
                  <span>
                    Resume Uploaded Successfully
                  </span>
                </div>

                <a
                  href={resume.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Resume →
                </a>
              </>
            ) : (
              <p className="mt-3 text-gray-500">
                No Resume Uploaded Yet
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-3xl shadow-md p-8">

        <h2 className="text-3xl font-semibold text-slate-800 mb-6">
          Upload New Resume
        </h2>

        <div className="border-2 border-dashed border-blue-400 rounded-2xl p-10 text-center">

          <FaUpload
            size={50}
            className="mx-auto text-blue-600 mb-4"
          />

          <h3 className="text-xl font-medium text-slate-700">
            Select Your Resume
          </h3>

          <p className="text-gray-500 mt-2">
            PDF, DOC, DOCX (Max 5 MB)
          </p>

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="mt-6 block mx-auto border rounded-lg p-2"
          />

        </div>

        {/* Selected File Preview */}
        {file && (
          <div
            className="
      mt-6
      bg-blue-50
      border
      border-blue-200
      rounded-2xl
      p-5
      transition-all
      duration-300
      hover:shadow-md
    "
          >
            <div className="flex items-center gap-4">

              {/* PDF Icon */}
              <div
                className="
          w-14
          h-14
          rounded-full
          bg-red-500
          flex
          items-center
          justify-center
          text-white
        "
              >
                <FaFilePdf size={24} />
              </div>

              {/* File Details */}
              <div className="flex-1 min-w-0">

                <p
                  className="
            font-semibold
            text-slate-800
            truncate
          "
                >
                  {file.name}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {file.size > 1024 * 1024
                    ? `${(
                      file.size /
                      (1024 * 1024)
                    ).toFixed(2)} MB`
                    : `${(
                      file.size / 1024
                    ).toFixed(1)} KB`}
                </p>

              </div>

              {/* Status Badge */}
              <span
                className="
          bg-green-100
          text-green-700
          px-3
          py-1
          rounded-full
          text-sm
          font-medium
        "
              >
                Ready
              </span>

            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="
            w-full
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition-all
            duration-300
          "
        >
          Upload Resume
        </button>

      </div>

    </div>
  );
}

export default ResumeUpload;