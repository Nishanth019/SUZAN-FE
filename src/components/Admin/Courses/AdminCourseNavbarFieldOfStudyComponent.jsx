'use client'
import Dropdown1 from '@/components/TailwindComponents/Dropdown';
import Dropdown2 from '@/components/TailwindComponents/FormDropdown';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState('');

  //div useStates
  const [fos, setFos]  =  useState('');
  const [fullFos, setFullFos]  =  useState('');
  const [formselectedProgram, setFormSelectedProgram] = useState('')

  const programs = ['Btech', 'Mtech'];
  const fieldsOfStudy = ['CSE', 'ECE'];

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

  return (
    <div>
      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5">
          Add Field of Study
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-5 ">
        <Dropdown1 name="Program" options={programs} onSelect={setSelectedProgram} />
        <Dropdown1 name="Field Of Study" options={fieldsOfStudy} onSelect={setSelectedFieldOfStudy} />
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
            sx={{ position: 'absolute', top: 8, right: 8 }}
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
              <Dropdown2  name="Program" options={programs} onSelect={setFormSelectedProgram} />
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
                value={fos}
                onChange={(e)=>setFos(e.target.value)}
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
                value={fullFos}
                onChange={(e)=>setFullFos(e.target.value)}
                placeholder="Computer Science Engineering"
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
                required
              />
            

              <div className="pb-2">
                {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
                <Button
                variant="contained"
                >
                  Add Field Of Study
                </Button>
              </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminCourseNavbarFieldOfStudyComponent;