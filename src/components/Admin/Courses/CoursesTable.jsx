'use client'
import React, { useState } from "react";
import { Tables } from "../../TailwindComponents/Table";

function CoursesTable({ courses, openViewModal, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5; // Number of courses to display per page

  // Calculate the start and end index of courses to display based on the current page
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = Math.min(startIndex + coursesPerPage, Object.values(courses).length);

  // Get the courses to display for the current page
  const currentCourses = Object.values(courses).slice(startIndex, endIndex);

  // Calculate the total number of pages based on the total number of courses and coursesPerPage
  const totalPages = Math.ceil(Object.values(courses).length / coursesPerPage);

  // Handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Tables
      currentCourses={currentCourses}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePagination={handlePagination}
      openViewModal={openViewModal} // Pass openViewModal function
      handleEdit={handleEdit} // Pass handleEdit function
      handleDelete={handleDelete} // Pass handleDelete function
    />
  );
}

export default CoursesTable;
