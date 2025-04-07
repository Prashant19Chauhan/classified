import { useState } from "react";
import { addUserRole } from "../api/adminService";

function AddUser() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
    permissions: [],
  });

  const roles = ["admin", "moderator", "user"];
  const permissionsList = [
    "View Dashboard",
    "Manage Ads",
    "Manage Users",
    "View Analytics",
    "Edit Settings",
    "Classified",
    "Classified Settings",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setUserData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUserRole(userData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userData.name}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Permissions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {permissionsList.map((permission) => (
                <label key={permission} className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={userData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="accent-blue-500"
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
