import { useState } from "react";
import { publishClassified } from "../api/adminService";
import { useParams } from "react-router-dom";

function Publish() {
  const { duration } = useParams();

  const [formData, setFormData] = useState({
    layout: "",
    file: null,
    image: null,
    duration: duration,
  });

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const data = await publishClassified(formData);
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={formHandler}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Publish Classified</h2>

        {/* Layout Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Layout
          </label>
          <select
            onChange={changeHandler}
            name="layout"
            value={formData.layout}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Choose Layout</option>
            <option value="1">Layout 1</option>
            <option value="2">Layout 2</option>
            <option value="3">Layout 3</option>
            <option value="4">Layout 4</option>
          </select>
        </div>

        {/* Classified File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Import Classified (PDF)
          </label>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept="application/pdf"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Set Image
          </label>
          <input
            type="file"
            name="image"
            onChange={changeHandler}
            accept="image/*"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Publish;
