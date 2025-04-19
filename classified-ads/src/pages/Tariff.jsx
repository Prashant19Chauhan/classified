import React from 'react';

function Tariff() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12 max-w-6xl mx-auto rounded-xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <h1 className="text-5xl font-extrabold mb-8 text-center border-b-4 border-yellow-500 inline-block pb-2 bg-clip-text">
        Tariff Card
      </h1>

      <div className="space-y-8 text-lg">
        <p>
          <strong className="text-yellow-500">Ujala Classified</strong> offers a variety of advertising options that cater to all your needs. Below are the details of our advertising rates, designed to help you choose the perfect plan for your business.
        </p>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Ad Type</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Size</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Rate (₹)</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <tr className="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Classified (Up to 24 words)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">200</td>
              </tr>
              <tr className="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Extra per word</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">10</td>
              </tr>
              <tr className="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Box Facility</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">50</td>
              </tr>
              <tr className="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Full Page (Inside)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">24.51 cm x 32.00 cm</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">20,000</td>
              </tr>
              <tr className="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Half Page</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">24.51 cm x 16.00 cm</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">10,000</td>
              </tr>
              <tr className="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Quarter Page</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">19.56 cm x 16.00 cm</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">4,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 pt-4">
          * All rates are subject to an additional 5% GST.
        </p>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <p className="font-semibold text-white">📞 Contact Us:</p>
          <p className="text-white">
            Phone: <a href="tel:+911352717171" className="text-blue-100 hover:text-white transition duration-300">+91-135-2717171</a>
          </p>
          <p className="text-white">
            Mobile: <a href="tel:+918899717171" className="text-blue-100 hover:text-white transition duration-300">+91-88-99-71-71-71</a>
          </p>
          <p className="text-white">
            Email: <a href="mailto:booking@dehradunclassified.com" className="text-blue-100 hover:text-white transition duration-300">booking@dehradunclassified.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Tariff;
