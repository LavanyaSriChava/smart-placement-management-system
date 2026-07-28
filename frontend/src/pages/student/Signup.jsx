import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [cgpa, setCgpa] = useState("");
  const [branch, setBranch] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({
        name,
        email,
        password,
        role,
        cgpa,
        branch,
        backlogs,
        skills,
      });

      console.log(response.data);
    } catch (error) {
      console.log("ERROR RESPONSE:");
      console.log(error.response);
      console.log(error.response?.data);
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

        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
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

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
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

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          >
            <option value="STUDENT">
              Student
            </option>

            <option value="ADMIN">
              Admin
            </option>

            <option value="RECRUITER">
              Recruiter
            </option>
          </select>

          <input
            type="number"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) =>
              setCgpa(e.target.value)
            }
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

          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
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

          <input
            type="number"
            placeholder="Backlogs"
            value={backlogs}
            onChange={(e) =>
              setBacklogs(e.target.value)
            }
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

          <input
            type="text"
            placeholder="Skills (Java, React, SQL)"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
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
          className="
            w-full
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            mt-6
          "
        >
          Create Account
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