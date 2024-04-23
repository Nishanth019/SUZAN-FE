"use client";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import Card from "@mui/material/Card";
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

const AdminCourseNavbarProgramComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [programName, setProgramName] = useState("");
  const [programFullName, setProgramFullName] = useState("");
  const [semestersCount, setSemetersCount] = useState("");
  const [programs, setPrograms] = useState([]); // State to store programs
  const [currentProgram, setCurrentProgram] = useState(null); // State to store the program being edited

  useEffect(() => {
    // Fetch all programs when the component mounts
    fetchAllPrograms();
  }, []);

  // Function to fetch all programs
  const fetchAllPrograms = async () => {
    try {
      const response = await CourseService.getAllPrograms();
      const programsWithCounts = await Promise.all(
        response.data.programs.map(async (program) => {
          // Fetch the count of courses for each program
          const coursesCount = await fetchCourseCountForProgram(program._id);
          // Fetch the count of field of study for each program
          const fieldOfStudyCount = await fetchFieldOfStudyCountForProgram(
            program._id
          );
          // Merge the counts with the program object
          return { ...program, coursesCount, fieldOfStudyCount };
        })
      );
      // console.log(69,programsWithCounts);
      setPrograms(programsWithCounts);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };
// console.log(70,programs)
  const fetchCourseCountForProgram = async (programId) => {
    try {
      console.log(123456);
      const response = await CourseService.getAllCourses(programId);
      console.log(123, response);
      return response.data.courses.length;
    } catch (error) {
      console.error("Error fetching course count for program:", error);
      return 0; // Return 0 if there's an error
    }
  };

  const fetchFieldOfStudyCountForProgram = async (programId) => {
    try {
      const response = await CourseService.getAllFieldsOfStudy(programId);
      console.log(1233, response);
      return response.data.fieldsOfStudy.length;
    } catch (error) {
      console.error("Error fetching field of study count for program:", error);
      return 0; // Return 0 if there's an error
    }
  };

  // Function to handle opening the modal for adding a program
  const openAddProgramModal = () => {
    setCurrentProgram(null);
    setProgramName("");
    setProgramFullName("");
    setSemetersCount("");
    setModalOpen(true);
  };

  // Function to handle opening the modal for editing a program
  const openEditProgramModal = (program) => {
    setCurrentProgram(program);
    setProgramName(program.program_name);
    // console.log(71,programName,program,program.progamName);
    setProgramFullName(program.program_fullname);
    setSemetersCount(program.no_of_semester);
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to handle opening the delete confirmation modal
  const openDeleteModal = () => {
   
    setDeleteModalOpen(true);
  };

  // Function to handle closing the delete confirmation modal
  const closeDeleteModal = () => {
    
    setDeleteModalOpen(false);
  };

  //search
   const handleSearch = async () => {
     try {
      //  console.log("sully");
       const response = await CourseService.searchProgram(searchQuery);
      //  console.log("cheeku", response.data);
       setPrograms(response.data.programs);
     } catch (error) {
       console.error("Error searching Program:", error);
     }
   };


  // Function to handle deleting a program
  const handleDeleteProgram = async () => {
    try {
      
      const response = await CourseService.deleteProgram( {programId: currentProgram._id} );
      // console.log("deleting",2)
      // Refetch all programs after deleting
      fetchAllPrograms();
      // Close the delete confirmation modal after deleting the program
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  // Function to handle adding or editing a program
  const handleProgramAction = async () => {
    if (currentProgram) {
      // If currentProgram exists, edit the program
      try {
        const response = await CourseService.updateProgram({
          programId: currentProgram._id,
          programName,
          programFullName,
          semestersCount,
        });
        // Refetch all programs after editing
        // Close the modal after editing the program
        toast.success(response.data.message || "Program is updated")
        closeModal();
        fetchAllPrograms();
      } catch (error) {
        console.error("Error editing program:", error);
      }
    } else {
      // If currentProgram does not exist, add a new program
      try {
        // console.log(69,"working")
        // Create program with provided data
        const response=await CourseService.createProgram({
          programName,
          programFullName,
          semestersCount,
        });
        // Refetch all programs after adding
        fetchAllPrograms();
        // Close the modal after adding the program
        // console.log(69,response);
        toast.success(response.data.message || "Program is created");
        closeModal();
      } catch (error) {
        console.error("Error adding program:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button
          onClick={openAddProgramModal}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
        >
          Add Program
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-5">
        <div className="w-full md:w-[250px]">
          <form
            className="max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaSearch
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                id="default-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Search Program"
              />
              <button
                type="submit"
                className="text-white absolute end-1 bottom-1 bg-blue-500 hover:bg-blue-600   font-medium rounded-lg text-sm px-4 py-2 "
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-wrap  py-5  md:py-10 gap-5 md:gap-10">
        {/* Rendering programs dynamically */}
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            title={program.program_fullname}
            abbreviation={program.program_name}
            fieldOfStudyCount={program.fieldOfStudyCount}
            semestersCount={program.no_of_semester}
            coursesCount={program.coursesCount}
            onEdit={() => openEditProgramModal(program)}
            onDelete={() => {
              setCurrentProgram(program);
              openDeleteModal();
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        style={{ zIndex: 10000 }}
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
          <div className="flex  flex-col w-full h-full py-6 text-center bg-white ">
            <h3 className="pb-5  text-[25px]  md:text-[35px]  font-extrabold text-dark-grey-900">
              {currentProgram ? "Edit Program Details" : "Add Program Details"}
            </h3>

            <label
              htmlFor="programName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Program Name*
            </label>
            <input
              id="programname"
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              placeholder="Btech"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
              disabled={currentProgram ? true : false}
            />

            <label
              htmlFor="email"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Program Full Name*
            </label>
            <input
              id="programfullname"
              type="text"
              value={programFullName}
              onChange={(e) => setProgramFullName(e.target.value)}
              placeholder="Bachelor of Technology"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="email"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Number of Semesters*
            </label>
            <input
              id="programfullname"
              type="number"
              value={semestersCount}
              onChange={(e) => setSemetersCount(e.target.value)}
              placeholder="8"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <div className="pb-2">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button onClick={handleProgramAction} variant="outlined">
                {currentProgram ? "Update" : "Add"} Program
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

export default AdminCourseNavbarProgramComponent;

const ProgramCard = ({
  title,
  abbreviation,
  fieldOfStudyCount,
  semestersCount,
  coursesCount,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="w-full max-w-xs rounded-2xl border">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col p-6 items-start space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm font-normal leading-none text-gray-500">
            {abbreviation}
          </p>
          <div className="grid grid-cols-2 w-full gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium leading-none text-gray-500">
                Field of Study Count
              </span>
              <span className="text-sm font-medium leading-none">
                {fieldOfStudyCount}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium leading-none text-gray-500">
                Semesters Count
              </span>
              <span className="text-sm font-medium leading-none">
                {semestersCount}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium leading-none text-gray-500">
                Courses
              </span>
              <span className="text-sm font-medium leading-none">
                {coursesCount}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t p-4 flex justify-end gap-2">
          <Button
            style={{ textTransform: "none" }}
            className="text-white bg-blue-800 "
            size="sm"
            variant="contained"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            style={{ textTransform: "none" }}
            variant="outlined"
            size="sm"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
