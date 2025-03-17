import { useEffect, useState } from "react";
import Header from "../components/header";
import {getAds} from '../api/adsService'

const Home = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch Ads from Backend (Mock Data for Now)
    const fetchAds = async () => {
      const sampleAds = await getAds();
      setAds(sampleAds);
    };
    fetchAds();
  }, []);



  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header/>

      <div className="">
      {ads.map(ad => (
          <div key={ad._id} className={ad.size}>
            <h1>{ad.title}</h1>
            <img src={ad.image}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;