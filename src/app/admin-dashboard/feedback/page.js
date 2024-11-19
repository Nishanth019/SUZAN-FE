'use client'
import React from 'react'
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminFeedbackSection from '@/components/Admin/Feedbacks/AdminFeedbackSection';
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const AdminFeedbacks = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <DefaultLayout>
      <AdminFeedbackSection/>
    </DefaultLayout>
  )
}

export default AdminFeedbacks
