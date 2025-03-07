import { useState } from "react";
import { createAds } from "../../api/adsService";
import {useNavigate} from 'react-router-dom';

const CreateAd = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    size: "full",
    position: "top",
    duration: 1,
    image: null,
  });

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
    <div className="p-6 max-w-md mx-auto">
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
        <div>
          <label className="block mb-2">Ad Size</label>
          <select name="size" value={formData.size} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="full">Full Screen</option>
            <option value="half">Half Screen</option>
            <option value="third">1/3 Screen</option>
          </select>
          <label className="block mt-4 mb-2">Position</label>
          <select name="position" value={formData.position} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
          <button onClick={() => setStep(3)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Next</button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Duration (Weeks)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" />
          <label className="block mt-4 mb-2">Upload Image</label>
          <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" />
          <button type="submit" className="mt-4 bg-green-600 text-white py-2 px-4 rounded">Submit Ad</button>
        </form>
      )}
    </div>
  );
};

export default CreateAd;
