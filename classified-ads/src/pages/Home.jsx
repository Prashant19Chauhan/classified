import React from "react";
import { Link } from "react-router-dom";

const nextIssueDate = "Sunday 13 April 2025";
const bookingDeadline = "Wednesday 09 April 2025";

function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* Hero Section */}
<div className="bg-gradient-to-r from-yellow-400 to-yellow-200 py-16 px-6 sm:px-12 lg:px-20 flex justify-center items-center">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
    {/* Left Content */}
    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
        Advertise in Ujala Classified
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Reach thousands of people across Uttarakhand every week. Promote your business, service, or message with us!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link
          to="/login"
          className="bg-white text-yellow-600 border border-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-yellow-100 transition"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-700 transition"
        >
          Create Ad
        </Link>
      </div>
    </div>

    {/* Right Image */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=600&q=80"
        alt="Advertising illustration"
        className="w-full max-w-md rounded-xl shadow-lg"
      />
    </div>
  </div>
</div>


      {/* Vintage Scrolling Info Strip */}
      <div className="bg-yellow-100 border-t border-b border-yellow-300 py-2 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap text-center text-yellow-900 font-semibold text-sm tracking-wide">
          📰 Book your ad today • Next Ujala Issue: {nextIssueDate} • Booking Closes: {bookingDeadline} • Call us now for classified advertisement deals • Limited spots available!
        </div>
      </div>

{/* Services Section */}
<div className="bg-yellow-50 py-20 px-4 sm:px-6">
  <h2 className="text-4xl font-extrabold text-center text-yellow-700 mb-14 font-serif">Our Featured Services</h2>
  <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
    {[
      {
        name: "Matrimonial Ads",
        img: "https://cdn-icons-png.flaticon.com/512/620/620812.png", // Couple Icon
      },
      {
        name: "Property Ads",
        img: "https://cdn-icons-png.flaticon.com/512/1162/1162328.png", // House Icon
      },
      {
        name: "Jobs & Vacancies",
        img: "https://cdn-icons-png.flaticon.com/512/1671/1671671.png", // Job Vacancy Icon
      },      
      {
        name: "Business Promotions",
        img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png", // Megaphone Icon
      },
      {
        name: "Education",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png", // Graduation Cap
      },
      {
        name: "Events & Public Notices",
        img: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png", // Calendar Icon
      },
    ].map(service => (
      <div
        key={service.name}
        className="bg-yellow-100 p-8 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 group cursor-pointer"
      >
        <img
          src={service.img}
          alt={service.name}
          className="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition"
        />
        <h3 className="text-xl font-bold text-yellow-800 mb-3">{service.name}</h3>
        <p className="text-gray-700 text-sm">
          Post your {service.name.toLowerCase()} quickly and easily.
        </p>
      </div>
    ))}
  </div>
</div>


      {/* How It Works */}
<div className="bg-yellow-50 py-20 px-4 sm:px-6">
  <h2 className="text-4xl font-extrabold text-center text-yellow-700 mb-16 font-serif">How It Works</h2>
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Left Side Image */}
    <div className="flex justify-center">
      <img
        src="/assets/banner.jpg"
        alt="How it works illustration"
        className="w-full max-w-sm animate-fade-in-up"
      />
    </div>

    {/* Right Side Steps */}
    <div className="space-y-10">
      {[
        {
          step: "1",
          text: <>
            Click on <Link to="/dashboard" className="text-blue-600 underline font-medium">Post Ad</Link> and select your ad type.
          </>
        },
        {
          step: "2",
          text: "Fill in your ad details, attach images or logos if needed.",
        },
        {
          step: "3",
          text: "Make secure payment and get your ad published in the next Ujala issue.",
        }
      ].map(({ step, text }) => (
        <div key={step} className="flex items-start gap-6">
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-white text-lg font-bold rounded-full shadow-md">
            {step}
          </div>
          <p className="text-lg text-gray-800 leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-24 text-gray-900 text-center rounded-b-3xl shadow-lg">
  <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-900">
    Ready to Reach Thousands?
  </h2>
  <p className="text-lg sm:text-xl mb-10 font-medium tracking-wide opacity-90">
    Post your ad in the next edition of Ujala Classified today and reach your target audience effectively.
  </p>
  <Link
    to="/dashboard"
    className="bg-white text-yellow-700 px-10 py-5 rounded-full font-semibold text-xl shadow-lg hover:shadow-2xl hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105"
  >
    Post Your Ad Now
  </Link>
</div>
    </div>
  );
}

export default Home;
