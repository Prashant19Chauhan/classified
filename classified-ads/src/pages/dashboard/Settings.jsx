import { useState } from "react";

const Settings = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    username: "john123",
    password: "",
    confirmPassword: "",
    aadhaarFront: null, // For storing front photo file
    aadhaarBack: null,  // For storing back photo file
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Handling file inputs for Aadhaar card
      setUserData((prev) => ({
        ...prev,
        [name]: files[0], // Only store the first file
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", userData);
    // You can send the data to your server or API here
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
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
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

        {/* Aadhaar Card Upload Section */}
        <section className="bg-[#2c2c2e] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">🆔 Aadhaar Card Upload</h2>
          <div>
            <label className="block text-sm mb-1">Aadhaar Front</label>
            <input
              type="file"
              name="aadhaarFront"
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm mb-1">Aadhaar Back</label>
            <input
              type="file"
              name="aadhaarBack"
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
            />
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
