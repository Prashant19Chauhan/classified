import { useEffect } from "react";
import Header from "../components/header";
import { FaTwitter, FaWhatsapp, FaLinkedin, FaInstagram, FaDownload, FaShareAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import {useParams} from 'react-router-dom';
import { fetchadbyId } from "../api/adsService";
import { useState } from "react";

function AdPage() {
    const id = useParams();
    const [adsData, setAdsData] = useState({});

    useEffect(()=>{
        const fetchads = async() => {
            const data = await fetchadbyId(id);
            setAdsData(data);
        }
        fetchads();
    },[id])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{adsData.title}</h1>
        </div>
        <div className="flex flex-col md:flex-row">
            <div className="w-2/3 flex justify-center">
              <div className="rounded-lg overflow-hidden w-full h-[60vh]">
                <img
                  src={adsData.imageUrl} // Replace with your image URL
                  alt="Ad Image"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="space-y-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                  <FaTwitter className="mr-2" />
                  Twitter
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </button>
                <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded flex items-center">
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </button>
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded flex items-center">
                  <FaInstagram className="mr-2" />
                  Instagram
                </button>
              </div>
              <div className="space-y-2">
                <span className="text-gray-700 flex items-center">
                  <MdEmail className="mr-1" />
                  example@example.com
                </span>
                <button className="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded flex items-center">
                  <FaDownload className="mr-2" />
                  Download PDF
                </button>
                <button className="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded flex items-center">
                  <FaShareAlt className="mr-2" />
                  Share
                </button>
              </div>
            </div>
        </div>
        <div className=" p-10">
            <p className="text-gray-700">
                {adsData.description}
            </p>
        </div>
      </div>
    </div>
  );
}

export default AdPage;