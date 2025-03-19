import { useState } from "react";
import { createAds, fetchAvailablePosition } from "../../api/adsService";
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateAd = () => {
  const layoutOptions = [
    { position:1, size: "w-[33%] h-[90vh]", label: "Position 1 row1" },
    { position:2, size: "w-[33%] h-[90vh]", label: "Position 2 row1" },
    { position:3, size: "w-[33%] h-[90vh]", label: "Position 3 row1" },
    { position:4, size: "w-[24%] h-[70vh]", label: "HPosition 4 row2" },
    { position:5, size: "w-[24%] h-[70vh]", label: "Position 5 row2" },
    { position:6, size: "w-[24%] h-[70vh]", label: "Position 6 row2" },
    { position:7, size: "w-[24%] h-[70vh]", label: "Position 7 row2" },
    { position:8, size: "w-[24%] h-[70vh]", label: "Position 8 row3" },
    { position:9, size: "w-[24%] h-[70vh]", label: "Position 9 row3" },
    { position:10, size: "w-[24%] h-[70vh]", label: "Position 10 row3" },
    { position:11, size: "w-[24%] h-[70vh]", label: "Position 11 row3" },
    { position:12, size: "w-[33%] h-[90vh]", label: "Position 12 row4" },
    { position:13, size: "w-[33%] h-[90vh]", label: "Position 13 row4" },
    { position:14, size: "w-[33%] h-[90vh]", label: "HPosition 14 row4" },
    { position:15, size: "w-[49%] h-[90vh]", label: "FPosition 15 row5" },
    { position:16, size: "w-[49%] h-[90vh]", label: "Position 16 row5" },
    { position:17, size: "w-[33%] h-[90vh]", label: "Position 17 row6" },
    { position:18, size: "w-[33%] h-[90vh]", label: "Position 18 row6" },
    { position:19, size: "w-[33%] h-[90vh]", label: "Position 19 row6" },
    { position:20, size: "w-[24%] h-[70vh]", label: "Position 20 row7" },
    { position:21, size: "w-[24%] h-[70vh]", label: "Position 21 row7" },
    { position:22, size: "w-[24%] h-[70vh]", label: "Position 22 row7" },
    { position:23, size: "w-[24%] h-[70vh]", label: "Position 23 row7" },
    { position:24, size: "w-[24%] h-[70vh]", label: "Position 24 row8" },
    { position:25, size: "w-[24%] h-[70vh]", label: "Position 25 row8" },
    { position:26, size: "w-[24%] h-[70vh]", label: "Position 26 row8" },
    { position:27, size: "w-[24%] h-[70vh]", label: "Position 27 row8" },
    { position:28, size: "w-[33%] h-[90vh]", label: "Position 28 row9" },
    { position:29, size: "w-[33%] h-[90vh]", label: "Position 29 row9" },
    { position:30, size: "w-[33%] h-[90vh]", label: "Position 30 row9" },
    { position:31, size: "w-[49%] h-[90vh]", label: "Position 31 row10" },
    { position:32, size: "w-[49%] h-[90vh]", label: "Position 32 row10" },
    { position:33, size: "w-[33%] h-[90vh]", label: "Position 33 row11" },
    { position:34, size: "w-[33%] h-[90vh]", label: "Position 34 row11" },
    { position:35, size: "w-[33%] h-[90vh]", label: "Position 35 row11" },
    { position:36, size: "w-[24%] h-[70vh]", label: "HPosition 36 row12" },
    { position:37, size: "w-[24%] h-[70vh]", label: "Position 37 row12" },
    { position:38, size: "w-[24%] h-[70vh]", label: "Position 38 row12" },
    { position:39, size: "w-[24%] h-[70vh]", label: "Position 39 row12" },
    { position:40, size: "w-[24%] h-[70vh]", label: "Position 40 row13" },
    { position:41, size: "w-[24%] h-[70vh]", label: "Position 41 row13" },
    { position:42, size: "w-[24%] h-[70vh]", label: "Position 42 row13" },
    { position:43, size: "w-[24%] h-[70vh]", label: "Position 43 row13" },
    { position:44, size: "w-[33%] h-[90vh]", label: "Position 44 row14" },
    { position:45, size: "w-[33%] h-[90vh]", label: "Position 45 row14" },
    { position:46, size: "w-[33%] h-[90vh]", label: "HPosition 46 row14" },
    { position:47, size: "w-[49%] h-[90vh]", label: "FPosition 47 row15" },
    { position:48, size: "w-[49%] h-[90vh]", label: "Position 48 row15" },
    { position:49, size: "w-[33%] h-[90vh]", label: "Position 49 row16" },
    { position:50, size: "w-[33%] h-[90vh]", label: "Position 50 row16" },
    { position:51, size: "w-[33%] h-[90vh]", label: "Position 51 row16" },
    { position:52, size: "w-[24%] h-[70vh]", label: "Position 52 row17" },
    { position:53, size: "w-[24%] h-[70vh]", label: "Position 53 row17" },
    { position:54, size: "w-[24%] h-[70vh]", label: "Position 54 row17" },
    { position:55, size: "w-[24%] h-[70vh]", label: "Position 55 row17" },
    { position:56, size: "w-[24%] h-[70vh]", label: "Position 56 row18" },
    { position:57, size: "w-[24%] h-[70vh]", label: "Position 57 row18" },
    { position:58, size: "w-[24%] h-[70vh]", label: "Position 58 row18" },
    { position:59, size: "w-[24%] h-[70vh]", label: "Position 59 row18" },
    { position:60, size: "w-[33%] h-[90vh]", label: "Position 60 row19" },
    { position:61, size: "w-[33%] h-[90vh]", label: "Position 61 row19" },
    { position:62, size: "w-[33%] h-[90vh]", label: "Position 62 row19" },
    { position:63, size: "w-[49%] h-[90vh]", label: "Position 63 row20" },
    { position:64, size: "w-[49%] h-[90vh]", label: "Position 64 row20" },
  ];

  const [selectedLayout, setSelectedLayout] = useState(null);
  const [startDate, setStartDate] = useState(new Date()); // Selected date
  const [endDate, setEndDate] = useState(new Date());
  const [availablePositions, setAvailablePositions] = useState([]);

  const {currentUser} = useSelector(state => state.user);
  const User = currentUser.findUser;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    creator: User.firebaseUID,
    title: "",
    description: "",
    size: "",
    position: 0,
    startDate: new Date(),
    endDate: new Date(),
    image: "",
  });

  const startDateChangeHandler = async(startDate) => {
    setStartDate(startDate);
    const data = await fetchAvailablePosition({startDate, endDate:null});
    setAvailablePositions(data);
  }

  const endDateChangeHandler = async(endDate) => {
    setEndDate(endDate);
    const data = await fetchAvailablePosition({startDate, endDate});
    setAvailablePositions(data);
  }

  const step2Handler = () => {
    setFormData({...formData, startDate:startDate, endDate:endDate, size:selectedLayout.size, position:selectedLayout.position})
    setStep(3);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await createAds(formData)
      setFormData({ title: "", description: "", size: "", position: "", startDate: 1, endDate: 1, image: "" });
      setStep(1);
      navigate('/payment')

    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create an Ad</h2>

      {step === 1 && (
        <div>
          <label className="block mb-2">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" />
          <label className="block mt-4 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
          <button onClick={() => setStep(2)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="flex gap-8 p-6">
      {/* Left Info Panel */}
      <div className="w-1/3 p-6 border bg-gray-100 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Selected Layout</h2>
        {selectedLayout ? (
          <div className="p-4 bg-white shadow-md rounded">
            <h3 className="text-md font-semibold">{selectedLayout.label}</h3>
            <p className="text-sm text-gray-600 mt-2">
              You have selected <strong>{selectedLayout.id}</strong>. This layout is best for displaying **ads or content in a structured manner**.
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Click a layout on the right to see details.</p>
        )}
      </div>

      {/* Right Preview Panel */}
      <DatePicker
        selected={startDate}
        onChange={(date) => startDateChangeHandler(date)}
        dateFormat="Pp"
        showTimeSelect
        timeIntervals={1} // Optional: Set time intervals (e.g., every 15 minutes)
        timeFormat="HH:mm"
        className="w-full p-2 border rounded"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => endDateChangeHandler(date)}
        dateFormat="Pp"
        showTimeSelect
        timeIntervals={1} // Optional: Set time intervals (e.g., every 15 minutes)
        timeFormat="HH:mm"
        className="w-full p-2 border rounded"
      />
      <div className="w-2/3 grid grid-cols-3 gap-4 p-4 bg-gray-50 shadow-lg rounded-lg">
        {layoutOptions.map((layout) => {
          const isDisabled = !availablePositions.find((pos) => pos === layout.position);

          return (
            <div
              key={layout.position}
              className={`h-24 flex items-center justify-center text-center text-sm font-semibold cursor-pointer transition ${
              isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : 
              selectedLayout?.position === layout.position
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-300"
              }`}
              onClick={!isDisabled ? () => setSelectedLayout(layout) : undefined}
            >
              {layout.label}
            </div>
          );
        })}
      </div>


      {/* Next Button */}
      <div className="absolute bottom-6 right-6">
        <button
          onClick={step2Handler}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <label className="block mt-4 mb-2">Upload Image</label>
          <input type="text" onChange={handleImageChange} className="w-full p-2 border rounded" />
          <button type="submit" className="mt-4 bg-green-600 text-white py-2 px-4 rounded">Submit Ad</button>
        </form>
      )}
    </div>
  );
};

export default CreateAd;
