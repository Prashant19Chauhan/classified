import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createAds,
  fetchDuration,
  fetchpages,
  fetchAvailablePages,
} from "../../api/adsService";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css";

function CreateAds() {
  const { currentUser } = useSelector((state) => state.user);
  const User = currentUser?.user;

  const [duration, setDuration] = useState([]);
  const [pages, setPages] = useState(0);
  const [notAvailablePage, setNotAvailablePage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const [formData, setFormData] = useState({
    creator: User?.firebaseUID || "",
    title: "",
    description: "",
    duration: "",
    position: "",
    image: null,
    isfile: false,
  });

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const clickHandler = (e) => {
    setFormData({ ...formData, position: e.target.id });
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const durationHandler = async (e) => {
    const selectedDuration = e.target.value;
    setFormData({ ...formData, [e.target.name]: selectedDuration });

    try {
      const pageData = await fetchpages(selectedDuration);
      const available = await fetchAvailablePages(selectedDuration);
      setPages(pageData || 0);
      setNotAvailablePage(available || []);
    } catch (err) {
      toast.error("Error fetching page data");
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setFormData((prev) => ({
      ...prev,
      image: file,
      isfile: true,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setFormData((prev) => ({
      ...prev,
      image: file,
      isfile: true,
    }));
  };

  const formHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.duration ||
      !formData.position ||
      !formData.image
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await createAds(formData);
      if (!response.success) {
        throw new Error(response.message || "Ad creation failed.");
      }

      toast.success("Advertisement created successfully!");
      setShowConfetti(true);

      setFormData({
        creator: User?.firebaseUID || "",
        title: "",
        description: "",
        duration: "",
        position: "",
        image: "",
      });
      setImagePreview(null);
      setPages(0);
      setNotAvailablePage([]);

      setTimeout(() => setShowConfetti(false), 4000);
    } catch (err) {
      toast.error(err.message || "Failed to create advertisement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getDurations = async () => {
      try {
        const data = await fetchDuration();
        if (Array.isArray(data)) {
          setDuration(data);
        }
      } catch (err) {
        toast.error("Error fetching durations");
      }
    };
    getDurations();
  }, []);

  if (!User?.firebaseUID) {
    return <div className="text-white text-center py-10">Loading user info...</div>;
  }

  return (
    <>
      <ToastContainer />
      {showConfetti && <Confetti />}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={formHandler}
        className="max-w-3xl mx-auto bg-[#1c1c1e] text-white p-6 sm:p-8 mt-10 rounded-2xl shadow-2xl space-y-8 border border-gray-700"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          🚀 Create Advertisement
        </h1>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block mb-2 text-gray-300 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
              placeholder="Enter title"
              className="w-full p-4 bg-[#2c2c2e] rounded-xl border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block mb-2 text-gray-300 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={changeHandler}
              placeholder="Enter description"
              className="w-full p-4 bg-[#2c2c2e] h-32 resize-none rounded-xl border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </motion.div>

          <div>
            <label className="block mb-2 text-gray-300 font-semibold">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={durationHandler}
              className="w-full p-4 bg-[#2c2c2e] rounded-xl border border-gray-600"
            >
              <option value="">-- Select Duration --</option>
              {duration.map((d) => (
                <option key={d._id} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-gray-300 font-semibold mb-2">Select Page</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[...Array(pages)].map((_, index) => {
                const page = index + 1;
                const isUnavailable =
                  notAvailablePage.includes(page) || notAvailablePage.includes(page.toString());
                const isSelected = formData.position == page;

                return (
                  <motion.div
                    key={page}
                    id={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isUnavailable ? undefined : clickHandler}
                    className={`text-center py-2 px-3 rounded-xl font-medium transition-all ${
                      isUnavailable
                        ? "bg-gray-700 text-gray-400"
                        : isSelected
                        ? "bg-green-600 text-white scale-105 shadow-md"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"
                    }`}
                  >
                    Page {page}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-full border-2 border-dashed border-gray-500 p-6 rounded-xl text-center cursor-pointer hover:border-blue-500"
          >
            <p className="text-gray-400">Drag and drop an image here, or click to select</p>
            <input type="file" accept="image/*" onChange={handleFileSelect} className="mt-2" />
            {imagePreview && (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={imagePreview}
                alt="Preview"
                className="mt-4 max-h-48 mx-auto rounded-xl shadow-md"
              />
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.03 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            className={`w-full py-3 rounded-xl font-bold text-lg tracking-wide transition-all shadow-lg ${
              loading
                ? "bg-green-800 opacity-50 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Advertisement"}
          </motion.button>
        </div>
      </motion.form>
    </>
  );
}

export default CreateAds;
