"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import collegeService from "@/services/college.service";
import CourseService from "@/services/course.service.js";
import { useGlobalContext } from "@/context/AuthContext";
import FormDropdown from "../../TailwindComponents/FormDropdown";

const RegistrationAbout = ({ details, setDetails, onCheckboxChange, errors }) => {
  const router = useRouter();
  const { isAuth } = useGlobalContext();
  if (isAuth) {
    router.push("/");
  }

  const pathname = usePathname();
  const email_id = pathname.split("/").pop();
  const [programs, setPrograms] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);

  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [batchOptions, setBatchOptions] = useState([]);


  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    onCheckboxChange(e.target.checked);
  };

  // Fetch programs on component mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        console.log(111111)
        const { data } = await userService.getUserById(email_id);
        console.log(22222)
        if (data && data.user) {
          console.log(123456789)
          const { college } = data.user;
        const response = await CourseService.getAllProgramsByCollegeId(college);
        console.log(123,response.data.programs);
        setPrograms(response.data.programs);
        setSelectedProgram("");
        setSelectedFieldOfStudy("");
        setFieldOfStudy([]);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // Fetch fields of study when a program is selected
  useEffect(() => {
    const fetchFieldsOfStudy = async (programId) => {
      try {
        console.log(444,programId);
        const response = await CourseService.getAllFieldsOfStudy(programId);
        setFieldOfStudy(response.data.fieldsOfStudy);
        setSelectedFieldOfStudy("");
      } catch (error) {
        console.error("Error fetching fields of study:", error);
      }
    };

    if (selectedProgram) {
      fetchFieldsOfStudy(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await userService.getUserById(email_id);
        if (data && data.user) {
          const { college } = data.user;
          const data1 = await collegeService.getCollegeById(college);
          const college_name = data1.data.college.college_name;
          setDetails((prevDetails) => ({
            ...prevDetails,
            college_name,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);

  // Generate batch options for current year to last 5 years
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i); // 6 years including the current year
    setBatchOptions(years);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4 w-full mt-4">
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">College Name</h1>
            <input
            disabled
              type="text"
              placeholder="Enter your college Name"
              name="college_name"
              value={details.college_name}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.college_name ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.college_name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Program</h1>
            <FormDropdown
              name="Program"
              value={selectedProgram}
              options={programs?.map((program) => program?.program_name)}
              onSelect={(selectedProgramName) => {
                const selectedProgram = programs?.find(
                  (program) => program?.program_name === selectedProgramName
                );
                setSelectedProgram(selectedProgram?._id);
                setDetails({ ...details, program: selectedProgramName, branch: "" });
              }}
            />
            <p className="text-xs text-red-500 m-1">{errors.program}</p>
          </div>

          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Branch/Discipline</h1>
            <FormDropdown
              name="Field Of Study"
              value={selectedFieldOfStudy}
              options={fieldOfStudy?.map((field) => field?.field_of_studyname)}
              onSelect={(selectedFieldOfStudyName) => {
                const selectedField = fieldOfStudy?.find(
                  (field) => field?.field_of_studyname === selectedFieldOfStudyName
                );
                setSelectedFieldOfStudy(selectedField?._id);
                setDetails({ ...details, branch: selectedFieldOfStudyName });
              }}
            />
            <p className="text-xs text-red-500 m-1">{errors.branch}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">

          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Batch</h1>
            <FormDropdown
              name="batch"
              value={details.batch}
              options={batchOptions}
              onSelect={(selectedBatch) => setDetails({ ...details, batch: selectedBatch })}
            />
            <p className="text-xs text-red-500 m-1">{errors.batch}</p>
          </div>

          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Roll No</h1>
            <input
              type="text"
              name="roll_no"
              placeholder="Enter Your college Roll Number"
              value={details.roll_no}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.roll_no ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.roll_no}</p>
          </div>

        </div>

        <div className="flex justify-start items-center text-center gap-4">
          <input
            type="checkbox"
            id="terms-condition"
            name="termsAndConditions"
            onChange={handleCheckboxChange}
            className="w-[18px] h-[18px] mt-6 mb-6"
          />
          <p className="text-[14px]">
            I agree to{" "}
            <Link href="/terms-and-conditions" className="text-bold text-green-600 cursor-pointer">
              Terms & Conditions
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationAbout;
