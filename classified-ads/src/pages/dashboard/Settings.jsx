import { useState } from "react";

const Settings = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
    confirmPassword: "",
    theme: "dark",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", userData);
    // Save logic here
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">⚙️ User Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Profile Section */}
        <section className="bg-[#2c2c2e] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">👤 Profile Info</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Password Section */}
        <section className="bg-[#2c2c2e] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">🔒 Change Password</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-[#2c2c2e] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">🎨 Preferences</h2>
          <div>
            <label className="block text-sm mb-2">Theme</label>
            <select
              name="theme"
              value={userData.theme}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </section>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white font-medium transition"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
