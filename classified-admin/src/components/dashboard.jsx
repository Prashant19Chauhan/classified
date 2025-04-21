import React, { useState } from 'react';

const Dashboard = () => {
  const [selectedUserAds, setSelectedUserAds] = useState([]);

  const users = [
    { _id: 'u1', name: 'Amit Sharma', email: 'amit@example.com' },
    { _id: 'u2', name: 'Priya Singh', email: 'priya@example.com' }
  ];

  const classifieds = [
    { _id: 'c1', title: 'Used Maruti Suzuki Swift 2018' },
    { _id: 'c2', title: 'Hyundai Venue 2020 for Sale' }
  ];

  const offers = [
    { _id: 'o1', title: '15% Off on Premium Ads' },
    { _id: 'o2', title: 'Free Highlight for 7 Days' }
  ];

  const dummyUserAds = {
    u1: [
      { _id: 'a1', title: 'Swift VXi – 2017 – Petrol' },
      { _id: 'a2', title: 'Honda City ZX – 2019 – Diesel' }
    ],
    u2: [
      { _id: 'a3', title: 'Brezza – 2022 – Petrol' }
    ]
  };

  const loadUserAds = (userId) => {
    setSelectedUserAds(dummyUserAds[userId] || []);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard (Sample)</h1>

      {/* Users Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => loadUserAds(user._id)}
                  >
                    View Ads
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUserAds.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">User Ads</h3>
            <ul className="list-disc ml-6">
              {selectedUserAds.map((ad) => (
                <li key={ad._id}>{ad.title}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Classifieds Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Published Classifieds</h2>
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {classifieds.map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border">{item.title}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Offers Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Offers</h2>
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Offer</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="py-2 px-4 border">{offer.title}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
