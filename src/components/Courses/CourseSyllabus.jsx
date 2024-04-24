import React from "react";
import { Button } from "@mui/material";
import { IoMdEye, IoMdDownload } from 'react-icons/io';
import { FaLink, FaFilePdf } from "react-icons/fa";

const CourseSyllabus = ({ syllabus }) => {
 
  const pdfs = syllabus.filter(item => item.type === "pdf");

  return (
    <div className="w-full p-2 md:py-5 sm:px-5 lg:px-10 xl:px-16 ">
      <div className="space-y-4">
        <p className="text-2xl sm:text-4xl font-bold">
          Course Syllabus
        </p>
        <p>
        {pdfs.length === 0 && (
            <p className="text-sm sm:text-[16px] font-medium text-center"> - No course materials available.</p>
          )}
          </p>
        
        {pdfs.length > 0 && (
          <div className="space-y-4">
            <p className="font-semibold text-lg md:text-xl">Pdfs:</p>
            <div className="space-y-4">
              {pdfs.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 border  p-2 rounded-md">
                  <FaFilePdf className="text-red-500 max-md:hidden" size={24} />
                  <div className="flex-1">
                    <p className="text-sm md:text-[16px]">{item.title}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outlined" color="primary" size="small" className="max-md:hidden">View</Button>
                    <Button variant="outlined" color="secondary" size="small" className="max-md:hidden">Download</Button>
                    <IoMdEye className="text-blue-500 cursor-pointer md:hidden" size={24} />
                    <IoMdDownload className="text-red-500 cursor-pointer md:hidden" size={24} />
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

export default CourseSyllabus;
