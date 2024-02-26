'use client'

import React, {useState} from 'react'
import MainSection from "@/components/Homepage/MainSection/MainSection.jsx"
import TrustedSection from '@/components/Homepage/TrustedSection/TrustedSection'
import Services from '@/components/Homepage/Services/Services'
import CoursesSection from '@/components/Homepage/CoursesSection/CoursesSection'

const Home = () => {
  const [user,setUser] = useState(null);
  return (
    <div className="bg-[#FFFFFF]">
      <MainSection/>
      <Services/>
      <TrustedSection/>
      <CoursesSection/>
    </div>
  )
}

export default Home
