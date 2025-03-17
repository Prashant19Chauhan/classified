import { useState } from "react";
import { createAds } from "../../api/adsService";
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateAd = () => {
  const layoutOptions = [
    { position:1, size: "w-full h-screen", label: "Full Width & Height - Position 1" },
    { position:2, size: "w-full h-screen", label: "Full Width & Height - Position 2" },
    { position:3, size: "w-[1/2] h-screen", label: "Half Width & Full Height - Position 3" },
    { position:4, size: "w-[1/2] h-screen", label: "Half Width & Full Height - Position 4" },
    { position:5, size: "w-full h-screen", label: "Full Width & Height - Position 5" },
    { position:6, size: "w-[1/3] h-screen", label: "1/3 Width & Full Height - Position 6" },
    { position:7, size: "w-[1/3] h-screen", label: "1/3 Width & Full Height - Position 7" },
    { position:8, size: "w-[1/3] h-screen", label: "1/3 Width & Full Height - Position 8" },
    { position:9, size: "w-[2/3] h-[1/2]", label: "2/3 Width & 1/2 Height - Position 9" },
    { position:10, size: "w-[1/3] h-[1/2]", label: "1/3 Width & 1/2 Height - Position 10" },
    { position:11, size: "w-[1/3] h-[1/2]", label: "1/3 Width & 1/2 Height - Position 11" },
    { position:12, size: "w-[1/3] h-[1/2]", label: "1/3 Width & 1/2 Height - Position 12" },
  ];

  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date

  const {currentUser} = useSelector(state => state.user);
  const User = currentUser.findUser;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    creator: User.firebaseUID,
    title: "",
    description: "",
    size: "",
    position: "",
    duration: 1,
    image: null,
  });

  const step2Handler = () => {
    setFormData({...formData, duration:selectedDate, size:selectedLayout.size, position:selectedLayout.position})
    setStep(3);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await createAds(formData)
      setFormData({ title: "", description: "", size: "full", position: "top", duration: 1, image: null });
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
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="Pp"
        className="w-full p-2 border rounded"
      />
      <div className="w-2/3 grid grid-cols-3 gap-4 p-4 bg-gray-50 shadow-lg rounded-lg">
        {layoutOptions.map((layout) => (
          <div
            key={layout.position}
            className={`h-24 flex items-center justify-center text-center text-sm font-semibold cursor-pointer transition ${
              selectedLayout?.position === layout.position
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-300"
            }`}
            onClick={() => setSelectedLayout(layout)}
          >
            {layout.label}
          </div>
        ))}
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
          <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" />
          <button type="submit" className="mt-4 bg-green-600 text-white py-2 px-4 rounded">Submit Ad</button>
        </form>
      )}
    </div>
  );
};

export default CreateAd;
