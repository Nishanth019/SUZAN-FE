"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import man from "../../../assets/Homepage/CourseSectionManImage.png";
import arrow from "../../../assets/Homepage/CoursesArrow.png"

const CoursesSection = ({ user }) => {
  const navigate = useRouter();

  return (
    <div
      className="flex flex-col pb-10 md:pt-10 w-full gap-5 items-center justify-center overflow-hidden"
    >
      <div className=" text-center  flex flex-col justify-center items-center text-[30px] md:text-[36px] lg:text-[42px] xl:text-[50px] font-bold max-lg:hidden ">
        <span>Go Through The Courses</span>
        <span>
          <Image
            src={arrow}
            className="w-[60%] m-auto sm:w-fit"
            alt=""
          />
        </span>
      </div>
      <div className=" lg:flex gap-24 items-center justify-center px-5">
        <div className="w-full relative">
          <div className="max-lg:hidden w-full h-full flex justify-center max-w-[430px] m-auto">
            <Image
              src={man}
              className="w-[90%] min-w-[430px] max-w-[430px]"
              alt=""
            />
          </div>
        </div>
        <div className="w-full flex flex-col max-lg:gap-10 lg:gap-6">
          <div className="flex flex-col gap-2">
          <div className="items-center  text-[30px] md:text-[36px] lg:text-[42px] xl:text-[50px] flex justify-center lg:justify-start gap-4 font-bold">
            <span className="primary-text-color">Course </span>
            <span className="secondary-text-color">Analysis</span>
          </div>
          <div className="text-[20px] md:text-[26px] text-center  lg:text-left font-bold">
          Discover more about your{" "}
            <span>
              <span className="primary-text-color">Courses</span>
            </span>{" "}
          </div>
          
          <div className="flex flex-col items-center justify-center"></div>
          <div className="flex flex-col text-[15px]  md:text-[18px]">
            <ul className=" text-left lg:text-left list-outside sm:list-inside lg:list-outside list-disc gap-2  flex flex-col px-8 max-lg:pl-[50px]">
              <li >Detailed Course Information</li>
              <li>Access to Previour Years Question paper</li>
              <li>Reference notes and links provided</li>
            </ul>
          </div>
          </div>
          <div className="text-center lg:text-left">
            <button
              onClick={(e) => {
              }}
              className="primary-bg-color text-white font-bold text-[16px] w-56  py-2 rounded-lg"
            >
              Open The Course-List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
