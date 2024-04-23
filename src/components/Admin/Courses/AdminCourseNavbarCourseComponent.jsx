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
import CourseService from "@/services/course.service.js";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Dropdown selected useStates
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Selected object values
  const [programs, setPrograms] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);

  //deleting course id
  const [deletingCourseId, setDeletingCourseId] = useState(null); 
  //editing course id
  const [editingCourseId, setEditingCourseId] = useState(null);   
  //viewing course id
  const [viewingCourseId, setViewingCourseId] = useState(null); 
  
  
  //form useStates
  const [formselectedProgram, setFormSelectedProgram] = useState("");
  const [formSelectedFieldOfStudy, setFormSelectedFieldOfStudy] = useState("");
  const [formSelectedSemesters, setFormSelectedSemesters] = useState("");

 
  useEffect(() => {
    // Fetch all programs on component mount
    async function fetchPrograms() {
      try {
        const response = await CourseService.getAllPrograms();
        setPrograms(response.data.programs);
        // setSelectedProgram(response.data.programs[0]?._id);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    }
    fetchPrograms();
  }, []);

  useEffect(() => {
    // Fetch fields of study when program selected
    async function fetchFieldsOfStudy(programId) {
      try {
        const response = await CourseService.getAllFieldsOfStudy(programId);
        setFieldOfStudy(response.data.fieldsOfStudy);
        // setSelectedFieldOfStudy(response.data.fieldsOfStudy[0]?._id);
      } catch (error) {
        console.error("Error fetching fields of study:", error);
      }
    }
    if (selectedProgram) {
      fetchFieldsOfStudy(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    // Fetch semesters when field of study selected
    async function fetchSemesters(fieldOfStudyId) {
      try {
        const response = await CourseService.getAllSemester(fieldOfStudyId);
        console.log(12345,response.data)
        setSemesters(response.data.semesters);
        // setSelectedSemester(response.data.semesters[0]?._id);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    }
    if (selectedFieldOfStudy) {
      fetchSemesters(selectedFieldOfStudy);
    }
  }, [selectedFieldOfStudy]);

  useEffect(() => {
    fetchCourses();
  }, [selectedProgram, selectedFieldOfStudy, selectedSemester]);

  async function fetchCourses() {
    try {
      console.log(1223456)
      const response = await CourseService.getAllCourses({programId:selectedProgram,fieldOfStudyId:selectedFieldOfStudy,semesterId:selectedSemester});
      console.log(5,response.data);
      console.log(1223455)
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  const handleSearch = async () => {
    try {
      console.log("sully")
      const response = await CourseService.searchCourse(searchQuery);
      console.log("cheeku",response.data)
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

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
  
  // Dummy courses data
  const openViewModal = () => {
    setViewModalOpen(true);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedInstructorPhoto, setSelectedInstructorPhoto] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedResourcepdf, setSelectedResourcepdf] = useState([]);
  const [selectedpyqpdf, setSelectedpyqpdf] = useState([]);

  // Function to handle closing the modal
  const closeViewModal = () => {
    setViewModalOpen(false);
  };

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
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Function to handle closing the delete confirmation modal
  const closeDeleteModal = () => {
    setDeletingCourseId(null)
    setDeleteModalOpen(false);
  };
  const handleDelete = async (course) => {
    setDeletingCourseId(course._id)
    openDeleteModal();
  };

  // Function to handle deleting a program
  const handleDeleteCourse = async () => {
    try {
      console.log("deleting", deletingCourseId);
      const res = await CourseService.deleteCourse({deletingCourseId});
      console.log(455,res.data.message)
      console.log("deleting", 2);
      fetchCourses()
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
                options={programs?.map((program) => program?.program_name)}
                onSelect={(selectedProgramName) => {
                  const selectedProgram = programs?.find(
                    (program) => program?.program_name === selectedProgramName
                  );
                  setSelectedProgram(selectedProgram?._id);
                  setSelectedSemester("")
                  setSelectedFieldOfStudy("")
                }}
              />
              <Dropdown
                name="Field Of Study"
                options={fieldOfStudy?.map((field) => field?.field_of_studyname)}
                onSelect={(selectedFieldOfStudyName) => {
                  const selectedFieldOfStudy = fieldOfStudy?.find(
                    (field) => field?.field_of_studyname === selectedFieldOfStudyName
                  );
                  setSelectedFieldOfStudy(selectedFieldOfStudy?._id);
                  setSelectedSemester("")
                }}
              />
              <Dropdown
                name="Semester"
                options={semesters?.map((semester) => semester?.semester)}
                onSelect={(selectedSemesterName) => {
                  const selectedSemester = semesters?.find(
                    (semester) => semester?.semester === selectedSemesterName
                  );
                  setSelectedSemester(selectedSemester?._id);
                }}
              />
              <div className="w-full md:w-[270px]">
              <form className="max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-500 " aria-hidden="true" />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                      placeholder="Search Course"
                    />
                    <button type="submit" className="text-white absolute end-1 bottom-1 bg-blue-500 hover:bg-blue-600   font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                </div>
              </form>
      </div>
      </div>
      {/* tables */}
      <div className="py-2 md:py-5">
      <CoursesTable
          courses={courses}
          openViewModal={openViewModal}
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
        />
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
                options={fieldOfStudy}
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
              onClick={handleDeleteCourse}
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