'use client'
import React, { useState } from "react";
import { Tables } from "../../TailwindComponents/Table";

function CoursesTable({ courses, openViewModal, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  // Calculate the start and end index of courses to display based on the current page
  const startIndex = (currentPage - 1) * coursesPerPage;
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
      openViewModal={openViewModal}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      coursesPerPage={coursesPerPage}
    />
  );
}

export default CoursesTable;
