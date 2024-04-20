import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export function Tables({
  currentCourses,
  currentPage,
  totalPages,
  handlePagination,
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
              <TableRow key={course.code}>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.professor}</TableCell>
                <TableCell>{course.viewButton} </TableCell>
                <TableCell className="lg:ml-2">{course.editButton} </TableCell>
                <TableCell className="items-center">
                  {course.deleteButton}{" "}
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
