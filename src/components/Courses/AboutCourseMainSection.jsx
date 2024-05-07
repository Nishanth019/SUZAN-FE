import React from "react";
import Image from "next/image";
import { FaCalendar, FaBookOpen, FaUserCircle } from 'react-icons/fa';
import unknown from "../../assets/Course/unknown.jpg";

function AboutCourseMainSection({ courseDetails }) {
  const {
    courseName,
    courseCode,
    instructorName,
    credits,
    instructorPhoto,
    fieldOfStudy,
    courseType, 
    semester
  } = courseDetails;

  return (
      <div className=" flex max-md:flex-col items-center justify-center w-full md:px-5">
        <div className="flex w-full   md:w-[60%]    flex-col gap-2 px-10 py-5 sm:py-10 sm:px-16 md:px-5 md:py-5 lg:px-10 lg:py-10 xl:px-16 xl:py-12">
          <div className="space-y-4">
            <div className="pb-1 sm:pb-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl pb-1  md:pb-2">{courseName}</h1>     
              <p className="text-sm sm:text-lg text-gray-500">{courseCode}</p>
            </div>
            <div className="grid gap-2 sm:gap-5 sm:grid-cols-2">
              <div className="flex items-center space-x-2 text-sm">
                <FaCalendar className="w-4 h-4 flex-shrink-0 mr-1.5" />
                <span className="text-sm sm:text-[16px]">Course Type: {courseType}</span> 
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FaBookOpen className="w-4 h-4 flex-shrink-0 mr-1.5" />
                <span className="text-sm sm:text-[16px]">{credits} Credits</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2 sm:gap-5 sm:grid-cols-2 mt-1 sm:mt-2">
            <div className="flex items-center space-x-2 text-sm">
              <FaUserCircle className="w-4 h-4 flex-shrink-0 mr-1.5" />
              <span className="text-sm sm:text-[16px]">Field Of Study: {fieldOfStudy}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <FaCalendar className="w-4 h-4 flex-shrink-0 mr-1.5" />
              <span className="text-sm sm:text-[16px]">Semester: {semester} </span>
            </div>
          </div>
        </div>
        <div className=" w-full flex md:w-[40%]  items-center justify-center p-2">
        <div className="flex  flex-col gap-2 items-center justify-center p-5 ">
          <Image
            alt={unknown}
            className="rounded-full"
            height="150"
            src={instructorPhoto || unknown} 
            style={{
              aspectRatio: "150/150",
              objectFit: "cover",
            }}
            width="150"
          />
          <div className="flex flex-col items-start gap-1 ml-4">
            <h3 className="text-xl sm:text-2xl font-bold">{instructorName}</h3>
          </div>
        </div>
      </div>
      </div>
  );
}

export default AboutCourseMainSection;
