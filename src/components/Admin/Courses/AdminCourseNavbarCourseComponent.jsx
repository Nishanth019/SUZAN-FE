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

import { ToastContainer, toast } from "react-toastify";


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
    resources_link: ["Resource 1", "Resource 2", "Resource 3"],
    resources_pdf: ["Resource 1", "Resource 2", "Resource 3"],
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
    resources_link: [[""]],
    resources_pdf: [[""]],
    pyq_link: [[""]],
    pyq_pdf: [[""]],
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

  const [selectedFile, setSelectedFile] = useState(null);
  // here
  const [selectedInstructorPhoto, setSelectedInstructorPhoto] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedResourcepdf, setSelectedResourcepdf] = useState([]);
  const [selectedpyqpdf, setSelectedpyqpdf] = useState([]);

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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        <Button onClick={() => handleDelete(course)}>
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
        resources_link: [["Resource 1", "https/godaddy.com"], ["Resource 2", "https/godaddy.com"], ["Resource 3", "https/godaddy.com"]],
        resources_pdf: [["Resource 1", "https/godaddy.com"], ["Resource 2", "https/godaddy.com"], ["Resource 3", "https/godaddy.com"]],
        pyq_link: [["pyq 1", "https/godaddy.com"], ["pyq 2", "https/godaddy.com"], ["pyq 3", "https/godaddy.com"]],
        pyq_pdf: [["pyq 1", "https/godaddy.com"], ["pyq 2", "https/godaddy.com"], ["pyq 3", "https/godaddy.com"]],
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
  const handleInputChange = (field, index, value) => {
    const newDetails = { ...courseDetails };
    newDetails[field][index] = value;
    setCourseDetails(newDetails);
  };
  const handleInputChangeresourcelink = (index, fieldIndex, value) => {
    const updatedResources = [...courseDetails.resources_link];
    updatedResources[index][fieldIndex] = value;
    setCourseDetails({ ...courseDetails, resources_link: updatedResources });
  };
  const handleInputChangepyqlink = (index, fieldIndex, value) => {
    const updatedPyq = [...courseDetails.pyq_link];
    updatedPyq[index][fieldIndex] = value;
    setCourseDetails({ ...courseDetails, pyq_link: updatedPyq });
  };

  const handleInputChangeresourcepdf = (index, fieldIndex, value) => {
    const updatedResources = [...courseDetails.resources_pdf];
    updatedResources[index][fieldIndex] = value;
    setCourseDetails({ ...courseDetails, resources_pdf: updatedResources });
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
    if (field === 'resources_pdf') {
      setSelectedResourcepdf((prevState) => (
        prevState.filter((_, i) => i !== index)
      ));
    }
    if (field === 'pyq_pdf') {
      setSelectedpyqpdf((prevState) => (
        prevState.filter((_, i) => i !== index)
      ));
    }

  };

  const handleChangePicture = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(23, file);
    try {
      const formData = new FormData();
      formData.append("picture", file);
      // formData.append("userData", JSON.stringify(userData)); // Append other user data
      console.log(23333, formData);
      const response = await UserService.uploadPicture(formData);
      setPicture(response?.data?.user?.picture);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error message
    }
  };
  const handleChangeSyllabus = async (e) => {
    const file = e.target.files[0];
    setSelectedSyllabus(file);
    console.log(23, file);
    // try {
    //   const formData = new FormData();
    //   formData.append("picture", file);
    //   // formData.append("userData", JSON.stringify(userData)); // Append other user data
    //   console.log(23333, formData);
    //   const response = await UserService.uploadPicture(formData);
    //   setPicture(response?.data?.user?.picture);
    //   toast.success(response.data.message, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } catch (error) {
    //   console.error("Error uploading syllabus:", error);
    //   // Handle error message
    // }
  };
  const handleChangeResourcepdf = async (index, fieldIndex, e) => {

    const file = e.target.files[0];
    const fileName = file.name; // Extracting file name from the file object
    const newSelectedResourcepdf = [...selectedResourcepdf];
    newSelectedResourcepdf[index] = fileName; // Storing only the file name
    setSelectedResourcepdf(newSelectedResourcepdf);


    console.log(23, newSelectedResourcepdf[index], " + ", e.target.value);

    const updatedResources = [...courseDetails.resources_pdf];
    updatedResources[index][fieldIndex] = file;
    setCourseDetails({ ...courseDetails, resources_pdf: updatedResources });
    console.log(29, file);
    // try {
    //   const formData = new FormData();
    //   formData.append("picture", file);
    //   // formData.append("userData", JSON.stringify(userData)); // Append other user data
    //   console.log(23333, formData);
    //   const response = await UserService.uploadPicture(formData);
    //   setPicture(response?.data?.user?.picture);
    //   toast.success(response.data.message, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } catch (error) {
    //   console.error("Error uploading syllabus:", error);
    //   // Handle error message
    // }
  };
  const handleChangepyqpdf = async (index, fieldIndex, e) => {

    const file = e.target.files[0];
    const fileName = file.name; // Extracting file name from the file object
    const newSelectedpyqpdf = [...selectedpyqpdf];
    newSelectedpyqpdf[index] = fileName; // Storing only the file name
    setSelectedpyqpdf(newSelectedpyqpdf);


    const updatedpyq = [...courseDetails.pyq_pdf];
    updatedpyq[index][fieldIndex] = file;
    setCourseDetails({ ...courseDetails, pyq_pdf: updatedpyq });
    console.log(23, newSelectedpyqpdf[index], " + ", e.target.value);

    console.log(29, file);
    // try {
    //   const formData = new FormData();
    //   formData.append("picture", file);
    //   // formData.append("userData", JSON.stringify(userData)); // Append other user data
    //   console.log(23333, formData);
    //   const response = await UserService.uploadPicture(formData);
    //   setPicture(response?.data?.user?.picture);
    //   toast.success(response.data.message, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } catch (error) {
    //   console.error("Error uploading syllabus:", error);
    //   // Handle error message
    // }
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

            <label htmlFor="instructorFileInput" className="mb-2 text-sm text-start text-grey-900 ">
              Upload Instructor Photo*</label>
            <div className="flex items-center mb-8">
              <input required type="file" id="instructorFileInput"
                onChange={(e) => setSelectedInstructorPhoto(e.target.files[0])} className="block w-full text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 " />
              {selectedFile && (
                <p className="text-center">{selectedFile.name}</p>
              )}
            </div>


            <label
              htmlFor="syllabusFileInput"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Upload Syllabus*
            </label>
            <div className="flex items-center mb-8">
              <input required type="file" id="syllabusFileInput" onChange={(e) => setSelectedSyllabus(e.target.files[0])} className="block w-full text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 " />

            </div>

            <label
              htmlFor="resources_link"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload Resources* (Link)
            </label>
            {courseDetails.resources_link.map((rsc, index) => (
              <div key={index} className="mb-5">
                <input
                  type="text"
                  value={rsc[0]} // Assuming resource[0] is the name of the resource
                  onChange={(e) =>
                    handleInputChangeresourcelink(index, 0, e.target.value) // Pass index and 0 to identify the name
                  }
                  placeholder="Link Name"
                  className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                <input
                  type="text"
                  value={rsc[1]} // Assuming resource[1] is the URL of the resource
                  onChange={(e) =>
                    handleInputChangeresourcelink(index, 1, e.target.value) // Pass index and 1 to identify the URL
                  }
                  placeholder="Link url"
                  className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                <div className="flex justify-end">
                  {index > 0 && (
                    <>
                      <Button
                        style={{ textTransform: "none" }}
                        className="max-md:hidden mb-5 "
                        onClick={() => handleDeleteField("resources_link", index)}
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>

                      {/* <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("resources_pdf", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button> */}


                    </>
                  )}
                </div>
              </div>
            ))}

            <Button
              onClick={() => handleAddField("resources_link")}
              cariant="outlined"
            >
              + Add More Resources
            </Button>



            <label
              htmlFor="resources-pdf"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload Resources* (pdf)
            </label>

            {/* sd */}
            {courseDetails.resources_pdf.map((resource, index) => (
              <div key={index} className="mb-5 ">
                <input
                  type="text"
                  value={resource[0]} // Assuming resource[0] is the name of the resource
                  onChange={(e) =>
                    handleInputChangeresourcepdf(index, 0, e.target.value) // Pass index and 0 to identify the name
                  }
                  placeholder="Link Name"
                  className="flex items-center w-full mb-2 px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {/* <div className="flex items-center mb-8"> */}
                <input // Assuming resource[1] is the URL of the resource
                  onChange={(e) =>
                    handleInputChangeresourcelink(index, 1, e.target.value) // Pass index and 1 to identify the URL
                  }
                  placeholder="Link url"
                  type="file"
                  id={`resourcePdfInput-${index}`}
                  className="block w-full mb-2 flex justify-content items-center text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "
                  required />

                {/* </div> */}
                {/* make the below div items inside to left */}

                <div className="flex justify-end">
                  {index > 0 && (
                    <>
                      <Button
                        style={{ textTransform: "none" }}
                        className="max-md:hidden mb-2"
                        onClick={() => handleDeleteField("resources_pdf", index)}
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      {/* <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("resources_pdf", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button> */}


                    </>
                  )}
                </div>

              </div>
            ))}

            <Button
              onClick={() => handleAddField("resources_pdf")}
              className="mb-10"
              cariant="outlined"
            >
              + Add More Resources
            </Button>






            <label
              htmlFor="pyq"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload PYQ*
            </label>
            {courseDetails.pyq_link.map((pyq, index) => (
              <div key={index} className=" mb-5">
                <input
                  type="text"
                  value={pyq[0]} // Assuming resource[0] is the name of the resource
                  onChange={(e) =>
                    handleInputChangepyqlink(index, 0, e.target.value)
                  }
                  placeholder="PYQ Name"
                  className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                <input
                  type="text"
                  value={pyq[1]} // Assuming resource[1] is the URL of the resource
                  onChange={(e) =>
                    handleInputChangepyqlink(index, 1, e.target.value) // Pass index and 1 to identify the URL
                  }
                  placeholder="PYQ url"
                  className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                <div className="flex justify-end">
                  {index > 0 && (
                    <>
                      <Button
                        style={{ textTransform: "none" }}
                        className="max-md:hidden "
                        onClick={() => handleDeleteField("pyq_link", index)}
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>

                      {/* <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("resources_pdf", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button> */}


                    </>
                  )}
                </div>
              </div>
            ))}

            <Button onClick={() => handleAddField("pyq_link")} cariant="outlined">
              + Add More PYQs
            </Button>
            <label
              htmlFor="pyq-pdf"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload pyq* (pdf)
            </label>

            {/* sd */}
            {courseDetails.pyq_pdf.map((pyq, index) => (
              <div key={index} className=" mb-5 ">
                <input
                  type="text"
                  value={pyq[0]} // Assuming resource[0] is the name of the resource
                  onChange={(e) =>
                    handleInputChangepyqpdf(index, 0, e.target.value) // Pass index and 0 to identify the name
                  }
                  placeholder="Link Name"
                  className="flex items-center w-full mb-2 px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {/* <div className="flex items-center mb-8"> */}

                <input
                  id={`pyqPdfInput-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChangepyqpdf(index, 1, e)}
                  className="block w-full text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "
                  required
                />

                {/* </div> */}
                <div className="flex justify-end">
                  {index > 0 && (
                    <>
                      <Button
                        style={{ textTransform: "none" }}
                        className="max-md:hidden m-2"
                        onClick={() => handleDeleteField("pyq_pdf", index)}
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      {/* <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("resources_pdf", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button> */}


                    </>
                  )}
                </div>
              </div>
            ))}

            <Button
              onClick={() => handleAddField("pyq_pdf")}
              cariant="outlined"
            >
              + Add More Resources
            </Button>

            <div className="pb-2 pt-4">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button variant="outlined">Add Course</Button>
            </div>
          </div>
        </Box>
      </Modal>
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
            {selectedCourse.resources_link.map((resource, index) => (
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
    </div>
  );
};
export default AdminCourseNavbarCourseComponent;