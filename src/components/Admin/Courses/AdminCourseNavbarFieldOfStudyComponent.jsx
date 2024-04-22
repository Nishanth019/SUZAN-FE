"use client";
import Dropdown1 from "@/components/TailwindComponents/Dropdown";
import Dropdown2 from "@/components/TailwindComponents/FormDropdown";
import Dropdown from "@/components/TailwindComponents/Dropdown";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CourseService from '@/services/course.service.js';

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

const AdminCourseNavbarFieldOfStudyComponent = () => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedProgramDetails, setSelectedProgramDetails] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [courseCount, setCourseCount] = useState(0);
  // const [openModal, setOpenModal] = useState(false);
  // const [selectedSemester, setSelectedSemester] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");

  // Selected object values
  const [programs, setPrograms] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [currentFieldOfStudy, setCurrentFieldOfStudy] = useState(null);
  // const [semesters, setSemesters] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);




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
        console.error("Error fetching fields of studys:", error);
      }
    }
    if (selectedProgram) {
      fetchFieldsOfStudy(selectedProgram);
    }
    async function fetchProgramDetailsById(programId) {
      try {
        const response = await CourseService.getProgramById(programId);
        console.log(12345,response.data)
        setSelectedProgramDetails(response.data.program);
      } catch (error) {
        console.error("Error fetching program:", error);
      }
    }
    if(selectedProgram){
      fetchProgramDetailsById(selectedProgram)
    }
  }, [selectedProgram]);


  useEffect(() => {
    //function to get all field of study for a program
    async function fetchFieldOfStudy() {
      try {
        console.log(1223456)
        const response = await CourseService.getAllFieldsOfStudy(selectedProgram);
        console.log("1054",response.data);
        const fieldOfStudyWithCounts = await Promise.all(
          response.data.fieldsOfStudy.map(async (fieldofstudy) => {
            // Fetch the count of courses for each program
            const coursesCount = await fetchCourseCountForFieldOfStudy(selectedProgram,fieldofstudy._id);
            // Fetch the count of field of study for each program
            const fieldOfStudyCount = await fetchFieldOfStudyCountForProgram(
              fieldofstudy._id
            );
            // Merge the counts with the program object
            return { ...fieldofstudy, coursesCount, fieldOfStudyCount };
          })
        );
        console.log(69,fieldOfStudyWithCounts);
        setCourseCount(fieldOfStudyWithCounts);

      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchFieldOfStudy();

  }, [selectedProgram]);



  useEffect(() => {
    console.log("dayday", fieldOfStudy)
    console.log("dayday", fieldOfStudy[0])
  }, [fieldOfStudy, selectedFieldOfStudy]);


  useEffect(() => {
    // Fetch courses when program, field of study, or semester selected
    // async function fetchFieldOfStudy() {
    //   try {
    //     console.log(1223456)
    //     const response = await CourseService.getAllFieldsOfStudy({programId:selectedProgram});
    //     console.log(5,response.data);
    //     console.log(1223455)
    //     setFieldOfStudy(response.data.courses);
    //   } catch (error) {
    //     console.error("Error fetching courses:", error);
    //   }
    // }
    // fetchFieldOfStudy();
  }, [selectedProgram, selectedFieldOfStudy]);


  const fetchCourseCountForFieldOfStudy = async (programId,fieldOfStudyId) => {
    try {
      console.log(123456);
      const response = await CourseService.getAllCourses(programId,fieldOfStudyId);
      console.log(123, response);
      return response.data.courses.length;
    } catch (error) {
      console.error("Error fetching course count for program:", error);
      return 0; // Return 0 if there's an error
    }
  };

  // const fieldsOfStudy = ["CSE", "ECE"];

  // State for modal
  const [openModal, setOpenModal] = useState(false);

  // Function to handle opening the modal
  const openAddFosModal = () => {
    setModalOpen(true);
  };

// Function to handle opening the modal for editing a course
  const openEditfosModal = (fos) => {
    // setCurrentfos(fos);
    // setfosName(fos.programName);
    // setfosFullName(fos.programFullName);
    // setSemetersCount(fos.semestersCount);
    setModalOpen(true);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Function to handle closing the delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openAddProgramModal = () => {
    setCurrentProgram(null);
    setProgramName("");
    setProgramFullName("");
    setSemetersCount("");
    setModalOpen(true);
  };
  const openEditProgramModal = (program) => {
    setCurrentProgram(program);
    setProgramName(program.programName);
    setProgramFullName(program.programFullName);
    setSemetersCount(program.semestersCount);
    setModalOpen(true);
  };

  const handleDeleteFieldOfStudy = async () => {
    try {
      console.log("deleting",1)
      await CourseService.deleteFieldOfStudy(currentFieldOfStudy._id);
      console.log("deleting",2)
      // Refetch all fields of study after deleting
      fetchFieldsOfStudy();
      // Close the delete confirmation modal after deleting the program
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddFieldOfStudy = async () => {
    try {
      // Create field of study with provided data
      await CourseService.createFieldOfStudy({
        programName: selectedProgram,
        fieldName: fieldOfStudy.fieldsOfStudy_name,
        fieldFullName: fieldOfStudy.fieldsOfStudy_full_name,
      });
      // Close the modal after adding the field of study
      closeModal();
    } catch (error) {
      console.error("Error adding field of study:", error);
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
          Add Field of Study
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
            // setSelectedSemester("")
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
            // setSelectedSemester("")
          }}
        />
      </div>
      <div className="flex flex-wrap  py-5  md:py-10 gap-5 md:gap-10">
        
        {fieldOfStudy.map((fos, index) => (
          <FieldOfStudyCard
            key={index}
            title={fos.field_of_studyfullname}
            abbreviation={fos.field_of_studyname}
            programName={selectedProgramDetails.program_name}
            semestersCount={selectedProgramDetails.no_of_semester}
            coursesCount={courseCount}
            onEdit={() => openEditfosModal(fos)}
            onDelete={() => {
              setCurrentFieldOfStudy(fos);
              openDeleteModal();
            }}
          />
        ))}
      </div>
      {/* Modal */}
      <Modal
        //  style={{ zIndex: 9999 }}
        open={openModal}
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
              Add Field Of Study Details
            </h3>
            <div className="py-2 md:py-8 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Program*
              </label>
              <Dropdown
                name="Program"
                options={programs?.map((program) => program?.program_name)}
                onSelect={(selectedProgramName) => {
                  const selectedProgram = programs?.find(
                    (program) => program?.program_name === selectedProgramName
                  );
                  setSelectedProgram(selectedProgram?._id);
                  // setSelectedSemester("")
                  setSelectedFieldOfStudy("")
                }}
              />
            </div>

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Field Of Study Name*
            </label>
            <input
              id="fosname"
              type="text"
              value={fieldOfStudy.fieldsOfStudy_name}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              placeholder="CSE"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="email"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Field Of Study Full Name*
            </label>
            <input
              id="fullfosname"
              type="text"
              value={fieldOfStudy.fieldsOfStudy_name}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              placeholder="Computer Science Engineering"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <div className="pb-2">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button onClick={handleAddFieldOfStudy} variant="outlined">Add Field Of Study</Button>
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
              onClick={handleDeleteFieldOfStudy}
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

export default AdminCourseNavbarFieldOfStudyComponent;

const FieldOfStudyCard = ({
  title,
  abbreviation,
  programName,
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
                Program Name
              </span>
              <span className="text-sm font-medium leading-none">
                {programName}
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
