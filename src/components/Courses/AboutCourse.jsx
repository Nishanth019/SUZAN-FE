  "use client";
  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import nishanth from "../../assets/CoreTeam/nishanth.jpg";
  import { FaCalendar, FaBookOpen, FaUserCircle } from 'react-icons/fa';
  import AboutCourseMainSection from "./AboutCourseMainSection";
  import CourseSyllabus from "./CourseSyllabus";
  import CoursePYQS from "./CoursePYQS";
  import CourseReference from "./CourseResources";
  import { useRouter } from "next/navigation";
  import { usePathname } from "next/navigation";
  import "./style.css"
  import CourseService from "@/services/course.service"; 
import CommentSection from "../CommentSection/CommentSection";

  const AboutCourse = () => {
      const router = useRouter();
      const pathname = usePathname();
      const course_id = pathname.split("/").pop();

    const [courseDetails,setCourseDetails] = useState({
      courseName: "",
      courseCode: "",
      instructorName: "",
      courseType: "",
      credits: "",
      instructorPhoto:"",
      fieldOfStudy: "",
      semester:""
    });

    const [resources, setResources] = useState([]);
    const [pyqs, setPyqs] = useState([]);
    const [syllabus, setSyllabus] = useState([
      {
        title: "",
        type: "",
        url: "",
      },
    ]);
    
    useEffect(() => {
      const fetchCourseDetails = async () => {
        try {
          const response = await CourseService.getCourseById({
            courseId: course_id,
          });
          // console.log(222,response);
          const { course } = response.data;
          const response1 = await CourseService.getFieldOfStudyById({
            fieldOfStudyId: course.field_of_study,
          });
          const field_of_study = response1.data.fieldOfStudy;
          const response2 = await CourseService.getSemesterByCourseId({
            courseId: course_id,
          });
          const semester = response2.data.semester;
          //  console.log(24, semester);
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
        }
      };

      fetchCourseDetails();
      const fetchMedia = async () => {
        try {
          const response = await CourseService.getMediaByCourceId({
            courseId: course_id,
          });
          const course = response.data.course;
          const syllabus = response.data.syllabus;
          
          const resourcesPdf = response.data.resourcesPdf.map((pdf) => ({
            title: pdf.pdf_name,
            type: "pdf",
            url: pdf.pdf_url,
          }));
          // console.log(20, resourcesPdf);  
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
          
          
          setSyllabus([
            {
              title: syllabus.pdf_name,
              type: "pdf",
              url: syllabus.pdf_url,
            },    
          ]);

          setResources([...resourcesPdf, ...resourcesLinks]);
          setPyqs([...pyqPdf, ...pyqLinks]);
          // console.log(23, syllabus);
          // console.log(25, pyqs);
        } catch (error) {
          console.error(error);
        }
      };


      fetchMedia();
      
    }, []);


    return (
    <div className="m-3 md:m-10 lg:mx-[120px] xl:mx-[200px]  boxShadow bg-white rounded-lg">
      <AboutCourseMainSection courseDetails={courseDetails}/> 
      <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20"/>
      <CourseSyllabus syllabus={syllabus}/>
      <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20"/>
      <CoursePYQS pyqs={pyqs}/>
      <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20"/>
      <CourseReference resources={resources}/>
      <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20"/>
      <CommentSection  />
    </div>
    );
  };

  export default AboutCourse;
