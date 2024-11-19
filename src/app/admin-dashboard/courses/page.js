'use client'
import React from 'react'
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminCourseSection from '@/components/Admin/Courses/AdminCourseSection';
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const AdminCourses = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <DefaultLayout>
      <AdminCourseSection/>
    </DefaultLayout>
  )
}

export default AdminCourses
