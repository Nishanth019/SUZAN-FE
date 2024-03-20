"use client";

import React, { useState } from "react";
import AdminCourseNavbarProgramComponent from "./AdminCourseNavbarProgramComponent";
import AdminCourseNavbarCourseComponent from "./AdminCourseNavbarCourseComponent";
import AdminCourseNavbarFieldOfStudyComponent from "./AdminCourseNavbarFieldOfStudyComponent";
import { MdOutlineMenu } from "react-icons/md";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const AdminCourseSection = () => {
  const [selectedOption, setSelectedOption] = useState("Program");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMenuOpen(false); // Close the menu after selecting an option
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg relative">
        <div className="flex items-center space-x-4 font-semibold">
          <button className="md:hidden flex gap-2" onClick={toggleMenu}>
            <MdOutlineMenu className="h-6 w-6" />
            {selectedOption ? selectedOption : ""}
          </button>
          <div className="hidden md:flex space-x-10">
            <a
              className={`cursor-pointer ${
                selectedOption === "Program" && "text-blue-500"
              }`}
              onClick={() => handleOptionClick("Program")}
            >
              Program
            </a>
            <a
              className={`cursor-pointer ${
                selectedOption === "Field of Study" && "text-blue-500"
              }`}
              onClick={() => handleOptionClick("Field of Study")}
            >
              Field of Study
            </a>

            <a
              className={`cursor-pointer ${
                selectedOption === "Courses" && "text-blue-500"
              }`}
              onClick={() => handleOptionClick("Courses")}
            >
              Courses
            </a>
          </div>
        </div>
        {/* Dropdown menu for smaller screens */}
        {menuOpen && (
          <div className="z-[100] absolute top-full left-0 bg-white rounded-lg shadow-lg mt-2 md:hidden">
            <ul>
              <li
                onClick={() => handleOptionClick("Program")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                Program
              </li>
              <li
                onClick={() => handleOptionClick("Field of Study")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                Field of Study
              </li>

              <li
                onClick={() => handleOptionClick("Courses")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                Courses
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="p-2 md:p-5">
        {selectedOption === "Program" && <AdminCourseNavbarProgramComponent />}
        {selectedOption === "Courses" && <AdminCourseNavbarCourseComponent />}

        {selectedOption === "Field of Study" && (
          <AdminCourseNavbarFieldOfStudyComponent />
        )}
      </div>
    </div>
  );
};

export default AdminCourseSection;
