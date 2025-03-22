import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAdsByUser } from '../../api/adsService';
import { FaEye, FaEdit, FaRedo, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DashboardHome = () => {
  const currentUser = useSelector(state => state.user);
  const userDetail = currentUser?.currentUser;
  const user = userDetail?.findUser;
  const userId = user?.firebaseUID;

  const [adsData, setAdsData] = useState({
    activeAdsData: [],
    sheduleAdsData: [],
    historyAdsData: [],
  });

  useEffect(() => {
    const fetchAllAds = async () => {
      const data = await fetchAdsByUser({ userId });
      setAdsData(data);
    };
    fetchAllAds();
  }, [userId]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">All Ads</h2>
      
      {/* Active Ads */}
      <Section title="Currently Running Ads" data={adsData.activeAdsData} status="Active" buttons={[{ icon: FaEye, label: "Show" }, { icon: FaClock, label: "Extend Duration" }]} />
      
      {/* Not Approved Ads */}
      <Section title="Not Approved Ads" data={adsData.historyAdsData} status="notApproved" buttons={[{ icon: FaEye, label: "Show" }, { icon: FaRedo, label: "Republish" }, { icon: FaTimesCircle, label: "Refund" }]} />
      
      <Section title="Approved Ads" data={adsData.sheduleAdsData} status="approved" buttons={[{ icon: FaEye, label: "Show" }]} />
      
      {/* Pending Ads */}
      <Section title="Pending Ads" data={adsData.sheduleAdsData} status="pending" buttons={[{ icon: FaEye, label: "Show" }, { icon: FaEdit, label: "Edit" }]} />
      
      {/* Previous Ads */}
      <Section title="Previous Ads" data={adsData.historyAdsData} status="Completed" buttons={[{ icon: FaEye, label: "Show" }, { icon: FaRedo, label: "Republish" }]} />
    </div>
  );
};

const Section = ({ title, data, status, buttons }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">{title}</h3>
    <div className="grid gap-4">
      {data?.filter(item => item.status === status).map(item => (
        <div key={item._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between">
          <h1 className="text-lg font-medium mb-2">{item.title}</h1>
          <div className="flex gap-2">
            {buttons.map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm">
                <Icon /> {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DashboardHome;