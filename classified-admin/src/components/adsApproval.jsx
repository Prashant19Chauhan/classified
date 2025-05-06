import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEye, FaTrash, FaUserAlt, FaLink } from 'react-icons/fa';
import { adsList, adsApproval, fetchCreatorDetails } from '../api/adminService';
import toast, { Toaster } from 'react-hot-toast';

// Reason Modal Component
const ReasonModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason.trim()) {
      toast.error("Reason is required.");
      return;
    }
    onSubmit(reason);
    setReason('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Enter Reason for Disapproval</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          rows="4"
          placeholder="Write reason here..."
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Submit</button>
        </div>
      </div>
    </div>
  );
};

// Creator Modal Component
const CreatorModal = ({ isOpen, onClose, creator }) => {
  if (!isOpen || !creator) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Creator Details</h2>
        <p><span className="font-semibold">Name:</span> {creator.name || "N/A"}</p>
        <p><span className="font-semibold">Email:</span> {creator.email || "N/A"}</p>
        <p><span className="font-semibold">Phone:</span> {creator.phoneNumber || "N/A"}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
        </div>
      </div>
    </div>
  );
};

const LinkModel = ({ isOpen, onClose, links }) => {
  if (!isOpen || !links) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 transition-all transform scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Ad Links</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4">
          {links.map((data, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-3 hover:bg-gray-50"
            >
              <p className="text-sm font-medium mb-1">{data.label}</p>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline break-words"
              >
                {data.url}
              </a>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const AdsApproval = () => {
  const [ads, setAds] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [creatorDetails, setCreatorDetails] = useState(null);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reasonAdId, setReasonAdId] = useState(null);
  const [links, setLinks] = useState([]);
  const [showLinkModel, setShowLinkModel] = useState(false);

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

  const handleStatusUpdate = async (id, status, reason = '') => {
    try {
      await adsApproval({ id, status, reason });
      toast.success(`Ad ${status === 'approved' ? 'approved' : 'disapproved'} successfully`);
      await fetchAds();
    } catch (err) {
      toast.error("Failed to update ad status.");
    } finally {
      setReasonAdId(null);
      setShowReasonModal(false);
    }
  };

  const handleDisapproveClick = (adId) => {
    setReasonAdId(adId);
    setShowReasonModal(true);
  };

  const fetchCreator = async (creatorId) => {
    try {
      const result = await fetchCreatorDetails(creatorId);
      setCreatorDetails(result);
      setShowCreatorModal(true);
    } catch (err) {
      toast.error("Failed to fetch creator details.");
    }
  };

  const formatDuration = (duration) => {
    const [startStr, endStr] = duration.split("|");
    const start = new Date(startStr);
    const end = new Date(endStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return `${start.toLocaleDateString('en-US', options)} to ${end.toLocaleDateString('en-US', options)} (${days} day${days !== 1 ? 's' : ''})`;
  };

  const fetchLinks = (ad) => {
    setLinks(ad.links)
    setShowLinkModel(true)
  }

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
            className={`px-4 py-2 capitalize ${activeTab === status ? "border-b-2 border-blue-500 font-bold text-blue-600" : "text-gray-600"}`}
          >
            {status === 'notApproved' ? 'Not Approved' : status} Ads
          </button>
        ))}
      </div>

      {loading && <div className="mt-4 text-center text-blue-600 font-semibold">Loading ads...</div>}

      {/* Ads List */}
      <div className="mt-4">
        {!loading && currentAds.length === 0 && <p className="text-gray-500 text-center">No ads found in this category.</p>}

        {currentAds.map((ad) => (
          <div key={ad._id} className="border p-3 my-2 flex justify-between items-center rounded-md shadow-sm bg-white">
            <span className="font-medium text-gray-800">{ad.title}</span>
            <div className="space-x-2 flex">
              {activeTab === 'approved' && (
                <button onClick={() => handleStatusUpdate(ad._id, "notApproved", "Admin deleted the ad.")}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                  <FaTrash size={18} />
                </button>
              )}
              {activeTab === 'notApproved' && (
                <button onClick={() => handleStatusUpdate(ad._id, "approved")}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                  <FaCheckCircle size={18} />
                </button>
              )}
              {activeTab === 'pending' && (
                <>
                  <button onClick={() => handleStatusUpdate(ad._id, "approved")}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    <FaCheckCircle size={18} />
                  </button>
                  <button onClick={() => handleDisapproveClick(ad._id)}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    <FaTimesCircle size={18} />
                  </button>
                </>
              )}
              <button onClick={() => setSelectedAd(ad)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <FaEye size={18} />
              </button>
              <button onClick={() => fetchCreator(ad.creator)}
                className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                <FaUserAlt size={18} />
              </button>
              <button onClick={() => fetchLinks(ad)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <FaLink size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
            Prev
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      )}

      {/* View Ad Modal */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-xl">
            <button onClick={() => setSelectedAd(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl">
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedAd.title}</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Creator:</span> {selectedAd.creator || "N/A"}</p>
              <p><span className="font-semibold">Duration:</span> {selectedAd.duration ? formatDuration(selectedAd.duration) : "N/A"}</p>
              <p><span className="font-semibold">Status:</span> {selectedAd.status}</p>
              {selectedAd.imageUrl ? (
                <div>
                  <img src={`http://localhost:8800/uploads/${selectedAd.imageUrl}`}
                    alt="Ad" className="mt-3 max-h-64 w-full object-cover rounded" />
                  <button onClick={() => window.open(`http://localhost:8800/uploads/${selectedAd.imageUrl}`, '_blank')}
                    className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View Full Image
                  </button>
                </div>
              ) : (
                <div className="bg-gray-200 text-gray-600 p-4 rounded mt-3 text-center">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reason Modal */}
      <ReasonModal
        isOpen={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        onSubmit={(reason) => handleStatusUpdate(reasonAdId, 'notApproved', reason)}
      />

      {/* Creator Modal */}
      <CreatorModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
        creator={creatorDetails}
      />

      {/* Link Model */}
      <LinkModel
        isOpen={showLinkModel}
        onClose={() => setShowLinkModel(false)}
        links = {links}
      />
    </div>
  );
};

export default AdsApproval;
