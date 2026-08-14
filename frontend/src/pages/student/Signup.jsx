import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [branch, setBranch] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [skills, setSkills] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const response = await registerUser({
        name,
        email,
        password,
        cgpa,
        branch,
        backlogs,
        skills
      });

      // Registration successful
      setMessage(
        response.data.message || "Account created successfully!"
      );
      setMessageType("success");

      console.log("Signup successful:", response.data);

      // Redirect to login after showing success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Signup Error:", error);

      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;

      if (status === 400) {
        setMessage(
          backendMessage || "Invalid registration details."
        );
      } else if (status === 500) {
        setMessage(
          "Server error. Please try again later."
        );
      } else if (!error.response) {
        setMessage(
          "Unable to connect to the server. Please check whether the backend is running."
        );
      } else {
        setMessage(
          backendMessage || "Registration failed. Please try again."
        );
      }

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-3xl
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        "
      >

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join the Smart Placement Portal
          </p>

        </div>


        {/* Success / Error Message */}
        {message && (
          <div
            className={`mb-5 p-4 rounded-xl text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}


        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />


          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />


          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />


          {/* CGPA */}
          <input
            type="number"
            step="0.01"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            required
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />


          {/* Branch */}
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />


          {/* Backlogs */}
          <input
            type="number"
            placeholder="Backlogs"
            value={backlogs}
            onChange={(e) => setBacklogs(e.target.value)}
            required
            min="0"
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />


          {/* Skills */}
          <input
            type="text"
            placeholder="Skills (Java, React, SQL)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />

        </div>


        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-indigo-600
            hover:bg-indigo-700
            disabled:bg-gray-400
            disabled:cursor-not-allowed
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            mt-6
          "
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>


        {/* Login Link */}
        <p className="text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-indigo-600
              font-semibold
              hover:underline
            "
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;