'use client'
import React from 'react'
import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { FaChevronDown, FaChevronUp  } from "react-icons/fa";
import Link from 'next/link';

const AdminSignUp = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOther, setSelectedOther] = useState(false);
  //button styling change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === 'other') {
      setSelectedOther(true);
    }
    else {
      setSelectedOther(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div className=" flex flex-col bg-gradient-to-t from-blue-300 via-pink-200 to-blue-100 p-10 px-5 ">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full  ">
          <div className="flex items-center ">
            <form className="flex flex-col shadow-lg w-full h-full pb-6 text-center bg-white rounded-3xl border border-gray-300 p-4 md:px-12 md:py-4 ">
              <h3 className="mb-3  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] font-extrabold text-dark-grey-900">
                Admin Sign Up
              </h3>
              <p className="mb-4 text-grey-700">
                Enter your details
              </p>

              <label
                htmlFor="name"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Name*
              </label>
              <input
                id="name"
                type="name"
                placeholder="Enter your name"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />
              <label
                htmlFor="email"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="mail@gmail.com"
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />
              <label
                htmlFor="password"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />
              <label
                htmlFor="confirmpassword"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Confirm Password*
              </label>
              <input
                id="confirmpassword"
                type="confirmpassword"
                placeholder="Re-Enter the password"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />

              <label
                htmlFor="rollnumber"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Roll Number*
              </label>
              <input
                id="rollnumber"
                type="rollnumber"
                placeholder="Enter the roll number"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />

              <label
                htmlFor="image"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Image*
              </label>
              <Button variant="gradient" className="flex items-center border border-gray-300 gap-3 mb-5">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                <div className='text-black'>
                  Upload Image as PDF
                </div>

              </Button>


              {/* //college dropdown */}
              <div className=" mb-5 text-left ">
                <label
                  htmlFor="collegeoption"
                  className="mb-5 py-3 text-sm text-start text-grey-900"
                >
                  College*
                </label>
                <div
                  onClick={toggleDropdown}
                  className="flex mt-3 items-center cursor-pointer "
                >
                  <div className="relative w-full">
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                      className="appearance-none bg-white w-full border border-gray-300 rounded px-4 py-2 leading-tight focus:outline-none focus:border-blue-500"
                    >
                      <option value="iiitjabalpur">IIIT Jabalpur</option>
                      <option value="jabalpurengineeringcollege">Jabalpur Engineering College</option>
                      <option value="ranidurgavathiinstitute">Rani Durgavathi Institute</option>
                      <option value="other">Other</option>
                    </select>

                    {/* Arrow icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    {!isDropdownOpen ? (
                        <FaChevronDown  className="h-4 w-4 text-gray-600" />
                      ) : (
                        <FaChevronUp className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>
                {selectedOther ? (
                  <div className='mt-6 '>
                    <label
                      htmlFor="newcollagename"
                      className="mb-3 mt-3 text-sm text-start text-grey-900"
                    >
                      College Name*
                    </label>
                    <input
                      id="newcollagename"
                      type="newcollagename"
                      placeholder="Enter Your College Name"
                      className="flex items-center w-full px-5 py-4 mt-2 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                      required
                    />
                  </div>
                ) : (
                  <div></div>
                )
                }

              </div>

              <Button className="w-full px-3 py-5 mt-10 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-purple-blue-100 bg-blue-400 border border-gray-300 md:px-12  ">
                Sign Up
              </Button>
              <p className="text-sm leading-relaxed mb-4 text-grey-900">
                Already registered?{" "}
                <Link
                  href="/signin"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

export default AdminSignUp