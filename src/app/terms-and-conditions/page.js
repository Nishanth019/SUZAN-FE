'use client'
import React, {useEffect}  from 'react'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import TermsAndConditionsComponent from '@/components/Other/TermsAndConditionsComponent';

const Terms= () => {
  return (
    <>
    <TermsAndConditionsComponent/>
    </>
  )
}

export default Terms;
