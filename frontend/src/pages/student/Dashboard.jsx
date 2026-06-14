import { useEffect, useState } from "react";
import StatCard from "../../components/student/StatCard";
import { getUserById } from "../../api/studentUserApi";
import { getApplicationsByStudentId } from "../../api/studentapplicationApi";
import {
  FaBuilding,
  FaFileAlt,
  FaBriefcase
} from "react-icons/fa";

function Dashboard() {

  const [student, setStudent] = useState({
    name: "",
    branch: "",
    cgpa: "",
    skills: "",
    backlogs: "",
  });

  const [appliedCompanies, setAppliedCompanies] =
    useState([]);

  useEffect(() => {

    fetchStudent();
    fetchApplications();

  }, []);

  const fetchStudent = async () => {

    try {

      const response =
        await getUserById(1);

      console.log(
        "Student:",
        response.data
      );

      setStudent(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const fetchApplications = async () => {

    try {

      const response =
        await getApplicationsByStudentId(1);

      console.log(
        "Applications:",
        response.data
      );

      setAppliedCompanies(
        response.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  const getStatusStyle = (status) => {

    switch (status) {

      case "Shortlisted":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";

    }

  };

  return (
    
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
  

  {/* Header */ }

  <div className="mb-8">

    <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
      Student Dashboard
    </h1>

    <p className="text-gray-500 mt-2">
      Track your profile, applications and placement progress
    </p>

  </div>

  {/* Student Information */ }

  <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

    <h2 className="text-2xl font-semibold mb-4">
      Student Information
    </h2>

    <div className="flex flex-col md:flex-row gap-8 items-center">

      <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
        {student.name?.charAt(0)?.toUpperCase()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">

        <p><strong>Name:</strong> {student.name}</p>

        <p><strong>Branch:</strong> {student.branch}</p>

        <p><strong>CGPA:</strong> {student.cgpa}</p>

        <p><strong>Skills:</strong> {student.skills}</p>

        <p><strong>Backlogs:</strong> {student.backlogs}</p>

      </div>

    </div>

  </div>

  {/* Dashboard Cards */ }

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <StatCard
      title="Eligible Companies"
      value="0"
      icon={<FaBuilding />}
    />

    <StatCard
      title="Applications"
      value={appliedCompanies.length}
      icon={<FaBriefcase />}
    />

    <StatCard
      title="Resume Status"
      value="Uploaded"
      icon={<FaFileAlt />}
    />

  </div>

  {/* Applied Companies */ }

  <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

    <h2 className="text-2xl font-semibold mb-4">
      Applied Companies
    </h2>

    {appliedCompanies.length === 0 ? (

      <p className="text-gray-500">
        No Applications Yet
      </p>

    ) : (

      appliedCompanies.map(
        (application, index) => (

          <div
            key={index}
            className="flex justify-between items-center border-b py-4"
          >

            <span className="font-medium">
              {application.companyName}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                application.status
              )}`}
            >
              {application.status}
            </span>

          </div>

        )
      )

    )}

  </div>

  {/* Resume Information */ }

  <div className="bg-white p-6 rounded-2xl shadow-md">

    <h2 className="text-2xl font-semibold mb-4">
      Resume Information
    </h2>

    <p>
      <strong>File Name:</strong> Resume.pdf
    </p>

    <p className="mt-2">
      <strong>Status:</strong> Uploaded
    </p>

  </div>

    </div >
  );
}

export default Dashboard;