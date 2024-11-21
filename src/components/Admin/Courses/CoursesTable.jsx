import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from "@mui/material/Button";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable({
  courses,
  openViewModal,
  handleEdit,
  handleDelete,
}) {
  const [page, setPage] = useState(0);

  // Convert courses object to an array if needed
  const rows = Object.values(courses);

  // Hardcode rowsPerPage to 5
  const rowsPerPage = 5;

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead sx={{ backgroundColor: "grey.200" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "grey.900" }}>
              Course Code
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "grey.900" }}>
              Course Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "grey.900" }}>
              Credits
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "grey.900" }}
              align="center"
            >
              View
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "grey.900" }}
              align="center"
            >
              Edit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "grey.1200" }}
              
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((course) => (
              <TableRow key={course.course_code}>
                <TableCell>{course.course_code}</TableCell>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                {/* <TableCell>{course.instructor_name}</TableCell> */}
                <TableCell>
                  {/* Edit Button */}
                  <Button onClick={() => openViewModal(course)}>
                    <FaEye size={20} className="lg:ml-32" />
                  </Button>
                </TableCell>
                <TableCell className="lg:ml-2">
                  {/* Edit Button */}
                  <Button onClick={() => handleEdit(course)}>
                    <MdEdit size={20} className="lg:ml-16" />
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
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
              rowsPerPageOptions={[]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
