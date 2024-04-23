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
      import { FaSearch, FaEye } from "react-icons/fa";
      import { MdEdit, MdDelete } from "react-icons/md";

      export function Tables({
        currentCourses,
        currentPage,
        totalPages,
        handlePagination,
        openViewModal,
        handleEdit, // Function to handle edit button click
        handleDelete // Function to handle delete button click
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
                    <p className="text-black font-semibold ">Delete</p>
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
                      {/* Edit Button */}
                      <Button onClick={openViewModal}>
                        <FaEye size={20} className="lg:ml-6" />
                      </Button>
                    </TableCell>
                    <TableCell className="lg:ml-2">
                      {/* Edit Button */}
                      <Button onClick={() => handleEdit(course)}>
                        <MdEdit size={20} className="lg:ml-6" />
                      </Button>
                    </TableCell>
                    <TableCell className="items-center">
                      {/* Delete Button */}
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
            count={totalPages * currentCourses.length}
            page={currentPage}
            onPageChange={(event, newPage) => handlePagination(newPage)}
            rowsPerPage={currentCourses.length}
            rowsPerPageOptions={[]}
          />
        </Paper>
        );
      }
