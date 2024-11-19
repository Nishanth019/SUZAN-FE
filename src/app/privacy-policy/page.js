'use client'
import React, {useEffect}  from 'react'
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PrivacyPolicyComponent from '@/components/Other/PrivacyPolicyComponent';

const Privacy = () => {
  return (
    <>
    <PrivacyPolicyComponent/>
    </>
  )
}

export default Privacy
