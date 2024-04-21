"use client";
import Dropdown from "@/components/TailwindComponents/Dropdown";
import { FaSearch, FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import React, { useState, useEffect } from "react";
import CoursesTable from "./CoursesTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropdown2 from "@/components/TailwindComponents/FormDropdown";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
  //dummy data
  const [selectedCourse, setSelectedCourse] = useState({
    course_name: "Data Structures and Algorithms",
    course_code: "CS3010",
    course_type: "Compulsory",
    credits: 4,
    college_name: "ABC University",
    instructor_name: "John Doe",
    instructor_photo: "https://example.com/instructor_photo.jpg",
    syllabus: "https://example.com/syllabus.pdf",
    resources: ["Resource 1", "Resource 2", "Resource 3"],
    notes: ["Note 1", "Note 2", "Note 3"],
    pyq: ["PYQ 1", "PYQ 2", "PYQ 3"],
  });
  const [courseDetails, setCourseDetails] = useState({
    course_name: "",
    course_code: "",
    course_type: "",
    credits: 0,
    college_name: "",
    instructor_name: "",
    instructor_photo: "",
    syllabus: "",
    resources: [""],
    notes: [""],
    pyq: [""],
  });

  // Function to handle viewing course details
  // const handleView = async (courseID) => {
  //   try {
  //     // Make a request to fetch course details using courseID
  //     const response = await fetch(`backend_url/courses/${courseID}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch course details");
  //     }
  //     const data = await response.json();
  //     setSelectedCourse(data); // Update selected course details state
  //     openModal(); // Open the modal

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // Dummy courses data
  const openViewModal = () => {
    setViewModalOpen(true);
  };

  // Function to handle closing the modal
  const closeViewModal = () => {
    setViewModalOpen(false);
  };
  const courses = [
    // Array of course objects with properties like course code, course name, credits, professor name, view Button,  edit Button
    // Example:
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 1,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 2,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 3,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 4,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 5,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 6,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 7,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS104",
      name: "Introduction to Computer Science",
      credits: 8,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS103",
      name: "Introduction to Computer Science",
      credits: 9,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS102",
      name: "Introduction to Computer Science",
      credits: 10,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 11,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 12,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 13,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 14,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 15,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 16,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS104",
      name: "Introduction to Computer Science",
      credits: 17,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS103",
      name: "Introduction to Computer Science",
      credits: 18,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS102",
      name: "Introduction to Computer Science",
      credits: 19,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={openViewModal}>
          <FaEye size={20} className="lg:ml-6" />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit()}>
          <MdEdit size={20} className="lg:ml-6" />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete()}>
          <MdDelete size={20} />
        </Button>
      ),
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

  // Function to fetch course details from backend
  const fetchCourseDetails = async () => {
    try {
      // Make an API request to fetch course details by ID from the backend
      // const response = await axios.get("/api/courses/:id"); // Replace ":id" with actual course ID
      // const fetchedCourseDetails = response.data;
      const fetchedCourseDetails = {
        course_name: "Testing ",
        course_code: "CS3010",
        course_type: "Compulsory",
        credits: 4,
        college_name: "ABC University",
        instructor_name: "John Doe",
        instructor_photo: "https://example.com/instructor_photo.jpg",
        syllabus: "https://example.com/syllabus.pdf",
        resources: ["Resource 1", "Resource 2", "Resource 3"],
        notes: ["Note 1", "Note 2", "Note 3"],
        pyq: ["PYQ 1", "PYQ 2", "PYQ 3"],
      };
      // Set the course details state with the fetched data
      setCourseDetails(fetchedCourseDetails);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  const handleEdit = async () => {
    await fetchCourseDetails(); // Fetch course details when modal opens
    setModalOpen(true);
  };
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Function to handle closing the delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    openDeleteModal();
    
  };

  // Function to handle deleting a program
  const handleDeleteProgram = async () => {
    try {
      console.log("deleting", 1);
      await CourseService.deleteProgram(currentProgram._id);
      console.log("deleting", 2);
      // Refetch all programs after deleting
      fetchAllPrograms();
      // Close the delete confirmation modal after deleting the program
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };
  const handleInputChange = (field, index, value) => {
    const newDetails = { ...courseDetails };
    newDetails[field][index] = value;
    setCourseDetails(newDetails);
  };

  const handleAddField = (field) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ""],
    }));
  };

  const handleDeleteField = (field, index) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
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
              Add Course Details
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
              value={courseDetails.course_name}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Code*
            </label>
            <input
              id="coursecode"
              type="text"
              value={courseDetails.course_code}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="CS3010"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Type*
            </label>
            <input
              id="coursetype"
              type="text"
              value={courseDetails.course_type}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Compulsory "
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Credits*
            </label>
            <input
              id="credits"
              type="number"
              value={courseDetails.credits}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Name*
            </label>
            <input
              id="instructorname"
              type="text"
              value={courseDetails.instructor_name}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Sraban Mohanty"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Upload Instructor Photo*
            </label>
            <input
              id="instructorphoto"
              type="upload"
              value={courseDetails.instructor_photo}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Upload Syllabus*
            </label>
            <input
              id="syllabus"
              type="text"
              value={courseDetails.syllabus}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="resources"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload Resources*
            </label>
            {courseDetails.resources.map((resource, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  value={resource}
                  onChange={(e) =>
                    handleInputChange("resources", index, e.target.value)
                  }
                  placeholder="Resource Name"
                  className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {index > 0 && (
                  <>
                    <Button
                      style={{ textTransform: "none" }}
                      className="max-md:hidden "
                      onClick={() => handleDeleteField("resources", index)}
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("resources", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </div>
            ))}
            <Button
              onClick={() => handleAddField("resources")}
              cariant="outlined"
            >
              + Add More Resources
            </Button>

            <label
              htmlFor="notes"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload Notes*
            </label>
            {courseDetails.notes.map((note, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  value={note}
                  onChange={(e) =>
                    handleInputChange("notes", index, e.target.value)
                  }
                  placeholder="Note Name"
                  className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {index > 0 && (
                  <>
                    <Button
                      style={{ textTransform: "none" }}
                      className="max-md:hidden "
                      onClick={() => handleDeleteField("notes", index)}
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("notes", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </div>
            ))}
            <Button onClick={() => handleAddField("notes")} cariant="outlined">
              + Add More Notes
            </Button>

            <label
              htmlFor="pyq"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload PYQ*
            </label>
            {courseDetails.pyq.map((pyq, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  value={pyq}
                  onChange={(e) =>
                    handleInputChange("pyq", index, e.target.value)
                  }
                  placeholder="PYQ Name"
                  className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {index > 0 && (
                  <>
                    <Button
                      style={{ textTransform: "none" }}
                      className="max-md:hidden"
                      onClick={() => handleDeleteField("pyq", index)}
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("pyq", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </div>
            ))}
            <Button onClick={() => handleAddField("pyq")} cariant="outlined">
              + Add More PYQs
            </Button>

            <div className="pb-2 pt-4">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button variant="outlined">Add Course</Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* modal to view the course  */}
      <Modal
        // style={{ zIndex: 9999 }}
        open={viewModalOpen}
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
            onClick={closeViewModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            X
          </Button>
          <div className="flex flex-col w-full h-full py-6 text-center bg-white ">
            <h3 className="pb-5  text-[25px]  md:text-[35px]  font-extrabold text-dark-grey-900">
              Course Details
            </h3>
            <div className="py-2 md:pt-3 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Program
              </label>
              <input
                type="text"
                value={selectedCourse.program || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            <div className="pb-2  flex flex-col">
              <label
                htmlFor="fieldofstudyName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Field Of Study
              </label>
              <input
                type="text"
                value={selectedCourse.fieldOfStudy || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            <div className="pb-2 md:pb-8 flex flex-col">
              <label
                htmlFor="semesterName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Semester
              </label>
              <input
                type="text"
                value={selectedCourse.semester || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>

            {/* Inputs */}
            <label
              htmlFor="coursename"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name
            </label>
            <input
              type="text"
              value={selectedCourse.course_name || ""}
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
            />

            <label
              htmlFor="coursecode"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Code
            </label>
            <input
              type="text"
              value={selectedCourse.course_code || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
            />

            <label
              htmlFor="coursetype"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Type
            </label>
            <input
              type="text"
              value={selectedCourse.course_type || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
            />

            <label
              htmlFor="credits"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Credits
            </label>
            <input
              type="number"
              value={selectedCourse.credits || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
            />

            <label
              htmlFor="instructorname"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Name
            </label>
            <input
              type="text"
              value={selectedCourse.instructor_name || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
            />

            <label
              htmlFor="instructorphoto"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Photo
            </label>
            <input
              type="text"
              value={selectedCourse.instructor_photo || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
            />

            <label
              htmlFor="syllabus"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Syllabus
            </label>
            <input
              type="text"
              value={selectedCourse.syllabus || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
            />

            <label
              htmlFor="resources"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Resources
            </label>
            {selectedCourse.resources.map((resource, index) => (
              <input
                key={index}
                type="text"
                value={resource}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            ))}

            <label
              htmlFor="notes"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Notes
            </label>
            {selectedCourse.notes.map((note, index) => (
              <input
                key={index}
                type="text"
                value={note}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            ))}

            <label
              htmlFor="pyq"
              className="mb-2 text-sm text-start text-grey-900"
            >
              PYQ
            </label>
            {selectedCourse.pyq.map((pyq, index) => (
              <input
                key={index}
                type="text"
                value={pyq}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            ))}

            <div className="pb-2 pt-4">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button onClick={() => handleEditCourse()} variant="outlined">
                Edit Course
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={style}>
          <h3 className="text-lg font-semibold text-center mb-5">
            Confirm Deletion
          </h3>
          <p className="text-center text-sm text-gray-600">
            Are you sure you want to delete this program?
          </p>
          <div className="flex justify-center mt-5 ">
            <Button
              onClick={handleDeleteProgram}
              className="text-white bg-red-500"
              variant="contained"
            >
              Delete
            </Button>
            <Button
              onClick={closeDeleteModal}
              className="text-black "
              variant="outlined"
              style={{ marginLeft: "1rem" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminCourseNavbarCourseComponent;
