"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import studentImage from "../../../assets/Signup/student.png";
import adminImage from "../../../assets/Signup/admin.jpg";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <h1 className="mb-2 text-[32px] md:text-[40px] lg:text-[48px] xl:text-[48px] font-extrabold text-dark-grey-900 text-center">
        Sign Up
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-[150px] mt-6">
        <div className="highlight-on-hover ">
          <Link href="/student-registration">
            <div className="cursor-pointer flex flex-col items-center transition-transform duration-300 transform hover:scale-105 p-2 shadow-md rounded-xl">
              <Image
                src={studentImage}
                alt="Student"
                // width={220}
                // height={220}
                className="w-[150px] h-[150px] md:w-[250px] sm:h-[250px]"
              />
              <span className="text-center text-lg mt-2 font-semibold text-gray-700">
                Student
              </span>
            </div>
          </Link>
        </div>
        <div className="highlight-on-hover">
          <Link href="/admin-registration">
            <div className="cursor-pointer flex flex-col items-center transition-transform duration-300 transform hover:scale-105 p-2 shadow-md rounded-xl">
              <Image
                src={adminImage}
                alt="Admin"
                // width={250}
                // height={250}
                className="w-[150px] h-[150px] md:w-[250px] sm:h-[250px]"
              />
              <span className="text-center text-lg mt-2 font-semibold text-gray-700">
                Admin
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
