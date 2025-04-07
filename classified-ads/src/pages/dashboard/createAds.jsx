import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createAds, fetchDuration, fetchpages, fetchAvailablePages } from "../../api/adsService";

function CreateAds() {
  const { currentUser } = useSelector((state) => state.user);
  const User = currentUser.findUser;

  const [duration, setDuration] = useState([]);
  const [pages, setPages] = useState(0);
  const [notAvailablePage, setNotAvailablePage] = useState([]);
  const [formData, setFormData] = useState({
    creator: User.firebaseUID,
    title: null,
    description: null,
    duration: null,
    position: null,
    image: null,
  });

  const clickHandler = (e) => {
    setFormData({ ...formData, position: e.target.id });
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const durationHandler = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const data = await fetchpages(e.target.value);
    setPages(data);

    const availablePosition = await fetchAvailablePages(e.target.value);
    setNotAvailablePage(availablePosition);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const data = await createAds(formData);
    console.log(data);
  };

  useEffect(() => {
    const getDurations = async () => {
      const data = await fetchDuration();
      setDuration(data);
    };
    getDurations();
  }, []);

  return (
    <form
      onSubmit={formHandler}
      className="max-w-3xl mx-auto bg-[#1c1c1e] text-white p-8 mt-10 rounded-2xl shadow-2xl space-y-8 border border-gray-700"
    >
      <h1 className="text-4xl font-bold text-center text-white">🚀 Create Advertisement</h1>
  
      <div className="grid grid-cols-1 gap-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-2 text-gray-300">
            Advertisement Title
          </label>
          <input
            type="text"
            placeholder="Enter your ad title"
            name="title"
            id="title"
            onChange={changeHandler}
            className="w-full bg-[#2c2c2e] p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-2 text-gray-300">
            Description
          </label>
          <textarea
            placeholder="Write a compelling description"
            name="description"
            id="description"
            onChange={changeHandler}
            className="w-full bg-[#2c2c2e] p-4 rounded-xl border border-gray-600 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Duration Select */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Select Duration
          </label>
          <select
            onChange={durationHandler}
            name="duration"
            className="w-full bg-[#2c2c2e] p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>-- Choose duration --</option>
            {duration.map((data) => (
              <option value={data.value} key={data._id}>
                {data.label}
              </option>
            ))}
          </select>
        </div>
  
        {/* Page Selection Grid */}
        <div>
          <p className="text-sm font-semibold mb-3 text-gray-300">Select Page Position</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {[...Array(pages)].map((_, index) => {
              const pageNum = index + 1;
              const isUnavailable =
                notAvailablePage.includes(pageNum) || notAvailablePage.includes(pageNum.toString());
              const isSelected = formData.position == pageNum;
  
              return (
                <div
                  key={pageNum}
                  id={pageNum}
                  onClick={isUnavailable ? undefined : clickHandler}
                  className={`text-center py-2 px-3 rounded-xl transition-all font-medium ${
                    isUnavailable
                      ? "bg-gray-700 text-gray-400 pointer-events-none"
                      : isSelected
                      ? "bg-green-600 text-white shadow-md scale-105"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"
                  }`}
                >
                  Page {pageNum}
                </div>
              );
            })}
          </div>
        </div>
  
        {/* Image Input */}
        <div>
          <label htmlFor="image" className="block text-sm font-semibold mb-2 text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Paste your image URL"
            onChange={changeHandler}
            className="w-full bg-[#2c2c2e] p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-bold tracking-wide text-lg transition-all duration-200 shadow-lg"
          >
            Submit Advertisement
          </button>
        </div>
      </div>
    </form>
  );  
}

export default CreateAds;
