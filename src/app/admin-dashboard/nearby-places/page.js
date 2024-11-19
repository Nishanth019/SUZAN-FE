'use client'
import React from 'react'
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminNearbyPlaceSection from '@/components/Admin/NearbyPlaces/AdminNearbyPlaceSection';
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const AdminNearbyPlaces = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <DefaultLayout>
      <AdminNearbyPlaceSection/>
    </DefaultLayout>
  )
}

export default AdminNearbyPlaces
