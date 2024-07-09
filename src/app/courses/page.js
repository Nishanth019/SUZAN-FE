'use client'
import CourseSection from '@/components/Courses/CoursesSection'
import React, {useEffect} from 'react'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Courses = () => {
  const { isAuth } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push('/signin');
    }
  }, [isAuth, router]);

  return (
    <div className='text-center'>
      <CourseSection/>
    </div>
  )
}

export default Courses
