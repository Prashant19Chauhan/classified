import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginFailure, loginSuccess } from "../redux/userSlice";

const Login = () => {
  const { currentUser, error } = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/logout');
    }
  }, [currentUser, navigate]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = userCredential.user.accessToken;
      const data = await login(idToken);
      dispatch(loginSuccess(data));
      if (data) {
        navigate('/');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back 👋</h2>

        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
