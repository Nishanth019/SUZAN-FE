'use client'

import React, { useEffect, useState } from "react";
import Input from "../Generals/Input";
import { useRouter } from "next/navigation";
import UserService from "@/services/user.service";
import collegeService from "@/services/college.service";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import CoursesCard from "./CoursesCard";
import Dropdown from "../TailwindComponents/Dropdown";
import { FaSearch } from "react-icons/fa";
import CourseService from "@/services/course.service.js";

const CoursesSection = () => {
  const router = useRouter();

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

  useEffect(() => {
    // Fetch all programs on component mount
    async function fetchPrograms() {
      try {
        const response = await CourseService.getAllPrograms();
        setPrograms(response.data.programs);
        setSelectedProgram("");
        setSelectedFieldOfStudy("");
        setSelectedSemester("");
        setFieldOfStudy([]);
        setSemesters([]);
        // setSelectedProgram(response.data.programs[0]?._id);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    }
    setSelectedProgram("");
    setSelectedFieldOfStudy("");
    setSelectedSemester("");
    setFieldOfStudy([]);
    setSemesters([]);
    fetchPrograms();
  }, []);

  useEffect(() => {
    // Fetch fields of study when program selected
    async function fetchFieldsOfStudy(programId) {
      try {
        const response = await CourseService.getAllFieldsOfStudy(programId);
        setFieldOfStudy(response.data.fieldsOfStudy);
        setSelectedFieldOfStudy("");
        setSelectedSemester("");
        setSemesters([]);
        // setSelectedFieldOfStudy(response.data.fieldsOfStudy[0]?._id);
      } catch (error) {
        console.error("Error fetching fields of study:", error);
      }
    }
    if (selectedProgram) {
      setSelectedFieldOfStudy("");
      setSelectedSemester("");
      setSemesters([]);
      fetchFieldsOfStudy(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    // Fetch semesters when field of study selected
    async function fetchSemesters(fieldOfStudyId) {
      try {
        const response = await CourseService.getAllSemestersByFieldOfStudy({ fieldOfStudyId });
        console.log(12345, response.data)
        setSemesters(response.data.semesters);
        // setSelectedSemester(response.data.semesters[0]?._id);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    }
    if (selectedFieldOfStudy) {
      setSelectedSemester("");
      fetchSemesters(selectedFieldOfStudy);
    }
  }, [selectedFieldOfStudy]);

  useEffect(() => {
    // Fetch courses when program, field of study, or semester selected
    async function fetchCourses() {
      try {
        console.log(1223456)
        const response = await CourseService.getAllCourses({ programId: selectedProgram, fieldOfStudyId: selectedFieldOfStudy, semesterId: selectedSemester });
        console.log(5, response.data);
        console.log(1223455)
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, [selectedProgram, selectedFieldOfStudy, selectedSemester]);

  const handleSearch = async (value) => {
    try {
      // console.log("sully")
      const response = await CourseService.searchCourse(value);
      // console.log("sully",response.data)
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="py-5 mx-4 sm:mx-2">
          <div className="md:py-5 md:px-10 md:mx-5 lg:mx-10 xl:mx-[100px] flex justify-center items-center rounded-full md:bg-white flex-wrap gap-2 md:gap-5">
            {/* Render dropdowns here */}
            <div className="flex flex-wrap gap-2 sm:gap-5 ">
              <Dropdown
                name="Program"
                value={selectedProgram}
                options={programs?.map((program) => program?.program_name)}
                onSelect={(selectedProgramName) => {
                  const selectedProgram = programs?.find(
                    (program) => program?.program_name === selectedProgramName
                  );
                  setSelectedProgram(selectedProgram?._id);
                  setSelectedFieldOfStudy("")
                  setSelectedSemester("")
                }}
              />
              <Dropdown
                name="Field Of Study"
                value={selectedFieldOfStudy}
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
                value={selectedSemester}
                options={semesters?.map((semester) => semester?.semester)}
                onSelect={(selectedSemesterName) => {
                  const selectedSemester = semesters?.find(
                    (semester) => semester?.semester === selectedSemesterName
                  );
                  setSelectedSemester(selectedSemester?._id);
                }}
              />
              <div className="w-full md:w-[270px]">
                <form className="max-w-md mx-auto" onChange={(e) => { handleSearch(e.target.value); }}>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <FaSearch className="w-4 h-4 text-gray-500 " aria-hidden="true" />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)

                      }
                      className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                      placeholder="Search Course"
                    />
                    {/* <button type="submit" className="text-white absolute end-1 bottom-1 bg-blue-500 hover:bg-blue-600   font-medium rounded-lg text-sm px-4 py-2 ">Search</button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Render courses using map */}
        <div className="flex justify-center">
          <div className="grid gap-4 w-full sm:w-4/5 lg:w-3/5 mx-3 my-5 ">
            {courses.map((course, index) => (
              <CoursesCard key={index} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesSection;
