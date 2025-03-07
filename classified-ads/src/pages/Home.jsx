import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

const Home = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch Ads from Backend (Mock Data for Now)
    const fetchAds = async () => {
      const sampleAds = [
        { id: 1, title: "Luxury Car Rental", size: "full", image: "/assets/bg4.jpg" },
        { id: 2, title: "50% Off on Shoes", size: "half", image: "/assets/bg4.jpg" },
        { id: 3, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 4, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 5, title: "50% Off on Shoes", size: "half", image: "/assets/bg4.jpg" },
        { id: 6, title: "Travel Deals", size: "full", image: "/assets/bg4.jpg" },
        { id: 8, title: "50% Off on Shoes", size: "half", image: "/assets/bg4.jpg" },
        { id: 9, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 10, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 11, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 19, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 12, title: "Travel Deals", size: "full", image: "/assets/bg4.jpg" },
        { id: 13, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 14, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 15, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 16, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 17, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
        { id: 18, title: "New iPhone Available", size: "third", image: "/assets/bg4.jpg" },
      ];
      setAds(sampleAds);
    };
    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header/>

      {/* Ad Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className={`rounded-lg shadow-lg overflow-hidden 
            ${ad.size === "full" ? "col-span-3 h-screen" : ad.size === "half" ? "col-span-2 h-[50vh]" : "col-span-1 h-[50vh]"}`}>
            <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
