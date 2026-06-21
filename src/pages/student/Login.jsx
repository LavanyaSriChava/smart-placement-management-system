import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await loginUser({
        email,
        password
      });

      console.log(response.data);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        {/* Logo / Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Smart Placement
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
              w-full
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

          {/* Password */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
              w-full
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

          {/* Login Button */}
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
          "
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-6">

          <p className="text-gray-500">
            Don't have an account?{" "}

            <span
              onClick={() =>
                navigate("/signup")
              }
              className="
                   text-indigo-600
                   font-semibold
                   cursor-pointer
                   hover:underline
                "
            >
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;