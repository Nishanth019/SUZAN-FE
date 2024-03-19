"use client";
import Dropdown from "@/components/TailwindComponents/Dropdown";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import CoursesTable from "./CoursesTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropdown2 from "@/components/TailwindComponents/FormDropdown";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const AdminCourseNavbarCourseComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);

  const programs = ["Btech", "Mtech"];
  const fieldsOfStudy = ["CSE", "ECE"];
  const semesters = ["I", "II", "III", "IV"];

  //form useStates
  const [formselectedProgram, setFormSelectedProgram] = useState("");
  const [formSelectedFieldOfStudy, setFormSelectedFieldOfStudy] = useState("");
  const [formSelectedSemesters, setFormSelectedSemesters] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  // Dummy courses data
  const courses = [
    // Array of course objects with properties like course code, course name, credits, professor name, view button, edit button
    // Example:
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 1,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 2,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 3,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 4,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 5,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 6,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 7,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS104",
      name: "Introduction to Computer Science",
      credits: 8,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS103",
      name: "Introduction to Computer Science",
      credits: 9,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS102",
      name: "Introduction to Computer Science",
      credits: 10,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 11,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 12,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 13,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 14,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 15,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 16,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS104",
      name: "Introduction to Computer Science",
      credits: 17,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS103",
      name: "Introduction to Computer Science",
      credits: 18,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
    {
      code: "CS102",
      name: "Introduction to Computer Science",
      credits: 19,
      professor: "Dr. John Doe",
      // Add your view and edit button functionality here
      viewButton: <button onClick={() => handleView(course)}>View</button>,
      editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
    },
  ];

  // Function to handle opening the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* dropdowns */}
      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button
          onClick={openModal}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
        >
          Add Course
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-5 ">
        <Dropdown
          name="Program"
          options={programs}
          onSelect={setSelectedProgram}
        />
        <Dropdown
          name="Field Of Study"
          options={fieldsOfStudy}
          onSelect={setSelectedFieldOfStudy}
        />
        <Dropdown
          name="Semester"
          options={semesters}
          onSelect={setSelectedSemester}
        />
        <div className="w-full md:w-[250px]">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Program"
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      {/* tables */}
      <div className="py-2 md:py-5">
        <CoursesTable courses={courses} />{" "}
        {/* Include the CoursesTable component and pass current courses */}
      </div>

      {/* Modal */}
      <Modal
        //  style={{ zIndex: 9999 }}
        open={modalOpen}
        // onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,

            width: "50%",
            "@media (max-width: 1024px)": {
              width: "60%",
            },
            "@media (max-width: 768px)": {
              width: "90%",
              maxHeight: "95vh",
            },
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={closeModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            X
          </Button>
          <div
            // onSubmit={handleSubmit}
            className="flex  flex-col w-full h-full py-6 text-center bg-white "
          >
            <h3 className="pb-5  text-[25px]  md:text-[35px]  font-extrabold text-dark-grey-900">
              Add Semester Details
            </h3>
            <div className="py-2 md:pt-3 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Program*
              </label>
              <Dropdown2
                name="Program"
                options={programs}
                onSelect={setFormSelectedProgram}
              />
            </div>
            <div className="pb-2  flex flex-col">
              <label
                htmlFor="fieldofstudyName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Field Of Study*
              </label>
              <Dropdown2
                name="FieldOfStudy"
                options={fieldsOfStudy}
                onSelect={setFormSelectedFieldOfStudy}
              />
            </div>
            <div className="pb-2 md:pb-8 flex flex-col">
              <label
                htmlFor="semesterName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Semester*
              </label>
              <Dropdown2
                name="Semester"
                options={semesters}
                onSelect={setFormSelectedSemesters}
              />

            </div>

            {/* Inputs */}
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursename"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

<label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursecode"
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="CS3010"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

          <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursename"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

<label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursename"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

<label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursename"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <div className="pb-2">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button variant="contained">Add Semesters</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminCourseNavbarCourseComponent;
