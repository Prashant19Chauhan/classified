import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAdsByUser } from '../../api/adsService';
import { FaEye, FaTimesCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8800"}`;

const DashboardHome = () => {
  const currentUser = useSelector((state) => state.user);
  const user = currentUser?.currentUser?.user;
  const userId = user?.firebaseUID;

  const [adsData, setAdsData] = useState({
    activeAdsData: [],
    approvedAdsData: [],
    pendingAdsData: [],
    notApprovedAdsData: [],
    completedAdsData: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);
  const [visibleCounts, setVisibleCounts] = useState({
    active: 6,
    approved: 6,
    pending: 6,
    notApproved: 6,
    completed: 6
  });

  useEffect(() => {
    const fetchAllAds = async () => {
      try {
        const data = await fetchAdsByUser({ userId });

        const activeAds = data.activeAdsData || [];
        const scheduleAds = data.sheduleAdsData || [];
        const historyAds = data.historyAdsData || [];

        const approvedAds = scheduleAds.filter(ad => ad.status === "approved");
        const pendingAds = scheduleAds.filter(ad => ad.status === "pending");

        const notApprovedAds = historyAds.filter(ad => ad.status === "notApproved");
        const completedAds = historyAds.filter(ad => ad.status === "Completed");

        setAdsData({
          activeAdsData: activeAds,
          approvedAdsData: approvedAds,
          pendingAdsData: pendingAds,
          notApprovedAdsData: notApprovedAds,
          completedAdsData: completedAds
        });
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchAllAds();
  }, [userId]);

  const handleAction = (action, adItem) => {
    const fullAd = {
      ...adItem,
      imageUrl: `${API_URL}/uploads/${adItem.imageUrl}`,
    };
    switch (action) {
      case "Show":
        setSelectedAd(fullAd);
        break;
      case "Refund":
        console.log("Refund requested for:", adItem._id);
        break;
      default:
        break;
    }
  };

  function formatDateRange(duration) {
    if (!duration) return "N/A";
    const [startDate, endDate] = duration.split("|");
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString(undefined, options)} - ${end.toLocaleDateString(undefined, options)}`;
  }

  const handleLoadMore = (sectionKey) => {
    setVisibleCounts(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey] + 6
    }));
  };

  if (loading) return <p className="text-center text-gray-400">Loading ads...</p>;

  return (
    <div className="p-6 text-white relative">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Advertisement Dashboard</h2>

      <Section title="Currently Running Ads" data={adsData.activeAdsData} status="Active" color="green" buttons={[{ icon: FaEye, label: 'Show' }]} onAction={handleAction} visibleCount={visibleCounts.active} onLoadMore={() => handleLoadMore('active')} />

      <Section title="Not Approved Ads" data={adsData.notApprovedAdsData} status="notApproved" color="red" buttons={[{ icon: FaEye, label: 'Show' }, { icon: FaTimesCircle, label: 'Refund' }]} onAction={handleAction} visibleCount={visibleCounts.notApproved} onLoadMore={() => handleLoadMore('notApproved')} />

      <Section title="Approved Ads" data={adsData.approvedAdsData} status="approved" color="blue" buttons={[{ icon: FaEye, label: 'Show' }]} onAction={handleAction} visibleCount={visibleCounts.approved} onLoadMore={() => handleLoadMore('approved')} />

      <Section title="Pending Ads" data={adsData.pendingAdsData} status="pending" color="yellow" buttons={[{ icon: FaEye, label: 'Show' }]} onAction={handleAction} visibleCount={visibleCounts.pending} onLoadMore={() => handleLoadMore('pending')} />

      <Section title="Previous Ads" data={adsData.completedAdsData} status="Completed" color="gray" buttons={[{ icon: FaEye, label: 'Show' }]} onAction={handleAction} visibleCount={visibleCounts.completed} onLoadMore={() => handleLoadMore('completed')} />

      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1f1f1f] w-[90%] max-w-lg rounded-xl p-6 shadow-xl relative text-white"
            >
              <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg" onClick={() => setSelectedAd(null)}>
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedAd.title}</h3>
              <img src={selectedAd.imageUrl} alt="Ad Visual" className="w-full h-56 object-cover rounded-md mb-4" />
              <p className="mb-2"><span className="font-semibold">Description:</span> {selectedAd.description || "No description"}</p>
              <p className="mb-2"><span className="font-semibold">Position:</span> {selectedAd.position}</p>
              <p className="mb-2"><span className="font-semibold">Duration:</span> {formatDateRange(selectedAd.duration)}</p>
              <p className="mb-2"><span className="font-semibold">Status:</span> <span className="capitalize text-green-400">{selectedAd.status}</span></p>
              {selectedAd.reason && (
                <p className="mb-2"><span className="font-semibold">Reason:</span> <span className="capitalize text-red-600">{selectedAd.reason}</span></p>
              )}
              <div className="space-y-1">
                {selectedAd.links.map((data, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-2"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section = ({ title, data, status, buttons, color, onAction, visibleCount, onLoadMore }) => {
  const filteredData = data?.filter((item) => item.status === status) || [];
  const visibleData = filteredData.slice(0, visibleCount);

  const statusColors = {
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    gray: "text-gray-400",
  };

  if (!filteredData?.length) return null;

  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleData.map((item) => (
          <motion.div
            key={item._id}
            className="p-5 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between space-y-4 hover:shadow-xl transition duration-300 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${API_URL}/uploads/${item.imageUrl})` }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-black/60 p-4 rounded-md">
              <h4 className="text-xl font-semibold text-white">{item.title}</h4>
              <p className="text-sm text-gray-300">{item.description || "No description available."}</p>
              <p className={`text-sm mt-2 font-medium ${statusColors[color]} capitalize`}>Status: {item.status}</p>
              {item.reason && (
                <p className={`text-sm mt-2 font-medium ${statusColors[color]} capitalize`}>Reason: {item.reason}</p>
              )}
            </div>
            <div className="flex space-x-4 mt-4">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => onAction(button.label, item)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg flex items-center space-x-2"
                >
                  <button.icon className="text-lg" />
                  <span>{button.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      {filteredData.length > visibleCount && (
        <button
          onClick={onLoadMore}
          className="mt-4 px-6 py-3 w-full bg-gray-700 hover:bg-gray-600 text-white rounded-md"
        >
          Load More
        </button>
      )}
    </motion.div>
  );
};

export default DashboardHome;
