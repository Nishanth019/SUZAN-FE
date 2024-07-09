'use client'
import CourseSection from '@/components/Courses/CoursesSection'
import React from 'react'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Courses = () => {
  const { isAuth } = useGlobalContext();
  const router = useRouter();

  if(!isAuth){
    router.push('/signin')
  }
  return (
    <div className='text-center'>
      <CourseSection/>
    </div>
  )
}

export default Courses
