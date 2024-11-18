"use client";

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
import { CircularProgress } from "@mui/material";
import { FcEmptyBattery } from "react-icons/fc";
import Pagination from "./Pagination";

const CoursesSection = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  useEffect(() => {
    // Fetch all programs on component mount
    async function fetchPrograms() {
      try {
        setLoading(true);
        const response = await CourseService.getAllPrograms();
        setPrograms(response.data.programs);
        setSelectedProgram("");
        setSelectedFieldOfStudy("");
        setSelectedSemester("");
        setFieldOfStudy([]);
        setSemesters([]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
        setLoading(true);
        const response = await CourseService.getAllFieldsOfStudy(programId);
        setFieldOfStudy(response.data.fieldsOfStudy);
        setSelectedFieldOfStudy("");
        setSelectedSemester("");
        setSemesters([]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
        setLoading(true);
        const response = await CourseService.getAllSemestersByFieldOfStudy({
          fieldOfStudyId,
        });
        setSemesters(response.data.semesters);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
        setLoading(true);
        const response = await CourseService.getAllCourses({
          programId: selectedProgram,
          fieldOfStudyId: selectedFieldOfStudy,
          semesterId: selectedSemester,
        });
        setCourses(response.data.courses);
        setLoading(false);
        setCurrentPage(1); // Reset to first page when filters change
      } catch (error) {
        setLoading(false);
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, [selectedProgram, selectedFieldOfStudy, selectedSemester]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const payload = {
        searchTerm: searchQuery,
        programId: selectedProgram,
        fieldOfStudyId: selectedFieldOfStudy,
        semesterId: selectedSemester,
      };
      const response = await CourseService.searchCourse(payload);
      setCourses(response.data.courses);
      setLoading(false);
      setCurrentPage(1); // Reset to first page when search results change
    } catch (error) {
      setLoading(false);
      console.error("Error searching courses:", error);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      handleSearch();
    }
  }, [searchQuery]);
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const response = await CourseService.getAllCourses({
          programId: selectedProgram,
          fieldOfStudyId: selectedFieldOfStudy,
          semesterId: selectedSemester,
        });
        setCourses(response.data.courses);
        setLoading(false);
        setCurrentPage(1); // Reset to first page when filters change
      } catch (error) {
        setLoading(false);
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, [searchQuery === ""]);

  // Calculate the start and end index of courses to display based on the current page
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = Math.min(startIndex + coursesPerPage, courses.length);

  // Get the courses to display for the current page
  const currentCourses = courses.slice(startIndex, endIndex);

  // Calculate the total number of pages based on the total number of courses and coursesPerPage
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="py-5 mx-4 sm:mx-2">
          <div className="md:py-5 md:px-10 md:mx-5 lg:mx-10 xl:mx-[100px] flex justify-center items-center rounded-full md:bg-white flex-wrap gap-2 md:gap-5">
            {/* Render dropdowns here */}
            <div className="flex flex-wrap gap-2 sm:gap-5">
              <Dropdown
                name="Program"
                value={selectedProgram} // This binds the value of the dropdown to the state
                options={programs?.map((program) => program?.program_name)}
                onSelect={(selectedProgramName) => {
                  const selectedProgram = programs?.find(
                    (program) => program?.program_name === selectedProgramName
                  );
                  setSelectedProgram(selectedProgram?._id);
                  setSelectedFieldOfStudy("");
                  setSelectedSemester("");
                }}
              />
              <Dropdown
                name="Field Of Study"
                value={selectedFieldOfStudy} // This binds the value of the dropdown to the state
                options={fieldOfStudy?.map(
                  (field) => field?.field_of_studyname
                )}
                onSelect={(selectedFieldOfStudyName) => {
                  const selectedFieldOfStudy = fieldOfStudy?.find(
                    (field) =>
                      field?.field_of_studyname === selectedFieldOfStudyName
                  );
                  setSelectedFieldOfStudy(selectedFieldOfStudy?._id);
                  setSelectedSemester("");
                }}
              />
              <Dropdown
                name="Semester"
                value={selectedSemester} // This binds the value of the dropdown to the state
                options={semesters?.map((semester) => semester?.semester)}
                onSelect={(selectedSemesterName) => {
                  const selectedSemester = semesters?.find(
                    (semester) => semester?.semester === selectedSemesterName
                  );
                  setSelectedSemester(selectedSemester?._id);
                }}
              />
              <div className="w-full md:w-[270px]">
                <form
                  className="max-w-md mx-auto"
                  onSubmit={(e) => e.preventDefault()} // Prevent default form submission
                >
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <FaSearch
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Prevent default form submission
                          handleSearch();
                        }
                      }}
                      className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Search Course"
                    />
                  </div>
                </form>
              </div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
        {/* Render courses using map */}
        <div className="flex justify-center">
          <div className="grid gap-4 w-full sm:w-4/5 lg:w-3/5 mx-3 my-5">
            {loading ? (
              <div className="flex justify-center items-center h-[50vh] md:h-[70vh]">
                <CircularProgress />
              </div>
            ) : (
              <>
                {courses.length === 0 ? (
                  <p className="text-center text-gray-700 text-xl md:text-2xl flex items-center justify-center h-[50vh]">
                    No courses available
                  </p>
                ) : (
                  currentCourses.map((course, index) => (
                    <CoursesCard key={index} course={course} />
                  ))
                )}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePagination}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesSection;
