"use client";
import React, { useEffect, useState } from "react";
import Input from "../Generals/Input";
import { useRouter } from "next/navigation";
import UserService from "@/services/user.service";
import collegeService from "@/services/college.service";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Dropdown from "../TailwindComponents/Dropdown";
import { FaSearch } from "react-icons/fa";
const CoursesCard = ({ CourseDetails, setCourseDetails }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);
    console.log(CourseDetails.program);

    const [programs, setPrograms] = useState(["BTECH", "Bdes", "Bcom"]);
    const [fieldsOfStudy, setFieldsOfStudy] = useState(["CSE", "ECE"]);
    const [semesters, setSemesters] = useState(["I", "II", "III", "IV"]);
    // useEffect(() => {
    //     setPrograms(CourseDetails?.program);
    // }, []);
    // console.log("assa", CourseDetails.program);
    // const semesters = ["I", "II", "III", "IV"];

    //form useStates
    const [formselectedProgram, setFormSelectedProgram] = useState("");
    const [formSelectedFieldOfStudy, setFormSelectedFieldOfStudy] = useState("");
    const [formSelectedSemesters, setFormSelectedSemesters] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");

    // Dummy courses data
    const courses = [
        // Array of course objects with properties like course code, course name, credits, professor name, view button, edit button
        // Example:
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 1,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 2,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 3,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 4,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 5,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 6,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 7,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS104",
            name: "Introduction to Computer Science",
            credits: 8,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS103",
            name: "Introduction to Computer Science",
            credits: 9,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS102",
            name: "Introduction to Computer Science",
            credits: 10,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 11,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 12,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 13,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 14,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 15,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 16,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS104",
            name: "Introduction to Computer Science",
            credits: 17,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS103",
            name: "Introduction to Computer Science",
            credits: 18,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
        },
        {
            code: "CS102",
            name: "Introduction to Computer Science",
            credits: 19,
            professor: "Dr. John Doe",
            // Add your view and edit button functionality here
            viewButton: <button onClick={() => handleView(course)}>View</button>,
            editButton: <button onClick={() => handleEdit(course)}>Edit</button>,
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
    const handleClick = () => {
        setIsSaved(!isSaved);
    };

    return (
        <>
            <div className="py-8   mx-44 ">
                <div className="flex justify-center  h-[100px] items-center rounded-full bg-white flex-wrap gap-2 sm:gap-5 ">

                    <Dropdown
                        name="Program"
                        options={programs}
                        onSelect={setPrograms}
                    />
                    <Dropdown
                        name="Field Of Study"
                        options={fieldsOfStudy}
                        onSelect={setFieldsOfStudy}
                    />
                    <Dropdown
                        name="Semester"
                        options={semesters}
                        onSelect={setSemesters}
                    />
                    <div className="w-full md:w-[250px]">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Course"
                                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  pl-10"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="grid gap-4 w-1/2 m-3 overflow-y-auto">
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="max-md:flex-col flex  justify-between md:flex">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex max:md:text-sm text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <div className="flex items-right text-sm text-gray-500">{CourseDetails.course_code}</div>

                                </div>
                                <div className="flex mb-4">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className=" md:px-2">Save</div>
                                </div>
                            </div>
                            <div className=" max-md:flex-col  flex justify-between  whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.credits} Credits</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center">{CourseDetails.course_type}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>
                                <div className="flex md:px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                    <span className="text-center w-auto">{CourseDetails.course_professor}</span>
                                    <div className="w-auto h-auto flex-grow" /> {/* Empty div for spacing */}
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default CoursesCard;
