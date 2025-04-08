import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAds } from "../api/adsService";

function Epaper() {
  const [ePaper, setEpaper] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const epaperData = await getAds();
        setEpaper(epaperData);
      } catch (err) {
        console.error("Error fetching e-paper ads:", err);
        setError("Failed to load e-paper ads.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-12 px-4 md:px-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center text-gray-800 mb-12"
      >
        📰 Latest E-Paper Ads
      </motion.h1>

      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading ads...</p>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {ePaper.map((ads, index) => (
            <motion.div
              key={ads._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out overflow-hidden"
            >
              <img
                src={ads.image}
                alt="Ad"
                className="w-full h-60 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-1">
                  {new Date(ads.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-xl font-semibold text-gray-900">
                  Ad Spotlight
                </h2>
                <p className="text-sm text-gray-700 mt-1">
                  Discover the latest promotions and featured content.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Epaper;
