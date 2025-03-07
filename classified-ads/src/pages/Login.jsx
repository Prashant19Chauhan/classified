import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = userCredential.user.accessToken;
      await login(idToken);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" id="email" onChange={changeHandler} className="w-full p-2 border rounded mb-2" required />
        <input type="password" placeholder="Password" id="password" onChange={changeHandler} className="w-full p-2 border rounded mb-2" required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 w-full rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
