'use client'
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link"
import Card from '@mui/material/Card';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [programName, setProgramName] = useState('');
  const [programFullName, setProgramFullName] = useState('');

  // Function to handle opening the modal
  const openModal = () => {
    setModalOpen(true);
  };
  
  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to handle adding a program
  const handleAddProgram = () => {
    // Add logic to handle adding the program here
    console.log("Program Name:", programName);
    console.log("Program Full Name:", programFullName);
    // Close the modal after adding the program
    closeModal();
  };

  return (
    <div>
      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5">
          Add Program
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-5">
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
      <div className="flex flex-wrap  py-5  md:py-10 gap-5 md:gap-10">
      <ProgramCard
  title="Bachelor of Technology"
  abbreviation="Btech"
  fieldOfStudyCount={10}
  semestersCount={8}
  coursesCount={40}
/>
<ProgramCard
  title="Bachelor of Technology"
  abbreviation="Btech"
  fieldOfStudyCount={10}
  semestersCount={8}
  coursesCount={40}
/>
<ProgramCard
  title="Bachelor of Technology"
  abbreviation="Btech"
  fieldOfStudyCount={10}
  semestersCount={8}
  coursesCount={40}
/>
<ProgramCard
  title="Bachelor of Technology"
  abbreviation="Btech"
  fieldOfStudyCount={10}
  semestersCount={8}
  coursesCount={40}
/>

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
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            X
          </Button>
          <form
              // onSubmit={handleSubmit}
              className="flex  flex-col w-full h-full py-6 text-center bg-white "
            >
              <h3 className="pb-5  text-[25px]  md:text-[35px]  font-extrabold text-dark-grey-900">
                Add Program Details
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
                onChange={(e)=>setProgramName(e.target.value)}
                placeholder="Btech"
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
                required
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
                onChange={(e)=>setProgramFullName(e.target.value)}
                placeholder="Bachelor of Technology"
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
                required
              />
            

              <div className="pb-2">
                {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
                <Button
                variant="contained"
                >
                  Add Program
                </Button>
              </div>
            </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminCourseNavbarProgramComponent;



const ProgramCard = ({ title, abbreviation, fieldOfStudyCount, semestersCount, coursesCount }) => {
  return (
    <Card className="w-full max-w-xs rounded-2xl border">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col p-6 items-start space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm font-normal leading-none text-gray-500">{abbreviation}</p>
          <div className="grid grid-cols-2 w-full gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium leading-none text-gray-500">Field of Study Count</span>
              <span className="text-sm font-medium leading-none">{fieldOfStudyCount}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium leading-none text-gray-500">Semesters Count</span>
              <span className="text-sm font-medium leading-none">{semestersCount}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium leading-none text-gray-500">Courses</span>
              <span className="text-sm font-medium leading-none">{coursesCount}</span>
            </div>
          </div>
        </div>
        <div className="border-t p-4 flex justify-end gap-2">
        <Button  style={{ textTransform: 'none' }} className="text-white bg-blue-800 " size="sm" variant="contained">Edit</Button>
          <Button  style={{ textTransform: 'none' }} variant="outlined" size="sm" color="error">
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
