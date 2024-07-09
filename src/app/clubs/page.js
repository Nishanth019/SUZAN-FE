'use client'
import React from 'react'
import ComingSoon from '@/components/general/comingsoon.jsx'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Clubs = () => {
  const { isAuth } = useGlobalContext();
  const router = useRouter();

  if(!isAuth){
    router.push('/signin')
  }
  return (
    <ComingSoon/>
  )
}

export default Clubs
