import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  getUserById,
  updateUser,
} from "../../api/studentUserApi"

function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    cgpa: "",
    branch: "",
    backlogs: "",
    skills: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token");
      const user = jwtDecode(token);

      const response =
        await getUserById(user.id);

      console.log(response.data);

      setUser(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleUpdate = async () => {

    try {

      const response = await updateUser(
        user.id,
        user
      );

      console.log(response.data);

      alert(
        "Profile Updated Successfully"
      );

      fetchUser();

    } catch (error) {

      console.log(error.response);
      console.log(error.response.data);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your personal and academic information
        </p>

      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow-md p-8 max-w-5xl mx-auto">

        {/* Avatar Section */}

        <div className="flex flex-col items-center mb-8">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white flex items-center justify-center text-4xl font-bold">

            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}

          </div>

          <h2 className="text-2xl font-semibold mt-4">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.role}
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Role
            </label>

            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              CGPA
            </label>

            <input
              type="number"
              name="cgpa"
              value={user.cgpa}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Branch
            </label>

            <input
              type="text"
              name="branch"
              value={user.branch}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Backlogs
            </label>

            <input
              type="number"
              name="backlogs"
              value={user.backlogs}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        </div>

        {/* Skills */}

        <div className="mt-6">

          <label className="block font-medium mb-2">
            Skills
          </label>

          <textarea
            name="skills"
            value={user.skills}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Update Button */}

        <button
          onClick={handleUpdate}
          className="w-full mt-8 bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-4 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Update Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;