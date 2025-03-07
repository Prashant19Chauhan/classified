import { useState } from "react";

function setting() {
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
    // API call to update admin details can be made here
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-1/2 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={adminInfo.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={adminInfo.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={adminInfo.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={adminInfo.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Update Info</button>
      </form>
    </div>
  );
}

export default setting
