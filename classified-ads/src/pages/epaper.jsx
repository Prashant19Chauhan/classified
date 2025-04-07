import { useState, useEffect } from "react";
import { getAds } from "../api/adsService";

function Epaper() {
  const [ePaper, setEpaper] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const epaperData = await getAds();
      setEpaper(epaperData);
    };
    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-12 px-4 md:px-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        📰 Latest E-Paper Ads
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ePaper.map((ads) => (
          <div
            key={ads._id}
            className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out overflow-hidden"
          >
            <img
              src={ads.image}
              alt="Ad"
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <p className="text-xs text-gray-600 mb-1">
                {new Date(ads.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="text-xl font-semibold text-gray-900">Ad Spotlight</h2>
              <p className="text-sm text-gray-700 mt-1">
                Discover the latest promotions and featured content.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Epaper;
