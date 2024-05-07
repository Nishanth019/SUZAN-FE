import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import test from "./test2.pdf";

function ViewPdf({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div className="flex flex-col w-full h-full  text-center bg-white ">
        <h3 className=" text-[25px]  md:text-[35px]  font-extrabold text-dark-grey-900">
          {pdf.title}
        </h3>
      </div>
      <div
        className="pdf-div bg-gray-300 mt-4 p-4"
        style={{ width: "100%", height: "100%" }}
      >
        {/* {numPages && (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )} */}
        <Document file={test} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>
    </>
  );
}

export default ViewPdf;
