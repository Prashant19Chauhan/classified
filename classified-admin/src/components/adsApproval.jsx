import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEye, FaTrash } from 'react-icons/fa';

const AdsApproval = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [ads, setAds] = useState([
    { _id: 1, title: 'Ad 1', status: 'approved' },
    { _id: 2, title: 'Ad 2', status: 'notApproved' },
    { _id: 3, title: 'Ad 3', status: 'pending' },
    { _id: 4, title: 'Ad 4', status: 'approved' },
    { _id: 5, title: 'Ad 5', status: 'pending' },
  ]);
  
  const adsPerPage = 2;
  const filteredAds = ads.filter(ad => ad.status === activeTab);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const currentAds = filteredAds.slice((currentPage - 1) * adsPerPage, currentPage * adsPerPage);

  const handleApprove = (id) => {
    setAds(prevAds => prevAds.map(ad => ad._id === id ? { ...ad, status: 'approved' } : ad));
  };

  const handleNotApprove = (id) => {
    setAds(prevAds => prevAds.map(ad => ad._id === id ? { ...ad, status: 'notApproved' } : ad));
  };

  const handleDelete = (id) => {
    setAds(prevAds => prevAds.filter(ad => ad._id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ads Approval</h1>
      <div className="flex space-x-4 border-b pb-2">
        <button onClick={() => { setActiveTab('approved'); setCurrentPage(1); }} className={`px-4 py-2 ${activeTab === 'approved' ? 'border-b-2 border-blue-500 font-bold' : ''}`}>Approved Ads</button>
        <button onClick={() => { setActiveTab('notApproved'); setCurrentPage(1); }} className={`px-4 py-2 ${activeTab === 'notApproved' ? 'border-b-2 border-blue-500 font-bold' : ''}`}>Not Approved Ads</button>
        <button onClick={() => { setActiveTab('pending'); setCurrentPage(1); }} className={`px-4 py-2 ${activeTab === 'pending' ? 'border-b-2 border-blue-500 font-bold' : ''}`}>Pending Approval</button>
      </div>

      <div className="mt-4">
        {currentAds.map(ad => (
          <div key={ad._id} className="border p-2 my-2 flex justify-between items-center">
            <span>{ad.title}</span>
            <div className="space-x-2 flex">
              {activeTab === 'approved' && (
                <button onClick={() => handleDelete(ad._id)} className="p-2 bg-red-500 text-white rounded">
                  <FaTrash size={18} />
                </button>
              )}
              {activeTab === 'notApproved' && (
                <button onClick={() => handleApprove(ad._id)} className="p-2 bg-green-500 text-white rounded">
                  <FaCheckCircle size={18} />
                </button>
              )}
              {activeTab === 'pending' && (
                <>
                  <button onClick={() => handleApprove(ad._id)} className="p-2 bg-green-500 text-white rounded">
                    <FaCheckCircle size={18} />
                  </button>
                  <button onClick={() => handleNotApprove(ad._id)} className="p-2 bg-yellow-500 text-white rounded">
                    <FaTimesCircle size={18} />
                  </button>
                </>
              )}
              <button className="p-2 bg-blue-500 text-white rounded">
                <FaEye size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex space-x-2">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdsApproval;