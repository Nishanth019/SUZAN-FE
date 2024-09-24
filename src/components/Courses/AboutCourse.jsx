"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import CourseService from "@/services/course.service";
import AboutCourseMainSection from "./AboutCourseMainSection";
import CourseSyllabus from "./CourseSyllabus";
import CoursePYQS from "./CoursePYQS";
import CourseReference from "./CourseResources";
import CommentSection from "../CommentSection/CommentSection";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import "./style.css";

const AboutCourse = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const course_id = pathname.split("/").pop();

  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    courseCode: "",
    instructorName: "",
    courseType: "",
    credits: "",
    instructorPhoto: "",
    fieldOfStudy: "",
    semester: "",
  });

  const [resources, setResources] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [syllabus, setSyllabus] = useState([]); // Changed to empty array

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await CourseService.getCourseById({
          courseId: course_id,
        });
        const { course } = response.data;
        const response1 = await CourseService.getFieldOfStudyById({
          fieldOfStudyId: course.field_of_study,
        });
        const field_of_study = response1.data.fieldOfStudy;
        const response2 = await CourseService.getSemesterByCourseId({
          courseId: course_id,
        });
        const semester = response2.data.semester;

        setCourseDetails({
          courseName: course.course_name,
          courseCode: course.course_code,
          instructorName: course.instructor_name,
          courseType: course.course_type,
          credits: course.credits,
          instructorPhoto: course.instructor_photo,
          fieldOfStudy: field_of_study.field_of_studyfullname,
          semester: semester.semester,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await CourseService.getMediaByCourceId({
          courseId: course_id,
        });
        const course = response.data.course;
        const syllabusData = response.data.syllabus; // Changed to a variable

        setSyllabus(
          syllabusData
            ? [
                {
                  // Only set if syllabusData exists
                  title: syllabusData.pdf_name,
                  type: "pdf",
                  url: syllabusData.pdf_url,
                },
              ]
            : []
        ); // Use empty array if syllabusData is undefined

        const resourcesPdf = response.data.resourcesPdf.map((pdf) => ({
          title: pdf.pdf_name,
          type: "pdf",
          url: pdf.pdf_url,
        }));

        const resourcesLinks = response.data.resourcesLinks.map((link) => ({
          title: link.link_name,
          type: "link",
          url: link.link_url,
        }));

        const pyqPdf = response.data.pyqPdf.map((pdf) => ({
          title: pdf.pdf_name,
          type: "pdf",
          url: pdf.pdf_url,
        }));

        const pyqLinks = response.data.pyqLinks.map((link) => ({
          title: link.link_name,
          type: "link",
          url: link.link_url,
        }));

        setResources([...resourcesPdf, ...resourcesLinks]);
        setPyqs([...pyqPdf, ...pyqLinks]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const incrementCourseViewsCount = async () => {
      try {
        await CourseService.incrementCourseViews();
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseDetails();
    fetchMedia();
    incrementCourseViewsCount();
  }, [course_id]); // Added course_id as a dependency

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh] md:h-[90vh]">
          <CircularProgress />
        </div>
      ) : (
        <div className="m-3 md:m-10 lg:mx-[120px] xl:mx-[200px] boxShadow bg-white rounded-lg">
          <AboutCourseMainSection courseDetails={courseDetails} />
          <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20" />
          <CourseSyllabus syllabus={syllabus} />
          <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20" />
          <CoursePYQS pyqs={pyqs} />
          <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20" />
          <CourseReference resources={resources} />
          <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20" />
          <CommentSection type="course" />
        </div>
      )}
    </>
  );
};

export default AboutCourse;
  