import { useEffect, useState } from "react";
import {
  getApplicationsByStudentId,
} from  "../../api/studentApplicationApi";

import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

function Applications() {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {
      try {
        const response =
          await getApplicationsByStudentId(
            1
          );

        console.log(
          "Applications:",
          response.data
        );

        setApplications(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const shortlistedCount =
    applications.filter(
      (app) =>
        app.status ===
        "SHORTLISTED"
    ).length;

  const pendingCount =
    applications.filter(
      (app) =>
        app.status ===
        "PENDING"
    ).length;

  const rejectedCount =
    applications.filter(
      (app) =>
        app.status ===
        "REJECTED"
    ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-slate-800">
          Applications
        </h1>

        <p className="text-gray-500 text-lg mt-2">
          Track your placement applications
          and current status
        </p>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-gray-500 text-sm">
            Total Applications
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {applications.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-gray-500 text-sm">
            Shortlisted
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {shortlistedCount}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-gray-500 text-sm">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">
            {pendingCount}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-gray-500 text-sm">
            Rejected
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {rejectedCount}
          </h2>
        </div>

      </div>

      {/* Applications Section */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        {loading ? (

          <div className="text-center py-10">

            <p className="text-lg text-gray-500">
              Loading applications...
            </p>

          </div>

        ) : applications.length === 0 ? (

          <div className="text-center py-12">

            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">

              <FaFileAlt
                size={40}
                className="text-blue-600"
              />

            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mt-6">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Apply to companies to track
              your placement progress and
              application status here.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {applications.map(
              (application) => {

                const status =
                  application.status;

                return (

                  <div
                    key={
                      application.id
                    }
                    className="
                      border
                      rounded-2xl
                      p-5
                      bg-gray-50
                      hover:shadow-md
                      transition-all
                      duration-300
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">

                        {status ===
                        "SHORTLISTED" ? (

                          <FaCheckCircle
                            className="text-green-600"
                          />

                        ) : status ===
                          "REJECTED" ? (

                          <FaTimesCircle
                            className="text-red-600"
                          />

                        ) : (

                          <FaClock
                            className="text-yellow-500"
                          />

                        )}

                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold text-lg text-slate-800">
                          Company ID:{" "}
                          {
                            application.companyId
                          }
                        </h3>

                        <p className="text-gray-600 mt-1">
                          Status:{" "}
                          {status}
                        </p>

                      </div>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Applications;