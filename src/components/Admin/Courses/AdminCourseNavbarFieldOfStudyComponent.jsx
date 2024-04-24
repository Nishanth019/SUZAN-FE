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

const AdminCourseNavbarFieldOfStudyComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedProgramDetails, setSelectedProgramDetails] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [courseCount, setCourseCount] = useState(0);

  // Selected object values
  const [programs, setPrograms] = useState([]);
  const [fieldsOfStudy, setFieldOfStudy] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    console.log("nameisnani", fieldsOfStudy);
  }, [fieldsOfStudy])



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
        console.log("21bcs054")
        const response = await CourseService.getAllFieldsOfStudy(programId);
        console.log(response.data)
        setFieldOfStudy(response.data.fieldsOfStudy);
        const fieldOfStudyWithCounts = await Promise.all(
          response?.data?.fieldsOfStudy.map(async (fieldofstudy) => {
            // Fetch the count of courses for each program
            console.log("fieldofstudy:", fieldofstudy)
            const coursesCount = await fetchCourseCountForFieldOfStudy(selectedProgram, fieldofstudy._id);
            // Fetch the count of field of study for each program

            // Merge the counts with the program object
            return { ...fieldofstudy, coursesCount };
          })
        );
        // setSelectedFieldOfStudy(response.data.fieldsOfStudy[0]?._id);
        setFieldOfStudy(fieldOfStudyWithCounts);
      } catch (error) {
        console.error("Error fetching fields of studys:asd", error);
      }
    }
    if (selectedProgram) {
      fetchFieldsOfStudy(selectedProgram);
    }
    async function fetchProgramDetailsById(programId) {
      try {
        const response = await CourseService.getProgramById(programId);
        console.log(12345, response.data)
        setSelectedProgramDetails(response.data.program);
      } catch (error) {
        console.error("Error fetching program:", error);
      }
    }
    if (selectedProgram) {
      fetchProgramDetailsById(selectedProgram)

    }
  }, [selectedProgram]);





  useEffect(() => {
    console.log("dayday", fieldsOfStudy)
    console.log("dayday", fieldsOfStudy[0])
  }, [fieldsOfStudy, selectedFieldOfStudy]);



  const fetchAllFieldOfStudy = async () => {
    try {
      const response = await CourseService.getAllFieldsOfStudy(selectedProgram);
      setFieldOfStudy(response.data.fieldsOfStudy);

      // setSelectedFieldOfStudy(response.data.fieldsOfStudy[0]?._id);
      setFieldOfStudy(fieldOfStudyWithCounts);
    } catch (error) {
      console.error("Error fetching fields of studys:asd", error);
    }
  };



  const fetchCourseCountForFieldOfStudy = async (programId, fieldOfStudyId) => {
    try {
      console.log(123456);
      const response = await CourseService.getAllCourses(programId, fieldOfStudyId);
      console.log(123, response);
      return response.data.courses.length;
    } catch (error) {
      console.error("Error fetching course count for program:", error);
      return 0; // Return 0 if there's an error
    }
  };

  // const fieldsOfStudy = ["CSE", "ECE"];

  const [currentFieldOfStudy, setCurrentFieldOfStudy] = useState(null);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [field_of_studyname, setfield_of_studyname] = useState(null);
  const [field_of_studyfullname, setfield_of_studyfullname] = useState(null);

  // State for modal
  const [openModal, setModalOpen] = useState(false);





  // Function to handle opening the modal for adding a fos
  const openAddFieldOfStudyModal = () => {
    setCurrentFieldOfStudy(null);
    setCurrentProgram(null);
    setfield_of_studyname("");
    setfield_of_studyfullname("");
    setModalOpen(true);
  };

  // Function to handle opening the modal for editing a fos
  const openEditFieldOfStudyModal = (fos) => {
    setCurrentFieldOfStudy(fos);
    setCurrentProgram(selectedProgram);
    setfield_of_studyname(fos.field_of_studyname);
    setfield_of_studyfullname(fos.field_of_studyfullname);
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

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
      const response = await CourseService.searchFieldOfStudy(searchQuery);
      //  console.log("cheeku", response.data);
      setFieldOfStudy(response.data.fieldsOfStudy);
    } catch (error) {
      console.error("Error searching field of study:", error);
    }
  };


  const handleDeleteFieldOfStudy = async () => {
    try {
      const response = await CourseService.deleteFieldOfStudy(currentFieldOfStudy._id);
      console.log("deleted", response);
      fetchAllFieldOfStudy();
      closeDeleteModal();

    }
    catch (error) {
      console.error("Error deleting field of study:", error);
    }
  };

  // Function to handle adding or editing a fos
  const handleFieldOfStudyAction = async () => {
    if (currentFieldOfStudy) {

      // If currentFieldOfStudy exists, edit the program
      try {
        const response = await CourseService.updateFieldOfStudy(currentFieldOfStudy._id, {
          field_of_studyname,
          field_of_studyfullname,
        });
        // Refetch all programs after editing
        // Close the modal after editing the program
        toast.success(response.data.message || "Field Of Study is updated")
        closeModal();
        fetchAllFieldOfStudy();
      } catch (error) {
        console.error("Error editing Field Of Study:", error);
      }
    } else {
      // If currentFieldOfStudy does not exist, add a new Field Of Study
      try {
        // console.log(69,"working")
        // Create fos with provided data
        const response = await CourseService.createFieldOfStudy({
          //send program id
          programId: currentProgram,
          field_of_studyname: field_of_studyname,
          field_of_studyfullname: field_of_studyfullname,
        });
        // Refetch all fos after adding
        fetchAllFieldOfStudy();
        // Close the modal after adding the program
        // console.log(69,response);
        toast.success(response.data.message || "Field Of Study is created");
        closeModal();
      } catch (error) {
        console.error("Error adding Field Of Study:", error);
      }
    }
  };




  return (
    <div>

      

      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button
          onClick={openAddFieldOfStudyModal}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
        >
          Add Field of Study
        </button>
      </div>

      <div className="flex justify pb-2 md:pb-5">


        <div className="flex flex-wrap gap-2 sm:gap-5 mr-5 ">
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
                  placeholder="Search Field Of Study"
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

      </div>


      <div className="flex flex-wrap  py-5  md:py-10 gap-5 md:gap-10">

        {fieldsOfStudy?.map((fos, index) => (
          <FieldOfStudyCard
            key={index}
            title={fos.field_of_studyfullname}
            abbreviation={fos.field_of_studyname}
            programName={selectedProgramDetails.program_name}
            semestersCount={selectedProgramDetails.no_of_semester}
            coursesCount={courseCount}
            onEdit={() => openEditFieldOfStudyModal(fos)}
            onDelete={() => {
              setCurrentFieldOfStudy(fos);
              openDeleteModal();
            }}
          />
        ))}

      </div>
      {/* For add and edit Modal */}
      <Modal
        //  style={{ zIndex: 9999 }}
        // style={{ zIndex: 10000 }}
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
              {currentFieldOfStudy ? "Edit Field of Study Details" : "Add Field of Study Details"}
            </h3>

            {!currentFieldOfStudy ? <div className="py-2 md:pt-3 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Program*
              </label>

              <Dropdown2
                name="Program"
                options={programs?.map((program) => program?.program_name)}
                onSelect={(selectedProgramName) => {
                  const selectedProgram = programs?.find(
                    (program) => program?.program_name === selectedProgramName
                  );
                  setCurrentProgram(selectedProgram?._id);
                  // setSelectedSemester("")
                  // setCurrentFieldOfStudy("")
                }}
              />

            </div>
              : null
            }

            <label
              htmlFor="field_of_studyname"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Field Of Study Name*
            </label>
            <input
              id="fosname"
              type="text"
              value={field_of_studyname}
              onChange={(e) => setfield_of_studyname(e.target.value)}
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
              value={field_of_studyfullname}
              onChange={(e) => setfield_of_studyfullname(e.target.value)}
              placeholder="Computer Science Engineering"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <div className="pb-2">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button onClick={handleFieldOfStudyAction} variant="outlined">
                {currentFieldOfStudy ? "Update" : "Add"} Field Of Study
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
            Are you sure you want to delete this Field of Study?
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
