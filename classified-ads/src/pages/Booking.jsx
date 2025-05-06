import { useState } from "react";
import { fetchBookings } from "../api/adsService";

function AdClassifiedBooking() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    adType: "",
    size: "",
    file: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await(fetchBookings(formData));
    console.log("Ad Booking Data:", formData);
    alert("Ad booking submitted successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-yellow-600 mb-8">
          Ad Classified Booking Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <select
            name="adType"
            value={formData.adType}
            onChange={handleChange}
            required
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="" disabled>Select Ad Type</option>
            <option value="Classified">Classified (Up to 24 words)</option>
            <option value="Box Facility">Box Facility</option>
            <option value="Full Page">Full Page</option>
            <option value="Half Page">Half Page</option>
            <option value="Quarter Page">Quarter Page</option>
          </select>
          <input
            type="text"
            name="size"
            placeholder="Ad Size (Optional)"
            value={formData.size}
            onChange={handleChange}
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="file"
            name="file"
            value={formData.file}
            onChange={handleChange}
            required
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            name="message"
            placeholder="Additional Message (Optional)"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 col-span-1 sm:col-span-2"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-600 text-white font-medium py-3 rounded-lg hover:bg-yellow-700 col-span-1 sm:col-span-2 transition ease-in-out duration-300"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdClassifiedBooking;
