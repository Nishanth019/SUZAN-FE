import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { IoMdEye, IoMdDownload } from "react-icons/io";
import { FaLink, FaFilePdf } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { pdfjs } from "react-pdf";   
import dynamic from "next/dynamic";
import "./style.css";
const viewPdf = dynamic(() => import("./ViewPdf"), { ssr: false });
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";
const CourseVideos = ({ videos }) => {
  const links = videos.filter((item) => item.type === "link");
  
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
 
  useEffect(() => {
    // Set the worker source on the client-side only
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);
 
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };
  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  return (
    <div className="w-full px-2 pt-5 pb-8 sm:pt-8 sm:pb-12 sm:py-5 sm:px-5 lg:px-10 xl:px-16">
      <div className="space-y-4">
        <p className="text-2xl sm:text-4xl font-bold">Course videos</p>
        {links.length === 0 && (
          <p className="text-sm sm:text-[16px] font-medium text-center">
            {" "}
            - No videos available.
          </p>
        )}
        {links.length > 0 && (
          <div className="space-y-4">
            <p className="font-semibold text-lg sm:text-xl">Links:</p>
            <div className="space-y-4">
              {links.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center space-x-4 border p-2 rounded-md"
                >
                  <GoVideo
                    className="max-sm:!hidden"
                    size={23}
                  />
                  <div className="flex-1">
                    <p className="text-xs sm:text-[16px]">{item.title}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="max-sm:!hidden"
                      onClick={() => handleOpenLink(item.url)}
                    >
                      View
                    </Button>
                    <IoMdEye
                      className="text-blue-500  sm:!hidden"
                      size={24}
                      onClick={() => handleOpenLink(item.url)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseVideos;
