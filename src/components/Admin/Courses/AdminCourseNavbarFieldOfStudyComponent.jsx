"use client";
import Dropdown1 from "@/components/TailwindComponents/Dropdown";
import Dropdown2 from "@/components/TailwindComponents/FormDropdown";
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
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [programs, setPrograms] = useState([]); // State to store programs

  //div useStates
  const [fos, setFos] = useState("");
  const [fullFos, setFullFos] = useState("");
  const [formselectedProgram, setFormSelectedProgram] = useState("");

  const [fosDetails, setFosDetails] = useState({
    fieldsOfStudy_name: "",
    fieldsOfStudy_full_name: "",
  });

  useEffect(() => {
    // Fetch all programs when the component mounts
    fetchAllPrograms();
  }, []);

  // Function to fetch all programs
  const fetchAllPrograms = async () => {
    try {
      const response = await CourseService.getAllPrograms();
      setPrograms(response.data.programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const fieldsOfStudy = ["CSE", "ECE"];

  // State for modal
  const [modalOpen, setModalOpen] = useState(false);

  // Function to handle opening the modal
  const openModal = () => {
    setModalOpen(true);
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
        fieldName: fosDetails.fieldsOfStudy_name,
        fieldFullName: fosDetails.fieldsOfStudy_full_name,
      });
      // Close the modal after adding the field of study
      closeModal();
    } catch (error) {
      console.error("Error adding field of study:", error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      // Make an API request to fetch course details by ID from the backend
      // const response = await axios.get("/api/courses/:id"); // Replace ":id" with actual course ID
      // const fetchedCourseDetails = response.data;
      const fetchedFosDetails = {
        fieldsOfStudy_name: "testing ",
        fieldsOfStudy_full_name: "testing 1",
      };
      // Set the course details state with the fetched data
      setFosDetails(fetchedFosDetails);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button
          onClick={openModal}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
        >
          Add Field of Study
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-5 ">
        <Dropdown1
          name="Program"
          options={programs?.map((p)=>p.program_name)}
          onSelect={setSelectedProgram}
        />
        <Dropdown1
          name="Field Of Study"
          options={fieldsOfStudy}
          onSelect={setSelectedFieldOfStudy}
        />
      </div>
      <div className="flex flex-wrap  py-5  md:py-10 gap-5 md:gap-10">
        <ProgramCard
          title="Computer Science Engineering"
          abbreviation="CSE"
          programName="Btech"
          semestersCount={8}
          coursesCount={40}
          fetchCourseDetails
          openModal={openModal}
        />
        <ProgramCard
          title="Electronics and Communication Engineering"
          abbreviation="ECE"
          programName="Btech"
          semestersCount={8}
          coursesCount={40}
          fetchCourseDetails
        />
        <ProgramCard
          title="Mechanical Engineering"
          abbreviation="MECH"
          programName="Btech"
          semestersCount={8}
          coursesCount={40}
          fetchCourseDetails
        />
        <ProgramCard
          title="Smart Manufacturing"
          abbreviation="SM"
          programName="Btech"
          semestersCount={8}
          coursesCount={40}
          fetchCourseDetails
        />
        <ProgramCard
          title="Design"
          abbreviation="DES"
          programName="BDES"
          semestersCount={6}
          coursesCount={40}
          fetchCourseDetails
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
              Add Field Of Study Details
            </h3>
            <div className="py-2 md:py-8 flex flex-col">
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

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Field Of Study Name*
            </label>
            <input
              id="fosname"
              type="text"
              value={fosDetails.fieldsOfStudy_name}
              onChange={(e) => setFosDetails(e.target.value)}
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
              value={fosDetails.fieldsOfStudy_name}
              onChange={(e) => setFosDetails(e.target.value)}
              placeholder="Computer Science Engineering"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <div className="pb-2">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button   onClick={handleAddFieldOfStudy} variant="outlined">Add Field Of Study</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminCourseNavbarFieldOfStudyComponent;

const ProgramCard = ({
  title,
  abbreviation,
  programName,
  semestersCount,
  coursesCount,
  fetchCourseDetails,
  openModal,
}) => {
  const handleEdit = async () => {
    await fetchCourseDetails(); // Fetch course details when modal opens
    setModalOpen(true);
  };
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
            onClick={() => handleEdit()}
          >
            Edit
          </Button>
          <Button
            style={{ textTransform: "none" }}
            variant="outlined"
            size="sm"
            color="error"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
