import { useEffect, useState } from "react";

const DashboardHome = () => {
  const [ads, setAds] = useState([]);


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Ads</h2>
      <div className="grid grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad._id} className="border p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{ad.title}</h3>
            <p className="text-sm text-gray-600">{ad.description}</p>
            {ad.imageUrl && <img src={`http://localhost:5000/${ad.imageUrl}`} alt={ad.title} className="w-full h-32 object-cover mt-2" />}
            <p className="text-xs text-gray-500 mt-2">Size: {ad.size}, Position: {ad.position}</p>
            <p className={`mt-2 text-sm font-bold ${ad.status === "approved" ? "text-green-600" : "text-yellow-600"}`}>
              {ad.status.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
  
  export default DashboardHome;
  