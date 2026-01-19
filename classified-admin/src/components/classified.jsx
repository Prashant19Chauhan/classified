import React, { useState, useRef, useEffect } from 'react';
import { adsList, fetchDuration, fetchpages } from '../api/adminService';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8800"}`;

const Classified = () => {
  const navigate = useNavigate();
  const [durationOptions, setDurationOptions] = useState([]);
  const [currentDuration, setCurrentDuration] = useState('');
  const [pages, setPages] = useState(0);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const pdfRef = useRef();

  useEffect(() => {
    const loadDurations = async () => {
      try {
        const durations = await fetchDuration();
        setDurationOptions(durations);
      } catch (err) {
        console.error('Failed to fetch durations:', err);
        setError('Failed to load durations.');
      }
    };
    loadDurations();
  }, []);

  const handleDurationChange = async (e) => {
    const value = e.target.value;
    setCurrentDuration(value);
    if (!value) {
      setAds([]);
      setPages(0);
      return;
    }

    try {
      setLoading(true);
      const [adsData, pageData] = await Promise.all([
        adsList(),
        fetchpages(value),
      ]);
    
      const filteredAds = adsData.filter(ad => ad.status === 'approved' && ad.duration === value);
      setAds(filteredAds);
      setPages(pageData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load ads or pages.');
    } finally {
      setLoading(false);
    }
  };

  const renderAd = (pageNumber) => {
    const matchedAds = ads.filter(ad => ad.pageNumber == pageNumber);
    const adCount = matchedAds.length;
  
    // Dynamic grid columns and rows
    const gridCols =
      adCount === 1 ? "grid-cols-1" :
      adCount === 2 ? "grid-cols-1" :
      adCount === 4 ? "grid-cols-2" : "grid-cols-1";
  
    // Make parent container take full height (assumes parent gives a height)
    return (
      <div className={`grid ${gridCols} gap-0 w-full h-full`}>
        {matchedAds.map((ad, index) => {
          const imageUrl = ad.imageUrl
            ? `${API_URL}/uploads/${ad.imageUrl}`
            : "/assets/airport taxi service.avif";

          const links = ad.links;
          console.log(links)
  
          return (
            <div key={index} className="w-full h-full">
              <div className='w-full h-full'>
              <img
                src={imageUrl}
                alt={`Ad ${pageNumber} - Layout ${ad.layout}`}
                className="w-[full] h-[90%] object-cover"
              />
              {links?.length > 0 && (
              <div className="bg-white dark:bg-black text-gray-900 dark:text-white px-6 py-4 text-sm sm:text-base w-full h=[4%]">
                <p className="font-medium">
                  {links.map((link, index) => (
                    <span key={index}>
                    <a
                      href={link.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {link.label}
                    </a>
                      {index !== links.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  
  

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;
  
    try {
      setLoading(true);
      setError('');

      
  
      // Temporarily remove gap if causing layout breaks
      element.classList.remove('gap-4');
  
      // Wait for all images in the component to fully load
      const images = element.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = img.onerror = resolve;
          });
        })
      );
  
      // Options for html2pdf
      const opt = {
        margin: 0,
        filename: 'classified_ads.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true, // optional: useful if you’re okay with tainted canvas
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
  
      await html2pdf().from(element).set(opt).save();
  
      // Restore layout
      element.classList.add('gap-4');
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setError('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      const imagePath = ads.find(ad => ad.position == 'pageNumber:1_layout:1')?.imageUrl;
      if (!imagePath) return alert("Image not found!");
  
      const imageUrl = `${API_URL}/uploads/${imagePath}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = "front-page-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      console.log("Image downloaded successfully.");
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image.");
    }
  };
  

  return (
    <div className="relative min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow p-4 flex justify-between items-center">
        <div>
          <label className="text-lg font-semibold text-gray-700 mr-2">Select Duration:</label>
          <select
            name="duration"
            value={currentDuration}
            onChange={handleDurationChange}
            className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">-- Select Duration --</option>
            {durationOptions.map((d) => (
              <option value={d.value} key={d._id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div ref={pdfRef} className="grid grid-cols-1 gap-4 mt-4">
        {loading ? (
          <div className="text-center py-20 text-xl">Loading ads...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          [...Array(pages)].map((_, index) => (
            <div
              key={index + 1}
              className="w-[210mm] h-[297mm] shadow-lg overflow-hidden rounded-lg m-0 p-0"
            >
              {renderAd(index + 1)}
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-20">
        <button
          onClick={() => navigate(`/publish/${currentDuration}`)}
          disabled={!currentDuration}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-lg rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          Publish Classified
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={!ads.length}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          Download PDF
        </button>
        <button
          onClick={handleDownloadImage}
          disabled={!ads.length}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          Download Front Image
        </button>
      </div>
    </div>
  );
};

export default Classified;
