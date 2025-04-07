import React, { useState, useRef, useEffect } from 'react';
import { adsList, fetchDuration, fetchpages } from '../api/adminService';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const Classified = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState([]);
  const [currentDuration, setCurrentDuration] = useState();
  const [pages, setPages] = useState(0);
  const [ads, setAds] = useState([]);
  const pdfRef = useRef();

  const changeHandler = (e) => {
    setCurrentDuration(e.target.value)
    const fetchData = async () => {
      const adsData = await adsList();
      setAds(adsData.filter(ad => ad.status === "approved" && ad.duration === e.target.value));
      const data = await fetchpages(e.target.value);
      setPages(data);
    };
    fetchData();
  };

  const adsByPosition = {};
  ads.forEach(ad => {
    adsByPosition[ad.position] = ad.imageUrl;
  });

  const renderAd = (position) => {
    const image = adsByPosition[position] || "/assets/airport taxi service.avif";
    return (
      <img src={image} alt={`Ad ${position}`} className="object-cover w-full h-full" />
    );
  };

  const downloadPDF = () => {
    const element = pdfRef.current;

    element.classList.remove('gap-4');

    const opt = {
      margin: 0,
      filename: 'classified_ads.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
      // Restore gap after download
      element.classList.add('gap-4');
    });;
  };

  useEffect(() => {
    const getDurations = async () => {
      const data = await fetchDuration();
      setDuration(data);
    };
    getDurations();
  }, []);

  return (
    <div className='relative min-h-screen bg-gray-100 pb-24'>
      {/* Header */}
      <div className='sticky top-0 z-10 bg-white shadow p-4 flex justify-between items-center'>
        <div>
          <label className='text-lg font-semibold text-gray-700 mr-2'>Select Duration:</label>
          <select
            name='duration'
            onChange={changeHandler}
            className='border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400'
          >
            <option value="">-- Select Duration --</option>
            {duration.map((data) => (
              <option value={data.value} key={data._id}>
                {data.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scrollable PDF Section */}
      <div ref={pdfRef} className='grid grid-cols-1 gap-4'>
        {[...Array(pages)].map((_, index) => (
          <div key={index+1} className='w-[210mm] h-[297mm] bg-white shadow-lg rounded-lg m-0 p-0'>
            {renderAd(index+1)}
            
          </div>
        ))}
      </div>

      {/* Floating Buttons */}
      <div className='fixed right-6 bottom-6 flex flex-col gap-3 z-20'>
        <button
          onClick={() => navigate(`/publish/${currentDuration}`)}
          className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-lg rounded-xl shadow-md transition-all'
        >
          Publish Classified
        </button>
        <button
          onClick={downloadPDF}
          className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl shadow-md transition-all'
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Classified;
