import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Required to render PDFs
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function SinglePaper() {
  const { key } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const pdfUrl = `${import.meta.env.VITE_API_URL || "http://localhost:8800"}/classifieds/${key}`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handle responsive width
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">PDF Viewer</h2>

      <div className="mb-4">
        <a
          href={pdfUrl}
          download
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download PDF
        </a>
      </div>

      <div className="max-w-full overflow-auto">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page
            pageNumber={pageNumber}
            width={Math.min(windowWidth * 0.9, 450)}
          />
        </Document>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span>Page {pageNumber} of {numPages}</span>
        <button
          onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SinglePaper;
