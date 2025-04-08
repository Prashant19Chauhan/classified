import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAdsByUser } from '../../api/adsService';
import { FaEye, FaTimesCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
    switch (action) {
      case "Show":
        setSelectedAd(adItem);
        break;
      case "Refund":
        console.log("Refund requested for:", adItem._id);
        break;
      default:
        break;
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading ads...</p>;

  return (
    <div className="p-6 text-white relative">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Advertisement Dashboard</h2>

      <Section title="Currently Running Ads" data={adsData.activeAdsData} status="Active" buttons={[{ icon: FaEye, label: 'Show' }]} color="green" onAction={handleAction} />

      <Section title="Not Approved Ads" data={adsData.notApprovedAdsData} status="notApproved" buttons={[{ icon: FaEye, label: 'Show' }, { icon: FaTimesCircle, label: 'Refund' }]} color="red" onAction={handleAction} />

      <Section title="Approved Ads" data={adsData.approvedAdsData} status="approved" buttons={[{ icon: FaEye, label: 'Show' }]} color="blue" onAction={handleAction} />

      <Section title="Pending Ads" data={adsData.pendingAdsData} status="pending" buttons={[{ icon: FaEye, label: 'Show' }]} color="yellow" onAction={handleAction} />

      <Section title="Previous Ads" data={adsData.completedAdsData} status="Completed" buttons={[{ icon: FaEye, label: 'Show' }]} color="gray" onAction={handleAction} />

      {/* Modal */}
      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1f1f1f] w-[90%] max-w-lg rounded-xl p-6 shadow-xl relative text-white"
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
                onClick={() => setSelectedAd(null)}
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedAd.title}</h3>
              <img src={selectedAd.imageUrl} alt="Ad Visual" className="w-full h-56 object-cover rounded-md mb-4" />
              <p className="mb-2"><span className="font-semibold">Description:</span> {selectedAd.description || "No description"}</p>
              <p className="mb-2"><span className="font-semibold">Position:</span> {selectedAd.position}</p>
              <p className="mb-2"><span className="font-semibold">Duration:</span> {selectedAd.duration} days</p>
              <p className="mb-2"><span className="font-semibold">Status:</span> <span className="capitalize text-green-400">{selectedAd.status}</span></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section = ({ title, data, status, buttons, color, onAction }) => {
  const filteredData = data?.filter((item) => item.status === status);
  if (!filteredData?.length) return null;

  const statusColors = {
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    gray: "text-gray-400",
  };

  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item) => (
          <motion.div
            key={item._id}
            className="bg-[#2c2c2e] p-5 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between space-y-4 hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <h4 className="text-xl font-semibold text-white">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.description || "No description available."}</p>
              <p className={`text-sm mt-2 font-medium ${statusColors[color]} capitalize`}>
                Status: {item.status}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {buttons.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => onAction(label, item)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-sm px-4 py-2 rounded-lg transition duration-200"
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardHome;