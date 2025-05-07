import React, { useEffect, useState } from 'react';
import { userInfoApi, classifiedInfoApi, getUserAds } from '../api/adminService';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8800";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("classifieds");
  const [users, setUsers] = useState([]);
  const [classifieds, setClassifieds] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAds, setUserAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await userInfoApi();
      setUsers(userData);

      const classifiedData = await classifiedInfoApi();
      setClassifieds(classifiedData);
    };

    fetchData();
  }, []);

  const loadUserAds = async (userId) => {
    const ads = await getUserAds(userId);
    setUserAds(ads);
  };

  return (
    <div className="flex h-screen overflow-hidden text-gray-900 dark:text-white">
      
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 font-bold text-xl flex justify-between items-center">
          {sidebarOpen && <span>Dashboard</span>}
        </div>
        <div className="flex flex-col space-y-2 px-2">
          <button onClick={() => setActiveTab('users')} className={`p-2 rounded ${activeTab === 'users' ? 'bg-gray-700' : ''}`}>
            👤 {sidebarOpen && 'Users'}
          </button>
          <button onClick={() => setActiveTab('classifieds')} className={`p-2 rounded ${activeTab === 'classifieds' ? 'bg-gray-700' : ''}`}>
            📰 {sidebarOpen && 'Classifieds'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">🛠 Admin Dashboard</h1>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {users.map(user => (
                <div key={user._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p>{user.email}</p>
                  <button
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelectedUser(user);
                      loadUserAds(user.firebaseUID);
                    }}
                  >
                    View Ads
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Classifieds Tab */}
        {activeTab === 'classifieds' && (
          <>
            <h2 className="text-xl font-semibold mb-4">Classifieds</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {classifieds.map(item => (
                <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                  <p className="font-semibold">🧩 {item.layout}</p>
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                  {item.file?.endsWith('.pdf') ? (
                    <iframe
                      src={`${API_URL}/classifieds/${item.file}`}
                      className="w-full h-40 mt-2 rounded"
                      title="Classified PDF"
                    />
                  ) : (
                    <img
                      src={`${API_URL}/classifieds/${item.image}`}
                      alt="Classified"
                      className="w-full h-40 object-cover mt-2 rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Drawer for Ads */}
      {selectedUser && userAds.length > 0 && (
        <div className="w-70 bg-white dark:bg-gray-800 p-4 overflow-y-auto border-l border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold">📢 Ads by {selectedUser.name}</h3>
          <button className="text-red-500 text-sm mb-2" onClick={() => setSelectedUser(null)}>Close</button>
          <div className="space-y-4">
            {userAds.map(ad => (
              <div key={ad._id} className="border rounded p-2 dark:border-gray-700">
                <img src={`${API_URL}/uploads/${ad.imageUrl}`} className="w-full h-32 object-cover rounded" />
                <h4 className="mt-1 font-semibold text-sm">{ad.title}</h4>
                <p className="text-xs text-gray-500">Status: {ad.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
