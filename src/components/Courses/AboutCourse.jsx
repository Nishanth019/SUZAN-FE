"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import nishanth from "../../assets/CoreTeam/nishanth.jpg";
import { FaCalendar, FaBookOpen, FaUserCircle } from 'react-icons/fa';
import AboutCourseMainSection from "./AboutCourseMainSection";
import CourseSyllabus from "./CourseSyllabus";
import CoursePYQS from "./CoursePYQS";
import CourseReference from "./CourseReference";
import "./style.css"

const AboutCourse = () => {

  const [courseDetails] = useState({
    courseName: "Fibre Optics",
    courseCode: "OE3E30",
    instructorName: "Dinesh Kumar",
    courseType: "Elective",
    credits: 3,
    instructorPhoto: nishanth,
    fieldOfStudy: "CSE",
    semester:"3"
  });

  const [syllabus] = useState([
    { title: "Introduction to the Course", type: "link", description: "Introduction to the basic concepts of the course.", url: "http://example.com/syllabus" },
    { title: "Advanced Topics", type: "link", description: "Exploration of advanced topics in the course curriculum.", url: "http://example.com/syllabus2" },
    { title: "Practical Applications", type: "link", description: "Application of course concepts to real-world scenarios.", url: "http://example.com/syllabus3" },
    { title: "Introduction to the Course", type: "pdf", description: "Introduction to the basic concepts of the course.", pdfName: "Syllabus.pdf" },
    { title: "Advanced Topics", type: "pdf", description: "Exploration of advanced topics in the course curriculum.", pdfName: "Syllabus2.pdf" },
    { title: "Practical Applications", type: "pdf", description: "Application of course concepts to real-world scenarios.", pdfName: "Syllabus3.pdf" }
  ]);

  return (
   <div className="m-3 md:m-10 lg:mx-[120px] xl:mx-[200px]  boxShadow bg-white rounded-lg">
     <AboutCourseMainSection courseDetails={courseDetails}/> {/* Pass courseDetails as prop */}
     <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20"/>
     <CourseSyllabus syllabus={syllabus}/>
     <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20"/>
     <CoursePYQS pvqs={syllabus}/>
     <hr className="text-black text-lg mx-5 md:mx-10 lg:mx-20"/>
     <CourseReference reference={syllabus}/>
   </div>
  );
};

export default AboutCourse;
