import React from 'react';

const About = () => {
  return (
    <section className="mt-10 mb-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12 max-w-5xl mx-auto rounded-xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <h1 className="text-5xl font-extrabold mb-8 text-center border-b-4 border-yellow-600 inline-block pb-2 bg-clip-text">
        About Ujala Classified
      </h1>

      <div className="space-y-8 text-lg">
        <p>
          <strong className="text-yellow-600">Ujala Classified</strong> is a premier weekly tabloid, renowned for its extensive reach and commitment to delivering quality classified content. Since its inception in <strong>1993</strong>, it has grown to become the largest circulated weekly in Uttarakhand, trusted by thousands every weekend.
        </p>

        <p>
          With a readership of over <strong>four lakh every Saturday and Sunday</strong>, Ujala Classified continues to make a mark across print and digital platforms. An equal number of readers access our content online through our website, making us a powerful medium for advertisers.
        </p>

        <p>
          Our readers belong to the <strong className="text-yellow-600">middle, high-middle, and upper-income groups</strong>. Most are fluent in English and are regular readers of national English newspapers—making our platform ideal for reaching informed and engaged audiences.
        </p>

        <p>
          Whether you're an individual or a business, we invite you to advertise with Ujala Classified and experience the reach and impact that sets us apart.
        </p>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <p className="font-semibold text-white">📞 Contact Us:</p>
          <p className="text-white">
            Phone: <a href="tel:+911352716161" className="text-blue-100 hover:text-white transition duration-300">+91-135-2716161</a>, <a href="tel:+911352717171" className="text-blue-100 hover:text-white transition duration-300">+91-135-2717171</a>
          </p>
          <p className="text-white">
            Email: <a href="mailto:saluja@dehradunclassified.com" className="text-blue-100 hover:text-white transition duration-300">saluja@dehradunclassified.com</a>, <a href="mailto:booking@dehradunclassified.com" className="text-blue-100 hover:text-white transition duration-300">booking@dehradunclassified.com</a>
          </p>
        </div>

        <p className="pt-8 text-gray-700 dark:text-gray-200">
          Warm Regards,<br />
          <span className="font-semibold text-yellow-600">Rishi Saluja</span><br />
          Associate Editor
        </p>
      </div>
    </section>
  );
};

export default About;
