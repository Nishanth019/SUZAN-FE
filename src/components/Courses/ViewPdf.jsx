import React, { useState, useEffect } from "react";

import { Document, Page,pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function ViewPdf({ pdf }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     // Recalculate the PDF container size on window resize
  //     setNumPages(null); // Reset numPages to recalculate it based on new dimensions
  //   };

  //   window.addEventListener("resize", resizeHandler);

  //   return () => {
  //     window.removeEventListener("resize", resizeHandler);
  //   };
  // }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full text-center bg-white">
        <h3 className="text-[25px] md:text-[35px] font-extrabold text-dark-grey-900">
          {pdf.title}
        </h3>
      </div>
      <div className="bg-gray-300 mt-4 p-2 md:p-4 w-full h-full ">
        <Document
          file={pdf.url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Loading PDF...</div>}
        >
          {Array.from(new Array(numPages || 0), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={window.innerWidth * 0.75} // Set width dynamically
            />
          ))}
        </Document>
      </div>
    </>
  );
}

export default ViewPdf;
