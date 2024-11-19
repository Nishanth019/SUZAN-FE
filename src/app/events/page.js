'use client'
import React, {useEffect}  from 'react'
import ComingSoon from '@/components/general/comingsoon.jsx'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const Events = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <ComingSoon/>
  )
}

export default Events
