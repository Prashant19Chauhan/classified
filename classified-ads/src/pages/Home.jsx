import { useEffect, useState } from "react";
import Header from "../components/header";
import {getAds} from '../api/adsService';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const layoutOptions = [
    { position: 1, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 2, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 3, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 4, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 5, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 6, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 7, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 8, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 9, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 10, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 11, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 12, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 13, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 14, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 15, size: "w-[49%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 16, size: "w-[49%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 17, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 18, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 19, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 20, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 21, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 22, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 23, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 24, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 25, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 26, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 27, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 28, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 29, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 30, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 31, size: "w-[49%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 32, size: "w-[49%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 33, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 34, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 35, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 36, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 37, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 38, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 39, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 40, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 41, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 42, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 43, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 44, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 45, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 46, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 47, size: "w-[49%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 48, size: "w-[49%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 49, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 50, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 51, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 52, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 53, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 54, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 55, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 56, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 57, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 58, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 59, size: "w-[24%] h-[70vh]", imageUrl: "/assets/ads.jpg" },
    { position: 60, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 61, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
    { position: 62, size: "w-[33%] h-[90vh]", imageUrl: "/assets/ads.jpg" },
  ];
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch Ads from Backend (Mock Data for Now)
    const fetchAds = async () => {
      const sampleAds = await getAds();
      setAds(sampleAds);
    };
    fetchAds();
  }, []);

  const showads = (id) => {
    navigate(`/ads/${id}`)
  }

  return (
    <div className="min-h-screen p-6">
      <Header/>

      <div className="flex flex-wrap justify-around">
        {layoutOptions.map((option) => {
          const adForPosition = ads.find((ad) => ad.position == option.position);
          return (
            <div
              key={option.position}
              className={`bg-gray-200 rounded p-4 text-2xl text-black mb-2 ${option.size} text-center`}
              onClick={() => showads(adForPosition?._id || "sample")}
            >
              {adForPosition ? (
                <>
                  <h1>{adForPosition.duration}</h1>
                  <img
                    src={adForPosition.imageUrl}
                    alt={`Ad ${adForPosition._id}`}
                    className="object-contain max-w-full max-h-full"
                  />
                </>
              ) : (
                <div className="w-full h-full flex justify-center">
                  <img
                  src={option.imageUrl}
                  alt={`Position ${option.position}`}
                  className="object-contain max-w-full max-h-full"
                />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;