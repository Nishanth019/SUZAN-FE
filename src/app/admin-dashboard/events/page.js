'use client'
import React from 'react'
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminEventSection from '@/components/Admin/Events/AdminEventSection';
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const AdminEvents = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <DefaultLayout>
      <AdminEventSection/>
    </DefaultLayout>
  )
}

export default AdminEvents
