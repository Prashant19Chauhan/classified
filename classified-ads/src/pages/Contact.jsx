import { useState } from 'react';
import { sendMessage } from '../api/adsService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await(sendMessage(formData))
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Simulate email service submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('Something went wrong, please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Our Office</h2>
            <div className="space-y-4">
              <p className="text-gray-700"><strong>Branch Office:</strong> Dehradun Classified, 19, Rajpur Road, Kwality Complex, Opp. Gandhi Park, Dehradun (UK)-248001</p>
              <p className="text-gray-700"><strong>Phone:</strong> +91-135-2717171, 2716161, 2719191</p>
              <p className="text-gray-700"><strong>Mobile:</strong> +91-88-99-71-71-71</p>
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:booking@dehradunclassified.com" className="text-blue-500 hover:underline">booking@dehradunclassified.com</a></p>
              <p className="text-gray-700"><strong>Fax:</strong> +91-135-2716161 Ext: 301</p>
              <p className="text-gray-700"><strong>Head Office:</strong> National News Agency, 30, Paltan Bazar, Dehradun-248001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Success/Error Messages */}
              {successMessage && <p className="text-green-500 font-semibold">{successMessage}</p>}
              {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3513.019063446602!2d78.048786315073!3d30.319497381801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908f8b8a8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sDehradun%20Classified%20Office!5e0!3m2!1sen!2sin!4v1616161616161!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Dehradun Classified Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
