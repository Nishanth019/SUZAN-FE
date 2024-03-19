"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import nishanth from "../../assets/CoreTeam/nishanth.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const AboutCourse = () => {
  // Define state object to store course details
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Set breakpoint for small screens
    };

    handleResize(); // Call on initial render

    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);
  const [courseDetails] = useState({
    courseName: "Fibre Optics",
    courseCode: "OE3E30",
    instructorName: "Dinesh Kumar",
    courseType: "Elective",
    credits: 3,
    instructorPhoto: nishanth,
    fieldOfStudy: "CSE",
  });

  // Destructure state object for easier access
  const {
    courseName,
    courseCode,
    instructorName,
    courseType,
    credits,
    instructorPhoto,
    fieldOfStudy,
  } = courseDetails;

  // Return JSX representing the component
  return (
    <div className="w-full py-12 px-5 lg:px-[230px] lg:py-16 ">
      <div className="container grid items-start px-4 py-6  gap-10  lg:items-start lg:gap-16 lg:px-[130px] lg:py-12 border-2 border-gray-200 shadow-lg">
        <div className="grid gap-4 lg:items-center md:grid-cols-2">
          <div className="flex items-start gap-6 md:gap-10">
            <div className="grid gap-2  items-center">
              <div className=" items-center gap-4">
                <h1 className="text-2xl lg:text-4xl font-bold">{courseName}</h1>
                <span className="text-lg lg:text-xl font-medium text-gray-500 dark:text-gray-400">
                  {courseCode}
                </span>
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <div className="grid gap-2">
                  <div className="text-md lg:text-lg font-medium">
                    Course Type : {courseType}
                  </div>
                  <div className="text-md lg:text-lg font-medium">
                    Credits : {credits}
                  </div>
                  <div className="text-md lg:text-lg font-medium">
                    Discipline: {fieldOfStudy}
                  </div>
                  <div className="text-md lg:text-lg font-medium">
                    Semester : 6
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4  lg:justify-end">
            <div className="rounded-lg overflow-hidden border">
              <Image
                alt="Instructor Photo"
                height={isSmallScreen ? "150" : "250"} // Adjust height for small screens
                src={nishanth}
                style={{
                  // aspectRatio: "150/200",
                  objectFit: "cover",
                }}
                width={isSmallScreen ? "150" : "250"} // Adjust width for small screens
              />
              <h2 className="text-lg font-semibold">{instructorName}</h2>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <h3 className="text-2xl lg:text-3xl font-semibold">Syllabus</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <h4 className="text-base font-semibold">
                Week 1: Introduction to Psychology
              </h4>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white sm:px-4 sm:py-2 sm:text-base"
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-base"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <h3 className="text-2xl lg:text-3xl  font-semibold">References</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Link
                href="https://www.youtube.com/watch?v=VIDEO_ID"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Introduction to Psychology
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.youtube.com/watch?v=VIDEO_ID"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Research Methods
              </Link>
            </div>
            {/* Add more references as needed */}
          </div>
        </div>
        <div className="grid gap-4">
          <h3 className="text-2xl lg:text-3xl  font-semibold">
            Previous Year Papers
          </h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Link
                href="link_to_previous_year_paper_1.pdf"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Previous Year Paper 1
              </Link>

              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white sm:px-4 sm:py-2 sm:text-base"
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-base"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Link
                href="link_to_previous_year_paper_1.pdf"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Previous Year Paper 2
              </Link>

              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white sm:px-4 sm:py-2 sm:text-base"
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-base"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <h3 className="text-2xl lg:text-3xl  font-semibold">Notes</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Link
                href="link_to_previous_year_paper_1.pdf"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notes 1
              </Link>

              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white sm:px-4 sm:py-2 sm:text-base"
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-base"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Link
                href="link_to_previous_year_paper_1.pdf"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notes 2
              </Link>

              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white sm:px-4 sm:py-2 sm:text-base"
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-base"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCourse;
