'use client'
import React from 'react'
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminFeedbackSection from '@/components/Admin/Feedbacks/AdminFeedbackSection';


const AdminFeedbacks = () => {
  return (
    <DefaultLayout>
      <AdminFeedbackSection/>
    </DefaultLayout>
  )
}

export default AdminFeedbacks
