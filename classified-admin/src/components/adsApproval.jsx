import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEye, FaTrash } from 'react-icons/fa';
import { adsList, adsApproval } from '../api/adminService';
import toast, { Toaster } from 'react-hot-toast';

const AdsApproval = () => {
  const [ads, setAds] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const adsPerPage = 10;

  const fetchAds = async () => {
    try {
      setLoading(true);
      const result = await adsList();
      setAds(result);
    } catch (err) {
      toast.error("Failed to load ads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const filteredAds = ads.filter((ad) => ad.status === activeTab);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const currentAds = filteredAds.slice(
    (currentPage - 1) * adsPerPage,
    currentPage * adsPerPage
  );

  const handleStatusUpdate = async (id, status) => {
    try {
      await adsApproval({ id, status });
      toast.success(`Ad ${status === 'approved' ? 'approved' : status === 'notApproved' ? 'disapproved' : 'deleted'} successfully`);
      await fetchAds();
    } catch (err) {
      toast.error("Failed to update ad status.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
    if (confirmDelete) {
      await handleStatusUpdate(id, "notApproved");
    }
  };

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Ads Approval</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {["approved", "notApproved", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setActiveTab(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 capitalize ${
              activeTab === status
                ? "border-b-2 border-blue-500 font-bold text-blue-600"
                : "text-gray-600"
            }`}
          >
            {status === 'notApproved' ? 'Not Approved' : status} Ads
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-4 text-center text-blue-600 font-semibold">Loading ads...</div>
      )}

      {/* Ads List */}
      <div className="mt-4">
        {!loading && currentAds.length === 0 && (
          <p className="text-gray-500 text-center">No ads found in this category.</p>
        )}

        {currentAds.map((ad) => (
          <div
            key={ad._id}
            className="border p-3 my-2 flex justify-between items-center rounded-md shadow-sm bg-white"
          >
            <span className="font-medium text-gray-800">{ad.title}</span>
            <div className="space-x-2 flex">
              {activeTab === 'approved' && (
                <button
                  onClick={() => handleDelete(ad._id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <FaTrash size={18} />
                </button>
              )}
              {activeTab === 'notApproved' && (
                <button
                  onClick={() => handleStatusUpdate(ad._id, "approved")}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <FaCheckCircle size={18} />
                </button>
              )}
              {activeTab === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(ad._id, "approved")}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <FaCheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(ad._id, "notApproved")}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    <FaTimesCircle size={18} />
                  </button>
                </>
              )}
              <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <FaEye size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdsApproval;
