import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAds } from "../api/adsService";
import {useNavigate} from 'react-router-dom'

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8800"}`;

function Epaper() {
  const navigate = useNavigate();
  const [ePaper, setEpaper] = useState([]);
  console.log(ePaper)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const epaperData = await getAds();
        setEpaper(epaperData.reverse());
      } catch (err) {
        console.error("Error fetching e-paper ads:", err);
        setError("Failed to load e-paper ads.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const clickHandler = (key) => {
    console.log(key)
    navigate(`/epaper/${key}`)
  }

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
              className="relative h-80 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition duration-300 ease-in-out"
              onClick={() => clickHandler(ads.file)}
            >
              {/* Image as background */}
              <img
                src={`${API_URL}/classifieds/${ads.image}`}
                alt="Ad"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Date overlay */}
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {new Date(ads.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );  
}

export default Epaper;
