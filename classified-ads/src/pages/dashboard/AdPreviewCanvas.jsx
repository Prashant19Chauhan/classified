import React from "react";

const AdPreviewCanvas = ({ imagePreview, links }) => {
  return (
    <div className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg max-w-3xl mx-auto">
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Ad Preview"
          className="w-full h-[70vh] object-cover"
        />
      )}

      {links?.length > 0 && (
        <div className="bg-white dark:bg-black text-gray-900 dark:text-white px-6 py-4 text-sm sm:text-base">
          <p className="font-medium">
            {links.map((link, index) => (
              <span key={index}>
                <a
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
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
  );
};

export default AdPreviewCanvas;
