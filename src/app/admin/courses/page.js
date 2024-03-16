import React from 'react'
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminCourseSection from '@/components/Admin/Courses/AdminCourseSection';

const AdminCourses = () => {
  return (
    <DefaultLayout>
      <AdminCourseSection/>
    </DefaultLayout>
  )
}

export default AdminCourses
