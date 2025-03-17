import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice'
import {useDispatch} from 'react-redux'

function signIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    dispatch(loginStart());
    const data = await login(formData);
    dispatch(loginSuccess(data));
    navigate('/')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold text-center mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="w-full p-2 my-2 rounded bg-gray-700 text-white"
            id="email" onChange={handleChange} required />
          <input type="password" placeholder="Password" className="w-full p-2 my-2 rounded bg-gray-700 text-white"
            id="password" onChange={handleChange} required />
          <button type="submit" className="w-full bg-blue-500 p-2 rounded mt-4">Login</button>
        </form>
      </div>
    </div>
  )
}

export default signIn
