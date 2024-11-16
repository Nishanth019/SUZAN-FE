"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import studentImage from "../../../assets/Signup/student.png";
import adminImage from "../../../assets/Signup/admin.png";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const SignUp = () => {

    const router = useRouter();

    const { isAuth} = useGlobalContext();

      if (isAuth) {
        router.push("/");
      }
  
  return (
    <div className="h-screen flex flex-col p-10 px-5 ">
      <div className=" flex flex-col mb-5  p-10 px-5 ">
        <h1 className="mb-2 text-[32px] md:text-[40px] lg:text-[48px] xl:text-[48px] font-extrabold text-dark-grey-900 text-center">
          Sign Up
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-[150px] mt-6">
          <div className="highlight-on-hover">
            <Link href="/signup/student">
              <div className="cursor-pointer flex flex-col items-center transition-transform duration-300 transform hover:scale-105 p-2 shadow-md">
                <Image
                  src={studentImage}
                  alt="Student"
                  className="w-[150px] h-[150px] md:w-[250px] sm:h-[250px]"
                />
                <span className="text-center text-lg mt-2 font-semibold text-gray-700">
                  Student
                </span>
              </div>
            </Link>
          </div>
          <div className="highlight-on-hover">
            <Link href="/signup/admin">
              <div className="cursor-pointer flex flex-col items-center transition-transform duration-300 transform hover:scale-105 p-2 shadow-md">
                <Image
                  src={adminImage}
                  alt="Admin"
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

    </div>
  );
};

export default SignUp;
