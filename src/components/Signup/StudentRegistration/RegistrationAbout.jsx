"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import collegeService from "@/services/college.service";
import { useGlobalContext } from "@/context/AuthContext";

const RegistrationAbout = ({ details, setDetails, onCheckboxChange }) => {
  const router = useRouter();
    const { isAuth } = useGlobalContext();

    if (isAuth) {
      router.push("/");
    }
  const pathname = usePathname();
  const email_id = pathname.split("/").pop();
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    onCheckboxChange(e.target.checked); // Notify parent component about checkbox change
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await userService.getUserById(email_id);
        if (data && data.user) {
          const { college } = data.user;
          const data1 = await collegeService.getCollegeById(college);
          const college_name = data1.data.college.college_name;
          console.log(college_name);
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
  console.log(69, details.college_name);

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex  flex-col items-center gap-4 w-full mt-4">
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">College Name</h1>
            <input
              type="text"
              placeholder="Enter your college Name"
              name="college_name"
              value={details.college_name}
              onChange={handleChange}
              disabled
              className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Program</h1>
            <input
              type="text"
              placeholder="Enter your Program"
              name="program"
              value={details.program}
              onChange={handleChange}
              className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Branch/Discipline</h1>
            <input
              type="text"
              placeholder="Enter your Branch"
              name="branch"
              value={details.branch}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Roll No</h1>
            <input
              type="text"
              name="roll_no"
              placeholder="Enter Your college Roll Number"
              value={details.roll_no}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Batch</h1>
            <input
              type="text"
              name="batch"
              placeholder="Enter Your Batch"
              value={details.batch}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>

        <div className="flex  justify-start items-center text-center gap-4">
          <input
            type="checkbox"
            id="terms-condition"
            name="termsAndConditions"
            onChange={handleCheckboxChange}
            className="w-[18px] h-[18px] mt-6 mb-6"
          />
          <p className=" text-[14px]">
            I agree to{" "}
            <Link
              href="/terms"
              className="text-bold text-green-600 cursor-pointer"
            >
              Terms & Conditions
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationAbout;
