'use client'
import React, {useEffect}  from 'react'
import ComingSoon from '@/components/general/comingsoon.jsx'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Clubs = () => {
  const { isAuth } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push('/signin');
    }
  }, [isAuth, router]);

  return (
    <ComingSoon/>
  )
}

export default Clubs
