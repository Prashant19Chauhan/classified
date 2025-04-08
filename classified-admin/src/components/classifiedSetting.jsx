import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setClassified } from '../api/adminService';
import { FaPlus, FaSave } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassifiedSetting = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [durations, setDurations] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [pageLayouts, setPageLayouts] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Add date range
  const addDuration = () => {
    setErrorMsg('');
    if (!startDate || !endDate) {
      setErrorMsg('Both start and end dates are required.');
      return;
    }
    if (startDate > endDate) {
      setErrorMsg('Start date cannot be after end date.');
      return;
    }

    const label = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    const value = `${startDate.toISOString()}|${endDate.toISOString()}`;

    const isDuplicate = durations.some((d) => d.value === value);
    if (isDuplicate) {
      setErrorMsg('This date range is already added.');
      return;
    }

    setDurations((prev) => [...prev, { label, value }]);
    setStartDate(null);
    setEndDate(null);
  };

  // Update layout for a page
  const handleLayoutChange = (page, layout) => {
    setPageLayouts((prev) => ({ ...prev, [page]: layout }));
  };

  // Save settings
  const handleSave = async () => {
    setErrorMsg('');

    if (durations.length === 0) {
      toast.error('Please add at least one duration.');
      return;
    }

    for (let i = 1; i <= numPages; i++) {
      if (!pageLayouts[i]) {
        toast.error(`Please select layout for Page ${i}`);
        return;
      }
    }

    setLoading(true);
    try {
      const data = await setClassified(durations, numPages, pageLayouts);
      toast.success('Classified settings saved successfully!');
      // Reset after success
      setDurations([]);
      setPageLayouts({});
      setNumPages(1);
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save settings!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <ToastContainer position="top-center" />
      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Classified Settings
        </h2>

        {/* Duration Picker */}
        <div className="mb-8">
          <label className="font-semibold block text-gray-700 mb-2">
            <MdDateRange className="inline mr-1 text-blue-500" />
            Select Duration:
          </label>
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center mb-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              className="w-full md:w-auto border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              className="w-full md:w-auto border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow transition disabled:opacity-50`}
              onClick={addDuration}
              disabled={!startDate || !endDate}
            >
              <FaPlus /> Add
            </button>
          </div>
          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
          {durations.length > 0 && (
            <ul className="list-disc ml-6 text-sm text-gray-700 mt-2">
              {durations.map((d, idx) => (
                <li key={idx}>{d.label}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Number of Pages */}
        <div className="mb-8">
          <label className="block font-semibold text-gray-700 mb-2">
            Number of Pages:
          </label>
          <input
            type="number"
            value={numPages}
            min={1}
            onChange={(e) => setNumPages(Number(e.target.value))}
            className="border px-3 py-2 rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Layout Selection */}
        <div className="mb-8">
          <label className="block font-semibold text-gray-700 mb-2">
            Page Layouts:
          </label>
          <div className="space-y-3">
            {[...Array(numPages)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border px-4 py-2 rounded"
              >
                <span className="font-medium text-gray-700">Page {index + 1}</span>
                <select
                  className="border px-3 py-2 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={pageLayouts[index + 1] || ''}
                  onChange={(e) => handleLayoutChange(index + 1, e.target.value)}
                >
                  <option value="">-- Select Layout --</option>
                  <option value="full">Full Page</option>
                  <option value="half">Half Page</option>
                  <option value="quarter">Quarter Page</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            className={`flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded shadow transition w-full sm:w-auto ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleSave}
            disabled={loading}
          >
            <FaSave />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassifiedSetting;
