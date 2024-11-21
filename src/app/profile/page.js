'use client'
import React from 'react'
import ProfileComponent from '@/components/Profile/ProfileComponent'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <div className='w-full overflow-hidden'>
        <ProfileComponent/>
    </div>
  )
}

export default Profile