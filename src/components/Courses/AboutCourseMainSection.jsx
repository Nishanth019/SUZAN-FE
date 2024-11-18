import React from "react";
import { FaCalendar, FaBookOpen, FaUserCircle } from "react-icons/fa";

function AboutCourseMainSection({ courseDetails }) {
  const {
    courseName,
    courseCode,
    credits,
    fieldOfStudy,
    courseType,
    semester,
  } = courseDetails;

  return (
    <div className="flex w-full flex-col md:flex-row items-start md:items-center justify-between pb-2 pt-5 md:py-16 lg:py-14 my-5 md:my-10 px-5 md:px-10 lg:px-20 xl:px-24 ">
      {/* Left side: Course Name and Code */}
      <div className="flex flex-col sm:gap-2 w-full md:w-1/2 px-2 md:px-5">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl pb-1 md:pb-2">
          {courseName}
        </h1>
        <p className="text-sm sm:text-lg lg:text-xl text-gray-700">{courseCode}</p>
      </div>

      {/* Right side: Course Details */}
      <div className="flex flex-col w-full md:w-1/2 px-2 md:px-5 space-y-4 mt-4 md:mt-0">
        <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {/* Course Type */}
          <div className="flex items-center space-x-2 text-sm">
            <FaCalendar className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mr-1.5" />
            <span className="text-sm text-gray-700 sm:text-[16px] lg:text-[20px]">
              <span className="font-bold text-gray-800">Course Type:</span> {courseType}
            </span>
          </div>

          {/* Credits */}
          <div className="flex items-center space-x-2 text-sm">
            <FaBookOpen className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mr-1.5" />
            <span className="text-sm text-gray-700 sm:text-[16px] lg:text-[18px]">
              <span className="font-bold ">Credits:</span> {credits}
            </span>
          </div>

          {/* Semester */}
          <div className="flex items-center space-x-2 text-sm">
            <FaCalendar className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mr-1.5" />
            <span className="text-sm text-gray-700 sm:text-[16px] lg:text-[18px]">
              <span className="font-bold text-gray-800">Semester:</span> {semester}
            </span>
          </div>

          {/* Field of Study */}
          <div className="flex items-center space-x-2 text-sm">
            <FaUserCircle className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mr-1.5" />
            <span className="text-sm text-gray-700 sm:text-[16px] lg:text-[18px]">
              <span className="font-bold text-gray-800">Field Of Study:</span> {fieldOfStudy}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCourseMainSection;
