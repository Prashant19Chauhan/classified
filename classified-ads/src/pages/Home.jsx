import React from "react";
import { Link } from "react-router-dom";

const nextIssueDate = "Sunday 13 April 2025";
const bookingDeadline = "Wednesday 09 April 2025";

function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-yellow-100 py-16 px-4 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">📢 Ujala Classified</h1>
        <p className="text-xl md:text-2xl mb-6">Advertise your business or service across Uttarakhand with Ujala!</p>
        <Link
          to="/post-ad"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Post Your Ad Now
        </Link>
      </div>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">📅 Next Issue:</h2>
          <p className="text-lg">{nextIssueDate}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">🕒 Booking Closes:</h2>
          <p className="text-lg text-red-500">{bookingDeadline}</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {["Matrimonial Ads", "Property Ads", "Jobs & Vacancies", "Business Promotions", "Education", "Events & Public Notices"].map(service => (
            <div key={service} className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{service}</h3>
              <p className="text-sm text-gray-600">Post your {service.toLowerCase()} quickly and easily.</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-100 py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">1️⃣</span>
            <p>Click on <Link to="/post-ad" className="text-blue-600 underline">Post Ad</Link> and select your ad type.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">2️⃣</span>
            <p>Fill in your ad details, attach image/logo if needed.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">3️⃣</span>
            <p>Make secure payment and get your ad published in the next Ujala issue.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Reach Thousands?</h2>
        <p className="text-lg mb-6">Post your ad in the next edition of Ujala Classified today.</p>
        <Link
          to="/post-ad"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
        >
          Post Your Ad Now
        </Link>
      </div>
    </div>
  )
}

export default Home
