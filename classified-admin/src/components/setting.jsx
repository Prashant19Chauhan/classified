import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

function Setting() {
  const [adminInfo, setAdminInfo] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Info Updated:", adminInfo);
    // TODO: Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Settings
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded px-3 py-2">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={adminInfo.name}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={adminInfo.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FiPhone className="text-gray-400 mr-2" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={adminInfo.phone}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={adminInfo.password}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
