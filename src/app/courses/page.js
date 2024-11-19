'use client'
import CourseSection from '@/components/Courses/CoursesSection'
import React, {useEffect} from 'react'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Courses = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <div className='text-center'>
      <CourseSection/>
    </div>
  )
}

export default Courses
