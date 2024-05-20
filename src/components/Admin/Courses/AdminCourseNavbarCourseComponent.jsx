"use client";
import Dropdown from "@/components/TailwindComponents/Dropdown";
import { FaSearch, FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import React, { useState, useEffect } from "react";
import CoursesTable from "./CoursesTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropdown2 from "@/components/TailwindComponents/FormDropdown";
import DeleteIcon from "@mui/icons-material/Delete";
import CourseService from "@/services/course.service.js";
import { IoMdEye, IoMdDownload } from 'react-icons/io';
import { FaLink, FaFilePdf } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import ViewPdf from "../../Courses/ViewPdf";
import "../../Courses/style.css";
import { ToastContainer, toast } from "react-toastify";

//react pdf
const workerSrc = require("pdfjs-dist/build/pdf.worker.min.js");
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const AdminCourseNavbarCourseComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false); // State to control modal visibility
  const [selectedPdf, setSelectedPdf] = useState(null);
  // Dropdown selected useStates
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Selected object values
  const [programs, setPrograms] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);

  //deleting course id
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  //Single Course
  const [singleCourse, setSingleCourse] = useState(null);

  //form Dropdown useStates
  const [formSelectedProgram, setFormSelectedProgram] = useState("");
  const [formSelectedFieldOfStudy, setFormSelectedFieldOfStudy] = useState("");
  const [formSelectedSemester, setFormSelectedSemester] = useState("");

  //Form course Input useStates
  const [course_name, setCourse_name] = useState("");
  const [course_code, setCourse_code] = useState("");
  const [course_type, setCourse_type] = useState("");
  const [credits, setCredits] = useState(0);
  const [instructor_name, setInstructor_name] = useState("");
  const [instructor_photo, setInstructor_photo] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [resource_links, setResources_link] = useState([{ link_name: "", link_url: "" }]);
  const [resource_pdfs, setResources_pdf] = useState([{ pdf_name: "", pdf_url: "" }]);
  const [pyq_links, setPyq_link] = useState([{ link_name: "", link_url: "" }]);
  const [pyq_pdfs, setPyq_pdf] = useState([{ pdf_name: "", pdf_url: "" }]);

  // Updated course input useStates
  const [editCourseCode, setEditCourseCode] = useState("");
  const [updatedProgram, setUpdatedProgram] = useState("");
  const [updatedFieldOfStudy, setUpdatedFieldOfStudy] = useState("");
  const [updatedSemester, setUpdatedSemester] = useState("");
  const [updatedCourse_name, setUpdatedCourse_name] = useState("");
  const [updatedCourse_code, setUpdatedCourse_code] = useState("");
  const [updatedCourse_type, setUpdatedCourse_type] = useState("");
  const [updatedCredits, setUpdatedCredits] = useState(0);
  const [updatedInstructor_name, setUpdatedInstructor_name] = useState("");
  const [updatedInstructor_photo, setUpdatedInstructor_photo] = useState("");
  const [updatedSyllabus, setUpdatedSyllabus] = useState("");
  const [updatedResource_links, setUpdatedResource_links] = useState([{ link_name: "", link_url: "" }]);
  const [updatedResource_pdfs, setUpdatedResource_pdfs] = useState([{ pdf_name: "", pdf_url: "" }]);
  const [updatedPyq_links, setUpdatedPyq_links] = useState([{ link_name: "", link_url: "" }]);
  const [updatedPyq_pdfs, setUpdatedPyq_pdfs] = useState([{ pdf_name: "", pdf_url: "" }]);

  //editform useStates
  const [editFormResourceLinkName, setEditFormResourceLinkName] = useState("")
  const [editFormResourceLinkUrl, setEditFormResourceLinkUrl] = useState("")
  const [editFormResourcePdfName, setEditFormResourcePdfName] = useState("")
  const [editFormResourcePdfUrl, setEditFormResourcePdfUrl] = useState("")
  const [editFormPyqLinkName, setEditFormPyqLinkName] = useState("")
  const [editFormPyqLinkUrl, setEditFormPyqLinkUrl] = useState("")
  const [editFormPyqPdfName, setEditFormPyqPdfName] = useState("")
  const [editFormPyqPdfUrl, setEditFormPyqPdfUrl] = useState("")


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  const handleViewPdf = (pdf) => {
    setSelectedPdf(pdf);
    setPdfModalOpen(true);
  };
  const closePdfModal = () => {
    setPdfModalOpen(false);
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    // Fetch all programs on component mount
    async function fetchPrograms() {
      try {
        const response = await CourseService.getAllPrograms();
        setPrograms(response.data.programs);
        // setSelectedProgram(response.data.programs[0]?._id);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    }
    fetchPrograms();
  }, []);

  useEffect(() => {
    // Fetch fields of study when program selected
    async function fetchFieldsOfStudy(programId) {
      try {
        const response = await CourseService.getAllFieldsOfStudy(programId);
        setFieldOfStudy(response.data.fieldsOfStudy);
        // setSelectedFieldOfStudy(response.data.fieldsOfStudy[0]?._id);
      } catch (error) {
        console.error("Error fetching fields of study:", error);
      }
    }
    if (selectedProgram) {
      fetchFieldsOfStudy(selectedProgram);
    }
    else if (formSelectedProgram) {
      fetchFieldsOfStudy(formSelectedProgram);
    }
  }, [formSelectedProgram, selectedProgram]);

  useEffect(() => {
    // Fetch semesters when field of study selected
    async function fetchSemesters(fieldOfStudyId) {
      try {
        const response = await CourseService.getAllSemestersByFieldOfStudy({ fieldOfStudyId });
        console.log(12345, response.data)
        setSemesters(response.data.semesters);
        // setSelectedSemester(response.data.semesters[0]?._id);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    }
    if (selectedFieldOfStudy) {
      fetchSemesters(selectedFieldOfStudy);
    }
    else if (formSelectedFieldOfStudy) {
      fetchSemesters(formSelectedFieldOfStudy);
    }
  }, [formSelectedFieldOfStudy, selectedFieldOfStudy]);

  useEffect(() => {
    fetchCourses();
  }, [selectedProgram, selectedFieldOfStudy, selectedSemester]);

  async function fetchCourses() {
    try {
      console.log(1223456)
      const response = await CourseService.getAllCourses({ programId: selectedProgram, fieldOfStudyId: selectedFieldOfStudy, semesterId: selectedSemester });
      console.log(5, response.data);
      console.log(1223455)
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  async function fetchSingleCourse(courseId) {
    try {
      setEditCourseCode(courseId);
      const response = await CourseService.getCourseById({ courseId });
      setSingleCourse(response.data.course);
      const { course } = response.data;
      const response3 = await CourseService.getProgramById({
        programId: course.program,
      });
      setUpdatedProgram(response3.data?.program.program_fullname)
      const response1 = await CourseService.getFieldOfStudyById({
        fieldOfStudyId: course.field_of_study,
      });
      setUpdatedFieldOfStudy(response1.data.fieldOfStudy.field_of_studyfullname)
      const response2 = await CourseService.getSemesterByCourseId({
        courseId: course._id,
      });
      setUpdatedSemester(response2.data.semester.semester);

      // Set updated course details
      setUpdatedCourse_name(response?.data?.course?.course_name);
      setUpdatedCourse_code(response?.data?.course?.course_code);
      setUpdatedCourse_type(response?.data?.course?.course_type);
      setUpdatedCredits(response?.data?.course?.credits);
      setUpdatedInstructor_name(response?.data?.course?.instructor_name);
      setUpdatedInstructor_photo(response?.data?.course?.instructor_photo);

      fetchMedia(response?.data?.course?._id);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  const fetchMedia = async (courseId) => {
    try {
      console.log(89, courseId);
      const response = await CourseService.getMediaByCourceId({
        courseId
      });
      console.log(97, response.data);
      console.log(977, response?.data?.syllabus?.pdf_url);
      console.log(978, response?.data?.resourcesLinks);
      console.log(979, response?.data?.resourcesPdf);
      console.log(980, response?.data?.pyqLinks);
      console.log(981, response?.data?.pyqPdf)

      // Set updated syllabus
      setUpdatedSyllabus(response?.data?.syllabus?.pdf_url || "");

      // Set updated resource links
      setUpdatedResource_links(response?.data?.resourcesLinks || [{ link_name: "", link_url: "" }]);

      // Set updated resource PDFs
      setUpdatedResource_pdfs(response?.data?.resourcesPdf || [{ pdf_name: "", pdf_url: "" }]);

      // Set updated PYQ links
      setUpdatedPyq_links(response?.data?.pyqLinks || [{ link_name: "", link_url: "" }]);

      // Set updated PYQ PDFs
      setUpdatedPyq_pdfs(response?.data?.pyqPdf || [{ pdf_name: "", pdf_url: "" }]);


    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDeleteField = (field, index) => {
    if (field === "resource_links") {
      setUpdatedResource_links((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
    if (field === "resource_pdfs") {
      setUpdatedResource_pdfs((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
    if (field === "pyq_links") {
      setUpdatedPyq_links((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
    if (field === "pyq_pdfs") {
      setUpdatedPyq_pdfs((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
    if (field === "syllabus_pdf") {
      setUpdatedSyllabus("")
    }
  };

  const handleEditAddResourceLink = () => {
    if (editFormResourceLinkName.length === 0 || editFormResourceLinkUrl.length === 0) {
      toast.error("Enter both details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setUpdatedResource_links([...updatedResource_links, { link_name: editFormResourceLinkName, link_url: editFormResourceLinkUrl }]);
    setEditFormResourceLinkName("")
    setEditFormResourceLinkUrl("")
  };
  const handleEditAddResourcePdf = (e) => {
    if (editFormResourcePdfName.length === 0 || editFormResourcePdfUrl.length === 0) {
      toast.error("Enter both details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setUpdatedResource_pdfs([...updatedResource_pdfs, { pdf_name: editFormResourcePdfName, pdf_url: editFormResourcePdfUrl }]);
    setEditFormResourcePdfName("")
    setEditFormResourcePdfUrl("")
  };

  const handleEditAddPyqLink = (e) => {
    if (editFormPyqLinkName.length === 0 || editFormPyqLinkUrl.length === 0) {
      toast.error("Enter both details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setUpdatedPyq_links([...updatedPyq_links, { link_name: editFormPyqLinkName, link_url: editFormPyqLinkUrl }]);
    setEditFormPyqLinkName("")
    setEditFormPyqLinkUrl("")
  };
  const handleEditAddPyqPdf = (e) => {
    if (editFormPyqPdfName.length === 0 || editFormPyqPdfUrl.length === 0) {
      toast.error("Enter both details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setUpdatedPyq_pdfs([...updatedPyq_pdfs, { pdf_name: editFormPyqPdfName, pdf_url: editFormPyqPdfUrl }]);
    setEditFormPyqPdfName("")
    setEditFormPyqPdfUrl("")
  };

  const handleInputChangeresourceeditpdf = async (field, value) => {
    try {
      const formData = new FormData();
      formData.append("file", value);
      const response = await CourseService.uploadFile(formData);
      console.log(response.data.file);
      if (field === "resources_pdf") {
        setEditFormResourcePdfUrl(response.data.file)
      }
      else if (field === "pyq_pdf") {
        setEditFormPyqPdfUrl(response.data.file)
      }
      else if (field === "syllabus_pdf") {
        setUpdatedSyllabus(response.data.file)
      }

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
    console.log(12345, resource_pdfs)
  };


  //upload edit picture
  const handleUploadEditPicture = async (e) => {
    const file = e.target.files[0];
    console.log(23, file);
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const response = await CourseService.uploadPicture(formData);
      setUpdatedInstructor_photo(response?.data?.picture);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const handleSearch = async (value) => {
    try {
      console.log("sully")
      const response = await CourseService.searchCourse(value);
      console.log("cheeku", response.data)
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      console.log("sully")
      if (formSelectedProgram.length === 0) {
        toast.error("Please select Program", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        return;
      }
      if (formSelectedFieldOfStudy.length === 0) {
        toast.error("Please select Field Of Study", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        return;
      }
      if (formSelectedSemester.length === 0) {
        toast.error("Please select Semester", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        return;
      }
      const data = {
        program: formSelectedProgram, field_of_study: formSelectedFieldOfStudy, semester: formSelectedSemester, course_name, course_code, course_type, credits, instructor_name, instructor_photo, syllabus,
        resource_links, resource_pdfs, pyq_links, pyq_pdfs
      };
      console.log(11111, data)
      const response = await CourseService.createCourse(data);
      console.log("cheeku", response.data)
      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      fetchCourses();
      closeModal();
    }
    catch (err) {
      console.error("Error searching courses:", err);
    }
  }

  const handleEditCourse = async (e) => {
    e.preventDefault();
    try {
      const data = {
        program: updatedProgram,
        field_of_study: updatedFieldOfStudy,
        semester: updatedSemester,
        course_name: updatedCourse_name,
        course_code: updatedCourse_code,
        course_type: updatedCourse_type,
        credits: updatedCredits,
        instructor_name: updatedInstructor_name,
        instructor_photo: updatedInstructor_photo,
        syllabus: updatedSyllabus,
        resource_links: updatedResource_links,
        resource_pdfs: updatedResource_pdfs,
        pyq_links: updatedPyq_links,
        pyq_pdfs: updatedPyq_pdfs
      };

      console.log(1001, data)

      const courseId = editCourseCode; // Assuming you have a selectedCourseId state variable for the course being edited
      console.log(1002, courseId);
      const response = await CourseService.updateCourse(courseId, data);
      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      fetchCourses(); // Assuming you have a fetchCourses function to refresh the course list after editing
      setEditModalOpen(false); // Assuming you have a closeEditModal function to close the edit modal
    } catch (err) {
      console.error("Error editing course:", err);
    }
  };


  // Dummy courses data
  const openViewModal = (course) => {
    console.log(22222, course)
    fetchSingleCourse(course._id);
    setViewModalOpen(true);
  };

  const [selectedInstructorPhoto, setSelectedInstructorPhoto] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedResourcepdf, setSelectedResourcepdf] = useState([]);
  const [selectedpyqpdf, setSelectedpyqpdf] = useState([]);

  // Function to handle closing the modal
  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false)
  }


  // Function to handle opening the modal
  const openModal = () => {
    setModalOpen(true);
  };
  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
    setCourse_name("");
    setCourse_code("");
    setCourse_type("");
    setCredits(0);
    setInstructor_name("");
    setInstructor_photo("");
    setSyllabus("");
    setResources_link([{ link_name: "", link_url: "" }]);
    setResources_pdf([{ pdf_name: "", pdf_url: "" }]);
    setPyq_link([{ link_name: "", link_url: "" }]);
    setPyq_pdf([{ pdf_name: "", pdf_url: "" }]);
  };

  const handleEdit = async (course) => {
    fetchSingleCourse(course._id);
    setEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Function to handle closing the delete confirmation modal
  const closeDeleteModal = () => {
    setDeletingCourseId(null)
    setDeleteModalOpen(false);
  };
  const handleDelete = async (course) => {
    setDeletingCourseId(course._id)
    openDeleteModal();
  };

  // Function to handle deleting a program
  const handleDeleteCourse = async () => {
    try {
      console.log("deleting", deletingCourseId);
      const res = await CourseService.deleteCourse({ deletingCourseId });
      console.log(455, res.data.message)
      console.log("deleting", 2);
      fetchCourses()
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const handleInputChange = (field, index, value) => {
    const newDetails = { ...courseDetails };
    newDetails[field][index] = value;
    setCourseDetails(newDetails);
  };

  //Handling Resource, PVQS - Links, pdfs
  const handleInputChangeresourcelink = (index, fieldIndex, value) => {
    const updatedLinks = [...resource_links];
    updatedLinks[index][fieldIndex === 0 ? "link_name" : "link_url"] = value;
    setResources_link(updatedLinks);
    console.log(12345, resource_links)
  };

  const handleInputChangeresourcepdf = async (index, fieldIndex, value) => {
    const updatedResources = [...resource_pdfs];
    if (fieldIndex === 0) {
      updatedResources[index]["pdf_name"] = value;
    }
    else if (fieldIndex === 1) {
      try {
        const formData = new FormData();
        formData.append("file", value);
        const response = await CourseService.uploadFile(formData);
        console.log(response.data.file);
        updatedResources[index]["pdf_url"] = response.data.file;
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
    setResources_pdf(updatedResources);
    console.log(12345, resource_pdfs)
  };

  const handleInputChangepyqlink = (index, fieldIndex, value) => {
    const updatedPyq = [...pyq_links];
    updatedPyq[index][fieldIndex === 0 ? "link_name" : "link_url"] = value;
    setPyq_link(updatedPyq);
    console.log(123, pyq_links)
  };

  const handleInputChangepyqpdf = async (index, fieldIndex, value) => {
    const updatedPyq = [...pyq_pdfs];
    if (fieldIndex === 0) {
      updatedPyq[index]["pdf_name"] = value;
    }
    else if (fieldIndex === 1) {
      try {
        const formData = new FormData();
        formData.append("file", value);
        const response = await CourseService.uploadFile(formData);
        console.log(response.data.file);
        updatedPyq[index]["pdf_url"] = response.data.file;
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
    setPyq_pdf(updatedPyq);
    console.log(12345, pyq_pdfs)
  };


  const handleAddField = (field) => {
    if (field === "resource_links") {
      setResources_link((prevLinks) => [...prevLinks, { link_name: "", link_url: "" }]);
    }
    if (field === "resource_pdfs") {
      setResources_pdf((prevPdfs) => [...prevPdfs, { pdf_name: "", pdf_url: "" }]);
    }
    if (field === "pyq_links") {
      setPyq_link((prevLinks) => [...prevLinks, { link_name: "", link_url: "" }]);
    }
    if (field === "pyq_pdfs") {
      setPyq_pdf((prevPdfs) => [...prevPdfs, { pdf_name: "", pdf_url: "" }]);
    }
  };

  const handleDeleteField = (field, index) => {
    if (field === "resource_links") {
      setResources_link((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
    if (field === "resource_pdfs") {
      setResources_pdf((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
    if (field === "pyq_links") {
      setPyq_link((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
    if (field === "pyq_pdfs") {
      setPyq_pdf((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
  };

  //upload picture
  const handleUploadPicture = async (e) => {
    const file = e.target.files[0];
    console.log(23, file);
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const response = await CourseService.uploadPicture(formData);
      setInstructor_photo(response?.data?.picture);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  //upload file
  const handleSyllabusFile = async (e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await CourseService.uploadFile(formData);
      console.log(response.data.file);
      setSyllabus(response?.data?.file);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChangepyqpdf = async (index, fieldIndex, e) => {

    const file = e.target.files[0];
    const fileName = file.name; // Extracting file name from the file object
    const newSelectedpyqpdf = [...selectedpyqpdf];
    newSelectedpyqpdf[index] = fileName; // Storing only the file name
    setSelectedpyqpdf(newSelectedpyqpdf);


    const updatedpyq = [...courseDetails.pyq_pdfs];
    updatedpyq[index][fieldIndex] = file;
    setCourseDetails({ ...courseDetails, pyq_pdfs: updatedpyq });
    console.log(23, newSelectedpyqpdf[index], " + ", e.target.value);

  };

  return (
    <div>
      {/* dropdowns */}
      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button
          onClick={openModal}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
        >
          Add Course
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-5 ">
        <Dropdown
          name="Program"
          value={selectedProgram}
          options={programs?.map((program) => program?.program_name)}
          onSelect={(selectedProgramName) => {
            const selectedProgram = programs?.find(
              (program) => program?.program_name === selectedProgramName
            );
            setSelectedProgram(selectedProgram?._id);
            setSelectedSemester("");
            setSelectedFieldOfStudy("");
          }}
        />
        <Dropdown
          name="Field Of Study"
          value={selectedFieldOfStudy}
          options={fieldOfStudy?.map((field) => field?.field_of_studyname)}
          onSelect={(selectedFieldOfStudyName) => {
            const selectedFieldOfStudy = fieldOfStudy?.find(
              (field) => field?.field_of_studyname === selectedFieldOfStudyName
            );
            setSelectedFieldOfStudy(selectedFieldOfStudy?._id);
            setSelectedSemester("");
          }}
        />
        <Dropdown
          name="Semester"
          value={selectedSemester}
          options={semesters?.map((semester) => semester?.semester)}
          onSelect={(selectedSemesterName) => {
            const selectedSemester = semesters?.find(
              (semester) => semester?.semester === selectedSemesterName
            );
            setSelectedSemester(selectedSemester?._id);
          }}
        />
        <div className="w-full md:w-[270px]">
          <form
            className="max-w-md mx-auto"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          >
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaSearch
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                id="default-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Search Course"
              />
            </div>
          </form>
        </div>
      </div>

      {/*Course Table */}
      <div className="py-2 md:py-5">
        <CoursesTable
          courses={courses}
          openViewModal={openViewModal}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      {/* //////////////////////// modal to Add the course //////////////////// */}
      <Modal
        //  style={{ zIndex: 9999 }}
        open={modalOpen}
        // onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "50%",
            "@media (max-width: 1024px)": {
              width: "60%",
            },
            "@media (max-width: 768px)": {
              width: "90%",
              maxHeight: "95vh",
            },
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={closeModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            X
          </Button>
          <form
            onSubmit={handleAddCourse}
            className="flex  flex-col w-full h-full py-6 text-center bg-white "
          >
            <h3 className="pb-5  text-[25px]  md:text-[35px]  font-extrabold text-dark-grey-900">
              Add Course Details
            </h3>
            <div className="py-2 md:pt-3 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Program*
              </label>
              <Dropdown2
                required={true}
                name="Program"
                value={formSelectedProgram}
                options={programs?.map((program) => program?.program_name)}
                onSelect={(selectedProgramName) => {
                  const selectedProgram = programs?.find(
                    (program) => program?.program_name === selectedProgramName
                  );
                  setFormSelectedProgram(selectedProgram?._id);
                  setFormSelectedSemester("");
                  setFormSelectedFieldOfStudy("");
                }}
              />
            </div>
            <div className="pb-2  flex flex-col">
              <label
                htmlFor="fieldofstudyName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Field Of Study*
              </label>
              <Dropdown2
                name="Field Of Study"
                value={formSelectedFieldOfStudy}
                options={fieldOfStudy?.map(
                  (field) => field?.field_of_studyname
                )}
                onSelect={(selectedFieldOfStudyName) => {
                  const selectedFieldOfStudy = fieldOfStudy?.find(
                    (field) =>
                      field?.field_of_studyname === selectedFieldOfStudyName
                  );
                  setFormSelectedFieldOfStudy(selectedFieldOfStudy?._id);
                  setFormSelectedSemester("");
                }}
              />
            </div>
            <div className="pb-2 md:pb-8 flex flex-col">
              <label
                htmlFor="semesterName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Semester*
              </label>
              <Dropdown2
                name="Semester"
                value={formSelectedSemester}
                options={semesters?.map((semester) => semester?.semester)}
                onSelect={(selectedSemesterName) => {
                  const selectedSemester = semesters?.find(
                    (semester) => semester?.semester === selectedSemesterName
                  );
                  setFormSelectedSemester(selectedSemester?._id);
                }}
              />
            </div>
            {/* Inputs */}
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursename"
              type="text"
              value={course_name}
              onChange={(e) => setCourse_name(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Code*
            </label>
            <input
              id="coursecode"
              type="text"
              value={course_code}
              onChange={(e) => setCourse_code(e.target.value)}
              placeholder="CS3010"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Type*
            </label>
            <input
              id="coursetype"
              type="text"
              value={course_type}
              onChange={(e) => setCourse_type(e.target.value)}
              placeholder="Compulsory "
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Credits*
            </label>
            <input
              id="credits"
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Name*
            </label>
            <input
              id="instructorname"
              type="text"
              value={instructor_name}
              onChange={(e) => setInstructor_name(e.target.value)}
              placeholder="Sraban Mohanty"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="instructorFileInput"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Upload Instructor Photo
            </label>
            <div className="flex items-center mb-8">
              <input
                type="file"
                id="instructorFileInput"
                accept="image/*"
                onChange={handleUploadPicture}
                className="block w-full text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "
              />
            </div>

            <label
              htmlFor="syllabusFileInput"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Upload Syllabus
            </label>
            <div className="flex items-center mb-8">
              <input
                type="file"
                id="syllabusFileInput"
                onChange={handleSyllabusFile}
                accept="application/pdf"
                className="block w-full text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "
              />

              <label
                htmlFor="resource_links"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Upload Resources (Link)
              </label>
              {resource_links.map((rsc, index) => (
                <div key={index} className="mb-5">
                  <input
                    type="text"
                    value={rsc.link_name} // Use link_name from resource_links state
                    onChange={(e) =>
                      handleInputChangeresourcelink(index, 0, e.target.value)
                    }
                    placeholder="Resources Link Name"
                    className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

                  />
                  <input
                    type="text"
                    value={rsc.link_url} // Use link_url from resource_links state
                    onChange={(e) =>
                      handleInputChangeresourcelink(index, 1, e.target.value)
                    }
                    placeholder="Resources Link URL"
                    className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

                  />
                  <div className="flex justify-end">
                    {index > 0 && (
                      <>
                        <Button
                          style={{ textTransform: "none" }}
                          className="max-md:hidden mb-5 "
                          onClick={() =>
                            handleDeleteField("resource_links", index)
                          }
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              <Button
                onClick={() => handleAddField("resource_links")}
                cariant="outlined"
              >
                + Add More Resources
              </Button>

              <label
                htmlFor="resources-pdf"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Upload Resources (pdf)
              </label>

              {/* sd */}
              {resource_pdfs.map((resource, index) => (
                <div key={index} className="mb-5 ">
                  <input
                    type="text"
                    value={resource.pdf_name}
                    onChange={
                      (e) =>
                        handleInputChangeresourcepdf(index, 0, e.target.value) // Pass index and 0 to identify the name
                    }
                    placeholder="Resources Pdf Name"
                    className="flex items-center w-full mb-2 px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

                  />
                  <input
                    onChange={
                      (e) =>
                        handleInputChangeresourcepdf(index, 1, e.target.files[0]) // Pass index and 1 to identify the URL
                    }
                    accept="application/pdf"
                    type="file"
                    id={`resourcePdfInput-${index}`}
                    className="w-full mb-2 flex justify-content items-center text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "
                  />

                  <div className="flex justify-end">
                    {index > 0 && (
                      <>
                        <Button
                          style={{ textTransform: "none" }}
                          className="max-md:hidden mb-2"
                          onClick={() =>
                            handleDeleteField("resource_pdfs", index)
                          }
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              <Button
                onClick={() => handleAddField("resource_pdfs")}
                className="mb-10"
                cariant="outlined"
              >
                + Add More Resources
              </Button>

              <label
                htmlFor="pyq"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Upload pyq (Link)
              </label>
              {pyq_links.map((pyq, index) => (
                <div key={index} className=" mb-5">
                  <input
                    type="text"
                    value={pyq.link_name}
                    onChange={(e) =>
                      handleInputChangepyqlink(index, 0, e.target.value)
                    }
                    placeholder="PYQ Link Name"
                    className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

                  />
                  <input
                    type="text"
                    value={pyq.link_url}
                    onChange={
                      (e) => handleInputChangepyqlink(index, 1, e.target.value) // Pass index and 1 to identify the URL
                    }
                    placeholder="PYQ Link url"
                    className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

                  />
                  <div className="flex justify-end">
                    {index > 0 && (
                      <>
                        <Button
                          style={{ textTransform: "none" }}
                          className="max-md:hidden "
                          onClick={() => handleDeleteField("pyq_links", index)}
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              <Button
                onClick={() => handleAddField("pyq_links")}
                cariant="outlined"
              >
                + Add More PYQs
              </Button>
              <label
                htmlFor="pyq-pdf"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Upload pyq (pdf)
              </label>

              {/* sd */}
              {pyq_pdfs.map((pyq, index) => (
                <div key={index} className=" mb-5 ">
                  <input
                    type="text"
                    value={pyq.pdf_name} // Assuming resource[0] is the name of the resource
                    onChange={
                      (e) => handleInputChangepyqpdf(index, 0, e.target.value) // Pass index and 0 to identify the name
                    }
                    placeholder="Pyq Pdf Name"
                    className="flex items-center w-full mb-2 px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

                  />
                  {/* <div className="flex items-center mb-8"> */}

                  <input
                    id={`pyqPdfInput-${index}`}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      handleInputChangepyqpdf(index, 1, e.target.files[0])
                    }
                    className="w-full mb-2 flex justify-content items-center text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "

                  />

                  {/* </div> */}
                  <div className="flex justify-end">
                    {index > 0 && (
                      <>
                        <Button
                          style={{ textTransform: "none" }}
                          className="max-md:hidden "
                          onClick={() => handleDeleteField("pyq_pdfs", index)}
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              <Button
                onClick={() => handleAddField("pyq_pdfs")}
                cariant="outlined"
              >
                + Add More Resources
              </Button>

              <div className="pb-2 pt-4">
                {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
                <Button type="submit" variant="contained">
                  Add Course
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Edit modal */}
      <Modal
        open={editModalOpen}
        onClose={closeEditModal} // Assuming you have a function to close the edit modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "50%",
            "@media (max-width: 1024px)": {
              width: "60%",
            },
            "@media (max-width: 768px)": {
              width: "90%",
              maxHeight: "95vh",
            },
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={closeEditModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            X
          </Button>
          <form
            onSubmit={handleEditCourse}
            className="flex flex-col w-full h-full py-6 text-center bg-white "
          >
            <h3 className="pb-5 text-[25px] md:text-[35px] font-extrabold text-dark-grey-900">
              Edit Course Details
            </h3>
            {/* Populate input fields with course details */}
            {/* Program */}
            <div className="py-2 md:pt-3 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Program
              </label>
              <input
                type="text"
                value={updatedProgram || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            <div className="pb-2  flex flex-col">
              <label
                htmlFor="fieldofstudyName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Field Of Study
              </label>
              <input
                type="text"
                value={updatedFieldOfStudy || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            <div className="pb-2 md:pb-8 flex flex-col">
              <label
                htmlFor="semesterName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Semester
              </label>
              <input
                type="text"
                value={updatedSemester || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            {/* Update Course Name */}
            <label
              htmlFor="coursename"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursename"
              type="text"
              value={updatedCourse_name}
              onChange={(e) => setUpdatedCourse_name(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Type*
            </label>
            <input
              id="coursetype"
              type="text"
              value={updatedCourse_type}
              onChange={(e) => setUpdatedCourse_type(e.target.value)}
              placeholder="Compulsory "
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Credits*
            </label>
            <input
              id="credits"
              type="number"
              value={updatedCredits}
              onChange={(e) => setUpdatedCredits(e.target.value)}
              placeholder="Number Of Credits"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Name*
            </label>
            <input
              id="instructorname"
              type="text"
              value={updatedInstructor_name}
              onChange={(e) => setUpdatedInstructor_name(e.target.value)}
              placeholder="Sraban Mohanty"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Photo
            </label>
            <div className="flex gap-5 items-center mb-5">
              <div className="rounded-full overflow-hidden">
                {updatedInstructor_photo.length > 0 && (
                  <img
                    className="h-12 w-12 lg:h-16 lg:w-16 object-cover object-center rounded-full"
                    src={updatedInstructor_photo}
                    alt="Prof"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="fileInput"
                  className="text-blue-400 cursor-pointer text-sm"
                >
                  Update Picture
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadEditPicture}
                  className="hidden"
                />
              </div>
            </div>

            <label
              htmlFor="syllabus_pdfs"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Syllabus (Pdf)
            </label>
            {/* displaying available links */}
            {updatedSyllabus.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-4 border  p-2 rounded-md">
                      <FaFilePdf
                        className="text-red-500 max-md:hidden"
                        size={24}
                      />
                      <div className="flex-1">
                        <p className="text-sm md:text-[16px]">Syllabus</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          className="max-md:!hidden"
                          onClick={() =>
                            handleViewPdf({
                              title: "Syllabus",
                              url: updatedSyllabus,
                            })
                          }
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          className="max-md:!hidden"
                          onClick={() => handleDownload(updatedSyllabus)}
                        >
                          Download
                        </Button>
                        <IoMdEye
                          className="text-blue-500 cursor-pointer md:hidden"
                          size={24}
                          onClick={() =>
                            handleViewPdf({
                              title: "Syllabus",
                              url: updatedSyllabus,
                            })
                          }
                        />
                        <IoMdDownload
                          className="text-red-500 cursor-pointer md:hidden"
                          size={24}
                          onClick={() => handleDownload(updatedSyllabus)}
                        />
                      </div>
                    </div>
                    {/* Delete button */}
                    <div className="flex justify-end my-2">
                      <Button
                        style={{ textTransform: "none" }}
                        onClick={() => handleEditDeleteField("syllabus_pdf", 0)}
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <input
              onChange={
                (e) =>
                  handleInputChangeresourceeditpdf(
                    "syllabus_pdf",
                    e.target.files[0]
                  ) // Pass index and 1 to identify the URL
              }
              accept="application/pdf"
              type="file"
              className="w-full mb-10 flex justify-content items-center text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "
            />

            <label
              htmlFor="resource_links"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Resources (Link)
            </label>
            {/* displaying available links */}
            {updatedResource_links.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {updatedResource_links.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border p-2 rounded-md">
                        <FaLink
                          className="text-blue-500  max-md:hidden"
                          size={20}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.link_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleOpenLink(item.link_url)}
                          >
                            View
                          </Button>
                          <IoMdEye
                            className="text-blue-500  md:hidden"
                            size={24}
                            onClick={() => handleOpenLink(item.link_url)}
                          />
                        </div>
                      </div>
                      {/* Delete button */}
                      <div className="flex justify-end my-2">
                        <Button
                          style={{ textTransform: "none" }}
                          onClick={() =>
                            handleEditDeleteField("resource_links", index)
                          }
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* new links to add */}
            <div>
              <input
                type="text"
                value={editFormResourceLinkName}
                onChange={(e) => setEditFormResourceLinkName(e.target.value)}
                placeholder="Resources Link Name"
                className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

              />
              <input
                type="text"
                value={editFormResourceLinkUrl}
                onChange={(e) => setEditFormResourceLinkUrl(e.target.value)}
                placeholder="Resources Link Url"
                className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

              />
              <div className="flex justify-end mb-5">
                <Button
                  onClick={handleEditAddResourceLink}
                  style={{ textTransform: "none" }}
                  variant="contained"
                  size="small"
                // startIcon={<DeleteIcon />}
                >
                  ADD
                </Button>
              </div>
            </div>

            <label
              htmlFor="resource_pdfs"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Resources (Pdf)
            </label>
            {/* displaying available links */}
            {updatedResource_pdfs.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {updatedResource_pdfs.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border  p-2 rounded-md">
                        <FaFilePdf
                          className="text-red-500 max-md:hidden"
                          size={24}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.pdf_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleDownload(item.pdf_url)}
                          >
                            Download
                          </Button>
                          <IoMdEye
                            className="text-blue-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          />
                          <IoMdDownload
                            className="text-red-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() => handleDownload(item.pdf_url)}
                          />
                        </div>
                      </div>
                      {/* Delete button */}
                      <div className="flex justify-end my-2">
                        <Button
                          style={{ textTransform: "none" }}
                          onClick={() =>
                            handleEditDeleteField("resource_pdfs", index)
                          }
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* new links to add */}
            <div>
              <input
                type="text"
                value={editFormResourcePdfName}
                onChange={(e) => setEditFormResourcePdfName(e.target.value)}
                placeholder="Resources Pdf Name"
                className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

              />
              <input
                onChange={
                  (e) =>
                    handleInputChangeresourceeditpdf(
                      "resources_pdf",
                      e.target.files[0]
                    ) // Pass index and 1 to identify the URL
                }
                accept="application/pdf"
                type="file"
                className="w-full mb-2 flex justify-content items-center text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleEditAddResourcePdf}
                  style={{ textTransform: "none" }}
                  variant="contained"
                  size="small"
                // startIcon={<DeleteIcon />}
                >
                  ADD
                </Button>
              </div>
            </div>

            <label
              htmlFor="pyq_links"
              className="mb-2 mt-5 text-sm text-start text-grey-900"
            >
              Previous Year Questions (Link)
            </label>
            {/* displaying available links */}
            {updatedPyq_links.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {updatedPyq_links.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border p-2 rounded-md">
                        <FaLink
                          className="text-blue-500 max-md:hidden"
                          size={20}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.link_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleOpenLink(item.link_url)}
                          >
                            View
                          </Button>
                          <IoMdEye
                            className="text-blue-500  md:hidden"
                            size={24}
                            onClick={() => handleOpenLink(item.link_url)}
                          />
                        </div>
                      </div>
                      {/* Delete button */}
                      <div className="flex justify-end my-2">
                        <Button
                          style={{ textTransform: "none" }}
                          onClick={() =>
                            handleEditDeleteField("pyq_links", index)
                          }
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* new links to add */}
            <div>
              <input
                type="text"
                value={editFormPyqLinkName}
                onChange={(e) => setEditFormPyqLinkName(e.target.value)}
                placeholder="PYQ Link Name"
                className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

              />
              <input
                type="text"
                value={editFormPyqLinkUrl}
                onChange={(e) => setEditFormPyqLinkUrl(e.target.value)}
                placeholder="PYQ Link Url"
                className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

              />
              <div className="flex justify-end mb-5">
                <Button
                  onClick={handleEditAddPyqLink}
                  style={{ textTransform: "none" }}
                  variant="contained"
                  size="small"
                >
                  ADD
                </Button>
              </div>
            </div>

            <label
              htmlFor="pyq_links"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Previous Year Questions (Pdf)
            </label>
            {/* displaying available links */}
            {updatedPyq_pdfs.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {updatedPyq_pdfs.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border  p-2 rounded-md">
                        <FaFilePdf
                          className="text-red-500 max-md:hidden"
                          size={24}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.pdf_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleDownload(item.pdf_url)}
                          >
                            Download
                          </Button>
                          <IoMdEye
                            className="text-blue-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          />
                          <IoMdDownload
                            className="text-red-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() => handleDownload(item.pdf_url)}
                          />
                        </div>
                      </div>
                      {/* Delete button */}
                      <div className="flex justify-end my-2">
                        <Button
                          style={{ textTransform: "none" }}
                          onClick={() =>
                            handleEditDeleteField("pyq_pdfs", index)
                          }
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* new links to add */}
            <div>
              <input
                type="text"
                value={editFormPyqPdfName}
                onChange={(e) => setEditFormPyqPdfName(e.target.value)}
                placeholder="PYQ Pdf Name"
                className="flex items-center mb-2 w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"

              />
              <input
                onChange={
                  (e) =>
                    handleInputChangeresourceeditpdf(
                      "pyq_pdf",
                      e.target.files[0]
                    ) // Pass index and 1 to identify the URL
                }
                accept="application/pdf"
                type="file"
                className="w-full mb-2 flex justify-content items-center text-sm  md:text-md lg:text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 "

              />
              <div className="flex justify-end">
                <Button
                  onClick={handleEditAddPyqPdf}
                  style={{ textTransform: "none" }}
                  className=" mb-5 "
                  variant="contained"
                  size="small"
                >
                  ADD
                </Button>
              </div>
            </div>

            <div className="pb-2 pt-4">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button type="submit" variant="contained">Update Course</Button>

            </div>
          </form>
        </Box>
      </Modal>

      {/* ////////////////////////modal to view the course //////////////////// */}
      <Modal
        open={viewModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "50%",
            "@media (max-width: 1024px)": {
              width: "60%",
            },
            "@media (max-width: 768px)": {
              width: "90%",
              maxHeight: "95vh",
            },
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={closeViewModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            X
          </Button>
          <div className="flex flex-col w-full h-full py-6 text-center bg-white ">
            <h3 className="pb-5 text-[25px] md:text-[35px] font-extrabold text-dark-grey-900">
              Course Details
            </h3>
            <div className="py-2 md:pt-3 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Program
              </label>
              <input
                type="text"
                value={updatedProgram || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            <div className="pb-2  flex flex-col">
              <label
                htmlFor="fieldofstudyName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Field Of Study
              </label>
              <input
                type="text"
                value={updatedFieldOfStudy || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-5 flex flex-col">
              <label
                htmlFor="semesterName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Semester
              </label>
              <input
                type="text"
                value={updatedSemester || ""}
                disabled
                className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
              />
            </div>
            {/* Update Course Name */}
            <label
              htmlFor="coursename"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name
            </label>
            <input
              id="coursename"
              type="text"
              value={updatedCourse_name || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Type
            </label>
            <input
              id="coursetype"
              type="text"
              value={updatedCourse_type || ""}
              disabled
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Credits
            </label>
            <input
              id="credits"
              type="number"
              value={updatedCredits}
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              disabled
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Name
            </label>
            <input
              disabled
              id="instructorname"
              type="text"
              value={updatedInstructor_name}
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
            />
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Photo
            </label>
            <div className="flex gap-5 items-center mb-5">
              <div className="rounded-full overflow-hidden">
                {updatedInstructor_photo.length > 0 && (
                  <img
                    className="h-12 w-12 lg:h-16 lg:w-16 object-cover object-center rounded-full"
                    src={updatedInstructor_photo}
                    alt="Prof"
                  />
                )}
              </div>
            </div>

            <label
              htmlFor="syllabus_pdfs"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Syllabus (Pdf)
            </label>
            {/* displaying available links */}
            {updatedSyllabus.length > 0 && (
              <div className="mb-5">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-4 border  p-2 rounded-md">
                      <FaFilePdf
                        className="text-red-500 max-md:hidden"
                        size={24}
                      />
                      <div className="flex-1">
                        <p className="text-sm md:text-[16px]">Syllabus</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          className="max-md:!hidden"
                          onClick={() =>
                            handleViewPdf({
                              title: "Syllabus",
                              url: updatedSyllabus,
                            })
                          }
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          className="max-md:!hidden"
                          onClick={() => handleDownload(updatedSyllabus)}
                        >
                          Download
                        </Button>
                        <IoMdEye
                          className="text-blue-500 cursor-pointer md:hidden"
                          size={24}
                          onClick={() =>
                            handleViewPdf({
                              title: "Syllabus",
                              url: updatedSyllabus,
                            })
                          }
                        />
                        <IoMdDownload
                          className="text-red-500 cursor-pointer md:hidden"
                          size={24}
                          onClick={() => handleDownload(updatedSyllabus)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <label
              htmlFor="resource_links"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Resources (Link)
            </label>
            {/* displaying available links */}
            {updatedResource_links.length > 0 && (
              <div className="mb-5">
                <div className="space-y-4">
                  {updatedResource_links.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border p-2 rounded-md">
                        <FaLink
                          className="text-blue-500  max-md:hidden"
                          size={20}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.link_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleOpenLink(item.link_url)}
                          >
                            View
                          </Button>
                          <IoMdEye
                            className="text-blue-500  md:hidden"
                            size={24}
                            onClick={() => handleOpenLink(item.link_url)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label
              htmlFor="resource_pdfs"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Resources (Pdf)
            </label>
            {/* displaying available links */}
            {updatedResource_pdfs.length > 0 && (
              <div className="mb-5">
                <div className="space-y-4">
                  {updatedResource_pdfs.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border  p-2 rounded-md">
                        <FaFilePdf
                          className="text-red-500 max-md:hidden"
                          size={24}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.pdf_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleDownload(item.pdf_url)}
                          >
                            Download
                          </Button>
                          <IoMdEye
                            className="text-blue-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          />
                          <IoMdDownload
                            className="text-red-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() => handleDownload(item.pdf_url)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label
              htmlFor="pyq_links"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Previous Year Questions (Link)
            </label>
            {/* displaying available links */}
            {updatedPyq_links.length > 0 && (
              <div className="mb-5">
                <div className="space-y-4">
                  {updatedPyq_links.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border p-2 rounded-md">
                        <FaLink
                          className="text-blue-500 max-md:hidden"
                          size={20}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.link_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleOpenLink(item.link_url)}
                          >
                            View
                          </Button>
                          <IoMdEye
                            className="text-blue-500  md:hidden"
                            size={24}
                            onClick={() => handleOpenLink(item.link_url)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label
              htmlFor="pyq_links"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Previous Year Questions (Pdf)
            </label>
            {/* displaying available links */}
            {updatedPyq_pdfs.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {updatedPyq_pdfs.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 border  p-2 rounded-md">
                        <FaFilePdf
                          className="text-red-500 max-md:hidden"
                          size={24}
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-[16px]">
                            {item.pdf_name}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="max-md:!hidden"
                            onClick={() => handleDownload(item.pdf_url)}
                          >
                            Download
                          </Button>
                          <IoMdEye
                            className="text-blue-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() =>
                              handleViewPdf({
                                title: item.pdf_name,
                                url: item.pdf_url,
                              })
                            }
                          />
                          <IoMdDownload
                            className="text-red-500 cursor-pointer md:hidden"
                            size={24}
                            onClick={() => handleDownload(item.pdf_url)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={style}>
          <h3 className="text-lg font-semibold text-center mb-5">
            Confirm Deletion
          </h3>
          <p className="text-center text-sm text-gray-600">
            Are you sure you want to delete this Course?
          </p>
          <div className="flex justify-center mt-5 ">
            <Button
              onClick={handleDeleteCourse}
              className="text-white bg-red-500"
              variant="contained"
            >
              Delete
            </Button>
            <Button
              onClick={closeDeleteModal}
              className="text-black "
              variant="outlined"
              style={{ marginLeft: "1rem" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Modal for viewing PDF */}
      <Modal open={pdfModalOpen}>
        <Box
          sx={{
            ...style,
            width: "97vw",
            "@media (max-width: 1024px)": {
              width: "97vw",
            },

            "@media (max-width: 768px)": {
              width: "97vw",
              maxHeight: "95vh",
            },
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={closePdfModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            X
          </Button>

          <div className="modal-content">
            <ViewPdf pdf={selectedPdf} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AdminCourseNavbarCourseComponent;