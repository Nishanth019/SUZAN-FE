'use client'
import React, { useState } from "react";
import { Tables } from "../../TailwindComponents/Table";


function CoursesTable({ courses, openViewModal, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  // Calculate the start and end index of courses to display based on the current page
  const startIndex = (currentPage - 1) * coursesPerPage;
  //Object.values(courses) returns an array of all courses or it converts the object to an array
  //in order to access by index or to calculate the length
  const endIndex = Math.min(startIndex + coursesPerPage, Object.values(courses).length);

  // Get the courses to display for the current page
  const currentCourses = Object.values(courses).slice(startIndex, endIndex);

  // Handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Tables
      currentCourses={currentCourses}
      currentPage={currentPage}
      totalCourses={Object.values(courses).length}
      handlePagination={handlePagination}
      openViewModal={openViewModal} // Pass openViewModal function
      handleEdit={handleEdit} // Pass handleEdit function
      handleDelete={handleDelete} // Pass handleDelete function
      courses={courses}
      coursesPerPage={coursesPerPage}
    />
  );
}

export default CoursesTable;
