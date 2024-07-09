import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

export function Tables({
  currentCourses,
  currentPage,
  totalCourses,
  handlePagination,
  openViewModal,
  handleEdit,
  handleDelete,
  coursesPerPage
}) {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-[#f5f5f5]">
              <TableCell>
                <p className="text-black font-semibold">Course Code</p>
              </TableCell>
              <TableCell>
                <p className="text-black font-semibold">Course Name</p>
              </TableCell>
              <TableCell>
                <p className="text-black font-semibold">Credits</p>
              </TableCell>
              <TableCell>
                <p className="text-black font-semibold">Professor</p>
              </TableCell>
              <TableCell>
                <p className="text-black font-semibold text-center">View</p>
              </TableCell>
              <TableCell>
                <p className="text-black font-semibold text-center">Edit</p>
              </TableCell>
              <TableCell>
                <p className="text-black font-semibold">Delete</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCourses.map((course) => (
              <TableRow key={course.course_code}>
                <TableCell>{course.course_code}</TableCell>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.instructor_name}</TableCell>
                <TableCell>
                  <Button onClick={() => openViewModal(course)}>
                    <FaEye size={20} className="lg:ml-6" />
                  </Button>
                </TableCell>
                <TableCell className="lg:ml-2">
                  <Button onClick={() => handleEdit(course)}>
                    <MdEdit size={20} className="lg:ml-6" />
                  </Button>
                </TableCell>
                <TableCell className="items-center">
                  <Button onClick={() => handleDelete(course)}>
                    <MdDelete size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCourses}
        page={currentPage - 1}
        onPageChange={(event, newPage) => handlePagination(newPage + 1)}
        rowsPerPage={coursesPerPage}
        rowsPerPageOptions={[coursesPerPage]}
      />
    </Paper>
  );
}
