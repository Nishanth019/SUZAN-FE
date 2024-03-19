"use client";
import React, { useEffect, useState } from "react";
import Input from "../Generals/Input";
import { useRouter } from "next/navigation";
import UserService from "@/services/user.service";
import collegeService from "@/services/college.service";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import CoursesCard from "./CoursesCard";

const CoursesSection = () => {
    const dummyData = {
        course_name: "Advanced Scientific Numerical Methods",
        course_code: "OE3N35",
        credits: 3,
        course_type: "Elective",
        course_professor: "L.K.Balyan",
        semester: "7",
        field_of_study: "CSE",
        program: "BTECH",
        college: "IIITDMJ",
    }
    const [CourseDetails, setCourseDetails] = useState({
        course_name: "",
        course_code: "",
        credits: "",
        course_type: "",
        course_professor: "",
        semester: "",
        field_of_study: "",
        program: "",
        college: "",
    });
    const [currentDetails, setCurrentDetails] = useState(null);
    useEffect(() => {
        setCourseDetails({
            course_name: dummyData.course_name,
            course_code: dummyData.course_code,
            credits: dummyData.credits,
            course_type: dummyData.course_type,
            course_professor: dummyData.course_professor,
            semester: dummyData.semester,
            field_of_study: dummyData.field_of_study,
            program: dummyData.program,
            college: dummyData.college,
        });
    }, []);

    return (
        <>
        <div className="bg-gray-100">

            <CoursesCard CourseDetails={CourseDetails} setCourseDetails={setCourseDetails} />
        </div>
        </>
    )
}

export default CoursesSection;