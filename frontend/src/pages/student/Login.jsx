import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      // Store token
      localStorage.setItem("token", response.data.token);

      // Store role if needed later
      localStorage.setItem("role", response.data.role);

      console.log(response.data);

      // Success notification
      toast.success("Login successful! 🎉");

      // Redirect based on role
      setTimeout(() => {
        if (response.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1000);

    } catch (error) {
      console.log(error);

      // Backend error message
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";

      toast.error(message);
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
              onChange={(e) => setEmail(e.target.value)}
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

            {/* Password input + eye button */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  pr-12
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-indigo-600
                "
              >
                {showPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>

            </div>

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
              onClick={() => navigate("/signup")}
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

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

    </div>
  );
}

export default Login;