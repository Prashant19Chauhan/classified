import React from "react";
import { Link } from "react-router-dom";

const nextIssueDate = "Sunday 13 April 2025";
const bookingDeadline = "Wednesday 09 April 2025";

function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-400 py-20 px-4 text-center shadow-lg rounded-b-lg mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          📢 Ujala Classified
        </h1>
        <p className="text-xl sm:text-2xl text-white mb-6">
          Advertise your business or service across Uttarakhand with Ujala!
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-100 transition duration-300"
        >
          Post Your Ad Now
        </Link>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-blue-700 mb-2">📅 Next Issue:</h2>
          <p className="text-lg font-medium text-gray-800">{nextIssueDate}</p>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-blue-600 mb-2">🕒 Booking Closes:</h2>
          <p className="text-lg font-medium text-gray-800">{bookingDeadline}</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-16 px-4 sm:px-6">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">Our Services</h2>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {["Matrimonial Ads", "Property Ads", "Jobs & Vacancies", "Business Promotions", "Education", "Events & Public Notices"].map(service => (
            <div key={service} className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">{service}</h3>
              <p className="text-gray-600 text-sm">Post your {service.toLowerCase()} quickly and easily.</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-8 text-lg text-gray-700">
          <div className="flex items-start gap-6">
            <span className="text-3xl text-yellow-600">1️⃣</span>
            <p>Click on <Link to="/dashboard" className="text-blue-600 underline font-medium">Post Ad</Link> and select your ad type.</p>
          </div>
          <div className="flex items-start gap-6">
            <span className="text-3xl text-yellow-600">2️⃣</span>
            <p>Fill in your ad details, attach images or logos if needed.</p>
          </div>
          <div className="flex items-start gap-6">
            <span className="text-3xl text-yellow-600">3️⃣</span>
            <p>Make secure payment and get your ad published in the next Ujala issue.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-6">Ready to Reach Thousands?</h2>
        <p className="text-lg mb-8">Post your ad in the next edition of Ujala Classified today.</p>
        <Link
          to="/dashboard"
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          Post Your Ad Now
        </Link>
      </div>
    </div>
  );
}

export default Home;
