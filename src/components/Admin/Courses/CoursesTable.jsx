'use client'
import React, { useState } from "react";
import { Tables } from "../../TailwindComponents/Table";


function CoursesTable({ courses, openViewModal, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const totalCourses = Object.values(courses).length;
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = Math.min(startIndex + coursesPerPage, totalCourses);

  const currentCourses = Object.values(courses).slice(startIndex, endIndex);

  const handlePagination = (pageNumber) => {
    // Ensure the currentPage stays within the valid range
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  return (
    <Tables
      currentCourses={currentCourses}
      currentPage={currentPage}
      totalPages={totalPages} // Pass totalPages to Tables for any additional handling
      handlePagination={handlePagination}
      openViewModal={openViewModal}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      courses={courses}
      coursesPerPage={coursesPerPage}
    />
  );
}


export default CoursesTable;
