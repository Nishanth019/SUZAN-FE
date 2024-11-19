"use client";
import React from "react";
import AboutCourse from "@/components/Courses/AboutCourse";import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const CourseDetails = () => {
   const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return( 
  <div className="bg-[#ffff]">
  <AboutCourse />
  </div>
  )
};

export default CourseDetails;
