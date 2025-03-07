import { useState } from "react";
import { addUserRole } from "../api/adminService";

function addUser() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
    permissions: []
  });

  const roles = ["admin", "moderator", "user"];
  const permissionsList = ["View Dashboard", "Manage Ads", "Manage Users", "View Analytics", "Edit Settings"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setUserData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addUserRole(userData);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-1/2 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          value={userData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select name="role" value={userData.role} onChange={handleChange} className="w-full p-2 border rounded">
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <div>
          <h3 className="font-medium">Permissions:</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {permissionsList.map((permission) => (
              <label key={permission} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={userData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
      </form>
    </div>
  );
};

export default addUser
