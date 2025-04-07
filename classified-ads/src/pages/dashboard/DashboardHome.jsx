import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAdsByUser } from '../../api/adsService';
import { FaEye, FaEdit, FaRedo, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DashboardHome = () => {
  const currentUser = useSelector((state) => state.user);
  const user = currentUser?.currentUser?.findUser;
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
      <h2 className="text-3xl font-bold mb-8 text-center">Your Advertisement Dashboard</h2>

      <Section
        title="Currently Running Ads"
        data={adsData.activeAdsData}
        status="Active"
        buttons={[
          { icon: FaEye, label: 'Show' },
          { icon: FaClock, label: 'Extend Duration' },
        ]}
        color="green"
      />

      <Section
        title="Not Approved Ads"
        data={adsData.historyAdsData}
        status="notApproved"
        buttons={[
          { icon: FaEye, label: 'Show' },
          { icon: FaRedo, label: 'Republish' },
          { icon: FaTimesCircle, label: 'Refund' },
        ]}
        color="red"
      />

      <Section
        title="Approved Ads"
        data={adsData.sheduleAdsData}
        status="approved"
        buttons={[{ icon: FaEye, label: 'Show' }]}
        color="blue"
      />

      <Section
        title="Pending Ads"
        data={adsData.sheduleAdsData}
        status="pending"
        buttons={[
          { icon: FaEye, label: 'Show' },
          { icon: FaEdit, label: 'Edit' },
        ]}
        color="yellow"
      />

      <Section
        title="Previous Ads"
        data={adsData.historyAdsData}
        status="Completed"
        buttons={[
          { icon: FaEye, label: 'Show' },
          { icon: FaRedo, label: 'Republish' },
        ]}
        color="gray"
      />
    </div>
  );
};

const Section = ({ title, data, status, buttons, color }) => {
  const filteredData = data?.filter((item) => item.status === status);

  if (filteredData?.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-[#2c2c2e] p-5 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between space-y-4 hover:shadow-xl transition duration-300"
          >
            <div>
              <h4 className="text-xl font-semibold text-white">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.description || "No description available."}</p>
              <p className={`text-sm mt-2 font-medium text-${color}-400 capitalize`}>
                Status: {item.status}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {buttons.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-sm px-4 py-2 rounded-lg transition duration-200"
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
