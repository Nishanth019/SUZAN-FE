import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the visible page range
  const visiblePages = 3;  // Number of pages to show at a time
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2));

  // Adjust the range if it's too close to the beginning or end
  if (currentPage <= Math.floor(visiblePages / 2)) {
    endPage = Math.min(visiblePages, totalPages);
  }
  if (currentPage > totalPages - Math.floor(visiblePages / 2)) {
    startPage = Math.max(totalPages - visiblePages + 1, 1);
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded max-sm:hidden"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded"
      >
        Prev
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-1 mx-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded"
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded max-sm:hidden"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
