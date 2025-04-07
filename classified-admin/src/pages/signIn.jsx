import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👀 Toggle state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const data = await login(formData);
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="bg-[#1f1f22] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
        <div className="flex justify-center mb-6">
          <FaUserShield className="text-4xl text-blue-500" />
        </div>
        <h2 className="text-white text-3xl font-bold text-center mb-4">
          Admin Login
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Please enter your credentials to access the admin dashboard.
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-300 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-300 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 pr-10 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-300 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors duration-300 p-3 rounded-md text-white font-semibold mt-2"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Admin Panel by FindMeTaxi. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default SignIn;
