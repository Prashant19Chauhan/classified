import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";

const Signup = () => {
  const [formData, setFormData] = useState({})

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input type="text" placeholder="Full Name" id="name" onChange={changeHandler} className="w-full p-2 border rounded mb-2" required/>
        <input type="text" placeholder="Username" id="username" onChange={changeHandler} className="w-full p-2 border rounded mb-2" required/>
        <input type="number" placeholder="Phone Number" id="phoneNumber" onChange={changeHandler} className="w-full p-2 border rounded mb-2" required/>
        <input type="email" placeholder="Email" id="email" onChange={changeHandler} className="w-full p-2 border rounded mb-2" required />
        <input type="password" placeholder="Password" id="password" onChange={changeHandler} className="w-full p-2 border rounded mb-2" required />
        <button type="submit" className="bg-green-600 text-white py-2 px-4 w-full rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
