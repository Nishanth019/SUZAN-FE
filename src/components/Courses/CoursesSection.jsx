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

const CoursesSection = () => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [programs, setPrograms] = useState([]);
  const [field, setField] = useState([]);
  const [selectedField, setSelectedField] = useState([]);
  const [courses, setCourses] = useState([]); // State to store courses

  /*const [semesters, setSemesters] = useState([]);*/

  const fieldsOfStudy = ["CSE", "ECE"];
  const semesters = ["1", "2", "3", "4", "5"];

  // const [CourseDetails, setCourseDetails] = useState({
  //   course_name: "",
  //   course_code: "",
  //   credits: "",
  //   course_type: "",
  //   course_professor: "",
  //   semester: "",
  //   fieldsOfStudy: "",
  //   program: "",
  //   college: "",
  // });

  // const dummyData = {
  //   course_name: "Advanced Scientific Numerical Methods",
  //   course_code: "OE3N35",
  //   credits: 3,
  //   course_type: "Elective",
  //   course_professor: "L.K.Balyan",
  //   semester: "7",
  //   fieldsOfStudy: ["CSE", "ECE"],
  //   program: ["BTECH", "Bdes", "Bcom"],
  //   college: "IIITDMJ",
  // };

  // useEffect(() => {
  //   setCourseDetails(dummyData);
  // }, []);

  useEffect(() => {
    CourseService.getAllPrograms()
      .then((response) => {
        console.log(response.data.programs);
        setPrograms(response.data.programs);
      })
      .catch((error) => {
        console.error("Error fetching programs:", error);
      });

    // setCourseDetails(dummyData);
  }, []);

  useEffect(() => {
    console.log(selectedProgram);
    CourseService.getAllFieldsOfStudy(selectedProgram)
      .then((responce) => {
        console.log(responce.data.fieldsOfStudy);
        setField(responce.data.fieldsOfStudy);
      })
      .catch((error) => {
        console.error("Error fetching programs:", error);
      });
  }, [selectedProgram]);

  useEffect(() => {
    if (selectedField) {
      CourseService.getFieldOfStudyById(selectedField)
        .then((response) => {
          const fieldOfStudyData = response.data;
          const semesterPromises = fieldOfStudyData.map((field) =>
            CourseService.getSemesterById(field._id)
          );

          Promise.all(semesterPromises)
            .then((semesterResponses) => {
              const semestersData = semesterResponses.map(
                (response) => response.data
              );
              console.log(semestersData);
              setSemesters(semestersData);
            })
            .catch((error) => {
              console.error("Error fetching semesters:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching field of study:", error);
        });

      console.log(semesters);
    }
  }, [selectedField]);

    // Fetch semesters and courses when field of study is selected
    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(7654321);
          if (selectedField && selectedSemester) {
            console.log(123456, selectedProgram, selectedField);
            const response = await CourseService.getAllSpecificCourses({
              programId: selectedProgram,
              fieldOfStudyId: selectedField,
              semesterId: "661172dc38915bb3e613cc1a"
            });
            console.log(1234, response);
            // setCourses(response.data.courses);
          }
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
    
      fetchData();
    }, [selectedField, selectedSemester]);
    
  



  // // Dummy courses data
  // const courses = [
  //   {
  //     code: "CS101",
  //     name: "Introduction to Computer Science",
  //     credits: 1,
  //     professor: "Dr. John Doe",
  //     type: "Theory",
  //   },
  //   {
  //     code: "CS102",
  //     name: "Data Structures and Algorithms",
  //     credits: 3,
  //     professor: "Dr. Jane Smith",
  //     type: "Practical",
  //   },
  //   // Add more course objects as needed
  // ];

  return (
    <>
      <div className="bg-gray-100">
        <div className="py-5 mx-4 sm:mx-2">
          <div className="md:py-5 md:px-10 md:mx-5 lg:mx-10 xl:mx-[100px] flex justify-center items-center rounded-full md:bg-white flex-wrap gap-2 md:gap-5">
            {/* Render dropdowns here */}
            <div className="flex flex-wrap gap-2 sm:gap-5 ">
              <Dropdown
                name="Program"
                options={programs.map((program) => program.program_name)}
                onSelect={(selectedProgramName) => {
                  const selectedProgram = programs.find(
                    (program) => program.program_name === selectedProgramName
                  );
                  setSelectedProgram(selectedProgram?._id);
                }}
              />
              <Dropdown
                name="Field Of Study"
                options={field.map((program) => program.field_of_studyname)}
                onSelect={(selectedFieldOfStudy) => {
                  const fieldObject = field.find(
                    (program) =>
                      program.field_of_studyname === selectedFieldOfStudy
                  );
                  setSelectedField(fieldObject?._id);
                }}
              />

              <Dropdown
                name="Semester"
                options={semesters}
                onSelect={setSelectedSemester}
              />
              <div className="w-full md:w-[250px]">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Program"
                    className=" bg-transparent w-full py-2 px-3 border border-gray-300  rounded-md shadow-sm  pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Render courses using map */}
        <div className="flex justify-center">
          <div className="grid gap-4 w-full sm:w-4/5 lg:w-3/5 mx-3 my-5 overflow-y-auto">
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
