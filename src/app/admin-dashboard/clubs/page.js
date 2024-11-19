'use client'
import React from 'react'
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminClubSection from '@/components/Admin/Clubs/AdminClubSection';
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const AdminClubs = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <DefaultLayout>
      <AdminClubSection/>
    </DefaultLayout>
  )
}

export default AdminClubs
